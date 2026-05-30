const SSP_STORAGE_KEY = "sciverse_space_program";
const SSP_SCORE_KEY = "physik_score";

const ROCKET_MODELS = [
    {
        id: "sparrow",
        name: "Spatz I",
        tagline: "Leicht, wendig, gut für erste Starts.",
        color: "#38bdf8",
        accent: "#fbbf24",
        stats: { thrust: 7, fuel: 6, control: 8, science: 3, hull: 4 }
    },
    {
        id: "atlas",
        name: "Atlas Schulrakete",
        tagline: "Ausgewogenes Trainingsmodell für lange Missionen.",
        color: "#34d399",
        accent: "#60a5fa",
        stats: { thrust: 6, fuel: 7, control: 6, science: 5, hull: 6 }
    },
    {
        id: "mammut",
        name: "Mammut Booster",
        tagline: "Schwerer, kräftiger, braucht ruhige Steuerung.",
        color: "#fb7185",
        accent: "#f97316",
        stats: { thrust: 9, fuel: 8, control: 4, science: 2, hull: 8 }
    }
];

const SUBJECT_BONUSES = {
    physik: { label: "Physik", unlock: "Antriebe, Stabilisatoren, Hitzeschutz", effect: "Mehr Schub und bessere Landungen." },
    mathematik: { label: "Mathematik", unlock: "Steuercomputer, Effizienz-Software", effect: "Feinere Drehung und weniger Treibstoffverbrauch." },
    chemie: { label: "Chemie", unlock: "Treibstoffe, Tanks, neue Werkstoffe", effect: "Mehr Energie im Tank und robustere Bauteile." },
    biologie: { label: "Biologie", unlock: "Science-Module, Probenbehälter, Lebenserhaltung", effect: "Mehr Forschungspunkte in Missionen." },
    dgb: { label: "Digitale Grundbildung", unlock: "Autopilot, Sensorik, Telemetrie", effect: "Bessere Anzeigen und stabilere Steuerung." },
    geographie: { label: "Geographie", unlock: "Karten, Zielsysteme, Planetendaten", effect: "Neue Ziele im Sonnensystem." },
    deutsch: { label: "Deutsch", unlock: "Missionslogbuch, Funktexte", effect: "Klarere Aufträge und Logbuch-Stil." },
    englisch: { label: "Englisch", unlock: "Mission radio, crew calls", effect: "Internationale Raumfahrt-Kommunikation." },
    musik: { label: "Musik", unlock: "Lernmusik und Cockpit-Sounds", effect: "Neue Hintergrundmusik für die Seite." },
    kunst: { label: "Kunst", unlock: "Lackierungen, Embleme, Cockpit-Design", effect: "Optische Anpassungen für deine Rakete." },
    ernaehrung: { label: "Ernährung & Haushalt", unlock: "Vorratsmodule, Wasserrecycling", effect: "Längere Crew-Missionen." }
};

