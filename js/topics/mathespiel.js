// Rechenreise: adaptive math mini-games for basic operations and spatial thinking.

const RECHENREISE_KEY = "rechenreise_profile_v2";
const RECHENREISE_MODES = ["rechnen", "operator", "raum", "bonus"];
const MODE_LEVEL_FIVE_GOAL = 500;

const rechenreise = {
    profile: null,
    assessment: [],
    assessmentIndex: 0,
    current: null,
    mode: "rechnen",
    timerId: null
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
        return normalizeRechenreiseProfile({ ...fallback, ...JSON.parse(localStorage.getItem(RECHENREISE_KEY) || "{}") });
    } catch (error) {
        return normalizeRechenreiseProfile(fallback);
    }
}

function defaultModeProgress(level = 2) {
    return RECHENREISE_MODES.reduce((progress, mode) => {
        progress[mode] = createModeProgress(level);
        return progress;
    }, {});
}

function createModeProgress(level = 2) {
    const safeLevel = clampLevel(Math.round(Number(level) || 2));
    return {
        level: safeLevel,
        rating: safeLevel,
        played: 0,
        correct: 0,
        xpByLevel: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
}

function normalizeRechenreiseProfile(profile) {
    const skills = profile.skills || {};
    const existing = profile.modeProgress || {};
    const seedLevel = mode => {
        if (existing[mode] && existing[mode].level) return existing[mode].level;
        if (mode === "operator") return Math.round(((skills.addsub || profile.level || 2) + (skills.multdiv || profile.level || 2)) / 2);
        if (mode === "raum") return skills.spatial || profile.level || 2;
        return profile.level || 2;
    };

    profile.modeProgress = RECHENREISE_MODES.reduce((progress, mode) => {
        const previous = existing[mode] || {};
        const base = createModeProgress(seedLevel(mode));
        const xpByLevel = { ...base.xpByLevel, ...(previous.xpByLevel || {}) };
        progress[mode] = {
            ...base,
            ...previous,
            level: clampLevel(Math.round(Number(previous.level || base.level))),
            rating: Math.max(1, Math.min(5, Number(previous.rating || previous.level || base.rating))),
            played: Number(previous.played || 0),
            correct: Number(previous.correct || 0),
            xpByLevel
        };
        return progress;
    }, {});
    profile.level = globalLevelFromModes(profile);
    return profile;
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
        clearQuestionTimer();
        localStorage.removeItem(RECHENREISE_KEY);
        rechenreise.profile = loadRechenreiseProfile();
        renderRechenreiseShell();
        startRechenreiseAssessment();
    });

    updateRechenreiseHud();
}

function updateRechenreiseHud() {
    setText("mathLevel", modeProgress(rechenreise.mode).level);
    setText("mathXp", rechenreise.profile.xp);
    setText("mathStreak", rechenreise.profile.streak);
}

function modeProgress(mode = rechenreise.mode) {
    if (!rechenreise.profile.modeProgress) {
        rechenreise.profile.modeProgress = defaultModeProgress(rechenreise.profile.level || 2);
    }
    if (!rechenreise.profile.modeProgress[mode]) {
        rechenreise.profile.modeProgress[mode] = createModeProgress(rechenreise.profile.level || 2);
    }
    return rechenreise.profile.modeProgress[mode];
}

function modeLevelFiveXp(mode) {
    return Number(modeProgress(mode).xpByLevel[5] || 0);
}

function isModeMastered(mode) {
    return modeLevelFiveXp(mode) >= MODE_LEVEL_FIVE_GOAL;
}

