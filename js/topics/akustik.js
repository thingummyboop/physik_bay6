// Logic for akustik.html

        let score = 0;
        let answered = new Set();

        // 1. Stimmgabel
        function strikeFork() {
            const fork = document.getElementById('tuningFork');
            const waves = document.getElementById('soundWavesGrp');
            const txt = document.getElementById('forkText');
            
            fork.classList.add('anim-vibrate');
            waves.style.display = 'block';
            txt.innerText = "BING! Die Gabel schwingt und erzeugt Schallwellen!";
            txt.style.color = "#FF9800";

            setTimeout(() => {
                fork.classList.remove('anim-vibrate');
                waves.style.display = 'none';
                txt.innerText = "Die Stimmgabel ruht.";
                txt.style.color = "#718096";
            }, 3000);
        }

        // 2. Vakuum
        let isVacuum = false;
        const airParticles = document.getElementById('airParticles');
        for(let i=0; i<40; i++) {
            let cx = 130 + Math.random()*140;
            let cy = 50 + Math.random()*140;
            airParticles.innerHTML += `<circle cx="${cx}" cy="${cy}" r="2" fill="#90caf9" class="particle"/>`;
        }

        function toggleVacuum() {
            isVacuum = !isVacuum;
            const btn = document.getElementById('vacBtn');
            const waves = document.getElementById('bellWaves');
            const txt = document.getElementById('vacText');
            const particles = document.querySelectorAll('.particle');

            if(isVacuum) {
                btn.innerText = "Luft wieder einlassen 💨";
                waves.style.display = 'none'; // Ton weg
                particles.forEach(p => p.style.opacity = '0'); // Teilchen weg
                txt.innerText = "Vakuum! Keine Luftteilchen da, die den Schall tragen. Es ist still!";
                txt.style.color = "#E91E63";
            } else {
                btn.innerText = "Luft abpumpen 🌬️";
                waves.style.display = 'block'; // Ton wieder da
                particles.forEach(p => p.style.opacity = '1');
                txt.innerText = "Luft ist drin: Der Wecker ist laut zu hören!";
                txt.style.color = "#2196F3";
            }
        }

        // 3. Oszilloskop
        function drawWave() {
            let freq = parseFloat(document.getElementById('freqRange').value);
            let amp = parseFloat(document.getElementById('ampRange').value);
            
            let freqLbl = freq < 2 ? "Tief" : (freq > 3 ? "Hoch" : "Mittel");
            let ampLbl = amp < 30 ? "Leise" : (amp > 50 ? "Laut" : "Mittel");
            
            document.getElementById('lblFreq').innerText = freqLbl;
            document.getElementById('lblAmp').innerText = ampLbl;

            let path = `M 0 80 `;
            for(let x=0; x<=300; x+=2) {
                // Sinusfunktion: y = 80 - sin(x * frequenz_faktor) * amplitude
                let y = 80 - Math.sin(x * 0.05 * freq) * amp;
                path += `L ${x} ${y} `;
            }
            document.getElementById('osciWave').setAttribute('d', path);
        }
        drawWave(); // Init

        // 4. Gewitter (Schallgeschwindigkeit)
        document.getElementById('distRange').addEventListener('input', function(e) {
            let dist = e.target.value;
            let secs = dist * 3;
            document.getElementById('distText').innerText = `${dist} km (${secs} Sekunden)`;
        });

        function triggerLightning() {
            let btn = document.getElementById('btnLightning');
            let dist = document.getElementById('distRange').value;
            let secs = dist * 3;
            let sky = document.getElementById('skyBox');
            let bolt = document.getElementById('lightningBolt');
            let msg = document.getElementById('thunderMsg');
            let wave = document.getElementById('thunderWave');

            btn.disabled = true;
            
            // Blitz (Licht) - sofort!
            bolt.style.display = 'block';
            sky.style.background = '#fef08a';
            msg.innerText = "BLITZ! (Licht ist rasend schnell bei dir)";
            
            setTimeout(() => {
                bolt.style.display = 'none';
                sky.style.background = '#2d3748';
                msg.innerText = `Schallwelle reist... zähle bis ${secs}!`;
                
                // Schallwelle animieren
                wave.style.opacity = '1';
                wave.style.transition = `r ${secs}s linear`;
                wave.setAttribute('r', '250');

                setTimeout(() => {
                    // Donner kommt an
                    document.getElementById('thunderZone').classList.add('thunder-shake');
                    msg.innerText = "RUMMS! Der Donner ist da!";
                    
                    setTimeout(() => {
                        document.getElementById('thunderZone').classList.remove('thunder-shake');
                        wave.style.transition = 'none';
                        wave.style.opacity = '0';
                        wave.setAttribute('r', '10');
                        msg.innerText = "Warte auf den Blitz...";
                        btn.disabled = false;
                    }, 1000);
                }, secs * 1000); // 1 Sekunde im Leben = 1 Sekunde im Code zur Veranschaulichung
                
            }, 200); // Blitzdauer
        }

        // 5. Echo (Komplett überarbeitet für realistischere Reflexion)
        function sendEcho() {
            let btn = document.getElementById('btnEcho');
            let waveOut = document.getElementById('batSignalOut');
            let waveIn = document.getElementById('butterflyEchoIn');
            let txt = document.getElementById('echoText');
            
            btn.disabled = true;
            txt.innerText = "Sende Ultraschall... PING!";
            
            // Animationen sicherheitshalber zurücksetzen
            waveOut.style.animation = "none";
            waveIn.style.animation = "none";
            void waveOut.offsetWidth; // Zwingt den Browser, das Zurücksetzen sofort umzusetzen
            
            // Welle 1: Von der Fledermaus zum Falter
            waveOut.style.animation = "ping-out 1s linear forwards";
            
            // Nach 1 Sekunde trifft die Welle den Falter
            setTimeout(() => {
                txt.innerText = "Treffer! Der Schall prallt ab...";
                
                // Welle 2: Vom Falter zurück zur Fledermaus
                waveIn.style.animation = "ping-in 1s linear forwards";
                
                // Nach einer weiteren Sekunde ist das Echo wieder bei der Fledermaus
                setTimeout(() => {
                    txt.innerText = "Aha! Echo zurückgekehrt. Ein leckerer Falter!";
                    txt.style.color = "#4CAF50";
                    
                    setTimeout(() => {
                        waveOut.style.animation = "none";
                        waveIn.style.animation = "none";
                        txt.innerText = "Es ist stockdunkel...";
                        txt.style.color = "#63b3ed";
                        btn.disabled = false;
                    }, 2500); // Kurz warten, bevor man wieder klicken kann
                }, 1000);
            }, 1000);
        }

        // 6. Resonanz
        function checkResonance() {
            let val = parseFloat(document.getElementById('resRange').value);
            document.getElementById('resValue').innerText = val.toFixed(1);
            let glass = document.getElementById('glass');
            let txt = document.getElementById('resText');
            let crack = document.getElementById('crack');

            if (val >= 3.8 && val <= 4.2) {
                glass.classList.add('anim-vibrate');
                glass.style.stroke = "#4CAF50";
                glass.style.fill = "rgba(76, 175, 80, 0.2)";
                
                if(val === 4.0) {
                    txt.innerText = "BÄM! Volle Resonanz! Das Glas zerspringt!";
                    txt.style.color = "#E91E63";
                    crack.style.display = "block";
                } else {
                    txt.innerText = "Gefährlich nah an der Eigenfrequenz! Es vibriert stark.";
                    txt.style.color = "#FF9800";
                    crack.style.display = "none";
                }
            } else {
                glass.classList.remove('anim-vibrate');
                glass.style.stroke = "#9C27B0";
                glass.style.fill = "rgba(156, 39, 176, 0.2)";
                crack.style.display = "none";
                txt.innerText = "Das Glas steht still. Keine Resonanz.";
                txt.style.color = "#718096";
            }
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
