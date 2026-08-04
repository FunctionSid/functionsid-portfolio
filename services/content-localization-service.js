function mergeArraysByIndex(source = [], translations = []) {
  return source.map((item, index) => {
    const translated = translations[index];
    if (!translated) return item;
    return { ...item, ...translated };
  });
}

function mergeProjectsBySlug(source = [], translations = {}) {
  return source.map((project) => {
    const translated = translations[project.slug];
    if (!translated) return project;
    return { ...project, ...translated };
  });
}

function localizePublicContent(viewModel, t) {
  const content = t('ui.content', { returnObjects: true, defaultValue: null });
  if (!content || typeof content !== 'object') {
    return viewModel;
  }

  const projects = mergeProjectsBySlug(viewModel.projects, content.projects);
  const certifications = mergeArraysByIndex(viewModel.certifications, content.certifications);

  return {
    ...viewModel,
    profile: { ...viewModel.profile, ...(content.profile || {}) },
    projects,
    featuredProjects: projects.slice(0, 3),
    services: mergeArraysByIndex(viewModel.services, content.services),
    skills: mergeArraysByIndex(viewModel.skills, content.skills),
    certifications,
    timeline: mergeArraysByIndex(viewModel.timeline, content.timeline),
    learningRoadmap: Array.isArray(content.learningRoadmap) ? content.learningRoadmap : viewModel.learningRoadmap
  };
}

module.exports = { localizePublicContent };
