// Logic for linsen_spiegel topic
let isConvex = true;
let slitState = 0; 
let isConcave = true;
let isRefractor = true;

function topicInit() {
    ensureLinsenSpiegelAccessibility();
    const reflectionInput = document.getElementById("angleRange");
    if (reflectionInput) updateReflection(reflectionInput.value);
    updateVerticalMicroscope();
    if (document.getElementById('fiberAngle')) updateFiber(20);
    if (document.getElementById('eyeLens')) focusEye('far');
    initSlitMachine();
    updateCurvedMirror();
}

function ensureLinsenSpiegelAccessibility() {
    [
        'mediumText',
        'lensText',
        'slitStatus',
        'slitText',
        'slitPredictionText',
        'mirrorText',
        'microViewStatus',
        'fiberStatus',
        'eyeText'
    ].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const fiberAngle = document.getElementById('fiberAngle');
    if (fiberAngle) {
        fiberAngle.setAttribute('aria-describedby', 'fiberStatus');
        fiberAngle.setAttribute('aria-valuetext', `${fiberAngle.value}° Einfallswinkel`);
    }

    const microObjDist = document.getElementById('microObjDist');
    if (microObjDist) {
        microObjDist.setAttribute('aria-describedby', 'microViewStatus');
        microObjDist.setAttribute('aria-valuetext', `${microObjDist.value} mm Objektabstand`);
    }

    const microTubeDist = document.getElementById('microTubeDist');
    if (microTubeDist) {
        microTubeDist.setAttribute('aria-describedby', 'microViewStatus');
        microTubeDist.setAttribute('aria-valuetext', `${microTubeDist.value} mm Tubuslänge`);
    }

    const slitDescriptionIds = ['slitPredictionText', 'slitStatus']
        .filter((id) => document.getElementById(id))
        .join(' ');

    document.querySelectorAll('[data-slit-prediction]').forEach((button) => {
        if (!button.hasAttribute('tabindex')) button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-pressed', button.classList.contains('selected') ? 'true' : 'false');
        if (slitDescriptionIds) button.setAttribute('aria-describedby', slitDescriptionIds);

        if (button.dataset.a11yBound !== 'true') {
            button.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                predictSlit(button.dataset.slitPrediction);
            });
            button.dataset.a11yBound = 'true';
        }
    });
}

// 1. Reflexion
function updateReflection(val) {
    const rayIn=document.getElementById('rayIn'),rayOut=document.getElementById('rayOut');
    const angle=Number(val);
    if(!rayIn||!rayOut||!Number.isFinite(angle)||angle<0||angle>70)return;
    const dx=120*Math.sin(angle*Math.PI/180),dy=120*Math.cos(angle*Math.PI/180);
    rayIn.setAttribute('d','M '+(200-dx)+' '+(160-dy)+' L 200 160');
    rayOut.setAttribute('d','M 200 160 L '+(200+dx)+' '+(160-dy));
    const status=document.getElementById('reflectionStatus'),input=document.getElementById('angleRange');
    if(status)status.textContent='Einfallswinkel '+angle+'°; Reflexionswinkel '+angle+'°. '+(angle===0?'Senkrechter Einfall: Das Licht läuft auf demselben Weg zurück.':'Beide Winkel werden zum Lot gemessen.');
    if(input)input.setAttribute('aria-valuetext',angle+' Grad zum Lot');
}

