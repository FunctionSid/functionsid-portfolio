const oracledb = require('oracledb');
const { withConnection, withTransaction, normalizeRows, normalizeRow } = require('./oracle-utils');

function mapMessage(row) {
  const normalized = normalizeRow(row);
  return {
    id: normalized.id,
    fullName: normalized.full_name,
    email: normalized.email,
    subject: normalized.subject,
    message: normalized.message,
    messageType: normalized.message_type,
    status: normalized.status,
    createdAt: normalized.created_at
  };
}

async function createMessage(message) {
  return withTransaction(async (connection) => {
    const result = await connection.execute(
      'INSERT INTO CONTACT_MESSAGES (FULL_NAME, EMAIL, SUBJECT, MESSAGE, MESSAGE_TYPE, STATUS) VALUES (:fullName, :email, :subject, :message, :messageType, :status) RETURNING ID INTO :id',
      {
        fullName: message.fullName,
        email: message.email,
        subject: message.subject,
        message: { val: message.message, type: oracledb.CLOB },
        messageType: message.messageType || 'anonymous',
        status: 'unread',
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    return result.outBinds.id[0];
  });
}

async function listMessages({ search = '', status, page = 1, pageSize = 10 } = {}) {
  const filters = ['(LOWER(FULL_NAME) LIKE :search OR LOWER(EMAIL) LIKE :search OR LOWER(SUBJECT) LIKE :search)'];
  const binds = {
    search: `%${search.toLowerCase()}%`,
    offset: (page - 1) * pageSize,
    pageSize
  };

  if (status) {
    filters.push('STATUS = :status');
    binds.status = status;
  }

  const where = filters.join(' AND ');
  return withConnection(async (connection) => {
    const messages = await connection.execute(
      `SELECT ID, FULL_NAME, EMAIL, SUBJECT, MESSAGE, MESSAGE_TYPE, STATUS, CREATED_AT FROM CONTACT_MESSAGES WHERE ${where} ORDER BY CREATED_AT DESC OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY`,
      binds
    );
    const total = await connection.execute(`SELECT COUNT(*) AS TOTAL FROM CONTACT_MESSAGES WHERE ${where}`, binds);
    return { items: messages.rows.map(mapMessage), total: total.rows[0].TOTAL };
  });
}

async function getMessage(id) {
  return withConnection(async (connection) => {
    const result = await connection.execute('SELECT ID, FULL_NAME, EMAIL, SUBJECT, MESSAGE, MESSAGE_TYPE, STATUS, CREATED_AT FROM CONTACT_MESSAGES WHERE ID = :id', { id });
    return result.rows.length ? mapMessage(result.rows[0]) : null;
  });
}

async function updateMessageStatus(id, status) {
  return withTransaction(async (connection) => {
    const result = await connection.execute('UPDATE CONTACT_MESSAGES SET STATUS = :status WHERE ID = :id', { id, status });
    return result.rowsAffected;
  });
}

async function deleteMessage(id) {
  return withTransaction(async (connection) => {
    const result = await connection.execute('DELETE FROM CONTACT_MESSAGES WHERE ID = :id', { id });
    return result.rowsAffected;
  });
}

async function getMessageStats() {
  return withConnection(async (connection) => {
    const result = await connection.execute('SELECT STATUS, COUNT(*) AS TOTAL FROM CONTACT_MESSAGES GROUP BY STATUS');
    return normalizeRows(result.rows).reduce((stats, row) => {
      stats[row.status] = row.total;
      return stats;
    }, {});
  });
}

module.exports = { createMessage, listMessages, getMessage, updateMessageStatus, deleteMessage, getMessageStats };