function setModeLevel(mode, level) {
    const progress = modeProgress(mode);
    progress.level = clampLevel(Math.round(level));
    progress.rating = progress.level;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function stage() {
    return document.getElementById("mathGameStage");
}

function timeLimitForLevel(level) {
    return Math.round(16 - clampLevel(Math.round(level)) * 1.2);
}

function timerMarkup(seconds) {
    return `
        <div class="math-timer" id="mathTimer" aria-live="polite">
            <span>Zeit: <strong id="mathTimerText">${seconds}s</strong></span>
            <span class="math-timer-track" aria-hidden="true"><span id="mathTimerBar" style="width:100%"></span></span>
        </div>
    `;
}

function startQuestionTimer(question, onTimeout) {
    clearQuestionTimer();
    const total = Math.max(1, question.timeLimit || timeLimitForLevel(question.level || rechenreise.profile.level));
    let remaining = total;
    updateTimerDisplay(remaining, total);
    rechenreise.timerId = window.setInterval(() => {
        remaining -= 1;
        updateTimerDisplay(remaining, total);
        if (remaining <= 0) {
            clearQuestionTimer();
            if (!question.answered) onTimeout();
        }
    }, 1000);
}

function clearQuestionTimer() {
    if (rechenreise.timerId) {
        window.clearInterval(rechenreise.timerId);
        rechenreise.timerId = null;
    }
}

function updateTimerDisplay(remaining, total) {
    const safeRemaining = Math.max(0, remaining);
    const timer = document.getElementById("mathTimer");
    const text = document.getElementById("mathTimerText");
    const bar = document.getElementById("mathTimerBar");
    if (text) text.textContent = `${safeRemaining}s`;
    if (bar) bar.style.width = `${Math.max(0, Math.min(100, (safeRemaining / total) * 100))}%`;
    if (timer) timer.classList.toggle("is-low", safeRemaining <= 3);
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
    clearQuestionTimer();
    const question = rechenreise.assessment[rechenreise.assessmentIndex];
    rechenreise.current = question;
    question.answered = false;
    question.timeLimit = timeLimitForLevel(question.level || rechenreise.profile.level);
    stage().innerHTML = `
        <div class="math-game-question">
            <p class="math-game-kicker">Start-Check ${rechenreise.assessmentIndex + 1} von ${rechenreise.assessment.length}</p>
            ${timerMarkup(question.timeLimit)}
            <h3>${question.prompt}</h3>
            ${question.visual || ""}
            ${question.choiceMode === "rotatingPieces" ? rotatingPieceChoices(question) : `
                <div class="math-answer-grid">
                    ${question.options.map(option => answerButton(option, question.optionLabels)).join("")}
                </div>
            `}
            <p class="math-game-note">Es geht nicht um Stress. Rechenreise sucht nur passende Aufgaben für dich.</p>
            <p class="math-feedback" id="mathFeedback"></p>
        </div>
    `;
    if (question.choiceMode === "rotatingPieces") {
        bindRotatingPieceControls(handleAssessmentAnswer);
    } else {
        bindAnswerButtons(handleAssessmentAnswer);
    }
    startQuestionTimer(question, () => handleAssessmentAnswer(null, true));
}

function handleAssessmentAnswer(value, timedOut = false) {
    const question = rechenreise.current;
    if (!question || question.answered) return;
    question.answered = true;
    clearQuestionTimer();
    const selectedValue = timedOut ? NaN : Number(value);
    const correct = !timedOut && isAnswerCorrect(question, selectedValue);
    question.wasCorrect = correct;
    rechenreise.assessmentIndex += 1;

    if (timedOut) {
        markAnswerState(question, selectedValue, false);
        const feedback = document.getElementById("mathFeedback");
        const correctText = question.answerText || question.answer;
        feedback.innerHTML = `Zeit vorbei. Richtig ist ${correctText}.`;
        const next = document.createElement("button");
        next.type = "button";
        next.textContent = rechenreise.assessmentIndex >= rechenreise.assessment.length ? "Auswertung anzeigen" : "Nächste Aufgabe";
        next.addEventListener("click", () => {
            if (rechenreise.assessmentIndex >= rechenreise.assessment.length) {
                finishAssessment();
                return;
            }
            renderAssessmentQuestion();
        });
        feedback.appendChild(document.createElement("br"));
        feedback.appendChild(next);
        return;
    }

    if (rechenreise.assessmentIndex >= rechenreise.assessment.length) {
        finishAssessment();
        return;
    }

    renderAssessmentQuestion();
}

function finishAssessment() {
    clearQuestionTimer();
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
    setModeLevel("rechnen", Math.round((rechenreise.profile.skills.addsub + rechenreise.profile.skills.multdiv) / 2));
    setModeLevel("operator", Math.round((rechenreise.profile.skills.addsub + rechenreise.profile.skills.multdiv) / 2));
    setModeLevel("raum", rechenreise.profile.skills.spatial);
    setModeLevel("bonus", level);
    rechenreise.profile.level = globalLevelFromModes();
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
    clearQuestionTimer();
    rechenreise.current = null;
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
                <svg class="math-map-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path class="map-path-shadow" d="M 12 29 C 20 56, 25 70, 36 70 S 47 30, 59 30 S 70 70, 84 70" />
                    <path class="map-path-main" d="M 12 29 C 20 56, 25 70, 36 70 S 47 30, 59 30 S 70 70, 84 70" />
                    <path class="map-path-dashes" d="M 12 29 C 20 56, 25 70, 36 70 S 47 30, 59 30 S 70 70, 84 70" />
                </svg>
                <div class="math-map-token" style="${mapTokenStyle()}">${heroMarkup("map")}</div>
                ${mapPlace("rechnen", "+", "Zahlencamp", "place-1")}
                ${mapPlace("operator", "x", "Rechnungs-<br>Werkstatt", "place-2")}
                ${mapPlace("raum", "3D", "Baustelle", "place-3")}
                ${mapPlace("bonus", "?", "Bonus-Mix", "place-4")}
            </div>
            <div class="math-game-modes">
                ${modeCard("rechnen", "Zahlencamp", "Rechen-Sprint", "Plus, Minus, Mal und Geteilt gemischt.")}
                ${modeCard("operator", "Rechnungs-Werkstatt", "Rechnung reparieren", "Finde das passende Rechenzeichen.")}
                ${modeCard("raum", "Kistenlager", "Form einpassen", "Finde die Kistenform für die Lücke.")}
                ${modeCard("bonus", "Bonus-Mix", "Meister-Mix", "Gemischte Aufgaben aus allen Stationen.")}
            </div>
            <p class="math-game-note">Jede Station hat ihr eigenes Niveau. Der Bonus-Mix mischt Rechnen, Werkstatt und Kistenlager.</p>
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
    const progress = modeProgress(mode);
    const levelFiveXp = Math.min(MODE_LEVEL_FIVE_GOAL, modeLevelFiveXp(mode));
    const mastered = isModeMastered(mode);
    return `
        <button class="math-mode-card ${mastered ? "is-mastered" : ""}" type="button" data-mode="${mode}">
            ${mastered ? '<b class="mode-check" aria-label="gemeistert">✓</b>' : ""}
            <em>${station}</em>
            <strong>${title}</strong>
            <span>${text}</span>
            <small>Niveau ${progress.level} · Level 5: ${levelFiveXp}/${MODE_LEVEL_FIVE_GOAL}</small>
        </button>
    `;
}

function mapPlace(mode, symbol, label, className) {
    const mastered = isModeMastered(mode);
    return `
        <div class="math-map-place ${className} ${mastered ? "is-mastered" : ""}">
            <span>${symbol}</span>
            <small>${label}</small>
            ${mastered ? '<b class="map-check">✓</b>' : ""}
        </div>
    `;
}

function mapTokenStyle() {
    const stops = [
        { x: 12, y: 29 },
        { x: 36, y: 70 },
        { x: 59, y: 30 },
        { x: 84, y: 70 }
    ];
    const ratio = Math.min(1, Math.max(0, rechenreise.profile.played / 30));
    const scaled = ratio * (stops.length - 1);
    const index = Math.min(stops.length - 2, Math.floor(scaled));
    const local = scaled - index;
    const start = stops[index];
    const end = stops[index + 1];
    const x = start.x + (end.x - start.x) * local;
    const y = start.y + (end.y - start.y) * local;
    return `left:${x}%; top:${y}%;`;
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
    const heroMood = type === "build" ? "builder" : type === "workshop" ? "mechanic" : "ready";
    return `
        <div class="math-adventure-scene scene-${type}">
            <div class="scene-sky"></div>
            <div class="scene-hills"></div>
            <div class="scene-ground"></div>
            ${heroMarkup(heroMood)}
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
        <div class="workshop-shelf">
            <span class="tool-hook hook-one"></span>
            <span class="tool-hook hook-two"></span>
            <span class="tool-hook hook-three"></span>
        </div>
        <div class="workbench">
            <span class="bench-top"></span>
            <span class="bench-leg leg-one"></span>
            <span class="bench-leg leg-two"></span>
            <span class="bench-shadow"></span>
            <span class="bench-pencil"></span>
            <span class="bench-wrench"></span>
        </div>
        <div class="repair-equation" aria-hidden="true">
            <span>${a}</span>
            <strong class="repair-question">?</strong>
            <span>${b}</span>
            <em>= ${answer}</em>
            <i class="repair-spark spark-a"></i>
            <i class="repair-spark spark-b"></i>
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
    clearQuestionTimer();
    const level = skillLevelForMode(rechenreise.mode);
    const challenge = makeChallengeForMode(rechenreise.mode, level);
    challenge.mode = rechenreise.mode;
    challenge.level = level;
    challenge.answered = false;
    challenge.timeLimit = timeLimitForLevel(level);
    rechenreise.current = challenge;
    setText("mathGameStatus", challenge.status);
    updateRechenreiseHud();

    stage().innerHTML = `
        <div class="math-game-question">
            <div class="math-game-row">
                <button type="button" class="math-game-ghost" id="mathBack">Zur Karte</button>
                <span class="math-game-pill">Niveau ${level}</span>
            </div>
            <p class="math-game-kicker">${challenge.title}</p>
            ${timerMarkup(challenge.timeLimit)}
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
    startQuestionTimer(challenge, () => handleMiniGameAnswer(null, true));
}

function makeChallengeForMode(mode, level) {
    if (mode === "operator") return makeOperatorChallenge(level);
    if (mode === "raum") return makeSpatialChallenge(level);
    if (mode === "bonus") return makeBonusChallenge(level);
    return makeArithmeticChallenge(level, level < 3 ? "addsub" : "mixed");
}

function skillLevelForMode(mode) {
    return modeProgress(mode).level;
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

function handleMiniGameAnswer(value, timedOut = false) {
    const question = rechenreise.current;
    if (!question || question.answered) return;
    question.answered = true;
    clearQuestionTimer();
    const selectedValue = timedOut ? NaN : Number(value);
    const correct = !timedOut && isAnswerCorrect(question, selectedValue);
    const panel = stage().querySelector(".math-game-question");
    if (panel) panel.classList.add(correct ? "is-success" : "is-miss");

    markAnswerState(question, selectedValue, correct);

    const mode = question.mode || rechenreise.mode;
    const progress = modeProgress(mode);
    const questionLevel = clampLevel(question.level || progress.level);
    let earnedPoints = 0;
    rechenreise.profile.played += 1;
    progress.played += 1;
    if (correct) {
        rechenreise.profile.correct += 1;
        progress.correct += 1;
        rechenreise.profile.streak += 1;
        earnedPoints = scoreForQuestion(question, questionLevel);
        rechenreise.profile.xp += earnedPoints;
        addModeLevelXp(mode, questionLevel, earnedPoints);
        adjustModeProgress(mode, question.hintShown ? 0.18 : 0.35 + (rechenreise.profile.streak >= 3 ? 0.2 : 0));
        adjustSkill(question.skill, question.hintShown ? 0.18 : 0.35 + (rechenreise.profile.streak >= 3 ? 0.2 : 0));
    } else {
        rechenreise.profile.streak = 0;
        adjustModeProgress(mode, -0.35);
        adjustSkill(question.skill, -0.35);
    }

    rechenreise.profile.level = globalLevelFromModes();
    saveRechenreiseProfile();
    updateRechenreiseHud();

    const feedback = document.getElementById("mathFeedback");
    const correctText = question.answerText || question.answer;
    const masteredText = isModeMastered(mode) ? " Diese Station hat den grünen Haken." : "";
    feedback.innerHTML = correct
        ? `Richtig. +${earnedPoints} Punkte. ${question.explain}${masteredText}`
        : `${timedOut ? "Zeit vorbei." : "Noch nicht."} Richtig ist ${correctText}. ${question.explain}`;

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
            card.querySelectorAll("[data-answer]").forEach(button => { button.disabled = true; });
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

function scoreForQuestion(question, level) {
    return Math.max(5, 10 + clampLevel(level) - (question.hintShown ? 3 : 0));
}

function addModeLevelXp(mode, level, amount) {
    const progress = modeProgress(mode);
    const safeLevel = clampLevel(level);
    progress.xpByLevel[safeLevel] = Number(progress.xpByLevel[safeLevel] || 0) + amount;
}

function adjustModeProgress(mode, delta) {
    const progress = modeProgress(mode);
    progress.rating = Math.max(1, Math.min(5, Number(progress.rating || progress.level || 2) + delta));
    progress.level = clampLevel(Math.round(progress.rating));
}

function globalLevelFromModes(profile = rechenreise.profile) {
    const values = RECHENREISE_MODES.map(mode => {
        const progress = profile.modeProgress && profile.modeProgress[mode];
        return progress ? Number(progress.level || 2) : Number(profile.level || 2);
    });
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
        level,
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
        level,
        title: "Rechnung reparieren",
        status: "Rechnungs-Werkstatt",
        prompt: `${a} ? ${b} = ${answer}`,
        answer: opValue,
        answerText: operatorName(op),
        skill: op === "+" || op === "-" ? "addsub" : "multdiv",
        explain: `Das fehlende Zeichen ist ${operatorName(op)}. Damit ist die Rechnung wieder in Ordnung.`,
        hint: "Prüfe die kaputte Stelle: Wird das Ergebnis größer oder kleiner? Bei Mal und Geteilt verändern sich Zahlen oft stärker.",
        options: [1, 2, 3, 4],
        optionLabels: { 1: "+", 2: "-", 3: "·", 4: ":" },
        visual: `
            ${operatorScene(a, b, answer)}
            <div class="math-operator-legend">
                <span>Setze das passende Werkzeug-Zeichen ein.</span>
            </div>
        `
    };
}

function makeBonusChallenge(level) {
    const mode = ["rechnen", "operator", "raum"][rand(0, 2)];
    const challenge = mode === "operator"
        ? makeOperatorChallenge(level)
        : mode === "raum"
            ? makeSpatialChallenge(level)
            : makeArithmeticChallenge(level, "mixed");
    return {
        ...challenge,
        title: `Bonus: ${challenge.title}`,
        status: "Bonus-Mix",
        explain: `${challenge.explain} Bonus-Aufgaben trainieren alles durcheinander.`
    };
}

function makeSpatialChallenge(level) {
    const use3D = level > 1;
    const useMirrorDistractors = level >= 4;
    const baseAnswerPool = boxShapesForLevel(level);
    const answerPool = uniqueShapesBySignature(use3D
        ? baseAnswerPool.filter(shape => cellBounds(normalizeCells(shape.cells)).depth >= 2)
        : baseAnswerPool.filter(shape => cellBounds(normalizeCells(shape.cells)).depth === 1));
    const mirrorAnswerPool = useMirrorDistractors ? answerPool.filter(shape => isMirrorDistinct(shape.cells)) : [];
    const baseChoicePool = boxShapesForLevel(Math.max(3, level));
    const choicePool = uniqueShapesBySignature(use3D
        ? baseChoicePool.filter(shape => cellBounds(normalizeCells(shape.cells)).depth >= 2)
        : baseChoicePool.filter(shape => cellBounds(normalizeCells(shape.cells)).depth === 1));
    const activeAnswerPool = mirrorAnswerPool.length ? mirrorAnswerPool : answerPool;
    const answerShape = activeAnswerPool[rand(0, activeAnswerPool.length - 1)];
    const missingCells = normalizeCells(answerShape.cells);
    const gridWidth = level >= 4 ? 6 : 5;
    const gridDepth = level >= 3 ? 4 : 3;
    const stackHeight = level >= 4 ? 4 : 3;
    const bounds = cellBounds(missingCells);
    const missingOffset = {
        x: rand(1, Math.max(1, gridWidth - bounds.width - 1)),
        y: 0
    };
    const puzzle = {
        width: gridWidth,
        height: stackHeight,
        depth: gridDepth,
        missing: missingCells.map(cell => [cell[0] + missingOffset.x, cell[1] + missingOffset.y, cellDepth(cell)])
    };
    const answerSignature = canonicalShapeSignature(missingCells);
    const answerPlanarSignature = planarShapeSignature(missingCells);
    const distractors = [];

    if (useMirrorDistractors) {
        addSpatialDistractorIfDistinct(distractors, mirrorCellsHorizontally(missingCells), answerSignature);
    }

    let attempts = 0;
    while (distractors.length < 3 && attempts < 120) {
        attempts += 1;
        const candidateBase = choicePool[rand(0, choicePool.length - 1)].cells;
        const candidate = normalizeCells(candidateBase);
        if (use3D) {
            addSpatialDistractorIfDistinct(distractors, candidate, answerSignature);
            if (useMirrorDistractors && distractors.length < 3) {
                addSpatialDistractorIfDistinct(distractors, mirrorCellsHorizontally(candidate), answerSignature);
            }
        } else {
            addPlanarDistractorIfDistinct(distractors, candidate, answerSignature, answerPlanarSignature);
        }
    }

    const pieces = shuffleArray([
        { correct: true, is3D: is3DShape(missingCells), cells: rotateCellsNTimes(missingCells, randomInitialTurns(missingCells)) },
        ...distractors.map(cells => ({ correct: false, is3D: is3DShape(cells), cells: rotateCellsNTimes(cells, randomInitialTurns(cells)) }))
    ]).map((piece, index) => ({
        ...piece,
        label: `Form ${String.fromCharCode(65 + index)}`
    }));
    const options = pieces.map((_, index) => index);
    const answer = pieces.findIndex(piece => piece.correct);

    return {
        level,
        title: "Form einpassen",
        status: "räumliches Denken",
        prompt: "Welches Blockstück fehlt oben vorne am Würfelpaket?",
        choiceMode: "rotatingPieces",
        pieces,
        answer,
        answerText: pieces[answer].label,
        skill: "spatial",
        explain: "Die Form passt genau in die leere Stelle oben an der Vorderseite des Würfelpakets.",
        hint: use3D ? "Vergleiche zuerst die obere Vorderkante. Danach prüfe, wie weit das Stück nach hinten in die Tiefe reicht." : "Vergleiche die leeren Felder von links nach rechts und von oben nach unten. Drehe die Formen, bis die Kanten passen.",
        options,
        visual: boxPuzzleScene(puzzle)
    };
}

function boxShapesForLevel(level) {
    const shapes = [
        { min: 1, cells: [[0, 0, 0]] },
        { min: 1, cells: [[0, 0, 0], [1, 0, 0]] },
        { min: 1, cells: [[0, 0, 0], [0, 1, 0]] },
        { min: 1, cells: [[0, 0, 0], [1, 0, 0], [2, 0, 0]] },
        { min: 1, cells: [[0, 0, 0], [1, 0, 0], [0, 1, 0]] },
        { min: 1, cells: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]] },
        { min: 2, cells: [[0, 0, 0], [0, 0, 1]] },
        { min: 2, cells: [[0, 0, 0], [0, 0, 1], [0, 0, 2]] },
        { min: 2, cells: [[0, 0, 0], [1, 0, 0], [0, 0, 1]] },
        { min: 2, cells: [[0, 0, 0], [0, 1, 0], [0, 0, 1]] },
        { min: 2, cells: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] },
        { min: 2, cells: [[0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 1]] },
        { min: 2, cells: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1]] },
        { min: 3, cells: [[0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 1, 0]] },
        { min: 3, cells: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 1, 0]] },
        { min: 3, cells: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [0, 1, 0]] },
        { min: 4, cells: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 1, 0]] },
        { min: 4, cells: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [0, 1, 0]] },
        { min: 4, cells: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [1, 0, 1], [1, 1, 0]] },
        { min: 5, cells: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [2, 0, 1], [1, 1, 0]] },
        { min: 5, cells: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [2, 0, 1], [1, 1, 0]] },
        { min: 5, cells: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1], [1, 1, 0]] }
    ];
    return shapes.filter(shape => shape.min <= level);
}

