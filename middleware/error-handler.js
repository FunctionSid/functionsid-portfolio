const logger = require('../config/logger');

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  logger.error('Unhandled request error.', {
    message: error.message,
    stack: error.stack,
    path: req.originalUrl
  });

  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.status || 500).json({
      error: error.status ? error.message : 'Internal server error.'
    });
  }

  return res.status(500).render('errors/server-error', {
    pageTitle: req.t('ui.pages.errors.serverTitle'),
    activePage: null
  });
}

module.exports = errorHandler;
