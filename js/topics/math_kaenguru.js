// Kaenguru training: contest-style practice with timed scoring and worksheet export.

const KANGAROO_ARCHIVE_URL = "https://www.kaenguru.at/aufgaben.html";
const KANGAROO_RULES_URL = "https://www.kaenguru.at/files/downloads/Wettbewerbsregeln.pdf";

const KANGAROO_CONFIGS = {
    3: { stage: 3, label: "3. Schulstufe", category: "\u00c9colier", tasks: 24, minutes: 60, start: 24, max: 120 },
    4: { stage: 4, label: "4. Schulstufe", category: "\u00c9colier", tasks: 24, minutes: 60, start: 24, max: 120 },
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
                    <h3>K\u00e4nguru der Mathematik trainieren</h3>
                    <p>W\u00e4hle deine Schulstufe, starte einen Test unter Wettbewerbsbedingungen und \u00f6ffne den aktuellen Test als Arbeitsblatt mit L\u00f6sungen.</p>
                </div>
                <div class="kangaroo-score-card" aria-label="K\u00e4nguru-Regeln">
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
                <button type="button" class="kangaroo-secondary" id="kangarooWorksheet">Arbeitsblatt mit L\u00f6sungen \u00f6ffnen</button>
                <a class="kangaroo-link-button" href="${KANGAROO_ARCHIVE_URL}" target="_blank" rel="noopener">Offizielle alte Aufgaben</a>
            </div>
            <div class="kangaroo-note">
                Der digitale Modus verwendet eigene Aufgaben im K\u00e4nguru-Stil. Die offiziellen alten Originalaufgaben und L\u00f6sungen bleiben \u00fcber das K\u00e4nguru-Archiv verlinkt.
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
        <button type="button" class="kangaroo-secondary" onclick="openKangarooWorksheet()">Diesen Test als Arbeitsblatt \u00f6ffnen</button>
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
    let main = "Du hast schon angefangen, die K\u00e4nguru-Aufgaben zu bearbeiten. Jetzt geht es darum, die leichten Aufgaben sicherer zu erkennen und Schritt f\u00fcr Schritt mehr Punkte zu holen.";

    if (correctRate >= 0.8 && score.wrong <= 2) {
        title = "Sehr starke Leistung";
        main = "Du hast sehr viele Aufgaben richtig gel\u00f6st und nur wenige Punkte durch Fehler verloren. Das zeigt, dass du genau liest und deine Antworten gut kontrollierst.";
    } else if (correctRate >= 0.55) {
        title = "Gute Leistung";
        main = "Du hast eine gute Grundlage gezeigt. Viele Aufgaben hast du richtig gel\u00f6st; bei den schwierigeren Aufgaben lohnt sich jetzt besonders das genaue Skizzieren und Probieren.";
    } else if (correctRate >= 0.35) {
        title = "Solide Grundlage";
        main = "Du hast mehrere Aufgaben richtig gel\u00f6st. Man sieht, dass du mitdenkst, aber du solltest noch \u00fcben, welche Aufgaben du sicher beantworten kannst und welche du lieber zuerst \u00fcberspringst.";
    } else if (score.correct === 0) {
        title = "Erster Versuch";
        main = "Heute war noch keine Aufgabe richtig. Das ist ein klares Zeichen: Starte beim n\u00e4chsten Training mit den ersten, leichteren Aufgaben und nimm dir f\u00fcr jede Aufgabe eine kleine Skizze oder Rechnung.";
    }

    let strategy = "Gute Strategie: Bearbeite zuerst Aufgaben, bei denen du wirklich einen Plan hast. Danach kommst du zu den unsicheren Aufgaben zur\u00fcck.";
    if (score.wrong >= score.empty + 3) {
        strategy = "Achte besonders auf das Raten: Beim K\u00e4nguru kosten falsche Antworten Punkte. Wenn du gar keinen Plan hast, ist Auslassen oft kl\u00fcger als blindes Raten.";
    } else if (score.empty >= Math.ceil(config.tasks / 3)) {
        strategy = "Du hast einiges ausgelassen. Das kann klug sein, aber versuche beim n\u00e4chsten Mal zuerst alle leichten Aufgaben zu suchen, damit keine sicheren Punkte liegen bleiben.";
    } else if (score.empty === 0 && score.wrong <= 2) {
        strategy = "Sehr gute Teststrategie: Du hast den Test voll bearbeitet und dabei nur wenige Fehler gemacht.";
    }

    const nextStep = `N\u00e4chster Schritt: \u00dcbe besonders die ${needsPractice.label.toLowerCase()} (${needsPractice.from}-${needsPractice.to}). Deine st\u00e4rkste Gruppe war diesmal: ${strongest.label.toLowerCase()} (${strongest.from}-${strongest.to}).`;

    return `
        <div class="kangaroo-oral-feedback">
            <strong>M\u00fcndliche R\u00fcckmeldung: ${title}</strong>
            <p>${main}</p>
            <p>${strategy}</p>
            <p>${nextStep}</p>
        </div>
    `;
}

