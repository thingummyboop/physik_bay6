const fs = require('fs');
let html = fs.readFileSync('lang/de.json', 'utf8');

const badStr = '<div style="text-align: center;"><div id=\\"fraction-builder\\"';
const goodStr = '<div style=\\"text-align: center;\\"><div id=\\"fraction-builder\\"';

if (html.includes(badStr)) {
    html = html.replace(badStr, goodStr);
    fs.writeFileSync('lang/de.json', html, 'utf8');
    console.log("Fixed unescaped quotes in JSON.");
} else {
    console.log("Could not find the bad string.");
}
