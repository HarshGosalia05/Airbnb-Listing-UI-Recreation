# Fidelity check log

Reference material: 31 screenshots in `docs/design-references/sections/` at **1440px** and **390px**, plus per-component specs with the original CSS and measured box sizes (`docs/research/components/*.md`) and behaviour notes labelled *measured* / *inferred* (`docs/research/interaction-behaviors.md`).

Only checks that were actually executed are marked as run. Everything else says **Not yet verified**.

## Listing Page

| Check | How | Result |
|---|---|---|
| Type-check, lint, build | `npm run typecheck`, `npm run lint`, `npm run build` | Pass, exit 0 each |
| Page serves with expected content | `npm start` → `GET /` | 200, HTML contains "Romantic Jacuzzi 1BHK Candolim" |
| Tour data count | Read `src/components/listing/data.ts` | 9 rooms, 43 photo entries (idx 0–42) |
| Layout at 1440px vs reference screenshot | Side-by-side screenshot at 1440px | Not yet verified |
| Layout at 390px vs reference screenshot | Side-by-side screenshot at 390px | Not yet verified |
| Typography (sizes, weights, line-heights) against spec values | Compare rendered values to `docs/research/components/*.md` | Not yet verified |
| Hover states (search pill shadow, circle buttons, hero-tile overlay, Share/Save, Reserve) | Manual hover at 1440px | Not yet verified |
| Active/press states (`scale(.997)` … `scale(.985)`) | Manual press at 1440px | Not yet verified |
| Sticky nav appears after the gallery, underline follows the section | Scroll through the page | Not yet verified |
| Booking card `position: sticky; top: 100px` | Scroll past the card | Not yet verified |
| Calendar month paging, date selection, clear dates | Click through | Not yet verified |
| Carousel paging, prev disabled at the start | Click through | Not yet verified |
| Share / Save toasts | Click through | Not yet verified |
| Responsive rules at 1128px and 743px | Viewports 1128/743 | Not yet verified |
| Page height vs reference (expected 6259px @1440, 8675px @390, as recorded in `.claude/agents/visual-qa.md`) | Measure `document.height` at both viewports | Not yet verified |
| Pixel diff against reference (`tools/qa.js` + `tools/diff.py`) | Run the QA pipeline at 1440 and 390 | Not yet verified |

## Photo Tour

| Check | How | Result |
|---|---|---|
| Deep link `/?modal=PHOTO_TOUR_SCROLLABLE` resolves | `GET` that URL against the production server | 200 (client-side open behaviour: Not yet verified) |
| Opens from a hero tile / "Show all photos" | Click at 1440px | Not yet verified |
| Category thumbnails scroll to their room | Click through | Not yet verified |
| Sticky room titles (`top: 20px`, static at ≤1128px) | Scroll inside the tour | Not yet verified |
| Open/close transition (`opacity`/`translateY(28px)`, .3s `cubic-bezier(.2,0,0,1)`) | Observe transition | Not yet verified |
| Escape closes the tour; focus returns to the trigger | Keyboard, with DevTools focus log | Code present (`ListingUIProvider.tsx` key handler, `useDialogFocus`) — runtime Not yet verified |
| Focus trap while the tour is open, paused when the lightbox opens | Tab through | Code present (`useDialogFocus`) — runtime Not yet verified |
| 43 photos across 9 rooms render with titles/subtitles | Read `data.ts` + render | Data verified; render Not yet verified |

## Lightbox

| Check | How | Result |
|---|---|---|
| `←` / `→` navigate, disabled at the ends | Keyboard at 1440px | Handlers exist at `Lightbox.tsx:45-46` — runtime Not yet verified |
| Counter `n / 43` and room title shown | Open a photo | Code present — Not yet verified |
| prev/next hover and active states (`translateY(-50%) scale(.92)`) | Hover/press | Not yet verified |
| Fade transition (.25s ease) | Observe transition | Not yet verified |
| Focus moves in, is trapped, returns to the trigger on close | Keyboard with focus log | Code present (`useDialogFocus`) — runtime Not yet verified |
| Tour inert underneath the lightbox; Escape closes the top-most overlay only | Tab + Escape with lightbox open | Code present — runtime Not yet verified |
| Background page inert while the lightbox is open | Tab through background | Code present — runtime Not yet verified |

## Known differences from the reference

- **Share toast text:** success shows `Share options`; the reference text is unknown — `docs/research/interaction-behaviors.md` marks the original messages (`Link copied`, …) as *inferred*, not measured.
- **"You won't be charged yet":** hidden until **Reserve** is pressed, which also raises a toast (`BookingSidebar.tsx`, `ListingUIProvider.reserve`). The reference markup shows the line unconditionally (`docs/research/components/BookingSidebar.md`).
- **Placeholder links in the booking card:** the reference's `<a href="#">` for "Terms apply" and "Report this listing" are rendered as `<span>`; other `href="#"` links elsewhere were deliberately kept (see the resolution table in `docs/reviews/code-review-report.md`).
- **Press animation in the amenities modal:** left with `transition: scale` instead of `[transform:…]` — deliberate, recorded in `docs/reviews/code-review-report.md`.
- **Repeated identical toast** is not re-announced by the live region (deferred) and **duplicated icons/helpers** across sections (deferred) — both from `docs/reviews/code-review-report.md`.
- **Images:** plain `<img>` with fixed sizes, no `next/image` optimisation.
- **Behaviours inferred, not measured:** several interactions (tour open state, scroll-spy trigger, toast messages) were reconstructed from captures whose JavaScript was stripped — see the *measured* / *inferred* labels in `docs/research/interaction-behaviors.md`.
- **Mobile overflow:** the reference overflows the viewport at 390px (the `docs/design-references/sections/full-390.png` reference screenshot measures 659px wide vs a 390px viewport); the component specs say to reproduce that quirk rather than fix it — e.g. `docs/research/components/AmenitiesModal.md`, `docs/research/components/AvailabilityCalendar.md` ("including any overflow quirks at mobile width"). Not yet verified against the reference.
