function ensureTeilbarkeitFeedback(host, id) {
    if (!host) return null;
    let feedback = document.getElementById(id);
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = id;
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        host.appendChild(feedback);
    }
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    return feedback;
}

function bindButtonOnlyExercise() {
    const zones = Array.from(document.querySelectorAll('.interactive-zone'));
    const candidate = zones
        .map((zone) => zone.querySelector('button'))
        .find((button) => button && !button.closest('.interactive-zone')?.querySelector('#ggt_input') && !button.closest('.interactive-zone')?.querySelector('#kgv_input'));
    if (!candidate) return;

    const zone = candidate.closest('.interactive-zone');
    const feedback = ensureTeilbarkeitFeedback(zone, 'teilbar_feedback');
    candidate.onclick = (event) => {
        event.preventDefault();
        if (feedback) feedback.innerText = 'Ja, 345 ist durch 5 teilbar, weil die Zahl auf 5 endet.';
    };
}

function bindNumericExercise(inputId, feedbackId, expected, success, hint) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    const feedback = ensureTeilbarkeitFeedback(zone, feedbackId);
    input.setAttribute('aria-describedby', feedbackId);

    const evaluate = () => {
        const value = Number(String(input.value).trim().replace(',', '.'));
        if (Number.isFinite(value) && value === expected) {
            if (feedback) feedback.innerText = success;
        } else {
            if (feedback) feedback.innerText = hint;
        }
    };

    if (button) {
        button.onclick = (event) => {
            event.preventDefault();
            evaluate();
        };
    }

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    }
}

function evaluatePrimeFactors(raw) {
    const tokens = raw.trim().split(/\s+/);
    if (!raw.trim() || tokens.length > 12 || tokens.some(t => !/^\d{1,2}$/.test(t))) return 'Gib die Faktoren einzeln als ganze Zahlen von 2 bis 60 ein, getrennt durch Leerzeichen.';
    const factors = tokens.map(Number);
    for (const n of factors) {
        if (n < 2 || n > 60) return 'Alle Primfaktoren müssen größer als 1 sein und dürfen für diese Aufgabe höchstens 60 sein.';
        for (let divisor = 2; divisor * divisor <= n; divisor++) {
            if (n % divisor === 0) return n + ' ist noch keine Primzahl. Zerlege diesen Faktor weiter.';
        }
    }
    const product = factors.reduce((p, n) => p * BigInt(n), 1n);
    if (product !== 60n) return 'Deine Faktoren sind prim, aber ihr Produkt ist ' + product + '. Gesucht ist 60. Prüfe, ob ein Faktor fehlt oder zu viel vorkommt.';
    return 'Richtig! 60 = 2 · 2 · 3 · 5. Alle Faktoren sind prim; ihre Reihenfolge verändert das Produkt nicht.';
}

function bindPrimeExercise() {
    const input = document.getElementById('prime_factors');
    if (!input) return;
    const zone = input.closest('[data-prime-exercise]');
    const feedback = ensureTeilbarkeitFeedback(zone, 'prime_feedback');
    input.setAttribute('aria-describedby', 'prime_feedback');
    const evaluate = () => { feedback.textContent = evaluatePrimeFactors(input.value); };
    zone.querySelector('button').onclick = evaluate;
    if (input.dataset.primeBound !== 'true') {
        input.dataset.primeBound = 'true';
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') { event.preventDefault(); evaluate(); }
        });
    }
}

function topicInit() {
    bindPrimeExercise();
    bindButtonOnlyExercise();
    bindNumericExercise(
        'ggt_input',
        'ggt_feedback',
        4,
        'Richtig! 4 ist der größte gemeinsame Teiler von 8 und 12.',
        'Noch nicht: Vergleiche die Teiler von 8 (1,2,4,8) und 12 (1,2,3,4,6,12).'
    );
    bindNumericExercise(
        'kgv_input',
        'kgv_feedback',
        10,
        'Super! 10 ist das kleinste gemeinsame Vielfache von 2 und 5.',
        'Tipp: Liste Vielfache auf (2,4,6,8,10 … und 5,10 …).'
    );
}
