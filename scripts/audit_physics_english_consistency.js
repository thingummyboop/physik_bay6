#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');
const enPath = path.join(repoRoot, 'lang', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const nonPhysicsTopics = new Set(['dgb5', 'wetter', 'klima', 'klimawandel']);
const defaultScopedTopics = ['elektrizitaet', 'optik1', 'linsen_spiegel'];
const scopedTopics = (process.env.PHYSICS_EN_CONSISTENCY_TOPICS || defaultScopedTopics.join(','))
  .split(',')
  .map((topic) => topic.trim())
  .filter(Boolean);

const physicsTopics = fs
  .readdirSync(topicsDir)
  .filter((entry) => entry.endsWith('.js'))
  .map((entry) => entry.replace(/\.js$/, ''))
  .filter((topic) => !topic.startsWith('math'))
  .filter((topic) => !nonPhysicsTopics.has(topic))
  .filter((topic) => scopedTopics.includes(topic))
  .filter((topic) => Object.prototype.hasOwnProperty.call(en, topic))
  .sort();

if (physicsTopics.length === 0) {
  console.error('PHYSICS_EN_CONSISTENCY_ISSUES');
  console.error(`- _global: no_auditable_physics_topics_detected (scope=${scopedTopics.join(',')})`);
  process.exit(1);
}

const germanWordRegex = /\b(der|die|das|und|oder|nicht|kein(?:e|en|em|er)?|weil|wenn|dann|mit|ohne|aus|bei|zum|zur|vom|im|ist|sind|wird|werden|ein(?:e|en|em|er)?|richtig|falsch|antwort)\b/i;
const baselinePath = path.join(repoRoot, 'scripts', 'baselines', 'physics_en_consistency_allowlist.json');
const baseline = fs.existsSync(baselinePath)
  ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
  : { knownIssuePaths: [] };
const allowlist = new Set((baseline.knownIssuePaths || []).filter(Boolean));

const issues = [];
let scanned = 0;

for (const topic of physicsTopics) {
  walk(en[topic], [topic]);
}

function walk(node, trace) {
  if (typeof node === 'string') {
    const text = node.trim();
    if (!text) return;

    scanned += 1;
    const normalized = text.normalize('NFKC');

    if (/[äöüß]/i.test(normalized)) {
      issues.push({ path: trace.join('.'), reason: 'contains_umlaut', sample: text.slice(0, 120) });
      return;
    }

    if (germanWordRegex.test(normalized)) {
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
  console.error(`PHYSICS_EN_CONSISTENCY_ISSUES (${newIssues.length} new, ${issues.length} total)`);
  for (const issue of newIssues.slice(0, 200)) {
    console.error(`- ${issue.path}: ${issue.reason} :: ${issue.sample}`);
  }
  if (newIssues.length > 200) {
    console.error(`- ... ${newIssues.length - 200} more new issues`);
  }
  process.exit(1);
}

console.log(
  `PHYSICS_EN_CONSISTENCY_CLEAR (${scanned} strings across ${physicsTopics.length} topics, known_debt=${issues.length}, resolved_debt=${resolvedDebt.length})`
);
