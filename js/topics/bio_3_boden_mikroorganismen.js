'use strict';
(() => {
    const trials = {
        A: { temperature: 20, moisture: 'feucht', masses: [6, 6.5, 5.5] },
        B: { temperature: 20, moisture: 'trocken', masses: [8.5, 9, 8] },
        C: { temperature: 8, moisture: 'feucht', masses: [8, 7.5, 8.5] },
        D: { temperature: 8, moisture: 'trocken', masses: [9, 9.5, 8.5] }
    };
    const number = value => value.toLocaleString('de-AT', { maximumFractionDigits: 1 });
    window.topicInit = () => {
        const zone = document.querySelector('[data-soil-lab]');
        if (!zone || zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        const factor = zone.querySelector('[data-soil-factor]');
        const left = zone.querySelector('[data-soil-left]');
        const right = zone.querySelector('[data-soil-right]');
        const result = zone.querySelector('[data-soil-result]');
        const clear = () => { result.replaceChildren(); delete result.dataset.verdict; };
        const paragraph = text => { const p = document.createElement('p'); p.textContent = text; result.append(p); };
        [factor, left, right].forEach(select => select.addEventListener('change', clear));
        zone.querySelector('[data-soil-check]').addEventListener('click', () => {
            clear();
            const a = trials[left.value], b = trials[right.value];
            if (!a || !b || !['moisture', 'temperature'].includes(factor.value)) {
                result.dataset.verdict = 'invalid';
                paragraph('Wähle einen der beiden Einflüsse und zwei Ansätze aus der Tabelle.');
                (!['moisture', 'temperature'].includes(factor.value) ? factor : !a ? left : right).focus();
                return;
            }
            const tempDiff = a.temperature !== b.temperature;
            const moistDiff = a.moisture !== b.moisture;
            let verdict, message;
            if (left.value === right.value) {
                verdict = 'same'; message = 'Du hast denselben Ansatz zweimal gewählt. Für einen Vergleich der Bedingungen brauchst du zwei verschiedene Ansätze.';
            } else if (tempDiff && moistDiff) {
                verdict = 'confounded'; message = 'Temperatur und Feuchtigkeit ändern sich gleichzeitig. Der Unterschied kann damit nicht eindeutig einem einzelnen Einfluss zugeordnet werden.';
            } else if ((factor.value === 'moisture' && moistDiff) || (factor.value === 'temperature' && tempDiff)) {
                verdict = 'fair';
                message = factor.value === 'moisture'
                    ? `Geeigneter Feuchtevergleich: Die Temperatur bleibt ${a.temperature} °C. Feucht und trocken unterscheiden sich; die übrigen Bedingungen sind laut Aufgabenbeschreibung gleich.`
                    : `Geeigneter Temperaturvergleich: Die Feuchte bleibt ${a.moisture}. 8 und 20 °C unterscheiden sich; die übrigen Bedingungen sind laut Aufgabenbeschreibung gleich.`;
            } else {
                verdict = 'other';
                message = factor.value === 'moisture'
                    ? 'Dieses Paar verändert die Temperatur, nicht die Feuchtigkeit. Es beantwortet eine andere Frage. Wähle für Feuchtigkeit A/B oder C/D.'
                    : 'Dieses Paar verändert die Feuchtigkeit, nicht die Temperatur. Es beantwortet eine andere Frage. Wähle für Temperatur A/C oder B/D.';
            }
            result.dataset.verdict = verdict;
            paragraph(message);
            const means = [a, b].map(t => t.masses.reduce((sum, value) => sum + value, 0) / 3);
            [left.value, right.value].forEach((key, index) => {
                const mean = means[index], loss = 10 - mean;
                paragraph(`${key}: (${trials[key].masses.map(number).join(' + ')}) ÷ 3 = ${number(mean)} g mittlere Restmasse. Verlust: 10 − ${number(mean)} = ${number(loss)} g, also ${number(loss / 10 * 100)} % der Anfangsmasse.`);
            });
            paragraph(`Unterschied der mittleren Restmassen: ${number(Math.abs(means[0] - means[1]))} g. Kleinere Restmasse bedeutet hier größeren Massenverlust.`);
            paragraph('Die Zahlen gehören zu erfundenen Proben. Massenverlust trennt Abbau, Auswaschung und verlorene Bruchstücke nicht. Daraus lässt sich weder die Menge neu entstandenen Humus noch eine allgemeine Regel für jeden Boden ablesen.');
            result.focus();
        });
        zone.querySelector('[data-soil-reset]').addEventListener('click', () => {
            factor.value = 'moisture'; left.value = 'A'; right.value = 'B'; clear(); factor.focus();
        });
    };
})();
