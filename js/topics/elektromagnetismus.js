// Logic for elektromagnetismus topic
let energy = 0;
let isDraining = false;
let relayClosed = false;
let drainInterval = null;
let electromagnetismA11yInit = false;

function ensureLiveRegion(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    return el;
}

function enhanceElectromagnetismAccessibility() {
    if (electromagnetismA11yInit) return;

    const currentRange = document.getElementById('currentRange');
    if (currentRange) {
        currentRange.setAttribute('aria-label', 'Stromstärke-Regler');
        currentRange.setAttribute('aria-describedby', document.getElementById('currentFieldStatus') ? 'currentFieldStatus' : 'materialText');
    }

    const transRange = document.getElementById('transRange');
    if (transRange) {
        transRange.setAttribute('aria-label', 'Sekundärspulen-Regler');
        transRange.setAttribute('aria-describedby', 'transText voltValSec');
    }

    ['materialText', 'directionText', 'relayStatus', 'transText', 'voltValSec'].forEach(ensureLiveRegion);

    const relayBtn = document.getElementById('relayBtn');
    if (relayBtn) {
        relayBtn.setAttribute('aria-pressed', String(relayClosed));
    }

    electromagnetismA11yInit = true;
}

function topicInit() {
    initMagnetPoles();
    initInductionLab();
    if (drainInterval) {
        clearInterval(drainInterval);
        drainInterval = null;
    }
    isDraining = false;
    energy = 0;

    const beam = document.getElementById('lightBeam');
    const enDisp = document.getElementById('energyLevel');
    if (beam) {
        beam.style.opacity = '0';
        beam.setAttribute('aria-label', 'Lichtstärke 0 Prozent');
    }
    if (enDisp) enDisp.innerText = '0';

    enhanceElectromagnetismAccessibility();
    updateMagnetField(30);
    updateTransformer(5);
    updateRelay(false);
}

