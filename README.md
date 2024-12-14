# Interface Gráfica - Blogging - React

Este projeto Front-End é uma aplicação web responsiva desenvolvida em React para gerenciar posts. Ela se conecta à [API REST de Posts](https://github.com/andretheodoro/api-post-rest) para criar, editar, excluir, visualizar e listar publicações, oferecendo funcionalidades como autenticação, busca de post por palavra chave e interface amigável.

## Repositório Github

Repositório disponível em:
https://github.com/andretheodoro/post-app

## Descrição

Após o sucesso do desenvolvimento da aplicação de blogging dinâmico utilizando a plataforma OutSystems e a implementação do back-end em Node.js, criamos uma interface gráfica robusta, intuitiva e eficiente para esta aplicação. Este desafio focará em desenvolver o front-end, proporcionando uma experiência de usuário excelente tanto para professores quanto para estudantes.

## Objetivo

Desenvolver uma interface gráfica para a aplicação de blogging utilizando React. A aplicação deve ser responsiva, acessível e fácil de usar, permitindo aos docentes e alunos interagir com os diversos endpoints REST já implementados no back-end.

## Arquitetura da Aplicação

**1. React para desenvolver a interface gráfica**

Desenvolvemos o projeto utilizando o React, com uma ampla adoção na indústria e eficiência em criar interfaces gráficas interativas e dinâmicas. O React utiliza o Virtual DOM, que otimiza a renderização da interface ao atualizar apenas os componentes necessários, garantindo melhor desempenho. Além disso, sua estrutura baseada em componentes promove a reutilização de código e facilita a manutenção do projeto, acelerando o desenvolvimento de aplicações modernas e escaláveis.

**2. Utilização de Hooks e Componentes Funcionais**

Os Hooks permitem o gerenciamento eficiente de estados e ciclos de vida em componentes funcionais, que são mais concisos e fáceis de entender em comparação aos componentes de classe. Essa abordagem traz as seguintes vantagens:

- **Simplicidade e legibilidade:** Os componentes funcionais, combinados com hooks como useState e useEffect, tornam o código mais intuitivo e menos verboso.
- **Reutilização de lógica:** Hooks personalizados permitem encapsular e reutilizar lógica de estado entre diferentes componentes.
- **Modernidade e suporte:** Hooks e componentes funcionais são a abordagem recomendada pelas versões mais recentes do React, garantindo compatibilidade e acesso a novos recursos.
A escolha por essa combinação resulta em um código mais limpo, modular e fácil de manter, atendendo às melhores práticas do desenvolvimento frontend.

**3. Componentização**

A aplicação é desenvolvida utilizando o conceito de componente reutilizável, que encapsulam tanto a lógica quanto os estilos de cada parte da interface:

- **Header:** Um componente fixo usado em todas as páginas com opções de navegação (lista de posts e deslogar do sistema).

**4. Gerenciamento de Estado**

- **Autenticação:** Implementada com a Context API, que centraliza o controle de login, logout e persistência de tokens usando localStorage.
- **Hooks Personalizados:** Lógica específica, como manipulação de tokens ou validação, é encapsulada em hooks para reutilização e melhor organização do código.

**5. Navegação SPA**

A navegação entre as páginas é gerenciada pelo React Router, com rotas protegidas (protected routes) para acesso a partes restritas da aplicação, como listagem e criação de posts.

**6. Estilização**

A estilização da aplicação utiliza styled-components, permitindo que estilos sejam definidos diretamente em arquivos de componentes. Isso resulta em um design responsivo e temas facilmente configuráveis.

**7. Comunicação com a API**

A interação com o back-end é centralizada no arquivo api/api.ts, utilizando o Axios para chamadas HTTP. Todas as requisições passam por esse ponto central, simplificando a manutenção e o rastreamento de erros.

**8. Responsividade**

O layout é responsivo, garantindo uma boa experiência em dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **React:** Biblioteca para criação de interfaces de usuário, utilizando hooks e componentes funcionais.
- **React Router:** Para navegação entre páginas.
- **Axios:** Para consumo da API REST.
- **React Icons:** Ícones para estilização.
- **Styled Components:** Para estilização baseada em componentes.
- **ESLint:** Ferramentas de linting e formatação.
- **Context API com Hooks:** Para gerenciar autenticação e estado global.
- **Prisma implementado à API:** Utilizado como ORM para facilitar a interação com o banco de dados na implementação do recurso de notas no projeto de posts.

## Modelagem no Prisma

Foi criada uma tabela no banco de dados para armazenar as notas/comentários. O arquivo schema.prisma foi atualizado no projeto Backend da API para refletir essa estrutura.
Necessário adicionar a variável "DATABASE_URL" no arquivo ".env" do projeto da API, informando o diretório do Prisma do projeto e posteriormente executar o comando para execução correta do Prisma:

   ```bash
   npx prisma migrate dev
   ```

**Vantagens do Prisma:**

- **Facilidade no Gerenciamento de Relacionamentos:** O Prisma simplificou a definição e manipulação das relações entre Post e Notas.
- **Redução de Código Boilerplate:** A abstração fornecida pelo Prisma eliminou a necessidade de escrever consultas SQL complexas.
- **Validação Automática:** A tipagem estática do Prisma evitou erros em tempo de execução ao manipular os dados.

## Redux

Para esse projeto utilizamos o Redux para gerenciar o estado da aplicação, ele recebe ordens (ações) e decide como atualizar o estado global, resumidamente:

- O código define um estado global para posts, gerenciado pelo Redux.
- As actions descrevem mudanças no estado e são consumidas pelo postReducer.
- A store unifica os reducers e mantém o estado global acessível à aplicação.
- A estrutura modular facilita a escalabilidade e manutenção do código.

No contexto do projeto de posts, o reducer ajuda a centralizar e controlar toda a lógica de atualização de estado:

- **Adicionar Posts:** Atualiza a lista com um novo post.
- **Excluir Posts:** Remove um post indesejado.
- **Pesquisar Posts:** Refina o estado com base na palavra-chave digitada.
- **Gerenciar Carregamento e Erros:** Atualiza o estado para refletir quando algo está carregando ou se um erro ocorreu.

**Descrição das Ações**

- setPosts: Atualiza a lista de posts.
- setSearchKeyword: Atualiza a palavra-chave para busca.
- setLoading: Atualiza o estado de carregamento (boolean).
- setError: Define uma mensagem de erro (ou null para limpar erros).
- addPost: Adiciona um novo post à lista.
- deletePost: Remove um post pelo seu id.
Essas ações são usadas para modificar o estado global gerenciado pelo Redux.

**Benefícios**

- **Centralização:** Toda a lógica de estado está em um só lugar.
- **Imutabilidade:** Cada atualização cria um novo estado, garantindo consistência.
- **Escalabilidade:** Fica fácil adicionar novos tipos de ações ou alterar a lógica.

## Token / Rotas Protegidas

Implementado no projeto validação de token por tempo pré definido (10 minutos).
A checagem do tempo de inatividade será realizada de forma contínua para cada nova interação do professor e renovando o token se necessário.

Caso o tempo de inatividade seja superior ao definido o professor será deslogado e redirecionado a tela de login.

Além disso, para as seguintes rotas de uso exclusivo do professor foi implementado a utilização de rotas protegidas (ProtectedRoute - verificação de login/token ativo):

- TeacherPostList (Administração de Postagens)
- CreatePost (Criação de Postagens)
- EditPost (Edição de Postagens)

Ao acessar essas páginas e caso acesso não esteja válido, aplicação redirecionará o usuário automaticamente para a tela de login.

## Styled-Components

O Styled-Components é uma biblioteca poderosa para estilização em React, que permite definir estilos diretamente no JavaScript. Essa abordagem encapsula os estilos em cada componente, evitando conflitos globais e promovendo uma manutenção mais simples e eficiente, além de facilitar a reutilização de código.

No projeto de posts, o Styled-Components foi aplicado para criar uma interface bem estruturada e modular. Cada componente foi estilizado de forma isolada, garantindo que os estilos permanecessem organizados e livres de interferências externas. Além disso, a possibilidade de personalizar estilos com base em propriedades trouxe uma flexibilidade significativa, permitindo a criação de componentes dinâmicos e adaptáveis às necessidades da aplicação.

## Axios

No projeto, o Axios foi utilizado para realizar requisições HTTP de forma simples e eficiente, integrando o front-end React com o back-end da aplicação. Ele foi configurado para enviar dados e obter informações dos endpoints da API, garantindo que a comunicação entre o cliente e o servidor fosse feita de forma segura e estruturada.

- **Requisições de Login:**

O Axios foi usado para enviar as credenciais do usuário para o endpoint de login do servidor.
Dependendo da resposta, o token de autenticação é armazenado no localStorage para futuras requisições autenticadas.

- **Envio de Dados:**

O Axios foi utilizado para enviar dados de formulários, como no caso da criação e atualização de posts, através de requisições POST/PUT/DELETE.
Tratamento de Erros:

Respostas de erro, como falhas de autenticação ou dados inválidos, eram tratadas com um bloco try/catch, exibindo mensagens de erro apropriadas para o usuário.

- **Configuração Global:**

Foi configurado um arquivo central (api.ts) para instanciar e exportar o Axios, facilitando a reutilização das configurações e tornando o código mais organizado.

Esse uso do Axios proporcionou uma comunicação eficaz e simplificada com o servidor, com fácil tratamento de erros e suporte a requisições assíncronas.

## Hooks e Componentes Funcionais

No projeto, Hooks e Componentes Funcionais foram amplamente utilizados para promover uma abordagem moderna e eficiente no desenvolvimento da aplicação React. Aqui estão as principais razões e formas de utilização:

**1. Uso de Componentes Funcionais**

**Simplicidade e Legibilidade:** Componentes funcionais são mais simples de escrever e entender em comparação aos componentes de classe, proporcionando uma estrutura de código mais limpa e concisa.

**Facilidade de Manutenção:** Como os componentes funcionais não possuem ciclos de vida complexos, sua manutenção e testes são mais diretos.

**Renderização mais eficiente:** Componentes funcionais ajudam na renderização mais eficiente, já que não possuem a sobrecarga dos métodos de ciclo de vida de componentes de classe.

**2. Uso de Hooks**

**useState:** Foi usado para gerenciar o estado dentro dos componentes funcionais. Por exemplo, no componente de login, os hooks useState controlam o estado dos campos de entrada (username, password) e também a gestão de mensagens de erro (error).

**useEffect:** Utilizado para realizar efeitos colaterais em componentes funcionais, como fazer chamadas à API quando o componente for montado, ou redirecionar o usuário após a autenticação.

**useContext:** Permite o compartilhamento de estado global entre componentes sem a necessidade de passar props manualmente. No projeto, o hook useContext foi utilizado em conjunto com um contexto de autenticação (AuthContext), permitindo que informações como o status de login e o token de autenticação fossem acessíveis em qualquer parte da aplicação.

**3. Vantagens no Projeto**

**Reutilização de Lógica:** Os hooks permitiram encapsular lógica reutilizável, como autenticação e manipulação de formulários, dentro de funções puras, facilitando a modularização e o reaproveitamento do código.

**Gerenciamento de Estado Local e Global:** Os hooks como useState e useEffect ajudaram a gerenciar o estado local do componente, enquanto hooks como useContext ajudaram a gerenciar o estado global de autenticação, mantendo a aplicação simples e eficiente.

**Desempenho:** Com a utilização de hooks, o código tornou-se mais eficiente e com melhor performance, já que hooks como useEffect evitam chamadas desnecessárias a APIs ou atualizações de estado.

## Estrutura Geral do Projeto

```plaintext
src/
├── api/                 # Configuração e serviços da API (axios)
│   └── api.ts
├── pages/               # Páginas principais da aplicação
|   ├── /Auth            # Páginas responsáveis por validação de autenticação do usuário (professor)
|   ├── /Header          # Página responsável por renderizer o Header (Cabeçalho) padrão em todas as páginas
|   ├── /Note            # Página responsável por renderizer a página de notas/comentários
|   ├── /Tooltip         # Página responsável por renderizer tooltip das notas/comentários adicionados nos posts
├── reducers/            # Páginas principais da aplicação
|   ├── /post            # Gerenciador de estado Redux
├── styles/              # Estilos globais e temas
├── api.ts               # Configuração de Axios e chamadas à API
├── App.tsx              # Arquivo principal do aplicativo
├── main.tsx             # Ponto de entrada da aplicação
├── Dockerfile           # Configurações do Docker
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```

## Funcionalidades

- Login e Logout com gerenciamento de autenticação via token.
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
   git clone https://github.com/andretheodoro/post-app.git
   cd post-app
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
- Se as credenciais estejam válidas (usuário/senha), após clique no botão "Entrar como Professor", os professores serão redirecionados para a página de gerenciamento de posts.
- Para caso de alunos, não é necessário informar credenciais, basta clicar no botão "Entrar como Aluno" que será redirecionado para a página de lista de posts.

**Professor:**

![image](https://github.com/user-attachments/assets/7a306bd2-0f36-45ef-933d-060612f076c3)

- Em caso de usuário e/ou senha inválidas, sistem exibirá mensagem de validação e não permitirá o login:

![image](https://github.com/user-attachments/assets/ba9adc7b-4784-47b6-b619-76a6a16fc226)

**Aluno:**

![image](https://github.com/user-attachments/assets/5efeebc3-8224-4aa7-b4df-930e2caa8962)

**2. Gerenciamento de Posts**

**Criar Post:** Professores podem criar posts preenchendo o formulário na página de criação. Para isso, na página de Gerenciamentos de Posts, clique no botão "Criar Novo Post" e o sistema abrirá a página de "Criar Novo Post".
Informe o Título / Autor / Conteúdo do Post desejado e clique em "Criar Post", caso as informações estejam válidas, será armazenado o novo Post do professor no Banco de Dados.

![image](https://github.com/user-attachments/assets/d4d98d4f-c50a-4d91-a210-195eece2839c)
![image](https://github.com/user-attachments/assets/bc540002-729e-49b9-bfb9-563229d4b009)

Caso alguma validação de gravação não seja atendida, sistema apresentará mensagem de aviso ao usuário:

![image](https://github.com/user-attachments/assets/4b2d2e5e-00cd-4181-b5fa-26dae9f7d0c8)

**Editar Post:** Professores podem atualizar informações de um post existente, clicando no botão "Editar" na página de Gerenciamento de Posts, dessa forma, o sistema abrirá a página de "Editar Post".
Ajuste as informações conforme a necessidade e clique em "Salvar Alterações".

![image](https://github.com/user-attachments/assets/ea453f10-8703-4fb9-90f9-e0c7d3cdbd86)
![image](https://github.com/user-attachments/assets/66bd51f4-359b-4fe7-b435-598de826011f)

**Excluir Post:** Professores podem remover posts irrelevantes, clicando no botão "Excluir" na página de Gerenciamento de Posts.

![image](https://github.com/user-attachments/assets/0a638b98-9c5b-4aca-a0b1-634a1ef66e4c)

**3. Visualizar Posts**

Alunos podem visualizar posts listados com detalhes, basta clicar sobre o card do post desejado na página de Lista de Posts.

![image](https://github.com/user-attachments/assets/5fdff4bd-7e86-47a5-864e-6717c5dd2b07)

**4. Busca Posts por Palavra-Chave**

Alunos e Professores podem filtrar/buscar Posts de acordo com Palavras-Chaves desejadas. A busca será realizada através do título ou conteúdo.
Para caso de Alunos serão filtrados todos os Posts do Banco de Dados, para caso dos Professores serão filtrados apenas os Posts que pertencem ao professor logado.

![image](https://github.com/user-attachments/assets/61b082ea-9273-40cc-a3e5-f54726fd5aae)

**5. Adicionar Comentários/Notas em Post**

Para adicionar um comentário/nota em um post, basta clicar no ícone de lápis em amarelo na página de leitura do post.
Após o clique, será aberto uma tela em modal para seleção do(s) trecho(s) desejado(s) para adicionar nota(s) conforme a necessidade do aluno.

![image](https://github.com/user-attachments/assets/cf3816f8-3f12-4c9a-8de4-48f3af3a4d7d)

Selecione o trecho e digite sua nota/comentário desejado e posteriormente clique em "Salvar":

![image](https://github.com/user-attachments/assets/ee6f1f19-0d0e-4020-a58b-861c5ead7d76)

A nota/comentário será adicionado no trecho informado:

![image](https://github.com/user-attachments/assets/cb31c6dd-dc01-4841-96a6-f1b0d9cf9b10)

**6. Cabeçalho (Header)**

Todas as páginas possuem o cabeçalho com dois ícones, o primeiro ícone, ao clicar será redirecionado para a lista de posts.
Caso esteja logado como professor, será aberto a página de Gerenciamento de Posts, caso esteja como aluno, será posicionado na página de Lista de Posts.

![image](https://github.com/user-attachments/assets/42b9256d-4e93-49da-b7d9-724c0e2c9058)

O segundo ícone, desloga o professor e redireciona o usuário para a tela inicial.

![image](https://github.com/user-attachments/assets/36fcdef2-dc31-44ce-9085-bfef2ce81dbb)

## Aplicação Responsiva

Através da utilização de Styled-Components e outras técnicas foi desenvolvida uma aplicação responsiva, conforme segue nas imagens abaixo:

![image](https://github.com/user-attachments/assets/5ec5602a-d90d-4f01-92a8-45a3d32bb57a)
![image](https://github.com/user-attachments/assets/5e744a0a-1861-49d5-9bb8-d0701c218995)
![image](https://github.com/user-attachments/assets/96d46017-80ba-4061-b0b2-29354e7e66ec)
![image](https://github.com/user-attachments/assets/e0dd1614-29fd-42c6-af8a-bed0d0a360d5)
![image](https://github.com/user-attachments/assets/12c195e8-edcb-4b9c-bb65-3d0905989a77)
![image](https://github.com/user-attachments/assets/37117f63-9d57-480d-ba62-15be1fab6609)
![image](https://github.com/user-attachments/assets/007d3f5d-13f7-4896-8511-52a019ab5669)

## Desafios Enfrentados pela Equipe Durante o Desenvolvimento

O desenvolvimento deste projeto apresentou diversos desafios técnicos e organizacionais. Abaixo, destacamos os principais obstáculos enfrentados e como a equipe lidou com eles:

**1. Responsividade e Design para Dispositivos Móveis**

Desafio: Ajustar o layout da aplicação para proporcionar uma boa experiência em telas pequenas.

Solução: Utilizamos styled-components com media queries para criar estilos responsivos, ajustando margens, paddings, fontes e outros elementos visuais.

**2. Integração com a API de Posts**

Desafio: Lidar com respostas assíncronas da API e exibir mensagens de erro amigáveis ao usuário.

Solução: Utilizamos a biblioteca Axios para consumir a API e implementamos mecanismos de feedback visual para erros, como notificações e validações.

## Melhorias futuras

A fim de aprimorar e evoluir o produto, elencamos algumas futuras melhorias que serão realizadas no projeto:

- Separar notas por usuário x posts.
- Ajustar identificação de notas para não permitir "colisão".
- Permitir comentários gerais nos posts.
