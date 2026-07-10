// Shared topic logic: legacy points, practice questions, and challenge quizzes.
const TOPIC_PARAMS = new URLSearchParams(window.location.search);
const ROUTED_TOPIC = /^(learn|challenge):(.+)$/.exec(TOPIC_PARAMS.get("topic") || "");
const TOPIC_ID = ROUTED_TOPIC ? ROUTED_TOPIC[2] : (TOPIC_PARAMS.get("topic") || "unknown");
const TOPIC_MODE = TOPIC_PARAMS.get("mode") || ROUTED_TOPIC?.[1] || "legacy";
const IS_LEARN_MODE = TOPIC_MODE === "learn";
const IS_CHALLENGE_MODE = TOPIC_MODE === "challenge";

const COINS_KEY = "learning_coins";
const COMPLETED_KEY = "challenge_completed_topics";
const CHAPTER_STATE_KEY = "chapter_quiz_state";
const LEGACY_ANSWERED_KEY = "physik_answered";
const LEGACY_FAILED_KEY = "physik_failed_once";
const PRACTICE_ANSWERED_KEY = "practice_answered";
const PRACTICE_FAILED_KEY = "practice_failed_once";

if (localStorage.getItem("physik_dark_mode") === "true") {
    document.documentElement.setAttribute("data-theme", "dark");
}

let globalPhysikScore = parseInt(localStorage.getItem("physik_score"), 10) || 0;
let answered = new Set();
let failedOnce = new Set();
let practiceAnswered = new Set();
let practiceFailedOnce = new Set();

function readSet(key) {
    try {
        return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (error) {
        return new Set();
    }
}

function writeSet(key, setValue) {
    localStorage.setItem(key, JSON.stringify(Array.from(setValue)));
}

function loadFromStorage() {
    answered = readSet(LEGACY_ANSWERED_KEY);
    failedOnce = readSet(LEGACY_FAILED_KEY);
    practiceAnswered = readSet(PRACTICE_ANSWERED_KEY);
    practiceFailedOnce = readSet(PRACTICE_FAILED_KEY);
}

loadFromStorage();

function playSuccessSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (error) {
        // Audio is optional.
    }
}

function updateScoreDisplays() {
    const scoreBoard = document.getElementById("score-board");
    const scoreLabel = document.getElementById("score-label");
    const scoreEl = document.getElementById("score");
    const resetBtn = document.querySelector(".topic-reset-btn");

    if (scoreBoard) {
        scoreBoard.hidden = IS_LEARN_MODE || IS_CHALLENGE_MODE;
    }

    if (resetBtn) {
        resetBtn.hidden = !IS_CHALLENGE_MODE;
    }

    if (IS_CHALLENGE_MODE) {
        if (scoreLabel) scoreLabel.innerText = "+:";
        if (scoreEl) scoreEl.innerText = String(getCoins());
    } else if (scoreEl) {
        if (scoreLabel) scoreLabel.innerText = "Punkte:";
        scoreEl.innerText = String(globalPhysikScore);
    }

    const globalScoreVal = document.getElementById("global-score-val");
    if (globalScoreVal) {
        globalScoreVal.innerText = IS_CHALLENGE_MODE ? String(getCoins()) : String(globalPhysikScore);
    }

    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({
            type: IS_CHALLENGE_MODE ? "coinsChanged" : "updateScore",
            score: IS_CHALLENGE_MODE ? getCoins() : globalPhysikScore
        }, "*");
    }
}

function getUniqueId(box) {
    const rawId = box.getAttribute("data-id");
    const questionText = box.querySelector("p")?.innerText || "default";
    if (rawId) return `${TOPIC_ID}_${rawId}`;
    return `${TOPIC_ID}_${questionText.substring(0, 30)}`;
}

function setFeedback(box, text, color) {
    const fb = box.querySelector(".feedback");
    if (!fb) return;
    fb.innerText = text;
    fb.style.color = color;
}

function finishCorrectAnswer(box, btn, text) {
    box.querySelectorAll("button").forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.5";
    });
    btn.disabled = true;
    btn.style.opacity = "1";
    btn.style.background = "var(--correct)";
    setFeedback(box, text, "var(--correct)");
    playSuccessSound();
}

