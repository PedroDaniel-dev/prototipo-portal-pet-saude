// === Menu Hamburguer Responsivo ===
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.navbar-nav .nav');

// Adiciona evento de clique no ícone do menu
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active'); // alterna a exibição do menu
});