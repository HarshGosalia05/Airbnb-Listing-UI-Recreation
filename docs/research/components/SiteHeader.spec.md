# SiteHeader Specification

## Overview
- **Target file:** `src/components/listing/SiteHeader.tsx`
- **Screenshots:**
- `docs/design-references/sections/header-1440.png`
- `docs/design-references/sections/header-390.png`
- **Interaction model:** static (hover states only)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- `<header>` is in normal flow (position:relative, z-index 50), NOT sticky. Full width with 80px side padding; inner grid `1fr auto 1fr`, height 88px, plus 1px bottom border (#ebebeb) → 89px total.
- Logo: the Airbnb wordmark SVG (viewBox 0 0 3490 1080) at height 32px, colour rausch via `currentColor`. Link href="#", aria-label "Airbnb homepage".
- Search pill: first button contains the house image `IMG/e686c455.png` (48x48, margin-left -6px) then "Anywhere". Separators are 1x24 #ddd spans. "Add guests" is muted2 and weight 400.
- Search circle `._HEUMtF`: 32px rausch circle whose `::before` draws a white magnifier. The original used a data-URI background image: use this inline SVG instead, centred at 14x14, white: `<svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="4"><path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"/></svg>` (render as an absolutely-centred 14px child span instead of ::before).
- Right nav: "Become a host" (hidden ≤743px along with the search pill), globe button, hamburger button (both 40px grey200 circles, 16px icons).
- Skip link: `<a href="#main" class>` "Skip to content" positioned absolute left:-999px, becomes left:0 on focus (see `._DLLasj`). Render it as the first child of the header component.
- Hover: pill shadow 0 1px 4px #00000014 → 0 2px 8px #0000001f (.2s ease); "Become a host" gets grey100 bg; circle buttons grey200 → grey300 (.18s).

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
._Ugwssa{position:relative;z-index:50;border-bottom:1px solid var(--line-soft);background:#fff;padding:0 80px}
._HaGluF{max-width:1760px;margin:0 auto;height:88px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.logo{display:inline-flex;align-items:center;color:var(--rausch);justify-self:start}
._QEBUFh{display:block;height:32px}
._EnWgNg{justify-self:center;display:inline-flex;align-items:center;height:48px;padding:0 8px;border:1px solid var(--line);border-radius:40px;box-shadow:0 1px 4px #00000014;background:#fff;transition:box-shadow .2s ease}
._EnWgNg:hover{box-shadow:0 2px 8px #0000001f}
._LkdOyD{border:none;background:none;padding:0 16px;height:48px;font-size:14px;font-weight:500;display:inline-flex;align-items:center;gap:8px;border-radius:40px}
._LkdOyD._finVTK{color:var(--muted2);font-weight:400}
._yKYFjj{width:48px;height:48px;object-fit:fill;display:block;margin-left:-6px}
._tYfFja{width:1px;height:24px;background:var(--line)}
._HEUMtF{width:32px;height:32px;border:none;border-radius:50%;background:var(--rausch);margin-left:8px;position:relative}
._HEUMtF:before{content:"";position:absolute;inset:0;background:no-repeat center/14px 14px;background-image:url(<inline image — see notes>)}
._PTMeKT{justify-self:end;display:inline-flex;align-items:center;gap:8px}
._OubFgU{font-size:14px;font-weight:500;padding:12px 14px;border-radius:22px;transition:background .18s}
._OubFgU:hover{background:var(--grey100)}
._CWDueY{width:40px;height:40px;border:none;border-radius:50%;background:var(--grey200);display:inline-flex;align-items:center;justify-content:center;transition:background .18s;color:#222}
._CWDueY span{width:16px;height:16px;display:inline-block}
._CWDueY:hover{background:var(--grey300)}
._CDwKNg span{width:16px;height:16px}

/* @media (max-width:743px) */
._EnWgNg,._OubFgU{display:none}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
header._Ugwssa 1440x89
  div._HaGluF 1280x88
    a.logo 103x32
      span._QEBUFh 103x32
        svg. 103x32
    div._EnWgNg 404x48
      button._LkdOyD 149x48 "Anywhere"
        img._yKYFjj 48x48
      span._tYfFja 1x24
      button._LkdOyD 88x48 "Anytime"
      span._tYfFja 1x24
      button._LkdOyD._finVTK 106x48 "Add guests"
      button._HEUMtF 32x32
    nav._PTMeKT 221x44
      a._OubFgU 125x44 "Become a host"
      button._CWDueY 40x40
        span. 16x16
          svg. 16x16
      button._CWDueY._CDwKNg 40x40
        span. 16x16
          svg. 16x16
```
### Mobile 390px
```
header._Ugwssa 390x89
  div._HaGluF 230x88
    a.logo 103x32
      span._QEBUFh 103x32
        svg. 103x32
    div._EnWgNg (display:none)
    nav._PTMeKT 88x40
      a._OubFgU (display:none)
      button._CWDueY 40x40
        span. 16x16
          svg. 16x16
      button._CWDueY._CDwKNg 40x40
        span. 16x16
          svg. 16x16
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<header class="_Ugwssa" id="siteHeader"><div class="_HaGluF"><a class="logo" href="#" aria-label="Airbnb homepage"><span class="_QEBUFh"><svg viewBox="0 0 3490 1080" style="display:block;height:32px;width:auto;fill:currentColor"><path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z"></path></svg></span></a><div class="_EnWgNg" role="search"><button class="_LkdOyD" type="button"><img class="_yKYFjj" src="IMG/e686c455.png" alt="" aria-hidden="true">Anywhere</button><span class="_tYfFja"></span><button class="_LkdOyD" type="button">Anytime</button><span class="_tYfFja"></span><button class="_LkdOyD _finVTK" type="button">Add guests</button><button class="_HEUMtF" type="button" aria-label="Search"></button></div><nav class="_PTMeKT"><a class="_OubFgU" href="#">Become a host</a><button class="_CWDueY" type="button" aria-label="Choose a language and currency"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path></svg></span></button><button class="_CWDueY _CDwKNg" type="button" aria-label="Main navigation menu"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:3;overflow:visible"><g fill="none"><path d="M2 16h28M2 24h28M2 8h28"></path></g></svg></span></button></nav></div></header>
```
