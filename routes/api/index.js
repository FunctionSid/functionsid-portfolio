const express = require('express');
const contentApiController = require('../../controllers/api/content-api-controller');
const { requireAdminSession, requireAdministrator } = require('../../middleware/admin/auth');

const router = express.Router();

router.use(requireAdminSession, requireAdministrator);

router.get('/admin/:moduleKey', contentApiController.list);
router.post('/admin/:moduleKey', contentApiController.create);
router.put('/admin/:moduleKey/:id', contentApiController.update);
router.delete('/admin/:moduleKey/:id', contentApiController.remove);

module.exports = router;
