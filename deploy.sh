rm package-lock.json

git pull https://thefirst1hunter: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@github.com/thefirst1hunter/menu.git dev

npm i

npx prisma migrate dev

npm run build

pm2 reload LS-dev