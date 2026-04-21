const fs = require('fs');
const path = require('path');

const dePath = 'lang/de.json';
const jsDir = 'js/topics';

const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

let extractedCount = 0;

for (const key in de) {
    if (key.startsWith('math')) {
        const topic = de[key];
        let combinedJs = '';
        
        if (topic.sections) {
            topic.sections.forEach(sec => {
                if (sec.content) {
                    // Extract script tags
                    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
                    let match;
                    while ((match = scriptRegex.exec(sec.content)) !== null) {
                        combinedJs += match[1] + '\n\n';
                    }
                    // Remove script tags from content
                    sec.content = sec.content.replace(scriptRegex, '');
                }
            });
        }
        
        // Also check if the old structure had content directly on the topic level
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
                combinedJs += '\nfunction topicInit() {\n  // Init logic is handled inline, but function required by renderer\n}\n';
            }
            
            const jsFilePath = path.join(jsDir, `${key}.js`);
            fs.writeFileSync(jsFilePath, combinedJs, 'utf8');
            extractedCount++;
        } else {
            // Create an empty topicInit file if none exists to avoid 404 errors
            const jsFilePath = path.join(jsDir, `${key}.js`);
            if (!fs.existsSync(jsFilePath)) {
                 fs.writeFileSync(jsFilePath, 'function topicInit() {}\n', 'utf8');
            }
        }
    }
}

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log(`Extracted JS for ${extractedCount} math topics and cleaned HTML.`);