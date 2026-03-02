// Logic for energie.html

        let score = 0;
        let answered = new Set();

        // 1. Hantel (Lage/Bewegungsenergie)
        function liftWeight() {
            document.getElementById('weightGroup').style.transform = 'translateY(20px)';
            document.getElementById('weightGroup').style.transition = 'transform 2s ease-out';
            document.getElementById('weightText').innerText = "Hantel ist oben! Lageenergie (Potenzielle Energie) ist gespeichert.";
            document.getElementById('weightText').style.color = "#E65100";
            document.getElementById('liftBtn').disabled = true;
            setTimeout(() => { document.getElementById('dropBtn').disabled = false; }, 2000);
        }

        function dropWeight() {
            document.getElementById('weightGroup').style.transform = 'translateY(140px)';
            document.getElementById('weightGroup').style.transition = 'transform 0.3s ease-in';
            document.getElementById('weightText').innerText = "WUSCH! Die Lageenergie hat sich in Bewegungsenergie verwandelt!";
            document.getElementById('weightText').style.color = "#2E7D32";
            document.getElementById('dropBtn').disabled = true;
            setTimeout(() => { document.getElementById('liftBtn').disabled = false; }, 500);
        }

        // 2. Pendel (Energieerhaltung)
        function startPendulum() {
            document.getElementById('pendulumObj').classList.add('anim-swing');
            document.getElementById('pendulumText').innerText = "Das Pendel schwingt! Lageenergie ↔️ Bewegungsenergie.";
            document.getElementById('pendulumText').style.color = "#2E7D32";
        }
        function stopPendulum() {
            document.getElementById('pendulumObj').classList.remove('anim-swing');
            document.getElementById('pendulumText').innerText = "Pendel gestoppt. Die Energie wurde (durch Reibung) an die Luft abgegeben.";
            document.getElementById('pendulumText').style.color = "#D32F2F";
        }

        // 3. Batterie/Taschenlampe
        function insertBattery() {
            let battery = document.getElementById('batterySvg');
            let bulb = document.getElementById('flashlightBulb');
            let beam = document.getElementById('lightBeam');
            let text = document.getElementById('batteryText');
            
            battery.style.transform = 'translateX(20px)'; // Batterie rutscht rein
            
            setTimeout(() => {
                bulb.setAttribute('fill', '#FFF176');
                beam.style.opacity = '0.8';
                text.innerText = "Chemische Energie ➡️ Elektrische Energie ➡️ Lichtenergie!";
                text.style.color = "#F57F17";
            }, 600);
        }

        // 4. Windrad (Erneuerbare Energien)
        function updateWind() {
            let val = document.getElementById('windRange').value;
            let blades = document.getElementById('windBlades');
            let text = document.getElementById('windValue');
            
            if (val == 0) {
                blades.classList.remove('anim-spin');
                text.innerText = "0% (Windstill - Kein Strom)";
                text.style.color = "#0288D1";
            } else {
                blades.classList.add('anim-spin');
                // Je höher der Wert, desto kleiner die Dauer (schneller)
                let duration = 3 - (val * 0.028); 
                blades.style.animationDuration = duration + 's';
                
                if(val < 40) {
                    text.innerText = val + "% (Leichte Brise - Etwas Strom)";
                    text.style.color = "#43A047";
                } else if(val < 80) {
                    text.innerText = val + "% (Starker Wind - Viel Strom!)";
                    text.style.color = "#F57F17";
                } else {
                    text.innerText = val + "% (Sturm - Volle Power!)";
                    text.style.color = "#D84315";
                }
            }
        }

        // 5. Stromkreis
        let isClosed = false;
        function toggleSwitch() {
            let line = document.getElementById('switchLine');
            let bulb = document.getElementById('circuitBulb');
            let text = document.getElementById('circuitText');
            let btn = document.getElementById('switchBtn');

            isClosed = !isClosed;

            if (isClosed) {
                line.setAttribute('x2', '150');
                line.setAttribute('y2', '40');
                bulb.setAttribute('fill', '#FFEB3B'); // Lampe an
                text.innerText = "Kreis ist geschlossen! Die Elektronen fließen, Lampe leuchtet.";
                text.style.color = "#388E3C";
                btn.innerText = "Schalter öffnen 🛑";
            } else {
                line.setAttribute('x2', '140');
                line.setAttribute('y2', '20');
                bulb.setAttribute('fill', '#E0E0E0'); // Lampe aus
                text.innerText = "Stromkreis ist unterbrochen. Die Lampe ist aus.";
                text.style.color = "#D32F2F";
                btn.innerText = "Schalter schließen 🔌";
            }
        }

        // Quiz-Logik (unverändert zur Wärmelehre)
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
