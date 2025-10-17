// auth.js — client-side simulated auth flows (no server)
(function(){
  const tabs = document.querySelectorAll('.auth-tabs .tab');
  const views = document.querySelectorAll('.auth-view');
  const msg = document.getElementById('authMessage');

  function showMessage(text, success=true){
    msg.textContent = text;
    msg.hidden = false;
    msg.style.color = success ? 'var(--brand-600)' : '#c53030';
    setTimeout(()=> msg.hidden = true, 4500);
  }

  function switchTo(id){
    views.forEach(v=> v.classList.toggle('hidden', v.id !== id));
    tabs.forEach(t=>{
      const selected = t.dataset.view === id;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', String(selected));
    });
  }

  // tab clicks
  tabs.forEach(t=> t.addEventListener('click', ()=> switchTo(t.dataset.view)));

  // shortcut from "Forgot?" link
  document.querySelectorAll('[data-action="forgot"]').forEach(a=> a.addEventListener('click', (e)=>{ e.preventDefault(); switchTo('forgot'); }));

  // simple storage helpers
  const STORAGE_KEY = 're_users_v1';
  function loadUsers(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }catch(e){ return {}; }
  }
  function saveUsers(u){ localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }

  // login
  document.getElementById('login').addEventListener('submit', function(e){
    e.preventDefault();
    const f = e.target;
    const email = f.email.value.trim().toLowerCase();
    const password = f.password.value;
    if(!email || !password){ showMessage('Please enter email and password', false); return; }
    const users = loadUsers();
    if(users[email] && users[email].password === password){
      showMessage('Logged in successfully — welcome back!');
      // simulate redirect
      setTimeout(()=> location.href = 'index.html', 900);
    } else {
      showMessage('Invalid credentials. Try again or sign up.', false);
    }
  });

  // signup
  document.getElementById('signup').addEventListener('submit', function(e){
    e.preventDefault();
    const f = e.target;
    const name = f.name.value.trim();
    const email = f.email.value.trim().toLowerCase();
    const password = f.password.value;
    if(!name || !email || !password){ showMessage('Please complete all fields', false); return; }
    const users = loadUsers();
    if(users[email]){ showMessage('An account with this email already exists', false); return; }
    users[email] = {name, password, created: Date.now()};
    saveUsers(users);
    showMessage('Account created. You can now log in.');
    switchTo('login');
  });

  // forgot
  document.getElementById('forgot').addEventListener('submit', function(e){
    e.preventDefault();
    const f = e.target;
    const email = f.email.value.trim().toLowerCase();
    if(!email){ showMessage('Please enter your email', false); return; }
    const users = loadUsers();
    if(users[email]){
      // we can't send emails from client — simulate
      showMessage('Reset link sent to ' + email);
    } else {
      showMessage('No account found with this email', false);
    }
  });

})();