# Etapa 1: Build do frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifestos primeiro (para cache eficiente)
COPY package*.json ./

# Configurar registry oficial e instalar dependências
RUN npm config set registry https://registry.npmjs.org/ \
    && npm install --legacy-peer-deps

# Copiar o restante do código
COPY . .

# Build de produção (gera .next, dist, etc)
RUN npm run build

# Etapa 2: Imagem final para servir o frontend
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar apenas o necessário da etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Definir variáveis de ambiente de produção
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Rodar Next.js no modo standalone
CMD ["npm", "start"]
