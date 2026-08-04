# Server & Infrastructure Context

## Overview
This document specifies the hardware, operating system, and runtime environment of the production virtual machine (VM) hosting the portfolio website.

---

## Cloud VM Infrastructure

- **Cloud Provider:** Oracle Cloud Infrastructure (OCI)
- **Region:** Mumbai (`ap-mumbai-1`)
- **Instance Shape:** `VM.Standard.E2.1.Micro` (Oracle Always Free Tier)
- **Processor:** AMD EPYC
- **Architecture:** `x86_64`
- **Virtual CPUs:** 2 vCPUs
- **Physical Memory:** 1 GB RAM
- **Swap Memory:** 4 GB swapfile (`/swapfile`, `vm.swappiness=80`, `vm.vfs_cache_pressure=50`)
- **Operating System:** Oracle Linux 9.8
- **Package Manager:** DNF

---

## Installed Software Stack

- **Version Control:** Git
- **Runtime Environment:** Node.js 22 LTS
- **Package Manager:** npm (latest)
- **Process Manager:** PM2 (`--max-memory-restart 200M`)
- **Web Server / Reverse Proxy:** Nginx
- **SSL / TLS Certificate Automation:** Certbot (`python3-certbot-nginx`)
- **Database:** Oracle Autonomous Database (mTLS wallet authentication)

---

## Deployment Architecture

```
Windows 11
       ↓
Git
       ↓
GitHub (FunctionSid/functionsid on main)
       ↓
GitHub Actions
       ↓
Oracle Cloud VM (Oracle Linux 9.8)
       ↓
Nginx Reverse Proxy (Port 80/443)
       ↓
PM2 Process Manager (Port 3000)
       ↓
Node.js Express App
       ↓
Oracle Autonomous Database (SIDCORE)
```

---

## Security & Firewall Configuration

- **Authentication:** Public key SSH key authentication only (User: `opc`). Password authentication disabled.
- **Allowed Firewall Inbound Ports (Oracle Cloud Security List & firewalld):**
  - Port 22 (SSH)
  - Port 80 (HTTP)
  - Port 443 (HTTPS)
- **Internal Ports:** Application runs on `127.0.0.1:3000` (inaccessible from external network directly).

---

## Development vs Production Constraints

| Parameter | Development Machine | Production Machine |
| :--- | :--- | :--- |
| **Operating System** | Windows 11 Pro 64-bit | Oracle Linux 9.8 |
| **Processor Arch** | x86_64 (AMD Ryzen 7 8700G) | x86_64 (AMD EPYC) |
| **Memory** | 32 GB RAM | 1 GB RAM (+ 4 GB Swap) |
| **Node.js** | v22.17.0 | Node.js 22 LTS |
| **Package Manager** | npm / bun | npm / DNF |
| **Path Separators** | Standardized to `/` | Standardized to `/` |

---

## Resource Optimization Guidelines
1. Keep Node.js application memory usage under 150 MB.
2. Enable EJS template view caching in production (`app.set('view cache', true)`).
3. Use Gzip compression middleware (`compression`).
4. Avoid heavy synchronous file I/O operations.