const PARTS = [
    { id: "nose_basic", slot: "nose", name: "Schul-Nase", subject: "start", cost: 0, stats: { control: 1 }, desc: "Basis-Spitze für sichere Trainingsflüge." },
    { id: "body_basic", slot: "body", name: "Standard-Rumpf", subject: "start", cost: 0, stats: { fuel: 1, hull: 1 }, desc: "Solider Rumpf mit kleinem Tank." },
    { id: "engine_basic", slot: "engine", name: "Kerzenmotor", subject: "start", cost: 0, stats: { thrust: 1 }, desc: "Langsam, aber zuverlässig." },
    { id: "fin_basic", slot: "fin", name: "Kartonflossen", subject: "start", cost: 0, stats: { control: 1 }, desc: "Stabilisiert den Start." },
    { id: "science_empty", slot: "science", name: "Leerer Experimentplatz", subject: "start", cost: 0, stats: {}, desc: "Hier passt später Forschung hinein." },
    { id: "utility_basic", slot: "utility", name: "Bordlampe", subject: "start", cost: 0, stats: { hull: 1 }, desc: "Kleine Hilfe für Nachtstarts." },
    { id: "paint_school", slot: "paint", name: "SciVerse-Lack", subject: "start", cost: 0, stats: {}, color: "#38bdf8", accent: "#fbbf24", desc: "Der Standardlook deiner Schulrakete." },

    { id: "engine_vector", slot: "engine", name: "Newton-Vektortriebwerk", subject: "physik", req: 1, cost: 45, stats: { thrust: 3, control: 1 }, desc: "Mehr Schub und sichtbare Kraft-Richtung." },
    { id: "fin_gyro", slot: "fin", name: "Kreisel-Stabilisator", subject: "physik", req: 2, cost: 55, stats: { control: 3, hull: 1 }, desc: "Hilft beim Drehen und Abfangen." },
    { id: "shield_heat", slot: "utility", name: "Wärmelehre-Hitzeschild", subject: "physik", req: 3, cost: 70, stats: { hull: 4 }, desc: "Schützt beim Wiedereintritt und harten Landungen." },
    { id: "solar_panel", slot: "utility", name: "Optik-Solarpaneel", subject: "physik", req: 4, cost: 80, stats: { science: 1, fuel: 1 }, desc: "Licht wird zu Energie." },

    { id: "math_nav", slot: "nose", name: "Mathe-Steuercomputer", subject: "mathematik", req: 1, cost: 45, stats: { control: 4 }, desc: "Rechnet Flugwinkel sauberer." },
    { id: "math_optimizer", slot: "utility", name: "Effizienz-Rechner", subject: "mathematik", req: 3, cost: 75, stats: { fuel: 2, control: 2 }, desc: "Verbraucht weniger Treibstoff bei ruhiger Steuerung." },
    { id: "math_grid_paint", slot: "paint", name: "Koordinaten-Lack", subject: "mathematik", req: 5, cost: 55, stats: {}, color: "#2563eb", accent: "#f8fafc", desc: "Schicker Mathe-Look mit Gitterlinien." },

    { id: "chem_fuel", slot: "body", name: "Chemie-Hochenergietank", subject: "chemie", req: 1, cost: 50, stats: { fuel: 4, thrust: 1 }, desc: "Mehr Energie durch besseren Treibstoff." },
    { id: "chem_alloy", slot: "body", name: "Leichtmetall-Rumpf", subject: "chemie", req: 3, cost: 80, stats: { hull: 3, fuel: 2 }, desc: "Stabil und leichter als der Standardrumpf." },
    { id: "chem_crystal", slot: "nose", name: "Kristall-Sensor", subject: "chemie", req: 5, cost: 95, stats: { science: 2, control: 2 }, desc: "Erkennt Stoffproben im Orbit." },

    { id: "bio_probe", slot: "science", name: "Bio-Probenkapsel", subject: "biologie", req: 1, cost: 45, stats: { science: 4 }, desc: "Sammelt Sporen, Wasserproben und Mikrospuren." },
    { id: "bio_greenhouse", slot: "science", name: "Mini-Gewächshaus", subject: "biologie", req: 2, cost: 65, stats: { science: 5, hull: 1 }, desc: "Teste Pflanzen im Weltraum." },

    { id: "dgb_autopilot", slot: "nose", name: "DGB-Autopilot", subject: "dgb", req: 2, cost: 60, stats: { control: 5 }, desc: "Macht die Steuerung weicher." },
    { id: "geo_mapper", slot: "science", name: "Geo-Kartenkamera", subject: "geographie", req: 1, cost: 50, stats: { science: 3, control: 1 }, desc: "Scannt Oberflächen und Umlaufbahnen." },
    { id: "music_radio", slot: "utility", name: "Musik-Cockpitradio", subject: "musik", req: 1, cost: 35, stats: { control: 1 }, desc: "Schaltet Lernmusik frei und beruhigt den Flug." },
    { id: "art_paint", slot: "paint", name: "Kunst-Galaxie-Lack", subject: "kunst", req: 1, cost: 40, stats: {}, color: "#a855f7", accent: "#fb7185", desc: "Eine Rakete, die aussieht wie ein Sternennebel." },
    { id: "english_radio", slot: "utility", name: "English Mission Radio", subject: "englisch", req: 1, cost: 35, stats: { science: 1 }, desc: "Internationale Funksprüche für Mission Control." },
    { id: "de_logbook", slot: "science", name: "Deutsch-Logbuch", subject: "deutsch", req: 1, cost: 35, stats: { science: 2 }, desc: "Bessere Missionsberichte, klarere Beobachtungen." },
    { id: "eh_life_support", slot: "body", name: "Vorrats- und Wasserrecycling", subject: "ernaehrung", req: 1, cost: 55, stats: { fuel: 1, hull: 3 }, desc: "Für lange bemannte Missionen gedacht." }
];

const SLOTS = [
    { id: "nose", label: "Spitze" },
    { id: "body", label: "Rumpf/Tank" },
    { id: "engine", label: "Triebwerk" },
    { id: "fin", label: "Stabilisierung" },
    { id: "science", label: "Forschung" },
    { id: "utility", label: "Nutzlast" },
    { id: "paint", label: "Design" }
];

const MISSIONS = [
    { id: "hop", name: "Trainingssprung", targetAlt: 220, targetSpeed: 5.2, reward: "Erste Startkontrolle", desc: "Steige auf 220 m, sammle ein Science-Symbol und lande weich." },
    { id: "suborbit", name: "Suborbitalflug", targetAlt: 520, targetSpeed: 6.3, reward: "Atmosphären-Daten", desc: "Fliege höher als die Wolken und bringe die Daten zurück." },
    { id: "orbit", name: "Niedriger Orbit", targetAlt: 900, targetSpeed: 7.6, reward: "Orbit-Badge", desc: "Erreiche genug Höhe und seitliche Geschwindigkeit für einen stabilen Orbit." },
    { id: "moon", name: "Mond-Vorbeiflug", targetAlt: 1250, targetSpeed: 8.6, reward: "Mondkarte", desc: "Schaffe eine weite Flugbahn und halte die Rakete kontrollierbar." }
];