function normalizeCells(cells) {
    const minX = Math.min(...cells.map(cell => cell[0]));
    const minY = Math.min(...cells.map(cell => cell[1]));
    const minDepth = Math.min(...cells.map(cellDepth));
    return cells
        .map(cell => [cell[0] - minX, cell[1] - minY, cellDepth(cell) - minDepth])
        .sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]);
}

function cellDepth(cell) {
    return Math.max(0, Number(cell[2]) || 0);
}

function cellBounds(cells) {
    return {
        width: Math.max(...cells.map(cell => cell[0])) + 1,
        height: Math.max(...cells.map(cell => cell[1])) + 1,
        depth: Math.max(...cells.map(cellDepth)) + 1
    };
}

function cellSignature(cells) {
    return normalizeCells(cells).map(cell => `${cell[0]},${cell[1]},${cellDepth(cell)}`).join("|");
}

function normalizeSignedCells(cells) {
    const minX = Math.min(...cells.map(cell => cell[0]));
    const minY = Math.min(...cells.map(cell => cell[1]));
    const minDepth = Math.min(...cells.map(cell => Number(cell[2]) || 0));
    return cells
        .map(cell => [cell[0] - minX, cell[1] - minY, (Number(cell[2]) || 0) - minDepth])
        .sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]);
}

