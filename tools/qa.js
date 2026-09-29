// Visual QA — screenshot the running clone and exercise its overlays.
// Usage: QA_URL=http://localhost:3000/ node tools/qa.js [tag]
// Writes <tag>-1440.png, <tag>-390.png (full page) and <tag>-sticky/-tour/-lightbox/-amenities.png
// into tools/.out/, logging page height and any console errors. Compare with: python tools/diff.py <tag>
const path = require('path');
const { launch, OUT } = require('./config');

const BASE = process.env.QA_URL || 'http://localhost:3000/';

(async () => {
  const tag = process.argv[2] || 'clone';
  const shot = (name) => path.join(OUT, `${tag}-${name}.png`);
  const browser = await launch();
  for (const w of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    // Scroll through once so lazy images load.
    for (let y = 0; y < 8000; y += 700) { await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(80); }
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(600);
    console.log(w, 'height', await page.evaluate(() => document.documentElement.scrollHeight), 'errors', errors);
    await page.screenshot({ path: shot(String(w)), fullPage: true });
    if (w === 1440) {
      await page.evaluate(() => scrollTo({ top: 1500, behavior: 'instant' }));
      await page.waitForTimeout(500);
      await page.screenshot({ path: shot('sticky') });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.getByText('Show all photos').first().click();
      await page.waitForTimeout(700);
      console.log('url after tour open', page.url());
      await page.screenshot({ path: shot('tour') });
      await page.locator('button[aria-label$="image 1"]').last().click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: shot('lightbox') });
      await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
      await page.waitForTimeout(600);
      await page.getByText('Show all 50 amenities').click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: shot('amenities') });
    }
    await page.close();
  }
  await browser.close();
})();
