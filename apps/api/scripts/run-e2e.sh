#!/usr/bin/env bash

npm install dotenv-cli

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/set-env.sh

docker compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

npx dotenv -e .env.test -- npx prisma migrate dev --name init
npx prisma generate
npm run test:e2e