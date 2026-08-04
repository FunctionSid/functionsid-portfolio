#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"
TARGET_REF="${1:-HEAD~1}"

cd "${APP_DIR}"

echo "Preparing rollback to ${TARGET_REF}."
git fetch origin main
git reset --hard "${TARGET_REF}"
npm ci --omit=dev

echo "Rollback files are prepared. PM2 was not restarted. Start or reload the app manually only after production .env and shared wallet are ready."
