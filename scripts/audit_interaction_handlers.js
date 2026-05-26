#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT, 'lang');
const TOPICS_DIR = path.join(ROOT, 'js', 'topics');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function collectFunctionNames(code) {
  const names = new Set();
  for (const match of code.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
    names.add(match[1]);
  }
  for (const match of code.matchAll(/(?:window|globalThis)\.([A-Za-z_$][\w$]*)\s*=/g)) {
    names.add(match[1]);
  }
  return names;
}

function collectTopicContent(topic) {
  const parts = [];
  for (const section of topic?.sections || []) {
    parts.push(section.content || '');
  }
  return parts.join('\n');
}

function collectOnclickHandlerNames(html) {
  return [...html.matchAll(/onclick=\\?["']([^"']+)\\?["']/g)]
    .map((match) => match[1].match(/^\s*([A-Za-z_$][\w$]*)\s*\(/)?.[1])
    .filter(Boolean);
}

const sharedFiles = ['js/common.js', 'js/renderer.js']
  .map((file) => path.join(ROOT, file))
  .filter((file) => fs.existsSync(file));
const sharedHandlers = new Set();
for (const file of sharedFiles) {
  collectFunctionNames(read(file)).forEach((name) => sharedHandlers.add(name));
}

const topicHandlers = new Map();
for (const file of fs.readdirSync(TOPICS_DIR).filter((item) => item.endsWith('.js'))) {
  const topicId = file.replace(/\.js$/, '');
  topicHandlers.set(topicId, collectFunctionNames(read(path.join(TOPICS_DIR, file))));
}

const failures = [];
const checkedHandlers = [];

for (const langFile of fs.readdirSync(LANG_DIR).filter((file) => file.endsWith('.json')).sort()) {
  const data = readJson(path.join(LANG_DIR, langFile));
  for (const [topicId, topic] of Object.entries(data)) {
    const names = [...new Set(collectOnclickHandlerNames(collectTopicContent(topic)))];
    if (!names.length) continue;

    const available = new Set(sharedHandlers);
    for (const name of topicHandlers.get(topicId) || []) available.add(name);

    for (const name of names) {
      checkedHandlers.push(`${langFile}:${topicId}:${name}`);
      if (!available.has(name)) {
        failures.push(`${langFile} / ${topicId}: onclick references missing function ${name}()`);
      }
    }
  }
}

if (failures.length) {
  console.log('INTERACTION_HANDLER_ISSUES');
  failures.forEach((failure) => console.log(`- ${failure}`));
  process.exit(1);
}

console.log(`INTERACTION_HANDLERS_CLEAR (${checkedHandlers.length} handler references)`);
