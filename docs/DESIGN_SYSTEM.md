# FunctionSid Design System

This document is the source of truth for all future visual design, user experience, content writing, branding, accessibility, and portfolio presentation work on the FunctionSid website.

Future UI work must improve the design within the existing Express, EJS, Bootstrap 5, CSS custom property, i18next, and Oracle Cloud deployment architecture. Do not redesign the application architecture or change the deployment strategy unless the project owner explicitly requests it.

---

## 1. Design Philosophy

FunctionSid must feel like a premium technology company website and an experienced accessibility consultant portfolio. The first few seconds should create confidence for recruiters, hiring managers, startup founders, freelance clients, accessibility teams, cloud teams, AI companies, government organizations, and open source communities.

The design must be:

- Professional
- Modern
- Minimal
- Elegant
- Accessible
- Fast
- Technology focused
- Clean
- Consistent
- Responsive

The website should communicate calm expertise rather than loud self-promotion. It should reflect professionalism, technical depth, accessibility excellence, and attention to detail without exaggerating achievements.

### Inspiration

The visual quality bar should be comparable to premium software company and engineering consultant websites such as Microsoft, GitHub, Vercel, Stripe, and Apple. Use these as quality references, not as templates to copy.

### Prohibited Styles

Do not use:

- Flashy portfolio templates
- Neon, cyberpunk, gaming, or dark-synth aesthetics
- Particle backgrounds
- Video backgrounds
- Heavy parallax or scrolljacking
- Decorative 3D/WebGL scenes
- Cluttered illustrations
- Unnecessary decorative icons
- Overly colorful section-by-section palettes
- Exaggerated marketing language

---

## 2. Target Audience

The website is designed for a global professional audience:

- Recruiters
- Software engineering managers
- Accessibility teams
- Startup founders
- Cloud teams
- AI companies
- Government organizations
- Freelance clients
- Open source communities

The design and writing must feel internationally professional. Do not make the visual style, tone, imagery, or examples specific to any single country unless a page or project context requires it.

---

## 3. Brand Identity

- Official brand name: FunctionSid
- Personal name: Siddharth Kalantri, also Siddharth Dilip Kalantri where formal naming is required
- Professional identity: Accessibility Engineer, Node.js Developer, Cloud & AI
- Brand essence: Modern, minimal, professional, technology-focused, accessibility-first, developer-centric

Use the existing official logo asset at `/images/functionsid-logo.png`. Do not redesign, alter, recolor, stretch, crop, replace, or regenerate the logo without explicit project owner approval.

### Logo Usage

- Preserve the original aspect ratio at all times.
- Use meaningful alt text unless the logo is purely decorative and redundant with adjacent text.
- Place the logo only on clean, high-contrast backgrounds.
- Keep sufficient clear space around the logo.
- Use the full brand mark where space permits and the compact mark on constrained mobile layouts.

Standard alt text:

```html
alt="FunctionSid logo - Siddharth Kalantri, Accessibility Engineer, Node.js Developer, Cloud & AI"
```

---

## 4. Visual Style

Use a modern premium design with restrained contrast, consistent spacing, clear typography, meaningful imagery, and predictable UI patterns.

Every page must maintain:

- Consistent spacing
- Consistent typography
- Consistent card layouts
- Consistent buttons
- Consistent icon sizes
- Consistent image styles
- Consistent animation behavior
- Clear visual hierarchy
- Strong accessibility support

Avoid clutter. Every visible element should have a purpose: navigation, comprehension, trust, evidence, action, or accessibility.

---

## 5. Color System

Use the established Professional Blue design tokens. The current implementation uses CSS custom properties in `public/css/style.css` and supports light and dark themes with `data-theme`.

```css
:root {
  --color-primary-accent: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary-accent: #0d9488;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --focus-ring-color: #3b82f6;
}

[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-surface: #ffffff;
  --bg-nav: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08);
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-surface: #1e293b;
  --bg-nav: #0f172a;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
}
```

### Color Rules

- Use blue as the primary action and brand accent.
- Use teal as a secondary accent for tags, supporting states, and technical labels.
- Use success, warning, and error colors only for meaningful status communication.
- Color must never be the only indicator of meaning.
- Maintain WCAG 2.2 AA contrast for text and interactive controls.
- Do not introduce new brand colors unless they become documented tokens.

