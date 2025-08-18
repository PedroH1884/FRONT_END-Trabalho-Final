document.addEventListener('DOMContentLoaded', () => {
    let todosHospitais = [];

    /* Funções para o Tema (Modo Claro/Escuro) */
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
    /* Interface de Login e Cadastro */ 
    const atualizarInterfaceUsuario = () => {
        const btnAbrirLogin = document.getElementById('btn-abrir-login');
        const btnPerfilUsuario = document.getElementById('btn-perfil-usuario');
        const barraLateral = document.getElementById('barra-lateral-usuario');
        
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        if (usuarioLogado) {
            if(btnAbrirLogin) btnAbrirLogin.style.display = 'none';
            if(btnPerfilUsuario) btnPerfilUsuario.style.display = 'block';
            
            if(barraLateral) {
                barraLateral.querySelector('.info-perfil h4').textContent = usuarioLogado.nome;
                barraLateral.querySelector('.info-perfil p').textContent = usuarioLogado.email;
            }
        } else {
            if(btnAbrirLogin) btnAbrirLogin.style.display = 'block';
            if(btnPerfilUsuario) btnPerfilUsuario.style.display = 'none';
        }
    };

    const configurarLogout = () => {
        const btnSair = document.querySelector('.btn-sair');
        if(btnSair) {
            btnSair.addEventListener('click', () => {
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'index.html';
            });
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
    
    /* Função para renderizar a lista de hospitais na tela */
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
    /* Função Carregar Consultas */
    async function carregarConsultas() {
    try {
        const resposta = await fetch("https://my-json-server.typicode.com/CristianAfonsoD/TrabalhoFinal/consultas");
        const consultas = await resposta.json();

        const tbody = document.querySelector("#tabela-consultas tbody");
        tbody.innerHTML = ""; 

        consultas.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.time}</td>
                <td>${c.dataNascimento}</td>
                <td>${c.date}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (erro) {
        console.error("Erro ao carregar consultas:", erro);
    }
}

    /* Funções de Carregar Dados */
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
                medicoCard.innerHTML = `
                    <img src="${medico.foto_url}" alt="Foto de ${medico.nome}" class="card-medico-foto">
                    <h3>${medico.nome}</h3>
                    <p class="especialidade-principal">${medico.especialidades[0]}</p>
                    <button class="btn-detalhes-medico" data-medico-id="${medico.id}">Detalhes</button>
                `; 
                listaMedicosDiv.appendChild(medicoCard);
            });
        } catch (erro) { 
            console.error('Falha ao buscar os dados dos médicos:', erro);
            listaMedicosDiv.innerHTML = '<p>Não foi possível carregar os dados dos médicos no momento.</p>';
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
    
    /* Funções para os Modais */
    const configurarModalMedico = () => {
        const modal = document.getElementById('modal-medico');
        if (!modal) return;

        const listaMedicosDiv = document.getElementById('lista-medicos');
        const btnFechar = document.getElementById('btn-fechar-modal-medico');
        const fotoEl = document.getElementById('modal-medico-foto');
        const nomeEl = document.getElementById('modal-medico-nome');
        const hospitalEl = document.getElementById('modal-medico-hospital');
        const horariosEl = document.getElementById('modal-medico-horarios');
        const especialidadesEl = document.getElementById('modal-medico-especialidades');

        const abrirModalComDados = async (medicoId) => {
            nomeEl.textContent = 'Carregando...';
            modal.style.display = 'block';

            try {
                const apiUrl = `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/medicos/${medicoId}?v=${new Date().getTime()}`;
                const resposta = await fetch(apiUrl);
                if (!resposta.ok) throw new Error('Médico não encontrado');
                const medico = await resposta.json();

                fotoEl.src = medico.foto_url;
                nomeEl.textContent = medico.nome;
                hospitalEl.textContent = medico.hospital_nome;
                horariosEl.textContent = medico.horarios;

                const especialidadesHtml = medico.especialidades.map(esp => `<li>${esp}</li>`).join('');
                especialidadesEl.innerHTML = especialidadesHtml;

            } catch(erro) {
                nomeEl.textContent = 'Erro ao carregar detalhes';
                console.error(erro);
            }
        };

        listaMedicosDiv.addEventListener('click', (event) => {
            if (event.target.matches('.btn-detalhes-medico')) {
                const id = event.target.getAttribute('data-medico-id');
                abrirModalComDados(id);
            }
        });

        const fecharModal = () => modal.style.display = 'none';
        btnFechar.addEventListener('click', fecharModal);
        window.addEventListener('click', (event) => {
            if (event.target == modal) fecharModal();
        });
    };
    
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
            if (event.target == modal) fecharModal();
        });
    };

    /* Função para configurar a lógica da busca */
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

    /* Lógica do Tema */
    const alternadorTema = document.getElementById('alternador-tema');
    if (alternadorTema) {
        alternadorTema.addEventListener('click', alternarTema);
    }
    aplicarTemaSalvo();

    /* Lógica da Barra Lateral */
    const btnPerfilUsuario = document.getElementById('btn-perfil-usuario');
    const btnFecharBarraLateral = document.getElementById('btn-fechar-barra-lateral');
    const fundoBarraLateral = document.getElementById('fundo-barra-lateral');
    
    if (btnPerfilUsuario) btnPerfilUsuario.addEventListener('click', abrirBarraLateral);
    if (btnFecharBarraLateral) btnFecharBarraLateral.addEventListener('click', fecharBarraLateral);
    if (fundoBarraLateral) fundoBarraLateral.addEventListener('click', fecharBarraLateral);

    /* Lógica do Carrossel */
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
    configurarModalMedico();
    configurarModalHospital();
    configurarBusca(); 
    carregarConsultas();
    atualizarInterfaceUsuario();
    configurarLogout();
});