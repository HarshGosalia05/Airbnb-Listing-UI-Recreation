# ListingOverview Specification

## Overview
- **Target file:** `src/components/listing/ListingOverview.tsx`
- **Screenshots:**
- `docs/design-references/sections/left-1440.png`
- `docs/design-references/sections/left-390.png`
- **Interaction model:** static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Four stacked blocks from the left column: summary heading, the Guest favourite card, the host row, the three highlights.
- Guest favourite card: 1px #ddd border, radius 16, padding 16px 28px, flex gap 22px. Laurel SVGs are 36px tall (second one mirrored with scaleX(-1)); label "Guest<br>favourite" 15px medium, centred, line-height 1.15. Rating 4.95 (20px bold) with 5 × 10px stars; divider 1x34 #ddd; "19" (20px bold) + "Reviews" (13px medium).
- Host row: avatar `IMG/aa4e82a4.jpg` 46px circle; "Hosted by Mirashya Homes" 16px medium; "2 years hosting" 14px muted2; padding 26px 0.
- Highlights block `._ZOaIER` has an inline style in the original: `border-top:1px solid #ebebeb; padding-top:32px` → apply as classes.

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
._gRekoP{padding:0 0 24px}
._gRekoP h2{font-size:22px;line-height:26px;font-weight:500}
._gRekoP ._ooNURW{font-size:16px;margin-top:6px}
._NIsTQW{border:1px solid var(--line);border-radius:16px;display:flex;align-items:center;gap:22px;padding:16px 28px;margin:8px 0 0}
._pHrBSW{display:flex;align-items:center;gap:4px;flex-shrink:0;color:#222}
._loDmux{height:36px;display:inline-flex;align-items:center}
._loDmux._wJAzrb{transform:scaleX(-1)}
._MiwVlJ{font-size:15px;font-weight:500;line-height:1.15;text-align:center}
._XofkZZ{flex:1;font-size:14px;line-height:1.3}
._HxhaNo{display:flex;align-items:center;gap:22px;flex-shrink:0}
._WpbHyo{text-align:center}
._WpbHyo ._NQUHke{font-size:20px;font-weight:700}
._WpbHyo ._XJKtyD{display:flex;gap:2px;justify-content:center;margin-top:2px;color:#222}
._WpbHyo ._XJKtyD span{width:10px;height:10px}
._WpbHyo ._tAbhrW{font-size:13px;font-weight:500}
._ZOPyus{width:1px;height:34px;background:var(--line)}
._McRwJR{display:flex;align-items:center;gap:16px;padding:26px 0}
._McRwJR ._ahDDBA{width:46px;height:46px;border-radius:50%;object-fit:cover}
._McRwJR ._ZWkpdw{font-size:16px;font-weight:500}
._McRwJR .meta{font-size:14px;color:var(--muted2);margin-top:2px}
._ZOaIER{padding:6px 0 32px;display:flex;flex-direction:column;gap:24px}
._odWCCi{display:flex;gap:24px;align-items:flex-start}
._rCLHzV{width:24px;height:24px;flex-shrink:0;color:#222}
._AmWJrl ._JwWFHq{font-size:14px;font-weight:500;line-height:20px}
._AmWJrl ._joNbzi{font-size:14px;color:var(--muted2);margin-top:2px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._gRekoP 652x79
  h2. 652x26 "Entire serviced apartment in Candolim, I"
  div._ooNURW 652x23 "3 guests · 1 bedroom · 1 bed · 1 bathroo"
div._NIsTQW 652x81
  div._pHrBSW 117x36
    span._loDmux 23x36
      svg. 23x36
    span._MiwVlJ 64x35 "Guest favourite"
      br. 0x19
    span._loDmux._wJAzrb 23x36
      svg. 23x36
  div._XofkZZ 280x36 "One of the most loved homes on Airbnb, a"
  div._HxhaNo 153x47
    div._WpbHyo 58x41
      div._NQUHke 58x29 "4.95"
      div._XJKtyD 58x10
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
    div._ZOPyus 1x34
    div._WpbHyo 50x47
      div._NQUHke 50x29 "19"
      div._tAbhrW 50x19 "Reviews"
div._McRwJR 652x98
  img._ahDDBA 46x46
  div. 204x45
    div._ZWkpdw 204x23 "Hosted by Mirashya Homes"
    div.meta 204x20 "2 years hosting"
div._ZOaIER 652x239
  div._odWCCi 652x42
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 358x42
      div._JwWFHq 358x20 "Outdoor entertainment"
      div._joNbzi 358x20 "The pool and alfresco dining are great f"
  div._odWCCi 652x42
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 272x42
      div._JwWFHq 272x20 "Designed for staying cool"
      div._joNbzi 272x20 "Beat the heat with the A/C and ceiling f"
  div._odWCCi 652x42
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 253x42
      div._JwWFHq 253x20 "Self check-in"
      div._joNbzi 253x20 "You can check in with the building staff"
```
### Mobile 390px
```
div._gRekoP 342x105
  h2. 342x52 "Entire serviced apartment in Candolim, I"
  div._ooNURW 342x23 "3 guests · 1 bedroom · 1 bed · 1 bathroo"
div._NIsTQW 342x161
  div._pHrBSW 117x36
    span._loDmux 23x36
      svg. 23x36
    span._MiwVlJ 64x35 "Guest favourite"
      br. 0x19
    span._loDmux._wJAzrb 23x36
      svg. 23x36
  div._XofkZZ 65x127 "One of the most loved homes on Airbnb, a"
  div._HxhaNo 153x47
    div._WpbHyo 58x41
      div._NQUHke 58x29 "4.95"
      div._XJKtyD 58x10
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
    div._ZOPyus 1x34
    div._WpbHyo 50x47
      div._NQUHke 50x29 "19"
      div._tAbhrW 50x19 "Reviews"
div._McRwJR 342x98
  img._ahDDBA 46x46
  div. 204x45
    div._ZWkpdw 204x23 "Hosted by Mirashya Homes"
    div.meta 204x20 "2 years hosting"
div._ZOaIER 342x259
  div._odWCCi 342x62
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 294x62
      div._JwWFHq 294x20 "Outdoor entertainment"
      div._joNbzi 294x40 "The pool and alfresco dining are great f"
  div._odWCCi 342x42
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 272x42
      div._JwWFHq 272x20 "Designed for staying cool"
      div._joNbzi 272x20 "Beat the heat with the A/C and ceiling f"
  div._odWCCi 342x42
    div._rCLHzV 24x24
      svg. 24x24
    div._AmWJrl 253x42
      div._JwWFHq 253x20 "Self check-in"
      div._joNbzi 253x20 "You can check in with the building staff"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_gRekoP"><h2>Entire serviced apartment in Candolim, India</h2><div class="_ooNURW">3 guests · 1 bedroom · 1 bed · 1 bathroom</div></div>
<div class="_NIsTQW"><div class="_pHrBSW"><span class="_loDmux"><svg style="display:block;height:100%;width:auto" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path></svg></span><span class="_MiwVlJ">Guest<br>favourite</span><span class="_loDmux _wJAzrb"><svg style="display:block;height:100%;width:auto" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path></svg></span></div><div class="_XofkZZ">One of the most loved homes on Airbnb, according to guests</div><div class="_HxhaNo"><div class="_WpbHyo"><div class="_NQUHke">4.95</div><div class="_XJKtyD"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg></span></div></div><div class="_ZOPyus"></div><div class="_WpbHyo"><div class="_NQUHke">19</div><div class="_tAbhrW">Reviews</div></div></div></div>
<div class="_McRwJR"><img class="_ahDDBA" src="IMG/aa4e82a4.jpg" alt=""><div><div class="_ZWkpdw">Hosted by Mirashya Homes</div><div class="meta">2 years hosting</div></div></div>
<div class="_ZOaIER" style="border-top:1px solid var(--line-soft);padding-top:32px"><div class="_odWCCi"><div class="_rCLHzV"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m15.59 1.91 1.02.8C22.17 7.04 25 11.46 25 15.98a8.99 8.99 0 0 1-.5 3.02H31v2h-2v9a1 1 0 0 1-.88 1H4a1 1 0 0 1-1-.88V21H1v-2h6.42c-.28-.9-.42-1.91-.42-3.01 0-2.25 1.1-4.82 3.27-7.75l.27-.35.55-.73 1.78 1.12L15.6 1.9zM27 21H5v8h22v-8zM16.4 5.1l-2.6 6.1-2.21-1.37-.17.24C9.87 12.3 9.07 14.2 9 15.77l-.01.21c0 1.1.17 2.04.48 2.85l.07.17h3a6.1 6.1 0 0 1-.05-.83c0-1.52.86-3.19 2.52-5.07l.24-.27.74-.81.74.8c1.82 2 2.76 3.76 2.76 5.35 0 .3-.02.57-.05.83h3.06l-.14-.07a6.7 6.7 0 0 0 .63-2.95c0-3.42-2.03-6.93-6.17-10.51l-.43-.36zm-.4 9.94-.08.1c-.9 1.14-1.36 2.11-1.41 2.88l-.01.15c0 .35.03.63.09.83h2.82c.06-.2.09-.48.09-.83 0-.79-.46-1.8-1.42-3.04l-.08-.1z"></path></svg></div><div class="_AmWJrl"><div class="_JwWFHq">Outdoor entertainment</div><div class="_joNbzi">The pool and alfresco dining are great for summer trips.</div></div></div><div class="_odWCCi"><div class="_rCLHzV"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M20.33 3.08c1.5 2.24.96 5.55-1.38 9.9l-.12.2.18.18c.1.13.21.26.3.4l.23.38.14.02c.7.06 1.78-.11 2.87-.48.89-.3 1.78-.78 2.68-1.45l.66-.52a3 3 0 0 1 4.77 1.33l.12.44c.59 3.35.02 5.73-1.86 6.98-2.24 1.5-5.54.96-9.9-1.39a3 3 0 0 1-.27-.16l-.07.07-.39.3-.28.19V20c-.03.7.15 1.68.48 2.68.3.88.78 1.78 1.45 2.68l.26.33.26.33a3 3 0 0 1-.36 4.22C19 31 17.95 31 17 31h-.54l-1.39-.1c-1.24-.19-2.56-.65-3.36-1.84-1.5-2.25-.96-5.55 1.39-9.91.04-.09.1-.17.15-.25a4.12 4.12 0 0 1-.37-.4.82.82 0 0 0-.18-.23.5.5 0 0 0-.21-.11c-.7-.1-1.85.06-3.04.46-.88.3-1.78.78-2.68 1.45l-.66.52a3 3 0 0 1-4.77-1.33l-.12-.44c-.59-3.35-.02-5.73 1.86-6.98 2.24-1.5 5.55-.96 9.9 1.38l.1.05c.3-.3.55-.5.72-.61l.2-.13.03-.2c.06-.7-.11-1.78-.48-2.88a9.6 9.6 0 0 0-1.45-2.68l-.52-.66a3 3 0 0 1 1.33-4.77l.44-.12c3.35-.59 5.73-.02 6.98 1.86zm-5.31 16.8-.16.22c-2.04 3.77-2.5 6.45-1.49 7.85 1.13 1.55 4.63 1.55 5.44.77.38-.36.47-.89.2-1.31l-.37-.45a11.94 11.94 0 0 1-2.05-3.64 10.93 10.93 0 0 1-.59-3.03V20h-.14a4.01 4.01 0 0 1-.63-.07l-.21-.05zM4.09 13.52c-1.56 1.13-1.56 4.63-.78 5.44.36.38.9.46 1.32.19l.44-.36c1.2-.96 2.42-1.64 3.65-2.05 1.16-.4 2.33-.6 3.28-.6V16c0-.14 0-.28.02-.42l.08-.46-.16-.12c-3.78-2.03-6.46-2.5-7.85-1.48zm23.24-.36-.45.36c-1.2.96-2.41 1.64-3.64 2.05-1.15.38-2.3.6-3.24.6-.01.25-.05.5-.1.74l-.07.26.19.14c3.77 2.03 6.45 2.5 7.85 1.48 1.55-1.13 1.55-4.63.78-5.44-.36-.38-.9-.47-1.32-.19zM16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13.2 3.39c-.37.36-.46.89-.18 1.31l.36.45c.95 1.2 1.64 2.42 2.05 3.64.37 1.14.59 2.27.59 3.2l.54.05.3.05.2.05.1-.13c2.04-3.77 2.5-6.45 1.49-7.84-1.13-1.56-4.63-1.56-5.44-.78z"></path></svg></div><div class="_AmWJrl"><div class="_JwWFHq">Designed for staying cool</div><div class="_joNbzi">Beat the heat with the A/C and ceiling fan.</div></div></div><div class="_odWCCi"><div class="_rCLHzV"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg></div><div class="_AmWJrl"><div class="_JwWFHq">Self check-in</div><div class="_joNbzi">You can check in with the building staff.</div></div></div></div>
```
