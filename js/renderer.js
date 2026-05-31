// Physik-Abenteuer Topic Renderer
const UI_TRANSLATIONS = {
    en: {
        "Kapitelquiz": "Chapter quiz",
        "Übung": "Practice",
        "Für dieses Kapitel wird das Kapitelquiz gerade vorbereitet. Die Übungen im Text bleiben zum Trainieren sichtbar.": "The chapter quiz for this chapter is being prepared. The practice tasks in the text remain visible for training.",
        "Dieses Kapitelquiz wird freigeschaltet, sobald du das vorherige Kapitelquiz bestanden hast.": "This chapter quiz unlocks after you pass the previous chapter quiz.",
        "Ein weiterer Versuch füllt sich in": "Another attempt refills in",
        "Versuchen verfügbar": "attempts available",
        "Hier zählt nur dein Verständnis. Du kannst im Quiz alle Antworten ändern und gibst erst am Ende ab. Ab mehr als 70% gilt das Kapitel als geschafft.": "Only your understanding counts here. You can change all answers before submitting. More than 70% means the chapter is passed.",
        "Aufgaben": "tasks",
        "bestanden": "passed",
        "Für 25 Punkte einen Versuch auffüllen": "Refill one attempt for 25 points",
        "Kapitelquiz öffnen": "Open chapter quiz",
        "Die Lerninhalte sind während des Tests ausgeblendet. Lies genau, wähle deine Antworten und gib erst ab, wenn du fertig bist.": "The learning content is hidden during the test. Read carefully, choose your answers, and submit only when you are finished.",
        "Zurück zum Kapitel": "Back to chapter",
        "Abgeben": "Submit",
        "Kein Thema ausgewählt.": "No topic selected.",
        "Arbeitsblätter zum Üben drucken": "Print practice worksheets",
        "Fehler beim Laden des Inhalts. Bitte überprüfe deine Internetverbindung.": "Error loading the content. Please check your internet connection.",
        "Bitte beantworte zuerst Aufgabe": "Please answer task",
        "Du kannst deine Antworten vor der Abgabe noch ändern.": "You can still change your answers before submitting.",
        "Richtig": "Correct",
        "Noch nicht": "Not yet",
        "Bestanden": "Passed",
        "Noch nicht bestanden": "Not passed yet",
        "Das nächste Kapitelquiz ist jetzt freigeschaltet.": "The next chapter quiz is now unlocked.",
        "Du brauchst mehr als 70%. Übrige Versuche:": "You need more than 70%. Attempts left:",
        "Noch einmal lernen": "Study again",
        "Neuen Versuch starten": "Start a new attempt"
    },
    ar: {
        "Kapitelquiz": "اختبار الفصل",
        "Übung": "تدريب",
        "Aufgaben": "مهام",
        "bestanden": "تم النجاح",
        "Kapitelquiz öffnen": "افتح اختبار الفصل",
        "Zurück zum Kapitel": "العودة إلى الفصل",
        "Abgeben": "إرسال",
        "Kein Thema ausgewählt.": "لم يتم اختيار موضوع.",
        "Arbeitsblätter zum Üben drucken": "طباعة أوراق تدريب",
        "Richtig": "صحيح",
        "Noch nicht": "ليس بعد",
        "Bestanden": "تم النجاح",
        "Noch nicht bestanden": "لم يتم النجاح بعد",
        "Noch einmal lernen": "تعلّم مرة أخرى",
        "Neuen Versuch starten": "بدء محاولة جديدة"
    },
    uk: {
        "Kapitelquiz": "Тест до розділу",
        "Übung": "Вправа",
        "Aufgaben": "завдань",
        "bestanden": "складено",
        "Kapitelquiz öffnen": "Відкрити тест",
        "Zurück zum Kapitel": "Назад до розділу",
        "Abgeben": "Здати",
        "Kein Thema ausgewählt.": "Тему не вибрано.",
        "Arbeitsblätter zum Üben drucken": "Надрукувати вправи",
        "Richtig": "Правильно",
        "Noch nicht": "Ще ні",
        "Bestanden": "Складено",
        "Noch nicht bestanden": "Ще не складено",
        "Noch einmal lernen": "Повчитися ще",
        "Neuen Versuch starten": "Почати нову спробу"
    },
    sr: {
        "Kapitelquiz": "Квиз поглавља",
        "Übung": "Вежба",
        "Aufgaben": "задатака",
        "bestanden": "положено",
        "Kapitelquiz öffnen": "Отвори квиз",
        "Zurück zum Kapitel": "Назад на поглавље",
        "Abgeben": "Предај",
        "Kein Thema ausgewählt.": "Није изабрана тема.",
        "Arbeitsblätter zum Üben drucken": "Одштампај вежбе",
        "Richtig": "Тачно",
        "Noch nicht": "Још не",
        "Bestanden": "Положено",
        "Noch nicht bestanden": "Још није положено",
        "Noch einmal lernen": "Поново учи",
        "Neuen Versuch starten": "Покрени нови покушај"
    },
    tr: {
        "Kapitelquiz": "Bölüm testi",
        "Übung": "Alıştırma",
        "Aufgaben": "görev",
        "bestanden": "geçildi",
        "Kapitelquiz öffnen": "Bölüm testini aç",
        "Zurück zum Kapitel": "Bölüme dön",
        "Abgeben": "Teslim et",
        "Kein Thema ausgewählt.": "Konu seçilmedi.",
        "Arbeitsblätter zum Üben drucken": "Alıştırma kağıtlarını yazdır",
        "Richtig": "Doğru",
        "Noch nicht": "Henüz değil",
        "Bestanden": "Geçildi",
        "Noch nicht bestanden": "Henüz geçilmedi",
        "Noch einmal lernen": "Tekrar çalış",
        "Neuen Versuch starten": "Yeni deneme başlat"
    }
};

