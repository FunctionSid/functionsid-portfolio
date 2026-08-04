#!/usr/bin/env bash
set -euo pipefail

command -v pm2 >/dev/null 2>&1

if ! npm list -g pm2 --depth=0 >/dev/null 2>&1; then
  echo "PM2 command exists, but npm global package verification failed." >&2
  exit 1
fi

if pgrep -af "[n]ode /opt/functionsid/app.js|[n]ode .* /opt/functionsid/app.js" >/dev/null 2>&1; then
  echo "PM2 is installed. FunctionSid application process is already running."
elif pgrep -af "[p]m2: God Daemon" >/dev/null 2>&1; then
  echo "PM2 is installed. PM2 daemon is running; FunctionSid process is not currently online."
else
  echo "PM2 is installed. No PM2 daemon is currently running."
fi
