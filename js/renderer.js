// Topic renderer for learning and challenge modes.

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function stripQuestionNumber(question) {
    return String(question || "").replace(/^\s*\d+\.\s*/, "");
}

function extractHtmlIds(value) {
    const ids = new Set();
    const text = String(value || "");
    const pattern = /id\s*=\s*["']([^"']+)["']/g;
    let match;

    while ((match = pattern.exec(text)) !== null) {
        ids.add(match[1]);
    }

    return ids;
}

function extractTopicHtmlIds(topic) {
    const ids = new Set();
    if (!topic || !Array.isArray(topic.sections)) return ids;

    topic.sections.forEach(section => {
        extractHtmlIds(section.content).forEach(id => ids.add(id));
    });

    return ids;
}

function topicNeedsGermanInteractiveStructure(topic, germanTopic) {
    const germanIds = extractTopicHtmlIds(germanTopic);
    if (germanIds.size < 8) return false;

    const topicIds = extractTopicHtmlIds(topic);
    let missing = 0;
    germanIds.forEach(id => {
        if (!topicIds.has(id)) missing += 1;
    });

    return missing / germanIds.size > 0.35;
}

function topLevelStructuralBlocks(root) {
    const selector = ".interactive-zone, .diagram-box, .klima-map-stage";
    return Array.from(root.querySelectorAll(selector))
        .filter(block => !block.parentElement || !block.parentElement.closest(selector));
}

function syncInteractiveBlocks(content, germanContent) {
    if (!content || !germanContent || typeof document === "undefined") return content;

    const germanTemplate = document.createElement("template");
    germanTemplate.innerHTML = germanContent;
    const germanBlocks = topLevelStructuralBlocks(germanTemplate.content)
        .filter(block => extractHtmlIds(block.outerHTML).size > 0);
    if (!germanBlocks.length) return content;

    const template = document.createElement("template");
    template.innerHTML = content;
    let changed = false;

    germanBlocks.forEach((germanBlock, index) => {
        const requiredIds = extractHtmlIds(germanBlock.outerHTML);
        const currentIds = extractHtmlIds(template.innerHTML);
        const current = topLevelStructuralBlocks(template.content)[index];

        let hasCurrentBlock = true;
        requiredIds.forEach(id => {
            if (!currentIds.has(id)) hasCurrentBlock = false;
        });

        if (hasCurrentBlock) return;

        const clone = germanBlock.cloneNode(true);
        if (current) {
            current.replaceWith(clone);
        } else {
            const reference = template.content.querySelector(".climate-source-box, .teacher-note");
            if (reference && reference.parentNode) {
                reference.parentNode.insertBefore(clone, reference);
            } else {
                template.content.appendChild(clone);
            }
        }
        changed = true;
    });

    return changed ? template.innerHTML : content;
}

function withCurrentInteractiveStructure(topic, germanTopic) {
    if (!topic || !germanTopic || topic === germanTopic) return topic;

    if (topicNeedsGermanInteractiveStructure(topic, germanTopic)) {
        return {
            ...germanTopic,
            title: topic.title || germanTopic.title,
            subtitle: topic.subtitle || germanTopic.subtitle
        };
    }

    return {
        ...topic,
        sections: (topic.sections || []).map((section, index) => {
            const germanSection = germanTopic.sections && germanTopic.sections[index];
            if (!germanSection || !germanSection.content) return section;

            const content = syncInteractiveBlocks(section.content, germanSection.content);
            return content === section.content ? section : { ...section, content };
        })
    };
}

function collectChapterQuestions(topic) {
    if (Array.isArray(topic?.diplom?.questions) && topic.diplom.questions.length) {
        return topic.diplom.questions;
    }

    return (topic.sections || []).flatMap(section => section.quizzes || []).slice(0, 12);
}

