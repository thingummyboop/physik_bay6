// Logic for optik1.html

        let score = 0;
        let answeredQuestions = new Set();

        function updateScoreDisplay(pts) {
            score += pts;
            const scoreEl = document.getElementById('score');
            const board = document.getElementById('score-board');
            scoreEl.innerText = score;
            
            board.style.transform = "scale(1.1)";
            setTimeout(() => board.style.transform = "scale(1)", 200);
        }

        function checkAction(btn, isCorrect, msg, pts) {
            const parent = btn.parentElement;
            const fb = parent.querySelector('.feedback');
            
            if (parent.hasAttribute('data-done')) return;

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                fb.innerText = "✅ " + msg + " (+" + pts + " Punkte)";
                fb.style.color = "var(--correct)";
                parent.setAttribute('data-done', 'true');
                updateScoreDisplay(pts);
                parent.querySelectorAll('button').forEach(b => { if(b!==btn) b.disabled = true; });
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                fb.innerText = "❌ Versuche es noch einmal!";
                fb.style.color = "var(--wrong)";
            }
        }

        function handleQuiz(btn, isCorrect, pts) {
            const box = btn.closest('.quiz-box');
            const fb = box.querySelector('.feedback');
            
            if (box.hasAttribute('data-answered')) return;

            box.setAttribute('data-answered', 'true');
            box.querySelectorAll('button').forEach(b => {
                b.disabled = true;
                b.style.opacity = "0.6";
            });

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                btn.style.opacity = "1";
                fb.innerText = "🌟 Richtig! (+" + pts + " Punkte)";
                fb.style.color = "var(--correct)";
                updateScoreDisplay(pts);
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                btn.style.opacity = "1";
                fb.innerText = "🔍 Nicht ganz. Schau dir die Grafiken nochmal an.";
                fb.style.color = "var(--wrong)";
            }
        }
    

function topicInit() {}