function uiText(text) {
    const lang = localStorage.getItem('physik_lang') || 'de';
    return (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][text]) || text;
}

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

function extractHtmlIds(value) {
    const ids = new Set();
    const text = String(value || '');
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
        let current = topLevelStructuralBlocks(template.content)[index];

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

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function isCorrectAnswer(answer) {
    return answer && (answer.correct === true || answer.correct === 'true');
}

function cleanQuestionText(question) {
    return stripQuestionNumber(String(question || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function normalizeQuizQuestion(q, source, index) {
    if (!q || !Array.isArray(q.answers) || q.answers.length < 2) return null;
    const question = cleanQuestionText(q.question);
    if (!question) return null;

    const answers = q.answers
        .filter(ans => ans && ans.text)
        .map(ans => ({
            text: String(ans.text),
            correct: isCorrectAnswer(ans),
            feedback: ans.feedback ? String(ans.feedback) : ''
        }));

    if (answers.length < 2 || !answers.some(ans => ans.correct)) return null;

    return {
        id: String(q.id || `${source}_${index}`),
        source,
        question,
        answers
    };
}

function collectChapterQuizQuestions(topic) {
    const seen = new Set();
    const addUnique = (list, q) => {
        if (!q) return;
        const key = `${q.question.toLowerCase()}|${q.answers.map(ans => ans.text.toLowerCase()).join('|')}`;
        if (seen.has(key)) return;
        seen.add(key);
        list.push(q);
    };

    const sectionQuestions = [];
    (topic.sections || []).forEach((section, sectionIndex) => {
        (section.quizzes || []).forEach((q, quizIndex) => {
            addUnique(sectionQuestions, normalizeQuizQuestion(q, `section_${sectionIndex}`, quizIndex));
        });
    });

    const topicQuestions = [];
    (topic.quizzes || []).forEach((q, quizIndex) => {
        addUnique(topicQuestions, normalizeQuizQuestion(q, 'topic', quizIndex));
    });

    const diplomQuestions = [];
    ((topic.diplom && topic.diplom.questions) || []).forEach((q, quizIndex) => {
        addUnique(diplomQuestions, normalizeQuizQuestion(q, 'chapter', quizIndex));
    });

    const combined = [...diplomQuestions, ...sectionQuestions, ...topicQuestions];
    return combined.slice(0, 12);
}

function readChapterQuizResults() {
    try {
        return JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results') || '{}');
    } catch (error) {
        return {};
    }
}

function writeChapterQuizResults(results) {
    localStorage.setItem('sciverse_chapter_quiz_results', JSON.stringify(results || {}));
}

const CHAPTER_QUIZ_MAX_ATTEMPTS = 3;
const CHAPTER_QUIZ_REFILL_MS = 12 * 60 * 60 * 1000;

function clampChapterAttempts(value) {
    return Math.min(CHAPTER_QUIZ_MAX_ATTEMPTS, Math.max(0, Number(value) || 0));
}

function getChapterQuizResult(topicId) {
    const results = readChapterQuizResults();
    const result = results[topicId] || { attemptsUsed: 0, attempts: 0, passed: false, bestPercent: 0 };
    const now = Date.now();
    let attemptsUsed = clampChapterAttempts(result.attemptsUsed ?? result.attempts ?? 0);
    let lastAttemptAt = Number(result.lastAttemptAt || 0);
    let changed = false;

    if (!lastAttemptAt && attemptsUsed > 0) {
        lastAttemptAt = now;
        changed = true;
    }

    if (!result.passed && attemptsUsed > 0 && lastAttemptAt > 0) {
        const restored = Math.floor(Math.max(0, now - lastAttemptAt) / CHAPTER_QUIZ_REFILL_MS);
        if (restored > 0) {
            attemptsUsed = Math.max(0, attemptsUsed - restored);
            lastAttemptAt = attemptsUsed > 0 ? lastAttemptAt + restored * CHAPTER_QUIZ_REFILL_MS : 0;
            changed = true;
        }
    }

    const availableAttempts = Math.max(0, CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed);
    result.attemptsUsed = attemptsUsed;
    result.attempts = attemptsUsed;
    result.availableAttempts = availableAttempts;
    result.lastAttemptAt = lastAttemptAt;
    result.nextRefillAt = attemptsUsed > 0 ? lastAttemptAt + CHAPTER_QUIZ_REFILL_MS : 0;
    result.fullRefillAt = attemptsUsed > 0 ? lastAttemptAt + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0;
    if (result.lockUntil) {
        result.lockUntil = 0;
        changed = true;
    }

    if (changed) {
        results[topicId] = result;
        writeChapterQuizResults(results);
    }
    return result;
}

function formatWaitTime(timestamp) {
    const remaining = Math.max(0, Number(timestamp || 0) - Date.now());
    const minutes = Math.ceil(remaining / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.ceil(minutes / 60);
    return `${hours} h`;
}

function unlockChapterQuizWithPlus() {
    const quiz = window.currentChapterQuiz;
    if (!quiz) return;
    const result = getChapterQuizResult(quiz.topicId);
    if (result.passed || Number(result.availableAttempts || 0) > 0) return;

    const cost = 25;
    if (globalPhysikScore < cost) {
        alert(`Du brauchst ${cost} Punkte, um sofort einen Versuch aufzufüllen.`);
        return;
    }

    globalPhysikScore -= cost;
    localStorage.setItem('physik_score', globalPhysikScore);
    if (typeof updateScoreDisplays === 'function') updateScoreDisplays();

    const attemptsUsed = Math.max(0, clampChapterAttempts(result.attemptsUsed) - 1);
    const now = Date.now();
    const results = readChapterQuizResults();
    results[quiz.topicId] = {
        ...result,
        attemptsUsed,
        attempts: attemptsUsed,
        availableAttempts: CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed,
        lastAttemptAt: attemptsUsed > 0 ? now : 0,
        nextRefillAt: attemptsUsed > 0 ? now + CHAPTER_QUIZ_REFILL_MS : 0,
        fullRefillAt: attemptsUsed > 0 ? now + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0,
        lockUntil: 0
    };
    writeChapterQuizResults(results);
    location.reload();
}

function getTopicSequence(topicId) {
    const curriculum = (window.parent && window.parent.SCIVERSE_CURRICULUM) || window.SCIVERSE_CURRICULUM;
    if (!curriculum) return null;

    for (const subject of Object.values(curriculum)) {
        const topics = (subject.topics || []).filter(topic => topic && topic.available !== false);
        const index = topics.findIndex(topic => topic.id === topicId);
        if (index >= 0) return { topics, index };
    }
    return null;
}

function isChapterQuizUnlocked(topicId) {
    const sequence = getTopicSequence(topicId);
    if (!sequence || sequence.index <= 0) return true;

    const previous = sequence.topics[sequence.index - 1];
    if (!previous) return true;

    if (getChapterQuizResult(previous.id).passed) return true;
    try {
        const topicScores = JSON.parse(localStorage.getItem('physik_topic_scores') || '{}');
        return Number(topicScores[previous.id] || 0) > 70;
    } catch (error) {
        return false;
    }
}

function renderPracticeBox(q) {
    const normalized = normalizeQuizQuestion(q, 'practice', 0);
    if (!normalized) return '';
    const shuffledAnswers = shuffleArray([...normalized.answers]);

    return `
        <div class="practice-box" data-id="${escapeHtmlAttr(normalized.id)}">
            <p class="practice-label">${uiText('Übung')}</p>
            <p><strong>${escapeHtml(normalized.question)}</strong></p>
            ${shuffledAnswers.map(ans => `
                <button type="button" data-feedback="${escapeHtmlAttr(ans.feedback || '')}" onclick="handlePracticeAnswer(this, ${ans.correct}, this.dataset.feedback || null)">${escapeHtml(ans.text)}</button>
            `).join('')}
            <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
        </div>
    `;
}

function renderChapterQuizCard(topicId, topic, questions) {
    const result = getChapterQuizResult(topicId);
    const unlocked = isChapterQuizUnlocked(topicId);
    const attemptsAvailable = result.passed
        ? CHAPTER_QUIZ_MAX_ATTEMPTS
        : Math.max(0, Number(result.availableAttempts ?? (CHAPTER_QUIZ_MAX_ATTEMPTS - Number(result.attempts || 0))));
    const attemptsUsed = clampChapterAttempts(result.attemptsUsed ?? result.attempts ?? 0);
    const needsRefill = !result.passed && attemptsAvailable <= 0;

    if (!questions.length) {
        return `
            <div class="card chapter-quiz-card">
                <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
                <h2>Verständnischeck</h2>
                <p>${uiText('Für dieses Kapitel wird das Kapitelquiz gerade vorbereitet. Die Übungen im Text bleiben zum Trainieren sichtbar.')}</p>
            </div>
        `;
    }

    const lockText = !unlocked
        ? uiText('Dieses Kapitelquiz wird freigeschaltet, sobald du das vorherige Kapitelquiz bestanden hast.')
        : needsRefill
            ? `Du hast gerade keinen Versuch frei. Ein neuer Versuch kommt in ${formatWaitTime(result.nextRefillAt)} zurück. Wenn du nicht weiter probierst, sind in ${formatWaitTime(result.fullRefillAt)} wieder alle 3 Versuche verfügbar.`
            : (!result.passed && attemptsUsed > 0 && result.nextRefillAt)
                ? `${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(result.nextRefillAt)}.`
                : '';

    const buttonDisabled = !unlocked || needsRefill;
    const status = result.passed
        ? `Bestanden: ${Math.round(result.bestPercent || 0)}%`
        : `${attemptsAvailable} / ${CHAPTER_QUIZ_MAX_ATTEMPTS} ${uiText('Versuchen verfügbar')}`;

    return `
        <div class="card chapter-quiz-card" id="chapter-quiz-card">
            <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
            <h2>${escapeHtml(topic.chapterQuizTitle || 'Verständnischeck zum Kapitel')}</h2>
            <p>${uiText('Hier zählt nur dein Verständnis. Du kannst im Quiz alle Antworten ändern und gibst erst am Ende ab. Ab mehr als 70% gilt das Kapitel als geschafft.')}</p>
            <div class="chapter-quiz-meta">
                <span>${escapeHtml(status)}</span>
                <span>${questions.length} ${uiText('Aufgaben')}</span>
            </div>
            ${lockText ? `<p class="chapter-lock">${escapeHtml(lockText)}</p>` : ''}
            ${needsRefill ? `<button type="button" onclick="unlockChapterQuizWithPlus()">${uiText('Für 25 Punkte einen Versuch auffüllen')}</button>` : ''}
            <button id="chapter-quiz-launch" type="button" onclick="startChapterQuiz()" ${buttonDisabled ? 'disabled' : ''}>${uiText('Kapitelquiz öffnen')}</button>
        </div>
    `;
}

function renderChapterQuizPanel(topicId, topic, questions) {
    const questionHtml = questions.map((q, questionIndex) => {
        const answers = shuffleArray(q.answers.map((ans, originalIndex) => ({ ...ans, originalIndex })));
        return `
            <fieldset class="chapter-question" data-question-index="${questionIndex}">
                <legend>${questionIndex + 1}. ${escapeHtml(q.question)}</legend>
                <div class="chapter-options">
                    ${answers.map(ans => `
                        <label>
                            <input type="radio" name="chapter_q_${questionIndex}" value="${ans.originalIndex}">
                            <span>${escapeHtml(ans.text)}</span>
                        </label>
                    `).join('')}
                </div>
            </fieldset>
        `;
    }).join('');

    return `
        <div id="chapter-quiz-panel" class="chapter-quiz-panel" hidden>
            <div class="chapter-quiz-panel-header">
                <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
                <h1>${escapeHtml(topic.title || uiText('Kapitelquiz'))}</h1>
                <p>${uiText('Die Lerninhalte sind während des Tests ausgeblendet. Lies genau, wähle deine Antworten und gib erst ab, wenn du fertig bist.')}</p>
            </div>
            <form id="chapter-quiz-form">
                ${questionHtml}
                <div class="chapter-quiz-actions">
                    <button type="button" onclick="closeChapterQuiz()">${uiText('Zurück zum Kapitel')}</button>
                    <button type="button" class="chapter-submit-btn" onclick="submitChapterQuiz()">${uiText('Abgeben')}</button>
                </div>
            </form>
            <div id="chapter-quiz-result" class="chapter-result" role="status" aria-live="polite"></div>
        </div>
    `;
}

async function renderTopic() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    const lang = localStorage.getItem('physik_lang') || 'de';

    const container = document.getElementById('sections-container');

    if (!topicId) {
        showError(uiText("Kein Thema ausgewählt."));
        return;
    }

    try {
        // Fetch language data (added cache busting)
        let response = await fetch(`../lang/${lang}.json?v=7.9`);
        let langData = await response.json();
        let topic = langData[topicId];
        let germanTopic = null;

        if (lang !== 'de') {
            const deRes = await fetch(`../lang/de.json?v=7.9`);
            const deData = await deRes.json();
            germanTopic = deData[topicId];
        }

        // Fallback to German
        if (!topic && germanTopic) {
            topic = germanTopic;
        }

        if (!topic) {
            showError(`Das Thema "${topicId}" wurde nicht gefunden.`);
            return;
        }

        if (germanTopic) {
            topic = withCurrentInteractiveStructure(topic, germanTopic);
        }

        document.title = topic.title;
        document.getElementById('topic-title').innerHTML = topic.title;
        document.getElementById('topic-subtitle').innerHTML = topic.subtitle;

        container.innerHTML = "";

        if (topicId.startsWith('math')) {
            document.body.classList.add('math-theme');
            if (!['mathespiel', 'math_kaenguru'].includes(topicId)) {
                const wsBtn = document.createElement('button');
                wsBtn.innerHTML = `🖨️ ${uiText('Arbeitsblätter zum Üben drucken')}`;
                wsBtn.className = 'worksheet-btn';
                wsBtn.onclick = () => window.open('worksheet.html?topic=' + topicId, '_blank');
                container.appendChild(wsBtn);
            }
        } else {
            document.body.classList.remove('math-theme');
        }

        const topicQuizMap = new Map((topic.quizzes || []).map(q => [q.id, q]));
        const chapterQuestions = collectChapterQuizQuestions(topic);
        let practiceCount = 0;
        const configuredPracticeLimit = Number(topic.inlinePracticeLimit);
        const maxInlinePractice = Number.isFinite(configuredPracticeLimit)
            ? Math.max(0, configuredPracticeLimit)
            : Math.min(5, Math.max(2, (topic.sections || []).length));

        topic.sections.forEach(section => {
            const card = document.createElement('div');
            card.className = "card";
            
            let html = `<h2>${section.title}</h2>`;
            let content = section.content;
            const sectionQuizMap = new Map((section.quizzes || []).map(q => [q.id, q]));

            // Replace quiz placeholders from old section quizzes and newer topic-level quizzes.
            content = content.replace(/\{\{QUIZ_([^}]+)\}\}/g, (match, quizId) => {
                const q = sectionQuizMap.get(quizId) || topicQuizMap.get(quizId);
                if (!q || practiceCount >= maxInlinePractice) return '';
                practiceCount += 1;
                return renderPracticeBox(q);
            });

            html += content;
            card.innerHTML = html;
            container.appendChild(card);
        });

        // The old diploma quiz renderer is kept inactive while chapter quizzes use the new test flow.
        if (false && topic.diplom) {
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
                            <button type="button" data-feedback="${escapeHtmlAttr(ans.feedback || '')}" onclick="handleAnswer(this, ${ans.correct}, ${ans.pts}, this.dataset.feedback || null)">${ans.text}</button>
                        `).join('')}
                        <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
                    </div>
                `;
            });
            diplomCard.innerHTML = diplomHtml;
            container.appendChild(diplomCard);
        }

        const quizWrapper = document.createElement('div');
        quizWrapper.innerHTML = renderChapterQuizCard(topicId, topic, chapterQuestions) + renderChapterQuizPanel(topicId, topic, chapterQuestions);
        container.appendChild(quizWrapper);
        window.currentChapterQuiz = { topicId, topicTitle: topic.title, questions: chapterQuestions };

        // Check which questions are already solved
        if (typeof checkAnsweredStatus === 'function') {
            checkAnsweredStatus();
        }

        // Load optional topic script
        if (topic.script !== false) {
            const script = document.createElement('script');
            script.src = `../js/topics/${topicId}.js?v=8.6`;
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
        }

    } catch (e) {
        console.error("Render Error:", e);
        showError(uiText("Fehler beim Laden des Inhalts. Bitte überprüfe deine Internetverbindung."));
    }
}

function setLearningContentVisible(isVisible) {
    ['topic-title', 'topic-subtitle', 'score-board'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = !isVisible;
    });

    document.querySelectorAll('#sections-container > .card, #sections-container > .worksheet-btn, #chapter-quiz-card')
        .forEach(el => {
            el.hidden = !isVisible;
        });
}