function handlePracticeAnswer(btn, isCorrect, customMsg = null) {
    const box = btn.closest(".quiz-box") || btn.closest(".exercise-box") || btn.parentElement;
    if (!box) return;

    const id = getUniqueId(box);
    const legacyId = box.getAttribute("data-id");

    if (practiceAnswered.has(id) || (legacyId && practiceAnswered.has(legacyId))) {
        if (isCorrect) {
            btn.style.background = "var(--correct)";
            setFeedback(box, "Richtig. Diese \u00dcbungsfrage gibt keine Punkte.", "var(--correct)");
        }
        return;
    }

    if (isCorrect) {
        practiceAnswered.add(id);
        writeSet(PRACTICE_ANSWERED_KEY, practiceAnswered);
        finishCorrectAnswer(box, btn, customMsg ? `Richtig. ${customMsg}` : "Richtig. Diese \u00dcbungsfrage gibt keine Punkte.");
    } else {
        practiceFailedOnce.add(id);
        writeSet(PRACTICE_FAILED_KEY, practiceFailedOnce);
        btn.style.background = "var(--wrong)";
        btn.disabled = true;
        btn.style.opacity = "0.5";
        setFeedback(box, customMsg ? `Noch nicht. ${customMsg}` : "Noch nicht. Lies die Stelle noch einmal und versuch es wieder.", "var(--wrong)");
    }
}

function handleAnswer(btn, isCorrect, pts = 0, customMsg = null) {
    if (IS_LEARN_MODE || IS_CHALLENGE_MODE) {
        handlePracticeAnswer(btn, isCorrect, customMsg);
        return;
    }

    const box = btn.closest(".quiz-box") || btn.closest(".exercise-box") || btn.parentElement;
    if (!box) return;

    const id = getUniqueId(box);
    const legacyId = box.getAttribute("data-id");

    if (answered.has(id) || (legacyId && answered.has(legacyId))) {
        if (isCorrect) {
            btn.style.background = "var(--correct)";
            setFeedback(box, "Richtig, aber die Punkte gab es nur beim ersten Mal!", "orange");
        }
        return;
    }

    if (isCorrect) {
        let actualPts = Number(pts) || 0;
        const wasPreviouslyWrong = failedOnce.has(id) || (legacyId && failedOnce.has(legacyId));
        if (wasPreviouslyWrong) actualPts = Math.floor(actualPts / 2);

        answered.add(id);
        writeSet(LEGACY_ANSWERED_KEY, answered);
        finishCorrectAnswer(
            box,
            btn,
            customMsg
                ? `Richtig. ${customMsg}${actualPts ? ` (+${actualPts} Punkte)` : ""}`
                : `Richtig!${actualPts ? ` (+${actualPts} Punkte)` : ""}`
        );

        globalPhysikScore += actualPts;
        localStorage.setItem("physik_score", String(globalPhysikScore));

        let topicScores = {};
        try {
            topicScores = JSON.parse(localStorage.getItem("physik_topic_scores") || "{}");
        } catch (error) {
            topicScores = {};
        }
        topicScores[TOPIC_ID] = (topicScores[TOPIC_ID] || 0) + actualPts;
        localStorage.setItem("physik_topic_scores", JSON.stringify(topicScores));
        updateScoreDisplays();
    } else {
        failedOnce.add(id);
        writeSet(LEGACY_FAILED_KEY, failedOnce);
        btn.style.background = "var(--wrong)";
        btn.disabled = true;
        btn.style.opacity = "0.5";
        setFeedback(box, customMsg ? `Falsch. ${customMsg}` : "Falsch! Versuch es noch einmal f\u00fcr halbe Punkte.", "var(--wrong)");
    }
}

function handleQuiz(btn, isCorrect, pts) {
    handleAnswer(btn, isCorrect, pts);
}

function collectCurrentBoxIds(selector = ".quiz-box") {
    const legacyIds = [];
    document.querySelectorAll(selector).forEach(box => {
        const legacyId = box.getAttribute("data-id");
        if (legacyId) legacyIds.push(legacyId);
    });
    return legacyIds;
}

function clearTopicSet(setValue, currentTopicLegacyIds) {
    return new Set(Array.from(setValue).filter(id => {
        return !id.startsWith(`${TOPIC_ID}_`) && !currentTopicLegacyIds.includes(id);
    }));
}

