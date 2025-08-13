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

});