#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"
WALLET_DIR="${APP_DIR}/wallet"
missing=0

echo "Oracle Wallet check"
echo "Wallet directory: ${WALLET_DIR}"

if [ ! -d "${WALLET_DIR}" ]; then
  echo "Missing wallet directory: ${WALLET_DIR}" >&2
  exit 1
fi

for file in cwallet.sso ewallet.p12 ewallet.pem tnsnames.ora sqlnet.ora ojdbc.properties keystore.jks truststore.jks README; do
  if [ ! -f "${WALLET_DIR}/${file}" ]; then
    echo "Missing wallet file: ${file}" >&2
    missing=1
  fi
done

if [ "${missing}" -ne 0 ]; then
  exit 1
fi

test -r "${WALLET_DIR}/tnsnames.ora"
test -r "${WALLET_DIR}/sqlnet.ora"

echo "Oracle Wallet files are present and readable."
