'use strict';
(() => {
    const cases = {
        original: { age: 'bounded', note: 'Das Lebewesen lebte zur Ablagerungszeit von B; keine Umlagerung.', explanation: 'Das Fossil gehört zur Ablagerungszeit von B. A darunter ist im Modell 120, C darüber 100 Millionen Jahre alt. Damit ist etwa 100–120 Millionen Jahre begründet; genau 110 folgt daraus nicht.' },
        reworked: { age: 'minimum', note: 'Das Fossil war bereits in älterem Gestein erhalten und wurde später in B eingebettet. Seine ursprüngliche Herkunft ist unbekannt.', explanation: 'B ist etwa 100–120 Millionen Jahre alt. Das bereits vorher vorhandene Fossil ist mindestens etwa 100 Millionen Jahre alt und kann auch älter als 120 sein. Die Angaben liefern für das Fossil keine obere Altersgrenze.' },
        loose: { age: 'unknown', note: 'Das Stück lag lose am Fuß der Wand. Weder Herkunftsschicht noch Herkunft aus genau dieser Wand sind gesichert.', explanation: 'Der lose Fund ist keiner Schicht sicher zugeordnet. Die Nähe zur Wand allein erlaubt keinen Altersbereich aus diesem Profil. Weitere Herkunfts- oder Datierungshinweise sind nötig.' }
    };
    window.topicInit = () => {
        const zone = document.querySelector('[data-fossil-lab]');
        if (!zone || zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        const orders = [...zone.querySelectorAll('[data-fossil-order]')];
        const context = zone.querySelector('[data-fossil-context]');
        const age = zone.querySelector('[data-fossil-age]');
        const note = zone.querySelector('[data-fossil-context-note]');
        const result = zone.querySelector('[data-fossil-result]');
        const clear = () => { result.replaceChildren(); delete result.dataset.orderCorrect; delete result.dataset.ageCorrect; delete result.dataset.invalid; };
        const paragraph = text => { const p = document.createElement('p'); p.textContent = text; result.append(p); };
        [...orders, age].forEach(select => select.addEventListener('change', clear));
        context.addEventListener('change', () => {
            clear(); age.value = ''; note.textContent = cases[context.value]?.note || 'Wähle eine beschriebene Fundlage.';
        });
        zone.querySelector('[data-fossil-check]').addEventListener('click', () => {
            clear();
            const values = orders.map(select => select.value);
            const missing = orders.find(select => !['A', 'B', 'C', 'D'].includes(select.value));
            if (missing) {
                result.dataset.invalid = 'order'; paragraph('Ordne zuerst alle vier Positionen mit A, B, C oder D zu.'); missing.focus(); return;
            }
            if (new Set(values).size !== 4) {
                result.dataset.invalid = 'duplicate'; paragraph('Jede Schicht soll genau einmal vorkommen. Prüfe doppelte Buchstaben und die fehlende Schicht.');
                orders[values.findIndex((value, index) => values.indexOf(value) < index)].focus(); return;
            }
            const selected = cases[context.value];
            if (!selected) {
                result.dataset.invalid = 'context'; paragraph('Wähle eine der drei beschriebenen Fundlagen.'); context.focus(); return;
            }
            if (!['bounded', 'minimum', 'unknown'].includes(age.value)) {
                result.dataset.invalid = 'age'; paragraph('Wähle einen begründbaren Altersbereich für diese Fundlage.'); age.focus(); return;
            }
            const orderCorrect = values.join('') === 'ABCD', ageCorrect = age.value === selected.age;
            result.dataset.orderCorrect = String(orderCorrect); result.dataset.ageCorrect = String(ageCorrect);
            paragraph(orderCorrect
                ? 'Schichtfolge richtig: A → B → C → D. Unter den angegebenen Voraussetzungen wurde unten zuerst abgelagert.'
                : `Deine Folge ${values.join(' → ')} passt nicht zum Profil. Von zuerst bis zuletzt gilt A → B → C → D. Lies die ursprüngliche Folge von unten nach oben; die heutige Höhe ist kein zahlenmäßiges Alter.`);
            paragraph((ageCorrect ? 'Altersaussage richtig: ' : 'Altersaussage überarbeiten: ') + selected.explanation);
            paragraph('Die Fundlage ändert die Aussage über das Fossil, nicht die festgelegte Reihenfolge der Schichten. Schichtdicken liefern hier keine Zeitabstände. Das vereinfachte Profil setzt ungestörte Ablagerung und passende Aschedatierungen voraus.');
            result.focus();
        });
        zone.querySelector('[data-fossil-reset]').addEventListener('click', () => {
            orders.forEach(select => select.value = ''); context.value = 'original'; age.value = ''; note.textContent = cases.original.note; clear(); orders[0].focus();
        });
    };
})();
