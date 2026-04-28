#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const langDir = path.join(repoRoot, 'lang');
const languageFiles = fs
  .readdirSync(langDir)
  .filter((file) => file.endsWith('.json'))
  .sort();

const REMAINING_TOPIC_PATTERN = /^(dgb\d*|wetter|klima|klimawandel)$/i;
const MAX_FEEDBACK_LENGTH = 180;

const issues = [];
const perLanguageScanned = {};

for (const fileName of languageFiles) {
  const langCode = path.basename(fileName, '.json');
  const langPath = path.join(langDir, fileName);
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  perLanguageScanned[langCode] = 0;

  for (const [topicKey, topicValue] of Object.entries(langData)) {
    if (!REMAINING_TOPIC_PATTERN.test(topicKey)) continue;
    walk(topicValue, [topicKey], langCode);
  }
}

function walk(node, trace, langCode) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, trace.concat(`[${idx}]`), langCode));
    return;
  }

  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node.answers)) {
    node.answers.forEach((answer, idx) => {
      if (!answer || typeof answer.feedback !== 'string') return;

      perLanguageScanned[langCode] += 1;
      const text = answer.feedback.trim();
      if (text.length > MAX_FEEDBACK_LENGTH) {
        issues.push({
          lang: langCode,
          path: trace.concat('answers', `[${idx}]`, 'feedback').join('.'),
          length: text.length
        });
      }
    });
  }

  for (const [key, value] of Object.entries(node)) {
    walk(value, trace.concat(key), langCode);
  }
}

if (issues.length > 0) {
  console.error(`REMAINING_SUBJECTS_LANGUAGE_ISSUES (${issues.length})`);
  for (const issue of issues) {
    console.error(`- [${issue.lang}] ${issue.path} (len=${issue.length})`);
  }
  process.exit(1);
}

const totalScanned = Object.values(perLanguageScanned).reduce((sum, value) => sum + value, 0);
console.log(`REMAINING_SUBJECTS_LANGUAGE_CLEAR (${totalScanned} feedbacks across ${languageFiles.length} languages)`);
