// Rechenreise: adaptive math mini-games for basic operations and spatial thinking.

const RECHENREISE_KEY = "rechenreise_profile_v2";

const rechenreise = {
    profile: null,
    assessment: [],
    assessmentIndex: 0,
    current: null,
    mode: "rechnen"
};

function topicInit() {
    initRechenreise();
}

function initRechenreise() {
    const root = document.querySelector("[data-math-game]");
    if (!root) return;

    rechenreise.root = root;
    rechenreise.profile = loadRechenreiseProfile();
    renderRechenreiseShell();

    if (rechenreise.profile.assessed) {
        renderRechenreiseLobby();
    } else {
        startRechenreiseAssessment();
    }
}

function loadRechenreiseProfile() {
    const fallback = {
        assessed: false,
        level: 2,
        xp: 0,
        streak: 0,
        played: 0,
        correct: 0,
        skills: {
            addsub: 2,
            multdiv: 2,
            spatial: 2,
            strategy: 2
        }
    };

    try {
        return { ...fallback, ...JSON.parse(localStorage.getItem(RECHENREISE_KEY) || "{}") };
    } catch (error) {
        return fallback;
    }
}

function saveRechenreiseProfile() {
    localStorage.setItem(RECHENREISE_KEY, JSON.stringify(rechenreise.profile));
}

function renderRechenreiseShell() {
    rechenreise.root.innerHTML = `
        <div class="math-game-shell">
            <div class="math-game-topbar">
                <div class="math-game-brand">
                    ${heroMarkup("tiny")}
                    <div>
                        <strong>Rechenreise</strong>
                        <span id="mathGameStatus">kurzer Start-Check</span>
                    </div>
                </div>
                <button class="math-game-reset" id="mathGameReset" type="button">Neu starten</button>
            </div>
            <div class="math-game-hud" aria-label="Fortschritt">
                <div><span id="mathLevel">${rechenreise.profile.level}</span><small>Niveau</small></div>
                <div><span id="mathXp">${rechenreise.profile.xp}</span><small>Punkte</small></div>
                <div><span id="mathStreak">${rechenreise.profile.streak}</span><small>Serie</small></div>
            </div>
            <div id="mathGameStage" class="math-game-stage" aria-live="polite"></div>
        </div>
    `;

    document.getElementById("mathGameReset").addEventListener("click", () => {
        localStorage.removeItem(RECHENREISE_KEY);
        rechenreise.profile = loadRechenreiseProfile();
        renderRechenreiseShell();
        startRechenreiseAssessment();
    });

    updateRechenreiseHud();
}

