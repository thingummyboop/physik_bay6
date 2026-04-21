const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const sec4 = de.math1_2_nat_zahlen.sections.find(s => s.id === 'sec4');

sec4.content = `
<div class="interactive-zone" style="background: #fdf2f8; border: 2px solid #fecdd3; border-radius: 12px; padding: 15px;">
    <h3 style="color: #e11d48;">🎢 Der Rundungs-Berg</h3>
    <p>Manchmal müssen wir Zahlen nicht auf die Einer genau wissen. Wenn ein Auto 14.892 Euro kostet, sagt man oft einfach "Etwa 15.000 Euro". Das nennt man <strong>Runden</strong>.</p>
    <p>Probier es aus! Tippe eine Zahl ein und schaue, was passiert, wenn du sie rundest:</p>
    
    <div style="text-align: center; margin-top: 15px;">
        <input type="number" id="round-input" value="734" style="font-size: 1.2em; padding: 5px; width: 120px; text-align: center; border-radius: 5px; border: 1px solid #cbd5e1;">
        <select id="round-place" style="font-size: 1.1em; padding: 5px; border-radius: 5px; border: 1px solid #cbd5e1; margin-left: 10px;">
            <option value="10">auf Zehner (Z)</option>
            <option value="100">auf Hunderter (H)</option>
            <option value="1000">auf Tausender (T)</option>
        </select>
        <button onclick="doRounding()" style="background: #e11d48; margin-left: 10px;">Runden!</button>
    </div>
    
    <div id="round-result" style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 80px; font-size: 1.1em;">
        Tippe eine Zahl ein und drücke auf "Runden!"
    </div>
</div>

<div class="lexikon-box" style="border-left-color: #e11d48;">
    <strong>Die goldene Regel fürs Runden:</strong><br>
    Um zu wissen, ob die Zahl größer (aufrunden) oder kleiner (abrunden) wird, musst du dir <strong>immer nur die Ziffer rechts daneben</strong> ansehen!<br><br>
    📉 Steht rechts eine <strong>0, 1, 2, 3 oder 4</strong>, dann runden wir <strong>AB</strong>.<br>
    📈 Steht rechts eine <strong>5, 6, 7, 8 oder 9</strong>, dann runden wir <strong>AUF</strong>.<br><br>
    <em>Beispiel: 7<strong>3</strong>4 auf Zehner runden. Die Ziffer rechts von den Zehnern ist die 4. Bei 4 runden wir ab. Die Zahl wird zu 730.</em>
</div>
<br>
{{QUIZ_math1_2_q10}}
<br>
{{QUIZ_math1_2_q11}}
<br>
{{QUIZ_math1_2_q12}}
`;

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');

// Update JS logic
let js = fs.readFileSync('js/topics/math1_2_nat_zahlen.js', 'utf8');
const roundLogic = `
function doRounding() {
    const val = parseInt(document.getElementById('round-input').value);
    const place = parseInt(document.getElementById('round-place').value);
    const resDiv = document.getElementById('round-result');
    
    if (isNaN(val)) return;
    
    const div = val / place;
    let rounded = 0;
    let rule = "";
    
    // Find the decision digit
    const strVal = val.toString();
    const targetDigitIndex = strVal.length - Math.log10(place);
    
    if (targetDigitIndex < 0) {
        resDiv.innerHTML = \`<span style="color:red">Die Zahl ist zu klein, um sie auf \${place}er zu runden.</span>\`;
        return;
    }
    
    const decisionDigit = parseInt(strVal[targetDigitIndex] || '0');
    
    if (decisionDigit < 5) {
        rounded = Math.floor(div) * place;
        rule = \`Die Stelle rechts daneben ist eine <strong>\${decisionDigit}</strong>. Deshalb runden wir <strong>ab</strong> (📉).\`;
    } else {
        rounded = Math.ceil(div) * place;
        rule = \`Die Stelle rechts daneben ist eine <strong>\${decisionDigit}</strong>. Deshalb runden wir <strong>auf</strong> (📈).\`;
    }
    
    resDiv.innerHTML = \`
        Ursprüngliche Zahl: <strong>\${val}</strong><br>
        \${rule}<br>
        Das Ergebnis ist: <strong style="color: #e11d48; font-size: 1.3em;">\${rounded}</strong>
    \`;
}
`;

if (!js.includes('doRounding')) {
    js += '\n' + roundLogic;
    fs.writeFileSync('js/topics/math1_2_nat_zahlen.js', js, 'utf8');
}

console.log("Rounding section updated!");
