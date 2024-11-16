# Etapa 1: Construção da aplicação React
FROM node:16 AS build

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalando as dependências da aplicação
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# Criando a versão de produção da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com o servidor Node.js (sem Nginx)
FROM node:16

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Instalando o http-server (um servidor simples para servir os arquivos estáticos)
RUN npm install -g http-server

# Copiando a pasta 'dist' gerada na etapa anterior
COPY --from=build /app/dist /app/dist

# Expondo a porta onde o http-server irá rodar
EXPOSE 5173

# Comando para iniciar o servidor http-server e servir a aplicação
CMD ["http-server", "/app/dist", "-p", "5173"]
