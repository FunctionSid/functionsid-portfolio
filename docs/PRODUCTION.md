# FunctionSid Production Operations

## Production URL

| Item | Value |
|---|---|
| Website | `https://functionsid.duckdns.org` |
| Repository | `https://github.com/FunctionSid/functionsid-portfolio` |
| Server path | `/opt/functionsid` |
| Environment file | `/opt/functionsid/.env` |
| Oracle Wallet | `/opt/functionsid/wallet` |
| PM2 app | `functionsid` |
| PM2 service | `pm2-opc` |
| Nginx config | `/etc/nginx/conf.d/functionsid.conf` |

## Runtime

- Node.js 24
- npm
- PM2
- Nginx
- Certbot with the Nginx plugin
- Oracle Autonomous Database through `oracledb`

## Oracle

The production application connects as `FUNCTIONSID` using the Oracle Wallet at `/opt/functionsid/wallet`.

Required wallet files:

- `cwallet.sso`
- `ewallet.p12`
- `ewallet.pem`
- `tnsnames.ora`
- `sqlnet.ora`
- `ojdbc.properties`
- `keystore.jks`
- `truststore.jks`
- `README`

Verify Oracle from the VM:

```bash
cd /opt/functionsid
./deploy/check-oracle.sh
```

## Nginx

Nginx listens on ports 80 and 443 and proxies the application to:

```text
http://127.0.0.1:3000
```

Validate and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

SELinux must allow Nginx to proxy to Node:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

## HTTPS

Let's Encrypt certificate:

| Item | Value |
|---|---|
| Domain | `functionsid.duckdns.org` |
| Issuer | Let's Encrypt `YE1` |
| Certificate path | `/etc/letsencrypt/live/functionsid.duckdns.org/fullchain.pem` |
| Private key path | `/etc/letsencrypt/live/functionsid.duckdns.org/privkey.pem` |

Verify renewal:

```bash
sudo certbot renew --dry-run
```

## PM2

Start or reload:

```bash
cd /opt/functionsid
./deploy/reload-app.sh
```

Check status:

```bash
pm2 status functionsid
sudo systemctl status pm2-opc --no-pager
```

The `pm2-opc` systemd unit is enabled for reboot recovery.

## GitHub Actions Deployment

Pushes to `main` run:

1. GitHub-hosted test job.
2. SSH deployment to the Oracle Linux VM.
3. Repository reset to `origin/main`.
4. `npm ci --omit=dev`.
5. Infrastructure and Oracle checks.
6. PM2 reload or start through `deploy/reload-app.sh`.

Required GitHub Secrets:

- `VM_HOST`
- `VM_PORT`
- `VM_USER`
- `VM_SSH_KEY`

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
curl -I https://functionsid.duckdns.org
```

## Reboot Verification

After a reboot, verify:

```bash
sudo systemctl is-active nginx
sudo systemctl is-active pm2-opc
pm2 status functionsid
curl -I https://functionsid.duckdns.org
cd /opt/functionsid && ./deploy/check-oracle.sh
```
