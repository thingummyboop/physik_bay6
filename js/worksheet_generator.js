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
        html += `<h2>1. Bruch als Dezimalzahl schreiben</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        const decimalFractions = [
            ['3/10', ''], ['7/10', ''], ['4/100', ''], ['38/100', ''],
            ['6/1000', ''], ['125/1000', ''], ['1/2', ''], ['3/4', '']
        ];
        decimalFractions.forEach(([fraction]) => {
            html += `<div>\\(${fraction}\\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:90px;"></span></div>`;
        });
        html += `</div>`;

        html += `<h2>2. Stellenwert und Vergleich</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        const comparePairs = [['0,7', '0,65'], ['3,04', '3,4'], ['5,2', '5,19'], ['0,09', '0,9'], ['2,50', '2,5'], ['1,005', '1,05']];
        comparePairs.forEach(([a, b]) => {
            html += `<div>${a} <span style="display:inline-block; border:1px solid #000; width:24px; height:24px;"></span> ${b}</div>`;
        });
        html += `</div>`;

        html += `<h2>3. Runden</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        const roundTasks = [['4,73', 'Ganze'], ['8,24', 'Zehntel'], ['8,25', 'Zehntel'], ['12,486', 'Hundertstel'], ['6,347', 'Zehntel'], ['0,996', 'Hundertstel']];
        roundTasks.forEach(([num, place]) => {
            html += `<div>Runde ${num} auf ${place}: <span style="display:inline-block; border-bottom:1px dotted #000; width:90px;"></span></div>`;
        });
        html += `</div>`;

        html += `<h2>4. Addieren und subtrahieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        const calcTasks = [['1,50 + 1,20'], ['4,35 + 2,70'], ['8,00 - 3,47'], ['12,6 + 0,45'], ['5,3 - 1,75'], ['9,8 - 4,9'], ['2,35 + 0,90'], ['10,00 - 6,85']];
        calcTasks.forEach(([task]) => {
            html += `<div>${task} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        });
        html += `</div>`;

        html += `<h2>5. Dezimalzahlen multiplizieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        const multiplyTasks = [
            ['2,4 &middot; 3'], ['1,5 &middot; 4'], ['0,3 &middot; 0,2'], ['2,5 &middot; 0,4'],
            ['0,25 &middot; 4'], ['1,2 &middot; 0,3'], ['4,8 &middot; 2,1'], ['3 &middot; 1,20 €']
        ];
        multiplyTasks.forEach(([task]) => {
            html += `<div>${task} = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>`;
        });
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
    else if (topicId === 'math3_1_rationale_zahlen') {
        html += `<h2>1. Multiplikation und Division rationaler Zahlen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const n1 = rand(-20, 20);
            const n2 = rand(-20, 20);
            const isMult = rand(0, 1) === 0;
            if (isMult) {
                html += `<div>\\( ${n1} \\cdot ${n2 < 0 ? `(${n2})` : n2} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
            } else {
                const divisor = n2 === 0 ? 2 : n2;
                const dividend = n1 * divisor;
                html += `<div>\\( ${dividend} : ${divisor < 0 ? `(${divisor})` : divisor} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
            }
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_2_potenzen_terme') {
        html += `<h2>1. Potenzen berechnen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const base = rand(2, 10);
            const exp = rand(2, 4);
            html += `<div>\\( ${base}^${exp} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_3_gleichungen') {
        html += `<h2>1. Lineare Gleichungen lösen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const a = rand(2, 9);
            const b = rand(1, 20);
            const x = rand(1, 10);
            const c = a * x + b;
            html += `<div>\\( ${a}x + ${b} = ${c} \\)<br><br>\\( x = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_4_flaechensatz') {
        html += `<h2>1. Flächeninhalt berechnen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const isTriangle = rand(0, 1) === 0;
            const g = rand(4, 20);
            const h = rand(3, 15);
            if (isTriangle) {
                html += `<div>Dreieck: g = ${g} cm, h = ${h} cm<br><br>\\( A = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> cm²</div>`;
            } else {
                html += `<div>Parallelogramm: g = ${g} cm, h = ${h} cm<br><br>\\( A = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> cm²</div>`;
            }
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_5_verhaeltnisse') {
        html += `<h2>1. Verhältnisse kürzen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const factor = rand(2, 6);
            const a = rand(2, 9);
            const b = rand(2, 9);
            html += `<div>Kürze das Verhältnis \\( ${a * factor} : ${b * factor} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_6_zuordnungen') {
        html += `<h2>1. Proportionale Zuordnungen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const price = rand(2, 10);
            const amount1 = rand(2, 5);
            const amount2 = rand(6, 12);
            html += `<div>Wenn ${amount1} Stück ${amount1 * price} € kosten,<br>wie viel kosten ${amount2} Stück?<br><br><span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> €</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_7_aehnlichkeit') {
        html += `<h2>1. Strahlensätze</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const a = rand(2, 6);
            const b = rand(2, 6);
            const factor = rand(2, 4);
            html += `<div>Gegeben: \\( a = ${a} \\), \\( a' = ${a * factor} \\), \\( b = ${b} \\)<br><br>\\( b' = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_8_pythagoras') {
        html += `<h2>1. Satz des Pythagoras anwenden</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];
            const [a, b, c] = triples[rand(0, triples.length - 1)];
            const isHypotenuse = rand(0, 1) === 0;
            if (isHypotenuse) {
                html += `<div>Rechtwinkliges Dreieck: a = ${a}, b = ${b}<br><br>\\( c = \\sqrt{a^2 + b^2} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
            } else {
                html += `<div>Rechtwinkliges Dreieck: a = ${a}, c = ${c}<br><br>\\( b = \\sqrt{c^2 - a^2} = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
            }
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_9_koerper') {
        html += `<h2>1. Volumen von Prismen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const G = rand(10, 50);
            const h = rand(5, 20);
            html += `<div>Prisma: Grundfläche G = ${G} cm², Höhe h = ${h} cm<br><br>\\( V = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> cm³</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_10_prozent_zins') {
        html += `<h2>1. Zinsrechnung</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const K = rand(1, 20) * 1000;
            const p = rand(1, 5);
            html += `<div>Kapital K = ${K} €, Zinssatz p = ${p}%<br><br>Jahreszinsen Z = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> €</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math3_11_statistik') {
        html += `<h2>1. Mittelwert berechnen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const a = rand(1, 10);
            const b = rand(1, 10);
            const c = rand(1, 10);
            const d = rand(1, 10);
            html += `<div>Daten: ${a}, ${b}, ${c}, ${d}<br><br>Mittelwert = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_1_reelle_zahlen') {
        html += `<h2>1. Rechnen mit Wurzeln</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
            const sq1 = squares[rand(0, squares.length - 1)];
            const sq2 = squares[rand(0, squares.length - 1)];
            html += `<div>\\( \\sqrt{${sq1}} + \\sqrt{${sq2}} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_2_pythagoras') {
        html += `<h2>1. Pythagoras im Raum</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const a = rand(2, 6);
            const b = rand(2, 6);
            const c = rand(2, 6);
            html += `<div>Quader: a = ${a}, b = ${b}, c = ${c}<br><br>Raumdiagonale d = \\( \\sqrt{a^2+b^2+c^2} \\) &approx; <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_3_terme_gleichungen') {
        html += `<h2>1. Binomische Formeln</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<8; i++) {
            const a = rand(2, 6);
            const formel = rand(1, 3);
            if (formel === 1) {
                html += `<div>\\( (x + ${a})^2 \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:120px;"></span></div>`;
            } else if (formel === 2) {
                html += `<div>\\( (x - ${a})^2 \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:120px;"></span></div>`;
            } else {
                html += `<div>\\( (x + ${a})(x - ${a}) \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:120px;"></span></div>`;
            }
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_4_funktionen_sys') {
        html += `<h2>1. Lineare Gleichungssysteme</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const x = rand(1, 5);
            const y = rand(1, 5);
            const a = rand(1, 3);
            const b = rand(1, 3);
            const res1 = a * x + b * y;
            const res2 = x - y;
            html += `<div>I: \\( ${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y = ${res1} \\)<br>II: \\( x - y = ${res2} \\)<br><br>x = <span style="display:inline-block; border-bottom:1px dotted #000; width:40px;"></span>, y = <span style="display:inline-block; border-bottom:1px dotted #000; width:40px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_5_aehnlichkeit') {
        html += `<h2>1. Ähnliche Figuren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const k = rand(2, 5);
            const a = rand(2, 10);
            html += `<div>Quadrat A, Seitenlänge a = ${a}<br>Quadrat B mit Streckungsfaktor k = ${k}<br><br>Flächeninhalt von B = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_6_koerper') {
        html += `<h2>1. Zylinder und Kegel</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const r = rand(2, 10);
            const h = rand(5, 15);
            const isZylinder = rand(0, 1) === 0;
            if (isZylinder) {
                html += `<div>Zylinder: r = ${r}, h = ${h}<br>\\( V = \\pi \\cdot r^2 \\cdot h \\approx \\) <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
            } else {
                html += `<div>Kegel: r = ${r}, h = ${h}<br>\\( V = \\frac{1}{3} \\pi \\cdot r^2 \\cdot h \\approx \\) <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
            }
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_7_statistik') {
        html += `<h2>1. Wahrscheinlichkeit</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const total = rand(10, 50);
            const favorable = rand(1, total - 1);
            html += `<div>Urne: ${total} Kugeln, davon ${favorable} rot.<br>Wahrscheinlichkeit für rot = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> %</div>`;
        }
        html += `</div>`;
    }
    else if (topicId === 'math4_8_finanzmathematik') {
        html += `<h2>1. Zinseszins</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        for(let i=0; i<6; i++) {
            const K0 = rand(1, 10) * 1000;
            const p = rand(1, 5);
            const n = rand(2, 5);
            html += `<div>K0 = ${K0} €, p = ${p} %, n = ${n} Jahre<br>\\( K_n = K_0 \\cdot (1 + \\frac{p}{100})^n \\approx \\) <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> €</div>`;
        }
        html += `</div>`;
    }
        else if (topicId === 'math1_1_vs_wissen') {
        html += '<h2>1. Kopfrechnen (Plus & Minus bis 100)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<10; i++) {
            const n1 = rand(10, 80);
            const n2 = rand(5, 90 - n1);
            html += '<div>' + n1 + ' + ' + n2 + ' = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>';
        }
        for(let i=0; i<10; i++) {
            const n1 = rand(30, 100);
            const n2 = rand(5, n1);
            html += '<div>' + n1 + ' - ' + n2 + ' = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>';
        }
        html += '</div>';
    }
    else if (topicId === 'math1_5_geo_grundbegriffe') {
        html += '<h2>1. Zeichnen & Benennen</h2><div style="font-size: 1.2em; line-height: 2;">';
        html += '<p>1. Zeichne eine <strong>Gerade g</strong> und eine <strong>Gerade h</strong>, die zueinander <strong>parallel</strong> sind.</p><div style="height: 100px;"></div>';
        html += '<p>2. Zeichne eine <strong>Strecke AB</strong> mit der Länge <strong>6 cm</strong>.</p><div style="height: 100px;"></div>';
        html += '<p>3. Zeichne einen <strong>Strahl s</strong>, der im Punkt P beginnt.</p><div style="height: 100px;"></div>';
        html += '<p>4. Zeichne zwei Geraden, die <strong>normal (senkrecht)</strong> aufeinander stehen.</p><div style="height: 100px;"></div>';
        html += '</div>';
    }
    else if (topicId === 'math1_6_winkel') {
        html += '<h2>1. Winkel zeichnen</h2><div style="font-size: 1.2em; line-height: 2;">';
        const angles = [30, 45, 60, 90, 120, 150];
        angles.forEach((a, i) => {
            html += '<p>' + (i+1) + '. Zeichne einen Winkel von <strong>' + a + '°</strong> (Alpha = ' + a + '°).</p><div style="height: 120px;"></div>';
        });
        html += '</div>';
    }
    else if (topicId === 'math2_3_dezimalzahlen') {
        html += '<h2>1. Dezimalzahlen multiplizieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<8; i++) {
            const n1 = (rand(10, 500) / 10).toFixed(1).replace('.', ',');
            const n2 = (rand(2, 20) / 10).toFixed(1).replace('.', ',');
            html += '<div>' + n1 + ' \\(\\cdot\\) ' + n2 + ' = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>';
        }
        html += '</div>';
        
        html += '<h2>2. Dezimalzahlen dividieren</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<8; i++) {
            const result = rand(2, 50);
            const n2 = (rand(2, 10) / 10).toFixed(1);
            const n1 = (result * parseFloat(n2)).toFixed(2).replace('.', ',');
            const n2Str = n2.replace('.', ',');
            html += '<div>' + n1 + ' : ' + n2Str + ' = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div>';
        }
        html += '</div>';
    }
    else if (topicId === 'math2_5_var_gleichungen') {
        html += '<h2>1. Gleichungen lösen (Nach x auflösen)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<12; i++) {
            const x = rand(2, 20);
            const a = rand(2, 9);
            const b = rand(1, 20);
            const res = a * x + b;
            html += '<div>\\( ' + a + 'x + ' + b + ' = ' + res + ' \\)<br><br>\\( x = \\) <span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>';
        }
        html += '</div>';
    }
    else if (topicId === 'math2_7_geometrie') {
        html += '<h2>1. Flächeninhalt (Dreieck & Parallelogramm)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<5; i++) {
            const g = rand(4, 20);
            const h = rand(3, 15);
            html += '<div><strong>Dreieck:</strong> g = ' + g + ' cm, h = ' + h + ' cm<br><br>A = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> cm²</div>';
        }
        for(let i=0; i<5; i++) {
            const a = rand(4, 20);
            const h = rand(3, 15);
            html += '<div><strong>Parallelogramm:</strong> a = ' + a + ' cm, h = ' + h + ' cm<br><br>A = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> cm²</div>';
        }
        html += '</div>';
    }
    else if (topicId === 'math2_8_statistik') {
        html += '<h2>1. Mittelwert (Durchschnitt) berechnen</h2><div style="font-size: 1.2em; line-height: 2;">';
        for(let i=0; i<5; i++) {
            const nums = Array.from({length: rand(4, 6)}, () => rand(1, 20));
            html += '<p>Berechne den Mittelwert der Zahlen: <strong>' + nums.join(', ') + '</strong></p><div>Mittelwert = <span style="display:inline-block; border-bottom:1px dotted #000; width:100px;"></span></div><br>';
        }
        html += '</div>';
    }
    else if (topicId === 'elektrizitaet') {
        html += '<h2>1. Das Ohmsche Gesetz (U = R \\(\\cdot\\) I)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<5; i++) {
            const R = rand(10, 100);
            const I = rand(1, 10);
            html += '<div>Geg: R = ' + R + ' \\(\\Omega\\), I = ' + I + ' A<br><br>Ges: U = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> V</div>';
        }
        for(let i=0; i<5; i++) {
            const R = rand(10, 50);
            const U = R * rand(2, 12);
            html += '<div>Geg: U = ' + U + ' V, R = ' + R + ' \\(\\Omega\\)<br><br>Ges: I = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> A</div>';
        }
        html += '</div>';
    }
    else if (topicId === 'kraft_und_bewegung') {
        html += '<h2>1. Geschwindigkeit (v = s : t)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<5; i++) {
            const v = rand(10, 130);
            const t = rand(2, 10);
            const s = v * t;
            html += '<div>Ein Auto fährt in ' + t + ' Stunden genau ' + s + ' km weit.<br><br>v = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> km/h</div>';
        }
        html += '</div>';
        html += '<h2>2. Kraft (F = m \\(\\cdot\\) a)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<5; i++) {
            const m = rand(5, 50);
            const a = rand(2, 10);
            html += '<div>Masse m = ' + m + ' kg, Beschleunigung a = ' + a + ' m/s²<br><br>Kraft F = <span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span> N</div>';
        }
        html += '</div>';
    }
    else if (topicId === 'arbeit') {
        html += '<h2>1. Mechanische Arbeit (W = F \\(\\cdot\\) s)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<8; i++) {
            const F = rand(50, 500);
            const s = rand(2, 20);
            html += '<div>Du ziehst einen Wagen mit F = ' + F + ' N über eine Strecke von s = ' + s + ' m.<br><br>Arbeit W = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> J (Joule)</div>';
        }
        html += '</div>';
    }
    else if (topicId === 'energie') {
        html += '<h2>1. Lageenergie (E = m \\(\\cdot\\) g \\(\\cdot\\) h)</h2><p><em>Hinweis: Rechne mit g = 10 m/s²</em></p><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        for(let i=0; i<8; i++) {
            const m = rand(10, 100);
            const h = rand(5, 50);
            html += '<div>Masse m = ' + m + ' kg, Höhe h = ' + h + ' m<br><br>E_pot = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span> J</div>';
        }
        html += '</div>';
    }
    else {
        return null;
    }
    return html;
}
