# Airbnb Listing Clone

A pixel-accurate rebuild of an Airbnb listing page, **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"**, in Next.js 16, React 19 and Tailwind CSS v4.

Reference page: https://airbnb-clone-umber-two.vercel.app/

## Features

- **Listing page:** header with search pill, title with Share/Save, a 5-photo hero grid, overview, "Where you'll sleep", amenities, a two-month availability calendar, a sticky booking card, reviews with rating breakdown, a location map, host profile, "Things to know" and a "More stays nearby" carousel.
- **Sticky section nav:** appears once you scroll past the photos and underlines the section in view (Photos / Amenities / Reviews / Location).
- **Photo tour:** 9 rooms and 43 photos, with category thumbnails and sticky room titles. Opens from the gallery and is linkable at `/?modal=PHOTO_TOUR_SCROLLABLE`.
- **Lightbox:** full-screen viewer with a room title, a `n / 43` counter, prev/next buttons and arrow-key navigation.
- **Amenities modal:** all 12 groups, including items marked unavailable.
- **Interactions:** the calendar pages through months and lets you select or clear dates. "Show more" expands long text, the carousel pages, Share copies the link and Save toggles, with a toast for each.
- **Responsive:** desktop-first breakpoints at 1128px and 743px, matching the reference.
- **Accessible:**
  - keyboard focus ring (keyboard only)
  - dialogs that move, trap and return focus, with the page behind made inert
  - keyboard-operable calendar, and ARIA state on toggles
  - `prefers-reduced-motion` honoured, including JS-driven scrolling

## Getting started

Requires Node.js 24 (see `.nvmrc`).

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

## Project structure

```
src/
  app/
    layout.tsx            # font (Airbnb Cereal VF via next/font/local) + metadata
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
  hooks/useDialogFocus.ts # dialog initial focus + Tab trap
  types/listing.ts
public/images/listing/    # all 68 listing images
tools/                    # extraction + QA pipeline (see tools/README.md)
.claude/agents/           # sub-agent configs
.agents/skills/           # cloning skill
docs/
  research/               # page topology, behaviour notes, one spec per component
  design-references/      # saved captures of the reference + per-section screenshots
```

## AI workflow artifacts

| Path | What it is |
|---|---|
| `.agents/skills/clone-website/` | The cloning **skill** that drove the build (from the starter template, © JCodesMore, MIT). `.claude/commands/clone-website.md` is the Claude Code slash-command bridge to it. |
| `.claude/agents/section-builder.md` | **Sub-agent:** builds components from their specs. 8 ran in parallel. |
| `.claude/agents/code-reviewer.md` | **Sub-agent:** reviews correctness, structure and accessibility. Report and resolutions: `docs/reviews/code-review.md`. |
| `.claude/agents/visual-qa.md` | **Sub-agent:** pixel diff plus behaviour checks against the reference. Report: `docs/reviews/visual-qa.md`. |
| `tools/` | Extraction and QA scripts the agents wrote and ran (Playwright + Pillow). See `tools/README.md`. |
| `docs/research/` | Page topology, behaviour notes and the 18 component specs the builders worked from. |
| `docs/PROMPTS.md` | The prompt sequence used during development. |

## How it was built

I built this with AI coding agents (Claude Code), directing them through each stage:

1. **Capture.** The reference sits behind Vercel's bot checkpoint, which blocks automated browsers. So I saved the page (and its open photo-tour state) with SingleFile and took full-page screenshots.
2. **Extraction.** An agent rendered the saved pages in headless Chromium (Playwright) and recovered:
   - the embedded images and variable font
   - the original stylesheet, including hover, active, transition and breakpoint rules
   - the DOM content and the measured size of every element at 1440px and 390px
3. **Specs.** Each section got a spec file in `docs/research/components/` holding the exact CSS, markup, sizes and behaviours. Interactions the saved page couldn't show, because its JavaScript was stripped, are marked as inferred in `docs/research/BEHAVIORS.md`.
4. **Foundation.** Design tokens, the font, shared icons, typed data and the shared UI-state provider were written before any sections.
5. **Parallel build.** 8 agents built the 18 components at the same time, each working from its own spec and verifying with `tsc` and ESLint.
6. **Visual QA.** The finished page was screenshotted and diffed pixel-by-pixel against the reference at 1440px and 390px. Page heights match exactly (6259px and 8675px), and the remaining differences were fixed, such as line-height quirks in the photo tour.
7. **Review and accessibility.** The `code-reviewer` sub-agent audited the code. Its accessibility findings were fixed without changing what a mouse user sees:
   - keyboard-only focus ring
   - keyboard-operable calendar days
   - modal dialogs that move, trap and return focus, with an `inert` background
   - ARIA state on toggles
   - reduced-motion-aware scrolling

   The `visual-qa` sub-agent then re-verified fidelity and behaviour.

## Notes

- The project started from an MIT-licensed Next.js + shadcn/ui starter scaffold (© JCodesMore). All listing code, assets, research and documentation are specific to this project. See `LICENSE`.
- Photos, the Airbnb name and logo, and the Airbnb Cereal font belong to their respective owners and are used here for educational purposes only.
