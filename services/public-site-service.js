const { profile, projects, services, skills, certifications, timeline, learningRoadmap } = require('../data/public-content');
const contentRepository = require('../repositories/content-repository');
const { localizePublicContent } = require('./content-localization-service');

function mapContentItems(items) {
  return items.map((item) => ({ ...item.payload, id: item.id, status: item.status, displayOrder: item.displayOrder }));
}

async function getDynamicPublicContent() {
  try {
    const items = await contentRepository.listPublishedByTypes(['project', 'skill', 'certification', 'timeline']);
    return items.reduce((groups, item) => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
      return groups;
    }, {});
  } catch (_) {
    return {};
  }
}

async function getBaseViewModel(t = null) {
  const dynamicContent = await getDynamicPublicContent();
  const dynamicProjects = dynamicContent.project?.length ? mapContentItems(dynamicContent.project) : projects;
  const dynamicSkills = dynamicContent.skill?.length ? mapContentItems(dynamicContent.skill) : skills;
  const dynamicCertifications = dynamicContent.certification?.length ? mapContentItems(dynamicContent.certification) : certifications;
  const dynamicTimeline = dynamicContent.timeline?.length ? mapContentItems(dynamicContent.timeline) : timeline;

  const viewModel = {
    profile,
    projects: dynamicProjects,
    featuredProjects: dynamicProjects.slice(0, 3),
    services,
    skills: dynamicSkills,
    certifications: dynamicCertifications,
    timeline: dynamicTimeline,
    learningRoadmap
  };

  return t ? localizePublicContent(viewModel, t) : viewModel;
}

async function getProjectBySlug(slug, t = null) {
  let project = null;
  try {
    const item = await contentRepository.getContentBySlug('project', slug);
    if (item) {
      project = { ...item.payload, id: item.id, status: item.status, displayOrder: item.displayOrder };
    }
  } catch (_) {
    project = projects.find((item) => item.slug === slug);
  }

  if (!project) {
    project = projects.find((item) => item.slug === slug);
  }

  if (!project || !t) {
    return project;
  }

  const content = t('ui.content.projects', { returnObjects: true, defaultValue: {} });
  return { ...project, ...(content?.[project.slug] || {}) };
}

function groupCertifications(certificationList = certifications) {
  return certificationList.reduce((groups, certification) => {
    if (!groups[certification.category]) {
      groups[certification.category] = [];
    }

    groups[certification.category].push(certification);
    return groups;
  }, {});
}

module.exports = { getBaseViewModel, getProjectBySlug, groupCertifications };
