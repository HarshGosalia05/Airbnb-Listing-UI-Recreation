const { launch, captureUrl, CAPTURE_MAIN } = require('./config');

// Open the saved reference capture at a given viewport width.
exports.open = async (width, height = 900, file = CAPTURE_MAIN) => {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(captureUrl(file), { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(1000);
  return { browser, page };
};
