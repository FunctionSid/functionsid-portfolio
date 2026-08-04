# Project Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning.

---

## [0.4.0] - 2026-08-04

### Added
- Added production deployment reload script for PM2-managed deployments.
- Added live production operations guide in `docs/PRODUCTION.md`.
- Added `/journey` redirect to the About page journey section.

### Changed
- Updated GitHub Actions to deploy to the VM and reload or start the `functionsid` PM2 process after checks pass.
- Updated Nginx template for `functionsid.duckdns.org` with gzip and security headers.
- Updated deployment documentation for HTTPS, Certbot, PM2 startup, and recovery operations.

### Verified
- Verified `https://functionsid.duckdns.org` with Let's Encrypt HTTPS.
- Verified HTTP to HTTPS redirect.
- Verified PM2 and Nginx automatic recovery after reboot.
- Verified Oracle Wallet and Oracle database connectivity from Node.js on the VM.

---

## [0.3.0] - 2026-08-04

### Added
- Added GitHub Actions deployment-preparation workflow with `push` to `main` and manual `workflow_dispatch` triggers.
- Added VM deployment scripts under `deploy/` for installing prerequisites, updating the project, checking system, Node.js, Nginx, PM2, and preparing rollback files.
- Added disabled Nginx configuration template at `deploy/nginx/functionsid.conf.template`.
- Added `docs/GITHUB_ACTIONS.md` and `docs/VM_SETUP.md`.
- Added `docs/GITHUB_SETUP.md` to record verified GitHub repository configuration, ignore rules, uploaded file categories, and next GitHub tasks.

### Changed
- Updated deployment target path from `/home/opc/FunctionSid` to `/opt/functionsid`.
- Updated deployment runtime documentation and `package.json` engine requirement to Node.js 24.
- Updated `.env.example` production wallet placeholders to `/opt/functionsid/wallet`.
- Updated deployment documentation to clarify that PM2, Nginx reloads, HTTPS, and application startup are deferred until production `.env` and Oracle Wallet are copied to the VM.
- Updated GitHub Actions secret names to `VM_HOST`, `VM_PORT`, `VM_USER`, and `VM_SSH_KEY`.

### Verified
- Deployment scripts were checked with Bash syntax validation.
- GitHub Actions workflow was parsed as valid YAML.
- `npm test` passed locally.
- No application, PM2 process, Nginx reload, or system service restart was started during deployment preparation.

---

## [0.2.0] - 2026-08-03

### Added
- Implemented Phase 1 application foundation with a modular Express entrypoint.
- Added centralized application configuration in `config/app.js`.
- Added Winston logging foundation in `config/logger.js`.
- Added request context, global rate limiting, 404, and server error middleware.
- Added Phase 1 controller and service layer foundation.
- Added Oracle schema repository foundation so SQL remains in repositories.
- Added accessible EJS foundation shell with shared header, footer, responsive navigation, mobile navigation, theme controls, language switcher, and error views.
- Added localized Phase 1 shell strings for English, Hindi, and Marathi.
- Added required architecture folders: `controllers`, `middleware`, `repositories`, `services`, `logs`, and `storage`.
- Added `package-lock.json` through dependency installation.
- Added Firebase runtime configuration module for environment-driven Firebase Authentication settings.
- Added Phase 2 public website pages: Home, About, Services, Projects, individual project case studies, Skills, Certifications, Resume, Contact, Accessibility Statement, Privacy Policy, and refined 404 page.
- Added centralized public content data for documented profile, services, skills, certifications, timeline, and project case study content.
- Added accessible certification tab behavior, contact form preview messaging, print support for the resume page, and responsive public page layouts.

### Changed
- Refactored the app to use Routes → Controllers → Services → Repositories → Oracle Autonomous Database.
- Updated `config/database.js` to initialize and close the Oracle connection pool through the centralized module.
- Updated `scripts/init-db.js` to call the schema repository instead of storing SQL directly in the script.
- Updated global CSS and JavaScript for the Phase 1 design system, responsive navigation, theme switching, and localization controls.
- Updated global navigation and footer for the complete public website.
- Updated global CSS for Phase 2 layouts, project cards, case study sections, forms, tabs, responsive grids, and print styles.
- Updated `nodemailer` to `^9.0.3` to resolve npm audit advisories.
- Updated `.env.example` with complete Oracle, SMTP, and Firebase environment variables.
- Updated Oracle runtime configuration to use the dedicated `FUNCTIONSID` application schema.
- Updated Oracle initialization flow so `ADMIN` is used only to create or synchronize the `FUNCTIONSID` schema, while application tables are created as `FUNCTIONSID`.
- Updated database documentation to clarify minimum privileges for the `FUNCTIONSID` schema.

