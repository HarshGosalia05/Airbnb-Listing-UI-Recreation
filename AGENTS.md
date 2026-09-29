<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Airbnb Listing Clone — Agent Guide

A single-page, pixel-accurate rebuild of an Airbnb listing ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10") in Next.js. The reference is https://airbnb-clone-umber-two.vercel.app/.

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS v4 (tokens in `src/app/globals.css`), shadcn/ui base, `cn()` in `src/lib/utils.ts`
- Airbnb Cereal VF loaded with `next/font/local` from `src/app/fonts/`

## Commands
- `npm run dev`: dev server at http://localhost:3000
- `npm run check`: lint, typecheck and production build. Run this before finishing any change.

## Layout of the code
- `src/app/page.tsx` renders `ListingPage` from `src/components/listing/ListingPage.tsx`, which assembles every section.
- `src/components/listing/`: one file per section (header, sticky nav, gallery, overview, calendar, booking card, reviews, location, host, things to know, more stays) and per overlay (photo tour, lightbox, amenities modal, toast).
- `ListingUIProvider.tsx`: client context for shared UI state (photo tour + `?modal=PHOTO_TOUR_SCROLLABLE`, lightbox index, amenities modal, toast, saved/share).
- `data.ts`: image base path, hero photos and the photo-tour rooms (43 photos). `icons.tsx`: icons shared across sections.
- `src/types/listing.ts`: content types. `public/images/listing/`: every image.
- `docs/research/`: page topology, behaviour notes and one spec per component (the original CSS, measured sizes and markup). `docs/design-references/`: saved captures of the reference page and per-section screenshots.

## Agents, skill and tools
- `.claude/agents/section-builder.md`: build or rebuild components from their specs. Run several in parallel on disjoint files.
- `.claude/agents/code-reviewer.md`: read-only review (correctness, structure, accessibility). Run it after changes.
- `.claude/agents/visual-qa.md`: build, screenshot and pixel-diff against the reference, then check behaviours. Run it after any visual change.
- `.agents/skills/clone-website/`: the cloning workflow skill (`/clone-website`) used to produce the first build.
- `tools/`: the extraction and QA pipeline (see `tools/README.md`). Put scratch output in `tools/.out/` only.

## Accessibility rules
- Keep the reference look for mouse users. Keyboard affordances go through `:focus-visible` (global outline) only.
- Overlays use `useDialogFocus` (`src/hooks/`) for initial focus and the Tab trap. `ListingUIProvider` returns focus to the trigger. Closed overlays and the page behind an open one are `inert`.
- Interactive elements must be real `<button>`/`<a>` elements. Reset the button chrome with classes rather than using clickable divs.

## Conventions
- Match the reference exactly. Take values from the component spec in `docs/research/components/`, not from guesses.
- Tailwind utilities only, with arbitrary values where needed (`text-[22px]`, `leading-[26px]`). Use explicit pixel sizes rather than `text-sm`/`text-base`, which also set a line-height.
- Breakpoints are desktop-first, like the reference: `max-[1128px]:` and `max-[743px]:`.
- Animate `transform` with arbitrary properties (`[transform:scale(.98)]`); Tailwind v4's `scale-*`/`translate-*` set separate CSS properties.
- `<button>` elements keep the browser's `line-height: normal` in the reference, so add `leading-[normal]`.
- Named exports, PascalCase components, 2-space indentation, no `any`. Add `"use client"` only where state or effects are needed.
