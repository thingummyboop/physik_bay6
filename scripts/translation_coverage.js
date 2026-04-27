#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT, 'lang');

const langs = process.argv.slice(2);
if (!langs.length) {
  console.error('Usage: node scripts/translation_coverage.js <lang...>');
  process.exit(1);
}

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function collectStringLeaves(obj, pathArr = [], out = []) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectStringLeaves(v, pathArr.concat(i), out));
    return out;
  }
  if (isObject(obj)) {
    Object.keys(obj).forEach((k) => collectStringLeaves(obj[k], pathArr.concat(k), out));
    return out;
  }
  if (typeof obj === 'string') out.push({ path: pathArr, value: obj });
  return out;
}

function getAt(obj, pathArr) {
  let cur = obj;
  for (const seg of pathArr) {
    if (cur == null) return undefined;
    cur = cur[seg];
  }
  return cur;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const de = readJson(path.join(LANG_DIR, 'de.json'));
const deLeaves = collectStringLeaves(de);

for (const lang of langs) {
  const p = path.join(LANG_DIR, `${lang}.json`);
  let t = {};
  try {
    t = readJson(p);
  } catch (e) {
    console.log(`${lang}: ERROR ${e.message}`);
    continue;
  }

  let missing = 0;
  let identical = 0;

  for (const leaf of deLeaves) {
    const key = leaf.path[leaf.path.length - 1];
    const tv = getAt(t, leaf.path);
    if (typeof tv !== 'string') missing++;
    if (key !== 'id' && typeof tv === 'string' && tv === leaf.value) identical++;
  }

  console.log(`${lang}: total=${deLeaves.length} missing=${missing} identicalToDe=${identical}`);
}
