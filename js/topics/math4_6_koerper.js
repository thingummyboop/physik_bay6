function ensureKoerperFeedback(host) {
    if (!host) return null;
    let feedback = document.getElementById('koerper_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'koerper_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        host.appendChild(feedback);
    }
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    return feedback;
}

function bindKoerperHintExercise() {
    const input = document.getElementById('cyl_v');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    if (!button) return;

    const feedback = ensureKoerperFeedback(zone);
    input.setAttribute('aria-describedby', 'koerper_feedback');
    input.setAttribute('aria-label', 'Volumen in Kubikzentimetern bei Grundfläche 20 Quadratzentimeter und Höhe 10 Zentimeter');
    let check = zone.querySelector('[data-check-cylinder]');
    if (!check) {
        check = document.createElement('button');
        check.type = 'button';
        check.dataset.checkCylinder = 'true';
        check.textContent = 'Ergebnis prüfen';
        check.style.minHeight = '44px';
        button.after(check);
    }
    const checkAnswer = () => {
        if (!input.value.trim() || !Number.isFinite(Number(input.value))) {
            feedback.textContent = 'Trage zuerst ein Volumen ein. Für diese Aufgabe gelten G = 20 cm² und h = 10 cm.';
        } else {
            feedback.textContent = Number(input.value) === 200
                ? 'Richtig: V = 20 cm² · 10 cm = 200 cm³.'
                : 'Noch nicht: Multipliziere die Grundfläche 20 cm² mit der Höhe 10 cm. Prüfe auch die Einheit cm³.';
        }
    };
    check.onclick = checkAnswer;

    button.onclick = (event) => {
        event.preventDefault();
        if (feedback) feedback.innerText = 'Tipp: Für den Zylinder gilt V = G × h. Die Grundfläche G ist die Kreisfläche π·r².';
    };

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkAnswer();
            }
        });
    }
}

function topicInit() {
    if (document.getElementById('ggb-koerper')) {
        if (typeof GGBApplet !== 'undefined') {
            var params = {
                appName: '3d',
                width: document.getElementById('ggb-koerper').offsetWidth,
                height: 500,
                showToolBar: true,
                showAlgebraInput: false,
                showMenuBar: false,
            };
            var applet = new GGBApplet(params, true);
            applet.inject('ggb-koerper');
        } else {
            document.getElementById('ggb-koerper').innerHTML = '<p style="padding: 20px; color: red;">GeoGebra konnte nicht geladen werden. Bitte lade die Seite neu.</p>';
        }
    }

    bindKoerperHintExercise();
}
