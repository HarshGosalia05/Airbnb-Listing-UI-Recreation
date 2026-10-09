# Page Topology: https://airbnb-clone-umber-two.vercel.app/

- **Route:** `/` (`src/app/page.tsx` → `src/components/listing/ListingPage.tsx`)
- **Components:** `src/components/listing/` · **Images:** `public/images/listing/` · **Reference screenshots:** `docs/design-references/sections/`
- **Query state:** `/?modal=PHOTO_TOUR_SCROLLABLE` is the same page with the photo tour overlay open (second saved capture). No separate route.
- **Source:** the live site sits behind Vercel's bot checkpoint, so extraction used two SingleFile captures of the page (the normal page and the page with the photo tour open), rendered locally in headless Chromium. The captures themselves were never committed (≈16 MB each; see `tools/README.md`) — what remains in the repository are their derived outputs: the per-section screenshots in `docs/design-references/sections/`, the extracted assets and the specs in `docs/research/components/`. The original is a hand-written static page (hashed class names, a single 26 KB stylesheet, vanilla JS that SingleFile stripped).

## Layers (z-index)
| Layer | Element | Position | z |
|---|---|---|---|
| Toast | `._HALoyX` | fixed bottom 32 centre | 200 |
| Amenities modal | `._yBjuYG` | fixed inset 0, backdrop #00000080 | 150 |
| Lightbox | `._zFbfbh` | fixed inset 0, white | 140 |
| Photo tour | `._KpcKWX` | fixed inset 0, white | 120 |
| Header | `header._Ugwssa` | relative (in flow, not sticky) | 50 |
| Sticky section nav | `._JXzroy` | fixed top, hidden until scrolled past gallery | 45 |

## Flow order (desktop 1440px, total height 6259px)
1. **SiteHeader** — 1440x89, padding 0 80, grid `1fr auto 1fr` (logo | search pill | host/globe/menu).
2. `main` → container `._zcNtKV` max-width 1280, padding 0 80 (≤1128: 0 40, ≤743: 0 24).
   1. **ListingTitle** `section#photos` — h1 + Share/Save (padding 32px 0 18px).
   2. **PhotoGallery** — 1120x494 grid, margin-bottom 48.
   3. Two-column grid `._lhKJir`: `minmax(0,1fr) 372px`, gap 0 96 (≤1128: single column, aside hidden).
      - Left `._joiPBF` (652 wide): **ListingOverview** → **DescriptionAndSleep** → **AmenitiesPreview** (`#amenities`) → **AvailabilityCalendar**.
      - Right `aside` (372 wide, stretches): **BookingSidebar** (sticky top 100).
   4. Full-width block `._SPYgTj` (border-top #ebebeb) of sections `._WNEjqG` (padding 48px 0, border-top except the first):
      - `section#reviews`: **ReviewsSummary** + **ReviewsList**
      - `section#location`: **LocationSection**
      - section: **HostSection**
      - section: **ThingsToKnow**
      - section: **MoreStaysNearby**
3. Overlays (always mounted, hidden): **PhotoTourModal**, **Lightbox**, **AmenitiesModal**, **Toast**.

There is no footer on the original page.

## Interaction model per section
| Section | Model |
|---|---|
| SiteHeader | static + hover |
| StickyNav | scroll-driven (appears after gallery; scroll-spy underline) |
| ListingTitle | click (share → toast, save → toggle + toast) |
| PhotoGallery | click (opens photo tour) |
| ListingOverview | static |
| DescriptionAndSleep | click (Show more expands) |
| AmenitiesPreview | click (opens amenities modal) |
| AvailabilityCalendar | click (month paging, date selection, clear) |
| BookingSidebar | CSS sticky |
| ReviewsSummary | static |
| ReviewsList | click (per-review Show more) |
| Location / Host / ThingsToKnow | static + hover |
| MoreStaysNearby | click (paged horizontal rail) |
| PhotoTourModal | click + URL state |
| Lightbox | click + arrow keys |
| AmenitiesModal | click (backdrop / close) |
