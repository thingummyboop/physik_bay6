// Logic for sieinheiten.html

        let score = 0;
        let answered = new Set();

        // 1. Maßband-Chaos (Korrigiert für alle Browser)
        function measure(unit) {
            let txt = document.getElementById('measureText');
            
            // Verstecke alle Markierungen
            document.getElementById('ticksCm').style.display = 'none';
            document.getElementById('ticksFeet').style.display = 'none';
            document.getElementById('ticksHands').style.display = 'none';

            if (unit === 'cm') {
                document.getElementById('ticksCm').style.display = 'block';
                txt.innerText = "Länge: Exakt 20 Zentimeter";
                txt.style.color = "#4CAF50";
            } else if (unit === 'feet') {
                document.getElementById('ticksFeet').style.display = 'block';
                txt.innerText = "Länge: 1,3 riesige Königs-Füße?!";
                txt.style.color = "#FF9800";
            } else {
                document.getElementById('ticksHands').style.display = 'block';
                txt.innerText = "Länge: 15 winzige Baby-Hände?!";
                txt.style.color = "#E91E63";
            }
        }

        // 2. Reaktionszeit
        let startTime, timerInterval;
        let isRunning = false;
        
        function startTimer() {
            document.getElementById('startBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
            document.getElementById('timerResult').innerText = "";
            document.getElementById('timerDisplay').style.color = "#1A237E";
            
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
            
            if (Math.abs(finalTime - 2.00) <= 0.1) {
                resultTxt.innerText = "Wahnsinn! Fast exakt 2 Sekunden! Perfektes Zeitgefühl.";
                display.style.color = "#4CAF50";
            } else if (finalTime < 2.00) {
                resultTxt.innerText = "Zu früh! Du musst länger warten.";
                display.style.color = "#E91E63";
            } else {
                resultTxt.innerText = "Zu spät! Du warst zu langsam.";
                display.style.color = "#FF9800";
            }
        }

        // 3. Zoom / Präfixe (Auch bombensicher gemacht)
        function updateZoom() {
            let val = document.getElementById('zoomRange').value;
            let title = document.getElementById('zoomTitle');
            let desc = document.getElementById('zoomDesc');
            
            // Alles ausblenden
            document.getElementById('zoomMilli').style.display = 'none';
            document.getElementById('zoomMeter').style.display = 'none';
            document.getElementById('zoomKilo').style.display = 'none';
            
            if (val == 1) { 
                title.innerText = "1 Millimeter (mm)";
                desc.innerText = "Winzig! So klein wie eine kleine Ameise.";
                document.getElementById('zoomMilli').style.display = 'block';
            } else if (val == 2) { 
                title.innerText = "1 Meter (m)";
                desc.innerText = "Die Basis! Etwa die Größe eines Kindes oder eines großen Schrittes.";
                document.getElementById('zoomMeter').style.display = 'block';
            } else { 
                title.innerText = "1 Kilometer (km)";
                desc.innerText = "Riesig! Die Strecke durch eine halbe Stadt (1.000 Meter).";
                document.getElementById('zoomKilo').style.display = 'block';
            }
        }

        // 4. Formel-Flitzer
        function calcSpeed() {
            let s = parseFloat(document.getElementById('sRange').value);
            let t = parseFloat(document.getElementById('tRange').value);
            
            document.getElementById('sVal').innerText = s;
            document.getElementById('tVal').innerText = t;
            
            let v = s / t; 
            
            document.getElementById('speedText').innerText = "Geschwindigkeit (v) = " + v.toFixed(1) + " m/s";
            
            let angle = -90 + (v * 4); 
            if(angle > 90) angle = 90;
            
            document.getElementById('tachoNeedle').style.transform = `rotate(${angle}deg)`;
        }

        // 5. Diagramm
        function drawGraph() {
            let btn = document.getElementById('graphBtn');
            let path = document.getElementById('rocketPath');
            let points = document.querySelectorAll('.graphPoint');
            let txt = document.getElementById('graphText');
            
            btn.disabled = true;
            txt.innerText = "Rakete steigt! Das Diagramm zeichnet den Verlauf...";
            
            path.style.animation = "none";
            path.offsetHeight; 
            path.style.animation = "dash 3s linear forwards";
            
            points.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = "1";
                    p.style.transition = "opacity 0.3s";
                }, index * 750);
            });
            
            setTimeout(() => {
                txt.innerText = "Diagramm fertig! Man sieht eine schöne steile Kurve nach oben.";
                btn.disabled = false;
            }, 3500);
        }

        // Quiz-Logik
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
