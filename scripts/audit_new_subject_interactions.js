#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const topics = [
  'geo_oesterreich_alltag',
  'chemie_alltag_stoffe',
  'bio_koerper_gesundheit'
];

const issues = [];

for (const topic of topics) {
  const file = path.join(topicsDir, `${topic}.js`);
  if (!fs.existsSync(file)) {
    issues.push({ level: 'FAIL', topic, issue: 'missing_topic_script' });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');
  const commonChemistryFile = path.join(topicsDir, 'chemie_common.js');
  const effectiveSource = topic.startsWith('chemie_') && fs.existsSync(commonChemistryFile)
    ? `${source}\n${fs.readFileSync(commonChemistryFile, 'utf8')}`
    : source;

  requirePattern(topic, effectiveSource, /interactive-zone/, 'missing_interactive_zone');
  requirePattern(topic, effectiveSource, /aria-live=["']polite["']|setAttribute\(\s*['"]aria-live['"]\s*,\s*['"]polite['"]/, 'missing_aria_live');
  requirePattern(topic, effectiveSource, /aria-atomic=["']true["']|setAttribute\(\s*['"]aria-atomic['"]\s*,\s*['"]true['"]/, 'missing_aria_atomic');
  requirePattern(topic, effectiveSource, /role=["']status["']|setAttribute\(\s*['"]role['"]\s*,\s*['"]status['"]/, 'missing_status_role');
  requirePattern(topic, effectiveSource, /dataset\.[A-Za-z0-9]+Ready\s*===\s*['"]true['"]|dataset\.chemReady\s*===\s*['"]true['"]/, 'missing_reinit_guard');
  requirePattern(topic, effectiveSource, /addEventListener\(\s*['"]click['"]/, 'missing_listener_binding');

  if (/type=["']range["']/.test(source)) {
    requirePattern(topic, effectiveSource, /aria-describedby=["'][^"']+["']/, 'slider_missing_aria_describedby');
    requirePattern(topic, effectiveSource, /setAttribute\(\s*['"]aria-valuetext['"]/, 'slider_missing_aria_valuetext_assignment');
  }

  if (/\balert\s*\(/.test(effectiveSource)) {
    issues.push({ level: 'FAIL', topic, issue: 'inline_alert_usage' });
  }
}

function requirePattern(topic, source, pattern, issue) {
  if (!pattern.test(source)) {
    issues.push({ level: 'FAIL', topic, issue });
  }
}

if (issues.length > 0) {
  console.error(`NEW_SUBJECT_INTERACTION_A11Y_ISSUES (${issues.length})`);
  for (const finding of issues) {
    console.error(`- ${finding.level} ${finding.topic}: ${finding.issue}`);
  }
  process.exit(1);
}

console.log(`NEW_SUBJECT_INTERACTION_A11Y_CLEAR (${topics.length} topics)`);
