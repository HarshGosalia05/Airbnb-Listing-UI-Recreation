# HostSection Specification

## Overview
- **Target file:** `src/components/listing/HostSection.tsx`
- **Screenshots:**
- `docs/design-references/sections/host-1440.png`
- `docs/design-references/sections/host-390.png`
- **Interaction model:** static
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Inner fragment of the "Meet your host" section (page assembler provides section wrapper). h2 22px/26px medium mb 24.
- Layout grid `340px 1fr`, gap 48 (≤1128px: 1 column).
- Host card: 1px card-border, radius 20, shadow-card, grid `1fr 100px`, padding 30px 24px. Avatar `IMG/aa4e82a4.jpg` 88px circle + 28px rausch verified badge (2px white border, bottom 4 right 0) with white check SVG. Name 26px medium ("Mirashya<br>Homes" wraps naturally in the column), "Host" 13px mt 4. Right stats column: left border #ebebeb, padding-left 20: three rows (padding 10px 0, separators #ebebeb): "1,463"/Reviews, "4.68★"/Rating, "2"/Years hosting — values 20px medium, labels 12px.
- Facts under the card (mt 22, gap 14): 24px icons + 15px text: "Born in the 80s", "Where I went to school: NICMAR GOA".
- Right column: "Co-Hosts" 18px medium mb 16; 3-col grid (gap 16px 8px, mb 30) of 34px avatars + 14px names (initial circles for Shruti / Amisha with inline colours from markup). "Host details" 18px medium mb 16; "Response rate: 100%" / "Responds within an hour" 15px/1.6. "Message host" button grey200, radius 8, padding 14px 24px, 15px medium, mt 18, hover grey300. Safety note row: 24px shield icon, 12px muted2 text, mt 30.

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
._UiBrsI{display:grid;grid-template-columns:340px 1fr;gap:48px;align-items:start}
._jdcHSj{border:1px solid var(--card-border);border-radius:20px;box-shadow:var(--shadow-card);display:grid;grid-template-columns:1fr 100px;align-items:center;padding:30px 24px}
._jdcHSj ._FtSmek{text-align:center}
._ynznJE{position:relative;width:88px;height:88px;margin:0 auto 12px}
._ynznJE img{width:88px;height:88px;border-radius:50%;object-fit:cover}
._LRcFYN{position:absolute;right:0;bottom:4px;width:28px;height:28px;border-radius:50%;background:var(--rausch);display:flex;align-items:center;justify-content:center;border:2px solid #fff}
._LRcFYN svg{color:#fff}
._jdcHSj ._IPinhY{font-size:26px;font-weight:500}
._jdcHSj ._kuaAPu{font-size:13px;margin-top:4px}
._MgwXXd{border-left:1px solid var(--line-soft);padding-left:20px}
._uAiafM{padding:10px 0}
._uAiafM+._uAiafM{border-top:1px solid var(--line-soft)}
._uAiafM ._NQUHke{font-size:20px;font-weight:500}
._uAiafM ._tAbhrW{font-size:12px}
._CTUlZl{margin-top:22px;display:flex;flex-direction:column;gap:14px}
._mTFISQ{display:flex;align-items:center;gap:14px;font-size:15px}
._mTFISQ .ico{width:24px;height:24px;color:#222}
._xvXhkf,._vQegXe{font-size:18px;font-weight:500;margin-bottom:16px}
._eYdTlY{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px 8px;margin-bottom:30px}
._wnLgSM{display:flex;align-items:center;gap:10px;font-size:14px}
._wnLgSM img,._wnLgSM ._vGeoQY{width:34px;height:34px;border-radius:50%;object-fit:cover}
._wnLgSM ._vGeoQY{display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500}
._gOWKSk{font-size:15px;line-height:1.6}
._egLfkO{background:var(--grey200);border:none;border-radius:8px;padding:14px 24px;font-size:15px;font-weight:500;margin-top:18px}
._egLfkO:hover{background:var(--grey300)}
._ZOpPkY{display:flex;gap:10px;align-items:flex-start;font-size:12px;color:var(--muted2);margin-top:30px}
._ZOpPkY .ico{width:24px;height:24px;flex-shrink:0}

/* @media (max-width:1128px) */
._UiBrsI{grid-template-columns:1fr}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
section._WNEjqG 1120x561
  h2._XZmvOH 1120x26 "Meet your host"
  div._UiBrsI 1120x414
    div. 340x345
      div._jdcHSj 340x261
        div._FtSmek 190x197
          div._ynznJE 88x88
          div._IPinhY 190x74 "Mirashya Homes"
          div._kuaAPu 190x19 "Host"
        div._MgwXXd 100x199
          div._uAiafM 79x66
          div._uAiafM 79x67
          div._uAiafM 79x67
      div._CTUlZl 340x62
        div._mTFISQ 340x24 "Born in the 80s"
          span.ico 24x24
        div._mTFISQ 340x24 "Where I went to school: NICMAR GOA"
          span.ico 24x24
    div. 732x414
      div._xvXhkf 732x26 "Co-Hosts"
      div._eYdTlY 732x134
        div._wnLgSM 239x34
          img. 34x34
          span. 50x20 "Sharath"
        div._wnLgSM 239x34
          img. 34x34
          span. 112x20 "Aman Dev Pahwa"
        div._wnLgSM 239x34
          img. 34x34
          span. 134x20 "Maria Karen Priyanka"
        div._wnLgSM 239x34
          img. 34x34
          span. 44x20 "Simran"
        div._wnLgSM 239x34
          img. 34x34
          span. 40x20 "Pallavi"
        div._wnLgSM 239x34
          img. 34x34
          span. 59x20 "Sanyukta"
        div._wnLgSM 239x34
          div._vGeoQY 34x34 "S"
          span. 38x20 "Shruti"
        div._wnLgSM 239x34
          div._vGeoQY 34x34 "A"
          span. 48x20 "Amisha"
      div._vQegXe 732x26 "Host details"
      div._gOWKSk 732x48 "Response rate: 100% Responds within an h"
        br. 0x19
      button._egLfkO 145x47 "Message host"
      div._ZOpPkY 732x24
        span.ico 24x24
          svg. 24x24
        span. 520x17 "To help protect your payment, always use"
```
### Mobile 390px
```
section._WNEjqG 342x991
  h2._XZmvOH 342x26 "Meet your host"
  div._UiBrsI 342x844
    div. 342x345
      div._jdcHSj 342x261
        div._FtSmek 192x197
          div._ynznJE 88x88
          div._IPinhY 192x74 "Mirashya Homes"
          div._kuaAPu 192x19 "Host"
        div._MgwXXd 100x199
          div._uAiafM 79x66
          div._uAiafM 79x67
          div._uAiafM 79x67
      div._CTUlZl 342x62
        div._mTFISQ 342x24 "Born in the 80s"
          span.ico 24x24
        div._mTFISQ 342x24 "Where I went to school: NICMAR GOA"
          span.ico 24x24
    div. 342x451
      div._xvXhkf 342x26 "Co-Hosts"
      div._eYdTlY 342x160
        div._wnLgSM 109x60
          img. 34x34
          span. 50x20 "Sharath"
        div._wnLgSM 109x60
          img. 34x34
          span. 65x60 "Aman Dev Pahwa"
        div._wnLgSM 109x60
          img. 21x34
          span. 78x40 "Maria Karen Priyanka"
        div._wnLgSM 109x34
          img. 34x34
          span. 44x20 "Simran"
        div._wnLgSM 109x34
          img. 34x34
          span. 40x20 "Pallavi"
        div._wnLgSM 109x34
          img. 34x34
          span. 59x20 "Sanyukta"
        div._wnLgSM 109x34
          div._vGeoQY 34x34 "S"
          span. 38x20 "Shruti"
        div._wnLgSM 109x34
          div._vGeoQY 34x34 "A"
          span. 48x20 "Amisha"
      div._vQegXe 342x26 "Host details"
      div._gOWKSk 342x48 "Response rate: 100% Responds within an h"
        br. 0x19
      button._egLfkO 145x47 "Message host"
      div._ZOpPkY 342x34
        span.ico 24x24
          svg. 24x24
        span. 308x34 "To help protect your payment, always use"
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<section class="_WNEjqG"><h2 class="_XZmvOH">Meet your host</h2><div class="_UiBrsI"><div><div class="_jdcHSj"><div class="_FtSmek"><div class="_ynznJE"><img src="IMG/aa4e82a4.jpg" alt=""><span class="_LRcFYN"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z"></path></svg></span></div><div class="_IPinhY">Mirashya Homes</div><div class="_kuaAPu">Host</div></div><div class="_MgwXXd"><div class="_uAiafM"><div class="_NQUHke">1,463</div><div class="_tAbhrW">Reviews</div></div><div class="_uAiafM"><div class="_NQUHke">4.68★</div><div class="_tAbhrW">Rating</div></div><div class="_uAiafM"><div class="_NQUHke">2</div><div class="_tAbhrW">Years hosting</div></div></div></div><div class="_CTUlZl"><div class="_mTFISQ"><span class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="M16 0c5.9 0 11 5.28 11 11 0 4.85-3.23 9.27-9.55 13.28l2.2 2.92a1.13 1.13 0 0 1-.9 1.8H17v3h-2v-3h-1.75a1.13 1.13 0 0 1-.9-1.8l2.14-2.86C8.2 20.92 5 16.46 5 11A11 11 0 0 1 16 0zm0 25.67L15 27h2zM16 2a9 9 0 0 0-9 9c0 4.6 2.72 8.43 8.3 11.5l.38.21.28.14.3-.19c5.62-3.53 8.48-7.24 8.72-11.12l.02-.27V11c0-4.64-4.21-9-9-9z"></path></svg></span>Born in the 80s</div><div class="_mTFISQ"><span class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m31.47 10.12-15-8a1 1 0 0 0-.94 0l-15 8a1 1 0 0 0 0 1.76L4 13.73V23a1 1 0 0 0 .52.88l11 6a1 1 0 0 0 .96 0l11-6A1 1 0 0 0 28 23v-9.27l2-1.06V23h2V11a1 1 0 0 0-.53-.88zM26 22.4l-10 5.45-10-5.45V14.8l9.53 5.08a1 1 0 0 0 .94 0L26 14.8v7.6zm-10-4.54L3.12 11 16 4.13 28.88 11 16 17.87z"></path></svg></span>Where I went to school: NICMAR GOA</div></div></div><div><div class="_xvXhkf">Co-Hosts</div><div class="_eYdTlY"><div class="_wnLgSM"><img src="IMG/e6dee63f.jpg" alt=""><span>Sharath</span></div><div class="_wnLgSM"><img src="IMG/802b1839.jpg" alt=""><span>Aman Dev Pahwa</span></div><div class="_wnLgSM"><img src="IMG/f22840f1.jpg" alt=""><span>Maria Karen Priyanka</span></div><div class="_wnLgSM"><img src="IMG/6349966d.jpg" alt=""><span>Simran</span></div><div class="_wnLgSM"><img src="IMG/0c540c00.jpg" alt=""><span>Pallavi</span></div><div class="_wnLgSM"><img src="IMG/2b727a34.jpg" alt=""><span>Sanyukta</span></div><div class="_wnLgSM"><div class="_vGeoQY" style="background:rgb(253,231,239);color:rgb(212,53,110)">S</div><span>Shruti</span></div><div class="_wnLgSM"><div class="_vGeoQY" style="background:rgb(231,240,253);color:rgb(58,110,204)">A</div><span>Amisha</span></div></div><div class="_vQegXe">Host details</div><div class="_gOWKSk">Response rate: 100%<br>Responds within an hour</div><button class="_egLfkO">Message host</button><div class="_ZOpPkY"><span class="ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:currentColor"><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z"></path></svg></span><span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span></div></div></div></section>
```
