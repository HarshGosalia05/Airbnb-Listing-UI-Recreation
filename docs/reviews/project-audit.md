# Project audit — `aribnb/` against the assignment and the source template

**Status: DRAFT — no project file other than this report has been created, modified, renamed or deleted. Awaiting review and approval.**

| | |
|---|---|
| Date | 2026-10-09 |
| Audited commit | `859c47e` (= `origin/main`, `main`) + the current uncommitted working tree |
| Template lineage | root `5f65803` → `a4a4443` (LICENSE) → `43286ba` → `5a19ae5` (skill) → `3016b24` ("first commit") → `0cb057c`, `859c47e`; all template commits verified as ancestors of `3016b24` with `git merge-base --is-ancestor` |
| Method | static analysis of every source/doc/config/asset file, git history inspection, string and reference sweeps, plus live runs of lint / typecheck / build / dev server / tools |

---

## 1. Checks actually run (real results)

| Command | Result |
|---|---|
| `npm run typecheck` | **exit 0** |
| `npm run lint` | **exit 0**, no findings |
| `npm run build` | **exit 0**; `/` and `/_not-found` prerendered static |
| `npm run check` (lint + typecheck + build) | **exit 0** |
| `npm run dev` → `GET /` | **200**, listing title present in HTML, `role="Photo tour"` dialog present |
| `GET /?modal=PHOTO_TOUR_SCROLLABLE` | **200** |
| `GET /images/listing/736a481e.jpg` | **200**, `image/jpeg` |
| `require('./tools/config.js')` | **FAIL** — `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined` |
| `node tools/dump.js` | **exit 1** — same `config.js` failure |
| `node tools/qa.js` | **exit 1** — same `config.js` failure |
| `python tools/diff.py` | **exit −1** — `FileNotFoundError: tools/.out/clone-1440.png` |
| Playwright browser cache (`%LOCALAPPDATA%\ms-playwright`) | **absent** |
| `python -c "import PIL"` | OK (Pillow 12.3.0); `tools/README.md:11` documents `pip install pillow` |

**Rendered-page inspection (`.next/server/app/index.html`):** 1 `<h1>`, 9 `<h2>`, `<main>` present, `<html lang="en">`, 94 `<img>` with **0 missing `alt`**, 164 `<button>` with **0 missing `type`**, 151 `aria-label`, 63 `aria-pressed`, 1 `aria-expanded`, 3 `role="dialog"` + `aria-modal`, 4 `inert`, 2 `aria-live`, no `U+FFFD` replacement characters anywhere.

