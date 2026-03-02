// Logic for farben.html

        let score = 0;

        function updateScore(pts) {
            score += pts;
            document.getElementById('score').innerText = score;
        }

        function simulateJump() {
            const el = document.getElementById('electron');
            const phot = document.getElementById('photon-path');
            
            // Sprung nach außen
            el.setAttribute('cy', '20'); 
            
            setTimeout(() => {
                // Zurückfallen und Lichtblitz
                el.setAttribute('cy', '50');
                phot.style.opacity = "1";
                setTimeout(() => { phot.style.opacity = "0"; }, 500);
            }, 500);
        }

        function setWave(freq, color, text) {
            const wave = document.getElementById('lightWave');
            const desc = document.getElementById('waveDesc');
            let d = "M 0 50 ";
            for(let i=0; i<=400; i+=freq) {
                d += `Q ${i + freq/2} ${i%(freq*2)===0 ? 10 : 90} ${i + freq} 50 `;
            }
            wave.setAttribute('d', d);
            wave.setAttribute('stroke', color);
            desc.innerText = text;
            desc.style.color = color;
        }

        function handleQuiz(btn, isCorrect, pts) {
            const box = btn.closest('.quiz-box');
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
                fb.innerText = "✅ Super! +" + pts + " Punkte!";
                fb.style.color = "var(--correct)";
                updateScore(pts);
            } else {
                btn.style.backgroundColor = "var(--wrong)";
                btn.style.opacity = "1";
                fb.innerText = "❌ Knapp daneben! Lies dir das Kapitel noch mal durch.";
                fb.style.color = "var(--wrong)";
            }
        }
    

function topicInit() {}
