rm package-lock.json

git pull https://thefirst1hunter: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@github.com/thefirst1hunter/loyalty-system.git dev

npm i

npx prisma migrate dev

npm run build

pm2 reload LS-dev