# LocationSection Specification

## Overview
- **Target file:** `src/components/listing/LocationSection.tsx`
- **Screenshots:**
- `docs/design-references/sections/location-1440.png`
- `docs/design-references/sections/location-390.png`
- **Interaction model:** static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- `<section id="location">` — the page assembler provides the section wrapper (`padding 48px 0; border-top`), you output the inner fragment (h2, address, map, notes). Keep the h2 text with the curly apostrophe: "Where you’ll be".
- Map is pure CSS: container 480px tall, radius 12, overflow hidden, bg #e8eef0. Layer `._pLIPHL` = absolutely filled div with background: `radial-gradient(circle at 30% 40%,#cfe3c8 0 6%,transparent 6%), radial-gradient(circle at 70% 60%,#cfe3c8 0 8%,transparent 8%), linear-gradient(115deg,#acd3e6 0 34%,#e9f0e4 34% 100%)`, plus a `::before` grid overlay: `linear-gradient(90deg,rgba(180,180,170,.5) 1px,transparent 1px), linear-gradient(0deg,rgba(180,180,170,.35) 1px,transparent 1px)` at `background-size: 90px 90px` and opacity .5. Use arbitrary `bg-[...]` values (underscores for spaces).
- Centre pin: 56px #222 circle, white house icon (from markup), shadow 0 4px 12px #0000004d. Zoom +/- buttons: top-right stack, 40px white squares radius 8, shadow 0 2px 6px #0003. Search button: top-left 40px white circle.
- Below: "Exact location will be provided after booking." 14px mt 18; "Neighbourhood highlights" 18px medium margin 40px 0 12px; paragraph 15px/1.5; "Show more" (same style as description Show more, with chevron) — inert.

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
._yWwrkC{background:none;border:none;padding:0;margin-top:14px;font-size:16px;font-weight:500;color:#222;text-decoration:underline;text-underline-offset:3px;display:inline-flex;align-items:center;gap:6px}
._yWwrkC ._VUbbfz{width:14px;height:14px}
._WNEjqG{padding:48px 0;border-top:1px solid var(--line-soft)}
._WNEjqG:first-child{border-top:none}
._RzoDdP{font-size:16px;margin-bottom:24px}
._PxCiiz{position:relative;border-radius:12px;overflow:hidden;height:480px;background:#e8eef0}
._pLIPHL{position:absolute;inset:0;background:radial-gradient(circle at 30% 40%,#cfe3c8 0 6%,transparent 6%),radial-gradient(circle at 70% 60%,#cfe3c8 0 8%,transparent 8%),linear-gradient(115deg,#acd3e6 0 34%,#e9f0e4 34% 100%)}
._pLIPHL:before{content:"";position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(180,180,170,.5) 1px,transparent 1px),linear-gradient(0deg,rgba(180,180,170,.35) 1px,transparent 1px);background-size:90px 90px,90px 90px;opacity:.5}
._DhBoQs{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:50%;background:#222;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px #0000004d}
._eBzTKK{position:absolute;right:12px;top:12px;display:flex;flex-direction:column;gap:8px}
._eBzTKK button{width:40px;height:40px;border-radius:8px;border:none;background:#fff;box-shadow:0 2px 6px #0003;display:flex;align-items:center;justify-content:center}
._eBzTKK .ico{width:16px;height:16px}
._vPtpbJ{position:absolute;left:12px;top:12px;width:40px;height:40px;border-radius:50%;background:#fff;box-shadow:0 2px 6px #0003;border:none;display:flex;align-items:center;justify-content:center}
._pYppLa{font-size:14px;color:#222;margin-top:18px}
._uNDbeR{font-size:18px;font-weight:500;margin:40px 0 12px}
._wtMVZA{font-size:15px;line-height:1.5}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._WNEjqG 1120x851
  h2._XZmvOH 1120x26 "Where you’ll be"
  div._RzoDdP 1120x23 "Candolim, Goa, India"
  div._PxCiiz 1120x480
    div._pLIPHL 1120x480
    button._vPtpbJ 40x40
      span. 16x16
        svg. 16x16
    div._eBzTKK 40x88
      button. 40x40
        span.ico 16x16
          svg. 16x16
      button. 40x40
        span.ico 16x16
          svg. 16x16
    div._DhBoQs 56x56
      svg. 56x56
  div._pYppLa 1120x20 "Exact location will be provided after bo"
  div._uNDbeR 1120x26 "Neighbourhood highlights"
  div._wtMVZA 1120x23 "Located in the heart of Candolim, Amor d"
  button._yWwrkC 104x21 "Show more"
    span._VUbbfz 14x14
      svg. 14x14
```
### Mobile 390px
```
section._WNEjqG 342x896
  h2._XZmvOH 342x26 "Where you’ll be"
  div._RzoDdP 342x23 "Candolim, Goa, India"
  div._PxCiiz 342x480
    div._pLIPHL 342x480
    button._vPtpbJ 40x40
      span. 16x16
        svg. 16x16
    div._eBzTKK 40x88
      button. 40x40
        span.ico 16x16
          svg. 16x16
      button. 40x40
        span.ico 16x16
          svg. 16x16
    div._DhBoQs 56x56
      svg. 56x56
  div._pYppLa 342x20 "Exact location will be provided after bo"
  div._uNDbeR 342x26 "Neighbourhood highlights"
  div._wtMVZA 342x68 "Located in the heart of Candolim, Amor d"
  button._yWwrkC 104x21 "Show more"
    span._VUbbfz 14x14
      svg. 14x14
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_WNEjqG" id="location"><h2 class="_XZmvOH">Where you’ll be</h2><div class="_RzoDdP">Candolim, Goa, India</div><div class="_PxCiiz"><div class="_pLIPHL"></div><button class="_vPtpbJ" aria-label="Search"><span style="width:16px;height:16px"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M21 21l7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button><div class="_eBzTKK"><button aria-label="Zoom in"><span class="ico"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M16 6v20M6 16h20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button><button aria-label="Zoom out"><span class="ico"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M6 16h20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button></div><div class="_DhBoQs"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M6 29h20M9 29V15l7-6 7 6v14M13 29v-7h6v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div><div class="_pYppLa">Exact location will be provided after booking.</div><div class="_uNDbeR">Neighbourhood highlights</div><div class="_wtMVZA">Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</div><button class="_yWwrkC" style="margin-top:18px">Show more <span class="_VUbbfz"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg></span></button></section>
```
