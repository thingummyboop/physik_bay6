const fs = require('fs');
const path = require('path');

// --- 1. Update de.json ---
const deJsonPath = 'physik_bay6_repo/lang/de.json';
const deData = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

const newContent = `
        <p>Die meisten Gegenstände leuchten nicht selbst. Sie werden von Licht getroffen. Ein Teil des Lichts wird <strong>absorbiert</strong> (geschluckt), ein anderer Teil wird <strong>reflektiert</strong> und gelangt in dein Auge.</p>
        <div class="remember-box"><strong>Merke:</strong> Du siehst die Farbe, die vom Gegenstand in dein Auge zurückgeworfen wird. Ein grünes Blatt reflektiert vor allem grünes Licht. Ein schwarzer Stoff absorbiert sehr viel Licht. Ein weißer Stoff reflektiert viele Farben.</div>
        <div class="interactive-zone color-object-lab">
            <h3>Farb-Detektiv: Was kommt ins Auge?</h3>
            <p>Wähle einen Gegenstand und verfolge, welches Licht zurückkommt.</p>
            <div style="margin-bottom: 15px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button type="button" onclick="showColorObject('red')" style="background: #ef4444; color: white; border: none; border-radius: 8px; padding: 10px 15px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Roter Pulli</button>
                <button type="button" onclick="showColorObject('green')" style="background: #22c55e; color: white; border: none; border-radius: 8px; padding: 10px 15px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Grünes Blatt</button>
                <button type="button" onclick="showColorObject('black')" style="background: #111827; color: white; border: 2px solid #374151; border-radius: 8px; padding: 10px 15px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(17, 24, 39, 0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Schwarzer Stoff</button>
                <button type="button" onclick="showColorObject('white')" style="background: #f8fafc; color: #0f172a; border: 2px solid #cbd5e1; border-radius: 8px; padding: 10px 15px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(248, 250, 252, 0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Weißes Papier</button>
            </div>
            <div class="diagram-box" style="background:#0f172a; color:white; border-radius: 12px; overflow: hidden; position: relative;">
                <svg width="460" height="260" viewBox="0 0 460 260" role="img" aria-label="Farbsehen durch Reflexion und Absorption">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    <!-- Light Source (Flashlight/Sun) -->
                    <circle cx="40" cy="100" r="25" fill="#facc15" filter="url(#glow)"></circle>
                    <path d="M 20 100 L 60 100" stroke="white" stroke-width="3" stroke-linecap="round"></path>
                    <text x="40" y="150" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Lichtquelle</text>
                    <text x="40" y="170" text-anchor="middle" fill="#94a3b8" font-size="12">(weißes Licht)</text>

                    <!-- Incoming Light (Multi-colored rays to represent white light) -->
                    <g id="incomingRays">
                        <path d="M 75 90 L 190 90" stroke="#ef4444" stroke-width="4" stroke-dasharray="8,4">
                            <animate attributeName="stroke-dashoffset" values="12;0" dur="0.5s" repeatCount="indefinite" />
                        </path>
                        <path d="M 75 100 L 190 100" stroke="#22c55e" stroke-width="4" stroke-dasharray="8,4">
                            <animate attributeName="stroke-dashoffset" values="12;0" dur="0.5s" repeatCount="indefinite" />
                        </path>
                        <path d="M 75 110 L 190 110" stroke="#3b82f6" stroke-width="4" stroke-dasharray="8,4">
                            <animate attributeName="stroke-dashoffset" values="12;0" dur="0.5s" repeatCount="indefinite" />
                        </path>
                    </g>
                    
                    <!-- The Object (T-Shirt / Object shape) -->
                    <g id="objectGroup" transform="translate(230, 100)">
                        <path id="colorObject" d="M -30 -30 Q -15 -40 0 -40 Q 15 -40 30 -30 L 50 -10 L 35 5 L 25 -5 L 25 40 Q 0 45 -25 40 L -25 -5 L -35 5 Z" fill="#ef4444" stroke="#ffffff" stroke-width="3" filter="url(#glow)"/>
                        <text id="colorObjectLabel" x="0" y="-55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">roter Pulli</text>
                    </g>

                    <!-- Reflected Ray -->
                    <g id="reflectedRayGroup"></g>

                    <!-- Absorbed Rays -->
                    <g id="absorbedRays" opacity="0.8"></g>

                    <!-- The Eye -->
                    <g transform="translate(410, 90)">
                        <path d="M -20 0 Q 0 -20 20 0 Q 0 20 -20 0" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></path>
                        <circle id="colorEye" cx="0" cy="0" r="8" fill="#ef4444"></circle>
                        <circle cx="2" cy="-2" r="2" fill="white"></circle>
                        <text x="0" y="40" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Auge</text>
                    </g>
                </svg>
                <div style="background: rgba(30, 41, 59, 0.8); padding: 15px; text-align: center; border-top: 1px solid #334155;">
                    <p id="colorObjectText" class="lab-feedback" style="color:#f8fafc; margin: 0; font-size: 1.1em;">Wähle oben einen Gegenstand aus.</p>
                </div>
            </div>
        </div>
        <div class="mini-task"><strong>Mini-Auftrag:</strong> Zeichne eine Lampe, einen farbigen Gegenstand und ein Auge. Beschrifte: weißes Licht, reflektierte Farbe, absorbierte Farben.</div>
        {{QUIZ_farben_s4_q0}}
    `;

