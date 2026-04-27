function parseDecimalInput(raw) {
    if (typeof raw !== 'string') return NaN;
    const normalized = raw.trim().replace(',', '.');
    if (!normalized) return NaN;
    return Number(normalized);
}

function setDecimalFeedback(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function checkKomma() {
    const input = document.getElementById('komma_input_1');
    if (!input) return;
    const val = parseDecimalInput(input.value);
    if (Number.isFinite(val) && Math.abs(val - 2.5) < 1e-9) {
        setDecimalFeedback('komma_feedback', 'Richtig! 🎮');
    } else {
        setDecimalFeedback('komma_feedback', 'Nicht ganz. Tipp: 2 Euro und 50 Cent = 2,50.');
    }
}

function checkPlus() {
    const input = document.getElementById('komma_input_2');
    if (!input) return;
    const val = parseDecimalInput(input.value);
    if (Number.isFinite(val) && Math.abs(val - 2.7) < 1e-9) {
        setDecimalFeedback('komma_feedback_2', 'Mega! 🍕');
    } else {
        setDecimalFeedback('komma_feedback_2', 'Noch nicht. Rechne 1,50 + 1,20 Schritt für Schritt.');
    }
}

function bindDecimalCheck(inputId, handler, feedbackId) {
    const input = document.getElementById(inputId);
    if (!input || input.dataset.enterBound === 'true') return;
    input.dataset.enterBound = 'true';
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handler();
        }
    });

    const feedback = document.getElementById(feedbackId);
    if (feedback) {
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        feedback.setAttribute('aria-atomic', 'true');
        input.setAttribute('aria-describedby', feedbackId);
    }
}

function topicInit() {
    bindDecimalCheck('komma_input_1', checkKomma, 'komma_feedback');
    bindDecimalCheck('komma_input_2', checkPlus, 'komma_feedback_2');
}
