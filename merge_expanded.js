const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

const filesToMerge = [
    'expanded_math1_2.json',
    'expanded_math1_8.json'
];

filesToMerge.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            for (const key in data) {
                de[key] = data[key];
                console.log(`Merged expanded content for: ${key}`);
            }
        } catch (e) {
            console.error(`Error merging ${file}:`, e.message);
        }
    }
});

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('Merge complete.');