function resetTopicProgress() {
    if (!TOPIC_ID) return;

    if (IS_CHALLENGE_MODE) {
        if (!confirm("\u00dcbungsfragen in diesem Kapitel zur\u00fccksetzen? Kapitelquiz, Bestwert und M\u00fcnzen bleiben erhalten.")) return;
        const currentTopicLegacyIds = collectCurrentBoxIds(".quiz-box.practice-quiz, .exercise-box");
        practiceAnswered = clearTopicSet(practiceAnswered, currentTopicLegacyIds);
        practiceFailedOnce = clearTopicSet(practiceFailedOnce, currentTopicLegacyIds);
        writeSet(PRACTICE_ANSWERED_KEY, practiceAnswered);
        writeSet(PRACTICE_FAILED_KEY, practiceFailedOnce);
        updateScoreDisplays();
        location.reload();
        return;
    }

    if (!confirm("M\u00f6chtest du deinen Fortschritt f\u00fcr dieses Kapitel wirklich zur\u00fccksetzen? Deine Gesamtpunkte werden entsprechend angepasst.")) return;

    let topicScores = {};
    try {
        topicScores = JSON.parse(localStorage.getItem("physik_topic_scores") || "{}");
    } catch (error) {
        topicScores = {};
    }

    const ptsToRemove = topicScores[TOPIC_ID] || 0;
    topicScores[TOPIC_ID] = 0;
    localStorage.setItem("physik_topic_scores", JSON.stringify(topicScores));

    globalPhysikScore = Math.max(0, globalPhysikScore - ptsToRemove);
    localStorage.setItem("physik_score", String(globalPhysikScore));

    const currentTopicLegacyIds = collectCurrentBoxIds(".quiz-box");
    answered = clearTopicSet(answered, currentTopicLegacyIds);
    failedOnce = clearTopicSet(failedOnce, currentTopicLegacyIds);
    writeSet(LEGACY_ANSWERED_KEY, answered);
    writeSet(LEGACY_FAILED_KEY, failedOnce);

    updateScoreDisplays();
    location.reload();
}

function checkAnsweredStatus() {
    loadFromStorage();
    if (IS_LEARN_MODE) return;

    const sourceSet = IS_CHALLENGE_MODE ? practiceAnswered : answered;
    document.querySelectorAll(".quiz-box").forEach(box => {
        const id = getUniqueId(box);
        const legacyId = box.getAttribute("data-id");
        if (sourceSet.has(id) || (legacyId && sourceSet.has(legacyId))) {
            box.querySelectorAll("button").forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = "0.5";
            });
            setFeedback(box, IS_CHALLENGE_MODE ? "Bereits als \u00dcbung gel\u00f6st." : "Bereits gel\u00f6st.", "var(--correct)");
        }
    });
}

function getCoins() {
    return Number(localStorage.getItem(COINS_KEY) || 0);
}

function setCoins(value) {
    localStorage.setItem(COINS_KEY, String(Math.max(0, Number(value) || 0)));
    updateScoreDisplays();
}

function getCompletedTopics() {
    try {
        return new Set(JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]"));
    } catch (error) {
        return new Set();
    }
}

function markTopicCompleted(topicId) {
    const completed = getCompletedTopics();
    const wasNew = !completed.has(topicId);
    completed.add(topicId);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(completed)));
    return wasNew;
}

function getChapterStates() {
    try {
        return JSON.parse(localStorage.getItem(CHAPTER_STATE_KEY) || "{}");
    } catch (error) {
        return {};
    }
}

function saveChapterStates(states) {
    localStorage.setItem(CHAPTER_STATE_KEY, JSON.stringify(states));
}

function getChapterState(topicId) {
    const states = getChapterStates();
    return states[topicId] || { attempts: 0, nextAllowed: 0, bestPercent: 0 };
}

function updateChapterState(topicId, patch) {
    const states = getChapterStates();
    states[topicId] = { ...(states[topicId] || { attempts: 0, nextAllowed: 0, bestPercent: 0 }), ...patch };
    saveChapterStates(states);
    return states[topicId];
}

function normalizeChapterQuestions(questions) {
    return (questions || [])
        .filter(q => q && Array.isArray(q.answers) && q.answers.length >= 2)
        .map((q, index) => ({
            ...q,
            id: q.id || `chapter_${index}`,
            answers: q.answers.map((answer, answerIndex) => ({
                ...answer,
                id: answer.id || `${q.id || index}_${answerIndex}`,
                correct: Boolean(answer.correct)
            }))
        }));
}

function renderChapterQuizPanel(topicId, topicTitle, questions) {
    if (!IS_CHALLENGE_MODE) return;
    const slot = document.getElementById("chapter-quiz-slot");
    if (!slot) return;

    const normalized = normalizeChapterQuestions(questions);
    window.__chapterQuizQuestions = normalized;

    if (!normalized.length) {
        slot.innerHTML = `<p>F&uuml;r dieses Kapitel gibt es noch kein Kapitelquiz. Die &Uuml;bungsfragen bleiben aber verf&uuml;gbar.</p>`;
        return;
    }

    const completed = getCompletedTopics().has(topicId);
    const state = getChapterState(topicId);

    slot.innerHTML = `
        <div class="chapter-quiz-intro">
            <p><strong>${topicTitle}</strong>: Starte das Kapitelquiz erst, wenn du das Kapitel wirklich verstanden hast. Du bestehst mit mindestens 75% richtigen Antworten.</p>
            <div class="chapter-meta">
                <span>Beliebig oft wiederholbar</span>
                <span>Bestwert: ${Math.round(Number(state.bestPercent || 0))}%</span>
            </div>
            ${completed ? `<p class="chapter-result success">Kapitel geschafft. Du kannst das Quiz trotzdem weiter ueben.</p>` : ""}
            <button type="button" onclick="startChapterQuiz('${topicId}')">Kapitelquiz starten</button>
        </div>
    `;
}