const DEFAULT_STATE = {
    model: null,
    owned: ["nose_basic", "body_basic", "engine_basic", "fin_basic", "science_empty", "utility_basic", "paint_school"],
    equipped: {
        nose: "nose_basic",
        body: "body_basic",
        engine: "engine_basic",
        fin: "fin_basic",
        science: "science_empty",
        utility: "utility_basic",
        paint: "paint_school"
    },
    selectedSlot: "engine",
    shopFilter: "all",
    selectedMission: "hop",
    missionLog: {}
};

let programState = loadProgramState();
let flightState = null;
let controls = { thrust: false, left: false, right: false };
let animationId = null;
let lastFrameTime = 0;

document.addEventListener("DOMContentLoaded", initSpaceProgram);

window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "themeChange") {
        document.documentElement.toggleAttribute("data-theme", Boolean(event.data.isDark));
    }
});

function initSpaceProgram() {
    if (localStorage.getItem("physik_dark_mode") === "true") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    document.getElementById("changeModelBtn").addEventListener("click", () => {
        document.getElementById("spaceGame").hidden = true;
        document.getElementById("rocketSelect").hidden = false;
        renderModelCards();
    });

    document.querySelectorAll(".space-tab").forEach(button => {
        button.addEventListener("click", () => setTab(button.dataset.tab));
    });

    document.getElementById("missionSelect").addEventListener("change", (event) => {
        programState.selectedMission = event.target.value;
        saveProgramState();
        resetFlight();
        renderMission();
    });

    document.getElementById("btnIgnite").addEventListener("click", igniteFlight);
    document.getElementById("btnPause").addEventListener("click", togglePause);
    document.getElementById("btnResetFlight").addEventListener("click", resetFlight);
    setupControls();

    renderModelCards();
    if (programState.model) {
        document.getElementById("rocketSelect").hidden = true;
        document.getElementById("spaceGame").hidden = false;
        renderEverything();
        startAnimationLoop();
    }
}

function loadProgramState() {
    try {
        const saved = JSON.parse(localStorage.getItem(SSP_STORAGE_KEY) || "{}");
        return {
            ...DEFAULT_STATE,
            ...saved,
            owned: Array.from(new Set([...(DEFAULT_STATE.owned || []), ...((saved && saved.owned) || [])])),
            equipped: { ...DEFAULT_STATE.equipped, ...((saved && saved.equipped) || {}) },
            missionLog: { ...DEFAULT_STATE.missionLog, ...((saved && saved.missionLog) || {}) }
        };
    } catch (error) {
        return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
}

function saveProgramState() {
    localStorage.setItem(SSP_STORAGE_KEY, JSON.stringify(programState));
}

function getPoints() {
    return Number(localStorage.getItem(SSP_SCORE_KEY) || 0);
}

function setPoints(value) {
    const next = Math.max(0, Math.round(value));
    localStorage.setItem(SSP_SCORE_KEY, String(next));
    const points = document.getElementById("sspPoints");
    if (points) points.textContent = next;
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "updateScore", score: next }, "*");
    }
}

function getCurriculum() {
    return (window.parent && window.parent.SCIVERSE_CURRICULUM) || window.SCIVERSE_CURRICULUM || {};
}

function getSubjectProgress() {
    const curriculum = getCurriculum();
    let chapterResults = {};
    let topicScores = {};
    try { chapterResults = JSON.parse(localStorage.getItem("sciverse_chapter_quiz_results") || "{}"); } catch (error) {}
    try { topicScores = JSON.parse(localStorage.getItem("physik_topic_scores") || "{}"); } catch (error) {}

    const progress = {};
    for (const [subject, data] of Object.entries(curriculum)) {
        const topics = (data.topics || []).filter(topic => topic && topic.available !== false);
        const completed = topics.filter(topic => {
            const quiz = chapterResults[topic.id];
            return Boolean(quiz && quiz.passed) || Number(topicScores[topic.id] || 0) > 70;
        }).length;
        progress[subject] = { completed, total: topics.length };
    }
    return progress;
}

function renderModelCards() {
    const grid = document.getElementById("rocketModelCards");
    grid.innerHTML = ROCKET_MODELS.map(model => `
        <button type="button" class="model-card" data-model="${model.id}">
            <div class="model-rocket">${rocketSvg({ model, compact: true })}</div>
            <p class="space-kicker">Startmodell</p>
            <h3>${escapeHtml(model.name)}</h3>
            <p>${escapeHtml(model.tagline)}</p>
            <div class="model-stat-list">
                <span>Schub ${model.stats.thrust}</span>
                <span>Treibstoff ${model.stats.fuel}</span>
                <span>Steuerung ${model.stats.control}</span>
            </div>
        </button>
    `).join("");
    grid.querySelectorAll(".model-card").forEach(card => {
        card.addEventListener("click", () => chooseModel(card.dataset.model));
    });
}

