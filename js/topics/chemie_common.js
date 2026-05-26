window.ChemieLabs = (() => {
    const ELEMENTS = {
        1: { symbol: 'H', name: 'Wasserstoff' },
        2: { symbol: 'He', name: 'Helium' },
        3: { symbol: 'Li', name: 'Lithium' },
        4: { symbol: 'Be', name: 'Beryllium' },
        5: { symbol: 'B', name: 'Bor' },
        6: { symbol: 'C', name: 'Kohlenstoff' },
        7: { symbol: 'N', name: 'Stickstoff' },
        8: { symbol: 'O', name: 'Sauerstoff' },
        9: { symbol: 'F', name: 'Fluor' },
        10: { symbol: 'Ne', name: 'Neon' }
    };

    function topicInit() {
        document.querySelectorAll('.chem-lab.interactive-zone, .chem-lab').forEach((lab) => {
            if (lab.dataset.chemReady === 'true') return;
            lab.dataset.chemReady = 'true';
            prepareLab(lab);
            bindLab(lab);
            updateChemLab(lab);
        });
    }

    function prepareLab(lab) {
        lab.querySelectorAll('.chem-status').forEach((status) => {
            status.setAttribute('role', 'status');
            status.setAttribute('aria-live', 'polite');
            status.setAttribute('aria-atomic', 'true');
        });

        if (!lab.querySelector('.chem-visual')) {
            const visual = document.createElement('div');
            visual.className = 'chem-visual diagram-box';
            visual.setAttribute('aria-hidden', 'true');
            const status = lab.querySelector('.chem-status');
            lab.insertBefore(visual, status || null);
        }

        if (lab.dataset.chemLab === 'ph-scale' && !lab.querySelector('.chem-samples')) {
            const samples = document.createElement('div');
            samples.className = 'prediction-grid chem-samples';
            samples.innerHTML = `
                <button type="button" data-chem-ph="2">Zitronensaft</button>
                <button type="button" data-chem-ph="5">Mineralwasser</button>
                <button type="button" data-chem-ph="7">reines Wasser</button>
                <button type="button" data-chem-ph="10">Seifenlösung</button>
                <button type="button" data-chem-ph="12">Natronlösung</button>
            `;
            const visual = lab.querySelector('.chem-visual');
            lab.insertBefore(samples, visual);
        }
    }

    function bindLab(lab) {
        lab.querySelectorAll('button[data-chem-action]').forEach((button) => {
            button.addEventListener('click', () => handleChemButton(lab, button.dataset.chemAction));
        });
        lab.querySelectorAll('button[data-chem-ph]').forEach((button) => {
            button.addEventListener('click', () => {
                const range = lab.querySelector('input[type="range"]');
                if (!range) return;
                range.value = button.dataset.chemPh;
                updateChemLab(lab);
            });
        });
        lab.querySelectorAll('input[type="range"]').forEach((range) => {
            range.addEventListener('input', () => updateChemLab(lab));
            range.setAttribute('aria-valuetext', range.value);
        });
        lab.querySelectorAll('input[type="checkbox"]').forEach((box) => {
            box.addEventListener('change', () => updateChemLab(lab));
        });
        lab.querySelectorAll('select').forEach((select) => {
            select.addEventListener('change', () => updateChemLab(lab));
        });
    }

    function chemStatus(lab, text) {
        const status = lab.querySelector('.chem-status');
        if (status) status.textContent = text;
    }

    function visual(lab, html) {
        const target = lab.querySelector('.chem-visual');
        if (target) target.innerHTML = html;
    }

    function handleChemButton(lab, action) {
        const type = lab.dataset.chemLab;
        const messages = {
            roadmap: {
                experiment: 'Empfehlung: Sicherheit -> Stoffeigenschaften -> Trennverfahren -> Reaktionen. Dort arbeitest du besonders praktisch.',
                model: 'Empfehlung: Teilchenmodell -> Atome -> Bindungen -> Reaktionen. Dort baust du Erklärungen auf Teilchenebene.',
                alltag: 'Empfehlung: Stoffe im Alltag -> Säuren/Basen -> Kunststoffe -> Umweltchemie. Dort prüfst du Nutzen und Risiko.',
                grade3: '3. Klasse: Starte mit Sicherheit, Stoffen im Alltag, Eigenschaften, Trennverfahren, Teilchenmodell und Wasser/Lösungen.',
                grade4: '4. Klasse: Starte mit chemischen Reaktionen, Verbrennung, Säuren/Basen, Redox und arbeite dann mit Atomen, Bindungen und Anwendungen weiter.',
                review: 'Wiederholung: Prüfe zuerst Stoffeigenschaften, Trennverfahren und Teilchenmodell. Diese Grundlagen brauchst du für Reaktionen und Bindungen.'
            },
            'safety-sort': {
                eyes: 'Sofort melden, Auge offen halten und Augendusche nutzen. Nicht reiben. Lehrkraft holt Hilfe.',
                smell: 'Nie direkt riechen. Wenn die Lehrkraft es erlaubt: mit der Hand vorsichtig zufächeln.',
                spill: 'Abstand halten, melden, Gefäß sichern. Erst nach Anweisung aufnehmen und entsorgen.'
            },
            properties: {
                salt: 'Salz: fest, weiß, spröde, wasserlöslich, nicht magnetisch. Eine Salzlösung kann Strom leiten.',
                iron: 'Eisen: fest, grau, metallisch glänzend, magnetisch und elektrisch leitfähig.',
                oil: 'Öl: flüssig, wasserunlöslich, meist leichter als Wasser und brennbar.'
            },
            separation: {
                filter: 'Filtern trennt unlösliche Feststoffe von Flüssigkeiten, zum Beispiel Sand aus Salzwasser.',
                evaporate: 'Eindampfen trennt gelöste Stoffe, zum Beispiel Salz aus Salzwasser. Nur mit Lehrkraft erhitzen.',
                magnet: 'Ein Magnet trennt Eisen von nicht magnetischen Stoffen.',
                chromato: 'Chromatografie trennt Farbstoffgemische, zum Beispiel Filzstiftfarben.'
            },
            bonding: {
                salt: 'Salz: Ionen bilden ein regelmäßiges Gitter. Deshalb ist Salz spröde und löst sich in Wasser.',
                water: 'Wasser: Atome teilen Elektronen. Die Moleküle ziehen einander zusätzlich leicht an.',
                metal: 'Metall: Atomrümpfe und bewegliche Elektronen. Deshalb leiten Metalle Strom und Wärme.'
            },
            redox: {
                dry: 'Trocken: Rost entsteht langsam, weil Wasser fehlt.',
                water: 'Wasser: Rost kann entstehen, wenn auch Sauerstoff dazukommt.',
                salt: 'Salzwasser: Rost geht schneller, weil Ionen den Vorgang fördern.',
                oil: 'Ölschicht: schützt, weil Wasser und Sauerstoff schwerer an Eisen kommen.'
            },
            lifecycle: {
                single: 'Einweg kann praktisch sein, erzeugt aber oft mehr Abfall.',
                reuse: 'Mehrweg ist stark, wenn Reinigung und Transport sinnvoll bleiben.',
                repair: 'Reparieren spart Rohstoffe und verlängert die Nutzungszeit.',
                recycle: 'Recycling hilft, ersetzt aber nicht Vermeiden und Wiederverwenden.'
            }
        };

        chemStatus(lab, messages[type]?.[action] || 'Gute Beobachtung. Begründe mit Stoffeigenschaft, Teilchenmodell oder Reaktion.');
        updateChemLab(lab);
    }

    function updateChemLab(lab) {
        const type = lab.dataset.chemLab;
        if (type === 'roadmap') renderRoadmap(lab);
        if (type === 'safety-sort') renderSafety(lab);
        if (type === 'properties') renderProperties(lab);
        if (type === 'particles') updateParticleLab(lab);
        if (type === 'separation') updateSeparationLab(lab);
        if (type === 'atom-builder') updateAtomLab(lab);
        if (type === 'bonding') renderBonding(lab);
        if (type === 'reaction-evidence') updateEvidenceLab(lab);
        if (type === 'combustion') updateCombustionLab(lab);
        if (type === 'ph-scale') updatePhLab(lab);
        if (type === 'crystal') updateCrystalLab(lab);
        if (type === 'redox') renderRedox(lab);
        if (type === 'carbon-chain') updateCarbonLab(lab);
        if (type === 'lifecycle') renderLifecycle(lab);
    }

    function renderRoadmap(lab) {
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Chemie Lernweg">
                <path d="M40 145 C110 50 180 145 245 72 S390 112 470 42" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-dasharray="10 8"></path>
                ${['Sicherheit', 'Stoffe', 'Teilchen', 'Reaktionen', 'Umwelt'].map((label, i) => {
                    const pts = [[40,145], [155,78], [260,78], [370,110], [470,42]][i];
                    return `<g><circle cx="${pts[0]}" cy="${pts[1]}" r="20" fill="#facc15" stroke="#92400e" stroke-width="3"></circle><text x="${pts[0]}" y="${pts[1] + 44}" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">${label}</text></g>`;
                }).join('')}
            </svg>
        `);
    }

    function renderSafety(lab) {
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Sicherheitsstation">
                <rect x="28" y="32" width="120" height="120" rx="14" fill="#fee2e2" stroke="#dc2626" stroke-width="3"></rect>
                <text x="88" y="82" text-anchor="middle" font-size="44">!</text>
                <text x="88" y="128" text-anchor="middle" font-size="14" font-weight="800">Etikett lesen</text>
                <rect x="200" y="32" width="120" height="120" rx="14" fill="#dbeafe" stroke="#2563eb" stroke-width="3"></rect>
                <circle cx="260" cy="86" r="28" fill="none" stroke="#0f172a" stroke-width="5"></circle>
                <path d="M232 86 H288" stroke="#0f172a" stroke-width="5"></path>
                <text x="260" y="128" text-anchor="middle" font-size="14" font-weight="800">Brille tragen</text>
                <rect x="372" y="32" width="120" height="120" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="3"></rect>
                <path d="M412 95 l16 16 42 -50" fill="none" stroke="#15803d" stroke-width="8" stroke-linecap="round"></path>
                <text x="432" y="128" text-anchor="middle" font-size="14" font-weight="800">melden</text>
            </svg>
        `);
    }

    function renderProperties(lab) {
        visual(lab, `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;text-align:left;">
                <div style="padding:10px;border:2px solid #94a3b8;border-radius:8px;background:#fff;"><strong>Löslichkeit</strong><br>Salz ja, Öl nein</div>
                <div style="padding:10px;border:2px solid #94a3b8;border-radius:8px;background:#fff;"><strong>Magnetismus</strong><br>Eisen ja</div>
                <div style="padding:10px;border:2px solid #94a3b8;border-radius:8px;background:#fff;"><strong>Dichte</strong><br>Öl schwimmt</div>
                <div style="padding:10px;border:2px solid #94a3b8;border-radius:8px;background:#fff;"><strong>Leitfähigkeit</strong><br>Metalle leiten</div>
            </div>
        `);
    }

    function updateParticleLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const value = Number(range.value);
        range.setAttribute('aria-valuetext', value + ' Prozent Temperaturmodell');
        const fast = value > 70;
        const liquid = value > 35 && value <= 70;
        const circles = Array.from({ length: fast ? 14 : 18 }, (_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const x = fast ? 40 + ((i * 67) % 290) : liquid ? 52 + ((i * 43) % 260) : 75 + col * 38;
            const y = fast ? 34 + ((i * 47) % 105) : liquid ? 58 + ((i * 29) % 70) : 58 + row * 32;
            const anim = fast
                ? `<animate attributeName="cx" values="${x};${x + 22 - (i % 2) * 44};${x}" dur="1.2s" repeatCount="indefinite"></animate><animate attributeName="cy" values="${y};${y + 18 - (i % 3) * 18};${y}" dur="1.4s" repeatCount="indefinite"></animate>`
                : liquid
                    ? `<animate attributeName="cy" values="${y};${y + 8};${y}" dur="1.8s" repeatCount="indefinite"></animate>`
                    : '<animate attributeName="r" values="8;8.8;8" dur="1.4s" repeatCount="indefinite"></animate>';
            return `<circle cx="${x}" cy="${y}" r="8" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5">${anim}</circle>`;
        }).join('');
        visual(lab, `
            <svg class="chem-particle-svg" width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Teilchenmodell">
                <rect x="18" y="18" width="330" height="150" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                ${circles}
                <g transform="translate(382 42)">
                    <rect width="112" height="88" rx="10" fill="${fast ? '#e0f2fe' : liquid ? '#dbeafe' : '#eff6ff'}" stroke="#2563eb" stroke-width="3"></rect>
                    <text x="56" y="34" text-anchor="middle" font-size="15" font-weight="800">${fast ? 'Gas' : liquid ? 'Flüssig' : 'Fest'}</text>
                    <text x="56" y="62" text-anchor="middle" font-size="12">${fast ? 'frei' : liquid ? 'beweglich' : 'feste Plätze'}</text>
                </g>
            </svg>
        `);
        chemStatus(lab, fast ? 'Gasmodell: schnelle, freie Teilchen mit großen Abständen.' : liquid ? 'Flüssigkeitsmodell: Teilchen bewegen sich, bleiben aber nahe zusammen.' : 'Feststoffmodell: feste Plätze, nur Zittern.');
    }

    function updateSeparationLab(lab) {
        const mixture = lab.querySelector('select')?.value || 'sandSalt';
        const names = { sandSalt: 'Sand + Salz', ink: 'Filzstiftfarbe', ironSand: 'Eisen + Sand' };
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Trennverfahren">
                <rect x="24" y="35" width="110" height="90" rx="12" fill="#fef3c7" stroke="#92400e" stroke-width="3"></rect>
                <text x="79" y="82" text-anchor="middle" font-size="14" font-weight="800">${names[mixture]}</text>
                <path d="M158 80 H220" stroke="#2563eb" stroke-width="5" marker-end="url(#chemArrow)"></path>
                <path d="M250 44 L330 44 L300 95 L280 95 Z" fill="#dbeafe" stroke="#0f172a" stroke-width="3"></path>
                <rect x="276" y="96" width="32" height="56" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></rect>
                <path d="M360 80 H425" stroke="#2563eb" stroke-width="5" marker-end="url(#chemArrow)"></path>
                <rect x="430" y="116" width="58" height="34" rx="6" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"></rect>
                <defs><marker id="chemArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#2563eb"></path></marker></defs>
            </svg>
        `);
    }

    function updateAtomLab(lab) {
        const ranges = lab.querySelectorAll('input[type="range"]');
        const p = Number(ranges[0].value);
        const e = Number(ranges[1].value);
        ranges[0].setAttribute('aria-valuetext', p + ' Protonen');
        ranges[1].setAttribute('aria-valuetext', e + ' Elektronen');
        const element = ELEMENTS[p] || { symbol: '?', name: 'unbekannt' };
        const charge = p === e ? 'neutral' : p > e ? 'positives Ion' : 'negatives Ion';
        const electrons = Array.from({ length: e }, (_, i) => {
            const shell = i < 2 ? 42 : 70;
            const countOnShell = i < 2 ? Math.min(e, 2) : Math.max(e - 2, 1);
            const indexOnShell = i < 2 ? i : i - 2;
            const angle = (Math.PI * 2 * indexOnShell / countOnShell) - Math.PI / 2;
            return `<circle cx="${260 + Math.cos(angle) * shell}" cy="${92 + Math.sin(angle) * shell}" r="6" fill="#2563eb"></circle>`;
        }).join('');
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Atommodell">
                <circle cx="260" cy="92" r="42" fill="none" stroke="#94a3b8" stroke-width="2"></circle>
                <circle cx="260" cy="92" r="70" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"></circle>
                <circle cx="260" cy="92" r="24" fill="#fca5a5" stroke="#991b1b" stroke-width="3"></circle>
                <text x="260" y="98" text-anchor="middle" font-size="18" font-weight="900">${element.symbol}</text>
                ${electrons}
                <text x="42" y="58" font-size="15" font-weight="800">${element.name}</text>
                <text x="42" y="86" font-size="13">${p} Protonen</text>
                <text x="42" y="110" font-size="13">${e} Elektronen</text>
                <text x="390" y="86" font-size="15" font-weight="800">${charge}</text>
            </svg>
        `);
        chemStatus(lab, `${p} Protonen und ${e} Elektronen: ${charge}. Die Protonenzahl bestimmt das Element: ${element.name}.`);
    }

    function renderBonding(lab) {
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Bindungsmodelle">
                <g transform="translate(45 30)">
                    <text x="60" y="0" text-anchor="middle" font-weight="800">Salz</text>
                    ${[0,1,2].map(r => [0,1,2].map(c => `<circle cx="${30 + c*35}" cy="${30 + r*35}" r="14" fill="${(r+c)%2 ? '#60a5fa' : '#f87171'}"></circle>`).join('')).join('')}
                </g>
                <g transform="translate(210 42)">
                    <text x="60" y="-12" text-anchor="middle" font-weight="800">Wasser</text>
                    <line x1="60" y1="48" x2="34" y2="78" stroke="#38bdf8" stroke-width="5"></line><line x1="60" y1="48" x2="86" y2="78" stroke="#38bdf8" stroke-width="5"></line>
                    <circle cx="60" cy="48" r="20" fill="#ef4444"></circle><circle cx="34" cy="78" r="12" fill="#f8fafc" stroke="#94a3b8"></circle><circle cx="86" cy="78" r="12" fill="#f8fafc" stroke="#94a3b8"></circle>
                </g>
                <g transform="translate(370 34)">
                    <text x="60" y="-4" text-anchor="middle" font-weight="800">Metall</text>
                    ${[0,1,2].map(r => [0,1,2].map(c => `<circle cx="${25 + c*35}" cy="${30 + r*35}" r="12" fill="#cbd5e1" stroke="#64748b"></circle>`).join('')).join('')}
                    <path d="M12 120 C45 95 90 140 122 110" fill="none" stroke="#2563eb" stroke-width="4" stroke-dasharray="7 5"></path>
                </g>
            </svg>
        `);
    }

    function updateEvidenceLab(lab) {
        const checked = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map((box) => box.value);
        const count = checked.length;
        visual(lab, `
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
                ${['Gas', 'Wärme', 'Farbe', 'Niederschlag'].map((label, i) => `<div style="padding:12px;border-radius:8px;background:${count > i ? '#dcfce7' : '#f1f5f9'};border:2px solid ${count > i ? '#16a34a' : '#cbd5e1'};font-weight:800;">${label}</div>`).join('')}
            </div>
        `);
        chemStatus(lab, count === 0 ? 'Noch keine Beobachtung gewählt.' : count === 1 ? 'Ein Zeichen allein kann ein Hinweis sein. Suche weitere Beobachtungen.' : 'Mehrere Zeichen: Eine chemische Reaktion ist wahrscheinlich. Prüfe, ob neue Stoffe entstanden sind.');
    }

    function updateCombustionLab(lab) {
        const values = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map((x) => x.value);
        const all = values.length === 3;
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Branddreieck">
                <polygon points="260,28 120,160 400,160" fill="${all ? '#fee2e2' : '#f8fafc'}" stroke="#ef4444" stroke-width="4"></polygon>
                <text x="260" y="76" text-anchor="middle" font-size="15" font-weight="800">Zündtemperatur</text>
                <text x="170" y="145" text-anchor="middle" font-size="15" font-weight="800">Brennstoff</text>
                <text x="350" y="145" text-anchor="middle" font-size="15" font-weight="800">Sauerstoff</text>
                ${all ? '<path d="M260 118 C230 88 268 72 260 42 C306 74 330 108 292 146 C282 156 238 154 228 134 C220 116 238 112 244 96 C250 108 254 114 260 118 Z" fill="#f97316"></path>' : ''}
            </svg>
        `);
        chemStatus(lab, all ? 'Alle drei Bedingungen sind da: Verbrennung ist möglich.' : 'Es fehlt noch mindestens eine Bedingung. Zum Löschen nimmt man eine weg.');
    }

    function updatePhLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const value = Number(range.value);
        range.setAttribute('aria-valuetext', 'pH ' + value);
        const color = value < 4 ? '#ef4444' : value < 7 ? '#f97316' : value === 7 ? '#22c55e' : value < 11 ? '#38bdf8' : '#2563eb';
        const label = value < 7 ? 'sauer' : value === 7 ? 'neutral' : 'basisch';
        const strip = lab.querySelector('.chem-ph-strip');
        if (strip) strip.style.cssText = `height:28px;border-radius:8px;background:${color};border:2px solid #0f172a;margin:8px 0;`;
        visual(lab, `
            <div style="display:grid;grid-template-columns:1fr;gap:8px;text-align:left;">
                <div style="height:24px;border-radius:999px;background:linear-gradient(90deg,#dc2626,#f97316,#22c55e,#38bdf8,#2563eb);position:relative;">
                    <span style="position:absolute;left:${Math.max(0, Math.min(100, value / 14 * 100))}%;top:-7px;width:4px;height:38px;background:#0f172a;border-radius:2px;"></span>
                </div>
                <strong>pH ${value}: ${label}</strong>
                <span>Neutralisation bedeutet: sauer und basisch werden vorsichtig in Richtung pH 7 gebracht.</span>
            </div>
        `);
        chemStatus(lab, `pH ${value}: ${label}.`);
    }

    function updateCrystalLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const days = Number(range.value);
        range.setAttribute('aria-valuetext', days + ' Tage');
        const crystals = Array.from({ length: days + 1 }, (_, i) => `<span style="display:inline-block;width:${8 + days * 2}px;height:${8 + days * 2}px;background:#93c5fd;transform:rotate(45deg);margin:8px;border:1px solid #1d4ed8;"></span>`).join('');
        visual(lab, `<div style="min-height:80px;display:flex;align-items:end;justify-content:center;">${crystals}</div>`);
        chemStatus(lab, `Tag ${days}: Je langsamer Wasser verdunstet, desto geordneter können Kristalle wachsen.`);
    }

    function renderRedox(lab) {
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Rostversuch">
                ${['trocken', 'Wasser', 'Salzwasser', 'Öl'].map((label, i) => `<g transform="translate(${45 + i*120} 35)"><rect width="78" height="110" rx="10" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></rect><line x1="39" y1="24" x2="39" y2="86" stroke="#78716c" stroke-width="9" stroke-linecap="round"></line><circle cx="39" cy="24" r="10" fill="#a8a29e"></circle><text x="39" y="134" text-anchor="middle" font-size="13" font-weight="800">${label}</text></g>`).join('')}
            </svg>
        `);
    }

    function updateCarbonLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const count = Number(range.value);
        range.setAttribute('aria-valuetext', count + ' Kohlenstoffatome');
        const chain = Array.from({ length: count }, (_, i) => `<circle cx="${55 + i*48}" cy="${92 + (i % 2) * 18}" r="18" fill="#111827"></circle><text x="${55 + i*48}" y="${98 + (i % 2) * 18}" text-anchor="middle" fill="white" font-weight="900">C</text>${i < count - 1 ? `<line x1="${73 + i*48}" y1="${92 + (i % 2) * 18}" x2="${85 + i*48}" y2="${92 + ((i+1) % 2) * 18}" stroke="#111827" stroke-width="5"></line>` : ''}`).join('');
        visual(lab, `<svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Kohlenstoffkette">${chain}</svg>`);
        chemStatus(lab, `${count} C-Atome: Kohlenstoffketten können kurz, lang oder verzweigt sein.`);
    }

    function renderLifecycle(lab) {
        visual(lab, `
            <svg width="520" height="190" viewBox="0 0 520 190" role="img" aria-label="Produktkreislauf">
                <path d="M140 95 C150 25 370 25 380 95 C370 165 150 165 140 95" fill="none" stroke="#16a34a" stroke-width="6" stroke-dasharray="12 8"></path>
                ${['Rohstoff', 'Herstellung', 'Nutzung', 'Entsorgung'].map((label, i) => {
                    const pts = [[140,95], [250,42], [380,95], [250,150]][i];
                    return `<g><circle cx="${pts[0]}" cy="${pts[1]}" r="30" fill="#dcfce7" stroke="#16a34a" stroke-width="3"></circle><text x="${pts[0]}" y="${pts[1]+5}" text-anchor="middle" font-size="12" font-weight="800">${label}</text></g>`;
                }).join('')}
            </svg>
        `);
    }

    return { topicInit };
})();
