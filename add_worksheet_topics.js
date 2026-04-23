const fs = require('fs');

let js = fs.readFileSync('js/worksheet_generator.js', 'utf8');

const additionalTopics = "    else if (topicId === 'math1_1_vs_wissen') {\n" +
"        html += '<h2>1. Kopfrechnen (Plus & Minus bis 100)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<10; i++) {\n" +
"            const n1 = rand(10, 80);\n" +
"            const n2 = rand(5, 90 - n1);\n" +
"            html += '<div>' + n1 + ' + ' + n2 + ' = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:100px;\"></span></div>';\n" +
"        }\n" +
"        for(let i=0; i<10; i++) {\n" +
"            const n1 = rand(30, 100);\n" +
"            const n2 = rand(5, n1);\n" +
"            html += '<div>' + n1 + ' - ' + n2 + ' = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:100px;\"></span></div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math1_5_geo_grundbegriffe') {\n" +
"        html += '<h2>1. Zeichnen & Benennen</h2><div style=\"font-size: 1.2em; line-height: 2;\">';\n" +
"        html += '<p>1. Zeichne eine <strong>Gerade g</strong> und eine <strong>Gerade h</strong>, die zueinander <strong>parallel</strong> sind.</p><div style=\"height: 100px;\"></div>';\n" +
"        html += '<p>2. Zeichne eine <strong>Strecke AB</strong> mit der Länge <strong>6 cm</strong>.</p><div style=\"height: 100px;\"></div>';\n" +
"        html += '<p>3. Zeichne einen <strong>Strahl s</strong>, der im Punkt P beginnt.</p><div style=\"height: 100px;\"></div>';\n" +
"        html += '<p>4. Zeichne zwei Geraden, die <strong>normal (senkrecht)</strong> aufeinander stehen.</p><div style=\"height: 100px;\"></div>';\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math1_6_winkel') {\n" +
"        html += '<h2>1. Winkel zeichnen</h2><div style=\"font-size: 1.2em; line-height: 2;\">';\n" +
"        const angles = [30, 45, 60, 90, 120, 150];\n" +
"        angles.forEach((a, i) => {\n" +
"            html += '<p>' + (i+1) + '. Zeichne einen Winkel von <strong>' + a + '°</strong> (Alpha = ' + a + '°).</p><div style=\"height: 120px;\"></div>';\n" +
"        });\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math2_3_dezimalzahlen') {\n" +
"        html += '<h2>1. Dezimalzahlen multiplizieren</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<8; i++) {\n" +
"            const n1 = (rand(10, 500) / 10).toFixed(1).replace('.', ',');\n" +
"            const n2 = (rand(2, 20) / 10).toFixed(1).replace('.', ',');\n" +
"            html += '<div>' + n1 + ' \\\\(\\\\cdot\\\\) ' + n2 + ' = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:100px;\"></span></div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"        \n" +
"        html += '<h2>2. Dezimalzahlen dividieren</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<8; i++) {\n" +
"            const result = rand(2, 50);\n" +
"            const n2 = (rand(2, 10) / 10).toFixed(1);\n" +
"            const n1 = (result * parseFloat(n2)).toFixed(2).replace('.', ',');\n" +
"            const n2Str = n2.replace('.', ',');\n" +
"            html += '<div>' + n1 + ' : ' + n2Str + ' = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:100px;\"></span></div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math2_5_var_gleichungen') {\n" +
"        html += '<h2>1. Gleichungen lösen (Nach x auflösen)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<12; i++) {\n" +
"            const x = rand(2, 20);\n" +
"            const a = rand(2, 9);\n" +
"            const b = rand(1, 20);\n" +
"            const res = a * x + b;\n" +
"            html += '<div>\\\\( ' + a + 'x + ' + b + ' = ' + res + ' \\\\)<br><br>\\\\( x = \\\\) <span style=\"display:inline-block; border-bottom:1px dotted #000; width:50px;\"></span></div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math2_7_geometrie') {\n" +
"        html += '<h2>1. Flächeninhalt (Dreieck & Parallelogramm)</h2><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 1.2em;\">';\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const g = rand(4, 20);\n" +
"            const h = rand(3, 15);\n" +
"            html += '<div><strong>Dreieck:</strong> g = ' + g + ' cm, h = ' + h + ' cm<br><br>A = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:80px;\"></span> cm²</div>';\n" +
"        }\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const a = rand(4, 20);\n" +
"            const h = rand(3, 15);\n" +
"            html += '<div><strong>Parallelogramm:</strong> a = ' + a + ' cm, h = ' + h + ' cm<br><br>A = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:80px;\"></span> cm²</div>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else if (topicId === 'math2_8_statistik') {\n" +
"        html += '<h2>1. Mittelwert (Durchschnitt) berechnen</h2><div style=\"font-size: 1.2em; line-height: 2;\">';\n" +
"        for(let i=0; i<5; i++) {\n" +
"            const nums = Array.from({length: rand(4, 6)}, () => rand(1, 20));\n" +
"            html += '<p>Berechne den Mittelwert der Zahlen: <strong>' + nums.join(', ') + '</strong></p><div>Mittelwert = <span style=\"display:inline-block; border-bottom:1px dotted #000; width:100px;\"></span></div><br>';\n" +
"        }\n" +
"        html += '</div>';\n" +
"    }\n" +
"    else {\n" +
"        return null;\n" +
"    }\n" +
"    return html;\n" +
"}";

const regex = /else\s*\{\s*return null;\s*\}\s*return html;\s*\}/;

if (regex.test(js)) {
    js = js.replace(regex, additionalTopics);
    fs.writeFileSync('js/worksheet_generator.js', js, 'utf8');
    console.log("Worksheet generator updated successfully!");
} else {
    console.error("Could not find the ending block in worksheet_generator.js.");
}