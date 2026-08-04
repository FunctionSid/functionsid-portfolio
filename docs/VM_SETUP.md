# Oracle Linux VM Setup

This document describes the VM preparation plan for FunctionSid. The VM should become deployment-ready without starting the application.

## Target Paths

| Item | Path |
|---|---|
| Application directory | `/opt/functionsid` |
| Production environment file | `/opt/functionsid/.env` |
| Oracle Wallet directory | `/opt/functionsid/wallet` |
| Releases directory | `/opt/functionsid/releases` |
| Shared directory | `/opt/functionsid/shared` |
| Logs directory | `/opt/functionsid/logs` |
| Temporary storage | `/opt/functionsid/storage/tmp` |

## Required Software

The deployment scripts install or verify:

- Git
- Node.js 24
- npm
- PM2
- Nginx
- Unzip
- Curl

## VM Preparation Script

Run from the repository directory on the VM:

```bash
cd /opt/functionsid
chmod +x deploy/*.sh
./deploy/install-vm.sh
```

The script:

- Installs missing packages.
- Installs Node.js 24 if needed.
- Installs PM2 if missing.
- Creates deployment directories.
- Prepares `/etc/nginx/conf.d/functionsid.conf.disabled`.
- Does not start the application.
- Does not reload PM2.
- Does not enable HTTPS.

## Project Update Script

```bash
cd /opt/functionsid
./deploy/update.sh
```

The script:

- Clones the repository if `/opt/functionsid/.git` is missing.
- Fetches `origin/main`.
- Resets to `origin/main`.
- Runs `npm ci --omit=dev`.
- Warns if `/opt/functionsid/.env` is missing.
- Verifies every required Oracle Wallet file under `/opt/functionsid/wallet`.
- Does not start the application.

## Check Scripts

```bash
./deploy/check.sh
```

These scripts verify infrastructure only.

## Oracle Wallet Copy

Production wallet destination:

```bash
/opt/functionsid/wallet
```

Copy the already verified wallet from the Windows development machine. Do not create a new wallet and do not commit wallet files to Git.

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

After copying:

```bash
sudo chown -R opc:opc /opt/functionsid/wallet
chmod 700 /opt/functionsid/wallet
ls -la /opt/functionsid/wallet
```

The production `.env` should use:

```env
DB_WALLET_DIR=/opt/functionsid/wallet
TNS_ADMIN=/opt/functionsid/wallet
```

## Production `.env`

Create manually:

```bash
nano /opt/functionsid/.env
chmod 600 /opt/functionsid/.env
```

Use `.env.example` as the template. Never commit the real `.env`.

## Nginx Preparation

Prepared but disabled config:

```text
/etc/nginx/conf.d/functionsid.conf.disabled
```

Do not rename or enable it until the application is ready to start.

## PM2 Later

After `.env` and wallet are present and verified:

```bash
cd /opt/functionsid
pm2 start ecosystem.config.js --env production
pm2 save
```

Do not run these commands during VM preparation.

## Rollback Preparation

To prepare files for rollback without restarting the application:

```bash
cd /opt/functionsid
./deploy/rollback.sh HEAD~1
```

PM2 is not restarted by the rollback script.
