// Logic for linsen_spiegel topic
let isConvex = true;
let slitState = 0; 
let isConcave = true;
let isRefractor = true;

function topicInit() {
    updateVerticalMicroscope();
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
function narrowSlit() {
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
