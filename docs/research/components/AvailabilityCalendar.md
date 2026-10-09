# AvailabilityCalendar Specification

## Overview
- **Target file:** `src/components/listing/AvailabilityCalendar.tsx`
- **Screenshots:**
- `docs/design-references/sections/left-1440.png`
- `docs/design-references/sections/left-390.png`
- **Interaction model:** click-driven (month paging + date selection)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Section wrapper `._QZaLue` (padding 32px 0, top border #ebebeb). Heading "5 nights in Candolim" 22px medium; sub "18 Oct 2026 - 23 Oct 2026" 14px muted2, mt 6, mb 22.
- Two month grids side by side (grid 1fr 1fr, gap 0 56px; ≤743px single column). Month title 16px medium centred mb 18. Weekday row 12px medium. Day cells: `aspect-ratio:1`, 14px, flex-centred, border-radius 50%.
- Initial state (render exactly this): October 2026 (starts Thursday → 4 empty leading cells) and November 2026 (starts Sunday). Check-in 18 Oct (`._gTtWjP`: #222 circle, white text, with a grey200 half-cell `::before` to the RIGHT at z -1), 19–22 in range (`._lIMKSn`: grey200 bg, square), checkout 23 Oct (`._ifYNOn`: same but half-cell to the LEFT). Blocked days in Nov (`._FXEbnd`: #ddd, line-through): 18–24, 29, 30. Put the day cell in a relatively-positioned container with `isolation:isolate` so the z-index:-1 half-cell stays visible.
- Prev/next month buttons: absolute across the top (top -4px, full width, space-between), 32px circles, hover grey200, 12px chevrons (ChevronLeftSmallIcon / ChevronRightSmallIcon). Clicking shifts both months by one (inferred). Keep blocked days tied to their real dates (Nov 2026).
- Date selection (inferred): clicking an available day when a range exists starts a new check-in; the next later click sets checkout; update the heading ("N nights in Candolim", or "Select checkout date" with the sub "Add your travel dates for exact pricing" while only check-in is set) and sub-line date format "18 Oct 2026 - 23 Oct 2026". Blocked and past-invisible cells are not clickable.
- Footer row (mt 18, space-between): keyboard icon box 30x22 (1px #b0b0b0, radius 4) with the inline 20x14 keyboard SVG; "Clear dates" (14px medium underlined) clears the selection (heading → "Select check-in date", sub → "Add your travel dates for exact pricing").

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
._zAWnNQ ._JwWFHq{font-size:22px;font-weight:500}
._zAWnNQ ._joNbzi{font-size:14px;color:var(--muted2);margin-top:6px;margin-bottom:22px}
._jjUQkB{display:grid;grid-template-columns:1fr 1fr;gap:0 56px;position:relative}
._DSpFpO ._JyICyg{font-size:16px;font-weight:500;text-align:center;margin-bottom:18px}
._VXHyjS{position:absolute;top:-4px;display:flex;justify-content:space-between;width:100%}
._VXHyjS button{width:32px;height:32px;border:none;background:none;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}
._VXHyjS button:hover{background:var(--grey200)}
._VXHyjS .ico{width:12px;height:12px}
._FnrmaC{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:6px}
._FnrmaC span{text-align:center;font-size:12px;font-weight:500;color:#222}
._eeeBPf{display:grid;grid-template-columns:repeat(7,1fr)}
._UHweot{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:14px;position:relative;border-radius:50%}
._UHweot._cvZNKV{visibility:hidden}
._UHweot._FXEbnd{color:#ddd;text-decoration:line-through}
._UHweot._lIMKSn{background:var(--grey200);border-radius:0}
._UHweot._gTtWjP,._UHweot._ifYNOn{background:#222;color:#fff;border-radius:50%}
._UHweot._gTtWjP:before,._UHweot._ifYNOn:before{content:"";position:absolute;top:0;bottom:0;width:50%;background:var(--grey200);z-index:-1}
._UHweot._gTtWjP:before{right:0}
._UHweot._ifYNOn:before{left:0}
._pWGlTJ{display:flex;justify-content:space-between;align-items:center;margin-top:18px}
._ZjQoRK{width:30px;height:22px;border:1px solid #b0b0b0;border-radius:4px;display:inline-flex;align-items:center;justify-content:center}
._WKAkzo{background:none;border:none;font-weight:500;text-decoration:underline;font-size:14px}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._QZaLue 652x461
  div. 652x396
    div._zAWnNQ 652x57
      div._JwWFHq 652x31 "5 nights in Candolim"
      div._joNbzi 652x20 "18 Oct 2026 - 23 Oct 2026"
    div._jjUQkB 652x277
      div._VXHyjS 652x32
        button. 32x32
          span.ico 12x12
        button. 32x32
          span.ico 12x12
      div._DSpFpO 298x277
        div._JyICyg 298x23 "October 2026"
        div._FnrmaC 298x17
          span. 43x17 "S"
          span. 43x17 "M"
          span. 43x17 "T"
          span. 43x17 "W"
          span. 43x17 "T"
          span. 43x17 "F"
          span. 43x17 "S"
        div._eeeBPf 298x213
          div._UHweot._cvZNKV 43x43
          div._UHweot._cvZNKV 43x43
          div._UHweot._cvZNKV 43x43
          div._UHweot._cvZNKV 43x43
          div._UHweot 43x43 "1"
          div._UHweot 43x43 "2"
          div._UHweot 43x43 "3"
          div._UHweot 43x43 "4"
          div._UHweot 43x43 "5"
          div._UHweot 43x43 "6"
          div._UHweot 43x43 "7"
          div._UHweot 43x43 "8"
      div._DSpFpO 298x277
        div._JyICyg 298x23 "November 2026"
        div._FnrmaC 298x17
          span. 43x17 "S"
          span. 43x17 "M"
          span. 43x17 "T"
          span. 43x17 "W"
          span. 43x17 "T"
          span. 43x17 "F"
          span. 43x17 "S"
        div._eeeBPf 298x213
          div._UHweot 43x43 "1"
          div._UHweot 43x43 "2"
          div._UHweot 43x43 "3"
          div._UHweot 43x43 "4"
          div._UHweot 43x43 "5"
          div._UHweot 43x43 "6"
          div._UHweot 43x43 "7"
          div._UHweot 43x43 "8"
          div._UHweot 43x43 "9"
          div._UHweot 43x43 "10"
          div._UHweot 43x43 "11"
          div._UHweot 43x43 "12"
    div._pWGlTJ 652x22
      span._ZjQoRK 30x22
        svg. 20x14
      button._WKAkzo 87x20 "Clear dates"
```
### Mobile 390px
```
div._QZaLue 342x801
  div. 342x736
    div._zAWnNQ 342x57
      div._JwWFHq 342x31 "5 nights in Candolim"
      div._joNbzi 342x20 "18 Oct 2026 - 23 Oct 2026"
    div._jjUQkB 342x617
      div._VXHyjS 342x32
        button. 32x32
          span.ico 12x12
        button. 32x32
          span.ico 12x12
      div._DSpFpO 342x308
        div._JyICyg 342x23 "October 2026"
        div._FnrmaC 342x17
          span. 49x17 "S"
          span. 49x17 "M"
          span. 49x17 "T"
          span. 49x17 "W"
          span. 49x17 "T"
          span. 49x17 "F"
          span. 49x17 "S"
        div._eeeBPf 342x244
          div._UHweot._cvZNKV 49x49
          div._UHweot._cvZNKV 49x49
          div._UHweot._cvZNKV 49x49
          div._UHweot._cvZNKV 49x49
          div._UHweot 49x49 "1"
          div._UHweot 49x49 "2"
          div._UHweot 49x49 "3"
          div._UHweot 49x49 "4"
          div._UHweot 49x49 "5"
          div._UHweot 49x49 "6"
          div._UHweot 49x49 "7"
          div._UHweot 49x49 "8"
      div._DSpFpO 342x308
        div._JyICyg 342x23 "November 2026"
        div._FnrmaC 342x17
          span. 49x17 "S"
          span. 49x17 "M"
          span. 49x17 "T"
          span. 49x17 "W"
          span. 49x17 "T"
          span. 49x17 "F"
          span. 49x17 "S"
        div._eeeBPf 342x244
          div._UHweot 49x49 "1"
          div._UHweot 49x49 "2"
          div._UHweot 49x49 "3"
          div._UHweot 49x49 "4"
          div._UHweot 49x49 "5"
          div._UHweot 49x49 "6"
          div._UHweot 49x49 "7"
          div._UHweot 49x49 "8"
          div._UHweot 49x49 "9"
          div._UHweot 49x49 "10"
          div._UHweot 49x49 "11"
          div._UHweot 49x49 "12"
    div._pWGlTJ 342x22
      span._ZjQoRK 30x22
        svg. 20x14
      button._WKAkzo 87x20 "Clear dates"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_QZaLue"><div><div class="_zAWnNQ"><div class="_JwWFHq">5 nights in Candolim</div><div class="_joNbzi">18 Oct 2026 - 23 Oct 2026</div></div><div class="_jjUQkB"><div class="_VXHyjS"><button aria-label="Previous month"><span class="ico"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg></span></button><button aria-label="Next month"><span class="ico"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg></span></button></div><div class="_DSpFpO"><div class="_JyICyg">October 2026</div><div class="_FnrmaC"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div><div class="_eeeBPf"><div class="_UHweot _cvZNKV"></div><div class="_UHweot _cvZNKV"></div><div class="_UHweot _cvZNKV"></div><div class="_UHweot _cvZNKV"></div><div class="_UHweot">1</div><div class="_UHweot">2</div><div class="_UHweot">3</div><div class="_UHweot">4</div><div class="_UHweot">5</div><div class="_UHweot">6</div><div class="_UHweot">7</div><div class="_UHweot">8</div><div class="_UHweot">9</div><div class="_UHweot">10</div><div class="_UHweot">11</div><div class="_UHweot">12</div><div class="_UHweot">13</div><div class="_UHweot">14</div><div class="_UHweot">15</div><div class="_UHweot">16</div><div class="_UHweot">17</div><div class="_UHweot _gTtWjP">18</div><div class="_UHweot _lIMKSn">19</div><div class="_UHweot _lIMKSn">20</div><div class="_UHweot _lIMKSn">21</div><div class="_UHweot _lIMKSn">22</div><div class="_UHweot _ifYNOn">23</div><div class="_UHweot">24</div><div class="_UHweot">25</div><div class="_UHweot">26</div><div class="_UHweot">27</div><div class="_UHweot">28</div><div class="_UHweot">29</div><div class="_UHweot">30</div><div class="_UHweot">31</div></div></div><div class="_DSpFpO"><div class="_JyICyg">November 2026</div><div class="_FnrmaC"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div><div class="_eeeBPf"><div class="_UHweot">1</div><div class="_UHweot">2</div><div class="_UHweot">3</div><div class="_UHweot">4</div><div class="_UHweot">5</div><div class="_UHweot">6</div><div class="_UHweot">7</div><div class="_UHweot">8</div><div class="_UHweot">9</div><div class="_UHweot">10</div><div class="_UHweot">11</div><div class="_UHweot">12</div><div class="_UHweot">13</div><div class="_UHweot">14</div><div class="_UHweot">15</div><div class="_UHweot">16</div><div class="_UHweot">17</div><div class="_UHweot _FXEbnd">18</div><div class="_UHweot _FXEbnd">19</div><div class="_UHweot _FXEbnd">20</div><div class="_UHweot _FXEbnd">21</div><div class="_UHweot _FXEbnd">22</div><div class="_UHweot _FXEbnd">23</div><div class="_UHweot _FXEbnd">24</div><div class="_UHweot">25</div><div class="_UHweot">26</div><div class="_UHweot">27</div><div class="_UHweot">28</div><div class="_UHweot _FXEbnd">29</div><div class="_UHweot _FXEbnd">30</div></div></div></div><div class="_pWGlTJ"><span class="_ZjQoRK" aria-hidden="true"><svg viewBox="0 0 32 22" width="20" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="1" width="30" height="20" rx="3"></rect><path d="M6 7h.01M11 7h.01M16 7h.01M21 7h.01M26 7h.01M6 12h.01M26 12h.01M9 16h14"></path></svg></span><button class="_WKAkzo">Clear dates</button></div></div></div>
```
