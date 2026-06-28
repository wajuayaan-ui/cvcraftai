/* ─────────────────────────────────────────────
   CvCraft — Firebase Auth Module
   Add after nav.js on every page:
     <script src="auth.js"></script>
   ───────────────────────────────────────────── */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDRtwB43zAaQG2JRS0elF3oj_n3PW4qfqI",
  authDomain:        "cvcraftai-3d66d.firebaseapp.com",
  projectId:         "cvcraftai-3d66d",
  storageBucket:     "cvcraftai-3d66d.firebasestorage.app",
  messagingSenderId: "215654702603",
  appId:             "1:215654702603:web:1d40be2ca429563048310e"
};

const WORKER_URL = 'https://cvcraftai.wajuayaan.workers.dev';

/* ── Load Firebase compat SDKs then init ── */
(function () {
  const SDKS = [
    'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
  ];
  let loaded = 0;
  SDKS.forEach(src => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => { if (++loaded === SDKS.length) _initAuth(); };
    document.head.appendChild(s);
  });
})();

function _initAuth() {
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  /* ── Auth state → update nav on every page ── */
  auth.onAuthStateChanged(user => {
    window.__cvUser = user;
    _updateNav(user);
    if (typeof window.__onAuthReady === 'function') window.__onAuthReady(user);
  });

  /* ── Global ccAuth API ── */
  window.ccAuth = {

    async loginWithGoogle() {
      await auth.signInWithPopup(googleProvider);
    },

    async loginWithEmail(email, password) {
      await auth.signInWithEmailAndPassword(email, password);
    },

    async signupWithEmail(email, password, name) {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
    },

    async logout() {
      await auth.signOut();
      localStorage.removeItem('cc-current-cv-id');
    },

    async getToken() {
      return auth.currentUser ? auth.currentUser.getIdToken() : null;
    },

    /* ── CV CRUD via Worker ── */
    async saveCV(cvId, name, formData, generatedText) {
      const token = await this.getToken();
      if (!token) throw new Error('Not logged in');
      const res = await fetch(`${WORKER_URL}/api/cv/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id: cvId, name, form_data: formData, generated_text: generatedText })
      });
      if (!res.ok) throw new Error('Save failed');
      return await res.json();
    },

    async loadCVs() {
      const token = await this.getToken();
      if (!token) return [];
      const res = await fetch(`${WORKER_URL}/api/cv/list`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.ok ? await res.json() : [];
    },

    async loadCV(cvId) {
      const token = await this.getToken();
      if (!token) return null;
      const res = await fetch(`${WORKER_URL}/api/cv/load?id=${cvId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.ok ? await res.json() : null;
    },

    async deleteCV(cvId) {
      const token = await this.getToken();
      if (!token) throw new Error('Not logged in');
      await fetch(`${WORKER_URL}/api/cv/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id: cvId })
      });
    }
  };
}

/* ── Update nav buttons / avatar ── */
function _updateNav(user) {
  const loginBtns  = document.querySelectorAll('.cc-btn-login');
  const signupBtns = document.querySelectorAll('.cc-btn-signup');
  const avatarWrap = document.getElementById('cc-user-avatar');

  if (user) {
    loginBtns.forEach(b  => b.style.display = 'none');
    signupBtns.forEach(b => b.style.display = 'none');
    if (avatarWrap) {
      const initials = (user.displayName || user.email || '?')
        .split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      avatarWrap.innerHTML = user.photoURL
        ? `<img src="${user.photoURL}" alt="${initials}"
             style="width:36px;height:36px;border-radius:50%;object-fit:cover;
                    border:2px solid var(--indigo);cursor:pointer;" id="cc-avatar-img">`
        : `<div id="cc-avatar-img"
             style="width:36px;height:36px;border-radius:50%;
                    background:linear-gradient(135deg,#7C6CF0,#5B4BD6);
                    display:flex;align-items:center;justify-content:center;
                    font-size:13px;font-weight:700;color:#fff;cursor:pointer;"
           >${initials}</div>`;

      // name in dropdown
      const nameEl = document.getElementById('cc-user-name');
      if (nameEl) nameEl.textContent = user.displayName || user.email;

      avatarWrap.style.display = 'flex';

      document.getElementById('cc-avatar-img')?.addEventListener('click', e => {
        e.stopPropagation();
        const menu = document.getElementById('cc-user-menu');
        if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      });
    }
  } else {
    loginBtns.forEach(b  => b.style.display = '');
    signupBtns.forEach(b => b.style.display = '');
    if (avatarWrap) avatarWrap.style.display = 'none';
  }
}

/* ── Close user menu on outside click ── */
document.addEventListener('click', () => {
  const menu = document.getElementById('cc-user-menu');
  if (menu) menu.style.display = 'none';
});
