const fs = require('fs');
const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const brueche = de.math1_8_brueche;

const newSections = [
    {
        "id": "zahlenstrahl",
        "title": "5. Der Bruch auf dem Zahlenstrahl",
        "content": "<div class=\"interactive-zone\" style=\"background: #eef2ff; border: 2px solid #c7d2fe; border-radius: 12px; padding: 15px; text-align: center;\">\n    <h3 style=\"color: #4f46e5;\">📏 Finde den richtigen Platz!</h3>\n    <p>Zieh den Punkt auf dem Zahlenstrahl genau an die Stelle des Bruchs <strong><span id=\"zstrahl-task\">3/4</span></strong>.</p>\n    <div style=\"position: relative; width: 100%; max-width: 400px; height: 100px; margin: 20px auto;\">\n        <svg id=\"zstrahl-svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 400 100\" style=\"overflow: visible;\">\n            <!-- Line -->\n            <line x1=\"20\" y1=\"50\" x2=\"380\" y2=\"50\" stroke=\"#475569\" stroke-width=\"4\"/>\n            <!-- Markers for 0 and 1 -->\n            <line x1=\"20\" y1=\"30\" x2=\"20\" y2=\"70\" stroke=\"#475569\" stroke-width=\"4\"/>\n            <text x=\"20\" y=\"90\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"bold\">0</text>\n            <line x1=\"380\" y1=\"30\" x2=\"380\" y2=\"70\" stroke=\"#475569\" stroke-width=\"4\"/>\n            <text x=\"380\" y=\"90\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"bold\">1</text>\n            <!-- Ticks generated via JS -->\n            <g id=\"zstrahl-ticks\"></g>\n        </svg>\n        <!-- Draggable Dot -->\n        <input type=\"range\" id=\"zstrahl-slider\" min=\"0\" max=\"100\" value=\"0\" style=\"width: 360px; margin-left: 20px; position: absolute; top: 40px; left: 0; opacity: 0; cursor: pointer;\" oninput=\"updateZstrahl()\">\n        <div id=\"zstrahl-dot\" style=\"position: absolute; top: 40px; left: 20px; width: 20px; height: 20px; background: #3b82f6; border-radius: 50%; border: 3px solid white; transform: translate(-50%, -50%); pointer-events: none; box-shadow: 0 2px 4px rgba(0,0,0,0.3);\"></div>\n    </div>\n    <button onclick=\"checkZstrahl()\" style=\"background: #4f46e5;\">Einloggen 📍</button>\n    <p id=\"zstrahl-feedback\" style=\"font-weight: bold; margin-top: 15px; font-size: 1.2em; min-height: 30px;\"></p>\n</div>\n<p>Ein Bruch ist nicht einfach nur zwei Zahlen übereinander. Er ist eine ganz normale <strong>Zahl</strong>, die zwischen zwei anderen Zahlen auf dem Zahlenstrahl liegt! Wenn wir die Strecke zwischen 0 und 1 in 4 gleich große Abschnitte (Viertel) teilen, finden wir dort genau die Brüche 1/4, 2/4 und 3/4.</p>\n<br>\n{{QUIZ_m18_zstrahl_1}}",
        "quizzes": [
            {
                "id": "m18_zstrahl_1",
                "question": "Wo liegt der Bruch 1/2 auf dem Zahlenstrahl?",
                "answers": [
                    { "text": "Genau in der Mitte zwischen 0 und 1.", "correct": true, "pts": 10 },
                    { "text": "Hinter der 1.", "correct": false, "pts": 5 },
                    { "text": "Ganz vorne bei der 0.", "correct": false, "pts": 5 }
                ]
            }
        ]
    },
    {
        "id": "anteil_groessen",
        "title": "6. Brüche im echten Leben (Zeit, Geld, Gewicht)",
        "content": "<div class=\"interactive-zone\" style=\"background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 15px; text-align: center;\">\n    <h3 style=\"color: #16a34a;\">💶 Der Anteils-Rechner</h3>\n    <p>Berechne den Bruch von einer echten Größe (z.B. Euro).<br><em>Tipp: Teile das Ganze durch den Nenner und nimm es mal den Zähler!</em></p>\n    \n    <div style=\"font-size: 1.5em; margin: 20px 0;\">\n        Wie viel ist <strong><span style=\"color:#e74c3c\">3</span>/<span style=\"color:#2980b9\">4</span> von 20 €?</strong>\n    </div>\n    <div style=\"display: inline-block; background: white; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: left; font-size: 1.2em;\">\n        <p>1. Teile durch den Nenner (Haufen machen):<br>\n        20 € : <span style=\"color:#2980b9\">4</span> = <strong><span id=\"anteil-step1\">5</span> €</strong> pro Haufen.</p>\n        <p>2. Nimm mal den Zähler (Haufen nehmen):<br>\n        5 € &middot; <span style=\"color:#e74c3c\">3</span> = <input type=\"number\" id=\"anteil-input\" style=\"width: 60px; text-align: center; font-size: 1em;\"> <strong>€</strong></p>\n    </div>\n    <br>\n    <button onclick=\"checkAnteil()\" style=\"margin-top: 15px; background: #16a34a;\">Prüfen!</button>\n    <p id=\"anteil-feedback\" style=\"font-weight: bold; margin-top: 10px;\"></p>\n</div>\n<p>Brüche brauchen wir ständig im Alltag! Denk an die Uhr: Was ist eine <strong>dreiviertel Stunde</strong>? <br>Eine Stunde hat 60 Minuten. Wenn du sie durch 4 teilst (15 Minuten) und das mal 3 nimmst, hast du <strong>45 Minuten</strong>!</p>\n<br>\n{{QUIZ_m18_anteil_1}}",
        "quizzes": [
            {
                "id": "m18_anteil_1",
                "question": "Wie viel ist 1/2 von 100 kg?",
                "answers": [
                    { "text": "50 kg", "correct": true, "pts": 10 },
                    { "text": "25 kg", "correct": false, "pts": 5 }
                ]
            }
        ]
    },
    {
        "id": "bruch_ist_geteilt",
        "title": "7. Der Bruchstrich ist ein Geteilt-Zeichen",
        "content": "<div class=\"interactive-zone\" style=\"background: #fffbeb; border: 2px solid #fcd34d; border-radius: 12px; padding: 15px; text-align: center;\">\n    <h3 style=\"color: #d97706;\">🍕 Pizzen fair aufteilen</h3>\n    <p>3 Freunde wollen 2 Pizzen absolut fair untereinander aufteilen. Wie geht das?</p>\n    <svg width=\"300\" height=\"150\" viewBox=\"0 0 300 150\">\n        <circle cx=\"100\" cy=\"60\" r=\"40\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"3\"/>\n        <circle cx=\"200\" cy=\"60\" r=\"40\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"3\"/>\n        <line x1=\"100\" y1=\"20\" x2=\"100\" y2=\"100\" stroke=\"#d97706\" stroke-width=\"2\"/>\n        <line x1=\"60\" y1=\"60\" x2=\"140\" y2=\"60\" stroke=\"#d97706\" stroke-width=\"2\"/>\n        <line x1=\"200\" y1=\"20\" x2=\"200\" y2=\"100\" stroke=\"#d97706\" stroke-width=\"2\"/>\n        <line x1=\"160\" y1=\"60\" x2=\"240\" y2=\"60\" stroke=\"#d97706\" stroke-width=\"2\"/>\n        <text x=\"150\" y=\"140\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"bold\">2 Pizzen : 3 Freunde = ?</text>\n    </svg>\n    <p style=\"font-size: 1.2em;\">Antwort: Jeder bekommt genau <strong>2/3</strong> einer Pizza!</p>\n</div>\n<p>Merke dir dieses wichtige Geheimnis: <strong>Ein Bruchstrich ist eigentlich nichts anderes als ein Geteilt-Zeichen!</strong><br>3/4 ist exakt das Gleiche wie die Rechnung 3 : 4.</p>\n<br>\n{{QUIZ_m18_geteilt_1}}",
        "quizzes": [
            {
                "id": "m18_geteilt_1",
                "question": "Was bedeutet der Bruch 5/8 auch?",
                "answers": [
                    { "text": "5 geteilt durch 8 (5 : 8)", "correct": true, "pts": 10 },
                    { "text": "5 mal 8 (5 * 8)", "correct": false, "pts": 5 }
                ]
            }
        ]
    }
];

