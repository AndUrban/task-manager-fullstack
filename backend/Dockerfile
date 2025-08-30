# Imagem base PHP (leve e com suporte a extensões)
FROM php:8.2-cli-alpine

# Instalar dependências do sistema necessárias para SQLite e Composer
RUN apk add --no-cache \
    unzip \
    git \
    libzip-dev \
    sqlite \
    sqlite-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Instalar Composer (copiando da imagem oficial do Composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar somente os arquivos de dependências primeiro (para otimizar cache)
COPY composer.json composer.lock ./

# Instalar dependências do Laravel
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copiar o restante do código
COPY . .

# Criar usuário não-root para rodar a aplicação
RUN adduser -D laraveluser && chown -R laraveluser:laraveluser /var/www/html
USER laraveluser

# Expor a porta do Laravel
EXPOSE 8000

# Comando para iniciar o servidor Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
