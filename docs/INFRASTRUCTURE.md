# Infrastructure & Deployment Architecture

This document is the single source of truth for infrastructure, authentication, deployment, hosting, DNS, Firebase, security, and cloud architecture.

**Important Directives:**
- Do not redesign the project.
- Do not invent information.
- Do not replace any technology.
- Treat this document as authoritative.

---

## 1. Project
- **Project Name:** FunctionSid
- **Repository:** functionsid-portfolio
- **Application Type:** Node.js Portfolio Website
- **Current Status:** Development

## 2. Purpose
FunctionSid is my personal portfolio website.
The website showcases:
- About Me
- Skills
- Services
- Certifications
- Portfolio Projects
- Resume
- Contact

*Note: Projects such as LawGPT, AgriQuery, DECtalk NVDA Bridge, Stream-Ripper and future projects are portfolio entries. They are not standalone deployed applications unless documented in the future.*

## 3. Local Development
- **Operating System:** Windows 11
- **Runtime:** Node.js 24
- **Development URL:** `http://localhost:3000`
- **Development Tools:** Visual Studio Code, PowerShell 7, Git, GitHub
- **Oracle Wallet:** `D:\project\Oracle\Wallets\SIDCORE`
- **Environment File:** Project root `.env`

**Constraints:**
- The same codebase must run on Windows and Oracle Linux.
- Never use Windows-only APIs.
- Never hardcode Windows paths.

## 4. Production
- **Cloud Provider:** Oracle Cloud Infrastructure (OCI)
- **Operating System:** Oracle Linux Server 9.8
- **Instance:** siddharth-amd-vm
- **Architecture:** AMD EPYC x86_64
- **Application Directory:** `/opt/functionsid`
- **Oracle Wallet:** `/opt/functionsid/wallet`
- **Environment File:** `/opt/functionsid/.env`
- **Reverse Proxy:** Nginx
- **Process Manager:** PM2
- **Deployment:** GitHub Actions

## 5. Network & DNS
- **Public IPv4:** `80.225.255.82`
- **Temporary Domain:** `functionsid.duckdns.org`
  
*Note: Duck DNS is temporary. Future domains may include `functionsid.com` or `functionsid.dev`. Application code must never depend on the current domain.*

## 6. Deployment Pipeline
```text
Windows
   ↓
Git
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Oracle Linux VM
   ↓
/opt/functionsid
   ↓
npm ci --omit=dev
   ↓
Infrastructure checks
   ↓
Nginx
   ↓
future DNS/HTTPS
```

## 7. Firebase Integration
- **Firebase Project:** functionsid-site
- **Project ID:** functionsid-site-efe0e
- **Purpose:** Authentication only
- **Disabled/Unused Services:** Firebase Hosting, Firestore, Realtime Database, Storage, Cloud Functions, Cloud Messaging, Crashlytics.

## 8. Authentication
- **Authentication Provider:** Firebase Authentication
- **Sign-In Provider:** Google

The website supports three roles:
1. Guest
2. User
3. Administrator

### Guest
No login required. Guests may:
- Browse the website
- View projects
- Download resume
- View services
- View certifications

### User
Users authenticate using Google Sign-In (optional). Users may:
- Submit contact forms
- Post comments
- Edit their own comments
- Delete their own comments
- Receive future notifications
- Participate in future community features

*Contact Form Automation: The contact form should automatically populate Display Name, Email Address, and Profile Picture from the authenticated Google account. Users should only type their message.*

### Administrator
- **Current Primary Administrator:** functionsid@gmail.com
- Administrators authenticate using Google Sign-In.
- **Security Rule:** The backend determines administrator access. Never trust frontend role checks.
- **Current Authorization Rule:** If authenticated email equals the configured administrator email, assign Administrator role. Otherwise, assign User role.
- **Configuration:** Use `ADMIN_EMAIL=functionsid@gmail.com`. Do not hardcode administrator emails throughout the application.

## 9. Role Hierarchy
```text
Guest
  ↓
User
  ↓
Administrator
```
*Authorization is always enforced by the Node.js backend. Firebase Authentication verifies identity. The backend determines permissions.*

## 10. Authorized Domains
- `localhost`
- `functionsid.duckdns.org`
- `functionsid-site-efe0e.firebaseapp.com`
- `functionsid-site-efe0e.web.app`

*Future custom domains should be added when purchased. Do not authorize Oracle VM IP addresses.*

## 11. Admin Area
- **Future URL:** `/admin`
- Only administrators may access it.

Features may include:
- Manage projects, services, certifications, and portfolio content.
- Read contact messages.
- Moderate comments.
- Upload images.
- Website settings.

## 12. Logging Architecture
- **Application Logs:** Rotate at 10 MB. Compress old logs. Delete after 30 days.
- **PM2 Logs:** Managed by `pm2-logrotate`. Keep the last 10 rotated log files.
- **Nginx Logs:** Managed by `logrotate`. Delete access logs after 30 days. Delete error logs after 60 days.
- **Temporary Storage:** Automatically remove temporary files older than 7 days. Permanent files are never deleted automatically.

## 13. Project Structure
- **Production Folder:** `/opt/functionsid`

**Important Folders:**
- `public`
- `views`
- `routes`
- `controllers`
- `middleware`
- `repositories`
- `services`
- `scripts`
- `docs`
- `logs`
- `storage`

## 14. Security
**Never commit:**
- `.env`
- Secrets
- API keys
- Firebase credentials
- SSH private keys
- OAuth secrets
- GitHub tokens
- Deployment credentials

*Use environment variables for sensitive configuration.*

**Database runtime rule:** The application connects to Oracle Autonomous Database using the dedicated `FUNCTIONSID` schema. The Oracle `ADMIN` account is reserved only for initial database administration and schema setup.

## 15. Accessibility
Accessibility is a core requirement.
- **Support:** NVDA, JAWS
- **Navigation:** Keyboard-only navigation
- **Standards:** WCAG 2.2 AA, Semantic HTML
- **Features:** Accessible forms, dialogs, navigation, high contrast, and screen reader compatibility.

## 16. Multilingual Support
- **Support:** English, Hindi, Marathi
- All user-facing text must use localization.
- Never hardcode interface text.

## 17. Performance Optimization
Optimize for Oracle Cloud Always Free VM:
- Low RAM usage
- Low CPU usage
- Small JavaScript bundles
- Lazy loading
- Image optimization
- Caching
- Compression

---

## 18. AI Instructions
- Always read this document before generating code.
- Treat this document as the project's infrastructure specification.
- Do not redesign deployment.
- Do not replace Firebase Authentication.
- Do not replace Oracle Cloud.
- Do not replace PM2.
- Do not replace Nginx.
- Keep Windows development compatible with Oracle Linux deployment.
- Keep the architecture simple, lightweight and maintainable.
- Future services may be added without changing the overall architecture.