---

## 6. Typography

Use modern readable fonts with strong multilingual support.

- English: `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`
- Hindi and Marathi: `Noto Sans Devanagari`, `Inter`, `sans-serif`
- Current base token: `--font-family-base: 'Inter', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif`

### Type Scale

- Display or hero title: `2.75rem`, weight `700`, line-height `1.2`
- Page H1: `2.25rem`, weight `700`, line-height `1.25`
- Section H2: `1.75rem`, weight `600`, line-height `1.3`
- Card H3: `1.25rem`, weight `600`, line-height `1.4`
- Body: `1rem`, weight `400`, line-height `1.6`
- Small text and captions: `0.875rem`, weight `400`, line-height `1.5`

### Typography Rules

- Use exactly one H1 per page.
- Headings must clearly identify page and section purpose.
- Paragraphs must remain easy to scan.
- Avoid long blocks of text.
- Use lists, cards, and short sections for technical information.
- Do not introduce decorative, script, serif, novelty, or low-contrast display fonts.

---

## 7. Layout System

Use the existing Bootstrap 5 grid and utility system, enhanced by project CSS tokens where needed.

Support:

- Large desktop screens
- Desktop and laptop
- Tablet
- Mobile
- Very small mobile screens

### Layout Rules

- Content should never feel cramped.
- Whitespace is encouraged and should be intentional.
- Maintain clear vertical rhythm between sections.
- Keep layouts visually balanced across breakpoints.
- Use responsive grids for cards, project summaries, skills, and service groupings.
- Avoid deeply nested cards and heavy boxed layouts.
- Do not turn every section into a card. Use cards for repeated items, project previews, service summaries, certifications, and compact evidence blocks.
- Ensure buttons, labels, project metadata, and translated text do not overflow their containers.

---

## 8. Components

Use consistent component behavior across the site.

### Cards

- Use a clean `1px solid var(--border-color)` border.
- Use subtle shadows from design tokens.
- Use `8px` border radius unless an existing component uses `6px`.
- Keep padding consistent, usually `1.5rem`.
- Hover states may slightly raise or emphasize a card, but must remain subtle.

### Buttons

- Primary buttons use `--color-primary-accent`.
- Secondary buttons use transparent surfaces and token borders.
- Minimum target size is `44px` by `44px`.
- Include visible focus states.
- Use button text that states the action clearly.

### Forms

- Every input must have an explicit label.
- Validation errors must be visible and programmatically associated with the field.
- Use `aria-describedby` for helper and error text.
- Use polite live regions for asynchronous form feedback.
- Do not rely on placeholder text as the only label.

### Navigation

- Navigation must be keyboard accessible.
- Active navigation states must use `aria-current="page"`.
- Mobile navigation must remain easy to operate by touch and keyboard.
- The skip link must remain the first focusable element.

---

## 9. Icons

Use Lucide Icons as the primary and default icon library. Bootstrap Icons SVGs may be used only as a secondary fallback when an equivalent Lucide icon is not practical.

### Icon Rules

- Every icon must match its content.
- Icons should support comprehension, not decorate empty space.
- Maintain consistent stroke style and size across the website.
- Decorative icons must use `aria-hidden="true"`.
- Interactive icon-only buttons must include explicit `aria-label` text.
- Do not mix filled 3D icons, emoji-like icons, and line icons in the same UI.

---

## 10. Images

Every image is a professional portfolio asset. Images should prove capability, clarify project context, or strengthen trust.

### Image Rules

- Maintain aspect ratio.
- Never stretch images.
- Use responsive image sizing.
- Use `loading="lazy"` for non-critical images.
- Use `object-fit: cover` or `object-fit: contain` according to context.
- Provide meaningful alt text.
- Crop screenshots professionally when needed.
- Optimize images for fast loading.
- Keep project screenshots visually consistent, preferably using 16:9 previews for project cards.
- Do not use dark, blurry, decorative, or stock-like imagery when the user needs to inspect a real project or interface.

---

## 11. Motion and Animation

