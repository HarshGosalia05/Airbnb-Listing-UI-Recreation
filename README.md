# Airbnb Listing UI Recreation

A pixel-accurate recreation of an Airbnb listing page — **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"** — built from scratch with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

Designed and built by **Harsh Gosalia**.

## Features

- **Listing page:** header with search pill, title with Share/Save, a 5-photo hero grid, overview, "Where you'll sleep", amenities, a two-month availability calendar, a sticky booking card, reviews with rating breakdown, a location map, host profile, "Things to know" and a "More stays nearby" carousel.
- **Sticky section nav:** appears once you scroll past the photos and underlines the section in view (Photos / Amenities / Reviews / Location).
- **Photo tour:** 9 rooms and 43 photos, with category thumbnails and sticky room titles. Opens from the gallery and is linkable at `/?modal=PHOTO_TOUR_SCROLLABLE`.
- **Lightbox:** full-screen viewer with a room title, an `n / 43` counter, prev/next buttons and arrow-key navigation.
- **Amenities modal:** all 12 groups, including items marked unavailable.
- **Interactions:** the calendar pages through months and lets you select or clear dates. "Show more" expands long text, the carousel pages, Share copies the link and Save toggles, with a toast for each.
- **Responsive:** desktop-first breakpoints at 1128px and 743px, covering tablet and mobile layouts.
- **Accessible:**
  - keyboard focus ring (keyboard only)
  - dialogs that move, trap and return focus, with the page behind made inert
  - keyboard-operable calendar, and ARIA state on toggles
  - `prefers-reduced-motion` honoured, including JS-driven scrolling

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **shadcn/ui** base components and a local `cn()` helper in `src/lib/utils.ts`
- **Airbnb Cereal VF** loaded with `next/font/local` from `src/app/fonts/`

## Getting started

Requires Node.js 24 or newer.

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
  components/ui/          # shadcn/ui base components
  hooks/useDialogFocus.ts # dialog initial focus + Tab trap
  lib/utils.ts            # cn() + scrollBehavior()
  types/listing.ts        # content contracts
public/images/listing/    # all 68 listing images
docs/                     # design research, component specs and reference captures
tools/                    # asset extraction + visual QA pipeline (see tools/README.md)
.claude/agents/           # sub-agent configs used during development
```

## Documentation

| Path | What it is |
|---|---|
| `docs/research/` | Page topology, behaviour notes and one spec per component (exact CSS, measured sizes, markup). |
| `docs/design-references/` | Reference captures and per-section screenshots at 1440px and 390px. |
| `docs/reviews/` | Code review report. |
| `tools/README.md` | The asset extraction and pixel-diff QA pipeline. |
| `AGENTS.md` | Conventions and rules for AI coding agents working in this repo. |

## Accessibility

Keyboard affordances go through `:focus-visible` only, so the mouse experience stays true to the design. Overlays use `useDialogFocus` for initial focus and the Tab trap, return focus to the element that opened them, and make the page behind them `inert`. Interactive elements are real `<button>` / `<a>` elements throughout.

## Notes

- Photos, the Airbnb name and logo, and the Airbnb Cereal font belong to their respective owners and are used here for educational purposes only.
- Licensed under MIT — see [`LICENSE`](LICENSE).
