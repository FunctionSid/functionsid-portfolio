#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"

cd "${APP_DIR}"

if [ ! -f "${APP_DIR}/.env" ]; then
  echo "Missing production environment file: ${APP_DIR}/.env" >&2
  exit 1
fi

if [ ! -d "${APP_DIR}/wallet" ]; then
  echo "Missing Oracle Wallet directory: ${APP_DIR}/wallet" >&2
  exit 1
fi

if pm2 describe functionsid >/dev/null 2>&1; then
  pm2 reload functionsid --update-env
else
  pm2 start ecosystem.config.js --env production
fi

pm2 save
pm2 status functionsid
