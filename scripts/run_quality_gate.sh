#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/8] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/8] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/8] Physics language audit"
node scripts/audit_physics_language.js

echo "[4/8] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[5/8] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[6/8] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[7/8] Topic syntax audit"
node scripts/audit_topic_syntax.js

echo "[8/8] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
