#!/usr/bin/env bash
set -euo pipefail

command -v pm2 >/dev/null 2>&1

if ! npm list -g pm2 --depth=0 >/dev/null 2>&1; then
  echo "PM2 command exists, but npm global package verification failed." >&2
  exit 1
fi

if pgrep -af "[p]m2: God Daemon|[n]ode /opt/functionsid/app.js|[n]ode .* /opt/functionsid/app.js" >/dev/null 2>&1; then
  echo "A PM2 daemon or FunctionSid Node process appears to be running. Stop it before using this deployment-preparation workflow." >&2
  pgrep -af "[p]m2: God Daemon|[n]ode /opt/functionsid/app.js|[n]ode .* /opt/functionsid/app.js" >&2
  exit 1
else
  echo "PM2 is installed. No PM2 daemon or FunctionSid Node process is running."
fi
