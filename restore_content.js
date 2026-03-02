const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const backupDir = 'C:/Users/Simon/Documents/Physik_Backup';
const targetLangDir = 'C:/Users/Simon/Documents/Physik Bay6/lang';
const targetJsDir = 'C:/Users/Simon/Documents/Physik Bay6/js/topics';

if (!fs.existsSync(targetLangDir)) fs.mkdirSync(targetLangDir, { recursive: true });
if (!fs.existsSync(targetJsDir)) fs.mkdirSync(targetJsDir, { recursive: true });

const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.html') && !f.includes('_') && f !== 'index.html');

let deData = {};

files.forEach(filename => {
    const filepath = path.join(backupDir, filename);
    const html = fs.readFileSync(filepath, 'utf8');
    const $ = cheerio.load(html);
    
    const topicId = filename.replace('.html', '');
    
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
        
        // Clone the card to manipulate it
        let $card = $(card).clone();
        $card.find('h2').remove();
        
        // Extract Quizzes and replace with placeholders to keep order
        $card.find('.quiz-box').each((j, qb) => {
            const qId = $(qb).attr('data-id') || `${topicId}_s${i}_q${j}`;
            section.quizzes.push({
                id: qId,
                question: $(qb).find('p strong').text().trim(),
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
        
        // The remaining HTML is the content (including interactive zones)
        section.content = $card.html();
        
        topic.sections.push(section);
    });
    
    // Diplom (handled as special card at the end)
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

    // Extract JS
    const scripts = $('script').filter((i, el) => !$(el).attr('src') || !$(el).attr('src').includes('common.js'));
    let jsContent = `// Logic for ${filename}\n`;
    scripts.each((i, el) => {
        jsContent += $(el).text() + "\n";
    });
    if (!jsContent.includes('function topicInit')) jsContent += "\nfunction topicInit() {}\n";
    
    fs.writeFileSync(path.join(targetJsDir, `${topicId}.js`), jsContent, 'utf8');
});

fs.writeFileSync(path.join(targetLangDir, 'de.json'), JSON.stringify(deData, null, 2), 'utf8');
console.log("Improved restoration complete!");
