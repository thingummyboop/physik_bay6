// Kaenguru training: contest-style practice with timed scoring and worksheet export.

const KANGAROO_ARCHIVE_URL = "https://www.kaenguru.at/aufgaben.html";
const KANGAROO_RULES_URL = "https://www.kaenguru.at/files/downloads/Wettbewerbsregeln.pdf";

const KANGAROO_CONFIGS = {
    3: { stage: 3, label: "3. Schulstufe", category: "Écolier", tasks: 24, minutes: 60, start: 24, max: 120 },
    4: { stage: 4, label: "4. Schulstufe", category: "Écolier", tasks: 24, minutes: 60, start: 24, max: 120 },
    5: { stage: 5, label: "5. Schulstufe", category: "Benjamin", tasks: 24, minutes: 60, start: 24, max: 120 },
    6: { stage: 6, label: "6. Schulstufe", category: "Benjamin", tasks: 24, minutes: 60, start: 24, max: 120 },
    7: { stage: 7, label: "7. Schulstufe", category: "Kadett", tasks: 30, minutes: 75, start: 30, max: 150 },
    8: { stage: 8, label: "8. Schulstufe", category: "Kadett", tasks: 30, minutes: 75, start: 30, max: 150 }
};

const KANGAROO_STATE = {
    root: null,
    config: KANGAROO_CONFIGS[5],
    test: [],
    answers: {},
    submitted: false,
    remaining: 0,
    timer: null
};

function topicInit() {
    initKangarooTraining();
}

function initKangarooTraining() {
    const root = document.querySelector("[data-kangaroo-root]");
    if (!root) return;

    KANGAROO_STATE.root = root;
    renderKangarooSetup();
}

function renderKangarooSetup() {
    clearKangarooTimer();
    const root = KANGAROO_STATE.root;
    root.innerHTML = `
        <div class="kangaroo-shell">
            <div class="kangaroo-hero">
                <div>
                    <span class="kangaroo-eyebrow">Mathe-Extra</span>
                    <h3>Känguru der Mathematik trainieren</h3>
                    <p>Wähle deine Schulstufe, starte einen Test unter Wettbewerbsbedingungen und öffne den aktuellen Test als Arbeitsblatt mit Lösungen.</p>
                </div>
                <div class="kangaroo-score-card" aria-label="Känguru-Regeln">
                    <strong id="kangarooRuleTitle">Benjamin</strong>
                    <span id="kangarooRuleText">24 Aufgaben - 60 Minuten - Startpunkte: 24</span>
                </div>
            </div>
            <div class="kangaroo-controls">
                <label for="kangarooStage">Schulstufe</label>
                <select id="kangarooStage">
                    ${Object.values(KANGAROO_CONFIGS).map(config => `
                        <option value="${config.stage}" ${config.stage === KANGAROO_STATE.config.stage ? "selected" : ""}>
                            ${config.label} (${config.category})
                        </option>
                    `).join("")}
                </select>
                <button type="button" id="kangarooStart">Test starten</button>
                <button type="button" class="kangaroo-secondary" id="kangarooWorksheet">Arbeitsblatt mit Lösungen öffnen</button>
                <a class="kangaroo-link-button" href="${KANGAROO_ARCHIVE_URL}" target="_blank" rel="noopener">Offizielle alte Aufgaben</a>
            </div>
            <div class="kangaroo-note">
                Der digitale Modus verwendet eigene Aufgaben im Känguru-Stil. Die offiziellen alten Originalaufgaben und Lösungen bleiben über das Känguru-Archiv verlinkt.
            </div>
            <div id="kangarooStageInfo" class="kangaroo-info"></div>
            <div id="kangarooTestArea"></div>
        </div>
    `;

    const stageSelect = document.getElementById("kangarooStage");
    stageSelect.addEventListener("change", () => {
        KANGAROO_STATE.config = KANGAROO_CONFIGS[stageSelect.value] || KANGAROO_CONFIGS[5];
        updateKangarooRuleInfo();
    });
    document.getElementById("kangarooStart").addEventListener("click", startKangarooTest);
    document.getElementById("kangarooWorksheet").addEventListener("click", openKangarooWorksheet);
    updateKangarooRuleInfo();
}

function updateKangarooRuleInfo() {
    const config = KANGAROO_STATE.config;
    document.getElementById("kangarooRuleTitle").textContent = config.category;
    document.getElementById("kangarooRuleText").textContent = `${config.tasks} Aufgaben - ${config.minutes} Minuten - Startpunkte: ${config.start}`;
    document.getElementById("kangarooStageInfo").innerHTML = `
        <strong>${config.label}: ${config.category}</strong>
        <span>${scoreDescription(config)} Falsche Antworten kosten ein Viertel der Aufgabenpunkte; leere Antworten geben 0 Punkte.</span>
    `;
}

function scoreDescription(config) {
    return createScoreGroups(config)
        .map(group => `Aufgaben ${group.from}-${group.to}: ${group.points} Punkte`)
        .join(", ") + ".";
}

function createScoreGroups(config) {
    const ranges = config.tasks === 24
        ? [[1, 8, 3], [9, 16, 4], [17, 24, 5]]
        : [[1, 10, 3], [11, 20, 4], [21, 30, 5]];

    return ranges.map(([from, to, points]) => ({
        label: `${points}-Punkte-Aufgaben`,
        from,
        to,
        points,
        correct: 0,
        wrong: 0,
        empty: 0,
        gained: 0,
        lost: 0
    }));
}

function findScoreGroup(groups, number) {
    return groups.find(group => number >= group.from && number <= group.to);
}

function startKangarooTest() {
    clearKangarooTimer();
    const config = KANGAROO_STATE.config;
    KANGAROO_STATE.test = buildKangarooTest(config);
    KANGAROO_STATE.answers = {};
    KANGAROO_STATE.submitted = false;
    KANGAROO_STATE.remaining = config.minutes * 60;
    renderKangarooTest();
    KANGAROO_STATE.timer = window.setInterval(tickKangarooTimer, 1000);
}

function renderKangarooTest() {
    const area = document.getElementById("kangarooTestArea");
    const config = KANGAROO_STATE.config;
    area.innerHTML = `
        <div class="kangaroo-testbar">
            <div>
                <strong>${config.category} - ${config.label}</strong>
                <span id="kangarooProgress">0/${config.tasks} beantwortet</span>
            </div>
            <div class="kangaroo-timer" id="kangarooTimer">Zeit: ${formatKangarooTime(KANGAROO_STATE.remaining)}</div>
            <button type="button" id="kangarooSubmit">Abgeben</button>
        </div>
        <div class="kangaroo-question-list">
            ${KANGAROO_STATE.test.map(renderKangarooQuestion).join("")}
        </div>
        <div id="kangarooResult" class="kangaroo-result" role="status" aria-live="polite"></div>
    `;

    document.getElementById("kangarooSubmit").addEventListener("click", submitKangarooTest);
    area.querySelectorAll("input[type='radio']").forEach(input => {
        input.addEventListener("change", event => {
            KANGAROO_STATE.answers[event.target.name] = event.target.value;
            updateKangarooProgress();
        });
    });
    updateKangarooProgress();
}

function renderKangarooQuestion(question) {
    return `
        <article class="kangaroo-question" id="kangarooQ${question.number}">
            <div class="kangaroo-question-head">
                <strong>${question.number}. Aufgabe</strong>
                <span>${question.points} Punkte</span>
            </div>
            <p>${question.text}</p>
            <div class="kangaroo-options">
                ${question.choices.map((choice, index) => `
                    <label>
                        <input type="radio" name="q${question.number}" value="${index}">
                        ${renderKangarooChoice(choice, index)}
                    </label>
                `).join("")}
            </div>
            <p class="kangaroo-explanation" id="kangarooExplanation${question.number}"></p>
        </article>
    `;
}

function renderKangarooChoice(choice, index) {
    const letter = `${String.fromCharCode(65 + index)})`;
    if (isGraphicChoice(choice)) {
        return `
            <span class="kangaroo-choice-letter">${letter}</span>
            <span class="kangaroo-choice-content">
                ${choice.html}
                <span class="kangaroo-choice-text">${choice.text}</span>
            </span>
        `;
    }
    return `<span>${letter} ${choice}</span>`;
}

function renderKangarooWorksheetChoice(choice) {
    if (!isGraphicChoice(choice)) return choice;
    return `<span class="kangaroo-print-choice">${choice.html}<span>${choice.text}</span></span>`;
}

function choiceText(choice) {
    return isGraphicChoice(choice) ? choice.text : `${choice}`;
}

function isGraphicChoice(choice) {
    return typeof choice === "object" && choice !== null && typeof choice.html === "string";
}

function updateKangarooProgress() {
    const answered = Object.keys(KANGAROO_STATE.answers).length;
    const progress = document.getElementById("kangarooProgress");
    if (progress) progress.textContent = `${answered}/${KANGAROO_STATE.config.tasks} beantwortet`;
}

function tickKangarooTimer() {
    KANGAROO_STATE.remaining = Math.max(0, KANGAROO_STATE.remaining - 1);
    const timer = document.getElementById("kangarooTimer");
    if (timer) {
        timer.textContent = `Zeit: ${formatKangarooTime(KANGAROO_STATE.remaining)}`;
        timer.classList.toggle("is-low", KANGAROO_STATE.remaining <= 5 * 60);
    }
    if (KANGAROO_STATE.remaining === 0) submitKangarooTest();
}

