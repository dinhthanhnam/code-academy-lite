## Build trước
docker compose build

# Cài phụ thuộc
docker compose run --rm php composer install

# Seed dữ liệu
docker compose run --rm php php artisan migrate:fresh --seed

# Cài phụ thuộc
docker compose run --rm web npm install

# Chạy cái này để build Next app thì mượt hơn
docker compose run --rm web npm run build


docker compose run --rm php tail -n 50 storage/logs/laravel.log