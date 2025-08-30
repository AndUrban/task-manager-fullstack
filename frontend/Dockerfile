# Etapa 1: Build da aplicação
FROM node:20-slim AS builder

WORKDIR /app

# Instalar dependências do sistema mínimas necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências primeiro (cache eficiente)
COPY package*.json ./

# Instalar todas as dependências (incluindo dev, necessárias para o build)
RUN npm install

# Copiar o restante do código
COPY . .

# Build do Next.js
RUN npm run build


# Etapa 2: Executar apenas a versão otimizada
FROM node:20-slim

WORKDIR /app

# Instalar dumb-init (para gerenciar processos)
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas arquivos necessários da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Criar usuário não-root
RUN useradd -m nextuser && chown -R nextuser /app
USER nextuser

# Expor porta Next.js
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

# Iniciar aplicação em modo produção
CMD ["npm", "start"]
