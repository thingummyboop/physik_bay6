// Logic for astronomie.html

        let score = 0;
        let answered = new Set();

        // 1. Planeten-Vergleich
        function showPlanet(planet) {
            let txt = document.getElementById('planetText');
            
            document.getElementById('planetErde').style.display = 'none';
            document.getElementById('planetJupiter').style.display = 'none';
            document.getElementById('planetSonne').style.display = 'none';

            if (planet === 'erde') {
                document.getElementById('planetErde').style.display = 'block';
                txt.innerText = "Die gute alte Erde. Unser Zuhause.";
                txt.style.color = "#2196F3";
            } else if (planet === 'jupiter') {
                document.getElementById('planetJupiter').style.display = 'block';
                txt.innerText = "Whoa! Der Jupiter ist der größte Planet im Sonnensystem.";
                txt.style.color = "#FF9800";
            } else {
                document.getElementById('planetSonne').style.display = 'block';
                txt.innerText = "Gigantisch! Die Sonne macht 99,8% der Masse unseres Sonnensystems aus.";
                txt.style.color = "#E91E63";
            }
        }

        // 2. Lichtgeschwindigkeit Reaktionszeit (Ziel: 1.30s)
        let startTime, timerInterval;
        let isRunning = false;
        
        function startTimer() {
            document.getElementById('startBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
            document.getElementById('timerResult').innerText = "";
            document.getElementById('timerDisplay').style.color = "#4A148C";
            
            startTime = Date.now();
            isRunning = true;
            
            timerInterval = setInterval(() => {
                let elapsed = (Date.now() - startTime) / 1000;
                document.getElementById('timerDisplay').innerText = elapsed.toFixed(2) + " s";
            }, 10);
        }

        function stopTimer() {
            isRunning = false;
            clearInterval(timerInterval);
            document.getElementById('startBtn').disabled = false;
            document.getElementById('stopBtn').disabled = true;
            
            let finalTime = (Date.now() - startTime) / 1000;
            let resultTxt = document.getElementById('timerResult');
            let display = document.getElementById('timerDisplay');
            
            if (Math.abs(finalTime - 1.30) <= 0.1) {
                resultTxt.innerText = "Perfekt getroffen! Exakt die Zeit, die das Licht zur Erde braucht.";
                display.style.color = "#4CAF50";
            } else if (finalTime < 1.30) {
                resultTxt.innerText = "Zu früh gestoppt! Du warst schneller als das Licht (das ist unmöglich!).";
                display.style.color = "#E91E63";
            } else {
                resultTxt.innerText = "Zu spät! Das Licht ist schon längst an dir vorbeigeflogen.";
                display.style.color = "#FF9800";
            }
        }

        // 3. Schwerkraft-Verzerrer
        function updateGravity() {
            let val = document.getElementById('zoomRange').value;
            let title = document.getElementById('gravTitle');
            let desc = document.getElementById('gravDesc');
            let obj = document.getElementById('gravObject');
            let grid = document.getElementById('gravGrid');
            
            if (val == 1) { 
                title.innerText = "Die Erde";
                desc.innerText = "Mäßige Schwerkraft. Ein leichtes 'Eindellen' des Raums.";
                obj.setAttribute("fill", "#2196F3");
                obj.setAttribute("r", "10");
                grid.setAttribute("d", "M 10 50 Q 100 65 190 50");
            } else if (val == 2) { 
                title.innerText = "Unsere Sonne";
                desc.innerText = "Starke Schwerkraft. Der Raum wird deutlich gebogen!";
                obj.setAttribute("fill", "#FFC107");
                obj.setAttribute("r", "25");
                grid.setAttribute("d", "M 10 50 Q 100 110 190 50");
            } else { 
                title.innerText = "Schwarzes Loch";
                desc.innerText = "Extreme Schwerkraft! Der Raum stürzt ins Unendliche ab.";
                obj.setAttribute("fill", "#000000");
                obj.setAttribute("r", "15"); // Kleiner aber massiver
                grid.setAttribute("d", "M 10 50 Q 100 250 190 50");
            }
        }

        // 4. Fluchtgeschwindigkeits-Tacho
        function calcSpeed() {
            let thrust = parseFloat(document.getElementById('tRange').value);
            
            let v = thrust; // Simple map: 1 thrust = 1 km/s for learning purposes
            
            let txt = document.getElementById('speedText');
            
            if(v >= 11.2) {
                txt.innerText = "Geschwindigkeit: " + v.toFixed(1) + " km/s (Willkommen im All!) 🌌";
                txt.style.color = "#4CAF50";
            } else {
                txt.innerText = "Geschwindigkeit: " + v.toFixed(1) + " km/s (Du fällst zurück zur Erde!) 💥";
                txt.style.color = "#F44336";
            }
            
            // Map 0-15 km/s to 0-180 degrees (roughly)
            let angle = -90 + (v * 12); 
            if(angle > 90) angle = 90;
            
            document.getElementById('tachoNeedle').style.transform = `rotate(${angle}deg)`;
        }

        // 5. Supernova Animation
        function triggerSupernova() {
            let btn = document.getElementById('novaBtn');
            let core = document.getElementById('starCore');
            let lines = document.getElementById('explosionLines');
            let txt = document.getElementById('novaText');
            
            btn.disabled = true;
            txt.innerText = "Schwerkraft gewinnt! Der Kern kollabiert...";
            txt.style.color = "#FF9800";
            
            // Kollaps Animation
            core.style.transition = "all 1s";
            core.setAttribute("r", "5");
            core.setAttribute("fill", "#F44336");
            
            setTimeout(() => {
                txt.innerText = "BOOM! SUPERNOVA!";
                txt.style.color = "#fff";
                
                core.style.animation = "explode 0.8s forwards";
                
                lines.style.display = "block";
                
                // Reset lines animation
                lines.querySelectorAll('line').forEach(l => {
                    l.style.animation = "none";
                    l.offsetHeight; /* trigger reflow */
                    l.style.animation = "dash 1.5s ease-out forwards";
                });
                
            }, 1200);
            
            setTimeout(() => {
                txt.innerText = "Es bleibt Sternenstaub (und vielleicht ein Schwarzes Loch).";
                txt.style.color = "#9C27B0";
                btn.disabled = false;
                
                // Reset for next click
                core.style.animation = "none";
                core.setAttribute("r", "20");
                core.setAttribute("fill", "#FFEB3B");
                lines.style.display = "none";
            }, 4000);
        }

        // Quiz-Logik (unverändert vom Original)
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
                fb.innerText = "❌ Falsch! Lies den Text nochmal und probier es weiter.";
                fb.style.color = "var(--wrong)";
                answered.add(id);
            }
            answered.add(id);
        }
    

function topicInit() {}
