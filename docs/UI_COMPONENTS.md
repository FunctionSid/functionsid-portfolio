# UI Components Specification & Accessibility Guide

This document defines the complete specification, HTML/EJS structure, ARIA pattern implementation, and styling guidelines for all reusable UI components in the portfolio website. Future AI assistants and developers MUST follow these structural templates exactly.

---

## 1. Skip to Content Link
A mandatory accessibility element placed as the very first child of `<body>` on every page.

### HTML/EJS Structure
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Component Rules
- Visually hidden off-screen by default (`position: absolute; top: -100px; left: 0;`).
- On keyboard focus (`:focus`), becomes fully visible at top-left with high contrast z-index (`top: 10px; left: 10px; z-index: 9999; padding: 12px 20px; background: #0ea5e9; color: #ffffff; font-weight: bold; border-radius: 6px;`).

---

## 2. Header & Main Navigation (`partials/header.ejs`)

### HTML/EJS Structure
```html
<header class="site-header">
  <div class="container d-flex align-items-center justify-content-between py-3">
    <!-- Brand Logo -->
    <a href="/" class="brand-logo" aria-label="Siddharth Kalantri Home">
      <span class="brand-text">Siddharth Kalantri</span>
    </a>

    <!-- Main Navigation -->
    <nav aria-label="Main Navigation" class="main-nav">
      <ul class="nav-list d-flex list-unstyled m-0 gap-3">
        <li><a href="/" class="nav-link <%= activePage === 'home' ? 'active' : '' %>" <%= activePage === 'home' ? 'aria-current="page"' : '' %>>Home</a></li>
        <li><a href="/about" class="nav-link <%= activePage === 'about' ? 'active' : '' %>" <%= activePage === 'about' ? 'aria-current="page"' : '' %>>About</a></li>
        <li><a href="/projects" class="nav-link <%= activePage === 'projects' ? 'active' : '' %>" <%= activePage === 'projects' ? 'aria-current="page"' : '' %>>Projects</a></li>
        <li><a href="/skills" class="nav-link <%= activePage === 'skills' ? 'active' : '' %>" <%= activePage === 'skills' ? 'aria-current="page"' : '' %>>Skills</a></li>
        <li><a href="/certifications" class="nav-link <%= activePage === 'certifications' ? 'active' : '' %>" <%= activePage === 'certifications' ? 'aria-current="page"' : '' %>>Certifications</a></li>
        <li><a href="/contact" class="nav-link <%= activePage === 'contact' ? 'active' : '' %>" <%= activePage === 'contact' ? 'aria-current="page"' : '' %>>Contact</a></li>
      </ul>
    </nav>

    <!-- Controls: Language & Theme -->
    <div class="header-controls d-flex align-items-center gap-2">
      <!-- Language Switcher -->
      <div class="dropdown">
        <button class="btn btn-outline-slate dropdown-toggle" type="button" id="langDropdown" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Select Language">
          <span class="current-lang">EN</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="langDropdown">
          <li><button class="dropdown-item" onclick="setLanguage('en')">English</button></li>
          <li><button class="dropdown-item" onclick="setLanguage('hi')">हिंदी (Hindi)</button></li>
          <li><button class="dropdown-item" onclick="setLanguage('mr')">मराठी (Marathi)</button></li>
        </ul>
      </div>

      <!-- Dark Mode Toggle -->
      <button id="themeToggle" class="btn btn-icon" aria-label="Toggle dark mode" aria-pressed="true">
        <svg class="icon-sun" aria-hidden="true" width="20" height="20"><use href="#icon-sun"></use></svg>
      </button>
    </div>
  </div>
</header>
```

---

## 3. Project Card Component

### HTML/EJS Structure
```html
<article class="card project-card h-100">
  <img src="<%= project.image_path %>" alt="<%= project.image_alt %>" class="card-img-top project-img" loading="lazy">
  <div class="card-body d-flex flex-column">
    <h3 class="card-title h4"><%= project.title %></h3>
    <p class="card-text text-secondary flex-grow-1"><%= project.summary %></p>
    
    <!-- Tech Badges -->
    <div class="tech-stack d-flex flex-wrap gap-1 mb-3" aria-label="Technologies used">
      <% project.tech_stack.split(',').forEach(tech => { %>
        <span class="badge badge-tech"><%= tech.trim() %></span>
      <% }); %>
    </div>

    <!-- Actions -->
    <div class="card-actions d-flex gap-2">
      <% if (project.live_url) { %>
        <a href="<%= project.live_url %>" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer" aria-label="Open live demo for <%= project.title %> (opens in new tab)">Live Demo</a>
      <% } %>
      <% if (project.repo_url) { %>
        <a href="<%= project.repo_url %>" class="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener noreferrer" aria-label="View source code repository for <%= project.title %> (opens in new tab)">GitHub</a>
      <% } %>
    </div>
  </div>
</article>
```

---

## 4. Certifications Tab Component (3-Tab ARIA Structure)

