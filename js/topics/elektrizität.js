// Logic for elektrizität.html

        let totalScore = 0;

        function updateScore(points) {
            totalScore += points;
            const scoreElement = document.getElementById('score');
            const scoreBoard = document.getElementById('score-board');
            
            scoreElement.innerText = totalScore;
            
            // Animation für die Punkteanzeige
            scoreBoard.style.transform = "scale(1.1)";
            scoreBoard.style.backgroundColor = "#1abc9c"; 
            setTimeout(() => {
                scoreBoard.style.transform = "scale(1)";
                scoreBoard.style.backgroundColor = "#2c3e50"; 
            }, 300);
        }

        // Funktion für Übungen (mehrere Versuche möglich, Punkte nur beim ersten Mal)
        function checkExercise(btn, isCorrect, message, points) {
            const parentBlock = btn.parentElement;
            
            if (parentBlock.getAttribute('data-points-awarded') === 'true') {
                 if (isCorrect) {
                    btn.style.backgroundColor = "var(--correct)";
                    parentBlock.querySelector('.feedback').innerText = "✅ Richtig! (Du hast die Punkte dafür schon bekommen).";
                    parentBlock.querySelector('.feedback').style.color = "var(--correct)";
                } else {
                    btn.style.backgroundColor = "var(--wrong)";
                    parentBlock.querySelector('.feedback').innerText = "❌ Falsch. Probier es nochmal!";
                    parentBlock.querySelector('.feedback').style.color = "var(--wrong)";
                }
                return; 
            }

            let feedbackElement = parentBlock.querySelector('.feedback');
            const buttonsInRow = parentBlock.querySelectorAll('button');

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                feedbackElement.innerText = "✅ " + message + " (+" + points + " Punkte)";
                feedbackElement.style.color = "var(--correct)";
                updateScore(points);
                parentBlock.setAttribute('data-points-awarded', 'true'); 
                
                buttonsInRow.forEach(b => {
                    if(b !== btn) {
                        b.disabled = true;
                        b.style.backgroundColor = "#bdc3c7";
                        b.style.boxShadow = "none";
                    }
                });
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                feedbackElement.innerText = "❌ " + message + " Versuche es nochmal!";
                feedbackElement.style.color = "var(--wrong)";
            }
        }

        // Funktion für Quizzes (nur ein Versuch!)
        function answerQuiz(btn, isCorrect) {
            const questionDiv = btn.closest('.question');
            if (questionDiv.getAttribute('data-answered') === 'true') return;

            const feedbackElement = questionDiv.querySelector('.feedback');
            const allButtons = questionDiv.querySelectorAll('button');

            questionDiv.setAttribute('data-answered', 'true');
            allButtons.forEach(b => {
                b.disabled = true;
                b.style.opacity = "0.6";
                b.style.boxShadow = "none";
                b.style.cursor = "default";
            });

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                btn.style.opacity = "1";
                feedbackElement.innerText = "✅ Hervorragend! Das ist die richtige Antwort. (+10 Punkte)";
                feedbackElement.style.color = "var(--correct)";
                updateScore(10);
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                btn.style.opacity = "1";
                feedbackElement.innerText = "❌ Schade, das war nicht ganz richtig. Lies dir den Text oben nochmal in Ruhe durch.";
                feedbackElement.style.color = "var(--wrong)";
            }
        }

        // Funktion für das Finale (nur ein Versuch, mehr Punkte)
        function answerFinalQuiz(btn, isCorrect) {
            const questionDiv = btn.closest('.question');
            if (questionDiv.getAttribute('data-answered') === 'true') return;

            const feedbackElement = questionDiv.querySelector('.feedback');
            const allButtons = questionDiv.querySelectorAll('button');

            questionDiv.setAttribute('data-answered', 'true');
            allButtons.forEach(b => {
                b.disabled = true;
                b.style.opacity = "0.6";
                 b.style.boxShadow = "none";
                b.style.cursor = "default";
            });

            if (isCorrect) {
                btn.style.backgroundColor = "var(--correct)";
                btn.style.opacity = "1";
                feedbackElement.innerText = "🏆 Fantastisch! Du hast es wirklich verstanden! (+20 Punkte)";
                feedbackElement.style.color = "var(--correct)";
                updateScore(20); 
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                btn.style.opacity = "1";
                feedbackElement.innerText = "❌ Oh nein, knapp daneben! Denk nochmal an die Beispiele aus den Kapiteln.";
                feedbackElement.style.color = "var(--wrong)";
            }
        }
    

function topicInit() {}
