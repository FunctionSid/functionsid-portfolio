# Coding Standards & Guidelines

## 1. Multi-Platform Development Rules
- **OS Portability:** Development occurs on Windows 11; production runs on Oracle Linux 9.8.
- **Path Handling:**
  - ALWAYS use forward slashes (`/`) in path strings, imports, and templates.
  - ALWAYS use `path.join()` or `path.posix.join()` for dynamic paths.
  - NEVER assume Windows backslashes (`\`) or hardcode `C:` / `D:` drive paths in application logic.
- **Node.js APIs:** Use portable Node.js standard APIs only. Never use Windows-specific native binaries or shell calls.

---

## 2. Special Format Rules (User Global Guidelines)

### Python Code Rules
- All Python code blocks MUST be shown **without comments**.
- Keep Python code concise and direct.

### SQL Code Rules
- Write **single-line SQL queries** whenever possible.
- Avoid multi-line formatted SQL blocks unless structurally required for complex joins.

### Screen Reader Formatting Rules
- Keep text simple (10th-grade reading level).
- Format tables cleanly for screen reader ease of parsing and direct copy-paste into Excel.
- Use metric system, Celsius, and Indian Standard Time (IST) where appropriate.

---

## 3. JavaScript / Express Standards

### Naming Conventions
- Variables and Functions: `camelCase` (e.g., `getFeaturedProjects`, `verifyToken`)
- File Names: `kebab-case` for routes and utilities (e.g., `auth-middleware.js`, `db-pool.js`)
- Classes / Models: `PascalCase` (e.g., `ProjectController`)
- Constants & Env Vars: `UPPER_SNAKE_CASE` (e.g., `DB_CONNECT_STRING`, `MAX_POOL_SIZE`)

### Asynchronous Operations
- Use `async` / `await` syntax exclusively instead of raw Promises or callback chains.
- Wrap async route handlers in `try...catch` blocks or an express async handler wrapper.

### Modular Code Architecture
```
/website
  /config       (Database & App configuration)
  /controllers  (Request logic handlers)
  /docs         (Project documentation)
  /middleware   (Auth, rate limiting, error handlers)
  /repositories (Oracle SQL and data access modules)
  /public       (CSS, JS, images, fonts)
  /routes       (Express route definitions)
  /views        (EJS templates & partials)
  app.js        (Main Express application entrypoint)
```
