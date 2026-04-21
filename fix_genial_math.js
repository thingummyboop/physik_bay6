const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /mathematik:\s*{\s*topics:\s*\[[\s\S]*?\]\s*}/;

const newMath = `mathematik: {
                topics: [
                    // 5. Schulstufe (1. Klasse) - Genial! Mathematik 1
                    { id: "math1_1_vs_wissen", title: "🧠 1. Mein Wissen aus der Volksschule", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_2_nat_zahlen", title: "🔢 2. Natürliche Zahlen", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_3_add_sub", title: "➕ 3. Addition und Subtraktion", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_4_mult_div", title: "✖️ 4. Multiplikation und Division", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_5_geo_grundbegriffe", title: "📏 5. Geometrische Grundbegriffe", grade: "1. Klasse (5. Schulstufe)", category: "Geometrie" },
                    { id: "math1_6_winkel", title: "📐 6. Winkel", grade: "1. Klasse (5. Schulstufe)", category: "Geometrie" },
                    { id: "math1_7_gleichungen", title: "⚖️ 7. Gleichungen und Ungleichungen", grade: "1. Klasse (5. Schulstufe)", category: "Algebra" },
                    { id: "math1_8_brueche", title: "🍕 8. Brüche", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_9_dezimalzahlen", title: "💶 9. Dezimalzahlen", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_10_groessen", title: "⚖️ 10. Größen (Länge, Masse, Zeit, Geld)", grade: "1. Klasse (5. Schulstufe)", category: "Arithmetik" },
                    { id: "math1_11_figuren_koerper", title: "🧊 11. Geometrische Figuren und Körper", grade: "1. Klasse (5. Schulstufe)", category: "Geometrie" },
                    
                    // 6. Schulstufe (2. Klasse) - Genial! Mathematik 2
                    { id: "math2_1_teilbarkeit", title: "➗ 1. Teilbarkeit natürlicher Zahlen", grade: "2. Klasse (6. Schulstufe)", category: "Arithmetik" },
                    { id: "math2_2_brueche", title: "🍰 2. Brüche", grade: "2. Klasse (6. Schulstufe)", category: "Arithmetik" },
                    { id: "math2_3_dezimalzahlen", title: "💶 3. Dezimalzahlen", grade: "2. Klasse (6. Schulstufe)", category: "Arithmetik" },
                    { id: "math2_4_relative_zahlen", title: "➖ 4. Relative Zahlen (Ganze Zahlen)", grade: "2. Klasse (6. Schulstufe)", category: "Arithmetik" },
                    { id: "math2_5_var_gleichungen", title: "🧮 5. Variablen und Gleichungen", grade: "2. Klasse (6. Schulstufe)", category: "Algebra" },
                    { id: "math2_6_prop_prozent", title: "💯 6. Proportionen und Prozentrechnung", grade: "2. Klasse (6. Schulstufe)", category: "Arithmetik" },
                    { id: "math2_7_geometrie", title: "🔺 7. Geometrie (Dreiecke, Vierecke, Prismen)", grade: "2. Klasse (6. Schulstufe)", category: "Geometrie" },
                    { id: "math2_8_statistik", title: "📊 8. Statistik", grade: "2. Klasse (6. Schulstufe)", category: "Statistik" },
                    
                    // 7. Schulstufe (3. Klasse) - Genial! Mathematik 3
                    { id: "math3_1_rationale_zahlen", title: "➖ 1. Rationale Zahlen", grade: "3. Klasse (7. Schulstufe)", category: "Arithmetik" },
                    { id: "math3_2_potenzen_terme", title: "📈 2. Potenzen und Terme", grade: "3. Klasse (7. Schulstufe)", category: "Algebra" },
                    { id: "math3_3_gleichungen", title: "⚖️ 3. Gleichungen", grade: "3. Klasse (7. Schulstufe)", category: "Algebra" },
                    { id: "math3_4_flaechensatz", title: "🔷 4. Flächeninhalte ebener Figuren", grade: "3. Klasse (7. Schulstufe)", category: "Geometrie" },
                    { id: "math3_5_verhaeltnisse", title: "⚖️ 5. Verhältnisse und Proportionen", grade: "3. Klasse (7. Schulstufe)", category: "Algebra" },
                    { id: "math3_6_zuordnungen", title: "📉 6. Zuordnungen (Funktionen)", grade: "3. Klasse (7. Schulstufe)", category: "Algebra" },
                    { id: "math3_7_aehnlichkeit", title: "🔍 7. Ähnlichkeit", grade: "3. Klasse (7. Schulstufe)", category: "Geometrie" },
                    { id: "math3_8_pythagoras", title: "📐 8. Der Satz des Pythagoras", grade: "3. Klasse (7. Schulstufe)", category: "Geometrie" },
                    { id: "math3_9_koerper", title: "🧊 9. Geometrische Körper", grade: "3. Klasse (7. Schulstufe)", category: "Geometrie" },
                    { id: "math3_10_prozent_zins", title: "💰 10. Prozent- und Zinsrechnung", grade: "3. Klasse (7. Schulstufe)", category: "Arithmetik" },
                    { id: "math3_11_statistik", title: "📊 11. Statistik", grade: "3. Klasse (7. Schulstufe)", category: "Statistik" },
                    
                    // 8. Schulstufe (4. Klasse) - Genial! Mathematik 4
                    { id: "math4_1_reelle_zahlen", title: "🔢 1. Reelle Zahlen (Wurzeln)", grade: "4. Klasse (8. Schulstufe)", category: "Arithmetik" },
                    { id: "math4_2_pythagoras", title: "📐 2. Satz des Pythagoras", grade: "4. Klasse (8. Schulstufe)", category: "Geometrie" },
                    { id: "math4_3_terme_gleichungen", title: "🧮 3. Terme und Gleichungen", grade: "4. Klasse (8. Schulstufe)", category: "Algebra" },
                    { id: "math4_4_funktionen_sys", title: "✖️ 4. Lineare Funktionen & Gleichungssysteme", grade: "4. Klasse (8. Schulstufe)", category: "Algebra" },
                    { id: "math4_5_aehnlichkeit", title: "🔍 5. Ähnlichkeit und Strahlensätze", grade: "4. Klasse (8. Schulstufe)", category: "Geometrie" },
                    { id: "math4_6_koerper", title: "🔮 6. Geometrische Körper (Zylinder, Kegel, Kugel)", grade: "4. Klasse (8. Schulstufe)", category: "Geometrie" },
                    { id: "math4_7_statistik", title: "📊 7. Statistik", grade: "4. Klasse (8. Schulstufe)", category: "Statistik" },
                    { id: "math4_8_finanzmathematik", title: "📈 8. Finanzmathematik", grade: "4. Klasse (8. Schulstufe)", category: "Arithmetik" }
                ]
            }`;

if (regex.test(html)) {
    html = html.replace(regex, newMath);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Successfully updated math topics to EXAKT 'Genial! Mathematik' structure.");
} else {
    console.log("Regex did not match.");
}