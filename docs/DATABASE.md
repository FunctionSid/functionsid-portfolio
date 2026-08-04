# Database Specification & Schema Design

## Database Overview
- **Official Database:** Oracle Autonomous Database (`SIDCORE`, 19c OLTP Always Free).
- **Local Development:** Windows 11 local development connects to Oracle Autonomous Database through configuration. Do not use SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore, or any other replacement database for FunctionSid.
- **Production:** Oracle Linux production connects to the same Oracle Autonomous Database architecture through environment-specific configuration.
- **Single Database Architecture:** FunctionSid has one database architecture. Environment differences are handled only through environment variables and Oracle wallet configuration.
- **Architecture:** Zero containerized databases (no Docker/Podman database instances).
- **Driver:** Official Oracle Node.js Driver (`oracledb`) in Thin mode unless a future Oracle requirement explicitly requires Thick mode.
- **Connection Pooling:** Use `oracledb.createPool()` for pooled connections. Never create a new standalone Oracle connection per request.
- **Authentication:** mTLS using downloaded Oracle Wallet credentials configured outside source control.
- **Connection Alias:** `sidcore_high`.
- **Administrative User:** `ADMIN` is used only for initial database administration and schema creation.
- **Application Schema User:** `FUNCTIONSID` is the dedicated runtime schema. The application must connect as `FUNCTIONSID`, never as `ADMIN`.
- **Application Schema Password:** Configured via environment variable `DB_PASSWORD`. Use the same password as the current Oracle `ADMIN` account unless project documentation is updated with a separate approved schema password.
- **Connection Pool Rules:** Small connection pool (min 1, max 4) to respect Always Free ECPU limits.

---

## Centralized Database Module

All Oracle connections must originate from the centralized database configuration module:

```text
config/database.js
```

No route, controller, service, repository, view, or utility script may create its own independent Oracle pool. Controllers must never contain SQL.

