#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"
REPO_URL="https://github.com/FunctionSid/functionsid-portfolio.git"
WALLET_DIR="${APP_DIR}/wallet"

echo "Updating FunctionSid source at ${APP_DIR}."

if [ ! -d "${APP_DIR}/.git" ]; then
  sudo mkdir -p "${APP_DIR}"
  sudo chown -R "${USER}:${USER}" "${APP_DIR}"
  git clone "${REPO_URL}" "${APP_DIR}"
fi

mkdir -p "${APP_DIR}/logs" "${APP_DIR}/releases" "${APP_DIR}/shared" "${WALLET_DIR}" "${APP_DIR}/storage/tmp"

cd "${APP_DIR}"
git fetch origin main
git reset --hard origin/main
chmod +x "${APP_DIR}"/deploy/*.sh

if [ -d "${WALLET_DIR}" ]; then
  export TNS_ADMIN="${WALLET_DIR}"
fi

npm ci --omit=dev

if [ ! -f "${APP_DIR}/.env" ]; then
  echo "Production .env is not present at ${APP_DIR}/.env. This is expected before first deployment."
fi

if [ ! -f "${WALLET_DIR}/tnsnames.ora" ]; then
  echo "Oracle Wallet is not present at ${WALLET_DIR}. This is expected before first deployment."
fi

echo "Project files and production dependencies are ready. The application has not been started."
