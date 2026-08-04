const contentRepository = require('../repositories/content-repository');
const { projects, skills, certifications, timeline, learningRoadmap, profile } = require('../data/public-content');
const { toCleanString, slugify, parsePositiveInteger, splitLines } = require('../utils/validation');

const MODULES = {
  projects: { type: 'project', label: 'Projects', singular: 'Project' },
  skills: { type: 'skill', label: 'Skills', singular: 'Skill' },
  certifications: { type: 'certification', label: 'Certifications', singular: 'Certification' },
  experience: { type: 'experience', label: 'Experience', singular: 'Experience' },
  education: { type: 'education', label: 'Education', singular: 'Education' },
  timeline: { type: 'timeline', label: 'Timeline', singular: 'Timeline entry' },
  testimonials: { type: 'testimonial', label: 'Testimonials', singular: 'Testimonial' },
  'social-links': { type: 'social-link', label: 'Social links', singular: 'Social link' },
  downloads: { type: 'download', label: 'Downloads', singular: 'Download' }
};

function getModuleConfig(moduleKey) {
  return MODULES[moduleKey] || null;
}

function getModuleEntries() {
  return Object.entries(MODULES).map(([key, value]) => ({ key, ...value }));
}

function normalizeContentPayload(body) {
  const title = toCleanString(body.title, 200);
  const slug = slugify(body.slug || title);
  const status = ['draft', 'published', 'archived'].includes(body.status) ? body.status : 'published';
  const displayOrder = Number.parseInt(body.displayOrder || '0', 10) || 0;
  const payload = {
    subtitle: toCleanString(body.subtitle, 200),
    category: toCleanString(body.category, 100),
    summary: toCleanString(body.summary, 700),
    description: toCleanString(body.description, 4000),
    issuer: toCleanString(body.issuer, 200),
    date: toCleanString(body.date, 100),
    statusText: toCleanString(body.statusText, 100),
    url: toCleanString(body.url, 500),
    image: toCleanString(body.image, 500),
    imageAlt: toCleanString(body.imageAlt, 500),
    technologies: splitLines(body.technologies),
    items: splitLines(body.items),
    problem: toCleanString(body.problem, 1200),
    solution: toCleanString(body.solution, 1200),
    challenges: splitLines(body.challenges),
    outcome: toCleanString(body.outcome, 1200),
    future: splitLines(body.future)
  };

  const searchText = [
    title,
    slug,
    payload.subtitle,
    payload.category,
    payload.summary,
    payload.description,
    payload.issuer,
    payload.technologies.join(' '),
    payload.items.join(' ')
  ].join(' ').toLowerCase();

  return { title, slug, status, displayOrder, payload, searchText };
}

function validateContentInput(body) {
  const errors = [];
  if (!toCleanString(body.title, 200)) {
    errors.push('Title is required.');
  }
  if (body.slug && !slugify(body.slug)) {
    errors.push('Slug must contain at least one letter or number.');
  }
  return errors;
}

async function listModuleItems(moduleKey, query = {}) {
  const moduleConfig = getModuleConfig(moduleKey);
  if (!moduleConfig) {
    return null;
  }

  const page = parsePositiveInteger(query.page, 1);
  const pageSize = Math.min(parsePositiveInteger(query.pageSize, 10), 50);
  const result = await contentRepository.listContent({
    type: moduleConfig.type,
    search: toCleanString(query.search, 150),
    status: query.status && query.status !== 'all' ? query.status : undefined,
    page,
    pageSize,
    sort: query.sort,
    direction: query.direction
  });

  return {
    module: { key: moduleKey, ...moduleConfig },
    items: result.items,
    pagination: {
      page,
      pageSize,
      total: result.total,
      totalPages: Math.max(1, Math.ceil(result.total / pageSize))
    },
    query
  };
}

async function getModuleItem(moduleKey, id) {
  const moduleConfig = getModuleConfig(moduleKey);
  if (!moduleConfig) {
    return null;
  }

  const item = await contentRepository.getContentById(id);
  if (!item || item.type !== moduleConfig.type) {
    return null;
  }
  return item;
}

async function createModuleItem(moduleKey, body) {
  const moduleConfig = getModuleConfig(moduleKey);
  if (!moduleConfig) {
    throw new Error('Unknown content module.');
  }

  const errors = validateContentInput(body);
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.validationErrors = errors;
    throw error;
  }

  const normalized = normalizeContentPayload(body);
  return contentRepository.createContent({ type: moduleConfig.type, ...normalized });
}

