document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/usuarios?v=${new Date().getTime()}`;
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        const erroDiv = document.getElementById('login-erro');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            erroDiv.style.display = 'none';

            try {
                const resposta = await fetch(apiUrl);
                if (!resposta.ok) throw new Error('Falha ao conectar com o servidor.');
                
                const usuarios = await resposta.json();
                const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

                if (usuarioEncontrado) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
                    window.location.href = '../index.html';
                } else {
                    erroDiv.textContent = 'Email ou senha incorretos.';
                    erroDiv.style.display = 'block';
                }
            } catch (error) {
                erroDiv.textContent = error.message;
                erroDiv.style.display = 'block';
            }
        });
    }

    const cadastroForm = document.getElementById('cadastro-form');

    if (cadastroForm) {
        const erroDiv = document.getElementById('cadastro-erro');
        const sucessoDiv = document.getElementById('cadastro-sucesso');

        cadastroForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const nome = document.getElementById('cadastro-nome').value;
            const email = document.getElementById('cadastro-email').value;
            const senha = document.getElementById('cadastro-senha').value;

            erroDiv.style.display = 'none';
            sucessoDiv.style.display = 'none';

            try {
                const resposta = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({ nome, email, senha }),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                });

                if (!resposta.ok) throw new Error('Não foi possível completar o cadastro.');

                sucessoDiv.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                sucessoDiv.style.display = 'block';

                setTimeout(() => { window.location.href = 'login.html'; }, 2000);

            } catch (error) {
                erroDiv.textContent = error.message;
                erroDiv.style.display = 'block';
            }
        });
    }
});