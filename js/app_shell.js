const APP = window.LEARNQUEST_CURRICULUM;
const SUBJECT_KEY = "wissenspfad_selected_subject";
const COINS_KEY = "learning_coins";
const COMPLETED_KEY = "challenge_completed_topics";
const SKILL_ZOOM_KEY = "challenge_skill_map_zoom";
const RADIAL_VIEWBOX = 3600;
const RADIAL_CENTER = RADIAL_VIEWBOX / 2;
const RADIAL_BASE_WIDTH = 2300;
const RADIAL_NODE_DIAMETERS = {
    subject: 48,
    entry: 40,
    branch: 34
};

let currentSubject = localStorage.getItem(SUBJECT_KEY) || "physik";
let currentView = "home";
let suppressNextHashRender = false;
let currentFrameMode = "learn";
let skillMapZoom = Number(localStorage.getItem(SKILL_ZOOM_KEY) || 0.82);
let activeSkillWheelTarget = null;

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

function topicSkillState(subject, topic, completed) {
    const index = subject.topics.indexOf(topic);
    const done = completed.has(topic.id);
    const available = Boolean(topic.available);
    const unlocked = available && isTopicUnlocked(subject, topic, index, completed);
    return {
        done,
        available,
        unlocked,
        status: done ? "done" : !available ? "planned" : unlocked ? "unlocked" : "locked",
        label: done ? "abgeschlossen" : !available ? "geplant" : unlocked ? "Kapitelquiz" : "gesperrt"
    };
}

function firstLearningGrade(subject) {
    const grades = subject.topics
        .map(topic => topic.grade || 0)
        .filter(grade => grade > 0);
    return grades.length ? Math.min(...grades) : 0;
}

function entryTopic(subject) {
    const firstGrade = firstLearningGrade(subject);
    return subject.topics.find(topic => (topic.grade || 0) === firstGrade) || subject.topics[0];
}

function firstThemeTopics(subject, entry) {
    const firstGrade = firstLearningGrade(subject);
    const byStrand = new Map();
    subject.topics
        .filter(topic => (topic.grade || 0) === firstGrade && topic.id !== entry?.id)
        .forEach(topic => {
            if (!byStrand.has(topic.strand)) byStrand.set(topic.strand, topic);
        });
    return [...byStrand.values()];
}

function radialPoint(radius, angleDeg) {
    const angle = (Math.PI / 180) * angleDeg;
    return {
        x: RADIAL_CENTER + Math.cos(angle) * radius,
        y: RADIAL_CENTER + Math.sin(angle) * radius
    };
}

function radialStyle(point) {
    return `left:calc(${(point.x / RADIAL_VIEWBOX) * 100}% - var(--node-size) / 2);top:calc(${(point.y / RADIAL_VIEWBOX) * 100}% - var(--node-size) / 2)`;
}

function radialNodeKind(depth) {
    return depth === "subject" || depth === "entry" ? depth : "branch";
}

function skillOrbScale() {
    return Math.max(0.84, Math.min(1.08, 0.78 + skillMapZoom * 0.2));
}

function radialNodeRadius(kind) {
    return (RADIAL_NODE_DIAMETERS[radialNodeKind(kind)] || RADIAL_NODE_DIAMETERS.branch) * skillOrbScale() / 2 + 3;
}

function radialPixelsToViewbox(px) {
    return (px / Math.max(1, RADIAL_BASE_WIDTH * skillMapZoom)) * RADIAL_VIEWBOX;
}

function radialLinePath(from, to, fromKind, toKind) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (!distance) return `M${from.x} ${from.y}`;
    const startInset = radialPixelsToViewbox(radialNodeRadius(fromKind));
    const endInset = radialPixelsToViewbox(radialNodeRadius(toKind));
    const start = Math.min(startInset, distance / 2);
    const end = Math.min(endInset, distance / 2);
    const ux = dx / distance;
    const uy = dy / distance;
    return [
        `M${from.x + ux * start}`,
        `${from.y + uy * start}`,
        `L${to.x - ux * end}`,
        `${to.y - uy * end}`
    ].join(" ");
}

function radialLineElement(from, to, fromKind, toKind, className = "") {
    return `<path class="radial-link ${className}"
        data-x1="${from.x}" data-y1="${from.y}" data-x2="${to.x}" data-y2="${to.y}"
        data-from-kind="${radialNodeKind(fromKind)}" data-to-kind="${radialNodeKind(toKind)}"
        d="${radialLinePath(from, to, fromKind, toKind)}" />`;
}

