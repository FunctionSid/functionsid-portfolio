# GitHub Actions Deployment Pipeline

FunctionSid uses GitHub Actions for production deployment to the Oracle Linux VM.

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
7. Verify repository, branch, latest commit, dependencies, Node.js, PM2, Nginx, deployment scripts, Oracle Wallet files, and Oracle connectivity.
8. Reload the `functionsid` PM2 process, or start it if it is not already running.

The job does not run `npm start`; production runtime is managed by PM2.

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
- Deployment requires the GitHub repository secrets listed below.
- Production `.env` and Oracle Wallet must remain on the VM and out of Git.
- Pushes to `main` automatically update `/opt/functionsid` and reload PM2.

## Future Deployment Steps

Operational checks:

1. Confirm the latest workflow run is successful.
2. Confirm `/opt/functionsid` is on `origin/main`.
3. Confirm `pm2 status functionsid` is online.
4. Confirm `https://functionsid.duckdns.org` loads.
