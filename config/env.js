const REQUIRED_RUNTIME_VARS = [
  'NODE_ENV',
  'PORT',
  'ADMIN_EMAIL',
  'DB_USER',
  'DB_PASSWORD',
  'DB_CONNECT_STRING',
  'DB_WALLET_DIR',
  'DB_WALLET_PASSWORD',
  'TNS_ADMIN',
  'DB_POOL_MIN',
  'DB_POOL_MAX',
  'DB_POOL_INCREMENT',
  'DB_POOL_QUEUE_TIMEOUT',
  'DB_POOL_CONNECT_TIMEOUT'
];

const REQUIRED_PHASE3_VARS = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

function validateEnvironment({ strict = process.env.NODE_ENV === 'production' } = {}) {
  const required = strict ? [...REQUIRED_RUNTIME_VARS, ...REQUIRED_PHASE3_VARS] : REQUIRED_RUNTIME_VARS;
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { validateEnvironment, REQUIRED_RUNTIME_VARS, REQUIRED_PHASE3_VARS };