async function updateModuleItem(moduleKey, id, body) {
  const existing = await getModuleItem(moduleKey, id);
  if (!existing) {
    return 0;
  }

  const errors = validateContentInput(body);
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.validationErrors = errors;
    throw error;
  }

  const moduleConfig = getModuleConfig(moduleKey);
  const normalized = normalizeContentPayload(body);
  return contentRepository.updateContent(id, { type: moduleConfig.type, ...normalized });
}

async function deleteModuleItem(moduleKey, id) {
  const existing = await getModuleItem(moduleKey, id);
  if (!existing) {
    return 0;
  }
  return contentRepository.deleteContent(id);
}

function seededContentItems() {
  const rows = [];

  projects.forEach((project, index) => {
    rows.push({
      type: 'project',
      title: project.title,
      slug: project.slug,
      status: 'published',
      displayOrder: index + 1,
      searchText: `${project.title} ${project.summary} ${project.category} ${project.technologies.join(' ')}`.toLowerCase(),
      payload: project
    });
  });

  skills.forEach((skill, index) => {
    rows.push({
      type: 'skill',
      title: skill.title,
      slug: slugify(skill.title),
      status: 'published',
      displayOrder: index + 1,
      searchText: `${skill.title} ${skill.items.join(' ')}`.toLowerCase(),
      payload: skill
    });
  });

  certifications.forEach((certification, index) => {
    rows.push({
      type: 'certification',
      title: certification.title,
      slug: slugify(`${certification.title}-${index + 1}`),
      status: 'published',
      displayOrder: index + 1,
      searchText: `${certification.title} ${certification.issuer} ${certification.category}`.toLowerCase(),
      payload: certification
    });
  });

  timeline.forEach((entry, index) => {
    rows.push({
      type: 'timeline',
      title: entry.title,
      slug: slugify(`${entry.period}-${entry.title}`),
      status: 'published',
      displayOrder: index + 1,
      searchText: `${entry.period} ${entry.title} ${entry.description}`.toLowerCase(),
      payload: entry
    });
  });

  rows.push({
    type: 'education',
    title: 'B.Sc. in Drugs and Dyes Chemistry',
    slug: 'bsc-drugs-and-dyes-chemistry',
    status: 'published',
    displayOrder: 1,
    searchText: 'bsc drugs dyes chemistry bnn college bhiwandi'.toLowerCase(),
    payload: { title: 'B.Sc. in Drugs and Dyes Chemistry', issuer: 'BNN College, Bhiwandi', description: 'Documented education foundation in chemistry.' }
  });

  rows.push({
    type: 'experience',
    title: 'Accessibility-focused software engineering portfolio',
    slug: 'accessibility-software-engineering-portfolio',
    status: 'published',
    displayOrder: 1,
    searchText: 'accessibility software engineering node oracle cloud ai'.toLowerCase(),
    payload: { title: 'Accessibility-focused software engineering portfolio', description: profile.summary, items: profile.proofPoints }
  });

  learningRoadmap.forEach((item, index) => {
    rows.push({
      type: 'download',
      title: index === 0 ? 'Siddharth Kalantri Resume PDF' : item,
      slug: index === 0 ? 'resume-pdf' : slugify(item),
      status: 'published',
      displayOrder: index + 1,
      searchText: item.toLowerCase(),
      payload: { title: index === 0 ? 'Siddharth Kalantri Resume PDF' : item, url: index === 0 ? '/Siddharth_Kalantri_Resume.pdf' : '', description: item }
    });
  });

  rows.push({
    type: 'social-link',
    title: 'GitHub',
    slug: 'github',
    status: 'published',
    displayOrder: 1,
    searchText: 'github functionsid repository'.toLowerCase(),
    payload: { title: 'GitHub', url: 'https://github.com/FunctionSid/functionsid', description: 'FunctionSid project repository.' }
  });

  rows.push({
    type: 'testimonial',
    title: 'Testimonials',
    slug: 'testimonials-placeholder',
    status: 'draft',
    displayOrder: 1,
    searchText: 'testimonials draft'.toLowerCase(),
    payload: { title: 'Testimonials', description: 'Testimonials will be published only when documented.' }
  });

  return rows;
}

async function seedContent() {
  const rows = seededContentItems();
  for (const row of rows) {
    await contentRepository.upsertSeedContent(row);
  }
  return rows.length;
}

module.exports = {
  MODULES,
  getModuleConfig,
  getModuleEntries,
  listModuleItems,
  getModuleItem,
  createModuleItem,
  updateModuleItem,
  deleteModuleItem,
  seedContent,
  normalizeContentPayload,
  validateContentInput
};
