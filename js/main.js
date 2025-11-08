// === Επιλογή ενεργού link στο navbar ανάλογα με τη σελίδα ===

// 1) Παίρνουμε το όνομα του αρχείου της τρέχουσας σελίδας (π.χ. "home.html")
const file = location.pathname.split('/').pop() || 'home.html';

// 2) Επιλέγουμε όλα τα links μέσα στο .bottom-nav
document.querySelectorAll('.bottom-nav a').forEach(a => {
  // 3) Αν το link έχει data-home, αυτό σημαίνει "είμαι η home"
  const isHome = a.hasAttribute('data-home') && file === '';

  // 4) Αν το href του link ταιριάζει με το τρέχον αρχείο ή είναι "home" case, βάλε active
  if (a.getAttribute('href') === file || isHome) {
    a.classList.add('active');
  }
});

// ==== CONTACT PAGE JS ====
(function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  // Floating-labels δουλεύουν με :placeholder-shown, βάζουμε empty placeholder στα inputs αν λείπει
  document.querySelectorAll('.field input, .field textarea').forEach(el => {
    if (!el.hasAttribute('placeholder')) el.setAttribute('placeholder', ' ');
  });

  // Micro-interaction στο κουμπί: "spark" ακολουθεί τον δείκτη
  const btn = form ? form.querySelector('button[type="submit"]') : null;
  if (btn) {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      btn.style.setProperty('--mx', `${x}%`);
    });
  }

  // Copy-to-clipboard για email/τηλέφωνο
  document.querySelectorAll('.copy-btn').forEach(b => {
    b.addEventListener('click', async () => {
      const v = b.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(v);
        b.querySelector('.hint').textContent = 'copied';
        setTimeout(() => (b.querySelector('.hint').textContent = 'copy'), 1400);
      } catch {
        // fallback: mailto/tel
        if (v.includes('@')) location.href = `mailto:${v}`;
        else location.href = `tel:${v.replace(/\s+/g,'')}`;
      }
    });
  });

  if (!form) return;

  // Απλή validation
  const rules = {
    name: v => v.trim().length >= 2 || 'Γράψε τουλάχιστον 2 χαρακτήρες.',
    email: v => /\S+@\S+\.\S+/.test(v) || 'Άκυρο email.',
    message: v => v.trim().length >= 10 || 'Γράψε τουλάχιστον 10 χαρακτήρες.'
  };

  function setError(id, msg) {
    const field = form.querySelector(`#${id}`)?.closest('.field');
    if (!field) return;
    field.querySelector('.error').textContent = msg || '';
    field.querySelector('input,textarea').setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate() {
    let ok = true;
    ['name','email','message'].forEach(id => {
      const el = form.querySelector('#' + id);
      const rule = rules[id];
      const res = rule(el.value);
      if (res !== true) { setError(id, res); ok = false; } else { setError(id, ''); }
    });
    return ok;
  }

  // Submit (demo)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const original = submitBtn.textContent.trim();
    const loadingText = submitBtn.getAttribute('data-loading') || 'Sending…';

    submitBtn.disabled = true;
    submitBtn.textContent = loadingText;

    // Demo: fake latency
    await new Promise(r => setTimeout(r, 700));

    submitBtn.disabled = false;
    submitBtn.textContent = original;
    form.reset();

    // Καθαρισμός floating labels μετά το reset
    form.querySelectorAll('.field label').forEach(l => l.style = '');

    // Toast
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1600);
    }
  });

  // Live validation on blur
  form.querySelectorAll('input,textarea').forEach(el => {
    el.addEventListener('blur', () => {
      const id = el.id;
      if (rules[id]) {
        const res = rules[id](el.value);
        setError(id, res === true ? '' : res);
      }
    });
  });
})();
