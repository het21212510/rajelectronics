// nav.js — shared navbar behavior (mobile menu toggle)
(function(){
  function init(){
    const btns = document.querySelectorAll('.menu-toggle');
    btns.forEach(btn=>{
      const targetId = btn.getAttribute('aria-controls');
      const menu = targetId ? document.getElementById(targetId) : null;
      btn.addEventListener('click', (e)=>{
        if(!menu) return;
        const isOpen = menu.classList.toggle('open');
        menu.setAttribute('aria-hidden', String(!isOpen));
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });

    document.addEventListener('click', (e)=>{
      // close any open mobile menus when clicking outside
      document.querySelectorAll('.mobile-menu.open').forEach(menu=>{
        const toggle = document.querySelector(`button[aria-controls="${menu.id}"]`);
        if(menu.contains(e.target) || (toggle && toggle.contains(e.target))) return;
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        if(toggle) toggle.setAttribute('aria-expanded','false');
      });
    });

    // global navbar search: Enter -> catalog with query
    const searchBoxes = document.querySelectorAll('.search input[type="search"]');
    searchBoxes.forEach(inp=>{
      inp.addEventListener('keydown', (ev)=>{
        if(ev.key === 'Enter'){
          const q = inp.value.trim();
          if(!q) return;
          // navigate to catalog with q param
          location.href = 'catalog.html?q=' + encodeURIComponent(q);
        }
      });
    });
  }

  // small toast utility
  function ensureToasts(){
    let root = document.getElementById('toasts');
    if(!root){ root = document.createElement('div'); root.id = 'toasts'; document.body.appendChild(root); }
    return root;
  }
  function showToast(message, type='info', timeout=3000){
    const root = ensureToasts();
    const el = document.createElement('div');
    el.className = 'toast ' + (type==='success' ? 'success' : type==='error' ? 'error' : '');
    el.style.marginTop = '8px'; el.textContent = message;
    root.appendChild(el);
    // fade and remove
    setTimeout(()=>{ el.style.transition = 'opacity 220ms ease'; el.style.opacity = '0'; setTimeout(()=> el.remove(), 300); }, timeout);
    return el;
  }

  // expose globally
  window.showToast = showToast;

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();