#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');
const DASHBOARD_PATH = path.join(ROOT, 'topics', 'dashboard.html');
const LANG_DIR = path.join(ROOT, 'lang');
const TOPICS_DIR = path.join(ROOT, 'js', 'topics');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function unique(values) {
  return [...new Set(values)];
}

function collectNavTopicIds() {
  const html = read(INDEX_PATH);
  return [...html.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function collectDashboardTopicIds() {
  const html = read(DASHBOARD_PATH);
  return [...html.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function isTopicComplete(topic) {
  return Boolean(
    topic
    && typeof topic.title === 'string'
    && typeof topic.subtitle === 'string'
    && Array.isArray(topic.sections)
  );
}

const navTopicIds = collectNavTopicIds();
const uniqueNavTopicIds = unique(navTopicIds);
const dashboardTopicIds = collectDashboardTopicIds();
const duplicateNavIds = uniqueNavTopicIds.filter((id) => navTopicIds.filter((item) => item === id).length > 1);
const langFiles = fs.readdirSync(LANG_DIR).filter((file) => file.endsWith('.json')).sort();
const topicScripts = new Set(
  fs.readdirSync(TOPICS_DIR)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace(/\.js$/, ''))
);

const failures = [];
const warnings = [];
const de = readJson(path.join(LANG_DIR, 'de.json'));

if (duplicateNavIds.length) {
  failures.push(`Duplicate topic ids in index.html: ${duplicateNavIds.join(', ')}`);
}

for (const topicId of uniqueNavTopicIds) {
  const germanTopic = de[topicId];
  if (!isTopicComplete(germanTopic)) {
    failures.push(`Missing or incomplete German topic: ${topicId}`);
    continue;
  }

  if (germanTopic.script !== false && !topicScripts.has(topicId)) {
    failures.push(`Missing topic script for ${topicId}. Add js/topics/${topicId}.js or set "script": false.`);
  }
}

for (const langFile of langFiles) {
  const lang = readJson(path.join(LANG_DIR, langFile));
  const missing = uniqueNavTopicIds.filter((topicId) => !isTopicComplete(lang[topicId]));
  if (missing.length) {
    failures.push(`${langFile} misses or has incomplete topics: ${missing.join(', ')}`);
  }
}

const navSet = new Set(uniqueNavTopicIds);
const dashboardOnlyTopics = dashboardTopicIds.filter((topicId) => !navSet.has(topicId)).sort();
if (dashboardOnlyTopics.length) {
  failures.push(`Dashboard badges point to topics not reachable from navigation: ${dashboardOnlyTopics.join(', ')}`);
}

const deOnlyTopics = Object.keys(de)
  .filter((topicId) => isTopicComplete(de[topicId]) && !navSet.has(topicId))
  .sort();
if (deOnlyTopics.length) {
  warnings.push(`German topics not reachable from navigation: ${deOnlyTopics.join(', ')}`);
}

const scriptOnlyTopics = [...topicScripts].filter((topicId) => !navSet.has(topicId)).sort();
const ignoredSharedScripts = new Set(['chemie_common']);
const reportableScriptOnlyTopics = scriptOnlyTopics.filter((topicId) => !ignoredSharedScripts.has(topicId));
if (reportableScriptOnlyTopics.length) {
  warnings.push(`Topic scripts not used by navigation: ${reportableScriptOnlyTopics.join(', ')}`);
}

if (warnings.length) {
  console.log('NAVIGATION_INTEGRITY_WARNINGS');
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (failures.length) {
  console.log('NAVIGATION_INTEGRITY_ISSUES');
  failures.forEach((failure) => console.log(`- ${failure}`));
  process.exit(1);
}

console.log(`NAVIGATION_INTEGRITY_CLEAR (${uniqueNavTopicIds.length} navigation topics, ${langFiles.length} languages)`);
