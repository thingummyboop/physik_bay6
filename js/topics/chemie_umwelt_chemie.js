function topicInit() {
    document.querySelectorAll('.chem-lab').forEach((lab) => {
        if (lab.dataset.chemReady === 'true') return;
        lab.dataset.chemReady = 'true';
        lab.querySelectorAll('button[data-chem-action]').forEach((button) => {
            button.addEventListener('click', () => handleChemButton(lab, button.dataset.chemAction));
        });
        lab.querySelectorAll('input[type="range"]').forEach((range) => {
            range.addEventListener('input', () => updateChemLab(lab));
            range.setAttribute('aria-valuetext', range.value);
        });
        lab.querySelectorAll('input[type="checkbox"]').forEach((box) => box.addEventListener('change', () => updateChemLab(lab)));
        lab.querySelectorAll('select').forEach((select) => select.addEventListener('change', () => updateChemLab(lab)));
        updateChemLab(lab);
    });
}

function chemStatus(lab, text) {
    const status = lab.querySelector('.chem-status');
    if (status) status.textContent = text;
}

function handleChemButton(lab, action) {
    const type = lab.dataset.chemLab;
    const messages = {
        roadmap: {
            experiment: 'Starte mit Sicherheit, Stoffeigenschaften und Trennverfahren. Dort ist viel praktisches Arbeiten dabei.',
            model: 'Starte mit Teilchenmodell, Atomen und Bindungen. Dort baust du Erklaerungen auf Teilchenebene.',
            alltag: 'Starte mit Stoffen, Saeuren/Basen, Kunststoffen und Umweltchemie. Dort ist der Alltagsbezug besonders stark.'
        },
        'safety-sort': {
            eyes: 'Sofort melden, Augendusche nutzen, Lehrkraft holt Hilfe. Nicht reiben.',
            smell: 'Nie direkt riechen. Wenn erlaubt: vorsichtig heranfaecheln.',
            spill: 'Abstand halten, melden, nach Anweisung aufnehmen und entsorgen.'
        },
        properties: {
            salt: 'Salz: fest, weiss, sproede, wasserloeslich, nicht magnetisch. Loesung kann Strom leiten.',
            iron: 'Eisen: fest, grau, metallisch glaenzend, magnetisch, elektrisch leitfaehig.',
            oil: 'Oel: fluessig, wasserunloeslich, schwimmt meist auf Wasser, brennbar.'
        },
        separation: {
            filter: 'Filtern trennt unloesliche Feststoffe von Fluessigkeiten, z.B. Sand aus Salzwasser.',
            evaporate: 'Eindampfen trennt geloeste Stoffe, z.B. Salz aus Salzwasser. Nur mit Lehrkraft erhitzen.',
            magnet: 'Ein Magnet trennt Eisen von nicht magnetischen Stoffen.',
            chromato: 'Chromatografie trennt Farbstoffgemische, z.B. Filzstiftfarben.'
        },
        bonding: {
            salt: 'Salz: Ionen bilden ein regelmaessiges Gitter. Deshalb ist Salz sproede und loest sich in Wasser.',
            water: 'Wasser: Atome teilen Elektronen. Die Molekuele ziehen einander leicht an.',
            metal: 'Metall: Atomruempfe und bewegliche Elektronen. Deshalb leiten Metalle Strom.'
        },
        redox: {
            dry: 'Trocken: Rost entsteht langsam, weil Wasser fehlt.',
            water: 'Wasser: Rost kann entstehen, wenn Sauerstoff dazukommt.',
            salt: 'Salzwasser: Rost geht schneller, weil Ionen den Vorgang foerdern.',
            oil: 'Oelschicht: schuetzt, weil Wasser und Sauerstoff schwerer an Eisen kommen.'
        },
        lifecycle: {
            single: 'Einweg spart manchmal Gewicht, erzeugt aber oft mehr Abfall.',
            reuse: 'Mehrweg ist stark, wenn Reinigung und Transport sinnvoll bleiben.',
            repair: 'Reparieren spart Rohstoffe und verlaengert die Nutzungszeit.',
            recycle: 'Recycling hilft, ersetzt aber nicht Vermeiden und Wiederverwenden.'
        }
    };
    chemStatus(lab, messages[type]?.[action] || 'Gute Beobachtung. Begruende mit Stoffeigenschaft, Teilchenmodell oder Reaktion.');
}

function updateChemLab(lab) {
    const type = lab.dataset.chemLab;
    if (type === 'particles') updateParticleLab(lab);
    if (type === 'atom-builder') updateAtomLab(lab);
    if (type === 'reaction-evidence') updateEvidenceLab(lab);
    if (type === 'combustion') updateCombustionLab(lab);
    if (type === 'ph-scale') updatePhLab(lab);
    if (type === 'crystal') updateCrystalLab(lab);
    if (type === 'carbon-chain') updateCarbonLab(lab);
}

