#!/usr/bin/env bash
set -euo pipefail

command -v node >/dev/null 2>&1
command -v npm >/dev/null 2>&1

NODE_VERSION="$(node --version)"
NPM_VERSION="$(npm --version)"

echo "Node.js: ${NODE_VERSION}"
echo "npm: ${NPM_VERSION}"

if ! echo "${NODE_VERSION}" | grep -q '^v24\.'; then
  echo "Node.js 24.x is required." >&2
  exit 1
fi

echo "Node.js check passed."
