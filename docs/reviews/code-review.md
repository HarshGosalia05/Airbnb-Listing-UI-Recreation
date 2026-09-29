# Code review: `code-reviewer` sub-agent report

- **Config:** `.claude/agents/code-reviewer.md`
- **Run:** once over `src/`, before the accessibility pass. The report is reproduced below. The resolution of each finding is in the table at the end.

---

**Health:** `npm run typecheck` and `npx eslint src` are clean. `npm run lint` fails with 24 `@typescript-eslint/no-require-imports` errors, all in `tools/*.js` and none in `src/`.

## High
- **`globals.css` `:focus { outline: none }` removes every focus indicator,** and no component adds `focus-visible:` styles, so keyboard users can't see focus.
  - Fix: add a global `:focus-visible { outline: 2px solid #222; outline-offset: 2px }`, with an inset offset on rounded, clipped tiles.
  - Pixel-safe: `:focus-visible` doesn't match mouse clicks.
- **`AvailabilityCalendar.tsx` day cells are `<div onClick>`.** They aren't keyboard-reachable, have no role, and don't expose their state.
  - Fix: render them as `<button>`s with reset classes, `disabled={blocked}`, `aria-pressed` and a descriptive `aria-label`. Group each month with `role="group"`.
- **The dialogs (`PhotoTourModal`, `Lightbox`, `AmenitiesModal`) don't manage focus.** They don't move focus in, trap Tab, or return focus to the trigger. The page behind stays tabbable, so `aria-modal` isn't honoured.
  - Fix: add a shared `useDialogFocus` hook and make the background `inert` while an overlay is open (the tour too, while the lightbox is open).

## Medium
- Closed dialogs rely on `aria-hidden` plus `invisible`. Add `inert={!open}`.
- Description Show more/less has no `aria-expanded` or `aria-controls`.
- The tour's Save toggle lacks `aria-pressed`.
- JS `behavior: "smooth"` scrolling ignores `prefers-reduced-motion`. Add a `scrollBehavior()` helper.
- The reduced-motion rule targets `*`, which doesn't match `::before`/`::after`, so it misses the hover overlays.
- Tailwind v4 `scale-*` and `translate-*` in `ListingTitle`, `PhotoGallery`, `BookingSidebar`, `AmenitiesPreview` and `AmenitiesModal` set separate properties that `transition: transform` doesn't animate. Use `[transform:…]`.
- `share()` shows "Link copied" even if the clipboard write fails.

## Low
- A repeated identical toast isn't re-announced by the live region.
- The toast timer isn't cleared on unmount.
- The title's Save button changes its label while also using `aria-pressed`.
- The sticky nav's active link has no `aria-current`.
- The hidden sticky nav can keep focus. Use `inert`.
- The rating bars have no text alternative.
- The decorative SVGs (laurels, wordmark) lack `aria-hidden`.
- `href="#"` placeholder links jump to the top.
- Duplicated helpers and icons: `ShieldIcon`, the SVG base props, the ghost-button class strings, and the amenity SVG markup.

**Verdict:** correct and type-safe, but not yet keyboard-accessible. The focus indicator, the calendar buttons and dialog focus management must be fixed first, and all can be fixed without changing the mouse-user rendering.

---

## Resolution

| Finding | Status |
|---|---|
| `tools/*.js` lint errors | Fixed: ESLint override for the CommonJS tool scripts |
| No focus indicator | Fixed: global `:focus-visible` outline in `globals.css` (keyboard only) |
| Calendar days are divs | Fixed: `<button>`s with reset classes, `disabled`, `aria-pressed`, descriptive `aria-label`; months in `role="group"` |
| Dialog focus management | Fixed with an adjusted approach. The suggested hook recorded the trigger in an effect, but by then the new `inert` background has already blurred it. `ListingUIProvider` now records the trigger in the `open*` handlers and restores it on close. `src/hooks/useDialogFocus.ts` handles initial focus and the Tab trap (the tour's trap pauses while the lightbox is on top). |
| Background / closed dialogs not inert | Fixed: `PageContent` wrapper is `inert` while any overlay is open; every dialog is `inert` when closed; the tour is `inert` under the lightbox |
| Show more `aria-expanded` | Fixed |
| Tour Save `aria-pressed` | Fixed |
| Smooth scroll ignores reduced motion | Fixed: `scrollBehavior()` in `lib/utils.ts`, used by StickyNav and the tour |
| Reduced-motion misses pseudo-elements | Fixed: `*, *::before, *::after` |
| `scale-*` press animations don't ease | Fixed in ListingTitle, PhotoGallery, BookingSidebar, AmenitiesPreview. AmenitiesModal left as is: its transition lists `scale`, and Tailwind v4's `transition-transform` covers `translate`. |
| Share toast on clipboard failure | Fixed: shows "Couldn't copy link" |
| Toast timer cleanup | Fixed |
| Save label + `aria-pressed` | Fixed: stable `aria-label="Save"` |
| Sticky nav `aria-current` / `inert` when hidden | Fixed |
| Rating bars text alternative | Fixed: `role="img"` + `aria-label` |
| Decorative SVGs | Fixed: laurel and wordmark `aria-hidden` |
| Repeated toast not re-announced | Deferred (low impact) |
| `href="#"` placeholder links | Kept, since the reference uses `href="#"` too (behavioural parity) |
| Duplicated icons and helpers | Deferred: refactor only, no user-facing effect |
