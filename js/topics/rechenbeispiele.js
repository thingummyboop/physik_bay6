// Practice state stays on the page. The separate chapter check owns saved mastery.
const calculationStates = new WeakMap();

function topicInit() {
    document.querySelectorAll('[data-calculation]').forEach(zone => {
        if (calculationStates.has(zone)) return;
        const input = zone.querySelector('input');
        const config = zone.querySelector('template[data-calculation-cases]');
        if (!input || !config) return;
        const cases = JSON.parse(config.content.textContent);
        const state = { cases, index: 0, correct: false };
        calculationStates.set(zone, state);
        const feedback = zone.querySelector('.feedback');
        input.setAttribute('aria-describedby', feedback.id);
        feedback.setAttribute('aria-atomic', 'true');
        input.addEventListener('input', () => {
            state.correct = false;
            input.removeAttribute('aria-invalid');
            zone.removeAttribute('data-result');
            feedback.textContent = 'Eingabe geändert. Prüfe dein neues Ergebnis.';
            updateCalculationProgress();
        });
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') { event.preventDefault(); checkInput(input.id); }
        });
        zone.querySelector('[data-check-input]').addEventListener('click', () => checkInput(input.id));
        zone.querySelector('[data-calculation-next]').addEventListener('click', () => {
            state.index = (state.index + 1) % cases.length;
            renderCalculationCase(zone);
            input.focus();
        });
        renderCalculationCase(zone);
    });
    updateCalculationProgress();
}

function renderCalculationCase(zone) {
    const state = calculationStates.get(zone), current = state.cases[state.index];
    const input = zone.querySelector('input');
    state.correct = false;
    zone.removeAttribute('data-result');
    zone.querySelector('[data-calculation-question]').textContent = current.question;
    zone.querySelector('[data-calculation-unit]').textContent = current.unit;
    zone.querySelector('[data-calculation-case]').textContent = `Aufgabe ${state.index + 1} von ${state.cases.length}`;
    zone.querySelector('.feedback').textContent = '';
    zone.querySelector('[data-calculation-help]').open = false;
    zone.querySelector('[data-calculation-help] p').textContent = current.hint;
    input.value = '';
    input.removeAttribute('aria-invalid');
    if (current.graph) renderCalculationGraph(zone, current.graph);
    updateCalculationProgress();
}

function checkInput(inputId) {
    const input = document.getElementById(inputId), zone = input?.closest('[data-calculation]');
    const state = zone && calculationStates.get(zone);
    if (!state) return;
    const feedback = zone.querySelector('.feedback'), current = state.cases[state.index];
    const raw = input.value.trim(), value = Number(raw.replace(',', '.'));
    state.correct = false;
    if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw) || !Number.isFinite(value)) {
        input.setAttribute('aria-invalid', 'true');
        zone.dataset.result = 'invalid';
        feedback.textContent = 'Gib einen Zahlenwert mit Komma oder Punkt ein. Die Einheit steht am Feld; weitere Zeichen gehören nicht in die Eingabe.';
    } else {
        input.removeAttribute('aria-invalid');
        state.correct = value === current.answer;
        zone.dataset.result = state.correct ? 'correct' : 'incorrect';
        feedback.textContent = state.correct ? 'Richtig. ' + current.solution : 'Noch nicht. ' + current.hint;
    }
    updateCalculationProgress();
}

function updateCalculationProgress() {
    const zones = [...document.querySelectorAll('[data-calculation]')];
    const correct = zones.filter(zone => calculationStates.get(zone)?.correct).length;
    const message = document.querySelector('[data-calculation-progress]');
    const bar = document.querySelector('.calculation-progress progress');
    if (message) message.textContent = `${correct} von ${zones.length} aktuellen Aufgaben richtig geprüft. Andere Zahlen beginnen für diese Aufgabe einen neuen Versuch.`;
    if (bar) { bar.max = zones.length; bar.value = correct; }
}

function renderCalculationGraph(zone, points) {
    const maxTime = Math.max(...points.map(point => point[0]));
    const maxDistance = Math.ceil(Math.max(...points.map(point => point[1])) / 10) * 10;
    const x = time => 44 + time / maxTime * 250;
    const y = distance => 190 - distance / maxDistance * 150;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 360 250');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Kumulierte Strecke im Modell: ' + points.map(([time, distance]) => `${distance} m bei ${time} s`).join('; '));
    // All interpolated values come from numeric exercise data, never from user input.
    svg.innerHTML = '<rect width="360" height="250" fill="white"/>' +
        '<path d="M44 30 V190 H320" fill="none" stroke="#172033" stroke-width="2"/>' +
        `<polyline data-calculation-line points="${points.map(([time,distance]) => `${x(time)},${y(distance)}`).join(' ')}" fill="none" stroke="#1765a8" stroke-width="3"/>` +
        points.map(([time,distance]) => `<circle cx="${x(time)}" cy="${y(distance)}" r="4" fill="#995000"/><text x="${x(time)}" y="213" text-anchor="middle">${time}</text>`).join('') +
        Array.from({length: maxDistance / (maxDistance > 50 ? 20 : 10) + 1}, (_, index) => {
            const distance = index * (maxDistance > 50 ? 20 : 10);
            return `<line x1="40" y1="${y(distance)}" x2="44" y2="${y(distance)}" stroke="#172033"/><text x="35" y="${y(distance)+5}" text-anchor="end">${String(distance).replace('.',',')}</text>`;
        }).join('') +
        '<text x="180" y="239" text-anchor="middle">Zeit in s</text><text x="14" y="117" transform="rotate(-90 14 117)" text-anchor="middle">Strecke in m</text>';
    zone.querySelector('[data-calculation-graph]').replaceChildren(svg);
    const table = document.createElement('table');
    table.dataset.calculationTable = '';
    table.innerHTML = '<caption>Vorgegebene Modelldaten</caption><thead><tr><th scope="col">Zeit in s</th><th scope="col">Kumulierte Strecke in m</th></tr></thead><tbody>' +
        points.map(([time,distance]) => `<tr><th scope="row">${time}</th><td>${distance}</td></tr>`).join('') + '</tbody>';
    zone.querySelector('[data-calculation-data]').replaceChildren(table);
}
