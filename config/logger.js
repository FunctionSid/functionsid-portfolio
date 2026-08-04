const fs = require('fs');
const path = require('path');
const winston = require('winston');
const appConfig = require('./app');

if (!fs.existsSync(appConfig.logsDir)) {
  fs.mkdirSync(appConfig.logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: appConfig.isProduction ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(appConfig.logsDir, 'application.log'),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 3
    }),
    new winston.transports.File({
      filename: path.join(appConfig.logsDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 3
    })
  ]
});

module.exports = logger;
