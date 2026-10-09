# Step 6 — write one spec per component to docs/research/components/: behaviour notes (below),
# shared conversion rules, the original CSS rules that apply to the component's classes, measured
# box sizes at 1440/390 and the verbatim markup. Inputs: tools/.out/comps.json, tools/.out/site-pretty.css.
import json, re, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, '.out')
SPEC_DIR = f'{ROOT}/docs/research/components'
COMP_DIR = 'src/components/listing'
SHOT_DIR = 'docs/design-references/sections'
os.makedirs(SPEC_DIR, exist_ok=True)

comps = json.load(open(os.path.join(OUT, 'comps.json'), encoding='utf8'))
css = open(os.path.join(OUT, 'site-pretty.css'), encoding='utf8').read()

# ---- parse css into (media, selector, body) ----
rules = []
def parse(block, media):
    i = 0
    while i < len(block):
        j = block.find('{', i)
        if j < 0: break
        sel = block[i:j].strip()
        if sel.startswith('@media'):
            depth, k = 1, j + 1
            while depth:
                if block[k] == '{': depth += 1
                elif block[k] == '}': depth -= 1
                k += 1
            parse(block[j + 1:k - 1], sel)
            i = k
        else:
            k = block.find('}', j)
            rules.append((media, sel, block[j + 1:k].strip()))
            i = k + 1
parse(css.replace('\n', ''), None)

def rules_for(classes, extra=()):
    keys = set(classes) | set(extra)
    out = []
    for media, sel, body in rules:
        if sel.startswith('@font-face') or sel == ':root': continue
        toks = set(re.findall(r'\.([A-Za-z_][\w-]*)', sel))
        if toks and toks <= keys:
            body = re.sub(r'url\(data:[^)]*\)', 'url(<inline svg — see notes>)', body)
            body = body.replace('url(DATA)', 'url(<inline image — see notes>)')
            out.append((media, f'{sel}{{{body}}}'))
    base = [r for m, r in out if not m]
    med = {}
    for m, r in out:
        if m: med.setdefault(m, []).append(r)
    s = '\n'.join(base)
    for m, rs in med.items():
        s += f'\n\n/* {m} */\n' + '\n'.join(rs)
    return s

