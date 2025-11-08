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