function updateRechenreiseHud() {
    setText("mathLevel", rechenreise.profile.level);
    setText("mathXp", rechenreise.profile.xp);
    setText("mathStreak", rechenreise.profile.streak);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function stage() {
    return document.getElementById("mathGameStage");
}

function startRechenreiseAssessment() {
    rechenreise.assessment = [
        makeArithmeticChallenge(1, "addsub"),
        makeArithmeticChallenge(2, "addsub"),
        makeArithmeticChallenge(2, "multdiv"),
        makeArithmeticChallenge(3, "multdiv"),
        makeSpatialChallenge(2),
        makeOperatorChallenge(2)
    ];
    rechenreise.assessmentIndex = 0;
    setText("mathGameStatus", "6 Aufgaben zum Einschätzen");
    renderAssessmentQuestion();
}

function renderAssessmentQuestion() {
    const question = rechenreise.assessment[rechenreise.assessmentIndex];
    rechenreise.current = question;
    stage().innerHTML = `
        <div class="math-game-question">
            <p class="math-game-kicker">Start-Check ${rechenreise.assessmentIndex + 1} von ${rechenreise.assessment.length}</p>
            <h3>${question.prompt}</h3>
            ${question.visual || ""}
            ${question.choiceMode === "rotatingPieces" ? rotatingPieceChoices(question) : `
                <div class="math-answer-grid">
                    ${question.options.map(option => answerButton(option, question.optionLabels)).join("")}
                </div>
            `}
            <p class="math-game-note">Es geht nicht um Stress. Rechenreise sucht nur passende Aufgaben für dich.</p>
        </div>
    `;
    if (question.choiceMode === "rotatingPieces") {
        bindRotatingPieceControls(handleAssessmentAnswer);
    } else {
        bindAnswerButtons(handleAssessmentAnswer);
    }
}

function handleAssessmentAnswer(value) {
    const question = rechenreise.current;
    const correct = isAnswerCorrect(question, Number(value));
    question.wasCorrect = correct;
    rechenreise.assessmentIndex += 1;

    if (rechenreise.assessmentIndex >= rechenreise.assessment.length) {
        finishAssessment();
        return;
    }

    renderAssessmentQuestion();
}

function finishAssessment() {
    const correctCount = rechenreise.assessment.filter(q => q.wasCorrect).length;
    const spatialCorrect = rechenreise.assessment.filter(q => q.skill === "spatial" && q.wasCorrect).length;
    const level = Math.max(1, Math.min(5, correctCount <= 1 ? 1 : correctCount <= 3 ? 2 : correctCount <= 4 ? 3 : correctCount === 5 ? 4 : 5));

    rechenreise.profile.assessed = true;
    rechenreise.profile.level = level;
    rechenreise.profile.xp += correctCount * 5;
    rechenreise.profile.skills.addsub = skillFromAssessment("addsub");
    rechenreise.profile.skills.multdiv = skillFromAssessment("multdiv");
    rechenreise.profile.skills.spatial = spatialCorrect ? 5 : 2;
    rechenreise.profile.skills.strategy = level;
    saveRechenreiseProfile();
    updateRechenreiseHud();

    stage().innerHTML = `
        <div class="math-game-result">
            <p class="math-game-kicker">Check geschafft</p>
            <h3>Du startest auf Niveau ${rechenreise.profile.level}.</h3>
            <div class="math-victory-scene">
                ${heroMarkup("happy")}
                <div class="math-victory-gate"><span>${rechenreise.profile.level}</span></div>
            </div>
            <p>${correctCount} von ${rechenreise.assessment.length} Aufgaben waren richtig. Die nächsten Aufgaben passen sich ab jetzt Schritt für Schritt an.</p>
            <button type="button" id="mathToLobby">Losspielen</button>
        </div>
    `;
    document.getElementById("mathToLobby").addEventListener("click", renderRechenreiseLobby);
}

function skillFromAssessment(skill) {
    const questions = rechenreise.assessment.filter(q => q.skill === skill);
    const correct = questions.filter(q => q.wasCorrect).length;
    if (!questions.length) return rechenreise.profile.level;
    return Math.max(1, Math.min(5, Math.round(1 + (correct / questions.length) * 4)));
}

function renderRechenreiseLobby() {
    setText("mathGameStatus", "wähle ein Mini-Spiel");
    updateRechenreiseHud();

    stage().innerHTML = `
        <div class="math-game-lobby">
            <div class="math-quest-banner">
                ${heroMarkup("waving")}
                <div>
                    <strong>Abenteuer bereit</strong>
                    <span>Wähle eine Station und sammle Rechenenergie.</span>
                </div>
            </div>
            <div class="math-game-map" aria-hidden="true">
                <div class="math-map-sun"></div>
                <div class="math-map-mountain mountain-a"></div>
                <div class="math-map-mountain mountain-b"></div>
                <div class="math-map-river"></div>
                <div class="math-map-forest forest-a"></div>
                <div class="math-map-forest forest-b"></div>
                <div class="math-map-path"></div>
                <div class="math-map-token" style="--progress:${mapProgress()}%">${heroMarkup("map")}</div>
                <div class="math-map-place place-1"><span>+</span><small>Zahlencamp</small></div>
                <div class="math-map-place place-2"><span>x</span><small>Werkstatt</small></div>
                <div class="math-map-place place-3"><span>3D</span><small>Baustelle</small></div>
                <div class="math-map-place place-4"><span>?</span><small>Bonus</small></div>
            </div>
            <div class="math-game-modes">
                ${modeCard("rechnen", "Zahlencamp", "Rechen-Sprint", "Plus, Minus, Mal und Geteilt gemischt.")}
                ${modeCard("operator", "Zeichen-Werkstatt", "Zeichen-Finder", "Finde das passende Rechenzeichen.")}
                ${modeCard("raum", "Kistenlager", "Form einpassen", "Finde die Kistenform für die Lücke.")}
            </div>
            <p class="math-game-note">Richtige Antworten erhöhen die Schwierigkeit langsam. Fehler senken sie wieder ein wenig.</p>
        </div>
    `;

    stage().querySelectorAll("[data-mode]").forEach(button => {
        button.addEventListener("click", () => {
            rechenreise.mode = button.dataset.mode;
            renderMiniGame();
        });
    });
}

function modeCard(mode, station, title, text) {
    return `
        <button class="math-mode-card" type="button" data-mode="${mode}">
            <em>${station}</em>
            <strong>${title}</strong>
            <span>${text}</span>
        </button>
    `;
}

function mapProgress() {
    return Math.min(82, 12 + rechenreise.profile.played * 4);
}

function heroMarkup(mood = "ready") {
    return `
        <div class="math-hero math-hero-${mood}" aria-hidden="true">
            <span class="hero-shadow"></span>
            <span class="hero-leg leg-left"></span>
            <span class="hero-leg leg-right"></span>
            <span class="hero-body"></span>
            <span class="hero-pack"></span>
            <span class="hero-arm arm-left"></span>
            <span class="hero-arm arm-right"></span>
            <span class="hero-head">
                <span class="hero-hair"></span>
                <span class="hero-eye eye-left"></span>
                <span class="hero-eye eye-right"></span>
                <span class="hero-smile"></span>
            </span>
            <span class="hero-spark spark-one"></span>
            <span class="hero-spark spark-two"></span>
        </div>
    `;
}

function adventureScene(type, content) {
    return `
        <div class="math-adventure-scene scene-${type}">
            <div class="scene-sky"></div>
            <div class="scene-hills"></div>
            <div class="scene-ground"></div>
            ${heroMarkup(type === "build" ? "builder" : "ready")}
            <div class="scene-content">${content}</div>
        </div>
    `;
}

function arithmeticScene(op, a, b) {
    const symbol = op === "*" ? "·" : op;
    return adventureScene("camp", `
        <div class="camp-tent"></div>
        <div class="camp-fire"><span></span></div>
        <div class="number-crates">
            <span>${a}</span><strong>${symbol}</strong><span>${b}</span>
        </div>
    `);
}

function operatorScene(a, b, answer) {
    return adventureScene("workshop", `
        <div class="gear gear-one"></div>
        <div class="gear gear-two"></div>
        <div class="workshop-board">
            <span>${a}</span><strong>?</strong><span>${b}</span><em>= ${answer}</em>
        </div>
    `);
}

function boxPuzzleScene(puzzle) {
    const hookX = craneHookPosition(puzzle);
    return adventureScene("build", `
        <div class="crane" style="--hook-left:${hookX}%">
            <span class="crane-mast"></span>
            <span class="crane-arm"></span>
            <span class="crane-counterweight"></span>
            <span class="crane-cab"></span>
            <span class="crane-base"></span>
            <span class="crane-line"></span>
            <span class="crane-hook"></span>
        </div>
        <div class="warehouse-sign">Kistenlager</div>
        ${boxStackMarkup(puzzle)}
    `);
}

function renderMiniGame() {
    const level = skillLevelForMode(rechenreise.mode);
    const challenge = makeChallengeForMode(rechenreise.mode, level);
    rechenreise.current = challenge;
    setText("mathGameStatus", challenge.status);

    stage().innerHTML = `
        <div class="math-game-question">
            <div class="math-game-row">
                <button type="button" class="math-game-ghost" id="mathBack">Zur Karte</button>
                <span class="math-game-pill">Niveau ${level}</span>
            </div>
            <p class="math-game-kicker">${challenge.title}</p>
            <h3>${challenge.prompt}</h3>
            ${challenge.visual || ""}
            <button type="button" class="math-hint-btn" id="mathHintBtn">Tipp anzeigen</button>
            <p class="math-hint" id="mathHint" hidden>${challenge.hint}</p>
            ${challenge.choiceMode === "rotatingPieces" ? rotatingPieceChoices(challenge) : `
                <div class="math-answer-grid">
                    ${challenge.options.map(option => answerButton(option, challenge.optionLabels)).join("")}
                </div>
            `}
            <p class="math-feedback" id="mathFeedback"></p>
        </div>
    `;

    document.getElementById("mathBack").addEventListener("click", renderRechenreiseLobby);
    document.getElementById("mathHintBtn").addEventListener("click", () => {
        const hint = document.getElementById("mathHint");
        hint.hidden = false;
        rechenreise.current.hintShown = true;
    });
    if (challenge.choiceMode === "rotatingPieces") {
        bindRotatingPieceControls();
    } else {
        bindAnswerButtons(handleMiniGameAnswer);
    }
}

function makeChallengeForMode(mode, level) {
    if (mode === "operator") return makeOperatorChallenge(level);
    if (mode === "raum") return makeSpatialChallenge(level);
    return makeArithmeticChallenge(level, level < 3 ? "addsub" : "mixed");
}

function skillLevelForMode(mode) {
    if (mode === "operator") return clampLevel(Math.round((rechenreise.profile.skills.addsub + rechenreise.profile.skills.multdiv) / 2));
    if (mode === "raum") return clampLevel(Math.round(rechenreise.profile.skills.spatial));
    return rechenreise.profile.level;
}

function clampLevel(level) {
    return Math.max(1, Math.min(5, level));
}

function answerButton(option, labels) {
    const label = labels && labels[option] ? labels[option] : option;
    return `<button class="math-answer" type="button" data-answer="${option}">${label}</button>`;
}

function bindAnswerButtons(handler) {
    stage().querySelectorAll("[data-answer]").forEach(button => {
        button.addEventListener("click", () => handler(button.dataset.answer));
    });
}

function handleMiniGameAnswer(value) {
    const question = rechenreise.current;
    const selectedValue = Number(value);
    const correct = isAnswerCorrect(question, selectedValue);
    const panel = stage().querySelector(".math-game-question");
    if (panel) panel.classList.add(correct ? "is-success" : "is-miss");

    markAnswerState(question, selectedValue, correct);

    rechenreise.profile.played += 1;
    if (correct) {
        rechenreise.profile.correct += 1;
        rechenreise.profile.streak += 1;
        rechenreise.profile.xp += Math.max(5, 10 + rechenreise.profile.level - (question.hintShown ? 3 : 0));
        adjustSkill(question.skill, question.hintShown ? 0.18 : 0.35 + (rechenreise.profile.streak >= 3 ? 0.2 : 0));
    } else {
        rechenreise.profile.streak = 0;
        adjustSkill(question.skill, -0.35);
    }

    rechenreise.profile.level = globalLevelFromSkills();
    saveRechenreiseProfile();
    updateRechenreiseHud();

    const feedback = document.getElementById("mathFeedback");
    const correctText = question.answerText || question.answer;
    feedback.innerHTML = correct
        ? `Richtig. ${question.explain}`
        : `Noch nicht. Richtig ist ${correctText}. ${question.explain}`;

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Nächste Aufgabe";
    next.addEventListener("click", renderMiniGame);
    feedback.appendChild(document.createElement("br"));
    feedback.appendChild(next);
}

function isAnswerCorrect(question, selectedValue) {
    if (question.choiceMode === "rotatingPieces") {
        return Boolean(question.pieces[selectedValue] && question.pieces[selectedValue].correct);
    }
    return selectedValue === question.answer;
}

function markAnswerState(question, selectedValue, correct) {
    if (question.choiceMode === "rotatingPieces") {
        stage().querySelectorAll("[data-piece-card]").forEach(card => {
            const index = Number(card.dataset.pieceCard);
            const isRight = Boolean(question.pieces[index] && question.pieces[index].correct);
            if (isRight) card.classList.add("is-correct");
            if (index === selectedValue && !correct) card.classList.add("is-wrong");
            card.querySelectorAll("button").forEach(button => { button.disabled = true; });
        });
        return;
    }

    stage().querySelectorAll("[data-answer]").forEach(button => {
        button.disabled = true;
        if (Number(button.dataset.answer) === question.answer) button.classList.add("is-correct");
        if (button.dataset.answer === String(selectedValue) && !correct) button.classList.add("is-wrong");
    });
}

function adjustSkill(skill, delta) {
    const current = rechenreise.profile.skills[skill] || rechenreise.profile.level;
    rechenreise.profile.skills[skill] = Math.max(1, Math.min(5, current + delta));
}

function globalLevelFromSkills() {
    const values = Object.values(rechenreise.profile.skills);
    return Math.max(1, Math.min(5, Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)));
}

