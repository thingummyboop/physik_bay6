function ensureFractionExerciseFeedback(input, feedbackId) {
    if (!input) return null;

    let feedback = document.getElementById(feedbackId);
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = feedbackId;
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        input.closest('.interactive-zone')?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', feedbackId);

    return feedback;
}

function parseFractionInput(id) {
    return Number(String(document.getElementById(id)?.value || '').trim().replace(',', '.'));
}

function bindFractionExercise({ inputIds, feedbackId, check, successText, hintText }) {
    const firstInput = document.getElementById(inputIds[0]);
    if (!firstInput) return;

    const zone = firstInput.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    const feedback = ensureFractionExerciseFeedback(firstInput, feedbackId);
    inputIds.forEach((id) => document.getElementById(id)?.setAttribute('aria-describedby', feedbackId));

    const evaluate = () => {
        if (check()) {
            if (feedback) feedback.innerText = successText;
        } else if (feedback) {
            feedback.innerText = hintText;
        }
    };

    if (button) {
        button.onclick = (event) => {
            event.preventDefault();
            evaluate();
        };
    }

    inputIds.forEach((id) => {
        const input = document.getElementById(id);
        if (!input || input.dataset.enterBound === 'true') return;
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    });
}

function topicInit() {
    bindFractionExercise({
        inputIds: ['bruch_z'],
        feedbackId: 'bruch_z_feedback',
        check: () => parseFractionInput('bruch_z') === 3,
        successText: 'Super! 3/4 ist richtig. Der Nenner bleibt 4, weil die Stücke gleich groß sind.',
        hintText: 'Noch nicht: Bei gleichem Nenner rechnest du oben 1 + 2.'
    });

    bindFractionExercise({
        inputIds: ['bruch_m1', 'bruch_m2'],
        feedbackId: 'bruch_m_feedback',
        check: () => parseFractionInput('bruch_m1') === 3 && parseFractionInput('bruch_m2') === 8,
        successText: 'Richtig! Oben rechnest du 1 mal 3, unten 2 mal 4. Das ergibt 3/8.',
        hintText: 'Tipp: Beim Multiplizieren gilt oben mal oben und unten mal unten.'
    });

    bindFractionExercise({
        inputIds: ['bruch_d1', 'bruch_d2'],
        feedbackId: 'bruch_d_feedback',
        check: () => parseFractionInput('bruch_d1') === 4 && parseFractionInput('bruch_d2') === 3,
        successText: 'Richtig! Aus geteilt durch 1/2 wird mal 2/1. Das Ergebnis ist 4/3.',
        hintText: 'Noch nicht: Drehe den zweiten Bruch um. Dann rechnest du 2 mal 2 oben und 3 mal 1 unten.'
    });
}
