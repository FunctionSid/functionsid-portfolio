# Accessibility Requirements & Guidelines

## Target Standard
All pages, interactive elements, components, and media must strictly conform to **WCAG 2.2 Level AA**.

---

## Screen Reader Support
- Primary Target Screen Readers: **NVDA** (NonVisual Desktop Access) and **JAWS**.
- Secondary Target Screen Readers: iOS VoiceOver and Android TalkBack.
- Requirement: All content, controls, dynamic updates, tabbed panels, and status messages must be fully intelligible and operable using screen readers.

---

## Core Accessibility Rules

### 1. Keyboard Operability & Focus Management
- Every interactive element (links, buttons, form controls, tabs, dark mode toggle) MUST be reachable and operable using `Tab`, `Shift+Tab`, `Enter`, and `Space`.
- **Visible Focus States:** Focus indicators MUST NEVER be hidden (`outline: none` without replacement is forbidden). Use a high-contrast focus ring (`outline: 3px solid #38bdf8; outline-offset: 2px`).
- **Skip-to-Content Link:** A visible-on-focus skip link (`<a href="#main-content" class="skip-link">Skip to main content</a>`) MUST be the first focusable element on every page.

### 2. Heading Structure & Landmarks
- Exactly **one `<h1>` element** per page summarizing the page purpose.
- Logical heading hierarchy (`<h2>` to `<h6>`) without skipping levels.
- Standard HTML5 landmarks MUST be used:
  - `<header>` (Site header / navigation)
  - `<nav>` (Main navigation)
  - `<main id="main-content">` (Primary page content)
  - `<footer>` (Site footer)

### 3. Accessible Forms & Error Handling
- All inputs MUST have an associated `<label for="input-id">`.
- Required fields MUST be marked structurally (`required`, `aria-required="true"`) and labeled clearly.
- Error messages MUST be associated with inputs using `aria-describedby="error-id"`.
- Form feedback and alerts MUST be wrapped in an ARIA live region (`<div aria-live="polite" id="form-feedback">`) so screen readers automatically announce results upon form submission.

### 4. Tab Navigation (Certifications & Filters)
- Tabbed interfaces MUST follow the ARIA Authoring Practices Guide (APG) Tab pattern:
  - Container: `role="tablist"`
  - Individual Tabs: `role="tab"`, `aria-selected="true|false"`, `aria-controls="panel-id"`
  - Tab Panels: `role="tabpanel"`, `tabindex="0"`, `aria-labelledby="tab-id"`
  - Arrow keys (`Left`/`Right` or `Up`/`Down`) MUST navigate between tabs.

### 5. Images & Alternative Text
- Every image MUST include an informative `alt` attribute provided by the admin.
- Decorative images MUST have `alt=""` and `aria-hidden="true"`.
- Icons next to text MUST have `aria-hidden="true"`.

### 6. Color & Contrast
- Text contrast ratio MUST meet or exceed 4.5:1 for normal text and 3:1 for large text.
- Interface component controls and focus borders MUST meet 3:1 contrast against adjacent background colors.
- Color MUST NOT be used as the sole visual means of conveying information or indicating an action.

### 7. Language Switcher
- Switching languages MUST dynamically update the `<html lang="en">` attribute (`en`, `hi`, `mr`).
