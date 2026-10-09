# ListingTitle Specification

## Overview
- **Target file:** `src/components/listing/ListingTitle.tsx`
- **Screenshots:**
- `docs/design-references/sections/title-1440.png`
- `docs/design-references/sections/title-390.png`
- **Interaction model:** click-driven (Share/Save)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- `<section id="photos">` — keep this id (StickyNav targets it).
- h1 26px/30px medium. Share / Save buttons: 16px icons, underlined labels (underline-offset 2px), padding 8px 10px, radius 8px, hover grey200, active scale(.96).
- Share → `share()` from useListingUI (copies URL, shows "Link copied" toast). Save → `toggleSaved()`; when `saved` is true the heart is filled (HeartIcon filled) and the label reads "Saved" (inferred saved state).

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
._DbxOEt{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:32px 0 18px}
._WQsVLm{font-size:26px;line-height:30px;font-weight:500;letter-spacing:normal}
._aZSeca{display:flex;gap:2px;flex-shrink:0}
._EmrQRK{border:none;background:none;display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;font-size:14px;font-weight:500;transition:background .15s,transform .05s}
._EmrQRK:hover{background:var(--grey200)}
._EmrQRK:active{transform:scale(.96)}
._oQmVpq{width:16px;height:16px;display:inline-block}
._uOQIyx{text-decoration:underline;text-underline-offset:2px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._DbxOEt 1120x84
  h1._WQsVLm 602x30 "Romantic Jacuzzi 1BHK Candolim | Mirashy"
  div._aZSeca 158x34
    button._EmrQRK 81x34
      span._oQmVpq 16x16
        svg. 16x16
      span._uOQIyx 37x18 "Share"
    button._EmrQRK 75x34
      span._oQmVpq 16x16
        svg. 16x16
      span._uOQIyx 31x18 "Save"
```
### Mobile 390px
```
section._DbxOEt 342x200
  h1._WQsVLm 168x150 "Romantic Jacuzzi 1BHK Candolim | Mirashy"
  div._aZSeca 158x34
    button._EmrQRK 81x34
      span._oQmVpq 16x16
        svg. 16x16
      span._uOQIyx 37x18 "Share"
    button._EmrQRK 75x34
      span._oQmVpq 16x16
        svg. 16x16
      span._uOQIyx 31x18 "Save"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_DbxOEt" id="photos"><h1 class="_WQsVLm">Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1><div class="_aZSeca"><button class="_EmrQRK" type="button" id="shareBtn"><span class="_oQmVpq"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" fill="none"></path></svg></span><span class="_uOQIyx">Share</span></button><button class="_EmrQRK" type="button" id="saveBtn"><span class="_oQmVpq"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z"></path></svg></span><span class="_uOQIyx">Save</span></button></div></section>
```
