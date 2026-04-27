#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

const mathTopics = fs
  .readdirSync(topicsDir)
  .filter((name) => /^math\d+_.+\.js$/.test(name))
  .map((name) => name.replace(/\.js$/, ''))
  .sort();

const findings = [];

if (mathTopics.length === 0) {
  console.log('MATH_A11Y_ISSUES');
  console.log('- _global: no_math_topics_detected (No math topic scripts found for audit)');
  process.exit(1);
}

for (const topic of mathTopics) {
  const file = path.join(topicsDir, `${topic}.js`);
  const source = fs.readFileSync(file, 'utf8');

  if (source.includes('alert(')) {
    findings.push({
      topic,
      issue: 'inline_alert_usage',
      detail: 'Contains alert(...). Prefer in-page feedback with live regions.'
    });
  }

  const hasLive = source.includes('aria-live');
  const hasAtomic = source.includes('aria-atomic');
  const hasStatusRole = source.includes('role="status"') || source.includes("role='status'") || source.includes("'role', 'status'") || source.includes('"role", "status"');
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

  const interactiveMarkers = ['data-predict-', 'data-prism-view'];
  const hasInteractiveSelections = interactiveMarkers.some((marker) => source.includes(marker));
  const hasKeydownSupport = source.includes('keydown');
  const enterRegexes = [
    /\b\w+\.key\s*[!=]==?\s*['"]Enter['"]/,
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

  if (hasInteractiveSelections && (!hasKeydownSupport || !hasEnterSupport || !hasSpaceSupport || !hasPressedState)) {
    findings.push({
      topic,
      issue: 'interactive_controls_incomplete_a11y',
      detail: `interactive UI found; keydown=${hasKeydownSupport}, enter=${hasEnterSupport}, space=${hasSpaceSupport}, ariaPressed=${hasPressedState}`
    });
  }

  if (hasInteractiveSelections && (!hasButtonRoleSemantics || !hasTabindexSemantics)) {
    findings.push({
      topic,
      issue: 'interactive_controls_missing_role_tabindex_semantics',
      detail: `interactive UI found; roleButton=${hasButtonRoleSemantics}, tabindex0=${hasTabindexSemantics}`
    });
  }

  const hasRange = source.includes('Range') || source.includes('type="range"') || source.includes("type='range'");
  const hasValueText = source.includes('aria-valuetext');
  const hasDescribedBy = source.includes('aria-describedby');
  const hasValueTextAssignment = /setAttribute\(\s*['"]aria-valuetext['"]/.test(source);
  if (hasRange && !hasValueText) {
    findings.push({
      topic,
      issue: 'slider_without_aria_valuetext',
      detail: 'Potential range interaction without aria-valuetext annotation.'
    });
  }

  if (hasRange && !hasDescribedBy) {
    findings.push({
      topic,
      issue: 'slider_without_aria_describedby',
      detail: 'Potential range interaction without aria-describedby annotation.'
    });
  }

  if (hasRange && !hasValueTextAssignment) {
    findings.push({
      topic,
      issue: 'slider_missing_aria_valuetext_assignment',
      detail: 'Potential range interaction found, but no setAttribute("aria-valuetext", ...) assignment detected in topic script.'
    });
  }
}

if (findings.length === 0) {
  console.log(`MATH_A11Y_CLEAR (${mathTopics.length} topics)`);
  process.exit(0);
}

console.log('MATH_A11Y_ISSUES');
for (const finding of findings) {
  console.log(`- ${finding.topic}: ${finding.issue} (${finding.detail})`);
}
process.exit(1);
