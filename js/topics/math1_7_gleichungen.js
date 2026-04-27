function checkWaage() {
    const input = document.getElementById('waage-input');
    const res = document.getElementById('waage-result');
    if (!input || !res) return;

    const val = Number(String(input.value || '').trim());
    if (val === 5) {
        res.innerText = 'Bingo! 5 + 3 = 8. Die Waage ist perfekt ausbalanciert!';
        res.style.color = 'green';
    } else {
        res.innerText = 'Oh nein! Die Waage kippt um. Versuch eine andere Zahl!';
        res.style.color = 'red';
    }
}

function checkUmkehr() {
    const input = document.getElementById('umkehr-input');
    const res = document.getElementById('umkehr-res');
    if (!input || !res) return;

    const val = String(input.value || '').replace(/\s+/g, '');
    if (val === '-7') {
        res.innerText = 'Super! -7 ist richtig!';
        res.style.color = 'green';
    } else {
        res.innerText = 'Nicht ganz. Das Gegenteil von Plus ist Minus...';
        res.style.color = 'red';
    }
}

function topicInit() {
    const statusIds = ['waage-result', 'umkehr-res'];
    statusIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const waageInput = document.getElementById('waage-input');
    const umkehrInput = document.getElementById('umkehr-input');

    if (waageInput) {
        waageInput.setAttribute('aria-describedby', 'waage-result');
        if (!waageInput.dataset.enterBound) {
            waageInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    checkWaage();
                }
            });
            waageInput.dataset.enterBound = '1';
        }
    }

    if (umkehrInput) {
        umkehrInput.setAttribute('aria-describedby', 'umkehr-res');
        if (!umkehrInput.dataset.enterBound) {
            umkehrInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    checkUmkehr();
                }
            });
            umkehrInput.dataset.enterBound = '1';
        }
    }
}
