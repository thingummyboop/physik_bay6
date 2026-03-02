// Logic for linsen, spiegel.html

        let score = 0;
        let answered = new Set();

        // 1. Reflexion
        function updateReflection(val) {
            const rayIn = document.getElementById('rayIn');
            const rayOut = document.getElementById('rayOut');
            const dx = parseInt(val); 
            rayIn.setAttribute('d', `M ${200 - dx} 40 L 200 160`);
            rayOut.setAttribute('d', `M 200 160 L ${200 + dx} 40`);
        }

        // 2. Brechung
        function setMedium(type) {
            const box = document.getElementById('mediumBox');
            const ray = document.getElementById('refractedRay');
            const txt = document.getElementById('mediumText');
            
            if(type === 'air') {
                box.setAttribute('fill', 'transparent');
                ray.setAttribute('d', 'M 200 100 L 280 180'); 
                txt.innerText = "Aktuell: Luft (Gleiche Dichte, Strahl geht einfach geradeaus)";
            } else if(type === 'water') {
                box.setAttribute('fill', '#ebf8ff'); 
                ray.setAttribute('d', 'M 200 100 L 250 180'); 
                txt.innerText = "Aktuell: Wasser (Strahl knickt zum Lot hin ab)";
            } else if(type === 'glass') {
                box.setAttribute('fill', '#e2e8f0'); 
                ray.setAttribute('d', 'M 200 100 L 230 180'); 
                txt.innerText = "Aktuell: Glas (Höhere Dichte, starker Knick zum Lot!)";
            }
        }

        // 3. Linsen
        let isConvex = true;
        function toggleLens() {
            const shape = document.getElementById('lensShape');
            const rayTop = document.getElementById('rayTopLens');
            const rayMid = document.getElementById('rayMidLens');
            const rayBot = document.getElementById('rayBotLens');
            const fReal = document.getElementById('focalPointReal');
            const fVirtual = document.getElementById('focalPointVirtual');
            const vRays = document.getElementById('virtualLensRays');
            const txt = document.getElementById('lensText');
            
            isConvex = !isConvex;
            if(isConvex) {
                shape.setAttribute('d', 'M 200 40 Q 230 120 200 200 Q 170 120 200 40');
                rayTop.setAttribute('d', 'M 200 80 L 320 120');
                rayBot.setAttribute('d', 'M 200 160 L 320 120');
                fReal.style.opacity = "1";
                fVirtual.style.opacity = "0";
                vRays.style.opacity = "0";
                txt.innerText = "Sammellinse (Konvex): Bündelt alle Strahlen im Brennpunkt!";
                txt.style.color = "#E91E63";
            } else {
                shape.setAttribute('d', 'M 180 40 L 220 40 Q 200 120 220 200 L 180 200 Q 200 120 180 40 Z'); 
                rayTop.setAttribute('d', 'M 200 80 L 320 40');  
                rayBot.setAttribute('d', 'M 200 160 L 320 200'); 
                fReal.style.opacity = "0";
                fVirtual.style.opacity = "1";
                vRays.style.opacity = "1";
                txt.innerText = "Zerstreuungslinse (Konkav): Streut das Licht weg!";
                txt.style.color = "#3182ce";
            }
        }

        // 4. Beugung
        let slitState = 0; 
        function narrowSlit() {
            const wallTop = document.getElementById('wallTop');
            const wallBot = document.getElementById('wallBot');
            const wavesBroad = document.getElementById('wavesBroad');
            const wavesNarrow = document.getElementById('wavesNarrow');
            const txt = document.getElementById('slitText');

            slitState = (slitState + 1) % 2;

            if (slitState === 0) {
                wallTop.setAttribute('height', '60');
                wallBot.setAttribute('y', '140');
                wallBot.setAttribute('height', '60');
                wavesBroad.style.display = "block";
                wavesNarrow.style.display = "none";
                txt.innerText = "Breiter Spalt: Das Licht geht fast nur als gerade Welle (Wellenfront) durch.";
            } else {
                wallTop.setAttribute('height', '95');
                wallBot.setAttribute('y', '105');
                wallBot.setAttribute('height', '95');
                wavesBroad.style.display = "none";
                wavesNarrow.style.display = "block";
                txt.innerText = "Sehr enger Spalt: Starke Beugung! Huygens' neue Kreiswellen entstehen.";
            }
        }

        // 5. Gekrümmte Spiegel
        let isConcave = true;
        function toggleMirror() {
            const shape = document.getElementById('mirrorShape');
            const inRayTop = document.getElementById('inRayTop');
            const inRayMid = document.getElementById('inRayMid');
            const inRayBot = document.getElementById('inRayBot');
            const rayTop = document.getElementById('mirrorRayTop');
            const rayMid = document.getElementById('mirrorRayMid');
            const rayBot = document.getElementById('mirrorRayBot');
            const fReal = document.getElementById('mirrorFocusReal');
            const fVirtual = document.getElementById('mirrorFocusVirtual');
            const vRays = document.getElementById('virtualMirrorRays');
            const txt = document.getElementById('mirrorText');

            isConcave = !isConcave;
            if(isConcave) {
                shape.setAttribute('d', 'M 270 40 Q 320 120 270 200');
                inRayTop.setAttribute('d', 'M 40 80 L 280 80');
                inRayMid.setAttribute('d', 'M 40 120 L 295 120');
                inRayBot.setAttribute('d', 'M 40 160 L 280 160');

                rayTop.setAttribute('d', 'M 280 80 L 40 160');
                rayMid.setAttribute('d', 'M 295 120 L 40 120');
                rayBot.setAttribute('d', 'M 280 160 L 40 80');

                fReal.setAttribute('cx', '160');
                fReal.style.opacity = "1";
                fVirtual.style.opacity = "0";
                vRays.style.opacity = "0";
                txt.innerText = "Hohlspiegel (Konkav): Bündelt das Licht wie eine Sammellinse.";
                txt.style.color = "#E91E63";
            } else {
                shape.setAttribute('d', 'M 310 40 Q 260 120 310 200'); 
                inRayTop.setAttribute('d', 'M 40 80 L 300 80');
                inRayMid.setAttribute('d', 'M 40 120 L 285 120');
                inRayBot.setAttribute('d', 'M 40 160 L 300 160');

                rayTop.setAttribute('d', 'M 300 80 L 30 -40'); 
                rayMid.setAttribute('d', 'M 285 120 L 40 120'); 
                rayBot.setAttribute('d', 'M 300 160 L 30 280'); 
                
                fReal.style.opacity = "0";
                fVirtual.setAttribute('cx', '390');
                fVirtual.style.opacity = "1";
                vRays.style.opacity = "1";
                
                document.getElementById('vRayTop').setAttribute('x1', '300');
                document.getElementById('vRayTop').setAttribute('y1', '80');
                document.getElementById('vRayTop').setAttribute('x2', '390');
                document.getElementById('vRayTop').setAttribute('y2', '120');
                
                document.getElementById('vRayBot').setAttribute('x1', '300');
                document.getElementById('vRayBot').setAttribute('y1', '160');
                document.getElementById('vRayBot').setAttribute('x2', '390');
                document.getElementById('vRayBot').setAttribute('y2', '120');

                txt.innerText = "Wölbspiegel (Konvex): Streut Licht, virtueller Fokus hinten.";
                txt.style.color = "#3182ce";
            }
        }

        // 6. MIKROSKOP VERTIKAL
        function updateVerticalMicroscope() {
            let g = parseFloat(document.getElementById('microObjDist').value);
            let d = parseFloat(document.getElementById('microTubeDist').value);
            
            let f_obj = 20; 
            let f_oc = 30;  
            
            let y_obj_base = 270;
            let y_obj_tip = 260;
            let x_obj_tip = 115;
            let x_center = 125;
            
            let y_obj_lens = y_obj_base - g;
            let y_oc_lens = y_obj_lens - d;
            
            document.getElementById('vertObjLensGrp').setAttribute('transform', `translate(0, ${y_obj_lens})`);
            document.getElementById('vertOcLensGrp').setAttribute('transform', `translate(0, ${y_oc_lens})`);
            
            let b = 1 / ((1/f_obj) - (1/g));
            let y_int = y_obj_lens - b;
            let M1 = b / g; 
            let x_int = x_center + (x_center - x_obj_tip) * M1; 
            
            let arrowTip = x_int > x_center ? x_int-5 : x_int+5;
            document.getElementById('vertIntLine').setAttribute('y1', y_int);
            document.getElementById('vertIntLine').setAttribute('y2', y_int);
            document.getElementById('vertIntLine').setAttribute('x2', x_int);
            document.getElementById('vertIntArrow').setAttribute('points', `${x_int},${y_int} ${arrowTip},${y_int-4} ${arrowTip},${y_int+4}`);
            
            let y_oc_focus = y_oc_lens + f_oc;
            document.getElementById('vertOcFocus').setAttribute('cy', y_oc_focus);
            document.getElementById('vertOcFocusText').setAttribute('y', y_oc_focus + 5);
            
            let x_oc_hit1 = x_int + (x_int - x_obj_tip) * (y_oc_lens - y_int) / (y_int - y_obj_lens);
            let x_oc_hit2 = x_int + (x_int - x_center) * (y_oc_lens - y_int) / (y_int - y_obj_lens);
            
            document.getElementById('vertRay1').setAttribute('d', `M ${x_obj_tip} ${y_obj_tip} L ${x_obj_tip} ${y_obj_lens} L ${x_int} ${y_int} L ${x_oc_hit1} ${y_oc_lens}`);
            document.getElementById('vertRay2').setAttribute('d', `M ${x_obj_tip} ${y_obj_tip} L ${x_center} ${y_obj_lens} L ${x_int} ${y_int} L ${x_oc_hit2} ${y_oc_lens}`);
            
            let error = Math.abs(y_int - y_oc_focus);
            let blur = Math.min(15, error * 0.4);
            let scale = Math.max(0.4, M1 * 0.55); 
            
            let viewInner = document.getElementById('microViewInner');
            viewInner.style.filter = `blur(${blur}px)`;
            viewInner.style.transform = `scale(${scale})`;
            
            let status = document.getElementById('microViewStatus');
            if (error < 1.5) {
                status.innerHTML = "✅ Gestochen scharf!";
                status.style.color = "#4CAF50";
            } else if (y_int > y_oc_focus) {
                status.innerHTML = "❌ Unscharf: Okular zu nah am Bild.";
                status.style.color = "#E91E63";
            } else {
                status.innerHTML = "❌ Unscharf: Okular zu weit weg.";
                status.style.color = "#E91E63";
            }
        }
        updateVerticalMicroscope();

        // 7. Teleskope
        let isRefractor = true;
        function toggleTelescope() {
            const refractor = document.getElementById('refractorGrp');
            const reflector = document.getElementById('reflectorGrp');

            isRefractor = !isRefractor;
            if(isRefractor) {
                refractor.style.display = "block";
                reflector.style.display = "none";
            } else {
                refractor.style.display = "none";
                reflector.style.display = "block";
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
