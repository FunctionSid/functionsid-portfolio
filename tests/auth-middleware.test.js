const test = require('node:test');
const assert = require('node:assert/strict');
const { requireAdminSession, requireAdministrator } = require('../middleware/admin/auth');

test('requireAdminSession redirects unauthenticated HTML requests', () => {
  const req = { session: {}, accepts: () => 'html' };
  const res = {
    redirected: null,
    redirect(path) {
      this.redirected = path;
    }
  };

  requireAdminSession(req, res, () => {
    throw new Error('next should not be called');
  });

  assert.equal(res.redirected, '/admin/login');
});

test('requireAdministrator allows configured admin email', () => {
  process.env.ADMIN_EMAIL = 'functionsid@gmail.com';
  const req = { session: { admin: { email: 'functionsid@gmail.com' } } };
  let called = false;

  requireAdministrator(req, {}, () => {
    called = true;
  });

  assert.equal(called, true);
});

test('requireAdministrator rejects signed-in guest email', () => {
  process.env.ADMIN_EMAIL = 'functionsid@gmail.com';
  const req = {
    session: { user: { email: 'guest@example.com', isAdmin: false } },
    accepts: () => 'html',
    t: (key) => key
  };
  const res = {
    statusCode: null,
    rendered: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    render(view) {
      this.rendered = view;
    }
  };

  requireAdministrator(req, res, () => {
    throw new Error('next should not be called');
  });

  assert.equal(res.statusCode, 403);
  assert.equal(res.rendered, 'errors/server-error');
});
