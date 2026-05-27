#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const langDir = path.join(repoRoot, 'lang');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const baselinePath = path.join(__dirname, 'baselines', 'visual_darkmode_svg_text_allowlist.json');
const updateBaseline = process.argv.includes('--update-baseline');

const mojibakePattern = /[\u00c3\u00c2\ufffd]|\u00e2\u20ac|[A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df]\?[A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df]/;

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function walkStrings(value, visitor, pathParts = []) {
  if (typeof value === 'string') {
    visitor(value, pathParts);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, visitor, pathParts.concat(index)));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      walkStrings(child, visitor, pathParts.concat(key));
    }
  }
}

function normalizeSnippet(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function tagName(tag) {
  const match = tag.match(/^<\/?\s*([A-Za-z0-9:_-]+)/);
  return match ? match[1].toLowerCase() : '';
}

function tagHasFill(tag) {
  return /\sfill\s*=\s*["'][^"']+["']|style\s*=\s*["'][^"']*fill\s*:/i.test(tag);
}

function tagHasClass(tag) {
  return /\sclass\s*=/.test(tag);
}

function scanSvgTextColor(svg, location, issues) {
  const tagPattern = /<\/?[A-Za-z][^>]*>/g;
  const stack = [];
  let match;

  while ((match = tagPattern.exec(svg))) {
    const tag = match[0];
    const name = tagName(tag);
    if (!name) continue;

    if (/^<\//.test(tag)) {
      let index = stack.length - 1;
      while (index >= 0 && stack[index].name !== name) index -= 1;
      if (index >= 0) stack.length = index;
      continue;
    }

    const selfClosing = /\/\s*>$/.test(tag);
    const inheritedFill = stack.some((entry) => entry.hasFill);

    if (name === 'text' && !tagHasFill(tag) && !inheritedFill && !tagHasClass(tag)) {
      issues.push(`${location}: ${normalizeSnippet(tag)}`);
    }

    const nonContainer = new Set([
      'path',
      'circle',
      'ellipse',
      'rect',
      'line',
      'polyline',
      'polygon',
      'stop',
      'animate',
      'animatemotion',
      'source',
      'img',
      'br',
      'hr',
    ]);

    if (!selfClosing && !nonContainer.has(name)) {
      stack.push({ name, hasFill: tagHasFill(tag) });
    }
  }
}

function scanInlineSvgs(value, location, issues) {
  const svgs = value.match(/<svg\b[\s\S]*?<\/svg>/gi) || [];
  svgs.forEach((svg, index) => scanSvgTextColor(svg, `${location} svg${index + 1}`, issues));
}

function collectLangIssues() {
  const encodingIssues = [];
  const svgTextIssues = [];
  const langFiles = fs.readdirSync(langDir).filter((file) => file.endsWith('.json')).sort();

  for (const file of langFiles) {
    const data = readJson(path.join(langDir, file));
    walkStrings(data, (value, pathParts) => {
      const location = `lang/${file}:${pathParts.join('.')}`;

      if (mojibakePattern.test(value)) {
        encodingIssues.push(`${location}: ${normalizeSnippet(value).slice(0, 180)}`);
      }

      scanInlineSvgs(value, location, svgTextIssues);
    });
  }

  return { encodingIssues, svgTextIssues };
}

function collectTopicJsSvgIssues() {
  const issues = [];
  if (!fs.existsSync(topicsDir)) return issues;

  const files = fs.readdirSync(topicsDir).filter((file) => file.endsWith('.js')).sort();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(topicsDir, file), 'utf8');
    scanInlineSvgs(raw, `js/topics/${file}`, issues);
  }

  return issues;
}

const { encodingIssues, svgTextIssues } = collectLangIssues();
const allSvgIssues = [...new Set(svgTextIssues.concat(collectTopicJsSvgIssues()))].sort();

if (updateBaseline) {
  fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
  fs.writeFileSync(
    baselinePath,
    `${JSON.stringify(
      {
        note: 'Known legacy inline SVG text labels without explicit fill. New entries fail audit_visual_i18n_darkmode.js.',
        svgTextWithoutColor: allSvgIssues,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
  console.log(`VISUAL_I18N_DARKMODE_BASELINE_UPDATED (${allSvgIssues.length} known entries)`);
  process.exit(0);
}

const failures = [];

if (encodingIssues.length > 0) {
  failures.push('VISUAL_I18N_ENCODING_ISSUES');
  for (const issue of encodingIssues.slice(0, 40)) failures.push(`- ${issue}`);
  if (encodingIssues.length > 40) failures.push(`... ${encodingIssues.length - 40} more`);
}

if (!fs.existsSync(baselinePath)) {
  failures.push(`VISUAL_DARKMODE_BASELINE_MISSING: ${path.relative(repoRoot, baselinePath)}`);
} else {
  const baseline = readJson(baselinePath);
  const allowed = new Set(baseline.svgTextWithoutColor || []);
  const current = new Set(allSvgIssues);
  const newIssues = allSvgIssues.filter((issue) => !allowed.has(issue));
  const staleEntries = [...allowed].filter((issue) => !current.has(issue));

  if (newIssues.length > 0) {
    failures.push('VISUAL_DARKMODE_NEW_SVG_TEXT_ISSUES');
    for (const issue of newIssues.slice(0, 40)) failures.push(`- ${issue}`);
    if (newIssues.length > 40) failures.push(`... ${newIssues.length - 40} more`);
  }

  if (staleEntries.length > 0) {
    console.log(`VISUAL_DARKMODE_BASELINE_STALE (${staleEntries.length} entries can be removed)`);
  }
}

if (failures.length > 0) {
  console.log(failures.join('\n'));
  process.exit(1);
}

console.log(`VISUAL_I18N_DARKMODE_CLEAR (encoding=clear, svg_known_debt=${allSvgIssues.length})`);
