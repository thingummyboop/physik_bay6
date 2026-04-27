#!/usr/bin/env node
/*
  Complete lang/<target>.json from lang/de.json.
  - Keeps existing target translations when present
  - Fills missing strings via Google Translate API
  - Preserves HTML tags and {{QUIZ_x}} placeholders
*/

const fs = require('fs');
const path = require('path');
// Uses Google Translate's public gtx endpoint (no API key).

const ROOT = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT, 'lang');
const CACHE_PATH = path.join(ROOT, '.translation-cache.json');

const args = process.argv.slice(2);
const targetLang = args[0];
if (!targetLang) {
  console.error('Usage: node scripts/complete_translations.js <langCode> [--overwrite]');
  process.exit(1);
}
const overwrite = args.includes('--overwrite');

function readJsonSafe(filePath, fallback = {}) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function pathEndsWith(pathArr, key) {
  return pathArr.length > 0 && pathArr[pathArr.length - 1] === key;
}

function getAt(obj, pathArr) {
  let cur = obj;
  for (const seg of pathArr) {
    if (cur == null) return undefined;
    cur = cur[seg];
  }
  return cur;
}

function setAt(obj, pathArr, value) {
  let cur = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    const seg = pathArr[i];
    if (cur[seg] == null) {
      cur[seg] = typeof pathArr[i + 1] === 'number' ? [] : {};
    }
    cur = cur[seg];
  }
  cur[pathArr[pathArr.length - 1]] = value;
}

function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
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
  if (typeof obj === 'string') {
    out.push({ path: pathArr, value: obj });
  }
  return out;
}

function looksPlaceholderOnly(s) {
  return /^\s*$/.test(s);
}

function shouldKeepExisting(existingVal) {
  if (typeof existingVal !== 'string') return false;
  const t = existingVal.trim();
  if (!t) return false;
  if (t === '...' || t === '…') return false;
  return true;
}

function splitLongText(input, maxLen = 3000) {
  if (input.length <= maxLen) return [input];

  const chunks = [];
  let remaining = input;

  while (remaining.length > maxLen) {
    let cut = remaining.lastIndexOf('\n', maxLen);
    if (cut < Math.floor(maxLen * 0.5)) cut = remaining.lastIndexOf('. ', maxLen);
    if (cut < Math.floor(maxLen * 0.5)) cut = remaining.lastIndexOf(' ', maxLen);
    if (cut <= 0) cut = maxLen;

    const part = remaining.slice(0, cut);
    chunks.push(part);
    remaining = remaining.slice(cut);
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

function protectTokens(text) {
  const tokens = [];
  let out = text;

  // Protect quiz placeholders first
  out = out.replace(/\{\{[^}]+\}\}/g, (m) => {
    const token = `@@TOKEN_${tokens.length}@@`;
    tokens.push(m);
    return token;
  });

  // Protect HTML tags
  out = out.replace(/<[^>]+>/g, (m) => {
    const token = `@@TOKEN_${tokens.length}@@`;
    tokens.push(m);
    return token;
  });

  return { out, tokens };
}

function restoreTokens(text, tokens) {
  let out = text;
  tokens.forEach((tok, i) => {
    // Be tolerant to translated marker words (e.g., @@ТОКЕН_1@@)
    const re = new RegExp(`@@[^@]*_${i}@@`, 'g');
    out = out.replace(re, tok);
  });
  return out;
}

function loadCache() {
  return readJsonSafe(CACHE_PATH, {});
}

function saveCache(cache) {
  writeJson(CACHE_PATH, cache);
}

let lastCallTs = 0;

async function translateViaGtx(text, to) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 160)}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) return text;
  return data[0].map((part) => part[0] || '').join('');
}

