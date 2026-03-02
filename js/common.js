// Physik-Abenteuer Common Logic
if (localStorage.getItem('physik_dark_mode') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

let globalPhysikScore = parseInt(localStorage.getItem('physik_score')) || 0;

let answered = new Set();
try {
    const saved = localStorage.getItem('physik_answered');
    if (saved) {
        answered = new Set(JSON.parse(saved));
    }
} catch (e) {
    console.error("Fehler beim Laden der Antworten:", e);
    localStorage.removeItem('physik_answered');
}

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

/**
 * Handles the quiz answers and score updates.
 */
function handleAnswer(btn, isCorrect, pts, customMsg = null) {
    const box = btn.closest('.quiz-box') || btn.closest('.exercise-box') || btn.parentElement;
    if (!box) return;

    // Generate unique ID based on topic and index if available, or text
    const topicId = new URLSearchParams(window.location.search).get('topic') || 'unknown';
    const questionText = box.querySelector('p')?.innerText || "default";
    const id = box.getAttribute('data-id') || `${topicId}_${questionText.substring(0,20)}`;
    
    const fb = box.querySelector('.feedback');

    if (answered.has(id)) {
        if (isCorrect) {
            btn.style.background = "var(--correct)";
            if(fb) {
                fb.innerText = "✅ Richtig, aber die Punkte gab es nur beim ersten Mal!";
                fb.style.color = "orange";
            }
        } else {
            btn.style.background = "var(--wrong)";
            if(fb) {
                fb.innerText = "❌ Das ist leider falsch.";
                fb.style.color = "var(--wrong)";
            }
        }
        return;
    }

    box.querySelectorAll('button').forEach(b => {
        b.disabled = true;
        b.style.opacity = "0.5";
    });
    btn.style.opacity = "1";

    if (isCorrect) {
        answered.add(id);
        localStorage.setItem('physik_answered', JSON.stringify(Array.from(answered)));

        playSuccessSound();
        btn.style.background = "var(--correct)";
        if(fb) {
            fb.innerText = customMsg ? "✅ " + customMsg + " (+" + pts + " Punkte)" : "✅ Richtig! +" + pts + " Punkte!";
            fb.style.color = "var(--correct)";
        }
        
        globalPhysikScore += Number(pts);
        localStorage.setItem('physik_score', globalPhysikScore);
        
        let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores')) || {};
        topicScores[topicId] = (topicScores[topicId] || 0) + Number(pts);
        localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));

        updateScoreDisplays();
    } else {
        answered.add(id);
        localStorage.setItem('physik_answered', JSON.stringify(Array.from(answered)));
        
        btn.style.background = "var(--wrong)";
        if(fb) {
            fb.innerText = customMsg ? "❌ " + customMsg : "❌ Falsch! Lies den Text nochmal und probier es weiter.";
            fb.style.color = "var(--wrong)";
        }
    }
}

// Standard helper for compatibility
function handleQuiz(btn, isCorrect, pts) { handleAnswer(btn, isCorrect, pts); }

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplays();
});