function startChapterQuiz() {
    const quiz = window.currentChapterQuiz;
    if (!quiz || !quiz.questions || !quiz.questions.length) return;
    if (!isChapterQuizUnlocked(quiz.topicId)) return;

    const result = getChapterQuizResult(quiz.topicId);
    if (!result.passed && Number(result.availableAttempts || 0) <= 0) return;

    const panel = document.getElementById('chapter-quiz-panel');
    if (!panel) return;

    setLearningContentVisible(false);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeChapterQuiz() {
    const panel = document.getElementById('chapter-quiz-panel');
    if (panel) panel.hidden = true;
    setLearningContentVisible(true);
    const card = document.getElementById('chapter-quiz-card');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitChapterQuiz() {
    const quiz = window.currentChapterQuiz;
    const form = document.getElementById('chapter-quiz-form');
    const resultBox = document.getElementById('chapter-quiz-result');
    if (!quiz || !form || !resultBox) return;

    const previousResult = getChapterQuizResult(quiz.topicId);
    if (!previousResult.passed && Number(previousResult.availableAttempts || 0) <= 0) {
        resultBox.innerHTML = `<p class="wrong">${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(previousResult.nextRefillAt)}.</p>`;
        return;
    }

    const answers = quiz.questions.map((q, index) => {
        const selected = form.querySelector(`input[name="chapter_q_${index}"]:checked`);
        return selected ? Number(selected.value) : null;
    });

    const firstMissing = answers.findIndex(value => value === null);
    if (firstMissing >= 0) {
        resultBox.innerHTML = `<p class="wrong">${uiText('Bitte beantworte zuerst Aufgabe')} ${firstMissing + 1}. ${uiText('Du kannst deine Antworten vor der Abgabe noch ändern.')}</p>`;
        return;
    }

    let correct = 0;
    const details = quiz.questions.map((q, index) => {
        const selectedAnswer = q.answers[answers[index]];
        const isCorrect = Boolean(selectedAnswer && selectedAnswer.correct);
        if (isCorrect) correct += 1;
        return { question: q, selectedAnswer, isCorrect };
    });

    const percent = Math.round((correct / quiz.questions.length) * 100);
    const passed = percent > 70;
    const now = Date.now();
    const attemptsUsed = previousResult.passed
        ? clampChapterAttempts(previousResult.attemptsUsed ?? previousResult.attempts ?? 0)
        : clampChapterAttempts((previousResult.attemptsUsed ?? previousResult.attempts ?? 0) + 1);
    const lastAttemptAt = previousResult.passed ? Number(previousResult.lastAttemptAt || 0) : now;
    const results = readChapterQuizResults();
    const nextResult = {
        ...previousResult,
        attemptsUsed,
        attempts: attemptsUsed,
        availableAttempts: CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed,
        lastAttemptAt,
        nextRefillAt: attemptsUsed > 0 ? lastAttemptAt + CHAPTER_QUIZ_REFILL_MS : 0,
        fullRefillAt: attemptsUsed > 0 ? lastAttemptAt + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0,
        lockUntil: 0,
        passed: Boolean(previousResult.passed || passed),
        bestPercent: Math.max(Number(previousResult.bestPercent || 0), percent),
        lastPercent: percent,
        lastCorrect: correct,
        total: quiz.questions.length
    };
    results[quiz.topicId] = nextResult;
    writeChapterQuizResults(results);

    let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores') || '{}');
    const oldTopicScore = Number(topicScores[quiz.topicId] || 0);
    const newTopicScore = Math.max(oldTopicScore, nextResult.passed ? nextResult.bestPercent : 0);
    if (newTopicScore > oldTopicScore) {
        topicScores[quiz.topicId] = newTopicScore;
        localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));
        globalPhysikScore += Math.round(newTopicScore - oldTopicScore);
        localStorage.setItem('physik_score', globalPhysikScore);
        if (typeof updateScoreDisplays === 'function') updateScoreDisplays();
    }

    form.querySelectorAll('input').forEach(input => input.disabled = true);
    const submitButton = form.querySelector('.chapter-submit-btn');
    if (submitButton) submitButton.disabled = true;

    const attemptsLeft = Math.max(0, CHAPTER_QUIZ_MAX_ATTEMPTS - nextResult.attemptsUsed);
    const detailHtml = details.slice(0, 4).map((detail, index) => `
        <li>
            <strong>${index + 1}.</strong>
            ${detail.isCorrect ? uiText('Richtig') : uiText('Noch nicht')}${detail.selectedAnswer && detail.selectedAnswer.feedback ? `: ${escapeHtml(detail.selectedAnswer.feedback)}` : ''}
        </li>
    `).join('');

    resultBox.innerHTML = `
        <div class="${passed ? 'chapter-passed' : 'chapter-failed'}">
            <h2>${passed ? uiText('Bestanden') : uiText('Noch nicht bestanden')}</h2>
            <p>${correct} von ${quiz.questions.length} richtig: <strong>${percent}%</strong>.</p>
            <p>${passed ? uiText('Das nächste Kapitelquiz ist jetzt freigeschaltet.') : attemptsLeft > 0 ? `${uiText('Du brauchst mehr als 70%. Übrige Versuche:')} ${attemptsLeft}.` : `${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(nextResult.nextRefillAt)}.`}</p>
            ${detailHtml ? `<ul>${detailHtml}</ul>` : ''}
            <div class="chapter-quiz-actions">
                <button type="button" onclick="location.reload()">${passed ? uiText('Zurück zum Kapitel') : uiText('Noch einmal lernen')}</button>
                ${!passed && attemptsLeft > 0 ? `<button type="button" onclick="location.reload();">${uiText('Neuen Versuch starten')}</button>` : ''}
            </div>
        </div>
    `;
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

function escapeHtmlAttr(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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
