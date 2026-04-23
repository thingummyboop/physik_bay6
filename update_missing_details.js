const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. Fix Winkel (math1_6_winkel)
const winkelTopic = de.math1_6_winkel;
if (winkelTopic && winkelTopic.sections[1]) {
    // Add missing angle types to the second section "Winkel-Arten"
    let content = winkelTopic.sections[1].content;
    const missingAngles = `
    <li><span style='color:purple; font-weight:bold;'>Nullwinkel:</span> Genau 0°. (Keine Drehung).</li>
    <li><span style='color:teal; font-weight:bold;'>Gestreckter Winkel:</span> Genau 180°. (Eine gerade Linie, wie ein Lineal).</li>
    <li><span style='color:brown; font-weight:bold;'>Erhabener Winkel:</span> Zwischen 180° und 360°. (Größer als ein Lineal, aber keine volle Drehung).</li>
    <li><span style='color:magenta; font-weight:bold;'>Voller Winkel:</span> Genau 360°. (Eine komplette Drehung, wie ein Kreis).</li>
    `;
    
    if (!content.includes('Gestreckter Winkel')) {
        content = content.replace('</ul>', missingAngles + '</ul>');
        winkelTopic.sections[1].content = content;
        
        // Add a quiz for the new types
        winkelTopic.sections[1].quizzes.push({
            "id": "m16_q_gestreckt",
            "question": "Wie viel Grad hat ein gestreckter Winkel (eine gerade Linie)?",
            "answers": [
                { "text": "Genau 180°", "correct": true, "pts": 10 },
                { "text": "Genau 90°", "correct": false, "pts": 5 },
                { "text": "Genau 360°", "correct": false, "pts": 5 }
            ]
        });
        winkelTopic.sections[1].content += "\n{{QUIZ_m16_q_gestreckt}}";
    }
}

// 2. Fix Geometrische Grundbegriffe (math1_5_geo_grundbegriffe)
const geoTopic = de.math1_5_geo_grundbegriffe;
if (geoTopic && geoTopic.sections[0]) {
    let content = geoTopic.sections[0].content;
    const missingGeo = `
    <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 15px;">
        <h4>Wichtige Vokabeln der Geometrie:</h4>
        <ul>
            <li><strong>Der Punkt:</strong> Hat keine Länge und keine Breite. Man markiert ihn meist mit einem kleinen Kreuz (x) und einem Großbuchstaben (z.B. Punkt A).</li>
            <li><strong>Die Gerade:</strong> Eine unendlich lange, gerade Linie ohne Anfang und ohne Ende. Man benennt sie meist mit Kleinbuchstaben (z.B. Gerade g).</li>
            <li><strong>Der Strahl (Halbgerade):</strong> Hat einen klaren Anfangspunkt, ist aber auf der anderen Seite unendlich lang (wie ein Lichtstrahl aus einer Taschenlampe).</li>
            <li><strong>Die Strecke:</strong> Die kürzeste Verbindung zwischen zwei Punkten. Sie hat einen Anfang und ein Ende! Man kann sie mit dem Lineal messen (z.B. Strecke AB).</li>
        </ul>
        <h4>Lage von Linien zueinander:</h4>
        <ul>
            <li><strong>Parallel (||):</strong> Zwei Linien, die immer den exakt gleichen Abstand zueinander haben. Sie schneiden sich nie! (Wie Bahngleise).</li>
            <li><strong>Normal / Senkrecht (⊥):</strong> Zwei Linien, die sich in einem exakten 90° Winkel (rechter Winkel) schneiden. (Wie ein Kreuz).</li>
            <li><strong>Schneidend:</strong> Zwei Linien, die sich in einem Punkt treffen.</li>
        </ul>
    </div>
    `;
    
    if (!content.includes('Halbgerade')) {
        // Insert right after the first paragraph
        content = content.replace('</p>', '</p>' + missingGeo);
        geoTopic.sections[0].content = content;
        
        geoTopic.sections[0].quizzes.push({
            "id": "m15_q_strecke",
            "question": "Welche Linie kannst du als einzige mit dem Lineal abmessen?",
            "answers": [
                { "text": "Die Strecke (sie hat Anfang und Ende)", "correct": true, "pts": 10 },
                { "text": "Die Gerade (sie ist unendlich)", "correct": false, "pts": 5 },
                { "text": "Den Strahl", "correct": false, "pts": 5 }
            ]
        });
        geoTopic.sections[0].content += "\n{{QUIZ_m15_q_strecke}}";
    }
}

// 3. Fix Vierecke (math2_7_geometrie)
const viereckTopic = de.math2_7_geometrie;
if (viereckTopic && viereckTopic.sections[1]) {
    let content = viereckTopic.sections[1].content;
    const missingVierecke = `
    <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 15px;">
        <h4>Das Haus der Vierecke (Alle wichtigen Typen):</h4>
        <ul>
            <li><strong>Quadrat:</strong> Alle 4 Seiten gleich lang, alle Winkel 90°. (Der absolute Chef).</li>
            <li><strong>Rechteck:</strong> Gegenüberliegende Seiten sind gleich lang, alle Winkel 90°.</li>
            <li><strong>Raute (Rhombus):</strong> Alle 4 Seiten gleich lang, aber die Winkel müssen nicht 90° sein (ein schiefes Quadrat). Die Diagonalen stehen senkrecht aufeinander!</li>
            <li><strong>Parallelogramm:</strong> Gegenüberliegende Seiten sind parallel und gleich lang (ein schiefes Rechteck).</li>
            <li><strong>Deltoid (Drachenviereck):</strong> Zwei Paar benachbarte Seiten sind gleich lang. Die Diagonalen stehen senkrecht aufeinander. (Sieht aus wie ein Flugdrachen).</li>
            <li><strong>Trapez:</strong> Mindestens zwei gegenüberliegende Seiten sind parallel. (Sieht oft aus wie ein Zelt).</li>
        </ul>
    </div>
    `;
    
    if (!content.includes('Deltoid')) {
        content = content.replace('</p>', '</p>' + missingVierecke);
        viereckTopic.sections[1].content = content;
        
        viereckTopic.sections[1].quizzes.push({
            "id": "m27_q_raute",
            "question": "Bei welchem Viereck sind alle 4 Seiten gleich lang, aber die Winkel müssen nicht 90° sein?",
            "answers": [
                { "text": "Raute (Rhombus)", "correct": true, "pts": 10 },
                { "text": "Rechteck", "correct": false, "pts": 5 },
                { "text": "Trapez", "correct": false, "pts": 5 }
            ]
        });
        viereckTopic.sections[1].content += "\n{{QUIZ_m27_q_raute}}";
    }
}

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log("Missing detailed definitions added successfully!");