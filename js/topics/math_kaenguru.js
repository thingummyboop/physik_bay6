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
    if (config.tasks === 24) return "Aufgaben 1-8: 3 Punkte, 9-16: 4 Punkte, 17-24: 5 Punkte.";
    return "Aufgaben 1-10: 3 Punkte, 11-20: 4 Punkte, 21-30: 5 Punkte.";
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
                        <span>${String.fromCharCode(65 + index)}) ${choice}</span>
                    </label>
                `).join("")}
            </div>
            <p class="kangaroo-explanation" id="kangarooExplanation${question.number}"></p>
        </article>
    `;
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
        explanation.innerHTML = `<strong>Richtig:</strong> ${String.fromCharCode(65 + question.answer)}) ${question.choices[question.answer]} - ${question.explanation}`;
    });

    const result = document.getElementById("kangarooResult");
    result.innerHTML = `
        <strong>Ergebnis: ${score.points.toFixed(2).replace(".00", "")} von ${KANGAROO_STATE.config.max} Punkten</strong>
        <span>${score.correct} richtig - ${score.wrong} falsch - ${score.empty} leer - Startpunkte: ${KANGAROO_STATE.config.start}</span>
        <button type="button" class="kangaroo-secondary" onclick="openKangarooWorksheet()">Diesen Test als Arbeitsblatt \u00f6ffnen</button>
    `;
}

