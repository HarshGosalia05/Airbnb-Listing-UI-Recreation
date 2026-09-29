// Step 2 — dump each section's outerHTML (images replaced by their extracted file names) to
// tools/.out/sections/, for reading the structure and pulling data such as the photo-tour rooms.
const { open } = require('./lib');
const fs = require('fs');
const path = require('path');
const { OUT } = require('./config');
const manifest = require(path.join(OUT, 'assets-manifest.json'))['src.html'];

const sections = {
  header: 'header._Ugwssa',
  stickynav: 'div._JXzroy',
  title: 'section._DbxOEt',
  gallery: 'section._Zndiww',
  left: 'div._joiPBF',
  aside: 'aside._iJTxKe',
  reviews: 'div._SPYgTj > section:nth-of-type(1)',
  location: 'div._SPYgTj > section:nth-of-type(2)',
  host: 'div._SPYgTj > section:nth-of-type(3)',
  things: 'div._SPYgTj > section:nth-of-type(4)',
  stays: 'div._SPYgTj > section:nth-of-type(5)',
  tour: 'div._KpcKWX',
  lightbox: 'div._zFbfbh',
  amenities: 'div._yBjuYG',
  toast: 'div._HALoyX',
};

(async () => {
  const { browser, page } = await open(1440);
  await page.evaluate((manifest) => {
    document.querySelectorAll('img').forEach((img, i) => {
      img.setAttribute('src', 'IMG:' + (manifest[i].file || 'none'));
      img.removeAttribute('style');
    });
  }, manifest);
  fs.mkdirSync(path.join(OUT, 'sections'), { recursive: true });
  for (const [name, sel] of Object.entries(sections)) {
    let html = await page.evaluate(s => document.querySelector(s)?.outerHTML || 'NOT FOUND', sel);
    html = html.replace(/url\((&quot;|")?data:[^)]{200,}\)/g, 'url(DATA)').replace(/data:[a-z/+]+;base64,[A-Za-z0-9+/=]{200,}/g, 'DATA');
    // Pretty-ish: newline before each opening tag
    html = html.replace(/></g, '>\n<');
    fs.writeFileSync(path.join(OUT, 'sections', `${name}.html`), html);
    console.log(name, html.length);
  }
  await browser.close();
})();
