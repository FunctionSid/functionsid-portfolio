const path = require('path');

require('dotenv').config();

const rootDir = path.resolve(__dirname, '..');
const isProduction = process.env.NODE_ENV === 'production';
const port = Number.parseInt(process.env.PORT || '3000', 10);

const appConfig = {
  env: process.env.NODE_ENV || 'development',
  isProduction,
  port,
  rootDir,
  publicDir: path.join(rootDir, 'public'),
  viewsDir: path.join(rootDir, 'views'),
  logsDir: path.join(rootDir, 'logs'),
  adminEmail: process.env.ADMIN_EMAIL || 'functionsid@gmail.com',
  supportedLanguages: ['en', 'hi', 'mr'],
  defaultLanguage: 'en'
};

module.exports = appConfig;
