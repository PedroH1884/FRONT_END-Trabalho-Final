document.addEventListener('DOMContentLoaded', () => {

    const infoNome = document.getElementById('info-nome');
    const infoEmail = document.getElementById('info-email');
    const infoNascimento = document.getElementById('info-nascimento');
    const formAlterarNome = document.getElementById('form-alterar-nome');
    const formAlterarSenha = document.getElementById('form-alterar-senha');
    const feedbackSenha = document.getElementById('feedback-senha');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    /* Verifica se existe um usuário logado */
    if (usuarioLogado) {
        infoNome.textContent = usuarioLogado.nome;
        infoEmail.textContent = usuarioLogado.email;

        if (usuarioLogado.data_nascimento) {
            const [ano, mes, dia] = usuarioLogado.data_nascimento.split('-');
            infoNascimento.textContent = `${dia}/${mes}/${ano}`;
        } else {
            infoNascimento.textContent = "Não informado";
        }
    } else {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = 'login.html';
        return;
    }

    /* Lógica para o formulário de Alterar Nome */
    formAlterarNome.addEventListener('submit', (event) => {
        event.preventDefault();
        const novoNomeInput = document.getElementById('novo-nome');
        const novoNome = novoNomeInput.value;

        infoNome.textContent = novoNome;
        
        usuarioLogado.nome = novoNome;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        novoNomeInput.value = '';
        alert('Nome alterado com sucesso!');
    });

    /* Lógica para o formulário de Alterar Senha */
    formAlterarSenha.addEventListener('submit', (event) => {
        event.preventDefault();
        const senhaAtualInput = document.getElementById('senha-atual');
        const novaSenhaInput = document.getElementById('nova-senha');
        
        const senhaAtual = senhaAtualInput.value;
        const novaSenha = novaSenhaInput.value;
        
        feedbackSenha.style.display = 'block';

    
        if (senhaAtual === usuarioLogado.senha) {

            usuarioLogado.senha = novaSenha;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            feedbackSenha.textContent = 'Senha alterada com sucesso!';
            feedbackSenha.className = 'feedback-mensagem sucesso';

            senhaAtualInput.value = '';
            novaSenhaInput.value = '';
        } else {
            feedbackSenha.textContent = 'A senha atual está incorreta. Tente novamente.';
            feedbackSenha.className = 'feedback-mensagem erro';
        }
    });
});