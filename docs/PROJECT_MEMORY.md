# Permanent AI Project Memory

This file serves as the long-term memory for any AI working on this project. Every task must read this document and update it upon completion of significant work.

## Project Goals
Build a production-quality personal portfolio website that is:
- Fully Accessible (WCAG 2.2 AA target)
- Maintainable and modular
- Well documented across all dimensions
- Optimized for Oracle Cloud Infrastructure (OCI) low-memory Linux VM
- Fully compatible with Windows 11 development and Oracle Linux production (cross-platform Node.js APIs)
- AI-friendly and future-proof

## Owner Information & Brand Identity
- **Brand Name:** FunctionSid
- **Personal Name:** Siddharth Dilip Kalantri
- **Professional Identity:** Accessibility Engineer • Node.js Developer • Cloud & AI
- **Official Logo:** `/images/functionsid-logo.png` (`public/images/functionsid-logo.png`)
- **Administrator Email:** functionsid@gmail.com (configured as `ADMIN_EMAIL=functionsid@gmail.com`)
- **Public Contact Email:** siddharth@kalantri.in
- **Phone / Messaging:** +91 8983330673 (WhatsApp & Telegram)
- **Location:** Bhiwandi, Maharashtra, India
- **Assistive Tech:** 20+ years screen reader power-user (NVDA, JAWS)

## Primary Technologies
- **Backend:** Node.js 24, Express
- **Templating:** EJS (`partials/header.ejs`, `partials/footer.ejs`)
- **Frontend:** Bootstrap 5 (custom trimmed + dark mode), Vanilla JavaScript, semantic HTML
- **Database:** Oracle Autonomous Database (`SIDCORE` 19c OLTP Always Free, thin driver)
- **Authentication:** Firebase Auth (Google Sign-In) + `firebase-admin` server-side token verification
- **Process Manager:** PM2 (`--max-memory-restart 200M`)
- **Reverse Proxy:** Nginx
- **HTTPS:** Planned with Certbot / Let's Encrypt after VM, DNS, production `.env`, and Oracle Wallet readiness.
- **Email Notifications:** Nodemailer (SMTP for contact forms)
- **Middleware & Utilities:** `helmet`, `express-rate-limit`, `compression`, `morgan`, `winston`, `dotenv`

## Current Deployment & VM Environment
- **Provider:** Oracle Cloud Infrastructure (OCI)
- **VM Shape:** `VM.Standard.E2.1.Micro`
- **Processor:** AMD EPYC (x86_64 architecture)
- **vCPUs:** 2 vCPUs
- **Memory:** 1 GB RAM + 4 GB swapfile
- **OS:** Oracle Linux 9.8 (Package Manager: DNF)
- **Dev OS:** Windows 11 (`http://localhost:3000`)
- **DNS / Public IP:** `functionsid.duckdns.org` (`80.225.255.82`)

## Decisions Architecture & Constraints

### Coding Decisions
- Must use pure portable Node.js code.
- Always use forward slashes (`/`) for project paths. Never assume Windows path separators.
- Never use Windows-only APIs or hardcode absolute paths.
- Python code must be displayed without comments.
- SQL queries must be single-line when possible.

### Accessibility Decisions
- WCAG 2.2 AA non-negotiable compliance across all pages.
- Keyboard-first operability; never disable visible focus indicators (`:focus-visible`).
- Exactly one `<h1>` heading per page.
- ARIA live regions (`aria-live="polite"`) for alerts, form messages, and dynamic updates.
- Tested specifically for NVDA and JAWS screen readers.
- Dynamic `<html lang="...">` attribute updates via language switcher.

### Design Decisions
- Premium software company feel inspired by Microsoft, GitHub, Vercel, Stripe, and Apple. Clean, modern, professional, minimal.
- Professional Blue theme with CSS tokens for Dark Mode (Very Dark Charcoal `#0f172a`, Dark Slate Gray `#1e293b`, Azure Blue `#2563eb`, Teal `#0d9488`) and Light Mode (Soft White `#f8fafc`, Pure White `#ffffff`).
- Automatic OS theme matching (`prefers-color-scheme`) with manual toggle override.
- Typography: Inter (English), Noto Sans Devanagari (Hindi/Marathi).
- Icons: Lucide Icons exclusively (never mix icon styles).
- Images: 16:9 aspect ratios, professional crop, no stretching, meaningful alt text.
- Strictly forbidden: Flashy/neon/cyberpunk styles, particle backgrounds, 3D scenes, or heavy JS scrolljacking animations.

