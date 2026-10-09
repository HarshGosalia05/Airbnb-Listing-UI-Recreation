# PhotoGallery Specification

## Overview
- **Target file:** `src/components/listing/PhotoGallery.tsx`
- **Screenshots:**
- `docs/design-references/sections/gallery-1440.png`
- `docs/design-references/sections/gallery-390.png`
- **Interaction model:** click-driven (opens photo tour)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Wrapper `<section id="photo-gallery" aria-label="Photos of this place">` (use id `photo-gallery` — StickyNav reads it), position relative, margin-bottom 48px.
- Grid: `grid-template-columns: 35fr 17fr 17fr; grid-template-rows: 1fr 1fr; gap 8px; aspect-ratio 1120/494; border-radius 12px; overflow hidden`. First tile spans 2 rows. Images: HERO_PHOTOS from data.ts, object-fit cover, first `loading="eager"`, others lazy.
- Each tile is a button (aria-label "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image N") with a hover darkening overlay (::after transparent → #0000001a, .2s ease) and active scale(.997). Clicking tile N → `openTour()`.
- "Show all photos" button absolute right 24 bottom 24, white, 1px #222 border, radius 8, padding 7px 15px, 12px/16px medium, shadow 0 2px 8px #00000026, GridDotsIcon 15px; hover grey100, active scale(.96). Click → `openTour()`.
- ≤743px: grid becomes a single column, `grid-template-rows: 280px; height: 280px`, only the first tile is shown.

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
._Zndiww{position:relative;margin-bottom:48px}
._DPzomV{display:grid;grid-template-columns:35fr 17fr 17fr;grid-template-rows:1fr 1fr;gap:8px;aspect-ratio:1120/494;border-radius:12px;overflow:hidden}
._toiEJx{position:relative;overflow:hidden;background:#eee;border:none;padding:0;display:block}
._toiEJx:first-child{grid-row:span 2}
._toiEJx img{width:100%;height:100%;object-fit:cover;display:block;transition:filter .2s ease}
._toiEJx:after{content:"";position:absolute;inset:0;background:#0000;transition:background .2s ease}
._toiEJx:hover:after{background:#0000001a}
._toiEJx:active{transform:scale(.997)}
._ujAXFb{position:absolute;right:24px;bottom:24px;display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #222;border-radius:8px;padding:7px 15px;font-size:12px;line-height:16px;font-weight:500;box-shadow:0 2px 8px #00000026;transition:transform .1s,background .15s}
._ujAXFb:hover{background:var(--grey100)}
._ujAXFb:active{transform:scale(.96)}
._Ljuvbv{width:15px;height:15px;display:inline-block}

/* @media (max-width:743px) */
._DPzomV{grid-template-columns:1fr;grid-template-rows:280px;height:280px}
._toiEJx:not(:first-child){display:none}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._Zndiww 1120x494
  div._DPzomV 1120x494
    button._toiEJx 560x494
      img. 560x494
    button._toiEJx 272x243
      img. 272x243
    button._toiEJx 272x243
      img. 272x243
    button._toiEJx 272x243
      img. 272x243
    button._toiEJx 272x243
      img. 272x243
  button._ujAXFb 143x32 "Show all photos"
    span._Ljuvbv 15x15
      svg. 15x15
```
### Mobile 390px
```
section._Zndiww 342x280
  div._DPzomV 635x280
    button._toiEJx 635x288
      img. 635x288
    button._toiEJx (display:none)
    button._toiEJx (display:none)
    button._toiEJx (display:none)
    button._toiEJx (display:none)
  button._ujAXFb 143x32 "Show all photos"
    span._Ljuvbv 15x15
      svg. 15x15
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_Zndiww" id="_Zndiww" aria-label="Photos of this place"><div class="_DPzomV" id="heroGrid"><button class="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 1"><img src="IMG/736a481e.jpg" alt="" decoding="async" loading="eager"></button><button class="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 2"><img src="IMG/dbd1e55f.jpg" alt="" decoding="async" loading="lazy"></button><button class="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 3"><img src="IMG/8a5eaf59.jpg" alt="" decoding="async" loading="lazy"></button><button class="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 4"><img src="IMG/967e6ad6.jpg" alt="" decoding="async" loading="lazy"></button><button class="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 5"><img src="IMG/8626319e.jpg" alt="" decoding="async" loading="lazy"></button></div><button class="_ujAXFb" type="button" id="showAllPhotos"><span class="_Ljuvbv"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path></svg></span> Show all photos</button></section>
```
