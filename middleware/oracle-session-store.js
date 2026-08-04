const session = require('express-session');
const { getConnection } = require('../config/database');
const logger = require('../config/logger');

class OracleSessionStore extends session.Store {
  async get(sid, callback) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute('SELECT SESS FROM SESSIONS WHERE SID = :sid AND EXPIRE > CURRENT_TIMESTAMP', { sid });
      if (!result.rows.length) {
        return callback(null, null);
      }
      return callback(null, JSON.parse(result.rows[0].SESS));
    } catch (error) {
      logger.error('Oracle session read failed.', { message: error.message });
      return callback(error);
    } finally {
      if (connection) await connection.close();
    }
  }

  async set(sid, sess, callback) {
    let connection;
    try {
      connection = await getConnection();
      const expire = sess.cookie?.expires ? new Date(sess.cookie.expires) : new Date(Date.now() + 24 * 60 * 60 * 1000);
      await connection.execute(
        `MERGE INTO SESSIONS target USING (SELECT :sid AS SID, :sess AS SESS, :expire AS EXPIRE FROM DUAL) source ON (target.SID = source.SID)
         WHEN MATCHED THEN UPDATE SET SESS = source.SESS, EXPIRE = source.EXPIRE
         WHEN NOT MATCHED THEN INSERT (SID, SESS, EXPIRE) VALUES (source.SID, source.SESS, source.EXPIRE)`,
        { sid, sess: JSON.stringify(sess), expire },
        { autoCommit: true }
      );
      return callback(null);
    } catch (error) {
      logger.error('Oracle session write failed.', { message: error.message });
      return callback(error);
    } finally {
      if (connection) await connection.close();
    }
  }

  async destroy(sid, callback) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute('DELETE FROM SESSIONS WHERE SID = :sid', { sid }, { autoCommit: true });
      return callback(null);
    } catch (error) {
      logger.error('Oracle session destroy failed.', { message: error.message });
      return callback(error);
    } finally {
      if (connection) await connection.close();
    }
  }

  touch(sid, sess, callback) {
    return this.set(sid, sess, callback);
  }
}

module.exports = OracleSessionStore;
