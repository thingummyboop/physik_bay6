'use strict';
window.topicInit = function () {
    const zone = document.querySelector('[data-geology-lab]');
    if (!zone || zone.dataset.initialized === 'true') return;
    zone.dataset.initialized = 'true';
    const start = zone.querySelector('[data-geology-start]'), process = zone.querySelector('[data-geology-process]');
    const current = zone.querySelector('[data-geology-current]'), feedback = zone.querySelector('[data-geology-feedback]');
    const list = zone.querySelector('[data-geology-history]'), count = zone.querySelector('[data-geology-count]');
    const labels = { magma: 'Magma', igneous: 'Magmatisches Gestein', sediment: 'Lockeres Sediment', sedimentary: 'Sedimentgestein', metamorphic: 'Metamorphes Gestein' };
    const processes = { cool: 'Abkühlen und erstarren', weather: 'Verwittern, abtragen, transportieren und ablagern', compact: 'Verdichten und verkitten', transform: 'Im festen Zustand umwandeln', melt: 'Aufschmelzen' };
    const ways = {
        magma: { cool: 'igneous' },
        igneous: { weather: 'sediment', transform: 'metamorphic', melt: 'magma' },
        sediment: { compact: 'sedimentary' },
        sedimentary: { weather: 'sediment', transform: 'metamorphic', melt: 'magma' },
        metamorphic: { weather: 'sediment', transform: 'metamorphic', melt: 'magma' }
    };
    const explanations = {
        cool: 'Aus der erstarrenden Schmelze entsteht magmatisches Gestein.',
        weather: 'Die zusammengefassten Oberflächenprozesse liefern hier abgelagertes, lockeres Material. Verwitterung und Transport sind verschiedene Teile dieses Weges.',
        compact: 'Verdichtung und Verkittung verbinden die abgelagerten Körner zu Sedimentgestein.',
        transform: 'Gestein verändert sich im festen Zustand. Auch ein bereits metamorphes Gestein kann erneut umgewandelt werden.',
        melt: 'Aufschmelzen erzeugt Schmelze. Erst ein späteres Erstarren führt wieder zu magmatischem Gestein.'
    };
    let state = 'igneous', steps = 0, history = [];
    function show() {
        zone.dataset.state = state; zone.dataset.steps = String(steps);
        current.textContent = 'Aktuell: ' + labels[state];
        count.textContent = `${steps} ${steps === 1 ? 'Schritt' : 'Schritte'}. Startmaterial: ${labels[start.value] || labels.igneous}.`;
        list.replaceChildren(); list.start = Math.max(1, steps - 7);
        history.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
    }
    function begin() {
        if (!Object.hasOwn(labels, start.value)) {
            feedback.textContent = 'Wähle eines der fünf Startmaterialien.'; feedback.dataset.correct = 'false'; return;
        }
        state = start.value; steps = 0; history = []; process.value = ''; feedback.textContent = ''; delete feedback.dataset.correct; show();
    }
    start.addEventListener('change', begin);
    process.addEventListener('change', () => { feedback.textContent = ''; delete feedback.dataset.correct; });
    zone.querySelector('[data-geology-check]').addEventListener('click', () => {
        const action = process.value;
        if (!Object.hasOwn(processes, action)) {
            feedback.textContent = 'Wähle einen Vorgang und sage voraus, welches Material folgt.'; feedback.dataset.correct = 'false'; process.focus(); return;
        }
        const target = ways[state][action];
        if (!target) {
            let reason;
            if (action === 'cool') reason = 'Erstarren setzt in dieser Wegkarte Magma voraus. Das aktuelle Material ist bereits fest.';
            else if (action === 'compact') reason = 'Verdichten und verkitten startet hier bei lockerem Sediment. Es ist kein Ersatz für das Erstarren von Magma oder die Umwandlung eines festen Gesteins.';
            else if (state === 'magma') reason = 'Das Ausgangsmaterial ist Schmelze. Beginne hier mit Erstarren; die anderen ausgewählten Wege setzen festes Material voraus.';
            else reason = 'Die vereinfachte Wegkarte führt lockeres Sediment zunächst über Verdichten und Verkitten zum Sedimentgestein. Weitere Umlagerungen und direkte Sonderwege sind nicht dargestellt.';
            feedback.textContent = 'Kein direkter Schritt in dieser Wegkarte: ' + reason; feedback.dataset.correct = 'false'; return;
        }
        history.push(`${labels[state]} → ${processes[action]} → ${labels[target]}`); history = history.slice(-8); steps++; state = target;
        process.value = ''; show(); feedback.textContent = 'Möglicher Weg: ' + explanations[action]; feedback.dataset.correct = 'true'; current.focus();
    });
    zone.querySelector('[data-geology-reset]').addEventListener('click', () => {
        if (!Object.hasOwn(labels, start.value)) start.value = 'igneous';
        begin(); start.focus();
    });
    begin();
};
