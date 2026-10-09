# Lightbox Specification

## Overview
- **Target file:** `src/components/listing/Lightbox.tsx`
- **Screenshots:**
- `docs/design-references/sections/lightbox-1440.png`
- `docs/design-references/sections/lightbox-390.png`
- **Interaction model:** click-driven overlay (+ keyboard arrows)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Always rendered; open when `lightboxIndex !== null`. Closed: `opacity:0; visibility:hidden; transition: opacity .25s ease, visibility 0s linear .25s`; open: `opacity:1; visibility:visible; transition: opacity .25s ease, visibility 0s` (inferred). Fixed inset 0, z 140, white, flex centre. role dialog, aria-modal, aria-label "Photo viewer".
- Header (absolute top, 72px, padding 0 24px, z 3): left grid button (GridDotsIcon, 40px ghost round, margin-left -8px, aria-label "Show all photos") → `closeLightbox()` (returns to the tour underneath). Centre title (16px medium, absolute centred) = the photo's room name (`ALL_TOUR_PHOTOS[i].room`). Right group gap 12: counter "{i+1} / 43" (14px) and Close button (CloseIcon) → `closeLightbox()`.
- Stage `._VPKRNC`: full size, padding 88px 96px (≤743px: 80px 12px), flex centre; the image is `max-width:100%; max-height:100%; object-fit:contain` of `ALL_TOUR_PHOTOS[i].src`.
- Prev/next: 40px round buttons with 1px #222 border, white, absolute vertically centred at left 20 / right 20, z 3, 18px ChevronLeftStrokeIcon/ChevronRightStrokeIcon strokeWidth 4; hover grey100; active `translateY(-50%) scale(.92)`; disabled at the ends (opacity .28, border #ccc, no hover). ArrowLeft/ArrowRight keys navigate while open.

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
._bNHEUf{width:40px;height:40px;border:none;background:transparent;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;transition:background .16s,transform .08s}
._bNHEUf span{width:18px;height:18px;display:inline-block}
._bNHEUf:hover{background:var(--grey200)}
._bNHEUf:active{transform:scale(.9)}
._zFbfbh{position:fixed;inset:0;z-index:140;background:#fff;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .25s ease,visibility 0s linear .25s}
._LWXeEY{position:absolute;top:0;left:0;right:0;height:72px;display:flex;align-items:center;padding:0 24px;z-index:3}
._CscuGL{margin-left:-8px}
._QIemms{position:absolute;left:50%;transform:translate(-50%);font-size:16px;font-weight:500}
._lVGbrm{margin-left:auto;display:flex;align-items:center;gap:12px}
._iRDAKc{font-size:14px}
._VPKRNC{display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:88px 96px}
._KNOVTi{position:absolute;top:50%;transform:translateY(-50%);z-index:3;border:1px solid #222;background:#fff}
._KNOVTi:hover{background:var(--grey100)}
._KNOVTi:active{transform:translateY(-50%) scale(.92)}
._VTIXSd{left:20px}
._VkQoEV{right:20px}
._KNOVTi[disabled]{opacity:.28;cursor:default;border-color:#ccc}
._KNOVTi[disabled]:hover{background:#fff}

/* @media (max-width:743px) */
._VPKRNC{padding:80px 12px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._zFbfbh 1440x900
  header._LWXeEY 1440x72
    button._CscuGL._bNHEUf 40x40
      span. 18x18
        svg. 18x18
    div._QIemms.sf-hidden (display:none)
    div._lVGbrm 40x40
      span._iRDAKc.sf-hidden (display:none)
      button.lb-close._bNHEUf 40x40
        span. 18x18
          svg. 18x18
  button._KNOVTi._VTIXSd._bNHEUf 40x40
    span. 18x18
      svg. 18x18
  div._VPKRNC 1440x900
  button._KNOVTi._VkQoEV._bNHEUf 40x40
    span. 18x18
      svg. 18x18
```
### Mobile 390px
```
div._zFbfbh 390x900
  header._LWXeEY 390x72
    button._CscuGL._bNHEUf 40x40
      span. 18x18
        svg. 18x18
    div._QIemms.sf-hidden (display:none)
    div._lVGbrm 40x40
      span._iRDAKc.sf-hidden (display:none)
      button.lb-close._bNHEUf 40x40
        span. 18x18
          svg. 18x18
  button._KNOVTi._VTIXSd._bNHEUf 40x40
    span. 18x18
      svg. 18x18
  div._VPKRNC 390x900
  button._KNOVTi._VkQoEV._bNHEUf 40x40
    span. 18x18
      svg. 18x18
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_zFbfbh" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo viewer"><header class="_LWXeEY"><button class="_CscuGL _bNHEUf" type="button" aria-label="Show all photos" id="lbGrid"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path></svg></span></button><div class="_QIemms sf-hidden" id="lbTitle"></div><div class="_lVGbrm"><span class="_iRDAKc sf-hidden" id="lbCounter"></span><button class="lb-close _bNHEUf" type="button" aria-label="Close" id="lbClose"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M6 6l20 20M26 6 6 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button></div></header><button class="_KNOVTi _VTIXSd _bNHEUf" type="button" aria-label="Previous" id="lbPrev" disabled=""><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:4;overflow:visible"><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg></span></button><div class="_VPKRNC" id="lbStage"></div><button class="_KNOVTi _VkQoEV _bNHEUf" type="button" aria-label="Next" id="lbNext" disabled=""><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:4;overflow:visible"><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg></span></button></div>
```