function chooseModel(modelId) {
    programState.model = modelId;
    saveProgramState();
    document.getElementById("rocketSelect").hidden = true;
    document.getElementById("spaceGame").hidden = false;
    renderEverything();
    resetFlight();
    startAnimationLoop();
}

function renderEverything() {
    document.getElementById("sspPoints").textContent = getPoints();
    renderMissionOptions();
    renderMission();
    renderRocketPanels();
    renderUnlockSummary();
    renderWorkshop();
    renderShop();
    renderSolarMap();
    renderSubjectBonuses();
    resetFlight();
}

function getCurrentModel() {
    return ROCKET_MODELS.find(model => model.id === programState.model) || ROCKET_MODELS[0];
}

function getPart(id) {
    return PARTS.find(part => part.id === id);
}

function getEquippedParts() {
    return SLOTS.map(slot => getPart(programState.equipped[slot.id])).filter(Boolean);
}

function getRocketStats() {
    const model = getCurrentModel();
    const stats = { ...model.stats };
    getEquippedParts().forEach(part => {
        Object.entries(part.stats || {}).forEach(([key, value]) => {
            stats[key] = (stats[key] || 0) + value;
        });
    });
    stats.mass = Math.max(5, 18 - Math.round(stats.thrust * 0.4) + Math.round(stats.hull * 0.6));
    stats.maxFuel = 80 + stats.fuel * 18;
    stats.thrustPower = 0.034 + stats.thrust * 0.004;
    stats.turnPower = 0.024 + stats.control * 0.003;
    stats.drag = Math.max(0.986, 0.996 - stats.control * 0.0006);
    stats.landingTolerance = 2.2 + stats.hull * 0.18;
    return stats;
}

function renderRocketPanels() {
    document.getElementById("compactRocketPreview").innerHTML = rocketSvg({ model: getCurrentModel(), compact: true });
    document.getElementById("rocketStats").innerHTML = statCard("Schub", getRocketStats().thrust)
        + statCard("Tank", getRocketStats().fuel)
        + statCard("Steuerung", getRocketStats().control)
        + statCard("Forschung", getRocketStats().science)
        + statCard("Hülle", getRocketStats().hull)
        + statCard("Landung", getRocketStats().landingTolerance.toFixed(1));
}

