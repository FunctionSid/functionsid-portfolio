require('dotenv').config({ override: true });

const { initDb, initAdminDb, getConnection, getAdminConnection, closePool, closeAdminPool } = require('../config/database');
const logger = require('../config/logger');
const { ensureApplicationSchema, initializeSchema } = require('../repositories/schema-repository');
const { seedContent } = require('../services/content-service');

async function initializeDatabase() {
  let adminConnection;
  let connection;

  try {
    await initAdminDb();
    if (process.env.DB_ADMIN_USER && process.env.DB_ADMIN_PASSWORD) {
      adminConnection = await getAdminConnection();
      await ensureApplicationSchema(adminConnection, {
        schemaName: process.env.DB_APP_SCHEMA || 'FUNCTIONSID',
        schemaPassword: process.env.DB_PASSWORD
      }, logger);
    }

    await initDb();
    connection = await getConnection();
    await initializeSchema(connection, logger);
    await connection.commit();
    const seededRows = await seedContent();

    logger.info('Oracle database schema initialization completed.', { seededRows });
  } catch (error) {
    logger.error('Oracle database schema initialization failed.', { message: error.message });
    process.exitCode = 1;
  } finally {
    if (adminConnection) {
      try {
        await adminConnection.close();
      } catch (error) {
        logger.error('Oracle administrator connection close failed.', { message: error.message });
      }
    }

    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        logger.error('Oracle connection close failed.', { message: error.message });
      }
    }

    await closePool();
    await closeAdminPool();
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
