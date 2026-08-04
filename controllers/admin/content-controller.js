const contentService = require('../../services/content-service');
const adminRepository = require('../../repositories/admin-repository');

function formViewModel(req, item = null, errors = [], formData = null) {
  const moduleKey = req.params.moduleKey;
  const module = contentService.getModuleConfig(moduleKey);
  const singular = req.t(`ui.admin.modules.${moduleKey}.singular`, { defaultValue: module.singular });
  return {
    pageTitle: `${item ? req.t('ui.admin.edit') : req.t('ui.admin.new')} ${singular}`,
    activePage: 'admin-content',
    moduleKey,
    module: { key: moduleKey, ...module },
    item,
    formData: formData || item?.payload || {},
    errors
  };
}

async function list(req, res, next) {
  try {
    const viewModel = await contentService.listModuleItems(req.params.moduleKey, req.query);
    if (!viewModel) return next();
    return res.render('admin/modules/list', {
      pageTitle: req.t(`ui.admin.modules.${req.params.moduleKey}.label`, { defaultValue: viewModel.module.label }),
      activePage: 'admin-content',
      ...viewModel
    });
  } catch (error) {
    return next(error);
  }
}

function createForm(req, res, next) {
  const module = contentService.getModuleConfig(req.params.moduleKey);
  if (!module) return next();
  return res.render('admin/modules/form', formViewModel(req));
}

async function create(req, res, next) {
  try {
    const id = await contentService.createModuleItem(req.params.moduleKey, req.body);
    await adminRepository.recordActivity({
      adminEmail: req.session.admin.email,
      action: 'create',
      entityType: req.params.moduleKey,
      entityId: id,
      details: req.body.title
    });
    return res.redirect(`/admin/${req.params.moduleKey}`);
  } catch (error) {
    if (error.validationErrors) {
      return res.status(422).render('admin/modules/form', formViewModel(req, null, error.validationErrors, req.body));
    }
    return next(error);
  }
}

async function editForm(req, res, next) {
  try {
    const item = await contentService.getModuleItem(req.params.moduleKey, req.params.id);
    if (!item) return next();
    return res.render('admin/modules/form', formViewModel(req, item));
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const rows = await contentService.updateModuleItem(req.params.moduleKey, req.params.id, req.body);
    if (!rows) return next();
    await adminRepository.recordActivity({
      adminEmail: req.session.admin.email,
      action: 'update',
      entityType: req.params.moduleKey,
      entityId: Number.parseInt(req.params.id, 10),
      details: req.body.title
    });
    return res.redirect(`/admin/${req.params.moduleKey}`);
  } catch (error) {
    if (error.validationErrors) {
      const item = await contentService.getModuleItem(req.params.moduleKey, req.params.id);
      return res.status(422).render('admin/modules/form', formViewModel(req, item, error.validationErrors, req.body));
    }
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const rows = await contentService.deleteModuleItem(req.params.moduleKey, req.params.id);
    if (!rows) return next();
    await adminRepository.recordActivity({
      adminEmail: req.session.admin.email,
      action: 'delete',
      entityType: req.params.moduleKey,
      entityId: Number.parseInt(req.params.id, 10)
    });
    return res.redirect(`/admin/${req.params.moduleKey}`);
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, createForm, create, editForm, update, remove };