// 2. Brechung
function setMedium(type) {
    const media={air:{name:'Luft',n:1,fill:'transparent'},water:{name:'Wasser',n:1.33,fill:'#ebf8ff'},glass:{name:'Beispielglas',n:1.5,fill:'#e2e8f0'}};
    const medium=media[type],box=document.getElementById('mediumBox'),ray=document.getElementById('refractedRay'),txt=document.getElementById('mediumText');
    if(!medium||!box||!ray)return;
    const beta=Math.asin(Math.sin(Math.PI/4)/medium.n);
    box.setAttribute('fill',medium.fill);
    ray.setAttribute('d','M 200 100 L '+(200+80*Math.tan(beta))+' 180');
    if(txt)txt.textContent=medium.name+': Brechzahl '+medium.n.toLocaleString('de-AT',{minimumFractionDigits:2})+'; Einfallswinkel 45° und Brechungswinkel '+(beta*180/Math.PI).toLocaleString('de-AT',{maximumFractionDigits:1})+'° zum Lot. '+(type==='air'?'Keine Richtungsänderung.':'Der Strahl wird zum Lot hin gebrochen.');
    document.querySelectorAll('[data-medium]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.medium===type)));
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
        rayTop.setAttribute('d', 'M 200 80 L 380 140');
        rayBot.setAttribute('d', 'M 200 160 L 380 100');
        if(fReal) fReal.style.opacity = "1";
        if(fVirtual) fVirtual.style.opacity = "0";
        if(vRays) vRays.style.opacity = "0";
        if(txt) {
            txt.textContent = "Sammellinse: Achsennahe parallele Strahlen treffen sich näherungsweise im rechten Brennpunkt. Danach laufen sie weiter auseinander.";
            txt.style.color = "#E91E63";
        }
    } else {
        shape.setAttribute('d', 'M 180 40 L 220 40 Q 200 120 220 200 L 180 200 Q 200 120 180 40 Z'); 
        rayTop.setAttribute('d', 'M 200 80 L 380 20');
        rayBot.setAttribute('d', 'M 200 160 L 380 220');
        if(fReal) fReal.style.opacity = "0";
        if(fVirtual) fVirtual.style.opacity = "1";
        if(vRays) vRays.style.opacity = "1";
        if(txt) {
            txt.textContent = "Zerstreuungslinse: Die Strahlen laufen auseinander. Nur ihre gestrichelten rückwärtigen Verlängerungen treffen sich im linken, virtuellen Brennpunkt.";
            txt.style.color = "#3182ce";
        }
    }
}

// 4. Beugung
function initSlitMachine() {
    const slider = document.getElementById('slitWidth');
    if (!slider) return;

    ensureSlitA11y(slider);

    if (slider.dataset.listenerBound !== 'true') {
        slider.addEventListener('input', () => updateSlitMachine(slider.value));
        slider.dataset.listenerBound = 'true';
    }

    updateSlitMachine(slider.value);
}

