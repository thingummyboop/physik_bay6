const APP = window.LEARNQUEST_CURRICULUM;
const SUBJECT_KEY = "wissenspfad_selected_subject";
const COINS_KEY = "learning_coins";
const COMPLETED_KEY = "challenge_completed_topics";

let currentSubject = localStorage.getItem(SUBJECT_KEY) || "physik";
let currentView = "home";
let suppressNextHashRender = false;
let currentFrameMode = "learn";

function getSubjects() {
    return Object.entries(APP.subjects);
}

function getCoins() {
    return Number(localStorage.getItem(COINS_KEY) || 0);
}

function getCompletedTopics() {
    try {
        return new Set(JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]"));
    } catch (error) {
        return new Set();
    }
}

function topicById(topicId) {
    for (const [subjectId, subject] of getSubjects()) {
        const topic = subject.topics.find(item => item.id === topicId);
        if (topic) return { subjectId, subject, topic };
    }
    return null;
}

function updateShellStats() {
    const coins = getCoins();
    document.querySelectorAll("[data-coin-count]").forEach(el => {
        el.textContent = String(coins);
    });

    const completed = getCompletedTopics().size;
    document.querySelectorAll("[data-completed-count]").forEach(el => {
        el.textContent = String(completed);
    });
}

function setLanguage(lang) {
    localStorage.setItem("physik_lang", lang);
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    closeLanguageMenu();

    const frame = document.getElementById("game-frame");
    if (frame && frame.src && !frame.hidden) frame.contentWindow.location.reload();
}

function toggleLanguageMenu() {
    const menu = document.getElementById("language-dropdown");
    const toggle = document.getElementById("language-toggle");
    if (!menu || !toggle) return;

    const shouldOpen = menu.hidden;
    menu.hidden = !shouldOpen;
    toggle.setAttribute("aria-expanded", String(shouldOpen));
}

function closeLanguageMenu() {
    const menu = document.getElementById("language-dropdown");
    const toggle = document.getElementById("language-toggle");
    if (!menu || !toggle) return;

    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
}

function toggleDarkMode() {
    const next = localStorage.getItem("physik_dark_mode") !== "true";
    localStorage.setItem("physik_dark_mode", String(next));
    applyTheme(next);
}

function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
    const btn = document.getElementById("dark-mode-toggle");
    if (btn) updateThemeToggleButton(btn, isDark);

    const frame = document.getElementById("game-frame");
    if (frame?.contentWindow) {
        frame.contentWindow.postMessage({ type: "themeChange", isDark }, "*");
    }
}

function updateThemeToggleButton(btn, isDark) {
    const label = isDark ? "Sonnenmodus aktivieren" : "Waldmodus aktivieren";
    const symbol = isDark ? "\u2600" : "\uD83C\uDF32";
    btn.innerHTML = `<span class="theme-glyph" aria-hidden="true">${symbol}</span>`;
    btn.setAttribute("aria-label", label);
    btn.title = label;
}

function resetAllProgress() {
    if (!confirm("Wirklich alle Lernfortschritte, Kapiteltests, Wartezeiten und M\u00fcnzen l\u00f6schen?")) return;
    [
        COINS_KEY,
        COMPLETED_KEY,
        "chapter_quiz_state",
        "physik_answered",
        "physik_failed_once",
        "practice_answered",
        "practice_failed_once",
        "physik_score",
        "physik_topic_scores"
    ].forEach(key => localStorage.removeItem(key));
    updateShellStats();
    renderCurrentView();
}

function showMainView() {
    document.getElementById("main-view").hidden = false;
    document.getElementById("frame-shell").hidden = true;
    const resetBtn = document.getElementById("frame-practice-reset");
    if (resetBtn) resetBtn.hidden = true;
}

function resetMainViewScroll() {
    const mainView = document.getElementById("main-view");
    if (!mainView) return;
    const reset = () => { mainView.scrollTop = 0; };
    reset();
    requestAnimationFrame(reset);
    [0, 90, 240].forEach(delay => setTimeout(reset, delay));
}

function showTopicFrame(url, title, mode = "learn") {
    const frameShell = document.getElementById("frame-shell");
    const frame = document.getElementById("game-frame");
    const resetBtn = document.getElementById("frame-practice-reset");
    currentFrameMode = mode;
    document.getElementById("main-view").hidden = true;
    frameShell.hidden = false;
    frame.title = title || "Kapitel";
    frame.src = url;
    if (resetBtn) resetBtn.hidden = mode !== "challenge";
}