COMMON = f"""## Conversion rules (apply to every element)
- Source CSS below is the original site's stylesheet, verbatim. Translate every declaration to Tailwind v4 utilities (arbitrary values are fine: `px-[15px]`, `text-[26px]`, `leading-[30px]`, `shadow-[0_2px_8px_#00000026]`, `grid-cols-[35fr_17fr_17fr]`, `aspect-[1120/494]`). Keep exact values.
- Site tokens available as Tailwind colors: `ink` #222222, `subtle` #6a6a6a, `muted2` #717171, `line` #dddddd, `line-soft` #ebebeb, `card-border` rgba(0,0,0,.08), `rausch` #ff385c, `grey100` #f7f7f7, `grey200` #f2f2f2, `grey300` #ebebeb; shadows `shadow-card` (0 6px 16px rgba(0,0,0,.12)); utilities `bg-reserve` / `hover:bg-reserve-hover` (Reserve gradient) and `no-scrollbar`. CSS `var(--x)` in the source maps to these.
- Page font (Airbnb Cereal VF, weights 200–900) and body defaults (14px, line-height 1.43, color #222, antialiased) are already global. `font-weight:500` → `font-medium`, 700 → `font-bold`.
- Responsive: the original is desktop-first. `@media (max-width:1128px)` → prefix `max-[1128px]:`; `@media (max-width:743px)` → prefix `max-[743px]:`. Reproduce those rules exactly — including any overflow quirks at mobile width; the clone must match the original, not improve it.
- Tailwind preflight differs from the original (which had no reset except `h1,h2,h3,p{{margin:0}}`, `a{{color:inherit;text-decoration:none}}`, `button{{font-family:inherit;cursor:pointer;color:inherit}}`):
  - `<button>` in the original keeps browser defaults for anything its rule does not set: **line-height: normal** (add `leading-[normal]`), **font-size 13.333px** when no font-size is set and it contains text, padding `1px 6px`, `border: 2px outset` and grey background when not overridden (every button here overrides border/background — check each rule).
  - `<img>` in the original is `display:inline` with natural height; preflight makes it `block; max-width:100%; height:auto`. Only matters when a rule sets one dimension; verify rendered sizes against the box outline.
- Hover / active / transition declarations are part of the spec — implement them (`hover:`, `active:`, `transition-[...]`, `duration-[...]`, `ease-[cubic-bezier(.2,0,0,1)]`). `::after`/`::before` overlays → `after:` / `before:` variants with `after:content-['']`.
- Inline SVGs: copy the exact `<svg>`/`<path>` data from the markup (convert attributes to JSX: `fill-rule`→`fillRule`, `clip-rule`→`clipRule`, `stroke-width`→`strokeWidth`, `stroke-linecap`→`strokeLinecap`, `stroke-linejoin`→`strokeLinejoin`, style strings → className `block h-full w-full` + fill/stroke attributes). Icons used across sections already exist in `@/components/listing/icons` (StarIcon, ShareIcon, HeartIcon[filled], GridDotsIcon, ChevronRightSmallIcon, ChevronLeftSmallIcon, ChevronLeftStrokeIcon[strokeWidth], ChevronRightStrokeIcon[strokeWidth], ChevronDownIcon, CloseIcon) — use those when the path matches; keep section-only icons as small local components in your file.
- Images: markup `src="IMG/<file>"` means `public/images/listing/<file>`; build URLs with `` `${{IMG}}/<file>` `` where `IMG` is exported from `@/components/listing/data`. Use plain `<img>` (eslint rule is disabled for this folder). Keep `alt` text verbatim (often empty).
- Text content: verbatim from the markup, including emoji, curly apostrophes (’), `·` separators and `&nbsp;`.
- Named exports, TypeScript strict, no `any`, 2-space indent. Add `"use client"` only if the component needs state/effects/handlers.
- Shared UI state (tour, lightbox, amenities modal, toast, saved) comes from `useListingUI()` in `@/components/listing/ListingUIProvider`: `{{ tourOpen, tourTargetRoom, openTour(roomIndex?), closeTour(), clearTourTarget(), lightboxIndex, openLightbox(idx), closeLightbox(), amenitiesOpen, openAmenities(), closeAmenities(), toast, showToast(msg), saved, toggleSaved(), share() }}`. Shared tour data: `TOUR_ROOMS`, `ALL_TOUR_PHOTOS`, `HERO_PHOTOS`, `LISTING_TITLE` from `data.ts`.
"""