function renderKangarooEvaluation(score) {
    return `
        <div class="kangaroo-evaluation">
            <div class="kangaroo-evaluation-grid" aria-label="Auswertung nach K\u00e4nguru-Wertung">
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
                Offiziell gibt es beim K\u00e4nguru eine Punktewertung, keine Schulnote. Diese Auswertung zeigt deshalb, wo Punkte gewonnen, verloren oder liegen gelassen wurden.
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
    const generators = [
        genSequence, genPerimeter, genCalendar, genFraction, genShopping, genAverage,
        genScale, genGrid, genRemainder, genRectangleArea, genLogicOrder, genClock,
        genCombinations, genCubes, genEquation, genAngle, genPercent, genPathCount,
        genTrianglePerimeter, genMissingNumber, genDigitSum, genBorderTiles, genAge,
        genBusSeats, genMapDistance, genBookPages, genLargestNumber, genHandshake,
        genPatternTiles, genBalance
    ];
    const generatorOrder = shuffleWithRng(generators, rng);
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
    const body = `<line x1="12" y1="54" x2="74" y2="54" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="54" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/><path d="M42 54 A22 22 0 0 0 ${arcX.toFixed(1)} ${arcY.toFixed(1)}" fill="none" stroke="#f59e0b" stroke-width="3"/><circle cx="20" cy="54" r="3" fill="#0f172a"/><text x="54" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#7c2d12">${degrees}\u00b0</text>`;
    return svgFrame(84, 64, body, `${degrees} Grad`);
}