async function renderTopic() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get("topic");
    const mode = params.get("mode") || "legacy";
    const lang = localStorage.getItem("physik_lang") || "de";
    const container = document.getElementById("sections-container");
    document.body.dataset.topicMode = mode;

    if (!topicId) {
        showError("Kein Thema ausgewaehlt.");
        return;
    }

    try {
        let response = await fetch(`../lang/${lang}.json?v=8.9`);
        let langData = await response.json();
        let topic = langData[topicId];
        let germanTopic = null;

        if (lang !== "de") {
            const deRes = await fetch("../lang/de.json?v=8.9");
            const deData = await deRes.json();
            germanTopic = deData[topicId];
        }

        if (!topic && germanTopic) topic = germanTopic;

        if (!topic) {
            showError(`Das Thema "${topicId}" wurde nicht gefunden.`);
            return;
        }

        if (germanTopic) topic = withCurrentInteractiveStructure(topic, germanTopic);

        document.title = topic.title;
        document.getElementById("topic-title").innerHTML = topic.title;
        document.getElementById("topic-subtitle").innerHTML = topic.subtitle || "";

        container.innerHTML = "";

        if (topicId.startsWith("math")) {
            document.body.classList.add("math-theme");
            if (mode !== "learn" && !["mathespiel", "math_kaenguru"].includes(topicId)) {
                const wsBtn = document.createElement("button");
                wsBtn.innerHTML = "Arbeitsbl&auml;tter zum &Uuml;ben drucken";
                wsBtn.className = "worksheet-btn";
                wsBtn.onclick = () => window.open(`worksheet.html?topic=${topicId}`, "_blank");
                container.appendChild(wsBtn);
            }
        } else {
            document.body.classList.remove("math-theme");
        }

        const topicQuizMap = new Map((topic.quizzes || []).map(q => [q.id, q]));

        function renderQuizBox(q, options = {}) {
            const isPractice = Boolean(options.practice);
            const handler = isPractice ? "handlePracticeAnswer" : "handleAnswer";
            const shuffledAnswers = shuffleArray([...(q.answers || [])]);
            return `
                <div class="quiz-box ${isPractice ? "practice-quiz" : ""}" data-id="${escapeHtmlAttr(q.id || "")}">
                    <p><strong>${q.question}</strong></p>
                    ${shuffledAnswers.map(ans => {
                        const pts = Number(ans.pts || q.pts || 0);
                        const feedback = escapeHtmlAttr(ans.feedback || "");
                        const clickArgs = isPractice
                            ? `this, ${Boolean(ans.correct)}, this.dataset.feedback || null`
                            : `this, ${Boolean(ans.correct)}, ${pts}, this.dataset.feedback || null`;
                        return `<button type="button" data-feedback="${feedback}" onclick="${handler}(${clickArgs})">${ans.text}</button>`;
                    }).join("")}
                    <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
                </div>
            `;
        }

        (topic.sections || []).forEach(section => {
            const card = document.createElement("div");
            card.className = "card";

            let html = `<h2>${section.title}</h2>`;
            let content = section.content || "";

            const sectionQuizMap = new Map((section.quizzes || []).map(q => [q.id, q]));
            content = content.replace(/\{\{QUIZ_([^}]+)\}\}/g, (placeholder, quizId) => {
                if (mode === "learn") return "";
                const quiz = sectionQuizMap.get(quizId) || topicQuizMap.get(quizId);
                if (!quiz) return "";
                return renderQuizBox(quiz, { practice: mode === "challenge" });
            });

            html += content;
            card.innerHTML = html;
            container.appendChild(card);
        });

        if (mode === "legacy" && topic.diplom) {
            const diplomCard = document.createElement("div");
            diplomCard.className = "card";
            diplomCard.style.border = "5px solid var(--primary)";

            let diplomHtml = `<h2 style="text-align: center; color: var(--primary);">${topic.diplom.title}</h2>`;
            diplomHtml += `<p style="text-align: center;">Zeige, was du gelernt hast!</p>`;

            topic.diplom.questions.forEach((q, index) => {
                const shuffledAnswers = shuffleArray([...(q.answers || [])]);
                diplomHtml += `
                    <div class="quiz-box" data-id="${escapeHtmlAttr(q.id || "")}">
                        <p><strong>${index + 1}. ${stripQuestionNumber(q.question)}</strong></p>
                        ${shuffledAnswers.map(ans => `
                            <button type="button" data-feedback="${escapeHtmlAttr(ans.feedback || "")}" onclick="handleAnswer(this, ${Boolean(ans.correct)}, ${Number(ans.pts || q.pts || 0)}, this.dataset.feedback || null)">${ans.text}</button>
                        `).join("")}
                        <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
                    </div>
                `;
            });
            diplomCard.innerHTML = diplomHtml;
            container.appendChild(diplomCard);
        }

        if (mode === "challenge") {
            const chapterQuestions = collectChapterQuestions(topic);
            const finalCard = document.createElement("div");
            finalCard.className = "card chapter-quiz-card";
            finalCard.innerHTML = `
                <h2>Kapitelquiz</h2>
                <p>Dieses Quiz entscheidet, ob das n&auml;chste Thema im Skillbaum freigeschaltet wird. &Uuml;bungsfragen im Kapitel geben keine Punkte.</p>
                <div id="chapter-quiz-slot"></div>
            `;
            container.appendChild(finalCard);
            if (typeof renderChapterQuizPanel === "function") {
                renderChapterQuizPanel(topicId, stripQuestionNumber(topic.title), chapterQuestions);
            }
        }

        if (typeof checkAnsweredStatus === "function") {
            checkAnsweredStatus();
        }

        if (topic.script !== false) {
            const script = document.createElement("script");
            script.src = `../js/topics/${topicId}.js?v=9.5`;
            script.async = false;
            script.onload = () => {
                if (typeof topicInit === "function") {
                    try {
                        topicInit();
                    } catch (error) {
                        console.error(`Error in topicInit for ${topicId}:`, error);
                    }
                }
            };
            document.body.appendChild(script);
        }
    } catch (error) {
        console.error("Render Error:", error);
        showError("Fehler beim Laden des Inhalts. Bitte &uuml;berpr&uuml;fe die Verbindung oder lade die Seite neu.");
    }
}

function showError(msg) {
    const container = document.getElementById("sections-container");
    container.innerHTML = `
        <div class="card" style="text-align: center; border-top: 4px solid #e53e3e;">
            <h2 style="color: #e53e3e;">Hoppla!</h2>
            <p>${msg}</p>
            <button onclick="location.reload()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Seite neu laden</button>
        </div>
    `;
}

function escapeHtmlAttr(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

window.addEventListener("message", event => {
    if (event.data.type === "themeChange") {
        if (event.data.isDark) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("physik_dark_mode") === "true") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    renderTopic();
});
