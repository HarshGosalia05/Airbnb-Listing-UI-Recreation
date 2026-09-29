# Extraction and QA tools

These scripts turned the saved reference page into the assets, specs and QA checks this project was built from. Coding agents wrote and ran them during development.

The reference site sits behind Vercel's bot checkpoint, which rejects automated browsers. So the pipeline runs on two [SingleFile](https://github.com/gildas-lormeau/SingleFile) captures in `docs/design-references/`: the page itself, and the page with the photo tour open.

## Setup

```bash
npm i -D playwright && npx playwright install chromium   # or set CHROME_PATH to an existing Chromium
pip install pillow
```

Intermediate files go to `tools/.out/`, which git ignores.

## Pipeline (run from the repo root)

| Step | Command | Output |
|---|---|---|
| 1. Images | `node tools/assets.js` | `public/images/listing/*` (68 unique images, hash-named) plus an image manifest |
| 2. Section markup | `node tools/dump.js` | `tools/.out/sections/*.html` |
| 3. CSS, font, tour data | `python tools/extract.py` | `tools/.out/site-pretty.css`, `src/app/fonts/AirbnbCerealVF.woff2`, `tools/.out/tour.json` |
| 4. Reference screenshots | `node tools/shots.js` | `docs/design-references/sections/*.png` |
| 5. Component data | `node tools/dump2.js` | `tools/.out/comps.json` |
| 6. Specs | `python tools/gen_specs.py` | `docs/research/components/*.spec.md` |
| QA | `npm run build && npm start`, then `node tools/qa.js clone` and `python tools/diff.py clone` | clone screenshots and a pixel diff against the reference, reported per 200px band |

The specs from step 6 are what the `section-builder` agents (`.claude/agents/section-builder.md`) worked from. The QA step is what the `visual-qa` agent (`.claude/agents/visual-qa.md`) runs.
