docker compose up

docker compose run --rm php composer install

docker compose run --rm php php artisan migrate:fresh --seed

docker compose run --rm web npm install

# Chạy cái này thì build app load nhanh hơn
docker compose run --rm web npm run build

docker compose run --rm php tail -n 50 storage/logs/laravel.log