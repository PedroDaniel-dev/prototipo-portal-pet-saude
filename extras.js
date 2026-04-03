document.addEventListener('DOMContentLoaded', () => {
  let detailCounter = 0;
  const nextDetailId = (prefix) => {
    detailCounter += 1;
    return `${prefix}-${detailCounter}`;
  };

  const toggleDetails = (button) => {
    const detailId = button.getAttribute('data-detail');
    const detail = document.getElementById(detailId);
    if (!detail) {
      console.error('Detalhe não encontrado:', detailId);
      return;
    }
    const isOpen = detail.classList.toggle('ativo');
    console.log('Toggle details - detailId:', detailId, 'isOpen:', isOpen);

    detail.style.display = isOpen ? 'block' : 'none';

    button.textContent = isOpen ? 'Ocultar detalhes' : 'Ver detalhes';

    const card = button.closest('.card-demo');
    if (card) {
      card.style.overflow = 'visible';
    }
  };

  const createDetailsButton = (className, detailId) => {
    const btn = document.createElement('button');
    btn.className = `linkedin-botao ${className}`;
    btn.setAttribute('data-detail', detailId);
    btn.type = 'button';
    btn.textContent = 'Ver detalhes';
    btn.addEventListener('click', () => toggleDetails(btn));
    return btn;
  };

  const demoActors = [
    {
      nome: 'Rede Saude Digital RJ',
      tipoAtor: 'Instituicao',
      tipoApoio: 'Capacitacao',
      areaAtuacao: 'Saude Digital',
      ods: '3',
      descricao: 'Rede colaborativa para integracao de iniciativas de saude digital no municipio.'
    },
    {
      nome: 'ONG Inovar Comunidade',
      tipoAtor: 'ONG',
      tipoApoio: 'Fomento',
      areaAtuacao: 'Inclusao Social',
      ods: '10',
      descricao: 'Apoia projetos em territorios vulneraveis com foco em impacto social e saude.'
    },
    {
      nome: 'Laboratorio Carioca de Inovacao',
      tipoAtor: 'Laboratorio',
      tipoApoio: 'Infraestrutura',
      areaAtuacao: 'Pesquisa Aplicada',
      ods: '11',
      descricao: 'Ambiente de testes para solucoes de saude digital orientadas por dados.'
    },
    {
      nome: 'Mentoria SUS Tech',
      tipoAtor: 'Mentoria',
      tipoApoio: 'Mentoria',
      areaAtuacao: 'Gestao Publica',
      ods: '17',
      descricao: 'Mentoria para equipes e liderancas publicas em transformacao digital.'
    }
  ];

  const buscaRoot = document.getElementById('busca-avancada-demo');
  if (buscaRoot) {
    const tipoAtor = document.getElementById('filtro-tipo-ator');
    const tipoApoio = document.getElementById('filtro-tipo-apoio');
    const areaAtuacao = document.getElementById('filtro-area-atuacao');
    const ods = document.getElementById('filtro-ods');
    const aplicar = document.getElementById('aplicar-filtros');
    const limpar = document.getElementById('limpar-filtros');
    const resultados = document.getElementById('resultados-busca');

    const renderBusca = (itens) => {
      resultados.innerHTML = '';
      if (!itens.length) {
        resultados.innerHTML = '<p>Nenhum resultado encontrado para os filtros selecionados.</p>';
        return;
      }

      itens.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'card-equipe';
        card.innerHTML = `
          <div class="card-informacoes">
            <h3>${item.nome}</h3>
            <p><strong>Tipo de ator:</strong> ${item.tipoAtor}</p>
            <p><strong>Tipo de apoio:</strong> ${item.tipoApoio}</p>
            <p><strong>Area de atuacao:</strong> ${item.areaAtuacao}</p>
            <p><strong>ODS:</strong> ${item.ods}</p>
            <p>${item.descricao}</p>
          </div>
        `;
        resultados.appendChild(card);
      });
    };

    const filtrar = () => {
      const filtrados = demoActors.filter((item) => {
        const atorOk = !tipoAtor.value || item.tipoAtor === tipoAtor.value;
        const apoioOk = !tipoApoio.value || item.tipoApoio === tipoApoio.value;
        const areaOk = !areaAtuacao.value || item.areaAtuacao === areaAtuacao.value;
        const odsOk = !ods.value || item.ods === ods.value;
        return atorOk && apoioOk && areaOk && odsOk;
      });
      renderBusca(filtrados);
    };

    aplicar.addEventListener('click', filtrar);
    limpar.addEventListener('click', () => {
      tipoAtor.value = '';
      tipoApoio.value = '';
      areaAtuacao.value = '';
      ods.value = '';
      renderBusca(demoActors);
    });

    renderBusca(demoActors);
  }

  const homeBuscaRoot = document.getElementById('busca-avancada-home');
  if (homeBuscaRoot) {
    const dadosHome = [
      {
        nome: 'Rede Saude Digital RJ',
        tipoAtor: 'ONG',
        ods: 'Saude',
        atuacao: 'Tecnologia social',
        beneficiarios: 'Comunidades'
      },
      {
        nome: 'Mentoria SUS Tech',
        tipoAtor: 'Mentor',
        ods: 'Parcerias',
        atuacao: 'Capacitacao',
        beneficiarios: 'Profissionais de saude'
      },
      {
        nome: 'Instituto Inova Rio',
        tipoAtor: 'Instituto privado',
        ods: 'Desigualdades',
        atuacao: 'Tecnologia social',
        beneficiarios: 'Comunidades'
      },
      {
        nome: 'Pesquisa Conectada UFRJ',
        tipoAtor: 'Pesquisador',
        ods: 'Educacao',
        atuacao: 'Pesquisa',
        beneficiarios: 'Pesquisadores'
      },
      {
        nome: 'Programa Saude Publica Digital',
        tipoAtor: 'Gestor publico',
        ods: 'Saude',
        atuacao: 'Gestao',
        beneficiarios: 'Gestores publicos'
      }
    ];

    const tipoAtor = document.getElementById('home-filtro-tipo-ator');
    const ods = document.getElementById('home-filtro-ods');
    const atuacao = document.getElementById('home-filtro-atuacao');
    const beneficiarios = document.getElementById('home-filtro-beneficiarios');
    const aplicar = document.getElementById('home-aplicar-filtros');
    const limpar = document.getElementById('home-limpar-filtros');
    const resultados = document.getElementById('home-resultados-busca');

    const renderHomeBusca = (lista) => {
      resultados.innerHTML = '';
      if (!lista.length) {
        resultados.innerHTML = '<p>Nenhum ator encontrado para os filtros aplicados.</p>';
        return;
      }
      lista.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'card-equipe';
        card.innerHTML = `
          <div class="card-informacoes">
            <h3>${item.nome}</h3>
            <p><strong>Tipo de ator:</strong> ${item.tipoAtor}</p>
            <p><strong>Area de atuacao:</strong> ${item.atuacao}</p>
            <p><strong>ODS:</strong> ${item.ods}</p>
            <p><strong>Beneficiarios:</strong> ${item.beneficiarios}</p>
          </div>
        `;
        resultados.appendChild(card);
      });
    };

    const filtrarHome = () => {
      const filtrados = dadosHome.filter((item) => {
        const atorOk = !tipoAtor.value || item.tipoAtor === tipoAtor.value;
        const odsOk = !ods.value || item.ods === ods.value;
        const atuacaoOk = !atuacao.value || item.atuacao === atuacao.value;
        const benefOk = !beneficiarios.value || item.beneficiarios === beneficiarios.value;
        return atorOk && odsOk && atuacaoOk && benefOk;
      });
      renderHomeBusca(filtrados);
    };

    aplicar.addEventListener('click', filtrarHome);
    limpar.addEventListener('click', () => {
      tipoAtor.value = '';
      ods.value = '';
      atuacao.value = '';
      beneficiarios.value = '';
      renderHomeBusca(dadosHome);
    });

    renderHomeBusca(dadosHome);
  }

  const listaNoticias = document.getElementById('lista-noticias');
  const formNoticias = document.getElementById('form-noticias');
  if (listaNoticias) {
    const noticiasExemplo = [
      {
        titulo: 'Ecossistema da saúde digital no município do Rio de Janeiro: a experiência de criação do aplicativo MinhaSaúdeRio',
        resumo: 'Aplicativo público amplia o acesso da população a serviços, vacinas e acompanhamento digital de saúde.',
        tema: 'Saúde Digital • Inovação Social • SUS • Inclusão Tecnológica',
        link: 'https://cienciaesaudecoletiva.com.br/artigos/ecossistema-da-saude-digital-no-municipio-do-rio-de-janeiro-a-experiencia-de-criacao-do-aplicativo-minhasauderio/19903',
        detalhe: 'A notícia apresenta como o município do Rio de Janeiro estruturou um ecossistema de saúde digital por meio do aplicativo MinhaSaúdeRio, permitindo que cidadãos acompanhem vacinação, consultas, notificações e atendimento remoto. A proposta reforça a inclusão digital no acesso ao SUS e melhora a comunicação entre população e rede pública de saúde.',
        data: '01/04/2026'
      },
      {
        titulo: 'A Inovação Aberta no SUS',
        resumo: 'Parcerias entre governo e startups impulsionam soluções tecnológicas para modernizar a saúde pública.',
        tema: 'Inovação Aberta • Startups • Saúde Pública • Transformação Digital',
        link: 'https://www.rj.gov.br/saude/node/3684',
        detalhe: 'A matéria destaca a colaboração entre a Secretaria de Saúde do Rio de Janeiro, startups e empresas de tecnologia para desenvolver soluções inovadoras voltadas ao SUS. O foco está em ampliar acesso, melhorar a experiência do usuário e modernizar processos por meio de ferramentas digitais.',
        data: '07/11/2025'
      }
    ];

    const renderNoticia = (item) => {
      const detailId = nextDetailId('detalhe-noticia');
      const card = document.createElement('article');
      card.className = 'card-demo';
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p class="meta">Assunto: ${item.tema} | Data: ${item.data}</p>
        <p>${item.resumo}</p>
        <a href="${item.link}" class="linkedin-botao" target="_blank" rel="noopener noreferrer">Link da noticia</a>
      `;
      const button = createDetailsButton('abrir-detalhes-noticia', detailId);
      const details = document.createElement('div');
      details.className = 'detalhes-expansivel';
      details.id = detailId;
      details.innerHTML = `<p>${item.detalhe}</p>`;
      card.appendChild(button);
      card.appendChild(details);
      listaNoticias.appendChild(card);
    };

    noticiasExemplo.forEach(renderNoticia);

    if (formNoticias) {
      formNoticias.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('noticia-titulo').value.trim();
        const resumo = document.getElementById('noticia-resumo').value.trim();
        const tema = document.getElementById('noticia-tema').value.trim();
        const link = document.getElementById('noticia-link').value.trim();

        const hoje = new Date();
        const data = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;
        renderNoticia({
          titulo,
          resumo,
          tema,
          link,
          detalhe: resumo,
          data
        });

        formNoticias.reset();
      });
    }
  }

  const listaArtigos = document.getElementById('lista-artigos');
  const formArtigos = document.getElementById('form-artigos');
  if (listaArtigos) {
    const artigosExemplo = [
      {
        titulo: 'Transformação digital no Sistema Único de Saúde: interoperabilidade, governança e proteção de dados sensíveis',
        resumo: 'O artigo discute como a transformação digital do SUS melhora a integração de dados, a gestão pública e a continuidade do cuidado ao paciente.',
        tema: 'Saúde Digital • SUS • Governança de Dados • Inovação Social',
        autor: 'Fernanda Schaefer Rivabem, José Luiz de Moura Faleiros Júnior',
        link: 'https://www.researchgate.net/publication/396042582_Transformacao_digital_no_Sistema_Unico_de_Saude_interoperabilidade_governanca_e_protecao_de_dados_sensiveis',
        detalhe: 'O estudo analisa a modernização digital do Sistema Único de Saúde, com foco em interoperabilidade entre sistemas, proteção de dados sensíveis e melhoria do fluxo de atendimento. Ele é excelente para representar inovação social, pois mostra como a tecnologia fortalece o acesso universal e a eficiência do serviço público de saúde. O artigo também aborda a Rede Nacional de Dados em Saúde como eixo de integração.'
      },
      {
        titulo: 'Sistemas Emergentes no Ecossistema Digital Brasileiro de Saúde Pública: Uma Abordagem Sociotécnica',
        resumo: 'O artigo analisa como sistemas digitais emergentes podem transformar a saúde pública brasileira a partir de uma visão sociotécnica.',
        tema: 'Saúde Digital • Ecossistemas Sociotécnicos • SUS • Inovação Social',
        autor: 'Sandro Luís Freire de Castro Silva, Marcelo Fornazin, Rodrigo Pereira dos Santos',
        link: 'https://www.researchgate.net/publication/336035772_Sistemas_Emergentes_no_Ecossistema_Digital_Brasileiro_de_Saude_Publica_Uma_Abordagem_Sociotecnica',
        detalhe: 'O trabalho discute como a implementação de sistemas de informação em saúde não deve ser vista apenas como um problema técnico, mas como parte de um ecossistema social, institucional e tecnológico. Ele aborda as relações entre governo, profissionais, infraestrutura digital e população, mostrando como a tecnologia pode ampliar a eficiência do SUS e a inclusão social no acesso à saúde. Para o seu protótipo, esse artigo encaixa perfeitamente como exemplo de artigo acadêmico sobre inovação social em saúde digital.'
      }
    ];

    const renderArtigo = (item) => {
      const detailId = nextDetailId('detalhe-artigo');
      const card = document.createElement('article');
      card.className = 'card-demo';
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p class="meta">Autor: ${item.autor} | Tema: ${item.tema}</p>
        <p>Resumo: ${item.resumo}</p>
        <a href="${item.link}" class="linkedin-botao" target="_blank" rel="noopener noreferrer">Link do artigo</a>
      `;
      const button = createDetailsButton('abrir-detalhes-artigo', detailId);
      const details = document.createElement('div');
      details.className = 'detalhes-expansivel';
      details.id = detailId;
      details.innerHTML = `<p>${item.detalhe}</p>`;
      card.appendChild(button);
      card.appendChild(details);
      listaArtigos.appendChild(card);
    };

    artigosExemplo.forEach(renderArtigo);

    if (formArtigos) {
      formArtigos.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('artigo-titulo').value.trim();
        const resumo = document.getElementById('artigo-resumo').value.trim();
        const tema = document.getElementById('artigo-tema').value.trim();
        const link = document.getElementById('artigo-link').value.trim();
        const autor = document.getElementById('artigo-autor').value.trim();

        renderArtigo({
          titulo,
          resumo,
          tema,
          autor,
          link,
          detalhe: resumo
        });

        formArtigos.reset();
      });
    }
  }

  const bindExpandableCards = (selector) => {
    const cards = document.querySelectorAll(selector);
    console.log('bindExpandableCards - encontrados', cards.length, 'elementos para', selector);
    cards.forEach((btn) => {
      btn.addEventListener('click', () => toggleDetails(btn));
    });
  };

  bindExpandableCards('.abrir-detalhes-inovacao');
});
