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
            visual.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            const status = lab.querySelector('.chem-status');
            lab.insertBefore(visual, status || null);
        } else {
            const visual = lab.querySelector('.chem-visual');
            visual.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
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
                lab.dataset.chemSample = button.textContent.trim();
                lab.dataset.chemChoice = button.textContent.trim();
                lab.querySelectorAll('button[data-chem-ph]').forEach((sample) => {
                    sample.setAttribute('aria-pressed', sample === button ? 'true' : 'false');
                });
                updateChemLab(lab);
            });
        });
        lab.querySelectorAll('input[type="range"]').forEach((range) => {
            range.addEventListener('input', () => {
                if (lab.dataset.chemLab === 'ph-scale') {
                    lab.dataset.chemSample = 'Modellprobe';
                    lab.dataset.chemChoice = 'Modellprobe';
                }
                updateChemLab(lab);
            });
            range.setAttribute('aria-valuetext', range.value);
        });
        lab.querySelectorAll('input[type="checkbox"]').forEach((box) => {
            box.addEventListener('change', () => updateChemLab(lab));
        });
        lab.querySelectorAll('select').forEach((select) => {
            select.addEventListener('change', () => updateChemLab(lab));
        });
        lab.addEventListener('click', (event) => {
            const target = event.target.closest('[data-chem-svg-action]');
            if (!target || !lab.contains(target)) return;
            handleChemButton(lab, target.dataset.chemSvgAction);
        });
        lab.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const target = event.target.closest('[data-chem-svg-action]');
            if (!target || !lab.contains(target)) return;
            event.preventDefault();
            handleChemButton(lab, target.dataset.chemSvgAction);
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
        lab.dataset.chemChoice = action;
        lab.querySelectorAll('button[data-chem-action]').forEach((button) => {
            button.setAttribute('aria-pressed', button.dataset.chemAction === action ? 'true' : 'false');
        });
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
            <svg width="100%" height="190" viewBox="0 0 520 190" style="max-width:520px;height:auto;" role="img" aria-label="Chemie Lernweg">
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
            <svg width="100%" height="190" viewBox="0 0 520 190" style="max-width:520px;height:auto;" role="img" aria-label="Sicherheitsstation">
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
        const selected = lab.dataset.chemChoice || 'salt';
        const rows = [
            { id: 'salt', name: 'Salz', fill: '#f8fafc', stroke: '#64748b', note: 'löst sich in Wasser', test: 'Löseprobe + Leitfähigkeit' },
            { id: 'iron', name: 'Eisen', fill: '#cbd5e1', stroke: '#334155', note: 'magnetisch und leitfähig', test: 'Magnet + Stromkreis' },
            { id: 'oil', name: 'Öl', fill: '#fde68a', stroke: '#b45309', note: 'schwimmt auf Wasser', test: 'Dichteprobe + Brennbarkeit nur als Lehrkraftversuch' }
        ];
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Eigenschaftslabor mit Stoffproben">
                <rect x="18" y="22" width="484" height="178" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <rect x="48" y="70" width="150" height="92" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="3"></rect>
                <path d="M55 112 C82 124 116 96 150 112 C168 120 184 116 192 110 L192 154 L55 154 Z" fill="#93c5fd" opacity="0.9"></path>
                <text x="123" y="52" text-anchor="middle" font-size="15" font-weight="900" fill="#0f172a">Wasserprobe</text>
                <g transform="translate(62 92)">
                    ${selected === 'salt' ? '<g><circle cx="38" cy="44" r="4" fill="#64748b"></circle><circle cx="62" cy="34" r="4" fill="#64748b"></circle><circle cx="88" cy="48" r="4" fill="#64748b"></circle><text x="76" y="82" text-anchor="middle" font-size="12" font-weight="800">Salz gelöst</text></g>' : ''}
                    ${selected === 'iron' ? '<g><rect x="36" y="34" width="58" height="16" rx="4" fill="#94a3b8" stroke="#334155" stroke-width="2"></rect><text x="66" y="82" text-anchor="middle" font-size="12" font-weight="800">bleibt fest</text></g>' : ''}
                    ${selected === 'oil' ? '<g><path d="M15 20 C42 8 75 32 111 18 L111 34 C75 48 42 24 15 36 Z" fill="#facc15" stroke="#b45309" stroke-width="2"></path><text x="66" y="82" text-anchor="middle" font-size="12" font-weight="800">schwimmt oben</text></g>' : ''}
                </g>
                <g transform="translate(240 52)">
                    <rect x="0" y="16" width="226" height="122" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"></rect>
                    ${rows.map((row, i) => {
                        const active = row.id === selected;
                        return `<g transform="translate(14 ${32 + i * 34})">
                            <rect x="0" y="-16" width="198" height="28" rx="8" fill="${active ? '#dcfce7' : '#f1f5f9'}" stroke="${active ? '#16a34a' : '#cbd5e1'}" stroke-width="2"></rect>
                            <circle cx="14" cy="-2" r="8" fill="${row.fill}" stroke="${row.stroke}" stroke-width="2"></circle>
                            <text x="30" y="2" font-size="12" font-weight="900" fill="#0f172a">${row.name}</text>
                            <text x="82" y="2" font-size="11" fill="#334155">${row.note}</text>
                        </g>`;
                    }).join('')}
                    <text x="113" y="116" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">passende Prüfung: ${rows.find((row) => row.id === selected)?.test || 'Eigenschaft prüfen'}</text>
                </g>
            </svg>
        `);
    }

    function updateParticleLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const value = Number(range.value);
        range.setAttribute('aria-valuetext', value + ' Prozent Temperaturmodell');
        const gas = value > 70;
        const liquid = value > 35 && value <= 70;
        const stateLabel = gas ? 'Gas' : liquid ? 'Flüssigkeit' : 'Feststoff';
        const particleCount = gas ? 13 : liquid ? 18 : 18;
        const particles = Array.from({ length: particleCount }, (_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const x = gas ? 50 + ((i * 61) % 246) : liquid ? 56 + ((i * 37) % 238) : 70 + col * 36;
            const y = gas ? 50 + ((i * 43) % 82) : liquid ? 76 + ((i * 23) % 58) : 64 + row * 30;
            const dx = gas ? (i % 2 ? -24 : 24) : liquid ? (i % 2 ? -8 : 8) : 0;
            const dy = gas ? ((i % 3) - 1) * 18 : liquid ? 8 : 0;
            const anim = gas
                ? `<animate attributeName="cx" values="${x};${Math.max(42, Math.min(302, x + dx))};${x}" dur="1.25s" repeatCount="indefinite"></animate><animate attributeName="cy" values="${y};${Math.max(42, Math.min(142, y + dy))};${y}" dur="1.25s" repeatCount="indefinite"></animate>`
                : liquid
                    ? `<animate attributeName="cx" values="${x};${x + dx};${x}" dur="1.8s" repeatCount="indefinite"></animate><animate attributeName="cy" values="${y};${y + 7};${y}" dur="1.7s" repeatCount="indefinite"></animate>`
                    : `<animate attributeName="r" values="7.8;8.8;7.8" dur="1.1s" repeatCount="indefinite"></animate>`;
            return `<circle cx="${x}" cy="${y}" r="8" fill="${gas ? '#fca5a5' : liquid ? '#38bdf8' : '#60a5fa'}" stroke="#0f172a" stroke-width="1.5">${anim}</circle>`;
        }).join('');
        visual(lab, `
            <svg class="chem-particle-svg" width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Teilchenmodell">
                <defs>
                    <clipPath id="chemParticleClip"><rect x="26" y="34" width="300" height="126" rx="16"></rect></clipPath>
                </defs>
                <rect x="20" y="24" width="312" height="146" rx="18" fill="#f8fafc" stroke="#64748b" stroke-width="3"></rect>
                <rect x="26" y="34" width="300" height="126" rx="16" fill="${gas ? '#fff7ed' : liquid ? '#eff6ff' : '#f8fafc'}" stroke="#cbd5e1" stroke-width="2"></rect>
                <g clip-path="url(#chemParticleClip)">${particles}</g>
                <text x="176" y="194" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">Teilchen bleiben in der Modellbox</text>
                <g transform="translate(370 28)">
                    <rect width="122" height="144" rx="14" fill="${gas ? '#fed7aa' : liquid ? '#dbeafe' : '#e0f2fe'}" stroke="#2563eb" stroke-width="3"></rect>
                    <text x="61" y="32" text-anchor="middle" font-size="16" font-weight="900">${stateLabel}</text>
                    <line x1="24" y1="54" x2="98" y2="54" stroke="#0f172a" stroke-width="2"></line>
                    <text x="61" y="80" text-anchor="middle" font-size="12" font-weight="800">${gas ? 'große Abstände' : liquid ? 'nahe zusammen' : 'feste Plätze'}</text>
                    <text x="61" y="106" text-anchor="middle" font-size="12">${gas ? 'frei und schnell' : liquid ? 'gleiten vorbei' : 'zittern nur'}</text>
                    <text x="61" y="130" text-anchor="middle" font-size="12">${value}% Temperatur</text>
                </g>
            </svg>
        `);
        chemStatus(lab, gas ? 'Gasmodell: schnelle, freie Teilchen mit großen Abständen.' : liquid ? 'Flüssigkeitsmodell: Teilchen bewegen sich, bleiben aber nahe zusammen.' : 'Feststoffmodell: feste Plätze, nur Zittern.');
    }

    function updateSeparationLab(lab) {
        const mixture = lab.querySelector('select')?.value || 'sandSalt';
        lab.dataset.chemChoice = mixture;
        const data = {
            sandSalt: {
                name: 'Sand + Salz',
                material: '<circle cx="56" cy="74" r="4" fill="#92400e"></circle><circle cx="74" cy="92" r="4" fill="#92400e"></circle><circle cx="96" cy="76" r="3" fill="#f8fafc" stroke="#64748b"></circle><circle cx="116" cy="94" r="3" fill="#f8fafc" stroke="#64748b"></circle>',
                steps: ['lösen', 'filtern', 'eindampfen'],
                result: 'Sand bleibt, Salz kristallisiert'
            },
            ink: {
                name: 'Filzstiftfarbe',
                material: '<path d="M48 95 C70 50 94 122 122 58" fill="none" stroke="#7c3aed" stroke-width="5"></path><path d="M50 100 C74 80 90 128 124 84" fill="none" stroke="#ef4444" stroke-width="4"></path>',
                steps: ['Papier', 'Wasser steigt', 'Farben wandern'],
                result: 'Farbstoffe trennen sich'
            },
            ironSand: {
                name: 'Eisen + Sand',
                material: '<circle cx="58" cy="84" r="4" fill="#92400e"></circle><rect x="78" y="72" width="30" height="8" rx="3" fill="#64748b"></rect><rect x="102" y="94" width="24" height="8" rx="3" fill="#64748b"></rect>',
                steps: ['Magnet', 'Eisen haftet', 'Sand bleibt'],
                result: 'Magnetismus trennt'
            }
        }[mixture];
        const stepIcons = data.steps.map((step, i) => `<g transform="translate(${205 + i * 92} 46)">
            <circle cx="28" cy="28" r="25" fill="#dbeafe" stroke="#2563eb" stroke-width="3"></circle>
            <text x="28" y="33" text-anchor="middle" font-size="17" font-weight="900">${i + 1}</text>
            <text x="28" y="70" text-anchor="middle" font-size="11" font-weight="800">${step}</text>
        </g>`).join('');
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Trennverfahren">
                <defs><marker id="chemArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#2563eb"></path></marker></defs>
                <rect x="18" y="24" width="484" height="164" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <g transform="translate(34 44)">
                    <rect x="0" y="0" width="146" height="116" rx="12" fill="#fef3c7" stroke="#92400e" stroke-width="3"></rect>
                    <text x="73" y="25" text-anchor="middle" font-size="14" font-weight="900">${data.name}</text>
                    ${data.material}
                </g>
                <path d="M188 100 H210" stroke="#2563eb" stroke-width="5" marker-end="url(#chemArrow)"></path>
                ${stepIcons}
                <path d="M456 100 H482" stroke="#2563eb" stroke-width="5" marker-end="url(#chemArrow)"></path>
                <text x="260" y="210" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">${data.result}</text>
            </svg>
        `);
        chemStatus(lab, `${data.name}: Passend ist die Reihenfolge ${data.steps.join(' -> ')}. Begründe mit der Stoffeigenschaft.`);
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
            <svg width="100%" height="190" viewBox="0 0 520 190" style="max-width:520px;height:auto;" role="img" aria-label="Atommodell">
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
        const selected = lab.dataset.chemChoice || 'salt';
        const panel = (id, x, title, subtitle, body) => `
            <g transform="translate(${x} 26)" data-chem-svg-action="${id}" role="button" tabindex="0" style="cursor:pointer;">
                <rect width="148" height="142" rx="14" fill="${selected === id ? '#ecfdf5' : '#f8fafc'}" stroke="${selected === id ? '#16a34a' : '#cbd5e1'}" stroke-width="3"></rect>
                <text x="74" y="23" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${title}</text>
                ${body}
                <text x="74" y="128" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">${subtitle}</text>
            </g>
        `;
        visual(lab, `
            <svg width="100%" height="220" viewBox="0 0 520 220" style="max-width:520px;height:auto;" role="img" aria-label="Bindungsmodelle">
                ${panel('salt', 18, 'Ionengitter', '+ und - ziehen sich an', [0,1,2].map(r => [0,1,2].map(c => {
                    const plus = (r + c) % 2 === 0;
                    return `<g><circle cx="${38 + c * 36}" cy="${48 + r * 28}" r="13" fill="${plus ? '#fca5a5' : '#93c5fd'}" stroke="#0f172a" stroke-width="1.5"></circle><text x="${38 + c * 36}" y="${53 + r * 28}" text-anchor="middle" font-size="14" font-weight="900">${plus ? '+' : '-'}</text></g>`;
                }).join('')).join(''))}
                ${panel('water', 186, 'Wasser', 'Elektronen werden geteilt', `
                    <line x1="74" y1="67" x2="45" y2="95" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"></line>
                    <line x1="74" y1="67" x2="103" y2="95" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"></line>
                    <circle cx="74" cy="64" r="22" fill="#ef4444" stroke="#991b1b" stroke-width="2"></circle>
                    <circle cx="45" cy="95" r="13" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"></circle>
                    <circle cx="103" cy="95" r="13" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"></circle>
                    <text x="74" y="70" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">O</text>
                    <text x="45" y="100" text-anchor="middle" font-size="11" font-weight="900">H</text>
                    <text x="103" y="100" text-anchor="middle" font-size="11" font-weight="900">H</text>
                    <text x="100" y="52" font-size="12" font-weight="900" fill="#2563eb">δ-</text>
                    <text x="24" y="114" font-size="12" font-weight="900" fill="#ef4444">δ+</text>
                `)}
                ${panel('metal', 354, 'Metall', 'Elektronen sind beweglich', `
                    ${[0,1,2].map(r => [0,1,2].map(c => `<circle cx="${38 + c * 36}" cy="${48 + r * 28}" r="12" fill="#cbd5e1" stroke="#64748b" stroke-width="2"></circle>`).join('')).join('')}
                    <path d="M24 106 C46 82 72 120 100 88 C112 76 122 78 132 84" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-dasharray="7 5">
                        <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.4s" repeatCount="indefinite"></animate>
                    </path>
                    <text x="38" y="42" text-anchor="middle" font-size="12" font-weight="900">+</text>
                    <text x="74" y="70" text-anchor="middle" font-size="12" font-weight="900">+</text>
                    <text x="110" y="98" text-anchor="middle" font-size="12" font-weight="900">+</text>
                `)}
                <text x="260" y="202" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">Klicke ein Modell: Das grün markierte Bild gehört zur Rückmeldung.</text>
            </svg>
        `);
    }

    function updateEvidenceLab(lab) {
        const checked = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map((box) => box.value);
        const count = checked.length;
        const gas = checked.includes('gas');
        const heat = checked.includes('heat');
        const color = checked.includes('color');
        const solid = checked.includes('solid');
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Hinweise auf chemische Reaktionen">
                <rect x="32" y="24" width="220" height="164" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <path d="M88 52 H196 L176 170 H108 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></path>
                <path d="M106 116 C128 126 154 106 176 116 L168 160 H114 Z" fill="${color ? '#a855f7' : '#93c5fd'}" opacity="0.85"></path>
                ${gas ? '<g><circle cx="130" cy="92" r="7" fill="#ffffff" stroke="#2563eb" stroke-width="2"><animate attributeName="cy" values="100;70;100" dur="1.4s" repeatCount="indefinite"></animate></circle><circle cx="158" cy="82" r="5" fill="#ffffff" stroke="#2563eb" stroke-width="2"><animate attributeName="cy" values="94;64;94" dur="1.2s" repeatCount="indefinite"></animate></circle></g>' : ''}
                ${solid ? '<g><circle cx="126" cy="148" r="5" fill="#facc15" stroke="#92400e"></circle><circle cx="148" cy="154" r="6" fill="#facc15" stroke="#92400e"></circle><circle cx="164" cy="143" r="4" fill="#facc15" stroke="#92400e"></circle></g>' : ''}
                ${heat ? '<g><path d="M96 194 C92 178 112 178 108 162 C126 176 128 190 114 200 Z" fill="#f97316"></path><path d="M132 198 C128 184 144 182 140 170 C156 184 158 196 146 204 Z" fill="#ef4444"></path><path d="M166 194 C162 180 180 178 176 166 C192 180 194 194 182 202 Z" fill="#f97316"></path></g>' : ''}
                <g transform="translate(290 38)">
                    ${[
                        ['gas', 'Gasbläschen', gas],
                        ['heat', 'Wärme/Licht', heat],
                        ['color', 'neue Farbe', color],
                        ['solid', 'Niederschlag', solid]
                    ].map((item, i) => `<g transform="translate(0 ${i * 38})">
                        <rect x="0" y="0" width="184" height="28" rx="8" fill="${item[2] ? '#dcfce7' : '#f1f5f9'}" stroke="${item[2] ? '#16a34a' : '#cbd5e1'}" stroke-width="2"></rect>
                        <text x="14" y="19" font-size="13" font-weight="900" fill="#0f172a">${item[2] ? '✓' : '–'} ${item[1]}</text>
                    </g>`).join('')}
                </g>
            </svg>
        `);
        chemStatus(lab, count === 0 ? 'Noch keine Beobachtung gewählt.' : count === 1 ? 'Ein Zeichen allein kann ein Hinweis sein. Suche weitere Beobachtungen.' : 'Mehrere Zeichen: Eine chemische Reaktion ist wahrscheinlich. Prüfe, ob neue Stoffe entstanden sind.');
    }

    function updateCombustionLab(lab) {
        const values = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map((x) => x.value);
        const has = (value) => values.includes(value);
        const all = values.length === 3;
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Branddreieck">
                <defs><filter id="chemFireGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>
                <polygon points="260,30 118,174 402,174" fill="${all ? '#fee2e2' : '#f8fafc'}" stroke="#ef4444" stroke-width="4"></polygon>
                ${[
                    ['heat', 260, 54, 'Zündtemperatur'],
                    ['fuel', 166, 162, 'Brennstoff'],
                    ['oxygen', 354, 162, 'Sauerstoff']
                ].map(([key, x, y, label]) => `<g>
                    <circle cx="${x}" cy="${y}" r="24" fill="${has(key) ? '#dcfce7' : '#fee2e2'}" stroke="${has(key) ? '#16a34a' : '#dc2626'}" stroke-width="3"></circle>
                    <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="16" font-weight="900">${has(key) ? '✓' : '–'}</text>
                    <text x="${x}" y="${y + 40}" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">${label}</text>
                </g>`).join('')}
                ${all ? '<path filter="url(#chemFireGlow)" d="M260 126 C232 94 270 78 262 46 C306 78 332 114 294 160 C282 174 238 170 228 148 C220 128 238 120 246 104 C252 116 256 122 260 126 Z" fill="#f97316"></path><path d="M266 142 C250 122 274 110 270 92 C294 112 304 134 286 154 C278 162 254 162 246 150 C240 138 250 134 254 124 Z" fill="#fde047"></path>' : '<text x="260" y="208" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">Zum Löschen genügt es, eine Ecke wegzunehmen.</text>'}
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
        const sample = lab.dataset.chemSample || 'reines Wasser';
        const left = Math.max(2, Math.min(98, value / 14 * 100));
        const strip = lab.querySelector('.chem-ph-strip');
        if (strip) strip.style.cssText = `height:28px;border-radius:8px;background:${color};border:2px solid #0f172a;margin:8px 0;`;
        visual(lab, `
            <svg width="100%" height="250" viewBox="0 0 520 250" style="max-width:520px;height:auto;" role="img" aria-label="pH-Indikator">
                <rect x="22" y="24" width="476" height="190" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <g transform="translate(54 44)">
                    <path d="M34 6 H126 L112 128 H48 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></path>
                    <path d="M49 86 C68 76 92 96 111 84 L106 122 H54 Z" fill="${color}" opacity="0.86"></path>
                    <rect x="147" y="20" width="20" height="122" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2"></rect>
                    <rect x="150" y="${118 - value * 6.5}" width="14" height="${value * 6.5 + 4}" rx="4" fill="${color}"></rect>
                    <text x="80" y="158" text-anchor="middle" font-size="13" font-weight="900">${sample}</text>
                </g>
                <g transform="translate(246 62)">
                    <rect x="0" y="0" width="210" height="28" rx="14" fill="url(#chemPhGradient)" stroke="#0f172a" stroke-width="2"></rect>
                    <line x1="${left * 2.1}" y1="-8" x2="${left * 2.1}" y2="40" stroke="#0f172a" stroke-width="4" stroke-linecap="round"></line>
                    <text x="0" y="58" font-size="11" font-weight="800">0 sauer</text>
                    <text x="96" y="58" text-anchor="middle" font-size="11" font-weight="800">7 neutral</text>
                    <text x="210" y="58" text-anchor="end" font-size="11" font-weight="800">14 basisch</text>
                    <text x="105" y="100" text-anchor="middle" font-size="17" font-weight="900">pH ${value}: ${label}</text>
                    <text x="105" y="126" text-anchor="middle" font-size="12" fill="#334155">Indikatorfarbe vergleichen, nicht probieren.</text>
                </g>
                <defs>
                    <linearGradient id="chemPhGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stop-color="#dc2626"></stop><stop offset="0.28" stop-color="#f97316"></stop><stop offset="0.5" stop-color="#22c55e"></stop><stop offset="0.72" stop-color="#38bdf8"></stop><stop offset="1" stop-color="#2563eb"></stop>
                    </linearGradient>
                </defs>
            </svg>
        `);
        chemStatus(lab, `${sample}: pH ${value}, also ${label}. Neutralisation heißt: vorsichtig Richtung pH 7 bringen.`);
    }

    function updateCrystalLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const days = Number(range.value);
        range.setAttribute('aria-valuetext', days + ' Tage');
        const waterHeight = Math.max(12, 88 - days * 9);
        const crystals = Array.from({ length: days + 2 }, (_, i) => {
            const size = 7 + days * 1.7 + (i % 3);
            return `<rect x="${116 + (i % 5) * 22}" y="${148 - (i % 3) * 9 - days * 2}" width="${size}" height="${size}" transform="rotate(45 ${122 + (i % 5) * 22} ${154 - (i % 3) * 9 - days * 2})" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5"></rect>`;
        }).join('');
        const lattice = [0,1,2].map(r => [0,1,2,3].map(c => `<circle cx="${358 + c * 24}" cy="${78 + r * 24}" r="7" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5"></circle>`).join('')).join('');
        visual(lab, `
            <svg width="100%" height="240" viewBox="0 0 520 240" style="max-width:520px;height:auto;" role="img" aria-label="Kristallbildung">
                <rect x="24" y="28" width="472" height="174" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <g transform="translate(54 36)">
                    <path d="M56 20 H204 L176 156 H84 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"></path>
                    <path d="M84 ${156 - waterHeight} C114 ${146 - waterHeight} 146 ${166 - waterHeight} 176 ${156 - waterHeight} L168 154 H92 Z" fill="#bfdbfe" opacity="0.75"></path>
                    ${crystals}
                    <path d="M72 14 C56 4 70 -10 92 0 M104 10 C88 -4 108 -20 130 -6 M144 10 C130 -4 148 -20 170 -6" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" opacity="${days > 1 ? 0.9 : 0.2}"></path>
                    <text x="130" y="180" text-anchor="middle" font-size="13" font-weight="900">Tag ${days}: Wasser verdunstet</text>
                </g>
                <g transform="translate(318 44)">
                    <circle cx="72" cy="70" r="58" fill="#ffffff" stroke="#2563eb" stroke-width="4"></circle>
                    ${lattice}
                    <text x="72" y="154" text-anchor="middle" font-size="12" font-weight="900">Lupe: Ordnung im Kristall</text>
                </g>
            </svg>
        `);
        chemStatus(lab, `Tag ${days}: Je langsamer Wasser verdunstet, desto geordneter können Kristalle wachsen.`);
    }

    function renderRedox(lab) {
        const selected = lab.dataset.chemChoice || 'salt';
        const tubes = [
            { id: 'dry', label: 'trocken', rust: 1, water: 0, note: 'kaum Wasser' },
            { id: 'water', label: 'Wasser', rust: 2, water: 48, note: 'Wasser + Luft' },
            { id: 'salt', label: 'Salzwasser', rust: 4, water: 58, note: 'Ionen beschleunigen' },
            { id: 'oil', label: 'Ölschicht', rust: 1, water: 44, note: 'Schutzschicht' }
        ];
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Rostversuch">
                ${tubes.map((tube, i) => `<g transform="translate(${38 + i * 122} 28)" data-chem-svg-action="${tube.id}" role="button" tabindex="0" style="cursor:pointer;">
                    <rect x="-8" y="-8" width="96" height="166" rx="12" fill="${selected === tube.id ? '#ecfdf5' : '#ffffff'}" stroke="${selected === tube.id ? '#16a34a' : '#cbd5e1'}" stroke-width="3"></rect>
                    <path d="M12 14 H68 L58 124 H22 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="3"></path>
                    ${tube.water ? `<path d="M23 ${130 - tube.water} C36 ${122 - tube.water} 47 ${137 - tube.water} 57 ${129 - tube.water} L54 120 H26 Z" fill="#bfdbfe" opacity="0.8"></path>` : ''}
                    ${tube.id === 'oil' ? '<path d="M24 70 C36 63 48 78 58 70 L56 83 H26 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"></path>' : ''}
                    <line x1="40" y1="28" x2="40" y2="112" stroke="#78716c" stroke-width="9" stroke-linecap="round"></line>
                    ${Array.from({ length: tube.rust }, (_, r) => `<circle cx="${34 + (r % 2) * 14}" cy="${58 + r * 15}" r="${5 + r}" fill="#b45309" opacity="0.86"></circle>`).join('')}
                    <text x="40" y="146" text-anchor="middle" font-size="12" font-weight="900">${tube.label}</text>
                    <text x="40" y="162" text-anchor="middle" font-size="10" fill="#334155">${tube.note}</text>
                </g>`).join('')}
            </svg>
        `);
    }

    function updateCarbonLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const count = Number(range.value);
        range.setAttribute('aria-valuetext', count + ' Kohlenstoffatome');
        const chain = Array.from({ length: count }, (_, i) => {
            const x = 58 + i * 48;
            const y = 96 + (i % 2) * 18;
            const branch = count >= 6 && i === 3;
            return `<g>
                ${i < count - 1 ? `<line x1="${x + 18}" y1="${y}" x2="${x + 30}" y2="${96 + ((i + 1) % 2) * 18}" stroke="#111827" stroke-width="5"></line>` : ''}
                <circle cx="${x}" cy="${y}" r="18" fill="#111827"></circle><text x="${x}" y="${y + 6}" text-anchor="middle" fill="white" font-weight="900">C</text>
                ${branch ? `<line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y - 44}" stroke="#111827" stroke-width="4"></line><circle cx="${x}" cy="${y - 62}" r="16" fill="#111827"></circle><text x="${x}" y="${y - 56}" text-anchor="middle" fill="white" font-weight="900">C</text>` : ''}
            </g>`;
        }).join('');
        visual(lab, `
            <svg width="100%" height="220" viewBox="0 0 520 220" style="max-width:520px;height:auto;" role="img" aria-label="Kohlenstoffkette">
                <rect x="22" y="24" width="476" height="164" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                ${chain}
                <g transform="translate(330 54)">
                    <rect x="0" y="0" width="138" height="88" rx="12" fill="#ecfeff" stroke="#0891b2" stroke-width="3"></rect>
                    <text x="69" y="27" text-anchor="middle" font-size="13" font-weight="900">Je länger die Kette,</text>
                    <text x="69" y="50" text-anchor="middle" font-size="12">desto andere Eigenschaften:</text>
                    <text x="69" y="72" text-anchor="middle" font-size="12" font-weight="800">${count >= 6 ? 'zäher / höherer Siedepunkt' : 'leichter beweglich'}</text>
                </g>
            </svg>
        `);
        chemStatus(lab, `${count} C-Atome: Kohlenstoffketten können kurz, lang oder verzweigt sein.`);
    }

    function renderLifecycle(lab) {
        const selected = lab.dataset.chemChoice || 'reuse';
        const decisions = {
            single: 'Einweg: schnell, aber meist mehr Abfall.',
            reuse: 'Mehrweg: stark, wenn oft verwendet.',
            repair: 'Reparieren: spart Rohstoffe am deutlichsten.',
            recycle: 'Recycling: hilfreich, aber nicht verlustfrei.'
        };
        visual(lab, `
            <svg width="100%" height="240" viewBox="0 0 520 240" style="max-width:520px;height:auto;" role="img" aria-label="Produktkreislauf">
                <defs><marker id="chemLoopArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#16a34a"></path></marker></defs>
                <path d="M130 112 C138 34 375 34 390 112 C375 190 138 190 130 112" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round" stroke-dasharray="13 8" marker-end="url(#chemLoopArrow)"></path>
                ${['Rohstoff', 'Herstellung', 'Nutzung', 'Abfall?'].map((label, i) => {
                    const pts = [[130,112], [250,48], [390,112], [250,178]][i];
                    return `<g><circle cx="${pts[0]}" cy="${pts[1]}" r="34" fill="#dcfce7" stroke="#16a34a" stroke-width="3"></circle><text x="${pts[0]}" y="${pts[1]+5}" text-anchor="middle" font-size="12" font-weight="900">${label}</text></g>`;
                }).join('')}
                <g transform="translate(34 34)">
                    ${[
                        ['single', 'Einweg'],
                        ['reuse', 'Mehrweg'],
                        ['repair', 'Reparatur'],
                        ['recycle', 'Recycling']
                    ].map(([id, label], i) => `<g transform="translate(0 ${i * 35})" data-chem-svg-action="${id}" role="button" tabindex="0" style="cursor:pointer;">
                        <rect width="102" height="26" rx="8" fill="${selected === id ? '#fef3c7' : '#f8fafc'}" stroke="${selected === id ? '#d97706' : '#cbd5e1'}" stroke-width="2"></rect>
                        <text x="51" y="18" text-anchor="middle" font-size="11" font-weight="900">${label}</text>
                    </g>`).join('')}
                </g>
                <text x="260" y="222" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">${decisions[selected] || decisions.reuse}</text>
            </svg>
        `);
    }

    return { topicInit };
})();
