# Project Roadmap

This roadmap uses the latest approved FunctionSid implementation strategy. Older roadmap labels are archived in changelog history and must not guide implementation.

---

## Phase 1: Foundation

- [ ] Verify project documentation, assets, routes, configuration, dependencies, and folder structure.
- [ ] Create the Express application foundation using the documented architecture.
- [ ] Establish EJS shared layout, navigation, footer, theme, global CSS, responsive layout, localization framework, and reusable components.
- [ ] Establish the Oracle-only database foundation with `config/database.js`, connection pooling, and the Routes -> Controllers -> Services -> Repositories -> Oracle Autonomous Database structure.
- [ ] Report completed foundation work and wait for approval before Phase 2.

---

## Phase 2: Public Website

- [ ] Home page: hero, professional identity, services preview, project preview, accessibility credibility, and contact path.
- [ ] About page: personal journey, education, vision-loss adaptation, screen reader experience, and professional direction.
- [ ] Services page: accessibility, website development, Node.js, Oracle Cloud, Azure, database, AI integration, maintenance, and documentation services.
- [ ] Projects page: accessible project grid and clear portfolio navigation.
- [ ] Individual project pages: Overview, Problem, Solution, Technologies, Challenges, Skills Demonstrated, Future Improvements, Project Image, accessibility review, and professional writing.
- [ ] Skills page: practical capability groups rather than a keyword-only list.
- [ ] Certifications page: accessible categorization with clear credential presentation.
- [ ] Resume download: accessible route and clear download link treatment.
- [ ] Contact page: accessible form and professional contact options.
- [ ] Privacy policy and 404 page.
- [ ] Review public website quality and wait for approval before Phase 3.

---

## Phase 3: Authentication, Admin Dashboard, Oracle Database, Deployment, and Testing

- [ ] Firebase Authentication with Google Sign-In only.
- [ ] Role support: Guest, User, Administrator.
- [ ] Administrator account: `ADMIN_EMAIL=functionsid@gmail.com`.
- [ ] Protected admin dashboard.
- [ ] Contact messages, comments, role-based permissions, and moderation workflows.
- [ ] Oracle repository modules, schema initialization, migrations, and production connection validation.
- [ ] GitHub Actions deployment workflow.
- [ ] PM2 application name `functionsid`.
- [ ] Nginx reverse proxy configuration for `functionsid.duckdns.org`.
- [ ] Oracle Linux compatibility review.
- [ ] Logging and monitoring readiness.
- [ ] Accessibility verification, responsive testing, keyboard testing, NVDA and JAWS review, performance checks, console error review, broken-link checks, image optimization review, SEO review, and final deployment readiness.
