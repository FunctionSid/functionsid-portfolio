const contentRepository = require('../../repositories/content-repository');
const contactRepository = require('../../repositories/contact-repository');
const adminRepository = require('../../repositories/admin-repository');

async function getDashboardViewModel() {
  const [contentCounts, messageStats, recentActivity] = await Promise.all([
    contentRepository.countByType(),
    contactRepository.getMessageStats(),
    adminRepository.recentActivity(12)
  ]);

  const totals = {
    projects: contentCounts.project || 0,
    skills: contentCounts.skill || 0,
    certifications: contentCounts.certification || 0,
    experience: contentCounts.experience || 0,
    education: contentCounts.education || 0,
    contactMessages: Object.values(messageStats).reduce((sum, count) => sum + count, 0),
    unreadMessages: messageStats.unread || 0
  };

  return { totals, messageStats, recentActivity };
}

module.exports = { getDashboardViewModel };