function makeArithmeticChallenge(level, skillHint) {
    const ops = skillHint === "addsub" ? ["+", "-"] : skillHint === "multdiv" ? ["*", "/"] : level < 3 ? ["+", "-"] : ["+", "-", "*", "/"];
    const op = ops[rand(0, ops.length - 1)];
    let a;
    let b;
    let answer;
    let prompt;

    if (op === "+") {
        a = rand(4, 12 + level * 12);
        b = rand(3, 10 + level * 10);
        answer = a + b;
        prompt = `${a} + ${b} = ?`;
    } else if (op === "-") {
        a = rand(12, 25 + level * 18);
        b = rand(3, Math.min(a - 1, 8 + level * 9));
        answer = a - b;
        prompt = `${a} - ${b} = ?`;
    } else if (op === "*") {
        a = rand(2, Math.min(12, 4 + level * 2));
        b = rand(2, Math.min(12, 5 + level * 2));
        answer = a * b;
        prompt = `${a} · ${b} = ?`;
    } else {
        b = rand(2, Math.min(12, 5 + level * 2));
        answer = rand(2, Math.min(12, 5 + level * 2));
        a = b * answer;
        prompt = `${a} : ${b} = ?`;
    }

    return {
        title: "Rechen-Sprint",
        status: "Grundrechnungsarten",
        prompt,
        answer,
        skill: op === "+" || op === "-" ? "addsub" : "multdiv",
        explain: explanationFor(op, a, b, answer),
        hint: arithmeticHint(op, a, b),
        visual: arithmeticScene(op, a, b),
        options: optionsAround(answer, level)
    };
}

