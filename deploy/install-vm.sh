#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"
RELEASES_DIR="${APP_DIR}/releases"
SHARED_DIR="${APP_DIR}/shared"
WALLET_DIR="${APP_DIR}/wallet"
NODE_SETUP_URL="https://rpm.nodesource.com/setup_24.x"

echo "Preparing Oracle Linux VM prerequisites for FunctionSid."

if ! command -v dnf >/dev/null 2>&1; then
  echo "This script expects Oracle Linux or another DNF-based distribution." >&2
  exit 1
fi

for package in git nginx unzip curl; do
  if ! rpm -q "${package}" >/dev/null 2>&1; then
    sudo dnf install -y "${package}"
  fi
done

if ! command -v node >/dev/null 2>&1 || ! node --version | grep -q '^v24\.'; then
  curl -fsSL "${NODE_SETUP_URL}" | sudo bash -
  sudo dnf install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

sudo mkdir -p "${APP_DIR}" "${APP_DIR}/logs" "${APP_DIR}/storage/tmp" "${RELEASES_DIR}" "${SHARED_DIR}" "${WALLET_DIR}"
sudo chown -R "${USER}:${USER}" "${APP_DIR}"
chmod 700 "${WALLET_DIR}"

if [ -f "${APP_DIR}/deploy/nginx/functionsid.conf.template" ]; then
  sudo cp "${APP_DIR}/deploy/nginx/functionsid.conf.template" /etc/nginx/conf.d/functionsid.conf.disabled
  echo "Prepared disabled Nginx config at /etc/nginx/conf.d/functionsid.conf.disabled."
fi

echo "VM prerequisites are installed. The application has not been started."
