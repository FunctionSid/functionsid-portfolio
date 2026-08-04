import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';

const form = document.getElementById('firebaseAdminLogin');
const button = document.getElementById('googleLoginButton');
const status = document.getElementById('loginStatus');
const tokenField = document.getElementById('idToken');

if (form && button && status && tokenField) {
  const firebaseConfig = {
    apiKey: form.dataset.firebaseApiKey,
    authDomain: form.dataset.firebaseAuthDomain,
    projectId: form.dataset.firebaseProjectId,
    storageBucket: form.dataset.firebaseStorageBucket,
    messagingSenderId: form.dataset.firebaseMessagingSenderId,
    appId: form.dataset.firebaseAppId
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  button.addEventListener('click', async () => {
    status.textContent = 'Opening Google sign-in.';
    button.disabled = true;
    try {
      const credential = await signInWithPopup(auth, provider);
      tokenField.value = await credential.user.getIdToken();
      status.textContent = 'Sign-in verified. Loading admin dashboard.';
      form.submit();
    } catch (error) {
      status.textContent = error.message;
      button.disabled = false;
    }
  });
}
