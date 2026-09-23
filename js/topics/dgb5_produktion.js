function topicInit() { initSimpleLoop(); initSurveyCheck(); initProductionViews(); }

function initProductionViews() {
    const root = document.querySelector('[data-production-views]');
    if (!root || root.dataset.bound) return;
    const control = root.querySelector('#production-view');
    const views = [...root.querySelectorAll('[data-production-view]')];
    const status = root.querySelector('[data-production-view-status]');
    const names = { text: 'Text', table: 'Tabelle', chart: 'Balkendiagramm' };
    const update = () => {
        views.forEach(view => { view.hidden = view.dataset.productionView !== control.value; });
        status.textContent = names[control.value] + ' angezeigt. Die Datengrundlage bleibt gleich: acht erfundene Antworten, Lesen 3, Radfahren 4, Ballspiel 1.';
    };
    control.addEventListener('change', update);
    root.querySelector('[data-production-view-reset]').addEventListener('click', () => { control.value = 'text'; update(); control.focus(); });
    root.dataset.bound = '1';
    update();
}

function initSimpleLoop() {
    const root = document.querySelector('[data-simple-loop]');
    if (!root || root.dataset.bound) return;
    const count = root.querySelector('#loop-count');
    const step = root.querySelector('[data-loop-step]');
    const status = root.querySelector('[data-loop-status]');
    const dots = root.querySelector('[data-loop-dots]');
    let rounds = 0;
    function reset() {
        rounds = 0;
        dots.textContent = '';
        step.disabled = false;
        status.textContent = `Start: 0 Punkte. Geplant sind ${count.value} Schleifendurchläufe und danach eine weitere Anweisung.`;
    }
    step.addEventListener('click', () => {
        if (step.disabled) return;
        if (rounds < Number(count.value)) {
            rounds++;
            dots.textContent = Array(rounds).fill('● ●').join(' | ');
            status.textContent = `Schleifendurchlauf ${rounds} von ${count.value}: ${2 * rounds} Punkte. Die Anweisung nach der Schleife steht noch aus.`;
        } else {
            dots.textContent += (rounds ? ' | ' : '') + '●';
            status.textContent = `Fertig: ${rounds} Schleifendurchläufe ergeben ${2 * rounds} Punkte; danach kommt einmal 1 Punkt dazu. Insgesamt ${2 * rounds + 1} Punkte.`;
            step.disabled = true;
            root.querySelector('[data-loop-reset]').focus();
        }
    });
    root.querySelector('[data-loop-reset]').addEventListener('click', reset);
    count.addEventListener('change', reset);
    root.dataset.bound = '1';
    reset();
}

function initSurveyCheck() {
    const root = document.querySelector('[data-survey-check]');
    if (!root || root.dataset.bound) return;
    const rows = [...root.querySelectorAll('[data-survey-category]')];
    const records = [...document.querySelectorAll('[data-survey-records] tbody tr')];
    const status = root.querySelector('[data-survey-status]');
    const clear = () => {
        for (const row of rows) { row.querySelector('[data-survey-feedback]').textContent = ''; row.querySelector('input').removeAttribute('aria-invalid'); }
        status.textContent = 'Eingaben geändert. Prüfe deine Auszählung erneut.';
    };
    const check = () => {
        const values = rows.map(row => row.querySelector('input').value.trim());
        clear();
        if (values.some(value => !/^[0-8]$/.test(value))) {
            rows.forEach((row, i) => { if (!/^[0-8]$/.test(values[i])) { row.querySelector('input').setAttribute('aria-invalid', 'true'); row.querySelector('[data-survey-feedback]').textContent = 'Gib eine ganze Anzahl von 0 bis 8 ein.'; } });
            status.textContent = 'Fülle jede Kategorie mit einer ganzen Anzahl von 0 bis 8 aus. Es gibt acht Antwortzettel.';
            return;
        }
        let correct = 0;
        rows.forEach((row, i) => {
            const category = row.dataset.surveyCategory;
            const matching = records.filter(record => record.cells[1].textContent.trim() === category);
            const right = Number(values[i]) === matching.length;
            if (right) correct++;
            row.querySelector('[data-survey-feedback]').textContent = right ? 'Richtig zugeordnet.' : 'Prüfe die Antwortzettel ' + matching.map(record => record.cells[0].textContent.trim()).join(', ') + '. Zähle jeden genau einmal.';
        });
        const sum = values.reduce((total, value) => total + Number(value), 0);
        status.textContent = correct === rows.length ? 'Richtig: Alle drei Kategorien stimmen. Die Summe ist 8. Übertrage deine Tabelle jetzt in die Tabellenanwendung und erstelle das Diagramm.' : sum === records.length ? 'Die Summe ist 8, aber die Zuordnung stimmt noch nicht. Beachte die Rückmeldungen zu den Kategorien und vergleiche mit den Antwortzetteln.' : 'Deine Summe ist ' + sum + ', erwartet werden 8 Antworten. Prüfe auch die einzelnen Kategorien.';
    };
    root.querySelector('[data-survey-submit]').addEventListener('click', check);
    for (const row of rows) {
        const input = row.querySelector('input');
        input.addEventListener('input', clear);
        input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); check(); } });
    }
    root.querySelector('[data-survey-reset]').addEventListener('click', () => {
        rows.forEach(row => { row.querySelector('input').value = ''; });
        clear(); status.textContent = 'Noch nicht geprüft.'; rows[0].querySelector('input').focus();
    });
    root.dataset.bound = '1';
}
