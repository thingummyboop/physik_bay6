// Physik-Abenteuer Common Logic
document.documentElement.classList.toggle('embedded-topic', window.parent !== window);
function readCommonSetting(key) {
    try {
        if (window.parent !== window && typeof window.parent.readShellSetting === 'function') return window.parent.readShellSetting(key);
    } catch { /* Cross-origin hosts may deny parent access. */ }
    try { return localStorage.getItem(key); } catch { return null; }
}
if (readCommonSetting('physik_dark_mode') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

let globalPhysikScore = parseInt(readCommonSetting('physik_score')) || 0;

let answered = new Set();
let failedOnce = new Set();

const COMMON_UI_TRANSLATIONS = {
    en: {
        "Richtig, aber die Punkte gab es nur beim ersten Mal!": "Correct, but points were only awarded the first time!",
        "Richtig!": "Correct!",
        "Falsch! Versuch es noch einmal für halbe Punkte.": "Not correct. Try again for half points.",
        "Richtig. Genau diese Idee ist wichtig.": "Correct. That is the important idea.",
        "Noch nicht. Lies den Abschnitt noch einmal und probiere es neu.": "Not yet. Read the section again and try once more.",
        "Bereits gelöst.": "Already solved.",
        "Punkte": "points",
        "Halbe Punkte": "half points"
    },
    ar: { "Richtig!": "صحيح!", "Punkte": "نقاط", "Bereits gelöst.": "تم الحل بالفعل." },
    uk: { "Richtig!": "Правильно!", "Punkte": "бали", "Bereits gelöst.": "Уже виконано." },
    sr: { "Richtig!": "Тачно!", "Punkte": "поени", "Bereits gelöst.": "Већ решено." },
    tr: { "Richtig!": "Doğru!", "Punkte": "puan", "Bereits gelöst.": "Zaten çözüldü." }
};

function commonText(text) {
    const lang = readCommonSetting('physik_lang') || 'de';
    return (COMMON_UI_TRANSLATIONS[lang] && COMMON_UI_TRANSLATIONS[lang][text]) || text;
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('physik_answered');
        if (saved) answered = new Set(JSON.parse(saved));
        
        const savedFailed = localStorage.getItem('physik_failed_once');
        if (savedFailed) failedOnce = new Set(JSON.parse(savedFailed));
    } catch (e) {
        // Storage may be disabled; keep this visit usable with in-memory answers.
    }
}

loadFromStorage();

// Sound effects
function playSuccessSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch(e) {}
}

function updateScoreDisplays() {
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.innerText = globalPhysikScore;
    const scoreLabel = document.getElementById('score-label');
    if (scoreLabel) scoreLabel.innerText = commonText('Punkte') + ':';
    
    const globalScoreVal = document.getElementById('global-score-val');
    if (globalScoreVal) globalScoreVal.innerText = globalPhysikScore;

    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({ type: 'updateScore', score: globalPhysikScore }, '*');
    }
}

function getUniqueId(box) {
    const topicId = new URLSearchParams(window.location.search).get('topic') || 'unknown';
    const rawId = box.getAttribute('data-id');
    const questionText = box.querySelector('p')?.innerText || "default";
    
    if (rawId) {
        return `${topicId}_${rawId}`;
    }
    return `${topicId}_${questionText.substring(0,20)}`;
}

/**
 * Handles the quiz answers and score updates.
 */
