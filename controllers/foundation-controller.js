const { getFoundationViewModel } = require('../services/foundation-service');

function showFoundation(req, res) {
  res.render('foundation', {
    pageTitle: req.t('foundation.meta.title'),
    activePage: 'foundation',
    ...getFoundationViewModel()
  });
}

function healthCheck(req, res) {
  res.status(200).json({
    status: 'ok',
    application: 'FunctionSid',
    phase: 'foundation'
  });
}

module.exports = { showFoundation, healthCheck };
