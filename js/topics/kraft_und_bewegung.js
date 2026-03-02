// Logic for kraft und bewegung.html

        let score = 0;
        let answered = new Set();

        // 1. Trägheit (Ball schubsen)
        let ballTimer;
        function kickBall() {
            let ball = document.getElementById('spaceBall');
            let txt = document.getElementById('kickText');
            
            ball.style.transition = 'transform 6s linear'; // Gleichförmige Bewegung
            ball.style.transform = 'translateX(800px)'; 
            
            txt.innerText = "Der Ball fliegt und fliegt und fliegt... Es gibt keine Reibung im Weltall!";
        }
        function resetBall() {
            let ball = document.getElementById('spaceBall');
            let txt = document.getElementById('kickText');
            ball.style.transition = 'none'; // Sofort zurück
            ball.style.transform = 'translateX(0px)';
            txt.innerText = "";
        }

        // 2. Reibung
        function pushBlocks() {
            let ice = document.getElementById('iceBlock');
            let sand = document.getElementById('sandBlock');
            
            // Zurücksetzen
            ice.style.transition = 'none';
            sand.style.transition = 'none';
            ice.style.transform = 'translateX(0)';
            sand.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                // Anschubsen
                ice.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                sand.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)'; // stoppt abrupt
                
                ice.style.transform = 'translateX(400px)'; // rutscht weit
                sand.style.transform = 'translateX(60px)';  // bleibt schnell hängen
            }, 50);
        }

        // 3. Schwerkraft (Vakuum)
        function dropItems(isVacuum) {
            let apple = document.getElementById('apple');
            let feather = document.getElementById('feather');
            let txt = document.getElementById('gravityText');
            
            // Reset
            apple.style.transition = 'none';
            feather.style.transition = 'none';
            apple.style.transform = 'translateY(20px)';
            feather.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                apple.style.transition = 'transform 1s cubic-bezier(0.5, 0, 1, 1)'; // Fall-Beschleunigung
                apple.style.transform = 'translateY(215px)';
                
                if(isVacuum) {
                    feather.style.transition = 'transform 1s cubic-bezier(0.5, 0, 1, 1)';
                    feather.style.transform = 'translateY(225px)';
                    txt.innerText = "Im Vakuum gibt es keinen Luftwiderstand. Beide fallen exakt gleich schnell!";
                    txt.style.color = "#E91E63";
                } else {
                    feather.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.6, 1)'; // Fällt langsamer wegen Luft
                    feather.style.transform = 'translateY(225px)';
                    txt.innerText = "Mit Luft: Der Apfel ist schwer und klein, er fällt schnell. Die Luft bremst die breite Feder ab!";
                    txt.style.color = "#1976D2";
                }
            }, 50);
        }

        // 4. Rakete (Aktion/Reaktion)
        function launchRocket() {
            let rocket = document.getElementById('rocket');
            let flame = document.getElementById('rocketFlame');
            
            flame.style.display = 'block';
            flame.classList.add('anim-shake');
            
            // Vorzündung
            setTimeout(() => {
                rocket.style.transform = 'translateY(-100px)';
                setTimeout(() => {
                    flame.style.display = 'none';
                    rocket.style.transform = 'translateY(200px)'; // Reset nachflug
                }, 2500);
            }, 500);
        }

        // 5. Hebelwirkung
        function updateLever() {
            let val = document.getElementById('leverRange').value;
            let fulcrum = document.getElementById('fulcrum');
            let seesaw = document.getElementById('seesawGroup');
            let txt = document.getElementById('leverText');
            let txtPos = document.getElementById('leverValue');
            
            // val 10 = ganz links (beim Elefant), val 90 = ganz rechts (beim roten Gewicht)
            // Pixel-Bereich für das Dreieck: x zwischen 40 und 260.
            let pixelX = 40 + ((val - 10) / 80) * 220;
            fulcrum.style.transform = `translateX(${pixelX - 150}px)`; // -150 weil startpunkt bei 150 ist
            seesaw.style.transformOrigin = `${pixelX}px 70px`;
            
            if (val < 40) {
                // Drehpunkt nah am Elefant -> Rotes Gewicht hat RIESIGEN Hebelarm
                seesaw.style.transform = 'rotate(15deg)';
                txt.innerText = "Super! Der Hebelarm auf der roten Seite ist so lang, dass das kleine Gewicht den Elefanten hochhebt!";
                txt.style.color = "#4CAF50";
                txtPos.innerText = "Nah an der Last (Perfekt!)";
            } else if (val > 60) {
                // Drehpunkt nah am Roten Gewicht -> Elefant gewinnt extrem
                seesaw.style.transform = 'rotate(-25deg)';
                txt.innerText = "Oh nein! Der Hebelarm beim Elefanten ist viel zu lang. Er knallt auf den Boden.";
                txt.style.color = "#F44336";
                txtPos.innerText = "Nah an der Kraft (Schlecht!)";
            } else {
                // Mitte
                seesaw.style.transform = 'rotate(-15deg)';
                txt.innerText = "Beide Arme sind ähnlich lang. Der Elefant ist zu schwer, die Wippe kippt nach links!";
                txt.style.color = "#E91E63";
                txtPos.innerText = "Mitte";
            }
        }
        // Initialer Aufruf
        updateLever();

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
