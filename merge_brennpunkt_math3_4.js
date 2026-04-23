const fs = require('fs');
const path = require('path');

const dePath = 'lang/de.json';
const jsDir = 'js/topics';

const filesToMerge = [
    'brennpunkt_math3_batchA.json',
    'brennpunkt_math3_batchB.json',
    'brennpunkt_math3_batchC.json',
    'brennpunkt_math4_batchA.json',
    'brennpunkt_math4_batchB.json'
];

const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));
let mergedCount = 0;

filesToMerge.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            for (const key in data) {
                const topic = data[key];
                let combinedJs = '';
                
                if (topic.sections) {
                    topic.sections.forEach(sec => {
                        if (sec.content) {
                            const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
                            let match;
                            while ((match = scriptRegex.exec(sec.content)) !== null) {
                                combinedJs += match[1] + '\n\n';
                            }
                            sec.content = sec.content.replace(scriptRegex, '');
                        }
                    });
                }
                
                if (topic.content) {
                     const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
                     let match;
                     while ((match = scriptRegex.exec(topic.content)) !== null) {
                         combinedJs += match[1] + '\n\n';
                     }
                     topic.content = topic.content.replace(scriptRegex, '');
                }

                if (combinedJs.trim().length > 0) {
                    if (!combinedJs.includes('function topicInit')) {
                        combinedJs += '\nfunction topicInit() {}\n';
                    }
                    fs.writeFileSync(path.join(jsDir, `${key}.js`), combinedJs, 'utf8');
                } else {
                     fs.writeFileSync(path.join(jsDir, `${key}.js`), 'function topicInit() {}\n', 'utf8');
                }

                de[key] = topic;
                mergedCount++;
                console.log(`Merged Brennpunkt version and extracted JS for: ${key}`);
            }
        } catch (e) {
            console.error(`Error processing ${file}:`, e.message);
        }
    } else {
        console.warn(`${file} not found.`);
    }
});

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log(`Successfully merged ${mergedCount} Brennpunkt topics into de.json!`);