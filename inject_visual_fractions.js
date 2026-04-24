const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const newSec = {
    "id": "grafisch_rechnen",
    "title": "Grafisch Rechnen: Torten, Schoko & Punkte",
    "content": `
    <div class="interactive-zone" style="background: #fdf2f8; border: 2px solid #fbcfe8; border-radius: 12px; padding: 15px; text-align: center;">
        <h3 style="color: #be185d;">🎨 Das visuelle Rechen-Labor</h3>
        <p>Manche Rechnungen sehen schwer aus, sind aber ganz leicht, wenn man sie zeichnet! Löse die Aufgabe, indem du die richtige Menge im Bild <strong>anklickst und einfärbst</strong>.</p>
        
        <div style="margin: 15px 0; font-size: 1.5em; font-weight: bold; background: white; padding: 10px; border-radius: 8px; border: 1px dashed #cbd5e1;">
            Aufgabe: <span id="vfrac-task-text" style="color: #be185d;">Lade...</span>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
            <button onclick="setVfracModel('pie')" style="background: #f59e0b;">🥧 Torte</button>
            <button onclick="setVfracModel('choco')" style="background: #78350f;">🍫 Schokotafel</button>
            <button onclick="setVfracModel('dots')" style="background: #3b82f6;">🔴 Punkte</button>
        </div>

        <div id="vfrac-info" style="font-size: 0.9em; color: #475569; margin-bottom: 10px; min-height: 20px;"></div>

        <div id="vfrac-canvas" style="width: 100%; max-width: 300px; height: 300px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; position: relative;">
            <!-- SVG drawn via JS -->
        </div>

        <div style="margin-top: 20px;">
            <button onclick="checkVfracAnswer()" style="background: #10b981; font-size: 1.2em; padding: 10px 20px;">Prüfen! ✔️</button>
            <button onclick="nextVfracTask()" style="background: #64748b; font-size: 1.2em; padding: 10px 20px; margin-left: 10px;">Neue Aufgabe 🔄</button>
        </div>
        <p id="vfrac-feedback" style="font-weight: bold; margin-top: 15px; font-size: 1.2em; min-height: 30px;"></p>
    </div>
    <p>Beim Rechnen mit Brüchen hilft es immer, sich das Ganze vorzustellen. Wenn du 1 Viertel Schokolade und noch 2 Viertel Schokolade isst, hast du insgesamt 3 Viertel gegessen. Du zählst einfach die Stücke zusammen!</p>
    <br>
    {{QUIZ_m18_grafisch_1}}
    `,
    "quizzes": [
        {
            "id": "m18_grafisch_1",
            "question": "Was bedeutet es, wenn 12 Punkte ein Ganzes sind und du 3 Punkte einfärbst?",
            "answers": [
                { "text": "Ich habe 3/12 (also 1/4) des Ganzen eingefärbt.", "correct": true, "pts": 10 },
                { "text": "Ich habe 3 Ganze eingefärbt.", "correct": false, "pts": 5 },
                { "text": "Ich habe 12/3 eingefärbt.", "correct": false, "pts": 5 }
            ]
        }
    ]
};

// Check if section exists
if (!de.math1_8_brueche.sections.find(s => s.id === 'grafisch_rechnen')) {
    de.math1_8_brueche.sections.push(newSec);
    fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
    console.log("Added grafisch_rechnen section to de.json.");
}

// Write the JS logic
let js = fs.readFileSync('js/topics/math1_8_brueche.js', 'utf8');