function signedCellSignature(cells) {
    return normalizeSignedCells(cells).map(cell => `${cell[0]},${cell[1]},${cell[2]}`).join("|");
}

function uniqueShapesBySignature(shapes) {
    const seen = new Set();
    return shapes.filter(shape => {
        const signature = canonicalShapeSignature(shape.cells);
        if (seen.has(signature)) return false;
        seen.add(signature);
        return true;
    });
}

function rotateCellsClockwise(cells, force3D = false) {
    const normalized = normalizeCells(cells);
    const bounds = cellBounds(normalized);
    if (!force3D && bounds.depth <= 1) {
        return normalizeCells(normalized.map(cell => [bounds.height - 1 - cell[1], cell[0], 0]));
    }
    return normalizeCells(normalized.map(cell => [bounds.depth - 1 - cellDepth(cell), cell[1], cell[0]]));
}

function mirrorCellsHorizontally(cells) {
    const normalized = normalizeCells(cells);
    const bounds = cellBounds(normalized);
    return normalizeCells(normalized.map(cell => [bounds.width - 1 - cell[0], cell[1], cellDepth(cell)]));
}

function isMirrorDistinct(cells) {
    return canonicalShapeSignature(mirrorCellsHorizontally(cells)) !== canonicalShapeSignature(cells);
}

