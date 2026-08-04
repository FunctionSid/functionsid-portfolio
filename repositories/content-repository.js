const oracledb = require('oracledb');
const { withConnection, withTransaction, normalizeRows, normalizeRow } = require('./oracle-utils');

const SORT_COLUMNS = {
  title: 'TITLE',
  created: 'CREATED_AT',
  updated: 'UPDATED_AT',
  order: 'DISPLAY_ORDER'
};

function parsePayload(value) {
  if (!value) {
    return {};
  }

  if (typeof value === 'object') {
    return value;
  }

  return JSON.parse(value);
}

function mapContent(row) {
  const normalized = normalizeRow(row);
  return {
    id: normalized.id,
    type: normalized.content_type,
    title: normalized.title,
    slug: normalized.slug,
    status: normalized.status,
    displayOrder: normalized.display_order,
    payload: parsePayload(normalized.payload),
    createdAt: normalized.created_at,
    updatedAt: normalized.updated_at
  };
}

function getSortColumn(sort) {
  return SORT_COLUMNS[sort] || SORT_COLUMNS.order;
}

async function listContent({ type, search = '', page = 1, pageSize = 10, sort = 'order', direction = 'ASC', status } = {}) {
  const offset = (page - 1) * pageSize;
  const binds = {
    search: `%${search.toLowerCase()}%`,
    offset,
    pageSize
  };
  const filters = ['LOWER(SEARCH_TEXT) LIKE :search'];

  if (type) {
    filters.push('CONTENT_TYPE = :type');
    binds.type = type;
  }

  if (status) {
    filters.push('STATUS = :status');
    binds.status = status;
  }

  const where = filters.join(' AND ');
  const sortColumn = getSortColumn(sort);
  const sortDirection = direction && direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  return withConnection(async (connection) => {
    const rows = await connection.execute(
      `SELECT ID, CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, PAYLOAD, CREATED_AT, UPDATED_AT FROM CONTENT_ITEMS WHERE ${where} ORDER BY ${sortColumn} ${sortDirection}, ID ASC OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY`,
      binds
    );
    const count = await connection.execute(`SELECT COUNT(*) AS TOTAL FROM CONTENT_ITEMS WHERE ${where}`, binds);
    return {
      items: rows.rows.map(mapContent),
      total: count.rows[0].TOTAL
    };
  });
}

async function getContentById(id) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      'SELECT ID, CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, PAYLOAD, CREATED_AT, UPDATED_AT FROM CONTENT_ITEMS WHERE ID = :id',
      { id }
    );
    return result.rows.length ? mapContent(result.rows[0]) : null;
  });
}

async function getContentBySlug(type, slug) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      'SELECT ID, CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, PAYLOAD, CREATED_AT, UPDATED_AT FROM CONTENT_ITEMS WHERE CONTENT_TYPE = :type AND SLUG = :slug AND STATUS = :status',
      { type, slug, status: 'published' }
    );
    return result.rows.length ? mapContent(result.rows[0]) : null;
  });
}

async function listPublishedByTypes(types) {
  const typeBinds = types.reduce((binds, type, index) => {
    binds[`type${index}`] = type;
    return binds;
  }, {});
  const placeholders = types.map((_, index) => `:type${index}`).join(', ');

  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT ID, CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, PAYLOAD, CREATED_AT, UPDATED_AT FROM CONTENT_ITEMS WHERE STATUS = 'published' AND CONTENT_TYPE IN (${placeholders}) ORDER BY CONTENT_TYPE ASC, DISPLAY_ORDER ASC, ID ASC`,
      typeBinds
    );
    return result.rows.map(mapContent);
  });
}

async function createContent(content) {
  return withTransaction(async (connection) => {
    const result = await connection.execute(
      'INSERT INTO CONTENT_ITEMS (CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, SEARCH_TEXT, PAYLOAD) VALUES (:type, :title, :slug, :status, :displayOrder, :searchText, :payload) RETURNING ID INTO :id',
      {
        type: content.type,
        title: content.title,
        slug: content.slug,
        status: content.status,
        displayOrder: content.displayOrder,
        searchText: content.searchText,
        payload: { val: JSON.stringify(content.payload), type: oracledb.CLOB },
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    return result.outBinds.id[0];
  });
}

async function updateContent(id, content) {
  return withTransaction(async (connection) => {
    const result = await connection.execute(
      'UPDATE CONTENT_ITEMS SET TITLE = :title, SLUG = :slug, STATUS = :status, DISPLAY_ORDER = :displayOrder, SEARCH_TEXT = :searchText, PAYLOAD = :payload, UPDATED_AT = CURRENT_TIMESTAMP WHERE ID = :id',
      {
        id,
        title: content.title,
        slug: content.slug,
        status: content.status,
        displayOrder: content.displayOrder,
        searchText: content.searchText,
        payload: { val: JSON.stringify(content.payload), type: oracledb.CLOB }
      }
    );
    return result.rowsAffected;
  });
}

async function deleteContent(id) {
  return withTransaction(async (connection) => {
    const result = await connection.execute('DELETE FROM CONTENT_ITEMS WHERE ID = :id', { id });
    return result.rowsAffected;
  });
}

async function upsertSeedContent(content) {
  return withTransaction(async (connection) => {
    const existing = await connection.execute('SELECT ID FROM CONTENT_ITEMS WHERE CONTENT_TYPE = :type AND SLUG = :slug', {
      type: content.type,
      slug: content.slug
    });

    const binds = {
      type: content.type,
      title: content.title,
      slug: content.slug,
      status: content.status,
      displayOrder: content.displayOrder,
      searchText: content.searchText,
      payload: { val: JSON.stringify(content.payload), type: oracledb.CLOB }
    };

    if (existing.rows.length) {
      await connection.execute(
        'UPDATE CONTENT_ITEMS SET TITLE = :title, STATUS = :status, DISPLAY_ORDER = :displayOrder, SEARCH_TEXT = :searchText, PAYLOAD = :payload, UPDATED_AT = CURRENT_TIMESTAMP WHERE CONTENT_TYPE = :type AND SLUG = :slug',
        binds
      );
      return existing.rows[0].ID;
    }

    const inserted = await connection.execute(
      'INSERT INTO CONTENT_ITEMS (CONTENT_TYPE, TITLE, SLUG, STATUS, DISPLAY_ORDER, SEARCH_TEXT, PAYLOAD) VALUES (:type, :title, :slug, :status, :displayOrder, :searchText, :payload) RETURNING ID INTO :id',
      { ...binds, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
    );
    return inserted.outBinds.id[0];
  });
}

async function countByType() {
  return withConnection(async (connection) => {
    const result = await connection.execute('SELECT CONTENT_TYPE, COUNT(*) AS TOTAL FROM CONTENT_ITEMS GROUP BY CONTENT_TYPE');
    return normalizeRows(result.rows).reduce((counts, row) => {
      counts[row.content_type] = row.total;
      return counts;
    }, {});
  });
}

module.exports = { listContent, listPublishedByTypes, getContentById, getContentBySlug, createContent, updateContent, deleteContent, upsertSeedContent, countByType };
