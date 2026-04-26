// Logic for linsen_spiegel topic
let isConvex = true;
let slitState = 0; 
let isConcave = true;
let isRefractor = true;

function topicInit() {
    updateVerticalMicroscope();
    if (document.getElementById('fiberAngle')) updateFiber(20);
    if (document.getElementById('eyeLens')) focusEye('far');
    initSlitMachine();
}

// 1. Reflexion
function updateReflection(val) {
    const rayIn = document.getElementById('rayIn');
    const rayOut = document.getElementById('rayOut');
    if(!rayIn || !rayOut) return;
    const dx = parseInt(val); 
    rayIn.setAttribute('d', `M ${200 - dx} 40 L 200 160`);
    rayOut.setAttribute('d', `M 200 160 L ${200 + dx} 40`);
}

// 2. Brechung
function setMedium(type) {
    const box = document.getElementById('mediumBox');
    const ray = document.getElementById('refractedRay');
    const txt = document.getElementById('mediumText');
    if(!box || !ray) return;
    
    if(type === 'air') {
        box.setAttribute('fill', 'transparent');
        ray.setAttribute('d', 'M 200 100 L 280 180'); 
        if(txt) txt.innerText = "Aktuell: Luft (Gleiche Dichte, Strahl geht einfach geradeaus)";
    } else if(type === 'water') {
        box.setAttribute('fill', '#ebf8ff'); 
        ray.setAttribute('d', 'M 200 100 L 250 180'); 
        if(txt) txt.innerText = "Aktuell: Wasser (Strahl knickt zum Lot hin ab)";
    } else if(type === 'glass') {
        box.setAttribute('fill', '#e2e8f0'); 
        ray.setAttribute('d', 'M 200 100 L 230 180'); 
        if(txt) txt.innerText = "Aktuell: Glas (Höhere Dichte, starker Knick zum Lot!)";
    }
}

// 3. Linsen
function toggleLens() {
    const shape = document.getElementById('lensShape');
    const rayTop = document.getElementById('rayTopLens');
    const rayMid = document.getElementById('rayMidLens');
    const rayBot = document.getElementById('rayBotLens');
    const fReal = document.getElementById('focalPointReal');
    const fVirtual = document.getElementById('focalPointVirtual');
    const vRays = document.getElementById('virtualLensRays');
    const txt = document.getElementById('lensText');
    if(!shape || !rayTop || !rayBot) return;
    
    isConvex = !isConvex;
    if(isConvex) {
        shape.setAttribute('d', 'M 200 40 Q 230 120 200 200 Q 170 120 200 40');
        rayTop.setAttribute('d', 'M 200 80 L 320 120');
        rayBot.setAttribute('d', 'M 200 160 L 320 120');
        if(fReal) fReal.style.opacity = "1";
        if(fVirtual) fVirtual.style.opacity = "0";
        if(vRays) vRays.style.opacity = "0";
        if(txt) {
            txt.innerText = "Sammellinse (Konvex): Bündelt alle Strahlen im Brennpunkt!";
            txt.style.color = "#E91E63";
        }
    } else {
        shape.setAttribute('d', 'M 180 40 L 220 40 Q 200 120 220 200 L 180 200 Q 200 120 180 40 Z'); 
        rayTop.setAttribute('d', 'M 200 80 L 320 40');  
        rayBot.setAttribute('d', 'M 200 160 L 320 200'); 
        if(fReal) fReal.style.opacity = "0";
        if(fVirtual) fVirtual.style.opacity = "1";
        if(vRays) vRays.style.opacity = "1";
        if(txt) {
            txt.innerText = "Zerstreuungslinse (Konkav): Streut das Licht weg!";
            txt.style.color = "#3182ce";
        }
    }
}

// 4. Beugung
function initSlitMachine() {
    const slider = document.getElementById('slitWidth');
    if (!slider) return;
    slider.addEventListener('input', () => updateSlitMachine(slider.value));
    updateSlitMachine(slider.value);
}

