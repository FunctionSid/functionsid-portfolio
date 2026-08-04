const contactService = require('../../services/contact-service');
const contactRepository = require('../../repositories/contact-repository');
const adminRepository = require('../../repositories/admin-repository');

async function list(req, res, next) {
  try {
    const viewModel = await contactService.listMessages(req.query);
    return res.render('admin/messages/list', {
      pageTitle: req.t('ui.admin.contactMessages'),
      activePage: 'admin-messages',
      ...viewModel
    });
  } catch (error) {
    return next(error);
  }
}

async function detail(req, res, next) {
  try {
    const message = await contactRepository.getMessage(req.params.id);
    if (!message) return next();
    return res.render('admin/messages/detail', {
      pageTitle: message.subject,
      activePage: 'admin-messages',
      message
    });
  } catch (error) {
    return next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const status = ['unread', 'read', 'archived'].includes(req.body.status) ? req.body.status : 'read';
    await contactRepository.updateMessageStatus(req.params.id, status);
    await adminRepository.recordActivity({
      adminEmail: req.session.admin.email,
      action: `message-${status}`,
      entityType: 'contact-message',
      entityId: Number.parseInt(req.params.id, 10)
    });
    return res.redirect(`/admin/messages/${req.params.id}`);
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await contactRepository.deleteMessage(req.params.id);
    await adminRepository.recordActivity({
      adminEmail: req.session.admin.email,
      action: 'message-delete',
      entityType: 'contact-message',
      entityId: Number.parseInt(req.params.id, 10)
    });
    return res.redirect('/admin/messages');
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, detail, updateStatus, remove };
