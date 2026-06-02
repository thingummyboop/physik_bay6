function getEverydaySubstancesText() {
    const lang = localStorage.getItem('physik_lang') || 'de';
    if (lang === 'en') {
        return {
            title: 'Everyday substance cards',
            intro: 'Choose a substance and compare which property helps you recognize it.',
            salt: 'Salt',
            iron: 'Iron',
            oil: 'Oil',
            initial: 'Choose a substance.',
            saltStatus: 'Salt: solid, white, brittle, soluble in water and not magnetic.',
            ironStatus: 'Iron: solid, grey, shiny, magnetic and electrically conductive.',
            oilStatus: 'Oil: liquid, not soluble in water, usually lighter than water and flammable.'
        };
    }
    return {
        title: 'Alltagsstoff-Karten',
        intro: 'Waehle einen Stoff und vergleiche, welche Eigenschaft beim Erkennen hilft.',
        salt: 'Salz',
        iron: 'Eisen',
        oil: 'Oel',
        initial: 'Stoff waehlen.',
        saltStatus: 'Salz: fest, weiss, sproede, wasserloeslich und nicht magnetisch.',
        ironStatus: 'Eisen: fest, grau, metallisch glaenzend, magnetisch und elektrisch leitfaehig.',
        oilStatus: 'Oel: fluessig, wasserunloeslich, meist leichter als Wasser und brennbar.'
    };
}

function ensureEverydaySubstancesLab() {
    if (document.querySelector('.chem-lab[data-chem-lab="properties"]')) return;

    const cards = document.querySelectorAll('#sections-container .card');
    const targetCard = cards[1] || cards[0];
    if (!targetCard || targetCard.dataset.chemEverydayReady === 'true') return;
    targetCard.dataset.chemEverydayReady = 'true';

    const text = getEverydaySubstancesText();
    const lab = document.createElement('div');
    lab.className = 'chem-lab interactive-zone';
    lab.dataset.chemLab = 'properties';
    lab.innerHTML = `
        <h3>${text.title}</h3>
        <p>${text.intro}</p>
        <button type="button" data-chem-action="salt" aria-pressed="false">${text.salt}</button>
        <button type="button" data-chem-action="iron" aria-pressed="false">${text.iron}</button>
        <button type="button" data-chem-action="oil" aria-pressed="false">${text.oil}</button>
        <p class="chem-status" role="status" aria-live="polite" aria-atomic="true">${text.initial}</p>
    `;

    lab.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-chem-action]');
        if (!button || !lab.contains(button)) return;
        const status = lab.querySelector('.chem-status');
        lab.querySelectorAll('button[data-chem-action]').forEach((candidate) => {
            candidate.setAttribute('aria-pressed', String(candidate === button));
        });
        if (status) status.textContent = text[`${button.dataset.chemAction}Status`] || text.initial;
    });

    const firstQuiz = targetCard.querySelector('.practice-block, .quiz-box');
    targetCard.insertBefore(lab, firstQuiz || null);
}

function loadChemieCommon() {
    if (window.ChemieLabs) {
        window.ChemieLabs.topicInit();
        return;
    }
    const existing = document.querySelector('script[data-chemie-common="true"]');
    if (existing) {
        existing.addEventListener('load', () => window.ChemieLabs?.topicInit(), { once: true });
        return;
    }
    const script = document.createElement('script');
    script.src = '../js/topics/chemie_common.js?v=1.5';
    script.async = false;
    script.dataset.chemieCommon = 'true';
    script.onload = () => window.ChemieLabs?.topicInit();
    document.body.appendChild(script);
}

function topicInit() {
    ensureEverydaySubstancesLab();
    loadChemieCommon();
}
