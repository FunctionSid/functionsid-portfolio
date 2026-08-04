# GitHub Actions Deployment Pipeline

FunctionSid uses GitHub Actions to prepare the Oracle Linux VM for deployment. The workflow does not start the website.

## Workflow File

```text
.github/workflows/deploy.yml
```

## Triggers

- Push to `main`
- Manual `workflow_dispatch`

## Runner

```text
ubuntu-latest
```

## Workflow Jobs

### `test`

The test job runs first and must pass before any SSH deployment preparation happens.

Steps:

1. Checkout repository.
2. Install Node.js 24.
3. Cache npm through `actions/setup-node`.
4. Run `npm ci`.
5. Run `npm test`.

If tests fail, the workflow stops.

### `prepare-vm`

The VM preparation job runs only after `test` succeeds.

Steps:

1. Connect to the Oracle VM through SSH.
2. Clone the repository to `/opt/functionsid` if it does not exist.
3. Fetch `origin/main`.
4. Reset `/opt/functionsid` to `origin/main`.
5. Run the deployment helper scripts.
6. Install production dependencies with `npm ci --omit=dev`.
7. Verify repository, branch, latest commit, dependencies, Node.js, PM2, Nginx, deployment scripts, and Oracle Wallet files.

The job does not run:

```bash
pm2 start
pm2 reload
npm start
systemctl restart
```

## Required Repository Secrets

| Secret | Required | Description |
|---|---:|---|
| `VM_HOST` | Yes | Oracle VM public IP or hostname. |
| `VM_PORT` | Yes | SSH port, normally `22`. |
| `VM_USER` | Yes | VM SSH user, normally `opc`. |
| `VM_SSH_KEY` | Yes | Private key for SSH access from GitHub Actions. |

## Current Status

- Workflow file exists.
- Tests are configured.
- VM preparation scripts exist.
- Deployment still requires Oracle VM access and GitHub Secrets.
- Production `.env` and Oracle Wallet are required before VM verification can pass.

## Future Deployment Steps

After the VM is prepared:

1. Copy the Oracle Wallet to `/opt/functionsid/wallet`.
2. Create `/opt/functionsid/.env`.
3. Verify Oracle connectivity on the VM.
4. Enable the Nginx config.
5. Start PM2 manually.
6. Configure DNS.
7. Configure HTTPS later.