function submitKangarooTest() {
    if (KANGAROO_STATE.submitted || !KANGAROO_STATE.test.length) return;
    KANGAROO_STATE.submitted = true;
    clearKangarooTimer();

    const score = calculateKangarooScore();
    document.querySelectorAll(".kangaroo-question").forEach(card => {
        const number = Number(card.id.replace("kangarooQ", ""));
        const question = KANGAROO_STATE.test[number - 1];
        const answer = KANGAROO_STATE.answers[`q${number}`];
        const selected = answer !== undefined ? Number(answer) : null;
        card.classList.add(selected === question.answer ? "is-correct" : selected === null ? "is-empty" : "is-wrong");
        card.querySelectorAll("input").forEach(input => input.disabled = true);
        const explanation = document.getElementById(`kangarooExplanation${number}`);
        explanation.innerHTML = `<strong>Richtig:</strong> ${String.fromCharCode(65 + question.answer)}) ${choiceText(question.choices[question.answer])} - ${question.explanation}`;
    });

    const result = document.getElementById("kangarooResult");
    result.innerHTML = `
        <strong>Ergebnis: ${formatKangarooPoints(score.points)} von ${KANGAROO_STATE.config.max} Punkten</strong>
        <span>${score.correct} richtig - ${score.wrong} falsch - ${score.empty} leer - Startpunkte: ${KANGAROO_STATE.config.start}</span>
        ${renderKangarooOralFeedback(score)}
        ${renderKangarooEvaluation(score)}
        <button type="button" class="kangaroo-secondary" onclick="openKangarooWorksheet()">Diesen Test als Arbeitsblatt öffnen</button>
    `;
}

function calculateKangarooScore() {
    let points = KANGAROO_STATE.config.start;
    let correct = 0;
    let wrong = 0;
    let empty = 0;
    let gained = 0;
    let lost = 0;
    const groups = createScoreGroups(KANGAROO_STATE.config);

    KANGAROO_STATE.test.forEach(question => {
        const answer = KANGAROO_STATE.answers[`q${question.number}`];
        const group = findScoreGroup(groups, question.number);
        if (answer === undefined) {
            empty += 1;
            if (group) group.empty += 1;
        } else if (Number(answer) === question.answer) {
            correct += 1;
            points += question.points;
            gained += question.points;
            if (group) {
                group.correct += 1;
                group.gained += question.points;
            }
        } else {
            wrong += 1;
            const penalty = question.points / 4;
            points -= penalty;
            lost += penalty;
            if (group) {
                group.wrong += 1;
                group.lost += penalty;
            }
        }
    });

    return {
        points: Math.max(0, points),
        correct,
        wrong,
        empty,
        gained,
        lost,
        groups,
        percentage: Math.round((Math.max(0, points) / KANGAROO_STATE.config.max) * 100)
    };
}

function renderKangarooOralFeedback(score) {
    const config = KANGAROO_STATE.config;
    const correctRate = score.correct / config.tasks;
    const strongest = score.groups.reduce((best, group) => group.correct > best.correct ? group : best, score.groups[0]);
    const needsPractice = score.groups.reduce((worst, group) => {
        const groupOpen = group.wrong + group.empty;
        const worstOpen = worst.wrong + worst.empty;
        return groupOpen > worstOpen ? group : worst;
    }, score.groups[0]);

    let title = "Weitertrainieren";
    let main = "Du hast schon angefangen, die Känguru-Aufgaben zu bearbeiten. Jetzt geht es darum, die leichten Aufgaben sicherer zu erkennen und Schritt für Schritt mehr Punkte zu holen.";

    if (correctRate >= 0.8 && score.wrong <= 2) {
        title = "Sehr starke Leistung";
        main = "Du hast sehr viele Aufgaben richtig gelöst und nur wenige Punkte durch Fehler verloren. Das zeigt, dass du genau liest und deine Antworten gut kontrollierst.";
    } else if (correctRate >= 0.55) {
        title = "Gute Leistung";
        main = "Du hast eine gute Grundlage gezeigt. Viele Aufgaben hast du richtig gelöst; bei den schwierigeren Aufgaben lohnt sich jetzt besonders das genaue Skizzieren und Probieren.";
    } else if (correctRate >= 0.35) {
        title = "Solide Grundlage";
        main = "Du hast mehrere Aufgaben richtig gelöst. Man sieht, dass du mitdenkst, aber du solltest noch üben, welche Aufgaben du sicher beantworten kannst und welche du lieber zuerst überspringst.";
    } else if (score.correct === 0) {
        title = "Erster Versuch";
        main = "Heute war noch keine Aufgabe richtig. Das ist ein klares Zeichen: Starte beim nächsten Training mit den ersten, leichteren Aufgaben und nimm dir für jede Aufgabe eine kleine Skizze oder Rechnung.";
    }

    let strategy = "Gute Strategie: Bearbeite zuerst Aufgaben, bei denen du wirklich einen Plan hast. Danach kommst du zu den unsicheren Aufgaben zurück.";
    if (score.wrong >= score.empty + 3) {
        strategy = "Achte besonders auf das Raten: Beim Känguru kosten falsche Antworten Punkte. Wenn du gar keinen Plan hast, ist Auslassen oft klüger als blindes Raten.";
    } else if (score.empty >= Math.ceil(config.tasks / 3)) {
        strategy = "Du hast einiges ausgelassen. Das kann klug sein, aber versuche beim nächsten Mal zuerst alle leichten Aufgaben zu suchen, damit keine sicheren Punkte liegen bleiben.";
    } else if (score.empty === 0 && score.wrong <= 2) {
        strategy = "Sehr gute Teststrategie: Du hast den Test voll bearbeitet und dabei nur wenige Fehler gemacht.";
    }

    const nextStep = `Nächster Schritt: Übe besonders die ${needsPractice.label.toLowerCase()} (${needsPractice.from}-${needsPractice.to}). Deine stärkste Gruppe war diesmal: ${strongest.label.toLowerCase()} (${strongest.from}-${strongest.to}).`;

    return `
        <div class="kangaroo-oral-feedback">
            <strong>Mündliche Rückmeldung: ${title}</strong>
            <p>${main}</p>
            <p>${strategy}</p>
            <p>${nextStep}</p>
        </div>
    `;
}

function renderKangarooEvaluation(score) {
    return `
        <div class="kangaroo-evaluation">
            <div class="kangaroo-evaluation-grid" aria-label="Auswertung nach Känguru-Wertung">
                <div class="kangaroo-evaluation-metric">
                    <strong>${formatKangarooPoints(score.gained)}</strong>
                    <span>Punkte gewonnen</span>
                </div>
                <div class="kangaroo-evaluation-metric">
                    <strong>${formatKangarooPenalty(score.lost)}</strong>
                    <span>Punkte durch Fehler</span>
                </div>
                <div class="kangaroo-evaluation-metric">
                    <strong>${score.percentage}%</strong>
                    <span>vom Maximum</span>
                </div>
            </div>
            <table class="kangaroo-evaluation-table">
                <thead>
                    <tr>
                        <th>Aufgabengruppe</th>
                        <th>Richtig</th>
                        <th>Falsch</th>
                        <th>Leer</th>
                        <th>Punkte</th>
                    </tr>
                </thead>
                <tbody>
                    ${score.groups.map(group => `
                        <tr>
                            <td>${group.label} ${group.from}-${group.to}</td>
                            <td>${group.correct}</td>
                            <td>${group.wrong}</td>
                            <td>${group.empty}</td>
                            <td>+${formatKangarooPoints(group.gained)} / ${formatKangarooPenalty(group.lost)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <p class="kangaroo-evaluation-note">
                Offiziell gibt es beim Känguru eine Punktewertung, keine Schulnote. Diese Auswertung zeigt deshalb, wo Punkte gewonnen, verloren oder liegen gelassen wurden.
            </p>
        </div>
    `;
}

function formatKangarooPenalty(points) {
    return points === 0 ? "0" : `-${formatKangarooPoints(points)}`;
}

function formatKangarooPoints(points) {
    return points
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1")
        .replace(".", ",");
}

function clearKangarooTimer() {
    if (KANGAROO_STATE.timer) window.clearInterval(KANGAROO_STATE.timer);
    KANGAROO_STATE.timer = null;
}

function formatKangarooTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function buildKangarooTest(config) {
    const rng = seededRandom(config.stage * 1009 + Date.now() % 100000);
    
    // Base generators for stages 3-4 (Écolier)
    const ecolierGenerators = [
        genSequence, genPerimeter, genGrid, genClock, genCubes, 
        genDigitSum, genBorderTiles, genLargestNumber, genPatternTiles, 
        genRotation, genMissingPiece, genTrianglesCount, genOverlappingRects,
        genLogicOrder, genMissingNumber, genCalendar, genLogicLiars
    ];
    
    // Advanced/Themed generators for Benjamin (5-6) and Kadett (7-8)
    const advancedGenerators = [
        genEquation, genAngle, genPercent, genPathCount, genHandshake,
        genBalanceLogic, genUnfolding, genLogicLiars, genPaintedCube,
        genPaperPunch, genLogicDie, genSpatialBlocks, genRotation,
        genOverlappingRects, genTrianglesCount, genPathOnCube, genLogicKnights
    ];

    let pool = config.stage >= 5 ? [...advancedGenerators] : [...ecolierGenerators];
    
    // Ensure we have enough variety
    const generatorOrder = shuffleWithRng(pool, rng);
    const usedTexts = new Set();

    return Array.from({ length: config.tasks }, (_, index) => {
        const number = index + 1;
        const points = pointsForQuestion(config, number);
        const generator = generatorOrder[index % generatorOrder.length];
        let question = null;

        for (let attempt = 0; attempt < 30; attempt++) {
            question = generator(rng, config.stage, number, points);
            if (!usedTexts.has(question.text)) break;
        }

        usedTexts.add(question.text);
        return { ...question, number, points };
    });
}

// --- NEW AUTHENTIC KANGAROO STYLE GENERATORS ---

function genTrianglesCount(rng, stage) {
    const types = [
        {
            svg: `<path d="M 10 90 L 90 90 L 50 10 Z M 30 90 L 50 10 M 70 90 L 50 10" fill="none" stroke="currentColor" stroke-width="2"/>`,
            correct: 6, // 3 small, 2 medium (1+2, 2+3), 1 large
            text: "Wie viele Dreiecke sind in dieser Figur zu sehen?"
        },
        {
            svg: `<path d="M 10 90 L 90 90 L 50 10 Z M 10 90 L 90 50 M 90 90 L 10 50" fill="none" stroke="currentColor" stroke-width="2"/>`,
            correct: 8,
            text: "Wie viele Dreiecke kannst du in dieser Zeichnung zählen?"
        },
        {
            svg: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
                  <path d="M 10 10 L 90 90 M 90 10 L 10 90 M 50 10 L 50 90 M 10 50 L 90 50" fill="none" stroke="currentColor" stroke-width="2"/>`,
            correct: 16,
            text: "Wie viele Dreiecke verstecken sich in diesem unterteilten Quadrat?"
        }
    ];
    
    const type = types[randInt(rng, 0, stage >= 5 ? 2 : 1)];
    const { choices, answer } = makeChoices(type.correct, [type.correct + 2, type.correct - 1, type.correct * 2, 4]);

    return {
        text: `${type.text}<br>${svgFrame(100, 100, type.svg, "Dreiecke")}`,
        choices,
        answer,
        explanation: `Es sind insgesamt ${type.correct} Dreiecke vorhanden, wenn man alle Größen (klein, mittel, groß) berücksichtigt.`
    };
}

