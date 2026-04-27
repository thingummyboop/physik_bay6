
const mSlider = document.getElementById('mixed-slider');
const mVisual = document.getElementById('mixed-visual');
if(mSlider && mVisual) {
    mSlider.oninput = (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('mixed-unecht').innerText = val + '/4';
        const w = Math.floor(val / 4);
        const r = val % 4;
        let mStr = "";
        if (w > 0) mStr += '<span style="color:#27ae60;">' + w + '</span> ';
        if (r > 0) mStr += '<span style="color:#e74c3c;">' + r + '/4</span>';
        document.getElementById('mixed-gemischt').innerHTML = mStr;
        
        mVisual.innerHTML = '';
        const pizzas = Math.ceil(val / 4);
        let drawn = 0;
        for(let p=0; p<pizzas; p++) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '60'); svg.setAttribute('height', '60'); svg.setAttribute('viewBox', '0 0 60 60');
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bg.setAttribute('cx', '30'); bg.setAttribute('cy', '30'); bg.setAttribute('r', '28');
            bg.setAttribute('fill', '#ecf0f1'); bg.setAttribute('stroke', '#bdc3c7'); bg.setAttribute('stroke-width', '2');
            svg.appendChild(bg);
            for(let i=0; i<4; i++) {
                if (drawn < val) {
                    const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const startAngle = (i * 90) * Math.PI / 180;
                    const endAngle = ((i+1) * 90) * Math.PI / 180;
                    const x1 = 30 + 28 * Math.sin(startAngle); const y1 = 30 - 28 * Math.cos(startAngle);
                    const x2 = 30 + 28 * Math.sin(endAngle); const y2 = 30 - 28 * Math.cos(endAngle);
                    const d = `M 30 30 L ${x1} ${y1} A 28 28 0 0 1 ${x2} ${y2} Z`;
                    slice.setAttribute('d', d);
                    slice.setAttribute('fill', w > p ? '#27ae60' : '#e74c3c');
                    slice.setAttribute('stroke', 'white');
                    svg.appendChild(slice);
                    drawn++;
                }
            }
            mVisual.appendChild(svg);
        }
    };
    mSlider.dispatchEvent(new Event('input'));
}
document.getElementById('pizza-slider-1').addEventListener('input', function(e) { const pieces = parseInt(e.target.value); document.getElementById('pizza-pieces-1').textContent = pieces; const svg = document.getElementById('pizza-svg-1'); svg.innerHTML = '<circle cx="100" cy="100" r="90" fill="#f9c975" stroke="#d35400" stroke-width="10"/>'; for (let i = 0; i < pieces; i++) { const angle = (i * 360 / pieces) * Math.PI / 180; const x2 = 100 + 90 * Math.sin(angle); const y2 = 100 - 90 * Math.cos(angle); const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'); line.setAttribute('x1', '100'); line.setAttribute('y1', '100'); line.setAttribute('x2', x2); line.setAttribute('y2', y2); line.setAttribute('stroke', '#d35400'); line.setAttribute('stroke-width', '4'); svg.appendChild(line); } }); document.getElementById('pizza-slider-1').dispatchEvent(new Event('input'));

let z = 1; let n = 2; const update = () => { document.getElementById('zaehler-val').textContent = z; document.getElementById('nenner-val').textContent = n; document.getElementById('z-text').textContent = z; document.getElementById('n-text').textContent = n; }; document.getElementById('z-up').onclick = () => { z++; update(); }; document.getElementById('z-down').onclick = () => { if(z > 0) z--; update(); }; document.getElementById('n-up').onclick = () => { n++; update(); }; document.getElementById('n-down').onclick = () => { if(n > 1) n--; update(); };

const gridSvg = document.getElementById('grid-svg'); let activeCells = [false, false, false, false]; const renderGrid = () => { gridSvg.innerHTML = ''; activeCells.forEach((active, i) => { const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); rect.setAttribute('x', i * 50); rect.setAttribute('y', 0); rect.setAttribute('width', 50); rect.setAttribute('height', 50); rect.setAttribute('fill', active ? '#3498db' : '#ecf0f1'); rect.setAttribute('stroke', '#2c3e50'); rect.setAttribute('stroke-width', '2'); rect.onclick = () => { activeCells[i] = !activeCells[i]; renderGrid(); }; gridSvg.appendChild(rect); }); const count = activeCells.filter(x => x).length; document.getElementById('grid-fraction').textContent = count + '/4'; }; renderGrid();

const cSlider = document.getElementById('c-slider'); const cType = document.getElementById('c-type'); const cVisual = document.getElementById('c-visual'); cSlider.oninput = (e) => { const z = parseInt(e.target.value); document.getElementById('c-zaehler').textContent = z; if (z < 4) { cType.textContent = 'Echter Bruch (< 1)'; cType.style.color = 'green'; } else if (z === 4) { cType.textContent = 'Unechter Bruch (= 1)'; cType.style.color = 'orange'; } else { cType.textContent = 'Unechter Bruch (> 1)'; cType.style.color = 'red'; } cVisual.innerHTML = ''; let pizzas = Math.ceil(z / 4); if(pizzas === 0) pizzas = 1; let drawn = 0; for(let p=0; p<pizzas; p++) { const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('width', '60'); svg.setAttribute('height', '60'); svg.setAttribute('viewBox', '0 0 60 60'); const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); bg.setAttribute('cx', '30'); bg.setAttribute('cy', '30'); bg.setAttribute('r', '28'); bg.setAttribute('fill', '#ecf0f1'); bg.setAttribute('stroke', '#bdc3c7'); bg.setAttribute('stroke-width', '2'); svg.appendChild(bg); for(let i=0; i<4; i++) { if (drawn < z) { const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path'); const startAngle = (i * 90) * Math.PI / 180; const endAngle = ((i+1) * 90) * Math.PI / 180; const x1 = 30 + 28 * Math.sin(startAngle); const y1 = 30 - 28 * Math.cos(startAngle); const x2 = 30 + 28 * Math.sin(endAngle); const y2 = 30 - 28 * Math.cos(endAngle); const d = `M 30 30 L ${x1} ${y1} A 28 28 0 0 1 ${x2} ${y2} Z`; slice.setAttribute('d', d); slice.setAttribute('fill', '#e74c3c'); slice.setAttribute('stroke', '#c0392b'); svg.appendChild(slice); drawn++; } } cVisual.appendChild(svg); } }; cSlider.dispatchEvent(new Event('input'));

const c1 = document.getElementById('svg-half'); const c2 = document.getElementById('svg-quarter'); const btn = document.getElementById('btn-toggle-expand'); let expanded = true; const drawPie = (container, pieces, filled) => { const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('width', '100'); svg.setAttribute('height', '100'); svg.setAttribute('viewBox', '0 0 100 100'); const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); bg.setAttribute('cx', '50'); bg.setAttribute('cy', '50'); bg.setAttribute('r', '45'); bg.setAttribute('fill', '#ecf0f1'); bg.setAttribute('stroke', '#bdc3c7'); bg.setAttribute('stroke-width', '2'); svg.appendChild(bg); for(let i=0; i<pieces; i++) { const startAngle = (i * 360/pieces) * Math.PI / 180; const endAngle = ((i+1) * 360/pieces) * Math.PI / 180; const x1 = 50 + 45 * Math.sin(startAngle); const y1 = 50 - 45 * Math.cos(startAngle); const x2 = 50 + 45 * Math.sin(endAngle); const y2 = 50 - 45 * Math.cos(endAngle); const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); const largeArc = (360/pieces > 180) ? 1 : 0; const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`; path.setAttribute('d', d); path.setAttribute('fill', i < filled ? '#f1c40f' : 'transparent'); path.setAttribute('stroke', '#34495e'); path.setAttribute('stroke-width', '1'); svg.appendChild(path); } container.innerHTML = ''; container.appendChild(svg); }; const updateViews = () => { if (expanded) { drawPie(c1, 2, 1); drawPie(c2, 4, 2); btn.textContent = 'Zeige Erweitern (1/2 -> 2/4)'; document.getElementById('expand-text').innerHTML = 'Wir haben den Bruch 2/4 mit 2 gekürzt und erhalten <span style="font-weight:bold;">1/2</span>.'; } else { drawPie(c1, 4, 2); drawPie(c2, 2, 1); btn.textContent = 'Zeige Kürzen (2/4 -> 1/2)'; document.getElementById('expand-text').innerHTML = 'Wir haben den Bruch 1/2 mit 2 erweitert und erhalten <span style="font-weight:bold;">2/4</span>.'; } expanded = !expanded; }; updateViews(); btn.onclick = updateViews;


function topicInit() {
    enhanceFractionAccessibility();
    initZstrahl();

    setTimeout(nextVfracTask, 500);

  // Init logic is handled inline, but function required by renderer
}

function enhanceFractionAccessibility() {
    ['vfrac-feedback', 'zstrahl-feedback', 'anteil-feedback', 'vfrac-task-text'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const slider = document.getElementById('zstrahl-slider');
    if (slider) {
        slider.setAttribute('aria-describedby', 'zstrahl-task zstrahl-feedback');
        slider.setAttribute('aria-valuetext', '0 Prozent auf dem Zahlenstrahl');
    }
}


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
    let n, z1, z2, operation;
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

    const randOp = Math.random();
    if (randOp < 0.33) {
        operation = '+';
        z1 = Math.floor(Math.random() * (n/2)) + 1;
        z2 = Math.floor(Math.random() * (n - z1 - 1)) + 1;
        vfracTask = { n: n, z1: z1, z2: z2, operation: '+', target: z1 + z2 };
        taskText.innerHTML = `\\(\\frac{${z1}}{${n}} + \\frac{${z2}}{${n}} = \\ ?\\)`;
    } else if (randOp < 0.66) {
        operation = '-';
        z1 = Math.floor(Math.random() * (n - 2)) + 2;
        z2 = Math.floor(Math.random() * (z1 - 1)) + 1;
        vfracTask = { n: n, z1: z1, z2: z2, operation: '-', target: z1 - z2 };
        taskText.innerHTML = `\\(\\frac{${z1}}{${n}} - \\frac{${z2}}{${n}} = \\ ?\\)`;
    } else {
        operation = '*';
        const w = Math.floor(Math.random() * 3) + 2;
        z2 = Math.floor(Math.random() * Math.floor(n/w)) + 1;
        vfracTask = { n: n, w: w, z2: z2, operation: '*', target: w * z2 };
        taskText.innerHTML = `\\(${w} \\cdot \\frac{${z2}}{${n}} = \\ ?\\)`;
    }
    
    if (window.MathJax) MathJax.typesetPromise([taskText]);

    drawVfracCanvas();
}

function drawVfracCanvas() {
    const canvas = document.getElementById('vfrac-canvas');
    let svgHtml = '<svg width="100%" height="100%" viewBox="0 0 200 200">';
    let pieceIndex = 1;
    
    if (vfracCurrentModel === 'pie') {
        const n = vfracTask.n;
        const cx = 100, cy = 100, r = 80;
        svgHtml += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fde68a" stroke="#d97706" stroke-width="4"/>`;
        for (let i = 0; i < n; i++) {
            const startAngle = (i * 360 / n) * Math.PI / 180;
            const endAngle = ((i + 1) * 360 / n) * Math.PI / 180;
            const x1 = cx + r * Math.sin(startAngle);
            const y1 = cy - r * Math.cos(startAngle);
            const x2 = cx + r * Math.sin(endAngle);
            const y2 = cy - r * Math.cos(endAngle);
            const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
            svgHtml += `<path d="${d}" fill="transparent" stroke="#d97706" stroke-width="2" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" onkeydown="handleVfracPieceKey(event, this)" tabindex="0" role="button" aria-pressed="false" aria-label="Pizzastück ${pieceIndex++} von ${n} auswählen" data-selected="false"/>`;
        }
    } else if (vfracCurrentModel === 'choco') {
        const n = vfracTask.n;
        let cols = n % 5 === 0 ? 5 : (n % 4 === 0 ? 4 : (n % 3 === 0 ? 3 : 2));
        let rows = n / cols;
        const w = 160 / cols;
        const h = 160 / rows;
        const startX = 20, startY = 20;
        
        svgHtml += `<rect x="${startX-4}" y="${startY-4}" width="${cols*w+8}" height="${rows*h+8}" fill="#451a03" rx="5"/>`;
        let i = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (i >= n) break;
                svgHtml += `<rect x="${startX + c*w}" y="${startY + r*h}" width="${w-2}" height="${h-2}" fill="#92400e" rx="3" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" onkeydown="handleVfracPieceKey(event, this)" tabindex="0" role="button" aria-pressed="false" aria-label="Schokostück ${pieceIndex++} von ${n} auswählen" data-selected="false"/>`;
                i++;
            }
        }
    } else if (vfracCurrentModel === 'dots') {
        const n = vfracTask.n;
        let cols = Math.ceil(Math.sqrt(n));
        let rows = Math.ceil(n / cols);
        const w = 160 / cols;
        const h = 160 / rows;
        const startX = 20 + w/2, startY = 20 + h/2;
        
        let i = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (i >= n) break;
                svgHtml += `<circle cx="${startX + c*w}" cy="${startY + r*h}" r="12" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" style="cursor:pointer; transition: fill 0.2s;" onclick="toggleVfracPiece(this)" onkeydown="handleVfracPieceKey(event, this)" tabindex="0" role="button" aria-pressed="false" aria-label="Punkt ${pieceIndex++} von ${n} auswählen" data-selected="false"/>`;
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
        element.setAttribute('aria-pressed', 'false');
        if (vfracCurrentModel === 'pie') element.setAttribute('fill', 'transparent');
        else if (vfracCurrentModel === 'choco') element.setAttribute('fill', '#92400e');
        else if (vfracCurrentModel === 'dots') element.setAttribute('fill', '#e2e8f0');
        vfracSelected--;
    } else {
        element.setAttribute('data-selected', 'true');
        element.setAttribute('aria-pressed', 'true');
        if (vfracCurrentModel === 'pie') element.setAttribute('fill', '#ef4444');
        else if (vfracCurrentModel === 'choco') element.setAttribute('fill', '#d97706');
        else if (vfracCurrentModel === 'dots') element.setAttribute('fill', '#3b82f6');
        vfracSelected++;
    }
}

function handleVfracPieceKey(event, element) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleVfracPiece(element);
}

function checkVfracAnswer() {
    const fb = document.getElementById('vfrac-feedback');
    if (vfracSelected === vfracTask.target) {
        fb.innerHTML = `<span style="color: #10b981;">✅ Perfekt! Du hast genau ${vfracTask.target}/${vfracTask.n} eingefärbt.</span>`;
    } else {
        let msg = "";
        if (vfracTask.operation === '+') {
            msg = `${vfracTask.z1} + ${vfracTask.z2} = ${vfracTask.target}`;
        } else if (vfracTask.operation === '-') {
            msg = `${vfracTask.z1} - ${vfracTask.z2} = ${vfracTask.target}`;
        } else {
            msg = `${vfracTask.w} \\cdot ${vfracTask.z2} = ${vfracTask.target}`;
        }
        fb.innerHTML = `<span style="color: #ef4444;">❌ Fast. Die Rechnung war ${msg}. Du hast aber ${vfracSelected} Stücke eingefärbt. Versuch es nochmal!</span>`;
    }
}

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
    document.getElementById('zstrahl-slider')?.setAttribute('aria-valuetext', Math.round(val) + ' Prozent auf dem Zahlenstrahl');
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
