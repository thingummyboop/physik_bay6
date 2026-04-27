#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/9] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/9] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/9] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/9] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[5/9] Math language audit"
node scripts/audit_math_language.js

echo "[6/9] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[7/9] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[8/9] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[9/9] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
