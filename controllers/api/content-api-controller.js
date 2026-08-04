const contentService = require('../../services/content-service');

async function list(req, res, next) {
  try {
    const result = await contentService.listModuleItems(req.params.moduleKey, req.query);
    if (!result) return res.status(404).json({ error: 'Unknown content module.' });
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const id = await contentService.createModuleItem(req.params.moduleKey, req.body);
    return res.status(201).json({ id });
  } catch (error) {
    if (error.validationErrors) {
      return res.status(422).json({ errors: error.validationErrors });
    }
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const rows = await contentService.updateModuleItem(req.params.moduleKey, req.params.id, req.body);
    if (!rows) return res.status(404).json({ error: 'Item not found.' });
    return res.json({ updated: true });
  } catch (error) {
    if (error.validationErrors) {
      return res.status(422).json({ errors: error.validationErrors });
    }
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const rows = await contentService.deleteModuleItem(req.params.moduleKey, req.params.id);
    if (!rows) return res.status(404).json({ error: 'Item not found.' });
    return res.json({ deleted: true });
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, create, update, remove };
