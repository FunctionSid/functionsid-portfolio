# FunctionSid Git and GitHub Setup

This document records the verified Git and GitHub setup for the FunctionSid project. It is intended to help recreate the repository configuration on another machine without guessing.

Verification date: 2026-08-04

## 1. Repository Information

| Item | Verified value |
|---|---|
| GitHub owner | `FunctionSid` |
| Repository name | `functionsid-portfolio` |
| Repository URL | `https://github.com/FunctionSid/functionsid-portfolio` |
| Default branch | `main` |
| Visibility | Public |
| Remote name | `origin` |
| Remote URL | `https://github.com/FunctionSid/functionsid-portfolio.git` |

Verification commands used:

```bash
git remote -v
git branch -vv
git ls-remote --heads origin
```

Repository visibility and default branch were verified from the GitHub repository API for `FunctionSid/functionsid-portfolio`.

## 2. Git Repository Status

| Item | Verified status |
|---|---|
| Git initialized | Yes |
| Current branch | `main` |
| Branch renamed to `main` | Current branch is verified as `main`; the historical rename operation itself is not visible from current repository configuration. |
| Initial commit created | Yes |
| Initial/latest commit hash | `9c9f059fb3d80bfbebefe27633f707b2bc52da0b` |
| Short commit hash | `9c9f059` |
| Commit message | `Initial FunctionSid portfolio website` |
| Commit author | `Siddharth Kalantri` |
| Commit date | `2026-08-04 19:00:46 +0530` |
| Tracking branch | `origin/main` |
| Current repository status before this documentation update | Clean working tree |

Verified branch output:

```text
main 9c9f059 [origin/main] Initial FunctionSid portfolio website
```

## 3. Git Ignore Verification

The project uses `.gitignore` to keep secrets, dependencies, generated files, local runtime files, and private infrastructure material out of Git.

| Pattern from `.gitignore` | Why it is ignored |
|---|---|
| `.env` | Local runtime secrets and machine-specific configuration must not be committed. |
| `.env.*` | Local environment variants may contain secrets. |
| `!.env.example` | The safe example environment file is intentionally allowed in Git. |
| `node_modules/` | Installed dependencies are restored with `npm ci` or `npm install`; committing them bloats the repository. |
| `logs/` | Runtime logs can contain local paths, operational details, or sensitive request context. |
| `storage/tmp/` | Temporary runtime files should not be versioned. |
| `releases/` | VM release artifacts are generated deployment state, not source code. |
| `shared/wallet/` | Legacy or alternate Oracle Wallet location must never be committed. |
| `wallet/` | Oracle Wallet folders must never be committed. |
| `oracle-wallet/` | Alternate Oracle Wallet folder names must never be committed. |
| `public/uploads/*` | Uploaded runtime assets are environment-specific and should not be committed by default. |
| `*.log` | Log files are generated output and may contain sensitive details. |
| `*.sso` | Oracle Wallet SSO files are private credentials. |
| `cwallet.sso` | Oracle Wallet credential file. |
| `ewallet.p12` | Oracle Wallet credential file. |
| `keystore.jks` | Oracle Wallet Java keystore. |
| `truststore.jks` | Oracle Wallet Java truststore. |
| `tnsnames.ora` | Oracle Wallet/network configuration should not be committed with wallet material. |
| `ojdbc.properties` | Oracle JDBC wallet/configuration file. |
| `sqlnet.ora` | Oracle Wallet/network configuration file. |
| `*.key` | Private keys must never be committed. |
| `*.pem` | PEM keys/certificates can contain private material. |
| `*.p12` | PKCS#12 archives often contain certificates and private keys. |
| `*.crt` | Certificates are environment-specific and should be managed outside source control unless explicitly public. |
| `*.token` | Tokens are secrets. |
| `serviceAccountKey.json` | Firebase service account keys must not be committed. |
| `service-account*.json` | Firebase or cloud service account key pattern. |
| `firebase-adminsdk*.json` | Firebase Admin SDK service account key pattern. |
| `*-firebase-adminsdk-*.json` | Firebase Admin SDK downloaded key filename pattern. |
| `coverage/` | Test coverage output is generated. |
| `.DS_Store` | macOS filesystem metadata. |
| `Thumbs.db` | Windows filesystem metadata. |

