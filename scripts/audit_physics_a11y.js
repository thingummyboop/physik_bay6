#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

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

const findings = [];

if (physicsTopics.length === 0) {
  console.log('PHYSICS_A11Y_ISSUES');
  console.log('- _global: no_physics_topics_detected (No physics topic scripts found for audit)');
  process.exit(1);
}

for (const topic of physicsTopics) {
  const file = path.join(topicsDir, `${topic}.js`);

  if (!fs.existsSync(file)) {
    findings.push({ topic, issue: 'missing_file', detail: file });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');

  if (source.includes('alert(')) {
    findings.push({
      topic,
      issue: 'inline_alert_usage',
      detail: 'Contains alert(...). Prefer in-page feedback with live regions.'
    });
  }

  const hasLive = source.includes('aria-live') || source.includes("'aria-live'") || source.includes('"aria-live"');
  const hasAtomic = source.includes('aria-atomic') || source.includes("'aria-atomic'") || source.includes('"aria-atomic"');
  const hasStatusRole =
    source.includes('role="status"') ||
    source.includes("role='status'") ||
    source.includes("'role', 'status'") ||
    source.includes('"role", "status"');

  if (hasLive && !hasAtomic) {
    findings.push({
      topic,
      issue: 'live_without_atomic',
      detail: 'Contains aria-live but no aria-atomic marker.'
    });
  }

  if (hasAtomic && !hasLive) {
    findings.push({
      topic,
      issue: 'atomic_without_live',
      detail: 'Contains aria-atomic but no aria-live marker.'
    });
  }

  if (hasLive && !hasStatusRole) {
    findings.push({
      topic,
      issue: 'live_without_status_role',
      detail: 'Contains aria-live but no status role marker.'
    });
  }

  const hasKeydownSupport = source.includes('keydown');
  const hasKeyboardActivation = /addEventListener\(\s*['"]keydown['"][\s\S]{0,900}?(?:\.click\(\)|preventDefault\(\))/m.test(source);
  const enterRegexes = [
    /\b\w+\.key\s*[!=]==?\s*['"]Enter['"]/, // equality or guard inequality checks
    /includes\(\s*['"]Enter['"]\s*\)/,
    /\[[^\]]*['"]Enter['"][^\]]*\]/
  ];
  const spaceRegexes = [
    /\b\w+\.key\s*[!=]==?\s*['"]\s['"]/, // literal space key
    /\b\w+\.code\s*[!=]==?\s*['"]Space['"]/, // physical space key
    /\b\w+\.key\s*[!=]==?\s*['"]Spacebar['"]/, // legacy browsers
    /includes\(\s*['"]\s['"]\s*\)/,
    /includes\(\s*['"]Space['"]\s*\)/,
    /\[[^\]]*['"]\s['"][^\]]*\]/
  ];
  const hasEnterSupport = enterRegexes.some((pattern) => pattern.test(source));
  const hasSpaceSupport = spaceRegexes.some((pattern) => pattern.test(source));
  const hasPressedState = source.includes('aria-pressed');
  const hasButtonRoleSemantics =
    source.includes("setAttribute('role', 'button')") ||
    source.includes('setAttribute("role", "button")') ||
    source.includes('role="button"') ||
    source.includes("role='button'");
  const hasTabindexSemantics =
    source.includes("setAttribute('tabindex', '0')") ||
    source.includes('setAttribute("tabindex", "0")') ||
    source.includes('tabindex="0"') ||
    source.includes("tabindex='0'");

  const interactiveMarkers = [
    'data-predict-',
    'data-predict-group',
    'data-predict-value',
    'data-work-case',
    'data-lift-object',
    'data-surface',
    'data-ramp',
    'data-slit-prediction',
    'data-formula-target'
  ];

  for (const marker of interactiveMarkers) {
    if (!source.includes(marker)) continue;

    if (!hasKeydownSupport || !hasKeyboardActivation || !hasEnterSupport || !hasSpaceSupport || !hasPressedState) {
      findings.push({
        topic,
        issue: 'interactive_controls_incomplete_a11y',
        detail: `${marker} found; keydown=${hasKeydownSupport}, keyboardActivation=${hasKeyboardActivation}, enter=${hasEnterSupport}, space=${hasSpaceSupport}, ariaPressed=${hasPressedState}`
      });
    }

    if (!hasButtonRoleSemantics || !hasTabindexSemantics) {
      findings.push({
        topic,
        issue: 'interactive_controls_missing_role_tabindex_semantics',
        detail: `${marker} found; roleButton=${hasButtonRoleSemantics}, tabindex0=${hasTabindexSemantics}`
      });
    }
  }

  const hasSlider = source.includes('Range') || source.includes('Slider') || source.includes('type="range"') || source.includes("type='range'");
  const hasValueText = source.includes('aria-valuetext');
  const hasDescribedBy = source.includes('aria-describedby');
  const hasValueTextAssignment = /setAttribute\(\s*['"]aria-valuetext['"]/.test(source);
  if (hasSlider && !hasValueText) {
    findings.push({
      topic,
      issue: 'slider_without_aria_valuetext',
      detail: 'Potential range interaction without aria-valuetext annotation.'
    });
  }

  if (hasSlider && !hasDescribedBy) {
    findings.push({
      topic,
      issue: 'slider_without_aria_describedby',
      detail: 'Potential range interaction without aria-describedby annotation.'
    });
  }

  if (hasSlider && !hasValueTextAssignment) {
    findings.push({
      topic,
      issue: 'slider_missing_aria_valuetext_assignment',
      detail: 'Potential range interaction found, but no setAttribute("aria-valuetext", ...) assignment detected in topic script.'
    });
  }
}

if (findings.length === 0) {
  console.log(`PHYSICS_A11Y_CLEAR (${physicsTopics.length} topics)`);
  process.exit(0);
}

console.log('PHYSICS_A11Y_ISSUES');
for (const finding of findings) {
  console.log(`- ${finding.topic}: ${finding.issue} (${finding.detail})`);
}
process.exit(1);
