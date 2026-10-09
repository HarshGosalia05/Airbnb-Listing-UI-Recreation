# Extraction and QA tools

These scripts turned the saved reference page into the assets, specs and QA checks this project was built from. Coding agents wrote and ran them during development.

The reference site sits behind Vercel's bot checkpoint, which rejects automated browsers. So the pipeline runs on two [SingleFile](https://github.com/gildas-lormeau/SingleFile) captures of the page — the page itself, and the page with the photo tour open.

**The captures are not committed to this repository** (~16 MB each, and they embed the reference site's assets). To run steps 1–6 below, drop them into `docs/design-references/` — any `*.html` file there is picked up by `tools/config.js`, which fails at load time with no capture present. The derived outputs of the original run *are* committed (68 images, the font, 18 specs, 31 reference screenshots), so the QA step against a local build is the only part that needs a different setup — see the note below.

## Setup

```bash
npm i -D playwright && npx playwright install chromium   # or set CHROME_PATH to an existing Chromium
pip install pillow
```

Intermediate files go to `tools/.out/`, which git ignores.

## Pipeline (run from the repo root)

| Step | Command | Output | Needs the captures? |
|---|---|---|---|
| 1. Images | `node tools/assets.js` | `public/images/listing/*` (68 unique images, hash-named) plus an image manifest | yes |
| 2. Section markup | `node tools/dump.js` | `tools/.out/sections/*.html` | yes |
| 3. CSS, font, tour data | `python tools/extract.py` | `tools/.out/site-pretty.css`, `src/app/fonts/AirbnbCerealVF.woff2`, `tools/.out/tour.json` | yes |
| 4. Reference screenshots | `node tools/shots.js` | `docs/design-references/sections/*.png` | yes |
| 5. Component data | `node tools/dump2.js` | `tools/.out/comps.json` | yes |
| 6. Specs | `python tools/gen_specs.py` | `docs/research/components/*.md` | yes |
| QA | `npm run build && npm start`, then `node tools/qa.js clone` and `python tools/diff.py clone` | clone screenshots and a pixel diff against the reference, reported per 200px band | the diff needs the committed reference screenshots; `qa.js` currently requires `tools/config.js`, which needs a capture present — see the note above |

**Current status:** steps 1–6 have already been run and their outputs are committed, so a fresh clone does not need to repeat them. The QA step has not been run in this state of the repository: `tools/config.js` throws when `docs/design-references/` holds no `*.html` capture, and no Playwright Chromium is installed. Fixing that (committing the captures, or making `config.js` capture-tolerant) is the outstanding prerequisite for a `visual-qa` run.

The specs from step 6 are what the `section-builder` agents (`.claude/agents/section-builder.md`) worked from. The QA step is what the `visual-qa` agent (`.claude/agents/visual-qa.md`) runs.
