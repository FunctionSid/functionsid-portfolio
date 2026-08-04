# Deployment Process & Infrastructure Guide

## Target Production Environment
- **Provider:** Oracle Cloud Infrastructure (OCI)
- **VM Shape:** `VM.Standard.E2.1.Micro` (AMD EPYC, x86_64, 2 vCPUs)
- **OS:** Oracle Linux 9.8 (DNF package manager)
- **Memory:** 1 GB RAM + 4 GB swapfile (`/swapfile`)
- **Process Manager:** PM2 (`--max-memory-restart 200M`)
- **Reverse Proxy:** Nginx (listening on 80/443, proxying to `localhost:3000`)
- **HTTPS:** Certbot Let's Encrypt certificates

---

## Deployment Pipeline Architecture

```
Windows 11
            ↓  git push origin main
GitHub (FunctionSid/functionsid)
            ↓  GitHub Actions triggered
Oracle Cloud Linux VM (/home/opc/FunctionSid)
            ↓  git pull
            ↓  npm ci
PM2 Restart `functionsid`
            ↓
Nginx Reverse Proxy Reload
            ↓
https://functionsid.duckdns.org
```

---

## Nginx Site Configuration (`/etc/nginx/conf.d/siddharth.conf`)

```nginx
server {
    listen 80;
    server_name functionsid.duckdns.org;

    client_max_body_size 5M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /public/ {
        alias /home/opc/FunctionSid/public/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## PM2 Process Management

### Ecosystem File (`ecosystem.config.js`)
```javascript
module.exports = {
  apps: [{
    name: "functionsid",
    script: "./app.js",
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: "200M",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};
```

---

## Step-by-Step Production Deployment Commands

### 1. Initial VM Setup (Oracle Linux 9.8)
```bash
sudo dnf update -y
sudo dnf install -y git nginx
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
sudo npm install -g pm2
```

### 2. Application Setup
```bash
mkdir -p /home/opc/FunctionSid
cd /home/opc/FunctionSid
git clone https://github.com/FunctionSid/functionsid.git .
npm ci
pm2 start ecosystem.config.js
pm2 save
pm2 startup
pm2 install pm2-logrotate
sudo systemctl enable nginx --now
```
*Note: GitHub Actions should restart only the `functionsid` process (`pm2 restart functionsid`). Never restart unrelated services.*

### 2.1 Production Environment Variables
Production uses the same Oracle Autonomous Database and the same copied wallet. Do not download or regenerate the wallet.

```env
NODE_ENV=production
PORT=3000
ADMIN_EMAIL=functionsid@gmail.com
SESSION_SECRET=replace_with_long_random_session_secret
DB_USER=FUNCTIONSID
DB_PASSWORD=replace_with_functionsid_schema_password
DB_CONNECT_STRING=sidcore_high
DB_WALLET_DIR=/home/opc/oracle-wallet
DB_WALLET_PASSWORD=replace_with_oracle_wallet_password
TNS_ADMIN=/home/opc/oracle-wallet
DB_POOL_MIN=1
DB_POOL_MAX=4
DB_POOL_INCREMENT=1
DB_POOL_QUEUE_TIMEOUT=120000
DB_POOL_CONNECT_TIMEOUT=60
```

Firebase Admin and SMTP secrets must also be provided through the VM environment or PM2 ecosystem environment. Never commit `.env`, the Oracle wallet, or Firebase service account JSON.

### 3. SSL Configuration via Certbot
```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d functionsid.duckdns.org
```

---

## Logging & Monitoring

### Logging Structure & Policy
- **Application Logs:** Rotate at 10 MB. Compress old logs. Delete after 30 days.
- **PM2 Logs:** Managed by `pm2-logrotate`. Keep the last 10 rotated log files. Automatically compress rotated logs.
- **Nginx Logs:** Managed by `logrotate`. Compress rotated logs. Delete access logs after 30 days. Delete error logs after 60 days.
- **Deployment Logs:** GitHub Actions keeps deployment history. Do not duplicate deployment logs on the server unless necessary.
- **Temporary Storage:** Automatically remove temporary files older than 7 days. Permanent files are never deleted automatically.

### System Monitoring
The Oracle Cloud VM must be monitored for stability due to Always Free tier limitations. **Do not install monitoring software.** Only document the monitoring strategy.
- **Application Health:** Monitor PM2 process status and Application uptime.
- **Resource Usage:** Monitor Memory usage, CPU usage, Disk usage, and Swap usage.
- **Network & Service:** Monitor Nginx status and SSL certificate expiry.
- **Server Health:** Monitor overall Oracle VM health.
