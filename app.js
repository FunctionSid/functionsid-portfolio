const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const appConfig = require('./config/app');
const { validateEnvironment } = require('./config/env');
const logger = require('./config/logger');
const { i18next, middleware: i18nMiddleware } = require('./config/i18n');
const { initDb, closePool } = require('./config/database');
const { globalLimiter } = require('./middleware/rate-limiters');
const { ensureCsrfToken, verifyCsrfToken } = require('./middleware/csrf');
const { exposeAdminSession } = require('./middleware/admin/auth');
const OracleSessionStore = require('./middleware/oracle-session-store');
const requestContext = require('./middleware/request-context');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const routes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();

app.set('view engine', 'ejs');
app.set('views', appConfig.viewsDir);
app.set('view cache', appConfig.isProduction);
app.set('trust proxy', appConfig.isProduction ? 1 : false);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', 'https://unpkg.com', 'https://www.gstatic.com', 'https://apis.google.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'https://identitytoolkit.googleapis.com', 'https://securetoken.googleapis.com', 'https://www.googleapis.com'],
      frameSrc: ["'self'", 'https://accounts.google.com', 'https://apis.google.com', 'https://functionsid-site-efe0e.firebaseapp.com'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use(compression());
app.use(globalLimiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(session({
  name: 'functionsid.sid',
  secret: process.env.SESSION_SECRET || 'development-only-change-this-functionsid-secret',
  store: new OracleSessionStore(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: appConfig.isProduction,
    maxAge: null
  }
}));
app.use(morgan(appConfig.isProduction ? 'combined' : 'dev', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(express.static(appConfig.publicDir, {
  maxAge: appConfig.isProduction ? '30d' : 0,
  etag: true
}));
app.use('/uploads', express.static('storage/uploads', {
  maxAge: appConfig.isProduction ? '7d' : 0,
  etag: true
}));

app.use(i18nMiddleware.handle(i18next));
app.use(requestContext);
app.use(ensureCsrfToken);
app.use(verifyCsrfToken);
app.use(exposeAdminSession);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  validateEnvironment();
  await initDb();

  const server = app.listen(appConfig.port, () => {
    logger.info(`FunctionSid listening on http://localhost:${appConfig.port}`);
  });

  async function shutdown(signal) {
    logger.info(`Received ${signal}. Shutting down FunctionSid.`);
    server.close(async () => {
      await closePool();
      process.exit(0);
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

if (require.main === module) {
  startServer().catch((error) => {
    logger.error('FunctionSid startup failed.', {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  });
}

module.exports = { app, startServer };
