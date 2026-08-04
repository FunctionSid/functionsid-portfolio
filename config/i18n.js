const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');
const appConfig = require('./app');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: appConfig.defaultLanguage,
    preload: appConfig.supportedLanguages,
    supportedLngs: appConfig.supportedLanguages,
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}.json')
    },
    interpolation: {
      escapeValue: true
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      caches: ['cookie']
    }
  });

module.exports = { i18next, middleware };