function updateRadialLinkGeometry(map) {
    (map || document).querySelectorAll(".radial-link").forEach(line => {
        const from = { x: Number(line.dataset.x1), y: Number(line.dataset.y1) };
        const to = { x: Number(line.dataset.x2), y: Number(line.dataset.y2) };
        line.setAttribute("d", radialLinePath(from, to, line.dataset.fromKind, line.dataset.toKind));
    });
}

function clampSkillZoom(value) {
    return Math.max(0.55, Math.min(1.55, Number(value) || 0.82));
}

function applySkillMapZoom() {
    skillMapZoom = clampSkillZoom(skillMapZoom);
    const map = document.querySelector(".radial-skill-map");
    const value = Math.round(RADIAL_BASE_WIDTH * skillMapZoom);
    if (map) {
        map.style.width = `${value}px`;
        map.style.setProperty("--orb-scale", skillOrbScale().toFixed(3));
        updateRadialLinkGeometry(map);
    }
    document.querySelectorAll("[data-skill-zoom-label]").forEach(el => {
        el.textContent = `${Math.round(skillMapZoom * 100)}%`;
    });
}

function setSkillMapZoom(value) {
    skillMapZoom = clampSkillZoom(value);
    localStorage.setItem(SKILL_ZOOM_KEY, String(skillMapZoom));
    applySkillMapZoom();
}

function zoomSkillMap(delta) {
    setSkillMapZoom(skillMapZoom + delta);
}

function resetSkillMapZoom() {
    setSkillMapZoom(0.82);
}

function centerSkillMap(target) {
    const scroll = target.querySelector(".radial-skill-scroll");
    if (!scroll) return;
    window.requestAnimationFrame(() => {
        scroll.scrollLeft = Math.max(0, (scroll.scrollWidth - scroll.clientWidth) / 2);
        scroll.scrollTop = Math.max(0, (scroll.scrollHeight - scroll.clientHeight) / 2);
    });
}

function bindSkillMapWheelZoom(target) {
    const scroll = target.querySelector(".radial-skill-scroll");
    if (!scroll) return;
    let dragStart = null;

    scroll.addEventListener("pointerdown", () => {
        activeSkillWheelTarget = scroll;
        scroll.focus({ preventScroll: true });
    });
    scroll.addEventListener("focus", () => {
        activeSkillWheelTarget = scroll;
    });
    scroll.addEventListener("blur", () => {
        if (activeSkillWheelTarget === scroll) activeSkillWheelTarget = null;
    });
    scroll.addEventListener("wheel", event => {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            window.scrollBy({
                left: event.deltaX,
                top: event.deltaY,
                behavior: "auto"
            });
            return;
        }
        if (activeSkillWheelTarget !== scroll && document.activeElement !== scroll) return;
        event.preventDefault();
        const ratioX = (scroll.scrollLeft + scroll.clientWidth / 2) / Math.max(1, scroll.scrollWidth);
        const ratioY = (scroll.scrollTop + scroll.clientHeight / 2) / Math.max(1, scroll.scrollHeight);
        const direction = event.deltaY > 0 ? -1 : 1;
        setSkillMapZoom(skillMapZoom + direction * 0.08);
        window.requestAnimationFrame(() => {
            scroll.scrollLeft = scroll.scrollWidth * ratioX - scroll.clientWidth / 2;
            scroll.scrollTop = scroll.scrollHeight * ratioY - scroll.clientHeight / 2;
        });
    }, { passive: false });

    document.addEventListener("pointerdown", event => {
        if (!scroll.contains(event.target) && activeSkillWheelTarget === scroll) {
            activeSkillWheelTarget = null;
        }
    }, { capture: true });

    scroll.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;
        dragStart = {
            x: event.clientX,
            y: event.clientY,
            left: scroll.scrollLeft,
            top: scroll.scrollTop,
            moved: false
        };
        scroll.dataset.suppressClick = "";
        scroll.setPointerCapture?.(event.pointerId);
    });

    scroll.addEventListener("pointermove", event => {
        if (!dragStart) return;
        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;
        if (Math.abs(dx) + Math.abs(dy) > 5) {
            dragStart.moved = true;
            scroll.classList.add("is-dragging");
        }
        if (!dragStart.moved) return;
        event.preventDefault();
        scroll.scrollLeft = dragStart.left - dx * 0.72;
        scroll.scrollTop = dragStart.top - dy * 0.72;
    });

    const finishDrag = event => {
        if (!dragStart) return;
        if (dragStart.moved) {
            scroll.dataset.suppressClick = "true";
            window.setTimeout(() => {
                if (scroll.dataset.suppressClick === "true") scroll.dataset.suppressClick = "";
            }, 0);
        }
        scroll.classList.remove("is-dragging");
        try {
            scroll.releasePointerCapture?.(event.pointerId);
        } catch (error) {
            // The pointer can already be released when the browser cancels a drag.
        }
        dragStart = null;
    };

    scroll.addEventListener("pointerup", finishDrag);
    scroll.addEventListener("pointercancel", finishDrag);

    scroll.addEventListener("keydown", event => {
        if (event.key === "+" || event.key === "=") {
            event.preventDefault();
            zoomSkillMap(0.08);
        }
        if (event.key === "-") {
            event.preventDefault();
            zoomSkillMap(-0.08);
        }
        if (event.key === "0") {
            event.preventDefault();
            resetSkillMapZoom();
        }
    });
}

