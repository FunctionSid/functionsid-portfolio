const crypto = require('crypto');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function ensureCsrfToken(req, res, next) {
  if (!req.session) {
    return next(new Error('Session middleware must be registered before CSRF middleware.'));
  }

  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }

  res.locals.csrfToken = req.session.csrfToken;
  return next();
}

function verifyCsrfToken(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  const token = req.body?._csrf || req.query?._csrf || req.get('x-csrf-token');

  if (!token || token !== req.session?.csrfToken) {
    if (req.accepts('html')) {
      return res.status(403).render('errors/server-error', {
        pageTitle: req.t('ui.pages.errors.csrfTitle'),
        activePage: 'error',
        message: req.t('ui.pages.errors.csrfText')
      });
    }

    return res.status(403).json({ error: 'Invalid CSRF token.' });
  }

  return next();
}

module.exports = { ensureCsrfToken, verifyCsrfToken };
