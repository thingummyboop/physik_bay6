#!/usr/bin/env node
/**
 * Audit structured single-choice questions and answer feedback in every language.
 * This validates data integrity, not the scientific correctness of an answer.
 * Usage: node scripts/audit_quiz_feedback.js
 */
const fs = require('fs');
const path = require('path');

const langDir = path.join(__dirname, '..', 'lang');
const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.json')).sort();
let checkedQuestions = 0;

function findInvalidQuestions(node, pathParts = [], out = []) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node.answers) && 'question' in node) {
    checkedQuestions++;
    const location = pathParts.join('.');
    if (typeof node.question !== 'string' || !node.question.trim()) out.push(`${location}: empty question`);
    if (node.answers.length < 2) out.push(`${location}: fewer than two options`);
    if (node.answers.filter(a => a?.correct === true).length !== 1) out.push(`${location}: expected exactly one correct option`);
    const seen = new Set();
    for (const [index, answer] of node.answers.entries()) {
      if (!answer || typeof answer.text !== 'string' || !answer.text.trim()) out.push(`${location}.answers[${index}]: empty option`);
      if (typeof answer?.correct !== 'boolean') out.push(`${location}.answers[${index}]: correct must be a boolean`);
      const text = String(answer?.text || '').replace(/\s+/g, ' ').trim().normalize('NFC');
      if (seen.has(text)) out.push(`${location}.answers[${index}]: duplicate option text`);
      seen.add(text);
    }
  }
  for (const [key, value] of Object.entries(node)) findInvalidQuestions(value, [...pathParts, key], out);
  return out;
}

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
  const invalid = findInvalidQuestions(json);
  if (invalid.length) {
    hasMissing = true;
    console.log(`${file}: ${invalid.length} invalid question fields`);
    invalid.slice(0, 20).forEach(issue => console.log(`  - ${issue}`));
  }

  if (missing.length) {
    hasMissing = true;
    console.log(`${file}: ${missing.length} missing feedback fields`);
    missing.slice(0, 20).forEach((m) => console.log(`  - ${m}`));
    if (missing.length > 20) console.log(`  ... +${missing.length - 20} more`);
  } else if (!invalid.length) {
    console.log(`${file}: OK`);
  }
}

if (hasMissing) {
  process.exitCode = 1;
} else {
  console.log(`ALL_CLEAR: ${checkedQuestions} structured question records. Content accuracy and translated equivalence need separate review.`);
}
