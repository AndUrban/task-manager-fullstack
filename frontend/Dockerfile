# Etapa 1: Build da aplicação
FROM node:20-slim AS builder

WORKDIR /app

# Instalar dependências do sistema mínimas necessárias
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências primeiro
COPY package*.json ./

# Instalar dependências (usando lockfile)
RUN npm ci

# Copiar o restante do código
COPY . .

# Build do Next.js
RUN npm run build


# Etapa 2: Runtime (leve e otimizado)
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas os arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Criar usuário não-root
RUN useradd -m nextuser && chown -R nextuser /app
USER nextuser

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["npm", "start"]
