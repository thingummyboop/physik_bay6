const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const newSec = {
    "id": "pyth_puzzle",
    "title": "Das Puzzle: Beweise es selbst!",
    "content": `
    <p>Wir behaupten: Die Fläche der beiden kleinen Quadrate (<strong>a²</strong> und <strong>b²</strong>) passt <em>exakt</em> in das große Quadrat (<strong>c²</strong>). Glaube nicht nur, was du liest – beweise es selbst!</p>
    <div class="interactive-zone" style="background: #f8fafc; border: 2px solid #3b82f6; border-radius: 12px; padding: 15px; text-align: center;">
        <h3 style="color: #2563eb;">🧩 Das 1cm²-Puzzle</h3>
        <p style="font-size: 1.1em;">Klicke auf die farbigen Quadrate aus <strong>a²</strong> und <strong>b²</strong>, um sie in das große <strong>c²</strong> wandern zu lassen.</p>
        <div style="position: relative; width: 100%; max-width: 450px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <svg id="pyth-puzzle-svg" width="100%" viewBox="0 0 450 450" style="display: block;">
                <!-- Triangle -->
                <polygon points="200,110 320,200 200,200" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
                <text x="180" y="160" font-size="18" fill="#475569" font-weight="bold">a</text>
                <text x="260" y="220" font-size="18" fill="#475569" font-weight="bold">b</text>
                <text x="265" y="145" font-size="18" fill="#475569" font-weight="bold">c</text>
                
                <!-- c^2 Empty Grid -->
                <g id="pyth-c2-grid" stroke="#cbd5e1" stroke-width="1" fill="none">
                    <!-- Generated via JS -->
                </g>

                <!-- a^2 Grid (9 squares) -->
                <g id="pyth-a2-grid" stroke="#fff" stroke-width="2">
                    <!-- Generated via JS -->
                </g>

                <!-- b^2 Grid (16 squares) -->
                <g id="pyth-b2-grid" stroke="#fff" stroke-width="2">
                    <!-- Generated via JS -->
                </g>
            </svg>
            <div id="pyth-success-msg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(34, 197, 94, 0.95); color: white; padding: 20px; border-radius: 12px; font-size: 1.5em; font-weight: bold; opacity: 0; pointer-events: none; transition: opacity 0.5s;">
                🎉 Beweis erbracht!<br><span style="font-size:0.6em;">9 + 16 = 25</span>
            </div>
        </div>
        <button onclick="resetPythPuzzle()" style="margin-top: 15px; background: #64748b;">🔄 Puzzle zurücksetzen</button>
    </div>
    <p>Ist das nicht verrückt? Obwohl das Dreieck schräg liegt, passen die 9 blauen Quadrate (a²) und die 16 roten Quadrate (b²) genau in die 25 Lücken des großen Quadrats (c²)!</p>
    <br>
    {{QUIZ_pyth_puzzle_1}}
    `,
    "quizzes": [
        {
            "id": "pyth_puzzle_1",
            "question": "Was beweist das Puzzle, das du gerade gelöst hast?",
            "answers": [
                { "text": "Dass die Fläche von a² plus die Fläche von b² genau die Fläche von c² ergibt.", "correct": true, "pts": 10 },
                { "text": "Dass rote und blaue Quadrate gut zusammenpassen.", "correct": false, "pts": 5 },
                { "text": "Dass das Dreieck in der Mitte wächst.", "correct": false, "pts": 5 }
            ]
        }
    ]
};

if (!de.math3_8_pythagoras.sections.find(s => s.id === 'pyth_puzzle')) {
    de.math3_8_pythagoras.sections.splice(1, 0, newSec); // Insert after sec1
    fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
    console.log("Added Pythagoras puzzle section to de.json.");
}

// 2. Add the JS logic
let js = fs.readFileSync('js/topics/math3_8_pythagoras.js', 'utf8');