function calculateKangarooScore() {
    let points = KANGAROO_STATE.config.start;
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    KANGAROO_STATE.test.forEach(question => {
        const answer = KANGAROO_STATE.answers[`q${question.number}`];
        if (answer === undefined) {
            empty += 1;
        } else if (Number(answer) === question.answer) {
            correct += 1;
            points += question.points;
        } else {
            wrong += 1;
            points -= question.points / 4;
        }
    });

    return { points: Math.max(0, points), correct, wrong, empty };
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

function genSequence(rng, stage) {
    const start = randInt(rng, 2, 8 + stage);
    const step = randInt(rng, 2, 4 + Math.floor(stage / 2));
    const correct = start + step * 5;
    const { choices, answer } = makeChoices(correct, [correct - step, correct + step, correct + 2 * step, correct - 2]);
    return {
        text: `Die Zahlenfolge lautet ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ${start + 4 * step}, ... Welche Zahl kommt als n\u00e4chste?`,
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
        text: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie gro\u00df ist sein Umfang?`,
        choices,
        answer,
        explanation: `Umfang = ${a}+${b}+${a}+${b} = ${correct} cm.`
    };
}

function genCalendar(rng) {
    const day = randInt(rng, 4, 19);
    const later = randInt(rng, 9, 26);
    const correct = (day + later - 1) % 7 + 1;
    const names = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const { choices, answer } = makeChoices(correct, [correct % 7 + 1, (correct + 1) % 7 + 1, (correct + 2) % 7 + 1, (correct + 3) % 7 + 1]);
    return {
        text: `Heute ist ${names[day % 7]}. Welcher Wochentag ist in ${later} Tagen?`,
        choices: choices.map(value => names[Number(value) - 1]),
        answer,
        explanation: `${later} Tage entsprechen ${later % 7} Tagen weiter im Wochenkreis.`
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
        text: `${numerator}/${denominator} von ${total} Kindern haben ein R\u00e4tsel richtig. Wie viele Kinder sind das?`,
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
        text: `Ein Stift kostet ${pen} \u20ac, ein Heft kostet ${book} \u20ac. Wie viel kosten ${pens} Stifte und ${books} Hefte zusammen?`,
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
        text: `Drei Kinder sammeln ${a}, ${b} und ${c} Punkte. Wie viele Punkte haben sie durchschnittlich?`,
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
        text: `Eine Kiste wiegt ${box} kg, ein Ball wiegt ${ball} kg. Wie viel wiegen 2 Kisten und 3 B\u00e4lle?`,
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
    const { choices, answer } = makeChoices(correct, [rows * cols, correct + cut, correct - 1, rows + cols]);
    return {
        text: `Ein Rechteck aus kleinen Quadraten hat ${rows} Reihen und ${cols} Spalten. ${cut} Quadrate werden entfernt. Wie viele bleiben?`,
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
        text: `Welcher Rest bleibt, wenn ${number} durch ${divisor} geteilt wird?`,
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
        text: `Aus einem ${width} cm mal ${height} cm gro\u00dfen Rechteck wird ein ${missing} cm mal ${missing} cm gro\u00dfes Quadrat ausgeschnitten. Welche Fl\u00e4che bleibt?`,
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
        text: `In einer Reihe stehen ${total} Kinder. Vor Mira stehen ${before} Kinder. An welcher Stelle steht Mira von vorne?`,
        choices,
        answer,
        explanation: `Wenn ${before} Kinder vor ihr stehen, ist Mira auf Platz ${before + 1}.`
    };
}

function genClock(rng) {
    const start = randInt(rng, 1, 12);
    const add = randInt(rng, 5, 17);
    const correct = (start + add - 1) % 12 + 1;
    const { choices, answer } = makeChoices(correct, [correct % 12 + 1, (correct + 2) % 12 + 1, start + add, start]);
    return {
        text: `Eine Uhr zeigt ${start}:00. Welche Stundenzahl zeigt sie ${add} Stunden sp\u00e4ter?`,
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
        text: `Lina hat ${shirts} T-Shirts und ${pants} Hosen. Wie viele verschiedene Outfits aus einem T-Shirt und einer Hose kann sie bilden?`,
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
        text: `Ein Quader besteht aus ${length}*${width}*${height} kleinen W\u00fcrfeln. ${missing} W\u00fcrfel fehlen. Wie viele W\u00fcrfel sind vorhanden?`,
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
        text: `Welche Zahl muss f\u00fcr x eingesetzt werden, damit ${factor}*x + ${add} = ${result} gilt?`,
        choices,
        answer,
        explanation: `${result} - ${add} = ${result - add}; ${result - add} : ${factor} = ${x}.`
    };
}

function genAngle(rng, stage) {
    const angle = randInt(rng, 25, stage >= 7 ? 120 : 90);
    const correct = 180 - angle;
    const { choices, answer } = makeChoices(correct, [angle, Math.abs(90 - angle), correct + 10, correct - 10], "\u00b0");
    return {
        text: `Zwei Nebenwinkel liegen auf einer Geraden. Einer ist ${angle}\u00b0 gro\u00df. Wie gro\u00df ist der andere?`,
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
        text: `Wie viel sind ${percent}% von ${base}?`,
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
        text: `Auf einem Gitter darf man nur nach rechts oder nach oben gehen. Wie viele k\u00fcrzeste Wege gibt es mit ${right} Schritten nach rechts und ${up} Schritten nach oben?`,
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
        text: `Ein Dreieck hat Seiten mit ${a} cm, ${b} cm und ${c} cm. Wie gro\u00df ist sein Umfang?`,
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
        text: `Welche Zahl fehlt? ___ + ${add} = ${result}`,
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
        text: `Wie gro\u00df ist die Ziffernsumme von ${number}?`,
        choices,
        answer,
        explanation: `Die Ziffern werden addiert: ${String(number).split("").join("+")} = ${correct}.`
    };
}

function genBorderTiles(rng, stage) {
    const side = randInt(rng, 4, 7 + Math.floor(stage / 3));
    const correct = side * side - (side - 2) * (side - 2);
    const { choices, answer } = makeChoices(correct, [side * 4, side * side, correct - 4, correct + 4]);
    return {
        text: `Ein quadratisches Feld hat ${side} Reihen und ${side} Spalten. Nur die Randfelder werden blau gef\u00e4rbt. Wie viele Randfelder gibt es?`,
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
        text: `Sam ist ${younger} Jahre alt. Alex ist ${diff} Jahre \u00e4lter. Wie alt ist Alex?`,
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
        text: `Ein Bus hat ${rows} Reihen mit je ${seats} Sitzen. ${occupied} Sitze sind besetzt. Wie viele Sitze sind frei?`,
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
        text: `Auf einer Karte bedeutet 1 cm genau ${scale} km. Zwei Orte sind ${cm} cm voneinander entfernt. Wie weit ist das in Wirklichkeit?`,
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
        text: `Nora liest ${days} Tage lang jeden Tag ${pages} Seiten. Wie viele Seiten liest sie insgesamt?`,
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
    const { choices, answer } = makeChoices(correct, [a * 100 + b * 10 + c, digits[2] * 100 + digits[1] * 10 + digits[0], correct - 9, correct - 90]);
    return {
        text: `Aus den Ziffern ${a}, ${b} und ${c} soll die gr\u00f6\u00dfte dreistellige Zahl gebildet werden. Welche ist es?`,
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
        text: `${people} Kinder geben einander alle genau einmal die Hand. Wie viele Handschl\u00e4ge gibt es?`,
        choices,
        answer,
        explanation: `Jedes Paar z\u00e4hlt einmal: ${people}*${people - 1}/2 = ${correct}.`
    };
}

function genPatternTiles(rng) {
    const full = randInt(rng, 3, 7);
    const extra = randInt(rng, 0, 2);
    const length = full * 3 + extra;
    const correct = full + (extra >= 1 ? 1 : 0);
    const { choices, answer } = makeChoices(correct, [full, full + extra, Math.ceil(length / 2), length - correct]);
    return {
        text: `Ein Muster wiederholt sich so: rot, blau, blau. Wie viele rote Felder gibt es unter den ersten ${length} Feldern?`,
        choices,
        answer,
        explanation: `In jedem Dreierblock ist 1 Feld rot. Bei ${length} Feldern sind das ${correct}.`
    };
}

function genBalance(rng, stage) {
    const box = randInt(rng, 3, 8 + Math.floor(stage / 2));
    const small = randInt(rng, 1, 4);
    const correct = box - small;
    const { choices, answer } = makeChoices(correct, [box + small, box, small, correct + 2], " kg");
    return {
        text: `Eine Kiste wiegt ${box} kg. Ein Paket ist ${small} kg leichter als die Kiste. Wie schwer ist das Paket?`,
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
                    <ol type="A">${question.choices.map(choice => `<li>${choice}</li>`).join("")}</ol>
                </section>
            `).join("")}
            <section class="solutions">
                <h2>L\u00f6sungen</h2>
                <table>
                    <thead><tr><th>Nr.</th><th>Antwort</th><th>Kurze Begr\u00fcndung</th></tr></thead>
                    <tbody>
                        ${test.map(question => `<tr><td>${question.number}</td><td>${String.fromCharCode(65 + question.answer)}) ${question.choices[question.answer]}</td><td>${question.explanation}</td></tr>`).join("")}
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
                    <ol type="A">${question.choices.map(choice => `<li>${choice}</li>`).join("")}</ol>
                </li>
            `).join("")}
        </ol>
        <details open>
            <summary>L\u00f6sungen anzeigen</summary>
            <table class="kangaroo-solution-table">
                <thead><tr><th>Nr.</th><th>Antwort</th><th>Begr\u00fcndung</th></tr></thead>
                <tbody>
                    ${test.map(question => `<tr><td>${question.number}</td><td>${String.fromCharCode(65 + question.answer)}) ${question.choices[question.answer]}</td><td>${question.explanation}</td></tr>`).join("")}
                </tbody>
            </table>
        </details>
    `;

    const area = document.getElementById("kangarooTestArea") || KANGAROO_STATE.root;
    if (!document.getElementById("kangarooWorksheetPreview")) area.appendChild(host);
    host.scrollIntoView({ behavior: "smooth", block: "start" });
}
