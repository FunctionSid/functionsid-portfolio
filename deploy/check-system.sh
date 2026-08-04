#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"

echo "System check"
echo "OS: $(cat /etc/os-release | grep '^PRETTY_NAME=' | cut -d= -f2- | tr -d '\"')"
echo "User: ${USER}"
echo "App directory: ${APP_DIR}"

test -d "${APP_DIR}"
test -w "${APP_DIR}"
test -d "${APP_DIR}/logs"
test -d "${APP_DIR}/releases"
test -d "${APP_DIR}/shared"
test -d "${APP_DIR}/wallet"
test -d "${APP_DIR}/storage/tmp"

echo "System directories are present and writable."
