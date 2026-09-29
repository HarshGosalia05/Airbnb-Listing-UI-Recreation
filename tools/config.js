// Shared paths and browser setup for the extraction / QA pipeline (see tools/README.md).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const REFS = path.join(ROOT, 'docs/design-references');

// The two SingleFile captures of the reference page: [main page, page with ?modal=PHOTO_TOUR_SCROLLABLE].
const captures = fs.readdirSync(REFS).filter((f) => f.endsWith('.html')).sort();
const CAPTURE_MAIN = path.join(REFS, captures[0]);
const CAPTURE_TOUR = path.join(REFS, captures[1] ?? captures[0]);

// Intermediate artefacts (manifests, section dumps, extracted CSS) — git-ignored.
const OUT = path.join(__dirname, '.out');
fs.mkdirSync(OUT, { recursive: true });

module.exports = {
  ROOT,
  OUT,
  CAPTURE_MAIN,
  CAPTURE_TOUR,
  IMAGES_DIR: path.join(ROOT, 'public/images/listing'),
  SHOTS_DIR: path.join(REFS, 'sections'),
  SPEC_DIR: path.join(ROOT, 'docs/research/components'),
  captureUrl: (file) => pathToFileURL(file).href,
  // Set CHROME_PATH to use a specific Chromium build; otherwise Playwright's bundled browser is used.
  launch: () => chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
};
