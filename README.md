# FRONT_END-Trabalho-Final

# Grupo Responsavel
    -Pedro Henrique Mendes de Castro
    -Cristian Afonso
    -Luiz Henrique Pego
    
# Portal Saúde - Salinas, MG

## 1. Propósito do Projeto

O **Portal Saúde** é uma aplicação web front-end desenvolvida como um protótipo funcional para centralizar informações e serviços de saúde na cidade de Salinas, Minas Gerais. O principal objetivo do projeto é criar uma interface amigável e intuitiva que conecte pacientes a informações cruciais sobre a rede de saúde local.

As funcionalidades implementadas demonstram um fluxo completo, incluindo:
* Consulta de Hospitais: Verificação de unidades de saúde disponíveis na cidade, com um sistema de busca em tempo real.
* Visualização do Corpo Clínico: Apresentação dos profissionais de saúde, com detalhes sobre suas especialidades e locais de atendimento.
* Área do Paciente: Um ambiente seguro (simulado) onde o usuário, após o cadastro e login, pode acessar informações pessoais, agenda de consultas e documentos digitalizados.
* Interatividade: Funcionalidades como um chat de suporte (simulado) e um mapa interativo melhoram a experiência do usuário.

Este projeto foi construído utilizando: HTML5, CSS3 e JavaScript 

## 2. APIs e Tecnologias Utilizadas

Para simular um ambiente de back-end и carregar dados dinamicamente, este projeto utiliza uma API de teste. Nenhuma informação real é permanentemente armazenada.

* # My JSON Server
    * **Descrição:** É uma ferramenta online gratuita que cria uma API REST "fake" a partir de um arquivo `db.json` hospedado em um repositório público do GitHub. Foi a tecnologia central para simular a busca de dados de hospitais, médicos, usuários e consultas.
    * **Endpoint Principal:** `https://my-json-server.typicode.com/PedroH1884/FRONT_END-trabalho-final/`
    * **Recursos Utilizados:**
        * `/hospitais`: Para listar e detalhar as unidades de saúde.
        * `/medicos`: Para listar e detalhar os profissionais do corpo clínico.
        * `/usuarios`: Para simular o cadastro e a autenticação de usuários.
        * `/consultas`: Para carregar os agendamentos na agenda do paciente.

* # Swiper.js
    * Descrição: Uma biblioteca JavaScript moderna e de código aberto para a criação de carrosséis (sliders) interativos e responsivos. Foi utilizada na página inicial para exibir banners e campanhas de forma dinâmica.
    * Referência: [https://swiperjs.com/]

* # Font Awesome
    * Descrição: Uma vasta biblioteca de ícones vetoriais que foi utilizada em toda a interface para melhorar a usabilidade e o apelo visual, representando ações como "perfil de usuário", "alternar tema", "enviar mensagem", entre outros.
    * Referência: [https://fontawesome.com/]

# 3. Referências e Inspirações

    * O design e a funcionalidade deste projeto foram inspirados em portais de saúde e sistemas de agendamento modernos.
    * Sites usados: https://developer.mozilla.org/pt-BR/docs/Web - https://www.w3schools.com/
    * IA's Utilizadas: Chat GPT e Google Gemini.
