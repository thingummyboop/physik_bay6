// Logic for wärmelehre.html

        let score = 0;
        let answered = new Set();

        // 1. Teilchenmodell
        const particleSvg = document.getElementById('particleSvg');
        let particlesData = [];
        for(let i=0; i<60; i++) {
            let p = {
                x: 20 + Math.random() * 260,
                y: 20 + Math.random() * 160,
                el: document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            };
            p.el.setAttribute('cx', p.x);
            p.el.setAttribute('cy', p.y);
            p.el.setAttribute('r', '5');
            p.el.setAttribute('fill', '#1976D2');
            particleSvg.appendChild(p.el);
            particlesData.push(p);
        }

        let animationId;
        function animateParticles() {
            let temp = parseFloat(document.getElementById('tempRange').value);
            let speed = temp * 0.1; // Je wärmer, desto mehr Wackeln
            let color = temp < 40 ? '#1976D2' : (temp < 70 ? '#FF9800' : '#E53935');
            
            let bgBox = document.getElementById('particleBox');
            bgBox.style.background = temp < 40 ? '#e3f2fd' : (temp < 70 ? '#fff3e0' : '#ffebee');
            
            let tempLabel = temp < 40 ? "Kalt" : (temp < 70 ? "Warm" : "Heiß!");
            let txt = document.getElementById('tempValue');
            txt.innerText = `${temp}°C (${tempLabel})`;
            txt.style.color = color;

            particlesData.forEach(p => {
                let jitterX = (Math.random() - 0.5) * speed;
                let jitterY = (Math.random() - 0.5) * speed;
                
                // Begrenzen in der Box
                let newX = p.x + jitterX;
                let newY = p.y + jitterY;
                if(newX > 10 && newX < 290) p.x = newX;
                if(newY > 10 && newY < 190) p.y = newY;

                p.el.setAttribute('cx', p.x);
                p.el.setAttribute('cy', p.y);
                p.el.setAttribute('fill', color);
            });

            animationId = requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // 2. Wärmeleitung
        function heatSoup() {
            let btn = document.getElementById('soupBtn');
            let mSpoon = document.getElementById('metalSpoon');
            let mSpoonBowl = document.getElementById('metalSpoonBowl');
            let soup = document.getElementById('soupLiquid');
            let txt = document.getElementById('soupText');

            btn.disabled = true;
            soup.setAttribute('fill', '#FF5722'); // Suppe wird heiß
            txt.innerText = "Suppe kocht! Die Wärme wandert den Metalllöffel hinauf...";
            txt.style.color = "#FF5722";

            setTimeout(() => {
                mSpoonBowl.setAttribute('fill', '#ef5350');
                mSpoon.setAttribute('fill', '#ef5350'); // Metall leitet (wird rot)
                txt.innerText = "Aua! Der Metalllöffel ist oben heiß! Das Holz bleibt kalt.";
                
                setTimeout(() => {
                    mSpoon.setAttribute('fill', '#cfd8dc');
                    mSpoonBowl.setAttribute('fill', '#cfd8dc');
                    soup.setAttribute('fill', '#ffb74d');
                    txt.innerText = "Alles wieder abgekühlt.";
                    txt.style.color = "#718096";
                    btn.disabled = false;
                }, 4000);
            }, 500);
        }

        // 3. Wärmestrahlung
        let sunTimer;
        function sunShine() {
            let btn = document.getElementById('sunBtn');
            btn.disabled = true;
            
            document.getElementById('sunRayBlack').style.display = 'block';
            document.getElementById('sunRayWhite').style.display = 'block';
            document.getElementById('bounceRay').style.display = 'block';
            
            let tempB = 20;
            let tempW = 20;
            let tBlack = document.getElementById('tempBlack');
            let tWhite = document.getElementById('tempWhite');
            let txt = document.getElementById('sunText');
            
            txt.innerText = "Die Strahlung trifft auf! Schwarz absorbiert, Weiß reflektiert.";

            sunTimer = setInterval(() => {
                tempB += 2;
                tempW += 0.5;
                tBlack.innerText = Math.floor(tempB) + "°C";
                tWhite.innerText = Math.floor(tempW) + "°C";
                
                if(tempB >= 60) {
                    clearInterval(sunTimer);
                    txt.innerText = "Puh! 60°C im schwarzen Auto. Im weißen ist es viel angenehmer!";
                    setTimeout(() => {
                        document.getElementById('sunRayBlack').style.display = 'none';
                        document.getElementById('sunRayWhite').style.display = 'none';
                        document.getElementById('bounceRay').style.display = 'none';
                        tBlack.innerText = "20°C";
                        tWhite.innerText = "20°C";
                        txt.innerText = "";
                        btn.disabled = false;
                    }, 4000);
                }
            }, 100);
        }

        // 4. Konvektion (Ballon)
        let balloonY = 120;
        let burnerInterval;
        let coolingInterval;
        
        function startBurner() {
            clearInterval(coolingInterval);
            document.getElementById('burnerFlame').style.display = 'block';
            burnerInterval = setInterval(() => {
                balloonY -= 2;
                if(balloonY < -20) balloonY = -20;
                document.getElementById('hotAirBalloon').style.transform = `translateY(${balloonY}px)`;
            }, 20);
        }

        function stopBurner() {
            clearInterval(burnerInterval);
            document.getElementById('burnerFlame').style.display = 'none';
            coolingInterval = setInterval(() => {
                balloonY += 1;
                if(balloonY > 120) balloonY = 120;
                document.getElementById('hotAirBalloon').style.transform = `translateY(${balloonY}px)`;
                if(balloonY >= 120) clearInterval(coolingInterval);
            }, 30);
        }

        // 5. Aggregatzustände
        function setPhase(phase) {
            document.getElementById('phaseIce').style.display = 'none';
            document.getElementById('phaseWater').style.display = 'none';
            document.getElementById('phaseSteam').style.display = 'none';
            
            let txt = document.getElementById('phaseText');
            
            if(phase === 'ice') {
                document.getElementById('phaseIce').style.display = 'block';
                txt.innerText = "Fest (Eis): Die Teilchen sitzen starr als Gitter zusammen.";
                txt.style.color = "#1976D2";
            } else if(phase === 'water') {
                document.getElementById('phaseWater').style.display = 'block';
                txt.innerText = "Flüssig (Wasser): Die Teilchen sind gelöst und schwimmen wild durcheinander.";
                txt.style.color = "#0288D1";
            } else {
                document.getElementById('phaseSteam').style.display = 'block';
                txt.innerText = "Gasförmig (Dampf): Die Teilchen haben viel Energie und fliegen komplett auseinander!";
                txt.style.color = "#78909C";
            }
        }

        // 6. Ausdehnung (Thermometer)
        function updateThermometer() {
            let val = document.getElementById('thermoRange').value;
            let liquid = document.getElementById('thermoLiquid');
            
            // val=0 -> height=0, y=200
            // val=100 -> height=100, y=100
            let newHeight = val * 1; 
            let newY = 200 - newHeight;
            
            liquid.setAttribute('height', newHeight);
            liquid.setAttribute('y', newY);
        }

        // Quiz-Logik (unverändert)
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
