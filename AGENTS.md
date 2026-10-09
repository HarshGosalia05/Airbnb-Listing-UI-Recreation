<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — operating guide

One route (`/`), a static Airbnb-listing page with four overlays (photo tour, lightbox, amenities modal, toast). Frontend only: no API, no database, no auth. Read `docs/fidelity-checks.md` before claiming anything about visual or behavioural fidelity.

## Directory map — where new code goes

| Path | What lives there | Rule |
|---|---|---|
| `src/components/listing/<Section>.tsx` | One file per section/overlay (24 files) | New sections go here; keep them presentational |
| `src/components/listing/data.ts` | Image base path, hero photos, 9 tour rooms / 43 photos, `LISTING_TITLE` | Content changes go here, not in components |
| `src/components/listing/icons.tsx` | Icons used by more than one section | Section-only icons stay local to the section file |
| `src/components/listing/ListingUIProvider.tsx` | Client context: tour, lightbox, amenities, toast, saved, share, reserve | Add overlay state here, not in a section |
| `src/types/listing.ts` | Content contracts (`TourRoom`, …) | Extend here when content shape changes |
| `src/hooks/`, `src/lib/` | `useDialogFocus`, `cn`, `scrollBehavior` | Shared behaviour only |
| `src/app/` | `layout.tsx`, `page.tsx`, `globals.css` (tokens), `fonts/` | Do not add routes without asking |
| `src/components/ui/` | shadcn/ui base (`button.tsx`) | Currently unused by the page |
| `public/images/listing/` | 68 images extracted from the captures | Read-only reference assets |
| `docs/research/components/*.md` | 18 component specs (original CSS, measured boxes, markup) | Read before touching a section |
| `tools/` | Extraction and QA scripts (`tools/README.md`) | Scratch output belongs in `tools/.out/` |

## Commands to run before finishing

```bash
npx tsc --noEmit     # same as: npm run typecheck
npm run lint
npm run build
```

All three exit 0 on a clean tree. A change that breaks any of them is not done. `npm run check` runs all three together.

## Code conventions

- **TypeScript strict** (`tsconfig.json`), no `any`, named exports, PascalCase files, 2-space indent.
- `"use client"` only where state, effects or handlers are needed (17 files in `src/` currently carry it).
- **Tailwind v4 utilities only**, arbitrary values for reference values (`text-[22px]`, `leading-[26px]`). Do not use `text-sm`/`text-base` — they also set a line-height; the specs give explicit pixel sizes.
- **Tokens** are CSS variables in `src/app/globals.css`: colours `ink`, `subtle`, `muted2`, `line`, `line-soft`, `card-border`, `rausch`, `grey100/200/300`; shadow `shadow-card`; utilities `bg-reserve`, `hover:bg-reserve-hover`, `no-scrollbar`.
- **Breakpoints** are desktop-first: `max-[1128px]:` and `max-[743px]:`.
- **Transform animations** use arbitrary properties (`[transform:scale(.98)]`); Tailwind v4's `scale-*`/`translate-*` set separate CSS properties that `transition: transform` will not animate.
- `<button>` keeps the browser's `line-height: normal`, so add `leading-[normal]`.
- Plain `<img>` inside `src/components/listing/` (the ESLint rule is off for that folder).
- Copy text, SVG paths and values from the spec — never from memory.

## Accessibility rules

- The page sets `:focus { outline: none }` globally, so **`:focus-visible` must carry the focus indicator** (`src/app/globals.css`).
- **Focus trap:** dialogs use `useDialogFocus` (`src/hooks/useDialogFocus.ts`) for initial focus and the Tab trap; the tour's trap pauses while the lightbox is on top.
- **Escape** closes the top-most overlay (`ListingUIProvider.tsx` — key handler around line 168).
- **Focus restoration:** `ListingUIProvider` records the trigger in the `open*` handlers and returns focus on close (see the resolution table in `docs/reviews/code-review-report.md`).
- **`inert`:** the page wrapper is inert while an overlay is open; closed overlays are inert.
- Icon-only controls need an `aria-label`; decorative SVGs get `aria-hidden`; toggles expose `aria-pressed` / `aria-expanded`.
- **Lightbox:** `ArrowLeft` / `ArrowRight` move between photos and are disabled at the ends (`Lightbox.tsx:45-46`).
- Keyboard changes go through `focus-visible:` only — a mouse user's rendering must stay byte-identical.

## Do / Don't

**Do**
- Read `docs/research/components/<Name>.md` and the listed screenshots before editing that section.
- Put shared state in `ListingUIProvider`, shared icons in `icons.tsx`, content in `data.ts`.
- Run the three commands above, and record real results in `docs/fidelity-checks.md`.

**Don't**
- Don't edit extracted reference material: `public/images/listing/*`, `src/app/fonts/AirbnbCerealVF.woff2`, `docs/design-references/*`, or the verbatim CSS/markup blocks inside `docs/research/components/*.md`.
- Don't add a backend, API routes, database, auth or environment-dependent data.
- Don't hardcode a magic number where a token or spec value exists, and don't "improve" the reference — including its overflow quirks at narrow widths.
- Don't remove `LICENSE` or the starter template's copyright line, and don't describe the project as written from nothing.

## Specs and docs

- `docs/research/page-structure.md` — section order and ids
- `docs/research/interaction-behaviors.md` — each behaviour labelled *measured* or *inferred*
- `docs/research/components/*.md` — 18 specs
- `docs/fidelity-checks.md` — what has been checked, and what is "Not yet verified"
- `docs/ARCHITECTURE.md` — target production architecture (frontend only implemented)
- `docs/PROMPTS.md` — real prompt sequence and sub-agent run evidence

## Sub-agents and skills

Only these agents and this skill are documented for this project; each config records its real status (used, or config-only). No other agents or skills are documented because none others ran.

| Config | When to use it | Status in this project |
|---|---|---|
| `.claude/agents/section-builder.md` | Build or rebuild one or more sections from their specs; run several in parallel on disjoint files | Used — output is the 24 files in `src/components/listing/` |
| `.claude/agents/code-reviewer.md` | Read-only correctness/structure/accessibility review after a change | Used once — `docs/reviews/code-review-report.md` |
| `.claude/agents/visual-qa.md` | Screenshot, pixel-diff and behaviour pass after any visual change | Config only, **not run** — no `visual-qa` report exists |
| `.agents/skills/clone-website/SKILL.md` | The site-reconstruction workflow that produced the first build: capture → extract → spec → parallel builders | Used — it drove the initial capture and extraction (see `docs/PROMPTS.md`) |
