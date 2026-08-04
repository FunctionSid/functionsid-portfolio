const express = require('express');
const authController = require('../../controllers/admin/auth-controller');
const dashboardController = require('../../controllers/admin/dashboard-controller');
const contentController = require('../../controllers/admin/content-controller');
const messageController = require('../../controllers/admin/message-controller');
const uploadController = require('../../controllers/admin/upload-controller');
const { requireAdminSession, requireAdministrator } = require('../../middleware/admin/auth');
const { adminLimiter } = require('../../middleware/rate-limiters');

const router = express.Router();

router.get('/login', authController.showLogin);
router.post('/login', adminLimiter, authController.login);
router.post('/logout', requireAdminSession, authController.logout);

router.use(requireAdminSession, requireAdministrator);

router.get('/', dashboardController.showDashboard);
router.get('/messages', messageController.list);
router.get('/messages/:id', messageController.detail);
router.post('/messages/:id/status', messageController.updateStatus);
router.post('/messages/:id/delete', messageController.remove);
router.get('/uploads', uploadController.showUploads);
router.post('/uploads', uploadController.uploadAsset);

router.get('/:moduleKey', contentController.list);
router.get('/:moduleKey/new', contentController.createForm);
router.post('/:moduleKey', contentController.create);
router.get('/:moduleKey/:id/edit', contentController.editForm);
router.post('/:moduleKey/:id', contentController.update);
router.post('/:moduleKey/:id/delete', contentController.remove);

module.exports = router;