function makeOperatorChallenge(level) {
    const op = ["+", "-", "*", "/"][rand(0, Math.min(3, level + 1))];
    let a;
    let b;
    let answer;

    if (op === "+") {
        a = rand(5, 20 + level * 10);
        b = rand(2, 15 + level * 7);
        answer = a + b;
    } else if (op === "-") {
        a = rand(12, 35 + level * 12);
        b = rand(2, Math.min(a - 1, 12 + level * 6));
        answer = a - b;
    } else if (op === "*") {
        a = rand(2, Math.min(12, 4 + level * 2));
        b = rand(2, Math.min(12, 5 + level * 2));
        answer = a * b;
    } else {
        b = rand(2, Math.min(12, 5 + level * 2));
        answer = rand(2, Math.min(12, 5 + level * 2));
        a = b * answer;
    }

    const opValue = { "+": 1, "-": 2, "*": 3, "/": 4 }[op];
    return {
        title: "Zeichen-Finder",
        status: "Rechenzeichen erkennen",
        prompt: `${a} ? ${b} = ${answer}`,
        answer: opValue,
        answerText: operatorName(op),
        skill: op === "+" || op === "-" ? "addsub" : "multdiv",
        explain: `Das passende Zeichen ist ${operatorName(op)}.`,
        hint: "Vergleiche zuerst: Wird das Ergebnis größer oder kleiner? Bei Mal und Geteilt verändern sich Zahlen oft stärker.",
        options: [1, 2, 3, 4],
        optionLabels: { 1: "+", 2: "-", 3: "·", 4: ":" },
        visual: `
            ${operatorScene(a, b, answer)}
            <div class="math-operator-legend">
                <span>Wähle das Rechenzeichen.</span>
            </div>
        `
    };
}

