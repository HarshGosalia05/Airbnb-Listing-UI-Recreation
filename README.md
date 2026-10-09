# Airbnb Listing UI Recreation

A frontend recreation of the Airbnb listing page **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"** — one route, static content, no backend. Built by Harsh Gosalia with AI agents (see [AI workflow](#ai-workflow)).

**Scope:** frontend only (no `src/app/api`, no database, no auth — all content is static data in `src/components/listing/data.ts`); desktop (1440px) is the primary target. The UI includes the listing page, sticky section nav, photo tour overlay, lightbox, amenities modal, calendar, booking card, reviews, location, host and a carousel.

Each section was rebuilt from per-section specs (original CSS, measured box sizes and markup) and there are 31 reference screenshots to compare against — but the automated pixel diff has not been run, so no pixel-perfect claim is made. See [Verification](#verification).

## Getting started

Requires Node.js >= 24 (`engines` in `package.json`).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run check` | Lint, typecheck and build together |

## Features

- **Listing page:** header with search pill, title with Share/Save, a 5-photo hero grid, overview, "Where you'll sleep", amenities, a two-month availability calendar, a sticky booking card, reviews with rating breakdown, a location map, host profile, "Things to know" and a "More stays nearby" carousel.
- **Sticky section nav:** appears once you scroll past the photos and underlines the section in view (Photos / Amenities / Reviews / Location).
- **Photo tour:** 9 rooms and 43 photos, with category thumbnails and sticky room titles. Opens from the gallery and is linkable at `/?modal=PHOTO_TOUR_SCROLLABLE`.
- **Lightbox:** full-screen viewer with a room title, an `n / 43` counter, prev/next buttons and arrow-key navigation.
- **Amenities modal:** all 12 groups, including items marked unavailable.
- **Interactions:** the calendar pages through months and lets you select or clear dates. "Show more" expands long text, the carousel pages, Share copies the link and Save toggles, with a toast for each.
- **Responsive:** desktop-first breakpoints at 1128px and 743px, covering tablet and mobile layouts (implemented, not yet verified against the reference — see [Known limitations](#known-limitations)).

## Stack and key decisions

- **Next.js 16.3.5** (App Router, Turbopack) + **React 19.2.4**, **TypeScript** with `strict: true`.
- **Tailwind CSS v4**; design tokens as CSS variables in `src/app/globals.css` (`ink`, `rausch`, `grey100`–`grey300`, `shadow-card`, `bg-reserve`), helper `cn()` in `src/lib/utils.ts`.
- **Airbnb Cereal VF** loaded with `next/font/local` from `src/app/fonts/AirbnbCerealVF.woff2`.
- **Plain `<img>`** instead of `next/image`: images are pre-sized 1:1 with the reference; the rule is switched off for `src/components/listing/**` in `eslint.config.mjs`.
- **One client context** for shared overlay state (`ListingUIProvider.tsx`); sections are otherwise presentational, one file per section (the directory holds 24 files).
- Content is typed (`src/types/listing.ts`) and kept out of the components (`data.ts`: hero photos, 9 tour rooms, 43 photos).

## AI workflow

1. **Manual captures.** The reference page sits behind a bot checkpoint, so it was saved by hand as two SingleFile HTML captures (normal and photo-tour-open) plus full-page screenshots. The HTML captures are not committed; the per-section screenshots are.
2. **Extraction.** `tools/assets.js` and `tools/extract.py` recovered 68 images, the variable font, the stylesheet and the photo-tour data from those captures.
3. **Specs.** `tools/gen_specs.py` produced 18 component specs (`docs/research/components/`) with the original CSS, measured box sizes at 1440px and 390px, and the markup; `docs/research/interaction-behaviors.md` labels each behaviour *measured* or *inferred*.
4. **Parallel section builders.** `section-builder` sub-agents built the sections in parallel from their specs (config: `.claude/agents/section-builder.md`; the run count is recorded in `docs/PROMPTS.md`).
5. **Review and QA.** A `code-reviewer` run is recorded in `docs/reviews/code-review-report.md`. A `visual-qa` config exists (`.claude/agents/visual-qa.md`) but has **not been run** — the pixel-diff pipeline needs the uncommitted HTML captures (see `tools/README.md`).
6. **Prompt log.** The real prompt sequence, including the assignment brief's requirements, is in [`docs/PROMPTS.md`](docs/PROMPTS.md).

## Architecture

The production-scale target architecture — frontend delivery, backend services, database, image storage, search, caching and deployment — is documented in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), with the diagram at:

- [`docs/architecture-diagram.png`](docs/architecture-diagram.png) (rendered export)
- [`docs/architecture-diagram.pdf`](docs/architecture-diagram.pdf) (vector export)
- [`docs/architecture-diagram.svg`](docs/architecture-diagram.svg) (editable source)

Only the web-frontend slice of that diagram exists in this repository.

## Project structure

```
src/
  app/
    layout.tsx            # font (Airbnb Cereal VF) + metadata
    page.tsx              # renders <ListingPage />
    globals.css           # Tailwind v4 + design tokens (ink, rausch, grey100…)
  components/listing/
    ListingPage.tsx       # assembles every section and overlay
    ListingUIProvider.tsx # shared UI state: tour, lightbox, modal, toast, saved
    data.ts               # hero photos + photo-tour rooms
    icons.tsx             # icons shared across sections
    SiteHeader, StickyNav, ListingTitle, PhotoGallery, ListingOverview,
    DescriptionAndSleep, AmenitiesPreview, AvailabilityCalendar, BookingSidebar,
    ReviewsSummary, ReviewsList, LocationSection, HostSection, ThingsToKnow,
    MoreStaysNearby, PhotoTourModal, Lightbox, AmenitiesModal, Toast (.tsx)
  components/ui/          # shadcn/ui base components (unused by the page)
  hooks/useDialogFocus.ts # dialog initial focus + Tab trap
  lib/utils.ts            # cn() + scrollBehavior()
  types/listing.ts        # content contracts
public/images/listing/    # all 68 listing images
docs/                     # architecture, prompts, fidelity log, research, reviews
docs/design-references/sections/  # 31 reference screenshots at 1440px and 390px
tools/                    # asset extraction + visual QA pipeline (see tools/README.md)
.claude/agents/           # sub-agent configs used during development
.agents/skills/clone-website/     # the cloning workflow skill
```

## Accessibility

Keyboard affordances go through `:focus-visible` only, so the mouse experience stays true to the design. Overlays use `useDialogFocus` for initial focus and the Tab trap, return focus to the element that opened them, and make the page behind them `inert`. Interactive elements are real `<button>` / `<a>` elements throughout, icon-only controls carry `aria-label`s, and toggles expose `aria-pressed` / `aria-expanded`. `prefers-reduced-motion` is honoured, including for JS-driven scrolling.

## Provenance

**(a) From the starter template** (MIT, © JCodesMore, recorded in `LICENSE`): the git history starts at `5f65803 "Initial template scaffold for website reverse-engineering"`. Files added before this project's own commit `3016b24` include `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`, `.gitignore`, `package.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/lib/utils.ts`, `src/components/ui/button.tsx`, `README.md`, `LICENSE` and `.agents/skills/clone-website/SKILL.md` — several of these (page, tokens, README, package metadata) were rewritten for this project afterwards. Verified with `git log --diff-filter=A -- <file>`.

**(b) Used as reference only** (derived from the saved captures of the reference site, not authored here): 31 screenshots in `docs/design-references/sections/` at 1440px and 390px; the verbatim CSS, measured box sizes and markup inside `docs/research/components/*.md` and `docs/research/interaction-behaviors.md`; and the 68 listing photos and the Airbnb Cereal font extracted from the captures — the photos are also served from `public/images/listing/` as the page's assets.

**(c) Written for this project:** `src/components/listing/` (24 files), `src/types/listing.ts`, `src/hooks/useDialogFocus.ts`, `tools/*`, `.claude/agents/*`, `docs/architecture-diagram.svg` and its exports, and the authored docs `docs/PROMPTS.md`, `docs/ARCHITECTURE.md`, `docs/fidelity-checks.md`, `docs/reviews/code-review-report.md`. `docs/research/**` is project-generated but holds reference values (see (b)).

## Verification

Actually run for this README:

| Check | How | Result |
|---|---|---|
| Type-check | `npm run typecheck` | pass, exit 0 |
| Lint | `npm run lint` | pass, exit 0 |
| Build | `npm run build` | pass, exit 0; static routes `/`, `/_not-found` |
| Dev server | `npm run dev` → `GET /` | 200, listing title in HTML |
| Production server | `npm start` → `GET /` | 200 |
| Photo-tour deep link | `GET /?modal=PHOTO_TOUR_SCROLLABLE` | 200 |
| Image asset | `GET /images/listing/736a481e.jpg` | 200, `image/jpeg` |
| Visual diff vs reference at 1440px / 390px | `tools/qa.js` + `tools/diff.py` | **Not yet verified** — no `visual-qa` report exists |

## Known limitations

- Frontend only: no backend, API, auth or payments.
- No automated tests; the only sub-agent report on file is `docs/reviews/code-review-report.md` — the `visual-qa` agent has not produced a report.
- Responsive rules (1128px / 743px) are implemented but not verified; reference material exists only at 1440px and 390px.
- `src/components/ui/button.tsx` is unused — nothing imports `@/components/ui`. It is kept as starter-template provenance (see Provenance (a)).
- The location map is a static CSS graphic (matching the reference spec), not an interactive map.
- The visual-QA pipeline (`tools/qa.js`, `tools/diff.py`) cannot run from a clean clone: it needs the two SingleFile HTML captures, which were never committed (see `tools/README.md`).
- Listing content, photos and the Airbnb Cereal font belong to their respective owners; educational use only.

## Documentation

| Doc | What it covers |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Directory map, conventions and rules for agents working here |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Target production architecture (only the frontend is implemented) + diagram |
| `docs/architecture-diagram.{png,pdf,svg}` | The architecture diagram (rendered, vector, editable source) |
| [`docs/fidelity-checks.md`](docs/fidelity-checks.md) | What was checked against the reference, how, and what is still unverified |
| [`docs/PROMPTS.md`](docs/PROMPTS.md) | Real prompt sequence, assignment requirements, sub-agent runs, artifact locations |
| `docs/research/` | Page structure, interaction behaviour notes, 18 component specs |
| `docs/reviews/code-review-report.md` | `code-reviewer` report and its resolution table |
| `docs/reviews/project-audit.md` | Full audit of the project against the assignment and the source template |
| `tools/README.md` | Extraction and QA pipeline |
| [`LICENSE`](LICENSE) | MIT, including the template copyright notice |
