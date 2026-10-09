# MoreStaysNearby Specification

## Overview
- **Target file:** `src/components/listing/MoreStaysNearby.tsx`
- **Screenshots:**
- `docs/design-references/sections/stays-1440.png`
- `docs/design-references/sections/stays-390.png`
- **Interaction model:** click-driven (carousel paging)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Inner fragment of the last section (page assembler provides wrapper). Header row: h2 "More stays nearby" (22px/26px medium, margin 0) + pager on the right: "1 / 2" (14px muted2, mr 6) and two 32px round buttons (1px #b0b0b0, white, 12px chevrons; `disabled` → opacity .3).
- Rail: flex gap 20, overflow-x auto, `scroll-behavior:smooth`, hidden scrollbar, pb 4. Cards `flex: 0 0 calc((100% - 80px)/5)` (≤1128px: (100% - 40px)/3; ≤743px: (100% - 20px)/2). Image 1:1 cover radius 12; title 14px medium mt 8, 2-line clamp; price line 13px mt 4: "₹23,600 " + 10px star + " 4.91".
- 8 cards from the markup, images in order: `8abfcd86.jpg, 06aec3c1.jpg, 349c67b4.jpg, d1e34b27.jpg, 4f067ab6.jpg, eb203049.jpg, 06aec3c1.jpg, d1e34b27.jpg` (the original repeats two).
- Paging (inferred): next scrolls the rail by its clientWidth + 20, prev by the negative; page indicator = `Math.round(scrollLeft / (clientWidth + 20)) + 1` of `Math.ceil(scrollWidth / (clientWidth + 20))`; prev disabled at start, next disabled at end. Update on the rail's scroll event.

## Conversion rules (apply to every element)
- Source CSS below is the original site's stylesheet, verbatim. Translate every declaration to Tailwind v4 utilities (arbitrary values are fine: `px-[15px]`, `text-[26px]`, `leading-[30px]`, `shadow-[0_2px_8px_#00000026]`, `grid-cols-[35fr_17fr_17fr]`, `aspect-[1120/494]`). Keep exact values.
- Site tokens available as Tailwind colors: `ink` #222222, `subtle` #6a6a6a, `muted2` #717171, `line` #dddddd, `line-soft` #ebebeb, `card-border` rgba(0,0,0,.08), `rausch` #ff385c, `grey100` #f7f7f7, `grey200` #f2f2f2, `grey300` #ebebeb; shadows `shadow-card` (0 6px 16px rgba(0,0,0,.12)); utilities `bg-reserve` / `hover:bg-reserve-hover` (Reserve gradient) and `no-scrollbar`. CSS `var(--x)` in the source maps to these.
- Page font (Airbnb Cereal VF, weights 200–900) and body defaults (14px, line-height 1.43, color #222, antialiased) are already global. `font-weight:500` → `font-medium`, 700 → `font-bold`.
- Responsive: the original is desktop-first. `@media (max-width:1128px)` → prefix `max-[1128px]:`; `@media (max-width:743px)` → prefix `max-[743px]:`. Reproduce those rules exactly — including any overflow quirks at mobile width; the clone must match the original, not improve it.
- Tailwind preflight differs from the original (which had no reset except `h1,h2,h3,p{margin:0}`, `a{color:inherit;text-decoration:none}`, `button{font-family:inherit;cursor:pointer;color:inherit}`):
  - `<button>` in the original keeps browser defaults for anything its rule does not set: **line-height: normal** (add `leading-[normal]`), **font-size 13.333px** when no font-size is set and it contains text, padding `1px 6px`, `border: 2px outset` and grey background when not overridden (every button here overrides border/background — check each rule).
  - `<img>` in the original is `display:inline` with natural height; preflight makes it `block; max-width:100%; height:auto`. Only matters when a rule sets one dimension; verify rendered sizes against the box outline.
- Hover / active / transition declarations are part of the spec — implement them (`hover:`, `active:`, `transition-[...]`, `duration-[...]`, `ease-[cubic-bezier(.2,0,0,1)]`). `::after`/`::before` overlays → `after:` / `before:` variants with `after:content-['']`.
- Inline SVGs: copy the exact `<svg>`/`<path>` data from the markup (convert attributes to JSX: `fill-rule`→`fillRule`, `clip-rule`→`clipRule`, `stroke-width`→`strokeWidth`, `stroke-linecap`→`strokeLinecap`, `stroke-linejoin`→`strokeLinejoin`, style strings → className `block h-full w-full` + fill/stroke attributes). Icons used across sections already exist in `@/components/listing/icons` (StarIcon, ShareIcon, HeartIcon[filled], GridDotsIcon, ChevronRightSmallIcon, ChevronLeftSmallIcon, ChevronLeftStrokeIcon[strokeWidth], ChevronRightStrokeIcon[strokeWidth], ChevronDownIcon, CloseIcon) — use those when the path matches; keep section-only icons as small local components in your file.
- Images: markup `src="IMG/<file>"` means `public/images/listing/<file>`; build URLs with `` `${IMG}/<file>` `` where `IMG` is exported from `@/components/listing/data`. Use plain `<img>` (eslint rule is disabled for this folder). Keep `alt` text verbatim (often empty).
- Text content: verbatim from the markup, including emoji, curly apostrophes (’), `·` separators and `&nbsp;`.
- Named exports, TypeScript strict, no `any`, 2-space indent. Add `"use client"` only if the component needs state/effects/handlers.
- Shared UI state (tour, lightbox, amenities modal, toast, saved) comes from `useListingUI()` in `@/components/listing/ListingUIProvider`: `{ tourOpen, tourTargetRoom, openTour(roomIndex?), closeTour(), clearTourTarget(), lightboxIndex, openLightbox(idx), closeLightbox(), amenitiesOpen, openAmenities(), closeAmenities(), toast, showToast(msg), saved, toggleSaved(), share() }`. Shared tour data: `TOUR_ROOMS`, `ALL_TOUR_PHOTOS`, `HERO_PHOTOS`, `LISTING_TITLE` from `data.ts`.

## Source CSS (verbatim, every rule touching this component's classes)
```css
._XZmvOH{font-size:22px;line-height:26px;font-weight:500;margin-bottom:24px}
._WNEjqG{padding:48px 0;border-top:1px solid var(--line-soft)}
._WNEjqG:first-child{border-top:none}
._cixxXf{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
._FFRFIT{display:flex;align-items:center;gap:8px}
._klVRbI{font-size:14px;color:var(--muted2);margin-right:6px}
._kxdode{width:32px;height:32px;border:1px solid #b0b0b0;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
._kxdode:disabled{opacity:.3}
._kxdode .ico{width:12px;height:12px}
._duSenM{display:flex;gap:20px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;padding-bottom:4px}
._duSenM::-webkit-scrollbar{display:none}
._YyLznY{flex:0 0 calc((100% - 80px)/5);min-width:0}
._YyLznY img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px;display:block}
._YyLznY ._JwWFHq{font-size:14px;font-weight:500;margin-top:8px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
._YyLznY .p{font-size:13px;margin-top:4px}
._YyLznY .p .star{display:inline-block;width:10px;height:10px;vertical-align:-1px}

/* @media (max-width:1128px) */
._YyLznY{flex-basis:calc((100% - 40px)/3)}

/* @media (max-width:743px) */
._YyLznY{flex-basis:calc((100% - 20px)/2)}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._WNEjqG 1120x432
  div._cixxXf 1120x32
    h2._XZmvOH 188x26 "More stays nearby"
    div._FFRFIT 112x32
      span._klVRbI 26x20 "1 / 2"
      button._kxdode 32x32
        span.ico 12x12
          svg. 12x12
      button._kxdode 32x32
        span.ico 12x12
          svg. 12x12
  div._duSenM 1120x283
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Beautiful Studio with a view to die for"
      div.p 208x19 "₹23,600 4.91"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x20 "NAQAB - 1bhk with private pool"
      div.p 208x19 "₹42,218 4.95"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Greentique Luxury Flat with plunge pool,"
      div.p 208x19 "₹44,506 4.94"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "The Tropical Studio | 5 mins to Beach"
      div.p 208x19 "₹22,824 4.96"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Luxury Casa Bella 1BHK with plunge pool,"
      div.p 208x19 "₹39,942 4.95"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Kanso by Earthen Window | Jacuzzi | Terr"
      div.p 208x19 "₹45,648 5.0"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Luxury Apt | Private Pool | 6 Mins from "
      div.p 208x19 "₹48,786 4.93"
        span.star 10x10
          svg. 10x10
    div._YyLznY 208x279
      img. 208x208
      div._JwWFHq 208x40 "Serendipity Cottage - Calm Stay in Calan"
      div.p 208x19 "₹22,824 4.92"
        span.star 10x10
          svg. 10x10
```
### Mobile 390px
```
section._WNEjqG 342x385
  div._cixxXf 342x32
    h2._XZmvOH 188x26 "More stays nearby"
    div._FFRFIT 112x32
      span._klVRbI 26x20 "1 / 2"
      button._kxdode 32x32
        span.ico 12x12
          svg. 12x12
      button._kxdode 32x32
        span.ico 12x12
          svg. 12x12
  div._duSenM 342x236
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Beautiful Studio with a view to die for"
      div.p 161x19 "₹23,600 4.91"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "NAQAB - 1bhk with private pool"
      div.p 161x19 "₹42,218 4.95"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Greentique Luxury Flat with plunge pool,"
      div.p 161x19 "₹44,506 4.94"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "The Tropical Studio | 5 mins to Beach"
      div.p 161x19 "₹22,824 4.96"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Luxury Casa Bella 1BHK with plunge pool,"
      div.p 161x19 "₹39,942 4.95"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Kanso by Earthen Window | Jacuzzi | Terr"
      div.p 161x19 "₹45,648 5.0"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Luxury Apt | Private Pool | 6 Mins from "
      div.p 161x19 "₹48,786 4.93"
        span.star 10x10
          svg. 10x10
    div._YyLznY 161x232
      img. 161x161
      div._JwWFHq 161x40 "Serendipity Cottage - Calm Stay in Calan"
      div.p 161x19 "₹22,824 4.92"
        span.star 10x10
          svg. 10x10
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_WNEjqG"><div class="_cixxXf"><h2 class="_XZmvOH" style="margin:0px">More stays nearby</h2><div class="_FFRFIT"><span class="_klVRbI">1 / 2</span><button class="_kxdode" id="simPrev" disabled=""><span class="ico"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg></span></button><button class="_kxdode" id="simNext"><span class="ico"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg></span></button></div></div><div class="_duSenM" id="simTrack"><div class="_YyLznY"><img src="IMG/8abfcd86.jpg" alt="" loading="lazy"><div class="_JwWFHq">Beautiful Studio with a view to die for</div><div class="p">₹23,600 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.91</div></div><div class="_YyLznY"><img src="IMG/06aec3c1.jpg" alt="" loading="lazy"><div class="_JwWFHq">NAQAB - 1bhk with private pool</div><div class="p">₹42,218 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.95</div></div><div class="_YyLznY"><img src="IMG/349c67b4.jpg" alt="" loading="lazy"><div class="_JwWFHq">Greentique Luxury Flat with plunge pool, Calangute</div><div class="p">₹44,506 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.94</div></div><div class="_YyLznY"><img src="IMG/d1e34b27.jpg" alt="" loading="lazy"><div class="_JwWFHq">The Tropical Studio | 5 mins to Beach</div><div class="p">₹22,824 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.96</div></div><div class="_YyLznY"><img src="IMG/4f067ab6.jpg" alt="" loading="lazy"><div class="_JwWFHq">Luxury Casa Bella 1BHK with plunge pool, Calangute</div><div class="p">₹39,942 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.95</div></div><div class="_YyLznY"><img src="IMG/eb203049.jpg" alt="" loading="lazy"><div class="_JwWFHq">Kanso by Earthen Window | Jacuzzi | Terrace | Pool</div><div class="p">₹45,648 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 5.0</div></div><div class="_YyLznY"><img src="IMG/06aec3c1.jpg" alt="" loading="lazy"><div class="_JwWFHq">Luxury Apt | Private Pool | 6 Mins from Beach</div><div class="p">₹48,786 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.93</div></div><div class="_YyLznY"><img src="IMG/d1e34b27.jpg" alt="" loading="lazy"><div class="_JwWFHq">Serendipity Cottage - Calm Stay in Calangute-Baga.</div><div class="p">₹22,824 &nbsp; <span class="star"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span> 4.92</div></div></div></section>
```
