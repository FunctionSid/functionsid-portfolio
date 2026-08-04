const { withConnection, withTransaction, normalizeRows } = require('./oracle-utils');

async function upsertAdminProfile(profile) {
  return withTransaction(async (connection) => {
    await connection.execute(
      `MERGE INTO ADMIN_USERS target USING (SELECT :firebaseUid AS FIREBASE_UID, :email AS EMAIL, :displayName AS DISPLAY_NAME, :photoUrl AS PHOTO_URL FROM DUAL) source ON (target.EMAIL = source.EMAIL)
       WHEN MATCHED THEN UPDATE SET FIREBASE_UID = source.FIREBASE_UID, DISPLAY_NAME = source.DISPLAY_NAME, PHOTO_URL = source.PHOTO_URL, LAST_LOGIN_AT = CURRENT_TIMESTAMP
       WHEN NOT MATCHED THEN INSERT (FIREBASE_UID, EMAIL, DISPLAY_NAME, PHOTO_URL, ROLE, LAST_LOGIN_AT) VALUES (source.FIREBASE_UID, source.EMAIL, source.DISPLAY_NAME, source.PHOTO_URL, 'administrator', CURRENT_TIMESTAMP)`,
      profile
    );
  });
}

async function recordActivity(activity) {
  return withTransaction(async (connection) => {
    await connection.execute(
      'INSERT INTO ADMIN_ACTIVITY (ADMIN_EMAIL, ACTION, ENTITY_TYPE, ENTITY_ID, DETAILS) VALUES (:adminEmail, :action, :entityType, :entityId, :details)',
      {
        adminEmail: activity.adminEmail,
        action: activity.action,
        entityType: activity.entityType || null,
        entityId: activity.entityId || null,
        details: activity.details || null
      }
    );
  });
}

async function recentActivity(limit = 10) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      'SELECT ID, ADMIN_EMAIL, ACTION, ENTITY_TYPE, ENTITY_ID, DETAILS, CREATED_AT FROM ADMIN_ACTIVITY ORDER BY CREATED_AT DESC FETCH FIRST :limit ROWS ONLY',
      { limit }
    );
    return normalizeRows(result.rows);
  });
}

module.exports = { upsertAdminProfile, recordActivity, recentActivity };
