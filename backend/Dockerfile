# Etapa 1: Build (instalar dependências com Composer)
FROM composer:2 AS vendor

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Etapa 2: Runtime (imagem final mais leve)
FROM php:8.2-cli-alpine

# Instalar dependências mínimas do sistema
RUN apk add --no-cache \
    sqlite \
    oniguruma-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Criar usuário não-root
RUN adduser -D laraveluser

WORKDIR /var/www/html

# Copiar dependências já prontas
COPY --from=vendor /app/vendor ./vendor

# Copiar o restante do código
COPY . .

USER laraveluser

EXPOSE 8000

ENTRYPOINT ["php", "artisan"]
CMD ["serve", "--host=0.0.0.0", "--port=8000"]
