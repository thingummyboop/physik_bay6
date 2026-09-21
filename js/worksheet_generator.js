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
        const tasks=[],solutions=[];
        function add(kind,a,b,prompt,answer,reason){const nr=tasks.length+1;tasks.push('<div class="exercise-item" data-natural-generated="'+kind+'" data-first="'+a+'" data-second="'+b+'"><strong>A'+nr+'.</strong> '+prompt+' '+blank(90)+'</div>');solutions.push('<p data-natural-answer="'+answer+'"><strong>A'+nr+'.</strong> '+reason+'</p>');}
        for(let i=0;i<4;i++){const n=rand(1000,99999),p=[10,100,1000][i%3],place=p===10?'Zehner':p===100?'Hunderter':'Tausender',answer=Math.round(n/p)*p;add('round',n,p,'Runde '+n+' direkt auf '+place+':',answer,n+' ≈ '+answer+' (auf '+place+').');}
        for(let i=0;i<2;i++){const a=rand(1000,9999),b=rand(0,5)>4?a:a+rand(-50,50),answer=a<b?'&lt;':a>b?'&gt;':'=';add('compare',a,b,'Setze &lt;, &gt; oder = ein: '+a+' … '+b,answer,a+' '+answer+' '+b+'.');}
        for(let i=0;i<2;i++){let a=rand(1000,9000),b=rand(100,4000);if(i===1&&a<b)[a,b]=[b,a];const sign=i===0?'+':'−',answer=i===0?a+b:a-b;add(i===0?'add':'subtract',a,b,a+' '+sign+' '+b+' =',answer,a+' '+sign+' '+b+' = '+answer+'.');}
        const banks=[[[14,'XIV','10 + 4'],[19,'XIX','10 + 9'],[24,'XXIV','20 + 4']],[[49,'XLIX','40 + 9'],[94,'XCIV','90 + 4'],[99,'XCIX','90 + 9']],[[444,'CDXLIV','400 + 40 + 4'],[944,'CMXLIV','900 + 40 + 4'],[1492,'MCDXCII','1000 + 400 + 90 + 2']],[[1848,'MDCCCXLVIII','1000 + 500 + 300 + 40 + 8'],[1999,'MCMXCIX','1000 + 900 + 90 + 9'],[2026,'MMXXVI','2000 + 20 + 6']]];
        for(const bank of banks){const [n,roman,groups]=bank[rand(0,bank.length-1)];add('roman',n,roman,'Lies '+roman+' und notiere auch die Summe der Gruppen:',n,roman+' = '+groups+' = '+n+'.');}
        html+='<h2>Zusätzliche Aufgaben</h2><p>A1–A4: Runden. A5–A6: Vergleichen. A7–A8: Rechnen. A9–A12: Römische Zahlen lesen.</p>'+grid(tasks,'1fr')+'<template data-generated-worksheet-solutions>'+solutions.join('')+'</template>';
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
        const tasks=[],solutions=[],gcd=(a,b)=>{while(b){const r=a%b;a=b;b=r;}return a;};
        for(let i=0;i<12;i++){
            const kind=['add','subtract','multiply','divide'][Math.floor(i/3)],b=rand(2,8),d=rand(2,8);let a=rand(1,b),c=rand(1,d),bb=b,dd=d;
            if(kind==='subtract'&&a*dd<c*bb)[a,bb,c,dd]=[c,dd,a,bb];
            const numerator=kind==='add'?a*dd+c*bb:kind==='subtract'?a*dd-c*bb:kind==='multiply'?a*c:a*dd,denominator=kind==='divide'?bb*c:bb*dd,g=gcd(numerator,denominator),answer=(numerator/g)+'/'+(denominator/g),op={add:'+',subtract:'−',multiply:'·',divide:':'}[kind],expression=a+'/'+bb+' '+op+' '+c+'/'+dd;
            let reason;if(kind==='add'||kind==='subtract')reason=(a*dd)+'/'+(bb*dd)+' '+op+' '+(c*bb)+'/'+(bb*dd);else if(kind==='multiply')reason='('+a+' · '+c+')/('+bb+' · '+dd+')';else reason=a+'/'+bb+' · '+dd+'/'+c;
            tasks.push('<div class="exercise-item" data-fraction-generated="'+kind+'" data-a="'+a+'" data-b="'+bb+'" data-c="'+c+'" data-d="'+dd+'"><strong>A'+(i+1)+'.</strong> '+expression+' = '+blank(100)+'</div>');
            solutions.push('<p data-fraction-answer="'+answer+'"><strong>A'+(i+1)+'.</strong> '+expression+' = '+reason+' = '+answer+'.</p>');
        }
        html+='<h2>Zusätzliche Bruchrechnungen</h2><p>Schätze zuerst ab. Rechne mit Zwischenschritten und kürze vollständig. A1–A3: Addition, A4–A6: Subtraktion, A7–A9: Multiplikation, A10–A12: Division.</p>'+grid(tasks,'1fr')+'<template data-generated-worksheet-solutions>'+solutions.join('')+'</template>';
    }
    else if (topicId === 'math2_4_relative_zahlen') {
        const tasks=[],solutions=[],gcd=(a,b)=>{while(b){const r=a%b;a=b;b=r;}return a;};
        function add(kind,a,b,c,d,prompt,result,explanation){const nr=tasks.length+1;tasks.push('<div class="exercise-item" data-number-range-generated="'+kind+'" data-a="'+a+'" data-b="'+b+'" data-c="'+c+'" data-d="'+d+'"><strong>A'+nr+'.</strong> '+prompt+' '+blank(120)+'</div>');solutions.push('<p data-number-range-answer="'+result+'"><strong>A'+nr+'.</strong> '+explanation+'</p>');}
        for(let i=0;i<4;i++){const a=rand(-20,20),n=rand(0,10),plus=i%2===0,result=a+(plus?n:-n);add(plus?'add':'subtract',a,n,0,0,'Rechne '+a+(plus?' + ':' − ')+n+' und beschreibe die Bewegung:',result,a+(plus?' + ':' − ')+n+' = '+result+'. '+n+' Schritte nach '+(plus?'rechts':'links')+'.');}
        for(let i=0;i<2;i++){const a=rand(-10,10);add('neighbors',a,0,0,0,'Nenne den unmittelbaren Vorgänger und Nachfolger von '+a+' in den ganzen Zahlen:',(a-1)+';'+(a+1),'Vorgänger '+(a-1)+', Nachfolger '+(a+1)+'. Jeweils eine Einheit Abstand.');}
        for(let i=0;i<4;i++){const b=[2,3,4,5,10][rand(0,4)],a=rand(0,b),c=a+rand(1,3),g=gcd(a+c,2*b),n=(a+c)/g,d=2*b/g;add('between',a,b,c,b,'Finde eine Bruchzahl strikt zwischen '+a+'/'+b+' und '+c+'/'+b+':',n+'/'+d,'Mögliche Antwort: ('+a+'/'+b+' + '+c+'/'+b+') : 2 = '+n+'/'+d+'. Auch andere echte Zwischenwerte sind richtig.');}
        for(let i=0;i<2;i++){const a=rand(1,9),b=rand(2,10),factor=rand(2,5),g=gcd(a,b),n=a/g,d=b/g;add('equivalent',a*factor,b*factor,0,0,'Kürze '+(a*factor)+'/'+(b*factor)+' vollständig. Ändert sich der Punkt auf der Zahlengeraden?',n+'/'+d,(a*factor)+'/'+(b*factor)+' = '+n+'/'+d+'. Der Zahlenwert und damit der Punkt bleiben gleich.');}
        html+='<h2>Zusätzliche Aufgaben zu Zahlen und Bereichen</h2><p>A1–A4: Bewegungen. A5–A6: Nachbarn in den ganzen Zahlen. A7–A10: Bruchwerte dazwischen. A11–A12: gleiche Werte.</p>'+grid(tasks,'1fr')+'<template data-generated-worksheet-solutions>'+solutions.join('')+'</template>';
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
        let generatedSolutions = '';
        for(let i=0; i<8; i++) {
            const base = rand(2, 10) * (i % 2 ? -1 : 1);
            const exp = rand(2, 4);
            const writtenBase = base < 0 ? `(${base})` : String(base);
            html += `<div data-power-generated data-base="${base}" data-exponent="${exp}"><strong>A${i + 1}.</strong> \\( ${writtenBase}^{${exp}} \\) = <span style="display:inline-block; border-bottom:1px dotted #000; width:80px;"></span></div>`;
            generatedSolutions += `<section class="ws-generated-equation-solution" data-power-answer="${base ** exp}"><h3>Zusatzübung A${i + 1}</h3><p>${exp} gleiche Faktoren ${writtenBase}: ${Array(exp).fill(writtenBase).join(' · ')} = ${base ** exp}.</p></section>`;
        }
        html += '</div><h2>2. Zehnerpotenzen und wissenschaftliche Schreibweise</h2>';
        for(let i=0;i<4;i++) {
            const coefficient=[1.2,2.5,4.8,9.6][rand(0,3)]*(i===3?-1:1), exponent=(i%2?-1:1)*rand(2,5), decimal=Number((coefficient*10**exponent).toPrecision(12)).toLocaleString('de-AT',{useGrouping:false,maximumFractionDigits:10}), a=String(coefficient).replace('.',',');
            const expression=a+' · 10<sup>'+exponent+'</sup>', number=i+9;
            html += '<p data-sci-generated data-coefficient="'+coefficient+'" data-exponent="'+exponent+'" data-direction="'+(i<2?'decimal':'scientific')+'"><strong>A'+number+'.</strong> '+(i<2?'Schreibe '+expression+' als Dezimalzahl.':'Schreibe '+decimal+' in normierter wissenschaftlicher Schreibweise.')+' __________________</p>';
            generatedSolutions += '<section class="ws-generated-equation-solution" data-sci-answer="'+Number(decimal.replace(',','.'))+'"><h3>Zusatzübung A'+number+'</h3><p>'+expression+' = '+decimal+'. Der Faktor 10<sup>'+exponent+'</sup> bedeutet '+(exponent>0?'Multiplizieren':'Dividieren')+' mit '+(10**Math.abs(exponent)).toLocaleString('de-AT')+'.</p></section>';
        }
        html += '<template data-generated-worksheet-solutions>'+generatedSolutions+'</template>';
    }
    else if (topicId === 'math3_3_gleichungen') {
        html += `<h2>1. Lineare Gleichungen lösen</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">`;
        let generatedSolutions = '';
        for(let i=0; i<8; i++) {
            const a = rand(2, 9);
            const b = rand(1, 20);
            const c = rand(1, a - 1);
            const x = rand(-10, 10);
            const d = (a - c) * x + b;
            const right = `${c}x ${d < 0 ? '- ' + Math.abs(d) : '+ ' + d}`;
            html += `<div data-generated-equation3 data-a="${a}" data-b="${b}" data-c="${c}" data-d="${d}"><strong>A${i + 1}.</strong> \\( ${a}x + ${b} = ${right} \\)<br><br>\\( x = \\)<span style="display:inline-block; border-bottom:1px dotted #000; width:60px;"></span></div>`;
            generatedSolutions += `<section class="ws-generated-equation-solution" data-generated-answer="${x}"><h3>Zusatzübung A${i + 1}</h3><p>Auf beiden Seiten ${c}x subtrahieren: ${a - c}x + ${b} = ${d}. Dann ${b} subtrahieren: ${a - c}x = ${d - b}. Durch ${a - c} teilen: x = ${x}.</p><p>Probe: links ${a} · (${x}) + ${b} = ${a * x + b}; rechts ${c} · (${x}) + (${d}) = ${c * x + d}.</p></section>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${generatedSolutions}</template>`;
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
        html += `<h2>1. Zuordnungen berechnen und beurteilen</h2><p>Alle Angaben sind erfundene Modelle. Berechne den gesuchten Wert und entscheide: direkt proportional, indirekt proportional oder keines von beiden.</p><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">`;
        let generatedSolutions = '';
        for(let i=0; i<8; i++) {
            const kind = ['direct', 'inverse', 'neither'][i % 3], unit = rand(2, 5), x = rand(2, 6), first = rand(2, 4);
            const fixed = kind === 'inverse' ? 12 * rand(1, 3) : kind === 'neither' ? 5 * rand(1, 3) : 0;
            const answer = kind === 'inverse' ? fixed / x : unit * x + fixed;
            const shown = n => new Intl.NumberFormat('de-AT', { maximumFractionDigits:2 }).format(n);
            const task = kind === 'direct' ? `${first} gleich teure Hefte kosten ${first * unit} Euro, ohne Gebühr oder Rabatt. Was kosten ${x} Hefte?`
                : kind === 'inverse' ? `2 gleich leistungsfähige Personen brauchen ${fixed / 2} Stunden für eine feste Arbeit. Wie lange brauchen ${x} Personen im Modell ohne Wartezeiten oder Behinderung?`
                : `${fixed} Euro feste Gebühr plus ${unit} Euro je Heft. Was kostet eine Bestellung von ${x} Heften?`;
            const calculation = kind === 'direct' ? `${first * unit} : ${first} = ${unit} Euro je Heft. ${x} · ${unit} = ${answer} Euro. Direkt proportional, denn Preis : Anzahl bleibt ${unit}.`
                : kind === 'inverse' ? `2 · ${fixed / 2} = ${fixed} Personenstunden. ${fixed} : ${x} = ${shown(answer)} Stunden. Indirekt proportional, denn Personenanzahl · Zeit bleibt ${fixed}.`
                : `${fixed} + ${unit} · ${x} = ${answer} Euro. Keines von beiden: Die positive Grundgebühr verhindert konstante Quotienten; auch das Produkt aus Anzahl und Preis ist nicht konstant.`;
            html += `<div data-assignment-generated data-kind="${kind}" data-unit="${unit}" data-x="${x}" data-first="${first}" data-fixed="${fixed}"><strong>A${i + 1}.</strong> ${task}<p>Ergebnis und Art: __________________</p><p>Begründung: __________________</p></div>`;
            generatedSolutions += `<section class="ws-generated-equation-solution" data-assignment-answer="${answer}" data-kind="${kind}"><h3>Zusatzübung A${i + 1}</h3><p>${calculation}</p></section>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${generatedSolutions}</template>`;
    }
    else if (topicId === 'math3_7_aehnlichkeit') {
        html += `<h2>Zusatzübungen: entsprechende Seiten</h2><p>In jeder Aufgabe sind zwei Figuren ähnlich. Die Seite a der Ausgangsfigur entspricht a′ in der Bildfigur; b entspricht b′. Alle Längen sind in Zentimetern angegeben. Bestimme zuerst den Faktor k von der Ausgangs- zur Bildfigur und dann b′. Zeige deinen Rechenweg und prüfe, ob beide Seitenverhältnisse übereinstimmen.</p><div class="dilation-generated">`;
        let generatedSolutions = '';
        const shown = n => new Intl.NumberFormat('de-AT', {maximumFractionDigits:2}).format(n);
        for(let i=0; i<6; i++) {
            const a = rand(2, 6);
            const b = rand(2, 6);
            const factor = [0.5,1,1.5,2,3][rand(0,4)];
            html += `<div data-dilation-generated data-a="${a}" data-image-a="${a*factor}" data-b="${b}"><strong>A${i+1}.</strong> a = ${a} cm, a′ = ${shown(a*factor)} cm, b = ${b} cm.<p>k = __________; b′ = __________ cm</p><p>Rechenweg und Probe: ____________________________________</p></div>`;
            generatedSolutions += `<section class="ws-generated-equation-solution" data-dilation-generated-answer="${b*factor}"><h3>Zusatzübung A${i+1}</h3><p>k = a′ : a = ${shown(a*factor)} : ${a} = ${shown(factor)}. Damit b′ = ${shown(factor)} · ${b} cm = ${shown(b*factor)} cm. Probe: ${shown(b*factor)} : ${b} = ${shown(factor)}. Beide Seitenverhältnisse sind gleich.</p></section>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${generatedSolutions}</template>`;
    }
    else if (topicId === 'math3_8_pythagoras') {
        html += '<h2>Zusatzübungen: fehlende Dreiecksseiten</h2><p>Alle Längen sind in cm. a und b sind die Katheten, c ist die Hypotenuse. Skizziere, berechne die gesuchte Seite und prüfe durch Einsetzen.</p>';
        let solutions='';
        for(let i=0;i<6;i++){
            const triples=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]], [a,b,c]=triples[rand(0,4)],hyp=i%2===0,answer=hyp?c:b;
            html+=`<div data-pyth-generated data-kind="triangle" data-a="${a}" data-b="${b}" data-c="${c}" data-target="${hyp?'c':'b'}"><strong>A${i+1}.</strong> ${hyp?'a = '+a+' cm, b = '+b+' cm. Gesucht: c.':'a = '+a+' cm, c = '+c+' cm. Gesucht: b.'}<p>Rechenweg und Probe: __________________________________________________</p></div>`;
            solutions+=`<section class="ws-generated-equation-solution" data-pyth-generated-answer="${answer}"><h3>Zusatzübung A${i+1}</h3><p>${hyp?'c = √('+a+'² + '+b+'²)':'b = √('+c+'² − '+a+'²)'} cm = ${answer} cm. Probe: ${a}² + ${b}² = ${a*a+b*b} = ${c}².</p></section>`;
        }
        html+=`<template data-generated-worksheet-solutions>${solutions}</template>`;
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
        const money = n => new Intl.NumberFormat('de-AT', {minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
        let solutions = '';
        html += `<h2>1. Prozent und Wachstum anwenden</h2><p>Erfundene Rechenmodelle, ohne Steuern, Gebühren oder zusätzliche Zahlungen. Keine Zwischenrundung; Ergebnisse am Ende auf Cent runden. Notiere Rechenweg und Einheit.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">`;
        for(let i=0; i<8; i++) {
            const start = rand(1, 10) * 100, rate = rand(1, 5), n = rand(2, 4), kind = i % 4;
            let prompt, result, calculation;
            if(kind === 0) {result=start*(1-rate/100);prompt=`${start} Euro mit ${rate} % Rabatt: Berechne den neuen Preis.`;calculation=`${start} · (1 − ${rate}/100) = ${money(result)} Euro. Die Ersparnis wird vom alten Preis abgezogen.`;}
            else if(kind === 1) {result=start*rate/100*n/12;prompt=`Kapital ${start} Euro, ${rate} % pro Jahr. Berechne die Zinsen für ${n} Monate im einfachen Monatsmodell.`;calculation=`${start} · ${rate}/100 · ${n}/12 ${Math.abs(result-Math.round(result*100)/100)>1e-8?'≈':'='} ${money(result)} Euro Zinsen. Der Jahresbetrag wird zeitanteilig verkleinert.`;}
            else if(kind === 2) {result=start+n*rate;prompt=`Start ${start} Euro. Je Schritt kommen ${rate} Euro dazu. Berechne den Wert nach ${n} Schritten.`;calculation=`${start} + ${n} · ${rate} = ${money(result)} Euro. Linear: derselbe Betrag je Schritt.`;}
            else {result=start*(1+rate/100)**n;prompt=`Start ${start} Euro. Je Schritt kommen ${rate} % des aktuellen Wertes dazu. Berechne den Wert nach ${n} Schritten.`;calculation=`${start} · (1 + ${rate}/100)^${n} ${Math.abs(result-Math.round(result*100)/100)>1e-8?'≈':'='} ${money(result)} Euro. Prozentuell: immer derselbe Faktor, bezogen auf den aktuellen Wert.`;}
            html += `<div data-growth-generated data-kind="${kind}" data-start="${start}" data-rate="${rate}" data-steps="${n}"><strong>A${i+1}.</strong> ${prompt}<p>Ergebnis: __________</p><p>Rechenweg: __________</p></div>`;
            solutions += `<div class="ws-generated-equation-solution" data-growth-answer="${result}" data-kind="${kind}"><h3>Zusatzübung A${i+1}</h3><p>${calculation}</p></div>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${solutions}</template>`;
    }
    else if (topicId === 'math3_11_statistik') {
        html += `<h2>Zusatzübungen: Mittelwerte mit Einheit</h2><p>Jede Reihe enthält erfundene Buchausleihen an vier geöffneten Tagen. Berechne den Mittelwert in Büchern pro Tag. Auch ein beobachteter Wert 0 zählt als ein Tag mit.</p><div>`;
        let solutions = '';
        for(let i=0; i<6; i++) {
            const values=Array.from({length:4},()=>rand(0,10)),sum=values.reduce((a,b)=>a+b,0),mean=sum/4,shown=mean.toLocaleString('de-AT');
            html += `<div data-stat3-generated data-values="${values.join(',')}"><strong>A${i+1}.</strong> Ausgeliehene Bücher: ${values.join(', ')}.<p>Summe: __________; Anzahl der Tage: __________</p><p>Mittelwert: __________ Bücher pro Tag</p></div>`;
            solutions += `<section class="ws-generated-equation-solution" data-stat3-generated-answer="${mean}"><h3>Zusatzübung A${i+1}</h3><p>(${values.join(' + ')}) : 4 = ${sum} : 4 = ${shown} Bücher pro Tag. Der Mittelwert ist ein rechnerischer Ausgleich, keine Vorgabe für den nächsten Tag.</p></section>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${solutions}</template>`;
    }
    else if (topicId === 'math4_1_reelle_zahlen') {
        html += `<h2>Zusatzübungen: Wurzelregeln und Kubikwurzeln</h2><p>Berechne exakt und zeige einen Zwischenschritt. Prüfe jede Kubikwurzel durch die dritte Potenz.</p>`;
        let solutions='';
        for(let i=0; i<8; i++) {
            const a=rand(2,9),b=rand(2,9),type=i%4,n=type===3?(i===3?-(a**3):a**3):2*a*a;
            let expression,answer,explanation;
            if(type===0){expression=`√${a*a} + √${b*b}`;answer=a+b;explanation=`${expression} = ${a} + ${b} = ${answer}. Die beiden Wurzeln werden einzeln berechnet; die Summe wird nicht unter eine Wurzel gezogen.`;}
            if(type===1){expression=`√${n} · √2`;answer=2*a;explanation=`${expression} = √${n*2} = ${answer}. Die nichtnegativen Radikanden werden multipliziert.`;}
            if(type===2){expression=`√${n} / √2`;answer=a;explanation=`${expression} = √(${n}/2) = √${a*a} = ${answer}. Der Nenner √2 ist positiv.`;}
            if(type===3){expression=`³√(${n})`;answer=i===3?-a:a;explanation=`${expression} = ${answer}. Probe: (${answer})³ = ${n}. Die dritte Wurzel hat dasselbe Vorzeichen wie der Radikand.`;}
            html+=`<div data-root-generated data-kind="${type}" data-a="${a}" data-b="${b}" data-n="${n}"><strong>A${i+1}.</strong> ${expression} = __________<p>Rechenweg / Probe: __________________________________________________</p></div>`;
            solutions+=`<section class="ws-generated-equation-solution" data-root-generated-answer="${answer}"><h3>Zusatzübung A${i+1}</h3><p>${explanation}</p></section>`;
        }
        html += `<template data-generated-worksheet-solutions>${solutions}</template>`;
    }
    else if (topicId === 'math4_2_pythagoras') {
        html += '<h2>Zusatzübungen: Raumdiagonale und Pyramidenoberfläche</h2><p>Alle Längen sind in cm. Skizziere das passende rechtwinklige Dreieck und runde erst das Endergebnis auf zwei Nachkommastellen.</p>';
        let solutions='';const shown=x=>x.toLocaleString('de-AT',{minimumFractionDigits:2,maximumFractionDigits:2});
        for(let i=0;i<6;i++){
            const a=2*rand(1,5),b=rand(2,8),h=rand(2,12),kind=i%2===0?'cuboid':'pyramid',answer=kind==='cuboid'?Math.sqrt(a*a+b*b+h*h):a*a+2*a*Math.sqrt(h*h+a*a/4);
            const task=kind==='cuboid'?'Quader mit a = '+a+' cm, b = '+b+' cm, h = '+h+' cm. Gesucht: Raumdiagonale d.':'Gerade quadratische Pyramide mit Grundkante a = '+a+' cm und Körperhöhe h = '+h+' cm. Gesucht: Oberfläche O.';
            html+=`<div data-pyth-generated data-kind="${kind}" data-a="${a}" data-b="${b}" data-h="${h}"><strong>A${i+1}.</strong> ${task}<p>Skizze und Rechenweg: __________________________________________________</p></div>`;
            const solution=kind==='cuboid'?'e² = '+a+'² + '+b+'² = '+(a*a+b*b)+' cm²; d = √('+(a*a+b*b)+' + '+h+'²) cm ≈ '+shown(answer)+' cm.':'hₛ = √('+h+'² + '+(a/2)+'²) cm. O = '+a+'² + 2 · '+a+' · √('+(h*h+a*a/4)+') cm² ≈ '+shown(answer)+' cm². Die Seitenhöhe bleibt bis zur Endrechnung ungerundet.';
            solutions+=`<section class="ws-generated-equation-solution" data-pyth-generated-answer="${answer}"><h3>Zusatzübung A${i+1}</h3><p>${solution}</p></section>`;
        }
        html+=`<template data-generated-worksheet-solutions>${solutions}</template>`;
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
        const answers=[];
        html += '<h2>Zusatzübungen: Darstellungen und Gleichungssysteme</h2>';
        for(let i=0;i<2;i++) {
            const m=rand(-3,3),b=rand(-4,4),x1=-1,x2=3,y1=m*x1+b,y2=m*x2+b;
            html += '<div data-function-generated data-kind="line" data-m="'+m+'" data-b="'+b+'"><p><strong>A'+(i+1)+'.</strong> Eine Gerade geht durch (−1|'+y1+') und (3|'+y2+'). Bestimme m und b, gib die Gleichung an und prüfe beide Punkte. Zeichne die Gerade und ein Steigungsdreieck.</p><p>Rechnung und Skizze: ____________________________________</p></div>';
            answers.push('<div data-function-generated-answer data-kind="line" data-m="'+m+'" data-b="'+b+'"><h3>Zusatzübung A'+(i+1)+'</h3><p>Δx = 3 − (−1) = 4; Δy = '+y2+' − ('+y1+') = '+(y2-y1)+'. Daher m = '+(y2-y1)+'/4 = '+m+'. Einsetzen: b = '+y1+' − ('+m+') · (−1) = '+b+'. Gleichung: y = ('+m+') · x + ('+b+'). Probe: ('+m+') · (−1) + ('+b+') = '+y1+' und ('+m+') · 3 + ('+b+') = '+y2+'.</p></div>');
        }
        for(let i=0;i<6;i++) {
            const x=rand(1,5),y=rand(1,5),a=rand(1,3),b=rand(1,3),res1=a*x+b*y,res2=x-y,n=i+3;
            html += '<div data-function-generated data-kind="system" data-a="'+a+'" data-b="'+b+'" data-r1="'+res1+'" data-r2="'+res2+'"><p><strong>A'+n+'.</strong> I: '+a+'x + '+b+'y = '+res1+'; II: x − y = '+res2+'. Löse und prüfe beide Gleichungen.</p><p>x = __________; y = __________; Rechenweg: __________________</p></div>';
            answers.push('<div data-function-generated-answer data-kind="system" data-x="'+x+'" data-y="'+y+'"><h3>Zusatzübung A'+n+'</h3><p>Aus II: x = y + ('+res2+'). In I: '+a+' · (y + ('+res2+')) + '+b+'y = '+res1+'. Daraus '+(a+b)+'y = '+(res1-a*res2)+', also y = '+y+' und x = '+x+'. Probe: '+a+' · '+x+' + '+b+' · '+y+' = '+res1+'; '+x+' − '+y+' = '+res2+'.</p></div>');
        }
        html += '<template data-generated-worksheet-solutions>'+answers.join('')+'</template>';
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
        html += '<h2>Zusatzübungen: Körpermaße, Masse und Dichte</h2><p data-round-generated-intro>Alle Körper sind gerade; Oberflächen schließen die Grundfläche und beim Zylinder den Deckel ein. Längen in cm, Flächen in cm², Volumen in cm³, Massen in g. Kürze π bei Umkehraufgaben; runde sonst erst das Endergebnis auf zwei Nachkommastellen. Zeichne eine Skizze und prüfe deine Rechnung.</p>';
        const solutions=[],kinds=['volume','volume','height_surface','height_surface','radius','radius','mass','density'];
        for(let i=0;i<8;i++){
            const triple=[[3,4,5],[5,12,13],[8,15,17]][rand(0,2)],scale=rand(1,2),[r,h,s]=triple.map(x=>x*scale),cone=i%2===1,kind=kinds[i],rho=[.5,1.2,2.7][rand(0,2)],v=r*r*h/(cone?3:1),o=cone?r*r+r*s:2*r*r+2*r*h,mc=Math.round(v*rho*1e6)/1e6,fmt=x=>x.toLocaleString('de-AT',{maximumFractionDigits:2});
            let given,answer,unit,explanation;
            if(kind==='volume'){given='r = '+r+' cm, h = '+h+' cm. Gesucht: V.';answer=v*Math.PI;unit='cm³';explanation='V = π · '+r+'² · '+h+(cone?' / 3':'')+' = '+v+'π cm³ ≈ '+fmt(answer)+' cm³.';}
            else if(kind==='height_surface'){given='r = '+r+' cm, O = '+o+'π cm². Gesucht: h.';answer=h;unit='cm';explanation=cone?'s = '+o+'/'+r+' − '+r+' = '+s+' cm. h = √('+s+'² − '+r+'²) = '+h+' cm. Probe: '+r+'² + '+r+' · '+s+' = '+o+' (O/π).':'h = ('+o+' − '+(2*r*r)+')/'+(2*r)+' = '+h+' cm. Probe: 2 · '+r+'² + 2 · '+r+' · '+h+' = '+o+' (O/π).';}
            else if(kind==='radius'){given='h = '+h+' cm, V = '+v+'π cm³. Gesucht: r.';answer=r;unit='cm';explanation='r = √('+(cone?3*v:v)+'/'+h+') = '+r+' cm. Probe: '+r+'² · '+h+(cone?' / 3':'')+' = '+v+' (V/π).';}
            else if(kind==='mass'){given='Massiver homogener Körper: r = '+r+' cm, h = '+h+' cm, fiktive Dichte ρ = '+fmt(rho)+' g/cm³. Gesucht: m.';answer=mc*Math.PI;unit='g';explanation='V = '+v+'π cm³. m = ρ · V = '+fmt(rho)+' · '+v+'π = '+fmt(mc)+'π g ≈ '+fmt(answer)+' g.';}
            else{given='Massiver homogener Körper: r = '+r+' cm, h = '+h+' cm, m = '+fmt(mc)+'π g. Gesucht: ρ.';answer=rho;unit='g/cm³';explanation='V = '+v+'π cm³. ρ = m/V = '+fmt(mc)+'π/('+v+'π) = '+fmt(rho)+' g/cm³. Probe: '+fmt(rho)+' · '+v+'π = '+fmt(mc)+'π g.';}
            html += '<div data-round-generated data-kind="'+kind+'" data-cone="'+cone+'" data-r="'+r+'" data-h="'+h+'" data-rho="'+rho+'"><p><strong>A'+(i+1)+'. '+(cone?'Kegel':'Zylinder')+'.</strong> '+given+'</p><p>Rechnung, Ergebnis und Probe: ______________________________</p></div>';
            solutions.push('<div data-round-generated-answer="'+answer+'" data-unit="'+unit+'"><h3>Zusatzübung A'+(i+1)+'</h3><p>'+explanation+'</p></div>');
        }
        html += '<template data-generated-worksheet-solutions>'+solutions.join('')+'</template>';
    }
    else if (topicId === 'math4_7_statistik') {
        html += `<h2>Zusatzübungen: ein Zug aus einer Urne</h2><p>Alle Kugeln sind beim Ziehen gleich wahrscheinlich. Es wird jeweils genau einmal gezogen. Berechne den Anteil roter Kugeln zuerst als Bruch und dann als Prozentwert. Runde Prozentwerte bei Bedarf auf zwei Nachkommastellen. Eine Wahrscheinlichkeit sagt nicht voraus, welche einzelne Kugel gezogen wird.</p><div>`;
        let solutions = '';
        for(let i=0; i<6; i++) {
            const total = rand(10, 50);
            const favorable = rand(1, total - 1);
            const percent=100*favorable/total,shown=percent.toLocaleString('de-AT',{maximumFractionDigits:2});
            html += `<div data-stat4-generated data-total="${total}" data-red="${favorable}"><strong>A${i+1}.</strong> Urne: ${total} Kugeln, davon ${favorable} rot.<p>P(Rot) als Bruch: __________; als Prozentwert: __________ %</p><p>Rechenweg: ____________________________________________________</p></div>`;
            solutions += `<section class="ws-generated-equation-solution" data-stat4-generated-answer="${percent}"><h3>Zusatzübung A${i+1}</h3><p>P(Rot) = ${favorable}/${total}. Prozentwert: ${favorable} : ${total} · 100 ≈ ${shown} %. ${favorable} günstige Kugeln von insgesamt ${total} gleich wahrscheinlichen Kugeln.</p></section>`;
        }
        html += `</div><template data-generated-worksheet-solutions>${solutions}</template>`;
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
        const decimal = n => n.toLocaleString('de-AT',{useGrouping:false,maximumFractionDigits:3});
        let solutions = '';
        html += '<h2>Zusatzübungen: Rechnen und Darstellungen wechseln</h2>';
        for (let i=0;i<8;i++) {
            const division=i>=4, first=rand(12,85), second=rand(2,15), answer=division?first:first*second/100;
            const prompt=division?decimal(first*second/10)+' : '+decimal(second/10):(first/10).toFixed(1).replace('.',',')+' · '+(second/10).toFixed(1).replace('.',',');
            html += '<p data-decimal-generated data-kind="'+(division?'division':'product')+'" data-first="'+first+'" data-second="'+second+'"><strong>A'+(i+1)+'.</strong> '+prompt+' = __________________</p>';
            solutions += '<section class="ws-generated-equation-solution" data-decimal-answer="'+answer+'"><h3>Zusatzübung A'+(i+1)+'</h3><p>'+prompt+' = '+(division?decimal(answer):answer.toFixed(2).replace('.',','))+'. '+(division?'Beide Zahlen mit 10 multiplizieren: '+(first*second)+' : '+second+' = '+first+'.':first+' · '+second+' = '+(first*second)+'. Insgesamt zwei Nachkommastellen berücksichtigen.')+'</p></section>';
        }
        const banks=[[[1,3,'0,(3)'],[2,3,'0,(6)'],[3,11,'0,(27)']],[[1,4,'0,25'],[3,8,'0,375'],[1,8,'0,125']],[[1,3,'0,(3)'],[2,3,'0,(6)'],[1,33,'0,(03)']],[[1,6,'0,1(6)'],[5,6,'0,8(3)'],[1,12,'0,08(3)']]];
        for(let i=0;i<4;i++){
            const bank=banks[i], [num,den,written]=bank[rand(0,bank.length-1)], number=i+9;
            html += '<p data-period-generated data-num="'+num+'" data-den="'+den+'" data-written="'+written+'"><strong>A'+number+'.</strong> '+(i<2?'Schreibe '+num+'/'+den+' als exakte Dezimalzahl. Markiere eine Periode gegebenenfalls mit Klammern.':'Schreibe '+written+' als vollständig gekürzten Bruch.')+' __________________</p>';
            solutions += '<section class="ws-generated-equation-solution" data-period-generated-answer="'+num+'/'+den+'"><h3>Zusatzübung A'+number+'</h3><p>'+num+'/'+den+' = '+written+'. '+(written.includes('(')?'Die eingeklammerten Ziffern wiederholen sich unbegrenzt.':'Die Division endet mit Rest 0.')+'</p></section>';
        }
        html += '<template data-generated-worksheet-solutions>'+solutions+'</template>';
    }
    else if (topicId === 'math2_5_var_gleichungen') {
        html += '<h2>1. Gleichungen lösen (Nach x auflösen)</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;">';
        let generatedSolutions = '';
        for(let i=0; i<12; i++) {
            const x = rand(2, 20);
            const a = rand(2, 9);
            const b = rand(1, 20);
            const res = a * x + b;
            html += '<div data-generated-equation data-a="' + a + '" data-b="' + b + '" data-result="' + res + '"><strong>A' + (i + 1) + '.</strong> \\( ' + a + 'x + ' + b + ' = ' + res + ' \\)<br><br>\\( x = \\) <span style="display:inline-block; border-bottom:1px dotted #000; width:50px;"></span></div>';
            generatedSolutions += '<section class="ws-generated-equation-solution" data-generated-answer="' + x + '"><h3>Zusatzübung A' + (i + 1) + '</h3><p>' + a + 'x + ' + b + ' = ' + res + '. Auf beiden Seiten ' + b + ' subtrahieren: ' + a + 'x = ' + (res - b) + '. Durch ' + a + ' teilen: x = ' + x + '.</p><p>Probe: ' + a + ' · ' + x + ' + ' + b + ' = ' + res + '.</p></section>';
        }
        html += '</div><template data-generated-worksheet-solutions>' + generatedSolutions + '</template>';
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