function resetCurrentTopicPractice() {
    if (currentFrameMode !== "challenge") return;
    const frame = document.getElementById("game-frame");
    if (typeof frame?.contentWindow?.resetTopicProgress === "function") {
        frame.contentWindow.resetTopicProgress();
    }
}

function navigate(view, subjectId = currentSubject) {
    currentView = view;
    if (APP.subjects[subjectId]) {
        currentSubject = subjectId;
        localStorage.setItem(SUBJECT_KEY, subjectId);
    }
    const nextHash = view === "challenge" ? "challenge" : view === "character" ? "character" : "start";
    if (location.hash !== `#${nextHash}`) {
        suppressNextHashRender = true;
        location.hash = nextHash;
    }
    renderCurrentView();
}

function openTopic(topicId, mode) {
    const found = topicById(topicId);
    if (!found) return;
    currentSubject = found.subjectId;
    localStorage.setItem(SUBJECT_KEY, found.subjectId);

    if (!found.topic.available) {
        const qs = new URLSearchParams({
            subject: found.subject.label,
            title: found.topic.title,
            grade: String(found.topic.grade),
            strand: found.topic.strand
        });
        showTopicFrame(`topics/placeholder.html?${qs.toString()}`, found.topic.title, mode);
        setAppHash(`${mode}:${topicId}`);
        return;
    }

    const qs = new URLSearchParams({ topic: topicId, mode });
    showTopicFrame(`topics/template.html?${qs.toString()}`, found.topic.title, mode);
    setAppHash(`${mode}:${topicId}`);
}

function backToShell() {
    renderCurrentView();
    setAppHash(currentView === "challenge" ? "challenge" : "start");
}

function setAppHash(nextHash) {
    if (location.hash === `#${nextHash}`) return;
    suppressNextHashRender = true;
    location.hash = nextHash;
}

function renderSubjectButtons(targetId, selectedSubject, onClick) {
    const target = document.getElementById(targetId);
    target.innerHTML = "";
    getSubjects().forEach(([subjectId, subject]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "subject-pill";
        btn.style.setProperty("--accent", subject.accent);
        btn.classList.toggle("active", subjectId === selectedSubject);
        btn.dataset.subject = subjectId;
        btn.dataset.label = subject.label;
        btn.title = subject.label;
        btn.setAttribute("aria-label", subject.label);
        btn.innerHTML = `<span class="subject-symbol">${subjectSymbol(subjectId, subject)}</span><strong class="subject-label">${subject.label}</strong>`;
        btn.onclick = () => onClick(subjectId);
        target.appendChild(btn);
    });
}

function subjectSymbol(subjectId, subject) {
    const symbols = {
        physik: "&#9883;",
        mathematik: `<svg class="math-ops-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <rect x="8" y="8" width="48" height="48" rx="12" fill="none" stroke="currentColor" stroke-width="4"/>
            <path d="M23 17v14M16 24h14M38 24h12M18 43l11-11M18 32l11 11M39 39h13" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
            <circle cx="45.5" cy="34" r="2.4" fill="currentColor"/>
            <circle cx="45.5" cy="44" r="2.4" fill="currentColor"/>
        </svg>`,
        chemie: `<svg class="chem-flask-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <path d="M25 7h14M28 7v17L14.5 49.5C12 54 15.2 58 20.5 58h23c5.3 0 8.5-4 6-8.5L36 24V7" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.5 48h23L37 36H27z" fill="currentColor" opacity="0.22"/>
            <path d="M24 36.5c4.8 3.4 11.2 3.4 16 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>`,
        dgb: "&#128187;",
        geographie: "&#127757;",
        biologie: "&#128004;",
        deutsch: "Aa",
        englisch: `<svg class="uk-flag-icon" viewBox="0 0 60 36" aria-hidden="true" focusable="false">
            <rect width="60" height="36" fill="#012169"/>
            <path d="M0 0l60 36M60 0L0 36" stroke="#fff" stroke-width="8"/>
            <path d="M0 0l60 36M60 0L0 36" stroke="#C8102E" stroke-width="4"/>
            <path d="M30 0v36M0 18h60" stroke="#fff" stroke-width="12"/>
            <path d="M30 0v36M0 18h60" stroke="#C8102E" stroke-width="7"/>
        </svg>`,
        musik: "&#9835;",
        kunst: "&#128511;",
        ernaehrung: "&#129365;"
    };
    return symbols[subjectId] || subject.icon;
}

