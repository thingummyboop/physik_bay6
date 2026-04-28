#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const enPath = path.join(repoRoot, 'lang', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const defaultScopedTopics = ['math2_6_prop_prozent', 'math1_7_gleichungen', 'math1_2_nat_zahlen', 'math1_3_add_sub', 'math3_1_rationale_zahlen'];
const scopedTopics = (process.env.MATH_EN_CONSISTENCY_TOPICS || defaultScopedTopics.join(','))
  .split(',')
  .map((topic) => topic.trim())
  .filter(Boolean)
  .filter((topic) => Object.prototype.hasOwnProperty.call(en, topic));

if (scopedTopics.length === 0) {
  console.error('MATH_EN_CONSISTENCY_ISSUES');
  console.error('- _global: no_auditable_math_topics_detected');
  process.exit(1);
}

const baselinePath = path.join(repoRoot, 'scripts', 'baselines', 'math_en_consistency_allowlist.json');
const baseline = fs.existsSync(baselinePath)
  ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
  : { knownIssuePaths: [] };
const allowlist = new Set((baseline.knownIssuePaths || []).filter(Boolean));

const germanWordRegex = /\b(der|die|das|und|oder|nicht|kein(?:e|en|em|er)?|weil|wenn|dann|mit|ohne|aus|bei|zum|zur|vom|im|ist|sind|wird|werden|ein(?:e|en|em|er)?|richtig|falsch|antwort)\b/i;
const issues = [];
let scanned = 0;

for (const topic of scopedTopics) {
  walk(en[topic], [topic]);
}

function walk(node, trace) {
  if (typeof node === 'string') {
    const text = node.trim();
    if (!text) return;
    scanned += 1;

    if (/[äöüß]/i.test(text)) {
      issues.push({ path: trace.join('.'), reason: 'contains_umlaut', sample: text.slice(0, 120) });
      return;
    }

    if (germanWordRegex.test(text)) {
      issues.push({ path: trace.join('.'), reason: 'contains_german_wording', sample: text.slice(0, 120) });
    }
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, trace.concat(`[${idx}]`)));
    return;
  }

  if (!node || typeof node !== 'object') return;

  for (const [key, value] of Object.entries(node)) {
    walk(value, trace.concat(key));
  }
}

const newIssues = issues.filter((issue) => !allowlist.has(issue.path));
const resolvedDebt = [...allowlist].filter((pathKey) => !issues.some((issue) => issue.path === pathKey));

if (newIssues.length > 0) {
  console.error(`MATH_EN_CONSISTENCY_ISSUES (${newIssues.length} new, ${issues.length} total)`);
  for (const issue of newIssues.slice(0, 200)) {
    console.error(`- ${issue.path}: ${issue.reason} :: ${issue.sample}`);
  }
  if (newIssues.length > 200) {
    console.error(`- ... ${newIssues.length - 200} more new issues`);
  }
  process.exit(1);
}

console.log(
  `MATH_EN_CONSISTENCY_CLEAR (${scanned} strings across ${scopedTopics.length} topics, known_debt=${issues.length}, resolved_debt=${resolvedDebt.length})`
);
