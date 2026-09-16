'use strict';

window.topicInit = function topicInit() {
    // Keep all arithmetic exact for the bounded decimal/fraction inputs in this exercise.
    function parseValue(raw) {
        const text = raw.trim().replace(/−/g, '-').replace(/,/g, '.');
        const fraction = text.match(/^(-?\d{1,6})\s*\/\s*(\d{1,6})$/);
        if (fraction) return Number(fraction[2]) === 0 ? null : { n: Number(fraction[1]), d: Number(fraction[2]) };
        const decimal = text.match(/^(-?)(\d{1,6})(?:\.(\d{1,3}))?$/);
        if (!decimal) return null;
        const d = 10 ** (decimal[3]?.length || 0);
        return { n: (decimal[1] ? -1 : 1) * (Number(decimal[2]) * d + Number(decimal[3] || 0)), d };
    }
    function show(n, d = 1) {
        let a = Math.abs(n), b = d;
        while (b) [a, b] = [b, a % b];
        const divisor = a || 1;
        return d / divisor === 1 ? String(n / divisor).replace('-', '−') : `${n / divisor}/${d / divisor}`.replace('-', '−');
    }

    const probe = document.querySelector('[data-equation2-probe]');
    if (probe && !probe.dataset.bound) {
        probe.dataset.bound = 'true';
        const select = probe.querySelector('select');
        const input = probe.querySelector('input');
        const feedback = probe.querySelector('[role=status]');
        function clear() {
            feedback.textContent = '';
            input.removeAttribute('aria-invalid');
        }
        function check() {
            const value = parseValue(input.value);
            if (!value) {
                input.setAttribute('aria-invalid', 'true');
                feedback.textContent = 'Gib eine Zahl oder einen Bruch ein, zum Beispiel 4, 2,5 oder 5/2. Der Nenner darf nicht 0 sein. Für diese Übung genügen bis zu sechs Ziffern vor und drei nach dem Komma; bei Brüchen bis zu sechs Ziffern je Zahl.';
                return;
            }
            input.removeAttribute('aria-invalid');
            const { n, d } = value;
            const task = [
                { left: [2 * n + 3 * d, d], right: [11, 1], substitution: `2 · (${show(n, d)}) + 3` },
                { left: [n + 6 * d, 3 * d], right: [7, 1], substitution: `(${show(n, d)}) : 3 + 2` },
                { left: [3 * n, d], right: [15, 2], substitution: `3 · (${show(n, d)})` }
            ][Number(select.value)];
            const difference = task.left[0] * task.right[1] - task.right[0] * task.left[1];
            const left = show(...task.left), right = show(...task.right);
            const comparison = difference === 0 ? 'gleich groß' : difference < 0 ? 'links kleiner als rechts' : 'links größer als rechts';
            feedback.textContent = `${difference === 0 ? 'Richtig' : 'Noch nicht'}: Für x = ${show(n, d)} ergibt ${task.substitution} links ${left}; rechts steht ${right}. Die Werte sind ${comparison}. ` +
                (difference === 0 ? 'Dein Wert erfüllt die ursprüngliche Gleichung.' : 'Gehe die Rechenkette rückwärts oder probiere einen anderen Wert und prüfe erneut.');
        }
        input.addEventListener('input', clear);
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') { event.preventDefault(); check(); }
        });
        select.addEventListener('change', () => { input.value = ''; clear(); });
        probe.querySelector('[data-equation2-check]').addEventListener('click', check);
        probe.querySelector('[data-equation2-reset]').addEventListener('click', () => {
            select.value = '0'; input.value = ''; clear(); select.focus();
        });
    }

    const lab = document.querySelector('[data-equation2-step]');
    if (lab && !lab.dataset.bound) {
        lab.dataset.bound = 'true';
        const select = lab.querySelector('select');
        const result = lab.querySelector('[data-equation2-case-result]');
        const feedback = lab.querySelector('[role=status]');
        const cases = [
            ['x = 8', 'same', '−4 auf beiden Seiten erhält genau die Lösung x = 8 und führt direkt zum Ziel.'],
            ['x + 8 = 16', 'same', '+4 auf beiden Seiten ist erlaubt. Aus x + 8 = 16 folgt weiterhin x = 8. Ein Umweg ist kein Rechenfehler.'],
            ['x = 12', 'changed', 'Nur links −4 verändert die Lösung von x = 8 zu x = 12. Die ursprüngliche Lösung 8 erfüllt 8 = 12 nicht.'],
            ['0 = 0', 'changed', 'Mal 0 ist berechenbar, verliert aber die Einschränkung für x. Nun gilt die Aussage etwa auch für x = 0; ursprünglich war nur x = 8 eine Lösung.'],
            ['(x + 4) : 0 = 12 : 0', 'undefined', 'Division durch 0 ist nicht definiert. Dieser Rechenschritt ist nicht erlaubt.'],
            ['x/2 + 2 = 6', 'same', 'Beide Seiten wurden vollständig durch 2 geteilt: auch die 4 wird halbiert. x = 8 bleibt die Lösung, denn 8/2 + 2 = 6.']
        ];
        function render() {
            result.textContent = 'Vorgeschlagenes Ergebnis: ' + cases[Number(select.value)][0];
            feedback.textContent = '';
        }
        select.addEventListener('change', render);
        for (const button of lab.querySelectorAll('[data-equation2-verdict]')) {
            button.addEventListener('click', () => {
                const [, correct, explanation] = cases[Number(select.value)];
                feedback.textContent = (button.dataset.equation2Verdict === correct ? 'Richtig: ' : 'Noch nicht: ') + explanation;
            });
        }
        lab.querySelector('[data-equation2-step-reset]').addEventListener('click', () => {
            select.value = '0'; render(); select.focus();
        });
        render();
    }
};
