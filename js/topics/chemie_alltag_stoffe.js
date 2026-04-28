function topicInit() {
    const secondCard = document.querySelectorAll('#sections-container .card')[1];
    if (!secondCard || secondCard.dataset.chemSeparationLabReady === 'true') return;
    secondCard.dataset.chemSeparationLabReady = 'true';

    const lang = localStorage.getItem('physik_lang') || 'de';
    const text = lang === 'en' ? {
        title: 'Separation check',
        intro: 'Set how much salt is dissolved. Then choose a method.',
        sliderLabel: 'Dissolved salt',
        help: 'A filter catches solid grains, but dissolved salt passes through.',
        filter: 'Use filter',
        evaporate: 'Evaporate water',
        initial: 'Salt amount: 50 percent dissolved.',
        filterLow: 'Filtering helps with sand or crumbs, but dissolved salt stays in the water.',
        filterHigh: 'Filtering is not enough here. Dissolved salt passes through the filter.',
        evaporateLow: 'Evaporation can show the salt again, but it takes time and heat.',
        evaporateHigh: 'Good choice: evaporation can leave dissolved salt behind.'
    } : {
        title: 'Trenn-Check',
        intro: 'Stelle ein, wie viel Salz gelöst ist. Wähle dann eine Methode.',
        sliderLabel: 'Gelöstes Salz',
        help: 'Ein Filter hält feste Körner zurück. Gelöstes Salz läuft aber mit dem Wasser durch.',
        filter: 'Filtern',
        evaporate: 'Verdampfen',
        initial: 'Salzmenge: 50 Prozent gelöst.',
        filterLow: 'Filtern hilft bei Sand oder Krümeln. Gelöstes Salz bleibt aber im Wasser.',
        filterHigh: 'Filtern reicht hier nicht. Gelöstes Salz läuft durch den Filter.',
        evaporateLow: 'Verdampfen kann Salz wieder sichtbar machen. Es braucht aber Zeit und Wärme.',
        evaporateHigh: 'Gute Wahl: Beim Verdampfen kann gelöstes Salz zurückbleiben.'
    };

    const lab = document.createElement('div');
    lab.className = 'interactive-zone';
    lab.innerHTML = `
        <h3>${text.title}</h3>
        <p>${text.intro}</p>
        <label for="chemSaltRange"><strong>${text.sliderLabel}</strong></label>
        <input id="chemSaltRange" type="range" min="0" max="100" value="50" step="10" aria-describedby="chemSaltHelp">
        <p id="chemSaltHelp" style="font-size:0.9em; margin:4px 0;">${text.help}</p>
        <button type="button" data-chem-method="filter">${text.filter}</button>
        <button type="button" data-chem-method="evaporate">${text.evaporate}</button>
        <p id="chemSeparationStatus" role="status" aria-live="polite" aria-atomic="true">${text.initial}</p>
    `;

    const firstQuiz = secondCard.querySelector('.quiz-box');
    secondCard.insertBefore(lab, firstQuiz || null);

    const range = lab.querySelector('#chemSaltRange');
    const status = lab.querySelector('#chemSeparationStatus');

    function updateRangeText() {
        const value = Number(range.value);
        const valueText = `${value} ${lang === 'en' ? 'percent dissolved' : 'Prozent gelöst'}`;
        range.setAttribute('aria-valuetext', valueText);
        status.textContent = `${text.sliderLabel}: ${valueText}.`;
    }

    range.addEventListener('input', updateRangeText);
    updateRangeText();

    lab.querySelectorAll('[data-chem-method]').forEach((button) => {
        button.addEventListener('click', () => {
            const highSalt = Number(range.value) >= 50;
            const method = button.dataset.chemMethod;
            if (method === 'filter') {
                status.textContent = highSalt ? text.filterHigh : text.filterLow;
            } else {
                status.textContent = highSalt ? text.evaporateHigh : text.evaporateLow;
            }
        });
    });
}
