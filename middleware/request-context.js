const appConfig = require('../config/app');
const { firebaseConfig } = require('../config/firebase');

function requestContext(req, res, next) {
  const language = req.language || appConfig.defaultLanguage;

  res.locals.req = req;
  res.locals.t = req.t;
  res.locals.tt = (key, options = {}) => req.t(`ui.${key}`, options);
  res.locals.language = language;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.appName = 'FunctionSid';
  res.locals.firebaseConfig = firebaseConfig;
  res.locals.activePage = null;
  res.locals.pageTitle = 'FunctionSid';

  next();
}

module.exports = requestContext;
