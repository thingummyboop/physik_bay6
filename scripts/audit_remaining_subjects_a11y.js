#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

const remainingTopics = ['dgb5', 'wetter', 'klima', 'klimawandel'];
const findings = [];

for (const topic of remainingTopics) {
  const file = path.join(topicsDir, `${topic}.js`);

  if (!fs.existsSync(file)) {
    findings.push({ topic, issue: 'missing_file', detail: file });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');

  const hasLive = /aria-live/.test(source);
  const hasAtomic = /aria-atomic/.test(source);
  if (hasLive && !hasAtomic) {
    findings.push({
      topic,
      issue: 'live_without_atomic',
      detail: 'Contains aria-live but no aria-atomic marker.'
    });
  }

  const hasSlider = /Range|type=\"range\"|type='range'/.test(source);
  const hasValueText = /aria-valuetext/.test(source);
  if (hasSlider && !hasValueText) {
    findings.push({
      topic,
      issue: 'slider_without_aria_valuetext',
      detail: 'Potential range interaction without aria-valuetext annotation.'
    });
  }

  const hasDescribedBy = /aria-describedby/.test(source);
  if (hasSlider && !hasDescribedBy) {
    findings.push({
      topic,
      issue: 'slider_without_aria_describedby',
      detail: 'Potential range interaction without aria-describedby annotation.'
    });
  }
}

if (findings.length === 0) {
  console.log('REMAINING_SUBJECTS_A11Y_CLEAR');
  process.exit(0);
}

console.log('REMAINING_SUBJECTS_A11Y_ISSUES');
for (const finding of findings) {
  console.log(`- ${finding.topic}: ${finding.issue} (${finding.detail})`);
}
process.exit(1);
