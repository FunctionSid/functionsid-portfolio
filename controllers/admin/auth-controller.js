const { firebaseConfig } = require('../../config/firebase');
const authService = require('../../services/admin/auth-service');
const logger = require('../../config/logger');

function showLogin(req, res) {
  if (req.session?.admin?.email) {
    return res.redirect('/admin');
  }

  return res.render('admin/auth/login', {
    pageTitle: req.t('ui.pages.adminLogin.title'),
    activePage: 'admin-login',
    firebaseConfig,
    adminEmail: process.env.ADMIN_EMAIL,
    error: null
  });
}

async function login(req, res, next) {
  try {
    const profile = await authService.verifyAdminToken(req.body.idToken);
    const remember = req.body.remember === 'on' || req.body.remember === 'true';

    req.session.admin = profile;
    req.session.user = profile;
    req.session.cookie.maxAge = remember ? 1000 * 60 * 60 * 24 * 14 : null;

    logger.info('Administrator authenticated.', { email: profile.email });
    return res.redirect('/admin');
  } catch (error) {
    logger.warn('Administrator login failed.', { message: error.message });
    return res.status(error.status || 401).render('admin/auth/login', {
      pageTitle: req.t('ui.pages.adminLogin.title'),
      activePage: 'admin-login',
      firebaseConfig,
      adminEmail: process.env.ADMIN_EMAIL,
      error: error.message
    });
  }
}

async function logout(req, res, next) {
  const email = req.session?.admin?.email;
  const profile = req.session?.admin || req.session?.user;
  try {
    await authService.recordLogout(profile || { email, isAdmin: Boolean(email) });
    req.session.destroy((error) => {
      if (error) return next(error);
      return res.redirect('/admin/login');
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { showLogin, login, logout };