function genPaperPunch(rng, stage) {
    const folds = [
        {
            foldSvg: `<rect x="10" y="10" width="80" height="80" fill="#fff" stroke="#334155" stroke-width="2"/>
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#334155" stroke-dasharray="4 2"/>
                      <path d="M 50 30 L 50 70 M 40 60 L 50 70 L 60 60" fill="none" stroke="#0ea5e9" stroke-width="2"/>`,
            punchX: 30, punchY: 30,
            correctSvg: `<circle cx="30" cy="30" r="5" fill="#334155"/><circle cx="30" cy="70" r="5" fill="#334155"/>`,
            desc: "Einmal nach unten gefaltet"
        },
        {
            foldSvg: `<rect x="10" y="10" width="80" height="80" fill="#fff" stroke="#334155" stroke-width="2"/>
                      <line x1="50" y1="10" x2="50" y2="90" stroke="#334155" stroke-dasharray="4 2"/>
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#334155" stroke-dasharray="4 2"/>`,
            punchX: 30, punchY: 30,
            correctSvg: `<circle cx="30" cy="30" r="5" fill="#334155"/><circle cx="70" cy="30" r="5" fill="#334155"/><circle cx="30" cy="70" r="5" fill="#334155"/><circle cx="70" cy="70" r="5" fill="#334155"/>`,
            desc: "Zweimal gefaltet (Viertel)"
        }
    ];
    
    const fold = folds[randInt(rng, 0, stage >= 5 ? 1 : 0)];
    const punchSvg = `<circle cx="${fold.punchX}" cy="${fold.punchY}" r="5" fill="red" stroke="none"/>`;
    
    const makeFull = (circles) => svgFrame(60, 60, `<rect x="5" y="5" width="50" height="50" fill="#fff" stroke="#334155" stroke-width="1.5"/>${circles}`, "Papier");
    
    const choices = [
        { key: "correct", text: "Richtig", html: makeFull(fold.correctSvg) },
        { key: "w1", text: "Falsch 1", html: makeFull(`<circle cx="30" cy="30" r="5" fill="#334155"/>`) },
        { key: "w2", text: "Falsch 2", html: makeFull(`<circle cx="50" cy="50" r="5" fill="#334155"/>`) },
        { key: "w3", text: "Falsch 3", html: makeFull(`<circle cx="30" cy="30" r="5" fill="#334155"/><circle cx="70" cy="70" r="5" fill="#334155"/>`) },
        { key: "w4", text: "Falsch 4", html: makeFull(`<circle cx="10" cy="10" r="8" fill="#334155"/>`) }
    ];

    const { choices: shuffled, answer } = makeGraphicChoices(choices, "correct", rng);

    return {
        text: `Ein quadratisches Blatt Papier wird gefaltet (${fold.desc}). Dann wird an der roten Stelle ein Loch durchgestochen:<br>${svgFrame(100, 100, fold.foldSvg + punchSvg, "Faltung")}<br> Wie sieht das Papier aus, wenn man es wieder ganz aufgefaltet hat?`,
        choices: shuffled,
        answer,
        explanation: "Beim Auffalten spiegelt sich das Loch an jeder Faltkante."
    };
}

function genOverlappingRects(rng, stage) {
    const w = randInt(rng, 5, 10);
    const h = randInt(rng, 3, 6);
    const overlap = randInt(rng, 1, 3);
    const totalW = 2 * w - overlap;
    
    const svg = svgFrame(120, 60, `
        <rect x="10" y="10" width="${w*5}" height="${h*5}" fill="rgba(59, 130, 246, 0.5)" stroke="#1e40af" stroke-width="1.5"/>
        <rect x="${10 + (w-overlap)*5}" y="10" width="${w*5}" height="${h*5}" fill="rgba(16, 185, 129, 0.5)" stroke="#065f46" stroke-width="1.5"/>
        <text x="${10 + w*2.5}" y="${15 + h*5}" text-anchor="middle" font-size="8">${w}cm</text>
        <text x="${10 + (w-overlap)*5 + w*2.5}" y="${15 + h*5}" text-anchor="middle" font-size="8">${w}cm</text>
    `, "Rechtecke");

    const { choices, answer } = makeChoices(totalW, [2*w, 2*w + overlap, w + overlap, 10], " cm");

    return {
        text: `Zwei identische Rechtecke (je ${w} cm breit) werden so nebeneinander gelegt, dass sie sich um ${overlap} cm überlappen:<br>${svg}<br> Wie breit ist die gesamte Figur von ganz links bis ganz rechts?`,
        choices,
        answer,
        explanation: `Gesamtbreite = Breite1 + Breite2 - Überlappung = ${w} + ${w} - ${overlap} = ${totalW} cm.`
    };
}

function genLogicDie(rng) {
    const top = randInt(rng, 1, 6);
    const correct = 7 - top;
    
    const dieSvg = (val) => svgFrame(40, 40, `
        <rect x="2" y="2" width="36" height="36" rx="6" fill="#fff" stroke="#333" stroke-width="2"/>
        ${renderDieDots(val)}
    `, `Würfel ${val}`);

    function renderDieDots(v) {
        const dots = {
            1: '<circle cx="20" cy="20" r="3" fill="#000"/>',
            2: '<circle cx="10" cy="10" r="3" fill="#000"/><circle cx="30" cy="30" r="3" fill="#000"/>',
            3: '<circle cx="10" cy="10" r="3" fill="#000"/><circle cx="20" cy="20" r="3" fill="#000"/><circle cx="30" cy="30" r="3" fill="#000"/>',
            4: '<circle cx="10" cy="10" r="3" fill="#000"/><circle cx="30" cy="10" r="3" fill="#000"/><circle cx="10" cy="30" r="3" fill="#000"/><circle cx="30" cy="30" r="3" fill="#000"/>',
            5: '<circle cx="10" cy="10" r="3" fill="#000"/><circle cx="30" cy="10" r="3" fill="#000"/><circle cx="20" cy="20" r="3" fill="#000"/><circle cx="10" cy="30" r="3" fill="#000"/><circle cx="30" cy="30" r="3" fill="#000"/>',
            6: '<circle cx="10" cy="10" r="3" fill="#000"/><circle cx="30" cy="10" r="3" fill="#000"/><circle cx="10" cy="20" r="3" fill="#000"/><circle cx="30" cy="20" r="3" fill="#000"/><circle cx="10" cy="30" r="3" fill="#000"/><circle cx="30" cy="30" r="3" fill="#000"/>'
        };
        return dots[v];
    }

    const { choices, answer } = makeChoices(correct, [1, 2, 3, 4, 5, 6].filter(v => v !== correct));

    return {
        text: `Bei einem normalen Spielwürfel ist die Summe der Augen auf gegenüberliegenden Seiten immer 7. Hüpfi sieht oben auf dem Würfel diese Seite:<br>${dieSvg(top)}<br> Wie viele Augen liegen auf der Unterseite, die Hüpfi gerade nicht sehen kann?`,
        choices,
        answer,
        explanation: `Gegenüberliegende Seiten ergeben 7. Also: 7 - ${top} = ${correct}.`
    };
}

function genSpatialBlocks(rng, stage) {
    const shapes = [
        {
            front: `<rect x="10" y="40" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/><rect x="40" y="40" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/><rect x="10" y="10" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/>`,
            top: `<rect x="10" y="10" width="30" height="30" fill="#fbbf24" stroke="#92400e"/><rect x="40" y="10" width="30" height="30" fill="#fbbf24" stroke="#92400e"/>`,
            correct: 3,
            desc: "L-Form liegend"
        },
        {
            front: `<rect x="10" y="40" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/><rect x="40" y="40" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/><rect x="70" y="40" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/><rect x="40" y="10" width="30" height="30" fill="#60a5fa" stroke="#1e40af"/>`,
            top: `<rect x="10" y="10" width="30" height="30" fill="#fbbf24" stroke="#92400e"/><rect x="40" y="10" width="30" height="30" fill="#fbbf24" stroke="#92400e"/><rect x="70" y="10" width="30" height="30" fill="#fbbf24" stroke="#92400e"/>`,
            correct: 4,
            desc: "T-Form liegend"
        }
    ];
    
    const shape = shapes[randInt(rng, 0, shapes.length - 1)];
    const { choices, answer } = makeChoices(shape.correct, [shape.correct + 1, shape.correct - 1, 6, 8]);

    return {
        text: `Hüpfi baut ein Bauwerk aus gleich großen Würfeln. Hier siehst du die Ansicht von VORNE und von OBEN:<br>
               Vorne: ${svgFrame(110, 80, shape.front)} <br>
               Oben: ${svgFrame(110, 80, shape.top)} <br>
               Aus wie vielen Würfeln besteht das Bauwerk mindestens?`,
        choices,
        answer,
        explanation: `Durch den Vergleich von Vorder- und Draufsicht lässt sich die minimale Anzahl der Würfel bestimmen: ${shape.correct}.`
    };
}

