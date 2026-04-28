function topicInit() {
    const secondCard = document.querySelectorAll('#sections-container .card')[1];
    if (!secondCard || secondCard.dataset.bioPulseLabReady === 'true') return;
    secondCard.dataset.bioPulseLabReady = 'true';

    const lang = localStorage.getItem('physik_lang') || 'de';
    const text = lang === 'en' ? {
        title: 'Pulse check',
        intro: 'Move the activity slider and predict what happens to breathing and pulse.',
        sliderLabel: 'Activity',
        help: 'The value is a simple model, not a medical measurement.',
        check: 'Check prediction',
        initial: 'Activity: calm sitting. Pulse about 72 beats per minute.',
        calm: 'calm sitting',
        walking: 'climbing stairs',
        running: 'running',
        calmResult: 'At rest, pulse and breathing are usually slower.',
        walkingResult: 'With moderate movement, muscles need more oxygen. Pulse rises.',
        runningResult: 'With strong movement, muscles need much more oxygen. Breathing and pulse rise clearly.'
    } : {
        title: 'Puls-Check',
        intro: 'Bewege den Aktivitäts-Regler und sage voraus, was mit Atmung und Puls passiert.',
        sliderLabel: 'Aktivität',
        help: 'Der Wert ist ein einfaches Modell, keine medizinische Messung.',
        check: 'Vorhersage prüfen',
        initial: 'Aktivität: ruhiges Sitzen. Puls ungefähr 72 Schläge pro Minute.',
        calm: 'ruhiges Sitzen',
        walking: 'Stiegen gehen',
        running: 'Laufen',
        calmResult: 'In Ruhe sind Puls und Atmung meist langsamer.',
        walkingResult: 'Bei mittlerer Bewegung brauchen Muskeln mehr Sauerstoff. Der Puls steigt.',
        runningResult: 'Bei starker Bewegung brauchen Muskeln viel mehr Sauerstoff. Atmung und Puls steigen deutlich.'
    };

    const lab = document.createElement('div');
    lab.className = 'interactive-zone';
    lab.innerHTML = `
        <h3>${text.title}</h3>
        <p>${text.intro}</p>
        <label for="bioActivityRange"><strong>${text.sliderLabel}</strong></label>
        <input id="bioActivityRange" type="range" min="0" max="2" value="0" step="1" aria-describedby="bioPulseHelp">
        <p id="bioPulseHelp" style="font-size:0.9em; margin:4px 0;">${text.help}</p>
        <button type="button" id="bioPulseCheck">${text.check}</button>
        <p id="bioPulseStatus" role="status" aria-live="polite" aria-atomic="true">${text.initial}</p>
    `;

    const firstQuiz = secondCard.querySelector('.quiz-box');
    secondCard.insertBefore(lab, firstQuiz || null);

    const range = lab.querySelector('#bioActivityRange');
    const status = lab.querySelector('#bioPulseStatus');
    const states = [
        { label: text.calm, pulse: 72, result: text.calmResult },
        { label: text.walking, pulse: 96, result: text.walkingResult },
        { label: text.running, pulse: 130, result: text.runningResult }
    ];

    function updateRangeText() {
        const current = states[Number(range.value)];
        const valueText = `${current.label}, ${current.pulse} ${lang === 'en' ? 'beats per minute' : 'Schläge pro Minute'}`;
        range.setAttribute('aria-valuetext', valueText);
        status.textContent = `${text.sliderLabel}: ${valueText}.`;
    }

    range.addEventListener('input', updateRangeText);
    updateRangeText();

    lab.querySelector('#bioPulseCheck').addEventListener('click', () => {
        status.textContent = states[Number(range.value)].result;
    });
}
