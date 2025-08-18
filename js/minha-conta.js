document.addEventListener('DOMContentLoaded', () => {
    const infoNome = document.getElementById('info-nome');
    const infoEmail = document.getElementById('info-email');
    const formAlterarNome = document.getElementById('form-alterar-nome');
    const formAlterarSenha = document.getElementById('form-alterar-senha');
    const feedbackSenha = document.getElementById('feedback-senha');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        infoNome.textContent = usuarioLogado.nome;
        infoEmail.textContent = usuarioLogado.email;
    } else {
        window.location.href = 'login.html';
    }
    formAlterarNome.addEventListener('submit', (event) => {
        event.preventDefault();
        const novoNome = document.getElementById('novo-nome').value;

        infoNome.textContent = novoNome;
        
        usuarioLogado.nome = novoNome;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        alert('Nome alterado com sucesso!');
    });

    formAlterarSenha.addEventListener('submit', (event) => {
        event.preventDefault();
        const senhaAtual = document.getElementById('senha-atual').value;
        const novaSenha = document.getElementById('nova-senha').value;
        
        feedbackSenha.style.display = 'block';

        if (senhaAtual === usuarioLogado.senha) {
            feedbackSenha.textContent = 'Senha alterada com sucesso!';
            feedbackSenha.className = 'feedback-mensagem sucesso';

            usuarioLogado.senha = novaSenha;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        } else {
            feedbackSenha.textContent = 'A senha atual está incorreta.';
            feedbackSenha.className = 'feedback-mensagem erro';
        }
    });
});