function genPathOnCube(rng) {
    const net = `
        <rect x="30" y="0" width="30" height="30" fill="none" stroke="#333"/>
        <rect x="0" y="30" width="30" height="30" fill="none" stroke="#333"/>
        <rect x="30" y="30" width="30" height="30" fill="none" stroke="#333"/>
        <rect x="60" y="30" width="30" height="30" fill="none" stroke="#333"/>
        <rect x="30" y="60" width="30" height="30" fill="none" stroke="#333"/>
        <rect x="30" y="90" width="30" height="30" fill="none" stroke="#333"/>
        <path d="M 30 30 L 60 60" stroke="red" stroke-width="3"/>
    `;
    
    const correct = "Punkt A zu Punkt B"; 
    const distractors = ["Punkt A zu Punkt C", "Punkt B zu Punkt D", "Punkt C zu Punkt E", "Keine Verbindung"];
    
    const { choices, answer } = makeChoices(correct, distractors);
    
    return {
        text: `Auf einem Würfelnetz ist eine rote Linie gezeichnet. Wo verläuft diese Linie, wenn der Würfel zusammengefaltet wird?`,
        choices,
        answer,
        explanation: "Beim Falten treffen bestimmte Kanten und Punkte aufeinander. Man muss die räumliche Zuordnung beachten.",
    };
}

function genLogicKnights(rng) {
    const correct = "A ist ein Knappe, B ist ein Ritter.";
    const distractors = [
        "Beide sind Ritter.",
        "Beide sind Knappen.",
        "A ist ein Ritter, B ist ein Knappe.",
        "Man kann es nicht wissen."
    ];
    
    const { choices, answer } = makeChoices(correct, distractors);
    
    return {
        text: `Auf einer Insel leben nur Ritter (sagen immer die Wahrheit) und Knappen (lügen immer). Du triffst A und B.<br>
               A sagt: "Ich bin ein Knappe oder B ist ein Ritter."<br>
               Was sind A und B?`,
        choices,
        answer,
        explanation: "Wenn A ein Knappe wäre, wäre seine Aussage wahr (da er ein Knappe ist), aber Knappen lügen immer. Also muss A ein Ritter sein. Dann ist seine Aussage wahr, und da er kein Knappe ist, muss B ein Ritter sein."
    };
}

// --- IMPROVED KANGAROO STYLE GENERATORS ---

function genRotation(rng, stage) {
    const shapes = [
        `<path d="M 15 15 L 15 45 L 35 45 L 35 30 L 45 30 L 45 15 Z" fill="#f87171" stroke="#991b1b" stroke-width="2"/>`,
        `<path d="M 15 15 L 45 15 L 45 30 L 35 30 L 35 45 L 25 45 L 25 30 L 15 30 Z" fill="#60a5fa" stroke="#1e40af" stroke-width="2"/>`,
        `<path d="M 15 15 L 35 15 L 35 30 L 45 30 L 45 45 L 25 45 L 25 30 L 15 30 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>`
    ];
    const shapeIdx = randInt(rng, 0, shapes.length - 1);
    const baseShape = shapes[shapeIdx];
    
    const rotations = [0, 90, 180, 270];
    const correctRot = rotations[randInt(rng, 1, 3)];
    
    const makeShapeSvg = (rot, flip = false) => {
        const transform = `rotate(${rot} 30 30)${flip ? ' scale(-1 1) translate(-60 0)' : ''}`;
        return svgFrame(60, 60, `<g transform="${transform}">${baseShape}</g>`, "Form");
    };

    const choices = rotations.map(r => ({
        key: `rot${r}`,
        text: `Gedreht`,
        html: makeShapeSvg(r)
    }));
    
    choices[randInt(rng, 0, 3)] = {
        key: "flipped",
        text: "Spiegelverkehrt",
        html: makeShapeSvg(0, true)
    };

    const targetIdx = randInt(rng, 0, 3);
    const targetSvg = makeShapeSvg(rotations[targetIdx]);

    return {
        text: `Hüpfi das Känguru sieht diese Form hier: <br>${targetSvg}<br> Welche der folgenden Formen ist genau dieselbe Form, nur gedreht?`,
        choices,
        answer: targetIdx,
        explanation: "Die Form kann durch Drehung in die Zielform überführt werden. Spiegelbilder zählen nicht."
    };
}

function genBalanceLogic(rng, stage) {
    const symbols = ["🍎", "🍐", "🍌", "🍓"];
    const s1 = symbols[0], s2 = symbols[1];
    const val1 = randInt(rng, 2, 5);
    const val2 = randInt(rng, 2, 5);
    const weight1 = 2 * val1; 
    const weight2 = val1 + val2;
    const { choices, answer } = makeChoices(val1 + 2*val2, [val1 + val2, 2*val1 + val2, val1 + 3*val2, 10]);
    return {
        text: `Auf zwei Waagen herrscht Gleichgewicht:<br>
               Waage 1: ${s1} + ${s1} wiegt so viel wie ${weight1} kg.<br>
               Waage 2: ${s1} + ${s2} wiegt so viel wie ${weight2} kg.<br>
               Wie schwer ist die Kombination ${s1} + ${s2} + ${s2}?`,
        choices,
        answer,
        explanation: `${s1}=${val1}, ${s2}=${val2}. Somit ${val1}+${val2}+${val2}=${val1 + 2*val2}.`
    };
}

function genUnfolding(rng) {
    const symbols = ['🔴', '🔵', '🟢', '🟡', '⚫', '⚪'];
    const netHtml = `
        <div style="display: grid; grid-template-columns: repeat(3, 30px); grid-template-rows: repeat(4, 30px); gap: 2px; margin: 10px 0;">
            <div style="grid-area: 1/2; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[0]}</div>
            <div style="grid-area: 2/1; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[1]}</div>
            <div style="grid-area: 2/2; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[2]}</div>
            <div style="grid-area: 2/3; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[3]}</div>
            <div style="grid-area: 3/2; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[4]}</div>
            <div style="grid-area: 4/2; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #fff;">${symbols[5]}</div>
        </div>
    `;
    const correct = `${symbols[1]} und ${symbols[3]}`;
    const distractors = [`${symbols[0]} und ${symbols[5]}`, `${symbols[2]} und ${symbols[4]}`, `${symbols[1]} und ${symbols[2]}`, `${symbols[0]} und ${symbols[4]}`];
    const { choices, answer } = makeChoices(correct, distractors);
    return {
        text: `Hüpfi faltet aus diesem Netz einen Würfel:<br>${netHtml}<br> Welche zwei Symbole liegen sich auf dem fertigen Würfel gegenüber?`,
        choices,
        answer,
        explanation: "In einem Würfelnetz liegen Flächen, die durch eine andere Fläche getrennt sind, später gegenüber."
    };
}

function genMissingPiece(rng, stage) {
    const patternType = randInt(rng, 0, 1);
    let patternSvg = "";
    let correctPiece = "";
    let distSvg = [];
    if (patternType === 0) {
        patternSvg = svgFrame(100, 100, `
            <defs><pattern id="p1" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="8" fill="none" stroke="#3b82f6" stroke-width="2"/>
            </pattern></defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#p1)" />
            <rect x="40" y="40" width="20" height="20" fill="white" stroke="#666" stroke-dasharray="4 2" />
        `, "Muster");
        correctPiece = svgFrame(25, 25, `<circle cx="12.5" cy="12.5" r="8" fill="none" stroke="#3b82f6" stroke-width="2"/>`, "Teil");
        distSvg = [
            svgFrame(25, 25, `<rect x="4" y="4" width="17" height="17" fill="none" stroke="#3b82f6" stroke-width="2"/>`),
            svgFrame(25, 25, `<circle cx="12.5" cy="12.5" r="4" fill="#3b82f6"/>`),
            svgFrame(25, 25, `<path d="M 4 4 L 21 21 M 21 4 L 4 21" stroke="#3b82f6" stroke-width="2"/>`),
            svgFrame(25, 25, `<rect x="0" y="0" width="25" height="25" fill="#3b82f6" opacity="0.2"/>`)
        ];
    } else {
        patternSvg = svgFrame(100, 40, `
            <path d="M 0 20 L 20 10 L 40 20 L 60 10 L 80 20 L 100 10" fill="none" stroke="#ef4444" stroke-width="3"/>
            <rect x="35" y="5" width="30" height="30" fill="white" stroke="#666" stroke-dasharray="4 2" />
        `, "Zickzack");
        correctPiece = svgFrame(30, 30, `<path d="M 0 20 L 5 15 L 25 20 L 30 15" fill="none" stroke="#ef4444" stroke-width="3"/>`, "Teil");
        distSvg = [
            svgFrame(30, 30, `<path d="M 0 5 L 30 5" stroke="#ef4444" stroke-width="3"/>`),
            svgFrame(30, 30, `<path d="M 15 0 L 15 30" stroke="#ef4444" stroke-width="3"/>`),
            svgFrame(30, 30, `<circle cx="15" cy="15" r="5" stroke="#ef4444" fill="none" stroke-width="3"/>`),
            svgFrame(30, 30, `<path d="M 0 10 L 15 25 L 30 10" stroke="#ef4444" stroke-width="3"/>`)
        ];
    }
    const { choices, answer } = makeGraphicChoices([{ key: "correct", text: "Dieses Teil", html: correctPiece }, ...distSvg.map((d, i) => ({ key: `w${i}`, text: "Anderes Teil", html: d }))], "correct", rng);
    return {
        text: `In diesem Muster fehlt ein Stück (markiert durch das gestrichelte Quadrat):<br>${patternSvg}<br> Welches Teil passt genau in die Lücke?`,
        choices,
        answer,
        explanation: "Das Teil muss das Muster grafisch korrekt fortsetzen."
    };
}

