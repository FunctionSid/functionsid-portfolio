const oracledb = require('oracledb');
const logger = require('./logger');

oracledb.fetchAsString = [oracledb.CLOB];
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool = null;
let adminPool = null;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for Oracle database configuration.`);
  }
  return value;
}

function getPoolOptions({ user, password }) {
  return {
    user,
    password,
    connectString: requiredEnv('DB_CONNECT_STRING'),
    configDir: process.env.TNS_ADMIN || requiredEnv('DB_WALLET_DIR'),
    walletLocation: requiredEnv('DB_WALLET_DIR'),
    walletPassword: requiredEnv('DB_WALLET_PASSWORD'),
    poolMin: Number.parseInt(process.env.DB_POOL_MIN || '1', 10),
    poolMax: Number.parseInt(process.env.DB_POOL_MAX || '4', 10),
    poolIncrement: Number.parseInt(process.env.DB_POOL_INCREMENT || '1', 10),
    queueTimeout: Number.parseInt(process.env.DB_POOL_QUEUE_TIMEOUT || '120000', 10),
    connectTimeout: Number.parseInt(process.env.DB_POOL_CONNECT_TIMEOUT || '60', 10)
  };
}

async function initDb() {
  try {
    if (process.env.DB_USER && process.env.DB_PASSWORD) {
      if (pool) {
        return pool;
      }

      pool = await oracledb.createPool(getPoolOptions({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }));
      logger.info('Oracle Autonomous Database connection pool initialized.');
      return pool;
    } else {
      logger.warn('Oracle database environment variables missing. Running without an initialized pool.');
      return null;
    }
  } catch (err) {
    logger.error('Oracle database pool initialization failed.', { message: err.message });
    return null;
  }
}

async function initAdminDb() {
  try {
    if (process.env.DB_ADMIN_USER && process.env.DB_ADMIN_PASSWORD) {
      if (adminPool) {
        return adminPool;
      }

      adminPool = await oracledb.createPool(getPoolOptions({
        user: process.env.DB_ADMIN_USER,
        password: process.env.DB_ADMIN_PASSWORD
      }));
      logger.info('Oracle administrator connection pool initialized for schema setup.');
      return adminPool;
    }

    logger.warn('Oracle administrator environment variables missing. Schema user setup skipped.');
    return null;
  } catch (err) {
    logger.error('Oracle administrator pool initialization failed.', { message: err.message });
    return null;
  }
}

async function getConnection() {
  if (!pool) {
    throw new Error('Database connection pool is not initialized.');
  }
  return await pool.getConnection();
}

async function getAdminConnection() {
  if (!adminPool) {
    throw new Error('Database administrator connection pool is not initialized.');
  }
  return await adminPool.getConnection();
}

function getPool() {
  return pool;
}

async function closePool() {
  if (pool) {
    await pool.close(10);
    pool = null;
    logger.info('Oracle Autonomous Database connection pool closed.');
  }
}

async function closeAdminPool() {
  if (adminPool) {
    await adminPool.close(10);
    adminPool = null;
    logger.info('Oracle administrator connection pool closed.');
  }
}

module.exports = { initDb, initAdminDb, getConnection, getAdminConnection, getPool, closePool, closeAdminPool };