Animations should be subtle and usability-focused.

Use animation for:

- Hover feedback
- Focus feedback
- Small state transitions
- Menu opening and closing
- Gentle card elevation

Avoid:

- Distracting effects
- Continuous motion
- Large entrance animations
- Motion that delays access to content
- Scrolljacking
- Heavy JavaScript animation libraries

Reduced motion support is mandatory:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 12. Accessibility Requirements

Accessibility is mandatory and central to the FunctionSid brand.

Target WCAG 2.2 Level AA. Support:

- NVDA
- JAWS
- Keyboard-only navigation
- Semantic HTML
- Proper ARIA
- Visible keyboard focus
- Accessible forms
- Accessible navigation
- Accessible dialogs
- Accessible tables
- High contrast
- Reduced motion
- Meaningful alt text
- Correct language attributes

### Accessibility Rules

- Use semantic HTML first; use ARIA only when semantic HTML is insufficient.
- Preserve `<main id="main-content">` and skip-link behavior.
- Maintain visible focus indicators for every interactive element.
- Ensure all interactive controls can be operated with keyboard alone.
- Color must never be the only indicator of state, error, status, or selection.
- Tables must include headers and accessible relationships.
- Dialogs must manage focus, names, roles, and escape behavior.
- Test critical flows with keyboard and screen readers where possible.

---

## 13. Responsive Design

The website must adapt naturally across desktop, laptop, tablet, mobile, and large screens.

### Responsive Rules

- Use flexible grids and containers.
- Avoid fixed widths that break on mobile.
- Keep touch targets at least `44px` by `44px`.
- Keep buttons readable and tappable on small screens.
- Ensure images scale correctly.
- Preserve visual hierarchy on mobile.
- Do not hide critical content on smaller screens.
- Verify translated text does not overflow in English, Hindi, or Marathi.

---

## 14. Performance

The website must stay fast and efficient, including on the existing low-resource Oracle Cloud VM target.

### Performance Rules

- Lazy load non-critical images.
- Optimize image dimensions and compression before use.
- Minimize JavaScript.
- Optimize CSS.
- Avoid large frontend frameworks unless explicitly approved.
- Avoid unnecessary runtime dependencies.
- Optimize fonts and font loading.
- Reduce cumulative layout shift.
- Prefer server-rendered EJS and existing Bootstrap utilities.

---

## 15. Localization

The site supports English, Hindi, and Marathi through i18next.

### Localization Rules

- All user-facing static UI text must come from translation files.
- Do not rely on browser auto-translation.
- Keep `<html lang="...">` accurate for the selected language.
- Layouts must handle longer translated strings.
- Technical terminology should be clear and consistent across languages.

---

## 16. Content Writing Standards

All writing must be professional, clear, and natural. It should sound like an experienced software engineer wrote it.

The writing quality must be held to the same standard as the code quality and visual design quality. Future page generation must spend serious effort on the quality of the written content, not only on layout and implementation.

### Writing Principles

- Write clearly.
- Write like a professional technical writer.
- Stay natural, confident, honest, concise, and readable.
- Use concrete technical details.
- Explain technical topics without unnecessary complexity.
- Keep sections purposeful.
- Avoid generic AI wording.
- Avoid AI cliches.
- Avoid repeated phrases.
- Avoid inflated claims.
- Avoid exaggerated marketing language.
- Avoid fake enthusiasm.
- Avoid unsupported claims about experience or skills.
- Avoid unnecessary buzzwords.
- Avoid vague phrases such as "cutting-edge", "revolutionary", "world-class", and "game-changing" unless directly supported by evidence.
- Prefer evidence over adjectives.
- Use active voice where natural.
- Keep paragraphs short.
- Use headings to make pages easy to scan.
- Use bullet lists where they improve clarity.

Every page should have a clear purpose and a clear next step.

### Audience for Writing

Write for:

- Recruiters
- Hiring managers
- Startup founders
- Technical leads
- Accessibility specialists
- Cloud engineers

The website should create confidence within the first minute of reading. Every page should help answer:

- Who is Siddharth?
- What can he build?
- What problems can he solve?
- Why should someone hire or contact him?

