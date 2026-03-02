// Logic for elektromagnetismus topic
let energy = 0;
let isDraining = false;

function topicInit() {}

function updateMagnetField(val) {
    const lines = document.getElementById('fieldLines')?.children;
    const arrow = document.getElementById('currentArrow');
    if(!arrow || !lines) return;
    
    const arrowLength = 10 + (val * 0.4);
    arrow.setAttribute('d', `M ${200 - arrowLength/2} 100 L ${200 + arrowLength/2} 100`);
    
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
        if(txt) txt.innerText = "Aktuell: Nur Luft (Feld ist schwach)";
    } else if(type === 'wood') {
        core.setAttribute('fill', '#deb887');
        field.style.opacity = "0.2";
        if(txt) txt.innerText = "Aktuell: Holz (Keine Verstärkung)";
    } else if(type === 'iron') {
        core.setAttribute('fill', '#718096');
        field.style.opacity = "1";
        if(txt) txt.innerText = "Aktuell: Eisen (Maximale Verstärkung!)";
    }
}

let isUp = true;
function changeDirection() {
    const arrow = document.getElementById('forceArrow');
    const txt = document.getElementById('directionText');
    if(!arrow) return;
    isUp = !isUp;
    if(isUp) {
        arrow.setAttribute('d', 'M 200 100 L 200 30');
        if(txt) txt.innerText = "Wirkung: Schubs nach OBEN";
    } else {
        arrow.setAttribute('d', 'M 200 140 L 200 210');
        if(txt) txt.innerText = "Wirkung: Schubs nach UNTEN";
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
