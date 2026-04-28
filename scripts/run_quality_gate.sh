#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/11] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/11] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/11] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/11] Physics EN consistency audit"
node scripts/audit_physics_english_consistency.js

echo "[5/11] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[6/11] Math language audit"
node scripts/audit_math_language.js

echo "[7/11] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[8/11] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[9/11] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[10/11] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[11/11] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