The writing should feel comparable in polish and clarity to a premium Microsoft, GitHub, Azure, or modern software consultancy portfolio.

### Project Writing Structure

Project descriptions must use a consistent structure:

- Problem
- Solution
- Technologies
- Challenges
- Outcome

Do not claim experience, credentials, client work, metrics, or skills that are not documented elsewhere in the project, resume, or approved site content.

---

## 17. Personal Brand Voice

The FunctionSid website represents Siddharth Kalantri as an accessibility-focused software engineer.

The tone should be:

- Professional
- Friendly
- Helpful
- Technically accurate
- Confident without arrogance
- Honest
- Practical

### Voice Rules

- Avoid sounding like a generic marketing website.
- Avoid exaggerated claims.
- Avoid excessive self-promotion.
- Focus on demonstrating skills through real projects, certifications, technical explanations, and measurable work.
- Show evidence instead of making claims whenever possible.
- Present strengths through concrete examples, project decisions, accessibility practices, and technical outcomes.
- Keep the voice grounded, capable, and clear.

The website should make visitors feel they are reading the portfolio of a capable engineer who values accessibility, quality, and continuous learning.

---

## 18. Portfolio Presentation

Present Siddharth Kalantri professionally, with emphasis on real engineering skill, accessibility expertise, and production awareness.

Highlight:

- Accessibility engineering
- Node.js
- Backend development
- Cloud computing
- Microsoft Azure
- Oracle Cloud
- AI integration
- Automation
- Database development
- Accessibility testing
- Screen reader compatibility
- Semantic HTML and WCAG implementation

### Project Detail Standard

Every substantial project page or project detail section should include:

- Overview
- Problem statement
- Solution
- Technologies used
- Architecture
- Challenges
- Solutions or tradeoffs
- Skills demonstrated
- Future improvements
- Project status
- Project image or screenshot

### Project Card Standard

Project cards should include:

- Project name
- Short outcome-focused summary
- Primary technology tags
- Accessibility or engineering relevance where applicable
- Clear link to details
- Consistent image treatment
- Meaningful project image alt text

Do not present projects as generic portfolio fillers. Each project should show what problem was solved, how it was built, and what technical judgment it demonstrates.

---

## 19. Page-Level UX Guidelines

### Homepage

The homepage must quickly establish who Siddharth is, what FunctionSid offers, and why the visitor should trust the work. The hero should communicate professional identity, core capabilities, and a direct action path without overloading the first viewport.

### About

The about page should feel credible and human. It should describe professional journey, accessibility perspective, technical strengths, and working style without becoming informal or overly personal.

### Services

Services should be specific, outcome-oriented, and scoped around real capabilities. Avoid vague service claims. Make accessibility, backend, cloud, AI integration, and automation offerings easy to scan.

### Projects

Projects should be evidence-led. Each project should demonstrate engineering thinking, constraints, architecture, accessibility considerations, and measurable value where available.

### Skills

Skills should be organized by practical capability areas rather than scattered tool names. Show depth without making the page feel like a keyword list.

### Certifications

Certifications should support credibility. Present them cleanly with issuer, topic, date where available, and relevance to the professional profile.

### Contact

The contact page should make the next step clear, professional, and accessible. Forms must be reliable, labeled, keyboard-friendly, and transparent about submission state.

---

## 20. Visual Quality Control

Before considering any page complete, verify:

- Consistent spacing
- Correct typography
- Professional icon selection
- Correct image placement
- No stretched images
- Balanced layout
- Responsive behavior
- Accessible color contrast
- Keyboard accessibility
- Screen reader compatibility
- Correct heading hierarchy
- Visible focus indicators
- Clear page purpose
- Natural professional writing
- No generic AI wording
- No layout shift caused by images, buttons, or translated text

The final page should appear polished, professionally designed, and trustworthy.

---

## 21. AI Enforcement Rule

Every future AI assistant must read and follow this document before creating or modifying any user interface, page content, visual component, or portfolio presentation for FunctionSid.

If a generated page or component violates this document, uses unsupported visual styles, lacks accessibility support, changes the architecture without approval, changes the deployment strategy without approval, stretches images, uses decorative clutter, or weakens professional trust, it must be revised immediately.