async function translateWithRetry(text, to, cache, maxRetries = 6) {
  const key = `${to}|||${text}`;
  if (cache[key]) return cache[key];

  let attempt = 0;
  let lastErr;
  while (attempt <= maxRetries) {
    try {
      // soft throttle to avoid hammering
      const minGapMs = 120;
      const now = Date.now();
      const wait = Math.max(0, minGapMs - (now - lastCallTs));
      if (wait) await new Promise((r) => setTimeout(r, wait));

      const translated = await translateViaGtx(text, to);
      lastCallTs = Date.now();
      cache[key] = translated || text;
      return cache[key];
    } catch (e) {
      lastErr = e;
      const waitMs = 1000 * Math.pow(1.8, attempt);
      await new Promise((r) => setTimeout(r, waitMs));
      attempt += 1;
    }
  }
  throw lastErr;
}

async function translateStringPreservingMarkup(source, to, cache) {
  if (looksPlaceholderOnly(source)) return source;

  const { out, tokens } = protectTokens(source);
  const chunks = splitLongText(out, 3000);

  const translatedChunks = [];
  for (const c of chunks) {
    if (!c.trim()) {
      translatedChunks.push(c);
      continue;
    }
    const tr = await translateWithRetry(c, to, cache);
    translatedChunks.push(tr);
  }

  let merged = translatedChunks.join('');
  merged = restoreTokens(merged, tokens);
  return merged;
}

async function run() {
  const dePath = path.join(LANG_DIR, 'de.json');
  const tgtPath = path.join(LANG_DIR, `${targetLang}.json`);

  const de = readJsonSafe(dePath);
  if (!Object.keys(de).length) {
    throw new Error('Could not load lang/de.json');
  }

  const existing = readJsonSafe(tgtPath, {});
  const output = deepClone(de);

  const leaves = collectStringLeaves(de);
  const cache = loadCache();

  let kept = 0;
  let translated = 0;
  let skippedIds = 0;

  // Prepare tasks first
  const tasks = [];

  for (const leaf of leaves) {
    const { path: p, value: deVal } = leaf;

    if (pathEndsWith(p, 'id')) {
      setAt(output, p, deVal);
      skippedIds++;
      continue;
    }

    const existingVal = getAt(existing, p);

    const isIdenticalToGerman = typeof existingVal === 'string' && existingVal === deVal;
    if (!overwrite && shouldKeepExisting(existingVal) && !isIdenticalToGerman) {
      setAt(output, p, existingVal);
      kept++;
      continue;
    }

    tasks.push({ path: p, source: deVal });
  }

  console.log(`[${targetLang}] String leaves in de: ${leaves.length}`);
  console.log(`[${targetLang}] Keep existing: ${kept}`);
  console.log(`[${targetLang}] Translate now: ${tasks.length}`);

  // Run sequentially to reduce API throttling risk
  let i = 0;
  let nextCheckpoint = 10;
  for (const t of tasks) {
    i += 1;
    try {
      const tr = await translateStringPreservingMarkup(t.source, targetLang, cache);
      setAt(output, t.path, tr);
      translated++;

      if (i % 50 === 0) {
        saveCache(cache);
        writeJson(tgtPath, output);
        console.log(`[${targetLang}] Progress ${i}/${tasks.length}`);
      }

      if (tasks.length > 0) {
        const pct = Math.floor((i / tasks.length) * 100);
        while (pct >= nextCheckpoint && nextCheckpoint <= 100) {
          console.log(`[checkpoint] ${targetLang} ${nextCheckpoint}%`);
          nextCheckpoint += 10;
        }
      }
    } catch (e) {
      console.error(`Failed at ${t.path.join('.')} -> ${e.message}`);
      setAt(output, t.path, t.source);
    }
  }

  while (nextCheckpoint <= 100) {
    console.log(`[checkpoint] ${targetLang} ${nextCheckpoint}%`);
    nextCheckpoint += 10;
  }

  writeJson(tgtPath, output);
  saveCache(cache);

  console.log(`[${targetLang}] Done. translated=${translated}, kept=${kept}, ids=${skippedIds}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
