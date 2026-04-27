#!/usr/bin/env node
/**
 * Audit all language files for quiz/diploma answer options missing `feedback`.
 * Usage: node scripts/audit_quiz_feedback.js
 */
const fs = require('fs');
const path = require('path');

const langDir = path.join(__dirname, '..', 'lang');
const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.json')).sort();

function findMissingFeedback(node, pathParts = [], out = []) {
  if (Array.isArray(node)) {
    const isAnswerArray = node.length > 0 && node.every(
      (item) => item && typeof item === 'object' && 'text' in item && 'correct' in item
    );

    if (isAnswerArray) {
      node.forEach((answer, idx) => {
        if (typeof answer.feedback !== 'string' || !answer.feedback.trim()) {
          out.push(`${pathParts.join('.')}[${idx}]`);
        }
      });
    }

    node.forEach((item, idx) => findMissingFeedback(item, [...pathParts, String(idx)], out));
    return out;
  }

  if (node && typeof node === 'object') {
    Object.entries(node).forEach(([key, value]) => {
      findMissingFeedback(value, [...pathParts, key], out);
    });
  }

  return out;
}

let hasMissing = false;
for (const file of files) {
  const fullPath = path.join(langDir, file);
  const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const missing = findMissingFeedback(json);

  if (missing.length) {
    hasMissing = true;
    console.log(`${file}: ${missing.length} missing feedback fields`);
    missing.slice(0, 20).forEach((m) => console.log(`  - ${m}`));
    if (missing.length > 20) console.log(`  ... +${missing.length - 20} more`);
  } else {
    console.log(`${file}: OK`);
  }
}

if (hasMissing) {
  process.exitCode = 1;
} else {
  console.log('ALL_CLEAR');
}
