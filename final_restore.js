const fs = require('fs');
const pathMod = require('path');
const cheerio = require('cheerio');

const sourceDir = 'C:/Users/Simon/Documents/all_topics_full';
const targetLangDir = 'C:/Users/Simon/Documents/Physik Bay6/lang';
const targetJsDir = 'C:/Users/Simon/Documents/Physik Bay6/js/topics';

if (!fs.existsSync(targetLangDir)) fs.mkdirSync(targetLangDir, { recursive: true });
if (!fs.existsSync(targetJsDir)) fs.mkdirSync(targetJsDir, { recursive: true });

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html') && !f.includes('_') && !['index.html', 'dashboard.html', 'glossar.html', 'template.html'].includes(f));

let deData = {};

files.forEach(filename => {
    const filepath = pathMod.join(sourceDir, filename);
    const html = fs.readFileSync(filepath, 'utf8');
    const $ = cheerio.load(html);
    
    // Normalize ID: replace spaces and commas with underscores
    const topicId = filename.replace('.html', '').replace(/[\s,]+/g, '_');
    
    let topic = {
        title: $('h1').text().trim(),
        subtitle: $('p').first().text().trim(),
        sections: []
    };
    
    $('.card').each((i, card) => {
        const title = $(card).find('h2').text().trim();
        if (!title || title.toLowerCase().includes('diplom')) return;
        
        let section = {
            id: `sec${i}`,
            title: title,
            quizzes: []
        };
        
        let $card = $(card).clone();
        $card.find('h2').remove();
        
        // Extract Quizzes
        $card.find('.quiz-box, .exercise-box').each((j, qb) => {
            const qId = $(qb).attr('data-id') || `${topicId}_s${i}_q${j}`;
            section.quizzes.push({
                id: qId,
                question: $(qb).find('p strong').text().trim() || $(qb).find('p').first().text().trim(),
                answers: $(qb).find('button').map((k, btn) => {
                    const onclick = $(btn).attr('onclick') || "";
                    return {
                        text: $(btn).text().trim(),
                        correct: onclick.includes('true'),
                        pts: parseInt(onclick.match(/,\s*(\d+)\)/)?.[1]) || 10
                    };
                }).get()
            });
            $(qb).replaceWith(`{{QUIZ_${qId}}}`);
        });
        
        section.content = $card.html();
        topic.sections.push(section);
    });
    
    // Diplom
    const diplomCard = $('.card').filter((i, el) => $(el).text().toLowerCase().includes('diplom'));
    if (diplomCard.length > 0) {
        topic.diplom = {
            title: diplomCard.find('h2').text().trim(),
            questions: diplomCard.find('.quiz-box').map((i, qb) => {
                return {
                    id: $(qb).attr('data-id') || `${topicId}_diplom_${i}`,
                    question: $(qb).find('p strong').text().trim(),
                    answers: $(qb).find('button').map((j, btn) => {
                        const onclick = $(btn).attr('onclick') || "";
                        return {
                            text: $(btn).text().trim(),
                            correct: onclick.includes('true'),
                            pts: 5
                        };
                    }).get()
                };
            }).get()
        };
    }
    
    deData[topicId] = topic;

    // Extract JS and clean it
    const scripts = $('script').filter((i, el) => !$(el).attr('src') || !$(el).attr('src').includes('common.js'));
    let jsContent = `// Logic for ${filename}\n`;
    scripts.each((i, el) => {
        let text = $(el).text();
        // Remove common event listeners that might block execution in the new renderer
        text = text.replace(/document\.addEventListener\(['"]DOMContentLoaded['"],\s*(?:async\s*)?\(\)\s*=>\s*\{/g, '(async () => {');
        text = text.replace(/window\.onload\s*=\s*(?:async\s*)?\(\)\s*=>\s*\{/g, '(async () => {');
        jsContent += text + "\n";
    });
    if (!jsContent.includes('function topicInit')) jsContent += "\nfunction topicInit() {}\n";
    
    fs.writeFileSync(pathMod.join(targetJsDir, `${topicId}.js`), jsContent, 'utf8');
});

fs.writeFileSync(pathMod.join(targetLangDir, 'de.json'), JSON.stringify(deData, null, 2), 'utf8');
console.log(`Migration complete! Processed ${Object.keys(deData).length} topics.`);
