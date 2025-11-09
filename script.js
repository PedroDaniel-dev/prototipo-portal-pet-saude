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

document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {
      id: 'p1',
      title: 'Programa Saúde nas Comunidades',
      desc: 'Leva atendimentos médicos e prevenção de doenças a áreas vulneráveis.',
      location: 'Rio de Janeiro, RJ',
      ods: [1, 3, 10],
      visualText: 'Saúde nas Comunidades'
    },
    {
      id: 'p2',
      title: 'Nutrição Sustentável',
      desc: 'Produção agrícola local para garantir alimentação saudável e renda comunitária.',
      location: 'Niterói, RJ',
      ods: [2, 3, 11]
    },
    {
      id: 'p3',
      title: 'Educação para a Saúde',
      desc: 'Capacita jovens sobre prevenção e primeiros socorros nas escolas.',
      location: 'Duque de Caxias, RJ',
      ods: [3, 4]
    },
    {
      id: 'p4',
      title: 'Mulheres pela Vida',
      desc: 'Fortalece o protagonismo feminino em ações de saúde e bem-estar.',
      location: 'São Gonçalo, RJ',
      ods: [3, 5, 10]
    },
    {
      id: 'p5',
      title: 'Água é Saúde',
      desc: 'Instala sistemas de captação de água potável em comunidades rurais.',
      location: 'Região Serrana, RJ',
      ods: [3, 6]
    },
    {
      id: 'p6',
      title: 'Saúde Climática Urbana',
      desc: 'Promove áreas verdes e redução de ilhas de calor para melhorar a saúde urbana.',
      location: 'Nova Iguaçu, RJ',
      ods: [3, 11, 13]
    }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  const odsButtons = Array.from(document.querySelectorAll('.ods-btn'));
  const odsClear = document.getElementById('ods-clear');

  function renderProjects(list) {
    projectsGrid.innerHTML = '';
    list.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="project-visual">${proj.visualText || proj.title}</div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.desc}</p>
          <div class="project-meta">
            <div class="project-ods">
             ${proj.ods.map(o => `<span class="mini-ods" data-ods="${o}">${o}</span>`).join('')}
            </div>
            <span class="project-location">${proj.location}</span>
          </div>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  const selectedSet = new Set();

  odsButtons.forEach(btn => {
    const id = btn.dataset.ods;
    btn.addEventListener('click', () => {
      const isPressed = btn.getAttribute('aria-pressed') === 'true';
      if (isPressed) {
        btn.setAttribute('aria-pressed', 'false');
        selectedSet.delete(id);
      } else {
        btn.setAttribute('aria-pressed', 'true');
        selectedSet.add(id);
      }
      filterProjects();
    });
  });

  odsClear.addEventListener('click', () => {
    selectedSet.clear();
    odsButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    renderProjects(projects);
  });

  function filterProjects() {
    const selected = Array.from(selectedSet);
    if (!selected.length) {
      renderProjects(projects);
      return;
    }
    const filtered = projects.filter(p =>
      p.ods.some(o => selected.includes(String(o)))
    );
    renderProjects(filtered);
  }

  renderProjects(projects);
});
