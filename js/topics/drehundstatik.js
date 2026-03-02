// Logic for drehundstatik.html

        let score = 0;
        let answered = new Set();
        let skaterAnim; // Wird ganz unten initialisiert

        // 1. Schwerpunkt (Seiltänzer)
        function updateBalance() {
            let val = parseInt(document.getElementById('cgRange').value);
            let acrobat = document.getElementById('acrobat');
            let marker = document.getElementById('cgMarker');
            let txt = document.getElementById('balanceText');
            
            marker.style.transform = `translateX(${val}px)`;
            
            if (val > 25) {
                acrobat.style.transform = 'rotate(70deg)';
                txt.innerText = "Oh nein! Zu weit rechts! Der Artist fällt!";
                txt.style.color = "#D32F2F";
            } else if (val < -25) {
                acrobat.style.transform = 'rotate(-70deg)';
                txt.innerText = "Achtung! Zu weit links! Absturz!";
                txt.style.color = "#D32F2F";
            } else {
                let tilt = val * 0.5;
                acrobat.style.transform = `rotate(${tilt}deg)`;
                txt.innerText = "Sicher ausbalanciert! Der Schwerpunkt ist über dem Seil.";
                txt.style.color = "#00796B";
            }
        }

        // 2. Drehmoment (Tür)
        function pushDoor(pos) {
            let door = document.getElementById('door');
            let arrow = document.getElementById('forceArrow');
            let arrowLine = document.getElementById('arrowLine');
            let arrowHead = document.getElementById('arrowHead');
            let txt = document.getElementById('doorText');
            
            arrow.style.display = 'block';
            
            if(pos === 'hinge') {
                arrow.style.transform = 'translateX(65px)';
                arrowLine.setAttribute('stroke', '#F44336');
                arrowHead.setAttribute('fill', '#F44336');
                door.style.transform = 'rotate(-5deg)';
                txt.innerText = "Puh! Extrem anstrengend. Der Hebelarm ist winzig, das Drehmoment reicht kaum aus!";
                txt.style.color = "#D32F2F";
            } else if(pos === 'middle') {
                arrow.style.transform = 'translateX(180px)';
                arrowLine.setAttribute('stroke', '#FF9800');
                arrowHead.setAttribute('fill', '#FF9800');
                door.style.transform = 'rotate(-45deg)'; 
                txt.innerText = "Es geht schon besser, aber du brauchst immer noch ziemlich viel Muskelkraft.";
                txt.style.color = "#F57C00";
            } else {
                arrow.style.transform = 'translateX(280px)';
                arrowLine.setAttribute('stroke', '#4CAF50');
                arrowHead.setAttribute('fill', '#4CAF50');
                door.style.transform = 'rotate(-85deg)';
                txt.innerText = "Perfekt! Du drückst ganz außen. Der lange Hebelarm erzeugt ein riesiges Drehmoment!";
                txt.style.color = "#388E3C";
            }
            
            arrow.animate([
                { transform: arrow.style.transform + ' translateY(0px)' },
                { transform: arrow.style.transform + ' translateY(-15px)' }
            ], { duration: 300, iterations: 2, direction: 'alternate' });
            
            setTimeout(() => {
                door.style.transform = 'rotate(0deg)';
                arrow.style.display = 'none';
            }, 3000);
        }

        // 3. Gleichgewichtsarten (GEFIXT: Saubere Pfade und präzise Koordinaten)
        function testEquilibrium(type) {
            let pStable = document.getElementById('pathStable');
            let pUnstable = document.getElementById('pathUnstable');
            let pIndiff = document.getElementById('pathIndiff');
            let marble = document.getElementById('marble');
            let txt = document.getElementById('eqText');
            
            pStable.style.display = 'none';
            pUnstable.style.display = 'none';
            pIndiff.style.display = 'none';
            
            // Sofortiger Sprung ohne Transition
            marble.style.transition = 'none'; 
            
            if (type === 'stable') {
                pStable.style.display = 'block';
                marble.setAttribute('cx', '50');
                marble.setAttribute('cy', '40'); // Oben links auf der Schale
                txt.innerText = "Stabil: Du stupst sie an, sie rollt in die Mitte zurück und bleibt sicher liegen.";
                
                setTimeout(() => {
                    marble.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
                    marble.setAttribute('cx', '150'); // Mitte der X-Achse
                    marble.setAttribute('cy', '115'); // Unten in der Schale
                }, 50);

            } else if (type === 'unstable') {
                pUnstable.style.display = 'block';
                marble.setAttribute('cx', '150'); 
                marble.setAttribute('cy', '65'); // Exakt auf der Spitze
                txt.innerText = "Labil: Ein kleiner Windhauch, und sie stürzt ab – und kommt nie wieder hoch!";
                
                setTimeout(() => {
                    marble.style.transition = 'all 1s cubic-bezier(0.5, 0, 1, 1)'; // Beschleunigter Fall
                    marble.setAttribute('cx', '250'); 
                    marble.setAttribute('cy', '140'); // Fällt nach rechts unten
                }, 400); 

            } else {
                pIndiff.style.display = 'block';
                marble.setAttribute('cx', '100'); 
                marble.setAttribute('cy', '90'); // Flach auf der Linie
                txt.innerText = "Indifferent: Du stupst sie an, sie rollt ein Stückchen und bleibt genau dort liegen.";
                
                setTimeout(() => {
                    marble.style.transition = 'all 1s ease-out';
                    marble.setAttribute('cx', '200'); // Rollt gemütlich weiter
                }, 50);
            }
        }

        // 4. Fliehkraft Karussell (GEFIXT: Stangen strecken sich nun mit)
        function updateCarousel() {
            let speed = parseInt(document.getElementById('speedRange').value);
            let carousel = document.getElementById('carousel');
            
            let rider1 = document.getElementById('rider');
            let arm1 = document.getElementById('cArm1'); // Neu
            
            let rider2 = document.getElementById('rider2');
            let arm2 = document.getElementById('cArm2'); // Neu
            
            let speedTxt = document.getElementById('speedValue');
            
            if(speed === 0) {
                carousel.style.animation = 'none';
                speedTxt.innerText = "Steht still";
                
                // Zurücksetzen
                rider1.setAttribute('cy', '40');
                arm1.setAttribute('y2', '40');
                
                rider2.setAttribute('cy', '160');
                arm2.setAttribute('y2', '160');
            } else {
                // Dynamische CSS-Animation injizieren falls nötig, oder vorhandene nutzen
                // Ein Trick ohne @keyframes neu zu definieren:
                let duration = 3 - (speed / 100) * 2.8; 
                carousel.style.animation = `spinFast ${duration}s linear infinite`;
                // Die @keyframes 'spinFast' definieren wir dynamisch neu falls nicht in CSS, 
                // aber sie war im vorigen CSS schon drin (jetzt im Code oben versteckt? Nein, bauen wir sie kurz ein)
                if(!document.getElementById('dynStyle')) {
                    let s = document.createElement('style');
                    s.id = 'dynStyle';
                    s.innerHTML = `@keyframes spinFast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
                    document.head.appendChild(s);
                }
                
                speedTxt.innerText = `Stufe ${speed} (Rotationsdauer: ${duration.toFixed(1)}s)`;
                
                // Fliehkraft drückt nach außen
                let stretch = (speed / 100) * 45; 
                
                // Sitz UND Stange anpassen
                rider1.setAttribute('cy', 40 - stretch);
                arm1.setAttribute('y2', 40 - stretch);
                
                rider2.setAttribute('cy', 160 + stretch);
                arm2.setAttribute('y2', 160 + stretch);
            }
        }

        // 5. Drehimpuls (GEFIXT: Web Animations API für ruckelfreies Rotieren)
        function setSkater(state) {
            let armL = document.getElementById('armLeft');
            let armR = document.getElementById('armRight');
            let txt = document.getElementById('skaterText');
            let bOut = document.getElementById('btnOut');
            let bIn = document.getElementById('btnIn');
            
            if (state === 'in') {
                armL.setAttribute('x2', '85');
                armR.setAttribute('x2', '115');
                
                // Animation ruckelfrei stark beschleunigen (Playback Rate erhöhen)
                skaterAnim.playbackRate = 8; 
                
                txt.innerText = "Arme angezogen: Die Masse ist nah der Drehachse. Das Drehen wird EXTREM SCHNELL!";
                txt.style.color = "#D32F2F";
                bIn.disabled = true;
                bOut.disabled = false;
            } else {
                armL.setAttribute('x2', '30');
                armR.setAttribute('x2', '170');
                
                // Animation ruckelfrei wieder auf normal setzen
                skaterAnim.playbackRate = 1;
                
                txt.innerText = "Arme draußen: Die Masse ist weit außen verteilt. Das Drehen wird stark gebremst.";
                txt.style.color = "#0288D1";
                bOut.disabled = true;
                bIn.disabled = false;
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

        // Initialisierungen, die direkt beim Start gebraucht werden
        window.addEventListener('DOMContentLoaded', () => {
            // Skater-Animation mit der Web Animations API einrichten
            let skater = document.getElementById('skater');
            skaterAnim = skater.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ], {
                duration: 4000, // Basis-Geschwindigkeit (langsam)
                iterations: Infinity
            });
            
            // 3. Murmel an die richtige Position setzen
            testEquilibrium('stable');
        });
    

function topicInit() {}
