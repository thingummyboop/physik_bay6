#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const de = JSON.parse(fs.readFileSync(path.join(repoRoot, 'lang', 'de.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(repoRoot, 'lang', 'en.json'), 'utf8'));

const newSubjectPrefixes = ['geo_', 'chemie_', 'bio_'];
const topicKeys = fs
  .readdirSync(topicsDir)
  .filter((entry) => entry.endsWith('.js'))
  .map((entry) => entry.replace(/\.js$/, ''))
  .filter((topic) => newSubjectPrefixes.some((prefix) => topic.startsWith(prefix)))
  .filter((topic) => Object.prototype.hasOwnProperty.call(de, topic))
  .sort();

const missingEn = topicKeys.filter((topic) => !Object.prototype.hasOwnProperty.call(en, topic));

if (missingEn.length > 0) {
  console.warn(`NEW_SUBJECT_EN_BLOCK_WARNING (${missingEn.length}/${topicKeys.length} missing EN blocks)`);
  for (const topic of missingEn) {
    console.warn(`- ${topic}: missing lang/en.json block; runtime would fall back to German`);
  }
  process.exit(0);
}

console.log(`NEW_SUBJECT_EN_BLOCKS_CLEAR (${topicKeys.length} topics checked)`);
