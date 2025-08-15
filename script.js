document.addEventListener('DOMContentLoaded', () => {

    /* --- INICIALIZAÇÃO DO SWIPER (PAINEL ROTATIVO) --- */
    new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    /* --- LÓGICA PARA O TEMA (MODO CLARO/ESCURO) --- */
    const alternadorTema = document.getElementById('alternador-tema');
    const corpo = document.body;

    const aplicarTemaSalvo = () => {
        const temaSalvo = localStorage.getItem('theme');
        if (temaSalvo === 'dark') {
            corpo.classList.add('modo-escuro');
        } else {
            corpo.classList.remove('modo-escuro');
        }
    };

    const alternarTema = () => {
        corpo.classList.toggle('modo-escuro');
        if (corpo.classList.contains('modo-escuro')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    alternadorTema.addEventListener('click', alternarTema);
    aplicarTemaSalvo();

    /* --- LÓGICA PARA A BARRA LATERAL DO USUÁRIO --- */
    const btnPerfilUsuario = document.getElementById('btn-perfil-usuario');
    const barraLateral = document.getElementById('barra-lateral-usuario');
    const btnFecharBarraLateral = document.getElementById('btn-fechar-barra-lateral');
    const fundoBarraLateral = document.getElementById('fundo-barra-lateral');

    const abrirBarraLateral = () => {
        barraLateral.classList.add('aberto');
        fundoBarraLateral.classList.add('visivel');
    };

    const fecharBarraLateral = () => {
        barraLateral.classList.remove('aberto');
        fundoBarraLateral.classList.remove('visivel');
    };

    btnPerfilUsuario.addEventListener('click', abrirBarraLateral);
    btnFecharBarraLateral.addEventListener('click', fecharBarraLateral);
    fundoBarraLateral.addEventListener('click', fecharBarraLateral);

    /* --- LÓGICA PARA CARREGAR DADOS DA FAKE API --- */
    async function carregarMedicos() {
        const listaMedicosDiv = document.getElementById('lista-medicos');
        
        // ===============================================================================
        // IMPORTANTE: Lembre-se de usar a URL da sua API aqui
        // ===============================================================================
        const apiUrl = 'https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/medicos?v=${new Date().getTime()}';

        try {
            const resposta = await fetch(apiUrl);
            if (!resposta.ok) { throw new Error(`Erro na rede: ${resposta.status}`); }
            const medicos = await resposta.json();

            listaMedicosDiv.innerHTML = ''; 

            // Laço corrigido para usar os campos corretos (nome, especialidade)
            medicos.forEach(medico => {
                const medicoCard = document.createElement('div');
                medicoCard.className = 'card-medico';
                medicoCard.innerHTML = `
                    <h3>${medico.nome}</h3>
                    <p>${medico.especialidade}</p>
                `; 
                listaMedicosDiv.appendChild(medicoCard);
            });

        } catch (erro) {
            console.error('Falha ao buscar os dados:', erro);
            listaMedicosDiv.innerHTML = '<p>Não foi possível carregar os dados no momento. Tente novamente mais tarde.</p>';
        }
    }

    carregarMedicos();

});