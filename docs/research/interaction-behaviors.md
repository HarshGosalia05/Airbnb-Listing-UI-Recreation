# Behaviors: https://airbnb-clone-umber-two.vercel.app/

**Method caveat:** the live page could not be driven by a browser (Vercel Security Checkpoint rejects automated browsers). Everything below comes from the user's SingleFile captures. Their CSS keeps every transition, hover, active and media rule, but SingleFile removed the JavaScript and any CSS rules not in use at save time. So:
- **Measured** = read directly from the captured CSS or DOM.
- **Inferred** = reconstructed from a hidden-state rule plus markup ids, because the "open" rule or the JS was stripped.

## Global
- `html { scroll-behavior: smooth }`. No smooth-scroll library (no Lenis/Locomotive markers). **Measured.**
- `@media (prefers-reduced-motion: reduce)` collapses all animations and transitions to 1ms. **Measured.**
- Breakpoints: `max-width:1128px` (container padding 40, main grid to 1 column, booking aside hidden, tour nav 4 columns, review grids 1 column, stays 3 per view) and `max-width:743px` (padding 24, gallery shows only the first photo at 280px, search pill and "Become a host" hidden, 1-column sleep and calendar, tour nav 2 columns, stays 2 per view). **Measured.** At 390px the original has visible overflow (header items and the guest-favourite card are wider than the viewport). The clone reproduces the same rules.

## Scroll
- **Sticky section nav** `._JXzroy`: hidden state `translateY(-100%); opacity 0; pointer-events none`, `transition: transform .25s ease, opacity .25s ease` (**measured**). Shown after scrolling past the photo gallery (**inferred trigger**). Active link underline `._KOWlKT::after` (2px #222) follows the section in view: Photos / Amenities / Reviews / Location (**inferred scroll-spy**; the markup has `data-target` attributes).
- **Booking card**: `position: sticky; top: 100px` inside a stretched aside. **Measured.**
- **Photo tour room titles**: `position: sticky; top: 20px` inside the tour scroll area; static at ≤1128px. **Measured.**
- Nothing animates into view on scroll (no entrance-animation classes or keyframes in the CSS).

## Click
- Hero tiles and "Show all photos" open the **photo tour** (`?modal=PHOTO_TOUR_SCROLLABLE`, from the second capture's URL). Hidden: `opacity 0; visibility hidden; translateY(28px)`, transition .3s `cubic-bezier(.2,0,0,1)` (**measured**). Open: `opacity 1; transform none` (**inferred**).
- Tour category thumbnails scroll to that room. A tour photo opens the **lightbox**: `opacity .25s ease`, prev/next buttons disabled at the ends, counter and room title (**inferred content**; ids `lbTitle`, `lbCounter`, `lbStage`, `lbPrev`, `lbNext`).
- "Show all 50 amenities" opens the **amenities modal**: backdrop `opacity .2s ease`, panel `translateY(20px) → 0` over .25s `cubic-bezier(.2,0,0,1)` (**measured hidden state, inferred open**).
- Share / Save show a **toast** `._HALoyX` (`translate(-50%,20px) → (-50%,0)`, opacity .2s) (**inferred messages**: "Link copied", "Saved to wishlist", "Removed from wishlist").
- Description "Show more" (`#descMore`) and review "Show more" remove the clamp (**inferred**).
- Calendar prev/next page the months. Selecting and clearing dates updates the heading (**inferred**).
- "More stays nearby" pager: `1 / 2`, prev disabled at the start, smooth horizontal scroll (**measured markup, inferred paging**).

## Hover / active (all measured)
- Search pill shadow `0 1px 4px #00000014 → 0 2px 8px #0000001f` (.2s ease).
- Circle icon buttons grey200 → grey300 (.18s). Ghost round buttons: transparent → grey200, active scale(.9).
- Share/Save: grey200 background, active scale(.96).
- Hero tiles: overlay `#0000 → #0000001a` (.2s), active scale(.997).
- Outline buttons ("Show all …"): grey100 background, active scale(.98).
- Reserve: gradient → darker gradient, active scale(.985).
- Tour thumbnails: scale(1.04) and brightness(.94). Tour photos: scale(1.04) over .4s plus a `#00000014` overlay.
- Lightbox arrows: grey100 background, active `translateY(-50%) scale(.92)`.
