# Etapa 1: Build da aplicação
FROM node:20-slim AS builder

WORKDIR /app

# Copiar arquivos de dependências primeiro (cache eficiente)
COPY package*.json ./

# Instalar dependências usando lockfile (mais seguro e rápido)
RUN npm ci

# Copiar o restante do código
COPY . .

# Build do Next.js em modo produção
RUN npm run build


# Etapa 2: Runtime (leve e otimizado)
FROM node:20-slim

WORKDIR /app

# Definir ambiente como produção
ENV NODE_ENV=production

# Instalar apenas "dumb-init" para gerenciamento de processos
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas arquivos necessários do build
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/public ./public 
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/next.config.js ./next.config.js 

# Criar usuário não-root para segurança
RUN useradd -m nextuser && chown -R nextuser /app
USER nextuser

# Expor porta do Next.js
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

# Rodar Next.js em produção
CMD ["npm", "start"]