function genLogicLiars(rng) {
    const names = ["Anton", "Berta", "Clemens"];
    const liarIdx = randInt(rng, 0, 2);
    const correct = names[liarIdx];
    let text;
    if (liarIdx === 1) { text = `${names[0]}: "${names[1]} lügt!"<br>${names[1]}: "${names[2]} lügt!"<br>${names[2]}: "Ich sage die Wahrheit!"`; }
    else if (liarIdx === 0) { text = `${names[0]}: "Berta sagt die Wahrheit."<br>${names[1]}: "Anton lügt."<br>${names[2]}: "Ich bin kein Lügner."`; }
    else { text = `${names[0]}: "Ich sage die Wahrheit."<br>${names[1]}: "Anton sagt die Wahrheit."<br>${names[2]}: "Anton lügt."`; }
    const { choices, answer } = makeChoices(correct, names.filter(n => n !== correct));
    return {
        text: `Drei Kinder machen eine Aussage. Genau eines von ihnen lügt immer, die anderen sagen immer die Wahrheit.<br>${text}<br> Wer ist der Lügner?`,
        choices,
        answer,
        explanation: "Nur wenn diese Person lügt (und die anderen die Wahrheit sagen), gibt es keinen logischen Widerspruch."
    };
}

function genPaintedCube(rng, stage) {
    const size = randInt(rng, 3, 4);
    const total = size * size * size;
    const type = randInt(rng, 0, 2); 
    let correct, questionText;
    if (type === 0) { correct = 8; questionText = "3 Seiten"; }
    else if (type === 1) { correct = 12 * (size - 2); questionText = "2 Seiten"; }
    else { correct = 6 * (size - 2) * (size - 2); questionText = "1 Seite"; }
    const { choices, answer } = makeChoices(correct, [total, 12, 0, size * size, 4]);
    return {
        text: `Hüpfi hat einen großen Würfel aus ${size}x${size}x${size} kleinen weißen Würfeln gebaut. Er malt die Außenseite komplett rot an und nimmt ihn dann wieder auseinander. Wie viele kleine Würfel haben jetzt an genau <strong>${questionText}</strong> rote Farbe?`,
        choices,
        answer,
        explanation: `Bei einem ${size}x${size}x${size} Würfel haben 8 Ecken 3 Seiten, 12*(size-2) Kanten 2 Seiten und 6*(size-2)^2 Flächen 1 Seite angemalt.`
    };
}

// --- UTILITIES ---

function pointsForQuestion(config, number) {
    if (config.tasks === 24) {
        if (number <= 8) return 3;
        if (number <= 16) return 4;
        return 5;
    }
    if (number <= 10) return 3;
    if (number <= 20) return 4;
    return 5;
}

function seededRandom(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return () => {
        value = value * 16807 % 2147483647;
        return (value - 1) / 2147483646;
    };
}

function randInt(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
}

function shuffleWithRng(items, rng) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function makeChoices(correct, distractors, suffix = "") {
    const values = [correct, ...distractors]
        .filter((value, index, array) => array.indexOf(value) === index)
        .slice(0, 5);
    while (values.length < 5) values.push(correct + values.length + 2);
    const choices = shuffleWithRng(values.slice(0, 5), Math.random).map(value => `${value}${suffix}`);
    const answerText = `${correct}${suffix}`;
    const answer = choices.indexOf(answerText);
    return { choices, answer };
}

function makeGraphicChoices(items, correctKey, rng) {
    const unique = [];
    const seen = new Set();
    items.forEach(item => {
        if (!seen.has(item.key)) {
            seen.add(item.key);
            unique.push(item);
        }
    });
    const choices = shuffleWithRng(unique.slice(0, 5), rng);
    return { choices, answer: choices.findIndex(choice => choice.key === correctKey) };
}

function numericChoiceValues(correct, candidates, min, max) {
    const values = [];
    const add = value => {
        const rounded = Math.round(value);
        const bounded = Math.max(min, Math.min(max, rounded));
        if (!values.includes(bounded)) values.push(bounded);
    };
    add(correct);
    candidates.forEach(add);
    let step = 1;
    while (values.length < 5 && step <= 40) {
        add(correct + step);
        add(correct - step);
        step += 1;
    }
    return values.slice(0, 5);
}

function svgFrame(width, height, body, label) {
    return `<svg class="kangaroo-choice-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

function gridChoiceSvg(rows, cols, removed) {
    const cell = 12;
    const gap = 2;
    const pad = 5;
    const width = cols * cell + (cols - 1) * gap + pad * 2;
    const height = rows * cell + (rows - 1) * gap + pad * 2;
    const total = rows * cols;
    const missing = Math.max(0, Math.min(total, removed));
    const missingCells = new Set();
    for (let i = 0; i < missing; i++) {
        const row = Math.floor(i / cols);
        const col = cols - 1 - i % cols;
        missingCells.add(`${row}:${col}`);
    }
    let body = `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>`;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = pad + col * (cell + gap);
            const y = pad + row * (cell + gap);
            const isMissing = missingCells.has(`${row}:${col}`);
            body += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${isMissing ? "#ffffff" : "#38bdf8"}" stroke="${isMissing ? "#94a3b8" : "#0369a1"}" stroke-dasharray="${isMissing ? "3 2" : "0"}"/>`;
        }
    }
    return svgFrame(width, height, body, `${rows} mal ${cols} Gitter`);
}

function clockChoiceSvg(hour) {
    const center = 36;
    const radius = 28;
    const normalized = hour % 12 || 12;
    const angle = (normalized * 30 - 90) * Math.PI / 180;
    const handX = center + Math.cos(angle) * 18;
    const handY = center + Math.sin(angle) * 18;
    let ticks = "";
    for (let i = 0; i < 12; i++) {
        const tickAngle = (i * 30 - 90) * Math.PI / 180;
        const x1 = center + Math.cos(tickAngle) * 23;
        const y1 = center + Math.sin(tickAngle) * 23;
        const x2 = center + Math.cos(tickAngle) * 26;
        const y2 = center + Math.sin(tickAngle) * 26;
        ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#64748b" stroke-width="1.5"/>`;
    }
    const body = `<circle cx="${center}" cy="${center}" r="${radius}" fill="#ffffff" stroke="#0f766e" stroke-width="3"/>${ticks}<line x1="${center}" y1="${center}" x2="${handX.toFixed(1)}" y2="${handY.toFixed(1)}" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/><line x1="${center}" y1="${center}" x2="${center}" y2="${center - 22}" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/><circle cx="${center}" cy="${center}" r="3" fill="#0f172a"/>`;
    return svgFrame(72, 72, body, `${hour} Uhr`);
}

function digitCardSvg(number) {
    const digits = String(number).padStart(3, "0").split("");
    const body = digits.map((digit, index) => {
        const x = 8 + index * 34;
        return `<g><rect x="${x}" y="10" width="28" height="38" rx="5" fill="#fef3c7" stroke="#92400e" stroke-width="2"/><text x="${x + 14}" y="36" text-anchor="middle" font-size="22" font-weight="800" fill="#7c2d12">${digit}</text></g>`;
    }).join("");
    return svgFrame(112, 58, body, `Zahlenkarten ${number}`);
}

function patternStripSvg(sequence) {
    const cell = 12;
    const gap = 2;
    const shown = sequence.slice(0, 14);
    const width = shown.length * cell + (shown.length - 1) * gap + 10;
    const body = `<rect x="1" y="1" width="${width - 2}" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>` + shown.map((color, index) => {
        const fill = color === "r" ? "#ef4444" : "#3b82f6";
        const stroke = color === "r" ? "#991b1b" : "#1d4ed8";
        return `<rect x="${5 + index * (cell + gap)}" y="9" width="${cell}" height="${cell}" rx="2" fill="${fill}" stroke="${stroke}"/>`;
    }).join("");
    return svgFrame(width, 32, body, "Musterleiste");
}

function borderGridSvg(side, mode) {
    const cell = 10;
    const gap = 1;
    const pad = 5;
    const size = side * cell + (side - 1) * gap + pad * 2;
    let body = `<rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>`;
    for (let row = 0; row < side; row++) {
        for (let col = 0; col < side; col++) {
            const isBorder = row === 0 || col === 0 || row === side - 1 || col === side - 1;
            const isBlue = mode === "border" && isBorder
                || mode === "all"
                || mode === "diagonal" && row === col
                || mode === "corners" && (row === 0 || row === side - 1) && (col === 0 || col === side - 1)
                || mode === "inner" && !isBorder;
            body += `<rect x="${pad + col * (cell + gap)}" y="${pad + row * (cell + gap)}" width="${cell}" height="${cell}" fill="${isBlue ? "#2563eb" : "#ffffff"}" stroke="#94a3b8"/>`;
        }
    }
    return svgFrame(size, size, body, `${side} mal ${side} Feld`);
}

