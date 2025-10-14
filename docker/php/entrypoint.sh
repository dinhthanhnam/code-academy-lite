sh /var/www/wait-for-db.sh

php artisan reverb:start --host=0.0.0.0 --port=8080 &

php-fpm -F

