const test = require('node:test');
const assert = require('node:assert/strict');
const publicRoutes = require('../routes');
const adminRoutes = require('../routes/admin');
const apiRoutes = require('../routes/api');

function routeExists(router, method, path) {
  return router.stack.some((layer) => layer.route && layer.route.path === path && layer.route.methods[method]);
}

test('public contact POST route is registered', () => {
  assert.equal(routeExists(publicRoutes, 'post', '/contact'), true);
});

test('public Google auth routes are registered', () => {
  assert.equal(routeExists(publicRoutes, 'post', '/auth/google'), true);
  assert.equal(routeExists(publicRoutes, 'post', '/auth/logout'), true);
});

test('admin dashboard route is registered', () => {
  assert.equal(routeExists(adminRoutes, 'get', '/'), true);
});

test('admin API list route is registered', () => {
  assert.equal(routeExists(apiRoutes, 'get', '/admin/:moduleKey'), true);
});
