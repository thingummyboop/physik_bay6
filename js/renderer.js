// Physik-Abenteuer Topic Renderer
async function renderTopic() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    const lang = localStorage.getItem('physik_lang') || 'de';

    if (!topicId) {
        document.body.innerHTML = "<h1>Fehler: Kein Thema ausgewählt.</h1>";
        return;
    }

    try {
        let response = await fetch(`../lang/${lang}.json`);
        let langData = await response.json();
        let topic = langData[topicId];

        // Fallback to German
        if (!topic && lang !== 'de') {
            const deRes = await fetch(`../lang/de.json`);
            const deData = await deRes.json();
            topic = deData[topicId];
        }

        if (!topic) {
            document.body.innerHTML = `<h1>Fehler: Thema "${topicId}" nicht gefunden.</h1>`;
            return;
        }

        document.title = topic.title;
        document.getElementById('topic-title').innerHTML = topic.title;
        document.getElementById('topic-subtitle').innerHTML = topic.subtitle;

        const container = document.getElementById('sections-container');
        container.innerHTML = "";

        topic.sections.forEach(section => {
            const card = document.createElement('div');
            card.className = "card";
            
            let html = `<h2>${section.title}</h2>`;
            let content = section.content;

            // Replace Quiz Placeholders
            if (section.quizzes) {
                section.quizzes.forEach(q => {
                    const quizHtml = `
                        <div class="quiz-box" data-id="${q.id}">
                            <p><strong>${q.question}</strong></p>
                            ${q.answers.map(ans => `
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
                diplomHtml += `
                    <div class="quiz-box" data-id="${q.id}">
                        <p><strong>${i+1}. ${q.question}</strong></p>
                        ${q.answers.map(ans => `
                            <button onclick="handleAnswer(this, ${ans.correct}, ${ans.pts})">${ans.text}</button>
                        `).join('')}
                        <p class="feedback" aria-live="polite"></p>
                    </div>
                `;
            });
            diplomCard.innerHTML = diplomHtml;
            container.appendChild(diplomCard);
        }

        // Load Script
        const script = document.createElement('script');
        script.src = `../js/topics/${topicId}.js?v=${Date.now()}`;
        script.async = false; // Ensure execution order
        script.onload = () => {
            console.log(`Script loaded: ${topicId}`);
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
        document.body.innerHTML = "<h1>Fehler beim Laden des Themas.</h1>";
    }
}

document.addEventListener('DOMContentLoaded', renderTopic);
