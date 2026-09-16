'use strict';

// Keep the former exercise callable in language versions not yet revised.
window.checkGl = function checkGl() {
    const input = document.getElementById('gl1'), output = document.getElementById('glFb');
    if (!input || !output) return;
    const raw = input.value.trim(), value = Number(raw);
    output.setAttribute('role', 'status');
    output.textContent = !raw || !Number.isFinite(value) ? 'Gib zuerst eine Zahl für x ein.'
        : value === 5 ? 'Richtig: 5 + 5 = 10.' : 'Noch nicht: Gesucht ist die Zahl, die zusammen mit 5 den Wert 10 ergibt.';
};

window.topicInit = function topicInit() {
    const lab = document.querySelector('[data-equation3-lab]');
    if (!lab || lab.dataset.bound) return;
    lab.dataset.bound = 'true';
    const abs = n => n < 0n ? -n : n;
    function rational(n, d = 1n) {
        if (d === 0n) throw Error('Zero denominator');
        if (d < 0n) { n = -n; d = -d; }
        let a = abs(n), b = d;
        while (b) [a, b] = [b, a % b];
        return { n: n / (a || 1n), d: d / (a || 1n) };
    }
    const add = (a, b) => rational(a.n * b.d + b.n * a.d, a.d * b.d);
    const negative = a => rational(-a.n, a.d);
    const multiply = (a, b) => rational(a.n * b.n, a.d * b.d);
    const divide = (a, b) => rational(a.n * b.d, a.d * b.n);
    const equal = (a, b) => a.n === b.n && a.d === b.d;
    const show = a => (a.d === 1n ? String(a.n) : `${a.n}/${a.d}`).replace('-', '−');
    function parse(text) {
        const raw = text.trim().replace(/−/g, '-');
        const fraction = raw.match(/^([+-]?\d{1,6})\s*\/\s*([+-]?\d{1,6})$/);
        if (fraction) return BigInt(fraction[2]) === 0n ? null : rational(BigInt(fraction[1]), BigInt(fraction[2]));
        const decimal = raw.match(/^([+-]?)(\d{1,6})(?:[.,](\d{1,3}))?$/);
        if (!decimal) return null;
        const d = 10n ** BigInt(decimal[3]?.length || 0);
        return rational((decimal[1] === '-' ? -1n : 1n) * (BigInt(decimal[2]) * d + BigInt(decimal[3] || 0)), d);
    }
    function term(a, b) {
        if (a.n === 0n) return show(b);
        const x = a.d !== 1n ? `(${show(a)})x` : a.n === 1n ? 'x' : a.n === -1n ? '−x' : show(a) + 'x';
        return x + (b.n === 0n ? '' : b.n > 0n ? ' + ' + show(b) : ' − ' + show(negative(b)));
    }
    const equation = s => term(s[0], s[1]) + ' = ' + term(s[2], s[3]);
    const integer = n => rational(BigInt(n));
    const zero = integer(0), one = integer(1);
    const tasks = [
        { original: '3x + 4 = 2x + 9', preparation: 'Die Terme sind bereits zusammengefasst.', values: [3, 4, 2, 9].map(integer) },
        { original: '2(x − 3) = x + 4', preparation: 'Vorbereitet durch Ausmultiplizieren: 2x − 6 = x + 4. Beide Summanden in der Klammer wurden mit 2 multipliziert.', values: [2, -6, 1, 4].map(integer) },
        { original: '−2x + 5 = 11', preparation: 'Die Terme sind bereits zusammengefasst. Auch negative Lösungen sind erlaubt.', values: [-2, 5, 0, 11].map(integer) },
        { original: '(x + 2)/3 = 4', preparation: 'Zum Zusammenfassen gleichwertig geschrieben: (1/3)x + 2/3 = 4. Der feste Nenner 3 teilt beide Summanden im Zähler.', values: [rational(1n, 3n), rational(2n, 3n), zero, integer(4)] },
        { original: '2(x + 1) = 2x + 2', preparation: 'Vorbereitet durch Ausmultiplizieren: 2x + 2 = 2x + 2.', values: [2, 2, 2, 2].map(integer) },
        { original: '2x + 1 = 2x + 4', preparation: 'Die Terme sind bereits zusammengefasst.', values: [2, 1, 2, 4].map(integer) }
    ];
    const taskSelect = lab.querySelector('[data-equation3-task]');
    const operation = lab.querySelector('[data-equation3-operation]');
    const input = lab.querySelector('[data-equation3-value]');
    const applyButton = lab.querySelector('[data-equation3-apply]');
    const undoButton = lab.querySelector('[data-equation3-undo]');
    const feedback = lab.querySelector('[role=status]');
    const historyList = lab.querySelector('[data-equation3-history]');
    let state, history = [];
    function result() {
        if (equal(state[0], state[2])) {
            return equal(state[1], state[3])
                ? 'Die x-Terme sind auf beiden Seiten gleich. Nach ihrem Abziehen bleibt eine wahre Aussage: Alle rationalen Zahlen sind Lösungen.'
                : 'Die x-Terme sind auf beiden Seiten gleich, die Zahlenanteile verschieden. Nach Abziehen der x-Terme bleibt eine falsche Aussage: keine Lösung.';
        }
        let x;
        if (equal(state[0], one) && equal(state[1], zero) && equal(state[2], zero)) x = state[3];
        else if (equal(state[2], one) && equal(state[3], zero) && equal(state[0], zero)) x = state[1];
        if (x) {
            const original = tasks[Number(taskSelect.value)].values;
            const left = add(multiply(original[0], x), original[1]);
            const right = add(multiply(original[2], x), original[3]);
            return `x = ${show(x)}. Probe in der ursprünglichen Gleichung: links ${show(left)}, rechts ${show(right)}. Beide Seiten stimmen überein.`;
        }
        return 'Noch steht x nicht allein. Du kannst x-Terme auf einer Seite sammeln und Zahlenanteile auf der anderen.';
    }
    function render() {
        lab.querySelector('[data-equation3-current]').textContent = equation(state);
        // Exact coefficients make the rendered model inspectable without evaluating display text.
        lab.dataset.linearState = JSON.stringify(state.map(v => [String(v.n), String(v.d)]));
        historyList.replaceChildren();
        for (const entry of history) {
            const li = document.createElement('li');
            li.textContent = `${entry.operation} → ${equation(entry.after)}`;
            historyList.append(li);
        }
        undoButton.disabled = history.length === 0;
    }
    function reset(focus) {
        const task = tasks[Number(taskSelect.value)];
        state = task.values.slice(); history = [];
        operation.value = 'add'; input.value = '1'; input.removeAttribute('aria-invalid');
        lab.querySelector('[data-equation3-original]').textContent = 'Ausgangsgleichung: ' + task.original;
        lab.querySelector('[data-equation3-preparation]').textContent = task.preparation;
        render(); feedback.textContent = 'Wähle deinen nächsten Schritt. ' + result();
        if (focus) operation.focus();
    }
    function apply() {
        const value = parse(input.value);
        if (!value) {
            input.setAttribute('aria-invalid', 'true');
            feedback.textContent = 'Gib eine Zahl oder einen Bruch mit Nenner ungleich 0 ein, zum Beispiel −3, 0,5 oder 1/3. Für diese Werkstatt genügen sechs Ziffern vor und drei nach dem Komma; bei Brüchen sechs Ziffern je Zahl.';
            return;
        }
        input.removeAttribute('aria-invalid');
        const op = operation.value;
        if ((op === 'multiply' || op === 'divide') && value.n === 0n) {
            feedback.textContent = op === 'divide'
                ? 'Division durch 0 ist nicht definiert. Die Gleichung bleibt unverändert.'
                : 'Multiplikation mit 0 ist berechenbar, kann aber die ursprüngliche Lösungsmenge verändern. Diese Werkstatt übernimmt nur allgemein rückgängig machbare Schritte; die Gleichung bleibt unverändert.';
            return;
        }
        const next = state.slice();
        if (op === 'add' || op === 'subtract') for (const i of [1, 3]) next[i] = add(state[i], op === 'add' ? value : negative(value));
        if (op === 'addx' || op === 'subtractx') for (const i of [0, 2]) next[i] = add(state[i], op === 'addx' ? value : negative(value));
        if (op === 'multiply' || op === 'divide') for (let i = 0; i < 4; i++) next[i] = op === 'multiply' ? multiply(state[i], value) : divide(state[i], value);
        if (next.some(v => abs(v.n) > 1000000000n || v.d > 1000000000n)) {
            feedback.textContent = 'Die Zahlen werden für die Anzeige dieser Werkstatt zu groß. Die Gleichung bleibt unverändert. Wähle einen einfacheren Schritt oder gehe einen Schritt zurück.';
            return;
        }
        const symbols = { add: '+', subtract: '−', addx: '+', subtractx: '−', multiply: '·', divide: ':' };
        const description = `Auf beiden Seiten ${symbols[op]} (${show(value)})${op.endsWith('x') ? 'x' : ''}`;
        history.push({ before: state, after: next, operation: description }); state = next;
        render(); feedback.textContent = 'Erlaubt: ' + description + '. Gleichartige Terme sind zusammengefasst. ' + result();
    }
    applyButton.addEventListener('click', apply);
    input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); apply(); } });
    for (const el of [operation, input]) el.addEventListener(el === input ? 'input' : 'change', () => {
        input.removeAttribute('aria-invalid'); feedback.textContent = 'Die Eingabe ist geändert. „Schritt ausführen“ übernimmt sie auf beiden Seiten.';
    });
    taskSelect.addEventListener('change', () => reset(false));
    lab.querySelector('[data-equation3-reset]').addEventListener('click', () => reset(true));
    undoButton.addEventListener('click', () => {
        if (!history.length) return;
        state = history.pop().before; render();
        feedback.textContent = 'Der letzte Schritt wurde zurückgenommen. ' + result();
        if (undoButton.disabled) applyButton.focus();
    });
    reset(false);
};
