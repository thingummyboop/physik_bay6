#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/17] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/17] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/17] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/17] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/17] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/17] Math language audit"
node scripts/audit_math_language.js

echo "[7/17] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[8/17] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[9/17] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[10/17] New-subject EN block warning audit"
node scripts/audit_new_subject_english_blocks.js

echo "[11/17] New-subject interaction accessibility audit"
node scripts/audit_new_subject_interactions.js

echo "[12/17] New-subject didactic audit (FAIL blocks gate, WARN is reported)"
node scripts/audit_new_subject_didactics.js

echo "[13/17] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[14/17] Navigation integrity audit"
node scripts/audit_navigation_integrity.js

echo "[15/17] Interaction handler audit"
node scripts/audit_interaction_handlers.js

echo "[16/17] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[17/17] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
