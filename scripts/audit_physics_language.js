#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const langDir = path.join(repoRoot, 'lang');
const languageFiles = fs
  .readdirSync(langDir)
  .filter((file) => file.endsWith('.json'))
  .sort();

const nonPhysicsTopics = new Set(['dgb5', 'wetter', 'klima', 'klimawandel']);
const physicsTopics = fs
  .readdirSync(topicsDir)
  .filter((entry) => entry.endsWith('.js'))
  .map((entry) => entry.replace(/\.js$/, ''))
  .filter((topic) => !topic.startsWith('math'))
  .filter((topic) => !nonPhysicsTopics.has(topic))
  .sort();

const MAX_FEEDBACK_LENGTH = 180;
const issues = [];
const perLanguageScanned = {};

if (physicsTopics.length === 0) {
  console.error('PHYSICS_LANGUAGE_ISSUES');
  console.error('- _global: no_physics_topics_detected (No physics topic keys found for language audit)');
  process.exit(1);
}

const physicsTopicSet = new Set(physicsTopics);

for (const fileName of languageFiles) {
  const langCode = path.basename(fileName, '.json');
  const langPath = path.join(langDir, fileName);
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  perLanguageScanned[langCode] = 0;

  for (const [topicKey, topicValue] of Object.entries(langData)) {
    if (!physicsTopicSet.has(topicKey)) continue;
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
  console.error(`PHYSICS_LANGUAGE_ISSUES (${issues.length})`);
  for (const issue of issues) {
    console.error(`- [${issue.lang}] ${issue.path} (len=${issue.length})`);
  }
  process.exit(1);
}

const totalScanned = Object.values(perLanguageScanned).reduce((sum, value) => sum + value, 0);
console.log(`PHYSICS_LANGUAGE_CLEAR (${totalScanned} feedbacks across ${languageFiles.length} languages)`);
