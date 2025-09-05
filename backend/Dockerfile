# Imagem base PHP (Debian slim)
FROM php:8.2-cli-bullseye

# Instalar dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    sqlite3 \
    libsqlite3-dev \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensões PHP (uma a uma para evitar falhas)
RUN docker-php-ext-configure zip
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_sqlite
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip
RUN docker-php-ext-install tokenizer
RUN docker-php-ext-install xml
RUN docker-php-ext-install intl

# Instalar Composer (copiando da imagem oficial do Composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar apenas arquivos de dependências primeiro (melhora cache)
COPY composer.json composer.lock ./

# Instalar dependências do Laravel (modo produção)
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copiar o restante do código da aplicação
COPY . .

# Criar usuário não-root para rodar a aplicação
RUN useradd -ms /bin/bash laraveluser && chown -R laraveluser:laraveluser /var/www/html
USER laraveluser

# Expor porta do Laravel
EXPOSE 8000

# Comando padrão para iniciar Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
