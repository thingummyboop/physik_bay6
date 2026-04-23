const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. Fix Optik 1 (Kernschatten & Halbschatten)
const optikTopic = de.optik1;
if (optikTopic && optikTopic.sections) {
    const shadowSec = optikTopic.sections.find(s => s.id === 'sec3' || s.title.includes('Schatten'));
    if (shadowSec) {
        const missingShadows = `
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #475569; margin-top: 15px;">
            <h4>Schatten ist nicht gleich Schatten:</h4>
            <ul>
                <li><strong>Kernschatten:</strong> Der dunkelste Bereich. Hier trifft überhaupt gar kein Licht der Lichtquelle ein.</li>
                <li><strong>Halbschatten:</strong> Entsteht, wenn es mehrere Lichtquellen (oder eine sehr große Lichtquelle) gibt. Das Licht der einen Lampe wird vom Gegenstand blockiert, aber das Licht der zweiten Lampe leuchtet noch ein bisschen in den Schatten hinein. Es entsteht ein hellerer "Halbschatten" um den Kernschatten herum.</li>
            </ul>
        </div>
        `;
        if (!shadowSec.content.includes('Kernschatten')) {
            shadowSec.content = shadowSec.content.replace('</p>', '</p>' + missingShadows);
            shadowSec.quizzes.push({
                "id": "opt1_q_kernschatten",
                "question": "Wie nennt man den dunkelsten Bereich eines Schattens, wo gar kein Licht mehr hinkommt?",
                "answers": [
                    { "text": "Kernschatten", "correct": true, "pts": 10 },
                    { "text": "Halbschatten", "correct": false, "pts": 5 },
                    { "text": "Schwarzes Loch", "correct": false, "pts": 5 }
                ]
            });
            shadowSec.content += "\n{{QUIZ_opt1_q_kernschatten}}";
        }
    }
}

// 2. Fix Elektrizität (Reihenschaltung & Parallelschaltung)
const stromTopic = de.elektrizitaet;
if (stromTopic && stromTopic.sections) {
    const circuitSec = stromTopic.sections.find(s => s.id === 'sec2' || s.title.includes('Stromkreis'));
    if (circuitSec) {
        const missingCircuits = `
        <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 15px;">
            <h4>Arten von Stromkreisen:</h4>
            <ul>
                <li><strong>Die Reihenschaltung:</strong> Alle Lampen (oder Bauteile) hängen wie Perlen auf einer Schnur hintereinander am selben Kabel. <em>Achtung:</em> Wenn eine Lampe kaputtgeht, ist der Stromkreis unterbrochen und alle anderen gehen auch aus! (Z.B. bei alten Lichterketten).</li>
                <li><strong>Die Parallelschaltung:</strong> Das Kabel verzweigt sich! Jede Lampe hat ihren eigenen kleinen Extra-Weg zum Strom. <em>Vorteil:</em> Geht eine Lampe kaputt, brennen die anderen fröhlich weiter. So sind auch die Steckdosen in eurer Wohnung verkabelt.</li>
            </ul>
        </div>
        `;
        if (!circuitSec.content.includes('Reihenschaltung')) {
            circuitSec.content = circuitSec.content.replace('</p>', '</p>' + missingCircuits);
            circuitSec.quizzes.push({
                "id": "elek_q_parallel",
                "question": "In welcher Schaltung leuchten alle anderen Lampen weiter, wenn eine Lampe kaputtgeht?",
                "answers": [
                    { "text": "In der Parallelschaltung (jede hat ihren eigenen Weg)", "correct": true, "pts": 10 },
                    { "text": "In der Reihenschaltung (wie auf einer Schnur)", "correct": false, "pts": 5 }
                ]
            });
            circuitSec.content += "\n{{QUIZ_elek_q_parallel}}";
        }
    }
}

// 3. Fix Optik 2 / Linsen (Konvex vs Konkav)
const linsenTopic = de.linsen_spiegel;
if (linsenTopic && linsenTopic.sections) {
    const lensSec = linsenTopic.sections.find(s => s.id === 'sec3' || s.title.includes('Linsen'));
    if (lensSec) {
         const missingLenses = `
         <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 15px;">
             <h4>Zwei Arten von Linsen:</h4>
             <ul>
                 <li><strong>Sammellinse (Konvex-Linse):</strong> Sie ist in der Mitte dicker als am Rand (nach außen gebogen). Sie bündelt das Licht in einem Punkt (Brennpunkt). Die Lupe ist eine typische Sammellinse!</li>
                 <li><strong>Zerstreuungslinse (Konkav-Linse):</strong> Sie ist in der Mitte dünner als am Rand (nach innen gebogen, wie eine "Höhle"). Sie verstreut die Lichtstrahlen nach außen, als würden sie auseinanderfliehen.</li>
             </ul>
             <p><em>Eselsbrücke:</em> War das Mädchen brav, bleibt der Bauch <strong>konkav</strong> (flach, nach innen). Hat der Junge viel gessen, ist sein Bauch <strong>konvex</strong> (nach außen gewölbt).</p>
         </div>
         `;
         if (!lensSec.content.includes('Sammellinse')) {
             lensSec.content = lensSec.content.replace('</p>', '</p>' + missingLenses);
         }
    }
}

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log("Missing physics and additional details added successfully!");