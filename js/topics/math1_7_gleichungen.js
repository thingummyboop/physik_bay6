function checkWaage() {
    const input = document.getElementById('waage-input');
    const res = document.getElementById('waage-result');
    if (!input || !res) return;

    const raw = String(input.value || '').trim();
    const val = Number(raw);
    if (!raw || !Number.isFinite(val)) {
        res.textContent = 'Gib zuerst eine Zahl für x ein.';
        return;
    }
    if (val === 5) {
        res.textContent = 'Richtig: 5 + 3 = 8. Beide Seiten haben denselben Wert.';
    } else {
        const shown = new Intl.NumberFormat('de-AT', {maximumSignificantDigits: 17});
        res.textContent = `Noch nicht: Für x = ${shown.format(val)} ergibt die linke Seite ${shown.format(val + 3)} und ist damit ${val < 5 ? 'kleiner' : 'größer'} als 8. Überlege, welche Zahl zusammen mit 3 genau 8 ergibt.`;
    }
}

function checkUmkehr() {
    const input = document.getElementById('umkehr-input');
    const res = document.getElementById('umkehr-res');
    if (!input || !res) return;

    const val = String(input.value || '').replace(/\s+/g, '').replace(/−/g, '-');
    if (!val) {
        res.textContent = 'Gib zuerst die Umkehroperation zu + 7 ein.';
        return;
    }
    if (val === '-7') {
        res.textContent = 'Richtig: − 7 hebt + 7 auf. Zum Beispiel: 4 + 7 − 7 = 4.';
    } else {
        res.textContent = 'Noch nicht: Gesucht ist eine Rechenoperation, die das Addieren von 7 rückgängig macht. Prüfe deinen Vorschlag ausgehend von 4 + 7.';
    }
}

function topicInit() {
    const lab = document.querySelector('[data-inequality-lab]');
    if (lab && !lab.dataset.bound) {
        const relation = lab.querySelector('#inequality-relation');
        const value = lab.querySelector('#inequality-value');
        const choices = {
            lt: ['<', (a, b) => a < b], le: ['≤', (a, b) => a <= b],
            eq: ['=', (a, b) => a === b], gt: ['>', (a, b) => a > b],
            ge: ['≥', (a, b) => a >= b]
        };
        function updateComparison() {
            const [symbol, compare] = choices[relation.value];
            const x = Number(value.value);
            lab.querySelector('[data-inequality-status]').textContent =
                `${x} + 3 = ${x + 3}. Die Aussage ${x + 3} ${symbol} 8 ist ${compare(x + 3, 8) ? 'wahr: Diese Zahl ist eine Lösung.' : 'falsch: Diese Zahl ist keine Lösung.'}`;
            const solutions = Array.from({length: 11}, (_, i) => i).filter(i => compare(i + 3, 8));
            lab.querySelector('[data-inequality-solutions]').textContent =
                `Alle Lösungen von x + 3 ${symbol} 8 für ganze Zahlen von 0 bis 10: ${solutions.join(', ')}.`;
        }
        relation.addEventListener('change', updateComparison);
        value.addEventListener('change', updateComparison);
        lab.dataset.bound = '1';
        updateComparison();
    }
    const statusIds = ['waage-result', 'umkehr-res'];
    statusIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const waageInput = document.getElementById('waage-input');
    const umkehrInput = document.getElementById('umkehr-input');

    if (waageInput) {
        waageInput.setAttribute('aria-label', 'Zahl für x in x + 3 = 8');
        waageInput.setAttribute('aria-describedby', 'waage-result');
        if (!waageInput.dataset.enterBound) {
            waageInput.addEventListener('input', () => { document.getElementById('waage-result').textContent = ''; });
            waageInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    checkWaage();
                }
            });
            waageInput.dataset.enterBound = '1';
        }
    }

    if (umkehrInput) {
        umkehrInput.setAttribute('aria-label', 'Umkehroperation zu plus 7');
        umkehrInput.setAttribute('aria-describedby', 'umkehr-res');
        if (!umkehrInput.dataset.enterBound) {
            umkehrInput.addEventListener('input', () => { document.getElementById('umkehr-res').textContent = ''; });
            umkehrInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    checkUmkehr();
                }
            });
            umkehrInput.dataset.enterBound = '1';
        }
    }
}
