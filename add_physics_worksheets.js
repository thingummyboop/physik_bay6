const fs = require('fs');

// 1. Add worksheet button to all topics in renderer.js
let renderer = fs.readFileSync('js/renderer.js', 'utf8');
const oldRendererLogic = `        if (topicId.startsWith('math')) {
            document.body.classList.add('math-theme');
            const wsBtn = document.createElement('button');
            wsBtn.innerHTML = '🖨️ Arbeitsblätter zum Üben drucken';
            wsBtn.className = 'worksheet-btn';
            wsBtn.onclick = () => window.open('worksheet.html?topic=' + topicId, '_blank');
            container.appendChild(wsBtn);
        } else {
            document.body.classList.remove('math-theme');
        }`;

const newRendererLogic = `        if (topicId.startsWith('math')) {
            document.body.classList.add('math-theme');
        } else {
            document.body.classList.remove('math-theme');
        }
        const wsBtn = document.createElement('button');
        wsBtn.innerHTML = '🖨️ Arbeitsblätter zum Üben drucken';
        wsBtn.className = 'worksheet-btn';
        if (!topicId.startsWith('math')) {
            wsBtn.style.background = 'var(--secondary)'; // Orange for physics
            wsBtn.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.4)';
        }
        wsBtn.onclick = () => window.open('worksheet.html?topic=' + topicId, '_blank');
        container.appendChild(wsBtn);`;

if (renderer.includes(oldRendererLogic)) {
    renderer = renderer.replace(oldRendererLogic, newRendererLogic);
    fs.writeFileSync('js/renderer.js', renderer, 'utf8');
    console.log("Renderer updated to show worksheet button for all topics.");
}

// 2. Add physics generators to worksheet_generator.js
let wsGen = fs.readFileSync('js/worksheet_generator.js', 'utf8');
const additionalTopics = "    else if (topicId === 'elektrizitaet') {\n" +
"        html += '<h2>1. Das Ohmsche Gesetz (U = R \\\\(\\\\cdot\\\\) I)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const R = rand(10, 100);\n" +
"            const I = rand(1, 10);\n" +
"            html += '<div>Geg: R = ' + R + ' \\\\(\\\\Omega\\\\), I = ' + I + ' A<br><br>Ges: U = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:60px;\"></span> V</div>';\n" +
"        }\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const R = rand(10, 50);\n" +
"            const U = R * rand(2, 12);\n" +
"            html += '<div>Geg: U = ' + U + ' V, R = ' + R + ' \\\\(\\\\Omega\\\\)<br><br>Ges: I = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:60px;\"></span> A</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'kraft_und_bewegung') {\n" +
"        html += '<h2>1. Geschwindigkeit (v = s : t)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const v = rand(10, 130);\n" +
"            const t = rand(2, 10);\n" +
"            const s = v * t;\n" +
"            html += '<div>Ein Auto fährt in ' + t + ' Stunden genau ' + s + ' km weit.<br><br>v = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:60px;\"></span> km/h</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"        html += '<h2>2. Kraft (F = m \\\\(\\\\cdot\\\\) a)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const m = rand(5, 50);\n" +
"            const a = rand(2, 10);\n" +
"            html += '<div>Masse m = ' + m + ' kg, Beschleunigung a = ' + a + ' m/s²<br><br>Kraft F = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:60px;\"></span> N</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'arbeit') {\n" +
"        html += '<h2>1. Mechanische Arbeit (W = F \\\\(\\\\cdot\\\\) s)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<8; i++) {\n" +
"            const F = rand(50, 500);\n" +
"            const s = rand(2, 20);\n" +
"            html += '<div>Du ziehst einen Wagen mit F = ' + F + ' N über eine Strecke von s = ' + s + ' m.<br><br>Arbeit W = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:80px;\"></span> J (Joule)</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'energie') {\n" +
"        html += '<h2>1. Lageenergie (E = m \\\\(\\\\cdot\\\\) g \\\\(\\\\cdot\\\\) h)</h2><p><em>Hinweis: Rechne mit g = 10 m/s²</em></p><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<8; i++) {\n" +
"            const m = rand(10, 100);\n" +
"            const h = rand(5, 50);\n" +
"            html += '<div>Masse m = ' + m + ' kg, Höhe h = ' + h + ' m<br><br>E_pot = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:80px;\"></span> J</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else {\n" +
"        return null;\n" +
"    }\n" +
"    return html;\n" +
"}";

const oldEnd = "    else {\n" +
"        return null;\n" +
"    }\n" +
"    return html;\n" +
"}";

if (wsGen.includes(oldEnd)) {
    wsGen = wsGen.replace(oldEnd, additionalTopics);
    fs.writeFileSync('js/worksheet_generator.js', wsGen, 'utf8');
    console.log("Worksheet generator updated with Physics topics!");
}