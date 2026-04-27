#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

const physicsTopics = [
  'akustik',
  'arbeit',
  'astronomie',
  'drehundstatik',
  'elektrizitaet',
  'elektromagnetismus',
  'energie',
  'farben',
  'kraft_und_bewegung',
  'licht_schatten_astronomie',
  'linsen_spiegel',
  'optik1',
  'rechenbeispiele',
  'sieinheiten',
  'waermelehre'
];

const findings = [];

for (const topic of physicsTopics) {
  const file = path.join(topicsDir, `${topic}.js`);

  if (!fs.existsSync(file)) {
    findings.push({ topic, issue: 'missing_file', detail: file });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');

  const hasLive = source.includes("aria-live") || source.includes("'aria-live'") || source.includes('"aria-live"');
  const hasAtomic = source.includes("aria-atomic") || source.includes("'aria-atomic'") || source.includes('"aria-atomic"');

  if (hasLive && !hasAtomic) {
    findings.push({
      topic,
      issue: 'live_without_atomic',
      detail: 'Contains aria-live but no aria-atomic marker.'
    });
  }

  const usesPredictiveSelections = source.includes('data-predict-');
  const hasPredictKeyboardSupport = source.includes('keydown') && (source.includes("' '") || source.includes('" "') || source.includes('Spacebar'));
  const hasPressedState = source.includes('aria-pressed');

  if (usesPredictiveSelections && (!hasPredictKeyboardSupport || !hasPressedState)) {
    findings.push({
      topic,
      issue: 'predict_controls_incomplete_a11y',
      detail: `predictive UI found; keyboard=${hasPredictKeyboardSupport}, ariaPressed=${hasPressedState}`
    });
  }

  const hasSlider = source.includes('Range') || source.includes('type="range"') || source.includes("type='range'");
  const hasValueText = source.includes('aria-valuetext');
  if (hasSlider && !hasValueText) {
    findings.push({
      topic,
      issue: 'slider_without_aria_valuetext',
      detail: 'Potential range interaction without aria-valuetext annotation.'
    });
  }
}

if (findings.length === 0) {
  console.log('PHYSICS_A11Y_CLEAR');
  process.exit(0);
}

console.log('PHYSICS_A11Y_ISSUES');
for (const finding of findings) {
  console.log(`- ${finding.topic}: ${finding.issue} (${finding.detail})`);
}
process.exit(1);
