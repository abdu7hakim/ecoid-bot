const app = document.getElementById('app');
const WEBSITE_URL = window.WEBSITE_URL || 'https://example.com';
const tg = window.Telegram ? window.Telegram.WebApp : null;

if (tg) {
  tg.expand();
}

if (app) {
  app.innerHTML = `
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; margin: 0; background: #f7f7f7; }
      .container { max-width: 520px; margin: 40px auto; background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
      input, button { font-size: 16px; padding: 12px 14px; margin: 12px 0; width: 100%; box-sizing: border-box; }
      button { cursor: pointer; border: none; color: #fff; background: #1d9bf0; border-radius: 8px; }
      button.secondary { background: #5f6368; }
      a { color: #1d9bf0; }
    </style>
    <div class="container">
      <h1>EcoIDbot Mini App</h1>
      <p>Mini app ishga tushdi. Quyidagi tugma orqali saytingizga o‘tishingiz mumkin.</p>
      <button id="open-website">Saytga o‘tish</button>
      <button id="close" class="secondary">Yopish</button>
      <p id="status"></p>
    </div>
  `;
}

const status = document.getElementById('status');
const openWebsite = document.getElementById('open-website');
const closeButton = document.getElementById('close');

if (openWebsite) {
  openWebsite.addEventListener('click', () => {
    if (WEBSITE_URL) {
      window.location.href = WEBSITE_URL;
    } else if (status) {
      status.textContent = 'Website URL topilmadi.';
    }
  });
}

if (closeButton) {
  closeButton.addEventListener('click', () => {
    if (tg) tg.close();
  });
}

if (!tg && status) {
  status.textContent = 'Telegram Web App muhitida oching. Agar siz brauzerda bo‘lsangiz, saytga o‘tkazish tugmasi ishlaydi.';
}
