const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

let fixedCount = 0;

for (const key in de) {
    if (key.startsWith('math')) {
        const topic = de[key];
        
        if (topic.diplom && !topic.diplom.questions) {
            topic.diplom.questions = [
                {
                    "id": `${key}_dip_default`,
                    "question": `Hast du das Thema "${topic.title}" verstanden? (${topic.diplom.description || 'Abschlussfrage'})`,
                    "answers": [
                        { "text": "Ja, ich bin bereit für das Diplom!", "correct": true, "pts": 5 },
                        { "text": "Nein, ich muss noch ein bisschen üben.", "correct": false, "pts": 5 }
                    ]
                }
            ];
            fixedCount++;
        }
        
        // Also check missing subtitles while we're here
        if (!topic.subtitle) {
            topic.subtitle = "Lerne Mathematik interaktiv und intuitiv!";
        }
    }
}

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log(`Fixed missing diplom questions in ${fixedCount} topics!`);