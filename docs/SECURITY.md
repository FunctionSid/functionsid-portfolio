# Security Architecture & Rules

## 1. Secrets & Credentials Isolation
- **NEVER COMMIT TO GIT:** The following must NEVER be committed to the repository: `.env`, `node_modules`, `logs`, private keys, SSH private keys, API keys, tokens, or credentials.
- **Environment Variables:** All secrets MUST be loaded strictly via `process.env` (managed locally via `.env` and via systemd/PM2 environment configs on the VM).
- **Git Ignore Safeguards:** `.env`, `.env.*`, `public/uploads/*`, `logs/`, and Oracle Wallet files (`*.sso`, `cwallet.sso`, `ewallet.p12`, `ewallet.pem`, `keystore.jks`, `truststore.jks`, `sqlnet.ora`, `tnsnames.ora`) MUST remain in `.gitignore`.

---

## 2. Authentication & Authorization Controls

### Firebase Admin Verification
- Client application authenticates via Firebase Google Sign-In.
- Express server validates Firebase ID Token using `firebase-admin.auth().verifyIdToken(idToken)`.

### Strict Admin Protection
- Admin endpoints (`/admin`, `/admin/*`) are protected by server-side email validation.
- User email MUST match the configured administrator email (`ADMIN_EMAIL=functionsid@gmail.com`). Authorization is NEVER granted based solely on general Google authentication.

---

## 3. Web Application Hardening

### Security HTTP Headers (`helmet`)
- Enable `helmet()` middleware to enforce security headers:
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security` (HSTS)
  - `Referrer-Policy: strict-origin-when-cross-origin`

### Rate Limiting (`express-rate-limit`)
- Contact form endpoint (`/contact/send`): Max 5 requests per IP per 15 minutes.
- Project comment endpoint (`/projects/:id/comment`): Max 10 requests per IP per 15 minutes.
- Global request ceiling to prevent DDoS/resource exhaustion on low-memory VM.

---

## 4. Input Validation & Data Sanitization
- Form inputs validated using `express-validator`.
- Sanitize HTML in comments and messages to prevent Cross-Site Scripting (XSS).
- Parameterized SQL bindings in Oracle DB queries to completely eliminate SQL Injection risks.

---

## 5. Least Privilege Infrastructure
- VM SSH access restricted to key pairs (`opc` user).
- Firewall permits only ports 22, 80, 443.
- Database runtime access uses the dedicated `FUNCTIONSID` schema. `ADMIN` is used only for initial schema administration and must never be used for normal application runtime.
