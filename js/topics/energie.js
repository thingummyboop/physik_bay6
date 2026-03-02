// Logic for energie topic
let isClosed = false;

function topicInit() {
    updateWind();
}

// 1. Hantel (Lage/Bewegungsenergie)
function liftWeight() {
    const wGrp = document.getElementById('weightGroup');
    const wTxt = document.getElementById('weightText');
    const lBtn = document.getElementById('liftBtn');
    const dBtn = document.getElementById('dropBtn');
    if(!wGrp) return;

    wGrp.style.transform = 'translateY(20px)';
    wGrp.style.transition = 'transform 2s ease-out';
    if(wTxt) {
        wTxt.innerText = "Hantel ist oben! Lageenergie (Potenzielle Energie) ist gespeichert.";
        wTxt.style.color = "#E65100";
    }
    if(lBtn) lBtn.disabled = true;
    setTimeout(() => { if(dBtn) dBtn.disabled = false; }, 2000);
}

function dropWeight() {
    const wGrp = document.getElementById('weightGroup');
    const wTxt = document.getElementById('weightText');
    const lBtn = document.getElementById('liftBtn');
    const dBtn = document.getElementById('dropBtn');
    if(!wGrp) return;

    wGrp.style.transform = 'translateY(140px)';
    wGrp.style.transition = 'transform 0.3s ease-in';
    if(wTxt) {
        wTxt.innerText = "WUSCH! Die Lageenergie hat sich in Bewegungsenergie verwandelt!";
        wTxt.style.color = "#2E7D32";
    }
    if(dBtn) dBtn.disabled = true;
    setTimeout(() => { if(lBtn) lBtn.disabled = false; }, 500);
}

// 2. Pendel (Energieerhaltung)
function startPendulum() {
    const pObj = document.getElementById('pendulumObj');
    const pTxt = document.getElementById('pendulumText');
    if(!pObj) return;
    pObj.classList.add('anim-swing');
    if(pTxt) {
        pTxt.innerText = "Das Pendel schwingt! Lageenergie ↔️ Bewegungsenergie.";
        pTxt.style.color = "#2E7D32";
    }
}
function stopPendulum() {
    const pObj = document.getElementById('pendulumObj');
    const pTxt = document.getElementById('pendulumText');
    if(!pObj) return;
    pObj.classList.remove('anim-swing');
    if(pTxt) {
        pTxt.innerText = "Pendel gestoppt. Die Energie wurde (durch Reibung) an die Luft abgegeben.";
        pTxt.style.color = "#D32F2F";
    }
}

// 3. Batterie/Taschenlampe
function insertBattery() {
    let battery = document.getElementById('batterySvg');
    let bulb = document.getElementById('flashlightBulb');
    let beam = document.getElementById('lightBeam');
    let text = document.getElementById('batteryText');
    if(!battery || !bulb || !beam) return;
    
    battery.style.transform = 'translateX(20px)'; 
    
    setTimeout(() => {
        bulb.setAttribute('fill', '#FFF176');
        beam.style.opacity = '0.8';
        if(text) {
            text.innerText = "Chemische Energie ➡️ Elektrische Energie ➡️ Lichtenergie!";
            text.style.color = "#F57F17";
        }
    }, 600);
}

// 4. Windrad (Erneuerbare Energien)
function updateWind() {
    let val = document.getElementById('windRange')?.value || 0;
    let blades = document.getElementById('windBlades');
    let text = document.getElementById('windValue');
    if(!blades) return;
    
    if (val == 0) {
        blades.classList.remove('anim-spin');
        if(text) {
            text.innerText = "0% (Windstill - Kein Strom)";
            text.style.color = "#0288D1";
        }
    } else {
        blades.classList.add('anim-spin');
        let duration = 3 - (val * 0.028); 
        blades.style.animationDuration = duration + 's';
        
        if(text) {
            if(val < 40) {
                text.innerText = val + "% (Leichte Brise - Etwas Strom)";
                text.style.color = "#43A047";
            } else if(val < 80) {
                text.innerText = val + "% (Starker Wind - Viel Strom!)";
                text.style.color = "#F57F17";
            } else {
                text.innerText = val + "% (Sturm - Volle Power!)";
                text.style.color = "#D84315";
            }
        }
    }
}

// 5. Stromkreis
function toggleSwitch() {
    let line = document.getElementById('switchLine');
    let bulb = document.getElementById('circuitBulb');
    let text = document.getElementById('circuitText');
    let btn = document.getElementById('switchBtn');
    if(!line || !bulb || !btn) return;

    isClosed = !isClosed;

    if (isClosed) {
        line.setAttribute('x2', '150');
        line.setAttribute('y2', '40');
        bulb.setAttribute('fill', '#FFEB3B'); 
        if(text) {
            text.innerText = "Kreis ist geschlossen! Die Elektronen fließen, Lampe leuchtet.";
            text.style.color = "#388E3C";
        }
        btn.innerText = "Schalter öffnen 🛑";
    } else {
        line.setAttribute('x2', '140');
        line.setAttribute('y2', '20');
        bulb.setAttribute('fill', '#E0E0E0'); 
        if(text) {
            text.innerText = "Stromkreis ist unterbrochen. Die Lampe ist aus.";
            text.style.color = "#D32F2F";
        }
        btn.innerText = "Schalter schließen 🔌";
    }
}
