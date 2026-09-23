function topicInit() {
    const eva = document.querySelector('[data-eva-lab]');
    if (eva && !eva.dataset.bound) {
        const value = eva.querySelector('#eva-value'), rule = eva.querySelector('#eva-limit');
        const step = eva.querySelector('[data-eva-step]'), reset = eva.querySelector('[data-eva-reset]');
        const status = eva.querySelector('[data-eva-status]');
        const fields = ['input', 'process', 'output'].map(key => eva.querySelector('[data-eva-' + key + ']'));
        let stage = 0;
        const clear = () => {
            stage = 0;
            fields.forEach(field => field.textContent = 'Noch nicht ausgeführt.');
            step.disabled = false;
            step.textContent = '1. Eingabe übernehmen';
            status.textContent = 'Bereit. Sage zuerst voraus, ob die Modellleuchte an oder aus sein wird.';
        };
        step.addEventListener('click', () => {
            if (stage >= 3) return;
            const input = Number(value.value), limit = Number(rule.value);
            if (value.value.trim() === '' || !Number.isInteger(input) || input < 0 || input > 100 || ![30, 50, 70].includes(limit)) {
                value.setAttribute('aria-invalid', 'true');
                status.textContent = 'Gib einen ganzen Helligkeitswert von 0 bis 100 ein und wähle eine vorhandene Regel.';
                value.focus();
                return;
            }
            const on = input < limit;
            if (stage === 0) fields[0].textContent = 'Eingelesener Modellwert: ' + input + '.';
            if (stage === 1) fields[1].textContent = input + ' < ' + limit + ' ist ' + (on ? 'wahr' : 'falsch') + '. Die Regel wählt „' + (on ? 'an' : 'aus') + '“.';
            if (stage === 2) fields[2].textContent = 'Modellleuchte: ' + (on ? 'AN' : 'AUS') + '.';
            stage++;
            status.textContent = ['Eingabe übernommen. Die Verarbeitung steht noch aus.', 'Wert mit der Regel verglichen. Die Ausgabe steht noch aus.', 'Alle drei Schritte ausgeführt. Vergleiche mit deiner Vorhersage.'][stage - 1];
            step.textContent = ['2. Regel verarbeiten', '3. Ergebnis ausgeben', 'Ablauf abgeschlossen'][stage - 1];
            if (stage === 3) { const focused = document.activeElement === step; step.disabled = true; if (focused) reset.focus(); }
        });
        value.addEventListener('input', () => { value.removeAttribute('aria-invalid'); clear(); });
        rule.addEventListener('change', clear);
        reset.addEventListener('click', () => { value.value = '49'; rule.value = '50'; value.removeAttribute('aria-invalid'); clear(); value.focus(); });
        eva.dataset.bound = '1';
        clear();
    }
    const representation = document.querySelector('[data-representation-lab]');
    if (representation && !representation.dataset.bound) {
        const value = representation.querySelector('#representation-value'), precision = representation.querySelector('#representation-step');
        const status = representation.querySelector('[data-representation-status]');
        const update = () => {
            // Integer tenths avoid rounding errors at a half-degree boundary.
            const tenths = Number(value.value), whole = precision.value === '10';
            const shown = whole ? Math.floor((tenths + 5) / 10) : tenths / 10;
            const format = n => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
            representation.querySelector('[data-representation-source]').textContent = format(tenths / 10) + ' °C';
            representation.querySelector('[data-representation-digital]').textContent = (whole ? String(shown) : format(shown)) + ' °C';
            const y = 230 - (tenths - 180) * 3;
            representation.querySelector('[data-representation-column]').setAttribute('y', String(y));
            representation.querySelector('[data-representation-column]').setAttribute('height', String(245 - y));
            representation.querySelector('[data-representation-marker]').setAttribute('y1', String(y));
            representation.querySelector('[data-representation-marker]').setAttribute('y2', String(y));
            value.setAttribute('aria-valuetext', format(tenths / 10) + ' Grad Celsius');
            status.textContent = 'Vorgegebener Modellwert: ' + format(tenths / 10) + ' °C. Zahlenanzeige: ' + (whole ? shown : format(shown)) + ' °C. Gerundet auf ' + (whole ? 'ganze Grad.' : 'Zehntelgrad.');
        };
        value.addEventListener('input', update);
        precision.addEventListener('change', update);
        representation.querySelector('[data-representation-reset]').addEventListener('click', () => { value.value = '214'; precision.value = '10'; update(); value.focus(); });
        representation.dataset.bound = '1';
        update();
    }
}
