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
        currentRange.setAttribute('aria-describedby', 'materialText');
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

function updateMagnetField(val) {
    const lines = document.getElementById('fieldLines')?.children;
    const arrow = document.getElementById('currentArrow');
    const currentRange = document.getElementById('currentRange');
    if(!arrow || !lines) return;
    
    const numericVal = parseInt(val, 10) || 0;
    const arrowLength = 10 + (numericVal * 0.4);
    arrow.setAttribute('d', `M ${200 - arrowLength/2} 75 L ${200 + arrowLength/2} 75`);
    
    for(let line of lines) {
        line.style.opacity = (numericVal / 150) + 0.1;
        line.style.strokeWidth = 1 + (numericVal / 25);
    }

    if (currentRange) {
        currentRange.setAttribute('aria-valuetext', `Stromstärke ${numericVal} Prozent`);
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
    if(isUp) {
        arrow.setAttribute('d', 'M 200 75 L 200 20');
        if(txt) txt.innerText = "Kraft nach OBEN";
    } else {
        arrow.setAttribute('d', 'M 200 105 L 200 160');
        if(txt) txt.innerText = "Kraft nach UNTEN";
    }
    arrow.setAttribute('aria-label', txt ? txt.innerText : (isUp ? 'Kraft nach oben' : 'Kraft nach unten'));
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
    const windings2 = parseInt(val, 10) || windings1;
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
        
        // Current particle (Yellow dot moving on the wire)
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", "yellow");
        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        anim.setAttribute("path", `M 285 ${y} L 315 ${y+5}`);
        anim.setAttribute("dur", "1s");
        anim.setAttribute("repeatCount", "indefinite");
        dot.appendChild(anim);
        coil2.appendChild(dot);
    }
    
    // Update Secondary Voltage Bar
    if(voltBarSec) {
        const h = Math.min(windings2 * 15, 100);
        voltBarSec.setAttribute('height', h);
        voltBarSec.setAttribute('y', 160 - h);
    }
    if(voltValSec) voltValSec.innerText = u2 + "V";
    if (transRange) {
        transRange.setAttribute('aria-valuetext', `${windings2} Windungen sekundär, etwa ${u2} Volt`);
    }
    
    // Magnetic Flux Intensity Visualization
    if(flux) flux.style.strokeWidth = 1 + (windings2 / 3);
    if(fluxField) fluxField.setAttribute('opacity', 0.2 + (windings2 / 20));

    // Update Description Text
    if(windings2 < windings1) {
        if(txt) {
            txt.innerText = `Abwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "#E91E63";
        }
    } else if(windings2 > windings1) {
        if(txt) {
            txt.innerText = `Aufwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "#4CAF50";
        }
    } else {
        if(txt) {
            txt.innerText = `1:1 Übertragung (${u1}V ➔ ${u2}V)`;
            txt.style.color = "white";
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
