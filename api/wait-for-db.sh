#!/bin/sh
# wait-for-db.sh
until nc -z db 3306; do
  echo "Waiting for db..."
  sleep 1
done
