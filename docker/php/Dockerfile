FROM php:8.2-fpm

# Cài extension cần thiết
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    git \
    unzip \
    zip \
    && docker-php-ext-install pdo pdo_mysql pcntl

WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

CMD ["sh", "/usr/local/bin/entrypoint.sh"]
