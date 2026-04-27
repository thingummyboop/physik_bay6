// Logic for rechenbeispiele topic
function topicInit() {
    enhanceCalculationAccessibility();
}

function enhanceCalculationAccessibility() {
    const exerciseIds = ['inputSec', 'inputKg', 'inputMeter', 'inputV', 'inputS', 'inputGraph'];

    exerciseIds.forEach((id) => {
        const input = document.getElementById(id);
        if (!input) return;
        const zone = input.closest('.interactive-zone');
        const feedback = zone ? zone.querySelector('.feedback') : null;

        if (feedback && !feedback.id) {
            feedback.id = `${id}Feedback`;
        }
        if (feedback) {
            feedback.setAttribute('role', 'status');
            feedback.setAttribute('aria-live', 'polite');
            feedback.setAttribute('aria-atomic', 'true');
            input.setAttribute('aria-describedby', feedback.id);
        }

        input.setAttribute('inputmode', 'decimal');
        input.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            const btn = zone ? zone.querySelector('button') : null;
            if (btn) btn.click();
        });
    });
}

function checkInput(inputId, expectedValue, points, btn) {
    const input = document.getElementById(inputId);
    if (!input || !btn) return;

    const val = parseFloat(input.value.replace(',', '.'));
    const feedback = btn.nextElementSibling;

    if (btn.disabled || Number.isNaN(val)) {
        if (feedback && Number.isNaN(val)) {
            feedback.innerText = "Bitte zuerst eine Zahl eingeben (Dezimalzahl mit Punkt oder Komma).";
            feedback.style.color = 'var(--wrong)';
        }
        return;
    }

    if (isCloseEnough(val, expectedValue)) {
        handleAnswer(btn, true, points, "Exakt richtig!");
        input.disabled = true;
        return;
    }

    btn.style.background = 'var(--wrong)';
    if (feedback) {
        feedback.innerText = getHintForInput(inputId, val, expectedValue);
        feedback.style.color = 'var(--wrong)';
    }

    setTimeout(() => {
        btn.style.background = '#0097A7';
    }, 1500);
}

function isCloseEnough(val, expectedValue) {
    return Math.abs(val - expectedValue) < 0.01;
}

function getHintForInput(inputId, val, expectedValue) {
    const common = "❌ Das stimmt noch nicht ganz. Rechne den Umrechnungsfaktor und den Rechenweg Schritt für Schritt.";

    if (inputId === 'inputSec') {
        return val < expectedValue
            ? "❌ Zu klein. Denk an: 1 h = 3600 s. Erst 2,5 h × 60 (Minuten), dann × 60 (Sekunden)."
            : "❌ Zu groß. Prüfe, ob du beim Umrechnen Stunden → Sekunden nicht doppelt multipliziert hast.";
    }

    if (inputId === 'inputKg') {
        return "❌ Tipp: Erst alles in kg umrechnen (800 g = 0,8 kg, 1200 g = 1,2 kg), dann addieren.";
    }

    if (inputId === 'inputMeter') {
        return "❌ Tipp: 2,4 km zuerst in Meter umrechnen (2400 m), danach 350 m abziehen.";
    }

    if (inputId === 'inputV') {
        return val > expectedValue
            ? "❌ Prüfe die Formel: v = s ÷ t. Du hast wahrscheinlich multipliziert statt dividiert."
            : "❌ Prüfe die Division: 120 ÷ 4 ergibt 30.";
    }

    if (inputId === 'inputS') {
        return val < expectedValue
            ? "❌ Zu klein. Für die Strecke gilt s = v · t, also 5 · 12."
            : "❌ Zu groß. Für die Strecke gilt s = v · t, nicht s = v ÷ t.";
    }

    if (inputId === 'inputGraph') {
        return "❌ Lies zuerst den Punkt aus dem Diagramm (bei 10 s sind es 50 m) und nutze dann v = s ÷ t.";
    }

    return common;
}
