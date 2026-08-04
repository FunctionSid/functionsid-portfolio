#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/functionsid"

cd "${APP_DIR}"

if [ ! -f "${APP_DIR}/.env" ]; then
  echo "Missing production environment file: ${APP_DIR}/.env" >&2
  exit 1
fi

node <<'NODE'
require('dotenv').config();

const { initDb, getConnection, closePool } = require('./config/database');

(async () => {
  const pool = await initDb();
  if (!pool) {
    throw new Error('Oracle pool initialization returned null.');
  }

  const connection = await getConnection();

  try {
    const userResult = await connection.execute('SELECT USER AS CURRENT_USER FROM DUAL');
    const dbResult = await connection.execute("SELECT SYS_CONTEXT('USERENV','DB_NAME') AS DB_NAME FROM DUAL");
    const serviceResult = await connection.execute("SELECT SYS_CONTEXT('USERENV','SERVICE_NAME') AS SERVICE_NAME FROM DUAL");

    console.log(`Oracle user: ${userResult.rows[0].CURRENT_USER}`);
    console.log(`Oracle database: ${dbResult.rows[0].DB_NAME}`);
    console.log(`Oracle service: ${serviceResult.rows[0].SERVICE_NAME}`);
  } finally {
    await connection.close();
    await closePool();
  }
})().catch((err) => {
  console.error(`Oracle verification failed: ${err.message}`);
  process.exit(1);
});
NODE
