# FunctionSid Administrator Guide

## Overview
The FunctionSid administrator area manages Oracle-backed portfolio content, contact messages, and file uploads. It uses Firebase Authentication for sign-in and Oracle Autonomous Database for persistent application data.

## Access
- Admin URL: `/admin`
- Authentication provider: Firebase Google Sign-In
- Authorized account: `ADMIN_EMAIL`
- Runtime database user: `FUNCTIONSID`

The application stores only required administrator profile information in Oracle: Firebase UID, email, display name, photo URL, role, and login timestamps.

## Security Controls
- Firebase ID tokens are verified server-side with Firebase Admin SDK.
- Admin routes require an authenticated session and administrator email authorization.
- CSRF protection is enforced on forms and JSON API requests.
- Session cookies are HTTP-only and use `SameSite=Lax`.
- Production cookies are marked secure when `NODE_ENV=production`.
- Admin login requests use a stricter rate limit than public pages.

## Dashboard
The dashboard displays:
- Projects
- Skills
- Certifications
- Experience
- Education
- Contact messages
- Statistics
- Recent administrator activity

## Content Modules
The admin area supports create, read, update, delete, search, sorting, pagination, and validation for:
- Projects
- Skills
- Certifications
- Experience
- Education
- Timeline
- Testimonials
- Social links
- Downloads

Content is stored in Oracle `CONTENT_ITEMS` records with module type, title, slug, status, display order, search text, and a JSON payload stored as CLOB.

## Contact Messages
Public contact form submissions are saved to Oracle `CONTACT_MESSAGES`.

Administrators can:
- View messages
- Mark messages unread, read, or archived
- Delete messages

SMTP email is attempted only when SMTP environment variables are configured.

## File Uploads
Supported uploads:
- Resume PDF
- Certificates
- Project images
- Profile image

Uploads are validated for type, size, and filename safety. Metadata is stored in `FILE_UPLOADS`.

## API
Protected JSON APIs are available under `/api/admin/:moduleKey`.

Supported methods:
- `GET`
- `POST`
- `PUT`
- `DELETE`

Clients must be authenticated as the administrator and include the CSRF token.
