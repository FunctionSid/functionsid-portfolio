import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';

const form = document.getElementById('publicGoogleLogin');
const button = document.getElementById('publicGoogleLoginButton');
const status = document.getElementById('publicLoginStatus');
const tokenField = document.getElementById('publicIdToken');

if (form && button && status && tokenField) {
  const firebaseConfig = {
    apiKey: form.dataset.firebaseApiKey,
    authDomain: form.dataset.firebaseAuthDomain,
    projectId: form.dataset.firebaseProjectId,
    storageBucket: form.dataset.firebaseStorageBucket,
    messagingSenderId: form.dataset.firebaseMessagingSenderId,
    appId: form.dataset.firebaseAppId
  };

  const app = initializeApp(firebaseConfig, 'public-auth');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  button.addEventListener('click', async () => {
    status.textContent = form.dataset.statusOpening || '';
    button.disabled = true;

    try {
      const credential = await signInWithPopup(auth, provider);
      tokenField.value = await credential.user.getIdToken();
      status.textContent = form.dataset.statusVerified || '';
      form.submit();
    } catch (error) {
      status.textContent = form.dataset.statusFailed || error.message;
      button.disabled = false;
    }
  });
}
