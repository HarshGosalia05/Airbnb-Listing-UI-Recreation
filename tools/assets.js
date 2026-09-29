// Step 1 — extract every image embedded in the two SingleFile captures into public/images/listing/.
// SingleFile swaps lazy <img> sources for tiny SVG placeholders and keeps the real bitmap as a CSS
// background-image, so each <img> is resolved to whichever of the two holds real data.
// Files are named by content hash (deduplicated); a manifest maps DOM order -> file for later steps.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { launch, captureUrl, CAPTURE_MAIN, CAPTURE_TOUR, IMAGES_DIR: IMAGES, OUT } = require('./config');

const isPlaceholder = s => /^data:image\/svg\+xml,<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="\d+" height="\d+"><\/svg>$/.test(s) || /^data:image\/svg\+xml,%3Csvg/.test(s) && s.length < 200;

(async () => {
  const browser = await launch();
  fs.rmSync(IMAGES, { recursive: true, force: true });
  fs.mkdirSync(IMAGES, { recursive: true });
  const seen = new Map();
  const all = {};
  for (const [file, capture] of [['src.html', CAPTURE_MAIN], ['tour.html', CAPTURE_TOUR]]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(captureUrl(capture), { waitUntil: 'load', timeout: 120000 });
    const items = await page.evaluate(() => {
      const chain = el => { const parts = []; let p = el; while (p && p !== document.body) { parts.unshift(p.tagName.toLowerCase() + (typeof p.className === 'string' && p.className ? '.' + p.className.split(' ')[0] : '')); p = p.parentElement; } return parts.slice(-6).join('>'); };
      return [...document.querySelectorAll('img')].map((img, i) => {
        const bg = getComputedStyle(img).backgroundImage;
        const bgUrl = bg && bg.includes('url(') ? bg.slice(bg.indexOf('url(') + 5, bg.lastIndexOf('"')) : null;
        return { i, src: img.getAttribute('src') || '', bg: bgUrl, alt: img.alt, chain: chain(img) };
      });
    });
    await page.close();
    all[file] = items.map(it => {
      let data = it.src;
      if (isPlaceholder(data) || data.startsWith('data:image/svg+xml') && data.length < 400) data = it.bg || data;
      const m = /^data:([^;,]+)(;base64)?,(.*)$/s.exec(data || '');
      if (!m) return { ...it, src: undefined, bg: undefined, file: null };
      const buf = m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3]));
      const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
      const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/svg+xml': 'svg', 'image/webp': 'webp' }[m[1]] || 'bin';
      const placeholder = ext === 'svg' && buf.length < 400;
      let f = seen.get(hash);
      if (!f && !placeholder) { f = `${hash}.${ext}`; fs.writeFileSync(path.join(IMAGES, f), buf); seen.set(hash, f); }
      return { i: it.i, alt: it.alt, chain: it.chain, file: placeholder ? 'PLACEHOLDER' : f, bytes: buf.length };
    });
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'assets-manifest.json'), JSON.stringify(all, null, 1));
  for (const [f, items] of Object.entries(all)) {
    console.log('==', f);
    for (const x of items) console.log(x.i, x.file, x.bytes, JSON.stringify(x.alt), x.chain);
  }
  console.log('unique', seen.size);
})();
