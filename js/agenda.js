document.addEventListener('DOMContentLoaded', () => {
    let dataAtual = new Date(2025, 7, 1);
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const diasComConsulta = ["2025-08-25", "2025-08-28", "2025-09-10"];

    const mesAnoEl = document.getElementById('mes-ano-atual');
    const calendarioGridEl = document.getElementById('calendario-grid');

    const renderizarCalendario = () => {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        mesAnoEl.textContent = `${meses[mes]} ${ano}`;
        calendarioGridEl.innerHTML = '';

        const primeiroDiaMes = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        for (let i = 0; i < primeiroDiaMes; i++) calendarioGridEl.innerHTML += `<div class="dia"></div>`;

        for (let i = 1; i <= diasNoMes; i++) {
            const dataCompleta = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const diaEl = document.createElement('div');
            diaEl.className = 'dia mes-atual';
            diaEl.textContent = i;
            
            if (diasComConsulta.includes(dataCompleta)) {
                diaEl.classList.add('com-consulta');
            }
            if (dataCompleta === "2025-08-25") {
                diaEl.classList.add('selecionado');
            }
            
            calendarioGridEl.appendChild(diaEl);
        }
    };

    document.getElementById('mes-anterior').addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();
    });

    document.getElementById('mes-seguinte').addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();
    });
    
    renderizarCalendario();
});