# Application Architecture

## Architectural Overview

The portfolio website is constructed as a monolithic, server-side rendered Node.js web application utilizing Express and EJS. It is designed for low memory consumption, accessibility compliance, and secure cloud deployment.

```
+-----------------------------------------------------------------------+
|                            Client Browser                             |
|          (NVDA / JAWS Screen Reader, Desktop, Mobile, Tablet)         |
+-----------------------------------------------------------------------+
                                   |
                                   | HTTPS (Port 443)
                                   v
+-----------------------------------------------------------------------+
|                         Nginx Reverse Proxy                           |
|                  (SSL Termination via Let's Encrypt)                  |
+-----------------------------------------------------------------------+
                                   |
                                   | HTTP Proxy (localhost:3000)
                                   v
+-----------------------------------------------------------------------+
|                     Node.js Express App (PM2)                         |
|                                                                       |
|  +-------------------+  +--------------------+  +------------------+  |
|  | Helmet / Security |  | i18next Middleware |  | Rate Limiter     |  |
|  +-------------------+  +--------------------+  +------------------+  |
|  | Routes / Controllers | EJS Views & Partials | Firebase Admin   |  |
|  +-------------------+  +--------------------+  +------------------+  |
+-----------------------------------------------------------------------+
                                   |
                         Oracle Thin Driver (mTLS)
                                   v
+-----------------------------------------------------------------------+
|             Oracle Autonomous Database (SIDCORE)                     |
|           Tables: PROJECTS, COMMENTS, SESSIONS, MESSAGES              |
+-----------------------------------------------------------------------+
```

---

## Project Structure

The project follows a standard Express MVC-like structure, deployed on the Oracle Linux VM at `/home/opc/FunctionSid`.

```text
/home/opc/FunctionSid
├── public                 # Static assets (CSS, JS, images, fonts, PDF resume)
├── views                  # EJS templates and partials
├── routes                 # Express route definitions
├── controllers            # Request handlers and business logic
├── middleware             # Custom middleware (auth, rate limiting)
├── repositories           # Oracle SQL and data access modules
├── services               # External integrations (Firebase, Nodemailer)
├── scripts                # Database init and utility scripts
├── docs                   # Comprehensive project documentation
├── logs                   # Application logs, PM2 logs reference, Error logs
├── storage                # Future uploaded files, temp files, cache, backups
├── .env                   # Local and VM environment variables (NEVER committed)
├── package.json           # Node.js dependencies and scripts
└── ecosystem.config.js    # PM2 process configuration
```

- **logs**: Contains Application logs, PM2 logs reference, Deployment logs, Debug logs, and Error logs.
- **storage**: Reserved for Future uploaded files, Temporary generated files, Cache, Future exports, and Backups if ever required. The storage folder should remain empty until required.

---

## Technical Component Breakdown

### 1. View & Templating Layer
- **Engine:** EJS (Embedded JavaScript templates).
- **Partials:** Modular views in `views/partials/`:
  - `header.ejs`: Shared header, skip link, main navigation bar, dark mode toggle, language selector.
  - `footer.ejs`: Shared footer, accessibility summary, quick links, copyright.
- **Styling:** Custom Bootstrap 5 build with CSS variables for dark mode and accessibility contrast overrides.

### 2. Application Logic & Routing
- `routes/index.js`: Main public page routes (Home, About, Projects, Skills, Certifications, Blog, Contact, Accessibility Statement).
- `routes/auth.js`: Firebase Google Sign-In verification endpoint (`/auth/verify-token`) and logout handling.
- `routes/admin.js`: Protected admin dashboard routes (Project CRUD, comment moderation queue, inbox viewer).
- `routes/api.js`: Public API endpoints (Language switching, filtered project search).

Required request flow:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Oracle Autonomous Database
```

- Routes define endpoint mapping only.
- Controllers handle request and response coordination. Controllers must never contain SQL.
- Services contain business logic, validation orchestration, permissions orchestration, and workflow decisions.
- Repositories contain Oracle SQL and database access only.

### 3. Middleware Pipeline
- `helmet`: Security HTTP headers (CSP, HSTS, Frameguard).
- `compression`: Response Gzip compression.
- `express-rate-limit`: Prevents abuse on contact form submission (`/contact/send`) and project comment submissions (`/projects/:id/comment`).
- `express-session`: Session state backed by Oracle Database store.
- `i18next-http-middleware`: Handles multi-language localization (EN, HI, MR).

### 4. Database Layer
- Driver: `oracledb` thin mode (no Heavy Oracle Client Instant Client binaries required).
- Pool Management: Connection pool established at startup (`poolMin: 1, poolMax: 4, poolIncrement: 1`).
- Connection String: `sidcore_high` using Oracle Wallet credentials (`TNS_ADMIN`, `DB_WALLET_DIR`, and `DB_WALLET_PASSWORD`).
- Runtime Schema: the application connects as `FUNCTIONSID` through `DB_USER=FUNCTIONSID`.
- Administration: `ADMIN` is used only by initialization scripts to create or synchronize the `FUNCTIONSID` schema.
- Central Module: all Oracle connections originate from `config/database.js`.
- Official Database: Oracle Autonomous Database is the only FunctionSid database for Windows development and Oracle Linux production. Environment differences are configuration-only.
- Prohibited Replacements: do not use SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, or any other replacement database for FunctionSid.
- SQL Placement: keep SQL in repository modules only.

### 5. Authentication Flow
- **Client Side:** Firebase Auth SDK executes Google Sign-In on client browser.
- **Token Exchange:** Client sends Firebase ID Token to server route `/auth/verify-token`.
- **Server Verification:** `firebase-admin` SDK verifies ID token authenticity and retrieves user email.
- **Authorization Check:** Server verifies user email equals `process.env.ADMIN_EMAIL` for admin role granting. The current administrator account is `functionsid@gmail.com`.

### 6. Email Service
- `nodemailer` with SMTP configuration sending direct email notifications to `ADMIN_EMAIL=functionsid@gmail.com` upon contact form submission.

### 7. Logging Architecture
- **Lightweight Local Logging:** Do NOT implement centralized logging. Do NOT install Elasticsearch, OpenSearch, Loki, Graylog, or Splunk. The Oracle Always Free VM has limited resources.
- **Components:** Application logs, PM2 logs, Nginx logs, and GitHub Actions logs.
- **Future-proofing:** Design the logging system so centralized logging can be added later without changing the application code.