function makeSpatialChallenge(level) {
    const baseAnswerPool = boxShapesForLevel(level);
    const answerPool = level >= 5
        ? baseAnswerPool.filter(shape => cellBounds(normalizeCells(shape.cells)).height >= 2)
        : baseAnswerPool;
    const baseChoicePool = boxShapesForLevel(Math.max(3, level));
    const choicePool = level >= 5
        ? baseChoicePool.filter(shape => cellBounds(normalizeCells(shape.cells)).height >= 2)
        : baseChoicePool;
    const answerShape = answerPool[rand(0, answerPool.length - 1)];
    const missingCells = normalizeCells(answerShape.cells);
    const gridWidth = level >= 4 ? 6 : 5;
    const gridDepth = level >= 3 ? 4 : 3;
    const stackHeight = level >= 4 ? 4 : 3;
    const bounds = cellBounds(missingCells);
    const maxY = Math.max(0, stackHeight - bounds.height);
    const missingOffset = {
        x: rand(1, Math.max(1, gridWidth - bounds.width - 1)),
        y: rand(maxY >= 1 ? 1 : 0, maxY)
    };
    const puzzle = {
        width: gridWidth,
        height: stackHeight,
        depth: gridDepth,
        missing: missingCells.map(cell => [cell[0] + missingOffset.x, cell[1] + missingOffset.y, 0])
    };
    const answerSignature = canonicalShapeSignature(missingCells);
    const distractors = [];

    while (distractors.length < 3) {
        const candidateBase = choicePool[rand(0, choicePool.length - 1)].cells;
        const candidate = normalizeCells(candidateBase);
        const signature = canonicalShapeSignature(candidate);
        if (signature !== answerSignature && !distractors.some(shape => canonicalShapeSignature(shape) === signature)) {
            distractors.push(candidate);
        }
    }

    const pieces = shuffleArray([
        { correct: true, cells: rotateCellsNTimes(missingCells, rand(0, 3)) },
        ...distractors.map(cells => ({ correct: false, cells: rotateCellsNTimes(cells, rand(0, 3)) }))
    ]).map((piece, index) => ({
        ...piece,
        label: `Form ${String.fromCharCode(65 + index)}`
    }));
    const options = pieces.map((_, index) => index);
    const answer = pieces.findIndex(piece => piece.correct);

    return {
        title: "Form einpassen",
        status: "räumliches Denken",
        prompt: "Welches Blockstück fehlt vorne am Würfelpaket?",
        choiceMode: "rotatingPieces",
        pieces,
        answer,
        answerText: pieces[answer].label,
        skill: "spatial",
        explain: "Die Form passt genau in die leere Stelle an der Vorderseite des Würfelpakets.",
        hint: "Vergleiche die leeren Felder von links nach rechts und von oben nach unten. Drehe die Formen, bis die Kanten passen.",
        options,
        visual: boxPuzzleScene(puzzle)
    };
}