function gradeLabel(grade) {
    if (!grade) return "Extra";
    return `${grade}. Klasse`;
}

function sortGradeKey(grade) {
    return grade || 99;
}

function renderTopicTree(target, subject, options = {}) {
    const mode = options.mode || "learn";
    const completed = options.completed || new Set();
    target.innerHTML = "";
    const byGrade = new Map();
    subject.topics.forEach((topic, index) => {
        const grade = topic.grade || 0;
        if (!byGrade.has(grade)) byGrade.set(grade, []);
        byGrade.get(grade).push({ topic, index });
    });

    [...byGrade.entries()].sort((a, b) => sortGradeKey(a[0]) - sortGradeKey(b[0])).forEach(([grade, entries]) => {
        const gradeBlock = document.createElement("section");
        gradeBlock.className = "tree-grade";
        gradeBlock.innerHTML = `<h3>${gradeLabel(grade)}</h3><div class="tree-lanes"></div>`;
        const lanes = gradeBlock.querySelector(".tree-lanes");

        const byStrand = new Map();
        entries.forEach(({ topic, index }) => {
            if (!byStrand.has(topic.strand)) byStrand.set(topic.strand, []);
            byStrand.get(topic.strand).push({ topic, index });
        });

        [...byStrand.entries()].forEach(([strand, strandEntries]) => {
            const branch = document.createElement("section");
            branch.className = "strand-branch";
            branch.style.setProperty("--accent", subject.accent);
            branch.innerHTML = `<div class="strand-label">${strand}</div><div class="strand-nodes"></div>`;
            const nodes = branch.querySelector(".strand-nodes");

            strandEntries.forEach(({ topic, index }) => {
                const available = Boolean(topic.available);
                const node = document.createElement("button");
                node.type = "button";
                node.style.setProperty("--accent", subject.accent);
                if (mode === "challenge") {
                    const done = completed.has(topic.id);
                    const unlocked = isTopicUnlocked(subject, topic, index, completed);
                    node.className = `tree-node skill-node ${done ? "done" : ""} ${unlocked ? "unlocked" : "locked"} ${available ? "" : "planned"}`;
                    node.disabled = !unlocked;
                    node.innerHTML = `<span class="node-kicker">${gradeLabel(topic.grade)}</span><strong>${topic.title}</strong><small>${done ? "abgeschlossen" : available ? unlocked ? "Kapitelquiz verf&uuml;gbar" : "gesperrt" : "geplant"}</small>`;
                    node.onclick = () => openTopic(topic.id, "challenge");
                } else {
                    node.className = `tree-node ${available ? "" : "planned"}`;
                    node.innerHTML = `<span class="node-kicker">${gradeLabel(topic.grade)}</span><strong>${topic.title}</strong><small>${available ? "Lerninhalt &ouml;ffnen" : "Thema geplant"}</small>`;
                    node.onclick = () => openTopic(topic.id, "learn");
                }
                nodes.appendChild(node);
            });

            lanes.appendChild(branch);
        });

        target.appendChild(gradeBlock);
    });
}

function renderLearningTree(subjectId) {
    renderTopicTree(document.getElementById("learning-tree"), APP.subjects[subjectId], { mode: "learn" });
}