function visibleRadialTopics(subject, entry, completed) {
    const visible = new Set();
    if (entry) visible.add(entry.id);
    firstThemeTopics(subject, entry).forEach(topic => visible.add(topic.id));

    const topics = subject.topics.filter(topic => topic.id !== entry?.id);
    const firstUnsolvedIndex = topics.findIndex(topic => topic.available && !completed.has(topic.id));
    topics.forEach((topic, index) => {
        if (completed.has(topic.id)) visible.add(topic.id);
        if (firstUnsolvedIndex >= 0 && index <= firstUnsolvedIndex + 2) visible.add(topic.id);
    });
    return visible;
}

function radialTopicNode(subjectId, subject, topic, point, state, depth) {
    const disabled = !state.unlocked && !state.done ? "disabled" : "";
    const active = subjectId === currentSubject ? "active-subject" : "";
    const future = state.future ? "future-hidden" : "";
    const fade = state.fade ? `fade-${state.fade}` : "";
    const label = `${topic.title}: ${state.label}`;
    return `
        <button type="button" class="radial-node radial-topic-node ${depth} ${state.status} ${active} ${future} ${fade}"
            style="--accent:${subject.accent};${radialStyle(point)}"
            title="${topic.title}"
            aria-label="${label}"
            data-radial-topic="${topic.id}" ${disabled}>
            <span class="radial-node-dot" aria-hidden="true"></span>
            <span class="radial-tooltip" aria-hidden="true">
                <span>${depth === "entry" ? "Einstieg" : topic.strand}</span>
                <strong>${topic.title}</strong>
                <small>${state.label}</small>
            </span>
        </button>
    `;
}