function handleAnswer(btn, isCorrect, pts, customMsg = null) {
    const box = btn.closest('.quiz-box') || btn.closest('.exercise-box') || btn.parentElement;
    if (!box) return;

    const id = getUniqueId(box);
    const legacyId = box.getAttribute('data-id');
    const fb = box.querySelector('.feedback');

    // Check if already solved (either as prefixed ID or as legacy ID)
    if (answered.has(id) || (legacyId && answered.has(legacyId))) {
        if (isCorrect) {
            btn.classList.add('is-correct');
            btn.style.background = "var(--correct)";
            if(fb) {
                fb.innerText = "✅ " + commonText("Richtig, aber die Punkte gab es nur beim ersten Mal!");
                fb.style.color = "orange";
            }
        }
        return;
    }

    if (isCorrect) {
        let actualPts = Number(pts);
        let wasPreviouslyWrong = failedOnce.has(id) || (legacyId && failedOnce.has(legacyId));
        if (wasPreviouslyWrong) {
            actualPts = Math.floor(actualPts / 2);
        }

        // Disable ALL buttons in this box
        box.querySelectorAll('button').forEach(b => {
            b.classList.remove('is-correct', 'is-wrong');
            b.disabled = true;
            b.style.opacity = "0.5";
        });
        // The correct button stays visually highlighted but is technically disabled
        btn.classList.add('is-correct');
        btn.style.opacity = "1";

        answered.add(id);
        localStorage.setItem('physik_answered', JSON.stringify(Array.from(answered)));

        playSuccessSound();
        btn.style.background = "var(--correct)";
        
        if(fb) {
            let msg = customMsg ? "✅ " + customMsg : "✅ " + commonText("Richtig!");
            if (wasPreviouslyWrong && actualPts > 0) {
                msg += " (" + commonText("Halbe Punkte") + ": +" + actualPts + ")";
            } else {
                msg += " (+" + actualPts + " " + commonText("Punkte") + ")";
            }
            fb.innerText = msg;
            fb.style.color = "var(--correct)";
        }
        
        globalPhysikScore += actualPts;
        localStorage.setItem('physik_score', globalPhysikScore);
        
        const topicId = new URLSearchParams(window.location.search).get('topic') || 'unknown';
        let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores')) || {};
        topicScores[topicId] = (topicScores[topicId] || 0) + actualPts;
        localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));

        updateScoreDisplays();
    } else {
        // Wrong answer - track failure and let them try again
        failedOnce.add(id);
        localStorage.setItem('physik_failed_once', JSON.stringify(Array.from(failedOnce)));
        
        btn.classList.add('is-wrong');
        btn.style.background = "var(--wrong)";
        btn.disabled = true; 
        btn.style.opacity = "0.5";
        if(fb) {
            fb.innerText = customMsg ? "❌ " + customMsg : "❌ " + commonText("Falsch! Versuch es noch einmal für halbe Punkte.");
            fb.style.color = "var(--wrong)";
        }
    }
}

// Standard helper for compatibility
function handleQuiz(btn, isCorrect, pts) { handleAnswer(btn, isCorrect, pts); }

function handlePracticeAnswer(btn, isCorrect, customMsg = null) {
    const box = btn.closest('.practice-box') || btn.closest('.quiz-box') || btn.parentElement;
    if (!box) return;

    const fb = box.querySelector('.feedback');
    box.querySelectorAll('button').forEach(button => {
        button.style.background = '';
        button.style.opacity = '1';
        button.classList.remove('is-correct', 'is-wrong');
    });

    if (isCorrect) {
        playSuccessSound();
        btn.classList.add('is-correct');
        btn.style.background = "var(--correct)";
        if (fb) {
            fb.innerText = customMsg ? "✅ " + customMsg : "✅ " + commonText("Richtig. Genau diese Idee ist wichtig.");
            fb.style.color = "var(--correct)";
        }
    } else {
        btn.classList.add('is-wrong');
        btn.style.background = "var(--wrong)";
        btn.style.opacity = "0.72";
        if (fb) {
            fb.innerText = customMsg ? "❌ " + customMsg : "❌ " + commonText("Noch nicht. Lies den Abschnitt noch einmal und probiere es neu.");
            fb.style.color = "var(--wrong)";
        }
    }
}

/**
 * Resets progress for the current topic only.
 */
