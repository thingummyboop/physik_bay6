#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/16] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/16] Physics course completeness audit"
node scripts/audit_physics_course.js

echo "[3/16] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[4/16] Physics language audit"
node scripts/audit_physics_language.js

echo "[5/16] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[6/16] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[7/16] Math language audit"
node scripts/audit_math_language.js

echo "[8/16] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[9/16] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[10/16] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[11/16] New-subject EN block warning audit"
node scripts/audit_new_subject_english_blocks.js

echo "[12/16] New-subject interaction accessibility audit"
node scripts/audit_new_subject_interactions.js

echo "[13/16] New-subject didactic audit (FAIL blocks gate, WARN is reported)"
node scripts/audit_new_subject_didactics.js

echo "[14/16] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[15/16] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[16/16] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
