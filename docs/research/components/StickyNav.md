# StickyNav Specification

## Overview
- **Target file:** `src/components/listing/StickyNav.tsx`
- **Screenshots:**
- `docs/design-references/sections/stickynav-1440.png`
- **Interaction model:** scroll-driven (window scroll listener)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Fixed bar (top 0, z-index 45, white, 1px bottom border #ebebeb), hidden by default: `transform: translateY(-100%); opacity:0; pointer-events:none; transition: transform .25s ease, opacity .25s ease`.
- **Trigger (inferred — original JS was stripped from the save):** visible (`translateY(0); opacity:1; pointer-events:auto`) once `window.scrollY` is past the bottom of the photo gallery (element id `photo-gallery`, i.e. `gallery.getBoundingClientRect().bottom < 0`). Listen to scroll with `{ passive: true }` and also evaluate on mount. Set `aria-hidden` accordingly.
- Links: Photos → `#photos`, Amenities → `#amenities`, Reviews → `#reviews`, Location → `#location`. Scroll-spy: the active link gets class state `._KOWlKT` (a 2px #222 underline 8px in from each side, 12px from the bottom). Active = the last of those sections whose top is ≤ 80px from the viewport top (fallback Photos). Clicking a link smooth-scrolls to the section (html already has scroll-behavior:smooth); offset so the section top lands just under the 66px bar (call `window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 66, behavior: 'smooth' })` and preventDefault).
- Right side: price block (right-aligned, 13px/1.2): "₹28,499" (15px medium) + " for 5 nights"; second line: star mask icon 11px (use StarIcon at 11x11, vertical-align -1px) + " 4.95 · 19 reviews". Reserve button: gradient pill, 40px tall, 14px, padding 0 20px, hover → reserve-hover gradient, active scale(.985). Clicking Reserve scrolls to top smoothly (inferred).
- The whole bar's inner container is max-width 1280px, padding 0 80px, height 66px, flex space-between. No responsive rules apply to it.

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
._JXzroy{position:fixed;top:0;left:0;right:0;z-index:45;background:#fff;border-bottom:1px solid var(--line-soft);transform:translateY(-100%);opacity:0;pointer-events:none;transition:transform .25s ease,opacity .25s ease}
._Zudfyi{max-width:var(--container);margin:0 auto;padding:0 80px;height:66px;display:flex;align-items:center;justify-content:space-between}
._hCwPJL{display:flex;gap:4px}
._hCwPJL a{font-size:14px;font-weight:500;padding:22px 8px;position:relative;color:#222}
._hCwPJL a:hover{color:#000}
._hCwPJL a._KOWlKT:after{content:"";position:absolute;left:8px;right:8px;bottom:12px;height:2px;background:#222}
._YRQCMM{display:flex;align-items:center;gap:20px}
._KQgxsf{text-align:right;font-size:13px;line-height:1.2}
._aykCAY{font-weight:500;font-size:15px}
._FVmwas{color:#222}
._CBhLfH{color:#222;font-size:13px;margin-top:2px}
._QdaeUh{display:inline-block;width:11px;height:11px;vertical-align:-1px;background:currentColor;-webkit-mask:no-repeat center/contain;mask:no-repeat center/contain;-webkit-mask-image:url(<inline svg — see notes>);mask-image:url(<inline svg — see notes>)}
._NhmiWB{border:none;color:#fff;background:var(--reserve);font-size:16px;font-weight:500;border-radius:999px;padding:0 24px;height:48px;transition:filter .15s,transform .05s}
._NhmiWB:hover{background:var(--reserve-hover)}
._NhmiWB:active{transform:scale(.985)}
._jCniyC{height:40px;font-size:14px;padding:0 20px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._JXzroy 1440x67
  div._Zudfyi 1280x66
    nav._hCwPJL 300x64
      a._KOWlKT 62x64 "Photos"
      a. 83x64 "Amenities"
      a. 70x64 "Reviews"
      a. 73x64 "Location"
    div._YRQCMM 240x40
      div._KQgxsf 127x36
        div. 127x18
          span._aykCAY 57x19 "₹28,499"
          span._FVmwas 68x17 "for 5 nights"
        div._CBhLfH 127x16 "4.95 ·"
          span._QdaeUh 11x11
          span.sn-reviews 62x17 "19 reviews"
      button._NhmiWB._jCniyC 93x40 "Reserve"
```
### Mobile 390px
```
div._JXzroy 390x67
  div._Zudfyi 390x66
    nav._hCwPJL 300x64
      a._KOWlKT 62x64 "Photos"
      a. 83x64 "Amenities"
      a. 70x64 "Reviews"
      a. 73x64 "Location"
    div._YRQCMM 170x98
      div._KQgxsf 57x98
        div. 57x49
          span._aykCAY 57x19 "₹28,499"
          span._FVmwas 37x33 "for 5 nights"
        div._CBhLfH 57x47 "4.95 ·"
          span._QdaeUh 11x11
          span.sn-reviews 46x33 "19 reviews"
      button._NhmiWB._jCniyC 93x40 "Reserve"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_JXzroy" id="_JXzroy" aria-hidden="true"><div class="_Zudfyi"><nav class="_hCwPJL" aria-label="Listing sections"><a href="#photos" data-target="photos" class="_KOWlKT">Photos</a><a href="#amenities" data-target="amenities">Amenities</a><a href="#reviews" data-target="reviews">Reviews</a><a href="#location" data-target="location">Location</a></nav><div class="_YRQCMM"><div class="_KQgxsf"><div><span class="_aykCAY">₹28,499</span> <span class="_FVmwas">for 5 nights</span></div><div class="_CBhLfH"><span class="_QdaeUh" aria-hidden="true"></span> 4.95 · <span class="sn-reviews">19 reviews</span></div></div><button class="_NhmiWB _jCniyC" type="button">Reserve</button></div></div></div>
```
