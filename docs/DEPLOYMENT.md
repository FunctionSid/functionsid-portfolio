# Deployment Process and Infrastructure Guide

This document describes the prepared deployment path for FunctionSid. The current deployment work prepares the Oracle Linux VM and GitHub Actions pipeline only. It must not start the website until the production `.env` file and Oracle Wallet are present on the VM.

## Current Deployment Rule

Do not run these commands during the preparation phase:

```bash
pm2 start
pm2 reload
npm start
systemctl restart
```

The application should remain stopped until production secrets and wallet files are copied and verified.

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
| Process manager | PM2, installed but not started during preparation |
| Reverse proxy | Nginx, installed and syntax-checked |
| HTTPS | Not enabled during preparation |

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
  -> verify repository, dependencies, Node.js, PM2, Nginx, and system directories
```

The workflow intentionally does not start PM2 or reload Nginx.

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

`deploy/install-vm.sh` copies it to:

```text
/etc/nginx/conf.d/functionsid.conf.disabled
```

The `.disabled` suffix keeps the config prepared but not enabled. HTTPS is not configured during this phase.

## Future PM2 Enablement

Only after `/opt/functionsid/.env` and `/opt/functionsid/wallet` are present and verified, start PM2 manually:

```bash
cd /opt/functionsid
pm2 start ecosystem.config.js --env production
pm2 save
```

Do not run this during VM preparation.

## Remaining Before First Production Deployment

- [ ] Configure GitHub repository secrets.
- [ ] Run the workflow against the Oracle VM.
- [ ] Copy Oracle Wallet to `/opt/functionsid/wallet`.
- [ ] Create `/opt/functionsid/.env`.
- [ ] Validate Oracle connectivity from the VM.
- [ ] Enable Nginx configuration.
- [ ] Start PM2 manually after secrets are ready.
- [ ] Configure DNS.
- [ ] Configure HTTPS later.
