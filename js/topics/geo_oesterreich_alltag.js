function topicInit() {
    const firstCard = document.querySelector('#sections-container .card');
    if (!firstCard || firstCard.dataset.geoRouteLabReady === 'true') return;
    firstCard.dataset.geoRouteLabReady = 'true';

    const lang = localStorage.getItem('physik_lang') || 'de';
    const text = lang === 'en' ? {
        title: 'Route check',
        intro: 'Choose a line direction and a landmark. Then check if the route is clear.',
        directionLabel: 'Line direction',
        landmarkLabel: 'Landmark',
        landmarkHelp: 'A landmark is a clear place on the way.',
        check: 'Check route',
        rightDirection: 'towards main station',
        wrongDirection: 'towards outer district',
        clearLandmark: 'pharmacy by the stop',
        weakLandmark: 'nice house',
        initial: 'Choose direction and landmark.',
        good: 'Clear route: start, direction and landmark fit together.',
        directionProblem: 'Check the direction. The line number alone is not enough.',
        landmarkProblem: 'Choose a clearer landmark. A “nice house” is hard to find.',
        mixedProblem: 'Both parts need work: use the right direction and a clear landmark.'
    } : {
        title: 'Routen-Check',
        intro: 'Wähle Linienrichtung und Orientierungspunkt. Prüfe dann, ob der Weg klar ist.',
        directionLabel: 'Linienrichtung',
        landmarkLabel: 'Orientierungspunkt',
        landmarkHelp: 'Ein Orientierungspunkt ist ein klarer Ort am Weg.',
        check: 'Route prüfen',
        rightDirection: 'Richtung Hauptbahnhof',
        wrongDirection: 'Richtung Außenbezirk',
        clearLandmark: 'Apotheke bei der Haltestelle',
        weakLandmark: 'schönes Haus',
        initial: 'Wähle Richtung und Orientierungspunkt.',
        good: 'Klare Route: Start, Richtung und Orientierungspunkt passen zusammen.',
        directionProblem: 'Prüfe die Richtung. Die Liniennummer allein reicht nicht.',
        landmarkProblem: 'Wähle einen klareren Orientierungspunkt. Ein „schönes Haus“ findet man schwer.',
        mixedProblem: 'Beides braucht Arbeit: richtige Richtung und klarer Orientierungspunkt.'
    };

    const lab = document.createElement('div');
    lab.className = 'interactive-zone';
    lab.innerHTML = `
        <h3>${text.title}</h3>
        <p>${text.intro}</p>
        <fieldset style="border:0; padding:0; margin:0 0 10px;">
            <legend><strong>${text.directionLabel}</strong></legend>
            <button type="button" data-geo-direction="right" aria-pressed="false">${text.rightDirection}</button>
            <button type="button" data-geo-direction="wrong" aria-pressed="false">${text.wrongDirection}</button>
        </fieldset>
        <fieldset style="border:0; padding:0; margin:0 0 10px;" aria-describedby="geoLandmarkHelp">
            <legend><strong>${text.landmarkLabel}</strong></legend>
            <p id="geoLandmarkHelp" style="font-size:0.9em; margin:4px 0;">${text.landmarkHelp}</p>
            <button type="button" data-geo-landmark="clear" aria-pressed="false">${text.clearLandmark}</button>
            <button type="button" data-geo-landmark="weak" aria-pressed="false">${text.weakLandmark}</button>
        </fieldset>
        <button type="button" id="geoRouteCheck">${text.check}</button>
        <p id="geoRouteStatus" role="status" aria-live="polite" aria-atomic="true">${text.initial}</p>
    `;

    const firstQuiz = firstCard.querySelector('.quiz-box');
    firstCard.insertBefore(lab, firstQuiz || null);

    const state = { direction: null, landmark: null };
    const status = lab.querySelector('#geoRouteStatus');

    function setChoice(kind, value, button) {
        state[kind] = value;
        lab.querySelectorAll(`[data-geo-${kind}]`).forEach((candidate) => {
            candidate.setAttribute('aria-pressed', String(candidate === button));
        });
        status.textContent = text.initial;
    }

    lab.querySelectorAll('[data-geo-direction]').forEach((button) => {
        button.addEventListener('click', () => setChoice('direction', button.dataset.geoDirection, button));
    });

    lab.querySelectorAll('[data-geo-landmark]').forEach((button) => {
        button.addEventListener('click', () => setChoice('landmark', button.dataset.geoLandmark, button));
    });

    lab.querySelector('#geoRouteCheck').addEventListener('click', () => {
        const directionOk = state.direction === 'right';
        const landmarkOk = state.landmark === 'clear';
        if (directionOk && landmarkOk) status.textContent = text.good;
        else if (!directionOk && landmarkOk) status.textContent = text.directionProblem;
        else if (directionOk && !landmarkOk) status.textContent = text.landmarkProblem;
        else status.textContent = text.mixedProblem;
    });
}
