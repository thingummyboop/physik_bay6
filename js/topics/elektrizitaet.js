// Logic for elektrizitaet topic
function topicInit() {
    initCircuitPaths();
    initSensorLamp();
    if (!document.getElementById('uRange')) return;
    ensureOhmAccessibility();
    updateOhm();
}

function initSensorLamp() {
    const zone = document.querySelector('[data-sensor-lamp]');
    if (!zone || zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const get = name => zone.querySelector('[data-lamp-' + name + ']');
    const light = get('light'), mode = get('mode'), power = get('power');
    const render = () => {
        if (!['bright', 'dark'].includes(light.value)) light.value = 'bright';
        if (!['auto', 'on', 'off'].includes(mode.value)) mode.value = 'auto';
        const dark = light.value === 'dark';
        const on = power.checked && (mode.value === 'on' || (mode.value === 'auto' && dark));
        get('input').textContent = power.checked ? 'Sensorsignal: ' + (dark ? 'dunkel.' : 'hell.') : 'Ohne Versorgung liefert der Sensor hier kein Signal.';
        get('rule').textContent = !power.checked ? 'Ohne Versorgung arbeitet die Steuerung nicht.' :
            mode.value === 'off' ? 'Betriebsart Aus: LED bleibt aus.' :
            mode.value === 'on' ? 'Dauerlicht: LED einschalten, unabhängig vom Helligkeitssignal.' :
            'Automatik: Wenn das Signal „dunkel“ lautet, LED einschalten; sonst ausschalten.';
        get('output').textContent = on ? 'LED leuchtet.' : 'LED leuchtet nicht.';
        get('output').dataset.on = String(on);
        get('status').textContent = get('input').textContent + ' ' + get('rule').textContent + ' ' + get('output').textContent;
    };
    [light, mode, power].forEach(control => control.addEventListener('change', render));
    get('reset').addEventListener('click', () => {
        light.value = 'bright';
        mode.value = 'auto';
        power.checked = true;
        render();
    });
    render();
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
        ohmFeedback.innerText = `${u} V ÷ ${r} Ω = ${i.toFixed(2).replace(".", ",")} A. Vergleiche zwei Fälle und halte dabei U oder R gleich. Die Helligkeit ist nur eine Modellanzeige, keine Vorhersage für eine reale Lampe.`;
    }

    // Brightness based on current I
    // Max current is 12 / 10 = 1.2A. 
    const brightness = Math.min(1, i / 0.5); 
    bulb.style.filter = `drop-shadow(0 0 ${brightness * 20}px #FBC02D) brightness(${0.5 + brightness * 0.5})`;
    bulb.setAttribute('fill', brightness > 0.1 ? '#FFF176' : '#e0e0e0');
    const brightnessLabel = brightness < 0.25 ? 'Lampe dunkel' : (brightness < 0.7 ? 'Lampe mittelhell' : 'Lampe sehr hell');
    bulb.setAttribute('aria-label', `${brightnessLabel}, Stromstärke ${i.toFixed(2)} Ampere`);
}

function initCircuitPaths() {
    const zone = document.querySelector('[data-circuit-model]');
    if (!zone || zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const kind = zone.querySelector('[data-circuit-kind]');
    const switches = [zone.querySelector('[data-circuit-s1]'), zone.querySelector('[data-circuit-s2]')];
    const status = zone.querySelector('[data-circuit-status]');
    const render = () => {
        if (!['series', 'parallel'].includes(kind.value)) kind.value = 'series';
        const series = kind.value === 'series';
        const on = switches.map(control => series ? switches.every(s => s.checked) : control.checked);
        ['series', 'parallel'].forEach(type => {
            const group = zone.querySelector('[data-circuit-' + type + ']');
            group.style.display = type === kind.value ? '' : 'none';
            switches.forEach((control, index) => {
                const wire = group.querySelector('[data-wire-s' + (index + 1) + ']');
                wire.setAttribute('y2', Number(wire.getAttribute('y1')) - (control.checked ? 0 : 18));
                const bulb = group.querySelector('[data-bulb="' + (index + 1) + '"]');
                bulb.setAttribute('fill', on[index] ? '#facc15' : 'none');
                bulb.dataset.on = String(on[index]);
            });
        });
        const states = on.map((value, index) => 'L' + (index + 1) + (value ? ' leuchtet.' : ' ist aus.')).join(' ');
        const explanation = series
            ? (on[0] ? 'Der gemeinsame Weg durch beide Lampen ist geschlossen.' : 'Mindestens ein Schalter unterbricht den gemeinsamen Weg durch beide Lampen.')
            : switches.map((control, index) => 'Zweig ' + (index + 1) + ' ist ' + (control.checked ? 'geschlossen.' : 'unterbrochen.')).join(' ');
        status.textContent = (series ? 'Reihenschaltung: ' : 'Parallelschaltung: ') + states + ' ' + explanation;
        zone.querySelector('[data-circuit-diagram]').setAttribute('aria-label', status.textContent);
    };
    [kind, ...switches].forEach(control => control.addEventListener('change', render));
    zone.querySelector('[data-circuit-reset]').addEventListener('click', () => {
        kind.value = 'series';
        switches.forEach(control => { control.checked = true; });
        render();
    });
    render();
}
