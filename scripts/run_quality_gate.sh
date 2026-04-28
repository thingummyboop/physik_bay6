#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/10] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/10] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/10] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/10] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[5/10] Math language audit"
node scripts/audit_math_language.js

echo "[6/10] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[7/10] Remaining-subject language audit"
node scripts/audit_remaining_subjects_language.js

echo "[8/10] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[9/10] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[10/10] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
