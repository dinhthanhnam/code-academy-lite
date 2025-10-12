#!/bin/bash

if [ ! -d "vendor" || ! -f "vendor/autoload.php" ]; then
  echo "No vendor/ folder found. Running composer install..."
  composer install --no-progress --no-interaction --prefer-dist --no-dev || exit 1
fi

php-fpm -D
php artisan migrate:fresh --seed
# php artisan install:broadcasting --no-interaction
# php artisan reverb:start

nginx -g "daemon off;"