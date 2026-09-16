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
    const particleCanvasStates = new WeakMap();
    const REACTIONS = {
        peroxide: {
            title: 'Wasserstoffperoxid zerlegen',
            left: [{ key: 'a', formula: 'H<sub>2</sub>O<sub>2</sub>', plain: 'H2O2', atoms: { H: 2, O: 2 }, color: '#60a5fa' }],
            right: [
                { key: 'b', formula: 'H<sub>2</sub>O', plain: 'H2O', atoms: { H: 2, O: 1 }, color: '#2563eb' },
                { key: 'c', formula: 'O<sub>2</sub>', plain: 'O2', atoms: { O: 2 }, color: '#38bdf8' }
            ],
            start: { a: 1, b: 1, c: 1, d: 0 },
            target: { a: 2, b: 2, c: 1, d: 0 },
            hint: 'Zähle H und O getrennt. Der Katalysator beschleunigt die Reaktion und wird hier nicht als Produkt gezählt.'
        },
        methane: {
            title: 'Methan verbrennen',
            left: [
                { key: 'a', formula: 'CH<sub>4</sub>', plain: 'CH4', atoms: { C: 1, H: 4 }, color: '#111827' },
                { key: 'b', formula: 'O<sub>2</sub>', plain: 'O2', atoms: { O: 2 }, color: '#38bdf8' }
            ],
            right: [
                { key: 'c', formula: 'CO<sub>2</sub>', plain: 'CO2', atoms: { C: 1, O: 2 }, color: '#64748b' },
                { key: 'd', formula: 'H<sub>2</sub>O', plain: 'H2O', atoms: { H: 2, O: 1 }, color: '#2563eb' }
            ],
            start: { a: 1, b: 1, c: 1, d: 1 },
            target: { a: 1, b: 2, c: 1, d: 2 },
            hint: 'Beim Verbrennen werden Atome nicht weggezaubert: 1 C, 4 H und 4 O müssen auf beiden Seiten stehen.'
        },
        hydrogen: {
            title: 'Wasser bilden',
            left: [
                { key: 'a', formula: 'H<sub>2</sub>', plain: 'H2', atoms: { H: 2 }, color: '#60a5fa' },
                { key: 'b', formula: 'O<sub>2</sub>', plain: 'O2', atoms: { O: 2 }, color: '#38bdf8' }
            ],
            right: [
                { key: 'c', formula: 'H<sub>2</sub>O', plain: 'H2O', atoms: { H: 2, O: 1 }, color: '#2563eb' }
            ],
            start: { a: 1, b: 1, c: 1, d: 0 },
            target: { a: 2, b: 1, c: 2, d: 0 },
            hint: 'Die kleinste passende Einstellung ist 2 H2 + 1 O2 -> 2 H2O.'
        }
    };

    function topicInit() {
        document.querySelectorAll('.chem-lab.interactive-zone, .chem-lab').forEach((lab) => {
            if (lab.dataset.chemReady === 'true') return;
            lab.dataset.chemReady = 'true';
            if (lab.dataset.chemLab === 'evidence-cases') {
                initEvidenceCases(lab);
                return;
            }
            if (lab.dataset.chemLab === 'separation-planner') {
                initSeparationPlanner(lab);
                return;
            }
            prepareLab(lab);
            bindLab(lab);
            updateChemLab(lab);
        });
    }

    function initEvidenceCases(lab) {
        const select = lab.querySelector('[data-evidence-select]');
        const cards = [...lab.querySelectorAll('[data-evidence-case]')];
        const verdict = lab.querySelector('.evidence-verdict');
        const feedback = lab.querySelector('[data-evidence-feedback]');
        const nextFeedback = lab.querySelector('[data-evidence-next-feedback]');
        const toggle = lab.querySelector('[data-evidence-toggle]');
        const choices = [...lab.querySelectorAll('[data-evidence-verdict]')];
        const nextChoices = [...lab.querySelectorAll('[data-evidence-next]')];
        const active = () => cards.find(card => card.dataset.evidenceCase === select.value);
        function clearAnswers() {
            feedback.textContent = '';
            nextFeedback.textContent = '';
            delete feedback.dataset.correct;
            delete nextFeedback.dataset.correct;
            [...choices, ...nextChoices].forEach(button => button.setAttribute('aria-pressed', 'false'));
        }
        function showCase() {
            const card = active();
            cards.forEach(item => {
                item.hidden = item !== card;
                item.querySelector('[data-evidence-extra]').hidden = true;
            });
            const task = card.querySelector('.evidence-next-task');
            card.insertBefore(verdict, task);
            task.append(nextFeedback);
            toggle.setAttribute('aria-controls', card.querySelector('[data-evidence-extra]').id);
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Zusatzinformation zeigen';
            clearAnswers();
        }
        select.addEventListener('change', showCase);
        toggle.addEventListener('click', () => {
            const extra = active().querySelector('[data-evidence-extra]');
            extra.hidden = !extra.hidden;
            toggle.setAttribute('aria-expanded', String(!extra.hidden));
            toggle.textContent = extra.hidden ? 'Zusatzinformation zeigen' : 'Nur erste Beschreibung zeigen';
            clearAnswers();
        });
        choices.forEach(button => button.addEventListener('click', () => {
            const card = active();
            const phase = card.querySelector('[data-evidence-extra]').hidden ? 'first' : 'second';
            const correct = button.dataset.evidenceVerdict === card.dataset[phase];
            choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
            feedback.dataset.correct = String(correct);
            feedback.textContent = (correct ? 'Passende Einordnung: ' : 'Prüfe deine Einordnung: ') + card.querySelector('[data-evidence-' + phase + ']').content.textContent;
        }));
        nextChoices.forEach(button => button.addEventListener('click', () => {
            nextChoices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
            nextFeedback.dataset.correct = button.dataset.correct;
            nextFeedback.textContent = (button.dataset.correct === 'true' ? 'Passender Vergleich: ' : 'Das reicht noch nicht: ') + button.dataset.explain;
        }));
        lab.querySelector('[data-evidence-reset]').addEventListener('click', () => {
            select.selectedIndex = 0;
            showCase();
            select.focus();
        });
        showCase();
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
            visual.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            const status = lab.querySelector('.chem-status');
            lab.insertBefore(visual, status || null);
        } else {
            const visual = lab.querySelector('.chem-visual');
            visual.removeAttribute('aria-hidden');
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
                <button type="button" data-chem-ph="8">Natronlösung</button>
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
                    lab.querySelectorAll('button[data-chem-ph]').forEach(button => button.setAttribute('aria-pressed', 'false'));
                    lab.dataset.chemSample = 'Modellprobe';
                    lab.dataset.chemChoice = 'Modellprobe';
                }
                updateChemLab(lab);
            });
            range.setAttribute('aria-valuetext', range.value);
        });
        lab.querySelectorAll('input[type="number"]').forEach((input) => {
            input.addEventListener('input', () => updateChemLab(lab));
            input.addEventListener('change', () => updateChemLab(lab));
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
                grade3: 'Grundlagenblock: Sicherheit, Stoffe im Alltag, Eigenschaften, Teilchenmodell und Trennverfahren. Danach folgen Atome, Bindungen und Lösungen.',
                grade4: 'Vor Reaktionen und Anwendungen: Atome, Bindungen und Lösungen wiederholen. Danach folgen Reaktionen, Verbrennung, Säuren/Basen, Redox, Kohlenstoff- und Umweltchemie.',
                review: 'Wiederholung: Prüfe zuerst Stoffeigenschaften, Trennverfahren und Teilchenmodell. Diese Grundlagen brauchst du für Reaktionen und Bindungen.'
            },
            'safety-sort': {
                eyes: 'Sofort mit viel fließendem Wasser an der Augendusche spülen und gleichzeitig Hilfe rufen. Nicht abwarten, nicht reiben. Die Lehrkraft organisiert weitere Hilfe.',
                smell: 'Unerwarteter Geruch: Arbeit unterbrechen, Abstand halten und die Lehrkraft sofort informieren. Nicht näher herangehen und nicht durch Zufächeln nachforschen.',
                spill: 'Abstand halten, andere warnen und die Lehrkraft informieren. Nicht selbst wegwischen oder andere Stoffe zugeben. Die Lehrkraft legt das weitere Vorgehen fest.'
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
                salt: 'Kochsalz: Entgegengesetzt geladene Ionen bilden ein Gitter. Verschobene Ebenen können gleichnamige Ladungen nebeneinander bringen: Abstoßung begünstigt den Bruch. Nicht alle Salze lösen sich gut in Wasser.',
                water: 'Wasser: Gemeinsame Elektronenpaare verbinden die Atome im Molekül. Teilladungen bewirken zusätzlich Anziehung zwischen Molekülen. Beim gewöhnlichen Verdampfen bleiben die H₂O-Moleküle erhalten.',
                metal: 'Metall: Atomrümpfe und bewegliche Elektronen. Deshalb leiten Metalle Strom und Wärme.'
            },
            redox: {
                dry: 'Kontrolliert trockene Luft: Im vereinfachten Modell kein sichtbarer Rost. Ein leeres Glas allein garantiert keine trockene Luft.',
                water: 'Wasser: Rost kann entstehen, wenn auch Sauerstoff dazukommt.',
                salt: 'Salzwasser: Bei vergleichbaren Bedingungen können gelöste Ionen die Korrosion beschleunigen. Die Punkte sind keine gemessene Rostmenge.',
                oil: 'Zuvor abgekochtes Wasser unter Öl: vermindertes Sauerstoffangebot. Öl bremst erneuten Zutritt; Öl allein entfernt keinen bereits gelösten Sauerstoff.'
            },
            lifecycle: {
                single: 'Einweg kann praktisch sein, erzeugt aber oft mehr Abfall.',
                reuse: 'Mehrweg ist stark, wenn Reinigung und Transport sinnvoll bleiben.',
                repair: 'Reparieren spart Rohstoffe und verlängert die Nutzungszeit.',
                recycle: 'Recycling hilft, ersetzt aber nicht Vermeiden und Wiederverwenden.'
            },
            'reaction-builder': {
                methane: 'Methan-Reaktion gewählt: Stelle die Zahlen so ein, dass links und rechts gleich viele C-, H- und O-Atome stehen.',
                hydrogen: 'Wasser-Reaktion gewählt: Die kleinste passende Lösung ist 2 H2 + 1 O2 -> 2 H2O.',
                reset: 'Startwerte geladen. Zähle jetzt die Atome links und rechts.'
            }
        };

        if (type === 'reaction-builder') {
            setReactionBuilderPreset(lab, action);
        }
        chemStatus(lab, messages[type]?.[action] || 'Gute Beobachtung. Begründe mit Stoffeigenschaft, Teilchenmodell oder Reaktion.');
        updateChemLab(lab);
    }

    function updateChemLab(lab) {
        const type = lab.dataset.chemLab;
        if (type === 'reuse-balance') updateReuseBalance(lab);
        if (type === 'roadmap') renderRoadmap(lab);
        if (type === 'safety-sort') renderSafety(lab);
        if (type === 'properties') renderProperties(lab);
        if (type === 'particles') updateParticleLab(lab);
        if (type === 'separation') updateSeparationLab(lab);
        if (type === 'atom-builder') updateAtomLab(lab);
        if (type === 'bonding') renderBonding(lab);
        if (type === 'reaction-evidence') updateEvidenceLab(lab);
        if (type === 'reaction-builder') updateReactionBuilder(lab);
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
                <defs>
                    <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
                    <linearGradient id="nodeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde047"/><stop offset="1" stop-color="#eab308"/></linearGradient>
                    <filter id="roadGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <path d="M40 145 C110 50 180 145 245 72 S390 112 470 42" fill="none" stroke="url(#roadGradient)" stroke-width="8" stroke-linecap="round" stroke-dasharray="12 12" filter="url(#roadGlow)">
                    <animate attributeName="stroke-dashoffset" from="48" to="0" dur="2s" repeatCount="indefinite"/>
                </path>
                ${['Sicherheit', 'Stoffe', 'Teilchen', 'Reaktionen', 'Umwelt'].map((label, i) => {
                    const pts = [[40,145], [155,78], [260,78], [370,110], [470,42]][i];
                    return `<g transform="translate(${pts[0]} ${pts[1]})">
                        <circle cx="0" cy="0" r="22" fill="url(#nodeGradient)" stroke="#854d0e" stroke-width="3" filter="url(#roadGlow)"></circle>
                        <text x="0" y="5" text-anchor="middle" font-size="16" font-weight="900" fill="#713f12">${i+1}</text>
                        <text x="0" y="44" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${label}</text>
                    </g>`;
                }).join('')}
            </svg>
        `);
    }

    function renderSafety(lab) {
        visual(lab, `
            <svg width="100%" height="190" viewBox="0 0 520 190" style="max-width:520px;height:auto;" role="img" aria-label="Sicherheitsstation">
                <defs>
                    <linearGradient id="safetyRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fca5a5"/><stop offset="1" stop-color="#ef4444"/></linearGradient>
                    <linearGradient id="safetyBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
                    <linearGradient id="safetyGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#22c55e"/></linearGradient>
                    <filter id="safetyShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.2"/></filter>
                </defs>
                <g filter="url(#safetyShadow)">
                    <rect x="28" y="32" width="120" height="120" rx="18" fill="url(#safetyRed)" stroke="#991b1b" stroke-width="4"></rect>
                    <polygon points="88,48 112,96 64,96" fill="#fff" stroke="#991b1b" stroke-width="3" stroke-linejoin="round"/>
                    <text x="88" y="86" text-anchor="middle" font-size="28" font-weight="900" fill="#991b1b">!</text>
                    <text x="88" y="132" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">Etikett lesen</text>
                </g>
                <g filter="url(#safetyShadow)">
                    <rect x="200" y="32" width="120" height="120" rx="18" fill="url(#safetyBlue)" stroke="#1e40af" stroke-width="4"></rect>
                    <path d="M220 76 C236 76 244 88 248 94 C252 88 260 76 276 76 C292 76 296 88 296 94" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
                    <rect x="222" y="78" width="30" height="20" rx="8" fill="#e0f2fe" stroke="#1e40af" stroke-width="3"/>
                    <rect x="268" y="78" width="30" height="20" rx="8" fill="#e0f2fe" stroke="#1e40af" stroke-width="3"/>
                    <path d="M252 88 H268" stroke="#1e40af" stroke-width="4" stroke-linecap="round"/>
                    <text x="260" y="132" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">Brille tragen</text>
                </g>
                <g filter="url(#safetyShadow)">
                    <rect x="372" y="32" width="120" height="120" rx="18" fill="url(#safetyGreen)" stroke="#166534" stroke-width="4"></rect>
                    <path d="M402 85 l18 18 38 -45" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <text x="432" y="132" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">melden</text>
                </g>
            </svg>
        `);
    }

    function renderProperties(lab) {
        const selected = lab.dataset.chemChoice || '';
        const rows = [
            { id: 'salt', name: 'Salz', fill: '#f8fafc', stroke: '#64748b', note: 'löst sich in Wasser', test: 'Löseprobe + Leitfähigkeit' },
            { id: 'iron', name: 'Eisen', fill: '#cbd5e1', stroke: '#334155', note: 'magnetisch und leitfähig', test: 'Magnetprobe; Leitfähigkeit mit geeignetem Schulgerät' },
            { id: 'oil', name: 'Öl', fill: '#fde68a', stroke: '#b45309', note: 'schwimmt auf Wasser', test: 'Schichtenbildung und Dichte vergleichen' }
        ];
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Eigenschaftslabor mit Stoffproben">
                <rect x="18" y="22" width="484" height="178" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <rect x="48" y="70" width="150" height="92" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="3"></rect>
                <path d="M55 112 C82 124 116 96 150 112 C168 120 184 116 192 110 L192 154 L55 154 Z" fill="#93c5fd" opacity="0.9"></path>
                <text x="123" y="52" text-anchor="middle" font-size="15" font-weight="900" fill="#0f172a">Wasserprobe</text>
                <g transform="translate(62 92)">
                    ${selected === 'salt' ? '<g><text x="76" y="82" text-anchor="middle" font-size="12" font-weight="800">Salz gelöst</text></g>' : ''}
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
                </g>
            </svg>
            <p class="property-test">Passende Prüfung: ${rows.find(row => row.id === selected)?.test || 'Wähle eine Vergleichsprobe.'}</p>
            <p>Die Grafik ist schematisch. Gelöste Salzteilchen sind nicht als Körnchen sichtbar. Eine passende Prüfung grenzt Kandidaten ein; sie bestimmt nicht automatisch jede unbekannte Probe.</p>
        `);
    }

    function updateParticleLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const value = Number(range.value);
        range.setAttribute('aria-valuetext', 'Relative Modellstufe ' + value);
        const gas = value > 70;
        const liquid = value > 35 && value <= 70;
        const stateLabel = gas ? 'Gas' : liquid ? 'Flüssigkeit' : 'Feststoff';
        if (!lab.querySelector('.chem-particle-canvas')) {
            visual(lab, `
                <div class="chem-canvas-model" style="display:grid;grid-template-columns:minmax(0,1fr) 140px;gap:12px;align-items:center;max-width:560px;margin:0 auto;text-align:left;">
                    <canvas class="chem-particle-canvas" width="520" height="250" style="width:100%;height:auto;border:3px solid #64748b;border-radius:16px;background:#f8fafc;" aria-label="Dynamisches Teilchenmodell"></canvas>
                    <div class="chem-particle-readout" style="border:3px solid #2563eb;border-radius:14px;background:#eff6ff;padding:10px;color:#0f172a;">
                        <strong data-chem-particle-state>Feststoff</strong>
                        <p data-chem-particle-distance style="margin:.45rem 0 0;font-size:.9rem;">feste Plätze</p>
                        <p data-chem-particle-speed style="margin:.3rem 0 0;font-size:.9rem;">zittern nur</p>
                        <p data-chem-particle-temp style="margin:.55rem 0 0;font-weight:800;">20% Temperatur</p>
                    </div>
                </div>
            `);
        }
        const readout = {
            state: lab.querySelector('[data-chem-particle-state]'),
            distance: lab.querySelector('[data-chem-particle-distance]'),
            speed: lab.querySelector('[data-chem-particle-speed]'),
            temp: lab.querySelector('[data-chem-particle-temp]')
        };
        if (readout.state) readout.state.textContent = stateLabel;
        if (readout.distance) readout.distance.textContent = gas ? 'große Abstände' : liquid ? 'nahe zusammen' : 'feste Plätze';
        if (readout.speed) readout.speed.textContent = gas ? 'frei und schnell' : liquid ? 'gleiten aneinander vorbei' : 'zittern um feste Orte';
        if (readout.temp) readout.temp.textContent = `Modellstufe ${value}`;
        updateParticleCanvas(lab, value);
        chemStatus(lab, gas ? 'Gasmodell: schnelle, freie Teilchen mit großen Abständen.' : liquid ? 'Flüssigkeitsmodell: Teilchen bewegen sich, bleiben aber nahe zusammen.' : 'Feststoffmodell: feste Plätze, nur Zittern.');
    }

    function particleMode(value) {
        if (value > 70) return 'gas';
        if (value > 35) return 'liquid';
        return 'solid';
    }

    function makeParticles(mode) {
        const count = 22;
        return Array.from({ length: count }, (_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const anchorX = 68 + col * 42;
            const anchorY = 66 + row * 34;
            const x = mode === 'gas' ? 50 + ((i * 67) % 420) : mode === 'liquid' ? 72 + ((i * 53) % 360) : anchorX;
            const y = mode === 'gas' ? 54 + ((i * 41) % 142) : mode === 'liquid' ? 98 + ((i * 31) % 82) : anchorY;
            return {
                x,
                y,
                anchorX,
                anchorY,
                vx: (mode === 'gas' ? 1.2 : 0.45) * (i % 2 ? 1 : -1),
                vy: (mode === 'gas' ? 1.1 : 0.35) * (i % 3 === 0 ? 1 : -1),
                phase: i * 0.7
            };
        });
    }

    function updateParticleCanvas(lab, value) {
        const canvas = lab.querySelector('.chem-particle-canvas');
        if (!canvas || !canvas.getContext) return;
        const mode = particleMode(value);
        let state = particleCanvasStates.get(lab);
        if (!state || state.canvas !== canvas || state.mode !== mode) {
            state = {
                canvas,
                ctx: canvas.getContext('2d'),
                mode,
                value,
                particles: makeParticles(mode),
                running: Boolean(state?.running && state.canvas === canvas),
                startedAt: performance.now()
            };
            particleCanvasStates.set(lab, state);
        }
        state.value = value;
        state.mode = mode;
        if (!state.running) {
            state.running = true;
            requestAnimationFrame((time) => drawParticleCanvas(lab, time));
        }
    }

    function drawParticleCanvas(lab, time) {
        const state = particleCanvasStates.get(lab);
        if (!state || !state.canvas.isConnected) return;
        const { canvas, ctx, particles, mode } = state;
        const speed = 0.25 + state.value / 45;
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = mode === 'gas' ? '#fff7ed' : mode === 'liquid' ? '#eff6ff' : '#f8fafc';
        roundRect(ctx, 22, 22, width - 44, height - 44, 18);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 14px system-ui, sans-serif';
        ctx.fillText('Dynamisches Mikromodell', 36, 48);
        ctx.font = '600 12px system-ui, sans-serif';
        ctx.fillText(mode === 'gas' ? 'Gas: freie elastische Bewegung' : mode === 'liquid' ? 'Flüssigkeit: Bewegung mit lockerer Anziehung' : 'Feststoff: feste Plätze, nur Schwingung', 36, 226);

        const minX = 38;
        const maxX = width - 38;
        const minY = 58;
        const maxY = height - 50;
        particles.forEach((p, i) => {
            if (mode === 'solid') {
                p.x = p.anchorX + Math.sin(time / 120 + p.phase) * (2 + state.value / 35);
                p.y = p.anchorY + Math.cos(time / 130 + p.phase) * (2 + state.value / 40);
            } else {
                const attraction = mode === 'liquid' ? 0.004 : 0;
                p.vx += (260 - p.x) * attraction;
                p.vy += (132 - p.y) * attraction;
                p.x += p.vx * speed;
                p.y += p.vy * speed;
                if (p.x < minX || p.x > maxX) p.vx *= -1;
                if (p.y < minY || p.y > maxY) p.vy *= -1;
                p.x = Math.max(minX, Math.min(maxX, p.x));
                p.y = Math.max(minY, Math.min(maxY, p.y));
            }
            if (mode === 'liquid') {
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dx = other.x - p.x;
                    const dy = other.y - p.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 58) {
                        ctx.globalAlpha = Math.max(0, (58 - dist) / 58) * 0.35;
                        ctx.strokeStyle = '#2563eb';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
                ctx.globalAlpha = 1;
            }
        });

        particles.forEach((p) => {
            ctx.beginPath();
            ctx.fillStyle = mode === 'gas' ? '#fca5a5' : mode === 'liquid' ? '#38bdf8' : '#60a5fa';
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.arc(p.x, p.y, 8.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        if (mode === 'solid') {
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1.5;
            particles.forEach((p, i) => {
                const right = particles.find((other, j) => j !== i && Math.abs(other.anchorX - p.anchorX - 42) < 1 && Math.abs(other.anchorY - p.anchorY) < 1);
                const down = particles.find((other, j) => j !== i && Math.abs(other.anchorY - p.anchorY - 34) < 1 && Math.abs(other.anchorX - p.anchorX) < 1);
                [right, down].filter(Boolean).forEach((other) => {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                });
            });
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame((nextTime) => drawParticleCanvas(lab, nextTime));
    }

    function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    function updateSeparationLab(lab) {
        const mixture = lab.querySelector('select')?.value || 'sandSalt';
        lab.dataset.chemChoice = mixture;
        const data = {
            sandSalt: {
                name: 'Sand + Salz',
                material: '<circle cx="56" cy="74" r="4" fill="#92400e"></circle><circle cx="74" cy="92" r="4" fill="#92400e"></circle><circle cx="96" cy="76" r="3" fill="#f8fafc" stroke="#64748b"></circle><circle cx="116" cy="94" r="3" fill="#f8fafc" stroke="#64748b"></circle>',
                steps: ['lösen', 'filtern', 'eindampfen'],
                result: 'Sand im Filter, Salz nach Eindampfen', explanation: 'Salz wird in ausreichend Wasser gelöst. Sand bleibt beim Filtern zurück; gelöstes Salz passiert den Filter und wird anschließend durch Entfernen des Wassers zurückgewonnen.'
            },
            ink: {
                name: 'Filzstiftfarbe',
                material: '<path d="M48 95 C70 50 94 122 122 58" fill="none" stroke="#7c3aed" stroke-width="5"></path><path d="M50 100 C74 80 90 128 124 84" fill="none" stroke="#ef4444" stroke-width="4"></path>',
                steps: ['Papier', 'Wasser steigt', 'Farben wandern'],
                result: 'Geeignete Farbstoffe trennen sich', explanation: 'Das Laufmittel und die Wechselwirkung mit dem Papier müssen zu den Farbstoffen passen. Wasser eignet sich nicht für jede Filzstiftfarbe.'
            },
            ironSand: {
                name: 'Eisen + Sand',
                material: '<circle cx="58" cy="84" r="4" fill="#92400e"></circle><rect x="78" y="72" width="30" height="8" rx="3" fill="#64748b"></rect><rect x="102" y="94" width="24" height="8" rx="3" fill="#64748b"></rect>',
                steps: ['Magnet', 'Eisen haftet', 'Sand bleibt'],
                result: 'Magnetismus trennt', explanation: 'In diesem Modell wird Eisen vom Magneten angezogen, der verwendete Sand nicht. Nicht jedes Metall ist magnetisch.'
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
        chemStatus(lab, `${data.name}: Passend ist die Reihenfolge ${data.steps.join(' -> ')}. ${data.explanation}`);
    }

    function updateAtomLab(lab) {
        const ranges = lab.querySelectorAll('input[type="range"]');
        const p = Number(ranges[0].value);
        const e = Number(ranges[1].value);
        const n = ranges[2] ? Number(ranges[2].value) : null;
        ranges[0].setAttribute('aria-valuetext', p + ' Protonen');
        ranges[1].setAttribute('aria-valuetext', e + ' Elektronen');
        if (ranges[2]) ranges[2].setAttribute('aria-valuetext', n + ' Neutronen');
        const element = ELEMENTS[p] || { symbol: '?', name: 'unbekannt' };
        const charge = p === e ? 'neutral' : p > e ? 'positives Ion' : 'negatives Ion';
        const chargeNumber = p - e;
        const chargeText = chargeNumber > 0 ? '+' + chargeNumber : String(chargeNumber).replace('-', '−');
        const electrons = Array.from({ length: e }, (_, i) => {
            const shell = i < 2 ? 42 : 70;
            const countOnShell = i < 2 ? Math.min(e, 2) : Math.max(e - 2, 1);
            const indexOnShell = i < 2 ? i : i - 2;
            const angle = (Math.PI * 2 * indexOnShell / countOnShell) - Math.PI / 2;
            return `<circle data-atom-electron="true" cx="${260 + Math.cos(angle) * shell}" cy="${92 + Math.sin(angle) * shell}" r="6" fill="#2563eb"></circle>`;
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
                ${n === null ? '' : `<text x="42" y="134" font-size="13">${n} Neutronen</text>`}
                <text x="366" y="64" font-size="14" font-weight="800">${charge}</text>
                <text x="366" y="88" font-size="13">Ladungszahl: ${chargeText}</text>
                ${n === null ? '' : `<text x="366" y="112" font-size="13">Massenzahl: ${p + n}</text>`}
            </svg>
        `);
        chemStatus(lab, `${element.name}: ${p} Protonen, ${e} Elektronen${n === null ? '' : `, ${n} Neutronen`}. ${charge}; Ladungszahl ${chargeText}.${n === null ? '' : ` Massenzahl ${p + n}.`} Rechenmodell: keine Aussage über Existenz oder Stabilität dieser Kombination. Die Protonenzahl bestimmt das Element.`);
    }

    function renderBonding(lab) {
        const selected = lab.dataset.chemChoice || '';
        const focusedAction = lab.contains(document.activeElement) ? document.activeElement.dataset.chemSvgAction : null;
        const panel = (id, x, title, subtitle, body) => `
            <g transform="translate(${x} 26)" data-chem-svg-action="${id}" role="button" aria-label="${title}" aria-pressed="${selected === id}" tabindex="0" style="cursor:pointer;">
                <rect width="148" height="142" rx="14" fill="${selected === id ? '#ecfdf5' : '#f8fafc'}" stroke="${selected === id ? '#16a34a' : '#cbd5e1'}" stroke-width="3"></rect>
                <text x="74" y="23" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${title}</text>
                ${body}
                <text x="74" y="128" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">${subtitle}</text>
            </g>
        `;
        visual(lab, `
            <svg width="100%" height="220" viewBox="0 0 520 220" style="max-width:520px;height:auto;" role="group" aria-label="Bindungsmodelle">
                <defs>
                    <radialGradient id="posIon" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#fecaca"/><stop offset="100%" stop-color="#ef4444"/></radialGradient>
                    <radialGradient id="negIon" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#bfdbfe"/><stop offset="100%" stop-color="#3b82f6"/></radialGradient>
                    <radialGradient id="metalIon" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#94a3b8"/></radialGradient>
                    <radialGradient id="atomH" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#cbd5e1"/></radialGradient>
                    <filter id="bondShadow"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/></filter>
                </defs>
                ${panel('salt', 18, 'Ionengitter', '+ und - ziehen sich an', [0,1,2].map(r => [0,1,2].map(c => {
                    const plus = (r + c) % 2 === 0;
                    return `<g filter="url(#bondShadow)"><circle cx="${38 + c * 36}" cy="${48 + r * 28}" r="14" fill="${plus ? 'url(#posIon)' : 'url(#negIon)'}"></circle><text x="${38 + c * 36}" y="${53 + r * 28}" text-anchor="middle" font-size="14" font-weight="900" fill="${plus ? '#7f1d1d' : '#1e3a8a'}">${plus ? '+' : '-'}</text></g>`;
                }).join('')).join(''))}
                ${panel('water', 186, 'Wasser', 'Elektronen werden geteilt', `
                    <g filter="url(#bondShadow)">
                        <line x1="74" y1="67" x2="45" y2="95" stroke="#93c5fd" stroke-width="10" stroke-linecap="round"></line>
                        <line x1="74" y1="67" x2="103" y2="95" stroke="#93c5fd" stroke-width="10" stroke-linecap="round"></line>
                        <circle cx="74" cy="64" r="24" fill="url(#posIon)"></circle>
                        <circle cx="45" cy="95" r="14" fill="url(#atomH)"></circle>
                        <circle cx="103" cy="95" r="14" fill="url(#atomH)"></circle>
                        <text x="74" y="70" text-anchor="middle" font-size="14" font-weight="900" fill="#7f1d1d">O</text>
                        <text x="45" y="100" text-anchor="middle" font-size="12" font-weight="900" fill="#334155">H</text>
                        <text x="103" y="100" text-anchor="middle" font-size="12" font-weight="900" fill="#334155">H</text>
                        <text x="104" y="52" font-size="13" font-weight="900" fill="#1d4ed8">δ-</text>
                        <text x="24" y="116" font-size="13" font-weight="900" fill="#b91c1c">δ+</text>
                    </g>
                `)}
                ${panel('metal', 354, 'Metall', 'Elektronen sind beweglich', `
                    ${[0,1,2].map(r => [0,1,2].map(c => `<circle cx="${38 + c * 36}" cy="${48 + r * 28}" r="13" fill="url(#metalIon)" filter="url(#bondShadow)"></circle>`).join('')).join('')}
                    <path d="M24 106 C46 82 72 120 100 88 C112 76 122 78 132 84" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-dasharray="7 5">
                        <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.4s" repeatCount="indefinite"></animate>
                    </path>
                    <text x="38" y="42" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">+</text>
                    <text x="74" y="70" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">+</text>
                    <text x="110" y="98" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">+</text>
                `)}
                <text x="260" y="202" text-anchor="middle" font-size="13" font-weight="900" fill="#0f172a">Klicke ein Modell: Das grün markierte Bild gehört zur Rückmeldung.</text>
            </svg>
        `);
        if (focusedAction) {
            Array.from(lab.querySelectorAll('[data-chem-svg-action]')).find(node => node.dataset.chemSvgAction === focusedAction)?.focus();
        }
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
        chemStatus(lab, count === 0 ? 'Noch keine Beobachtung gewählt.' : count === 1 ? 'Ein Zeichen allein kann ein Hinweis sein. Suche weitere Beobachtungen.' : 'Mehrere Beobachtungen sind gesammelt. Ihre Anzahl beweist keine Reaktion: Prüfe gezielt, ob neue Stoffe entstanden sind.');
    }

    function setReactionBuilderPreset(lab, action) {
        const reactionKey = Object.hasOwn(REACTIONS, action) ? action : action === 'reset' ? (lab.dataset.chemReaction || 'methane') : 'methane';
        lab.dataset.chemReaction = reactionKey;
        const start = REACTIONS[reactionKey].start;
        lab.querySelectorAll('[data-chem-coeff]').forEach((input) => {
            const key = input.dataset.chemCoeff;
            input.value = start[key] ?? 0;
        });
    }

    function reactionCoeff(lab, key) {
        const input = lab.querySelector(`[data-chem-coeff="${key}"]`);
        const raw = input?.value?.trim() ?? '';
        const value = Number(raw);
        return raw !== '' && Number.isInteger(value) && value >= 0 && value <= 9 ? value : null;
    }

    function reactionTotals(terms, coeffs) {
        return terms.reduce((totals, term) => {
            const coeff = coeffs[term.key] || 0;
            Object.entries(term.atoms).forEach(([atom, count]) => {
                totals[atom] = (totals[atom] || 0) + count * coeff;
            });
            return totals;
        }, {});
    }

    function atomSvg(symbol, x, y, radius, fill, textFill = '#0f172a') {
        return `<g>
            <circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="#0f172a" stroke-width="1.8"></circle>
            <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="${Math.max(16, radius + 2)}" font-weight="900" fill="${textFill}">${symbol}</text>
        </g>`;
    }

    function moleculeSvg(plain) {
        const bond = (x1, y1, x2, y2, width = 4) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="${width}" stroke-linecap="round"></line>`;
        if (plain === 'CH4') {
            return `
                ${bond(48, 50, 48, 24)}${bond(48, 50, 20, 60)}${bond(48, 50, 76, 60)}${bond(48, 50, 48, 78)}
                ${atomSvg('H', 48, 22, 10, '#f8fafc')}
                ${atomSvg('H', 18, 62, 10, '#f8fafc')}
                ${atomSvg('H', 78, 62, 10, '#f8fafc')}
                ${atomSvg('H', 48, 80, 10, '#f8fafc')}
                ${atomSvg('C', 48, 50, 15, '#111827', '#ffffff')}
            `;
        }
        if (plain === 'O2') {
            return `
                ${bond(34, 52, 64, 52, 5)}
                ${bond(34, 59, 64, 59, 3)}
                ${atomSvg('O', 30, 56, 15, '#ef4444', '#ffffff')}
                ${atomSvg('O', 68, 56, 15, '#ef4444', '#ffffff')}
            `;
        }
        if (plain === 'CO2') {
            return `
                ${bond(24, 54, 48, 54, 5)}
                ${bond(24, 61, 48, 61, 3)}
                ${bond(48, 54, 72, 54, 5)}
                ${bond(48, 61, 72, 61, 3)}
                ${atomSvg('O', 18, 58, 14, '#ef4444', '#ffffff')}
                ${atomSvg('C', 48, 58, 14, '#111827', '#ffffff')}
                ${atomSvg('O', 78, 58, 14, '#ef4444', '#ffffff')}
            `;
        }
        if (plain === 'H2O2') {
            return bond(20, 32, 40, 52) + bond(40, 52, 66, 52) + bond(66, 52, 84, 76)
                + atomSvg('H', 18, 30, 10, '#f8fafc') + atomSvg('O', 40, 52, 13, '#ef4444', '#ffffff')
                + atomSvg('O', 66, 52, 13, '#ef4444', '#ffffff') + atomSvg('H', 86, 78, 10, '#f8fafc');
        }
        if (plain === 'H2O') {
            return `
                ${bond(48, 48, 24, 70, 5)}
                ${bond(48, 48, 72, 70, 5)}
                ${atomSvg('O', 48, 46, 16, '#ef4444', '#ffffff')}
                ${atomSvg('H', 22, 72, 11, '#f8fafc')}
                ${atomSvg('H', 74, 72, 11, '#f8fafc')}
            `;
        }
        if (plain === 'H2') {
            return `
                ${bond(34, 56, 64, 56, 5)}
                ${atomSvg('H', 30, 56, 13, '#f8fafc')}
                ${atomSvg('H', 68, 56, 13, '#f8fafc')}
            `;
        }
        return atomSvg(plain, 48, 56, 18, '#cbd5e1');
    }

    // The balance counts each atom sort; molecule counts need not be conserved.
    function reactionBalance(key, coeffs) {
        if (!Object.hasOwn(REACTIONS, key)) return null;
        const reaction = REACTIONS[key];
        if (!reaction || !coeffs) return null;
        const terms = [...reaction.left, ...reaction.right];
        if (terms.some(term => !Number.isInteger(coeffs[term.key]) || coeffs[term.key] < 0 || coeffs[term.key] > 9)) return null;
        const left = reactionTotals(reaction.left, coeffs);
        const right = reactionTotals(reaction.right, coeffs);
        const atoms = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
        const conserved = atoms.every(atom => left[atom] === right[atom]);
        const positive = terms.every(term => coeffs[term.key] > 0);
        const balanced = conserved && positive;
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const factor = balanced ? terms.map(term => coeffs[term.key]).reduce(gcd) : null;
        return { left, right, atoms, conserved, balanced, factor,
            moleculesLeft: reaction.left.reduce((sum, term) => sum + coeffs[term.key], 0),
            moleculesRight: reaction.right.reduce((sum, term) => sum + coeffs[term.key], 0),
            missing: terms.filter(term => coeffs[term.key] === 0).map(term => term.plain) };
    }

    function updateReactionBuilder(lab) {
        const requested = lab.dataset.chemReaction || lab.dataset.chemChoice || 'methane';
        const reactionKey = Object.hasOwn(REACTIONS, requested) ? requested : 'methane';
        const reaction = REACTIONS[reactionKey];
        lab.dataset.chemReaction = reactionKey;
        const coeffs = Object.fromEntries(['a','b','c','d'].map(key => [key, reactionCoeff(lab, key)]));
        const allTerms = [...reaction.left, ...reaction.right];
        lab.querySelectorAll('[data-chem-reaction-label]').forEach(label => {
            const term = allTerms.find(item => item.key === label.dataset.chemReactionLabel);
            label.innerHTML = term ? (reaction.left.includes(term) ? 'Links: ' : 'Rechts: ') + term.formula : '-';
        });
        lab.querySelectorAll('[data-chem-coeff]').forEach(input => {
            const term = allTerms.find(item => item.key === input.dataset.chemCoeff);
            input.disabled = !term;
            input.closest('label')?.toggleAttribute('hidden', !term);
        });
        lab.querySelectorAll('[data-chem-action]').forEach(button => {
            if (Object.hasOwn(REACTIONS, button.dataset.chemAction)) button.setAttribute('aria-pressed', String(button.dataset.chemAction === reactionKey));
            else button.removeAttribute('aria-pressed');
        });
        const status = lab.querySelector('.chem-status');
        if (!status.id) status.id = 'reaction-builder-status-' + [...document.querySelectorAll('.chem-lab')].indexOf(lab);
        lab.querySelectorAll('[data-chem-coeff]').forEach(input => {
            const invalid = !input.disabled && coeffs[input.dataset.chemCoeff] === null;
            input.setAttribute('aria-invalid', String(invalid));
            const descriptions = new Set((input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
            descriptions.add(status.id);
            input.setAttribute('aria-describedby', [...descriptions].join(' '));
        });
        const balance = reactionBalance(reactionKey, coeffs);
        if (!balance) {
            visual(lab, '<p>Die Atombilanz erscheint nach gültigen Eingaben.</p>');
            chemStatus(lab, 'Trage in jedes aktive Feld eine ganze Zahl von 0 bis 9 ein. Leere Felder sind keine Null; Bruchzahlen und Werte außerhalb des Bereichs werden nicht gerundet.');
            return;
        }
        const {left, right, atoms, balanced, factor, moleculesLeft, moleculesRight, missing} = balance;
        const equationSide = terms => terms.map(term => coeffs[term.key] + ' ' + term.formula).join(' + ');
        const names = {CH4:'Methan', O2:'Sauerstoff', CO2:'Kohlenstoffdioxid', H2O:'Wasser', H2:'Wasserstoff', H2O2:'Wasserstoffperoxid'};
        const cards = terms => terms.map(term => {
            const count = coeffs[term.key];
            const composition = Object.entries(term.atoms).map(([atom, number]) => number + ' ' + atom).join(', ');
            const copies = Array.from({length:count}, () => '<svg data-reaction-molecule="' + term.plain + '" viewBox="0 0 100 100" role="img" aria-label="Ein ' + names[term.plain] + '-Molekül: ' + composition + '">' + moleculeSvg(term.plain) + '</svg>').join('');
            return '<figure class="reaction-species-card" data-reaction-species="' + term.plain + '"><figcaption><strong>' + names[term.plain] + ' · ' + term.formula + '</strong><br>' + count + (count === 1 ? ' Molekül' : ' Moleküle') + '</figcaption><p>Pro Molekül: ' + composition + '</p><div class="reaction-molecules">' + (copies || '<p>Keine Moleküle dieses Stoffes eingestellt.</p>') + '</div></figure>';
        }).join('');
        visual(lab, '<div class="reaction-model">'
            + '<p class="reaction-equation" data-reaction-equation><span>' + equationSide(reaction.left) + '</span><span aria-label="reagieren zu"> → </span><span>' + equationSide(reaction.right) + '</span></p>'
            + '<div class="reaction-sides"><section data-reaction-side="left"><h4>Links: Ausgangsstoffe</h4><div class="reaction-species">' + cards(reaction.left) + '</div></section><section data-reaction-side="right"><h4>Rechts: Produkte</h4><div class="reaction-species">' + cards(reaction.right) + '</div></section></div>'
            + '<table class="reaction-balance" data-reaction-balance><caption>Atome jeder Sorte vergleichen</caption><thead><tr><th scope="col">Atom</th><th scope="col">Links</th><th scope="col">Rechts</th><th scope="col">Gleich?</th></tr></thead><tbody>'
            + atoms.map(atom => '<tr data-reaction-atom="' + atom + '"><th scope="row">' + atom + '</th><td>' + left[atom] + '</td><td>' + right[atom] + '</td><td>' + (left[atom] === right[atom] ? 'ja' : 'nein') + '</td></tr>').join('') + '</tbody></table>'
            + '<p data-reaction-molecule-totals>Moleküle insgesamt: links <strong>' + moleculesLeft + '</strong>, rechts <strong>' + moleculesRight + '</strong>. Die Molekülzahl muss nicht gleich bleiben.</p>'
            + '<p class="reaction-model-limit">Die Kreise und Verbindungen sind Zählhilfen. Die Bilder zeigen weder maßstäbliche Größen noch räumliche Molekülformen oder den zeitlichen Reaktionsablauf. Die Karten vergleichen die eingestellten Teilchenzahlen; sie behaupten nicht, dass jede Einstellung eine mögliche Reaktion ergibt.</p></div>');
        if (balanced) {
            chemStatus(lab, 'Richtig ausgeglichen: Von jeder Atomsorte gibt es links und rechts gleich viele. ' + (factor === 1 ? 'Die Zahlen stehen im kleinsten ganzzahligen Verhältnis.' : 'Gültiges Vielfaches: Teile alle eingestellten Zahlen durch ' + factor + ', um das kleinste ganzzahlige Verhältnis zu erhalten.'));
        } else if (moleculesLeft === 0 && moleculesRight === 0) {
            chemStatus(lab, 'Keine Reaktion dargestellt: Die Nullen ergeben zwar gleiche Atomzahlen, zeigen aber keine Ausgangsstoffe und keine Produkte. Stelle für jeden vorgegebenen Stoff eine positive Anzahl ein.');
        } else if (missing.length) {
            chemStatus(lab, 'Noch nicht ausgeglichen: Es fehlen vorgegebene Stoffe (' + missing.join(', ') + '). Stelle für jeden eine positive Anzahl ein und vergleiche die Atome jeder Sorte.');
        } else {
            const differences = atoms.filter(atom => left[atom] !== right[atom]).map(atom => atom + ': links ' + left[atom] + ', rechts ' + right[atom]).join('; ');
            chemStatus(lab, 'Noch nicht ausgeglichen: ' + differences + '. Ändere nur die großen Zahlen vor den Formeln, nicht die Formeln selbst.');
        }
    }

    function updateCombustionLab(lab) {
        const values = Array.from(lab.querySelectorAll('input[type="checkbox"]:checked')).map((x) => x.value);
        const has = (value) => values.includes(value);
        const conditions = [['fuel', 'Brennstoff'], ['oxygen', 'genügend Sauerstoff'], ['heat', 'ausreichend hohe Temperatur']];
        const missing = conditions.filter(([key]) => !has(key)).map(([,label]) => label);
        const all = missing.length === 0;
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="Branddreieck">
                <defs>
                    <filter id="chemFireGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
                    <linearGradient id="nodeActive" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bbf7d0"/><stop offset="1" stop-color="#22c55e"/></linearGradient>
                    <linearGradient id="nodeInactive" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fecaca"/><stop offset="1" stop-color="#ef4444"/></linearGradient>
                </defs>
                <polygon points="260,30 118,174 402,174" fill="${all ? '#fef2f2' : '#f8fafc'}" stroke="${all ? '#ef4444' : '#94a3b8'}" stroke-width="6" stroke-linejoin="round"></polygon>
                ${[
                    ['heat', 260, 54, 'Temperatur'],
                    ['fuel', 166, 162, 'Brennstoff'],
                    ['oxygen', 354, 162, 'Sauerstoff']
                ].map(([key, x, y, label]) => `<g>
                    <circle cx="${x}" cy="${y}" r="28" fill="${has(key) ? 'url(#nodeActive)' : 'url(#nodeInactive)'}" stroke="${has(key) ? '#166534' : '#991b1b'}" stroke-width="3" filter="url(#chemFireGlow)"></circle>
                    <text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-weight="900" fill="${has(key) ? '#14532d' : '#7f1d1d'}">${has(key) ? '✓' : '✗'}</text>
                    <text x="${x}" y="${y + 50}" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${label}</text>
                </g>`).join('')}
                ${all ? `
                <g filter="url(#chemFireGlow)">
                    <path d="M260 126 C232 94 270 78 262 46 C306 78 332 114 294 160 C282 174 238 170 228 148 C220 128 238 120 246 104 C252 116 256 122 260 126 Z" fill="#ea580c">
                        <animate attributeName="d" values="M260 126 C232 94 270 78 262 46 C306 78 332 114 294 160 C282 174 238 170 228 148 C220 128 238 120 246 104 C252 116 256 122 260 126 Z; M260 120 C220 90 280 60 250 40 C320 80 320 120 280 150 C290 170 230 180 220 150 C210 130 240 110 240 100 C250 110 256 120 260 120 Z; M260 126 C232 94 270 78 262 46 C306 78 332 114 294 160 C282 174 238 170 228 148 C220 128 238 120 246 104 C252 116 256 122 260 126 Z" dur="0.8s" repeatCount="indefinite"/>
                    </path>
                    <path d="M266 142 C250 122 274 110 270 92 C294 112 304 134 286 154 C278 162 254 162 246 150 C240 138 250 134 254 124 Z" fill="#facc15">
                        <animate attributeName="d" values="M266 142 C250 122 274 110 270 92 C294 112 304 134 286 154 C278 162 254 162 246 150 C240 138 250 134 254 124 Z; M266 138 C240 120 280 100 260 80 C300 110 300 140 280 150 C280 160 240 160 240 150 C230 140 250 130 250 120 Z; M266 142 C250 122 274 110 270 92 C294 112 304 134 286 154 C278 162 254 162 246 150 C240 138 250 134 254 124 Z" dur="0.7s" repeatCount="indefinite"/>
                    </path>
                </g>` : '<text x="260" y="210" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">Mindestens eine Modellbedingung fehlt.</text>'}
            </svg>
        `);
        chemStatus(lab, all ? 'Alle drei Modellbedingungen sind erfüllt: Verbrennung ist möglich. Reale Stoffmengen, Mischung und Wärmeverluste werden nicht berechnet.' : 'Im Modell fehlt: ' + missing.join(', ') + '. Ohne diese Bedingung(en) ist hier keine Verbrennung möglich.');
    }

    function updatePhLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const value = Number(range.value);
        range.setAttribute('aria-valuetext', 'pH ' + value);
        const color = value < 4 ? '#ef4444' : value < 7 ? '#f97316' : value === 7 ? '#22c55e' : value < 11 ? '#38bdf8' : '#2563eb';
        const label = value < 7 ? 'sauer' : value === 7 ? 'neutral' : 'basisch';
        const sample = lab.dataset.chemSample || 'reines Wasser';
        const left = Math.max(2, Math.min(98, value / 14 * 100));
        visual(lab, `
            <svg width="100%" height="250" viewBox="0 0 520 250" style="max-width:520px;height:auto;" role="img" aria-label="pH-Indikator">
                <defs>
                    <linearGradient id="chemPhGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stop-color="#dc2626"></stop><stop offset="0.28" stop-color="#f97316"></stop><stop offset="0.5" stop-color="#22c55e"></stop><stop offset="0.72" stop-color="#38bdf8"></stop><stop offset="1" stop-color="#2563eb"></stop>
                    </linearGradient>
                    <filter id="phShadow"><feDropShadow dx="1" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
                </defs>
                <rect x="22" y="24" width="476" height="190" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>
                <g transform="translate(54 44)" filter="url(#phShadow)">
                    <path d="M34 6 H126 L112 128 H48 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="3"></path>
                    <path d="M49 86 C68 76 92 96 111 84 L106 122 H54 Z" fill="${color}" opacity="0.9">
                        <animate attributeName="d" values="M49 86 C68 76 92 96 111 84 L106 122 H54 Z; M49 84 C68 96 92 76 111 86 L106 122 H54 Z; M49 86 C68 76 92 96 111 84 L106 122 H54 Z" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M34 6 H126 L112 128 H48 Z" fill="none" stroke="#0f172a" stroke-width="3"></path>
                    <rect x="147" y="20" width="20" height="122" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2"></rect>
                    <rect x="150" y="${118 - value * 6.5}" width="14" height="${value * 6.5 + 4}" rx="4" fill="${color}"></rect>
                    <text x="80" y="158" text-anchor="middle" font-size="13" font-weight="900">${sample}</text>
                </g>
                <g transform="translate(246 62)" filter="url(#phShadow)">
                    <rect x="0" y="0" width="210" height="28" rx="14" fill="url(#chemPhGradient)" stroke="#0f172a" stroke-width="2"></rect>
                    <line x1="${left * 2.1}" y1="-8" x2="${left * 2.1}" y2="40" stroke="#0f172a" stroke-width="5" stroke-linecap="round"></line>
                    <circle cx="${left * 2.1}" cy="-8" r="4" fill="#0f172a"></circle>
                    <text x="0" y="58" font-size="11" font-weight="800">0 sauer</text>
                    <text x="96" y="58" text-anchor="middle" font-size="11" font-weight="800">7 neutral</text>
                    <text x="210" y="58" text-anchor="end" font-size="11" font-weight="800">14 basisch</text>
                    <text x="105" y="100" text-anchor="middle" font-size="18" font-weight="900">pH ${value}: ${label}</text>
                    <text x="105" y="126" text-anchor="middle" font-size="12" fill="#334155">Indikatorfarbe vergleichen, nicht probieren.</text>
                </g>
            </svg>
        `);
        chemStatus(lab, `${sample}: pH ${value}, also ${label}. Gerundeter Modellwert bei etwa 25 °C; schematische Indikatorfarbe.`);
    }

    function updateCrystalLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const evaporated = Number(range.value);
        const water = 100 - evaporated;
        const dissolved = Math.min(18, water * 0.36);
        const crystalMass = 18 - dissolved;
        const fmt = value => value.toLocaleString('de-AT', { maximumFractionDigits: 1 });
        range.setAttribute('aria-valuetext', fmt(evaporated) + ' g Wasser verdunstet');
        const waterHeight = water * 0.9;
        const count = Math.ceil(crystalMass / 2);
        const crystals = Array.from({ length: count }, (_, i) =>
            '<rect data-crystal="true" x="' + (79 + i % 4 * 25) + '" y="' + (157 - Math.floor(i / 4) * 15) + '" width="12" height="12" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"></rect>'
        ).join('');
        const lattice = [0,1,2].map(r => [0,1,2,3].map(c => {
            const positive = (r + c) % 2 === 0;
            return '<circle cx="' + (37 + c * 23) + '" cy="' + (45 + r * 23) + '" r="9" fill="' + (positive ? '#dbeafe' : '#ffedd5') + '" stroke="#334155"></circle><text x="' + (37 + c * 23) + '" y="' + (49 + r * 23) + '" text-anchor="middle" font-size="13" fill="#0f172a">' + (positive ? '+' : '−') + '</text>';
        }).join('')).join('');
        visual(lab, '<svg width="100%" height="250" viewBox="0 0 520 250" style="max-width:520px;height:auto;" role="img" aria-label="Restwasser und Kristalle; daneben ein schematisches Ionengitter">' +
            '<g transform="translate(20 20)"><path d="M50 30 H220 L200 180 H70 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="3"></path>' +
            '<rect x="76" y="' + (175 - waterHeight) + '" width="118" height="' + waterHeight + '" fill="#bfdbfe"></rect>' + crystals +
            '<text x="135" y="205" text-anchor="middle" font-size="14" fill="#0f172a">' + fmt(water) + ' g Wasser verbleiben</text></g>' +
            '<g transform="translate(310 45)"><rect x="15" y="20" width="116" height="98" rx="10" fill="#fff" stroke="#64748b"></rect>' + lattice +
            '<text x="73" y="143" text-anchor="middle" font-size="13" fill="#0f172a">Ionengitter (Schema)</text>' +
            '<text x="73" y="162" text-anchor="middle" font-size="12" fill="#334155">Kein Teilchenfoto</text></g></svg>' +
            '<table class="word-rubric"><caption>Salzbilanz im Modell</caption><thead><tr><th scope="col">Gelöstes Salz</th><th scope="col">Salz als Kristall</th><th scope="col">Salz insgesamt</th></tr></thead><tbody><tr><td data-salt-dissolved="' + dissolved.toFixed(1) + '">' + fmt(dissolved) + ' g</td><td data-salt-crystal="' + crystalMass.toFixed(1) + '">' + fmt(crystalMass) + ' g</td><td>18 g</td></tr></tbody></table>');
        const state = crystalMass > 0 ? 'Gesättigte Lösung mit Kristallen.' : water * 0.36 === 18 ? 'Sättigungsgrenze erreicht; noch kein überschüssiges Salz.' : 'Ungesättigt: Das gesamte Salz bleibt gelöst.';
        chemStatus(lab, fmt(evaporated) + ' g Wasser verdunstet, ' + fmt(water) + ' g bleiben. ' + state + ' Gelöst: ' + fmt(dissolved) + ' g; kristallisiert: ' + fmt(crystalMass) + ' g. Zusammen weiterhin 18 g Salz. Kristallgrößen und Anzahl sind schematisch.');
    }

    function renderRedox(lab) {
        const selected = lab.dataset.chemChoice || '';
        const focusedAction = lab.contains(document.activeElement) ? document.activeElement.dataset.chemSvgAction : null;
        const tubes = [
            { id: 'dry', label: 'trocken', rust: 0, water: 0, note: 'kaum Wasser' },
            { id: 'water', label: 'Wasser', rust: 2, water: 70, note: 'Wasser + Luft' },
            { id: 'salt', label: 'Salzwasser', rust: 4, water: 70, note: 'Ionen beschleunigen' },
            { id: 'oil', label: 'sauerstoffarm', rust: 0, water: 70, note: 'abgekocht + Öl' }
        ];
        visual(lab, `
            <svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="group" aria-label="Qualitativer Rostvergleich, keine Messwerte">
                ${tubes.map((tube, i) => `<g transform="translate(${38 + i * 122} 28)" data-chem-svg-action="${tube.id}" role="button" aria-label="${tube.label}" aria-pressed="${selected === tube.id}" tabindex="0" style="cursor:pointer;">
                    <rect x="-8" y="-8" width="96" height="166" rx="12" fill="${selected === tube.id ? '#ecfdf5' : '#ffffff'}" stroke="${selected === tube.id ? '#16a34a' : '#cbd5e1'}" stroke-width="3"></rect>
                    <path d="M12 14 H68 L58 124 H22 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="3"></path>
                    ${tube.water ? `<path d="M23 ${130 - tube.water} C36 ${122 - tube.water} 47 ${137 - tube.water} 57 ${129 - tube.water} L54 120 H26 Z" fill="#bfdbfe" opacity="0.8"></path>` : ''}
                    ${tube.id === 'oil' ? '<path d="M24 48 H57 L56 59 H25 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"></path>' : ''}
                    <line x1="40" y1="72" x2="40" y2="112" stroke="#78716c" stroke-width="9" stroke-linecap="round"></line>
                    ${Array.from({ length: tube.rust }, (_, r) => `<circle cx="${34 + (r % 2) * 14}" cy="${78 + r * 9}" r="${5 + r}" fill="#b45309" opacity="0.86"></circle>`).join('')}
                    <text x="40" y="146" text-anchor="middle" font-size="12" font-weight="900">${tube.label}</text>
                    <text x="40" y="162" text-anchor="middle" font-size="10" fill="#334155">${tube.note}</text>
                </g>`).join('')}
            </svg>
        `);
        if (focusedAction) Array.from(lab.querySelectorAll('[data-chem-svg-action]')).find(node => node.dataset.chemSvgAction === focusedAction)?.focus();
    }

    function updateCarbonLab(lab) {
        const range = lab.querySelector('input[type="range"]');
        const count = Number(range.value);
        const select = lab.querySelector('[data-carbon-shape]');
        if (select) {
            select.querySelector('[value="branched"]').disabled = count < 4;
            if (count < 4) select.value = 'straight';
        }
        const branched = count >= 4 && select?.value === 'branched';
        const mainCount = count - (branched ? 1 : 0);
        const points = Array.from({ length: mainCount }, (_, i) => [58 + i * 52, 110 + i % 2 * 18]);
        const links = points.slice(1).map((point,i) => [points[i],point]);
        if (branched) { const branch = [points[1][0],58]; links.push([points[1],branch]); points.push(branch); }
        const formula = 'C' + count + 'H' + (2 * count + 2);
        range.setAttribute('aria-valuetext', count + ' Kohlenstoffatome insgesamt');
        const lines = links.map(([from,to]) => '<line data-carbon-bond="true" x1="'+from[0]+'" y1="'+from[1]+'" x2="'+to[0]+'" y2="'+to[1]+'" stroke="#334155" stroke-width="4"></line>').join('');
        const atoms = points.map(([x,y]) => '<g><circle data-carbon-atom="true" cx="'+x+'" cy="'+y+'" r="18" fill="#111827"></circle><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" fill="white" font-weight="900">C</text></g>').join('');
        visual(lab, '<svg width="100%" height="230" viewBox="0 0 520 230" style="max-width:520px;height:auto;" role="img" aria-label="'+count+' C-Atome, '+(branched?'verzweigte':'unverzweigte')+' Struktur, Wasserstoff nicht gezeichnet">'+
            '<rect x="22" y="24" width="476" height="188" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"></rect>'+lines+atoms+
            '<text x="260" y="176" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a">Summenformel: '+formula+'</text>'+
            '<text x="260" y="198" text-anchor="middle" font-size="12" fill="#334155">Wasserstoffatome weggelassen · keine Siedepunktmessung</text></svg>');
        chemStatus(lab, count+' C-Atome und '+(2*count+2)+' H-Atome: '+formula+'. '+(branched?'Verzweigte':'Unverzweigte')+' Struktur. '+(count<4?'Eine verzweigte offenkettige Alkanstruktur braucht mindestens vier C-Atome.':'Vergleiche beide Verknüpfungen bei gleicher Gesamtzahl; die Summenformel bleibt gleich.'));
    }

    function updateReuseBalance(lab) {
        const input = lab.querySelector('input[type="range"]');
        const uses = Number(input.value);
        const single = uses * 15;
        const reuse = 120;
        input.setAttribute('aria-valuetext', uses + ' Einsätze');
        visual(lab, `<table class="word-rubric"><caption>Fiktive Masse neu hergestellter Behälter</caption><thead><tr><th scope="col">Variante</th><th scope="col">Anzahl Behälter</th><th scope="col">Masse insgesamt</th></tr></thead><tbody><tr><th scope="row">Einweg</th><td>${uses}</td><td data-single-mass="${single}">${single} g</td></tr><tr><th scope="row">Mehrweg</th><td>1</td><td data-reuse-mass="120">120 g</td></tr></tbody></table>`);
        const comparison = single === reuse ? 'Gleiche Behältermasse in beiden Varianten.' : single > reuse ? `Mehrweg benötigt hier ${single - reuse} g weniger Behältermasse.` : `Mehrweg benötigt hier ${reuse - single} g mehr Behältermasse.`;
        chemStatus(lab, `${uses} Einsätze: Einweg ${single} g, Mehrweg ${reuse} g. ${comparison} Keine vollständige Umweltbilanz: Reinigung, Transport und weitere Wirkungen fehlen.`);
    }

    function renderLifecycle(lab) {
        const selected = lab.dataset.chemChoice || '';
        const focusedAction = lab.contains(document.activeElement) ? document.activeElement.dataset.chemSvgAction : null;
        const decisions = {
            single: 'Einweg: Für weitere Nutzungen wird ein neues Produkt gebraucht. Auch Einwegmaterial kann je nach Stoff und Sammlung recycelt werden.',
            reuse: 'Mehrweg: Dasselbe Produkt wird mehrfach genutzt. Reinigung, Rücktransport und tatsächliche Nutzungszahl zählen mit.',
            repair: 'Reparatur: Das Produkt bleibt länger nutzbar. Ersatzteile, Aufwand und weiterer Betriebsverbrauch beeinflussen die Bilanz.',
            recycle: 'Recycling: Material wird aufbereitet und teilweise zurückgewonnen. Nicht jeder Stoffstrom gelangt vollständig in ein gleichwertiges neues Produkt.'
        };
        visual(lab, `
            <svg width="100%" height="240" viewBox="0 0 520 240" style="max-width:520px;height:auto;" role="group" aria-label="Produkt-Lebensweg mit teilweiser Rückgewinnung und Reststoffen">
                <defs><marker id="chemLoopArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#16a34a"></path></marker></defs>
                ${['Rohstoff', 'Herstellung', 'Nutzung', 'Sammlung'].map((label, i) => {
                    const x = 158 + i * 88;
                    return `<g><rect x="${x}" y="42" width="76" height="56" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"></rect><text x="${x+38}" y="75" text-anchor="middle" font-size="11" fill="#0f172a">${label}</text></g>`;
                }).join('')}
                ${[0,1,2].map(i => `<path d="M${235+i*88} 70 H${243+i*88}" stroke="#16a34a" stroke-width="2" marker-end="url(#chemLoopArrow)"></path>`).join('')}
                <path d="M460 100 V150 H196 V103" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#chemLoopArrow)"></path>
                <text x="324" y="137" text-anchor="middle" font-size="11" fill="#0f172a">Aufbereitung: teilweise Rückgewinnung</text>
                <path d="M460 150 V188" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#chemLoopArrow)"></path>
                <text x="378" y="211" text-anchor="middle" font-size="12" fill="#0f172a">Reststoffe und Materialverluste</text>
                <g transform="translate(8 34)">
                    ${[
                        ['single', 'Einweg'],
                        ['reuse', 'Mehrweg'],
                        ['repair', 'Reparatur'],
                        ['recycle', 'Recycling']
                    ].map(([id, label], i) => `<g transform="translate(0 ${i * 35})" data-chem-svg-action="${id}" role="button" aria-label="${label}" aria-pressed="${selected === id}" tabindex="0" style="cursor:pointer;">
                        <rect width="102" height="26" rx="8" fill="${selected === id ? '#fef3c7' : '#f8fafc'}" stroke="${selected === id ? '#d97706' : '#cbd5e1'}" stroke-width="2"></rect>
                        <text x="51" y="18" text-anchor="middle" font-size="11" font-weight="900">${label}</text>
                    </g>`).join('')}
                </g>
            </svg>
            <p class="lifecycle-explanation">${decisions[selected] || 'Wähle einen Weg und vergleiche seine Voraussetzungen. Die Grafik zeigt keine Mengenbilanz.'}</p>
        `);
        if (selected) chemStatus(lab, decisions[selected]);
        if (focusedAction) Array.from(lab.querySelectorAll('[data-chem-svg-action]')).find(node => node.dataset.chemSvgAction === focusedAction)?.focus();
    }

    function initSeparationPlanner(lab) {
        const config = JSON.parse(lab.querySelector('[data-separation-config]').content.textContent);
        const scenario = lab.querySelector('[data-separation-case]');
        const plan = lab.querySelector('[data-separation-plan]');
        const reason = lab.querySelector('[data-separation-reason]');
        const result = lab.querySelector('[data-separation-result]');
        const task = lab.querySelector('[data-separation-task]');
        task.id = 'separationTask'; scenario.setAttribute('aria-describedby', task.id);
        const clear = () => {
            result.hidden = true;
            lab.querySelector('[data-separation-plan-preview]').textContent = plan.value ? config.plans.find(p => p.id === plan.value).name : 'Die vollständige Beschreibung erscheint nach deiner Auswahl.';
            lab.querySelector('[data-separation-reason-preview]').textContent = reason.value ? config.reasons[reason.value] : 'Wähle eine Eigenschaft; die vollständige Begründung erscheint hier.';
            delete lab.dataset.planMatches; delete lab.dataset.reasonMatches;
            lab.querySelector('[data-separation-flow]').replaceChildren();
            lab.querySelector('[data-separation-goal-feedback]').textContent = '';
            lab.querySelector('[data-separation-reason-feedback]').textContent = '';
            chemStatus(lab, 'Wähle deinen Plan und die Begründung und prüfe sie gemeinsam.');
        };
        const reset = () => {
            const selected = config.cases.find(c => c.id === scenario.value);
            task.textContent = selected.name + '. ' + selected.task;
            plan.value = ''; reason.value = ''; clear();
        };
        scenario.addEventListener('change', reset);
        plan.addEventListener('change', clear); reason.addEventListener('change', clear);
        lab.querySelector('[data-separation-reset]').addEventListener('click', () => { reset(); plan.focus(); });
        lab.querySelector('[data-separation-check]').addEventListener('click', () => {
            if (!plan.value || !reason.value) {
                chemStatus(lab, 'Deine Auswahl ist noch unvollständig. Wähle einen Plan und eine Begründung.');
                (!plan.value ? plan : reason).focus(); return;
            }
            const selectedCase = config.cases.find(c => c.id === scenario.value);
            const selectedPlan = config.plans.find(p => p.id === plan.value);
            const planMatches = selectedCase.accepted.includes(plan.value);
            const reasonMatches = selectedPlan.reason === reason.value;
            lab.dataset.planMatches = String(planMatches); lab.dataset.reasonMatches = String(reasonMatches);
            const flow = lab.querySelector('[data-separation-flow]'); flow.replaceChildren();
            for (const step of selectedPlan.steps) {
                const item = document.createElement('li'); item.textContent = step; flow.append(item);
            }
            const goalFeedback = (planMatches ? 'Trennziel berücksichtigt: ' : 'Trennziel noch nicht erfüllt: ') + selectedCase.outcomes[plan.value];
            const reasonFeedback = reasonMatches
                ? 'Begründung zum Verfahrensprinzip passend: ' + config.reasons[reason.value] + (planMatches ? '' : ' Eine passende Verfahrensbeschreibung allein macht den Plan noch nicht passend zu dieser Ausgangslage und diesem Ziel.')
                : 'Begründung überarbeiten: Du hast gewählt: ' + config.reasons[reason.value] + ' Zum gewählten Ablauf gehört: ' + config.reasons[selectedPlan.reason];
            lab.querySelector('[data-separation-goal-feedback]').textContent = goalFeedback;
            lab.querySelector('[data-separation-reason-feedback]').textContent = reasonFeedback;
            result.hidden = false;
            chemStatus(lab, (planMatches && reasonMatches ? 'Plan und Begründung passen. ' : 'Prüfe deinen Plan noch einmal. ') + 'Trennziel: ' + (planMatches ? 'berücksichtigt.' : 'noch nicht erfüllt.') + ' Begründung zum Ablauf: ' + (reasonMatches ? 'passend.' : 'überarbeiten.') + ' Die Erklärung steht unter deinem Ablauf.');
        });
        reset();
    }

    return { topicInit, reactionBalance };
})();
