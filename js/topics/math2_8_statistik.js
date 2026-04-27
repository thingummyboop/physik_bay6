function topicInit() {
    const input = document.getElementById('pizza_calc');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    let feedback = document.getElementById('pizza_calc_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'pizza_calc_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        zone?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', 'pizza_calc_feedback');

    const evaluate = () => {
        const value = Number(String(input.value).trim().replace(',', '.'));
        if (value === 5) {
            feedback.innerText = 'Korrekt! 20 Euro geteilt durch 4 Personen sind 5 Euro pro Person.';
        } else {
            feedback.innerText = 'Fast: Rechne erst 20 geteilt durch 4. Der Mittelwert ist 5.';
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
