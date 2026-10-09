# BookingSidebar Specification

## Overview
- **Target file:** `src/components/listing/BookingSidebar.tsx`
- **Screenshots:**
- `docs/design-references/sections/aside-1440.png`
- **Interaction model:** scroll (CSS sticky) + static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- `<aside>`: position relative, align-self stretch (it lives in a grid column 372px wide, and must stretch to the full height of the left column so sticky works). Hidden ≤1128px (`display:none`).
- Inner wrapper sticky, top 100px.
- Promo card: 1px #ddd, radius 12, padding 16, gap 12, mb 24. Tag image `IMG/0395b027.svg` 32x32 contain. Text 14px/1.3 "Get 10% off your next stay." <br> underlined medium link "Terms apply". "Claim" button bg #f7f7f7 radius 8, padding 8px 14px, 14px medium, hover grey200.
- Booking card: 1px card-border, radius 12, shadow-card, padding 22px 24px 24px. Price row baseline gap 6 mb 18: "₹28,499" 22px medium underlined (offset 2px) + "for 5 nights" 15px. Date/guest box: 1px #b0b0b0 radius 8 overflow hidden; 2-col top row (CHECK-IN 10/18/2026 | CHECKOUT 10/23/2026) with 1px #b0b0b0 divider; guests row with top border: "GUESTS" / "2 guests" + 16px ChevronDownIcon. Labels 10px bold letter-spacing .04em; values 14px mt 2. Cells padding 10px 12px.
- Free-cancellation pill: centred, grey100 bg, muted2, radius 8, 13px, padding 8, margin 16px 0: "Free cancellation before <b>17 October</b>" (b is #222 medium).
- Reserve button full width, 48px, 16px medium, gradient, radius 999, padding 0 24px, mt 2; hover reserve-hover; active scale(.985). "You won't be charged yet" 14px muted2 centred mt 16.
- Report row (mt 26, centred, gap 8, muted2 14px): 16px flag icon (inline SVG from markup) + underlined link "Report this listing".

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
._NhmiWB{border:none;color:#fff;background:var(--reserve);font-size:16px;font-weight:500;border-radius:999px;padding:0 24px;height:48px;transition:filter .15s,transform .05s}
._NhmiWB:hover{background:var(--reserve-hover)}
._NhmiWB:active{transform:scale(.985)}
._iJTxKe{position:relative;align-self:stretch}
._bUsxCi{position:sticky;top:100px}
._bJChEA{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:24px;background:#fff}
._hbNVom{width:32px;height:32px;flex-shrink:0;object-fit:contain;display:block}
._erTcst{flex:1;font-size:14px;line-height:1.3}
._erTcst a{text-decoration:underline;font-weight:500}
._Spojam{border:none;background:#f7f7f7;border-radius:8px;padding:8px 14px;font-size:14px;font-weight:500}
._Spojam:hover{background:var(--grey200)}
._ehfyuX{border:1px solid var(--card-border);border-radius:12px;box-shadow:var(--shadow-card);padding:22px 24px 24px}
._HEyPzI{display:flex;align-items:baseline;gap:6px;margin-bottom:18px}
._HEyPzI ._AjpxES{font-size:22px;font-weight:500;text-decoration:underline;text-underline-offset:2px}
._HEyPzI ._kNZPIK{font-size:15px;color:#222}
._GLDaPq{border:1px solid #b0b0b0;border-radius:8px;overflow:hidden}
._IJyfOk{display:grid;grid-template-columns:1fr 1fr}
._NdLgZo{padding:10px 12px;border:1px solid transparent}
._NdLgZo+._NdLgZo{border-left:1px solid #b0b0b0}
._FiFzqL{border-top:1px solid #b0b0b0;padding:10px 12px;display:flex;align-items:center;justify-content:space-between}
._mvnlYS{font-size:10px;font-weight:700;letter-spacing:.04em}
._vUECFC{font-size:14px;margin-top:2px}
._SrOOll{width:16px;height:16px}
._MMdioP{text-align:center;background:var(--grey100);color:var(--muted2);border-radius:8px;font-size:13px;padding:8px;margin:16px 0}
._MMdioP b{color:#222;font-weight:500}
._YkNyTO{width:100%;margin-top:2px}
._mtuwgH{text-align:center;font-size:14px;color:var(--muted2);margin-top:16px}
._jcEuOw{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:26px;color:var(--muted2);font-size:14px}
._jcEuOw .ico{width:16px;height:16px}
._jcEuOw a{text-decoration:underline}

/* @media (max-width:1128px) */
._iJTxKe{display:none}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
aside._iJTxKe 372x2016
  div._bUsxCi 372x508
    div._bJChEA 372x70
      img._hbNVom 32x32
      div._erTcst 217x36 "Get 10% off your next stay."
        br. 0x18
        a. 80x18 "Terms apply"
      button._Spojam 65x34 "Claim"
    div._ehfyuX 372x368
      div._HEyPzI 322x31
        span._AjpxES 83x31 "₹28,499"
        span._kNZPIK 78x21 "for 5 nights"
      div._GLDaPq 322x118
        div._IJyfOk 320x58
          div._NdLgZo 160x58
          div._NdLgZo 160x58
        div._FiFzqL 320x57
          div. 54x36
          span._SrOOll 16x16
      div._MMdioP 322x35 "Free cancellation before"
        b. 68x17 "17 October"
      button._NhmiWB._YkNyTO 322x48 "Reserve"
      div._mtuwgH 322x20 "You won't be charged yet"
    div._jcEuOw 372x20
      span.ico 16x16
        svg. 16x16
      a. 113x20 "Report this listing"
```
### Mobile 390px
```
aside._iJTxKe (display:none)
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<aside class="_iJTxKe"><div class="_bUsxCi" id="bookingSticky"><div class="_bJChEA"><img class="_hbNVom" src="IMG/0395b027.svg" alt="" aria-hidden="true"><div class="_erTcst">Get 10% off your next stay.<br><a href="#">Terms apply</a></div><button class="_Spojam" type="button">Claim</button></div><div class="_ehfyuX"><div class="_HEyPzI"><span class="_AjpxES">₹28,499</span><span class="_kNZPIK">for 5 nights</span></div><div class="_GLDaPq"><div class="_IJyfOk"><div class="_NdLgZo"><div class="_mvnlYS">CHECK-IN</div><div class="_vUECFC">10/18/2026</div></div><div class="_NdLgZo"><div class="_mvnlYS">CHECKOUT</div><div class="_vUECFC">10/23/2026</div></div></div><div class="_FiFzqL"><div><div class="_mvnlYS">GUESTS</div><div class="_vUECFC">2 guests</div></div><span class="_SrOOll"><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M4 10l12 12 12-12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div></div><div class="_MMdioP">Free cancellation before <b>17 October</b></div><button class="_NhmiWB _YkNyTO" type="button" id="reserveBtn">Reserve</button><div class="_mtuwgH">You won't be charged yet</div></div><div class="_jcEuOw"><span class="ico"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z"></path></svg></span><a href="#">Report this listing</a></div></div></aside>
```