function startChapterQuiz(topicId) {
    const questions = normalizeChapterQuestions(window.__chapterQuizQuestions || []);
    const slot = document.getElementById("chapter-quiz-slot");
    if (!slot || !questions.length) return;

    slot.innerHTML = `
        <form id="chapter-quiz-form" class="chapter-quiz-form">
            ${questions.map((q, index) => {
                const answersHtml = shuffleArray([...q.answers]).map(answer => `
                    <label>
                        <input type="radio" name="chapter-q-${index}" value="${escapeHtmlAttr(answer.id)}">
                        <span>${answer.text}</span>
                    </label>
                `).join("");
                return `
                    <fieldset class="chapter-question" data-question-index="${index}">
                        <legend>${index + 1}. ${stripChapterNumber(q.question)}</legend>
                        <div class="chapter-answer-list">${answersHtml}</div>
                    </fieldset>
                `;
            }).join("")}
            <div class="chapter-quiz-actions">
                <button type="button" onclick="submitChapterQuiz('${topicId}')">Abgeben</button>
                <p class="chapter-result" id="chapter-quiz-feedback" role="status" aria-live="polite"></p>
            </div>
        </form>
    `;
}

function stripChapterNumber(question) {
    return String(question || "").replace(/^\s*\d+\.\s*/, "");
}

function submitChapterQuiz(topicId) {
    const questions = normalizeChapterQuestions(window.__chapterQuizQuestions || []);
    const feedback = document.getElementById("chapter-quiz-feedback");
    if (!questions.length) return;

    const form = document.getElementById("chapter-quiz-form");
    let correctCount = 0;
    let answeredCount = 0;

    questions.forEach((q, index) => {
        const selected = form.querySelector(`input[name="chapter-q-${index}"]:checked`);
        const fieldset = form.querySelector(`[data-question-index="${index}"]`);
        fieldset?.classList.remove("chapter-correct", "chapter-wrong");
        if (!selected) return;
        answeredCount += 1;
        const answer = q.answers.find(item => String(item.id) === String(selected.value));
        if (answer?.correct) {
            correctCount += 1;
            fieldset?.classList.add("chapter-correct");
        } else {
            fieldset?.classList.add("chapter-wrong");
        }
    });

    if (answeredCount < questions.length) {
        if (feedback) {
            feedback.innerText = "Bitte beantworte zuerst alle Fragen. Du kannst deine Antworten vor dem Abgeben noch \u00e4ndern.";
            feedback.className = "chapter-result warning";
        }
        return;
    }

    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= 75;
    const oldState = getChapterState(topicId);
    const attempts = (Number(oldState.attempts) || 0) + 1;
    updateChapterState(topicId, {
        attempts,
        bestPercent: Math.max(Number(oldState.bestPercent || 0), percent),
        nextAllowed: 0
    });

    if (passed) {
        const firstCompletion = markTopicCompleted(topicId);
        const reward = firstCompletion ? 25 + Math.round(percent / 5) : 0;
        if (reward) setCoins(getCoins() + reward);
        if (feedback) {
            feedback.innerText = `Bestanden: ${correctCount}/${questions.length} richtig (${percent}%). ${reward ? `Belohnung: ${reward} +.` : "Kapitel war schon geschafft."}`;
            feedback.className = "chapter-result success";
        }
        form.querySelectorAll("input, button").forEach(control => control.disabled = true);
        window.parent?.postMessage({ type: "challengeCompleted", topicId, coins: getCoins() }, "*");
    } else {
        if (feedback) {
            feedback.innerText = `Noch nicht bestanden: ${correctCount}/${questions.length} richtig (${percent}%). Ziel: mindestens 75%. Sieh dir die markierten Fragen noch einmal an und versuche es wieder.`;
            feedback.className = "chapter-result warning";
        }
    }

    updateScoreDisplays();
}

window.addEventListener("message", event => {
    if (event.data?.type === "themeChange") {
        if (event.data.isDark) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.body.dataset.topicMode = TOPIC_MODE;
    updateScoreDisplays();
});
