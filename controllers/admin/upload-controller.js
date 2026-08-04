const path = require('path');
const multer = require('multer');
const uploadService = require('../../services/admin/upload-service');
const fileRepository = require('../../repositories/file-repository');
const adminRepository = require('../../repositories/admin-repository');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const rule = uploadService.getUploadRule(req.body.uploadType);
    if (!rule) {
      return callback(new Error('Unsupported upload type.'));
    }
    return callback(null, path.join(process.cwd(), 'storage', 'uploads', rule.folder));
  },
  filename(req, file, callback) {
    return callback(null, uploadService.buildStoredName(file.originalname));
  }
});

const uploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const rule = uploadService.getUploadRule(req.body.uploadType);
    if (!rule) {
      return callback(new Error('Unsupported upload type.'));
    }
    if (!rule.mimeTypes.includes(file.mimetype)) {
      return callback(new Error('Unsupported file type.'));
    }
    return callback(null, true);
  }
}).single('asset');

async function showUploads(req, res, next) {
  try {
    const uploads = await fileRepository.listUploads();
    return res.render('admin/uploads', {
      pageTitle: req.t('ui.admin.pages.fileUploadsTitle'),
      activePage: 'admin-uploads',
      uploads,
      uploadTypes: Object.keys(uploadService.uploadRules),
      error: null
    });
  } catch (error) {
    return next(error);
  }
}

function uploadAsset(req, res, next) {
  uploader(req, res, async (error) => {
    if (error) {
      const uploads = await fileRepository.listUploads();
      return res.status(422).render('admin/uploads', {
        pageTitle: req.t('ui.admin.pages.fileUploadsTitle'),
        activePage: 'admin-uploads',
        uploads,
        uploadTypes: Object.keys(uploadService.uploadRules),
        error: error.message
      });
    }

    if (!req.file) {
      return next(new Error('No file was uploaded.'));
    }

    try {
      const upload = await uploadService.recordUpload({
        type: req.body.uploadType,
        file: req.file,
        uploadedBy: req.session.admin.email
      });
      await adminRepository.recordActivity({
        adminEmail: req.session.admin.email,
        action: 'upload',
        entityType: req.body.uploadType,
        details: upload.publicPath
      });
      return res.redirect('/admin/uploads');
    } catch (repositoryError) {
      return next(repositoryError);
    }
  });
}

module.exports = { showUploads, uploadAsset };