function updateParticleLab(lab) {
    const range = lab.querySelector('input[type="range"]');
    const value = Number(range.value);
    range.setAttribute('aria-valuetext', value + ' Prozent Temperaturmodell');
    const svg = lab.querySelector('.chem-particle-svg');
    if (!svg) return;
    const fast = value > 70;
    const liquid = value > 35 && value <= 70;
    const circles = Array.from({ length: fast ? 14 : 18 }, (_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        const x = fast ? 35 + ((i * 67) % 290) : liquid ? 50 + ((i * 43) % 260) : 70 + col * 38;
        const y = fast ? 28 + ((i * 47) % 110) : liquid ? 55 + ((i * 29) % 70) : 55 + row * 32;
        const anim = fast ? '<animate attributeName="cx" values="' + x + ';' + (x + 22 - (i % 2) * 44) + ';' + x + '" dur="1.2s" repeatCount="indefinite"></animate>' : liquid ? '<animate attributeName="cy" values="' + y + ';' + (y + 8) + ';' + y + '" dur="1.8s" repeatCount="indefinite"></animate>' : '<animate attributeName="r" values="8;8.8;8" dur="1.4s" repeatCount="indefinite"></animate>';
        return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5">' + anim + '</circle>';
    }).join('');
    svg.innerHTML = '<rect x="12" y="12" width="336" height="136" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>' + circles;
    chemStatus(lab, fast ? 'Gasmodell: schnelle, freie Teilchen mit grossen Abstaenden.' : liquid ? 'Fluessigkeitsmodell: Teilchen bewegen sich, bleiben aber nahe zusammen.' : 'Feststoffmodell: feste Plaetze, nur Zittern.');
}

function updateAtomLab(lab) {
    const ranges = lab.querySelectorAll('input[type="range"]');
    const p = Number(ranges[0].value);
    const e = Number(ranges[1].value);
    ranges[0].setAttribute('aria-valuetext', p + ' Protonen');
    ranges[1].setAttribute('aria-valuetext', e + ' Elektronen');
    const charge = p === e ? 'neutral' : p > e ? 'positives Ion' : 'negatives Ion';
    chemStatus(lab, p + ' Protonen und ' + e + ' Elektronen: ' + charge + '. Die Protonenzahl bestimmt das Element.');
}

function updateEvidenceLab(lab) {
    const count = lab.querySelectorAll('input[type="checkbox"]:checked').length;
    chemStatus(lab, count === 0 ? 'Noch keine Beobachtung gewaehlt.' : count === 1 ? 'Ein Zeichen allein kann ein Hinweis sein. Suche weitere Beobachtungen.' : 'Mehrere Zeichen: Eine chemische Reaktion ist wahrscheinlich. Pruefe, ob neue Stoffe entstanden sind.');
}

function updateCombustionLab(lab) {
    const values = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
    chemStatus(lab, values.length === 3 ? 'Alle drei Bedingungen sind da: Verbrennung ist moeglich.' : 'Es fehlt noch mindestens eine Bedingung. Zum Loeschen nimmt man eine weg.');
}

function updatePhLab(lab) {
    const range = lab.querySelector('input[type="range"]');
    const value = Number(range.value);
    range.setAttribute('aria-valuetext', 'pH ' + value);
    const strip = lab.querySelector('.chem-ph-strip');
    if (strip) {
        const color = value < 7 ? '#ef4444' : value === 7 ? '#22c55e' : '#2563eb';
        strip.style.cssText = 'height:28px;border-radius:8px;background:' + color + ';border:2px solid #0f172a;margin:8px 0;';
    }
    chemStatus(lab, value < 7 ? 'pH ' + value + ': sauer.' : value === 7 ? 'pH 7: neutral.' : 'pH ' + value + ': basisch.');
}

function updateCrystalLab(lab) {
    const range = lab.querySelector('input[type="range"]');
    const days = Number(range.value);
    range.setAttribute('aria-valuetext', days + ' Tage');
    const box = lab.querySelector('.chem-crystal-box');
    if (box) {
        const crystals = Array.from({ length: days + 1 }, (_, i) => '<span style="display:inline-block;width:' + (8 + days * 2) + 'px;height:' + (8 + days * 2) + 'px;background:#93c5fd;transform:rotate(45deg);margin:8px;border:1px solid #1d4ed8;"></span>').join('');
        box.innerHTML = crystals;
    }
    chemStatus(lab, 'Tag ' + days + ': Je langsamer Wasser verdunstet, desto geordneter koennen Kristalle wachsen.');
}

function updateCarbonLab(lab) {
    const range = lab.querySelector('input[type="range"]');
    const count = Number(range.value);
    range.setAttribute('aria-valuetext', count + ' Kohlenstoffatome');
    const chain = lab.querySelector('.chem-chain');
    if (chain) chain.innerHTML = Array.from({ length: count }, () => '<span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#111827;color:white;margin:4px;font-weight:800;">C</span>').join('<span style="font-weight:800;">-</span>');
    chemStatus(lab, count + ' C-Atome: Kohlenstoffketten koennen kurz, lang oder verzweigt sein.');
}