function ensureSlitA11y(slider) {
    const status = document.getElementById('slitStatus');
    const text = document.getElementById('slitText');
    const prediction = document.getElementById('slitPredictionText');

    if (status) {
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');
    }

    if (text) {
        text.setAttribute('role', 'status');
        text.setAttribute('aria-live', 'polite');
        text.setAttribute('aria-atomic', 'true');
    }

    if (prediction) {
        prediction.setAttribute('role', 'status');
        prediction.setAttribute('aria-live', 'polite');
        prediction.setAttribute('aria-atomic', 'true');
    }

    slider.setAttribute('aria-describedby', 'slitStatus slitText');
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
    const slider = document.getElementById('slitWidth');
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
    if (slider) slider.setAttribute('aria-valuetext', `Spaltbreite ${Math.round(width)} Prozent, ${shortStatus.toLowerCase()}`);
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
    const startScaleY = clamp(gap / (2 * halfHeight), 0.08, 1.2);
    const startScaleX = clamp(startScaleY * 0.8, 0.08, 0.9);
    const endScaleY = clamp(screenSpread / (2 * halfHeight), startScaleY + 0.05, 4.8);
    const endScaleX = clamp((500 - originX) / baseRadius, 3.2, 6.2);

    outgoingDelays.forEach((delay, index) => {
        const path = createSvgElement('path', {
            d: `M ${edgeX.toFixed(1)} ${topY.toFixed(1)} Q ${midX.toFixed(1)} ${centerY.toFixed(1)} ${edgeX.toFixed(1)} ${bottomY.toFixed(1)}`,
            fill: 'none',
            stroke: '#60a5fa',
            'stroke-width': '4.5',
            'stroke-linecap': 'round',
            'vector-effect': 'non-scaling-stroke',
            class: 'slit-wavefront'
        });
        path.style.setProperty('--wave-opacity', (0.92 - index * 0.05).toFixed(2));
        path.style.setProperty('--wave-start-scale-x', startScaleX.toFixed(3));
        path.style.setProperty('--wave-start-scale-y', startScaleY.toFixed(3));
        path.style.setProperty('--wave-end-scale-x', endScaleX.toFixed(3));
        path.style.setProperty('--wave-end-scale-y', endScaleY.toFixed(3));
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
        const isSelected = button.dataset.slitPrediction === choice;
        button.classList.toggle('selected', isSelected);
        button.classList.toggle('correct', choice === 'spread' && isSelected);
        button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
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
    isConcave=!isConcave;
    updateCurvedMirror();
}

function updateCurvedMirror() {
    const shape=document.getElementById('mirrorShape');if(!shape)return;
    const sign=isConcave?-1:1,focus=260+sign*80;
    shape.setAttribute('d',isConcave?'M 240 40 Q 280 120 240 200':'M 280 40 Q 240 120 280 200');
    ['Top','Mid','Bot'].forEach((name,i)=>{
        const y=[80,120,160][i],x=260+sign*(y-120)*(y-120)/320;
        document.getElementById('inRay'+name).setAttribute('d','M 40 '+y+' L '+x+' '+y);
        const slope=(120-y)/(focus-x);
        const distance=Math.min(x-30,slope===0?Infinity:(slope>0?y-10:230-y)/Math.abs(slope));
        const endX=x-distance,endY=y-distance*slope;
        document.getElementById('mirrorRay'+name).setAttribute('d','M '+x+' '+y+' L '+endX+' '+endY);
        const extension=document.getElementById(name==='Top'?'vRayTop':name==='Bot'?'vRayBot':'unused');
        if(extension){extension.setAttribute('x1',x);extension.setAttribute('y1',y);extension.setAttribute('x2',focus);extension.setAttribute('y2',120);}
    });
    const real=document.getElementById('mirrorFocusReal'),virtual=document.getElementById('mirrorFocusVirtual');
    real.setAttribute('cx','180');virtual.setAttribute('cx','340');real.style.opacity=isConcave?'1':'0';virtual.style.opacity=isConcave?'0':'1';
    document.getElementById('virtualMirrorRays').style.opacity=isConcave?'0':'1';
    document.getElementById('mirrorText').textContent=isConcave?'Hohlspiegel: Die parallelen Strahlen treffen nach der Reflexion im realen Brennpunkt vor dem Spiegel zusammen und laufen weiter.':'Wölbspiegel: Die reflektierten Strahlen laufen auseinander. Nur ihre rückwärtigen Verlängerungen treffen sich im virtuellen Brennpunkt hinter dem Spiegel.';
}

// 6. MIKROSKOP VERTIKAL
function updateVerticalMicroscope() {
    let objDistEl = document.getElementById('microObjDist');
    let tubeDistEl = document.getElementById('microTubeDist');
    if(!objDistEl || !tubeDistEl) return;

    let g = parseFloat(objDistEl.value);
    let d = parseFloat(tubeDistEl.value);
    objDistEl.setAttribute('aria-valuetext', `${g} mm Objektabstand`);
    tubeDistEl.setAttribute('aria-valuetext', `${d} mm Tubuslänge`);
    
    let f_obj = 20; 
    let f_oc = 30;  
    
    let y_obj_base = 270;
    let y_obj_tip = 270;
    let x_obj_tip = 115;
    let x_center = 125;
    
    let y_obj_lens = y_obj_base - g;
    let y_oc_lens = y_obj_lens - d;
    
    const vOL = document.getElementById('vertObjLensGrp');
    const vOC = document.getElementById('vertOcLensGrp');
    if(vOL) vOL.setAttribute('transform', `translate(0, ${y_obj_lens})`);
    if(vOC) vOC.setAttribute('transform', `translate(0, ${y_oc_lens})`);
    
    let b = f_obj * g / (g - f_obj);
    let y_int = y_obj_lens - b;
    let M1 = b / g; 
    let x_int = x_center + (x_center - x_obj_tip) * M1; 
    
    let arrowTip = x_int > x_center ? x_int-5 : x_int+5;
    const vIL = document.getElementById('vertIntLine');
    const vIA = document.getElementById('vertIntArrow');
    if(vIL) {
        vIL.setAttribute('x1', x_center);
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
    const hitXs=[x_oc_hit1,x_oc_hit2],lensXs=[x_obj_tip,x_center];
    [vR1,vR2].forEach((ray,i)=>{
        if(!ray)return;
        const slopeIn=(hitXs[i]-lensXs[i])/d;
        const slopeOut=slopeIn-(hitXs[i]-x_center)/f_oc;
        ray.setAttribute('d','M '+x_obj_tip+' '+y_obj_tip+' L '+lensXs[i]+' '+y_obj_lens+' L '+hitXs[i]+' '+y_oc_lens+' L '+(hitXs[i]+25*slopeOut)+' '+(y_oc_lens-25));
        ray.dataset.outputSlope=String(slopeOut);
    });
    const between=b<d;
    if(vIL)vIL.style.display=between?'':'none';if(vIA)vIA.style.display=between?'':'none';
    const drawing=vOL?.ownerSVGElement;
    if(drawing){
        const values=[x_int,...hitXs,...hitXs.map((x,i)=>x+25*((x-lensXs[i])/d-(x-x_center)/f_oc))];
        const left=Math.min(0,...values)-10,right=Math.max(250,...values)+10,top=Math.min(0,y_oc_lens-55);
        drawing.setAttribute('viewBox',left+' '+top+' '+(right-left)+' '+(320-top));
    }

    let error = Math.abs(y_int - y_oc_focus);
    let blur = Math.min(15, error * 0.4);
    let scale = Math.max(0.4, M1 * 0.55); 
    
    let viewInner = document.getElementById('microViewInner');
    if(viewInner) {
        viewInner.style.filter = `blur(${blur}px)`;
        viewInner.style.transform = `scale(${scale})`;
    }
    
    let status = document.getElementById('microViewStatus');
    if(status){
        status.dataset.intermediateDistance=String(b);status.dataset.ocularObjectDistance=String(d-b);
        if(!between)status.textContent='Das Objektiv würde allein erst auf Höhe des Okulars oder dahinter ein Zwischenbild erzeugen. Im gewählten Aufbau entsteht daher kein reales Zwischenbild zwischen den Linsen. Vergrößere den Linsenabstand oder ändere den Objektabstand.';
        else if(error<1.5)status.textContent='Nahe der Einstellung für entspanntes Sehen: Das Zwischenbild liegt in der Nähe der vorderen Brennebene des Okulars. Die austretenden Strahlen sind annähernd parallel.';
        else status.textContent='Noch nicht für entspanntes Sehen eingestellt: Der Abstand Zwischenbild–Okular ist '+(d-b).toLocaleString('de-AT',{maximumFractionDigits:1})+' mm; angestrebt sind 30 mm. Verändere die Einstellung.';
    }
}

// 7. Teleskope
function toggleTelescope() {
    const refractor = document.getElementById('refractorGrp');
    const reflector = document.getElementById('reflectorGrp');
    if(!refractor || !reflector) return;

    isRefractor = !isRefractor;
    refractor.setAttribute("aria-hidden",String(!isRefractor));
    reflector.setAttribute("aria-hidden",String(isRefractor));
    const status=document.getElementById("telescopeStatus");
    if(status)status.textContent=isRefractor?"Refraktor: Objektivlinsen bündeln das Licht; das Okular dient zur Betrachtung des Zwischenbilds.":"Newton-Reflektor: Der Hauptspiegel bündelt, der Fangspiegel lenkt zum seitlichen Okular. Das Licht durchquert keinen der Spiegel.";
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
    const group=document.getElementById('raysGroup'),status=document.getElementById('fiberStatus'),input=document.getElementById('fiberAngle');
    const a=Number(angle);if(!group||!status||!Number.isFinite(a)||Math.abs(a)>60)return;
    const incidence=90-Math.abs(a),critical=Math.asin(1/1.5)*180/Math.PI,total=incidence>critical;
    if(input)input.setAttribute('aria-valuetext',a+' Grad zur Stabachse');
    let x=80,y=100,slope=Math.tan(a*Math.PI/180),html='',hits=0,escaped=false;
    const line=(x1,y1,x2,y2,kind)=>'<line data-fiber-ray="'+kind+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(kind==='transmitted'?'#fbbf24':'#f87171')+'" stroke-width="3"'+(kind==='partial'?' stroke-dasharray="5 3"':'')+' />';
    for(let i=0;i<20;i++){
        const wall=slope>0?130:70;
        const hitX=slope===0?Infinity:x+(wall-y)/slope;
        if(hitX>=380){html+=line(x,y,380,y+(380-x)*slope,'inside');break;}
        html+=line(x,y,hitX,wall,'inside');hits++;
        if(!total){
            const beta=Math.asin(Math.min(1,1.5*Math.sin(incidence*Math.PI/180)));
            const dx=Math.sin(beta),dy=Math.sign(slope)*Math.cos(beta);
            const length=Math.min(65,(380-hitX)/dx,60/Math.abs(dy));
            html+=line(hitX,wall,hitX+length*dx,wall+length*dy,'transmitted');
            html+=line(hitX,wall,hitX+20,wall-20*slope,'partial');escaped=true;break;
        }
        x=hitX;y=wall;slope=-slope;
    }
    const prefix='Winkel zur Stabachse: '+a+'°. ';
    status.textContent=prefix+(hits===0?'Im gezeigten Abschnitt trifft der Strahl keine Seitenwand. Hier findet keine Reflexion statt.':
      'Einfallswinkel zum Wandlot: '+incidence+'°; Grenzwinkel etwa 41,8°. '+(escaped?'Ein Teil tritt gebrochen aus, ein Teil wird reflektiert.':'Totalreflexion an den Seitenwänden.'));
    group.innerHTML=html;group.dataset.wallHits=String(hits);group.dataset.total=String(hits>0&&!escaped);
}

// 9. Das Auge (Vollständige Strahlengang-Simulation)
function focusEye(mode) {
    if(mode!=='near'&&mode!=='far')return;
    const lens=document.getElementById('eyeLens'),obj=document.getElementById('eyeObject'),img=document.getElementById('eyeImage'),top=document.getElementById('rayPathTop'),bottom=document.getElementById('rayPathBottom'),text=document.getElementById('eyeText');
    if(!lens||!obj||!img||!top||!bottom)return;
    const objectX=mode==='near'?140:30,g=260-objectX,b=95,height=30,imageY=100+height*b/g;
    obj.style.transform='translateX('+objectX+'px)';
    obj.querySelector('line').setAttribute('y2','70');
    lens.setAttribute('rx',mode==='near'?'18':'10');
    lens.dataset.focalLength=String(g*b/(g+b));
    img.querySelector('line').setAttribute('y2',imageY);
    top.setAttribute('d','M '+objectX+' 70 L 260 70 L 355 '+imageY);
    bottom.setAttribute('d','M '+objectX+' 70 L 260 100 L 355 '+imageY);
    if(text)text.textContent=mode==='near'?'Nahsehen: Die Augenlinse ist stärker gekrümmt und brechkräftiger. Das umgekehrte Bild desselben Gegenstands ist größer und liegt scharf auf der Netzhaut.':'Fernsehen: Die Augenlinse ist flacher und weniger brechkräftig. Das umgekehrte Bild desselben Gegenstands ist kleiner und liegt scharf auf der Netzhaut.';
    document.querySelectorAll('[data-eye-focus]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.eyeFocus===mode)));
}
