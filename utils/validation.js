function toCleanString(value, maxLength = 1000) {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim().slice(0, maxLength);
}

function requireField(source, field, label, maxLength = 1000) {
  const value = toCleanString(source[field], maxLength);
  if (!value) {
    return { value, error: `${label} is required.` };
  }
  return { value, error: null };
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function slugify(value) {
  return toCleanString(value, 150)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parsePositiveInteger(value, fallback = 1) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseBooleanFlag(value) {
  return value === true || value === 'true' || value === '1' || value === 'on';
}

function splitLines(value) {
  return toCleanString(value, 8000)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

module.exports = { toCleanString, requireField, isEmail, slugify, parsePositiveInteger, parseBooleanFlag, splitLines };