function angleChoiceSvg(degrees) {
    const sweep = Math.max(20, Math.min(150, degrees));
    const endAngle = (180 - sweep) * Math.PI / 180;
    const x2 = 20 + Math.cos(endAngle) * 46;
    const y2 = 54 - Math.sin(endAngle) * 46;
    const arcX = 20 + Math.cos(endAngle) * 22;
    const arcY = 54 - Math.sin(endAngle) * 22;
    const body = `<line x1="12" y1="54" x2="74" y2="54" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="54" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/><path d="M42 54 A22 22 0 0 0 ${arcX.toFixed(1)} ${arcY.toFixed(1)}" fill="none" stroke="#f59e0b" stroke-width="3"/><circle cx="20" cy="54" r="3" fill="#0f172a"/><text x="54" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#7c2d12">${degrees}°</text>`;
    return svgFrame(84, 64, body, `${degrees} Grad`);
}

// --- BASIC GENERATORS ---

function genSequence(rng, stage) {
    const start = randInt(rng, 2, 8 + stage);
    const step = randInt(rng, 2, 4 + Math.floor(stage / 2));
    const correct = start + step * 5;
    const { choices, answer } = makeChoices(correct, [correct - step, correct + step, correct + 2 * step, correct - 2]);
    return {
        text: `Hüpfi schreibt für ein Geheimtor immer nach derselben Regel weiter. Auf ihrem Zettel stehen ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ${start + 4 * step}, ... Welche Zahl muss als nächste Zahl in die Reihe?`,
        choices,
        answer,
        explanation: `Jedes Mal wird ${step} addiert.`
    };
}

function genPerimeter(rng, stage) {
    const a = randInt(rng, 3 + stage, 8 + stage);
    const b = randInt(rng, 2, 7 + Math.floor(stage / 2));
    const correct = 2 * (a + b);
    const { choices, answer } = makeChoices(correct, [a * b, a + b, correct + 4, correct - 2], " cm");
    return {
        text: `Im Werkraum legt eine Klasse eine Schnur genau um ein rechteckiges Schild. Das Schild ist ${a} cm lang und ${b} cm breit. Wie lang muss die Schnur mindestens sein, wenn sie einmal ganz rundherum reichen soll?`,
        choices,
        answer,
        explanation: `Umfang = ${a}+${b}+${a}+${b} = ${correct} cm.`
    };
}

function genCalendar(rng) {
    const dayIndex = randInt(rng, 0, 6);
    const later = randInt(rng, 9, 26);
    const correctIndex = (dayIndex + later) % 7;
    const names = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const dayChoices = shuffleWithRng([0, 1, 2, 3, 4].map(offset => (correctIndex + offset) % 7), rng);
    return {
        text: `Die Mathegruppe plant ein kleines Turnier. Heute ist ${names[dayIndex]}; die Einladungen sollen aber erst in ${later} Tagen verteilt werden. Auf welchen Wochentag fällt dieser Tag?`,
        choices: dayChoices.map(index => names[index]),
        answer: dayChoices.indexOf(correctIndex),
        explanation: `${later} Tage entsprechen ${later % 7} Tagen weiter im Wochenkreis: ${names[dayIndex]} + ${later % 7} Tage = ${names[correctIndex]}.`
    };
}

function genFraction(rng, stage) {
    const denominator = stage < 7 ? randInt(rng, 3, 6) : randInt(rng, 4, 9);
    const numerator = randInt(rng, 1, denominator - 1);
    const unit = randInt(rng, 3, 9);
    const total = denominator * unit;
    const correct = numerator * unit;
    const { choices, answer } = makeChoices(correct, [correct + unit, Math.max(1, correct - unit), total - correct, denominator + numerator]);
    return {
        text: `Bei einem Knobelspiel machen ${total} Kinder mit. Nach der ersten Runde haben ${numerator}/${denominator} der Kinder die Aufgabe richtig gelöst. Wie viele Kinder sind das?`,
        choices,
        answer,
        explanation: `${total} : ${denominator} = ${unit}; ${numerator} Teile sind ${correct}.`
    };
}

function genShopping(rng, stage) {
    const pen = randInt(rng, 2, 5);
    const book = randInt(rng, 4, 7 + stage);
    const pens = randInt(rng, 2, 5);
    const books = randInt(rng, 1, 3);
    const correct = pens * pen + books * book;
    const { choices, answer } = makeChoices(correct, [correct + pen, correct - book, pens + books + pen + book, correct + 3], " €");
    return {
        text: `Für eine Zeichenrunde werden im Schulshop Materialien gekauft. Ein Stift kostet ${pen} €, ein Heft kostet ${book} €. Wie viel muss die Gruppe für ${pens} Stifte und ${books} Hefte zusammen bezahlen?`,
        choices,
        answer,
        explanation: `${pens}*${pen} + ${books}*${book} = ${correct}.`
    };
}

function genAverage(rng, stage) {
    const correct = randInt(rng, 8, 18 + Math.floor(stage / 2));
    const delta = randInt(rng, 2, 7);
    const a = correct - delta;
    const b = correct;
    const c = correct + delta;
    const { choices, answer } = makeChoices(correct, [correct - 2, correct + 2, a + b + c, b + delta]);
    return {
        text: `Drei Kinder sammeln bei drei Stationen Punkte: ${a}, ${b} und ${c}. Die Lehrperson möchte wissen, wie viele Punkte ein Kind im Durchschnitt erreicht hat. Welcher Wert passt?`,
        choices,
        answer,
        explanation: `Zusammen sind es ${a + b + c}; durch 3 geteilt ergibt ${correct}.`
    };
}

function genScale(rng) {
    const box = randInt(rng, 3, 8);
    const ball = randInt(rng, 2, 6);
    const correct = 2 * box + 3 * ball;
    const { choices, answer } = makeChoices(correct, [box + ball, 3 * box + ball, correct - ball, correct + box], " kg");
    return {
        text: `Beim Aufräumen im Turnsaal werden gleich schwere Kisten und Bälle auf einen Wagen gelegt. Eine Kiste wiegt ${box} kg, ein Ball wiegt ${ball} kg. Wie schwer sind 2 Kisten und 3 Bälle zusammen?`,
        choices,
        answer,
        explanation: `2*${box} + 3*${ball} = ${correct} kg.`
    };
}

function genGrid(rng, stage) {
    const rows = randInt(rng, 3, 5 + Math.floor(stage / 3));
    const cols = randInt(rng, 4, 6 + Math.floor(stage / 3));
    const cut = randInt(rng, 1, Math.min(rows, cols));
    const correct = rows * cols - cut;
    const values = numericChoiceValues(correct, [rows * cols, correct - 1, correct - cut, rows + cols], 1, rows * cols);
    const { choices, answer } = makeGraphicChoices(values.map(value => ({
        key: value,
        text: `${value} Felder`,
        html: gridChoiceSvg(rows, cols, rows * cols - value)
    })), correct, rng);
    return {
        text: `Auf einem Spielplan liegen kleine quadratische Plättchen in ${rows} Reihen und ${cols} Spalten. Rechts oben werden ${cut} Plättchen weggenommen. Welche Zeichnung zeigt, wie viele Plättchen noch auf dem Plan liegen?`,
        choices,
        answer,
        explanation: `${rows}*${cols} = ${rows * cols}; danach bleiben ${correct}.`
    };
}

function genRemainder(rng, stage) {
    const divisor = randInt(rng, 3, 8);
    const quotient = randInt(rng, 4, 8 + stage);
    const remainder = randInt(rng, 1, divisor - 1);
    const number = divisor * quotient + remainder;
    const { choices, answer } = makeChoices(remainder, [divisor - remainder, quotient, remainder + 1, 0]);
    return {
        text: `Eine Gruppe teilt ${number} Spielkarten möglichst gleich auf ${divisor} Stapel auf. Alle vollen Stapel sollen gleich viele Karten haben. Wie viele Karten bleiben dann übrig?`,
        choices,
        answer,
        explanation: `${number} = ${divisor}*${quotient} + ${remainder}.`
    };
}

function genRectangleArea(rng, stage) {
    const width = randInt(rng, 4, 9 + Math.floor(stage / 2));
    const height = randInt(rng, 3, 7 + Math.floor(stage / 3));
    const missing = randInt(rng, 2, Math.min(width, height));
    const correct = width * height - missing * missing;
    const { choices, answer } = makeChoices(correct, [width * height, correct + missing, correct - missing, 2 * (width + height)], " cm²");
    return {
        text: `Aus einem Papierstück mit ${width} cm Länge und ${height} cm Breite wird an einer Ecke ein Quadrat mit ${missing} cm Seitenlänge herausgeschnitten. Wie groß ist die Fläche des restlichen Papierstückks?`,
        choices,
        answer,
        explanation: `Rechteck: ${width * height} cm², Ausschnitt: ${missing * missing} cm².`
    };
}

function genLogicOrder(rng) {
    const total = randInt(rng, 7, 12);
    const before = randInt(rng, 2, total - 4);
    const after = total - before - 1;
    const correct = before + 1;
    const { choices, answer } = makeChoices(correct, [after + 1, total - before, before, total]);
    return {
        text: `Vor der Sporthalle stellen sich ${total} Kinder in einer Reihe an. Hüpfi steht so, dass vor ihr genau ${before} Kinder stehen. An welcher Stelle steht Hüpfi, wenn man von vorne zu zählen beginnt?`,
        choices,
        answer,
        explanation: `Wenn ${before} Kinder vor ihr stehen, ist Hüpfi auf Platz ${before + 1}.`
    };
}

function genClock(rng) {
    const start = randInt(rng, 1, 12);
    const add = randInt(rng, 5, 17);
    const correct = (start + add - 1) % 12 + 1;
    const hourValues = [];
    [correct, correct % 12 + 1, (correct + 2) % 12 + 1, start, (correct + 5) % 12 + 1, (correct + 8) % 12 + 1].forEach(value => {
        const hour = (value - 1) % 12 + 1;
        if (!hourValues.includes(hour)) hourValues.push(hour);
    });
    const { choices, answer } = makeGraphicChoices(hourValues.map(value => ({
        key: value,
        text: `${value}:00`,
        html: clockChoiceSvg(value)
    })), correct, rng);
    return {
        text: `Im Känguru-Camp beginnt eine Nachtwanderung, als die Uhr ${start}:00 zeigt. ${add} Stunden später schaut jemand wieder auf die Uhr. Welche Uhr passt zu diesem Zeitpunkt?`,
        choices,
        answer,
        explanation: `Nach jeweils 12 Stunden beginnt die Stundenzahl wieder von vorne.`
    };
}