function renderHome() {
    currentView = "home";
    showMainView();
    const mainView = document.getElementById("main-view");
    mainView.dataset.shellView = "home";
    mainView.innerHTML = `
        <section class="home-hero">
            <p class="eyebrow">Lernseite f&uuml;r die Mittelschule</p>
            <h1>${APP.appName}</h1>
            <p>W&auml;hle ein Fach, folge dem Themenbaum und lerne Kapitel f&uuml;r Kapitel. Auf der Startseite liest und &uuml;bst du ohne Punkte. In der Herausforderung beweist du dein K&ouml;nnen im Kapitelquiz.</p>
        </section>
        <section class="home-panel">
            <div class="section-heading">
                <h2>Unterrichtsfach w&auml;hlen</h2>
                <p>Jedes Fach hat seinen eigenen Lernbaum. Gleichrangige Themen stehen nebeneinander.</p>
            </div>
            <div id="subject-buttons" class="subject-grid" aria-label="Unterrichtsfaecher"></div>
            <div class="tree-header">
                <h2 id="tree-title"></h2>
                <button type="button" class="quiet-action" onclick="navigate('challenge', currentSubject)">Zur Herausforderung</button>
            </div>
            <div id="learning-tree" class="learning-tree"></div>
        </section>
    `;

    const selectSubject = subjectId => {
        currentSubject = subjectId;
        localStorage.setItem(SUBJECT_KEY, subjectId);
        document.getElementById("tree-title").textContent = `${APP.subjects[subjectId].label}: Themenbaum`;
        renderSubjectButtons("subject-buttons", currentSubject, selectSubject);
        renderLearningTree(currentSubject);
    };

    renderSubjectButtons("subject-buttons", currentSubject, selectSubject);
    document.getElementById("tree-title").textContent = `${APP.subjects[currentSubject].label}: Themenbaum`;
    renderLearningTree(currentSubject);
    resetMainViewScroll();
    updateTopNav();
}

function isTopicUnlocked(subject, topic, index, completed) {
    if (!topic.available) return false;
    if (topic.parents?.length) return topic.parents.every(parent => completed.has(parent));
    const earlierAvailable = subject.topics.slice(0, index).filter(item => item.available);
    if (!earlierAvailable.length) return true;
    return completed.has(earlierAvailable[earlierAvailable.length - 1].id);
}

function subjectProgress(subject, completed) {
    const available = subject.topics.filter(topic => topic.available);
    const done = available.filter(topic => completed.has(topic.id));
    const next = subject.topics.find((topic, index) => {
        return topic.available && !completed.has(topic.id) && isTopicUnlocked(subject, topic, index, completed);
    }) || available.find(topic => !completed.has(topic.id));

    return {
        done: done.length,
        total: available.length,
        percent: available.length ? Math.round((done.length / available.length) * 100) : 0,
        next
    };
}

function renderChallengeSubjects(target, completed) {
    target.innerHTML = "";
    getSubjects()
        .sort((a, b) => a[1].label.localeCompare(b[1].label, "de"))
        .forEach(([subjectId, subject]) => {
            const progress = subjectProgress(subject, completed);
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `challenge-subject-card ${subjectId === currentSubject ? "active" : ""}`;
            btn.style.setProperty("--accent", subject.accent);
            btn.dataset.subject = subjectId;
            btn.innerHTML = `
                <span class="challenge-subject-symbol">${subjectSymbol(subjectId, subject)}</span>
                <span class="challenge-subject-copy">
                    <strong>${subject.label}</strong>
                    <small>${progress.done}/${progress.total} Kapitel</small>
                </span>
                <span class="subject-progress" aria-hidden="true"><span style="width:${progress.percent}%"></span></span>
            `;
            btn.onclick = () => {
                currentSubject = subjectId;
                localStorage.setItem(SUBJECT_KEY, subjectId);
                renderChallenge();
            };
            target.appendChild(btn);
        });
}

function renderChallengeFocus(target, completed) {
    const subject = APP.subjects[currentSubject] || APP.subjects.physik;
    const progress = subjectProgress(subject, completed);
    const nextGoalText = progress.next
        ? ` &middot; N&auml;chstes Ziel: ${progress.next.title}`
        : " &middot; alles geschafft";
    target.innerHTML = `
        <section class="skill-branch skill-branch-focused" style="--accent:${subject.accent}">
            <header class="challenge-focus-header">
                <span class="challenge-subject-symbol">${subjectSymbol(currentSubject, subject)}</span>
                <div>
                    <p class="eyebrow">Aktueller Fach-Ast</p>
                    <h2>${subject.label}</h2>
                    <small>${progress.done}/${progress.total} Kapitel abgeschlossen${progress.next ? ` · N&auml;chstes Ziel: ${progress.next.title}` : " · alles geschafft"}</small>
                </div>
            </header>
            <div class="learning-tree challenge-tree"></div>
        </section>
    `;
    const focusMeta = target.querySelector(".challenge-focus-header small");
    if (focusMeta) focusMeta.innerHTML = `${progress.done}/${progress.total} Kapitel abgeschlossen${nextGoalText}`;
    renderTopicTree(target.querySelector(".challenge-tree"), subject, { mode: "challenge", completed });
}