function boxShapesForLevel(level) {
    const shapes = [
        { min: 1, cells: [[0, 0]] },
        { min: 1, cells: [[0, 0], [1, 0]] },
        { min: 1, cells: [[0, 0], [0, 1]] },
        { min: 2, cells: [[0, 0], [1, 0], [0, 1]] },
        { min: 2, cells: [[0, 0], [1, 0], [1, 1]] },
        { min: 2, cells: [[0, 0], [0, 1], [0, 2]] },
        { min: 3, cells: [[0, 0], [1, 0], [2, 0]] },
        { min: 3, cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
        { min: 4, cells: [[0, 0], [1, 0], [2, 0], [1, 1]] },
        { min: 4, cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
        { min: 5, cells: [[1, 0], [0, 1], [1, 1], [2, 1]] }
    ];
    return shapes.filter(shape => shape.min <= level);
}

function normalizeCells(cells) {
    const minX = Math.min(...cells.map(cell => cell[0]));
    const minY = Math.min(...cells.map(cell => cell[1]));
    return cells
        .map(cell => [cell[0] - minX, cell[1] - minY, cellHeight(cell)])
        .sort((a, b) => a[1] - b[1] || a[0] - b[0] || a[2] - b[2]);
}

function cellHeight(cell) {
    return Math.max(1, Number(cell[2]) || 1);
}

function cellBounds(cells) {
    return {
        width: Math.max(...cells.map(cell => cell[0])) + 1,
        height: Math.max(...cells.map(cell => cell[1])) + 1
    };
}

function cellSignature(cells) {
    return normalizeCells(cells).map(cell => `${cell[0]},${cell[1]},${cellHeight(cell)}`).join("|");
}

function rotateCellsClockwise(cells) {
    const normalized = normalizeCells(cells);
    const bounds = cellBounds(normalized);
    return normalizeCells(normalized.map(cell => [bounds.height - 1 - cell[1], cell[0], cellHeight(cell)]));
}

function rotateCellsNTimes(cells, turns) {
    let rotated = normalizeCells(cells);
    for (let i = 0; i < turns; i += 1) {
        rotated = rotateCellsClockwise(rotated);
    }
    return rotated;
}

function canonicalShapeSignature(cells) {
    const signatures = [];
    let rotated = normalizeCells(cells);
    for (let i = 0; i < 4; i += 1) {
        signatures.push(cellSignature(rotated));
        rotated = rotateCellsClockwise(rotated);
    }
    return signatures.sort()[0];
}

function craneHookPosition(puzzle) {
    const averageX = puzzle.missing.reduce((sum, cell) => sum + cell[0], 0) / puzzle.missing.length;
    const gridProgress = averageX / Math.max(1, puzzle.width - 1);
    return Math.round(22 + gridProgress * 54);
}

function boxStackMarkup(puzzle) {
    const missingSet = new Set(puzzle.missing.map(cell => cell3DKey(cell[0], cell[1], cell[2])));
    const metrics = stackMetrics(puzzle);
    const cells = [];
    for (let depth = puzzle.depth - 1; depth >= 0; depth -= 1) {
        for (let y = 0; y < puzzle.height; y += 1) {
            for (let x = 0; x < puzzle.width; x += 1) {
                const isMissing = missingSet.has(cell3DKey(x, y, depth));
                const faces = visibleStackFaces(x, y, depth, puzzle);
                const style = stackCellStyle(x, y, depth, puzzle, metrics);
                cells.push(`
                    <span class="box-cell ${isMissing ? "missing" : "filled"}" style="${style}">
                        ${isMissing ? '<span class="box-void"></span>' : boxFacesMarkup(faces)}
                    </span>
                `);
            }
        }
    }
    return `
        <div class="box-stack" style="--stack-width:${metrics.width}px; --stack-height:${metrics.height}px; --box-cols:${puzzle.width}; --box-rows:${puzzle.height}; --box-depth:${puzzle.depth}">
            ${cells.join("")}
        </div>
    `;
}

function cell3DKey(x, y, depth) {
    return `${x},${y},${depth}`;
}

function stackMetrics(puzzle) {
    const box = 42;
    const face = 28;
    const depth = 14;
    const stepX = face;
    const stepY = face;
    const depthX = depth;
    const depthY = depth;
    const padX = 16;
    const padTop = 16;
    return {
        box,
        face,
        stepX,
        stepY,
        depthX,
        depthY,
        padX,
        padTop,
        width: padX * 2 + (puzzle.width - 1) * stepX + (puzzle.depth - 1) * depthX + box,
        height: padTop + (puzzle.depth - 1) * depthY + (puzzle.height - 1) * stepY + box + 10
    };
}

function stackCellStyle(x, y, depth, puzzle, metrics) {
    const left = metrics.padX + x * metrics.stepX + depth * metrics.depthX;
    const top = metrics.padTop + (puzzle.depth - 1 - depth) * metrics.depthY + y * metrics.stepY;
    const zIndex = (puzzle.depth - depth) * 100 + y * 10 + x;
    const brightness = Math.max(0.84, 1 - depth * 0.07).toFixed(2);
    return `left:${left}px; top:${top}px; z-index:${zIndex}; --row:${y}; --col:${x}; --depth:${depth}; --brightness:${brightness};`;
}

function visibleStackFaces(x, y, depth, puzzle) {
    return {
        top: y === 0,
        front: depth === 0,
        side: x === puzzle.width - 1
    };
}

function visiblePieceFaces(x, y, layer, heights) {
    return {
        top: heightAt(heights, x, y) === layer + 1,
        front: heightAt(heights, x, y - 1) <= layer,
        side: heightAt(heights, x + 1, y) <= layer
    };
}

function heightAt(heights, x, y) {
    return heights.get(`${x},${y}`) || 0;
}

function boxFacesMarkup(faces = { top: true, front: true, side: true }) {
    return `
        ${faces.top ? '<span class="box-top"></span>' : ""}
        ${faces.front ? '<span class="box-front"></span>' : ""}
        ${faces.side ? '<span class="box-side"></span>' : ""}
    `;
}

function rotatingPieceChoices(challenge) {
    return `
        <div class="piece-choice-grid">
            ${challenge.pieces.map((piece, index) => rotatingPieceCard(piece, index)).join("")}
        </div>
    `;
}

function rotatingPieceCard(piece, index) {
    return `
        <div class="piece-card" data-piece-card="${index}">
            <strong>${piece.label}</strong>
            ${pieceMiniMarkup(piece.cells, index)}
            <div class="piece-card-actions">
                <button type="button" class="piece-rotate-btn" data-rotate-piece="${index}">Drehen</button>
                <button type="button" class="piece-insert-btn" data-answer="${index}">Einsetzen</button>
            </div>
        </div>
    `;
}

function pieceMiniMarkup(cells, index) {
    const normalized = normalizeCells(cells);
    const bounds = cellBounds(normalized);
    const heights = new Map(normalized.map(cell => [`${cell[0]},${cell[1]}`, cellHeight(cell)]));
    const maxCellHeight = Math.max(...normalized.map(cellHeight));
    const metrics = pieceMiniMetrics(bounds, maxCellHeight);
    const boxes = [];
    normalized.forEach(cell => {
        const x = cell[0];
        const y = cell[1];
        for (let layer = 0; layer < cellHeight(cell); layer += 1) {
            const faces = visiblePieceFaces(x, y, layer, heights);
            boxes.push(`
                <span class="filled" style="${pieceCellStyle(x, y, layer, bounds, metrics)}">
                    ${boxFacesMarkup(faces)}
                </span>
            `);
        }
    });
    return `
        <span class="piece-mini" data-piece-mini="${index}" style="--piece-width:${metrics.width}px; --piece-height:${metrics.height}px">
            ${boxes.join("")}
        </span>
    `;
}

function pieceMiniMetrics(bounds, maxCellHeight = 1) {
    const face = 18;
    const depth = 9;
    const box = 27;
    const overlap = 1;
    const stepFace = face - overlap;
    const stepDepth = depth - overlap;
    const layerLift = face;
    const padX = 5;
    const padTop = 3;
    return {
        face,
        depth,
        stepFace,
        stepDepth,
        layerLift,
        maxCellHeight,
        box,
        padX,
        padTop,
        width: padX * 2 + (bounds.width - 1) * stepFace + (bounds.height - 1) * stepDepth + box,
        height: padTop + (bounds.height - 1) * stepDepth + (maxCellHeight - 1) * layerLift + box + 3
    };
}

function pieceCellStyle(x, y, layer, bounds, metrics) {
    const left = metrics.padX + x * metrics.stepFace + y * metrics.stepDepth;
    const top = metrics.padTop + (bounds.height - 1 - y) * metrics.stepDepth + (metrics.maxCellHeight - 1 - layer) * metrics.layerLift;
    const zIndex = layer * 100 + (bounds.height - y) * 10 + x;
    return `left:${left}px; top:${top}px; z-index:${zIndex};`;
}

function bindRotatingPieceControls(handler = handleMiniGameAnswer) {
    stage().querySelectorAll("[data-rotate-piece]").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.rotatePiece);
            const piece = rechenreise.current.pieces[index];
            piece.cells = rotateCellsClockwise(piece.cells);
            const mini = stage().querySelector(`[data-piece-mini="${index}"]`);
            if (mini) mini.outerHTML = pieceMiniMarkup(piece.cells, index);
        });
    });

    stage().querySelectorAll("[data-answer]").forEach(button => {
        button.addEventListener("click", () => handler(button.dataset.answer));
    });
}

