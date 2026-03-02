// Logic for licht, schatten, astronomie.html

        let score = 0;

        function updateScore(pts) {
            score += pts;
            document.getElementById('score').innerText = score;
            const board = document.getElementById('score-board');
            board.style.backgroundColor = "#16213e";
            setTimeout(() => board.style.backgroundColor = "#0f3460", 300);
        }

        function handleQuiz(btn, isCorrect, pts) {
            const box = btn.closest('.quiz-box') || btn.parentElement;
            if (box.hasAttribute('data-answered')) return;
            
            const fb = box.querySelector('.feedback');
            box.setAttribute('data-answered', 'true');
            
            box.querySelectorAll('button').forEach(b => {
                b.disabled = true;
                b.style.opacity = "0.5";
            });

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                btn.style.opacity = "1";
                fb.innerText = "✅ Richtig! +" + pts + " Punkte!";
                fb.style.color = "var(--correct)";
                updateScore(pts);
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                btn.style.opacity = "1";
                fb.innerText = "❌ Das war nicht korrekt. Lies dir die Texte oben nochmal in Ruhe durch!";
                fb.style.color = "var(--wrong)";
            }
        }
    

function topicInit() {}
