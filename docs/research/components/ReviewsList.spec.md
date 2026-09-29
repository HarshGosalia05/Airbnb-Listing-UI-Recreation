# ReviewsList Specification

## Overview
- **Target file:** `src/components/listing/ReviewsList.tsx`
- **Screenshots:**
- `docs/design-references/sections/reviews-1440.png`
- `docs/design-references/sections/reviews-390.png`
- **Interaction model:** click-driven (review "Show more" expands)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Fragment of the remaining children of `<section id="reviews">`: tag pill rail, the review grid and the "Show all 19 reviews" button.
- Pill rail: flex gap 12, overflow-x auto, hidden scrollbar (`no-scrollbar`), padding 4px 0 30px. Pills: 1px #ddd, radius 16, padding 13px 18px 13px 14px, 14px medium, 20x20 icon image, count in muted2 weight 400. Icons `IMG/2db2d4a0.png`, `3cabb880`, `0fa3419b`, `50456be1`, `47f52c81`, `e3f6bded`, `fc465293`, `f3636946`, `91a2c2aa`, `680f6918` (.png) in markup order.
- Review grid 2 cols, gap 48px 80px, pb 40 (≤1128px: 1 col, gap 30). Card head: 42px avatar (image or initial-letter circle `._VlFmUV` with the inline bg/colour from the markup), name 15px medium, tenure 13px muted2. Rating row 13px: 5 × 10px stars, " · ", date. Body 15px/1.4 pre-line; long reviews are clamped to 4 lines (`line-clamp-4`) with a "Show more" button (15px medium underlined, mt 8) — clicking removes the clamp and hides the button (inferred).
- "Show all 19 reviews": 1px #222 border, radius 12, padding 13px 23px, 16px medium, hover grey100, active scale(.98) (same style as the amenities button). No action (inert), like the original capture.

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
._XZuuKk{border:1px solid #222;background:#fff;border-radius:12px;padding:13px 23px;font-size:16px;font-weight:500;transition:background .15s,transform .05s}
._XZuuKk:hover{background:var(--grey100)}
._XZuuKk:active{transform:scale(.98)}
._rDgNVk{display:flex;gap:12px;overflow-x:auto;padding:4px 0 30px;scrollbar-width:none}
._rDgNVk::-webkit-scrollbar{display:none}
._fghUgF{flex-shrink:0;display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:16px;padding:13px 18px 13px 14px;font-size:14px;font-weight:500;background:#fff}
._fghUgF ._WevcZP{width:20px;height:20px;object-fit:contain;display:block;flex-shrink:0}
._fghUgF ._nrzMKB{color:var(--muted2);font-weight:400}
._RRsDBp{display:grid;grid-template-columns:1fr 1fr;gap:48px 80px;padding-bottom:40px}
._OxFhJw .head{display:flex;align-items:center;gap:12px;margin-bottom:10px}
._nCtqsh{width:42px;height:42px;border-radius:50%;object-fit:cover}
._VlFmUV{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:500}
._OxFhJw ._ZWkpdw{font-size:15px;font-weight:500}
._OxFhJw ._PjSQBI{font-size:13px;color:var(--muted2)}
._TjrxaG{display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:6px}
._TjrxaG ._XJKtyD{display:flex;gap:1px}
._TjrxaG ._XJKtyD span{width:10px;height:10px}
._CfRTjD{font-size:15px;line-height:1.4;white-space:pre-line}
._CfRTjD._kfKUOt{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
._lQlyVc{background:none;border:none;padding:0;margin-top:8px;font-size:15px;font-weight:500;text-decoration:underline}

/* @media (max-width:1128px) */
._RRsDBp{grid-template-columns:1fr;gap:30px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._rDgNVk 1120x82
  button._fghUgF 135x48 "Comfort"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "6"
  button._fghUgF 140x48 "Accuracy"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "5"
  button._fghUgF 128x48 "Hot tub"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "5"
  button._fghUgF 144x48 "Condition"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "4"
  button._fghUgF 150x48 "Hospitality"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "8"
  button._fghUgF 152x48 "Cleanliness"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "4"
  button._fghUgF 145x48 "Amenities"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 119x48 "Decor"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 170x48 "Indoor spaces"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 135x48 "Location"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
div._RRsDBp 1120x632
  div._OxFhJw 520x189
    div.head 520x42
      div._VlFmUV 42x42 "A"
      div. 118x40
        div._ZWkpdw 118x21 "Amit"
        div._PjSQBI 118x19 "2 months on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 66x19 "1 week ago"
    div._CfRTjD 520x42 "Very helpful and responsive team. Safe a"
  div._OxFhJw 520x189
    div.head 520x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Aheesh"
        div._PjSQBI 104x19 "3 years on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 74x19 "2 weeks ago"
    div._CfRTjD._kfKUOt 520x84 "We had a wonderful stay. The apartment w"
    button._lQlyVc 79x19 "Show more"
  div._OxFhJw 520x189
    div.head 520x42
      img._nCtqsh 42x42
      div. 118x40
        div._ZWkpdw 118x21 "Samiksha"
        div._PjSQBI 118x19 "8 months on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 520x21 "the host nitish was really great help"
  div._OxFhJw 520x189
    div.head 520x42
      div._VlFmUV 42x42 "V"
      div. 104x40
        div._ZWkpdw 104x21 "Vedant"
        div._PjSQBI 104x19 "4 years on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD._kfKUOt 520x84 "We had an amazing stay at this property "
    button._lQlyVc 79x19 "Show more"
  div._OxFhJw 520x119
    div.head 520x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Vaibhav S"
        div._PjSQBI 104x19 "3 years on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 520x42 "Great great experience living out there "
  div._OxFhJw 520x119
    div.head 520x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Mohd"
        div._PjSQBI 104x19 "5 years on Airbnb"
    div._TjrxaG 520x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 520x21 "Great place. Exactly as described in the"
button._XZuuKk 190x49 "Show all 19 reviews"
```
### Mobile 390px
```
div._rDgNVk 342x82
  button._fghUgF 135x48 "Comfort"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "6"
  button._fghUgF 140x48 "Accuracy"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "5"
  button._fghUgF 128x48 "Hot tub"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "5"
  button._fghUgF 144x48 "Condition"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "4"
  button._fghUgF 150x48 "Hospitality"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "8"
  button._fghUgF 152x48 "Cleanliness"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "4"
  button._fghUgF 145x48 "Amenities"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 119x48 "Decor"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 170x48 "Indoor spaces"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
  button._fghUgF 135x48 "Location"
    img._WevcZP 20x20
    span._nrzMKB 8x18 "2"
div._RRsDBp 342x1042
  div._OxFhJw 342x140
    div.head 342x42
      div._VlFmUV 42x42 "A"
      div. 118x40
        div._ZWkpdw 118x21 "Amit"
        div._PjSQBI 118x19 "2 months on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 66x19 "1 week ago"
    div._CfRTjD 342x63 "Very helpful and responsive team. Safe a"
  div._OxFhJw 342x189
    div.head 342x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Aheesh"
        div._PjSQBI 104x19 "3 years on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 74x19 "2 weeks ago"
    div._CfRTjD._kfKUOt 342x84 "We had a wonderful stay. The apartment w"
    button._lQlyVc 79x19 "Show more"
  div._OxFhJw 342x98
    div.head 342x42
      img._nCtqsh 42x42
      div. 118x40
        div._ZWkpdw 118x21 "Samiksha"
        div._PjSQBI 118x19 "8 months on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 342x21 "the host nitish was really great help"
  div._OxFhJw 342x189
    div.head 342x42
      div._VlFmUV 42x42 "V"
      div. 104x40
        div._ZWkpdw 104x21 "Vedant"
        div._PjSQBI 104x19 "4 years on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD._kfKUOt 342x84 "We had an amazing stay at this property "
    button._lQlyVc 79x19 "Show more"
  div._OxFhJw 342x140
    div.head 342x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Vaibhav S"
        div._PjSQBI 104x19 "3 years on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 342x63 "Great great experience living out there "
  div._OxFhJw 342x98
    div.head 342x42
      img._nCtqsh 42x42
      div. 104x40
        div._ZWkpdw 104x21 "Mohd"
        div._PjSQBI 104x19 "5 years on Airbnb"
    div._TjrxaG 342x19
      span._XJKtyD 54x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
        span. 10x10
          svg. 10x10
      span. 3x19 "·"
      span. 57x19 "May 2026"
    div._CfRTjD 342x21 "Great place. Exactly as described in the"
button._XZuuKk 190x49 "Show all 19 reviews"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_rDgNVk"><button class="_fghUgF"><img class="_WevcZP" src="IMG/2db2d4a0.png" alt="" aria-hidden="true">Comfort <span class="_nrzMKB">6</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/3cabb880.png" alt="" aria-hidden="true">Accuracy <span class="_nrzMKB">5</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/0fa3419b.png" alt="" aria-hidden="true">Hot tub <span class="_nrzMKB">5</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/50456be1.png" alt="" aria-hidden="true">Condition <span class="_nrzMKB">4</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/47f52c81.png" alt="" aria-hidden="true">Hospitality <span class="_nrzMKB">8</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/e3f6bded.png" alt="" aria-hidden="true">Cleanliness <span class="_nrzMKB">4</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/fc465293.png" alt="" aria-hidden="true">Amenities <span class="_nrzMKB">2</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/f3636946.png" alt="" aria-hidden="true">Decor <span class="_nrzMKB">2</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/91a2c2aa.png" alt="" aria-hidden="true">Indoor spaces <span class="_nrzMKB">2</span></button><button class="_fghUgF"><img class="_WevcZP" src="IMG/680f6918.png" alt="" aria-hidden="true">Location <span class="_nrzMKB">2</span></button></div>
<div class="_RRsDBp"><div class="_OxFhJw"><div class="head"><div class="_VlFmUV" style="background:rgb(247,237,226);color:rgb(193,133,42)">A</div><div><div class="_ZWkpdw">Amit</div><div class="_PjSQBI">2 months on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>1 week ago</span></div><div class="_CfRTjD" data-full="Very%20helpful%20and%20responsive%20team.%20Safe%20and%20peaceful%20stay.%20loved%20everything%20about%20the%20property.">Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.</div></div><div class="_OxFhJw"><div class="head"><img class="_nCtqsh" src="IMG/0c540c00.jpg" alt=""><div><div class="_ZWkpdw">Aheesh</div><div class="_PjSQBI">3 years on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>2 weeks ago</span></div><div class="_CfRTjD _kfKUOt" data-full="We%20had%20a%20wonderful%20stay.%20The%20apartment%20was%20clean%2C%20comfortable%2C%20and%20exactly%20as%20shown%20in%20the%20photos.%20The%20host%20was%20very%20responsive%20and%20helpful%20throughout%20our%20stay.%20We%20would%20definitely%20recommend%20this%20place%20and%20would%20love%20to%20stay%20here%20again.">We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.</div><button class="_lQlyVc">Show more</button></div><div class="_OxFhJw"><div class="head"><img class="_nCtqsh" src="IMG/2b727a34.jpg" alt=""><div><div class="_ZWkpdw">Samiksha</div><div class="_PjSQBI">8 months on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>May 2026</span></div><div class="_CfRTjD" data-full="the%20host%20nitish%20was%20really%20great%20help">the host nitish was really great help</div></div><div class="_OxFhJw"><div class="head"><div class="_VlFmUV" style="background:rgb(239,234,247);color:rgb(139,111,196)">V</div><div><div class="_ZWkpdw">Vedant</div><div class="_PjSQBI">4 years on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>May 2026</span></div><div class="_CfRTjD _kfKUOt" data-full="We%20had%20an%20amazing%20stay%20at%20this%20property%20in%20Goa!%20The%20entire%20home%20was%20spotless%20and%20exceptionally%20well-maintained%2C%20making%20us%20feel%20comfortable%20from%20the%20moment%20we%20arrived.%20The%20cleanliness%20standards%20were%20truly%20impressive%2C%20with%20every%20corner%20of%20the%20house%20looking%20fresh%20and%20pristine.%0AThe%20highlight%20of%20our%20stay%20was%20definitely%20the%20jacuzzi.%20It%20was%20clean%2C%20well-kept%2C%20and%20the%20perfect%20place%20to%20relax%20after%20a%20day%20of%20exploring%20Goa.%20It%20added%20a%20luxurious%20touch%20to%20our%20vacation%20and%20made%20our%20experience%20even%20more%20memorable.%0AThe%20property%20was%20exactly%20as%20described%2C%20well-equipped%2C%20and%20offered%20a%20peaceful%20atmosphere.%20We%20would%20highly%20recommend%20this%20place%20to%20anyone%20looking%20for%20a%20comfortable%2C%20clean%2C%20and%20relaxing%20stay%20in%20Goa.%20Looking%20forward%20to%20visiting%20again!">We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.
The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.
The property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!</div><button class="_lQlyVc">Show more</button></div><div class="_OxFhJw"><div class="head"><img class="_nCtqsh" src="IMG/9f4d67c2.jpg" alt=""><div><div class="_ZWkpdw">Vaibhav S</div><div class="_PjSQBI">3 years on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>May 2026</span></div><div class="_CfRTjD" data-full="Great%20great%20experience%20living%20out%20there%20%2C%20can't%20expect%20more%20%2C%20will%20always%20look%20for%20it%20in%20the%20future%20and%20will%20recommend%20my%20friends%20too.">Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.</div></div><div class="_OxFhJw"><div class="head"><img class="_nCtqsh" src="IMG/2d6d0a52.jpg" alt=""><div><div class="_ZWkpdw">Mohd</div><div class="_PjSQBI">5 years on Airbnb</div></div></div><div class="_TjrxaG"><span class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></span><span>·</span><span>May 2026</span></div><div class="_CfRTjD" data-full="Great%20place.%20Exactly%20as%20described%20in%20the%20listing.">Great place. Exactly as described in the listing.</div></div></div>
<button class="_XZuuKk">Show all 19 reviews</button>
```
