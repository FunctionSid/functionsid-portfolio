# Permanent Rules for AI Assistants

This document contains permanent, non-negotiable instructions for every AI assistant (including Antigravity, Claude, ChatGPT, Gemini, Copilot, etc.) working on this project.

---

## 1. Documentation & Memory First
- **ALWAYS READ DOCUMENTATION FIRST:** Read all relevant documents in `docs/` before making any code modifications or additions. Treat the documentation as the project's source of truth. Keep documentation synchronized with implementation.
- **NEVER INVENT FACTS:** Never invent features, work experience, education, projects, certifications, or personal history. Rely strictly on existing documentation.
- **PROJECT SCOPE:** FunctionSid is the ONLY application being deployed. Projects like LawGPT or AgriQuery are case studies, not standalone deployed apps on this VM. If future projects become standalone, deploy them independently.
- **UPDATE PROJECT MEMORY:** Always update `docs/PROJECT_MEMORY.md` and `docs/CHANGELOG.md` after completing significant development tasks.

---

## 2. Accessibility Compliance (WCAG 2.2 AA)
- **ACCESSIBILITY IS NON-NEGOTIABLE:** Every page and UI component must meet WCAG 2.2 AA standards.
- **PRESERVE KEYBOARD NAVIGATION:** Every interactive control must be 100% keyboard operable (`Tab`, `Enter`, `Space`).
- **VISIBLE FOCUS RINGS:** NEVER remove visible focus outlines (`outline: none` without replacement is forbidden).
- **SCREEN READER SUPPORT:** Ensure full compatibility with NVDA and JAWS screen readers. Use semantic HTML, explicit labels, logical heading hierarchies (single `<h1>` per page), and ARIA live regions (`aria-live="polite"`).

---

## 3. Platform & Infrastructure Rules
- **SINGLE ORACLE CLOUD VM:** Production runs ONLY on one Oracle Cloud VM (`VM.Standard.E2.1.Micro`, AMD EPYC, x86_64, 2 vCPUs, 1 GB RAM, 4 GB Swap, Oracle Linux 9.8).
- **ARCHITECTURE:** One Git repository, one Node.js application, one PM2 process, one Nginx configuration, one Oracle VM, one Duck DNS domain. [Historical: Zero containers].
- **DEPLOYMENT WORKFLOW:** Deployment preparation is strictly `Windows 11 → Git → GitHub (FunctionSid/functionsid-portfolio on main) → GitHub Actions → Oracle Linux VM → /opt/functionsid → npm ci --omit=dev → infrastructure checks`. Do not start or reload PM2 until production `.env` and Oracle Wallet are present and verified.
- **ONLY DATABASE:** Oracle Autonomous Database is the official and only database for FunctionSid in both Windows local development and Oracle Linux production. Do not replace it with SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, or any other database.
- **DATABASE LAYERING:** All Oracle connections must originate from the centralized database module (`config/database.js`). Controllers must never contain SQL. Business logic belongs in services. SQL belongs only in repositories.
- **PORTABLE NODE.JS CODE:** Always preserve cross-platform compatibility between Windows development (`http://localhost:3000`) and Oracle Linux deployment. Never use Windows-only APIs.
- **FORWARD SLASHES ONLY:** Always use forward slashes (`/`) in path strings, import paths, and view templates. Never use Windows backslashes (`\`) or assume Windows drive letters.
- **NO HARDCODED SECRETS:** Never hardcode passwords, API keys, Firebase secrets, tokens, or wallet locations. Always use environment variables (`process.env`).
- **LOW MEMORY OPTIMIZATION:** The target server has only 1 GB RAM. Avoid unnecessary heavy dependencies, keep memory footprints under 150 MB, and set PM2 restart limit `--max-memory-restart 200M`.

---

## 4. User-Specific Output Rules (Owner Guidelines)
- **PYTHON CODE:** Always display Python code without comments.
- **SQL CODE:** Always write single-line SQL queries whenever possible.
- **TABLES:** Format data tables cleanly for screen reader ease of parsing and direct copy-paste into Excel.
- **UNITS & LOCALE:** Use metric system, Celsius temperature, and Indian Standard Time (IST).

---

## 6. FunctionSid Brand Identity & Logo Rules
- **OFFICIAL LOGO REUSE:** Always reuse the official FunctionSid logo asset located at `/images/functionsid-logo.png`.
- **NO LOGO ALTERATION:** Never redesign, replace, or remove the official logo without explicit project owner permission. Do not redesign branding.
- **PROFILE PHOTOGRAPH RULE:** The official profile photograph is used ONLY on the About page. Never place the profile photograph on the homepage. The homepage focuses on projects, services, skills, accessibility, and professional branding.
- **DESCRIPTIVE ALT TEXT MANDATE:** Every logo instance rendered in HTML/EJS MUST have descriptive `alt` text: `alt="FunctionSid logo — Siddharth Kalantri, Accessibility Engineer, Node.js Developer, Cloud & AI"`.
- **BRAND CONFORMITY:** Preserve FunctionSid brand colors (Azure Blue, Dark Charcoal, Off-White), typography (Inter / Noto Sans Devanagari), padding clear space, and responsive scaling rules.

---

## 7. Architecture Preservation & Optimization Rules
Future AI assistants MUST preserve the documented architecture:
- **Preserve Folders:** Do not rename folders. Do not remove the `logs` folder. Do not remove the `storage` folder.
- **Preserve Workflow:** Do not redesign deployment. Do not redesign logging.
- **Oracle Free Optimization:** Always optimize for Oracle Cloud Always Free. Favor simplicity. Favor low RAM usage. Favor low CPU usage.
