const dashboardService = require('../../services/admin/dashboard-service');
const contentService = require('../../services/content-service');

async function showDashboard(req, res, next) {
  try {
    const dashboard = await dashboardService.getDashboardViewModel();
    return res.render('admin/dashboard', {
      pageTitle: req.t('ui.admin.pages.adminDashboardTitle'),
      activePage: 'admin-dashboard',
      dashboard,
      modules: contentService.getModuleEntries()
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { showDashboard };
