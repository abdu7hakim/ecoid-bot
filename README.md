# EcoIDbot

Node.js bilan Telegram bot va mini app (Web App) loyihasi.

## O'rnatish

1. `cd /Users/avazbek/Desktop/EcoIDbot`
2. `npm install`
3. `.env` faylini yarating va `BOT_TOKEN` qiymatini kiriting.
4. `WEBAPP_URL` ga sizning mini app joylashgan sayt / webapp yo‘lini kiriting.
5. `WEBSITE_URL` ga mini app ichida ochiladigan sayt manzilini kiriting.
6. Agar Web App Telegram ichida ishlashini xohlasangiz, sayt HTTPS bo‘lishi kerak.

## `.env` namuna

```
BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ
WEBAPP_URL=https://yourdomain.com/webapp
PORT=3000
```

## Ishga tushirish

`npm start`

## Foydalanish

- Telegram botga `/start` yuboring.
- `Open Mini App` tugmasini bosing.
- Mini app sahifasida xabar yozing va yuboring.

Mini app JS kodi: `public/webapp.js`

> Eslatma: Telegram Web App ishlashi uchun botni HTTPS domen bilan ro‘yxatdan o‘tkazish kerak bo‘ladi.
# ecoid-bot
