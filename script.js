document.addEventListener('DOMContentLoaded', () => {
    let todosHospitais = [];

    /* Funções para o Tema Modo Claro/Escuro */
    const aplicarTemaSalvo = () => {
        const corpo = document.body;
        const temaSalvo = localStorage.getItem('theme');
        if (temaSalvo === 'dark') {
            corpo.classList.add('modo-escuro');
        } else {
            corpo.classList.remove('modo-escuro');
        }
    };

    const alternarTema = () => {
        const corpo = document.body;
        corpo.classList.toggle('modo-escuro');
        if (corpo.classList.contains('modo-escuro')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    /* Funções para a Barra Lateral do Usuário */
    const abrirBarraLateral = () => {
        const barraLateral = document.getElementById('barra-lateral-usuario');
        const fundoBarraLateral = document.getElementById('fundo-barra-lateral');
        if(barraLateral && fundoBarraLateral) {
            barraLateral.classList.add('aberto');
            fundoBarraLateral.classList.add('visivel');
        }
    };

    const fecharBarraLateral = () => {
        const barraLateral = document.getElementById('barra-lateral-usuario');
        const fundoBarraLateral = document.getElementById('fundo-barra-lateral');
        if(barraLateral && fundoBarraLateral) {
            barraLateral.classList.remove('aberto');
            fundoBarraLateral.classList.remove('visivel');
        }
    };
    
    const renderizarHospitais = (hospitaisParaRenderizar) => {
        const listaHospitaisDiv = document.getElementById('lista-hospitais');
        if (!listaHospitaisDiv) return;
        
        listaHospitaisDiv.innerHTML = '';

        if (hospitaisParaRenderizar.length === 0) {
            listaHospitaisDiv.innerHTML = `<p class="mensagem-nenhum-resultado">Nenhum hospital encontrado.</p>`;
            return;
        }

        hospitaisParaRenderizar.forEach(hospital => {
            const hospitalItem = document.createElement('div');
            hospitalItem.className = 'item-hospital';
            let statusClasse = hospital.status === 'livre' ? 'status-livre' : hospital.status === 'moderado' ? 'status-moderado' : 'status-lotado';
            hospitalItem.innerHTML = `
                <div class="hospital-status">Disponibilidade: <span class="status-bolinha ${statusClasse}"></span></div>
                <div class="hospital-botoes">
                    <a href="#" class="btn-hospital btn-ver-detalhes" data-hospital-id="${hospital.id}">Ver Detalhes</a>
                    <a href="#" class="btn-hospital">Agendar</a>
                </div>
                <h3 class="hospital-nome">${hospital.nome}</h3>`; 
            listaHospitaisDiv.appendChild(hospitalItem);
        });
    };

    /* Funções de API */
    async function carregarMedicos() {
        const listaMedicosDiv = document.getElementById('lista-medicos');
        if (!listaMedicosDiv) return; 

        const apiUrl = `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/medicos?v=${new Date().getTime()}`;
        try {
            const resposta = await fetch(apiUrl);
            if (!resposta.ok) { throw new Error(`Erro na rede: ${resposta.status}`); }
            const medicos = await resposta.json();
            listaMedicosDiv.innerHTML = ''; 
            medicos.forEach(medico => {
                const medicoCard = document.createElement('div');
                medicoCard.className = 'card-medico';
                medicoCard.innerHTML = `<h3>${medico.nome}</h3><p>${medico.especialidade}</p>`; 
                listaMedicosDiv.appendChild(medicoCard);
            });
        } catch (erro) {
            console.error('Falha ao buscar os dados dos médicos:', erro);
            listaMedicosDiv.innerHTML = '<p>Não foi possível carregar os dados no momento.</p>';
        }
    }

    async function carregarHospitais() {
        const listaHospitaisDiv = document.getElementById('lista-hospitais');
        if (!listaHospitaisDiv) return;

        const apiUrl = `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/hospitais?v=${new Date().getTime()}`;
        try {
            const resposta = await fetch(apiUrl);
            if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
            
            todosHospitais = await resposta.json();
            renderizarHospitais(todosHospitais);
            
        } catch (erro) { 
            console.error('Falha ao buscar os dados dos hospitais:', erro);
            listaHospitaisDiv.innerHTML = '<p>Não foi possível carregar os dados no momento.</p>';
        }
    }
    
    const configurarModalHospital = () => {
        const modal = document.getElementById('modal-hospital');
        if (!modal) return;

        const listaHospitaisDiv = document.getElementById('lista-hospitais');
        const btnFechar = document.getElementById('btn-fechar-modal-hospital');
        const nomeHospital = document.getElementById('modal-hospital-nome');
        const localizacaoHospital = document.getElementById('modal-hospital-localizacao');
        const disponibilidadeHospital = document.getElementById('modal-hospital-disponibilidade');
        const medicosLista = document.getElementById('modal-hospital-medicos');

        const abrirModalComDados = async (hospitalId) => {
            nomeHospital.textContent = 'Carregando...';
            localizacaoHospital.textContent = '';
            disponibilidadeHospital.innerHTML = '';
            medicosLista.innerHTML = '';
            modal.style.display = 'block';

            try {
                const apiUrl = `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/hospitais/${hospitalId}?v=${new Date().getTime()}`;
                const resposta = await fetch(apiUrl);
                if (!resposta.ok) throw new Error('Hospital não encontrado');
                const hospital = await resposta.json();

                nomeHospital.textContent = hospital.nome;
                localizacaoHospital.textContent = hospital.localizacao;
                
                let statusTagClasse = hospital.status === 'livre' ? 'status-livre' : hospital.status === 'moderado' ? 'status-moderado' : 'status-lotado';
                let statusTexto = hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1);
                let statusTag = `<span class="status-tag ${statusTagClasse}">${statusTexto}</span>`;
                disponibilidadeHospital.innerHTML = statusTag;
                
                if(hospital.medicos_atuais && hospital.medicos_atuais.length > 0) {
                    const medicosHtml = hospital.medicos_atuais.map(medico => 
                        `<li>${medico.nome} <span class="especialidade">(${medico.especialidade})</span></li>`
                    ).join('');
                    medicosLista.innerHTML = medicosHtml;
                } else {
                    medicosLista.innerHTML = '<li>Nenhum médico registrado no momento.</li>';
                }
            } catch(erro) {
                nomeHospital.textContent = 'Erro ao carregar detalhes';
                console.error(erro);
            }
        };

        listaHospitaisDiv.addEventListener('click', (event) => {
            if (event.target.matches('.btn-ver-detalhes')) {
                event.preventDefault();
                const id = event.target.getAttribute('data-hospital-id');
                abrirModalComDados(id);
            }
        });

        const fecharModal = () => modal.style.display = 'none';
        btnFechar.addEventListener('click', fecharModal);
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                fecharModal();
            }
        });
    };

    /* Configura a lógica da busca */
    const configurarBusca = () => {
        const campoBusca = document.getElementById('campo-busca-hospitais');
        if (!campoBusca) return;

        campoBusca.addEventListener('input', () => {
            const termoBusca = campoBusca.value.toLowerCase();
            const hospitaisFiltrados = todosHospitais.filter(hospital => 
                hospital.nome.toLowerCase().includes(termoBusca)
            );
            renderizarHospitais(hospitaisFiltrados);
        });
    };

    /*  Lógica do Tema */
    const alternadorTema = document.getElementById('alternador-tema');
    if (alternadorTema) {
        alternadorTema.addEventListener('click', alternarTema);
    }
    aplicarTemaSalvo();

    /* Lógica da Barra Lateral e Carrosel */
    const btnPerfilUsuario = document.getElementById('btn-perfil-usuario');
    const btnFecharBarraLateral = document.getElementById('btn-fechar-barra-lateral');
    const fundoBarraLateral = document.getElementById('fundo-barra-lateral');
    
    if (btnPerfilUsuario) btnPerfilUsuario.addEventListener('click', abrirBarraLateral);
    if (btnFecharBarraLateral) btnFecharBarraLateral.addEventListener('click', fecharBarraLateral);
    if (fundoBarraLateral) fundoBarraLateral.addEventListener('click', fecharBarraLateral);

    if (document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }

    carregarMedicos();
    carregarHospitais();
    configurarModalHospital();
    configurarBusca(); 

});