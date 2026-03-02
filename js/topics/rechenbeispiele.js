// Logic for rechenbeispiele.html

        let score = 0;
        let answeredQuestions = new Set();

        function updateScore(pts) {
            score += pts;
            document.getElementById('score').innerText = score;
        }

        // Funktion für die manuellen Eingabefelder
        function checkInput(inputId, expectedValue, points, btn) {
            let val = parseFloat(document.getElementById(inputId).value);
            let feedback = btn.nextElementSibling;

            // Verhindern, dass mehrfach Punkte vergeben werden
            if (btn.disabled) return;

            if (val === expectedValue) {
                btn.style.background = "var(--correct)";
                feedback.innerHTML = `✅ Exakt richtig! <strong>+${points} Punkte</strong>`;
                feedback.style.color = "var(--correct)";
                updateScore(points);
                btn.disabled = true; // Button sperren
                document.getElementById(inputId).disabled = true; // Input sperren
            } else {
                btn.style.background = "var(--wrong)";
                feedback.innerText = "❌ Das stimmt noch nicht ganz. Rechne noch einmal nach!";
                feedback.style.color = "var(--wrong)";
                
                // Kurze Animation für Fehler
                setTimeout(() => {
                    btn.style.background = "#0097A7";
                }, 1500);
            }
        }

        // Funktion für die Multiple-Choice Fragen am Ende
        function handleQuiz(btn, isCorrect, pts) {
            const box = btn.closest('.quiz-box');
            const id = box.getAttribute('data-id');
            
            // Falls schon eine Feedback-Zeile existiert, löschen, um sie neu zu erstellen
            let oldFb = box.querySelector('.feedback');
            if (oldFb) oldFb.remove();

            let fb = document.createElement('p');
            fb.className = 'feedback';
            box.appendChild(fb);
            
            if (answeredQuestions.has(id)) {
                if (isCorrect) {
                    btn.style.background = "var(--correct)";
                    fb.innerText = "✅ Stimmt, aber die Punkte gab es nur beim ersten Versuch!";
                    fb.style.color = "#FF9800";
                } else {
                    btn.style.background = "var(--wrong)";
                    fb.innerText = "❌ Das ist leider falsch.";
                    fb.style.color = "var(--wrong)";
                }
                return;
            }

            if (isCorrect) {
                btn.style.background = "var(--correct)";
                fb.innerText = "✅ Korrekt gerechnet! +" + pts + " Punkte!";
                fb.style.color = "var(--correct)";
                updateScore(pts);
                box.querySelectorAll('button').forEach(b => b.disabled = true);
                btn.style.opacity = "1";
            } else {
                btn.style.background = "var(--wrong)";
                fb.innerText = "❌ Falsch berechnet! Versuch es nochmal.";
                fb.style.color = "var(--wrong)";
            }
            answeredQuestions.add(id);
        }
    

function topicInit() {}
