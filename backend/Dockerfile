# Imagem base PHP (leve e com suporte a extensões)
FROM php:8.2-cli-alpine

# Instalar dependências necessárias (sem compilar do zero)
RUN apk add --no-cache \
    unzip \
    git \
    libzip-dev \
    sqlite \
    oniguruma-dev \
    php82-pdo_sqlite

# Instalar Composer (copiando da imagem oficial do Composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar apenas arquivos de dependências primeiro (melhor cache)
COPY composer.json composer.lock ./

# Instalar dependências do Laravel (modo produção)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copiar o restante do código da aplicação
COPY . .

# Criar usuário não-root para rodar a aplicação
RUN adduser -D laraveluser && chown -R laraveluser:laraveluser /var/www/html
USER laraveluser

# Expor porta do Laravel
EXPOSE 8000

# Comando padrão para iniciar em produção
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