const puzzleJs = `
let pythFilled = 0;
const pythTargets = [];

function initPythPuzzle() {
    const c2Grid = document.getElementById('pyth-c2-grid');
    const a2Grid = document.getElementById('pyth-a2-grid');
    const b2Grid = document.getElementById('pyth-b2-grid');
    if (!c2Grid || !a2Grid || !b2Grid) return;
    
    c2Grid.innerHTML = '';
    a2Grid.innerHTML = '';
    b2Grid.innerHTML = '';
    pythTargets.length = 0;
    pythFilled = 0;
    document.getElementById('pyth-success-msg').style.opacity = 0;

    // A = (200, 110), B = (320, 200)
    // Vector u = (120, 90) / 5 = (24, 18)
    // Vector v = (-90, 120) / 5 = (-18, 24)
    
    // Generate c² target slots
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            const p1 = { x: 200 + i*24 + j*(-18), y: 110 + i*18 + j*24 };
            const p2 = { x: p1.x + 24, y: p1.y + 18 };
            const p3 = { x: p2.x - 18, y: p2.y + 24 };
            const p4 = { x: p1.x - 18, y: p1.y + 24 };
            
            const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute("points", \`\${p1.x},\${p1.y} \${p2.x},\${p2.y} \${p3.x},\${p3.y} \${p4.x},\${p4.y}\`);
            c2Grid.appendChild(poly);
            
            pythTargets.push({ p1, p2, p3, p4 });
        }
    }
    
    // Shuffle targets so they fill randomly
    for (let k = pythTargets.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [pythTargets[k], pythTargets[j]] = [pythTargets[j], pythTargets[k]];
    }

    // Generate a² squares (3x3 grid going left and up from (200, 200) to (200, 110))
    // Wait, side a is vertical (200,110) to (200,200). Length is 90. So 3 squares of 30x30.
    // They extend to the left: X from 110 to 200, Y from 110 to 200.
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            const x = 110 + i*30;
            const y = 110 + j*30;
            createDraggableSquare(a2Grid, x, y, 30, '#3b82f6');
        }
    }

    // Generate b² squares (4x4 grid going right and down from (200, 200) to (320, 200))
    // Side b is horizontal (200,200) to (320,200). Length is 120. So 4 squares of 30x30.
    // They extend down: X from 200 to 320, Y from 200 to 320.
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            const x = 200 + i*30;
            const y = 200 + j*30;
            createDraggableSquare(b2Grid, x, y, 30, '#ef4444');
        }
    }
}

function createDraggableSquare(parent, x, y, size, color) {
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    // Standard square points
    const pts = \`\${x},\${y} \${x+size},\${y} \${x+size},\${y+size} \${x},\${y+size}\`;
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", color);
    poly.style.cursor = "pointer";
    poly.style.transition = "all 0.5s ease-in-out";
    
    poly.onclick = function() {
        if (poly.getAttribute("data-moved") === "true") return;
        poly.setAttribute("data-moved", "true");
        
        const target = pythTargets[pythFilled];
        if (!target) return;
        
        const newPts = \`\${target.p1.x},\${target.p1.y} \${target.p2.x},\${target.p2.y} \${target.p3.x},\${target.p3.y} \${target.p4.x},\${target.p4.y}\`;
        
        poly.setAttribute("points", newPts);
        pythFilled++;
        
        if (pythFilled === 25) {
            setTimeout(() => {
                document.getElementById('pyth-success-msg').style.opacity = 1;
            }, 500);
        }
    };
    parent.appendChild(poly);
}

function resetPythPuzzle() {
    initPythPuzzle();
}
`;

if (!js.includes('initPythPuzzle')) {
    js = js.replace('function topicInit() {', `function topicInit() {\n    initPythPuzzle();\n`);
    js += '\n' + puzzleJs;
    fs.writeFileSync('js/topics/math3_8_pythagoras.js', js, 'utf8');
    console.log("Added Pythagoras puzzle JS to js/topics/math3_8_pythagoras.js.");
}
