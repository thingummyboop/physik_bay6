// Physik-Abenteuer Topic Renderer

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function stripQuestionNumber(question) {
    return String(question || '').replace(/^\s*\d+\.\s*/, '');
}

async function renderTopic() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    const lang = localStorage.getItem('physik_lang') || 'de';

    const container = document.getElementById('sections-container');

    if (!topicId) {
        showError("Kein Thema ausgewählt.");
        return;
    }

    try {
        // Fetch language data (added cache busting)
        let response = await fetch(`../lang/${lang}.json?v=3.7`);
        let langData = await response.json();
        let topic = langData[topicId];

        // Fallback to German
        if (!topic && lang !== 'de') {
            const deRes = await fetch(`../lang/de.json?v=3.7`);
            const deData = await deRes.json();
            topic = deData[topicId];
        }

        if (!topic) {
            showError(`Das Thema "${topicId}" wurde nicht gefunden.`);
            return;
        }

        document.title = topic.title;
        document.getElementById('topic-title').innerHTML = topic.title;
        document.getElementById('topic-subtitle').innerHTML = topic.subtitle;

        container.innerHTML = "";

        if (topicId.startsWith('math')) {
            document.body.classList.add('math-theme');
            const wsBtn = document.createElement('button');
            wsBtn.innerHTML = '🖨️ Arbeitsblätter zum Üben drucken';
            wsBtn.className = 'worksheet-btn';
            wsBtn.onclick = () => window.open('worksheet.html?topic=' + topicId, '_blank');
            container.appendChild(wsBtn);
        } else {
            document.body.classList.remove('math-theme');
        }

        topic.sections.forEach(section => {
            const card = document.createElement('div');
            card.className = "card";
            
            let html = `<h2>${section.title}</h2>`;
            let content = section.content;

            // Replace Quiz Placeholders
            if (section.quizzes) {
                section.quizzes.forEach(q => {
                    // LIVE SHUFFLE: Randomize answers every time
                    const shuffledAnswers = shuffleArray([...q.answers]);
                    
                    const quizHtml = `
                        <div class="quiz-box" data-id="${q.id}">
                            <p><strong>${q.question}</strong></p>
                            ${shuffledAnswers.map(ans => `
                                <button onclick="handleAnswer(this, ${ans.correct}, ${ans.pts})">${ans.text}</button>
                            `).join('')}
                            <p class="feedback" aria-live="polite"></p>
                        </div>
                    `;
                    content = content.replace(`{{QUIZ_${q.id}}}`, quizHtml);
                });
            }

            html += content;
            card.innerHTML = html;
            container.appendChild(card);
        });

        // Diplom
        if (topic.diplom) {
            const diplomCard = document.createElement('div');
            diplomCard.className = "card";
            diplomCard.style.border = "5px solid var(--primary)";
            
            let diplomHtml = `<h2 style="text-align: center; color: var(--primary);">🎓 ${topic.diplom.title}</h2>`;
            diplomHtml += `<p style="text-align: center;">Zeige, was du gelernt hast!</p>`;
            
            topic.diplom.questions.forEach((q, i) => {
                // LIVE SHUFFLE: Randomize diplom answers too
                const shuffledAnswers = shuffleArray([...q.answers]);
                
                diplomHtml += `
                    <div class="quiz-box" data-id="${q.id}">
                        <p><strong>${i+1}. ${stripQuestionNumber(q.question)}</strong></p>
                        ${shuffledAnswers.map(ans => `
                            <button onclick="handleAnswer(this, ${ans.correct}, ${ans.pts})">${ans.text}</button>
                        `).join('')}
                        <p class="feedback" aria-live="polite"></p>
                    </div>
                `;
            });
            diplomCard.innerHTML = diplomHtml;
            container.appendChild(diplomCard);
        }

        // Check which questions are already solved
        if (typeof checkAnsweredStatus === 'function') {
            checkAnsweredStatus();
        }

        // Load Script
        const script = document.createElement('script');
        script.src = `../js/topics/${topicId}.js?v=3.7`;
        script.async = false;
        script.onload = () => {
            if (typeof topicInit === 'function') {
                try {
                    topicInit();
                } catch (e) {
                    console.error(`Error in topicInit for ${topicId}:`, e);
                }
            }
        };
        document.body.appendChild(script);

    } catch (e) {
        console.error("Render Error:", e);
        showError("Fehler beim Laden des Inhalts. Bitte überprüfe deine Internetverbindung.");
    }
}

function showError(msg) {
    const container = document.getElementById('sections-container');
    container.innerHTML = `
        <div class="card" style="text-align: center; border-top: 4px solid #e53e3e;">
            <h2 style="color: #e53e3e;">⚠️ Hoppla!</h2>
            <p>${msg}</p>
            <button onclick="location.reload()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Seite neu laden</button>
        </div>
    `;
}

// Listen for theme changes from parent
window.addEventListener('message', (e) => {
    if (e.data.type === 'themeChange') {
        if (e.data.isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Sync initial theme
    if (localStorage.getItem('physik_dark_mode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    renderTopic();
});
