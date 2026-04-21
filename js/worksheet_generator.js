// js/worksheet_generator.js
function generateWorksheetContent(topicId, topicTitle) {
    let html = '';
    
    // Helper function for random numbers
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (topicId === 'math1_2_nat_zahlen') {
        html += `<h2>1. Runden von Zahlen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const num = rand(1000, 99999);
            const places = [10, 100, 1000];
            const p = places[rand(0, 2)];
            let pStr = p === 10 ? "Zehner" : (p === 100 ? "Hunderter" : "Tausender");
            html += `<div>Runde <strong>${num}</strong> auf ${pStr}: <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Vergleichen (&lt;, &gt;, =)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const num1 = rand(1000, 9999);
            const num2 = rand(0, 5) > 4 ? num1 : num1 + rand(-50, 50);
            html += `<div>${num1} <span style="display:inline-block; border:1px solid #000; width:20px; height:20px;"></span> ${num2}</div>`;
        }
        html += `</div>`;
        
        html += `<h2>3. Addition und Subtraktion</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const n1 = rand(1000, 9000);
            const n2 = rand(100, 4000);
            const op = rand(0, 1) === 0 ? '+' : '-';
            html += `<div>${n1} ${op} ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
    } 
    else if (topicId === 'math1_8_brueche') {
        html += `<h2>1. Erweitern und Kürzen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const n = rand(3, 12);
            const z = rand(1, n-1);
            const factor = rand(2, 5);
            html += `<div>Erweitere \\(\\frac{${z}}{${n}}\\) mit ${factor}: <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        for(let i=0; i<6; i++) {
            const factor = rand(2, 5);
            const n = rand(3, 10);
            const z = rand(1, n-1);
            html += `<div>Kürze \\(\\frac{${z*factor}}{${n*factor}}\\) durch ${factor}: <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Gemischte Zahlen in unechte Brüche</h2><div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<9; i++) {
            const w = rand(1, 5);
            const n = rand(2, 8);
            const z = rand(1, n-1);
            html += `<div>\\(${w}\\frac{${z}}{${n}}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>3. Unechte Brüche in gemischte Zahlen</h2><div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<9; i++) {
            const w = rand(1, 5);
            const n = rand(2, 8);
            const z = rand(1, n-1);
            const top = (w * n) + z;
            html += `<div>\\(\\frac{${top}}{${n}}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math2_2_brueche') {
        html += `<h2>1. Brüche gleichnamig machen und addieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            let n1 = rand(2, 8);
            let n2 = rand(2, 8);
            while (n1 === n2) n2 = rand(2,8);
            const z1 = rand(1, n1-1);
            const z2 = rand(1, n2-1);
            html += `<div>\\(\\frac{${z1}}{${n1}} + \\frac{${z2}}{${n2}}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:150px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Brüche multiplizieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const n1 = rand(2, 10);
            const n2 = rand(2, 10);
            const z1 = rand(1, n1-1) || 1;
            const z2 = rand(1, n2-1) || 1;
            html += `<div>\\(\\frac{${z1}}{${n1}} \\cdot \\frac{${z2}}{${n2}}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:150px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>3. Brüche dividieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const n1 = rand(2, 10);
            const n2 = rand(2, 10);
            const z1 = rand(1, n1-1) || 1;
            const z2 = rand(1, n2-1) || 1;
            html += `<div>\\(\\frac{${z1}}{${n1}} : \\frac{${z2}}{${n2}}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:150px;"></span></div>`;
        }
        html += `</div>`;
    }
    else {
        return null;
    }
    return html;
}
