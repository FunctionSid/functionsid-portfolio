const { withConnection, withTransaction, normalizeRows, normalizeRow } = require('./oracle-utils');

function mapFile(row) {
  const normalized = normalizeRow(row);
  return {
    id: normalized.id,
    uploadType: normalized.upload_type,
    originalName: normalized.original_name,
    storedName: normalized.stored_name,
    publicPath: normalized.public_path,
    mimeType: normalized.mime_type,
    fileSize: normalized.file_size,
    uploadedBy: normalized.uploaded_by,
    createdAt: normalized.created_at
  };
}

async function createUpload(file) {
  return withTransaction(async (connection) => {
    await connection.execute(
      'INSERT INTO FILE_UPLOADS (UPLOAD_TYPE, ORIGINAL_NAME, STORED_NAME, PUBLIC_PATH, MIME_TYPE, FILE_SIZE, UPLOADED_BY) VALUES (:uploadType, :originalName, :storedName, :publicPath, :mimeType, :fileSize, :uploadedBy)',
      file
    );
  });
}

async function listUploads() {
  return withConnection(async (connection) => {
    const result = await connection.execute('SELECT ID, UPLOAD_TYPE, ORIGINAL_NAME, STORED_NAME, PUBLIC_PATH, MIME_TYPE, FILE_SIZE, UPLOADED_BY, CREATED_AT FROM FILE_UPLOADS ORDER BY CREATED_AT DESC');
    return result.rows.map(mapFile);
  });
}

module.exports = { createUpload, listUploads };
