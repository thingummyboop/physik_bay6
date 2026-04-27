# ROADMAP_PERFECTION

## Mission Order
1. Physics (didactics, interactivity, misconception feedback, accessibility)
2. Mathematics (same quality bar)
3. Remaining subjects with the same pattern

## Current Focus: Physics

### Done in this iteration (2026-04-27)
- Added targeted misconception feedback to multiple physics quiz answers in `lang/de.json` (sound, wave properties, thunder distance, echolocation, resonance).
- Added guided scaffolding UI blocks (`<details>` hints / reveal steps) inside core sound lessons to support self-checking before interaction.
- Improved quiz renderer to pass answer-level feedback safely via escaped HTML attributes.
- Added reusable styles for guided hint/reveal components (including dark mode).
- Added translation utility scripts for coverage reporting and missing-string completion.

### Why this helps
- Learners get immediate corrective feedback on *why* an answer is wrong (not only wrong/right).
- Scaffolding reduces cognitive load and supports weaker students before action-heavy widgets.
- Accessibility improved via progressive disclosure and existing `aria-live` feedback output.

## Next Steps (Physics)
1. Extend misconception-specific feedback coverage to **all physics sections** in `lang/de.json` (remaining chapters).
2. Add keyboard and screen-reader labels to slider-based interactives (oscilloscope/thunder simulator).
3. Add mini formative checks after each major interactive (1-question transfer task).
4. Verify wording consistency and age-appropriateness (A1/A2 German simplification where needed).

## Blockers / Risks
- No automated content QA yet for pedagogical consistency (manual review required).
- Translation cache file is generated and should stay out of git history unless intentionally versioned.