function resetTopicProgress() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    if (!topicId) return;

    if (!confirm("Möchtest du deinen Fortschritt für dieses Kapitel wirklich zurücksetzen? (Deine Gesamtpunkte werden entsprechend angepasst)")) {
        return;
    }

    const keys = ['physik_topic_scores', 'sciverse_chapter_quiz_results', 'physik_score', 'physik_answered', 'physik_failed_once'];
    const originals = new Map();
    const showFailure = message => {
        let notice = document.getElementById('topic-reset-status');
        if (!notice) {
            notice = document.createElement('p');
            notice.id = 'topic-reset-status';
            notice.lang = 'de';
            notice.setAttribute('role', 'status');
            notice.setAttribute('aria-live', 'polite');
            (document.getElementById('topic-reset-btn')?.parentElement || document.body).append(notice);
        }
        notice.textContent = message;
    };
    let nextAnswered, nextFailed, nextScore, updates;
    try {
        for (const key of keys) originals.set(key, localStorage.getItem(key));
        const readObject = key => {
            const value = JSON.parse(originals.get(key) || '{}');
            if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid stored object');
            return value;
        };
        const readIds = key => {
            const value = JSON.parse(originals.get(key) || '[]');
            if (!Array.isArray(value) || value.some(id => typeof id !== 'string')) throw Error('Invalid stored IDs');
            return value;
        };
        const topicScores = readObject('physik_topic_scores');
        const chapterResults = readObject('sciverse_chapter_quiz_results');
        const score = Number(originals.get('physik_score') || 0);
        const removed = Number(topicScores[topicId] || 0);
        if (!Number.isFinite(score) || !Number.isFinite(removed) || score < 0 || removed < 0) throw Error('Invalid score');
        const legacyIds = new Set([...document.querySelectorAll('.quiz-box[data-id]')].map(box => box.dataset.id));
        const keep = id => !id.startsWith(topicId + '_') && !legacyIds.has(id);
        nextAnswered = readIds('physik_answered').filter(keep);
        nextFailed = readIds('physik_failed_once').filter(keep);
        topicScores[topicId] = 0;
        delete chapterResults[topicId];
        nextScore = Math.max(0, score - removed);
        updates = [JSON.stringify(topicScores), JSON.stringify(chapterResults), String(nextScore), JSON.stringify(nextAnswered), JSON.stringify(nextFailed)];
    } catch {
        showFailure('Zurücksetzen nicht möglich: Die gespeicherten Daten sind nicht lesbar oder der Speicher ist gesperrt. Es wurden keine Daten verändert.');
        return;
    }
    const changed = [];
    try {
        keys.forEach((key, i) => { localStorage.setItem(key, updates[i]); changed.push(key); });
    } catch {
        let restored = true;
        for (const key of changed.reverse()) {
            try { const old = originals.get(key); if (old === null) localStorage.removeItem(key); else localStorage.setItem(key, old); }
            catch { restored = false; }
        }
        showFailure(restored ? 'Zurücksetzen konnte nicht gespeichert werden. Die bisherigen Daten bleiben erhalten.' : 'Zurücksetzen konnte nicht abgeschlossen werden. Auch das Wiederherstellen war teilweise nicht möglich. Prüfe deinen Lernstand vor weiteren Änderungen.');
        return;
    }
    answered = new Set(nextAnswered);
    failedOnce = new Set(nextFailed);
    globalPhysikScore = nextScore;

    updateScoreDisplays();
    location.reload();
}

/**
 * Checks all quiz boxes and disables them if already answered.
 */
function checkAnsweredStatus() {
    loadFromStorage();
    document.querySelectorAll('.quiz-box').forEach(box => {
        const id = getUniqueId(box);
        const legacyId = box.getAttribute('data-id');
        
        if (answered.has(id) || (legacyId && answered.has(legacyId))) {
            box.querySelectorAll('button').forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = "0.5";
            });
            const fb = box.querySelector('.feedback');
            if (fb) {
                fb.innerText = "✅ " + commonText("Bereits gelöst.");
                fb.style.color = "var(--correct)";
            }
        }
    });
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
    const resetBtn = document.getElementById('topic-reset-btn');
    const mode = new URLSearchParams(window.location.search).get('mode');
    if (resetBtn && mode !== 'challenge') {
        resetBtn.hidden = true;
    }
    updateScoreDisplays();
});
