#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/set-env.sh
npm install -g dotenv-cli

docker compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

dotenv -e .env.test -- npx prisma migrate dev --name init

npm run test:e2e