function genSequence(rng, stage) {
    const start = randInt(rng, 2, 8 + stage);
    const step = randInt(rng, 2, 4 + Math.floor(stage / 2));
    const correct = start + step * 5;
    const { choices, answer } = makeChoices(correct, [correct - step, correct + step, correct + 2 * step, correct - 2]);
    return {
        text: `Mira schreibt f\u00fcr ein Geheimtor immer nach derselben Regel weiter. Auf ihrem Zettel stehen ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ${start + 4 * step}, ... Welche Zahl muss als n\u00e4chste Zahl in die Reihe?`,
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
        text: `Die Mathegruppe plant ein kleines Turnier. Heute ist ${names[dayIndex]}; die Einladungen sollen aber erst in ${later} Tagen verteilt werden. Auf welchen Wochentag f\u00e4llt dieser Tag?`,
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
        text: `Bei einem Knobelspiel machen ${total} Kinder mit. Nach der ersten Runde haben ${numerator}/${denominator} der Kinder die Aufgabe richtig gel\u00f6st. Wie viele Kinder sind das?`,
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
    const { choices, answer } = makeChoices(correct, [correct + pen, correct - book, pens + books + pen + book, correct + 3], " \u20ac");
    return {
        text: `F\u00fcr eine Zeichenrunde werden im Schulshop Materialien gekauft. Ein Stift kostet ${pen} \u20ac, ein Heft kostet ${book} \u20ac. Wie viel muss die Gruppe f\u00fcr ${pens} Stifte und ${books} Hefte zusammen bezahlen?`,
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
        text: `Drei Kinder sammeln bei drei Stationen Punkte: ${a}, ${b} und ${c}. Die Lehrperson m\u00f6chte wissen, wie viele Punkte ein Kind im Durchschnitt erreicht hat. Welcher Wert passt?`,
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
        text: `Beim Aufr\u00e4umen im Turnsaal werden gleich schwere Kisten und B\u00e4lle auf einen Wagen gelegt. Eine Kiste wiegt ${box} kg, ein Ball wiegt ${ball} kg. Wie schwer sind 2 Kisten und 3 B\u00e4lle zusammen?`,
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
        text: `Auf einem Spielplan liegen kleine quadratische Pl\u00e4ttchen in ${rows} Reihen und ${cols} Spalten. Rechts oben werden ${cut} Pl\u00e4ttchen weggenommen. Welche Zeichnung zeigt, wie viele Pl\u00e4ttchen noch auf dem Plan liegen?`,
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
        text: `Eine Gruppe teilt ${number} Spielkarten m\u00f6glichst gleich auf ${divisor} Stapel auf. Alle vollen Stapel sollen gleich viele Karten haben. Wie viele Karten bleiben dann \u00fcbrig?`,
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
    const { choices, answer } = makeChoices(correct, [width * height, correct + missing, correct - missing, 2 * (width + height)], " cm\u00b2");
    return {
        text: `Aus einem Papierst\u00fcck mit ${width} cm L\u00e4nge und ${height} cm Breite wird an einer Ecke ein Quadrat mit ${missing} cm Seitenl\u00e4nge herausgeschnitten. Wie gro\u00df ist die Fl\u00e4che des restlichen Papierst\u00fccks?`,
        choices,
        answer,
        explanation: `Rechteck: ${width * height} cm\u00b2, Ausschnitt: ${missing * missing} cm\u00b2.`
    };
}

function genLogicOrder(rng) {
    const total = randInt(rng, 7, 12);
    const before = randInt(rng, 2, total - 4);
    const after = total - before - 1;
    const correct = before + 1;
    const { choices, answer } = makeChoices(correct, [after + 1, total - before, before, total]);
    return {
        text: `Vor der Sporthalle stellen sich ${total} Kinder in einer Reihe an. Mira steht so, dass vor ihr genau ${before} Kinder stehen. An welcher Stelle steht Mira, wenn man von vorne zu z\u00e4hlen beginnt?`,
        choices,
        answer,
        explanation: `Wenn ${before} Kinder vor ihr stehen, ist Mira auf Platz ${before + 1}.`
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
        text: `Im K\u00e4nguru-Camp beginnt eine Nachtwanderung, als die Uhr ${start}:00 zeigt. ${add} Stunden sp\u00e4ter schaut jemand wieder auf die Uhr. Welche Uhr passt zu diesem Zeitpunkt?`,
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
        text: `Lina packt f\u00fcr eine Projektwoche Kleidung ein. Sie hat ${shirts} verschiedene T-Shirts und ${pants} verschiedene Hosen. Wie viele Outfits kann sie zusammenstellen, wenn jedes Outfit aus genau einem T-Shirt und genau einer Hose besteht?`,
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
        text: `Ein Bauwerk soll eigentlich ein voller Quader aus kleinen W\u00fcrfeln sein: ${length} W\u00fcrfel lang, ${width} W\u00fcrfel breit und ${height} W\u00fcrfel hoch. Beim Aufbauen fehlen vorne ${missing} W\u00fcrfel. Wie viele W\u00fcrfel sind trotzdem vorhanden?`,
        choices,
        answer,
        explanation: `Voll w\u00e4ren es ${length * width * height}; es fehlen ${missing}.`
    };
}

function genEquation(rng, stage) {
    const x = randInt(rng, 3, 9 + Math.floor(stage / 2));
    const factor = randInt(rng, 2, 5);
    const add = randInt(rng, 4, 13);
    const result = factor * x + add;
    const { choices, answer } = makeChoices(x, [x + 1, x - 1, result - add, result]);
    return {
        text: `Auf einer Rechenkarte steht eine verdeckte Zahl x. Wenn man diese Zahl mit ${factor} multipliziert und danach ${add} addiert, erh\u00e4lt man ${result}. Welche Zahl steckt hinter x?`,
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
        text: `${value}\u00b0`,
        html: angleChoiceSvg(value)
    })), correct, rng);
    return {
        text: `Auf einem Geobrett liegen zwei Winkel direkt nebeneinander auf einer geraden Linie. Der linke Winkel ist ${angle}\u00b0 gro\u00df. Welche Zeichnung kann den anderen Winkel zeigen?`,
        choices,
        answer,
        explanation: `Nebenwinkel ergeben zusammen 180\u00b0.`
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
        text: `Eine Spielfigur steht links unten auf einem Gitter und soll auf k\u00fcrzestem Weg nach rechts oben. Sie darf nur ${right} Schritte nach rechts und ${up} Schritte nach oben machen, aber die Reihenfolge darf wechseln. Wie viele k\u00fcrzeste Wege gibt es?`,
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
        text: `F\u00fcr ein dreieckiges Namensschild sollen alle drei Kanten mit einem Band beklebt werden. Die Seiten sind ${a} cm, ${b} cm und ${c} cm lang. Wie viele Zentimeter Band braucht man insgesamt?`,
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
        text: `Auf einem Tresor steht die Zahl ${number}. Der Code zum \u00d6ffnen ist nicht die Zahl selbst, sondern ihre Ziffernsumme. Welche Zahl muss eingegeben werden?`,
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
        text: `Ein quadratisches Feld hat ${side} Reihen und ${side} Spalten. F\u00fcr ein Spiel sollen genau die Randfelder blau gef\u00e4rbt werden, die inneren Felder bleiben wei\u00df. Welche Zeichnung passt dazu?`,
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
        text: `Sam und Alex vergleichen ihre Geburtstage. Sam ist ${younger} Jahre alt. Alex ist ${diff} Jahre \u00e4lter als Sam. Wie alt ist Alex?`,
        choices,
        answer,
        explanation: `\u00c4lter bedeutet addieren: ${younger}+${diff} = ${correct}.`
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
        text: `Auf einer Wanderkarte entspricht 1 cm auf dem Papier genau ${scale} km in Wirklichkeit. Zwei H\u00fctten liegen auf der Karte ${cm} cm auseinander. Wie weit sind sie in Wirklichkeit voneinander entfernt?`,
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
        text: `Nora nimmt sich vor, in den Ferien jeden Tag gleich viel zu lesen. Sie liest ${days} Tage lang jeden Tag ${pages} Seiten. Wie viele Seiten hat sie danach insgesamt gelesen?`,
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
        text: `Drei Zahlenkarten tragen die Ziffern ${a}, ${b} und ${c}. Die Karten d\u00fcrfen umgelegt werden, aber jede Karte muss genau einmal verwendet werden. Welche Anordnung bildet die gr\u00f6\u00dfte dreistellige Zahl?`,
        choices,
        answer,
        explanation: `Die gr\u00f6\u00dfte Ziffer kommt nach vorne: ${correct}.`
    };
}

