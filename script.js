document.addEventListener('DOMContentLoaded', () => {
    /*Funções para o Tema (Modo Claro/Escuro)*/
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

    /*Funções de API (Carregar Dados)*/
    async function carregarMedicos() {
        const listaMedicosDiv = document.getElementById('lista-medicos');
        if (!listaMedicosDiv) return; 

        const apiUrl = 'https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/medicos?v=${new Date().getTime()}';
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

        const apiUrl = 'https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/hospitais?v=${new Date().getTime()';
        try {
            const resposta = await fetch(apiUrl);
            if (!resposta.ok) { throw new Error(`Erro na rede: ${resposta.status}`); }
            const hospitais = await resposta.json();
            listaHospitaisDiv.innerHTML = ''; 
            hospitais.forEach(hospital => {
                const hospitalItem = document.createElement('div');
                hospitalItem.className = 'item-hospital';
                let statusClasse = hospital.status === 'livre' ? 'status-livre' : hospital.status === 'moderado' ? 'status-moderado' : 'status-lotado';
                hospitalItem.innerHTML = `
                    <div class="hospital-status">Disponibilidade: <span class="status-bolinha ${statusClasse}"></span></div>
                    <div class="hospital-botoes"><a href="#" class="btn-hospital">Ver Detalhes</a><a href="#" class="btn-hospital">Agendar</a></div>
                    <h3 class="hospital-nome">${hospital.nome}</h3>`; 
                listaHospitaisDiv.appendChild(hospitalItem);
            });
        } catch (erro) {
            console.error('Falha ao buscar os dados dos hospitais:', erro);
            listaHospitaisDiv.innerHTML = '<p>Não foi possível carregar os dados no momento.</p>';
        }
    }

    // EXECUÇÃO E EVENT LISTENERS 

    const alternadorTema = document.getElementById('alternador-tema');
    if (alternadorTema) {
        alternadorTema.addEventListener('click', alternarTema);
    }
    aplicarTemaSalvo();

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

});