function planarShapeSignature(cells) {
    return [
        canonicalShapeSignature(cells),
        canonicalShapeSignature(mirrorCellsHorizontally(cells))
    ].sort()[0];
}

function addPlanarDistractorIfDistinct(distractors, candidate, answerSignature, answerPlanarSignature) {
    const signature = canonicalShapeSignature(candidate);
    const planarSignature = planarShapeSignature(candidate);
    const hasDuplicate = distractors.some(shape => planarShapeSignature(shape) === planarSignature);
    if (signature !== answerSignature && planarSignature !== answerPlanarSignature && !hasDuplicate) {
        distractors.push(candidate);
    }
}

function addSpatialDistractorIfDistinct(distractors, candidate, answerSignature) {
    const signature = canonicalShapeSignature(candidate);
    const hasDuplicate = distractors.some(shape => canonicalShapeSignature(shape) === signature);
    if (signature !== answerSignature && !hasDuplicate) {
        distractors.push(candidate);
    }
}

function rotateCellsNTimes(cells, turns) {
    let rotated = normalizeCells(cells);
    const force3D = cellBounds(rotated).depth > 1;
    for (let i = 0; i < turns; i += 1) {
        rotated = rotateCellsClockwise(rotated, force3D);
    }
    return rotated;
}

function randomInitialTurns(cells) {
    const bounds = cellBounds(normalizeCells(cells));
    return bounds.depth > 1 ? rand(0, 1) * 2 : rand(0, 3);
}

