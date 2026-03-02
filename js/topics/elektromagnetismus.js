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
    if(!coil2) return;
    
    coil2.innerHTML = '';
    const windings = parseInt(val);
    
    for(let i=0; i < windings; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const y = 40 + (i * 8);
        line.setAttribute("d", `M 280 ${y} L 300 ${y+5}`);
        line.setAttribute("stroke", "#ED8936");
        line.setAttribute("stroke-width", "4");
        coil2.appendChild(line);
    }
    
    if(windings < 5) {
        txt.innerText = `Abwärtstransformator (3:${windings})`;
        txt.style.color = "#E91E63";
    } else if(windings > 5) {
        txt.innerText = `Aufwärtstransformator (3:${windings})`;
        txt.style.color = "#4CAF50";
    } else {
        txt.innerText = "1:1 Übertragung (3:3)";
        txt.style.color = "white";
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
