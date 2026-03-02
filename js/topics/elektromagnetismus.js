// Logic for elektromagnetismus.html

        let score = 0;
        let answered = new Set();
        let energy = 0;

        function updateMagnetField(val) {
            const lines = document.getElementById('fieldLines').children;
            const arrow = document.getElementById('currentArrow');
            const arrowLength = 10 + (val * 0.4);
            arrow.setAttribute('d', `M ${200 - arrowLength/2} 100 L ${200 + arrowLength/2} 100`);
            
            for(let line of lines) {
                line.style.opacity = (val / 150) + 0.1;
                line.style.strokeWidth = 1 + (val / 25);
            }
        }

        function setMaterial(type) {
            const core = document.getElementById('materialCore');
            const field = document.getElementById('spuleField');
            const txt = document.getElementById('materialText');
            
            if(type === 'none') {
                core.setAttribute('fill', 'transparent');
                field.style.opacity = "0.2";
                txt.innerText = "Aktuell: Nur Luft (Feld ist schwach)";
            } else if(type === 'wood') {
                core.setAttribute('fill', '#deb887');
                field.style.opacity = "0.2";
                txt.innerText = "Aktuell: Holz (Keine Verstärkung)";
            } else if(type === 'iron') {
                core.setAttribute('fill', '#718096');
                field.style.opacity = "1";
                txt.innerText = "Aktuell: Eisen (Maximale Verstärkung!)";
            }
        }

        let isUp = true;
        function changeDirection() {
            const arrow = document.getElementById('forceArrow');
            const txt = document.getElementById('directionText');
            isUp = !isUp;
            if(isUp) {
                arrow.setAttribute('d', 'M 200 100 L 200 30');
                txt.innerText = "Wirkung: Schubs nach OBEN";
            } else {
                arrow.setAttribute('d', 'M 200 140 L 200 210');
                txt.innerText = "Wirkung: Schubs nach UNTEN";
            }
        }

        function shakeFlashlight() {
            const fl = document.getElementById('flashlight');
            const beam = document.getElementById('lightBeam');
            const enDisp = document.getElementById('energyLevel');
            fl.classList.add('shaking');
            energy = Math.min(energy + 15, 100);
            beam.style.opacity = energy / 100;
            enDisp.innerText = energy;
            setTimeout(() => fl.classList.remove('shaking'), 150);
            
            if(!window.isDraining) {
                window.isDraining = true;
                let drain = setInterval(() => {
                    energy = Math.max(energy - 2, 0);
                    beam.style.opacity = energy / 100;
                    enDisp.innerText = Math.floor(energy);
                    if(energy === 0) { clearInterval(drain); window.isDraining = false; }
                }, 150);
            }
        }

        function handleAnswer(btn, isCorrect, pts) {
            const box = btn.closest('.quiz-box');
            const id = box.getAttribute('data-id');
            const fb = box.querySelector('.feedback');
            
            if (answered.has(id)) {
                if (isCorrect) {
                    btn.style.background = "var(--correct)";
                    fb.innerText = "✅ Richtig, aber die Punkte gab es nur beim ersten Mal!";
                    fb.style.color = "orange";
                } else {
                    btn.style.background = "var(--wrong)";
                    fb.innerText = "❌ Das ist leider falsch.";
                    fb.style.color = "var(--wrong)";
                }
                return;
            }

            if (isCorrect) {
                btn.style.background = "var(--correct)";
                fb.innerText = "✅ Richtig! +" + pts + " Punkte!";
                fb.style.color = "var(--correct)";
                score += pts;
                document.getElementById('score').innerText = score;
                box.querySelectorAll('button').forEach(b => b.disabled = true);
                btn.style.opacity = "1";
            } else {
                btn.style.background = "var(--wrong)";
                fb.innerText = "❌ Falsch! Du kannst es noch mal probieren, aber die Punkte sind weg.";
                fb.style.color = "var(--wrong)";
                answered.add(id);
            }
            answered.add(id);
        }
    

function topicInit() {}
