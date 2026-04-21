const fs = require('fs');

let html = fs.readFileSync('lang/de.json', 'utf8');

const oldStr = `<div id=\\"fraction-builder\\" style=\\"text-align: center; margin: 20px 0; font-size: 24px;\\"><div style=\\"display: inline-block; vertical-align: middle;\\"><button id=\\"z-up\\">+</button><br><span id=\\"zaehler-val\\" style=\\"font-weight: bold;\\">1</span><br><button id=\\"z-down\\">-</button></div><div style=\\"display: inline-block; vertical-align: middle; margin: 0 10px;\\"><hr style=\\"border: 2px solid black; width: 40px;\\"></div><div style=\\"display: inline-block; vertical-align: middle;\\"><button id=\\"n-up\\">+</button><br><span id=\\"nenner-val\\" style=\\"font-weight: bold;\\">2</span><br><button id=\\"n-down\\">-</button></div><p style=\\"margin-top: 15px; font-size: 16px;\\">Wir haben <span id=\\"z-text\\">1</span> von <span id=\\"n-text\\">2</span> Teilen.</p></div>`;

const newStr = `<div style="text-align: center;"><div id=\\"fraction-builder\\" style=\\"display: inline-flex; flex-direction: column; align-items: center; margin: 20px 0; font-size: 24px; background: white; padding: 20px; border-radius: 12px; border: 2px solid #cbd5e1;\\"><div style=\\"display: flex; align-items: center; gap: 15px;\\"><button id=\\"z-down\\" style=\\"padding: 5px 15px; font-size: 1em;\\">-</button><span id=\\"zaehler-val\\" style=\\"font-weight: bold; min-width: 30px;\\">1</span><button id=\\"z-up\\" style=\\"padding: 5px 15px; font-size: 1em;\\">+</button></div><hr style=\\"border: 2px solid black; width: 120px; margin: 15px 0;\\"><div style=\\"display: flex; align-items: center; gap: 15px;\\"><button id=\\"n-down\\" style=\\"padding: 5px 15px; font-size: 1em;\\">-</button><span id=\\"nenner-val\\" style=\\"font-weight: bold; min-width: 30px;\\">2</span><button id=\\"n-up\\" style=\\"padding: 5px 15px; font-size: 1em;\\">+</button></div></div><p style=\\"margin-top: 15px; font-size: 1.1em;\\">Wir haben <span id=\\"z-text\\" style=\\"font-weight:bold;\\">1</span> von <span id=\\"n-text\\" style=\\"font-weight:bold;\\">2</span> Teilen.</p></div>`;

if (html.includes(oldStr)) {
    html = html.replace(oldStr, newStr);
    fs.writeFileSync('lang/de.json', html, 'utf8');
    console.log("Layout fixed.");
} else {
    console.log("String not found!");
}