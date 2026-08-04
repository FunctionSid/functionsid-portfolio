const path = require('path');
const sanitize = require('sanitize-filename');
const fileRepository = require('../../repositories/file-repository');

const uploadRules = {
  resume: { folder: 'resumes', mimeTypes: ['application/pdf'], maxSize: 5 * 1024 * 1024 },
  certificate: { folder: 'certificates', mimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'], maxSize: 5 * 1024 * 1024 },
  'project-image': { folder: 'projects', mimeTypes: ['image/png', 'image/jpeg', 'image/webp'], maxSize: 3 * 1024 * 1024 },
  'profile-image': { folder: 'profile', mimeTypes: ['image/png', 'image/jpeg', 'image/webp'], maxSize: 3 * 1024 * 1024 }
};

function getUploadRule(type) {
  return uploadRules[type] || null;
}

function buildStoredName(originalName) {
  const parsed = path.parse(sanitize(originalName));
  const safeBase = parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'upload';
  return `${safeBase}-${Date.now()}${parsed.ext.toLowerCase()}`;
}

async function recordUpload({ type, file, uploadedBy }) {
  const rule = getUploadRule(type);
  if (!rule) {
    throw new Error('Unsupported upload type.');
  }

  const publicPath = `/uploads/${rule.folder}/${file.filename}`;
  await fileRepository.createUpload({
    uploadType: type,
    originalName: file.originalname,
    storedName: file.filename,
    publicPath,
    mimeType: file.mimetype,
    fileSize: file.size,
    uploadedBy
  });

  return { publicPath };
}

module.exports = { uploadRules, getUploadRule, buildStoredName, recordUpload };
