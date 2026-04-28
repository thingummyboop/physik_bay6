#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const langDir = path.join(repoRoot, 'lang');
const topics = [
  'geo_oesterreich_alltag',
  'chemie_alltag_stoffe',
  'bio_koerper_gesundheit'
];
const languages = ['de', 'en'];
const maxAverageSentenceWords = 16;
const maxSingleSentenceWords = 30;

const findings = [];

for (const lang of languages) {
  const data = JSON.parse(fs.readFileSync(path.join(langDir, `${lang}.json`), 'utf8'));

  for (const topic of topics) {
    const block = data[topic];
    if (!block) {
      findings.push({ level: 'FAIL', lang, topic, section: '_topic', issue: 'missing_topic_block' });
      continue;
    }

    if (!Array.isArray(block.sections) || block.sections.length < 3) {
      findings.push({ level: 'FAIL', lang, topic, section: '_topic', issue: 'too_few_sections' });
      continue;
    }

    block.sections.forEach((section, index) => auditSection(lang, topic, section, index));
  }
}

function auditSection(lang, topic, section, index) {
  const sectionLabel = section.id || `section_${index + 1}`;
  const content = String(section.content || '');
  const plain = stripHtml(content);

  const rememberPattern = lang === 'de' ? /\bMerke\b/i : /\bRemember\b/i;
  if (!rememberPattern.test(plain)) {
    findings.push({ level: 'FAIL', lang, topic, section: sectionLabel, issue: 'missing_remember_box' });
  }

  if (!/(misconception|mix-up|Fehlvorstellung|Verwechslung|Denkfehler)/i.test(plain)) {
    findings.push({ level: 'FAIL', lang, topic, section: sectionLabel, issue: 'missing_misconception' });
  }

  if (!/\bTransfer\b/i.test(plain)) {
    findings.push({ level: 'FAIL', lang, topic, section: sectionLabel, issue: 'missing_transfer_task' });
  }

  const sentences = plain
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const wordCounts = sentences.map(countWords).filter((count) => count > 0);
  if (wordCounts.length === 0) {
    findings.push({ level: 'FAIL', lang, topic, section: sectionLabel, issue: 'no_readable_sentences' });
    return;
  }

  const average = wordCounts.reduce((sum, count) => sum + count, 0) / wordCounts.length;
  const longest = Math.max(...wordCounts);

  if (average > maxAverageSentenceWords) {
    findings.push({
      level: 'WARN',
      lang,
      topic,
      section: sectionLabel,
      issue: 'a2_b1_average_sentence_length',
      detail: `avg=${average.toFixed(1)}`
    });
  }

  if (longest > maxSingleSentenceWords) {
    findings.push({
      level: 'WARN',
      lang,
      topic,
      section: sectionLabel,
      issue: 'a2_b1_long_sentence',
      detail: `max=${longest}`
    });
  }
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{QUIZ_[^}]+\}\}/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(sentence) {
  const matches = sentence.match(/[A-Za-zÄÖÜäöüß]+(?:[-'][A-Za-zÄÖÜäöüß]+)?|\d+/g);
  return matches ? matches.length : 0;
}

const fails = findings.filter((finding) => finding.level === 'FAIL');
const warns = findings.filter((finding) => finding.level === 'WARN');

if (findings.length > 0) {
  console.log(`NEW_SUBJECT_DIDACTIC_AUDIT ${fails.length} fail(s), ${warns.length} warn(s)`);
  for (const finding of findings) {
    const detail = finding.detail ? ` (${finding.detail})` : '';
    console.log(`- ${finding.level} [${finding.lang}] ${finding.topic}.${finding.section}: ${finding.issue}${detail}`);
  }
}

if (fails.length > 0) {
  process.exit(1);
}

console.log(`NEW_SUBJECT_DIDACTIC_CLEAR (${topics.length} topics, ${languages.length} languages, warnings=${warns.length})`);