Representative ignore verification was completed with:

```bash
git check-ignore -v -- .env
git check-ignore -v -- node_modules/package/file.js
git check-ignore -v -- logs/app.log
git check-ignore -v -- cwallet.sso
git check-ignore -v -- ewallet.p12
git check-ignore -v -- ewallet.pem
git check-ignore -v -- keystore.jks
git check-ignore -v -- truststore.jks
git check-ignore -v -- sqlnet.ora
git check-ignore -v -- tnsnames.ora
git check-ignore -v -- firebase-adminsdk-test.json
git check-ignore -v -- functionsid-site-efe0e-firebase-adminsdk-fbsvc-398dea7393.json
git check-ignore -v -- private.key
git check-ignore -v -- cert.pem
git check-ignore -v -- cert.p12
git check-ignore -v -- cert.crt
git check-ignore -v -- storage/tmp/test.tmp
git check-ignore -v -- public/uploads/image.png
```

## 4. Files Uploaded

The initial commit contains 132 tracked files. The committed project content is summarized by category below.

| Category | Committed content summary |
|---|---|
| Configuration | Express, app, database, Firebase, i18n, logger, PM2 ecosystem, package files, and environment example. |
| Controllers | Public, authentication, admin, API, upload, message, dashboard, and foundation controllers. |
| Routes | Public routes, admin routes, and API routes. |
| Services | Public site content, localization, authentication, contact, content, foundation, dashboard, and upload services. |
| Repositories | Oracle-backed repositories for admin, contact, content, files, schema, and Oracle utilities. |
| Views | EJS templates for public pages, project detail, errors, admin screens, shared partials, and foundation page. |
| Public assets | Resume PDF, images, local SVG contact icons, frontend JavaScript, and global CSS. |
| CSS | Global design system CSS in `public/css/style.css`. |
| JavaScript | Public behavior, public Google auth, and admin Google login scripts. |
| Images | Project images, profile/portrait images, and FunctionSid logo. |
| Icons | Local SVG icons for email, WhatsApp, Telegram, and GitHub. |
| Tests | Node test files for auth middleware, routes, validation, and Oracle CRUD. |
| Documentation | Project documentation in `docs/`, `README.md`, and VM context files. |
| Localization | English, Hindi, and Marathi locale JSON files. |
| GitHub Workflows | Oracle VM deployment workflow in `.github/workflows/deploy.yml`. |
| Database scripts | Oracle database initialization script in `scripts/init-db.js`. |
| Utilities | Shared validation helpers. |

## 5. Files Not Uploaded

The following categories are verified as excluded from Git:

| Excluded item | Verification source |
|---|---|
| `.env` | Ignored by `.gitignore`; verified with `git check-ignore`. |
| `.env.*` local variants | Ignored by `.gitignore`; `.env.example` is the only exception. |
| `node_modules/` | Ignored by `.gitignore`; verified with `git check-ignore`. |
| `logs/` | Ignored by `.gitignore`; verified with `git status --ignored --short`. |
| Oracle Wallet files | Wallet patterns are ignored, including `cwallet.sso`, `ewallet.p12`, `ewallet.pem`, `keystore.jks`, `truststore.jks`, `sqlnet.ora`, and `tnsnames.ora`. |
| Firebase credentials | Firebase service account JSON patterns are ignored. |
| Private certificates | `*.key`, `*.pem`, `*.p12`, and `*.crt` are ignored. |
| Secrets and tokens | `.env`, `.env.*`, and `*.token` are ignored. |
| Coverage output | `coverage/` is ignored. |
| Temporary folders | `storage/tmp/` is ignored. |
| Runtime uploads | `public/uploads/*` is ignored. |

Tracked-file verification found no committed `.env`, `node_modules`, logs, Oracle Wallet files, Firebase service account JSON files, private keys, private certificates, or coverage folders.

## 6. GitHub Actions

| Item | Current value |
|---|---|
| Workflow filename | `.github/workflows/deploy.yml` |
| Workflow name | `Deploy to Oracle Cloud VM` |
| Trigger | Push to `main` and manual `workflow_dispatch` |
| Purpose | Run tests, prepare the Oracle VM over SSH, clone/reset `/opt/functionsid`, install production dependencies, and verify infrastructure. |
| SSH action | `appleboy/ssh-action@v1.0.3` |
| VM username | Read from `VM_USER` GitHub Secret. Expected value is usually `opc`. |
| Remote project path | `/opt/functionsid` |
| PM2 process name | `functionsid` |
| Current deployment status | Workflow file exists. Deployment still requires Oracle VM setup and repository secrets. The workflow does not start or reload the app. |

