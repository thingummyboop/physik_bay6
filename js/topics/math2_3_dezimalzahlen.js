function ensureDecimalExerciseFeedback(input, button, feedbackId) {
    if (!input) return null;

    let feedback = document.getElementById(feedbackId);
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = feedbackId;
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        const host = button?.parentElement || input.parentElement;
        host?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', feedbackId);

    return feedback;
}

function parseCommaNumber(raw) {
    if (typeof raw !== 'string') return NaN;
    const normalized = raw.trim().replace(',', '.');
    if (!normalized) return NaN;
    return Number(normalized);
}

function bindDecimalExercise({ inputId, feedbackId, expected, successText, hintText }) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const button = input.parentElement?.querySelector('button') || null;
    const feedback = ensureDecimalExerciseFeedback(input, button, feedbackId);

    const evaluate = () => {
        const value = parseCommaNumber(input.value);
        if (Number.isFinite(value) && Math.abs(value - expected) < 1e-9) {
            if (feedback) feedback.innerText = successText;
        } else {
            if (feedback) feedback.innerText = hintText;
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
    bindDecimalExercise({
        inputId: 'geld_input',
        feedbackId: 'geld_feedback',
        expected: 2.5,
        successText: 'Genau! 2,50 Euro bleiben übrig.',
        hintText: 'Noch nicht ganz: rechne 5,00 minus 2,50.'
    });

    bindDecimalExercise({
        inputId: 'rund_input',
        feedbackId: 'rund_feedback',
        expected: 12,
        successText: 'Richtig! 12,3 wird auf 12 abgerundet.',
        hintText: 'Tipp: Schau auf die erste Zahl nach dem Komma. Bei 3 wird abgerundet.'
    });

    bindDecimalExercise({
        inputId: 'komma_input',
        feedbackId: 'komma_feedback',
        expected: 520,
        successText: 'Super! 5,2 mal 100 ergibt 520.',
        hintText: 'Noch nicht: Bei mal 100 wandert das Komma zwei Stellen nach rechts.'
    });
}
