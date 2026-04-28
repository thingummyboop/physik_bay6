#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/12] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/12] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/12] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/12] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/12] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/12] Math language audit"
node scripts/audit_math_language.js

echo "[7/12] Math EN consistency audit"
node scripts/audit_math_english_consistency.js

echo "[8/12] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[9/12] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[10/12] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[11/12] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[12/12] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
