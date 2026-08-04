const authService = require('../services/auth-service');
const logger = require('../config/logger');

async function googleLogin(req, res, next) {
  try {
    const profile = await authService.verifyGoogleUser(req.body.idToken);
    req.session.user = profile;

    if (profile.isAdmin) {
      req.session.admin = profile;
    } else {
      delete req.session.admin;
    }

    logger.info('Public Google sign-in completed.', { email: profile.email, isAdmin: profile.isAdmin });
    return res.redirect(`/?lang=${req.language || 'en'}`);
  } catch (error) {
    logger.warn('Public Google sign-in failed.', { message: error.message });
    return res.redirect(`/?lang=${req.language || 'en'}&auth=failed`);
  }
}

async function logout(req, res, next) {
  const profile = req.session?.user || req.session?.admin;
  try {
    await authService.recordLogout(profile);
    req.session.destroy((error) => {
      if (error) return next(error);
      return res.redirect(`/?lang=${req.language || 'en'}`);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { googleLogin, logout };
