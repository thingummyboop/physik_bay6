// Logic for elektrizitaet topic
function topicInit() {
    if (!document.getElementById('uRange')) return;
    ensureOhmAccessibility();
    updateOhm();
}

function ensureOhmAccessibility() {
    const uRange = document.getElementById('uRange');
    const rRange = document.getElementById('rRange');
    const uVal = document.getElementById('uVal');
    const rVal = document.getElementById('rVal');
    const iValText = document.getElementById('iValText');
    const bulb = document.getElementById('ohmBulb');
    if (!uRange || !rRange || !uVal || !rVal || !iValText || !bulb) return;

    let ohmFeedback = document.getElementById('ohmFeedback');
    if (!ohmFeedback) {
        ohmFeedback = document.createElement('p');
        ohmFeedback.id = 'ohmFeedback';
        ohmFeedback.className = 'lab-feedback';
        ohmFeedback.innerText = 'Mittlerer Strom: Verändere U oder R und beobachte die Lampe.';
        const interactiveZone = uRange.closest('.interactive-zone');
        if (interactiveZone) interactiveZone.appendChild(ohmFeedback);
    }

    iValText.setAttribute('role', 'status');
    iValText.setAttribute('aria-live', 'polite');
    iValText.setAttribute('aria-atomic', 'true');
    ohmFeedback.setAttribute('role', 'status');
    ohmFeedback.setAttribute('aria-live', 'polite');
    ohmFeedback.setAttribute('aria-atomic', 'true');

    if (!uVal.id) uVal.id = 'uVal';
    if (!rVal.id) rVal.id = 'rVal';
    uRange.setAttribute('aria-describedby', `uVal ohmFeedback`);
    rRange.setAttribute('aria-describedby', `rVal ohmFeedback`);
    bulb.setAttribute('role', 'img');
}

function answerFinalQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 20);
}

function answerQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 10);
}

function handleChargeExercise(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 10, isCorrect ? "Richtig! Plus und Minus ziehen sich an." : "Denk an Magnete: Gegensätze ziehen sich an. Bei Ladungen heißt das Plus und Minus.");
}

// 6. Ohmsches Gesetz
function updateOhm() {
    const uRange = document.getElementById('uRange');
    const rRange = document.getElementById('rRange');
    const uVal = document.getElementById('uVal');
    const rVal = document.getElementById('rVal');
    const iValText = document.getElementById('iValText');
    const bulb = document.getElementById('ohmBulb');
    
    if(!uRange || !rRange || !uVal || !rVal || !iValText || !bulb) return;

    const u = parseFloat(uRange.value);
    const r = parseFloat(rRange.value);
    const i = u / r;

    uVal.innerText = u + "V";
    rVal.innerText = r + " Ω";
    iValText.innerText = "Stromstärke I = " + i.toFixed(2) + " A";
    uRange.setAttribute('aria-valuetext', `${u} Volt`);
    rRange.setAttribute('aria-valuetext', `${r} Ohm`);

    const ohmFeedback = document.getElementById('ohmFeedback');
    if (ohmFeedback) {
        if (i < 0.15) {
            ohmFeedback.innerText = "Wenig Strom: Die Spannung ist klein oder der Widerstand bremst stark.";
        } else if (i < 0.55) {
            ohmFeedback.innerText = "Mittlerer Strom: Die Lampe leuchtet sichtbar, aber nicht sehr hell.";
        } else {
            ohmFeedback.innerText = "Viel Strom: Mehr Spannung oder weniger Widerstand macht die Lampe heller.";
        }
    }

    // Brightness based on current I
    // Max current is 12 / 10 = 1.2A. 
    const brightness = Math.min(1, i / 0.5); 
    bulb.style.filter = `drop-shadow(0 0 ${brightness * 20}px #FBC02D) brightness(${0.5 + brightness * 0.5})`;
    bulb.setAttribute('fill', brightness > 0.1 ? '#FFF176' : '#e0e0e0');
    const brightnessLabel = brightness < 0.25 ? 'Lampe dunkel' : (brightness < 0.7 ? 'Lampe mittelhell' : 'Lampe sehr hell');
    bulb.setAttribute('aria-label', `${brightnessLabel}, Stromstärke ${i.toFixed(2)} Ampere`);
}
