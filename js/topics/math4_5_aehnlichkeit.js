function topicInit() {
    const input = document.getElementById('aehn_q1');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    let feedback = document.getElementById('aehn_q1_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'aehn_q1_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        zone?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', 'aehn_q1_feedback');

    const evaluate = () => {
        const value = Number(String(input.value).trim().replace(',', '.'));
        if (value === 2) {
            feedback.innerText = 'Richtig! Breite und Höhe wurden jeweils mit dem Faktor 2 vergrößert.';
        } else {
            feedback.innerText = 'Noch nicht: Vergleiche 50 mit 100 und 30 mit 60. Beide Seiten wurden verdoppelt.';
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
