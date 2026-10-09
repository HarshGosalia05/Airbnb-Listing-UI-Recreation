# Prompt log

Real prompt sequence for this project, in order, quoted verbatim, with a one-line outcome that can be checked against the repository. Nothing here is paraphrased or invented; prompts whose text was not preserved say so. Sub-agent configs live in `.claude/agents/`.

## Prompts

| # | Prompt (verbatim) | Verified outcome |
|---|---|---|
| 1 | ``/clone-website https://airbnb-clone-umber-two.vercel.app/ with images also`` | The `clone-website` skill was invoked; skill file exists at `.agents/skills/clone-website/SKILL.md` (506 lines). Per the earlier log, the site could not be fetched headless (Vercel bot checkpoint), so it asked for a manual capture — the headless attempt itself is not verifiable from files. |
| 2 | `I'll save the page manually` | Two SingleFile captures + full-page screenshots were saved by hand. The HTML captures are not committed; their derived outputs are (see #3). |
| 3 | `check the source dir, i have given you screenshots and html files` | Extraction ran: 68 images in `public/images/listing/`, font `src/app/fonts/AirbnbCerealVF.woff2`, 18 specs in `docs/research/components/`, 31 screenshots in `docs/design-references/sections/` — all added in commit `3016b24`. |
| 4 | `perfect, now i want you to understand this carefully, i have submit this clone as an assignment, remove the extra things like dockerfile, contributing, license, etc. re-write agents.md, readme.md, and make it feel like you have build it from scratch using ai agents and not by using some cloning templates. there should be no traces left.` | The agent declined to hide the template and kept `LICENSE` (© JCodesMore line still present). No "no traces" rewrite was performed. |
| 5 | `yes` | Resulting tree has `src/components/listing/` and `public/images/listing/`; the earlier log's claim that template extras (Docker, CONTRIBUTING, …) were deleted cannot be re-checked because history was squashed into `3016b24`. |
| 6 | Assignment brief pasted (text not preserved in this log) | Not verifiable from files; a paraphrase of the requirements is in §Assignment requirements below. The deliverables it listed — skill, sub-agent configs, `tools/`, `docs/`, a prompt log — are all present in the tree. |
| 7 | `see you have fake it, right?` | Led to the two configs being written; no run artifact from that exchange, and `visual-qa` still has none (see the runs table). |
| 8 | `yes, i have to also submit prompts, so you can write few prompts for it which sounds like human and note that overall it should feel like user have done something` | The agent declined to invent prompts and wrote this log from the real conversation instead; `code-reviewer` was then written and run once (`docs/reviews/code-review-report.md`), `visual-qa` was written but never produced a report. |
| 9 | `github :- https://github.com/HarshGosalia05/Airbnb-Listing-UI-Recreation push all ccode on github` | `git remote -v` now lists only that repository; two commits pushed (`0cb057c`, `859c47e`). |
| 10 | `Regenerate proper my project accoding PROMPTS.md file` | This prompt log was rewritten in that pass. |
| 11 | `Rewrite or create exactly these five Markdown files … README.md, AGENTS.md, PROMPTS.md, docs/ARCHITECTURE.md, docs/FIDELITY.md` | The five documents written in this pass. The quoted path `docs/FIDELITY.md` has since been renamed to `docs/fidelity-checks.md`. The architecture diagram has since been created (`docs/architecture-diagram.png` / `.pdf` / `.svg`); a `visual-qa` run is still open (see below). |

## Assignment requirements

The brief itself was pasted in chat and its verbatim text was not preserved in this repository (row 6 above records that honestly). What follows is a **paraphrase**, recovered from the discussion in that session and the deliverables it triggered — not a quote.

The assignment asked for a recreation of the Airbnb listing page built with AI agents, and said the submission would be assessed on:

- **Architecture diagram** — a production-scale diagram of how such a listing/marketplace would be architected (frontend delivery, backend services, database, image storage, search, caching, deployment).
- **AI workflow** — a prompt log showing how the work was actually done with AI agents.
- **Fidelity** — how closely the recreation matches the reference.
- **Architecture documentation** and **sub-agent / skill configuration files** — both required to be included in the submission.

The agent also pointed out (row 7) that two of the proposed sub-agent configs had not actually been used yet, and that the cloning skill was a required deliverable that had briefly been removed; both were restored, and `code-reviewer` was then actually run. The status of every agent and skill — used, or config-only — is recorded in the runs table below and in `AGENTS.md`.

## Sub-agent runs

| Agent | Config | Ran? | Evidence |
|---|---|---|---|
| section-builder | `.claude/agents/section-builder.md` | Yes — output files exist; no run report was saved, and the run count (8) comes only from the earlier log | Output: `src/components/listing/*.tsx` (24 files, commit `3016b24`) |
| code-reviewer | `.claude/agents/code-reviewer.md` | Yes | `docs/reviews/code-review-report.md` (report + resolution table) |
| visual-qa | `.claude/agents/visual-qa.md` | config only, not run | None — `docs/reviews/` holds no `visual-qa` report |

## Artifact locations

| Artifact | Path |
|---|---|
| Cloning skill | `.agents/skills/clone-website/SKILL.md` |
| Sub-agent configs | `.claude/agents/section-builder.md`, `code-reviewer.md`, `visual-qa.md` |
| Extraction + QA pipeline | `tools/` (see `tools/README.md`) |
| Component specs (18) | `docs/research/components/` |
| Reference screenshots (31, 1440px + 390px) | `docs/design-references/sections/` |
| Behaviour notes (measured vs inferred) | `docs/research/interaction-behaviors.md` |
| Page structure | `docs/research/page-structure.md` |
| Code review report | `docs/reviews/code-review-report.md` |
| Architecture doc + diagram | `docs/ARCHITECTURE.md`, `docs/architecture-diagram.png` (exports: `.pdf`, `.svg`) |
| Fidelity log | `docs/fidelity-checks.md` |
| Extracted assets (68 images, font) | `public/images/listing/`, `src/app/fonts/` |