function statCard(label, value) {
    return `<div class="stat-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderMissionOptions() {
    const select = document.getElementById("missionSelect");
    select.innerHTML = MISSIONS.map(mission => `<option value="${mission.id}">${escapeHtml(mission.name)}</option>`).join("");
    select.value = programState.selectedMission;
}

function getMission() {
    return MISSIONS.find(mission => mission.id === programState.selectedMission) || MISSIONS[0];
}

function renderMission() {
    const mission = getMission();
    const done = programState.missionLog[mission.id];
    document.getElementById("missionBrief").innerHTML = `
        <strong>${escapeHtml(mission.name)}</strong>
        <p>${escapeHtml(mission.desc)}</p>
        <small>Zielhöhe: ${mission.targetAlt} m · Ziel: ${escapeHtml(mission.reward)}${done ? " · geschafft" : ""}</small>
    `;
}

function renderUnlockSummary() {
    const progress = getSubjectProgress();
    const container = document.getElementById("unlockSummary");
    container.innerHTML = Object.entries(SUBJECT_BONUSES).map(([subject, bonus]) => {
        const item = progress[subject] || { completed: 0, total: 0 };
        const pct = item.total ? Math.min(100, Math.round((item.completed / item.total) * 100)) : 0;
        return `
            <div class="unlock-row">
                <small>${escapeHtml(bonus.label)}</small>
                <span class="unlock-bar"><i style="width:${pct}%"></i></span>
                <small>${item.completed}/${item.total || "-"}</small>
            </div>
        `;
    }).join("");
}

function renderWorkshop() {
    document.getElementById("workshopRocketPreview").innerHTML = rocketSvg({ model: getCurrentModel(), large: true });
    document.getElementById("slotList").innerHTML = SLOTS.map(slot => {
        const part = getPart(programState.equipped[slot.id]);
        return `
            <button type="button" class="slot-btn ${programState.selectedSlot === slot.id ? "active" : ""}" data-slot="${slot.id}">
                <strong>${escapeHtml(slot.label)}</strong>
                <small>${part ? escapeHtml(part.name) : "leer"}</small>
            </button>
        `;
    }).join("");
    document.querySelectorAll(".slot-btn").forEach(button => {
        button.addEventListener("click", () => {
            programState.selectedSlot = button.dataset.slot;
            saveProgramState();
            renderWorkshop();
        });
    });
    renderSlotParts();
}

function renderSlotParts() {
    const slot = programState.selectedSlot;
    const ownedParts = PARTS.filter(part => part.slot === slot && programState.owned.includes(part.id));
    document.getElementById("slotPartList").innerHTML = ownedParts.map(part => {
        const equipped = programState.equipped[slot] === part.id;
        return `
            <div class="part-card">
                <div>
                    <strong>${escapeHtml(part.name)}</strong>
                    <small>${escapeHtml(part.desc)}</small>
                    ${renderTags(part)}
                </div>
                <button type="button" class="item-action ${equipped ? "" : "primary"}" data-equip="${part.id}" ${equipped ? "disabled" : ""}>${equipped ? "aktiv" : "einbauen"}</button>
            </div>
        `;
    }).join("") || `<div class="part-card"><strong>Noch keine Teile</strong><small>Kaufe zuerst im Shop passende Bauteile.</small></div>`;
    document.querySelectorAll("[data-equip]").forEach(button => {
        button.addEventListener("click", () => equipPart(button.dataset.equip));
    });
}

function equipPart(partId) {
    const part = getPart(partId);
    if (!part || !programState.owned.includes(partId)) return;
    programState.equipped[part.slot] = partId;
    saveProgramState();
    renderRocketPanels();
    renderWorkshop();
    resetFlight();
}

function renderShop() {
    const subjects = ["all", ...Object.keys(SUBJECT_BONUSES), "start"];
    document.getElementById("shopFilters").innerHTML = subjects.map(subject => `
        <button type="button" class="shop-filter ${programState.shopFilter === subject ? "active" : ""}" data-filter="${subject}">
            ${subject === "all" ? "Alle" : subject === "start" ? "Basis" : escapeHtml(SUBJECT_BONUSES[subject].label)}
        </button>
    `).join("");
    document.querySelectorAll(".shop-filter").forEach(button => {
        button.addEventListener("click", () => {
            programState.shopFilter = button.dataset.filter;
            saveProgramState();
            renderShop();
        });
    });

    const progress = getSubjectProgress();
    const visible = PARTS.filter(part => programState.shopFilter === "all" || part.subject === programState.shopFilter);
    document.getElementById("shopGrid").innerHTML = visible.map(part => {
        const owned = programState.owned.includes(part.id);
        const unlocked = isPartUnlocked(part, progress);
        const canBuy = unlocked && !owned && getPoints() >= part.cost;
        const subjectLabel = part.subject === "start" ? "Basis" : (SUBJECT_BONUSES[part.subject]?.label || part.subject);
        return `
            <article class="shop-card ${owned ? "owned" : ""} ${unlocked ? "" : "locked"}">
                <p class="space-kicker">${escapeHtml(subjectLabel)} · ${escapeHtml(slotLabel(part.slot))}</p>
                <strong>${escapeHtml(part.name)}</strong>
                <small>${escapeHtml(part.desc)}</small>
                ${renderTags(part)}
                <button type="button" class="item-action ${canBuy ? "primary" : ""}" data-buy="${part.id}" ${canBuy ? "" : "disabled"}>
                    ${owned ? "gekauft" : unlocked ? `${part.cost} Punkte` : `${part.req || 0} Kapitelquiz nötig`}
                </button>
            </article>
        `;
    }).join("");
    document.querySelectorAll("[data-buy]").forEach(button => {
        button.addEventListener("click", () => buyPart(button.dataset.buy));
    });
}

function slotLabel(slotId) {
    return (SLOTS.find(slot => slot.id === slotId) || {}).label || slotId;
}

function isPartUnlocked(part, progress = getSubjectProgress()) {
    if (part.subject === "start") return true;
    const item = progress[part.subject] || { completed: 0 };
    return item.completed >= Number(part.req || 1);
}

function buyPart(partId) {
    const part = getPart(partId);
    if (!part || programState.owned.includes(partId)) return;
    if (!isPartUnlocked(part)) return;
    const points = getPoints();
    if (points < part.cost) return;
    setPoints(points - part.cost);
    programState.owned.push(partId);
    saveProgramState();
    renderEverything();
}

function renderTags(part) {
    const entries = Object.entries(part.stats || {});
    if (!entries.length && !part.color) return "";
    const tags = entries.map(([key, value]) => `<span class="tag">+${value} ${escapeHtml(statLabel(key))}</span>`);
    if (part.color) tags.push(`<span class="tag">Design</span>`);
    return `<div class="tag-row">${tags.join("")}</div>`;
}

function statLabel(key) {
    return ({ thrust: "Schub", fuel: "Tank", control: "Steuerung", science: "Forschung", hull: "Hülle" })[key] || key;
}

function renderSolarMap() {
    const progress = getSubjectProgress();
    const completed = Object.values(progress).reduce((sum, item) => sum + item.completed, 0);
    const planets = [
        ["Merkur", 150, 178, 6, 0],
        ["Venus", 230, 178, 8, 2],
        ["Erde", 320, 178, 10, 0],
        ["Mars", 425, 178, 8, 4],
        ["Jupiter", 575, 178, 17, 8],
        ["Saturn", 760, 178, 15, 12],
        ["Uranus", 910, 178, 12, 16],
        ["Neptun", 1030, 178, 12, 20]
    ];
    document.getElementById("solarMap").innerHTML = `
        <svg viewBox="0 0 1120 360" role="img" aria-label="Sonnensystem-Fortschritt">
            <defs>
                <radialGradient id="sspSun"><stop offset="0%" stop-color="#fff7ad"/><stop offset="45%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#7c2d12"/></radialGradient>
            </defs>
            <circle cx="70" cy="178" r="42" fill="url(#sspSun)"/>
            ${planets.map(([name, x, y, r, req], index) => {
                const unlocked = completed >= req;
                return `
                    <line x1="${index === 0 ? 112 : planets[index - 1][1] + planets[index - 1][3]}" y1="${y}" x2="${x - r}" y2="${y}" stroke="${unlocked ? "#38bdf8" : "#334155"}" stroke-width="2" stroke-dasharray="5 7"/>
                    <circle cx="${x}" cy="${y}" r="${r}" fill="${unlocked ? planetColor(name) : "#334155"}" opacity="${unlocked ? "1" : "0.42"}"/>
                    <text x="${x}" y="${y + 34}" text-anchor="middle" fill="${unlocked ? "#e8f4ff" : "#64748b"}" font-size="15" font-weight="800">${name}</text>
                    <text x="${x}" y="${y + 52}" text-anchor="middle" fill="#94a3b8" font-size="12">${unlocked ? "Missionen offen" : req + " Kapitel"}</text>
                `;
            }).join("")}
        </svg>
    `;
}

function planetColor(name) {
    return ({ Merkur: "#94a3b8", Venus: "#fbbf24", Erde: "#38bdf8", Mars: "#f97316", Jupiter: "#f8d3a2", Saturn: "#fde68a", Uranus: "#67e8f9", Neptun: "#2563eb" })[name] || "#94a3b8";
}

function renderSubjectBonuses() {
    const progress = getSubjectProgress();
    document.getElementById("subjectBonusList").innerHTML = Object.entries(SUBJECT_BONUSES).map(([subject, bonus]) => {
        const item = progress[subject] || { completed: 0, total: 0 };
        return `
            <article class="bonus-card">
                <h3>${escapeHtml(bonus.label)}</h3>
                <p><strong>${item.completed}/${item.total || "-"} Kapitel:</strong> ${escapeHtml(bonus.unlock)}</p>
                <p>${escapeHtml(bonus.effect)}</p>
            </article>
        `;
    }).join("");
}

function setTab(tabName) {
    document.querySelectorAll(".space-tab").forEach(button => button.classList.toggle("active", button.dataset.tab === tabName));
    document.querySelectorAll(".tab-page").forEach(page => page.classList.toggle("active", page.id === `tab-${tabName}`));
}

function resetFlight() {
    const stats = getRocketStats();
    flightState = {
        x: 550,
        y: 585,
        vx: 0,
        vy: 0,
        angle: 0,
        fuel: stats.maxFuel,
        launched: false,
        paused: false,
        landed: true,
        crashed: false,
        completed: false,
        collected: false,
        maxAlt: 0,
        message: "Bereit auf der Startrampe."
    };
}

function igniteFlight() {
    if (!flightState || flightState.crashed || flightState.completed) resetFlight();
    flightState.launched = true;
    flightState.landed = false;
    flightState.paused = false;
    flightState.message = "Start frei.";
}

function togglePause() {
    if (!flightState) return;
    flightState.paused = !flightState.paused;
    flightState.message = flightState.paused ? "Simulation pausiert." : "Simulation läuft.";
}

function setupControls() {
    document.querySelectorAll("[data-control]").forEach(button => {
        const key = button.dataset.control;
        const set = value => {
            controls[key] = value;
            if (key === "thrust" && value) igniteFlight();
        };
        button.addEventListener("pointerdown", event => { event.preventDefault(); set(true); });
        button.addEventListener("pointerup", () => set(false));
        button.addEventListener("pointerleave", () => set(false));
        button.addEventListener("pointercancel", () => set(false));
    });

    window.addEventListener("keydown", event => {
        if (event.repeat) return;
        if (["Space", "KeyW", "ArrowUp"].includes(event.code)) { event.preventDefault(); controls.thrust = true; igniteFlight(); }
        if (["KeyA", "ArrowLeft"].includes(event.code)) controls.left = true;
        if (["KeyD", "ArrowRight"].includes(event.code)) controls.right = true;
    });
    window.addEventListener("keyup", event => {
        if (["Space", "KeyW", "ArrowUp"].includes(event.code)) controls.thrust = false;
        if (["KeyA", "ArrowLeft"].includes(event.code)) controls.left = false;
        if (["KeyD", "ArrowRight"].includes(event.code)) controls.right = false;
    });
}

function startAnimationLoop() {
    if (animationId) cancelAnimationFrame(animationId);
    lastFrameTime = performance.now();
    const tick = now => {
        const dt = Math.min(3, (now - lastFrameTime) / 16.67);
        lastFrameTime = now;
        updateFlight(dt);
        drawFlight();
        animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
}

function updateFlight(dt) {
    if (!flightState || flightState.paused || !flightState.launched || flightState.crashed || flightState.completed) return;
    const stats = getRocketStats();
    const mission = getMission();

    if (controls.left) flightState.angle -= stats.turnPower * dt;
    if (controls.right) flightState.angle += stats.turnPower * dt;
    flightState.angle = Math.max(-1.35, Math.min(1.35, flightState.angle));

    if (controls.thrust && flightState.fuel > 0) {
        const power = stats.thrustPower * dt;
        flightState.vx += Math.sin(flightState.angle) * power * 12;
        flightState.vy -= Math.cos(flightState.angle) * power * 12;
        flightState.fuel = Math.max(0, flightState.fuel - (0.52 - Math.min(0.18, stats.control * 0.008)) * dt);
    }

    flightState.vy += 0.045 * dt;
    flightState.vx *= Math.pow(stats.drag, dt);
    flightState.vy *= Math.pow(0.999, dt);
    flightState.x += flightState.vx * dt * 8;
    flightState.y += flightState.vy * dt * 8;

    if (flightState.x < 80) { flightState.x = 80; flightState.vx *= -0.35; }
    if (flightState.x > 1020) { flightState.x = 1020; flightState.vx *= -0.35; }

    const altitude = Math.max(0, Math.round(585 - flightState.y));
    flightState.maxAlt = Math.max(flightState.maxAlt, altitude);

    const scienceX = 540 + Math.sin(mission.targetAlt * 0.02) * 170;
    const scienceY = 585 - mission.targetAlt;
    if (!flightState.collected && distance(flightState.x, flightState.y, scienceX, scienceY) < 34) {
        flightState.collected = true;
        flightState.message = "Science-Modul eingesammelt.";
    }

    if (mission.id === "orbit" && altitude > mission.targetAlt && Math.abs(flightState.vx) > mission.targetSpeed * 0.12) {
        completeMission("Stabiler Orbit erreicht.");
    }

    if (altitude > mission.targetAlt && flightState.collected && mission.id !== "orbit") {
        flightState.message = "Ziel erreicht. Jetzt weich landen.";
    }

    if (flightState.y >= 585) {
        flightState.y = 585;
        const speed = Math.hypot(flightState.vx, flightState.vy);
        if (flightState.maxAlt > mission.targetAlt * 0.75 && flightState.collected && speed <= stats.landingTolerance) {
            completeMission("Saubere Landung. Mission geschafft.");
        } else if (flightState.launched && speed > stats.landingTolerance) {
            flightState.crashed = true;
            flightState.message = "Zu schnell gelandet. In der Werkstatt verbessern oder ruhiger bremsen.";
        } else {
            flightState.launched = false;
            flightState.landed = true;
            flightState.message = "Gelandet. Für mehr Höhe länger Schub geben.";
        }
        flightState.vx = 0;
        flightState.vy = 0;
    }
}

function completeMission(message) {
    const mission = getMission();
    flightState.completed = true;
    flightState.message = message;
    programState.missionLog[mission.id] = {
        at: Date.now(),
        maxAlt: flightState.maxAlt,
        rocket: programState.model
    };
    saveProgramState();
    renderMission();
    renderSolarMap();
}

function drawFlight() {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas || !flightState) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const mission = getMission();
    const stats = getRocketStats();

    ctx.clearRect(0, 0, w, h);
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#020617");
    sky.addColorStop(0.62, "#0f2a4a");
    sky.addColorStop(1, "#12324f");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const cameraY = Math.min(0, flightState.y - 420);
    drawStars(ctx, w, h, cameraY);
    drawTargetLines(ctx, mission, cameraY);
    drawGround(ctx, w, h, cameraY);
    drawScienceOrb(ctx, mission, cameraY);
    drawRocketCanvas(ctx, flightState.x, flightState.y - cameraY, flightState.angle, controls.thrust && flightState.fuel > 0);

    const altitude = Math.max(0, Math.round(585 - flightState.y));
    const speed = Math.hypot(flightState.vx, flightState.vy).toFixed(1);
    const fuelPct = Math.round((flightState.fuel / stats.maxFuel) * 100);
    document.getElementById("flightHud").innerHTML = [
        `Höhe ${altitude} m`,
        `Tempo ${speed}`,
        `Treibstoff ${fuelPct}%`,
        `Max ${Math.round(flightState.maxAlt)} m`,
        flightState.collected ? "Science gesichert" : "Science offen",
        flightState.message
    ].map(text => `<span class="hud-chip">${escapeHtml(text)}</span>`).join("");
}

function drawStars(ctx, w, h, cameraY) {
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    for (let i = 0; i < 110; i++) {
        const x = (i * 97) % w;
        const y = ((i * 157) % 1400) - 760 - cameraY * 0.18;
        const yy = ((y % (h + 280)) + h + 280) % (h + 280) - 140;
        ctx.globalAlpha = 0.25 + (i % 5) * 0.13;
        ctx.beginPath();
        ctx.arc(x, yy, (i % 3) + 0.7, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawTargetLines(ctx, mission, cameraY) {
    const y = 585 - mission.targetAlt - cameraY;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1100, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#a5f3fc";
    ctx.font = "800 18px Segoe UI";
    ctx.fillText(`${mission.name}: ${mission.targetAlt} m`, 24, y - 12);
}

function drawGround(ctx, w, h, cameraY) {
    const groundY = 616 - cameraY;
    ctx.fillStyle = "#173b2a";
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.fillStyle = "#1f6f4b";
    ctx.fillRect(0, groundY, w, 16);
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(475, groundY - 10, 150, 10);
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(520, groundY - 40, 60, 30);
    ctx.fillStyle = "#e8f4ff";
    ctx.font = "900 16px Segoe UI";
    ctx.fillText("LANDING PAD", 486, groundY - 48);
}

function drawScienceOrb(ctx, mission, cameraY) {
    if (flightState.collected) return;
    const x = 540 + Math.sin(mission.targetAlt * 0.02) * 170;
    const y = 585 - mission.targetAlt - cameraY;
    const pulse = 1 + Math.sin(performance.now() * 0.005) * 0.15;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(52, 211, 153, 0.18)";
    ctx.beginPath();
    ctx.arc(0, 0, 28 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#34d399";
    ctx.beginPath();
    ctx.arc(0, 0, 12 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d1fae5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(18, 0);
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);
    ctx.stroke();
    ctx.restore();
}

function drawRocketCanvas(ctx, x, y, angle, thrusting) {
    const model = getCurrentModel();
    const paint = getEquippedParts().find(part => part.slot === "paint");
    const color = paint?.color || model.color;
    const accent = paint?.accent || model.accent;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    if (thrusting) {
        const flame = 34 + Math.sin(performance.now() * 0.04) * 8;
        ctx.fillStyle = "rgba(251, 191, 36, 0.95)";
        ctx.beginPath();
        ctx.moveTo(-10, 38);
        ctx.lineTo(0, 38 + flame);
        ctx.lineTo(10, 38);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(59, 130, 246, 0.82)";
        ctx.beginPath();
        ctx.moveTo(-5, 38);
        ctx.lineTo(0, 54 + flame * 0.35);
        ctx.lineTo(5, 38);
        ctx.closePath();
        ctx.fill();
    }
    ctx.fillStyle = "#e5e7eb";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -48);
    ctx.quadraticCurveTo(25, -25, 18, 36);
    ctx.lineTo(-18, 36);
    ctx.quadraticCurveTo(-25, -25, 0, -48);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(-16, -12, 32, 34);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(0, -21, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-18, 20);
    ctx.lineTo(-39, 44);
    ctx.lineTo(-16, 39);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(18, 20);
    ctx.lineTo(39, 44);
    ctx.lineTo(16, 39);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function rocketSvg({ model, compact = false, large = false }) {
    const paint = getEquippedParts().find(part => part && part.slot === "paint");
    const color = paint?.color || model.color;
    const accent = paint?.accent || model.accent;
    const height = large ? 360 : 135;
    const scale = large ? 2.3 : compact ? 0.95 : 1.25;
    return `
        <svg class="rocket-svg" width="${large ? 240 : 130}" height="${height}" viewBox="-70 -95 140 210" role="img" aria-label="${escapeHtml(model.name)}">
            <g transform="scale(${scale})">
                <path d="M0 -82 C30 -50 30 28 18 58 L-18 58 C-30 28 -30 -50 0 -82Z" fill="#e5e7eb" stroke="#0f172a" stroke-width="4"/>
                <path d="M-16 -10 H16 V38 H-16Z" fill="${color}" opacity="0.95"/>
                <circle cx="0" cy="-28" r="13" fill="${accent}" stroke="#0f172a" stroke-width="4"/>
                <path d="M-18 22 L-52 66 L-16 58Z" fill="${color}" stroke="#0f172a" stroke-width="4"/>
                <path d="M18 22 L52 66 L16 58Z" fill="${color}" stroke="#0f172a" stroke-width="4"/>
                <rect x="-15" y="58" width="30" height="18" rx="5" fill="#334155" stroke="#0f172a" stroke-width="4"/>
                <path d="M-10 76 L0 108 L10 76Z" fill="#fbbf24" opacity="0.9"/>
                <path d="M-4 76 L0 94 L4 76Z" fill="#38bdf8" opacity="0.9"/>
            </g>
        </svg>
    `;
}

function distance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
