# Chạy cái này để build Next app thì mượt hơn
docker compose run --rm web npm run build

# Build trước
docker compose build

# Cài phụ thuộc
docker compose run --rm php composer install

# Seed dữ liệu
docker compose run --rm php php artisan migrate:fresh --seed

# Cấp quyền đầy đủ

docker compose run --rm php sh

rm -f storage/logs/laravel.log

chown -R www-data:www-data storage bootstrap/cache

chmod -R 775 storage bootstrap/cache

# Một số lệnh php có theer dùng ến
docker compose run --rm php php artisan cache:clear

# Cài phụ thuộc
docker compose run --rm web npm install



