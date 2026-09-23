function topicInit() {
    const lab = document.querySelector('[data-sharing-lab]');
    if (!lab || lab.dataset.bound) return;
    const mode = lab.querySelector('#sharing-mode'), person = lab.querySelector('#sharing-person');
    const result = lab.querySelector('[data-sharing-result]');
    const preview = lab.querySelector('[data-sharing-preview]');
    const content = lab.querySelector('[data-sharing-text]');
    const readStatus = lab.querySelector('[data-sharing-read-status]');
    const editStatus = lab.querySelector('[data-sharing-edit-status]');
    const rules = { team: 0, read: 1, edit: 2 };
    const people = { team: 2, teacher: 1, guest: 0 };
    let revised = false;
    const access = () => Math.max(rules[mode.value] ?? 0, people[person.value] ?? 0);
    const update = () => {
        const level = access();
        readStatus.textContent = level > 0 ? 'Lesen erlaubt' : 'Lesen nicht erlaubt';
        editStatus.textContent = level > 1 ? 'Bearbeiten erlaubt' : 'Bearbeiten nicht erlaubt';
        preview.hidden = true;
        result.textContent = 'Regel eingestellt. Sage voraus, was beim Lesen und Ändern passiert, und probiere es aus.';
    };
    lab.querySelector('[data-sharing-open]').addEventListener('click', () => {
        if (access() === 0) {
            preview.hidden = true;
            result.textContent = 'Kein Lesezugriff: Diese Person ist nicht eingeladen und erhält über diese Linkregel keine Rechte.';
            return;
        }
        preview.hidden = false;
        content.textContent = revised ? 'Übungsplan: Wir sammeln Fragen bis zur nächsten Lernrunde.' : 'Übungsplan: Alle sollen sofort antworten.';
        result.textContent = 'Lesen gelungen. Prüfe getrennt, ob diese Person auch bearbeiten darf.';
    });
    lab.querySelector('[data-sharing-edit]').addEventListener('click', () => {
        if (access() < 2) {
            result.textContent = 'Änderung abgelehnt: Der Modelltext bleibt unverändert. Leserechte sind keine Bearbeitungsrechte.';
            return;
        }
        revised = !revised;
        preview.hidden = false;
        content.textContent = revised ? 'Übungsplan: Wir sammeln Fragen bis zur nächsten Lernrunde.' : 'Übungsplan: Alle sollen sofort antworten.';
        result.textContent = revised ? 'Änderung gelungen: Die vorbereitete Verbesserung steht im gemeinsamen Modelltext.' : 'Änderung gelungen: Der ursprüngliche Übungssatz steht wieder im gemeinsamen Modelltext.';
    });
    mode.addEventListener('change', update);
    person.addEventListener('change', update);
    lab.querySelector('[data-sharing-reset]').addEventListener('click', () => {
        mode.value = 'team'; person.value = 'guest'; revised = false; content.textContent = '';
        update(); mode.focus();
    });
    lab.dataset.bound = '1';
    update();
}