### Database Decisions
- Database host: Oracle Autonomous Database (`SIDCORE_HIGH` service alias).
- Oracle Autonomous Database is the only FunctionSid database for Windows local development and Oracle Linux production.
- Administrative database user: `ADMIN` is used only for initial Oracle schema creation and administration.
- Application schema user: `FUNCTIONSID` (never use `ADMIN` for normal application runtime queries).
- `FUNCTIONSID` uses `DB_PASSWORD`; use the current Oracle `ADMIN` password for this schema unless a separate approved schema password is documented later.
- Small connection pool size: 3–5 max connections to respect Always Free ECPU limits.
- Do not use SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, or any other replacement database for FunctionSid.
- Use the official Oracle Node.js Driver (`oracledb`) with centralized pooling.
- All Oracle connections must originate from `config/database.js`.
- Required data-access flow: Routes → Controllers → Services → Repositories → Oracle Autonomous Database.
- Controllers must never contain SQL. Business logic belongs in services. SQL belongs only in repositories.

### Deployment Decisions
- Production runs ONLY on one Oracle Cloud VM (`VM.Standard.E2.1.Micro`, AMD EPYC, x86_64, 2 vCPUs, 1 GB RAM, 4 GB Swap, Oracle Linux 9.8).
- Deployment preparation pipeline: `Windows 11 → Git → GitHub (FunctionSid/functionsid-portfolio on main) → GitHub Actions → Oracle Linux VM → /opt/functionsid → npm ci --omit=dev → infrastructure checks`. PM2 start/reload is deferred until production `.env` and Oracle Wallet are present and verified.
- Architecture: Monolithic Node.js native. [Historical Note: Container technologies (Docker, Podman, Kubernetes) were permanently rejected in favor of PM2 for memory efficiency].
- Memory protection: PM2 restart ceiling set to `200M`.

## Completed Work
- Phase 1 Analysis completed.
- Initial specifications (`PROJECT_SPEC.md`, `VM_CONTEXT.md`, `projects_documentation.md`) reviewed and verified.
- Infrastructure references updated to Oracle Linux 9.8 AMD EPYC x86_64 VM.
- Comprehensive documentation directory (`docs/`) established with 14 standardized documentation files.
- Project consistency audit synchronized administrator email, PM2 process name, production directory, deployment pipeline, Firebase usage, Oracle-only database architecture, roadmap phase labels, image references, and security baseline files.
- Phase 1 Foundation completed: Express app shell, EJS shared layout, responsive navigation framework, theme system, localization foundation, middleware, logging, Oracle database pool configuration, repository layer foundation, service layer foundation, controller layer foundation, route structure, and required architecture folders.
- Runtime configuration completed: `.env.example` now includes Oracle, SMTP, and Firebase variables; Oracle runtime schema is `FUNCTIONSID`; `ADMIN` is reserved for initial schema setup only.
- Phase 2 public website completed: Home, About, Services, Projects, individual project pages, Skills, Certifications, Resume, Contact, Accessibility Statement, Privacy Policy, responsive public navigation, refined footer, accessible certification tabs, contact form UI preview, and 404 content. Oracle Database, Firebase Authentication, Admin Dashboard, comments, deployment, PM2, Nginx, and GitHub Actions remain untouched for Phase 3.

## Pending Work
- Phase 2 public website owner review and any requested content refinements.
- Implementation of Google Sign-in Firebase token verification middleware.
- Implementation of moderated comment system for projects.
- Implementation of protected Admin dashboard and inbox table.
- Automated and manual accessibility verification testing.

## Things AI Should Never Change
- NEVER replace, alter, or remove the official FunctionSid logo at `/images/functionsid-logo.png` without explicit owner permission.
- NEVER invent personal background, project details, or certifications for Siddharth.
- NEVER advertise prohibited skills (iOS Accessibility Testing, Azure Solutions Architect, AWS Solutions Architect, Enterprise DevOps Consulting, Machine Learning Consulting, Cybersecurity Consulting). [Historical Note: Kubernetes Consulting was also removed as a service].
- NEVER state that Siddharth is available for on-site / relocation work (strictly REMOTE opportunities only).
- NEVER hardcode secrets, passwords, tokens, or wallet credentials in code or git.
- NEVER remove accessibility features, ARIA attributes, or keyboard focus outlines.
- NEVER use backslashes (`\`) for file path strings in code or documentation.
- NEVER introduce heavy dependencies or increase database pool size beyond 5 connections.