Workflow script:

```yaml
git clone https://github.com/FunctionSid/functionsid-portfolio.git /opt/functionsid
cd /opt/functionsid
git fetch origin main
git reset --hard origin/main
npm ci --omit=dev
./deploy/update.sh
./deploy/check.sh
```

Required GitHub repository secrets referenced by the workflow:

| Secret | Purpose |
|---|---|
| `VM_HOST` | Oracle VM host/IP used for SSH deployment. |
| `VM_PORT` | SSH port, normally `22`. |
| `VM_USER` | SSH username, normally `opc`. |
| `VM_SSH_KEY` | Private key used by GitHub Actions to SSH into the Oracle VM. |

The workflow is not fully functional until the Oracle VM and SSH access are configured. The production `.env` and Oracle Wallet are required before the website can be started, but the preparation workflow intentionally does not expect them yet.

## 7. Deployment Readiness

Completed:

- [x] Local Windows development working
- [x] Oracle Database connected
- [x] GitHub repository created
- [x] Initial push completed
- [x] GitHub Actions workflow file committed

Pending:

- [ ] Oracle VM
- [ ] PM2
- [ ] Nginx
- [ ] HTTPS
- [ ] DNS
- [ ] Production Wallet
- [ ] Production `.env`
- [ ] GitHub repository secrets
- [ ] End-to-end deployment pipeline verification

Production wallet note:

- Local Windows wallet path: `D:\project\Oracle\Wallets\SIDCORE`
- Oracle Linux wallet path: `/opt/functionsid/wallet`
- The wallet must never be committed to Git.

## 8. Useful Git Commands

| Command | When to use it |
|---|---|
| `git status` | Check the current branch, changed files, staged files, and repository cleanliness. |
| `git pull origin main` | Update the local `main` branch from GitHub before starting work or on the server during deployment. |
| `git add .` | Stage all current file changes for the next commit. Review `git status` first. |
| `git commit -m "message"` | Save staged changes into Git history with a clear message. |
| `git push origin main` | Upload local commits on `main` to GitHub. |
| `git log --oneline --decorate -n 10` | Review recent commits and branch pointers. |
| `git branch -vv` | Show local branches, latest commits, and tracking branches. |
| `git remote -v` | Confirm the configured GitHub remote URLs. |
| `git restore <file>` | Discard local changes to a specific tracked file when the change is not needed. Use carefully. |
| `git restore --staged <file>` | Unstage a file while keeping the local edits. |
| `git reset --soft HEAD~1` | Undo the last commit while keeping changes staged. Use only when a local commit has not been shared or when the team agrees. |
| `git reset --hard` | Destructive reset that discards local changes. Avoid unless there is a clear recovery reason and a backup or approval. |

## 9. Repository Rules

- Never commit `.env`.
- Never commit Oracle Wallet files.
- Never commit Firebase service account keys.
- Never commit private keys, certificates, or tokens.
- Never commit `node_modules/`.
- Never commit logs or generated coverage output.
- Keep `.env.example` safe and free of real secrets.
- Always run tests locally before pushing when code changes affect runtime behavior.
- Push only working code to `main`.
- Keep Oracle database access centralized through the configured application architecture.
- Keep production secrets in environment variables or GitHub Secrets, not in source files.
- Review `git status` before every commit.

## 10. Next GitHub Tasks

- [ ] Configure Repository Secrets
- [ ] Configure Oracle VM deployment
- [ ] Configure GitHub Actions deployment
- [ ] Verify deployment pipeline
- [ ] Verify automatic deployment after push
- [ ] Protect `main` branch (optional)

Recommended repository secrets for the current workflow:

- [ ] `VM_HOST`
- [ ] `VM_PORT`
- [ ] `VM_USER`
- [ ] `VM_SSH_KEY`

Additional production secrets may be needed on the Oracle VM in the production `.env`, including Oracle database, Firebase, SMTP, session, and application settings. These should not be added to Git.
