const test = require('node:test');
const assert = require('node:assert/strict');
const { validateContactMessage } = require('../services/contact-service');
const { validateContentInput, normalizeContentPayload } = require('../services/content-service');

test('contact validation rejects incomplete messages', () => {
  const result = validateContactMessage({ fullName: '', email: 'bad', subject: '', message: '' });
  assert.equal(result.errors.length, 4);
});

test('contact validation accepts a complete message', () => {
  const result = validateContactMessage({
    fullName: 'Siddharth',
    email: 'sid@example.com',
    subject: 'Project',
    message: 'Hello'
  });
  assert.deepEqual(result.errors, []);
  assert.equal(result.message.email, 'sid@example.com');
});

test('content validation requires title', () => {
  assert.deepEqual(validateContentInput({}), ['Title is required.']);
});

test('content normalization creates slug and line arrays', () => {
  const result = normalizeContentPayload({
    title: 'Accessible Project',
    technologies: 'Node.js\nOracle',
    items: 'One\nTwo'
  });
  assert.equal(result.slug, 'accessible-project');
  assert.deepEqual(result.payload.technologies, ['Node.js', 'Oracle']);
  assert.deepEqual(result.payload.items, ['One', 'Two']);
});
