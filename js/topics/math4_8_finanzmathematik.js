function ensureFinanzFeedback(host) {
    if (!host) return null;
    let feedback = document.getElementById('finanz_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'finanz_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        host.appendChild(feedback);
    }
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    return feedback;
}

function topicInit() {
    const input = document.getElementById('fin_z');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    if (!button) return;

    const feedback = ensureFinanzFeedback(zone);
    input.setAttribute('aria-describedby', 'finanz_feedback');

    const evaluate = () => {
        const amount = Number(String(input.value).trim().replace(',', '.'));
        if (!Number.isFinite(amount) || amount <= 0) {
            if (feedback) feedback.innerText = 'Gib zuerst ein positives Startguthaben ein, z. B. 1000.';
            return;
        }
        if (feedback) feedback.innerText = `Merke: Beim Zinseszins werden Zinsen jedes Jahr mitverzinst. Aus ${amount.toFixed(2)} werden bei 5% nach 1 Jahr ${(
            amount * 1.05
        ).toFixed(2)}.`;
    };

    button.onclick = (event) => {
        event.preventDefault();
        evaluate();
    };

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
