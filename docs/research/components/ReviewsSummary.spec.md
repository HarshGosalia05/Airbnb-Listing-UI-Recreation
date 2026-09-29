# ReviewsSummary Specification

## Overview
- **Target file:** `src/components/listing/ReviewsSummary.tsx`
- **Screenshots:**
- `docs/design-references/sections/reviews-1440.png`
- `docs/design-references/sections/reviews-390.png`
- **Interaction model:** static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- These are the first two children of `<section id="reviews">` (the section wrapper itself is built by the page assembler; you output a fragment `<>...</>`).
- Hero: laurel images `IMG/78b66008.png` (left) and `IMG/b6c05494.png` (right) at height 110px, around "4.95" (100px medium, letter-spacing -.03em). "Guest favourite" 22px medium mt 8; description 15px/1.35, max-width 420, centred; "How reviews work" 14px medium underlined button mt 14. Block padding 8px 0 40px, centred.
- Category grid: `grid-template-columns: 1.4fr repeat(6, 1fr)`, padding 8px 0 40px. Each column padding 0 24px, with a 1px #ddd left border between columns. First column: "Overall rating" + 5 bars (label 12px, 4px track #ebebeb radius 2, #222 fill; widths come from the markup's inline style — copy them). Other columns: label 14px medium mb 12, value 18px medium mb 8, 32px icon (inline SVGs from markup).
- ≤1128px: grid becomes 2 columns, no left borders, column padding 10px 0.

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
._mXHiZG{text-align:center;padding:8px 0 40px}
._IPHKNm{display:flex;align-items:center;justify-content:center;gap:8px}
._IPHKNm img{height:110px}
._acYbbH{font-size:100px;font-weight:500;letter-spacing:-.03em}
._MJJFdY{font-size:22px;font-weight:500;margin-top:8px}
._dVnTwq{font-size:15px;max-width:420px;margin:8px auto 0;line-height:1.35}
._cOOOjN{margin-top:14px;font-size:14px;font-weight:500;text-decoration:underline;background:none;border:none}
._AiEzWi{display:grid;grid-template-columns:1.4fr repeat(6,1fr);gap:0;padding:8px 0 40px}
._ygNjbZ{padding:0 24px}
._ygNjbZ+._ygNjbZ{border-left:1px solid var(--line)}
._ygNjbZ ._GpOufr{font-size:14px;font-weight:500;margin-bottom:12px}
._pWibpC{display:flex;flex-direction:column;gap:3px}
._KehdAH{display:grid;grid-template-columns:8px 1fr;gap:10px;align-items:center}
._KehdAH ._XNAevj{font-size:12px;color:#222}
._qsXuOf{height:4px;background:var(--line-soft);border-radius:2px;overflow:hidden}
._yIfKfd{height:100%;background:#222}
._ygNjbZ ._kkCObW{font-size:18px;font-weight:500;margin-bottom:8px}
._ygNjbZ .ico{width:32px;height:32px;color:#222}

/* @media (max-width:1128px) */
._AiEzWi{grid-template-columns:1fr 1fr}
._ygNjbZ{border-left:none!important;padding:10px 0}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._mXHiZG 1120x313
  div._IPHKNm 1120x143
    img. 72x110
    div._acYbbH 187x143 "4.95"
    img. 72x110
  div._MJJFdY 1120x31 "Guest favourite"
  div._dVnTwq 420x41 "This home is a guest favourite based on "
  button._cOOOjN 132x20 "How reviews work"
div._AiEzWi 1120x178
  div._ygNjbZ 211x130
    div._GpOufr 163x20 "Overall rating"
    div._pWibpC 163x98
      div._KehdAH 163x17
        span._XNAevj 8x17 "5"
        div._qsXuOf 145x4
          div._yIfKfd 138x4
      div._KehdAH 163x17
        span._XNAevj 8x17 "4"
        div._qsXuOf 145x4
          div._yIfKfd 7x4
      div._KehdAH 163x17
        span._XNAevj 8x17 "3"
        div._qsXuOf 145x4
          div._yIfKfd 0x4
      div._KehdAH 163x17
        span._XNAevj 8x17 "2"
        div._qsXuOf 145x4
          div._yIfKfd 0x4
      div._KehdAH 163x17
        span._XNAevj 8x17 "1"
        div._qsXuOf 145x4
          div._yIfKfd 0x4
  div._ygNjbZ 151x130
    div._GpOufr 102x20 "Cleanliness"
    div._kkCObW 102x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 151x130
    div._GpOufr 102x20 "Accuracy"
    div._kkCObW 102x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 151x130
    div._GpOufr 102x20 "Check-in"
    div._kkCObW 102x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 154x130
    div._GpOufr 105x20 "Communication"
    div._kkCObW 105x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 151x130
    div._GpOufr 102x20 "Location"
    div._kkCObW 102x26 "4.8"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 151x130
    div._GpOufr 102x20 "Value"
    div._kkCObW 102x26 "4.8"
    div.ico 32x32
      svg. 32x32
```
### Mobile 390px
```
div._mXHiZG 342x313
  div._IPHKNm 342x143
    img. 72x110
    div._acYbbH 187x143 "4.95"
    img. 72x110
  div._MJJFdY 342x31 "Guest favourite"
  div._dVnTwq 342x41 "This home is a guest favourite based on "
  button._cOOOjN 132x20 "How reviews work"
div._AiEzWi 342x551
  div._ygNjbZ 171x150
    div._GpOufr 171x20 "Overall rating"
    div._pWibpC 171x98
      div._KehdAH 171x17
        span._XNAevj 8x17 "5"
        div._qsXuOf 153x4
          div._yIfKfd 145x4
      div._KehdAH 171x17
        span._XNAevj 8x17 "4"
        div._qsXuOf 153x4
          div._yIfKfd 8x4
      div._KehdAH 171x17
        span._XNAevj 8x17 "3"
        div._qsXuOf 153x4
          div._yIfKfd 0x4
      div._KehdAH 171x17
        span._XNAevj 8x17 "2"
        div._qsXuOf 153x4
          div._yIfKfd 0x4
      div._KehdAH 171x17
        span._XNAevj 8x17 "1"
        div._qsXuOf 153x4
          div._yIfKfd 0x4
  div._ygNjbZ 171x150
    div._GpOufr 171x20 "Cleanliness"
    div._kkCObW 171x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 171x118
    div._GpOufr 171x20 "Accuracy"
    div._kkCObW 171x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 171x118
    div._GpOufr 171x20 "Check-in"
    div._kkCObW 171x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 171x118
    div._GpOufr 171x20 "Communication"
    div._kkCObW 171x26 "5.0"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 171x118
    div._GpOufr 171x20 "Location"
    div._kkCObW 171x26 "4.8"
    div.ico 32x32
      svg. 32x32
  div._ygNjbZ 171x118
    div._GpOufr 171x20 "Value"
    div._kkCObW 171x26 "4.8"
    div.ico 32x32
      svg. 32x32
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_mXHiZG"><div class="_IPHKNm"><img src="IMG/78b66008.png" alt=""><div class="_acYbbH">4.95</div><img src="IMG/b6c05494.png" alt=""></div><div class="_MJJFdY">Guest favourite</div><div class="_dVnTwq">This home is a guest favourite based on ratings, reviews and reliability</div><button class="_cOOOjN">How reviews work</button></div>
<div class="_AiEzWi"><div class="_ygNjbZ"><div class="_GpOufr">Overall rating</div><div class="_pWibpC"><div class="_KehdAH"><span class="_XNAevj">5</span><div class="_qsXuOf"><div class="_yIfKfd" style="width:95%"></div></div></div><div class="_KehdAH"><span class="_XNAevj">4</span><div class="_qsXuOf"><div class="_yIfKfd" style="width:5%"></div></div></div><div class="_KehdAH"><span class="_XNAevj">3</span><div class="_qsXuOf"><div class="_yIfKfd" style="width:0%"></div></div></div><div class="_KehdAH"><span class="_XNAevj">2</span><div class="_qsXuOf"><div class="_yIfKfd" style="width:0%"></div></div></div><div class="_KehdAH"><span class="_XNAevj">1</span><div class="_qsXuOf"><div class="_yIfKfd" style="width:0%"></div></div></div></div></div><div class="_ygNjbZ"><div class="_GpOufr">Cleanliness</div><div class="_kkCObW">5.0</div><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z"></path></svg></div></div><div class="_ygNjbZ"><div class="_GpOufr">Accuracy</div><div class="_kkCObW">5.0</div><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z"></path></svg></div></div><div class="_ygNjbZ"><div class="_GpOufr">Check-in</div><div class="_kkCObW">5.0</div><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path></svg></div></div><div class="_ygNjbZ"><div class="_GpOufr">Communication</div><div class="_kkCObW">5.0</div><div class="ico"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="m25.5 3.5c2.2091 0 4 1.79086 4 4v13.8333c0 2.2092-1.7909 4-4 4h-5.8192l-3.6808 4.5-3.6832-4.5h-5.8168c-2.20914 0-4-1.7908-4-4v-13.8333c0-2.20914 1.79086-4 4-4z" fill="none"></path></svg></div></div><div class="_ygNjbZ"><div class="_GpOufr">Location</div><div class="_kkCObW">4.8</div><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z"></path></svg></div></div><div class="_ygNjbZ"><div class="_GpOufr">Value</div><div class="_kkCObW">4.8</div><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg></div></div></div>
```
