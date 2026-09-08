function topicInit() {
    const root = document.querySelector('[data-integer-move]');
    if (!root || root.dataset.bound) return;
    const start = root.querySelector('#integer-start');
    const steps = root.querySelector('#integer-steps');
    const direction = root.querySelector('#integer-direction');
    const status = root.querySelector('[data-integer-status]');
    const path = root.querySelector('[data-integer-path]');
    function calculate() {
        const s = Number(start.value), n = Number(steps.value);
        path.textContent = '';
        if (start.value === '' || steps.value === '' || !Number.isInteger(s) || !Number.isInteger(n) || s < -10 || s > 10 || n < 0 || n > 10) {
            status.textContent = 'Gib eine ganze Startzahl von −10 bis 10 und eine ganze Schrittzahl von 0 bis 10 ein.';
            return;
        }
        const sign = direction.value === 'plus' ? 1 : -1;
        status.textContent = `${s} ${sign === 1 ? '+' : '−'} ${n} = ${s + sign * n}. ${n} Schritte nach ${sign === 1 ? 'rechts' : 'links'}.`;
        path.textContent = 'Besuchte Zahlen in zeitlicher Reihenfolge: ' + Array.from({length:n+1},(_,i)=>s+sign*i).join(' → ');
    }
    root.querySelector('[data-integer-run]').addEventListener('click', calculate);
    for (const input of [start, steps, direction]) {
        input.addEventListener('input', () => { status.textContent = ''; path.textContent = ''; });
        input.addEventListener('keydown', event => { if(event.key === 'Enter') { event.preventDefault(); calculate(); } });
    }
    root.dataset.bound = '1';
}
