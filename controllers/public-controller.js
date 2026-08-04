const { getBaseViewModel, getProjectBySlug, groupCertifications } = require('../services/public-site-service');
const contactService = require('../services/contact-service');
const logger = require('../config/logger');

function getPageTitle(req, key, fallback) {
  return req.t(`ui.pages.${key}.title`, { defaultValue: fallback });
}

function renderPublicPage(view, activePage, titleKey, fallbackTitle) {
  return async (req, res, next) => {
    try {
      const viewModel = await getBaseViewModel(req.t);
      return res.render(view, {
        pageTitle: getPageTitle(req, titleKey, fallbackTitle),
        activePage,
        ...viewModel,
        certificationGroups: groupCertifications(viewModel.certifications)
      });
    } catch (error) {
      return next(error);
    }
  };
}

async function showProjectDetail(req, res, next) {
  const project = await getProjectBySlug(req.params.slug, req.t);

  if (!project) {
    return next();
  }

  return res.render('project-detail', {
    pageTitle: project.title,
    activePage: 'projects',
    project,
    ...(await getBaseViewModel(req.t))
  });
}

async function showResume(req, res, next) {
  try {
    const viewModel = await getBaseViewModel(req.t);
    res.render('resume', {
      pageTitle: getPageTitle(req, 'resume', 'Resume'),
      activePage: 'resume',
      ...viewModel,
      certificationGroups: groupCertifications(viewModel.certifications)
    });
  } catch (error) {
    next(error);
  }
}

async function submitContact(req, res, next) {
  try {
    const result = await contactService.submitContactMessage(req.body);
    const viewModel = await getBaseViewModel(req.t);
    logger.info('Contact message received.', { messageId: result.id, emailSent: result.email.sent });
    return res.render('contact', {
      pageTitle: getPageTitle(req, 'contact', 'Contact'),
      activePage: 'contact',
      ...viewModel,
      certificationGroups: groupCertifications(viewModel.certifications),
      contactSuccess: req.t('ui.pages.contact.success')
    });
  } catch (error) {
    if (error.validationErrors) {
      const viewModel = await getBaseViewModel(req.t);
      return res.status(422).render('contact', {
        pageTitle: getPageTitle(req, 'contact', 'Contact'),
        activePage: 'contact',
        ...viewModel,
        certificationGroups: groupCertifications(viewModel.certifications),
        contactErrors: error.validationErrors.map(() => req.t('ui.pages.contact.validationRequired')),
        formData: req.body
      });
    }
    return next(error);
  }
}

module.exports = {
  showHome: renderPublicPage('home', 'home', 'home', 'Home'),
  showAbout: renderPublicPage('about', 'about', 'about', 'About'),
  showServices: renderPublicPage('services', 'services', 'servicesPage', 'Services'),
  showProjects: renderPublicPage('projects', 'projects', 'projects', 'Projects'),
  showProjectDetail,
  showSkills: renderPublicPage('skills', 'skills', 'skills', 'Skills'),
  showCertifications: renderPublicPage('certifications', 'certifications', 'certifications', 'Certifications'),
  showResume,
  showContact: renderPublicPage('contact', 'contact', 'contact', 'Contact'),
  submitContact,
  showAccessibility: renderPublicPage('accessibility', 'accessibility', 'accessibility', 'Accessibility Statement'),
  showPrivacy: renderPublicPage('privacy', 'privacy', 'privacy', 'Privacy Policy')
};