**Numeric claims re-verified against disk:** 24 listing files · 17 `"use client"` · 68 images · 31 reference PNGs · 18 specs · 9 tour rooms / 43 photo entries (idx 0–42, all distinct) · SKILL.md 506 lines · amenities **12 groups / 44 rows** in both `AmenitiesModal.tsx` and the reference markup in `AmenitiesModal.md`. Reference heights confirmed with Pillow: `full-1440.png` = 1440×**6259**, `full-390.png` = **659**×8675 (the extra 269 px is the reference's own documented horizontal overflow at 390).

**Broken-reference sweep** across all 34 Markdown files: no broken `](…)` links; backtick path references resolve except the six listed in P1-3/P2-8.

---

## 2. P0 — must fix before submission

### P0-1 The entire documentation pass is uncommitted; the submitted GitHub repo is stale
**Files:** `README.md`, `AGENTS.md`, `docs/PROMPTS.md`, `tools/README.md`, `tools/gen_specs.py`, `.claude/agents/section-builder.md`, `.claude/agents/visual-qa.md`, `.agents/skills/clone-website/SKILL.md`, 21 renamed docs, **`docs/ARCHITECTURE.md`**, **`docs/fidelity-checks.md`**

**Evidence**
- `git status` → 21 staged `R` renames, 8 `M`, 2 `??` (`docs/ARCHITECTURE.md`, `docs/fidelity-checks.md` — never tracked).
- `git ls-tree -r --name-only 859c47e -- docs` → contains `docs/research/BEHAVIORS.md`, `docs/research/PAGE_TOPOLOGY.md`, 18 × `*.spec.md`, `docs/reviews/code-review.md`; **contains neither `docs/ARCHITECTURE.md` nor `docs/fidelity-checks.md`**.
- `git rev-parse HEAD` = `git rev-parse origin/main` = `859c47e` → what a grader sees on GitHub today is the pre-audit tree.
- Consequence: two assignment deliverables (architecture doc, fidelity log) do not exist on the remote at all, and the remote `README.md`/`AGENTS.md` point at the old filenames.

**Recommended action:** commit the whole tree as one reviewed change (`git add -A`, message covering the 22 renames, the five reworked docs and the two new docs) and push. Do **not** split the renames from the path updates in `README.md`/`AGENTS.md`/`docs/PROMPTS.md`/`tools/*`, or the tree will be temporarily inconsistent.

**Verification status:** not run (needs your approval).

---

### P0-2 The architecture diagram — an explicit assignment deliverable — does not exist
**Files:** `docs/ARCHITECTURE.md:1`

**Evidence**
- `docs/ARCHITECTURE.md` line 1 reads `**Diagram: TODO (not yet created)**`.
- Zero ` ```mermaid ` fences across all 34 `.md` files.
- Filename sweep for `diagram|architecture|drawio|mermaid` returns `docs/ARCHITECTURE.md` only — no image, `.drawio`, or `.mmd` file anywhere.
- The requirement is recorded in the pushed history: `git show 859c47e:docs/PROMPTS.md` → *"I pasted the assignment brief (architecture diagram; AI workflow, fidelity, architecture and sub-agent configs are assessed; sub-agent and skill configs must be included)."*

**Recommended action:** add the diagram as an embedded Mermaid block inside `docs/ARCHITECTURE.md` (single file, no binary asset, renders on GitHub) covering the conceptual layers the doc already describes. This is genuine original work — see §6.

**Verification status:** not run.

---

### P0-3 The visual-fidelity QA pipeline cannot run, so 30 fidelity checks stay unverified
**Files:** `tools/config.js:11-13`, `tools/qa.js`, `tools/dump.js`, `tools/README.md:5`, `.claude/agents/visual-qa.md`, `docs/fidelity-checks.md`

**Evidence**
- `tools/config.js:11` does `fs.readdirSync(REFS).filter(f => f.endsWith('.html')).sort()`; `docs/design-references/` contains **only** the `sections/` sub-folder and **zero** `.html` files, so `captures[0]` is `undefined` and `path.join(REFS, undefined)` throws at module load.
- Because every JS tool `require('./config.js')`, `node tools/dump.js` and `node tools/qa.js` both **exit 1** with that error before doing any work.
- `python tools/diff.py` fails separately with `FileNotFoundError: tools/.out/clone-1440.png` — `tools/.out/` holds only `dev.log`.
- No Playwright Chromium is installed, so even a fixed `qa.js` could not launch (the `CHROME_PATH` escape hatch at `tools/config.js:29` is real and documented at `tools/README.md:10`).
- `docs/fidelity-checks.md` carries **30 `Not yet verified`** markers, including the two page-layout comparisons, the typography check, hover/active states, sticky-nav behaviour, calendar paging, toasts, responsive breakpoints and the pixel diff.
- `README.md:58` and `.claude/agents/visual-qa.md` state this honestly today.

**Recommended action (two options, pick one):**
- **A (keeps the story intact):** re-add the two SingleFile captures to `docs/design-references/`, note in `README.md` §Provenance that they are reference material (already implied by `README.md:31`), then `npx playwright install chromium` and run `npm run build && npx next start`, `node tools/qa.js clone`, `python tools/diff.py clone`.
- **B (works without the captures):** make `tools/config.js` tolerant — resolve `CAPTURE_MAIN`/`CAPTURE_TOUR` lazily and throw a clear "captures not committed; QA-only run" message — so `tools/qa.js` runs against the local server, and document in `tools/README.md` that steps 1–6 need captures while the QA step does not.

**Verification status:** all four failure modes above reproduced live; neither fix applied.

---

## 3. P1 — should fix before submission

### P1-1 A required sub-agent config points at a file that does not exist
**File:** `.claude/agents/visual-qa.md:18`

**Evidence:** the procedure tells the agent to classify diffs using *"the user's own screenshot `docs/design-references/comparison.png`"*. A filename sweep of `docs/design-references/` finds `comparison.png` nowhere; the top-level directory is empty. The agent's own run procedure is therefore unexecutable end-to-end.

**Recommended action:** remove the sentence, or commit the screenshot it refers to. **Verification status:** reference confirmed missing; no edit made.

---

### P1-2 A fidelity claim is attributed to a document that does not contain it
**File:** `docs/fidelity-checks.md:62`

**Evidence:** the line asserts *"the reference overflows the viewport at 390px; the spec says reproduce it rather than fix it (`docs/research/interaction-behaviors.md`)"*. `interaction-behaviors.md` contains **no** occurrence of `overflow`, `390`, `horizontal`, or "rather than fix". The supporting wording does exist — but in each component spec, e.g. `AmenitiesModal.md:21`, `AvailabilityCalendar.md:23` (*"Reproduce those rules exactly — including any overflow quirks at mobile width"*). The underlying fact is independently supported by the screenshot measurement above (659 px wide vs a 390 px viewport).

**Recommended action:** repoint the citation to `docs/research/components/*.md` (or cite both). Do not delete the finding — it is correct, only mis-referenced. **Verification status:** claim searched across all specs; no edit made.

---

### P1-3 The rewritten prompt log lost the assignment-requirements record
**File:** `docs/PROMPTS.md:14` (working tree) vs `git show 859c47e:docs/PROMPTS.md`

**Evidence:** the pushed version has a dedicated `## 5. Assignment requirements` section recording what the brief asked for. The working-tree rewrite replaces that with row 6: *"`Assignment brief pasted (text not preserved in this log)` — Not verifiable from files"*, and drops sections 1–4. The information **is** preserved in git history but no longer in the document a grader will read. (The rewrite is also more honest in places — row 16 correctly says `visual-qa` never ran, whereas the pushed table claims `visual-qa | 1 | *pending*` after asserting *"ran both on the codebase"*.)

**Recommended action:** restore the assignment-requirements summary into the working `docs/PROMPTS.md`, marked as a paraphrase (not a verbatim quote), keeping the row-6 honesty note. **Verification status:** heading diff between the two versions produced above; no edit made.

---

### P1-4 `lucide-react` is an unused dependency
**File:** `package.json:23`

**Evidence:** a full-tree string sweep over `.ts/.tsx/.js/.mjs/.css/.py/.json/.md` (excluding `node_modules`) finds `lucide-react` **only** in `package.json` and `package-lock.json`. Every icon in the page comes from `src/components/listing/icons.tsx` (10 exports, all referenced) or inline SVGs.

**Recommended action:** `npm uninstall lucide-react`. **Verification status:** sweep run; dependency untouched.

---

### P1-5 The pipeline is documented as runnable from a clean clone, but it is not
**Files:** `tools/README.md:5`, `docs/research/page-structure.md:6`

**Evidence:** `tools/README.md:5` says *"the pipeline runs on two SingleFile captures in `docs/design-references//`"*; `page-structure.md:6` names both captures with their exact filenames. Neither file exists in the tree, and `.gitignore` does **not** exclude them — they were simply never committed. A reader following `tools/README.md` hits the P0-3 crash with no explanation.

**Recommended action:** either commit the captures (option A of P0-3) or state plainly in `tools/README.md` that steps 1–6 require captures that are not in the repo, and where to drop them. **Verification status:** both references located; `Test-Path` false for both capture filenames.

---

### P1-6 The `visual-qa` sub-agent has never produced a report
**Files:** `.claude/agents/visual-qa.md`, `docs/reviews/`, `README.md:58,63`, `AGENTS.md`, `docs/PROMPTS.md:27`

**Evidence:** `docs/reviews/` holds exactly one report (`code-review-report.md`). All three docs already say so accurately — this is an honest gap, not a false claim.

**Recommended action:** unblock P0-3, then run `visual-qa` once and save `docs/reviews/visual-qa-report.md`. Until then the claim set is consistent and needs no change. **Verification status:** `docs/reviews/` directory listing confirms one file.

---

## 4. P2 — worth fixing, not blocking

| # | Finding | Files | Evidence | Recommended action |
|---|---|---|---|---|
| P2-1 | `src/components/ui/button.tsx` is dead, dragging two dependencies with it | `src/components/ui/button.tsx`, `package.json` | Zero imports of `@/components/ui` anywhere in `src`; the file is the **only** consumer of `@base-ui/react` and `class-variance-authority` | **KEEP** the file (it is template provenance, listed in `README.md:39`) and keep both deps; or remove the file and both deps, then update the Provenance list. Either way, record the choice — `README.md:65` already discloses it |
| P2-2 | Large dead theme block in the global stylesheet | `src/app/globals.css:5,27-62,65-132` | A token sweep over all of `src/` finds `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `bg-muted`, `text-muted-foreground`, `bg-popover`, `bg-accent`, `sidebar-*`, `chart-*`, `dark:`, `data-[state`, `animate-*` used **nowhere** outside `ui/button.tsx`; no `.dark` class is ever applied | **MODIFY** — prune the `.dark` block, the `sidebar-*`/`chart-*` `@theme` entries and the `@custom-variant dark` line. Re-run `npm run build` after each removal |
| P2-3 | Two imports with no consumer | `src/app/globals.css:2-3` | `@import "tw-animate-css"` — no `animate-in/out`, `fade-in`, `zoom-in` anywhere in `src`. `@import "shadcn/tailwind.css"` serves only `* { @apply border-border outline-ring/50 }` (`globals.css:136`), and both custom properties are already defined locally (`globals.css:40,39`) | **MODIFY** — drop `tw-animate-css` (and the dependency) first; test `shadcn/tailwind.css` separately with a build. Consider moving `shadcn` from `dependencies` to `devDependencies` (it is imported only for CSS) |
| P2-4 | Amenity content duplicated between two components | `AmenitiesPreview.tsx`, `AmenitiesModal.tsx` | All **10** preview labels and all **10** preview SVG paths are byte-identical repeats of entries in the modal's 44-item array | **REIMPLEMENT** — single `AMENITY_GROUPS` source of truth; the preview renders a slice |
| P2-5 | Amenity content lives inside a component, contradicting `AGENTS.md` | `AmenitiesModal.tsx` (30 763 B), `AGENTS.md:20` | 45 `path:` lines = **23 814 B = 77 %** of the file; the data array ends at line 261 of 349. `AGENTS.md:20` says *"Content changes go here, not in components"* (`data.ts`) | **REIMPLEMENT** — move `AMENITY_GROUPS` to `data.ts` (or a sibling `amenities.ts`) and leave the component presentational |
| P2-6 | Duplicated icons and helpers (already logged as deferred in the code review) | `HostSection.tsx`, `ReviewsSummary.tsx`, `ThingsToKnow.tsx`, `Lightbox.tsx`, `PhotoTourModal.tsx` | 3 SVG `d` strings each used in 2 files; `ShieldIcon` defined in both `HostSection.tsx` and `ThingsToKnow.tsx`; `ghostButton` (and `iconSpan`) duplicated between `Lightbox.tsx:16` and `PhotoTourModal.tsx` | **REIMPLEMENT** — hoist into `icons.tsx` / a shared class constant. `icons.tsx` itself is clean (10 exports, 0 unused) |
| P2-7 | Calendar has no arrow-key grid navigation | `AvailabilityCalendar.tsx` | Days are real `<button>`s with `aria-label`/`aria-pressed`/`disabled` and months are `role="group"` — but there is no `role="grid"`, no roving `tabindex`, no Arrow/Home/End handling; `docs/research/interaction-behaviors.md` contains no keyboard requirement (the requirement comes from the assignment) | **MODIFY** — add `role="grid"`/`role="row"`/`role="gridcell"` + arrow-key movement if keyboard navigation is graded; otherwise document the current level precisely so the README claim stays true |
| P2-8 | Share toast text differs from the spec's inferred value | `ListingUIProvider.tsx` (`share`), `docs/fidelity-checks.md:55` | Success shows `"Share options"`; `interaction-behaviors.md:22` records the inferred original as `"Link copied"`. Already disclosed as a known difference | **MODIFY** — adopt `"Link copied"` (it is still *inferred*, and keeps the disclosure accurate) or keep as-is and leave the disclosure |
| P2-9 | Stale line reference in the agent guide | `AGENTS.md:57` | Says the Escape handler is *"around line 165"*; it is at `ListingUIProvider.tsx:168`. (`AGENTS.md:61`'s `Lightbox.tsx:45-46` **is** correct) | **MODIFY** — drop the number or correct it |
| P2-10 | The code-review report's health paragraph is stale | `docs/reviews/code-review-report.md:9` | States *"`npm run lint` fails with 24 `@typescript-eslint/no-require-imports` errors"*; the resolution table says it was fixed, and lint now exits 0. The report is correctly labelled *"before the accessibility pass"*, but the sentence reads as current | **MODIFY** — add one line noting lint passes as of this audit |
| P2-11 | The pushed README and the working README diverge in content, not just accuracy | `README.md` | Working version corrects provenance and known limitations but **drops** the pushed version's `## Features`, `## Accessibility` and `## Project structure` sections | **MODIFY** — merge the three sections forward before committing; do not let P0-1 silently discard them |
| P2-12 | ~24 KB of amenity icon data is bundled into the page chunk | `AmenitiesModal.tsx`, `.next/static/chunks/2fnq7n2230yqq.js` | The modal is imported eagerly by `ListingPage.tsx` and always rendered (hidden via `inert`); its path strings are present in a **106 001 B** chunk. Total JS across `.next/static` = 672 111 B | **MODIFY** — after P2-5, load the amenity content lazily (`next/dynamic` or a content import) so the icon data is not in the entry path |
| P2-13 | Template boilerplate left in config | `next.config.ts:3` | `/* config options here */`; `output: "standalone"` has no consumer (no Docker/deploy config — correct for this scope) | **MODIFY** — delete the comment; decide deliberately whether `standalone` is wanted |
| P2-14 | Two harmless non-issues | `src/types/listing.ts`, `src/app/layout.tsx` | `TourPhoto` / `TourRow` are exported but only referenced inside their own file (they document the content contract); `metadata` is a Next.js special export | **KEEP** — no change |

---

## 5. File disposition summary

| Disposition | Files | Reason |
|---|---|---|
| **KEEP** | `src/components/listing/*.tsx` (24), `data.ts`, `icons.tsx`, `ListingUIProvider.tsx`, `src/hooks/useDialogFocus.ts`, `src/lib/utils.ts`, `src/types/listing.ts`, `src/app/{layout,page}.tsx`, `public/images/listing/*` (68), `src/app/fonts/AirbnbCerealVF.woff2`, 31 reference PNGs, 18 component specs, `docs/research/{page-structure,interaction-behaviors}.md`, `docs/reviews/code-review-report.md`, `docs/PROMPTS.md`, `LICENSE`, `CLAUDE.md`, all three `.claude/agents/*` configs, `.agents/skills/clone-website/*` | Core implementation, evidence and required deliverables. Verified: typecheck, lint, build, dev server all exit 0; a11y structure sound; content counts match the reference markup exactly |
| **KEEP, DO NOT TOUCH** | `LICENSE` (both copyright lines), `.agents/skills/clone-website/SKILL.md` provenance, `README.md` §Provenance, `AGENTS.md` `next dev` auto-block (`AGENTS.md` header comment) | Required attribution. `LICENSE` verified to contain `Copyright (c) 2026 Harsh Gosalia` **and** `Copyright (c) 2025 JCodesMore (Next.js + shadcn/ui starter scaffold)`. Removing the `next dev` block only recreates it |
| **MODIFY** | `README.md` (P2-11), `AGENTS.md` (P2-9), `docs/PROMPTS.md` (P1-3), `docs/fidelity-checks.md` (P1-2), `docs/ARCHITECTURE.md` (P0-2), `.claude/agents/visual-qa.md` (P1-1), `tools/README.md` (P1-5), `docs/research/page-structure.md` (P1-5), `src/app/globals.css` (P2-2, P2-3), `package.json` (P1-4, P2-3), `next.config.ts` (P2-13), `docs/reviews/code-review-report.md` (P2-10), `AvailabilityCalendar.tsx` (P2-7), `ListingUIProvider.tsx` (P2-8) | Each is wrong, stale or dead; none requires restructuring |
| **REIMPLEMENT** | `AmenitiesModal.tsx` + `AmenitiesPreview.tsx` content model (P2-4, P2-5, P2-12); duplicated icons/helpers (P2-6); `tools/config.js` capture resolution (P0-3) | Same data authored twice in two files, and a module that hard-crashes every consumer when one optional input is missing |
| **REMOVE (after approval)** | `lucide-react` (P1-4); `tw-animate-css` import + dependency (P2-3); the `.dark` / `sidebar-*` / `chart-*` blocks in `globals.css` (P2-2) | Provably unreferenced by any file in the repo |
| **REMOVE ONLY IF PROVENANCE IS RE-DOCUMENTED** | `src/components/ui/button.tsx`, `@base-ui/react`, `class-variance-authority` (P2-1) | File is template-inherited and unused; `README.md:39` cites it as provenance. Deleting it requires updating that list in the same commit |
| **DO NOT REMOVE** | `.claude/agents/visual-qa.md` (config-without-a-report) | The report gap is disclosed honestly in `README.md:58,63` and `docs/PROMPTS.md:27`; removing the config would erase the assignment's required sub-agent artefact |

---

## 6. Where original implementation is still needed

1. **Architecture diagram (P0-2)** — no artefact exists. This is net-new work and the clearest outstanding assignment requirement.
2. **Visual QA run and report (P0-3, P1-6)** — requires either re-committing the reference captures or making `tools/config.js` QA-capable, plus an installed Chromium. Produces `docs/reviews/visual-qa-report.md` and converts 30 `Not yet verified` rows into real results.
3. **Content consolidation (P2-4, P2-5, P2-6)** — one amenity data source, one icon module, shared class constants. Improves maintainability without changing rendering; must be re-verified with build + a screenshot diff.
4. **Calendar keyboard model (P2-7)** — grid roles and arrow-key navigation, if the assignment's accessibility bar covers it.
5. **Bundle discipline (P2-12)** — defer the 24 KB of amenity icon data out of the entry path.

Nothing in this list should be done by renaming files or rewriting history; all provenance requirements are already satisfied and must stay satisfied.

---

## 7. What was **not** verified

- **Pixel-level fidelity at 1440 / 390, page height, typography, hover and active states, sticky-nav scroll-spy, sticky booking card, calendar paging, carousel paging, toast behaviour, and the 1128 / 743 breakpoints** — all blocked by P0-3. These remain `Not yet verified` in `docs/fidelity-checks.md`, which already records that status honestly.
- **Runtime keyboard behaviour** (Escape, focus trap, focus return, arrow keys) — code was read and the handlers are present at the cited locations, but no browser was available to observe them.
- **The assignment brief verbatim text** — never stored in this repo; only the paraphrase in the pushed `docs/PROMPTS.md` §5 survives.
- **The claim that 8 `section-builder` agents ran** — unverifiable from files, as `docs/PROMPTS.md:25` already states.

---

## 8. Approval requested

Recommended commit order once you approve:

1. **P0-1** — commit + push the current tree (renames, five reworked docs, two new docs) so the submitted repo matches this working tree.
2. **P0-2** — write the architecture diagram into `docs/ARCHITECTURE.md`.
3. **P0-3 / P1-1 / P1-5** — decide captures-vs-lazy-config, then run the QA pipeline and save the report.
4. **P1-2, P1-3, P1-4, P1-6** and the **P2** batch.
5. Re-run `npm run check` and record the real results in `docs/fidelity-checks.md`.

No file has been modified, renamed or deleted. `LICENSE` and both copyright lines are untouched; `git diff LICENSE package.json` is empty.
