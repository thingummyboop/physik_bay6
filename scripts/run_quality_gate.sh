#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/18] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/18] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/18] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/18] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/18] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/18] Math language audit"
node scripts/audit_math_language.js

echo "[7/18] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[8/18] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[9/18] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[10/18] New-subject EN block warning audit"
node scripts/audit_new_subject_english_blocks.js

echo "[11/18] New-subject interaction accessibility audit"
node scripts/audit_new_subject_interactions.js

echo "[12/18] New-subject didactic audit (FAIL blocks gate, WARN is reported)"
node scripts/audit_new_subject_didactics.js

echo "[13/18] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[14/18] Navigation integrity audit"
node scripts/audit_navigation_integrity.js

echo "[15/18] Interaction handler audit"
node scripts/audit_interaction_handlers.js

echo "[16/18] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[17/18] German chemistry UTF-8 text audit"
node scripts/audit_german_chemistry_text.js

echo "[18/18] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
