function getFoundationViewModel() {
  return {
    architectureLayers: [
      'Routes',
      'Controllers',
      'Services',
      'Repositories',
      'Oracle Autonomous Database'
    ],
    foundationItems: [
      'Express application shell',
      'EJS shared layout partials',
      'Responsive navigation framework',
      'Theme and localization foundation',
      'Oracle database pool configuration',
      'Logging and error handling foundation'
    ]
  };
}

module.exports = { getFoundationViewModel };
