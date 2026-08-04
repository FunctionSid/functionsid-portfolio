# Outstanding Tasks & TODO List

## Immediate Tasks (Phase 1 Foundation)
- [x] Initialize `package.json` with Node.js 22 production dependencies.
- [x] Implement `config/database.js` Oracle Autonomous Database connection pool (`SIDCORE_HIGH`).
- [x] Create repository modules so all SQL lives outside routes, controllers, and services.
- [x] Create `scripts/init-db.js` to create database tables (`PROJECTS`, `COMMENTS`, `CERTIFICATIONS`, `SKILLS`, `BLOG_POSTS`, `CONTACT_MESSAGES`, `SESSIONS`).
- [x] Build Express server `app.js` with `helmet`, `compression`, `express-rate-limit`, `morgan`, and `winston`.

## Frontend & Views (Phase 1 Foundation and Phase 2 Public Website)
- [x] Build `views/partials/header.ejs` with skip link, main navigation, dark mode toggle, and language switcher.
- [x] Build `views/partials/footer.ejs` with accessibility statement link and copyright.
- [x] Build `public/css/style.css` following `docs/DESIGN_SYSTEM.md`.
- [x] Build `public/js/main.js` for keyboard interaction, dark mode state, and ARIA updates.
- [x] Build view templates for Home, About, Services, Projects, individual project pages, Skills, Certifications, Resume, Accessibility Statement, Privacy Policy, 404, and Contact pages.

## Auth & Moderation (Phase 3)
- [ ] Set up Firebase Auth client-side script and Express `/auth/verify-token` route.
- [ ] Build moderated comment submission and pending queue.
- [ ] Build protected Admin dashboard and contact inbox view.

## Verification & Deployment (Phase 3)
- [ ] Conduct accessibility audit using NVDA and JAWS screen readers.
- [ ] Test keyboard navigation across all interactive components.
- [ ] Configure PM2 `ecosystem.config.js` and Nginx reverse proxy configuration.

## Missing Information / Open Items (TODO)
- [ ] **Domain Name:** Register domain name for final HTTPS / Let's Encrypt certificate setup.
- [ ] **Firebase Admin Service Account Key:** Obtain service account credentials for production environment variable setup.
- [ ] **SMTP Credentials:** Obtain production SMTP details for Nodemailer contact form alerts.
