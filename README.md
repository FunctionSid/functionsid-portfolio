# Siddharth Kalantri — Personal Portfolio Website

A production-quality, accessible, and lightweight personal portfolio website built with Node.js 22, Express, EJS, Bootstrap 5, and Oracle Autonomous Database.

---

## Technical Specifications & Architecture

### Production Infrastructure
- **Cloud Provider:** Oracle Cloud Infrastructure (OCI)
- **VM Shape:** `VM.Standard.E2.1.Micro` (Single VM instance)
- **CPU:** AMD EPYC (x86_64 architecture, 2 vCPUs)
- **RAM:** 1 GB RAM + 4 GB swapfile
- **Operating System:** Oracle Linux 9.8 (Package Manager: DNF)
- **Runtime:** Node.js 22 LTS
- **Process Manager:** PM2 (`--max-memory-restart 200M`)
- **Reverse Proxy:** Nginx (listening on 80/443, proxying to `localhost:3000`)
- **HTTPS:** Let's Encrypt + Certbot
- **Architecture:** Monolithic, server-side rendered.

### Development Environment
- **Development OS:** Windows 11
- **Local URL:** `http://localhost:3000`
- **Path Standard:** All file paths use portable forward slashes (`/`).
- **Compatibility:** The same codebase must work seamlessly on Windows 11 (development) and Oracle Linux (production) using cross-platform Node.js APIs.

### Database Architecture
- **Official Database:** Oracle Autonomous Database (`SIDCORE`, thin mode driver `oracledb`).
- **Runtime Schema:** `FUNCTIONSID` dedicated application schema.
- **Administration:** `ADMIN` is used only for initial schema setup, never for normal application runtime.
- **Connection Pool:** Small connection pool (max 3–5 connections).
- **Local Development:** Windows 11 development also connects to Oracle Autonomous Database through environment configuration. SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, and other replacement databases are not part of the FunctionSid database architecture.

### DNS & Networking
- **Temporary Domain:** `functionsid.duckdns.org`
- **Public IP:** `80.225.255.82`
- **Note:** Application code must not depend on the domain name.

### Deployment Workflow
GitHub Actions is the single source of deployment. Deployment is executed as:
```
Windows 11 → Git → GitHub (FunctionSid/functionsid on main) → GitHub Actions → Oracle Linux VM → npm ci → PM2 restart functionsid → Nginx → https://functionsid.duckdns.org
```

---

## Portfolio Projects
The Projects page displays project case studies only (e.g., LawGPT, AgriQuery, DECtalk NVDA Bridge, Stream-Ripper, A11Y Insights). These are documentation pages only, not standalone applications deployed within this VM.

---

## Security & Logging
- **Do Not Commit:** `.env`, `node_modules`, `logs`, SSH private keys, API keys, tokens, or credentials.
- **Monitoring & Logs:** Logs and system metrics (RAM, CPU, Swap, PM2, Nginx) are monitored directly on the Oracle Cloud VM.
- **Admin Authentication:** Firebase Google Sign-In verifies the configured administrator account. Oracle stores only the required administrator profile and activity records.
- **Content Management:** Phase 3 content modules are stored in Oracle and served through the existing Express/EJS public pages.

---

## Accessibility Standards
- **Target Standard:** WCAG 2.2 Level AA.
- **Screen Reader Support:** Tested for NVDA and JAWS screen readers.
- **Keyboard Operability:** 100% keyboard navigable with visible focus states.
- **Form Controls:** Explicit labels, ARIA live regions (`aria-live="polite"`), and clear heading hierarchy.

---

## Project Documentation (`docs/`)
Comprehensive documentation is maintained in the `docs/` directory:
- [PROJECT_CONTEXT.md](/docs/PROJECT_CONTEXT.md) — Personal story, background, and goals.
- [PROJECT_MEMORY.md](/docs/PROJECT_MEMORY.md) — Permanent AI memory and architecture decisions.
- [VM_CONTEXT.md](/docs/VM_CONTEXT.md) — Production VM context and specifications.
- [ARCHITECTURE.md](/docs/ARCHITECTURE.md) — System routing and component design.
- [ACCESSIBILITY.md](/docs/ACCESSIBILITY.md) — WCAG 2.2 AA and screen reader guidelines.
- [BRANDING.md](/docs/BRANDING.md) — FunctionSid brand identity, primary logo guidelines, color palette, and usage rules.
- [DESIGN_SYSTEM.md](/docs/DESIGN_SYSTEM.md) — Slate dark mode palette, typography, and spacing system.
- [SERVICES.md](/docs/SERVICES.md) — Freelance services catalog, remote availability, and supported cloud platforms.
- [UI_COMPONENTS.md](/docs/UI_COMPONENTS.md) — EJS and HTML component specifications.
- [DATABASE.md](/docs/DATABASE.md) — Oracle Autonomous DB schemas and DDL.
- [ADMIN_GUIDE.md](/docs/ADMIN_GUIDE.md) — Firebase administrator login, dashboard, CRUD modules, contact inbox, uploads, and API notes.
- [DEPLOYMENT.md](/docs/DEPLOYMENT.md) — Step-by-step Oracle Linux PM2/Nginx deployment guide.
- [SECURITY.md](/docs/SECURITY.md) — Secrets management, Firebase ID token auth, rate limiting.
- [CODING_STANDARDS.md](/docs/CODING_STANDARDS.md) — Node.js portability rules and SQL/Python guidelines.
- [ROADMAP.md](/docs/ROADMAP.md) — Planned implementation phases.
- [AI_RULES.md](/docs/AI_RULES.md) — Permanent operational rules for AI assistants.
- [CHANGELOG.md](/docs/CHANGELOG.md) — Version history and iteration tracking.
- [TODO.md](/docs/TODO.md) — Outstanding tasks and open items.