function narrowSlit() {
    const slider = document.getElementById('slitWidth');
    if (slider) {
        slider.value = Number(slider.value) > 35 ? 10 : 75;
        updateSlitMachine(slider.value);
        return;
    }

    const wallTop = document.getElementById('wallTop');
    const wallBot = document.getElementById('wallBot');
    const wavesBroad = document.getElementById('wavesBroad');
    const wavesNarrow = document.getElementById('wavesNarrow');
    const txt = document.getElementById('slitText');
    if(!wallTop || !wallBot) return;

    slitState = (slitState + 1) % 2;

    if (slitState === 0) {
        wallTop.setAttribute('height', '60');
        wallBot.setAttribute('y', '140');
        wallBot.setAttribute('height', '60');
        if(wavesBroad) wavesBroad.style.display = "block";
        if(wavesNarrow) wavesNarrow.style.display = "none";
        if(txt) txt.innerText = "Breiter Spalt: Das Licht geht fast nur als gerade Welle (Wellenfront) durch.";
    } else {
        wallTop.setAttribute('height', '95');
        wallBot.setAttribute('y', '105');
        wallBot.setAttribute('height', '95');
        if(wavesBroad) wavesBroad.style.display = "none";
        if(wavesNarrow) wavesNarrow.style.display = "block";
        if(txt) txt.innerText = "Sehr enger Spalt: Starke Beugung! Huygens' neue Kreiswellen entstehen.";
    }
}

function updateSlitMachine(value) {
    const width = Math.max(0, Math.min(100, Number(value)));
    const wallTop = document.getElementById('wallTop');
    const wallBot = document.getElementById('wallBot');
    const wavesBroad = document.getElementById('wavesBroad');
    const wavesNarrow = document.getElementById('wavesNarrow');
    const wavefronts = document.getElementById('slitWavefronts');
    const beam = document.getElementById('photonBeam');
    const spot = document.getElementById('slitScreenSpot');
    const label = document.getElementById('slitWidthLabel');
    const status = document.getElementById('slitStatus');
    const text = document.getElementById('slitText');
    if (!wallTop || !wallBot) return;

    const centerY = 130;
    const gap = 10 + width * 0.82;
    const topHeight = centerY - gap / 2 - 20;
    const botY = centerY + gap / 2;
    const apertureTop = centerY - gap / 2;
    const apertureBottom = centerY + gap / 2;
    wallTop.setAttribute('height', topHeight.toFixed(1));
    wallBot.setAttribute('y', botY.toFixed(1));
    wallBot.setAttribute('height', (230 - botY).toFixed(1));

    const diffraction = 1 - width / 100;
    const spread = Math.max(gap, 30 + diffraction * 138);
    const screenY = centerY - spread / 2;
    if (spot) {
        spot.setAttribute('y', screenY.toFixed(1));
        spot.setAttribute('height', spread.toFixed(1));
        spot.setAttribute('opacity', (0.38 + diffraction * 0.42).toFixed(2));
    }
    if (beam) {
        beam.setAttribute('d', buildDiffractionEnvelope(centerY, gap, spread));
        beam.setAttribute('opacity', (0.10 + diffraction * 0.36).toFixed(2));
    }

    const bendAmount = clamp((75 - width) / 65, 0, 1);
    if (wavefronts) {
        drawSlitWavefronts(wavefronts, centerY, gap, spread, bendAmount);
        if (wavesBroad) wavesBroad.style.display = "none";
        if (wavesNarrow) wavesNarrow.style.display = "none";
    } else if (wavesBroad) {
        const circularAmount = clamp((70 - width) / 40, 0, 1);
        const planeAmount = 1 - circularAmount;
        wavesBroad.style.opacity = planeAmount.toFixed(2);
        wavesBroad.style.display = planeAmount < 0.03 ? "none" : "block";
        wavesBroad.querySelectorAll('line').forEach((line) => {
            line.setAttribute('y1', apertureTop.toFixed(1));
            line.setAttribute('y2', apertureBottom.toFixed(1));
        });
        if (wavesNarrow) {
            wavesNarrow.style.opacity = circularAmount.toFixed(2);
            wavesNarrow.style.display = circularAmount < 0.03 ? "none" : "block";
        }
    }

    let name = "breit";
    let message = "Breiter Spalt: Die Wellenfront bleibt fast gerade. Auf dem Schirm sieht man einen relativ schmalen hellen Streifen.";
    let shortStatus = "Breiter Spalt: wenig Beugung";
    if (width <= 25) {
        name = "sehr eng";
        message = "Sehr enger Spalt: Der Spalt wirkt wie eine kleine neue Lichtquelle. Dahinter entstehen Kreiswellen, und der helle Fleck am Schirm wird breit.";
        shortStatus = "Sehr enger Spalt: starke Beugung";
    } else if (width <= 55) {
        name = "mittel";
        message = "Mittlerer Spalt: Die Welle geht noch nach vorne, biegt sich aber schon sichtbar zu den Seiten.";
        shortStatus = "Mittlerer Spalt: sichtbare Beugung";
    }

    if (label) label.innerText = name;
    if (status) status.innerText = shortStatus;
    if (text) text.innerText = message;
}

