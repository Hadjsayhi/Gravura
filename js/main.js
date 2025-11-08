// ενεργό link στο navbar
(function () {
  const file = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    const isHome = a.hasAttribute('data-home') && (file === '' || file === 'index.html' || file === 'home.html');
    if (a.getAttribute('href') === file || isHome) a.classList.add('active');
  });
})();
