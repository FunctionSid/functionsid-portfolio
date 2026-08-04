#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"${SCRIPT_DIR}/check-system.sh"
"${SCRIPT_DIR}/check-node.sh"
"${SCRIPT_DIR}/check-nginx.sh"
"${SCRIPT_DIR}/check-pm2.sh"
"${SCRIPT_DIR}/check-wallet.sh"
"${SCRIPT_DIR}/check-oracle.sh"

cd "${APP_DIR}"

test -d .git
test -d node_modules
test -f package-lock.json
test -x deploy/install-vm.sh
test -x deploy/update.sh
test -x deploy/check.sh
test -x deploy/rollback.sh
test -x deploy/check-wallet.sh
test -x deploy/check-oracle.sh
test -x deploy/reload-app.sh

echo "Current branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Latest commit: $(git rev-parse --short HEAD)"
echo "Repository status:"
git status --short --branch
echo "Dependencies: installed"
echo "Directory tree:"
find "${APP_DIR}" -maxdepth 2 -type d \
  -not -path "${APP_DIR}/node_modules" \
  -not -path "${APP_DIR}/node_modules/*" \
  -print | sort

if [ ! -f "${APP_DIR}/.env" ]; then
  echo "Warning: production .env is not present at ${APP_DIR}/.env. The application must remain stopped."
fi

echo "Deployment readiness checks completed. The application has not been started."