let secIndex = deData.farben.sections.findIndex(s => s.id === 'sec3');
if(secIndex !== -1) {
    deData.farben.sections[secIndex].content = newContent;
    fs.writeFileSync(deJsonPath, JSON.stringify(deData, null, 2), 'utf8');
    console.log("de.json updated!");
} else {
    console.log("Section sec3 not found in de.json");
}

// --- 2. Update js/topics/farben.js ---
const jsPath = 'physik_bay6_repo/js/topics/farben.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

const regex = /function showColorObject\(kind\)\s*\{[\s\S]*?(?=\nfunction simulateJump|\nfunction setWave)/;
const newJSFunc = `function showColorObject(kind) {
    const object = document.getElementById('colorObject');
    const label = document.getElementById('colorObjectLabel');
    const text = document.getElementById('colorObjectText');
    const eye = document.getElementById('colorEye');
    const reflectedRays = document.getElementById('reflectedRayGroup');
    const absorbedRays = document.getElementById('absorbedRays');
    
    if (!object) return;

    const states = {
        red: {
            fill: '#ef4444',
            shape: 'M -30 -30 Q -15 -40 0 -40 Q 15 -40 30 -30 L 50 -10 L 35 5 L 25 -5 L 25 40 Q 0 45 -25 40 L -25 -5 L -35 5 Z', // T-Shirt
            reflected: [{c: '#ef4444', w: 8, off: 0}],
            absorbed: ['#22c55e', '#3b82f6'],
            eye: '#ef4444',
            label: 'Roter Pulli',
            text: 'Der rote Pulli wirft (reflektiert) das rote Licht zurück in dein Auge. Das grüne und blaue Licht wird geschluckt (absorbiert).'
        },
        green: {
            fill: '#22c55e',
            shape: 'M 0 -45 C 30 -45 45 -15 0 45 C -45 -15 -30 -45 0 -45 Z', // Leaf shape
            reflected: [{c: '#22c55e', w: 8, off: 0}],
            absorbed: ['#ef4444', '#3b82f6'],
            eye: '#22c55e',
            label: 'Grünes Blatt',
            text: 'Das grüne Blatt reflektiert vor allem grünes Licht. Rot und Blau werden vom Blatt absorbiert.'
        },
        black: {
            fill: '#111827',
            shape: 'M -30 -20 L -10 -40 L 20 -35 L 40 -10 L 35 20 L 10 40 L -25 30 Z', // Rock/Cloth shape
            reflected: [], // None
            absorbed: ['#ef4444', '#22c55e', '#3b82f6'],
            eye: '#111827',
            label: 'Schwarzer Stoff',
            text: 'Schwarzer Stoff schluckt (absorbiert) fast das gesamte Licht. Es kommt kaum Licht am Auge an – deshalb sehen wir Schwarz!'
        },
        white: {
            fill: '#f8fafc',
            shape: 'M -30 -35 L 30 -35 L 30 35 L -30 35 Z', // Paper sheet shape
            reflected: [
                {c: '#ef4444', w: 4, off: -8}, 
                {c: '#22c55e', w: 4, off: 0}, 
                {c: '#3b82f6', w: 4, off: 8}
            ],
            absorbed: [], // None
            eye: '#f8fafc',
            label: 'Weißes Papier',
            text: 'Weißes Papier reflektiert alle Farben des Lichts gleichermaßen. Wenn alle Lichtfarben zusammen in unser Auge treffen, sehen wir Weiß.'
        }
    };

    const state = states[kind] || states.red;
    object.setAttribute('fill', state.fill);
    object.setAttribute('d', state.shape);
    eye.setAttribute('fill', state.eye);
    label.textContent = state.label;
    text.textContent = state.text;

    // Build Reflected Rays
    reflectedRays.innerHTML = '';
    state.reflected.forEach(r => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const yBase = 90 + r.off;
        path.setAttribute('d', \`M 280 \${yBase} Q 330 \${yBase - 20} 380 \${yBase}\`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', r.c);
        path.setAttribute('stroke-width', r.w);
        path.setAttribute('stroke-dasharray', '10,5');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('filter', 'url(#glow)');
        
        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute('attributeName', 'stroke-dashoffset');
        anim.setAttribute('values', '15;0');
        anim.setAttribute('dur', '0.5s');
        anim.setAttribute('repeatCount', 'indefinite');
        path.appendChild(anim);
        
        reflectedRays.appendChild(path);
    });

    // Build Absorbed Rays
    absorbedRays.innerHTML = '';
    if (state.absorbed.length > 0) {
        state.absorbed.forEach((c, i) => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const x = 210 + i * 20;
            path.setAttribute('d', \`M \${x} 150 L \${x} 200\`);
            path.setAttribute('stroke', c);
            path.setAttribute('stroke-width', 4);
            path.setAttribute('stroke-dasharray', '4,4');
            
            const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            anim.setAttribute('attributeName', 'stroke-dashoffset');
            anim.setAttribute('values', '8;0');
            anim.setAttribute('dur', '0.6s');
            anim.setAttribute('repeatCount', 'indefinite');
            path.appendChild(anim);
            
            absorbedRays.appendChild(path);
        });
        
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute('x', '230');
        txt.setAttribute('y', '225');
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('fill', '#94a3b8');
        txt.setAttribute('font-size', '11');
        txt.textContent = 'absorbiert';
        absorbedRays.appendChild(txt);
    }
}
`;

jsContent = jsContent.replace(regex, newJSFunc);
fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log("farben.js updated!");