NOTES = {
 'SiteHeader': dict(model='static (hover states only)', shots=['header-1440.png', 'header-390.png'], notes="""
- `<header>` is in normal flow (position:relative, z-index 50), NOT sticky. Full width with 80px side padding; inner grid `1fr auto 1fr`, height 88px, plus 1px bottom border (#ebebeb) → 89px total.
- Logo: the Airbnb wordmark SVG (viewBox 0 0 3490 1080) at height 32px, colour rausch via `currentColor`. Link href="#", aria-label "Airbnb homepage".
- Search pill: first button contains the house image `IMG/e686c455.png` (48x48, margin-left -6px) then "Anywhere". Separators are 1x24 #ddd spans. "Add guests" is muted2 and weight 400.
- Search circle `._HEUMtF`: 32px rausch circle whose `::before` draws a white magnifier. The original used a data-URI background image: use this inline SVG instead, centred at 14x14, white: `<svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="4"><path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"/></svg>` (render as an absolutely-centred 14px child span instead of ::before).
- Right nav: "Become a host" (hidden ≤743px along with the search pill), globe button, hamburger button (both 40px grey200 circles, 16px icons).
- Skip link: `<a href="#main" class>` "Skip to content" positioned absolute left:-999px, becomes left:0 on focus (see `._DLLasj`). Render it as the first child of the header component.
- Hover: pill shadow 0 1px 4px #00000014 → 0 2px 8px #0000001f (.2s ease); "Become a host" gets grey100 bg; circle buttons grey200 → grey300 (.18s).
"""),
 'StickyNav': dict(model='scroll-driven (window scroll listener)', shots=['stickynav-1440.png'], notes="""
- Fixed bar (top 0, z-index 45, white, 1px bottom border #ebebeb), hidden by default: `transform: translateY(-100%); opacity:0; pointer-events:none; transition: transform .25s ease, opacity .25s ease`.
- **Trigger (inferred — original JS was stripped from the save):** visible (`translateY(0); opacity:1; pointer-events:auto`) once `window.scrollY` is past the bottom of the photo gallery (element id `photo-gallery`, i.e. `gallery.getBoundingClientRect().bottom < 0`). Listen to scroll with `{ passive: true }` and also evaluate on mount. Set `aria-hidden` accordingly.
- Links: Photos → `#photos`, Amenities → `#amenities`, Reviews → `#reviews`, Location → `#location`. Scroll-spy: the active link gets class state `._KOWlKT` (a 2px #222 underline 8px in from each side, 12px from the bottom). Active = the last of those sections whose top is ≤ 80px from the viewport top (fallback Photos). Clicking a link smooth-scrolls to the section (html already has scroll-behavior:smooth); offset so the section top lands just under the 66px bar (call `window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 66, behavior: 'smooth' })` and preventDefault).
- Right side: price block (right-aligned, 13px/1.2): "₹28,499" (15px medium) + " for 5 nights"; second line: star mask icon 11px (use StarIcon at 11x11, vertical-align -1px) + " 4.95 · 19 reviews". Reserve button: gradient pill, 40px tall, 14px, padding 0 20px, hover → reserve-hover gradient, active scale(.985). Clicking Reserve scrolls to top smoothly (inferred).
- The whole bar's inner container is max-width 1280px, padding 0 80px, height 66px, flex space-between. No responsive rules apply to it.
"""),
 'ListingTitle': dict(model='click-driven (Share/Save)', shots=['title-1440.png', 'title-390.png'], notes="""
- `<section id="photos">` — keep this id (StickyNav targets it).
- h1 26px/30px medium. Share / Save buttons: 16px icons, underlined labels (underline-offset 2px), padding 8px 10px, radius 8px, hover grey200, active scale(.96).
- Share → `share()` from useListingUI (copies URL, shows "Link copied" toast). Save → `toggleSaved()`; when `saved` is true the heart is filled (HeartIcon filled) and the label reads "Saved" (inferred saved state).
"""),
 'PhotoGallery': dict(model='click-driven (opens photo tour)', shots=['gallery-1440.png', 'gallery-390.png'], notes="""
- Wrapper `<section id="photo-gallery" aria-label="Photos of this place">` (use id `photo-gallery` — StickyNav reads it), position relative, margin-bottom 48px.
- Grid: `grid-template-columns: 35fr 17fr 17fr; grid-template-rows: 1fr 1fr; gap 8px; aspect-ratio 1120/494; border-radius 12px; overflow hidden`. First tile spans 2 rows. Images: HERO_PHOTOS from data.ts, object-fit cover, first `loading="eager"`, others lazy.
- Each tile is a button (aria-label "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image N") with a hover darkening overlay (::after transparent → #0000001a, .2s ease) and active scale(.997). Clicking tile N → `openTour()`.
- "Show all photos" button absolute right 24 bottom 24, white, 1px #222 border, radius 8, padding 7px 15px, 12px/16px medium, shadow 0 2px 8px #00000026, GridDotsIcon 15px; hover grey100, active scale(.96). Click → `openTour()`.
- ≤743px: grid becomes a single column, `grid-template-rows: 280px; height: 280px`, only the first tile is shown.
"""),
 'ListingOverview': dict(model='static', shots=['left-1440.png', 'left-390.png'], notes="""
- Four stacked blocks from the left column: summary heading, the Guest favourite card, the host row, the three highlights.
- Guest favourite card: 1px #ddd border, radius 16, padding 16px 28px, flex gap 22px. Laurel SVGs are 36px tall (second one mirrored with scaleX(-1)); label "Guest<br>favourite" 15px medium, centred, line-height 1.15. Rating 4.95 (20px bold) with 5 × 10px stars; divider 1x34 #ddd; "19" (20px bold) + "Reviews" (13px medium).
- Host row: avatar `IMG/aa4e82a4.jpg` 46px circle; "Hosted by Mirashya Homes" 16px medium; "2 years hosting" 14px muted2; padding 26px 0.
- Highlights block `._ZOaIER` has an inline style in the original: `border-top:1px solid #ebebeb; padding-top:32px` → apply as classes.
"""),
 'DescriptionAndSleep': dict(model='click-driven (Show more toggles the description)', shots=['left-1440.png', 'left-390.png'], notes="""
- Description block `._YidPyi` has inline `border-top:1px solid #ebebeb` in the original → apply as class.
- Translation notice: grey100 box radius 12, padding 16px 18px, "Some info has been automatically translated. " + underlined medium link "Show original" (href="#").
- Description paragraph 16px/1.5, `white-space: pre-line`; collapsed state: `max-height: 6.2em; overflow: hidden; mask-image: linear-gradient(#000 62%, transparent)` (use `[mask-image:linear-gradient(#000_62%,transparent)]`).
- "Show more" button (16px medium underlined, underline-offset 3px, 14px chevron) — **inferred behavior:** toggles the paragraph to fully expanded (no max-height, no mask) and the label to "Show less".
- "Where you'll sleep" (`._QZaLue` = padding 32px 0 + top border #ebebeb): h2 22px/26px medium mb 24; two cards in a 2-col grid gap 16; image aspect 3/2, radius 8, 1px card-border; title 15px medium mt 14; sub 14px muted2. Images `IMG/967e6ad6.jpg`, `IMG/42cd77d9.jpg`. ≤743px → 1 column.
"""),
 'AmenitiesPreview': dict(model='click-driven (opens amenities modal)', shots=['left-1440.png'], notes="""
- `<div id="amenities">` — keep the id (StickyNav target). Padding 32px 0, top border #ebebeb.
- 2-col grid (gap 16px 8px, mb 24) of 10 rows: 24px icon + 16px label, gap 16, padding 4px 0. The last two (`._LJqhqA`) are unavailable: colour muted2 and the label has line-through.
- "Show all 50 amenities" button: 1px #222 border, white, radius 12, padding 13px 23px, 16px medium (line-height normal), hover grey100, active scale(.98). Click → `openAmenities()`.
"""),
 'AvailabilityCalendar': dict(model='click-driven (month paging + date selection)', shots=['left-1440.png', 'left-390.png'], notes="""
- Section wrapper `._QZaLue` (padding 32px 0, top border #ebebeb). Heading "5 nights in Candolim" 22px medium; sub "18 Oct 2026 - 23 Oct 2026" 14px muted2, mt 6, mb 22.
- Two month grids side by side (grid 1fr 1fr, gap 0 56px; ≤743px single column). Month title 16px medium centred mb 18. Weekday row 12px medium. Day cells: `aspect-ratio:1`, 14px, flex-centred, border-radius 50%.
- Initial state (render exactly this): October 2026 (starts Thursday → 4 empty leading cells) and November 2026 (starts Sunday). Check-in 18 Oct (`._gTtWjP`: #222 circle, white text, with a grey200 half-cell `::before` to the RIGHT at z -1), 19–22 in range (`._lIMKSn`: grey200 bg, square), checkout 23 Oct (`._ifYNOn`: same but half-cell to the LEFT). Blocked days in Nov (`._FXEbnd`: #ddd, line-through): 18–24, 29, 30. Put the day cell in a relatively-positioned container with `isolation:isolate` so the z-index:-1 half-cell stays visible.
- Prev/next month buttons: absolute across the top (top -4px, full width, space-between), 32px circles, hover grey200, 12px chevrons (ChevronLeftSmallIcon / ChevronRightSmallIcon). Clicking shifts both months by one (inferred). Keep blocked days tied to their real dates (Nov 2026).
- Date selection (inferred): clicking an available day when a range exists starts a new check-in; the next later click sets checkout; update the heading ("N nights in Candolim", or "Select checkout date" with the sub "Add your travel dates for exact pricing" while only check-in is set) and sub-line date format "18 Oct 2026 - 23 Oct 2026". Blocked and past-invisible cells are not clickable.
- Footer row (mt 18, space-between): keyboard icon box 30x22 (1px #b0b0b0, radius 4) with the inline 20x14 keyboard SVG; "Clear dates" (14px medium underlined) clears the selection (heading → "Select check-in date", sub → "Add your travel dates for exact pricing").
"""),
 'BookingSidebar': dict(model='scroll (CSS sticky) + static', shots=['aside-1440.png'], notes="""
- `<aside>`: position relative, align-self stretch (it lives in a grid column 372px wide, and must stretch to the full height of the left column so sticky works). Hidden ≤1128px (`display:none`).
- Inner wrapper sticky, top 100px.
- Promo card: 1px #ddd, radius 12, padding 16, gap 12, mb 24. Tag image `IMG/0395b027.svg` 32x32 contain. Text 14px/1.3 "Get 10% off your next stay." <br> underlined medium link "Terms apply". "Claim" button bg #f7f7f7 radius 8, padding 8px 14px, 14px medium, hover grey200.
- Booking card: 1px card-border, radius 12, shadow-card, padding 22px 24px 24px. Price row baseline gap 6 mb 18: "₹28,499" 22px medium underlined (offset 2px) + "for 5 nights" 15px. Date/guest box: 1px #b0b0b0 radius 8 overflow hidden; 2-col top row (CHECK-IN 10/18/2026 | CHECKOUT 10/23/2026) with 1px #b0b0b0 divider; guests row with top border: "GUESTS" / "2 guests" + 16px ChevronDownIcon. Labels 10px bold letter-spacing .04em; values 14px mt 2. Cells padding 10px 12px.
- Free-cancellation pill: centred, grey100 bg, muted2, radius 8, 13px, padding 8, margin 16px 0: "Free cancellation before <b>17 October</b>" (b is #222 medium).
- Reserve button full width, 48px, 16px medium, gradient, radius 999, padding 0 24px, mt 2; hover reserve-hover; active scale(.985). "You won't be charged yet" 14px muted2 centred mt 16.
- Report row (mt 26, centred, gap 8, muted2 14px): 16px flag icon (inline SVG from markup) + underlined link "Report this listing".
"""),
 'ReviewsSummary': dict(model='static', shots=['reviews-1440.png', 'reviews-390.png'], notes="""
- These are the first two children of `<section id="reviews">` (the section wrapper itself is built by the page assembler; you output a fragment `<>...</>`).
- Hero: laurel images `IMG/78b66008.png` (left) and `IMG/b6c05494.png` (right) at height 110px, around "4.95" (100px medium, letter-spacing -.03em). "Guest favourite" 22px medium mt 8; description 15px/1.35, max-width 420, centred; "How reviews work" 14px medium underlined button mt 14. Block padding 8px 0 40px, centred.
- Category grid: `grid-template-columns: 1.4fr repeat(6, 1fr)`, padding 8px 0 40px. Each column padding 0 24px, with a 1px #ddd left border between columns. First column: "Overall rating" + 5 bars (label 12px, 4px track #ebebeb radius 2, #222 fill; widths come from the markup's inline style — copy them). Other columns: label 14px medium mb 12, value 18px medium mb 8, 32px icon (inline SVGs from markup).
- ≤1128px: grid becomes 2 columns, no left borders, column padding 10px 0.
"""),
 'ReviewsList': dict(model='click-driven (review "Show more" expands)', shots=['reviews-1440.png', 'reviews-390.png'], notes="""
- Fragment of the remaining children of `<section id="reviews">`: tag pill rail, the review grid and the "Show all 19 reviews" button.
- Pill rail: flex gap 12, overflow-x auto, hidden scrollbar (`no-scrollbar`), padding 4px 0 30px. Pills: 1px #ddd, radius 16, padding 13px 18px 13px 14px, 14px medium, 20x20 icon image, count in muted2 weight 400. Icons `IMG/2db2d4a0.png`, `3cabb880`, `0fa3419b`, `50456be1`, `47f52c81`, `e3f6bded`, `fc465293`, `f3636946`, `91a2c2aa`, `680f6918` (.png) in markup order.
- Review grid 2 cols, gap 48px 80px, pb 40 (≤1128px: 1 col, gap 30). Card head: 42px avatar (image or initial-letter circle `._VlFmUV` with the inline bg/colour from the markup), name 15px medium, tenure 13px muted2. Rating row 13px: 5 × 10px stars, " · ", date. Body 15px/1.4 pre-line; long reviews are clamped to 4 lines (`line-clamp-4`) with a "Show more" button (15px medium underlined, mt 8) — clicking removes the clamp and hides the button (inferred).
- "Show all 19 reviews": 1px #222 border, radius 12, padding 13px 23px, 16px medium, hover grey100, active scale(.98) (same style as the amenities button). No action (inert), like the original capture.
"""),
 'LocationSection': dict(model='static', shots=['location-1440.png', 'location-390.png'], notes="""
- `<section id="location">` — the page assembler provides the section wrapper (`padding 48px 0; border-top`), you output the inner fragment (h2, address, map, notes). Keep the h2 text with the curly apostrophe: "Where you’ll be".
- Map is pure CSS: container 480px tall, radius 12, overflow hidden, bg #e8eef0. Layer `._pLIPHL` = absolutely filled div with background: `radial-gradient(circle at 30% 40%,#cfe3c8 0 6%,transparent 6%), radial-gradient(circle at 70% 60%,#cfe3c8 0 8%,transparent 8%), linear-gradient(115deg,#acd3e6 0 34%,#e9f0e4 34% 100%)`, plus a `::before` grid overlay: `linear-gradient(90deg,rgba(180,180,170,.5) 1px,transparent 1px), linear-gradient(0deg,rgba(180,180,170,.35) 1px,transparent 1px)` at `background-size: 90px 90px` and opacity .5. Use arbitrary `bg-[...]` values (underscores for spaces).
- Centre pin: 56px #222 circle, white house icon (from markup), shadow 0 4px 12px #0000004d. Zoom +/- buttons: top-right stack, 40px white squares radius 8, shadow 0 2px 6px #0003. Search button: top-left 40px white circle.
- Below: "Exact location will be provided after booking." 14px mt 18; "Neighbourhood highlights" 18px medium margin 40px 0 12px; paragraph 15px/1.5; "Show more" (same style as description Show more, with chevron) — inert.
"""),
 'HostSection': dict(model='static', shots=['host-1440.png', 'host-390.png'], notes="""
- Inner fragment of the "Meet your host" section (page assembler provides section wrapper). h2 22px/26px medium mb 24.
- Layout grid `340px 1fr`, gap 48 (≤1128px: 1 column).
- Host card: 1px card-border, radius 20, shadow-card, grid `1fr 100px`, padding 30px 24px. Avatar `IMG/aa4e82a4.jpg` 88px circle + 28px rausch verified badge (2px white border, bottom 4 right 0) with white check SVG. Name 26px medium ("Mirashya<br>Homes" wraps naturally in the column), "Host" 13px mt 4. Right stats column: left border #ebebeb, padding-left 20: three rows (padding 10px 0, separators #ebebeb): "1,463"/Reviews, "4.68★"/Rating, "2"/Years hosting — values 20px medium, labels 12px.
- Facts under the card (mt 22, gap 14): 24px icons + 15px text: "Born in the 80s", "Where I went to school: NICMAR GOA".
- Right column: "Co-Hosts" 18px medium mb 16; 3-col grid (gap 16px 8px, mb 30) of 34px avatars + 14px names (initial circles for Shruti / Amisha with inline colours from markup). "Host details" 18px medium mb 16; "Response rate: 100%" / "Responds within an hour" 15px/1.6. "Message host" button grey200, radius 8, padding 14px 24px, 15px medium, mt 18, hover grey300. Safety note row: 24px shield icon, 12px muted2 text, mt 30.
"""),
 'ThingsToKnow': dict(model='static', shots=['things-1440.png', 'things-390.png'], notes="""
- Inner fragment of the "Things to know" section (page assembler provides wrapper). h2 22px/26px medium mb 24.
- 3-column grid gap 32 (≤1128px: 1 column, gap 24). Each column: 24px icon mb 18, title 16px medium mb 14, paragraphs 14px/1.5 mb 8, "Learn more" 14px medium underlined link.
"""),
 'MoreStaysNearby': dict(model='click-driven (carousel paging)', shots=['stays-1440.png', 'stays-390.png'], notes="""
- Inner fragment of the last section (page assembler provides wrapper). Header row: h2 "More stays nearby" (22px/26px medium, margin 0) + pager on the right: "1 / 2" (14px muted2, mr 6) and two 32px round buttons (1px #b0b0b0, white, 12px chevrons; `disabled` → opacity .3).
- Rail: flex gap 20, overflow-x auto, `scroll-behavior:smooth`, hidden scrollbar, pb 4. Cards `flex: 0 0 calc((100% - 80px)/5)` (≤1128px: (100% - 40px)/3; ≤743px: (100% - 20px)/2). Image 1:1 cover radius 12; title 14px medium mt 8, 2-line clamp; price line 13px mt 4: "₹23,600 " + 10px star + " 4.91".
- 8 cards from the markup, images in order: `8abfcd86.jpg, 06aec3c1.jpg, 349c67b4.jpg, d1e34b27.jpg, 4f067ab6.jpg, eb203049.jpg, 06aec3c1.jpg, d1e34b27.jpg` (the original repeats two).
- Paging (inferred): next scrolls the rail by its clientWidth + 20, prev by the negative; page indicator = `Math.round(scrollLeft / (clientWidth + 20)) + 1` of `Math.ceil(scrollWidth / (clientWidth + 20))`; prev disabled at start, next disabled at end. Update on the rail's scroll event.
"""),
 'PhotoTourModal': dict(model='click-driven overlay (+ URL state ?modal=PHOTO_TOUR_SCROLLABLE)', shots=['tour-1440.png', 'tour-scrolled-1440.png', 'tour-390.png'], notes="""
- Always rendered; visibility driven by `tourOpen` from useListingUI. Closed: `opacity:0; visibility:hidden; transform:translateY(28px); transition: opacity .3s cubic-bezier(.2,0,0,1), transform .3s cubic-bezier(.2,0,0,1), visibility 0s linear .3s`. Open: `opacity:1; visibility:visible; transform:none; transition: opacity .3s cubic-bezier(.2,0,0,1), transform .3s cubic-bezier(.2,0,0,1), visibility 0s` (inferred open state — SingleFile dropped the unused rule). position fixed inset 0, z 120, white, flex column. `aria-hidden={!tourOpen}`, role dialog, aria-modal, aria-label "Photo tour".
- Header (88px, padding 0 32px): Back button (40px round ghost `._bNHEUf`: hover grey200, active scale(.9); 18px ChevronLeftStrokeIcon strokeWidth 2; margin-left -8px) → `closeTour()`. Centred title "Photo tour" 16px medium (absolute left 50% translate). Right: Share (→ `share()`) and Save (→ `toggleSaved()`, HeartIcon filled when saved) ghost buttons, gap 2.
- Scroll area: flex 1, overflow-y auto. Content max-width 1024, margin auto, padding 0 24px 96px.
- Category nav: 8-column grid gap 12 mb 40 (≤1128px 4 cols, ≤743px 2 cols). Each is a button: image aspect 106/100 radius 8 (hover scale 1.04 + brightness .94; active .99; transition transform .25s cubic-bezier(.2,0,0,1), filter .2s) and label 14px muted2, gap 8. Use `TOUR_ROOMS[i].cover` and `.name`. Click → smooth-scroll the scroll area so room section i is at its top.
- Rooms (`TOUR_ROOMS`): each `<section>` grid `1fr 1fr`, gap 20px 60px, align-start, padding 16px 0 4px (≤1128px 1 col). Left: sticky (top 20; static ≤1128px) name 32px medium line-height 1.1 letter-spacing -.02em + subtitle 16px muted2 mt 8 line-height 1.4 (omit if empty). Right: rows flex-col gap 12; each row grid gap 12, "single" 1 col / "double" 2 cols (≤743px double → 1 col). Photo buttons: aspect 3/2, radius 8, overflow hidden, bg #eee; img cover, hover scale 1.04 (transition transform .4s cubic-bezier(.2,0,0,1)); ::after hover overlay #00000014. aria-label "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image {idx+1}", img alt = room name, loading lazy. Click → `openLightbox(photo.idx)`.
- When the tour opens with `tourTargetRoom !== null`, scroll that room into view inside the scroll area and call `clearTourTarget()`; when it opens without a target, reset scrollTop to 0.
"""),
 'Lightbox': dict(model='click-driven overlay (+ keyboard arrows)', shots=['lightbox-1440.png', 'lightbox-390.png'], notes="""
- Always rendered; open when `lightboxIndex !== null`. Closed: `opacity:0; visibility:hidden; transition: opacity .25s ease, visibility 0s linear .25s`; open: `opacity:1; visibility:visible; transition: opacity .25s ease, visibility 0s` (inferred). Fixed inset 0, z 140, white, flex centre. role dialog, aria-modal, aria-label "Photo viewer".
- Header (absolute top, 72px, padding 0 24px, z 3): left grid button (GridDotsIcon, 40px ghost round, margin-left -8px, aria-label "Show all photos") → `closeLightbox()` (returns to the tour underneath). Centre title (16px medium, absolute centred) = the photo's room name (`ALL_TOUR_PHOTOS[i].room`). Right group gap 12: counter "{i+1} / 43" (14px) and Close button (CloseIcon) → `closeLightbox()`.
- Stage `._VPKRNC`: full size, padding 88px 96px (≤743px: 80px 12px), flex centre; the image is `max-width:100%; max-height:100%; object-fit:contain` of `ALL_TOUR_PHOTOS[i].src`.
- Prev/next: 40px round buttons with 1px #222 border, white, absolute vertically centred at left 20 / right 20, z 3, 18px ChevronLeftStrokeIcon/ChevronRightStrokeIcon strokeWidth 4; hover grey100; active `translateY(-50%) scale(.92)`; disabled at the ends (opacity .28, border #ccc, no hover). ArrowLeft/ArrowRight keys navigate while open.
"""),
 'AmenitiesModal': dict(model='click-driven overlay', shots=['amenities-1440.png', 'amenities-390.png'], notes="""
- Always rendered; open when `amenitiesOpen`. Backdrop: fixed inset 0, z 150, `#00000080`, flex centre; closed `opacity:0; visibility:hidden; transition: opacity .2s ease, visibility 0s linear .2s`; open `opacity:1; visibility:visible; transition: opacity .2s ease, visibility 0s` (inferred). Clicking the backdrop (not the panel) → `closeAmenities()`.
- Panel: white, width 780 (max calc(100vw - 48px)), max-height calc(100vh - 96px), radius 12, flex column, overflow hidden; closed `translateY(20px)`, open `translateY(0)`, transition transform .25s cubic-bezier(.2,0,0,1).
- Top bar 64px padding 0 24px: close button (40px ghost round, CloseIcon, margin-left -8px) → `closeAmenities()`.
- Body scrolls (overflow-y auto, padding 0 48px 48px): h2 "What this place offers" 22px medium margin 12px 0 24px. 12 groups (mb 30): h3 18px medium mb 4, rows 16px flex gap 16 padding 16px 0 with bottom border #ebebeb, 24px icons; unavailable rows (`._LJqhqA`) muted2 with line-through label. Put the group/item content in a typed array in your file and render with map — copy every label and every icon SVG path verbatim from the markup (some rows also contain a secondary description line — keep it).
"""),
}

for name, meta in NOTES.items():
    c = comps[name]
    rules_txt = rules_for(c['classes'])
    shots = '\n'.join(f'- `{SHOT_DIR}/{s}`' for s in meta['shots'])
    spec = f"""# {name} Specification

## Overview
- **Target file:** `{COMP_DIR}/{name}.tsx`
- **Screenshots:**
{shots}
- **Interaction model:** {meta['model']}
- **Source:** `https://airbnb-clone-umber-two.vercel.app/` (SingleFile capture; original class names are hashed, e.g. `._WQsVLm`)

## Behaviors, states & specifics
{meta['notes'].strip()}

{COMMON}
## Source CSS (verbatim, every rule touching this component's classes)
```css
{rules_txt}
```

## Rendered box sizes (getBoundingClientRect, width x height)
### Desktop 1440px
```
{c['outline1440']}
```
### Mobile 390px
```
{c['outline390']}
```

## Markup (verbatim DOM from the live page — the content source of truth)
```html
{c['html']}
```
"""
    open(f'{SPEC_DIR}/{name}.md', 'w', encoding='utf8', newline='\n').write(spec)
    print(name, len(spec.splitlines()), 'lines', len(spec), 'chars')
