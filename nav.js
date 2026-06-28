/* ─────────────────────────────────────────────
   CvCraft — Shared Navigation Component
   Include on every page:
     <div id="nav-root"></div>
     <script src="nav.js"></script>
     <script src="auth.js"></script>
   ───────────────────────────────────────────── */

(function () {

  /* ── 1. Inject nav CSS ── */
  const style = document.createElement('style');
  style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lexend:wght@600;700;800&display=swap');

:root{
  --indigo:#6C5CE7; --indigo-dark:#5B4BD6;
  --ink:#1A1B2E; --ink-soft:#5B5D72; --ink-faint:#8A8CA0;
  --line:#E7E6F0;
  --bg:#FCFCFE;
  --violet-soft:#EDE9FE;
  --nav-bg:rgba(252,252,254,0.92);
  --card-bg:#fff;
  --modal-bg:#fff;
  --btn-login-bg:#fff;
  --btn-login-border:var(--line);
  --theme-btn-bg:#F2F1FA;
  --theme-btn-hover:#E7E5F5;
}
body.dark{
  --bg:#0D0C1A;
  --ink:#E8E6F4; --ink-soft:#9A98B4; --ink-faint:#6A6880;
  --line:#1E1C35;
  --violet-soft:#1E1B36;
  --nav-bg:rgba(13,12,26,0.95);
  --card-bg:#141327;
  --modal-bg:#181730;
  --btn-login-bg:#1B1A30;
  --btn-login-border:#252340;
  --theme-btn-bg:#1B1A30;
  --theme-btn-hover:#242240;
}
body{
  font-family:'Inter',system-ui,sans-serif;
  background:var(--bg); color:var(--ink);
  transition:background .45s cubic-bezier(.16,.8,.3,1), color .45s cubic-bezier(.16,.8,.3,1);
}

@keyframes _fadeDown{ from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
@keyframes _shine{ from{transform:translateX(-130%) skewX(-12deg)} to{transform:translateX(230%) skewX(-12deg)} }

.cc-nav{
  display:flex; align-items:center; justify-content:space-between;
  padding:18px 48px;
  border-bottom:1px solid var(--line);
  background:var(--nav-bg);
  backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
  position:sticky; top:0; z-index:200;
  animation:_fadeDown .6s cubic-bezier(.16,.8,.3,1) both;
  transition:background .4s, border-color .4s;
}
.cc-brand{ display:flex; align-items:center; cursor:pointer; }
.cc-brand-logo{
  height:42px; width:auto; display:block;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1), opacity .2s, filter .4s;
}
.cc-brand:hover .cc-brand-logo{ transform:scale(1.04); opacity:.9; }
body.dark .cc-brand-logo{ filter:invert(1) brightness(2); }

.cc-nav-links{ display:flex; align-items:center; gap:34px; }
.cc-nav-links a{
  font-family:'Inter',sans-serif;
  font-size:14.5px; font-weight:500; color:var(--ink-soft);
  text-decoration:none;
  position:relative; padding-bottom:6px;
  transition:color .2s;
}
.cc-nav-links a::after{
  content:''; position:absolute; left:0; right:100%; bottom:-2px;
  height:2px; background:var(--indigo); border-radius:2px;
  transition:right .28s cubic-bezier(.16,.8,.3,1);
}
.cc-nav-links a:hover{ color:var(--ink); }
.cc-nav-links a:hover::after{ right:0; }
.cc-nav-links a.active{ color:var(--indigo); font-weight:600; }
.cc-nav-links a.active::after{ right:0; }

.cc-nav-right{ display:flex; align-items:center; gap:12px; }

.cc-theme-pill{
  width:56px; height:30px; border-radius:999px;
  background:var(--theme-btn-bg);
  border:1.5px solid var(--line);
  position:relative; cursor:pointer; flex-shrink:0;
  transition:background .35s, border-color .35s;
}
.cc-theme-knob{
  position:absolute; top:3px; left:3px;
  width:22px; height:22px; border-radius:50%;
  background:linear-gradient(135deg,#fff,#f0eeff);
  box-shadow:0 2px 8px rgba(0,0,0,.18);
  display:flex; align-items:center; justify-content:center;
  transition:transform .38s cubic-bezier(.34,1.56,.64,1), background .35s, box-shadow .3s;
}
body.dark .cc-theme-pill{ background:#1E1C38; border-color:#2E2B4A; }
body.dark .cc-theme-knob{
  transform:translateX(26px);
  background:linear-gradient(135deg,#6C5CE7,#5B4BD6);
  box-shadow:0 2px 10px rgba(108,92,231,.5);
}
.cc-theme-knob svg{ transition:opacity .2s, transform .3s; }
.cc-sun{ position:absolute; }
.cc-moon{ position:absolute; opacity:0; transform:rotate(40deg) scale(.6); }
body.dark .cc-sun{ opacity:0; transform:rotate(-40deg) scale(.6); }
body.dark .cc-moon{ opacity:1; transform:rotate(0deg) scale(1); }

.cc-btn-login{
  font-family:'Inter',sans-serif;
  font-size:14px; font-weight:600; color:var(--ink);
  padding:9px 18px; border-radius:9px; border:1px solid var(--btn-login-border);
  background:var(--btn-login-bg); cursor:pointer;
  transition:border-color .2s, background .2s, transform .15s, color .3s;
}
.cc-btn-login:hover{ border-color:var(--indigo); background:var(--violet-soft); transform:translateY(-1px); }

.cc-btn-signup{
  font-family:'Inter',sans-serif;
  font-size:14px; font-weight:600; color:#fff;
  padding:10px 20px; border-radius:9px; border:none;
  background:linear-gradient(135deg,#7C6CF0,var(--indigo-dark));
  cursor:pointer; box-shadow:0 4px 14px rgba(108,92,231,.35);
  transition:transform .15s, box-shadow .2s, filter .15s;
  position:relative; overflow:hidden;
}
.cc-btn-signup::after{
  content:''; position:absolute; top:0; left:0; width:40%; height:100%;
  background:linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent);
  transform:translateX(-130%) skewX(-12deg);
}
.cc-btn-signup:hover{ filter:brightness(1.08); transform:translateY(-1px); }
.cc-btn-signup:hover::after{ animation:_shine .7s ease forwards; }

/* User avatar */
.cc-user-avatar-wrap{
  position:relative; display:none; align-items:center;
}
.cc-user-menu{
  display:none; position:absolute; top:48px; right:0;
  background:var(--modal-bg); border:1.5px solid var(--line);
  border-radius:14px; padding:8px; min-width:200px;
  box-shadow:0 8px 32px rgba(0,0,0,.15); z-index:400;
  animation:_fadeDown .2s cubic-bezier(.16,.8,.3,1);
}
.cc-user-menu.open{ display:block; }
.cc-user-menu-name{
  padding:8px 12px 10px; font-size:13px; font-weight:600;
  color:var(--ink); border-bottom:1px solid var(--line); margin-bottom:6px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.cc-user-menu a, .cc-user-menu-btn{
  display:block; width:100%; text-align:left;
  padding:9px 12px; font-size:13.5px; font-weight:500;
  color:var(--ink-soft); text-decoration:none;
  border-radius:8px; border:none; background:none;
  cursor:pointer; font-family:'Inter',sans-serif;
  transition:background .15s, color .15s;
}
.cc-user-menu a:hover{ background:var(--violet-soft); color:var(--indigo); }
.cc-user-menu-btn.danger{ color:#E0436B; }
.cc-user-menu-btn.danger:hover{ background:#FDE3E8; color:#C0304F; }

/* Hamburger */
.cc-hamburger{
  display:none; flex-direction:column; justify-content:center; gap:5px;
  width:38px; height:38px; border-radius:10px; border:1.5px solid var(--line);
  background:var(--btn-login-bg); cursor:pointer; padding:8px;
  transition:background .2s, border-color .2s; flex-shrink:0;
}
.cc-hamburger span{
  display:block; height:2px; border-radius:2px;
  background:var(--ink); transition:transform .3s, opacity .3s;
}
.cc-hamburger.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
.cc-hamburger.open span:nth-child(2){ opacity:0; }
.cc-hamburger.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

.cc-drawer{
  position:fixed; top:0; right:0; height:100%; width:280px; max-width:85vw;
  background:var(--modal-bg); border-left:1px solid var(--line);
  z-index:300; transform:translateX(100%);
  transition:transform .35s cubic-bezier(.16,.8,.3,1), background .4s, border-color .4s;
  display:flex; flex-direction:column;
}
.cc-drawer.open{ transform:translateX(0); }
.cc-drawer-inner{
  padding:80px 28px 32px;
  display:flex; flex-direction:column; gap:4px; flex:1;
}
.cc-drawer-inner a{
  font-family:'Inter',sans-serif;
  font-size:16px; font-weight:500; color:var(--ink-soft);
  text-decoration:none; padding:13px 0; border-bottom:1px solid var(--line);
  display:block; transition:color .2s;
}
.cc-drawer-inner a.active{ color:var(--indigo); font-weight:600; }
.cc-drawer-inner a:hover{ color:var(--ink); }
.cc-drawer-btns{ margin-top:24px; display:flex; flex-direction:column; gap:10px; }
.cc-drawer-btns .cc-btn-login,
.cc-drawer-btns .cc-btn-signup{ width:100%; padding:12px 18px; font-size:15px; border-radius:10px; }

.cc-overlay{
  position:fixed; inset:0; background:rgba(8,8,18,.5);
  backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px);
  z-index:299; display:none; opacity:0; transition:opacity .3s ease;
}
.cc-overlay.show{ display:block; opacity:1; }

/* Auth modal */
.cc-auth-modal{
  display:none; position:fixed; inset:0;
  background:rgba(8,8,18,.65);
  backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
  z-index:500; align-items:center; justify-content:center;
}
.cc-auth-modal.open{ display:flex; }
.cc-auth-box{
  background:var(--modal-bg); border:1.5px solid var(--line);
  border-radius:20px; padding:36px 32px; width:90%; max-width:400px;
  box-shadow:0 24px 64px rgba(0,0,0,.25); position:relative;
  animation:_fadeDown .25s cubic-bezier(.16,.8,.3,1);
}
.cc-auth-close{
  position:absolute; top:14px; right:16px;
  background:none; border:none; font-size:20px;
  cursor:pointer; color:var(--ink-faint); line-height:1;
  transition:color .15s;
}
.cc-auth-close:hover{ color:var(--ink); }
.cc-auth-tabs{
  display:flex; margin-bottom:24px;
  border:1.5px solid var(--line); border-radius:10px; overflow:hidden;
}
.cc-auth-tab{
  flex:1; padding:10px; font-size:14px; font-weight:600;
  border:none; cursor:pointer; font-family:'Inter',sans-serif;
  background:transparent; color:var(--ink-soft);
  transition:background .2s, color .2s;
}
.cc-auth-tab.active{ background:var(--indigo); color:#fff; }
.cc-auth-err{
  display:none; background:#FDE3E8; color:#C0304F;
  border-radius:8px; padding:10px 14px;
  font-size:13px; font-weight:500; margin-bottom:14px;
}
.cc-auth-inp{
  width:100%; padding:11px 14px;
  border:1.5px solid var(--line); border-radius:10px;
  font-size:14px; font-family:'Inter',sans-serif;
  background:var(--bg); color:var(--ink);
  outline:none; margin-bottom:10px;
  transition:border-color .2s, box-shadow .2s;
}
.cc-auth-inp:focus{ border-color:var(--indigo); box-shadow:0 0 0 3px rgba(108,92,231,.14); }
.cc-auth-submit{
  width:100%; padding:12px; margin-bottom:12px;
  background:linear-gradient(135deg,#7C6CF0,#5B4BD6);
  color:#fff; border:none; border-radius:10px;
  font-size:14px; font-weight:700; font-family:'Inter',sans-serif;
  cursor:pointer; transition:filter .15s, transform .15s;
  box-shadow:0 6px 18px rgba(108,92,231,.35);
}
.cc-auth-submit:hover{ filter:brightness(1.08); transform:translateY(-1px); }
.cc-auth-submit:disabled{ filter:none; transform:none; opacity:.6; cursor:not-allowed; }
.cc-auth-google{
  width:100%; padding:11px; margin-bottom:0;
  background:var(--bg); border:1.5px solid var(--line);
  border-radius:10px; font-size:14px; font-weight:600;
  font-family:'Inter',sans-serif; cursor:pointer; color:var(--ink);
  display:flex; align-items:center; justify-content:center; gap:9px;
  transition:border-color .2s, background .2s, transform .15s;
}
.cc-auth-google:hover{ border-color:#C9C0F2; background:var(--violet-soft); transform:translateY(-1px); }
.cc-auth-divider{
  text-align:center; font-size:12px; color:var(--ink-faint);
  margin:10px 0; position:relative;
}
.cc-auth-divider::before,.cc-auth-divider::after{
  content:''; position:absolute; top:50%; width:42%; height:1px;
  background:var(--line);
}
.cc-auth-divider::before{ left:0; }
.cc-auth-divider::after{ right:0; }

/* Star field */
.cc-bg-stars{ position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
.cc-bg-star{
  position:absolute; border-radius:50%; background:#fff; opacity:0;
  animation:_starPulse var(--dur,4s) ease-in-out infinite var(--del,0s);
}
@keyframes _starPulse{
  0%,100%{ opacity:.25; transform:scale(1); }
  50%     { opacity:.8;  transform:scale(1.4); }
}
body:not(.dark) .cc-bg-star{ display:none; }

@media(max-width:980px){
  .cc-nav-links{ display:none; }
  .cc-hamburger{ display:flex; }
  .cc-btn-login, .cc-btn-signup{ display:none; }
}
@media(max-width:540px){
  .cc-nav{ padding:13px 16px; }
  .cc-brand-logo{ height:34px; }
  .cc-auth-box{ padding:28px 20px; }
}
  `;
  document.head.appendChild(style);

  /* ── 2. Active page ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  const isActive = (href) => {
    const h = href.split('/').pop();
    if (h === 'index.html' || h === '') return page === 'index.html' || page === '';
    return page === h;
  };

  /* ── 3. Nav links ── */
  const links = [
    { href: 'index.html',     label: 'Home' },
    { href: 'templates.html', label: 'Templates' },
    { href: 'pricing.html',   label: 'Pricing' },
    { href: 'about.html',     label: 'About' },
  ];

  const linkHTML = links.map(l =>
    `<a href="${l.href}"${isActive(l.href) ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  const drawerLinkHTML = links.map(l =>
    `<a href="${l.href}"${isActive(l.href) ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  /* ── Google icon SVG ── */
  const googleIcon = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>`;

  /* ── 4. Full HTML ── */
  const navHTML = `
<div class="cc-bg-stars" id="cc-bg-stars"></div>

<nav class="cc-nav">
  <a class="cc-brand" href="index.html">
    <img src="cvcraft-logo.png" alt="CvCraft" class="cc-brand-logo">
  </a>

  <div class="cc-nav-links">${linkHTML}</div>

  <div class="cc-nav-right">
    <button class="cc-theme-pill" id="cc-theme-toggle" aria-label="Toggle dark mode">
      <div class="cc-theme-knob">
        <svg class="cc-sun" width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="#F59E0B" stroke-width="2"/>
          <path d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3l-1.8-1.8" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg class="cc-moon" width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="#A78BFA" stroke="#A78BFA" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </div>
    </button>

    <button class="cc-btn-login" id="cc-login-btn">Log in</button>
    <button class="cc-btn-signup" id="cc-signup-btn">Sign up</button>

    <!-- User avatar + dropdown (shown when logged in) -->
    <div class="cc-user-avatar-wrap" id="cc-user-avatar">
      <!-- filled by auth.js -->
      <div class="cc-user-menu" id="cc-user-menu">
        <div class="cc-user-menu-name" id="cc-user-name"></div>
        <a href="profile.html">👤 My Profile</a>
        <button class="cc-user-menu-btn danger" id="cc-logout-btn">↩ Log out</button>
      </div>
    </div>
  </div>

  <button class="cc-hamburger" id="cc-hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile drawer -->
<div class="cc-drawer" id="cc-drawer">
  <div class="cc-drawer-inner">
    ${drawerLinkHTML}
    <div class="cc-drawer-btns">
      <button class="cc-btn-login" id="cc-login-btn-m">Log in</button>
      <button class="cc-btn-signup" id="cc-signup-btn-m">Sign up</button>
    </div>
  </div>
</div>
<div class="cc-overlay" id="cc-overlay"></div>

<!-- Auth Modal -->
<div class="cc-auth-modal" id="cc-auth-modal" role="dialog" aria-modal="true" aria-label="Sign in">
  <div class="cc-auth-box">
    <button class="cc-auth-close" id="cc-auth-close" aria-label="Close">✕</button>

    <div class="cc-auth-tabs">
      <button class="cc-auth-tab active" id="cc-tab-login"  onclick="ccSwitchTab('login')">Log in</button>
      <button class="cc-auth-tab"        id="cc-tab-signup" onclick="ccSwitchTab('signup')">Sign up</button>
    </div>

    <div id="cc-auth-err" class="cc-auth-err"></div>

    <!-- Login -->
    <div id="cc-form-login">
      <input class="cc-auth-inp" id="cc-login-email" type="email"    placeholder="Email address" autocomplete="email">
      <input class="cc-auth-inp" id="cc-login-pass"  type="password" placeholder="Password"      autocomplete="current-password" style="margin-bottom:16px;">
      <button class="cc-auth-submit" id="cc-login-submit" onclick="ccDoLogin()">Log in</button>
      <div class="cc-auth-divider">or</div>
      <button class="cc-auth-google" onclick="ccGoogleAuth()">${googleIcon} Continue with Google</button>
    </div>

    <!-- Signup -->
    <div id="cc-form-signup" style="display:none;">
      <input class="cc-auth-inp" id="cc-signup-name"  type="text"     placeholder="Full name"           autocomplete="name">
      <input class="cc-auth-inp" id="cc-signup-email" type="email"    placeholder="Email address"       autocomplete="email">
      <input class="cc-auth-inp" id="cc-signup-pass"  type="password" placeholder="Password (min 6)"    autocomplete="new-password" style="margin-bottom:16px;">
      <button class="cc-auth-submit" id="cc-signup-submit" onclick="ccDoSignup()">Create account</button>
      <div class="cc-auth-divider">or</div>
      <button class="cc-auth-google" onclick="ccGoogleAuth()">${googleIcon} Continue with Google</button>
    </div>
  </div>
</div>
  `;

  /* ── 5. Mount ── */
  const root = document.getElementById('nav-root');
  if (root) root.innerHTML = navHTML;
  else {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navHTML;
    document.body.prepend(wrapper);
  }

  /* ── 6. Dark mode ── */
  let isDark = localStorage.getItem('cvcraft-dark') === '1';
  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('cvcraft-dark', dark ? '1' : '0');
    renderStars(dark);
  }
  applyTheme(isDark);
  document.getElementById('cc-theme-toggle').addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
  });

  /* ── 7. Star field ── */
  function renderStars(dark) {
    const container = document.getElementById('cc-bg-stars');
    if (!container) return;
    container.innerHTML = '';
    if (!dark) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'cc-bg-star';
      const size = Math.random() * 2.5 + 1;
      s.style.cssText = [
        `width:${size}px`, `height:${size}px`,
        `left:${Math.random()*100}%`, `top:${Math.random()*100}%`,
        `--dur:${(Math.random()*5+3).toFixed(1)}s`,
        `--del:${(Math.random()*6).toFixed(1)}s`,
        `opacity:${(Math.random()*.4+.05).toFixed(2)}`
      ].join(';');
      container.appendChild(s);
    }
  }

  /* ── 8. Mobile drawer ── */
  const hamburger = document.getElementById('cc-hamburger');
  const drawer    = document.getElementById('cc-drawer');
  const overlay   = document.getElementById('cc-overlay');

  function openDrawer()  {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () =>
    drawer.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ── 9. Auth modal open/close ── */
  function openAuthModal(tab) {
    document.getElementById('cc-auth-modal').classList.add('open');
    ccSwitchTab(tab || 'login');
    document.getElementById('cc-auth-err').style.display = 'none';
  }
  function closeAuthModal() {
    document.getElementById('cc-auth-modal').classList.remove('open');
  }

  document.getElementById('cc-auth-close').addEventListener('click', closeAuthModal);
  document.getElementById('cc-auth-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('cc-auth-modal')) closeAuthModal();
  });

  // Wire buttons
  document.getElementById('cc-login-btn')  ?.addEventListener('click', () => openAuthModal('login'));
  document.getElementById('cc-signup-btn') ?.addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('cc-login-btn-m')  ?.addEventListener('click', () => { closeDrawer(); openAuthModal('login'); });
  document.getElementById('cc-signup-btn-m') ?.addEventListener('click', () => { closeDrawer(); openAuthModal('signup'); });

  // Logout
  document.getElementById('cc-logout-btn')?.addEventListener('click', () => {
    if (window.ccAuth) window.ccAuth.logout();
    document.getElementById('cc-user-menu').classList.remove('open');
  });

  // Close user menu on outside click
  document.addEventListener('click', e => {
    const wrap = document.getElementById('cc-user-avatar');
    const menu = document.getElementById('cc-user-menu');
    if (menu && wrap && !wrap.contains(e.target)) menu.classList.remove('open');
  });

  /* ── 10. Tab switcher (global) ── */
  window.ccSwitchTab = function(tab) {
    const isLogin = tab === 'login';
    document.getElementById('cc-form-login').style.display  = isLogin ? '' : 'none';
    document.getElementById('cc-form-signup').style.display = isLogin ? 'none' : '';
    document.getElementById('cc-tab-login').classList.toggle('active',  isLogin);
    document.getElementById('cc-tab-signup').classList.toggle('active', !isLogin);
    document.getElementById('cc-auth-err').style.display = 'none';
  };

  /* ── 11. Auth actions (global) ── */
  function showErr(msg) {
    const el = document.getElementById('cc-auth-err');
    el.textContent = msg.replace('Firebase: ','').replace(/\s*\(auth\/[^)]+\)/,'');
    el.style.display = 'block';
  }
  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait…' : btn.id.includes('login') ? 'Log in' : 'Create account';
  }

  window.ccDoLogin = async function() {
    const email = document.getElementById('cc-login-email').value.trim();
    const pass  = document.getElementById('cc-login-pass').value;
    if (!email || !pass) { showErr('Please enter your email and password.'); return; }
    setLoading('cc-login-submit', true);
    try {
      await window.ccAuth.loginWithEmail(email, pass);
      closeAuthModal();
    } catch(e) { showErr(e.message); }
    setLoading('cc-login-submit', false);
  };

  window.ccDoSignup = async function() {
    const name  = document.getElementById('cc-signup-name').value.trim();
    const email = document.getElementById('cc-signup-email').value.trim();
    const pass  = document.getElementById('cc-signup-pass').value;
    if (!name || !email || !pass) { showErr('Please fill in all fields.'); return; }
    if (pass.length < 6) { showErr('Password must be at least 6 characters.'); return; }
    setLoading('cc-signup-submit', true);
    try {
      await window.ccAuth.signupWithEmail(email, pass, name);
      closeAuthModal();
    } catch(e) { showErr(e.message); }
    setLoading('cc-signup-submit', false);
  };

  window.ccGoogleAuth = async function() {
    try {
      document.getElementById('cc-auth-err').style.display = 'none';
      await window.ccAuth.loginWithGoogle();
      closeAuthModal();
    } catch(e) { showErr(e.message); }
  };

  /* ── Reveal body ── */
  document.body.style.visibility = 'visible';

})();
