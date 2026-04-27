#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const langDir = path.join(__dirname, '..', 'lang');
const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.json')).sort();

function walk(node, pathParts = [], out = []) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, [...pathParts, String(idx)], out));
    return out;
  }
  if (!node || typeof node !== 'object') return out;

  for (const [key, value] of Object.entries(node)) {
    const nextPath = [...pathParts, key];
    if (key === 'content' && typeof value === 'string' && /alert\s*\(/i.test(value)) {
      out.push(nextPath.join('.'));
    }
    walk(value, nextPath, out);
  }
  return out;
}

let hasIssues = false;
for (const file of files) {
  const fullPath = path.join(langDir, file);
  const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const findings = walk(json);

  if (findings.length === 0) {
    console.log(`${file}: OK`);
    continue;
  }

  hasIssues = true;
  console.log(`${file}: ${findings.length} inline alert handlers in content`);
  findings.slice(0, 20).forEach((entry) => console.log(`  - ${entry}`));
  if (findings.length > 20) {
    console.log(`  ... +${findings.length - 20} more`);
  }
}

if (hasIssues) {
  process.exitCode = 1;
} else {
  console.log('ALL_CLEAR');
}
