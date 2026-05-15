require('dotenv').config();
const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'http://localhost:3000/webapp';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://kun.uz';
const PORT = process.env.PORT || 3000;
const isHttpsWebsite = WEBSITE_URL.startsWith('https://');

if (!BOT_TOKEN) {
  console.error('Error: BOT_TOKEN is required in .env');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();
const isHttpsWebApp = WEBAPP_URL.startsWith('https://');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EcoIDbot Mini App</title>
</head>
<body>
  <h1>EcoIDbot Web App</h1>
  <p>Mini app uchun sahifa: <a href="/webapp">Web App</a></p>
</body>
</html>`);
});

app.get('/webapp', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EcoIDbot Mini App</title>
</head>
<body>
  <div id="app"></div>
  <script>window.WEBSITE_URL = '${WEBSITE_URL}';</script>
  <script src="/webapp.js"></script>
</body>
</html>`);
});

bot.start((ctx) => {
  if (isHttpsWebsite) {
    ctx.reply('🌐 Mini App Ochish', Markup.inlineKeyboard([
      [Markup.button.url('🌐 Mini App Ochish', WEBSITE_URL)]
    ]));
  } else {
    ctx.replyWithHTML(`<a href="${WEBSITE_URL}">🌐 Mini App Ochish</a>`);
  }
});

bot.command('app', (ctx) => {
  if (isHttpsWebsite) {
    ctx.reply('🌐 Mini App Ochish', Markup.inlineKeyboard([
      [Markup.button.url('🌐 Mini App Ochish', WEBSITE_URL)]
    ]));
  } else {
    ctx.replyWithHTML(`<a href="${WEBSITE_URL}">🌐 Mini App Ochish</a>`);
  }
});

bot.command('link', (ctx) => {
  ctx.replyWithHTML(`Sayt havolasi: <a href="${WEBSITE_URL}">${WEBSITE_URL}</a>`);
});

bot.on('message', async (ctx) => {
  if (ctx.message && ctx.message.web_app_data) {
    const data = ctx.message.web_app_data.data;
    await ctx.reply(`Web Appdan ma'lumot olindi: ${data}`);
    return;
  }

  if (ctx.message.text) {
    await ctx.reply('Bot bilan ishlash uchun /start yoki /app buyrug‘ini yuboring.');
  }
});

bot.catch((err) => {
  console.error('Bot error', err);
});

app.listen(PORT, async () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
  try {
    await bot.launch();
    console.log('Telegram bot started');
  } catch (err) {
    console.error('Bot launch failed:', err);
  }
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
