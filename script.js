document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  console.log('menuToggle:', menuToggle, 'navMenu:', navMenu);

  if (!menuToggle || !navMenu) {
    console.error('Elementos do menu não encontrados no DOM.');
    return;
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // evita propagação indesejada
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    console.log('Menu aberto?', isOpen);
  });

  // Fecha o menu se clicar fora 
  document.addEventListener('click', (e) => {
    if (!navMenu.classList.contains('active')) return;
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      console.log('Clique fora — menu fechado');
    }
  });
});
