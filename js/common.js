// Physik-Abenteuer Common Logic
if (localStorage.getItem('physik_dark_mode') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

let globalPhysikScore = parseInt(localStorage.getItem('physik_score')) || 0;

let answered = new Set();
let failedOnce = new Set();
try {
    const saved = localStorage.getItem('physik_answered');
    if (saved) answered = new Set(JSON.parse(saved));
    
    const savedFailed = localStorage.getItem('physik_failed_once');
    if (savedFailed) failedOnce = new Set(JSON.parse(savedFailed));
} catch (e) {
    console.error("Fehler beim Laden der Antworten:", e);
    localStorage.removeItem('physik_answered');
    localStorage.removeItem('physik_failed_once');
}

// Sound effects
// ... (playSuccessSound function remains unchanged)

function updateScoreDisplays() {
    // ... (updateScoreDisplays function remains unchanged)
}

/**
 * Handles the quiz answers and score updates.
 */
function handleAnswer(btn, isCorrect, pts, customMsg = null) {
    const box = btn.closest('.quiz-box') || btn.closest('.exercise-box') || btn.parentElement;
    if (!box) return;

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

    if (isCorrect) {
        // Determine points (half if they failed once before)
        let actualPts = Number(pts);
        let wasPreviouslyWrong = failedOnce.has(id);
        if (wasPreviouslyWrong) {
            actualPts = Math.floor(actualPts / 2);
        }

        // Disable all buttons upon correct answer
        box.querySelectorAll('button').forEach(b => {
            b.disabled = true;
            b.style.opacity = "0.5";
        });
        btn.style.opacity = "1";
        btn.disabled = false; 

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

    // 1. Calculate how many points to subtract
    let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores')) || {};
    let ptsToRemove = topicScores[topicId] || 0;

    // 2. Clear topic score
    topicScores[topicId] = 0;
    localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));

    // 3. Adjust global score
    globalPhysikScore = Math.max(0, globalPhysikScore - ptsToRemove);
    localStorage.setItem('physik_score', globalPhysikScore);

    // 4. Remove all IDs that start with this topicId from answered and failedOnce
    const updatedAnswered = Array.from(answered).filter(id => !id.startsWith(topicId + "_"));
    answered = new Set(updatedAnswered);
    localStorage.setItem('physik_answered', JSON.stringify(updatedAnswered));

    const updatedFailed = Array.from(failedOnce).filter(id => !id.startsWith(topicId + "_"));
    failedOnce = new Set(updatedFailed);
    localStorage.setItem('physik_failed_once', JSON.stringify(updatedFailed));

    // 5. Update UI and reload
    updateScoreDisplays();
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplays();
});
