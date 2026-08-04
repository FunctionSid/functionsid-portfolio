# FunctionSid VM Context

This document mirrors the authoritative production environment for the FunctionSid portfolio website. The detailed infrastructure source of truth remains `docs/INFRASTRUCTURE.md` and `docs/VM_CONTEXT.md`.

---

## Project

- **Project Name:** FunctionSid
- **Purpose:** Personal portfolio website for Siddharth Kalantri.
- **Production Application Directory:** `/opt/functionsid`
- **Development Root:** `D:/project/siddharthkalantri/FunctionSid`
- **Windows Development Wallet:** `D:\project\Oracle\Wallets\SIDCORE`
- **Oracle Linux Production Wallet:** `/opt/functionsid/wallet`
- **Production Environment File:** `/opt/functionsid/.env`

---

## Server

- **Cloud Provider:** Oracle Cloud Infrastructure (OCI)
- **Region:** Mumbai (`ap-mumbai-1`)
- **Operating System:** Oracle Linux 9.8
- **Machine Shape:** `VM.Standard.E2.1.Micro`
- **CPU:** 2 vCPUs, AMD EPYC, x86_64
- **Memory:** 1 GB RAM
- **Swap:** 4 GB swap file
- **SSH User:** `opc`

---

## Installed Software

- Git
- Node.js 24
- npm
- PM2
- Nginx
- Certbot (planned later)
- `python3-certbot-nginx`
- DNF package manager

---

## Deployment Pipeline

```text
Windows 11
  ↓
Git
  ↓
GitHub
  ↓
GitHub Actions
  ↓
Oracle Linux VM
  ↓
PM2
  ↓
Nginx
  ↓
functionsid.duckdns.org
```

GitHub Actions prepares `/opt/functionsid`, installs production dependencies, and verifies infrastructure. It does not start or reload the official PM2 process named `functionsid` until production `.env` and Oracle Wallet are ready.

---

## Reverse Proxy

Nginx proxies public HTTP/HTTPS traffic to the Node.js application on `127.0.0.1:3000`.

---

## Database

- **Official Database:** Oracle Autonomous Database
- **Driver:** Official Oracle Node.js Driver (`oracledb`)
- **Connection Management:** Oracle connection pooling with `createPool`
- **Central Module:** `config/database.js`
- **Runtime Schema:** `FUNCTIONSID`
- **Administrative User:** `ADMIN` only for initial schema setup
- **Development and Production:** Both Windows local development and Oracle Linux production use Oracle Autonomous Database through environment configuration.
- **Windows `.env`:** Uses `TNS_ADMIN=D:\project\Oracle\Wallets\SIDCORE` and `DB_WALLET_DIR=D:\project\Oracle\Wallets\SIDCORE`.
- **Production `.env`:** Uses `TNS_ADMIN=/opt/functionsid/wallet` and `DB_WALLET_DIR=/opt/functionsid/wallet`.

Do not use SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, or any other replacement database architecture for FunctionSid.

---

## Firebase

Firebase is used only for Authentication with Google Sign-In.

Disabled or unused Firebase services:

- Firebase Hosting
- Firestore
- Realtime Database
- Storage
- Cloud Functions
- Cloud Messaging

---

## Administrator

- **Administrator Account:** `functionsid@gmail.com`
- **Environment Variable:** `ADMIN_EMAIL=functionsid@gmail.com`

---

## Security

- SSH key authentication only.
- No password login.
- Firewall opens only ports 22, 80, and 443.
- Do not commit `.env`, secrets, Oracle wallet files, Firebase credentials, SSH keys, GitHub tokens, or SMTP credentials.

---

## Notes for AI

- Keep the architecture lightweight for the low-memory OCI VM.
- Use Node.js 24, Express, EJS, PM2, Nginx, Oracle Autonomous Database, and Firebase Authentication only as documented.
- Do not introduce containers or replacement databases.
- Do not begin implementation phases without user approval.
