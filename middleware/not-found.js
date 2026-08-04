function notFound(req, res) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ error: 'Resource not found.' });
  }

  res.status(404).render('errors/not-found', {
    pageTitle: req.t('ui.pages.errors.notFoundTitle'),
    activePage: null,
    requestedPath: req.originalUrl
  });
}

module.exports = notFound;
