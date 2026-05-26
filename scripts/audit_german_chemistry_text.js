const fs = require('fs');

const data = JSON.parse(fs.readFileSync('lang/de.json', 'utf8'));

const badWordPatterns = [
  /\bAggregatzustaende\b/,
  /\bAtomruempfe\b/,
  /\bbegruendest\b/,
  /\berklaerst\b/,
  /\bErloeschen\b/,
  /\bFeuerloescher\b/,
  /\bgehoert\b/,
  /\bgeoeffnet\b/,
  /\bgesaettigte\b/,
  /\bgruen\b/,
  /\bHuelle\b/,
  /\bHuellen\b/,
  /\bkoennen\b/,
  /\bLoeschversuche\b/,
  /\bLoesen\b/,
  /\bloesen\b/,
  /\bLoeslichkeit\b/,
  /\bMolekuel\b/,
  /\bMolekuele\b/,
  /\bpruefbar\b/,
  /\bpruefen\b/,
  /\bSaettigung\b/,
  /\bSammelbehaelter\b/,
  /\bVerschuettet\b/,
  /\bvollstaendig\b/,
  /\bZuend(?=-|\b)/,
  /\bzusammenhaengen\b/
];

const issues = [];

function cleanVisibleText(value) {
  return value
    .replace(/\{\{QUIZ_[^}]+\}\}/g, ' ')
    .replace(/<[^>]*>/g, ' ');
}

function scanString(value, path) {
  const visibleText = cleanVisibleText(value);

  for (const pattern of badWordPatterns) {
    const match = visibleText.match(pattern);
    if (match) {
      issues.push(`${path}: Ersatzschreibung "${match[0]}"`);
    }
  }

  if (value.includes('\uFFFD')) {
    issues.push(`${path}: Unicode replacement character`);
  }

  const mojibakeLike = value.match(/[A-Za-z]\?[A-Za-z]/);
  if (mojibakeLike) {
    issues.push(`${path}: moeglicher Zeichensatzfehler "${mojibakeLike[0]}"`);
  }
}

function walk(value, path = [], key = '') {
  if (typeof value === 'string') {
    if (key !== 'id') {
      scanString(value, path.join('.'));
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, path.concat(index), String(index)));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      walk(childValue, path.concat(childKey), childKey);
    }
  }
}

for (const [topicId, topic] of Object.entries(data)) {
  if (topicId.startsWith('chemie_')) {
    walk(topic, [topicId]);
  }
}

if (issues.length > 0) {
  console.error('German chemistry text audit failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('GERMAN_CHEMISTRY_TEXT_CLEAR');