### HTML/EJS Structure
```html
<div class="certifications-tabs">
  <!-- Tab Buttons -->
  <div role="tablist" aria-label="Certification Categories" class="nav nav-tabs nav-justified mb-4">
    <button role="tab" aria-selected="true" aria-controls="panel-tech" id="tab-tech" class="nav-link active">Technical & Accessibility</button>
    <button role="tab" aria-selected="false" aria-controls="panel-office" id="tab-office" class="nav-link" tabindex="-1">Office & Productivity</button>
    <button role="tab" aria-selected="false" aria-controls="panel-soft" id="tab-soft" class="nav-link" tabindex="-1">Communication & Soft Skills</button>
  </div>

  <!-- Tab Panels -->
  <div role="tabpanel" id="panel-tech" aria-labelledby="tab-tech" tabindex="0" class="tab-panel active">
    <!-- Grid of technical cards -->
  </div>

  <div role="tabpanel" id="panel-office" aria-labelledby="tab-office" tabindex="0" class="tab-panel d-none">
    <!-- Accessible Data Table -->
    <table class="table table-dark table-striped align-middle">
      <caption class="visually-hidden">Office and Productivity Certifications Data Table</caption>
      <thead>
        <tr>
          <th scope="col">Course Title</th>
          <th scope="col">Issuing Organization</th>
          <th scope="col">Grade / Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Advance Microsoft Excel</td>
          <td>EnAble India / Rotary Cochin</td>
          <td>Completed</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div role="tabpanel" id="panel-soft" aria-labelledby="tab-soft" tabindex="0" class="tab-panel d-none">
    <!-- Grid of soft skills cards -->
  </div>
</div>
```

---

## 5. Contact Form Component (Dual Anonymous / Auth Modes)

### HTML/EJS Structure
```html
<form id="contactForm" action="/contact/send" method="POST" class="contact-form" novalidate>
  <!-- ARIA Live Announcement Container -->
  <div id="formAlert" aria-live="polite" class="alert d-none mb-3" role="status"></div>

  <% if (!user) { %>
    <!-- Anonymous Visitor Fields -->
    <div class="mb-3">
      <label for="fullName" class="form-label">Full Name <span class="text-danger" aria-hidden="true">*</span></label>
      <input type="text" class="form-control" id="fullName" name="fullName" required aria-required="true">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email Address <span class="text-danger" aria-hidden="true">*</span></label>
      <input type="email" class="form-control" id="email" name="email" required aria-required="true">
    </div>
  <% } else { %>
    <!-- Signed-in User Info Banner -->
    <div class="alert alert-info mb-3">
      Signed in as <strong><%= user.displayName %></strong> (<%= user.email %>).
    </div>
  <% } %>

  <div class="mb-3">
    <label for="subject" class="form-label">Subject <span class="text-danger" aria-hidden="true">*</span></label>
    <input type="text" class="form-control" id="subject" name="subject" required aria-required="true">
  </div>

  <div class="mb-3">
    <label for="message" class="form-label">Message <span class="text-danger" aria-hidden="true">*</span></label>
    <textarea class="form-control" id="message" name="message" rows="5" required aria-required="true"></textarea>
  </div>

  <button type="submit" class="btn btn-primary btn-lg">Send Message</button>
</form>
```

---

## 6. Admin Inbox Accessible Table Component

### HTML/EJS Structure
```html
<div class="table-responsive">
  <table class="table table-dark table-hover align-middle">
    <caption>Contact Messages Inbox</caption>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Type</th>
        <th scope="col">Sender Name</th>
        <th scope="col">Email</th>
        <th scope="col">Subject</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <% messages.forEach(msg => { %>
        <tr class="<%= msg.status === 'unread' ? 'fw-bold' : '' %>">
          <td><%= new Date(msg.created_at).toLocaleDateString('en-IN') %></td>
          <td><span class="badge <%= msg.message_type === 'google_authenticated' ? 'bg-success' : 'bg-secondary' %>"><%= msg.message_type %></span></td>
          <td><%= msg.full_name %></td>
          <td><a href="mailto:<%= msg.email %>" class="text-info"><%= msg.email %></a></td>
          <td><%= msg.subject %></td>
          <td><span class="badge <%= msg.status === 'unread' ? 'bg-warning text-dark' : 'bg-slate' %>"><%= msg.status %></span></td>
          <td>
            <button class="btn btn-sm btn-outline-info" onclick="viewMessage('<%= msg.id %>')" aria-label="View message from <%= msg.full_name %>">View</button>
          </td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</div>
```

---

## 7. Footer Component (`partials/footer.ejs`)

### HTML/EJS Structure
```html
<footer class="site-footer bg-slate-900 border-top border-slate-800 py-4 mt-5">
  <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-secondary small">
    <div>
      <p class="m-0">&copy; <%= new Date().getFullYear() %> Siddharth Dilip Kalantri. All rights reserved.</p>
    </div>
    <div class="footer-links d-flex gap-3">
      <a href="/accessibility" class="link-secondary">Accessibility Statement</a>
      <a href="/contact" class="link-secondary">Contact</a>
      <a href="/admin" class="link-secondary">Admin Portal</a>
    </div>
  </div>
</footer>
```
