# Deployment Process and Infrastructure Guide

This document describes the production deployment path for FunctionSid at `https://functionsid.duckdns.org`.

## Production Rule

PM2 may start or reload the application only after the production `.env`, Oracle Wallet, Oracle connectivity, dependency installation, and Nginx configuration have been verified.

## Target Production Environment

| Item | Target |
|---|---|
| Cloud provider | Oracle Cloud Infrastructure |
| Operating system | Oracle Linux |
| Application directory | `/opt/functionsid` |
| Oracle Wallet directory | `/opt/functionsid/wallet` |
| Production environment file | `/opt/functionsid/.env` |
| Runtime | Node.js 24 |
| Dependency install | `npm ci --omit=dev` |
| Process manager | PM2 process `functionsid` |
| Reverse proxy | Nginx proxying to `127.0.0.1:3000` |
| HTTPS | Let's Encrypt certificate managed by Certbot |

## Deployment Pipeline

```text
push to main or workflow_dispatch
  -> GitHub Actions ubuntu-latest runner
  -> actions/checkout
  -> setup Node.js 24
  -> npm ci
  -> npm test
  -> stop if tests fail
  -> SSH to Oracle Linux VM with GitHub Secrets
  -> clone or reset /opt/functionsid to origin/main
  -> install VM packages if missing
  -> npm ci --omit=dev
  -> verify repository, dependencies, Node.js, PM2, Nginx, wallet, and Oracle
  -> reload or start PM2 process functionsid
```

The workflow does not expose secrets; it uses GitHub repository secrets only for SSH access.

## GitHub Secrets

The workflow requires these repository secrets:

| Secret | Purpose |
|---|---|
| `VM_HOST` | Oracle VM hostname or public IP. |
| `VM_PORT` | SSH port, normally `22`. |
| `VM_USER` | SSH user, normally `opc`. |
| `VM_SSH_KEY` | Private SSH key used by GitHub Actions. |

Do not hardcode credentials in workflow files, scripts, or documentation examples.

## VM Preparation Commands

After the repository is available on the VM, GitHub Actions runs:

```bash
cd /opt/functionsid
chmod +x deploy/*.sh
./deploy/install-vm.sh
./deploy/update.sh
./deploy/check.sh
./deploy/reload-app.sh
```

These scripts are idempotent and safe to rerun.

## Oracle Wallet Support

Production wallet location:

```text
/opt/functionsid/wallet
```

Copy the same verified wallet from the Windows development machine. Do not regenerate it and do not commit it.

Expected wallet files include:

- `cwallet.sso`
- `ewallet.p12`
- `ewallet.pem`
- `tnsnames.ora`
- `sqlnet.ora`
- `ojdbc.properties`
- `keystore.jks`
- `truststore.jks`
- `README`

The deployment scripts only set `TNS_ADMIN` when `/opt/functionsid/wallet` exists.

## Production Environment File

Expected path:

```text
/opt/functionsid/.env
```

The deployment scripts do not create this file. Create it manually on the VM from `.env.example` and real production values.

Minimum production values include:

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=replace_with_long_random_session_secret
ADMIN_EMAIL=functionsid@gmail.com
DB_USER=FUNCTIONSID
DB_PASSWORD=replace_with_functionsid_schema_password
DB_CONNECT_STRING=sidcore_high
DB_WALLET_DIR=/opt/functionsid/wallet
TNS_ADMIN=/opt/functionsid/wallet
DB_POOL_MIN=1
DB_POOL_MAX=4
DB_POOL_INCREMENT=1
DB_POOL_QUEUE_TIMEOUT=120000
DB_POOL_CONNECT_TIMEOUT=60
```

Firebase Admin, Firebase Web SDK, and SMTP values must also be present in production `.env`.

## Nginx Preparation

The repository includes:

```text
deploy/nginx/functionsid.conf.template
```

The active production config is:

```text
/etc/nginx/conf.d/functionsid.conf
```

It proxies `functionsid.duckdns.org` to `http://127.0.0.1:3000`. Certbot manages the HTTPS server block and HTTP to HTTPS redirect.

## PM2 Management

Start or reload production manually only after checks pass:

```bash
cd /opt/functionsid
pm2 start ecosystem.config.js --env production
pm2 save
```

GitHub Actions normally handles this through `deploy/reload-app.sh`.

## Recovery Procedure

```bash
cd /opt/functionsid
git fetch origin main
git reset --hard origin/main
chmod +x deploy/*.sh
./deploy/update.sh
./deploy/check.sh
./deploy/reload-app.sh
sudo nginx -t
sudo systemctl reload nginx
```

Use `sudo certbot renew --dry-run` to verify certificate renewal.
