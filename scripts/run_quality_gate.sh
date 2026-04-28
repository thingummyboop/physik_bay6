#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/13] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/13] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/13] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/13] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/13] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/13] Math language audit"
node scripts/audit_math_language.js

echo "[7/13] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[8/13] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[9/13] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[10/13] New-subject EN block warning audit"
node scripts/audit_new_subject_english_blocks.js

echo "[11/13] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[12/13] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[13/13] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
