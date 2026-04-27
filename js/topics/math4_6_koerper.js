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

    button.onclick = (event) => {
        event.preventDefault();
        if (feedback) feedback.innerText = 'Tipp: Für den Zylinder gilt V = G × h. Die Grundfläche G ist die Kreisfläche π·r².';
    };

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (feedback) feedback.innerText = 'Starte mit der Kreisfläche G = π·r² und multipliziere dann mit der Höhe h.';
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