function buildDiffractionEnvelope(centerY, gap, screenSpread) {
    const apertureX = 250;
    const screenX = 500;
    const apertureHalf = Math.max(5, gap / 2);
    const screenHalf = screenSpread / 2;
    const topStart = centerY - apertureHalf;
    const bottomStart = centerY + apertureHalf;
    const topEnd = centerY - screenHalf;
    const bottomEnd = centerY + screenHalf;
    return `M ${apertureX} ${topStart.toFixed(1)} L ${screenX} ${topEnd.toFixed(1)} L ${screenX} ${bottomEnd.toFixed(1)} L ${apertureX} ${bottomStart.toFixed(1)} Z`;
}

function drawSlitWavefronts(group, centerY, gap, screenSpread, bendAmount) {
    group.innerHTML = "";
    const originX = 240;
    const baseRadius = 44;
    const xPlane = originX + baseRadius;
    const halfHeight = Math.min(baseRadius * 0.82, Math.max(6, gap / 2) + bendAmount * (baseRadius * 0.82 - Math.max(6, gap / 2)));
    const circleEdgeX = originX + Math.sqrt(Math.max(0, baseRadius * baseRadius - halfHeight * halfHeight));
    const edgeX = lerp(xPlane, circleEdgeX, bendAmount);
    const midX = originX + baseRadius;
    const topY = centerY - halfHeight;
    const bottomY = centerY + halfHeight;
    const outgoingDelays = [0, -0.5, -1, -1.5];

    outgoingDelays.forEach((delay, index) => {
        const path = createSvgElement('path', {
            d: `M ${edgeX.toFixed(1)} ${topY.toFixed(1)} Q ${midX.toFixed(1)} ${centerY.toFixed(1)} ${edgeX.toFixed(1)} ${bottomY.toFixed(1)}`,
            fill: 'none',
            stroke: '#60a5fa',
            'stroke-width': '4.5',
            'stroke-linecap': 'round',
            class: 'slit-wavefront'
        });
        path.style.setProperty('--wave-opacity', (0.92 - index * 0.05).toFixed(2));
        path.style.animationDelay = `${delay}s`;
        group.appendChild(path);
    });
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

function createSvgElement(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
}

function predictSlit(choice) {
    const feedback = document.getElementById('slitPredictionText');
    document.querySelectorAll('[data-slit-prediction]').forEach((button) => {
        button.classList.toggle('selected', button.dataset.slitPrediction === choice);
        button.classList.toggle('correct', choice === 'spread' && button.dataset.slitPrediction === choice);
    });
    if (!feedback) return;
    if (choice === 'spread') {
        feedback.innerText = "Gute Vermutung: Beim engen Spalt breitet sich Licht seitlich aus.";
    } else {
        feedback.innerText = "Das klingt zuerst logisch. Teste den Regler: Bei engem Spalt zeigt Licht seine Wellennatur.";
    }
}

// 5. Gekrümmte Spiegel
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
    if(!shape || !inRayTop || !rayTop) return;

    isConcave = !isConcave;
    if(isConcave) {
        shape.setAttribute('d', 'M 270 40 Q 320 120 270 200');
        inRayTop.setAttribute('d', 'M 40 80 L 280 80');
        if(inRayMid) inRayMid.setAttribute('d', 'M 40 120 L 295 120');
        if(inRayBot) inRayBot.setAttribute('d', 'M 40 160 L 280 160');

        rayTop.setAttribute('d', 'M 280 80 L 40 160');
        if(rayMid) rayMid.setAttribute('d', 'M 295 120 L 40 120');
        if(rayBot) rayBot.setAttribute('d', 'M 280 160 L 40 80');

        if(fReal) {
            fReal.setAttribute('cx', '160');
            fReal.style.opacity = "1";
        }
        if(fVirtual) fVirtual.style.opacity = "0";
        if(vRays) vRays.style.opacity = "0";
        if(txt) {
            txt.innerText = "Hohlspiegel (Konkav): Bündelt das Licht wie eine Sammellinse.";
            txt.style.color = "#E91E63";
        }
    } else {
        shape.setAttribute('d', 'M 310 40 Q 260 120 310 200'); 
        inRayTop.setAttribute('d', 'M 40 80 L 300 80');
        if(inRayMid) inRayMid.setAttribute('d', 'M 40 120 L 285 120');
        if(inRayBot) inRayBot.setAttribute('d', 'M 40 160 L 300 160');

        rayTop.setAttribute('d', 'M 300 80 L 30 -40'); 
        if(rayMid) rayMid.setAttribute('d', 'M 285 120 L 40 120'); 
        if(rayBot) rayBot.setAttribute('d', 'M 300 160 L 30 280'); 
        
        if(fReal) fReal.style.opacity = "0";
        if(fVirtual) {
            fVirtual.setAttribute('cx', '390');
            fVirtual.style.opacity = "1";
        }
        if(vRays) vRays.style.opacity = "1";
        
        const vrT = document.getElementById('vRayTop');
        const vrB = document.getElementById('vRayBot');
        if(vrT) {
            vrT.setAttribute('x1', '300');
            vrT.setAttribute('y1', '80');
            vrT.setAttribute('x2', '390');
            vrT.setAttribute('y2', '120');
        }
        if(vrB) {
            vrB.setAttribute('x1', '300');
            vrB.setAttribute('y1', '160');
            vrB.setAttribute('x2', '390');
            vrB.setAttribute('y2', '120');
        }

        if(txt) {
            txt.innerText = "Wölbspiegel (Konvex): Streut Licht, virtueller Fokus hinten.";
            txt.style.color = "#3182ce";
        }
    }
}