const vfracJs = `
let vfracCurrentModel = 'pie';
let vfracTask = {};
let vfracSelected = 0;

function setVfracModel(model) {
    vfracCurrentModel = model;
    nextVfracTask();
}

function nextVfracTask() {
    const info = document.getElementById('vfrac-info');
    const taskText = document.getElementById('vfrac-task-text');
    document.getElementById('vfrac-feedback').innerHTML = '';
    vfracSelected = 0;

    // Generate random task based on model
    let n, z1, z2;
    if (vfracCurrentModel === 'pie') {
        n = [4, 6, 8][Math.floor(Math.random() * 3)];
        info.innerHTML = "Jedes Pizzastück ist genau <strong>1/" + n + "</strong>.";
    } else if (vfracCurrentModel === 'choco') {
        n = [8, 10, 12, 15][Math.floor(Math.random() * 4)];
        info.innerHTML = "Ein Schokostück ist genau <strong>1/" + n + "</strong>.";
    } else if (vfracCurrentModel === 'dots') {
        n = [12, 16, 20][Math.floor(Math.random() * 3)];
        info.innerHTML = "Alle " + n + " Punkte zusammen sind 1 Ganzes.<br><strong>1 Punkt steht für 1/" + n + "</strong>.";
    }

    z1 = Math.floor(Math.random() * (n/2)) + 1;
    z2 = Math.floor(Math.random() * (n - z1 - 1)) + 1;
    
    vfracTask = { n: n, z1: z1, z2: z2, target: z1 + z2 };
    taskText.innerHTML = \`\\(\\frac{\${z1}}{\${n}} + \\frac{\${z2}}{\${n}} = \\ ?\\)\`;
    
    if (window.MathJax) MathJax.typesetPromise([taskText]);

    drawVfracCanvas();
}

function drawVfracCanvas() {
    const canvas = document.getElementById('vfrac-canvas');
    let svgHtml = '<svg width="100%" height="100%" viewBox="0 0 200 200">';
    
    if (vfracCurrentModel === 'pie') {
        const n = vfracTask.n;
        const cx = 100, cy = 100, r = 80;
        svgHtml += \`<circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="#fde68a" stroke="#d97706" stroke-width="4"/>\`;
        for (let i = 0; i < n; i++) {
            const startAngle = (i * 360 / n) * Math.PI / 180;
            const endAngle = ((i + 1) * 360 / n) * Math.PI / 180;
            const x1 = cx + r * Math.sin(startAngle);
            const y1 = cy - r * Math.cos(startAngle);
            const x2 = cx + r * Math.sin(endAngle);
            const y2 = cy - r * Math.cos(endAngle);
            const d = \`M \${cx} \${cy} L \${x1} \${y1} A \${r} \${r} 0 0 1 \${x2} \${y2} Z\`;
            svgHtml += \`<path d="\${d}" fill="transparent" stroke="#d97706" stroke-width="2" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" data-selected="false"/>\`;
        }
    } else if (vfracCurrentModel === 'choco') {
        const n = vfracTask.n;
        let cols = n % 5 === 0 ? 5 : (n % 4 === 0 ? 4 : (n % 3 === 0 ? 3 : 2));
        let rows = n / cols;
        const w = 160 / cols;
        const h = 160 / rows;
        const startX = 20, startY = 20;
        
        svgHtml += \`<rect x="\${startX-4}" y="\${startY-4}" width="\${cols*w+8}" height="\${rows*h+8}" fill="#451a03" rx="5"/>\`;
        let i = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (i >= n) break;
                svgHtml += \`<rect x="\${startX + c*w}" y="\${startY + r*h}" width="\${w-2}" height="\${h-2}" fill="#92400e" rx="3" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" data-selected="false"/>\`;
                i++;
            }
        }
    } else if (vfracCurrentModel === 'dots') {
        const n = vfracTask.n;
        // Arrange dots in a circle or grid
        let cols = Math.ceil(Math.sqrt(n));
        let rows = Math.ceil(n / cols);
        const w = 160 / cols;
        const h = 160 / rows;
        const startX = 20 + w/2, startY = 20 + h/2;
        
        let i = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (i >= n) break;
                svgHtml += \`<circle cx="\${startX + c*w}" cy="\${startY + r*h}" r="12" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" data-selected="false"/>\`;
                i++;
            }
        }
    }
    
    svgHtml += '</svg>';
    canvas.innerHTML = svgHtml;
}

function toggleVfracPiece(element) {
    const isSelected = element.getAttribute('data-selected') === 'true';
    if (isSelected) {
        element.setAttribute('data-selected', 'false');
        if (vfracCurrentModel === 'pie') element.setAttribute('fill', 'transparent');
        else if (vfracCurrentModel === 'choco') element.setAttribute('fill', '#92400e');
        else if (vfracCurrentModel === 'dots') element.setAttribute('fill', '#e2e8f0');
        vfracSelected--;
    } else {
        element.setAttribute('data-selected', 'true');
        if (vfracCurrentModel === 'pie') element.setAttribute('fill', '#ef4444');
        else if (vfracCurrentModel === 'choco') element.setAttribute('fill', '#d97706');
        else if (vfracCurrentModel === 'dots') element.setAttribute('fill', '#3b82f6');
        vfracSelected++;
    }
}

function checkVfracAnswer() {
    const fb = document.getElementById('vfrac-feedback');
    if (vfracSelected === vfracTask.target) {
        fb.innerHTML = \`<span style="color: #10b981;">✅ Perfekt! Du hast genau \${vfracTask.target}/\${vfracTask.n} eingefärbt.</span>\`;
    } else {
        fb.innerHTML = \`<span style="color: #ef4444;">❌ Fast. Die Rechnung war \${vfracTask.z1} + \${vfracTask.z2} = \${vfracTask.target}. Du hast aber \${vfracSelected} Stücke eingefärbt. Versuch es nochmal!</span>\`;
    }
}
`;

if (!js.includes('nextVfracTask')) {
    js = js.replace('function topicInit() {', `function topicInit() {\n    setTimeout(nextVfracTask, 500);\n`);
    js += '\n' + vfracJs;
    fs.writeFileSync('js/topics/math1_8_brueche.js', js, 'utf8');
    console.log("Added visual fraction calculator JS to js/topics/math1_8_brueche.js.");
}