Required data-access layering:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Oracle Autonomous Database
```

- Routes define HTTP endpoints and delegate request handling.
- Controllers validate request shape and call services.
- Services contain business logic and orchestration.
- Repositories contain SQL and Oracle data access only.
- SQL must not appear in controllers or EJS views.

---

## Connection Configuration (`.env`)

Normal application runtime uses only the dedicated `FUNCTIONSID` schema. Do not keep Oracle `ADMIN` credentials in the runtime environment after the schema exists.

```env
DB_USER=FUNCTIONSID
DB_PASSWORD=your_functionsid_schema_password
DB_CONNECT_STRING=sidcore_high
DB_WALLET_DIR=path_to_oracle_wallet_directory
DB_WALLET_PASSWORD=your_oracle_wallet_password
TNS_ADMIN=path_to_oracle_wallet_directory
DB_POOL_MIN=1
DB_POOL_MAX=4
DB_POOL_INCREMENT=1
DB_POOL_QUEUE_TIMEOUT=120000
DB_POOL_CONNECT_TIMEOUT=60
```

For one-time schema setup or repair only, provide the administrator variables when running `scripts/init-db.js`:

```env
DB_ADMIN_USER=ADMIN
DB_ADMIN_PASSWORD=your_existing_oracle_admin_password
DB_APP_SCHEMA=FUNCTIONSID
```

Remove `DB_ADMIN_USER` and `DB_ADMIN_PASSWORD` from the normal runtime `.env` after initialization. Do not commit `.env`, Oracle wallet files, passwords, or credentials.

For local Windows development, the verified wallet directory is `D:/project/Oracle/Wallets/SIDCORE`. For Oracle Linux production, use the same copied wallet at `/home/opc/oracle-wallet` and change only `DB_WALLET_DIR` and `TNS_ADMIN` to that production path. Keep `DB_WALLET_PASSWORD` configured as an environment secret; node-oracledb Thin mode requires it to decrypt the wallet PEM file.

---

## Schema Initialization

The database initialization script can use two connection stages:

1. **ADMIN setup stage:** `DB_ADMIN_USER=ADMIN` and `DB_ADMIN_PASSWORD` are used only to create or synchronize the `FUNCTIONSID` schema. This stage is skipped when those variables are not present.
2. **Application schema stage:** `DB_USER=FUNCTIONSID` and `DB_PASSWORD` are used to create the FunctionSid application tables.

Minimum privileges granted to `FUNCTIONSID`:

```sql
GRANT CREATE SESSION TO FUNCTIONSID;
GRANT CREATE TABLE TO FUNCTIONSID;
ALTER USER FUNCTIONSID QUOTA 100M ON DATA;
```

Do not grant broad DBA privileges to the application schema.

---

## Schema Definition (Single-Line DDL Statements)

### 1. PROJECTS Table
```sql
CREATE TABLE PROJECTS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, TITLE VARCHAR2(150) NOT NULL, SLUG VARCHAR2(150) UNIQUE NOT NULL, SUMMARY VARCHAR2(500) NOT NULL, TECH_STACK VARCHAR2(300) NOT NULL, REPO_URL VARCHAR2(300), LIVE_URL VARCHAR2(300), IMAGE_PATH VARCHAR2(300), IMAGE_ALT VARCHAR2(500), FEATURED NUMBER(1) DEFAULT 0, CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
```

### 2. COMMENTS Table (Moderated Queue)
```sql
CREATE TABLE COMMENTS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, PROJECT_ID NUMBER NOT NULL, AUTHOR_NAME VARCHAR2(150) NOT NULL, AUTHOR_EMAIL VARCHAR2(150) NOT NULL, COMMENT_TEXT VARCHAR2(1000) NOT NULL, STATUS VARCHAR2(20) DEFAULT 'pending' CHECK (STATUS IN ('pending', 'approved', 'rejected')), CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT FK_COMMENTS_PROJECT FOREIGN KEY (PROJECT_ID) REFERENCES PROJECTS(ID) ON DELETE CASCADE);
```

### 3. CERTIFICATIONS Table
```sql
CREATE TABLE CERTIFICATIONS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, TITLE VARCHAR2(200) NOT NULL, ISSUER VARCHAR2(200) NOT NULL, CATEGORY VARCHAR2(50) NOT NULL CHECK (CATEGORY IN ('technical', 'office', 'soft_skills')), GRADE_STATUS VARCHAR2(100), ISSUE_YEAR VARCHAR2(20), TRANSCRIPT_URL VARCHAR2(400), DISPLAY_ORDER NUMBER DEFAULT 0);
```

### 4. SKILLS Table
```sql
CREATE TABLE SKILLS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, CATEGORY VARCHAR2(100) NOT NULL, SKILL_NAME VARCHAR2(100) NOT NULL, IS_TOP_SKILL NUMBER(1) DEFAULT 0, DISPLAY_ORDER NUMBER DEFAULT 0);
```

### 5. BLOG_POSTS Table
```sql
CREATE TABLE BLOG_POSTS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, TITLE VARCHAR2(200) NOT NULL, SLUG VARCHAR2(200) UNIQUE NOT NULL, SUMMARY VARCHAR2(500) NOT NULL, CONTENT CLOB NOT NULL, PUBLISHED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, IS_PUBLISHED NUMBER(1) DEFAULT 1);
```

### 6. CONTACT_MESSAGES Table (Inbox)
```sql
CREATE TABLE CONTACT_MESSAGES (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, FULL_NAME VARCHAR2(150) NOT NULL, EMAIL VARCHAR2(150) NOT NULL, SUBJECT VARCHAR2(200) NOT NULL, MESSAGE CLOB NOT NULL, MESSAGE_TYPE VARCHAR2(50) NOT NULL CHECK (MESSAGE_TYPE IN ('anonymous', 'google_authenticated')), STATUS VARCHAR2(20) DEFAULT 'unread' CHECK (STATUS IN ('unread', 'read', 'archived')), CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
```

### 7. SESSIONS Table (Oracle Express Session Store)
```sql
CREATE TABLE SESSIONS (SID VARCHAR2(100) PRIMARY KEY, SESS CLOB NOT NULL, EXPIRE TIMESTAMP NOT NULL);
```

### 8. CONTENT_ITEMS Table (Admin-managed Portfolio Content)
```sql
CREATE TABLE CONTENT_ITEMS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, CONTENT_TYPE VARCHAR2(50) NOT NULL, TITLE VARCHAR2(200) NOT NULL, SLUG VARCHAR2(200) NOT NULL, STATUS VARCHAR2(20) DEFAULT 'published' NOT NULL CHECK (STATUS IN ('draft', 'published', 'archived')), DISPLAY_ORDER NUMBER DEFAULT 0 NOT NULL, SEARCH_TEXT VARCHAR2(1000), PAYLOAD CLOB NOT NULL, CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, CONSTRAINT UQ_CONTENT_ITEMS_TYPE_SLUG UNIQUE (CONTENT_TYPE, SLUG));
```

### 9. ADMIN_USERS Table
```sql
CREATE TABLE ADMIN_USERS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, FIREBASE_UID VARCHAR2(150) NOT NULL, EMAIL VARCHAR2(200) NOT NULL UNIQUE, DISPLAY_NAME VARCHAR2(200), PHOTO_URL VARCHAR2(500), ROLE VARCHAR2(30) DEFAULT 'administrator' NOT NULL, CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, LAST_LOGIN_AT TIMESTAMP);
```

### 10. ADMIN_ACTIVITY Table
```sql
CREATE TABLE ADMIN_ACTIVITY (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ADMIN_EMAIL VARCHAR2(200) NOT NULL, ACTION VARCHAR2(100) NOT NULL, ENTITY_TYPE VARCHAR2(50), ENTITY_ID NUMBER, DETAILS VARCHAR2(500), CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);
```

### 11. FILE_UPLOADS Table
```sql
CREATE TABLE FILE_UPLOADS (ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, UPLOAD_TYPE VARCHAR2(40) NOT NULL CHECK (UPLOAD_TYPE IN ('resume', 'certificate', 'project-image', 'profile-image')), ORIGINAL_NAME VARCHAR2(255) NOT NULL, STORED_NAME VARCHAR2(255) NOT NULL, PUBLIC_PATH VARCHAR2(500) NOT NULL, MIME_TYPE VARCHAR2(120) NOT NULL, FILE_SIZE NUMBER NOT NULL, UPLOADED_BY VARCHAR2(200) NOT NULL, CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);
```

---

## Query Guidelines
1. Write single-line SQL queries whenever possible (per project user rules).
2. Always use parameterized bind parameters (`:id`, `:email`, `:status`) to prevent SQL injection vulnerabilities.
3. Keep transactions short and release connections immediately back to the pool.
4. Use Oracle SQL syntax only.
5. Keep all SQL in repository modules.
