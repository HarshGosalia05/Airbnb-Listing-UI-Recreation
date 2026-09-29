// Step 5 — per-component extraction for the spec files: verbatim markup, the list of classes used,
// and a box-size outline at 1440 and 390 (overlays forced visible so they can be measured).
// Output: tools/.out/comps.json, consumed by gen_specs.py.
const { open } = require('./lib');
const fs = require('fs');
const path = require('path');
const { OUT } = require('./config');
const manifest = require(path.join(OUT, 'assets-manifest.json'))['src.html'];

// component -> list of JS expressions returning elements
const comps = {
  SiteHeader: [`document.querySelector('header._Ugwssa')`],
  StickyNav: [`document.querySelector('div._JXzroy')`],
  ListingTitle: [`document.querySelector('section._DbxOEt')`],
  PhotoGallery: [`document.querySelector('section._Zndiww')`],
  ListingOverview: [`document.querySelector('div._gRekoP')`, `document.querySelector('div._NIsTQW')`, `document.querySelector('#contentLeft > div._McRwJR')`, `document.querySelector('div._ZOaIER')`],
  DescriptionAndSleep: [`document.querySelector('div._YidPyi')`, `document.querySelectorAll('#contentLeft > ._QZaLue')[0]`],
  AmenitiesPreview: [`document.querySelector('#amenities')`],
  AvailabilityCalendar: [`document.querySelectorAll('#contentLeft > ._QZaLue')[2]`],
  BookingSidebar: [`document.querySelector('aside._iJTxKe')`],
  ReviewsSummary: [`document.querySelector('#reviews > ._mXHiZG')`, `document.querySelector('#reviews > ._AiEzWi')`],
  ReviewsList: [`[...document.querySelector('#reviews').children].slice(2)`],
  LocationSection: [`document.querySelector('#location')`],
  HostSection: [`document.querySelectorAll('div._SPYgTj > section')[2]`],
  ThingsToKnow: [`document.querySelectorAll('div._SPYgTj > section')[3]`],
  MoreStaysNearby: [`document.querySelectorAll('div._SPYgTj > section')[4]`],
  PhotoTourModal: [`document.querySelector('div._KpcKWX')`],
  Lightbox: [`document.querySelector('div._zFbfbh')`],
  AmenitiesModal: [`document.querySelector('div._yBjuYG')`],
};

(async () => {
  const out = {};
  for (const w of [1440, 390]) {
    const { browser, page } = await open(w);
    await page.evaluate((manifest) => {
      document.querySelectorAll('img').forEach((img, i) => { img.dataset.file = manifest[i].file || 'none'; });
      // make overlays measurable
      const s = document.createElement('style');
      s.textContent = '._KpcKWX,._zFbfbh,._yBjuYG{opacity:1!important;visibility:visible!important;transform:none!important}._mdAcnz{transform:none!important}';
      document.head.appendChild(s);
    }, manifest);
    for (const [name, exprs] of Object.entries(comps)) {
      const res = await page.evaluate((exprs) => {
        const els = exprs.flatMap(e => { const r = eval(e); return Array.isArray(r) ? r : [r]; }).filter(Boolean);
        const lines = [];
        function walk(el, d) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none') { lines.push(`${'  '.repeat(d)}${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).split(' ').join('.')} (display:none)`); return; }
          const r = el.getBoundingClientRect();
          const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').slice(0, 40);
          lines.push(`${'  '.repeat(d)}${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).split(' ').join('.')} ${Math.round(r.width)}x${Math.round(r.height)}${own ? ' "' + own + '"' : ''}`);
          if (d >= 5 || el.tagName === 'svg') return;
          for (const c of [...el.children].slice(0, 12)) walk(c, d + 1);
        }
        els.forEach(e => walk(e, 0));
        let html = els.map(e => {
          const c = e.cloneNode(true);
          c.querySelectorAll('img').forEach(img => { img.setAttribute('src', 'IMG/' + img.dataset.file); img.removeAttribute('data-file'); img.removeAttribute('style'); });
          if (c.tagName === 'IMG') { c.setAttribute('src', 'IMG/' + c.dataset.file); }
          return c.outerHTML;
        }).join('\n');
        const classes = [...new Set(els.flatMap(e => [e, ...e.querySelectorAll('*')]).flatMap(e => String(e.className.baseVal ?? e.className).split(' ')).filter(Boolean))];
        return { outline: lines.join('\n'), html, classes };
      }, exprs);
      out[name] = out[name] || {};
      out[name]['outline' + w] = res.outline;
      if (w === 1440) { out[name].html = res.html; out[name].classes = res.classes; }
    }
    await browser.close();
  }
  fs.writeFileSync(path.join(OUT, 'comps.json'), JSON.stringify(out));
  for (const [k, v] of Object.entries(out)) console.log(k, v.html.length, v.classes.length);
})();