// 6. MIKROSKOP VERTIKAL
function updateVerticalMicroscope() {
    let objDistEl = document.getElementById('microObjDist');
    let tubeDistEl = document.getElementById('microTubeDist');
    if(!objDistEl || !tubeDistEl) return;

    let g = parseFloat(objDistEl.value);
    let d = parseFloat(tubeDistEl.value);
    
    let f_obj = 20; 
    let f_oc = 30;  
    
    let y_obj_base = 270;
    let y_obj_tip = 260;
    let x_obj_tip = 115;
    let x_center = 125;
    
    let y_obj_lens = y_obj_base - g;
    let y_oc_lens = y_obj_lens - d;
    
    const vOL = document.getElementById('vertObjLensGrp');
    const vOC = document.getElementById('vertOcLensGrp');
    if(vOL) vOL.setAttribute('transform', `translate(0, ${y_obj_lens})`);
    if(vOC) vOC.setAttribute('transform', `translate(0, ${y_oc_lens})`);
    
    let b = 1 / ((1/f_obj) - (1/g));
    let y_int = y_obj_lens - b;
    let M1 = b / g; 
    let x_int = x_center + (x_center - x_obj_tip) * M1; 
    
    let arrowTip = x_int > x_center ? x_int-5 : x_int+5;
    const vIL = document.getElementById('vertIntLine');
    const vIA = document.getElementById('vertIntArrow');
    if(vIL) {
        vIL.setAttribute('y1', y_int);
        vIL.setAttribute('y2', y_int);
        vIL.setAttribute('x2', x_int);
    }
    if(vIA) vIA.setAttribute('points', `${x_int},${y_int} ${arrowTip},${y_int-4} ${arrowTip},${y_int+4}`);
    
    let y_oc_focus = y_oc_lens + f_oc;
    const vOF = document.getElementById('vertOcFocus');
    const vOFT = document.getElementById('vertOcFocusText');
    if(vOF) vOF.setAttribute('cy', y_oc_focus);
    if(vOFT) vOFT.setAttribute('y', y_oc_focus + 5);
    
    let x_oc_hit1 = x_int + (x_int - x_obj_tip) * (y_oc_lens - y_int) / (y_int - y_obj_lens);
    let x_oc_hit2 = x_int + (x_int - x_center) * (y_oc_lens - y_int) / (y_int - y_obj_lens);
    
    const vR1 = document.getElementById('vertRay1');
    const vR2 = document.getElementById('vertRay2');
    if(vR1) vR1.setAttribute('d', `M ${x_obj_tip} ${y_obj_tip} L ${x_obj_tip} ${y_obj_lens} L ${x_int} ${y_int} L ${x_oc_hit1} ${y_oc_lens}`);
    if(vR2) vR2.setAttribute('d', `M ${x_obj_tip} ${y_obj_tip} L ${x_center} ${y_obj_lens} L ${x_int} ${y_int} L ${x_oc_hit2} ${y_oc_lens}`);
    
    let error = Math.abs(y_int - y_oc_focus);
    let blur = Math.min(15, error * 0.4);
    let scale = Math.max(0.4, M1 * 0.55); 
    
    let viewInner = document.getElementById('microViewInner');
    if(viewInner) {
        viewInner.style.filter = `blur(${blur}px)`;
        viewInner.style.transform = `scale(${scale})`;
    }
    
    let status = document.getElementById('microViewStatus');
    if(status) {
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
}

// 7. Teleskope
function toggleTelescope() {
    const refractor = document.getElementById('refractorGrp');
    const reflector = document.getElementById('reflectorGrp');
    if(!refractor || !reflector) return;

    isRefractor = !isRefractor;
    if(isRefractor) {
        refractor.style.display = "block";
        reflector.style.display = "none";
    } else {
        refractor.style.display = "none";
        reflector.style.display = "block";
    }
}

// 8. Totalreflexion (Updated)
function updateFiber(angle) {
    const laser = document.getElementById('laserSource');
    const group = document.getElementById('raysGroup');
    const status = document.getElementById('fiberStatus');
    if(!laser || !group || !status) return;

    const a = parseInt(angle);
    laser.style.transform = `rotate(${a}deg)`;

    const rad = (a * Math.PI) / 180;
    const critAngle = 42; // Critical angle for glass ~42°
    
    // Angle inside the glass relative to the wall normal is 90 - a
    const angleAtWall = 90 - Math.abs(a);
    const isTotal = angleAtWall > critAngle;

    let html = "";
    let currX = 80;
    let currY = 100;
    let slope = Math.tan(rad);
    
    const rodTop = 70;
    const rodBottom = 130;
    const rodEnd = 380;

    // Draw up to 6 reflections
    for(let i=0; i<6; i++) {
        let nextX, nextY;
        if (slope > 0) { // moving down
            nextY = rodBottom;
            nextX = currX + (nextY - currY) / slope;
        } else { // moving up
            nextY = rodTop;
            nextX = currX + (nextY - currY) / slope;
        }

        if (nextX > rodEnd) {
            // Hits the end of the rod
            nextX = rodEnd;
            nextY = currY + (nextX - currX) * slope;
            html += `<line x1="${currX}" y1="${currY}" x2="${nextX}" y2="${nextY}" stroke="#ef4444" stroke-width="3" />`;
            break;
        }

        html += `<line x1="${currX}" y1="${currY}" x2="${nextX}" y2="${nextY}" stroke="#ef4444" stroke-width="3" />`;
        
        if (!isTotal) {
            // Light escapes!
            const escapeSlope = slope * 2; // simplified refraction
            const escapeX = nextX + 20;
            const escapeY = nextY + (escapeX - nextX) * escapeSlope;
            html += `<line x1="${nextX}" y1="${nextY}" x2="${escapeX}" y2="${escapeY}" stroke="#ef4444" stroke-width="2" opacity="0.5" stroke-dasharray="4,2" />`;
            status.innerText = "Teilreflexion: Licht bricht nach außen!";
            status.style.color = "#fbbf24";
            break; // Stop after escape for clarity
        }

        currX = nextX;
        currY = nextY;
        slope *= -1; // Reflect
    }

    if (isTotal) {
        status.innerText = "Totalreflexion: Licht bleibt im Stab!";
        status.style.color = "#4ade80";
    }

    group.innerHTML = html;
}

// 9. Das Auge (Vollständige Strahlengang-Simulation)
function focusEye(mode) {
    const lens = document.getElementById('eyeLens');
    const obj = document.getElementById('eyeObject');
    const img = document.getElementById('eyeImage');
    const rayTop = document.getElementById('rayPathTop');
    const rayBot = document.getElementById('rayPathBottom');
    const txt = document.getElementById('eyeText');
    
    if(!lens || !obj || !img || !rayTop || !rayBot) return;

    let objX, objY_tip, lensRX, imgY_tip, statusTxt;

    if(mode === 'near') {
        objX = 100;
        objY_tip = 70;
        lensRX = 18; // Dicke Linse
        imgY_tip = 120; // Größeres Bild (invertiert)
        statusTxt = "Nahfokus: Der Gegenstand ist nah. Die Augenmuskeln lassen die Linse dick werden, um das Licht stärker zu brechen.";
    } else {
        objX = 30;
        objY_tip = 80;
        lensRX = 10; // Flache Linse
        imgY_tip = 110; // Kleineres Bild (invertiert)
        statusTxt = "Fernfokus: Der Gegenstand ist weit weg. Die Linse kann flach und entspannt bleiben.";
    }

    // Update Graphics
    obj.style.transform = `translateX(${objX}px)`;
    lens.setAttribute('rx', lensRX);
    img.querySelector('line').setAttribute('y2', imgY_tip);
    if(txt) txt.innerText = statusTxt;

    // Draw Rays
    // Top Ray: from object tip (objX, objY_tip) to lens, then to retina tip (355, imgY_tip)
    const dTop = `M ${objX} ${objY_tip} L 260 85 L 355 ${imgY_tip}`;
    // Bottom Ray: from object base (objX, 100) to lens, then to retina base (355, 100)
    const dBot = `M ${objX} 100 L 260 115 L 355 100`;
    
    rayTop.setAttribute('d', dTop);
    rayBot.setAttribute('d', dBot);
}
