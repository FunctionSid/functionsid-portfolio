const test = require('node:test');
const assert = require('node:assert/strict');
require('dotenv').config({ override: true });
const { initDb, closePool } = require('../config/database');
const contentRepository = require('../repositories/content-repository');

test('Oracle content repository supports CRUD', async () => {
  await initDb();
  let createdId;

  try {
    createdId = await contentRepository.createContent({
      type: 'test',
      title: 'Node Test Item',
      slug: `node-test-item-${Date.now()}`,
      status: 'draft',
      displayOrder: 999,
      searchText: 'node test item',
      payload: { summary: 'created' }
    });

    assert.ok(createdId);
    const item = await contentRepository.getContentById(createdId);
    assert.equal(item.title, 'Node Test Item');

    const updatedRows = await contentRepository.updateContent(createdId, {
      type: 'test',
      title: 'Node Test Item Updated',
      slug: item.slug,
      status: 'draft',
      displayOrder: 1000,
      searchText: 'node test item updated',
      payload: { summary: 'updated' }
    });
    assert.equal(updatedRows, 1);

    const updated = await contentRepository.getContentById(createdId);
    assert.equal(updated.payload.summary, 'updated');

    const deletedRows = await contentRepository.deleteContent(createdId);
    assert.equal(deletedRows, 1);
  } finally {
    if (createdId) {
      try {
        await contentRepository.deleteContent(createdId);
      } catch (_) {}
    }
    await closePool();
  }
});
