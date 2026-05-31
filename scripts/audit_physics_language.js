#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const langDir = path.join(repoRoot, 'lang');
const languageFiles = fs
  .readdirSync(langDir)
  .filter((file) => file.endsWith('.json') && file !== 'space_program.json')
  .sort();

const nonPhysicsTopics = new Set(['dgb5', 'wetter', 'klima', 'klimawandel']);
const nonPhysicsPrefixes = ['geo_', 'chemie_', 'bio_'];
const physicsTopics = fs
  .readdirSync(topicsDir)
  .filter((entry) => entry.endsWith('.js'))
  .map((entry) => entry.replace(/\.js$/, ''))
  .filter((topic) => !topic.startsWith('math'))
  .filter((topic) => !nonPhysicsPrefixes.some((prefix) => topic.startsWith(prefix)))
  .filter((topic) => !nonPhysicsTopics.has(topic))
  .sort();

const MAX_FEEDBACK_LENGTH = 180;
const GENERIC_FEEDBACK_MARKERS = new Set([
  'richtig',
  'falsch',
  'korrekt',
  'incorrect',
  'correct',
  'true',
  'false',
  'doğru',
  'yanlış',
  'tacno',
  'netacno',
  'pravilno',
  'nepravilno',
  'صح',
  'صحيح',
  'خطأ'
]);
const issues = [];
const perLanguageScanned = {};
const perLanguageTopicCoverage = {};

if (physicsTopics.length === 0) {
  console.error('PHYSICS_LANGUAGE_ISSUES');
  console.error('- _global: no_physics_topics_detected (No physics topic keys found for language audit)');
  process.exit(1);
}

const referenceLangPath = path.join(langDir, 'de.json');
const referenceLangData = JSON.parse(fs.readFileSync(referenceLangPath, 'utf8'));
const auditablePhysicsTopics = physicsTopics.filter((topic) => Object.prototype.hasOwnProperty.call(referenceLangData, topic));
const physicsTopicSet = new Set(auditablePhysicsTopics);

if (auditablePhysicsTopics.length === 0) {
  console.error('PHYSICS_LANGUAGE_ISSUES');
  console.error('- _global: no_auditable_physics_topics_detected (No physics topics with language content in de.json)');
  process.exit(1);
}

for (const fileName of languageFiles) {
  const langCode = path.basename(fileName, '.json');
  const langPath = path.join(langDir, fileName);
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  perLanguageScanned[langCode] = 0;
  perLanguageTopicCoverage[langCode] = new Map();

  for (const topicKey of auditablePhysicsTopics) {
    if (!Object.prototype.hasOwnProperty.call(langData, topicKey)) {
      issues.push({
        lang: langCode,
        path: topicKey,
        reason: 'missing_topic_key'
      });
      continue;
    }

    const scannedBefore = perLanguageScanned[langCode];
    walk(langData[topicKey], [topicKey], langCode);
    const scannedAfter = perLanguageScanned[langCode];
    perLanguageTopicCoverage[langCode].set(topicKey, scannedAfter - scannedBefore);
  }

  for (const [topicKey, scannedCount] of perLanguageTopicCoverage[langCode].entries()) {
    if (scannedCount === 0) {
      issues.push({
        lang: langCode,
        path: topicKey,
        reason: 'topic_has_no_feedback_entries'
      });
    }
  }
}

function normalizeFeedback(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.!?。،,:;\-_'"`()\[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
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
          reason: 'feedback_too_long',
          length: text.length
        });
      }

      const normalized = normalizeFeedback(text);
      if (GENERIC_FEEDBACK_MARKERS.has(normalized)) {
        issues.push({
          lang: langCode,
          path: trace.concat('answers', `[${idx}]`, 'feedback').join('.'),
          reason: 'feedback_too_generic'
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
    const lengthSuffix = typeof issue.length === 'number' ? ` (len=${issue.length})` : '';
    console.error(`- [${issue.lang}] ${issue.path}: ${issue.reason}${lengthSuffix}`);
  }
  process.exit(1);
}

const totalScanned = Object.values(perLanguageScanned).reduce((sum, value) => sum + value, 0);
console.log(`PHYSICS_LANGUAGE_CLEAR (${totalScanned} feedbacks across ${languageFiles.length} languages)`);
