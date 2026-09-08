#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(repoRoot, 'js', 'curriculum.js'), 'utf8'), context, { timeout: 1000 });
const entries = context.window.SCIVERSE_CURRICULUM?.mathematik?.topics;
if (!Array.isArray(entries) || entries.some(entry => !/^[a-z0-9_]+$/.test(entry.id)) || new Set(entries.map(entry => entry.id)).size !== entries.length) {
  console.error('MATH_A11Y_ISSUES: missing or invalid mathematics catalog');process.exit(1);
}
const mathTopics = entries.map(entry => entry.id).sort();

const findings = [];
const germanChapters = JSON.parse(fs.readFileSync(path.join(repoRoot, 'lang', 'de.json'), 'utf8'));

if (mathTopics.length === 0) {
  console.log('MATH_A11Y_ISSUES');
  console.log('- _global: no_math_topics_detected (No math topic scripts found for audit)');
  process.exit(1);
}

for (const topic of mathTopics) {
  const file = path.join(topicsDir, `${topic}.js`);
  if (!fs.existsSync(file) || !germanChapters[topic]?.sections?.length) { findings.push({ topic, issue: 'missing_source', detail: 'Missing script or German chapter content' }); continue; }
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
  const hasStatusRole = /role\s*=\s*['"]status['"]/.test(source) || /setAttribute\(\s*['"]role['"]\s*,\s*['"]status['"]\s*\)/.test(source);
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

  const interactiveMarkers = ['data-predict-', 'data-prism-view', 'data-prism-part'];
  const hasInteractiveSelections = interactiveMarkers.some((marker) => source.includes(marker));
  // Native buttons already provide focus and Enter/Space activation. Inspect the
  // actual chapter markup as well as script templates before requiring custom handlers.
  const chapterMarkup = (germanChapters[topic]?.sections || []).map(section => section.content || '').join('\n');
  const selectionTags = [...(chapterMarkup + '\n' + source).matchAll(/<([a-z][\w-]*)\b[^>]*\bdata-(?:predict-[\w-]*|prism-view|prism-part)(?:\s|=|>)[^>]*>/gi)];
  const nativeSelections = selectionTags.length > 0 && selectionTags.every(match =>
    match[1].toLowerCase() === 'button' && !/\b(?:disabled|tabindex\s*=\s*['"]?-1)/i.test(match[0]));
  const hasKeydownSupport = source.includes('keydown');
  const hasKeyboardActivation = /addEventListener\(\s*['"]keydown['"][\s\S]{0,900}?(?:\.click\(\)|preventDefault\(\))/m.test(source);
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

  if (hasInteractiveSelections && (!hasPressedState || (!nativeSelections && (!hasKeydownSupport || !hasKeyboardActivation || !hasEnterSupport || !hasSpaceSupport)))) {
    findings.push({
      topic,
      issue: 'interactive_controls_incomplete_a11y',
      detail: `interactive UI found; keydown=${hasKeydownSupport}, keyboardActivation=${hasKeyboardActivation}, enter=${hasEnterSupport}, space=${hasSpaceSupport}, ariaPressed=${hasPressedState}`
    });
  }

  if (hasInteractiveSelections && !nativeSelections && (!hasButtonRoleSemantics || !hasTabindexSemantics)) {
    findings.push({
      topic,
      issue: 'interactive_controls_missing_role_tabindex_semantics',
      detail: `interactive UI found; roleButton=${hasButtonRoleSemantics}, tabindex0=${hasTabindexSemantics}`
    });
  }

  // Native ranges expose numeric values; extra value text is conditional.
  const dom = new JSDOM(germanChapters[topic].sections.map(section => section.content || '').join('\n'), { runScripts: 'outside-only' });
  const doc = dom.window.document;
  if (doc.querySelector('[data-area-lab]')) { dom.window.eval(fs.readFileSync(path.join(repoRoot, 'js', 'area-lab.js'), 'utf8'));dom.window.initAreaLabs(); }
  for (const input of doc.querySelectorAll('input[type="range"]')) {
    const ids = (input.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
    const named = input.getAttribute('aria-label')?.trim() ||
      (ids.length && ids.every(id => doc.getElementById(id)?.textContent.trim())) ||
      [...(input.labels || [])].some(label => label.textContent.trim());
    if (!named) findings.push({ topic, issue: 'range_without_authored_label', detail: input.id || input.outerHTML.slice(0,100) });
  }
  dom.window.close();

}

if (findings.length === 0) {
  console.log(`MATH_A11Y_CLEAR (${mathTopics.length} curriculum topics; source checks and initialized area labels only)`);
  process.exit(0);
}

console.log('MATH_A11Y_ISSUES');
for (const finding of findings) {
  console.log(`- ${finding.topic}: ${finding.issue} (${finding.detail})`);
}
process.exit(1);