function is3DShape(cells) {
    return cellBounds(normalizeCells(cells)).depth > 1;
}

function canonicalShapeSignature(cells) {
    const signatures = [];
    const normalized = normalizeSignedCells(cells);
    const permutations = [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0]
    ];
    const signs = [-1, 1];
    permutations.forEach(permutation => {
        const parity = permutationParity(permutation);
        signs.forEach(signX => {
            signs.forEach(signY => {
                signs.forEach(signDepth => {
                    if (signX * signY * signDepth * parity !== 1) return;
                    signatures.push(signedCellSignature(normalized.map(cell => [
                        cell[permutation[0]] * signX,
                        cell[permutation[1]] * signY,
                        cell[permutation[2]] * signDepth
                    ])));
                });
            });
        });
    });
    return signatures.sort()[0];
}

function permutationParity(permutation) {
    let inversions = 0;
    for (let i = 0; i < permutation.length; i += 1) {
        for (let j = i + 1; j < permutation.length; j += 1) {
            if (permutation[i] > permutation[j]) inversions += 1;
        }
    }
    return inversions % 2 === 0 ? 1 : -1;
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
                        ${isMissing ? boxVoidMarkup(faces) : boxFacesMarkup(faces)}
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

function visiblePieceFaces(x, y, depth, occupied) {
    return {
        top: !occupied.has(cell3DKey(x, y - 1, depth)),
        front: !occupied.has(cell3DKey(x, y, depth - 1)),
        side: !occupied.has(cell3DKey(x + 1, y, depth))
    };
}

function boxFacesMarkup(faces = { top: true, front: true, side: true }) {
    return `
        ${faces.top ? '<span class="box-top"></span>' : ""}
        ${faces.front ? '<span class="box-front"></span>' : ""}
        ${faces.side ? '<span class="box-side"></span>' : ""}
    `;
}

function boxVoidMarkup(faces = { top: true, front: true, side: true }) {
    return `
        ${faces.top ? '<span class="box-void-top"></span>' : ""}
        ${faces.front ? '<span class="box-void-front"></span>' : ""}
        ${faces.side ? '<span class="box-void-side"></span>' : ""}
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
    const occupied = new Set(normalized.map(cell => cell3DKey(cell[0], cell[1], cellDepth(cell))));
    const metrics = pieceMiniMetrics(bounds);
    const boxes = normalized.map(cell => {
        const x = cell[0];
        const y = cell[1];
        const depth = cellDepth(cell);
        const faces = visiblePieceFaces(x, y, depth, occupied);
        return `
            <span class="filled" style="${pieceCellStyle(x, y, depth, bounds, metrics)}">
                ${boxFacesMarkup(faces)}
            </span>
        `;
    });
    return `
        <span class="piece-mini" data-piece-mini="${index}" style="--piece-width:${metrics.width}px; --piece-height:${metrics.height}px">
            ${boxes.join("")}
        </span>
    `;
}

function pieceMiniMetrics(bounds) {
    const face = 18;
    const depth = 9;
    const box = 27;
    const overlap = 1;
    const stepFace = face - overlap;
    const stepDepth = depth - overlap;
    const stepY = face - overlap;
    const padX = 5;
    const padTop = 3;
    return {
        face,
        depth,
        stepFace,
        stepDepth,
        stepY,
        box,
        padX,
        padTop,
        width: padX * 2 + (bounds.width - 1) * stepFace + (bounds.depth - 1) * stepDepth + box,
        height: padTop + (bounds.depth - 1) * stepDepth + (bounds.height - 1) * stepY + box + 3
    };
}

function pieceCellStyle(x, y, depth, bounds, metrics) {
    const left = metrics.padX + x * metrics.stepFace + depth * metrics.stepDepth;
    const top = metrics.padTop + (bounds.depth - 1 - depth) * metrics.stepDepth + y * metrics.stepY;
    const zIndex = (bounds.depth - depth) * 100 + (bounds.height - y) * 10 + x;
    return `left:${left}px; top:${top}px; z-index:${zIndex};`;
}

function bindRotatingPieceControls(handler = handleMiniGameAnswer) {
    stage().querySelectorAll("[data-rotate-piece]").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.rotatePiece);
            const piece = rechenreise.current.pieces[index];
            piece.cells = rotateCellsClockwise(piece.cells, piece.is3D);
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