// Append to sections
let sectionExists = brueche.sections.find(s => s.id === 'zahlenstrahl');
if (!sectionExists) {
    brueche.sections.push(...newSections);
    fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
    console.log("Added 3 new sections to math1_8_brueche in de.json.");
} else {
    console.log("Sections already exist.");
}

// Update JS Logic
let js = fs.readFileSync('js/topics/math1_8_brueche.js', 'utf8');

const additionalJs = `
// Zahlenstrahl Logic
let zstrahlTask = { z: 3, n: 4 };

function initZstrahl() {
    const ticksGroup = document.getElementById('zstrahl-ticks');
    if (!ticksGroup) return;
    
    // Choose random fraction
    const n = [3, 4, 5, 8][Math.floor(Math.random() * 4)];
    const z = Math.floor(Math.random() * (n - 1)) + 1;
    zstrahlTask = { z, n };
    document.getElementById('zstrahl-task').innerText = z + '/' + n;
    
    // Draw ticks
    ticksGroup.innerHTML = '';
    const width = 360;
    for(let i=1; i<n; i++) {
        const x = 20 + (i / n) * width;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', x); line.setAttribute('y1', 40);
        line.setAttribute('x2', x); line.setAttribute('y2', 60);
        line.setAttribute('stroke', '#cbd5e1'); line.setAttribute('stroke-width', '2');
        ticksGroup.appendChild(line);
    }
    
    document.getElementById('zstrahl-slider').value = 0;
    updateZstrahl();
    document.getElementById('zstrahl-feedback').innerHTML = '';
}

function updateZstrahl() {
    const val = document.getElementById('zstrahl-slider').value; // 0 to 100
    const dot = document.getElementById('zstrahl-dot');
    // val is percentage. Left is 20, width is 360.
    const pos = 20 + (val / 100) * 360;
    dot.style.left = pos + 'px';
}

function checkZstrahl() {
    const val = parseInt(document.getElementById('zstrahl-slider').value);
    const targetVal = (zstrahlTask.z / zstrahlTask.n) * 100;
    
    const feedback = document.getElementById('zstrahl-feedback');
    // Allow small margin of error
    if (Math.abs(val - targetVal) < 4) {
        feedback.innerHTML = '<span style="color: #10b981;">✅ Perfekt! Du hast den Bruch genau getroffen.</span> <button onclick="initZstrahl()" style="font-size:0.7em; padding:2px 8px; margin-left:10px;">Nochmal 🔄</button>';
    } else {
        feedback.innerHTML = '<span style="color: #ef4444;">❌ Fast. Du bist bei ca. ' + Math.round(val) + '%. Suche weiter!</span>';
    }
}

// Anteil Logic
function checkAnteil() {
    const val = document.getElementById('anteil-input').value;
    const feedback = document.getElementById('anteil-feedback');
    if (val == 15) {
        feedback.innerHTML = '<span style="color: #10b981;">✅ Richtig! 3/4 von 20€ sind 15€.</span>';
    } else {
        feedback.innerHTML = '<span style="color: #ef4444;">❌ Nicht ganz. Rechne: 5 mal 3.</span>';
    }
}
`;

if (!js.includes('initZstrahl')) {
    js = js.replace('function topicInit() {', `function topicInit() {\n    initZstrahl();\n`);
    js += '\n' + additionalJs;
    fs.writeFileSync('js/topics/math1_8_brueche.js', js, 'utf8');
    console.log("Added JS logic to math1_8_brueche.js.");
} else {
    console.log("JS already present.");
}
