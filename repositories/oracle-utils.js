const { getConnection } = require('../config/database');

async function withConnection(work) {
  const connection = await getConnection();
  try {
    return await work(connection);
  } finally {
    await connection.close();
  }
}

async function withTransaction(work) {
  const connection = await getConnection();
  try {
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.close();
  }
}

function normalizeRow(row) {
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]));
}

function normalizeRows(rows) {
  return rows.map(normalizeRow);
}

module.exports = { withConnection, withTransaction, normalizeRow, normalizeRows };
