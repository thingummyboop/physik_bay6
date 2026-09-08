function topicInit() {
    const root = document.querySelector('[data-simple-loop]');
    if (!root || root.dataset.bound) return;
    const count = root.querySelector('#loop-count');
    const step = root.querySelector('[data-loop-step]');
    const status = root.querySelector('[data-loop-status]');
    const dots = root.querySelector('[data-loop-dots]');
    let rounds = 0;
    function reset() {
        rounds = 0;
        dots.textContent = '';
        step.disabled = false;
        status.textContent = `Start: 0 Punkte. Geplant sind ${count.value} Schleifendurchläufe und danach eine weitere Anweisung.`;
    }
    step.addEventListener('click', () => {
        if (step.disabled) return;
        if (rounds < Number(count.value)) {
            rounds++;
            dots.textContent = Array(rounds).fill('● ●').join(' | ');
            status.textContent = `Schleifendurchlauf ${rounds} von ${count.value}: ${2 * rounds} Punkte. Die Anweisung nach der Schleife steht noch aus.`;
        } else {
            dots.textContent += (rounds ? ' | ' : '') + '●';
            status.textContent = `Fertig: ${rounds} Schleifendurchläufe ergeben ${2 * rounds} Punkte; danach kommt einmal 1 Punkt dazu. Insgesamt ${2 * rounds + 1} Punkte.`;
            step.disabled = true;
            root.querySelector('[data-loop-reset]').focus();
        }
    });
    root.querySelector('[data-loop-reset]').addEventListener('click', reset);
    count.addEventListener('change', reset);
    root.dataset.bound = '1';
    reset();
}
