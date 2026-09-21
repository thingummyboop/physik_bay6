'use strict';
function topicInit() {
    document.querySelectorAll('[data-cladogram-rotation]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        let rootRotated = false;
        let pairRotated = false;
        const svg = zone.querySelector('svg');
        const status = zone.querySelector('[role="status"]');
        const rootButton = zone.querySelector('[data-rotate-root]');
        const pairButton = zone.querySelector('[data-rotate-pair]');
        function render(announce) {
            const aY = rootRotated ? 160 : 40;
            const positions = rootRotated ? [40, 100] : [100, 160];
            const bY = positions[pairRotated ? 1 : 0];
            const cY = positions[pairRotated ? 0 : 1];
            const pairY = (bY + cY) / 2;
            const rootY = (aY + pairY) / 2;
            const order = [['A', aY], ['B', bY], ['C', cY]].sort((a, b) => a[1] - b[1]).map(item => item[0]).join(', ');
            svg.setAttribute('aria-label', `Kladogramm. Von oben nach unten: ${order}. A zweigt am älteren Knoten ab. B und C teilen einen jüngeren gemeinsamen Knoten. Keine Zeitskala.`);
            svg.innerHTML = `
                <g fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M12 ${rootY} H45 M45 ${aY} V${pairY} M45 ${aY} H235 M45 ${pairY} H145"/>
                    <path data-bc-branch d="M145 ${bY} V${cY} M145 ${bY} H235 M145 ${cY} H235"/>
                </g>
                <g fill="currentColor">
                    <circle cx="45" cy="${rootY}" r="5"/>
                    <circle data-bc-node cx="145" cy="${pairY}" r="5"/>
                    <text x="30" y="${rootY - 12}" font-size="20">1</text>
                    <text x="128" y="${pairY - 12}" font-size="20">2</text>
                    <text data-tip="A" x="255" y="${aY + 7}" font-size="24">A</text>
                    <text data-tip="B" x="255" y="${bY + 7}" font-size="24">B</text>
                    <text data-tip="C" x="255" y="${cY + 7}" font-size="24">C</text>
                </g>`;
            rootButton.setAttribute('aria-pressed', String(rootRotated));
            pairButton.setAttribute('aria-pressed', String(pairRotated));
            if (announce) status.textContent = `Reihenfolge: ${order}. Die Verwandtschaft bleibt gleich: B und C teilen Knoten 2; mit A teilen beide Knoten 1.`;
        }
        rootButton.addEventListener('click', () => { rootRotated = !rootRotated; render(true); });
        pairButton.addEventListener('click', () => { pairRotated = !pairRotated; render(true); });
        zone.querySelector('[data-tree-reset]').addEventListener('click', () => {
            rootRotated = false;
            pairRotated = false;
            render(true);
        });
        render(false);
    });
    document.querySelectorAll('[data-cladogram-evidence]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        const dataset = zone.querySelector('[data-clad-data]');
        const model = zone.querySelector('[data-clad-model]');
        const reason = zone.querySelector('[data-clad-reason]');
        const result = zone.querySelector('[data-clad-result]');
        const cases = {
            base: { columns: [true, false, false], model: 'none', reason: 'shared', text: 'X verbindet A, B und C gegenüber O, trennt aber innerhalb A/B/C kein Paar ab. Die unbekannten Spalten sind keine Nullen. Keine eindeutige Wahl bedeutet hier fehlende Information, nicht sicher gleichzeitige Aufspaltung.' },
            bc: { columns: [true, true, false], model: 'bc', reason: 'y', text: 'Y ist bei B und C vorhanden und fehlt bei O und A. Im Modell M1 kann es einmal auf dem gemeinsamen Ast von B/C entstehen. X passt zum gemeinsamen Ast von A/B/C. Die Spalte Z ist nicht untersucht.' },
            ab: { columns: [true, false, true], model: 'ab', reason: 'z', text: 'Z ist bei A und B vorhanden und fehlt bei O und C. Im Modell M2 kann es einmal auf dem gemeinsamen Ast von A/B entstehen. X passt zum gemeinsamen Ast von A/B/C. Die Spalte Y ist nicht untersucht.' },
            conflict: { columns: [true, true, true], model: 'none', reason: 'conflict', text: 'Y stützt B/C, Z stützt A/B. Die beiden Paargruppen überlappen, ohne ineinander enthalten zu sein. Kein vorgeschlagener Baum erklärt beide Muster unter der Regel einmaliger Entstehung ohne Verlust. Prüfe Befunde und Annahmen; zusätzliche Vorgänge oder Daten sind nötig.' }
        };
        const rows = [['O', 0, 0, 0], ['A', 1, 0, 1], ['B', 1, 1, 1], ['C', 1, 1, 0]];
        function clear() {
            result.replaceChildren();
            delete result.dataset.modelCorrect;
            delete result.dataset.reasonCorrect;
            delete result.dataset.invalid;
        }
        function showMatrix() {
            const selected = cases[dataset.value];
            const box = zone.querySelector('[data-clad-matrix]');
            box.replaceChildren();
            if (!selected) return;
            const table = document.createElement('table');
            table.className = 'bio-data-table clad-matrix';
            table.innerHTML = '<caption>Sichtbare Daten: ' + dataset.selectedOptions[0].textContent + '</caption><thead><tr><th scope="col">Gruppe</th><th scope="col">X</th><th scope="col">Y</th><th scope="col">Z</th></tr></thead><tbody>' + rows.map(row => '<tr><th scope="row">' + row[0] + '</th>' + row.slice(1).map((v, i) => '<td data-label="' + ['X', 'Y', 'Z'][i] + '">' + (selected.columns[i] ? v : '?') + '</td>').join('') + '</tr>').join('') + '</tbody>';
            box.append(table);
        }
        dataset.addEventListener('change', () => { clear(); model.value = ''; reason.value = ''; showMatrix(); });
        model.addEventListener('change', clear);
        reason.addEventListener('change', clear);
        zone.querySelector('[data-clad-check]').addEventListener('click', () => {
            clear();
            const selected = cases[dataset.value];
            const invalid = !selected ? [dataset, 'data', 'Wähle einen Datensatz.']
                : !['bc', 'ab', 'ac', 'none'].includes(model.value) ? [model, 'model', 'Wähle ein Modell oder keine eindeutige Wahl.']
                : !['shared', 'y', 'z', 'conflict'].includes(reason.value) ? [reason, 'reason', 'Wähle zusätzlich deine Begründung.'] : null;
            if (invalid) {
                result.dataset.invalid = invalid[1];
                result.textContent = invalid[2];
                invalid[0].focus();
                return;
            }
            result.dataset.modelCorrect = String(model.value === selected.model);
            result.dataset.reasonCorrect = String(reason.value === selected.reason);
            for (const text of [
                (model.value === selected.model ? 'Modellurteil passend. ' : 'Modellurteil noch nicht passend. ') + (reason.value === selected.reason ? 'Begründung passend.' : 'Begründung noch nicht passend.'),
                selected.text,
                'Die Aussage gilt für die verfügbaren Daten und unsere vereinfachte Prüfvorschrift. Wirkliche Evolution kann unabhängige Entstehung und Verluste enthalten. Eine gedrehte Zeichnung desselben Baumes ändert die Verwandtschaft nicht.'
            ]) { const p = document.createElement('p'); p.textContent = text; result.append(p); }
            result.focus();
        });
        zone.querySelector('[data-clad-reset]').addEventListener('click', () => {
            dataset.value = 'base'; model.value = ''; reason.value = ''; clear(); showMatrix(); dataset.focus();
        });
        showMatrix();
    });
}
window.topicInit = topicInit;
