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
    const nextHash = view === "challenge" ? "challenge" : "start";
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
        mathematik: "&sum;",
        chemie: "&#9879;",
        dgb: "&lt;/&gt;",
        geographie: "&#9711;",
        biologie: "DNA",
        deutsch: "Aa",
        englisch: "EN",
        musik: "&#9835;",
        kunst: "&#9673;",
        ernaehrung: "&#8962;"
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

function renderLearningTree(subjectId) {
    const subject = APP.subjects[subjectId];
    const tree = document.getElementById("learning-tree");
    tree.innerHTML = "";

    const byGrade = new Map();
    subject.topics.forEach(topic => {
        const grade = topic.grade || 0;
        if (!byGrade.has(grade)) byGrade.set(grade, []);
        byGrade.get(grade).push(topic);
    });

    [...byGrade.entries()].sort((a, b) => sortGradeKey(a[0]) - sortGradeKey(b[0])).forEach(([grade, topics]) => {
        const gradeBlock = document.createElement("section");
        gradeBlock.className = "tree-grade";
        gradeBlock.innerHTML = `<h3>${gradeLabel(grade)}</h3><div class="tree-lanes"></div>`;
        const lanes = gradeBlock.querySelector(".tree-lanes");

        const byStrand = new Map();
        topics.forEach(topic => {
            if (!byStrand.has(topic.strand)) byStrand.set(topic.strand, []);
            byStrand.get(topic.strand).push(topic);
        });

        [...byStrand.entries()].forEach(([strand, strandTopics]) => {
            const branch = document.createElement("section");
            branch.className = "strand-branch";
            branch.style.setProperty("--accent", subject.accent);
            branch.innerHTML = `<div class="strand-label">${strand}</div><div class="strand-nodes"></div>`;
            const nodes = branch.querySelector(".strand-nodes");

            strandTopics.forEach(topic => {
                const node = document.createElement("button");
                node.type = "button";
                node.className = `tree-node ${topic.available ? "" : "planned"}`;
                node.style.setProperty("--accent", subject.accent);
                node.innerHTML = `<span class="node-kicker">${gradeLabel(topic.grade)}</span><strong>${topic.title}</strong><small>${topic.available ? "Lerninhalt &ouml;ffnen" : "Thema geplant"}</small>`;
                node.onclick = () => openTopic(topic.id, "learn");
                nodes.appendChild(node);
            });

            lanes.appendChild(branch);
        });

        tree.appendChild(gradeBlock);
    });
}

function renderHome() {
    currentView = "home";
    showMainView();
    document.getElementById("main-view").innerHTML = `
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
    updateTopNav();
}

function isTopicUnlocked(subject, topic, index, completed) {
    if (!topic.available) return false;
    if (topic.parents?.length) return topic.parents.every(parent => completed.has(parent));
    const earlierAvailable = subject.topics.slice(0, index).filter(item => item.available);
    if (!earlierAvailable.length) return true;
    return completed.has(earlierAvailable[earlierAvailable.length - 1].id);
}

function renderChallenge() {
    currentView = "challenge";
    showMainView();
    const completed = getCompletedTopics();
    document.getElementById("main-view").innerHTML = `
        <section class="challenge-hero">
            <p class="eyebrow">Herausforderung</p>
            <h1>Skillbaum statt Zeugnis</h1>
            <p>Schlie&szlig;e Kapitelquizzes mit mindestens 75% ab. Dann erscheint das n&auml;chste Thema im Fach-Ast. Kapiteltests geben Plus-M&uuml;nzen; &Uuml;bungsfragen im Kapitel geben keine Punkte.</p>
            <div class="challenge-stats"><span><strong data-completed-count>${completed.size}</strong> Kapitel geschafft</span></div>
        </section>
        <section class="challenge-map" id="challenge-map"></section>
    `;

    const map = document.getElementById("challenge-map");
    getSubjects().forEach(([subjectId, subject]) => {
        const branch = document.createElement("section");
        branch.className = "skill-branch";
        branch.style.setProperty("--accent", subject.accent);
        branch.innerHTML = `<header><span>${subject.icon}</span><h2>${subject.label}</h2></header><div class="skill-track"></div>`;
        const track = branch.querySelector(".skill-track");
        subject.topics.forEach((topic, index) => {
            const unlocked = isTopicUnlocked(subject, topic, index, completed);
            const done = completed.has(topic.id);
            const node = document.createElement("button");
            node.type = "button";
            node.className = `skill-node ${done ? "done" : ""} ${unlocked ? "unlocked" : "locked"} ${topic.available ? "" : "planned"}`;
            node.disabled = !unlocked;
            node.innerHTML = `<span class="node-kicker">${gradeLabel(topic.grade)} - ${topic.strand}</span><strong>${topic.title}</strong><small>${done ? "abgeschlossen" : topic.available ? unlocked ? "Kapitelquiz verf&uuml;gbar" : "gesperrt" : "geplant"}</small>`;
            node.onclick = () => openTopic(topic.id, "challenge");
            track.appendChild(node);
        });
        map.appendChild(branch);
    });
    updateShellStats();
    updateTopNav();
}

function renderCurrentView() {
    if (currentView === "challenge") renderChallenge();
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
