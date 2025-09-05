# Imagem base PHP (leve, com suporte a extensões)
FROM php:8.2-cli-alpine

# Instalar dependências do sistema necessárias para extensões PHP
RUN apk add --no-cache \
    unzip \
    git \
    libzip-dev \
    sqlite \
    sqlite-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install \
       pdo \
       pdo_sqlite \
       mbstring \
       zip \
       xml \
       intl

# Instalar Composer (copiando da imagem oficial do Composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar TODO o código da aplicação
COPY . .

# Instalar dependências do Laravel (produção)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Criar usuário não-root para rodar a aplicação
RUN adduser -D laraveluser && chown -R laraveluser:laraveluser /var/www/html
USER laraveluser

# Expor porta do Laravel
EXPOSE 8000

# Comando padrão para iniciar em produção
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