function genHandshake(rng, stage) {
    const people = randInt(rng, 4, stage >= 7 ? 8 : 6);
    const correct = people * (people - 1) / 2;
    const { choices, answer } = makeChoices(correct, [people * 2, people * (people - 1), correct - 1, correct + people]);
    return {
        text: `Bei einer kleinen Siegerehrung begr\u00fc\u00dfen sich ${people} Kinder. Jedes Kind gibt jedem anderen Kind genau einmal die Hand. Wie viele Handschl\u00e4ge gibt es insgesamt?`,
        choices,
        answer,
        explanation: `Jedes Paar z\u00e4hlt einmal: ${people}*${people - 1}/2 = ${correct}.`
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
            <title>K\u00e4nguru-Training ${config.label}</title>
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
            <h1>K\u00e4nguru-Training: ${config.category}</h1>
            <p class="meta">${config.label} - ${config.tasks} Aufgaben - ${config.minutes} Minuten - Startpunkte: ${config.start} - ${scoreDescription(config)}</p>
            ${test.map(question => `
                <section class="task">
                    <p><strong>${question.number}. (${question.points} P.)</strong> ${question.text}</p>
                    <ol type="A">${question.choices.map(choice => `<li>${renderKangarooWorksheetChoice(choice)}</li>`).join("")}</ol>
                </section>
            `).join("")}
            <section class="solutions">
                <h2>L\u00f6sungen</h2>
                <table>
                    <thead><tr><th>Nr.</th><th>Antwort</th><th>Kurze Begr\u00fcndung</th></tr></thead>
                    <tbody>
                        ${test.map(question => `<tr><td>${question.number}</td><td>${String.fromCharCode(65 + question.answer)}) ${choiceText(question.choices[question.answer])}</td><td>${question.explanation}</td></tr>`).join("")}
                    </tbody>
                </table>
                <p>Offizielle alte Aufgaben und L\u00f6sungen: ${KANGAROO_ARCHIVE_URL}</p>
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
            <summary>L\u00f6sungen anzeigen</summary>
            <table class="kangaroo-solution-table">
                <thead><tr><th>Nr.</th><th>Antwort</th><th>Begr\u00fcndung</th></tr></thead>
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