function renderChallenge() {
    currentView = "challenge";
    showMainView();
    const completed = getCompletedTopics();
    const mainView = document.getElementById("main-view");
    mainView.dataset.shellView = "challenge";
    mainView.innerHTML = `
        <section class="challenge-hero">
            <p class="eyebrow">Herausforderung</p>
            <h1>Dein Fortschritt</h1>
            <p>Schlie&szlig;e Kapitelquizzes mit mindestens 75% ab. Dann erscheint das n&auml;chste Thema im Fach-Ast. Kapiteltests geben Plus-M&uuml;nzen; &Uuml;bungsfragen im Kapitel geben keine Punkte.</p>
            <div class="challenge-stats"><span><strong data-completed-count>${completed.size}</strong> Kapitel geschafft</span></div>
        </section>
        <section class="challenge-subject-panel">
            <div class="section-heading">
                <h2>Fach ausw&auml;hlen</h2>
                <p>W&auml;hle einen Fach-Ast. Darunter siehst du nur diesen Skilltree mit freigeschalteten, gesperrten und abgeschlossenen Kapiteln.</p>
            </div>
            <div class="challenge-subject-grid" id="challenge-subject-grid"></div>
        </section>
        <section class="challenge-map" id="challenge-map"></section>
    `;

    renderChallengeSubjects(document.getElementById("challenge-subject-grid"), completed);
    renderChallengeFocus(document.getElementById("challenge-map"), completed);
    updateShellStats();
    resetMainViewScroll();
    updateTopNav();
}

function renderCharacterPage() {
    currentView = "character";
    showMainView();
    const mainView = document.getElementById("main-view");
    if (typeof window.renderCharacterDesigner === "function") {
        window.renderCharacterDesigner(mainView);
    } else {
        mainView.dataset.shellView = "character";
        mainView.innerHTML = `<section class="character-hero"><h1>Charakterdesigner</h1><p>Der Charakterdesigner konnte nicht geladen werden.</p></section>`;
    }
    resetMainViewScroll();
    updateTopNav();
}

function renderCurrentView() {
    if (currentView === "challenge") renderChallenge();
    else if (currentView === "character") renderCharacterPage();
    else renderHome();
}

function updateTopNav() {
    document.querySelectorAll(".top-nav button[data-view]").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.view === currentView);
    });
}

window.addEventListener("message", event => {
    if (event.data?.type === "challengeCompleted") {
        updateShellStats();
        if (currentView === "challenge") renderChallenge();
    }
    if (event.data?.type === "coinsChanged") {
        updateShellStats();
    }
});

window.addEventListener("hashchange", () => {
    if (suppressNextHashRender) {
        suppressNextHashRender = false;
        return;
    }

    const hash = location.hash.slice(1);
    if (hash.startsWith("challenge:")) {
        currentView = "challenge";
        openTopic(hash.split(":")[1], "challenge");
    } else if (hash.startsWith("learn:")) {
        currentView = "home";
        openTopic(hash.split(":")[1], "learn");
    } else if (hash === "challenge") {
        currentView = "challenge";
        renderChallenge();
    } else if (hash === "character") {
        currentView = "character";
        renderCharacterPage();
    } else {
        currentView = "home";
        renderHome();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("app-title").textContent = APP.appName;
    setLanguage(localStorage.getItem("physik_lang") || "de");
    applyTheme(localStorage.getItem("physik_dark_mode") === "true");
    updateShellStats();

    const hash = location.hash.slice(1);
    if (hash.startsWith("challenge:")) {
        currentView = "challenge";
        openTopic(hash.split(":")[1], "challenge");
    } else if (hash.startsWith("learn:")) {
        currentView = "home";
        openTopic(hash.split(":")[1], "learn");
    } else if (hash === "challenge") {
        renderChallenge();
    } else if (hash === "character") {
        renderCharacterPage();
    } else {
        renderHome();
    }
});

document.addEventListener("click", event => {
    const menu = document.getElementById("language-menu");
    if (menu && !menu.contains(event.target)) closeLanguageMenu();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLanguageMenu();
});
