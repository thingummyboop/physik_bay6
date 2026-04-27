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

function topicInit() {
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
