rm package-lock.json

git pull https://thefirst1hunter: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@github.com/thefirst1hunter/loyalty-system.git dev

npm i

npx prisma migrate dev

npm run build

pm2 reload LS-dev