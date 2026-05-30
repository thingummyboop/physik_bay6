// Physik-Abenteuer Common Logic
if (localStorage.getItem('physik_dark_mode') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

let globalPhysikScore = parseInt(localStorage.getItem('physik_score')) || 0;

let answered = new Set();
let failedOnce = new Set();

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('physik_answered');
        if (saved) answered = new Set(JSON.parse(saved));
        
        const savedFailed = localStorage.getItem('physik_failed_once');
        if (savedFailed) failedOnce = new Set(JSON.parse(savedFailed));
    } catch (e) {
        console.error("Fehler beim Laden der Antworten:", e);
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
            btn.style.background = "var(--correct)";
            if(fb) {
                fb.innerText = "✅ Richtig, aber die Punkte gab es nur beim ersten Mal!";
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
            b.disabled = true;
            b.style.opacity = "0.5";
        });
        // The correct button stays visually highlighted but is technically disabled
        btn.style.opacity = "1";

        answered.add(id);
        localStorage.setItem('physik_answered', JSON.stringify(Array.from(answered)));

        playSuccessSound();
        btn.style.background = "var(--correct)";
        
        if(fb) {
            let msg = customMsg ? "✅ " + customMsg : "✅ Richtig!";
            if (wasPreviouslyWrong && actualPts > 0) {
                msg += " (Halbe Punkte: +" + actualPts + ")";
            } else {
                msg += " (+" + actualPts + " Punkte)";
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
        
        btn.style.background = "var(--wrong)";
        btn.disabled = true; 
        btn.style.opacity = "0.5";
        if(fb) {
            fb.innerText = customMsg ? "❌ " + customMsg : "❌ Falsch! Versuch es noch einmal für halbe Punkte.";
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
    });

    if (isCorrect) {
        playSuccessSound();
        btn.style.background = "var(--correct)";
        if (fb) {
            fb.innerText = customMsg ? "✅ " + customMsg : "✅ Richtig. Genau diese Idee ist wichtig.";
            fb.style.color = "var(--correct)";
        }
    } else {
        btn.style.background = "var(--wrong)";
        btn.style.opacity = "0.72";
        if (fb) {
            fb.innerText = customMsg ? "❌ " + customMsg : "❌ Noch nicht. Lies den Abschnitt noch einmal und probiere es neu.";
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

    let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores')) || {};
    let ptsToRemove = topicScores[topicId] || 0;
    topicScores[topicId] = 0;
    localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));

    try {
        const chapterResults = JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results') || '{}');
        delete chapterResults[topicId];
        localStorage.setItem('sciverse_chapter_quiz_results', JSON.stringify(chapterResults));
    } catch (error) {
        localStorage.removeItem('sciverse_chapter_quiz_results');
    }

    globalPhysikScore = Math.max(0, globalPhysikScore - ptsToRemove);
    localStorage.setItem('physik_score', globalPhysikScore);

    // Filter out both prefixed and current page legacy IDs
    let currentTopicLegacyIds = [];
    document.querySelectorAll('.quiz-box').forEach(box => {
        const lid = box.getAttribute('data-id');
        if (lid) currentTopicLegacyIds.push(lid);
    });

    let updatedAnswered = Array.from(answered).filter(id => {
        return !id.startsWith(topicId + "_") && !currentTopicLegacyIds.includes(id);
    });
    let updatedFailed = Array.from(failedOnce).filter(id => {
        return !id.startsWith(topicId + "_") && !currentTopicLegacyIds.includes(id);
    });

    answered = new Set(updatedAnswered);
    localStorage.setItem('physik_answered', JSON.stringify(updatedAnswered));

    failedOnce = new Set(updatedFailed);
    localStorage.setItem('physik_failed_once', JSON.stringify(updatedFailed));

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
                fb.innerText = "✅ Bereits gelöst.";
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
    updateScoreDisplays();
});