function initMagnetPoles() {
    const zone = document.querySelector('[data-magnet-poles]');
    if (!zone || zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const get = name => zone.querySelector('[data-magnet-' + name + ']');
    let reversedA = false, reversedB = false;
    const render = () => {
        const aLeft = reversedA ? 'N' : 'S', bLeft = reversedB ? 'N' : 'S';
        const opposite = pole => pole === 'N' ? 'S' : 'N';
        const aRight = opposite(aLeft), bRight = opposite(bLeft);
        for (const [name,pole] of [['a-left',aLeft],['a-right',aRight],['b-left',bLeft],['b-right',bRight]]) {
            get(name).setAttribute('fill',pole==='N'?'#b91c1c':'#1d4ed8');
            get(name+'-label').textContent=pole;
        }
        const attract = aRight !== bLeft;
        get('a-arrow').textContent = attract ? '→' : '←';
        get('b-arrow').textContent = attract ? '←' : '→';
        get('a').setAttribute('aria-pressed',String(reversedA));
        get('b').setAttribute('aria-pressed',String(reversedB));
        const description = 'Einander zugewandt: '+aRight+' bei Magnet A und '+bLeft+' bei Magnet B. '+
            (attract?'Ungleichnamige Pole: Die Magnete ziehen einander an.':'Gleichnamige Pole: Die Magnete stoßen einander ab.');
        get('status').textContent = description;
        get('diagram').setAttribute('aria-label',description);
    };
    get('a').addEventListener('click',()=>{reversedA=!reversedA;render();});
    get('b').addEventListener('click',()=>{reversedB=!reversedB;render();});
    get('reset').addEventListener('click',()=>{reversedA=false;reversedB=false;render();});
    render();
}

function updateMagnetField(val) {
    const lines = document.getElementById('fieldLines')?.children;
    const arrow = document.getElementById('currentArrow');
    const currentRange = document.getElementById('currentRange');
    if(!arrow || !lines) return;
    
    const numericVal = parseInt(val, 10) || 0;
    const arrowLength = 10 + (numericVal * 0.4);
    arrow.setAttribute('d', `M ${200 - arrowLength/2} 75 L ${200 + arrowLength/2} 75`);
    arrow.style.opacity = numericVal === 0 ? '0' : '1';
    const status = document.getElementById('currentFieldStatus');
    if (status) status.textContent = numericVal === 0 ? 'Stromstufe 0: kein durch diesen Leiter erzeugtes Magnetfeld. Andere Magnetfelder sind nicht dargestellt.' : `Relative Stromstufe ${numericVal}: stärkere Stufe bedeutet eine stärkere Feldwirkung im Modell; keine Messung in Ampere oder Tesla.`;
    
    for(let line of lines) {
        line.style.opacity = numericVal === 0 ? 0 : (numericVal / 150) + 0.1;
        line.style.strokeWidth = 1 + (numericVal / 25);
    }

    if (currentRange) {
        currentRange.setAttribute('aria-valuetext', `Relative Stromstufe ${numericVal}; keine Ampere-Messung`);
    }
}

function setMaterial(type) {
    const core = document.getElementById('materialCore');
    const field = document.getElementById('spuleField');
    const txt = document.getElementById('materialText');
    if(!core || !field) return;
    
    if(type === 'none') {
        core.setAttribute('fill', 'transparent');
        field.style.opacity = "0.2";
        if(txt) txt.innerText = "Kern: Luft";
    } else if(type === 'wood') {
        core.setAttribute('fill', '#deb887');
        field.style.opacity = "0.2";
        if(txt) txt.innerText = "Kern: Holz";
    } else if(type === 'iron') {
        core.setAttribute('fill', '#718096');
        field.style.opacity = "1";
        if(txt) txt.innerText = "Kern: Eisen (Maximum!)";
    }

    core.setAttribute('aria-label', `Spulenkern-Material: ${txt ? txt.innerText : type}`);
}

let isUp = true;
function changeDirection() {
    const arrow = document.getElementById('forceArrow');
    const txt = document.getElementById('directionText');
    if(!arrow) return;
    isUp = !isUp;
    const symbol = document.getElementById("currentDirectionSymbol");
    if(symbol){symbol.setAttribute("d",isUp?"M200 90 h0":"M194 84 L206 96 M194 96 L206 84");symbol.setAttribute("stroke-width",isUp?"7":"3");}
    if(isUp) {
        arrow.setAttribute('d', 'M 200 75 L 200 20');
        if(txt) txt.textContent = "Technischer Strom aus der Ebene (Punkt); Magnetfeld nach rechts; Kraft nach oben.";
    } else {
        arrow.setAttribute('d', 'M 200 105 L 200 160');
        if(txt) txt.textContent = "Technischer Strom in die Ebene (Kreuz); Magnetfeld nach rechts; Kraft nach unten.";
    }
    arrow.setAttribute('aria-label', txt ? txt.textContent : (isUp ? 'Kraft nach oben' : 'Kraft nach unten'));
}

function shakeFlashlight() {
    const fl = document.getElementById('flashlight');
    const beam = document.getElementById('lightBeam');
    const enDisp = document.getElementById('energyLevel');
    if(!fl || !beam) return;

    fl.classList.add('shaking');
    energy = Math.min(energy + 15, 100);
    beam.style.opacity = energy / 100;
    if(enDisp) {
        enDisp.innerText = energy;
        enDisp.setAttribute('role', 'status');
        enDisp.setAttribute('aria-live', 'polite');
        enDisp.setAttribute('aria-atomic', 'true');
    }
    beam.setAttribute('aria-label', `Lichtstärke ${Math.floor(energy)} Prozent`);
    setTimeout(() => fl.classList.remove('shaking'), 150);
    
    if(!isDraining) {
        isDraining = true;
        drainInterval = setInterval(() => {
            energy = Math.max(energy - 2, 0);
            beam.style.opacity = energy / 100;
            beam.setAttribute('aria-label', `Lichtstärke ${Math.floor(energy)} Prozent`);
            if(enDisp) enDisp.innerText = Math.floor(energy);
            if(energy === 0) { 
                clearInterval(drainInterval);
                drainInterval = null;
                isDraining = false; 
            }
        }, 150);
    }
}

function updateTransformer(val) {
    const coil2 = document.getElementById('coil2');
    const txt = document.getElementById('transText');
    const flux = document.getElementById('magneticFlux');
    const fluxField = document.getElementById('fluxField');
    const voltBarSec = document.getElementById('voltBarSec');
    const voltValSec = document.getElementById('voltValSec');
    const transRange = document.getElementById('transRange');
    
    if(!coil2) return;
    
    const windings1 = 5; 
    const windings2 = Number(val);
    if (!Number.isInteger(windings2) || windings2 < 1 || windings2 > 10) return;
    const u1 = 230;
    const u2 = Math.round(u1 * (windings2 / windings1));
    
    // Clear and Redraw Secondary Coil with Current Dots
    coil2.innerHTML = '';
    for(let i=0; i < windings2; i++) {
        const y = 60 + (i * 100 / (windings2 + 1 || 1));
        
        // Wire piece
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M 285 ${y} L 315 ${y+5}`);
        path.setAttribute("stroke", "#ED8936");
        path.setAttribute("stroke-width", "6");
        coil2.appendChild(path);
        

    }
    
    // Update Secondary Voltage Bar
    if(voltBarSec) {
        const h = windings2 * 10;
        voltBarSec.setAttribute('height', h);
        voltBarSec.setAttribute('y', 160 - h);
    }
    if(voltValSec) voltValSec.textContent = u2 + "V";
    if (transRange) {
        transRange.value = String(windings2);
        transRange.setAttribute('aria-valuetext', `${windings2} Windungen sekundär, etwa ${u2} Volt`);
    }
    
    // Magnetic Flux Intensity Visualization
    if(flux) flux.style.strokeWidth = 3;
    if(fluxField) fluxField.setAttribute('opacity', '0.5');

    // Update Description Text
    if(windings2 < windings1) {
        if(txt) {
            txt.textContent = `Abwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "#E91E63";
        }
    } else if(windings2 > windings1) {
        if(txt) {
            txt.textContent = `Aufwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "#4CAF50";
        }
    } else {
        if(txt) {
            txt.textContent = `1:1 Übertragung (${u1}V ➔ ${u2}V)`;
            txt.style.color = "inherit";
        }
    }
}

function updateRelay(active) {
    const armature = document.getElementById('relayArmature');
    const contact = document.getElementById('relayContact');
    const bulb = document.getElementById('relayBulb');
    const status = document.getElementById('relayStatus');
    const btn = document.getElementById('relayBtn');
    
    if(!armature || !contact || !bulb) return;
    
    if(active) {
        armature.setAttribute('transform', 'rotate(10, 150, 50)');
        contact.setAttribute('stroke', '#4CAF50');
        bulb.setAttribute('fill', '#FFF59D');
        if(status) status.innerText = "Steuerstrom AN: Magnet zieht an, Kreis geschlossen!";
        if(btn) btn.innerText = "Steuerstrom AUSSCHALTEN 🛑";
    } else {
        armature.setAttribute('transform', 'rotate(0, 150, 50)');
        contact.setAttribute('stroke', '#718096');
        bulb.setAttribute('fill', '#444');
        if(status) status.innerText = "Steuerstrom AUS: Feder zieht Anker zurück.";
        if(btn) btn.innerText = "Steuerstrom EINSCHALTEN ⚡";
    }
    relayClosed = active;
    if (btn) btn.setAttribute('aria-pressed', String(relayClosed));
    bulb.setAttribute('aria-label', relayClosed ? 'Lampe an' : 'Lampe aus');
}

function toggleRelay() {
    updateRelay(!relayClosed);
}

// Qualitative induction: signs are relative to one fixed winding/terminal convention.
function inductionState(pole, motion, speed, circuit) {
    if (!['N','S'].includes(pole) || !['rest','in','out'].includes(motion) || !['slow','fast'].includes(speed) || !['open','closed'].includes(circuit)) return null;
    const sign = motion === 'rest' ? 0 : (pole === 'N' ? 1 : -1) * (motion === 'in' ? 1 : -1);
    return {sign, level: sign * (speed === 'fast' ? 2 : 1), current: sign !== 0 && circuit === 'closed'};
}

function inductionSvg(pole, motion, speed, circuit) {
    const state = inductionState(pole,motion,speed,circuit); if (!state) return '';
    const toward = motion === 'in', left = pole === 'N' ? 'S' : 'N', x = 180 + 50 * state.level;
    const colors = {N:'#b91c1c',S:'#1d4ed8'};
    let svg = '<svg data-induction-svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schema: '+pole+'-Pol zur Spule. '+(motion==='rest'?'Magnet ruht.':toward?'Magnet bewegt sich zur Spule.':'Magnet bewegt sich von der Spule weg.')+' Induzierte Spannung '+(state.sign===0?'null':state.sign>0?'positiv':'negativ')+'." style="background:white;font-family:Arial,sans-serif;color:#172033"><text x="26" y="25" font-size="17" fill="#172033">Magnet</text><text x="232" y="25" font-size="17" fill="#172033">Spule</text><rect x="25" y="50" width="55" height="48" fill="'+colors[left]+'"/><rect x="80" y="50" width="55" height="48" fill="'+colors[pole]+'"/><text data-induction-left x="52" y="82" text-anchor="middle" font-size="23" fill="white">'+left+'</text><text data-induction-pole x="108" y="82" text-anchor="middle" font-size="23" fill="white">'+pole+'</text>';
    for(let i=0;i<6;i++)svg+='<ellipse cx="'+(234+i*15)+'" cy="74" rx="12" ry="36" fill="none" stroke="#92400e" stroke-width="3"/>';
    if(state.sign)svg+='<path data-induction-motion d="'+(toward?'M151 74H210l-9 -6m9 6l-9 6':'M210 74H151l9 -6m-9 6l9 6')+'" stroke="#172033" stroke-width="3" fill="none"/>';
    svg+='<text x="180" y="142" text-anchor="middle" font-size="16" fill="#172033">'+(motion==='rest'?'Ruhe: keine Flussänderung':speed==='fast'?'Gleicher Weg, schneller bewegt':'Gleicher Weg, langsam bewegt')+'</text><text x="180" y="176" text-anchor="middle" font-size="17" fill="#172033">Qualitativer Spannungsausschlag</text><path d="M60 220H300" stroke="#172033" fill="none"/>';
    for(const [pos,label]of [[80,'−'],[180,'0'],[280,'+']])svg+='<path d="M'+pos+' 212V228" stroke="#172033"/><text x="'+pos+'" y="253" text-anchor="middle" font-size="21" fill="#172033">'+label+'</text>';
    svg+='<path data-induction-pointer data-sign="'+state.sign+'" data-level="'+state.level+'" d="M'+x+' 195V216l-6 -9m6 9l6 -9" stroke="#146885" stroke-width="4" fill="none"/><text x="180" y="290" text-anchor="middle" font-size="16" fill="#172033">Lastkreis '+(circuit==='open'?'offen':'geschlossen')+': '+(state.current?'Strom möglich':'kein Laststrom')+'</text></svg>';
    return svg;
}

function initInductionLab() {
    const lab=document.querySelector('[data-induction-lab]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';
    const pole=lab.querySelector('[data-induction-pole-select]'),motion=lab.querySelector('[data-induction-motion-select]'),speed=lab.querySelector('[data-induction-speed]'),circuit=lab.querySelector('[data-induction-circuit]'),feedback=lab.querySelector('[data-induction-feedback]');
    const draw=()=>{
        const s=inductionState(pole.value,motion.value,speed.value,circuit.value); if(!s)return;
        const text=s.sign===0?'Keine induzierte Spannung: Magnet und Spule ruhen; das Feld bleibt zeitlich unverändert.':(s.sign>0?'Positive':'Negative')+' induzierte Spannung in der festgelegten Anschlussrichtung. '+(speed.value==='fast'?'Schnellere Änderung auf demselben Weg: stärkerer Ausschlag.':'Langsamere Änderung auf demselben Weg: schwächerer Ausschlag.');
        lab.querySelector('[data-induction-status]').textContent=text+' '+(s.current?'Im geschlossenen Lastkreis ist während der Bewegung Strom möglich.':circuit.value==='open'?'Der Lastkreis ist offen; es fließt kein Laststrom.':'Ohne induzierte Spannung fließt hier auch im geschlossenen Lastkreis kein Strom.');
        lab.querySelector('[data-induction-plot]').innerHTML=inductionSvg(pole.value,motion.value,speed.value,circuit.value);feedback.textContent='';
    };
    for(const select of [pole,motion,speed,circuit])select.addEventListener('change',draw);
    for(const button of lab.querySelectorAll('[data-induction-verdict]'))button.addEventListener('click',()=>{
        const s=inductionState(pole.value,motion.value,speed.value,circuit.value),correct=Number(button.dataset.inductionVerdict)===s.sign;
        feedback.textContent=(correct?'Richtig: ':'Noch nicht: ')+(s.sign===0?'Ein unbewegter Magnet bei unverändertem Feld genügt nicht. Es braucht eine Flussänderung.':'In dieser Anschlussrichtung ist der Ausschlag '+(s.sign>0?'positiv':'negativ')+'. Nur die Bewegungsrichtung oder nur den Pol umzukehren, kehrt das Vorzeichen um. Beides zusammen lässt es gleich.')+' Spannung und Laststrom sind dabei verschiedene Größen.';
    });
    lab.querySelector('[data-induction-reset]').addEventListener('click',()=>{pole.value='N';motion.value='rest';speed.value='slow';circuit.value='open';draw();pole.focus();});draw();
}