function genCombinations(rng, stage) {
    const shirts = randInt(rng, 3, 5 + Math.floor(stage / 3));
    const pants = randInt(rng, 2, 4 + Math.floor(stage / 4));
    const correct = shirts * pants;
    const { choices, answer } = makeChoices(correct, [shirts + pants, correct + shirts, correct - pants, shirts * pants + 2]);
    return {
        text: `Hüpfine packt für eine Projektwoche Kleidung ein. Sie hat ${shirts} verschiedene T-Shirts und ${pants} verschiedene Hosen. Wie viele Outfits kann sie zusammenstellen, wenn jedes Outfit aus genau einem T-Shirt und genau einer Hose besteht?`,
        choices,
        answer,
        explanation: `Zu jedem T-Shirt passen ${pants} Hosen: ${shirts}*${pants} = ${correct}.`
    };
}

function genCubes(rng, stage) {
    const length = randInt(rng, 3, 5);
    const width = randInt(rng, 2, 4);
    const height = randInt(rng, 2, stage >= 7 ? 4 : 3);
    const missing = randInt(rng, 1, width);
    const correct = length * width * height - missing;
    const { choices, answer } = makeChoices(correct, [length * width * height, correct - height, correct + missing, length + width + height]);
    return {
        text: `Ein Bauwerk soll eigentlich ein voller Quader aus kleinen Würfeln sein: ${length} Würfel lang, ${width} Würfel breit und ${height} Würfel hoch. Beim Aufbauen fehlen vorne ${missing} Würfel. Wie viele Würfel sind trotzdem vorhanden?`,
        choices,
        answer,
        explanation: `Voll wären es ${length * width * height}; es fehlen ${missing}.`
    };
}

function genEquation(rng, stage) {
    const x = randInt(rng, 3, 9 + Math.floor(stage / 2));
    const factor = randInt(rng, 2, 5);
    const add = randInt(rng, 4, 13);
    const result = factor * x + add;
    const { choices, answer } = makeChoices(x, [x + 1, x - 1, result - add, result]);
    return {
        text: `Auf einer Rechenkarte steht eine verdeckte Zahl x. Wenn man diese Zahl mit ${factor} multipliziert und danach ${add} addiert, erhält man ${result}. Welche Zahl steckt hinter x?`,
        choices,
        answer,
        explanation: `${result} - ${add} = ${result - add}; ${result - add} : ${factor} = ${x}.`
    };
}

function genAngle(rng, stage) {
    const angle = randInt(rng, 25, stage >= 7 ? 120 : 90);
    const correct = 180 - angle;
    const angleValues = numericChoiceValues(correct, [angle, Math.abs(90 - angle), correct - 10, correct + 10], 10, 170);
    const { choices, answer } = makeGraphicChoices(angleValues.map(value => ({
        key: value,
        text: `${value}°`,
        html: angleChoiceSvg(value)
    })), correct, rng);
    return {
        text: `Auf einem Geobrett liegen zwei Winkel direkt nebeneinander auf einer geraden Linie. Der linke Winkel ist ${angle}° groß. Welche Zeichnung kann den anderen Winkel zeigen?`,
        choices,
        answer,
        explanation: `Nebenwinkel ergeben zusammen 180°.`
    };
}

function genPercent(rng, stage) {
    const base = randInt(rng, 6, 14) * 10;
    const percent = stage >= 7 ? [10, 20, 25, 50][randInt(rng, 0, 3)] : [10, 50][randInt(rng, 0, 1)];
    const correct = base * percent / 100;
    const { choices, answer } = makeChoices(correct, [base - correct, correct + 10, percent, base + correct]);
    return {
        text: `Bei einem Schulfest werden ${base} Lose vorbereitet. ${percent}% davon sind Gewinnlose. Wie viele Gewinnlose gibt es?`,
        choices,
        answer,
        explanation: `${percent}% bedeutet ${percent} von 100; das sind ${correct}.`
    };
}

function genPathCount(rng) {
    const right = randInt(rng, 2, 4);
    const up = randInt(rng, 2, 3);
    const correct = binomial(right + up, right);
    const { choices, answer } = makeChoices(correct, [right * up, correct - 2, correct + 2, right + up]);
    return {
        text: `Eine Spielfigur steht links unten auf einem Gitter und soll auf kürzestem Weg nach rechts oben. Sie darf nur ${right} Schritte nach rechts und ${up} Schritte nach oben machen, aber die Reihenfolge darf wechseln. Wie viele kürzeste Wege gibt es?`,
        choices,
        answer,
        explanation: `Die Reihenfolge der ${right} Rechts- und ${up} Hoch-Schritte entscheidet: ${correct} Wege.`
    };
}

function genTrianglePerimeter(rng, stage) {
    const a = randInt(rng, 4, 8 + Math.floor(stage / 2));
    const b = randInt(rng, 4, 8 + Math.floor(stage / 2));
    const c = randInt(rng, 5, 10 + Math.floor(stage / 2));
    const correct = a + b + c;
    const { choices, answer } = makeChoices(correct, [a * b, correct - c, correct + 3, a + b], " cm");
    return {
        text: `Für ein dreieckiges Namensschild sollen alle drei Kanten mit einem Band beklebt werden. Die Seiten sind ${a} cm, ${b} cm und ${c} cm lang. Wie viele Zentimeter Band braucht man insgesamt?`,
        choices,
        answer,
        explanation: `Alle drei Seiten werden addiert: ${a}+${b}+${c} = ${correct} cm.`
    };
}

function genMissingNumber(rng, stage) {
    const x = randInt(rng, 5, 18 + stage);
    const add = randInt(rng, 7, 24);
    const result = x + add;
    const { choices, answer } = makeChoices(x, [add, result, x + 2, Math.max(1, x - 3)]);
    return {
        text: `Auf einem Arbeitsblatt ist eine Zahl mit einem Fleck verdeckt. Man kann noch lesen: verdeckte Zahl + ${add} = ${result}. Welche Zahl muss unter dem Fleck stehen?`,
        choices,
        answer,
        explanation: `${result} - ${add} = ${x}.`
    };
}

function genDigitSum(rng, stage) {
    const tens = randInt(rng, 2, 8);
    const ones = randInt(rng, 1, 9);
    const number = stage >= 7 ? tens * 100 + ones * 10 + randInt(rng, 1, 9) : tens * 10 + ones;
    const correct = String(number).split("").reduce((sum, digit) => sum + Number(digit), 0);
    const { choices, answer } = makeChoices(correct, [correct + 1, correct - 1, tens * ones, number % 10]);
    return {
        text: `Auf einem Tresor steht die Zahl ${number}. Der Code zum Öffnen ist nicht die Zahl selbst, sondern ihre Ziffernsumme. Welche Zahl muss eingegeben werden?`,
        choices,
        answer,
        explanation: `Die Ziffern werden addiert: ${String(number).split("").join("+")} = ${correct}.`
    };
}

function genBorderTiles(rng, stage) {
    const side = randInt(rng, 4, 7 + Math.floor(stage / 3));
    const correct = side * side - (side - 2) * (side - 2);
    const modes = [
        { key: "border", text: `Randfelder: ${correct}`, html: borderGridSvg(side, "border") },
        { key: "all", text: `Alle Felder: ${side * side}`, html: borderGridSvg(side, "all") },
        { key: "diagonal", text: "Nur Diagonale", html: borderGridSvg(side, "diagonal") },
        { key: "corners", text: "Nur Ecken", html: borderGridSvg(side, "corners") },
        { key: "inner", text: "Nur Innenfeld", html: borderGridSvg(side, "inner") }
    ];
    const { choices, answer } = makeGraphicChoices(modes, "border", rng);
    return {
        text: `Ein quadratisches Feld hat ${side} Reihen und ${side} Spalten. Für ein Spiel sollen genau die Randfelder blau gefärbt werden, die inneren Felder bleiben weiß. Welche Zeichnung passt dazu?`,
        choices,
        answer,
        explanation: `Alle Felder minus inneres Quadrat: ${side * side} - ${(side - 2) * (side - 2)} = ${correct}.`
    };
}

function genAge(rng, stage) {
    const younger = randInt(rng, 7, 11 + Math.floor(stage / 2));
    const diff = randInt(rng, 2, 7);
    const correct = younger + diff;
    const { choices, answer } = makeChoices(correct, [younger - diff, younger + diff + 1, diff, younger * 2]);
    return {
        text: `Hüpfi und sein Freund vergleichen ihre Geburtstage. Sam ist ${younger} Jahre alt. Alex ist ${diff} Jahre älter als Sam. Wie alt ist Alex?`,
        choices,
        answer,
        explanation: `Älter bedeutet addieren: ${younger}+${diff} = ${correct}.`
    };
}

function genBusSeats(rng, stage) {
    const rows = randInt(rng, 5, 9 + Math.floor(stage / 3));
    const seats = randInt(rng, 2, 4);
    const occupied = randInt(rng, 4, rows * seats - 4);
    const correct = rows * seats - occupied;
    const { choices, answer } = makeChoices(correct, [rows * seats, occupied, correct + seats, Math.max(0, correct - 2)]);
    return {
        text: `Eine Klasse steigt in einen Bus. Der Bus hat ${rows} Reihen mit jeweils ${seats} Sitzen. Schon ${occupied} Sitze sind besetzt. Wie viele Sitze sind noch frei?`,
        choices,
        answer,
        explanation: `Insgesamt gibt es ${rows * seats} Sitze. ${rows * seats}-${occupied} = ${correct}.`
    };
}

