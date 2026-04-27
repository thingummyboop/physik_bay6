#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dePath = path.join(repoRoot, 'lang', 'de.json');
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const PHYSICS_TOPIC_PATTERN = /(kraft|beweg|energie|waerme|elektr|akust|optik|linsen|astr|arbeit|farbe|dreh|statik|sieinheiten|rechenbeispiele|elektromagnetismus|licht_schatten_astronomie)/i;
const MAX_FEEDBACK_LENGTH = 180;

const issues = [];
let scanned = 0;

for (const [topicKey, topicValue] of Object.entries(de)) {
  if (!PHYSICS_TOPIC_PATTERN.test(topicKey)) continue;

  walk(topicValue, [topicKey]);
}

function walk(node, trace) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, trace.concat(`[${idx}]`)));
    return;
  }

  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node.answers)) {
    node.answers.forEach((answer, idx) => {
      if (!answer || typeof answer.feedback !== 'string') return;
      scanned += 1;
      const text = answer.feedback.trim();
      if (text.length > MAX_FEEDBACK_LENGTH) {
        issues.push({
          path: trace.concat('answers', `[${idx}]`, 'feedback').join('.'),
          length: text.length,
          text
        });
      }
    });
  }

  for (const [key, value] of Object.entries(node)) {
    walk(value, trace.concat(key));
  }
}

if (issues.length > 0) {
  console.error(`PHYSICS_LANGUAGE_ISSUES (${issues.length})`);
  for (const issue of issues) {
    console.error(`- ${issue.path} (len=${issue.length})`);
  }
  process.exit(1);
}

console.log(`PHYSICS_LANGUAGE_CLEAR (${scanned} feedbacks)`);
