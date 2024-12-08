# Interface Gráfica - Blogging - React

Este projeto Front-End é uma aplicação web responsiva desenvolvida em React para gerenciar posts. Ela se conecta à [API REST de Posts](https://github.com/andretheodoro/api-post-rest) para criar, editar, listar e excluir publicações, oferecendo funcionalidades como autenticação, autorização e interface amigável.

## Repositório Github

Repositório disponível em:
https://github.com/andretheodoro/api-post-front

## Descrição

Após o sucesso do desenvolvimento da aplicação de blogging dinâmico utilizando a plataforma OutSystems e a implementação do back-end em Node.js, criamos uma interface gráfica robusta, intuitiva e eficiente para esta aplicação. Este desafio focará em desenvolver o front-end, proporcionando uma experiência de usuário excelente tanto para professores(as) quanto para estudantes.

## Objetivo

Desenvolver uma interface gráfica para a aplicação de blogging utilizando React. A aplicação desenvolvida é responsiva, acessível e fácil de usar, permitindo aos docentes e alunos(as) interagir com os diversos endpoints REST já implementados no back-end.

## Arquitetura da Aplicação

**1. React para desenvolver a interface gráfica**

Desenvolvemos o projeto utilizando o React, com uma ampla adoção na indústria e eficiência em criar interfaces gráficas interativas e dinâmicas. O React utiliza o Virtual DOM, que otimiza a renderização da interface ao atualizar apenas os componentes necessários, garantindo melhor desempenho. Além disso, sua estrutura baseada em componentes promove a reutilização de código e facilita a manutenção do projeto, acelerando o desenvolvimento de aplicações modernas e escaláveis.

**2. Utilização de Hooks e Componentes Funcionais**

Os Hooks permitem o gerenciamento eficiente de estados e ciclos de vida em componentes funcionais, que são mais concisos e fáceis de entender em comparação aos componentes de classe. Essa abordagem traz as seguintes vantagens:

- Simplicidade e legibilidade: Os componentes funcionais, combinados com hooks como useState e useEffect, tornam o código mais intuitivo e menos verboso.
- Reutilização de lógica: Hooks personalizados permitem encapsular e reutilizar lógica de estado entre diferentes componentes.
- Modernidade e suporte: Hooks e componentes funcionais são a abordagem recomendada pelas versões mais recentes do React, garantindo compatibilidade e acesso a novos recursos.
A escolha por essa combinação resulta em um código mais limpo, modular e fácil de manter, atendendo às melhores práticas do desenvolvimento frontend.

**3. Componentização**

A aplicação é desenvolvida utilizando o conceito de componente reutilizável, que encapsulam tanto a lógica quanto os estilos de cada parte da interface:

- Header: Um componente fixo usado em todas as páginas com opções de navegação (lista de posts e deslogar do sistema).

**4. Gerenciamento de Estado**

- Autenticação: Implementada com a Context API, que centraliza o controle de login, logout e persistência de tokens usando localStorage.
- Hooks Personalizados: Lógica específica, como manipulação de tokens ou validação, é encapsulada em hooks para reutilização e melhor organização do código.

**5. Navegação SPA**

A navegação entre as páginas é gerenciada pelo React Router, com rotas protegidas (protected routes) para acesso a partes restritas da aplicação, como listagem e criação de posts.

**6. Estilização**

A estilização utiliza styled-components, permitindo que estilos sejam definidos diretamente em arquivos de componentes. Isso resulta em um design responsivo e temas facilmente configuráveis.

**7. Comunicação com a API**

A interação com o back-end é centralizada no arquivo api/index.ts, utilizando o Axios para chamadas HTTP. Todas as requisições passam por esse ponto central, simplificando a manutenção e o rastreamento de erros.

**8. Responsividade**

O layout é responsivo, garantindo uma boa experiência em dispositivos móveis e desktops.

## Tecnologias Utilizadas

- React: Biblioteca para criação de interfaces de usuário, utilizando hooks e componentes funcionais.
- React Router: Para navegação entre páginas.
- Axios: Para consumo da API REST.
- React Icons: Ícones para estilização.
- Styled Components: Para estilização baseada em componentes.
- ESLint: Ferramentas de linting e formatação.
- Context API com Hooks: Para gerenciar autenticação e estado global.

## Estrutura Geral do Projeto

```plaintext
src/
├── api/                 # Configuração e serviços da API (axios)
│   └── api.ts
├── pages/               # Páginas principais da aplicação
|   ├── /Auth            # Páginas responsáveis por validação de autenticação do usuário (professor)
|   ├── /Header          # Página responsável por renderizer o Header (Cabeçalho) padrão em todas as páginas
├── styles/              # Estilos globais e temas
├── api.ts               # Configuração de Axios e chamadas à API
├── App.tsx              # Arquivo principal do aplicativo
├── main.tsx             # Ponto de entrada da aplicação
├── Dockerfile           # Configurações do Docker
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```

## Funcionalidades

- Login e Logout com gerenciamento de autenticação.
- Listagem de posts.
- Leitura de posts.
- Busca de posts por palavra-chave.
- Criação, edição e exclusão de posts.
- Interface responsiva para dispositivos móveis.
- Integração com API REST de Posts.

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto:

**1. Clone o repositório**

   ```bash
   git clone https://github.com/andretheodoro/api-post-front.git
   cd api-post-front
   ```

**2. Instale as dependências**

   ```bash
   npm install
   ```

**3. Execute o projeto**

  ```bash
  npm run build
  ```
   ```bash
   npm run dev
   ```

**4. Acesse o aplicativo no navegador em http://localhost:5173/**

Observação: Para as funcionalidades desse projetos serem executadas corretamente, o projeto de API deve estar executando em paralelo.

**5. Configuração com Docker**

Este projeto está totalmente containerizado utilizando o Docker:

**5.1. Construa uma imagem Docker:**
  ```bash
  docker build -t post-app
  ```

**5.2. Executa a aplicação como um contêiner Docker, disponibilizando-a no endereço http://localhost:5173:**
  ```bash
  docker run -p 5173:5173 post-app
   ```

## Guia de Uso da Aplicação

**1. Login**
- Acesse a página de login.

![image](https://github.com/user-attachments/assets/9c8b3928-1a6e-43b5-9677-f90b2257a57f)

- Caso seja um professor, insira suas credenciais.
- Professores serão redirecionados para a página de gerenciamento de posts. Alunos irão para a página de visualização de posts.

**Professor:**

![image](https://github.com/user-attachments/assets/7a306bd2-0f36-45ef-933d-060612f076c3)

**Aluno:**

![image](https://github.com/user-attachments/assets/5efeebc3-8224-4aa7-b4df-930e2caa8962)

**2. Gerenciamento de Posts**

**Criar Post:** Professores podem criar posts preenchendo o formulário na página de criação.

![image](https://github.com/user-attachments/assets/bc540002-729e-49b9-bfb9-563229d4b009)

**Editar Post:** Professores podem atualizar informações de um post existente, clicando no ícone de lápis na página de lista de posts.

![image](https://github.com/user-attachments/assets/ea453f10-8703-4fb9-90f9-e0c7d3cdbd86)
![image](https://github.com/user-attachments/assets/66bd51f4-359b-4fe7-b435-598de826011f)

**Excluir Post:** Professores podem remover posts irrelevantes, clicando no ícone de lixeira na página de lista de posts.

![image](https://github.com/user-attachments/assets/0a638b98-9c5b-4aca-a0b1-634a1ef66e4c)

**3. Visualizar Posts**

Alunos podem visualizar posts listados com detalhes, basta clicar sobre o card do post desejado.

![image](https://github.com/user-attachments/assets/1f39a823-da9c-4516-9abb-7490652c104e)

**4. Busca Posts por Palavra-Chave**

Alunos e Professores podem filtrar/buscar Posts de acordo com Palavras-Chaves desejadas. A busca será realizada através do título ou conteúdo.
Para caso de Alunos serão filtrados todos os Posts do Banco de Dados, para caso dos Professores serão filtrados apenas os Posts que pertencem ao mesmo.

![image](https://github.com/user-attachments/assets/61b082ea-9273-40cc-a3e5-f54726fd5aae)

## Desafios Enfrentados pela Equipe Durante o Desenvolvimento

O desenvolvimento deste projeto apresentou diversos desafios técnicos e organizacionais. Abaixo, destacamos os principais obstáculos enfrentados e como a equipe lidou com eles:

**1. Responsividade e Design para Dispositivos Móveis**

Desafio: Ajustar o layout da aplicação para proporcionar uma boa experiência em telas pequenas.
Solução: Utilizamos styled-components com media queries para criar estilos responsivos, ajustando margens, paddings, fontes e outros elementos visuais.

**2. Integração com a API de Posts**

Desafio: Lidar com respostas assíncronas da API e exibir mensagens de erro amigáveis ao usuário.
Solução: Utilizamos a biblioteca Axios para consumir a API e implementamos mecanismos de feedback visual para erros, como notificações e validações.
