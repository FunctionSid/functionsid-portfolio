const { verifyGoogleUser, recordLogout } = require('../auth-service');

async function verifyAdminToken(idToken) {
  const profile = await verifyGoogleUser(idToken);
  if (!profile.isAdmin) {
    const error = new Error('The authenticated Google account is not authorized for FunctionSid administration.');
    error.status = 403;
    throw error;
  }

  return profile;
}

module.exports = { verifyAdminToken, recordLogout };
