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
    else if (topicId === 'math1_3_add_sub') {
        html += `<h2>1. Addition</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const n1 = rand(100, 9000);
            const n2 = rand(100, 9000);
            html += `<div>${n1} + ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Subtraktion</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const n1 = rand(1000, 9000);
            const n2 = rand(100, n1);
            html += `<div>${n1} - ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math1_4_mult_div') {
        html += `<h2>1. Multiplikation</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const n1 = rand(10, 100);
            const n2 = rand(2, 20);
            html += `<div>${n1} \\(\\cdot\\) ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Division</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<10; i++) {
            const n2 = rand(2, 20);
            const result = rand(10, 100);
            const n1 = n2 * result;
            html += `<div>${n1} : ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math1_7_gleichungen') {
        html += `<h2>1. Einfache Gleichungen (Addition/Subtraktion)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const x = rand(5, 50);
            const a = rand(5, 50);
            const isAdd = rand(0, 1) === 0;
            const v = ['x', 'y', 'a', 'z'][rand(0, 3)];
            if (isAdd) {
                const b = x + a;
                html += `<div>\\(${v} + ${a} = ${b}\\)<br><br>\\(${v} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>`;
            } else {
                const b = x - a;
                html += `<div>\\(${v} - ${a} = ${b}\\)<br><br>\\(${v} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>`;
            }
        }
        html += `</div>`;
        
        html += `<h2>2. Einfache Gleichungen (Multiplikation/Division)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const x = rand(2, 20);
            const a = rand(2, 10);
            const isMult = rand(0, 1) === 0;
            const v = ['x', 'y', 'a', 'z'][rand(0, 3)];
            if (isMult) {
                const b = x * a;
                html += `<div>\\(${a} \\cdot ${v} = ${b}\\)<br><br>\\(${v} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>`;
            } else {
                const b = x;
                html += `<div>\\(${v} : ${a} = ${b}\\)<br><br>\\(${v} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>`;
            }
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
    else if (topicId === 'math1_9_dezimalzahlen') {
        html += `<h2>1. Dezimalzahlen addieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const n1 = (rand(1, 1000) / 10).toFixed(1).replace('.', ',');
            const n2 = (rand(1, 1000) / 100).toFixed(2).replace('.', ',');
            html += `<div>${n1} + ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Dezimalzahlen subtrahieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const n1 = (rand(500, 2000) / 10).toFixed(1).replace('.', ',');
            const n2 = (rand(1, 490) / 100).toFixed(2).replace('.', ',');
            html += `<div>${n1} - ${n2} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math1_10_groessen') {
        html += `<h2>1. Längenmaße umwandeln</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const conversions = [
                {from: 'm', to: 'cm', val: rand(1, 20)},
                {from: 'cm', to: 'mm', val: rand(1, 50)},
                {from: 'km', to: 'm', val: rand(1, 10)},
                {from: 'm', to: 'dm', val: rand(1, 30)},
                {from: 'dm', to: 'cm', val: rand(1, 50)}
            ];
            const c = conversions[rand(0, 4)];
            html += `<div>${c.val} ${c.from} = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> ${c.to}</div>`;
        }
        html += `</div>`;

        html += `<h2>2. Gewichte umwandeln</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const conversions = [
                {from: 'kg', to: 'g', val: rand(1, 20)},
                {from: 'g', to: 'mg', val: rand(1, 50)},
                {from: 't', to: 'kg', val: rand(1, 10)}
            ];
            const c = conversions[rand(0, 2)];
            html += `<div>${c.val} ${c.from} = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> ${c.to}</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math1_11_figuren_koerper') {
        html += `<h2>1. Umfang und Flächeninhalt von Rechtecken</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const a = rand(2, 15);
            const b = rand(2, 15);
            html += `<div>Rechteck: a = ${a} cm, b = ${b} cm<br><br>
            U = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> cm<br>
            A = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> cm²</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math2_1_teilbarkeit') {
        html += `<h2>1. Größter gemeinsamer Teiler (ggT)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const factors = [2, 3, 5, 7];
            const ggt = factors[rand(0, 3)] * (rand(0, 1) ? factors[rand(0, 2)] : 1);
            const a = ggt * rand(2, 7);
            let b = ggt * rand(2, 7);
            while (a === b) b = ggt * rand(2, 7);
            html += `<div>ggT(${a}, ${b}) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Kleinstes gemeinsames Vielfaches (kgV)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const a = rand(2, 12);
            let b = rand(2, 12);
            while (a === b) b = rand(2, 12);
            html += `<div>kgV(${a}, ${b}) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
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
    else if (topicId === 'math2_4_relative_zahlen') {
        html += `<h2>1. Addition und Subtraktion mit negativen Zahlen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<16; i++) {
            const n1 = rand(-50, 50);
            const n2 = rand(-50, 50);
            const isAdd = rand(0, 1) === 0;
            const op = isAdd ? '+' : '-';
            const n2Str = n2 < 0 ? `(${n2})` : n2;
            html += `<div>${n1} ${op} ${n2Str} = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math2_6_prop_prozent') {
        html += `<h2>1. Prozentwert berechnen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const percentages = [5, 10, 15, 20, 25, 30, 40, 50, 75];
            const p = percentages[rand(0, percentages.length - 1)];
            const base = rand(1, 20) * 50;
            html += `<div>${p}% von ${base} = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        html += `</div>`;
        
        html += `<h2>2. Prozentsatz berechnen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const base = rand(2, 10) * 100;
            const p = rand(1, 9) * 10;
            const val = (base * p) / 100;
            html += `<div>${val} von ${base} sind <span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span> %</div>`;
        }
        html += `</div>`;
    }
    else {
        return null;
    }
    return html;
}
