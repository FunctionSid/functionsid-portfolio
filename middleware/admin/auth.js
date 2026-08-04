function requireAdminSession(req, res, next) {
  if (req.session?.admin?.email) {
    return next();
  }

  if (req.accepts('html')) {
    return res.redirect('/admin/login');
  }

  return res.status(401).json({ error: 'Authentication required.' });
}

function requireAdministrator(req, res, next) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const sessionEmail = req.session?.admin?.email;

  if (sessionEmail && adminEmail && sessionEmail.toLowerCase() === adminEmail.toLowerCase()) {
    return next();
  }

  if (req.accepts('html')) {
    return res.status(403).render('errors/server-error', {
      pageTitle: req.t('ui.pages.errors.accessDeniedTitle'),
      activePage: 'error',
      message: req.t('ui.pages.errors.accessDeniedText')
    });
  }

  return res.status(403).json({ error: 'Administrator access required.' });
}

function exposeAdminSession(req, res, next) {
  res.locals.adminUser = req.session?.admin || null;
  res.locals.publicUser = req.session?.user || null;
  return next();
}

module.exports = { requireAdminSession, requireAdministrator, exposeAdminSession };
