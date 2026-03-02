// Logic for arbeit.html

        let score = 0;
        let answered = new Set();

        // 1. Kiste vs Mauer
        function pushWall() {
            let person = document.getElementById('personGroup');
            let arm = document.getElementById('arm');
            let sweat = document.getElementById('sweat');
            
            person.style.transform = 'translateX(280px)';
            // Arm geht relativ zur Figur nach vorn, aber nicht über die Mauer hinaus
            arm.setAttribute('x2', '50'); 
            arm.setAttribute('y2', '80'); 
            sweat.classList.add('anim-sweat');
            
            document.getElementById('workText').innerText = "Du drückst mit viel Kraft, aber nichts bewegt sich (s = 0). Arbeit = 0 Joule!";
            document.getElementById('workText').style.color = "#D32F2F";
            
            setTimeout(() => {
                person.style.transform = 'translateX(40px)';
                arm.setAttribute('x2', '60');
                arm.setAttribute('y2', '100');
                sweat.classList.remove('anim-sweat');
            }, 3000);
        }

        function pushBox() {
            let person = document.getElementById('personGroup');
            let box = document.getElementById('boxGroup');
            let arm = document.getElementById('arm');
            
            person.style.transform = 'translateX(210px)';
            box.style.transform = 'translateX(260px)';
            arm.setAttribute('x2', '50'); 
            arm.setAttribute('y2', '80'); 
            
            document.getElementById('workText').innerText = "Die Kiste bewegt sich! Kraft + Weg = Du hast physikalische Arbeit verrichtet!";
            document.getElementById('workText').style.color = "#2E7D32";
            
            setTimeout(() => {
                person.style.transform = 'translateX(40px)';
                box.style.transform = 'translateX(100px)';
                arm.setAttribute('x2', '60');
                arm.setAttribute('y2', '100');
            }, 3000);
        }

        // 2. Kran (Hubarbeit)
        function liftBeam() {
            document.getElementById('craneRope').setAttribute('y2', '120');
            document.getElementById('craneLoad').style.transform = 'translateY(-100px)';
            document.getElementById('craneText').innerText = "Träger angehoben! Hubarbeit wurde verrichtet (W = m · g · h).";
            document.getElementById('craneText').style.color = "#E65100";
        }
        function dropBeam() {
            document.getElementById('craneRope').setAttribute('y2', '220');
            document.getElementById('craneLoad').style.transform = 'translateY(0px)';
            document.getElementById('craneText').innerText = "Träger unten. Keine Arbeit im System gespeichert.";
            document.getElementById('craneText').style.color = "#455A64";
        }

        // 3. Reibungsschlitten
        let isSand = false;
        function setIce() {
            isSand = false;
            document.getElementById('floor').setAttribute('fill', '#81D4FA');
            document.getElementById('frictionText').innerText = "Boden: Eis. Wenig Reibung = Wenig Kraft = Wenig Arbeit.";
            document.getElementById('frictionText').style.color = "#0288D1";
        }
        function setSand() {
            isSand = true;
            document.getElementById('floor').setAttribute('fill', '#FFCC80');
            document.getElementById('frictionText').innerText = "Boden: Sand. Hohe Reibung = Viel Kraft = Viel Reibungsarbeit!";
            document.getElementById('frictionText').style.color = "#E65100";
        }
        function pullSled() {
            let sled = document.getElementById('sledGroup');
            let rope = document.getElementById('pullRope');
            let sparks = document.getElementById('heatSparks');
            
            let duration = isSand ? "3s" : "1s";
            sled.style.transition = "transform " + duration + " linear";
            rope.style.transition = "transform " + duration + " linear";
            
            sled.style.transform = 'translateX(250px)';
            rope.style.transform = 'translateX(250px)';
            
            if(isSand) {
                sparks.style.opacity = '1';
                sparks.style.animation = "sweat 0.5s infinite";
            }
            
            setTimeout(() => {
                sled.style.transform = 'translateX(20px)';
                rope.style.transform = 'translateX(0px)';
                sparks.style.opacity = '0';
                sparks.style.animation = "none";
            }, isSand ? 3500 : 1500);
        }

        // 4. Schiefe Ebene
        function rollSteep() {
            let ball = document.getElementById('ballGroup');
            ball.style.transition = "none";
            ball.style.transform = 'translate(180px, 170px)';
            
            setTimeout(() => {
                ball.style.transition = "transform 1.5s ease-in-out";
                ball.style.transform = 'translate(280px, 70px)';
                document.getElementById('rampText').innerText = "Kurzer Weg, aber du brauchst viel Kraft!";
                document.getElementById('rampText').style.color = "#D32F2F";
            }, 50);
        }
        function rollFlat() {
            let ball = document.getElementById('ballGroup');
            ball.style.transition = "none";
            ball.style.transform = 'translate(20px, 170px)';
            
            setTimeout(() => {
                ball.style.transition = "transform 2.5s ease-in-out";
                ball.style.transform = 'translate(280px, 70px)';
                document.getElementById('rampText').innerText = "Langer Weg, aber viel weniger Kraft nötig. Arbeit bleibt gleich!";
                document.getElementById('rampText').style.color = "#388E3C";
            }, 50);
        }

        // 5. Verformung (Feder)
        let isCompressed = false;
        function compressSpring() {
            let spring = document.getElementById('springGroup');
            let block = document.getElementById('springBlockGroup');
            let text = document.getElementById('springText');
            let btn = document.getElementById('springBtn');

            isCompressed = !isCompressed;

            if (isCompressed) {
                spring.style.transform = 'scaleX(0.5)';
                block.style.transform = 'translateX(-80px)';
                text.innerText = "Feder zusammengedrückt! Verformungsarbeit wurde verrichtet.";
                text.style.color = "#C62828";
                btn.innerText = "Feder loslassen 🚀";
            } else {
                spring.style.transform = 'scaleX(1)';
                block.style.transform = 'translateX(0px)';
                text.innerText = "Die Feder ist wieder entspannt.";
                text.style.color = "#388E3C";
                btn.innerText = "Feder drücken 🗜️";
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
