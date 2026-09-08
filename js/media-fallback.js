// Capture image events because resource errors do not bubble. This also covers
// images added later by chapter activities, without rescanning the document.
(() => {
    const messages = {
        de: ['Bild konnte nicht geladen werden.', 'Bildbeschreibung: '],
        en: ['The image could not be loaded.', 'Image description: '],
        ar: ['تعذّر تحميل الصورة.', 'وصف الصورة: '],
        uk: ['Не вдалося завантажити зображення.', 'Опис зображення: '],
        sr: ['Slika nije mogla da se učita.', 'Opis slike: '],
        tr: ['Görsel yüklenemedi.', 'Görsel açıklaması: ']
    };
    const failed = new WeakMap();
    document.addEventListener('error', event => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement) || !img.closest('#sections-container') || failed.has(img)) return;
        // An explicitly empty alt marks decoration; it needs no extra text.
        if (img.getAttribute('alt') === '') return;
        const language = (img.closest('[lang]')?.lang || 'de').split('-')[0];
        const text = messages[language] || messages.de;
        const note = document.createElement('span');
        note.className = 'media-load-notice';
        note.lang = messages[language] ? language : 'de';
        note.dir = note.lang === 'ar' ? 'rtl' : 'ltr';
        note.textContent = text[0];
        const description = img.getAttribute('alt')?.trim();
        if (description) note.textContent += ' ' + text[1] + description;
        failed.set(img, note);
        img.setAttribute('data-media-failed', 'true');
        img.after(note);
    }, true);
    document.addEventListener('load', event => {
        const img = event.target;
        const note = failed.get(img);
        if (!note) return;
        note.remove();
        img.removeAttribute('data-media-failed');
        failed.delete(img);
    }, true);
})();
