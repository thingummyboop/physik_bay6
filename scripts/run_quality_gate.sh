#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/6] Quiz feedback audit"
node scripts/audit_quiz_feedback.js

echo "[2/6] Physics accessibility audit"
node scripts/audit_physics_a11y.js

echo "[3/6] Math accessibility audit"
node scripts/audit_math_a11y.js

echo "[4/6] Remaining-subject accessibility audit"
node scripts/audit_remaining_subjects_a11y.js

echo "[5/6] Inline alert audit"
node scripts/audit_inline_alerts.js

echo "[6/6] Git whitespace/conflict check"
git diff --check

echo "QUALITY_GATE_CLEAR"