function explanationFor(op, a, b, answer) {
    if (op === "+") return `${a} plus ${b} ergibt ${answer}.`;
    if (op === "-") return `Von ${a} werden ${b} weggenommen.`;
    if (op === "*") return `${a} mal ${b} sind ${answer}.`;
    return `${a} geteilt durch ${b} ergibt ${answer}.`;
}

function arithmeticHint(op, a, b) {
    if (op === "+") return `Rechne zuerst glatte Zehner: ${a} + ${b} kannst du in kleinere Teile zerlegen.`;
    if (op === "-") return `Ziehe erst einen einfachen Teil ab und rechne dann den Rest weiter.`;
    if (op === "*") return `Denke an Reihen: ${a} mal ${b} bedeutet ${a} Gruppen mit je ${b}.`;
    return `Suche die Malaufgabe dazu: Welche Zahl mal ${b} ergibt ${a}?`;
}

function operatorName(op) {
    if (op === "+") return "Plus";
    if (op === "-") return "Minus";
    if (op === "*") return "Mal";
    return "Geteilt";
}

function optionsAround(answer, level) {
    const options = new Set([answer]);
    const spread = Math.max(3, level * 3);
    while (options.size < 4) {
        const candidate = Math.max(0, answer + rand(-spread, spread));
        if (candidate !== answer) options.add(candidate);
    }
    return shuffleArray([...options]);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
