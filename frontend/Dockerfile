# ==========================
# Etapa 1: Build do frontend
# ==========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar apenas o package.json e lock para cache eficiente
COPY package*.json ./

# Instalar TODAS as dependências (incluindo dev)
# Mantém compatibilidade com Styled Components + PostCSS
RUN npm install --legacy-peer-deps

# Copiar o restante do código da aplicação
COPY . .

# Garantir presença dos pacotes de pipeline CSS (caso ausentes)
RUN npm install --save-dev postcss postcss-loader css-loader autoprefixer --legacy-peer-deps

# Habilitar modo produção e gerar build
ENV NODE_ENV=production
RUN npm run build

# ==========================
# Etapa 2: Runner (produção)
# ==========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar apenas os artefatos necessários do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Iniciar o servidor Next.js em modo standalone de produção
CMD ["npm", "start"]
