
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
  // Init logic is handled inline, but function required by renderer
}
