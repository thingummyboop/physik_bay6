#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/15] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/15] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/15] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/15] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/15] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/15] Math language audit"
node scripts/audit_math_language.js

echo "[7/15] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[8/15] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[9/15] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[10/15] New-subject EN block warning audit"
node scripts/audit_new_subject_english_blocks.js

echo "[11/15] New-subject interaction accessibility audit"
node scripts/audit_new_subject_interactions.js

echo "[12/15] New-subject didactic audit (FAIL blocks gate, WARN is reported)"
node scripts/audit_new_subject_didactics.js

echo "[13/15] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[14/16] Navigation integrity audit"
node scripts/audit_navigation_integrity.js

echo "[15/16] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[16/16] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
