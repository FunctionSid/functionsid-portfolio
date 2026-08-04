const { getFirebaseAdminApp } = require('../config/firebase');
const adminRepository = require('../repositories/admin-repository');

function isAdministratorEmail(email) {
  const adminEmail = process.env.ADMIN_EMAIL;
  return Boolean(email && adminEmail && email.toLowerCase() === adminEmail.toLowerCase());
}

async function verifyGoogleUser(idToken) {
  if (!idToken) {
    const error = new Error('Firebase ID token is required.');
    error.status = 400;
    throw error;
  }

  const firebaseApp = getFirebaseAdminApp();
  const decodedToken = await firebaseApp.auth().verifyIdToken(idToken);
  const email = decodedToken.email;

  if (!email) {
    const error = new Error('The authenticated Google account does not include an email address.');
    error.status = 400;
    throw error;
  }

  const profile = {
    firebaseUid: decodedToken.uid,
    email,
    displayName: decodedToken.name || email,
    photoUrl: decodedToken.picture || null,
    isAdmin: isAdministratorEmail(email)
  };

  if (profile.isAdmin) {
    await adminRepository.upsertAdminProfile(profile);
    await adminRepository.recordActivity({
      adminEmail: email,
      action: 'login',
      entityType: 'authentication',
      details: 'Administrator signed in with Firebase Authentication.'
    });
  }

  return profile;
}

async function recordLogout(profile) {
  if (!profile?.isAdmin || !profile.email) return;
  await adminRepository.recordActivity({
    adminEmail: profile.email,
    action: 'logout',
    entityType: 'authentication',
    details: 'Administrator signed out.'
  });
}

module.exports = { verifyGoogleUser, recordLogout, isAdministratorEmail };
