#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const topics = [
  'geo_oesterreich_alltag',
  'chemie_alltag_stoffe'
];

const issues = [];

for (const topic of topics) {
  const file = path.join(topicsDir, `${topic}.js`);
  if (!fs.existsSync(file)) {
    issues.push({ level: 'FAIL', topic, issue: 'missing_topic_script' });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');

  requirePattern(topic, source, /interactive-zone/, 'missing_interactive_zone');
  requirePattern(topic, source, /aria-live=["']polite["']/, 'missing_aria_live');
  requirePattern(topic, source, /aria-atomic=["']true["']/, 'missing_aria_atomic');
  requirePattern(topic, source, /role=["']status["']/, 'missing_status_role');
  requirePattern(topic, source, /dataset\.[A-Za-z0-9]+Ready\s*===\s*['"]true['"]/, 'missing_reinit_guard');
  requirePattern(topic, source, /addEventListener\(\s*['"]click['"]/, 'missing_listener_binding');

  if (/type=["']range["']/.test(source)) {
    requirePattern(topic, source, /aria-describedby=["'][^"']+["']/, 'slider_missing_aria_describedby');
    requirePattern(topic, source, /setAttribute\(\s*['"]aria-valuetext['"]/, 'slider_missing_aria_valuetext_assignment');
  }

  if (/\balert\s*\(/.test(source)) {
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
