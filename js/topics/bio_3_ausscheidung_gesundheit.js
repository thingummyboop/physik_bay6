'use strict';
window.topicInit = function () {
    const zone = document.querySelector('[data-excretion-lab]');
    if (!zone || zone.dataset.initialized === 'true') return;
    zone.dataset.initialized = 'true';
    const model = zone.querySelector('[data-excretion-model]');
    const process = zone.querySelector('[data-excretion-process]');
    const output = zone.querySelector('[data-excretion-output]');
    const returnedWater = { A: 90, B: 95, C: 98 };
    const changed = () => { output.textContent = 'Auswahl geändert. Sage das Ergebnis voraus und werte dann neu aus.'; };
    model.addEventListener('change', changed);
    process.addEventListener('change', changed);
    zone.querySelector('[data-excretion-calculate]').addEventListener('click', () => {
        if (!Object.hasOwn(returnedWater, model.value) || !['filter', 'return'].includes(process.value)) {
            output.textContent = 'Wähle ein Modell A, B oder C und die zu betrachtenden Vorgänge.';
            return;
        }
        const recovery = process.value === 'return';
        const waterBack = recovery ? returnedWater[model.value] : 0;
        const glucoseBack = recovery ? 10 : 0;
        const rows = [['Wasser', 100, waterBack], ['Glucose', 10, glucoseBack], ['Stoff X', 4, 0]];
        output.replaceChildren();
        const title = document.createElement('p');
        title.textContent = `Modell ${model.value}: ${recovery ? 'mit Rückgewinnung' : 'nur Filtration, noch keine Rückgewinnung'}.`;
        output.append(title);
        const list = document.createElement('ul');
        rows.forEach(([name, start, back], i) => {
            const item = document.createElement('li');
            item.dataset.excretionRemaining = String(i);
            item.dataset.value = String(start - back);
            item.textContent = `${name}: ${start} − ${back} = ${start - back} Einheiten verbleiben im Kanälchen.`;
            list.append(item);
        });
        output.append(list);
        const ratio = 4 / (100 - waterBack) * 10;
        const comparison = document.createElement('p');
        comparison.dataset.excretionRatio = String(ratio);
        comparison.textContent = `Vertiefung: 4 ÷ ${100 - waterBack} × 10 = ${ratio.toLocaleString('de-AT')} Einheiten X je 10 Wassereinheiten. Insgesamt bleiben weiterhin 4 Einheiten X; die Bezugsmenge ist nur ein Vergleichsmaß.`;
        output.append(comparison);
        const limit = document.createElement('p');
        limit.textContent = recovery
            ? 'Das Rechenmodell zeigt Rückgewinnung. Sekretion und weitere Regelungen fehlen weiterhin. Die Zahlen bestimmen weder eine Trinkmenge noch eine Erkrankung.'
            : 'Hier fehlt die Rückgewinnung absichtlich. Die verbliebenen Startmengen sind kein Modell für fertigen Harn einer gesunden Niere.';
        output.append(limit);
    });
    zone.querySelector('[data-excretion-reset]').addEventListener('click', () => {
        model.value = 'A';
        process.value = 'filter';
        output.textContent = '';
        model.focus();
    });
};
