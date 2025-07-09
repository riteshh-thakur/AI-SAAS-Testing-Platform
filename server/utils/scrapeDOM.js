// server/utils/scrapeDOM.js
const puppeteer = require('puppeteer');

async function scrapeDOM(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    ignoreHTTPSErrors: true, // Allow invalid SSL
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Retry logic in case of flaky page loads
  let retries = 2;
  let html = '';

  while (retries > 0) {
    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000, // 60s timeout
      });
      html = await page.content();
      break; // ✅ success
    } catch (err) {
      console.warn(`⚠️ Navigation failed, retries left: ${retries - 1}`, err.message);
      retries--;
      if (retries === 0) {
        await browser.close();
        throw new Error(`Failed to scrape DOM for ${url}: ${err.message}`);
      }
    }
  }

  await browser.close();
  return html;
}

module.exports = scrapeDOM;