### Verified
- JavaScript syntax checks passed.
- Locale JSON validation passed.
- `npm audit --omit=dev` reported zero vulnerabilities.
- Application started successfully in local development mode.
- `/`, `/health`, localized `/?lang=hi`, and 404 behavior were verified.

---

## [0.1.1] - 2026-08-03

### Changed
- Synchronized administrator references to `ADMIN_EMAIL=functionsid@gmail.com`.
- Standardized the PM2 application name to `functionsid`.
- Standardized the production application directory to `/home/opc/FunctionSid`.
- Synchronized the deployment pipeline as `Windows 11 → Git → GitHub → GitHub Actions → Oracle Linux VM → PM2 → Nginx → functionsid.duckdns.org`.
- Clarified Firebase usage as Authentication only with Google Sign-In; Firebase Hosting, Firestore, Realtime Database, Storage, Cloud Functions, and Cloud Messaging are not used.
- Standardized FunctionSid database architecture as Oracle Autonomous Database only for both Windows local development and Oracle Linux production.
- Standardized the centralized Oracle database module name as `config/database.js`.
- Updated roadmap labels to the latest three-phase implementation strategy: Foundation, Public Website, and Authentication/Admin/Oracle/Deployment/Testing.
- Corrected documented image filenames to match existing assets.
- Added `.gitignore` and `.env.example` security baseline files.

---

## [0.1.0] - 2026-08-01

### Added
- Created central documentation directory `docs/`.
- Created `PROJECT_CONTEXT.md` detailing Siddharth's background, vision loss adaptation, screen reader experience, and portfolio goals.
- Created `PROJECT_MEMORY.md` as permanent long-term memory for AI coding tools.
- Created `VM_CONTEXT.md` detailing Oracle Linux 9.8 x86_64 AMD EPYC VM environment specifications.
- Created `ARCHITECTURE.md` establishing system routing, middleware pipeline, and database integration design.
- Created `ACCESSIBILITY.md` defining mandatory WCAG 2.2 Level AA requirements, screen reader rules (NVDA/JAWS), and keyboard-first standards.
- Created `BRANDING.md` establishing the official FunctionSid brand identity, primary logo (`/images/functionsid-logo.png`), usage rules, color palette, responsive guidelines, and accessibility alt text rules.
- Created `DESIGN_SYSTEM.md` establishing typography, slate/cyan dark mode color system, card styles, button targets, and CSS animations.
- Created `DATABASE.md` defining Oracle Autonomous Database schemas, single-line DDL statements, and connection pool guidelines.
- Created `DEPLOYMENT.md` detailing GitHub -> Oracle Linux VM deployment with PM2 and Nginx.
- Created `SECURITY.md` establishing secrets isolation, Firebase ID token verification, rate limiting, and security headers.
- Created `CODING_STANDARDS.md` specifying portable Node.js practices, forward-slash path rules, commentless Python, and single-line SQL.
- Created `ROADMAP.md` mapping out 7 development phases from foundation to cloud production.
- Created `AI_RULES.md` defining permanent operational constraints for AI assistants.
- Created `SERVICES.md` defining professional remote availability, 8-category freelance service catalog, supported cloud platforms (OCI & Azure), ideal opportunities, and prohibited skills list.
- Created `UI_COMPONENTS.md` defining accessible EJS and HTML component templates (skip link, header, project card, certifications tablist, forms, admin inbox table).
- Created `README.md` in project root providing architecture overview and documentation index.
- Created `CHANGELOG.md` for tracking project iterations.
- Created `TODO.md` tracking immediate and future tasks.

### Changed
- Standardized project documentation across all files to reflect single Oracle Cloud VM architecture (`VM.Standard.E2.1.Micro`, AMD EPYC x86_64, 2 vCPUs, 1 GB RAM, 4 GB Swap, Oracle Linux 9.8, PM2, Nginx).
- Removed all legacy references to Docker, Podman, Kubernetes, container images, Hugging Face Spaces, multi-cloud platforms, and ARM/Ampere shapes.
- Clarified deployment pipeline as strictly: `Windows 11 → Git → GitHub → GitHub Actions → Oracle Linux VM → PM2 → Nginx → functionsid.duckdns.org`.
- Explicitly defined Oracle Autonomous Database as the single FunctionSid database for production and local development.
- Updated database architecture guidance to make Oracle Autonomous Database the only FunctionSid database for both Windows local development and Oracle Linux production.
- Added the required data-access layering rule: Routes → Controllers → Services → Repositories → Oracle Autonomous Database.
- Clarified that controllers must never contain SQL and all SQL belongs only in repositories.
- Updated `docs/DESIGN_SYSTEM.md` with permanent premium software company design philosophy (Professional Blue theme, dual mode tokens, Inter & Noto Sans Devanagari typography, Lucide Icons, 16:9 images, zero flashy/neon elements, and mandatory AI enforcement rule).
