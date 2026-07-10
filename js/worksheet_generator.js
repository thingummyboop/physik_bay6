// js/worksheet_generator.js

function generateWorksheetContent(topicId, topicTitle) {
    let html = '';
    
    // Helper function for random numbers
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const blank = (width = 95) => `<span style="display:inline-block; border-bottom:1px dotted #000; width:${width}px;"></span>`;
    const signBox = () => `<span style="display:inline-block; border:1px solid #000; width:24px; height:24px; text-align:center;"></span>`;
    const grid = (items, columns = '1fr 1fr') => `<div style="display: grid; grid-template-columns: ${columns}; gap: 18px 24px; font-size: 1.15em;">${items.join('')}</div>`;
    const item = (text) => `<div class="exercise-item">${text}</div>`;
    const frac = (z, n) => `\\(\\frac{${z}}{${n}}\\)`;
    const section = (title, items, columns = '1fr 1fr') => {
        html += `<h2>${title}</h2>${grid(items, columns)}`;
    };

    if (topicId === 'math1_8_brueche') {
        section('1. Brüche darstellen und erkennen', [
            item(`Zeichne ein Rechteck mit 2 gleich großen Teilen. Färbe ${frac(1, 2)}.`),
            item(`Zeichne ein Rechteck mit 4 gleich großen Teilen. Färbe ${frac(3, 4)}.`),
            item(`Zeichne einen Kreis mit 3 gleich großen Teilen. Färbe ${frac(1, 3)}.`),
            item(`Zeichne eine Schokotafel mit 10 Feldern. Färbe ${frac(7, 10)}.`),
            item(`Ein Streifen hat 8 gleiche Teile, 5 sind gefärbt. Bruch: ${blank(70)}`),
            item(`Ein Kreis hat 6 gleiche Teile, 2 sind gefärbt. Bruch: ${blank(70)}`),
            item(`Ein Rechteck hat 12 gleiche Felder, 9 sind gefärbt. Bruch: ${blank(70)}`),
            item(`Markiere ${frac(1, 4)} auf einem Zahlenstrahl von 0 bis 1: ${blank(180)}`),
            item(`Markiere ${frac(3, 4)} auf einem Zahlenstrahl von 0 bis 1: ${blank(180)}`),
            item(`Schreibe in Worten: ${frac(5, 8)} = ${blank(150)}`)
        ]);

        const comparePairs = [[3, 8, 5, 8], [7, 10, 4, 10], [1, 3, 1, 5], [1, 6, 1, 4], [2, 9, 7, 9], [5, 12, 5, 8], [3, 4, 2, 4], [1, 2, 1, 8], [6, 7, 3, 7], [2, 5, 2, 9]];
        section('2. Brüche vergleichen und ordnen', [
            ...comparePairs.map(([a, b, c, d]) => item(`${frac(a, b)} ${signBox()} ${frac(c, d)}`)),
            item(`Ordne von klein nach groß: ${frac(1, 6)}, ${frac(1, 2)}, ${frac(1, 4)} ${blank(170)}`),
            item(`Ordne von klein nach groß: ${frac(5, 9)}, ${frac(2, 9)}, ${frac(7, 9)} ${blank(170)}`),
            item(`Ordne von groß nach klein: ${frac(3, 5)}, ${frac(1, 5)}, ${frac(4, 5)} ${blank(170)}`),
            item(`Erkläre mit einem Satz: Warum ist ${frac(1, 3)} größer als ${frac(1, 8)}? ${blank(220)}`)
        ]);

        section('3. Brucharten und gemischte Zahlen', [
            item(`Kreuze an: ${frac(3, 5)} ist echt / unecht / uneigentlich.`),
            item(`Kreuze an: ${frac(7, 4)} ist echt / unecht / uneigentlich.`),
            item(`Kreuze an: ${frac(8, 4)} ist echt / unecht / uneigentlich.`),
            item(`${frac(7, 3)} = ${blank(70)} als gemischte Zahl`),
            item(`${frac(11, 4)} = ${blank(70)} als gemischte Zahl`),
            item(`${frac(17, 5)} = ${blank(70)} als gemischte Zahl`),
            item(`\\(2\\frac{1}{3}\\) = ${blank(70)} als unechter Bruch`),
            item(`\\(3\\frac{2}{5}\\) = ${blank(70)} als unechter Bruch`),
            item(`\\(1\\frac{3}{4}\\) = ${blank(70)} als unechter Bruch`),
            item(`Finde einen echten Bruch mit Nenner 9: ${blank(70)}`),
            item(`Finde einen unechten Bruch mit Nenner 6: ${blank(70)}`),
            item(`Finde einen uneigentlichen Bruch mit Nenner 5: ${blank(70)}`)
        ], '1fr 1fr 1fr');

        const addSub = [];
        for (let i = 0; i < 10; i++) {
            const n = [5, 6, 7, 8, 9, 10, 12][rand(0, 6)];
            const a = rand(1, Math.floor(n / 2));
            const b = rand(1, n - a);
            addSub.push(item(`${frac(a, n)} + ${frac(b, n)} = ${blank(80)}`));
        }
        for (let i = 0; i < 10; i++) {
            const n = [5, 6, 7, 8, 9, 10, 12][rand(0, 6)];
            const a = rand(2, n);
            const b = rand(1, a - 1);
            addSub.push(item(`${frac(a, n)} - ${frac(b, n)} = ${blank(80)}`));
        }
        addSub.push(
            item(`1 - ${frac(3, 8)} = ${blank(80)}`),
            item(`1 - ${frac(2, 5)} = ${blank(80)}`),
            item(`${frac(4, 6)} + ${frac(2, 6)} = ${blank(80)}`),
            item(`${frac(9, 12)} - ${frac(5, 12)} = ${blank(80)}`)
        );
        section('4. Gleichnamige Brüche addieren und subtrahieren', addSub);

        section('5. Bruchteile von Größen', [
            item(`${frac(1, 2)} von 60 min = ${blank(80)} min`),
            item(`${frac(3, 4)} von 20 € = ${blank(80)} €`),
            item(`${frac(1, 4)} von 100 kg = ${blank(80)} kg`),
            item(`${frac(2, 3)} von 18 Murmeln = ${blank(80)} Murmeln`),
            item(`${frac(2, 5)} von 25 m = ${blank(80)} m`),
            item(`${frac(3, 8)} von 40 Kindern = ${blank(80)} Kinder`),
            item(`Eine Stunde hat 60 min. Wie viele Minuten sind ${frac(5, 6)} Stunde? ${blank(90)}`),
            item(`Ein Rezept braucht ${frac(3, 4)} l Milch. Wie viele ml sind das? ${blank(90)}`),
            item(`24 € werden gleich auf 6 Teile geteilt. Wie viel ist ${frac(5, 6)} davon? ${blank(90)}`),
            item(`Schreibe einen Antwortsatz: ${frac(1, 3)} von 21 Schüler:innen sind ${blank(120)}`)
        ]);

        section('6. Brüche vervielfachen und aufteilen', [
            item(`3 \\(\\cdot\\) ${frac(1, 5)} = ${blank(80)}`),
            item(`4 \\(\\cdot\\) ${frac(2, 9)} = ${blank(80)}`),
            item(`2 \\(\\cdot\\) ${frac(3, 8)} = ${blank(80)}`),
            item(`5 \\(\\cdot\\) ${frac(1, 4)} = ${blank(80)}`),
            item(`${frac(2, 7)} + ${frac(2, 7)} + ${frac(2, 7)} = ${blank(80)}`),
            item(`Schreibe als Malrechnung: ${frac(3, 10)} + ${frac(3, 10)} + ${frac(3, 10)} ${blank(100)}`),
            item(`2 Pizzen werden fair auf 4 Kinder verteilt. Jedes Kind bekommt ${blank(80)} Pizza.`),
            item(`3 Tafeln werden fair auf 6 Kinder verteilt. Jedes Kind bekommt ${blank(80)} Tafel.`)
        ]);

        section('7. Brüche im Alltag und als Division', [
            item(`${frac(3, 4)} Stunde = ${blank(80)} Minuten`),
            item(`${frac(1, 2)} € = ${blank(80)} Cent`),
            item(`${frac(3, 4)} kg = ${blank(80)} g`),
            item(`${frac(1, 4)} l = ${blank(80)} ml`),
            item(`Schreibe als Division: ${frac(5, 8)} = ${blank(90)}`),
            item(`Schreibe als Bruch: 3 : 4 = ${blank(90)}`),
            item(`5 Kinder teilen 2 Kuchen fair. Jedes Kind bekommt ${blank(90)} Kuchen.`),
            item(`Erkläre mit einem Satz: Warum gehört bei Sachaufgaben eine Einheit zur Antwort? ${blank(220)}`)
        ]);

        return html;
    }

    if (topicId === 'math1_9_dezimalzahlen') {
        section('1. Preise und Dezimalzahlen lesen', [
            item(`Schreibe in Euro: 35 Cent = ${blank(90)}`),
            item(`Schreibe in Euro: 7 Cent = ${blank(90)}`),
            item(`Schreibe in Cent: 2,45 € = ${blank(90)}`),
            item(`Schreibe in Worten: 3,75 € = ${blank(180)}`),
            item(`Was ist billiger? 1,29 € ${signBox()} 1,35 €`),
            item(`Was ist billiger? 0,95 € ${signBox()} 1,05 €`),
            item(`Aktion 2+1 gratis: Ein Heft kostet 1,20 €. Was zahlst du für 3 Hefte? ${blank(90)}`),
            item(`Schreibe eine passende Alltagssituation zu 0,75: ${blank(220)}`)
        ]);

        section('2. Stellenwerttafel', [
            item(`Welche Stelle hat die 7 in 4,73? ${blank(100)}`),
            item(`Welche Stelle hat die 3 in 4,73? ${blank(100)}`),
            item(`Schreibe als Dezimalzahl: 6 Zehntel = ${blank(80)}`),
            item(`Schreibe als Dezimalzahl: 6 Hundertstel = ${blank(80)}`),
            item(`Schreibe als Dezimalzahl: 125 Tausendstel = ${blank(80)}`),
            item(`3,4 \\(\\cdot\\) 10 = ${blank(80)}`),
            item(`56,2 : 10 = ${blank(80)}`),
            item(`0,48 \\(\\cdot\\) 100 = ${blank(80)}`),
            item(`17,5 : 100 = ${blank(80)}`),
            item(`Erkläre: Warum ist 0,06 nicht dasselbe wie 0,6? ${blank(220)}`)
        ]);

        const decimalCompare = [['0,7', '0,65'], ['3,04', '3,4'], ['5,2', '5,19'], ['0,09', '0,9'], ['2,50', '2,5'], ['1,005', '1,05'], ['8,08', '8,8'], ['12,30', '12,3'], ['0,505', '0,55'], ['4,099', '4,1']];
        section('3. Vergleichen und ordnen', [
            ...decimalCompare.map(([a, b]) => item(`${a} ${signBox()} ${b}`)),
            item(`Ordne von klein nach groß: 0,08; 0,2; 0,35 ${blank(170)}`),
            item(`Ordne von klein nach groß: 4,4; 4,04; 4,40; 4,004 ${blank(210)}`),
            item(`Ordne Laufzeiten von schnell nach langsam: 12,8 s; 12,08 s; 13,1 s ${blank(210)}`),
            item(`Ergänze eine Null ohne den Wert zu ändern: 6,5 = ${blank(80)}`)
        ]);

        const rounds = [['4,73', 'Ganze'], ['8,24', 'Zehntel'], ['8,25', 'Zehntel'], ['12,486', 'Hundertstel'], ['6,347', 'Zehntel'], ['0,996', 'Hundertstel'], ['19,95', 'Ganze'], ['3,141', 'Hundertstel'], ['7,05', 'Zehntel'], ['0,444', 'Hundertstel'], ['25,499', 'Ganze'], ['5,555', 'Zehntel']];
        section('4. Runden', rounds.map(([num, place]) => item(`Runde ${num} auf ${place}: ${blank(90)}`)));

        section('5. Dezimalzahlen und Brüche umwandeln', [
            item(`${frac(3, 10)} = ${blank(90)}`),
            item(`${frac(7, 10)} = ${blank(90)}`),
            item(`${frac(4, 100)} = ${blank(90)}`),
            item(`${frac(38, 100)} = ${blank(90)}`),
            item(`${frac(6, 1000)} = ${blank(90)}`),
            item(`${frac(125, 1000)} = ${blank(90)}`),
            item(`${frac(1, 2)} = ${blank(90)}`),
            item(`${frac(3, 4)} = ${blank(90)}`),
            item(`0,4 = ${blank(90)} als Bruch`),
            item(`0,07 = ${blank(90)} als Bruch`),
            item(`2,35 = ${blank(90)} als gemischte Zahl`),
            item(`0,125 = ${blank(90)} als Bruch`)
        ]);

        const addSubDec = ['1,50 + 1,20', '4,35 + 2,70', '8,00 - 3,47', '12,6 + 0,45', '5,3 - 1,75', '9,8 - 4,9', '2,35 + 0,90', '10,00 - 6,85', '14,25 + 3,8', '7,04 - 2,9', '0,75 + 0,125', '20 - 4,65', '3,09 + 12,7', '15,5 - 8,75'];
        section('6. Addieren und subtrahieren', addSubDec.map((task) => item(`${task} = ${blank(110)}`)));

        const multDec = ['2,4 &middot; 3', '1,5 &middot; 4', '0,3 &middot; 0,2', '2,5 &middot; 0,4', '0,25 &middot; 4', '1,2 &middot; 0,3', '4,8 &middot; 2,1', '3 &middot; 1,20 &euro;', '0,6 &middot; 0,7', '12,5 &middot; 0,8', '2,05 &middot; 6', '0,04 &middot; 9'];
        section('7. Dezimalzahlen multiplizieren', multDec.map((task) => item(`${task} = ${blank(110)}`)));

        const divDec = ['6,4 : 2', '4,5 : 5', '3,6 : 4', '7,2 : 10', '3,5 : 100', '9,6 : 3', '12,8 : 4', '2,40 &euro; : 4', '0,75 : 3', '15,0 : 6'];
        section('8. Dezimalzahlen dividieren', divDec.map((task) => item(`${task} = ${blank(110)}`)));

        section('9. Gemischte Sachaufgaben', [
            item(`Ein Apfel kostet 0,40 €. Was kosten 6 Äpfel? ${blank(100)}`),
            item(`Du hast 10,00 € und zahlst 3,75 €. Wie viel bleibt? ${blank(100)}`),
            item(`Ein Stoffband ist 2,5 m lang. Du brauchst 0,75 m. Wie viel bleibt? ${blank(100)}`),
            item(`4 gleiche Hefte kosten zusammen 6,80 €. Was kostet ein Heft? ${blank(100)}`),
            item(`Ein Getränk kostet 1,35 €. Ein Weckerl kostet 2,20 €. Was kostet beides? ${blank(100)}`),
            item(`Berechne mit richtiger Reihenfolge: 2 + 3 &middot; 4 = ${blank(80)}`),
            item(`Berechne mit richtiger Reihenfolge: (2 + 3) &middot; 4 = ${blank(80)}`),
            item(`Schreibe zu einer Rechnung einen Antwortsatz: 6 &middot; 0,40 € = 2,40 € ${blank(220)}`)
        ]);

        return html;
    }

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
