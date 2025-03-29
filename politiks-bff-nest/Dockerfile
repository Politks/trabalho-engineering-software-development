# Estágio de build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências com --legacy-peer-deps para resolver conflitos
RUN npm ci --legacy-peer-deps

# Copiar código fonte
COPY src/ ./src/

# Compilar o aplicativo
RUN npm run build

# Estágio de produção
FROM node:18-alpine
WORKDIR /app

# Copiar apenas os arquivos necessários para produção
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules/ ./node_modules/

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
