# DescriptionAndSleep Specification

## Overview
- **Target file:** `src/components/listing/DescriptionAndSleep.tsx`
- **Screenshots:**
- `docs/design-references/sections/left-1440.png`
- `docs/design-references/sections/left-390.png`
- **Interaction model:** click-driven (Show more toggles the description)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Description block `._YidPyi` has inline `border-top:1px solid #ebebeb` in the original → apply as class.
- Translation notice: grey100 box radius 12, padding 16px 18px, "Some info has been automatically translated. " + underlined medium link "Show original" (href="#").
- Description paragraph 16px/1.5, `white-space: pre-line`; collapsed state: `max-height: 6.2em; overflow: hidden; mask-image: linear-gradient(#000 62%, transparent)` (use `[mask-image:linear-gradient(#000_62%,transparent)]`).
- "Show more" button (16px medium underlined, underline-offset 3px, 14px chevron) — **inferred behavior:** toggles the paragraph to fully expanded (no max-height, no mask) and the label to "Show less".
- "Where you'll sleep" (`._QZaLue` = padding 32px 0 + top border #ebebeb): h2 22px/26px medium mb 24; two cards in a 2-col grid gap 16; image aspect 3/2, radius 8, 1px card-border; title 15px medium mt 14; sub 14px muted2. Images `IMG/967e6ad6.jpg`, `IMG/42cd77d9.jpg`. ≤743px → 1 column.

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
._QZaLue{padding:32px 0;border-top:1px solid var(--line-soft)}
._XZmvOH{font-size:22px;line-height:26px;font-weight:500;margin-bottom:24px}
._yWMtoE{display:flex;align-items:center;gap:10px;background:var(--grey100);border-radius:12px;padding:16px 18px;font-size:14px;color:#222;margin-bottom:8px}
._yWMtoE a{text-decoration:underline;font-weight:500}
._YidPyi{padding:26px 0 32px}
._YidPyi p{font-size:16px;line-height:1.5;white-space:pre-line}
._YidPyi ._kfKUOt{max-height:6.2em;overflow:hidden;-webkit-mask-image:linear-gradient(#000 62%,transparent);mask-image:linear-gradient(#000 62%,transparent)}
._yWwrkC{background:none;border:none;padding:0;margin-top:14px;font-size:16px;font-weight:500;color:#222;text-decoration:underline;text-underline-offset:3px;display:inline-flex;align-items:center;gap:6px}
._yWwrkC ._VUbbfz{width:14px;height:14px}
._OaaNpZ{display:grid;grid-template-columns:1fr 1fr;gap:16px}
._nSlVqJ img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:8px;border:1px solid var(--card-border);display:block}
._nSlVqJ ._JwWFHq{font-size:15px;font-weight:500;margin-top:14px}
._nSlVqJ ._joNbzi{font-size:14px;color:var(--muted2);margin-top:2px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._YidPyi 652x253
  div._yWMtoE 652x52
    span. 380x20 "Some info has been automatically transla"
      a. 88x18 "Show original"
  p._kfKUOt 652x99 "🌴 Plan Your Relaxing Holiday at Amor De"
  button._yWwrkC 104x21 "Show more"
    span._VUbbfz 14x14
      svg. 14x14
div._QZaLue 652x384
  h2._XZmvOH 652x26 "Where you'll sleep"
  div._OaaNpZ 652x269
    div._nSlVqJ 318x269
      img. 318x212
      div._JwWFHq 318x21 "Bedroom"
      div._joNbzi 318x20 "1 double bed"
    div._nSlVqJ 318x269
      img. 318x212
      div._JwWFHq 318x21 "Living room"
      div._joNbzi 318x20 "1 sofa"
```
### Mobile 390px
```
div._YidPyi 342x273
  div._yWMtoE 342x72
    span. 306x40 "Some info has been automatically transla"
      a. 88x18 "Show original"
  p._kfKUOt 342x99 "🌴 Plan Your Relaxing Holiday at Amor De"
  button._yWwrkC 104x21 "Show more"
    span._VUbbfz 14x14
      svg. 14x14
div._QZaLue 342x702
  h2._XZmvOH 342x26 "Where you'll sleep"
  div._OaaNpZ 342x587
    div._nSlVqJ 342x285
      img. 342x228
      div._JwWFHq 342x21 "Bedroom"
      div._joNbzi 342x20 "1 double bed"
    div._nSlVqJ 342x285
      img. 342x228
      div._JwWFHq 342x21 "Living room"
      div._joNbzi 342x20 "1 sofa"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_YidPyi" style="border-top:1px solid var(--line-soft)"><div class="_yWMtoE"><span>Some info has been automatically translated. <a href="#">Show original</a></span></div><p id="descText" class="_kfKUOt">🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴</p><button class="_yWwrkC" id="descMore">Show more <span class="_VUbbfz"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg></span></button></div>
<div class="_QZaLue"><h2 class="_XZmvOH">Where you'll sleep</h2><div class="_OaaNpZ"><div class="_nSlVqJ"><img src="IMG/967e6ad6.jpg" alt=""><div class="_JwWFHq">Bedroom</div><div class="_joNbzi">1 double bed</div></div><div class="_nSlVqJ"><img src="IMG/42cd77d9.jpg" alt=""><div class="_JwWFHq">Living room</div><div class="_joNbzi">1 sofa</div></div></div></div>
```
