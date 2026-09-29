# PhotoTourModal Specification

## Overview
- **Target file:** `src/components/listing/PhotoTourModal.tsx`
- **Screenshots:**
- `docs/design-references/sections/tour-1440.png`
- `docs/design-references/sections/tour-scrolled-1440.png`
- `docs/design-references/sections/tour-390.png`
- **Interaction model:** click-driven overlay (+ URL state ?modal=PHOTO_TOUR_SCROLLABLE)
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
- Always rendered; visibility driven by `tourOpen` from useListingUI. Closed: `opacity:0; visibility:hidden; transform:translateY(28px); transition: opacity .3s cubic-bezier(.2,0,0,1), transform .3s cubic-bezier(.2,0,0,1), visibility 0s linear .3s`. Open: `opacity:1; visibility:visible; transform:none; transition: opacity .3s cubic-bezier(.2,0,0,1), transform .3s cubic-bezier(.2,0,0,1), visibility 0s` (inferred open state — SingleFile dropped the unused rule). position fixed inset 0, z 120, white, flex column. `aria-hidden={!tourOpen}`, role dialog, aria-modal, aria-label "Photo tour".
- Header (88px, padding 0 32px): Back button (40px round ghost `._bNHEUf`: hover grey200, active scale(.9); 18px ChevronLeftStrokeIcon strokeWidth 2; margin-left -8px) → `closeTour()`. Centred title "Photo tour" 16px medium (absolute left 50% translate). Right: Share (→ `share()`) and Save (→ `toggleSaved()`, HeartIcon filled when saved) ghost buttons, gap 2.
- Scroll area: flex 1, overflow-y auto. Content max-width 1024, margin auto, padding 0 24px 96px.
- Category nav: 8-column grid gap 12 mb 40 (≤1128px 4 cols, ≤743px 2 cols). Each is a button: image aspect 106/100 radius 8 (hover scale 1.04 + brightness .94; active .99; transition transform .25s cubic-bezier(.2,0,0,1), filter .2s) and label 14px muted2, gap 8. Use `TOUR_ROOMS[i].cover` and `.name`. Click → smooth-scroll the scroll area so room section i is at its top.
- Rooms (`TOUR_ROOMS`): each `<section>` grid `1fr 1fr`, gap 20px 60px, align-start, padding 16px 0 4px (≤1128px 1 col). Left: sticky (top 20; static ≤1128px) name 32px medium line-height 1.1 letter-spacing -.02em + subtitle 16px muted2 mt 8 line-height 1.4 (omit if empty). Right: rows flex-col gap 12; each row grid gap 12, "single" 1 col / "double" 2 cols (≤743px double → 1 col). Photo buttons: aspect 3/2, radius 8, overflow hidden, bg #eee; img cover, hover scale 1.04 (transition transform .4s cubic-bezier(.2,0,0,1)); ::after hover overlay #00000014. aria-label "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image {idx+1}", img alt = room name, loading lazy. Click → `openLightbox(photo.idx)`.
- When the tour opens with `tourTargetRoom !== null`, scroll that room into view inside the scroll area and call `clearTourTarget()`; when it opens without a target, reset scrollTop to 0.

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
._KpcKWX{position:fixed;inset:0;z-index:120;background:#fff;display:flex;flex-direction:column;opacity:0;visibility:hidden;transform:translateY(28px);transition:opacity .3s cubic-bezier(.2,0,0,1),transform .3s cubic-bezier(.2,0,0,1),visibility 0s linear .3s}
._TCWfOg{flex-shrink:0;z-index:5;height:88px;display:flex;align-items:center;padding:0 32px;background:#fff}
._ffpbhP{margin-left:-8px}
._usJUoS{position:absolute;left:50%;transform:translate(-50%);font-size:16px;font-weight:500}
._bLFgMg{margin-left:auto;display:flex;gap:2px}
._EpiBQR{flex:1;min-height:0;overflow-y:auto}
._hKlfpJ{max-width:1024px;margin:0 auto;padding:0 24px 96px}
._tHVclZ{display:grid;grid-template-columns:repeat(8,1fr);gap:12px;margin-bottom:40px}
._gKVFNL{background:none;border:none;padding:0;text-align:left;display:flex;flex-direction:column;gap:8px}
._gKVFNL img{width:100%;aspect-ratio:106/100;object-fit:cover;border-radius:8px;display:block;transition:transform .25s cubic-bezier(.2,0,0,1),filter .2s}
._gKVFNL:hover img{transform:scale(1.04);filter:brightness(.94)}
._gKVFNL:active img{transform:scale(.99)}
._gKVFNL ._tAbhrW{font-size:14px;color:var(--muted2)}
._AWcqip{display:grid;grid-template-columns:1fr 1fr;gap:20px 60px;align-items:start;padding:16px 0 4px}
._AWcqip ._yZYwUW{position:sticky;top:20px}
._AWcqip ._AnkvRF{font-size:32px;font-weight:500;line-height:1.1;letter-spacing:-.02em}
._AWcqip ._hvJgUS{font-size:16px;color:var(--muted2);margin-top:8px;line-height:1.4}
._MbzoEk{display:flex;flex-direction:column;gap:12px}
._wdcjGJ{display:grid;gap:12px}
._wdcjGJ._vmCONz{grid-template-columns:1fr}
._wdcjGJ._DLVRjk{grid-template-columns:1fr 1fr}
._GXrMIo{position:relative;display:block;width:100%;aspect-ratio:3/2;padding:0;border:none;background:#eee;border-radius:8px;overflow:hidden}
._GXrMIo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s cubic-bezier(.2,0,0,1)}
._GXrMIo:after{content:"";position:absolute;inset:0;background:#0000;transition:background .2s}
._GXrMIo:hover:after{background:#00000014}
._GXrMIo:hover img{transform:scale(1.04)}
._GXrMIo:active img{transform:scale(1)}

/* @media (max-width:1128px) */
._tHVclZ{grid-template-columns:repeat(4,1fr)}
._AWcqip{grid-template-columns:1fr}
._AWcqip ._yZYwUW{position:static}

/* @media (max-width:743px) */
._tHVclZ{grid-template-columns:repeat(2,1fr)}
._wdcjGJ._DLVRjk{grid-template-columns:1fr}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
div._KpcKWX 1440x900
  header._TCWfOg 1440x88
    button._ffpbhP._bNHEUf 40x40
      span. 18x18
        svg. 18x18
    h2._usJUoS 80x23 "Photo tour"
    div._bLFgMg 82x40
      button._bNHEUf 40x40
        span. 18x18
          svg. 18x18
      button._bNHEUf 40x40
        span. 18x18
          svg. 18x18
  div._EpiBQR 1440x812
    div._hKlfpJ 1024x7509
      nav._tHVclZ 976x292
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Living room 1"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Living room 2"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Full kitchen"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Bedroom"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Full bathroom"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Gym"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Exterior"
        button._gKVFNL 112x131
          img. 112x105
          span._tAbhrW 112x18 "Pool"
        button._gKVFNL 112x149
          img. 112x105
          span._tAbhrW 112x36 "Additional photos"
      div.tour-rooms 976x7081
        section._AWcqip 976x486
          div._yZYwUW 458x66
          div._MbzoEk 458x466
        section._AWcqip 976x1281
          div._yZYwUW 458x66
          div._MbzoEk 458x1261
        section._AWcqip 976x169
          div._yZYwUW 458x110
          div._MbzoEk 458x149
        section._AWcqip 976x964
          div._yZYwUW 458x133
          div._MbzoEk 458x944
        section._AWcqip 976x325
          div._yZYwUW 458x66
          div._MbzoEk 458x305
        section._AWcqip 976x647
          div._yZYwUW 458x66
          div._MbzoEk 458x627
        section._AWcqip 976x964
          div._yZYwUW 458x35
          div._MbzoEk 458x944
        section._AWcqip 976x486
          div._yZYwUW 458x66
          div._MbzoEk 458x466
        section._AWcqip 976x1759
          div._yZYwUW 458x35
          div._MbzoEk 458x1739
```
### Mobile 390px
```
div._KpcKWX 390x900
  header._TCWfOg 390x88
    button._ffpbhP._bNHEUf 40x40
      span. 18x18
        svg. 18x18
    h2._usJUoS 80x23 "Photo tour"
    div._bLFgMg 82x40
      button._bNHEUf 40x40
        span. 18x18
          svg. 18x18
      button._bNHEUf 40x40
        span. 18x18
          svg. 18x18
  div._EpiBQR 390x812
    div._hKlfpJ 390x12373
      nav._tHVclZ 342x956
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Living room 1"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Living room 2"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Full kitchen"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Bedroom"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Full bathroom"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Gym"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Exterior"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Pool"
        button._gKVFNL 165x182
          img. 165x156
          span._tAbhrW 165x18 "Additional photos"
      div.tour-rooms 342x11281
        section._AWcqip 342x814
          div._yZYwUW 342x66
          div._MbzoEk 342x708
        section._AWcqip 342x1774
          div._yZYwUW 342x66
          div._MbzoEk 342x1668
        section._AWcqip 342x618
          div._yZYwUW 342x110
          div._MbzoEk 342x468
        section._AWcqip 342x1646
          div._yZYwUW 342x178
          div._MbzoEk 342x1428
        section._AWcqip 342x334
          div._yZYwUW 342x66
          div._MbzoEk 342x228
        section._AWcqip 342x1316
          div._yZYwUW 342x88
          div._MbzoEk 342x1188
        section._AWcqip 342x1503
          div._yZYwUW 342x35
          div._MbzoEk 342x1428
        section._AWcqip 342x814
          div._yZYwUW 342x66
          div._MbzoEk 342x708
        section._AWcqip 342x2463
          div._yZYwUW 342x35
          div._MbzoEk 342x2388
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
<div class="_KpcKWX" id="_KpcKWX" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo tour"><header class="_TCWfOg" id="tourBar"><button class="_ffpbhP _bNHEUf" type="button" aria-label="Back" id="tourBack"><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button><h2 class="_usJUoS">Photo tour</h2><div class="_bLFgMg"><button class="_bNHEUf" type="button" aria-label="Share"><span><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" fill="none"></path></svg></span></button><button class="_bNHEUf" type="button" aria-label="Save"><span><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display:block;height:100%;width:100%;fill:none;stroke:currentColor;stroke-width:2;overflow:visible"><path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z"></path></svg></span></button></div></header><div class="_EpiBQR" id="tourScroll"><div class="_hKlfpJ"><nav class="_tHVclZ" id="tourNav" aria-label="Photo categories"><button class="_gKVFNL" type="button" aria-label="Living room 1"><img loading="lazy" alt="" src="IMG/42cd77d9.jpg"><span class="_tAbhrW">Living room 1</span></button><button class="_gKVFNL" type="button" aria-label="Living room 2"><img loading="lazy" alt="" src="IMG/dbd1e55f.jpg"><span class="_tAbhrW">Living room 2</span></button><button class="_gKVFNL" type="button" aria-label="Full kitchen"><img loading="lazy" alt="" src="IMG/8955bb30.jpg"><span class="_tAbhrW">Full kitchen</span></button><button class="_gKVFNL" type="button" aria-label="Bedroom"><img loading="lazy" alt="" src="IMG/967e6ad6.jpg"><span class="_tAbhrW">Bedroom</span></button><button class="_gKVFNL" type="button" aria-label="Full bathroom"><img loading="lazy" alt="" src="IMG/2a647912.jpg"><span class="_tAbhrW">Full bathroom</span></button><button class="_gKVFNL" type="button" aria-label="Gym"><img loading="lazy" alt="" src="IMG/f08df14a.jpg"><span class="_tAbhrW">Gym</span></button><button class="_gKVFNL" type="button" aria-label="Exterior"><img loading="lazy" alt="" src="IMG/88f39a25.jpg"><span class="_tAbhrW">Exterior</span></button><button class="_gKVFNL" type="button" aria-label="Pool"><img loading="lazy" alt="" src="IMG/73859b43.jpg"><span class="_tAbhrW">Pool</span></button><button class="_gKVFNL" type="button" aria-label="Additional photos"><img loading="lazy" alt="" src="IMG/05fe70d6.jpg"><span class="_tAbhrW">Additional photos</span></button></nav><div class="tour-rooms" id="tourRooms"><section class="_AWcqip" id="tour-room-0"><div class="_yZYwUW"><div class="_AnkvRF">Living room 1</div><div class="_hvJgUS">Sofa · Air conditioning · Ceiling fan · TV</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="0" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 1"><img loading="lazy" alt="Living room 1" src="IMG/42cd77d9.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="1" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 2"><img loading="lazy" alt="Living room 1" src="IMG/01c8ea38.jpg"></button><button class="_GXrMIo" type="button" data-idx="2" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 3"><img loading="lazy" alt="Living room 1" src="IMG/2fb4c5cc.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-1"><div class="_yZYwUW"><div class="_AnkvRF">Living room 2</div><div class="_hvJgUS">Ceiling fan · Hot tub</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="3" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 4"><img loading="lazy" alt="Living room 2" src="IMG/dbd1e55f.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="4" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 5"><img loading="lazy" alt="Living room 2" src="IMG/8a5eaf59.jpg"></button><button class="_GXrMIo" type="button" data-idx="5" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 6"><img loading="lazy" alt="Living room 2" src="IMG/8ccdb460.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="6" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 7"><img loading="lazy" alt="Living room 2" src="IMG/736a481e.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="7" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 8"><img loading="lazy" alt="Living room 2" src="IMG/e00ce295.jpg"></button><button class="_GXrMIo" type="button" data-idx="8" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 9"><img loading="lazy" alt="Living room 2" src="IMG/3234473b.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="9" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 10"><img loading="lazy" alt="Living room 2" src="IMG/162b4a11.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-2"><div class="_yZYwUW"><div class="_AnkvRF">Full kitchen</div><div class="_hvJgUS">Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery</div></div><div class="_MbzoEk"><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="10" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 11"><img loading="lazy" alt="Full kitchen" src="IMG/8955bb30.jpg"></button><button class="_GXrMIo" type="button" data-idx="11" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 12"><img loading="lazy" alt="Full kitchen" src="IMG/21114328.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-3"><div class="_yZYwUW"><div class="_AnkvRF">Bedroom</div><div class="_hvJgUS">Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="12" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 13"><img loading="lazy" alt="Bedroom" src="IMG/967e6ad6.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="13" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 14"><img loading="lazy" alt="Bedroom" src="IMG/f95566ca.jpg"></button><button class="_GXrMIo" type="button" data-idx="14" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 15"><img loading="lazy" alt="Bedroom" src="IMG/d8a74035.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="15" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 16"><img loading="lazy" alt="Bedroom" src="IMG/967e6ad6.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="16" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 17"><img loading="lazy" alt="Bedroom" src="IMG/2b171b38.jpg"></button><button class="_GXrMIo" type="button" data-idx="17" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 18"><img loading="lazy" alt="Bedroom" src="IMG/e4f0f45a.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-4"><div class="_yZYwUW"><div class="_AnkvRF">Full bathroom</div><div class="_hvJgUS">Hairdryer · Hot water · Shampoo · Shower gel</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="18" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 19"><img loading="lazy" alt="Full bathroom" src="IMG/2a647912.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-5"><div class="_yZYwUW"><div class="_AnkvRF">Gym</div><div class="_hvJgUS">Air conditioning · Gym · Exercise equipment · Ceiling fan</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="19" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 20"><img loading="lazy" alt="Gym" src="IMG/f08df14a.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="20" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 21"><img loading="lazy" alt="Gym" src="IMG/cab6a12e.jpg"></button><button class="_GXrMIo" type="button" data-idx="21" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 22"><img loading="lazy" alt="Gym" src="IMG/1492183c.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="22" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 23"><img loading="lazy" alt="Gym" src="IMG/a0e3040f.jpg"></button><button class="_GXrMIo" type="button" data-idx="23" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 24"><img loading="lazy" alt="Gym" src="IMG/e1dd9e5b.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-6"><div class="_yZYwUW"><div class="_AnkvRF">Exterior</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="24" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 25"><img loading="lazy" alt="Exterior" src="IMG/88f39a25.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="25" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 26"><img loading="lazy" alt="Exterior" src="IMG/85e108b8.jpg"></button><button class="_GXrMIo" type="button" data-idx="26" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 27"><img loading="lazy" alt="Exterior" src="IMG/0cb56064.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="27" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 28"><img loading="lazy" alt="Exterior" src="IMG/8626319e.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="28" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 29"><img loading="lazy" alt="Exterior" src="IMG/8626319e.jpg"></button><button class="_GXrMIo" type="button" data-idx="29" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 30"><img loading="lazy" alt="Exterior" src="IMG/afd49445.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-7"><div class="_yZYwUW"><div class="_AnkvRF">Pool</div><div class="_hvJgUS">Pool</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="30" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 31"><img loading="lazy" alt="Pool" src="IMG/73859b43.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="31" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 32"><img loading="lazy" alt="Pool" src="IMG/814963c7.jpg"></button><button class="_GXrMIo" type="button" data-idx="32" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 33"><img loading="lazy" alt="Pool" src="IMG/73859b43.jpg"></button></div></div></section><section class="_AWcqip" id="tour-room-8"><div class="_yZYwUW"><div class="_AnkvRF">Additional photos</div></div><div class="_MbzoEk"><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="33" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 34"><img loading="lazy" alt="Additional photos" src="IMG/05fe70d6.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="34" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 35"><img loading="lazy" alt="Additional photos" src="IMG/6d10f788.jpg"></button><button class="_GXrMIo" type="button" data-idx="35" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 36"><img loading="lazy" alt="Additional photos" src="IMG/be8c7063.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="36" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 37"><img loading="lazy" alt="Additional photos" src="IMG/fa714b45.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="37" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 38"><img loading="lazy" alt="Additional photos" src="IMG/a132c980.jpg"></button><button class="_GXrMIo" type="button" data-idx="38" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 39"><img loading="lazy" alt="Additional photos" src="IMG/3c1a421c.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="39" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 40"><img loading="lazy" alt="Additional photos" src="IMG/16623ddb.jpg"></button></div><div class="_wdcjGJ _DLVRjk"><button class="_GXrMIo" type="button" data-idx="40" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 41"><img loading="lazy" alt="Additional photos" src="IMG/495ad69b.jpg"></button><button class="_GXrMIo" type="button" data-idx="41" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 42"><img loading="lazy" alt="Additional photos" src="IMG/62e985ac.jpg"></button></div><div class="_wdcjGJ _vmCONz"><button class="_GXrMIo" type="button" data-idx="42" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 43"><img loading="lazy" alt="Additional photos" src="IMG/01c8ea38.jpg"></button></div></div></section></div></div></div></div>
```
