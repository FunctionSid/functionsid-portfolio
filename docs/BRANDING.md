# FunctionSid Brand Identity & Visual Guidelines

This document specifies the official brand identity, logo assets, usage rules, color tokens, typography, and AI operational guidelines for **FunctionSid**. Every future AI assistant and developer MUST treat this document as the permanent source of truth for all branding and visual assets.

---

## 1. Brand Core & Identity

- **Official Brand Name:** FunctionSid
- **Personal Name:** Siddharth Kalantri (Siddharth Dilip Kalantri)
- **Professional Identity:** Accessibility Engineer • Node.js Developer • Cloud & AI
- **Brand Essence:** Modern, minimal, professional, technology-focused, accessibility-first, developer-centric.

---

## 2. Official Logo Asset

- **Primary Logo File Path:** `/images/functionsid-logo.png` (`public/images/functionsid-logo.png`)
- **Status:** Official Primary Logo for FunctionSid & Siddharth Kalantri.
- **Rule:** Do NOT redesign, alter, or replace this logo unless explicitly requested by the project owner.

### Visual Anatomy
The FunctionSid logo combines:
- **FS Initials:** Representing FunctionSid and Siddharth Kalantri.
- **Code Brackets (`{ }` / `< >`):** Symbolizing software engineering, Node.js development, and clean code.
- **Rounded Square Icon:** Presenting a modern, structured technology icon badge.
- **Dark Premium Theme:** Providing high-contrast, professional visual appeal.
- **Azure Blue Accent:** Reflecting cloud computing, reliability, and precision.
- **White Typography:** Ensuring sharp readability across digital media.

### Brand Representation
The logo represents the five core pillars of Siddharth Kalantri's engineering practice:
1. **Software Development** (Full-stack web engineering & clean architecture)
2. **Accessibility** (WCAG 2.2 Level AA compliance & screen reader power-user expertise)
3. **Node.js** (High-performance server-side APIs & applications)
4. **Cloud Computing** (Oracle Cloud Infrastructure & Microsoft Azure deployments)
5. **Artificial Intelligence** (RAG pipelines, vector search, and AI integration)

---

## 3. Logo Usage & Placement Guidelines

### Full Logo Placement
The complete logo (Icon + "FunctionSid" / "Siddharth Kalantri" typography) MUST be used on:
- Homepage Hero Banner
- About / My Journey Page
- Footer Landmark
- Contact Page
- PDF Portfolio & Resume downloads
- Project Technical Documentation (`README.md` & `docs/`)

### Icon-Only Placement
The compact icon badge MUST be used for:
- Main Navigation Bar (Header)
- Browser favicon when favicon assets are added
- Mobile Navigation Drawer
- Page Loading Screens
- Social Media Avatars & Preview Cards

### Rules of Usage
- **Aspect Ratio:** NEVER stretch, compress, skew, or distort the logo. Always preserve original proportions.
- **Clear Space:** Always maintain padding around the logo (minimum equal to the height of the letter "F").
- **Backgrounds:** Always place the logo on solid dark navy/charcoal or clean soft white backgrounds. Never place on noisy, busy, or low-contrast backgrounds.
- **File Preference:** Transparent PNG or scalable SVG formats. If an SVG vector version is produced later, it automatically becomes the preferred primary format.

---

## 4. Brand Color Palette & Contrast

| Semantic Role | Token Name | Color Hex / Description | Accessibility Target |
| :--- | :--- | :--- | :--- |
| **Primary Brand Accent** | `--color-primary-accent` | Azure Blue (`#2563eb`) | WCAG 2.2 AA compliant against dark slate/white |
| **Secondary Accent** | `--color-secondary-accent` | Teal (`#0d9488`) | High contrast tag & pill background |
| **Background Dark** | `--bg-primary` | Dark Navy / Charcoal (`#0f172a`) | Primary dark theme container background |
| **Surface Dark** | `--bg-surface` | Dark Slate Gray (`#1e293b`) | Card & section container surface |
| **Background Light** | `--bg-primary-light` | Soft White (`#f8fafc`) | Primary light theme container background |
| **Text Primary** | `--text-primary` | Off-White (`#f8fafc`) / Dark Slate (`#0f172a`) | > 4.5:1 Contrast ratio |
| **Text Secondary** | `--text-secondary` | Light Gray (`#94a3b8`) / Slate (`#475569`) | > 4.5:1 Contrast ratio |
| **Success State** | `--color-success` | Green (`#16a34a`) | Positive availability & status indicators |
| **Warning State** | `--color-warning` | Amber (`#d97706`) | Caution & pending status indicators |
| **Error State** | `--color-error` | Red (`#dc2626`) | Validation error indicators |

---

## 5. Typography

- **Font Family:** Modern sans-serif fonts strictly matching project design tokens (`Inter` for English, `Noto Sans Devanagari` for Hindi and Marathi).
- **Prohibition:** NEVER introduce decorative, script, serif, or low-contrast display fonts.

---

## 6. Responsive Logo Rules

- **Desktop (Large Screens >= 992px):** Display the complete FunctionSid logo with typography and subtitle.
- **Tablet (Medium Screens 768px - 991px):** Scale logo proportionally maintaining clear margin padding.
- **Mobile (Small Screens < 768px):** Use the compact logo version.
- **Very Small Screens (< 480px):** Use icon-only badge.

---

## 7. Accessibility & Alt Text Requirements

Every instance of the logo rendered in HTML, EJS, or Markdown MUST include descriptive, informative `alt` text.

### Standard Accessible Alt Text Template
```html
<img src="/images/functionsid-logo.png" 
     alt="FunctionSid logo — Siddharth Kalantri, Accessibility Engineer, Node.js Developer, Cloud & AI" 
     class="brand-logo-img" 
     width="180" 
     height="45">
```
- **Rule:** Never use empty `alt=""` text unless the logo is explicitly decorative and adjacent to redundant visible text.

---

## 8. Permanent AI Instructions

> **CRITICAL RULE FOR ALL FUTURE AI ASSISTANTS:**
> 1. Always reuse the existing FunctionSid logo at `/images/functionsid-logo.png`.
> 2. NEVER replace or alter the logo without explicit project owner approval.
> 3. Preserve brand colors, typography scale, padding clear space, and aspect ratios across all pages.
> 4. Use the logo consistently across all navigation headers, hero sections, footers, and technical documentation.
