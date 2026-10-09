# ThingsToKnow Specification

## Overview
- **Target file:** `src/components/listing/ThingsToKnow.tsx`
- **Screenshots:**
- `docs/design-references/sections/things-1440.png`
- `docs/design-references/sections/things-390.png`
- **Interaction model:** static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Inner fragment of the "Things to know" section (page assembler provides wrapper). h2 22px/26px medium mb 24.
- 3-column grid gap 32 (≤1128px: 1 column, gap 24). Each column: 24px icon mb 18, title 16px medium mb 14, paragraphs 14px/1.5 mb 8, "Learn more" 14px medium underlined link.

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
._qYvLOs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px}
._BTCYex .ico{width:24px;height:24px;color:#222;margin-bottom:18px}
._BTCYex ._JwWFHq{font-size:16px;font-weight:500;margin-bottom:14px}
._BTCYex p{font-size:14px;line-height:1.5;margin-bottom:8px}
._BTCYex ._pKwVzP{font-size:14px;font-weight:500;text-decoration:underline}

/* @media (max-width:1128px) */
._qYvLOs{grid-template-columns:1fr;gap:24px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._WNEjqG 1120x333
  h2._XZmvOH 1120x26 "Things to know"
  div._qYvLOs 1120x186
    div._BTCYex 352x186
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 352x23 "Cancellation policy"
      p. 352x42 "Free cancellation before 17 October. Can"
      p. 352x21 "Review this host’s full policy for detai"
      a._pKwVzP 74x18 "Learn more"
    div._BTCYex 352x186
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 352x23 "House rules"
      p. 352x21 "Check-in after 2:00 pm"
      p. 352x21 "Checkout before 11:00 am"
      p. 352x21 "3 guests maximum"
      a._pKwVzP 74x18 "Learn more"
    div._BTCYex 352x186
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 352x23 "Safety & property"
      p. 352x21 "Carbon monoxide alarm not reported"
      p. 352x21 "Smoke alarm not reported"
      p. 352x21 "Exterior security cameras on property"
      a._pKwVzP 74x18 "Learn more"
```
### Mobile 390px
```
section._WNEjqG 342x745
  h2._XZmvOH 342x26 "Things to know"
  div._qYvLOs 342x598
    div._BTCYex 342x178
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 342x23 "Cancellation policy"
      p. 342x42 "Free cancellation before 17 October. Can"
      p. 342x21 "Review this host’s full policy for detai"
      a._pKwVzP 74x18 "Learn more"
    div._BTCYex 342x186
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 342x23 "House rules"
      p. 342x21 "Check-in after 2:00 pm"
      p. 342x21 "Checkout before 11:00 am"
      p. 342x21 "3 guests maximum"
      a._pKwVzP 74x18 "Learn more"
    div._BTCYex 342x186
      div.ico 24x24
        svg. 24x24
      div._JwWFHq 342x23 "Safety & property"
      p. 342x21 "Carbon monoxide alarm not reported"
      p. 342x21 "Smoke alarm not reported"
      p. 342x21 "Exterior security cameras on property"
      a._pKwVzP 74x18 "Learn more"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_WNEjqG"><h2 class="_XZmvOH">Things to know</h2><div class="_qYvLOs"><div class="_BTCYex"><div class="ico"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m12 0v2h8v-2h2v2h6c1.1045695 0 2 .8954305 2 2v21c0 2.7614237-2.2385763 5-5 5h-18c-2.76142375 0-5-2.2385763-5-5v-21c0-1.1045695.8954305-2 2-2h6v-2zm16 12h-24v13c0 1.6568542 1.34314575 3 3 3h18c1.6568542 0 3-1.3431458 3-3zm-8.2071068 2.2928932 1.4142136 1.4142136-3.7921068 3.7928932 3.7921068 3.7928932-1.4142136 1.4142136-3.7928932-3.7921068-3.7928932 3.7921068-1.4142136-1.4142136 3.7921068-3.7928932-3.7921068-3.7928932 1.4142136-1.4142136 3.7928932 3.7921068zm-9.7928932-10.2928932h-6v6h24v-6h-6v2h-2v-2h-8v2h-2z"></path></svg></div><div class="_JwWFHq">Cancellation policy</div><p>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.</p><p>Review this host’s full policy for details.</p><a class="_pKwVzP" href="#">Learn more</a></div><div class="_BTCYex"><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path></svg></div><div class="_JwWFHq">House rules</div><p>Check-in after 2:00 pm</p><p>Checkout before 11:00 am</p><p>3 guests maximum</p><a class="_pKwVzP" href="#">Learn more</a></div><div class="_BTCYex"><div class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z"></path></svg></div><div class="_JwWFHq">Safety &amp; property</div><p>Carbon monoxide alarm not reported</p><p>Smoke alarm not reported</p><p>Exterior security cameras on property</p><a class="_pKwVzP" href="#">Learn more</a></div></div></section>
```
