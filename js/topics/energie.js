// Logic for energie topic
let isClosed = false;

function topicInit() {
    enhanceEnergyAccessibility();
    updateWind();
}

function enhanceEnergyAccessibility() {
    [
        'weightText',
        'pendulumText',
        'batteryText',
        'windValue',
        'circuitText'
    ].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const windRange = document.getElementById('windRange');
    if (windRange) {
        windRange.setAttribute('aria-describedby', 'windValue');
        windRange.setAttribute('aria-valuetext', getWindValueText(Number(windRange.value || 0)));
    }

    const switchBtn = document.getElementById('switchBtn');
    if (switchBtn) switchBtn.setAttribute('aria-pressed', String(isClosed));
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
        wTxt.innerText = "Hantel ist oben: Lageenergie ist gespeichert. Je höher sie ist, desto mehr kann beim Fallen passieren.";
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
        wTxt.innerText = "Die Hantel fällt: Lageenergie wird Bewegungsenergie. Beim Aufprall wird viel Energie zu Wärme und Schall.";
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
        pTxt.innerText = "Das Pendel schwingt: außen mehr Lageenergie, unten mehr Bewegungsenergie.";
        pTxt.style.color = "#2E7D32";
    }
}
function stopPendulum() {
    const pObj = document.getElementById('pendulumObj');
    const pTxt = document.getElementById('pendulumText');
    if(!pObj) return;
    pObj.classList.remove('anim-swing');
    if(pTxt) {
        pTxt.innerText = "Modell angehalten. Bei einem echten Pendel wird durch Reibung Energie auf Luft und Aufhängung übertragen; hier beendet der Knopf nur die Animation.";
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
            text.innerText = "Energiekette: chemische Energie in der Batterie -> elektrische Energie im Kabel -> Licht und Wärme in der Lampe.";
            text.style.color = "#F57F17";
        }
    }, 600);
}

// 4. Windrad (Erneuerbare Energien)
function updateWind() {
    const range = document.getElementById('windRange');
    const val = Number(range?.value || 0);
    const blades = document.getElementById('windBlades');
    const text = document.getElementById('windValue');
    const description = getWindValueText(val);
    range?.setAttribute('aria-valuetext', description);
    if (text) text.textContent = description;
    if (!blades) return;
    blades.classList.toggle('anim-spin', val > 0 && val < 80);
    if (val > 0 && val < 80) blades.style.animationDuration = (3 - val * 0.028) + 's';
}

function getWindValueText(value) {
    if (value === 0) return 'Modellstufe 0: Windstille, keine elektrische Leistung aus Wind.';
    if (value < 40) return 'Modellstufe ' + value + ': schwacher Wind, geringe elektrische Leistung.';
    if (value < 80) return 'Modellstufe ' + value + ': stärkerer Wind, höhere elektrische Leistung im Modell.';
    return 'Modellstufe ' + value + ': Sturmabschaltung zum Schutz, keine elektrische Leistung im Modell.';
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
            text.innerText = "Kreis geschlossen: Es gibt einen ganzen Weg. Die Lampe wandelt elektrische Energie in Licht und Wärme um.";
            text.style.color = "#388E3C";
        }
        btn.innerText = "Schalter öffnen 🛑";
        btn.setAttribute('aria-pressed', 'true');
    } else {
        line.setAttribute('x2', '140');
        line.setAttribute('y2', '20');
        bulb.setAttribute('fill', '#E0E0E0'); 
        if(text) {
            text.innerText = "Stromkreis ist unterbrochen. Die Lampe ist aus.";
            text.style.color = "#D32F2F";
        }
        btn.innerText = "Schalter schließen 🔌";
        btn.setAttribute('aria-pressed', 'false');
    }
}
