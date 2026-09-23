// Logic for elektrizitaet topic
function topicInit() {
    initElectricEffects();
    initElectricEvidence();
    initCircuitPaths();
    initSensorLamp();
    if (!document.getElementById('uRange')) return;
    ensureOhmAccessibility();
    updateOhm();
}

function initElectricEffects() {
    const lab = document.querySelector('[data-electric-effects]');
    if (!lab || lab.dataset.bound) return;
    lab.dataset.bound = 'true';
    const cases = {heater:['heat'],bulb:['heat','light'],led:['light'],coil:['magnet'],coating:['chemical'],sun:['unsupported']};
    const choice = lab.querySelector('[data-effect-case]');
    const inputs = [...lab.querySelectorAll('[data-effect-choice]')];
    const feedback = lab.querySelector('[data-effect-feedback]');
    const names = Object.fromEntries(inputs.map(input => [input.value,input.closest('label').textContent.trim()]));
    const clear = () => { feedback.textContent = ''; delete feedback.dataset.correct; };
    function changeCase() {
        if (!Object.hasOwn(cases,choice.value)) choice.value = 'heater';
        lab.querySelectorAll('[data-effect-card]').forEach(card => { card.hidden = card.dataset.effectCard !== choice.value; });
        inputs.forEach(input => { input.checked = false; });
        clear();
    }
    inputs.forEach(input => input.addEventListener('change',clear));
    choice.addEventListener('change',changeCase);
    lab.querySelector('[data-effect-check]').addEventListener('click',() => {
        const selected = inputs.filter(input => input.checked).map(input => input.value);
        if (!selected.length) { feedback.dataset.correct = 'false'; feedback.textContent = 'Wähle mindestens eine Aussage aus. Wenn die elektrische Ursache nicht belegt ist, gibt es dafür eine eigene Auswahl.'; inputs[0].focus(); return; }
        const expected = cases[choice.value],missing = expected.filter(value => !selected.includes(value)),extra = selected.filter(value => !expected.includes(value));
        const correct = !missing.length && !extra.length;
        const reason = lab.querySelector('[data-effect-card="'+choice.value+'"] [data-effect-explanation]').textContent;
        feedback.dataset.correct = String(correct);
        feedback.textContent = (correct ? 'Richtig begründet: ' : 'Prüfe die Belege: ')
            + (missing.length ? 'Es fehlt: '+missing.map(value=>names[value]).join(', ')+'. ' : '')
            + (extra.length ? 'Diese Auswahl ist durch den Text nicht gestützt: '+extra.map(value=>names[value]).join(', ')+'. ' : '') + reason;
    });
    lab.querySelector('[data-effect-reset]').addEventListener('click',() => { choice.value = 'heater'; changeCase(); choice.focus(); });
    changeCase();
}

function initElectricEvidence() {
    const lab = document.querySelector('[data-electric-evidence]');
    if (!lab || lab.dataset.bound) return;
    lab.dataset.bound = 'true';
    const get = name => lab.querySelector('[data-evidence-' + name + ']');
    const series = get('series'), count = get('count'), feedback = get('feedback');
    const data = { A: [20, 41, 59, 80], B: [20, 30, 40, 50] };
    const format = n => n > 0 ? '+' + n : String(n).replace('-', '−');
    function render() {
        if (!Object.hasOwn(data, series.value)) series.value = 'A';
        if (!['1', '2', '3', '4'].includes(count.value)) count.value = '1';
        const values = data[series.value].slice(0, Number(count.value));
        get('rows').innerHTML = values.map((i, index) => `<tr><th scope="row">${index + 1} V</th><td data-label="Modell">${20 * (index + 1)} mA</td><td data-label="Übungswert">${i} mA</td><td data-label="Abweichung">${format(i - 20 * (index + 1))} mA</td></tr>`).join('');
        const svg = get('chart');
        // Axes: x = 50 + 65 U, y = 220 - 2 I (I in mA).
        const grid = [0,20,40,60,80].map(i => `<line x1="50" y1="${220-2*i}" x2="310" y2="${220-2*i}" stroke="currentColor" opacity=".2"/><text x="42" y="${225-2*i}" text-anchor="end">${i}</text>`).join('');
        const ticks = [0,1,2,3,4].map(u => `<text x="${50+65*u}" y="241" text-anchor="middle">${u}</text>`).join('');
        const points = values.map((i,index) => `<circle data-evidence-point="${index+1}" cx="${50+65*(index+1)}" cy="${220-2*i}" r="6" fill="var(--card-bg, white)" stroke="currentColor" stroke-width="3"/>`).join('');
        svg.innerHTML = `<title>Reihe ${series.value} und Modell mit 50 Ohm</title><g fill="currentColor" font-size="15">${grid}<path d="M50 35V220H325" fill="none" stroke="currentColor" stroke-width="2"/>${ticks}<text x="50" y="23">I in mA</text><text x="270" y="268">U in V</text><path data-evidence-model d="M50 220L310 60" fill="none" stroke="currentColor" stroke-width="2"/>${points}</g>`;
        svg.setAttribute('aria-label', `50-Ω-Modell: 20 mA pro Volt. Reihe ${series.value}: ${values.map((i,index)=>(index+1)+' Volt, '+i+' Milliampere').join('; ')}. Dieselben Werte stehen in der Tabelle.`);
        get('status').textContent = `Reihe ${series.value}: ${count.value} von 4 Wertepaaren aufgedeckt. Die Werte sind erfunden. Vergleiche Übungswert und Modell in der Tabelle.`;
        feedback.textContent = '';
        delete feedback.dataset.correct;
    }
    lab.querySelectorAll('[data-evidence-answer]').forEach(button => button.addEventListener('click', () => {
        const values = data[series.value].slice(0, Number(count.value));
        const fits = values.every((i,index) => Math.abs(i - 20*(index+1)) <= 2);
        const expected = values.length === 1 ? 'insufficient' : fits ? 'fits' : 'differs';
        const correct = button.dataset.evidenceAnswer === expected;
        const explanation = expected === 'insufficient'
            ? 'Das eine Wertepaar passt zu 50 Ω. Erst weitere Werte bei anderen Spannungen erlauben einen Vergleich über einen Bereich.'
            : fits
                ? 'Alle aufgedeckten Werte liegen höchstens 1 mA vom Modell entfernt, also innerhalb der vereinbarten 2 mA. Das stützt die Beschreibung für diese Werte; es beweist sie nicht für jede Spannung.'
                : 'Schon bei 2 V stehen 30 mA statt der vorhergesagten 40 mA. Die Abweichung von 10 mA überschreitet die vereinbarten 2 mA. Konstante 50 Ω beschreiben diese Reihe nicht. Daraus allein folgt noch nicht, welches Bauteil vorliegt.';
        feedback.dataset.correct = String(correct);
        feedback.textContent = (correct ? 'Richtig: ' : 'Prüfe noch einmal: ') + explanation;
    }));
    [series,count].forEach(control => control.addEventListener('change', render));
    get('reset').addEventListener('click', () => { series.value = 'A'; count.value = '1'; render(); series.focus(); });
    render();
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