function genMapDistance(rng, stage) {
    const scale = randInt(rng, 2, 5 + Math.floor(stage / 3));
    const cm = randInt(rng, 3, 9);
    const correct = scale * cm;
    const { choices, answer } = makeChoices(correct, [scale + cm, correct + scale, correct - scale, cm], " km");
    return {
        text: `Auf einer Wanderkarte entspricht 1 cm auf dem Papier genau ${scale} km in Wirklichkeit. Zwei Hütten liegen auf der Karte ${cm} cm auseinander. Wie weit sind sie in Wirklichkeit voneinander entfernt?`,
        choices,
        answer,
        explanation: `${cm}*${scale} = ${correct} km.`
    };
}

function genBookPages(rng, stage) {
    const days = randInt(rng, 3, 6);
    const pages = randInt(rng, 8, 14 + stage);
    const correct = days * pages;
    const { choices, answer } = makeChoices(correct, [days + pages, correct - pages, correct + days, pages * (days + 1)]);
    return {
        text: `Hüpfine nimmt sich vor, in den Ferien jeden Tag gleich viel zu lesen. Sie liest ${days} Tage lang jeden Tag ${pages} Seiten. Wie viele Seiten hat sie danach insgesamt gelesen?`,
        choices,
        answer,
        explanation: `${days} Tage mit je ${pages} Seiten ergeben ${correct} Seiten.`
    };
}

function genLargestNumber(rng) {
    const a = randInt(rng, 1, 8);
    const b = randInt(rng, 0, 9);
    const c = randInt(rng, 0, 9);
    const digits = [a, b, c].sort((x, y) => y - x);
    const correct = digits[0] * 100 + digits[1] * 10 + digits[2];
    const numbers = numericChoiceValues(correct, [a * 100 + b * 10 + c, digits[2] * 100 + digits[1] * 10 + digits[0], correct - 9, correct - 90], 100, 999);
    const { choices, answer } = makeGraphicChoices(numbers.map(value => ({
        key: value,
        text: `${value}`,
        html: digitCardSvg(value)
    })), correct, rng);
    return {
        text: `Drei Zahlenkarten tragen die Ziffern ${a}, ${b} and ${c}. Die Karten dürfen umgelegt werden, aber jede Karte muss genau einmal verwendet werden. Welche Anordnung bildet die größte dreistellige Zahl?`,
        choices,
        answer,
        explanation: `Die größte Ziffer kommt nach vorne: ${correct}.`
    };
}

function genHandshake(rng, stage) {
    const people = randInt(rng, 4, stage >= 7 ? 8 : 6);
    const correct = people * (people - 1) / 2;
    const { choices, answer } = makeChoices(correct, [people * 2, people * (people - 1), correct - 1, correct + people]);
    return {
        text: `Bei einer kleinen Siegerehrung begrüßen sich ${people} Kinder. Jedes Kind gibt jedem anderen Kind genau einmal die Hand. Wie viele Handschläge gibt es insgesamt?`,
        choices,
        answer,
        explanation: `Jedes Paar zählt einmal: ${people}*${people - 1}/2 = ${correct}.`
    };
}

function genPatternTiles(rng) {
    const full = randInt(rng, 3, 7);
    const extra = randInt(rng, 0, 2);
    const length = full * 3 + extra;
    const correctSequence = Array.from({ length }, (_, index) => index % 3 === 0 ? "r" : "b");
    const variants = [
        { key: "correct", text: "rot, blau, blau, ...", html: patternStripSvg(correctSequence) },
        { key: "shifted", text: "blau, rot, blau, ...", html: patternStripSvg(Array.from({ length }, (_, index) => index % 3 === 1 ? "r" : "b")) },
        { key: "alternating", text: "rot, blau, rot, ...", html: patternStripSvg(Array.from({ length }, (_, index) => index % 2 === 0 ? "r" : "b")) },
        { key: "double", text: "rot, rot, blau, ...", html: patternStripSvg(Array.from({ length }, (_, index) => index % 3 === 2 ? "b" : "r")) },
        { key: "few", text: "nur jeder vierte rot", html: patternStripSvg(Array.from({ length }, (_, index) => index % 4 === 0 ? "r" : "b")) }
    ];
    const { choices, answer } = makeGraphicChoices(variants, "correct", rng);
    return {
        text: `Eine Girlande wird nach einer festen Regel gelegt: rot, blau, blau, rot, blau, blau, ... Insgesamt soll die Leiste ${length} Felder lang sein. Welche Antwort zeigt den richtigen Anfang der Leiste?`,
        choices,
        answer,
        explanation: `Der Dreierblock rot-blau-blau wird immer wiederholt.`
    };
}

function genBalance(rng, stage) {
    const box = randInt(rng, 3, 8 + Math.floor(stage / 2));
    const small = randInt(rng, 1, 4);
    const correct = box - small;
    const { choices, answer } = makeChoices(correct, [box + small, box, small, correct + 2], " kg");
    return {
        text: `Im Lager wird eine Kiste gewogen: Sie wiegt ${box} kg. Daneben liegt ein Paket, das ${small} kg leichter ist als die Kiste. Wie schwer ist dieses Paket?`,
        choices,
        answer,
        explanation: `Leichter bedeutet abziehen: ${box}-${small} = ${correct} kg.`
    };
}

function binomial(n, k) {
    let result = 1;
    for (let i = 1; i <= k; i++) result = result * (n - k + i) / i;
    return Math.round(result);
}

function openKangarooWorksheet() {
    const config = KANGAROO_STATE.config;
    const test = KANGAROO_STATE.test.length ? KANGAROO_STATE.test : buildKangarooTest(config);
    const win = window.open("", "_blank");
    if (!win) {
        renderKangarooWorksheetPreview(test, config);
        return;
    }
    win.document.write(`
        <!doctype html>
        <html lang="de">
        <head>
            <meta charset="utf-8">
            <title>Känguru-Training ${config.label}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 24px; color: #111827; }
                h1 { margin-bottom: 4px; }
                .meta { color: #475569; margin-bottom: 18px; }
                .task { break-inside: avoid; border-top: 1px solid #cbd5e1; padding: 10px 0; }
                .task strong { display: inline-block; min-width: 90px; }
                ol { margin-top: 6px; columns: 2; }
                li { break-inside: avoid; margin-bottom: 4px; }
                .kangaroo-print-choice { align-items: center; display: inline-flex; gap: 8px; min-height: 52px; vertical-align: top; }
                .kangaroo-print-choice svg { max-height: 54px; width: auto; }
                .solutions { margin-top: 24px; border-top: 3px solid #111827; padding-top: 12px; }
                table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
                th, td { border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; }
                @media print { body { margin: 12mm; } button { display: none; } }
            </style>
        </head>
        <body>
            <button onclick="window.print()">Drucken</button>
            <h1>Känguru-Training: ${config.category}</h1>
            <p class="meta">${config.label} - ${config.tasks} Aufgaben - ${config.minutes} Minuten - Startpunkte: ${config.start} - ${scoreDescription(config)}</p>
            ${test.map(question => `
                <section class="task">
                    <p><strong>${question.number}. (${question.points} P.)</strong> ${question.text}</p>
                    <ol type="A">${question.choices.map(choice => `<li>${renderKangarooWorksheetChoice(choice)}</li>`).join("")}</ol>
                </section>
            `).join("")}
            <section class="solutions">
                <h2>Lösungen</h2>
                <table>
                    <thead><tr><th>Nr.</th><th>Antwort</th><th>Kurze Begründung</th></tr></thead>
                    <tbody>
                        ${test.map(question => `<tr><td>${question.number}</td><td>${String.fromCharCode(65 + question.answer)}) ${choiceText(question.choices[question.answer])}</td><td>${question.explanation}</td></tr>`).join("")}
                    </tbody>
                </table>
                <p>Offizielle alte Aufgaben und Lösungen: ${KANGAROO_ARCHIVE_URL}</p>
            </section>
        </body>
        </html>
    `);
    win.document.close();
}

function renderKangarooWorksheetPreview(test, config) {
    const host = document.getElementById("kangarooWorksheetPreview") || document.createElement("div");
    host.id = "kangarooWorksheetPreview";
    host.className = "kangaroo-worksheet-preview";
    host.innerHTML = `
        <div class="kangaroo-worksheet-head">
            <div>
                <strong>Arbeitsblatt: ${config.category}</strong>
                <span>${config.label} - ${config.tasks} Aufgaben - ${config.minutes} Minuten</span>
            </div>
            <button type="button" class="kangaroo-secondary" onclick="window.print()">Drucken</button>
        </div>
        <ol class="kangaroo-worksheet-list">
            ${test.map(question => `
                <li>
                    <strong>(${question.points} P.)</strong> ${question.text}
                    <ol type="A">${question.choices.map(choice => `<li>${renderKangarooWorksheetChoice(choice)}</li>`).join("")}</ol>
                </li>
            `).join("")}
        </ol>
        <details open>
            <summary>Lösungen anzeigen</summary>
            <table class="kangaroo-solution-table">
                <thead><tr><th>Nr.</th><th>Antwort</th><th>Begründung</th></tr></thead>
                <tbody>
                    ${test.map(question => `<tr><td>${question.number}</td><td>${String.fromCharCode(65 + question.answer)}) ${choiceText(question.choices[question.answer])}</td><td>${question.explanation}</td></tr>`).join("")}
                </tbody>
            </table>
        </details>
    `;
    const area = document.getElementById("kangarooTestArea") || KANGAROO_STATE.root;
    if (!document.getElementById("kangarooWorksheetPreview")) area.appendChild(host);
    host.scrollIntoView({ behavior: "smooth", block: "start" });
}