function renderCircularSkillMap(target, completed) {
    const subjects = getSubjects().sort((a, b) => a[1].label.localeCompare(b[1].label, "de"));
    const lines = [];
    const nodes = [];
    const orbitRadii = new Set([320, 660]);
    const step = 360 / subjects.length;

    subjects.forEach(([subjectId, subject], subjectIndex) => {
        const angle = -90 + subjectIndex * step;
        const subjectPoint = radialPoint(320, angle);
        const entryPoint = radialPoint(660, angle);
        const entry = entryTopic(subject);
        const roadmapTotal = subject.topics.length;
        const roadmapDone = subject.topics.filter(topic => completed.has(topic.id)).length;

        nodes.push(`
            <button type="button" class="radial-node radial-subject-word ${subjectId === currentSubject ? "active" : ""}"
                style="--accent:${subject.accent};${radialStyle(subjectPoint)}"
                aria-label="${subject.label}: ${roadmapDone} von ${roadmapTotal} Kapiteln abgeschlossen"
                data-radial-subject="${subjectId}">
                <span class="radial-node-dot" aria-hidden="true">${subject.icon}</span>
                <span class="radial-tooltip" aria-hidden="true">
                    <strong>${subject.label}</strong>
                    <small>${roadmapDone}/${roadmapTotal}</small>
                </span>
            </button>
        `);

        if (!entry) return;
        const entryState = topicSkillState(subject, entry, completed);
        lines.push(radialLineElement(subjectPoint, entryPoint, "subject", "entry", entryState.status));
        nodes.push(radialTopicNode(subjectId, subject, entry, entryPoint, entryState, "entry"));

        if (subjectId === currentSubject) {
            const childTopics = subject.topics.filter(topic => topic.id !== entry.id);
            const visibleTopics = visibleRadialTopics(subject, entry, completed);
            const slots = Math.max(5, Math.min(7, Math.ceil(Math.sqrt(childTopics.length || 1))));
            const spread = Math.min(step * 3.35, 116);
            childTopics.forEach((topic, topicIndex) => {
                const ring = Math.floor(topicIndex / slots);
                const slot = topicIndex % slots;
                const slotStep = spread / (slots - 1);
                const rawOffset = -spread / 2 + slotStep * slot;
                const offset = Math.abs(rawOffset) < 1 ? slotStep / 2 : rawOffset;
                const childAngle = angle + offset;
                const childRadius = 1020 + ring * 126;
                orbitRadii.add(childRadius);
                const childPoint = radialPoint(childRadius, childAngle);
                const state = topicSkillState(subject, topic, completed);
                const visible = visibleTopics.has(topic.id);
                state.future = !visible;
                state.fade = visible && !state.done && !state.unlocked ? Math.min(3, ring + 1) : 0;
                const lineFade = state.future ? "future-hidden" : state.fade ? `fade-${state.fade}` : "";
                lines.push(radialLineElement(entryPoint, childPoint, "entry", "branch", `${state.status} ${lineFade}`));
                nodes.push(radialTopicNode(subjectId, subject, topic, childPoint, state, "branch"));
            });
        }
    });

    const orbitCircles = [...orbitRadii]
        .sort((a, b) => a - b)
        .map(radius => `<circle class="radial-orbit" cx="${RADIAL_CENTER}" cy="${RADIAL_CENTER}" r="${radius}" />`)
        .join("");

    target.innerHTML = `
        <div class="radial-skill-scroll" tabindex="0" aria-label="Kreisfoermiger Skillbaum">
            <div class="radial-skill-map" style="width:${Math.round(RADIAL_BASE_WIDTH * skillMapZoom)}px">
                <svg class="radial-links" viewBox="0 0 ${RADIAL_VIEWBOX} ${RADIAL_VIEWBOX}" aria-hidden="true" focusable="false">
                    ${orbitCircles}
                    ${lines.join("")}
                </svg>
                ${nodes.join("")}
            </div>
        </div>
        <div class="radial-legend">
            <span><i class="legend-dot unlocked"></i> verf&uuml;gbar</span>
            <span><i class="legend-dot locked"></i> gesperrt</span>
            <span><i class="legend-dot done"></i> abgeschlossen</span>
            <span><i class="legend-dot planned"></i> geplant</span>
            <span><i class="legend-dot future"></i> Zukunft</span>
        </div>
    `;
    applySkillMapZoom();
    bindSkillMapWheelZoom(target);
    centerSkillMap(target);

    target.querySelectorAll(".radial-node").forEach(button => {
        button.addEventListener("pointerenter", () => button.classList.add("show-tooltip"));
        button.addEventListener("pointerleave", () => button.classList.remove("show-tooltip"));
        button.addEventListener("focus", () => button.classList.add("show-tooltip"));
        button.addEventListener("blur", () => button.classList.remove("show-tooltip"));
    });

    target.querySelectorAll("[data-radial-subject]").forEach(button => {
        button.addEventListener("click", event => {
            if (event.currentTarget.closest(".radial-skill-scroll")?.dataset.suppressClick === "true") return;
            currentSubject = button.dataset.radialSubject;
            localStorage.setItem(SUBJECT_KEY, currentSubject);
            renderChallenge();
        });
    });

    target.querySelectorAll("[data-radial-topic]").forEach(button => {
        button.addEventListener("click", event => {
            if (event.currentTarget.closest(".radial-skill-scroll")?.dataset.suppressClick === "true") return;
            openTopic(button.dataset.radialTopic, "challenge");
        });
    });
}

function renderChallenge() {
    currentView = "challenge";
    showMainView();
    const completed = getCompletedTopics();
    const mainView = document.getElementById("main-view");
    mainView.dataset.shellView = "challenge";
    mainView.innerHTML = `
        <div class="challenge-compact-stats"><span><strong data-completed-count>${completed.size}</strong> Kapitel geschafft</span></div>
        <section class="challenge-map" id="challenge-map"></section>
    `;

    renderCircularSkillMap(document.getElementById("challenge-map"), completed);
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
