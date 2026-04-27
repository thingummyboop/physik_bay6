#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const topicsDir = path.join(repoRoot, 'js', 'topics');

if (!fs.existsSync(topicsDir)) {
  console.error(`Missing topics dir: ${topicsDir}`);
  process.exit(1);
}

const topicFiles = fs
  .readdirSync(topicsDir)
  .filter((file) => file.endsWith('.js'))
  .sort();

const failures = [];

for (const file of topicFiles) {
  const fullPath = path.join(topicsDir, file);
  const res = spawnSync(process.execPath, ['--check', fullPath], { encoding: 'utf8' });

  if (res.status !== 0) {
    failures.push({ file, stderr: (res.stderr || '').trim() || (res.stdout || '').trim() || 'Syntax check failed' });
  }
}

if (failures.length > 0) {
  console.log('TOPIC_SYNTAX_ISSUES');
  for (const failure of failures) {
    console.log(`- ${failure.file}: ${failure.stderr}`);
  }
  process.exit(1);
}

console.log(`TOPIC_SYNTAX_CLEAR (${topicFiles.length} files)`);
