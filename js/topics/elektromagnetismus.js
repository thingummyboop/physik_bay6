// Logic for elektromagnetismus topic
let energy = 0;
let isDraining = false;
let relayClosed = false;

function topicInit() {
    updateMagnetField(30);
    updateTransformer(5);
    updateRelay(false);
}

function updateMagnetField(val) {
    const lines = document.getElementById('fieldLines')?.children;
    const arrow = document.getElementById('currentArrow');
    if(!arrow || !lines) return;
    
    const arrowLength = 10 + (val * 0.4);
    arrow.setAttribute('d', `M ${200 - arrowLength/2} 75 L ${200 + arrowLength/2} 75`);
    
    for(let line of lines) {
        line.style.opacity = (val / 150) + 0.1;
        line.style.strokeWidth = 1 + (val / 25);
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
}

function shakeFlashlight() {
    const fl = document.getElementById('flashlight');
    const beam = document.getElementById('lightBeam');
    const enDisp = document.getElementById('energyLevel');
    if(!fl || !beam) return;

    fl.classList.add('shaking');
    energy = Math.min(energy + 15, 100);
    beam.style.opacity = energy / 100;
    if(enDisp) enDisp.innerText = energy;
    setTimeout(() => fl.classList.remove('shaking'), 150);
    
    if(!isDraining) {
        isDraining = true;
        let drain = setInterval(() => {
            energy = Math.max(energy - 2, 0);
            beam.style.opacity = energy / 100;
            if(enDisp) enDisp.innerText = Math.floor(energy);
            if(energy === 0) { 
                clearInterval(drain); 
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
    
    if(!coil2) return;
    
    const windings1 = 5; 
    const windings2 = parseInt(val);
    const u1 = 230;
    const u2 = Math.round(u1 * (windings2 / windings1));
    
    coil2.innerHTML = '';
    for(let i=0; i < windings2; i++) {
        const y = 60 + (i * 100 / (windings2 + 1 || 1));
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M 285 ${y} L 315 ${y+5}`);
        path.setAttribute("stroke", "#ED8936");
        path.setAttribute("stroke-width", "6");
        coil2.appendChild(path);
        
        // Add current particle
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
    
    if(voltBarSec) {
        const h = Math.min(windings2 * 15, 100);
        voltBarSec.setAttribute('height', h);
        voltBarSec.setAttribute('y', 160 - h);
    }
    if(voltValSec) voltValSec.innerText = u2 + "V";
    
    // Magnetic Flux Intensity based on Windings (for visualization)
    if(flux) flux.style.strokeWidth = 1 + (windings2 / 3);
    if(fluxField) fluxField.setAttribute('opacity', 0.2 + (windings2 / 20));

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
}

function toggleRelay() {
    updateRelay(!relayClosed);
}
