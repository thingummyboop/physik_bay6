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
    { id: "weapon_basic", slot: "weapon", name: "Notfall-Geschütz", subject: "start", cost: 0, stats: { weapon: 1 }, desc: "Ein kleines Bordgeschütz für die ferne Endphase." },
    { id: "paint_school", slot: "paint", name: "SciVerse-Lack", subject: "start", cost: 0, stats: {}, color: "#38bdf8", accent: "#fbbf24", desc: "Der Standardlook deiner Schulrakete." },

    { id: "engine_vector", slot: "engine", name: "Newton-Vektortriebwerk", subject: "physik", req: 1, cost: 45, stats: { thrust: 3, control: 1 }, desc: "Mehr Schub und sichtbare Kraft-Richtung." },
    { id: "fin_gyro", slot: "fin", name: "Kreisel-Stabilisator", subject: "physik", req: 2, cost: 55, stats: { control: 3, hull: 1 }, desc: "Hilft beim Drehen und Abfangen." },
    { id: "shield_heat", slot: "utility", name: "Wärmelehre-Hitzeschild", subject: "physik", req: 3, cost: 70, stats: { hull: 4 }, desc: "Schützt beim Wiedereintritt und harten Landungen." },
    { id: "solar_panel", slot: "utility", name: "Optik-Solarpaneel", subject: "physik", req: 4, cost: 80, stats: { science: 1, fuel: 1 }, desc: "Licht wird zu Energie." },
    { id: "weapon_photon", slot: "weapon", name: "Photonenkanone", subject: "physik", req: 5, cost: 110, stats: { weapon: 2, control: 1 }, desc: "Ein stärkerer Strahl für die Space-Invaders-Zone." },

    { id: "math_nav", slot: "nose", name: "Mathe-Steuercomputer", subject: "mathematik", req: 1, cost: 45, stats: { control: 4 }, desc: "Rechnet Flugwinkel sauberer." },
    { id: "math_optimizer", slot: "utility", name: "Effizienz-Rechner", subject: "mathematik", req: 3, cost: 75, stats: { fuel: 2, control: 2 }, desc: "Verbraucht weniger Treibstoff bei ruhiger Steuerung." },
    { id: "math_grid_paint", slot: "paint", name: "Koordinaten-Lack", subject: "mathematik", req: 5, cost: 55, stats: {}, color: "#2563eb", accent: "#f8fafc", desc: "Schicker Mathe-Look mit Gitterlinien." },

    { id: "chem_fuel", slot: "body", name: "Chemie-Hochenergietank", subject: "chemie", req: 1, cost: 50, stats: { fuel: 4, thrust: 1 }, desc: "Mehr Energie durch besseren Treibstoff." },
    { id: "chem_alloy", slot: "body", name: "Leichtmetall-Rumpf", subject: "chemie", req: 3, cost: 80, stats: { hull: 3, fuel: 2 }, desc: "Stabil und leichter als der Standardrumpf." },
    { id: "chem_crystal", slot: "nose", name: "Kristall-Sensor", subject: "chemie", req: 5, cost: 95, stats: { science: 2, control: 2 }, desc: "Erkennt Stoffproben im Orbit." },
    { id: "weapon_plasma", slot: "weapon", name: "Plasmawerfer", subject: "chemie", req: 5, cost: 120, stats: { weapon: 3 }, desc: "Mehr Schaden durch energiereiche Teilchen." },

    { id: "bio_probe", slot: "science", name: "Bio-Probenkapsel", subject: "biologie", req: 1, cost: 45, stats: { science: 4 }, desc: "Sammelt Sporen, Wasserproben und Mikrospuren." },
    { id: "bio_greenhouse", slot: "science", name: "Mini-Gewächshaus", subject: "biologie", req: 2, cost: 65, stats: { science: 5, hull: 1 }, desc: "Teste Pflanzen im Weltraum." },

    { id: "dgb_autopilot", slot: "nose", name: "DGB-Autopilot", subject: "dgb", req: 2, cost: 60, stats: { control: 5 }, desc: "Macht die Steuerung weicher." },
    { id: "weapon_targeting", slot: "weapon", name: "Zielcomputer-Geschütz", subject: "dgb", req: 4, cost: 130, stats: { weapon: 2, control: 2 }, desc: "Feuert präziser und schneller in der Endphase." },
    { id: "geo_mapper", slot: "science", name: "Geo-Kartenkamera", subject: "geographie", req: 1, cost: 50, stats: { science: 3, control: 1 }, desc: "Scannt Oberflächen und Umlaufbahnen." },
    { id: "music_radio", slot: "utility", name: "Musik-Cockpitradio", subject: "musik", req: 1, cost: 35, stats: { control: 1 }, desc: "Schaltet Lernmusik frei und beruhigt den Flug." },
    { id: "art_paint", slot: "paint", name: "Kunst-Galaxie-Lack", subject: "kunst", req: 1, cost: 40, stats: {}, color: "#a855f7", accent: "#fb7185", desc: "Eine Rakete, die aussieht wie ein Sternennebel." },
    { id: "english_radio", slot: "utility", name: "English Mission Radio", subject: "englisch", req: 1, cost: 35, stats: { science: 1 }, desc: "Internationale Funksprüche für Mission Control." },
    { id: "de_logbook", slot: "science", name: "Deutsch-Logbuch", subject: "deutsch", req: 1, cost: 35, stats: { science: 2 }, desc: "Bessere Missionsberichte, klarere Beobachtungen." },
    { id: "eh_life_support", slot: "body", name: "Vorrats- und Wasserrecycling", subject: "ernaehrung", req: 1, cost: 55, stats: { fuel: 1, hull: 3 }, desc: "Für lange bemannte Missionen gedacht." },
    { id: "paint_gold", slot: "paint", name: "Goldene Rakete", subject: "victory", cost: 0, stats: { weapon: 1, hull: 1 }, color: "#facc15", accent: "#fff7ad", desc: "Die Auszeichnung für den vollendeten SciVerse-Flug." }
];

const SLOTS = [
    { id: "nose", label: "Spitze" },
    { id: "body", label: "Rumpf/Tank" },
    { id: "engine", label: "Triebwerk" },
    { id: "fin", label: "Stabilisierung" },
    { id: "science", label: "Forschung" },
    { id: "utility", label: "Nutzlast" },
    { id: "weapon", label: "Geschütz" },
    { id: "paint", label: "Design" }
];

const PART_BUFF_LABELS = {
    engine_vector: ["+1 Booster", "stärkerer Boost"],
    chem_fuel: ["+1 Booster", "mehr Treibstoff"],
    chem_crystal: ["Magnetfeld+"],
    dgb_autopilot: ["Autopilot"],
    math_nav: ["leichter steuern"],
    math_optimizer: ["sparsam", "Autopilot+"],
    geo_mapper: ["Magnetfeld+"],
    bio_probe: ["Science+"],
    bio_greenhouse: ["Science++"],
    shield_heat: ["Schildladung"],
    solar_panel: ["sparsam"],
    fin_gyro: ["Ausweichen+"],
    weapon_basic: ["Endphase"],
    weapon_photon: ["Doppelschuss"],
    weapon_plasma: ["starker Treffer"],
    weapon_targeting: ["schneller Schuss"],
    paint_gold: ["Goldene Rakete"]
};

const CELESTIAL_BODIES = [
    { id: "earth", name: "Erde", altitude: 0, x: 550, radius: 118, color: "#38bdf8", accent: "#16a34a", influence: 0, gravity: 0, note: "Startwelt" },
    { id: "moon", name: "Mond", altitude: 660, x: 735, radius: 38, color: "#cbd5e1", accent: "#64748b", influence: 210, gravity: 0.42, note: "kleiner Gravity-Assist" },
    { id: "mars", name: "Mars", altitude: 1450, x: 315, radius: 48, color: "#f97316", accent: "#7c2d12", influence: 245, gravity: 0.55, note: "zieht leicht zur Seite" },
    { id: "jupiter", name: "Jupiter", altitude: 2480, x: 845, radius: 96, color: "#f8d3a2", accent: "#b45309", influence: 390, gravity: 1.12, note: "starker Schleudereffekt" },
    { id: "saturn", name: "Saturn", altitude: 3650, x: 270, radius: 80, color: "#fde68a", accent: "#ca8a04", influence: 350, gravity: 0.78, rings: true, note: "breiter Einflussbereich" },
    { id: "uranus", name: "Uranus", altitude: 4880, x: 760, radius: 58, color: "#67e8f9", accent: "#0e7490", influence: 285, gravity: 0.52, note: "sanfter Zug" },
    { id: "neptune", name: "Neptun", altitude: 6120, x: 360, radius: 60, color: "#2563eb", accent: "#93c5fd", influence: 300, gravity: 0.58, note: "dunkler Außenplanet" },
    { id: "kuiper", name: "Kuipergürtel", altitude: 7420, x: 550, radius: 132, color: "#94a3b8", accent: "#475569", influence: 360, gravity: 0.24, belt: true, note: "viele kleine Körper" },
    { id: "voyager", name: "Voyager", altitude: 8820, x: 770, radius: 24, color: "#f8fafc", accent: "#fbbf24", influence: 150, gravity: 0.04, voyager: true, note: "danach interstellarer Raum" }
];

const VOYAGER_ALTITUDE = CELESTIAL_BODIES.find(body => body.id === "voyager").altitude;

const ROUTE_TIMELINE = [
    { id: "satellites", name: "erste Satelliten", time: 60, type: "satellites", x: 540, radius: 64, color: "#cbd5e1", note: "nach etwa 1 Minute" },
    { id: "moon", name: "Mond", time: 150, type: "planet", x: 740, radius: 210, color: "#cbd5e1", accent: "#64748b", gravity: 0.42, note: "nach etwa 2:30 Minuten" },
    { id: "mars", name: "Mars", time: 240, type: "planet", x: 290, radius: 190, color: "#f97316", accent: "#7c2d12", gravity: 0.52, note: "roter Hintergrund-Vorbeiflug" },
    { id: "jupiter", name: "Jupiter", time: 330, type: "planet", x: 845, radius: 330, color: "#f8d3a2", accent: "#b45309", gravity: 1.05, bands: true, note: "starker Schwerkraftbereich" },
    { id: "saturn", name: "Saturn", time: 420, type: "planet", x: 270, radius: 275, color: "#fde68a", accent: "#ca8a04", gravity: 0.74, rings: true, note: "Ringe ziehen groß vorbei" },
    { id: "uranus", name: "Uranus", time: 510, type: "planet", x: 775, radius: 220, color: "#67e8f9", accent: "#0e7490", gravity: 0.48, note: "ruhiger Eisriese" },
    { id: "neptune", name: "Neptun", time: 600, type: "planet", x: 350, radius: 230, color: "#2563eb", accent: "#93c5fd", gravity: 0.55, note: "letzter Planet" },
    { id: "kuiper", name: "Kuipergürtel", time: 690, type: "belt", x: 550, radius: 260, color: "#94a3b8", accent: "#475569", gravity: 0.18, note: "viele ferne Brocken" },
    { id: "voyager", name: "Voyager", time: 780, type: "voyager", x: 745, radius: 56, color: "#f8fafc", accent: "#fbbf24", gravity: 0.02, note: "Grenze zum interstellaren Raum" }
];

const FIRST_SATELLITE_TIME = 60;
const VOYAGER_PASS_TIME = 780;
const CALM_PHASE_SECONDS = 90;
const INVADER_START_TIME = VOYAGER_PASS_TIME + CALM_PHASE_SECONDS;
const INVADER_DURATION_SECONDS = 600;
const INVADER_END_TIME = INVADER_START_TIME + INVADER_DURATION_SECONDS;

const MISSIONS = [
    { id: "sciverse_grand_tour", body: "voyager", grandTour: true, name: "Explore the SciVerse", targetAlt: 24000, targetSpeed: 10.0, itemGoal: 24, reward: "Goldene Rakete", points: 180, desc: "Ein langer Flug durch das Sonnensystem: nach etwa 1 Minute tauchen die ersten Satelliten auf, nach etwa 2:30 Minuten der Mond. Danach ziehen die Planeten nur groß im Hintergrund vorbei. Nach Voyager folgt eine ruhige Sternenphase, dann beginnt die Space-Invaders-Endphase." }
];

const DEFAULT_STATE = {
    model: null,
    owned: ["nose_basic", "body_basic", "engine_basic", "fin_basic", "science_empty", "utility_basic", "weapon_basic", "paint_school"],
    equipped: {
        nose: "nose_basic",
        body: "body_basic",
        engine: "engine_basic",
        fin: "fin_basic",
        science: "science_empty",
        utility: "utility_basic",
        weapon: "weapon_basic",
        paint: "paint_school"
    },
    selectedSlot: "engine",
    shopFilter: "all",
    selectedMission: "sciverse_grand_tour",
    missionLog: {},
    goldenRocket: false
};

let programState = loadProgramState();
let flightState = null;
let controls = { left: false, right: false, throttleUp: false, throttleDown: false };
let animationId = null;
let lastFrameTime = 0;
let lastUiRenderTime = 0;

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
        renderMissionOptions();
        renderMission();
        renderMissionJournal();
    });

    document.getElementById("btnIgnite").addEventListener("click", igniteFlight);
    document.getElementById("btnPause").addEventListener("click", togglePause);
    document.getElementById("btnResetFlight").addEventListener("click", resetFlight);
    document.getElementById("btnScienceActivate")?.addEventListener("click", activateScience);
    document.getElementById("btnTransmitScience")?.addEventListener("click", transmitScience);
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

function getCompletedChapterCount() {
    return Object.values(getSubjectProgress()).reduce((sum, item) => sum + (item.completed || 0), 0);
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
    normalizeSelectedMission();
    renderMissionOptions();
    renderMission();
    renderMissionJournal();
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

function getEquippedPart(slotId) {
    return getPart(programState.equipped[slotId]);
}

function getRocketStats() {
    const model = getCurrentModel();
    const stats = { ...model.stats };
    getEquippedParts().forEach(part => {
        Object.entries(part.stats || {}).forEach(([key, value]) => {
            stats[key] = (stats[key] || 0) + value;
        });
    });
    const equipped = programState.equipped;
    stats.mass = Math.max(5, 18 - Math.round(stats.thrust * 0.4) + Math.round(stats.hull * 0.6));
    stats.maxFuel = 80 + stats.fuel * 18;
    stats.thrustPower = 0.034 + stats.thrust * 0.004;
    stats.turnPower = 0.024 + stats.control * 0.003;
    stats.drag = Math.max(0.986, 0.996 - stats.control * 0.0006);
    stats.landingTolerance = 2.2 + stats.hull * 0.18;
    stats.boosters = 1 + (equipped.engine === "engine_vector" ? 1 : 0) + (equipped.body === "chem_fuel" ? 1 : 0);
    stats.boosterPower = 0.48 + stats.thrust * 0.026 + (equipped.engine === "engine_vector" ? 0.22 : 0);
    stats.magnetRange = 34 + stats.science * 4 + (equipped.nose === "chem_crystal" ? 46 : 0) + (equipped.science === "geo_mapper" ? 24 : 0);
    stats.autopilot = (equipped.nose === "dgb_autopilot" ? 1 : 0) + (equipped.nose === "math_nav" ? 0.55 : 0) + (equipped.utility === "math_optimizer" ? 0.35 : 0);
    stats.pickupValue = 1 + Math.floor(stats.science / 3);
    stats.shield = (equipped.utility === "shield_heat" ? 1 : 0) + Math.floor(stats.hull / 8);
    stats.safeSpeed = 4.2 + stats.control * 0.10 + stats.hull * 0.03;
    stats.fuelEfficiency = 0.56 - Math.min(0.22, stats.control * 0.01) - (equipped.utility === "math_optimizer" ? 0.1 : 0) - (equipped.utility === "solar_panel" ? 0.05 : 0);
    stats.weapon = Math.max(1, (stats.weapon || 0) + Math.min(4, Math.floor(getCompletedChapterCount() / 8)) + (programState.goldenRocket ? 1 : 0));
    stats.weaponCooldown = Math.max(10, 28 - stats.weapon * 3);
    return stats;
}

function renderRocketPanels() {
    document.getElementById("compactRocketPreview").innerHTML = rocketSvg({ model: getCurrentModel(), compact: true });
    document.getElementById("rocketStats").innerHTML = statCard("Schub", getRocketStats().thrust)
        + statCard("Tank", getRocketStats().fuel)
        + statCard("Steuerung", getRocketStats().control)
        + statCard("Forschung", getRocketStats().science)
        + statCard("Hülle", getRocketStats().hull)
        + statCard("Booster", getRocketStats().boosters)
        + statCard("Magnet", Math.round(getRocketStats().magnetRange))
        + statCard("Autopilot", getRocketStats().autopilot.toFixed(1))
        + statCard("Geschütz", getRocketStats().weapon);
}

function statCard(label, value) {
    return `<div class="stat-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderMissionOptions() {
    normalizeSelectedMission();
    const select = document.getElementById("missionSelect");
    select.innerHTML = getAvailableMissions().map(mission => {
        const done = programState.missionLog[mission.id];
        return `<option value="${mission.id}">${escapeHtml(mission.name)}${done ? " ✓" : ""}</option>`;
    }).join("");
    select.value = programState.selectedMission;
}

function getMission() {
    normalizeSelectedMission();
    return MISSIONS.find(mission => mission.id === programState.selectedMission) || MISSIONS[0];
}

function renderMission() {
    normalizeSelectedMission();
    const mission = getMission();
    const done = programState.missionLog[mission.id];
    const next = getNextMission(mission.id);
    const body = getMissionBody(mission);
    const goalLine = mission.grandTour
        ? `Reiseplan: Satelliten nach ${formatTime(FIRST_SATELLITE_TIME)} · Mond nach ${formatTime(150)} · Voyager nach ${formatTime(VOYAGER_PASS_TIME)} · Endphase ${formatTime(INVADER_DURATION_SECONDS)}`
        : `Ziel: ${escapeHtml(body?.name || mission.name)} · Zielhöhe: ${mission.targetAlt} m · Sammelziel: ${mission.itemGoal}`;
    document.getElementById("missionBrief").innerHTML = `
        <strong>${escapeHtml(mission.name)}</strong>
        <p>${escapeHtml(mission.desc)}</p>
        <small>${goalLine} · Belohnung: ${escapeHtml(mission.reward)} · ${mission.points} Punkte${done ? " · geschafft" : ""}${next && !done ? " · danach: " + escapeHtml(next.name) : ""}</small>
    `;
}

function normalizeSelectedMission() {
    const selected = MISSIONS.find(mission => mission.id === programState.selectedMission);
    const available = getAvailableMissions();
    if (!selected || !available.some(mission => mission.id === selected.id)) {
        const firstOpen = getFirstOpenMission();
        programState.selectedMission = firstOpen.id;
        saveProgramState();
    }
}

function getAvailableMissions() {
    const firstOpenIndex = MISSIONS.findIndex(mission => !programState.missionLog[mission.id]);
    const openIndex = firstOpenIndex === -1 ? MISSIONS.length - 1 : firstOpenIndex;
    return MISSIONS.filter((mission, index) => index <= openIndex || programState.missionLog[mission.id]);
}

function getFirstOpenMission() {
    return MISSIONS.find(mission => !programState.missionLog[mission.id]) || MISSIONS[MISSIONS.length - 1];
}

function getNextMission(missionId) {
    const index = MISSIONS.findIndex(mission => mission.id === missionId);
    return index >= 0 ? MISSIONS[index + 1] || null : null;
}

function getMissionBody(mission = getMission()) {
    return CELESTIAL_BODIES.find(body => body.id === mission.body) || null;
}

function getCurrentSpaceZone(altitude) {
    const passed = CELESTIAL_BODIES
        .filter(body => body.altitude <= altitude)
        .sort((a, b) => b.altitude - a.altitude)[0] || CELESTIAL_BODIES[0];
    const next = CELESTIAL_BODIES.find(body => body.altitude > altitude) || null;
    if (altitude >= VOYAGER_ALTITUDE + 160) {
        return { label: "Interstellarer Raum", next: null };
    }
    return {
        label: passed.id === "earth" && next ? `Unterwegs zu ${next.name}` : `Nach ${passed.name}`,
        next
    };
}

function renderMissionJournal() {
    const container = document.getElementById("missionJournal");
    if (!container) return;
    const firstOpen = getFirstOpenMission();
    container.innerHTML = `
        <p class="space-kicker">Journal</p>
        ${MISSIONS.map((mission, index) => {
            const done = programState.missionLog[mission.id];
            const current = mission.id === programState.selectedMission;
            const locked = !done && mission.id !== firstOpen.id && !getAvailableMissions().some(item => item.id === mission.id);
            const detail = done
                ? `geschafft · max. ${Math.round(done.maxAlt || 0)} m · Kapseln ${done.items || 0} · Science ${Math.round(done.science || 0)}`
                : locked ? "gesperrt bis zur vorherigen Mission" : "aktive Mission";
            return `
                <div class="journal-row ${done ? "done" : ""} ${current ? "current" : ""}">
                    <div>
                        <strong>${index + 1}. ${escapeHtml(mission.name)}</strong>
                        <small>${escapeHtml(detail)}</small>
                    </div>
                    ${locked ? "" : `<button type="button" data-replay-mission="${mission.id}">${done ? "Wiederholen" : "Starten"}</button>`}
                </div>
            `;
        }).join("")}
    `;
    container.querySelectorAll("[data-replay-mission]").forEach(button => {
        button.addEventListener("click", () => replayMission(button.dataset.replayMission));
    });
}

function replayMission(missionId) {
    if (!getAvailableMissions().some(mission => mission.id === missionId)) return;
    programState.selectedMission = missionId;
    saveProgramState();
    renderMissionOptions();
    renderMission();
    renderMissionJournal();
    resetFlight();
    if (flightState) {
        const mission = getMission();
        flightState.message = `${mission.name} im Journal geladen. Space startet die erste Stufe.`;
        renderFlightSystems();
    }
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
    const selectedSlot = SLOTS.find(slot => slot.id === programState.selectedSlot) || SLOTS[0];
    const selectedPart = getPart(programState.equipped[selectedSlot.id]);
    const selectedInfo = document.getElementById("designerSelectedPart");
    if (selectedInfo) {
        selectedInfo.innerHTML = `
            <span class="slot-mark">${escapeHtml(slotBadge(selectedSlot.id))}</span>
            <div>
                <small>Aktiver Bereich</small>
                <strong>${escapeHtml(selectedSlot.label)}</strong>
                <em>${selectedPart ? escapeHtml(selectedPart.name) : "leer"}</em>
            </div>
        `;
    }
    document.getElementById("slotList").innerHTML = SLOTS.map(slot => {
        const part = getPart(programState.equipped[slot.id]);
        return `
            <button type="button" class="slot-btn ${programState.selectedSlot === slot.id ? "active" : ""}" data-slot="${slot.id}">
                <span class="slot-mark">${escapeHtml(slotBadge(slot.id))}</span>
                <span>
                    <strong>${escapeHtml(slot.label)}</strong>
                    <small>${part ? escapeHtml(part.name) : "leer"}</small>
                </span>
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
        const color = part.color || partAccentColor(part);
        return `
            <div class="part-card designer-part-card ${equipped ? "active" : ""}">
                <div class="part-thumb" style="--part-color:${escapeHtml(color)}">
                    <span>${escapeHtml(slotBadge(part.slot))}</span>
                </div>
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

function slotBadge(slotId) {
    return ({
        nose: "N",
        body: "T",
        engine: "E",
        fin: "F",
        science: "S",
        utility: "U",
        weapon: "G",
        paint: "L"
    })[slotId] || "?";
}

function partAccentColor(part) {
    return ({
        start: "#38bdf8",
        physik: "#fbbf24",
        mathematik: "#60a5fa",
        chemie: "#34d399",
        biologie: "#22c55e",
        dgb: "#a78bfa",
        geographie: "#14b8a6",
        deutsch: "#fb7185",
        englisch: "#ef4444",
        musik: "#c084fc",
        kunst: "#f472b6",
        ernaehrung: "#84cc16",
        victory: "#facc15"
    })[part.subject] || "#94a3b8";
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
    const subjects = ["all", ...Object.keys(SUBJECT_BONUSES), "start", "victory"];
    document.getElementById("shopFilters").innerHTML = subjects.map(subject => `
        <button type="button" class="shop-filter ${programState.shopFilter === subject ? "active" : ""}" data-filter="${subject}">
            ${subject === "all" ? "Alle" : subject === "start" ? "Basis" : subject === "victory" ? "Finale" : escapeHtml(SUBJECT_BONUSES[subject].label)}
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
        const buttonLabel = owned ? "gekauft" : unlocked ? `${part.cost} Punkte` : part.subject === "victory" ? "Finale schaffen" : `${part.req || 0} Kapitelquiz nötig`;
        const subjectLabel = part.subject === "start" ? "Basis" : part.subject === "victory" ? "Finale" : (SUBJECT_BONUSES[part.subject]?.label || part.subject);
        return `
            <article class="shop-card ${owned ? "owned" : ""} ${unlocked ? "" : "locked"}">
                <p class="space-kicker">${escapeHtml(subjectLabel)} · ${escapeHtml(slotLabel(part.slot))}</p>
                <strong>${escapeHtml(part.name)}</strong>
                <small>${escapeHtml(part.desc)}</small>
                ${renderTags(part)}
                <button type="button" class="item-action ${canBuy ? "primary" : ""}" data-buy="${part.id}" ${canBuy ? "" : "disabled"}>
                    ${buttonLabel}
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
    if (part.subject === "victory") return Boolean(programState.goldenRocket || programState.owned.includes(part.id));
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
    const buffLabels = PART_BUFF_LABELS[part.id] || [];
    if (!entries.length && !part.color && !buffLabels.length) return "";
    const tags = entries.map(([key, value]) => `<span class="tag">+${value} ${escapeHtml(statLabel(key))}</span>`);
    buffLabels.forEach(label => tags.push(`<span class="tag">${escapeHtml(label)}</span>`));
    if (part.color) tags.push(`<span class="tag">Design</span>`);
    return `<div class="tag-row">${tags.join("")}</div>`;
}

function statLabel(key) {
    return ({ thrust: "Schub", fuel: "Tank", control: "Steuerung", science: "Forschung", hull: "Hülle", weapon: "Geschütz" })[key] || key;
}

function renderSolarMap() {
    const progress = getSubjectProgress();
    const completed = Object.values(progress).reduce((sum, item) => sum + item.completed, 0);
    const route = CELESTIAL_BODIES.filter(body => body.id !== "earth");
    document.getElementById("solarMap").innerHTML = `
        <svg viewBox="0 0 1120 360" role="img" aria-label="Sonnensystem-Route">
            <defs>
                <radialGradient id="sspSun"><stop offset="0%" stop-color="#fff7ad"/><stop offset="45%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#7c2d12"/></radialGradient>
            </defs>
            <circle cx="70" cy="178" r="42" fill="url(#sspSun)"/>
            <text x="70" y="248" text-anchor="middle" fill="#fde68a" font-size="14" font-weight="900">Sonne</text>
            ${route.map((body, index) => {
                const x = 168 + index * 118;
                const y = 178 + Math.sin(index * 1.2) * 34;
                const r = Math.max(7, Math.min(24, body.radius * 0.22));
                const req = index * 3;
                const unlocked = completed >= req || getAvailableMissions().some(mission => mission.body === body.id);
                const prevX = index === 0 ? 112 : 168 + (index - 1) * 118;
                const prevY = index === 0 ? 178 : 178 + Math.sin((index - 1) * 1.2) * 34;
                return `
                    <line x1="${prevX}" y1="${prevY}" x2="${x - r}" y2="${y}" stroke="${unlocked ? "#38bdf8" : "#334155"}" stroke-width="2" stroke-dasharray="5 7"/>
                    ${body.rings ? `<ellipse cx="${x}" cy="${y}" rx="${r * 1.9}" ry="${r * 0.52}" fill="none" stroke="${unlocked ? body.accent : "#475569"}" stroke-width="3" transform="rotate(-12 ${x} ${y})"/>` : ""}
                    <circle cx="${x}" cy="${y}" r="${r}" fill="${unlocked ? body.color : "#334155"}" opacity="${unlocked ? "1" : "0.42"}"/>
                    <text x="${x}" y="${y + 42}" text-anchor="middle" fill="${unlocked ? "#e8f4ff" : "#64748b"}" font-size="13" font-weight="800">${escapeHtml(body.name)}</text>
                    <text x="${x}" y="${y + 59}" text-anchor="middle" fill="#94a3b8" font-size="11">${unlocked ? "Route offen" : req + " Kapitel"}</text>
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

function createFlightObjects(mission, stats) {
    const objects = [];
    const lanes = [170, 300, 430, 560, 690, 820, 950];
    const body = getMissionBody(mission);
    const maxAlt = Math.max(mission.targetAlt + 420, (body?.altitude || mission.targetAlt) + 360);
    const difficulty = Math.max(1, MISSIONS.findIndex(item => item.id === mission.id) + 1);
    let index = 0;
    for (let altitude = 115; altitude <= maxAlt; altitude += Math.max(58, 86 - difficulty * 4)) {
        const noise = seededNoise(`${mission.id}-${altitude}`);
        const lane = lanes[Math.floor(noise * lanes.length) % lanes.length];
        const drift = (seededNoise(`drift-${mission.id}-${altitude}`) - 0.5) * 58;
        const y = 585 - altitude;
        const nearBelt = Math.abs(altitude - CELESTIAL_BODIES.find(item => item.id === "kuiper").altitude) < 360;
        const hazardEvery = nearBelt ? 1 : Math.max(2, 4 - Math.floor(difficulty / 3));
        if (altitude > 190 && index % hazardEvery !== 1) {
            objects.push({
                id: `hazard-${altitude}`,
                type: "hazard",
                x: Math.max(115, Math.min(985, lane + drift)),
                y: y - 18,
                radius: 22 + Math.round(seededNoise(`size-${mission.id}-${altitude}`) * (12 + difficulty)),
                phase: seededNoise(`phase-${altitude}`) * Math.PI * 2,
                taken: false
            });
        }
        const pickupLane = lanes[(lanes.indexOf(lane) + 2 + index) % lanes.length];
        const type = index % 5 === 0 ? "boost" : index % 4 === 0 ? "science" : index % 7 === 0 ? "shield" : "fuel";
        objects.push({
            id: `pickup-${altitude}`,
            type,
            x: Math.max(100, Math.min(1000, pickupLane - drift * 0.45)),
            y,
            radius: type === "fuel" ? 18 : 20,
            taken: false,
            value: type === "fuel" ? 18 + stats.fuel * 2 : type === "boost" ? 1 : type === "shield" ? 1 : stats.pickupValue
        });
        index++;
    }
    if (!mission.grandTour) {
        objects.push({
            id: "finish-gate",
            type: "finish",
            x: body?.x || 550,
            y: 585 - mission.targetAlt,
            radius: 52,
            taken: false,
            value: mission.itemGoal
        });
    }
    return objects;
}

function seededNoise(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    const value = Math.sin(hash * 999.91) * 10000;
    return value - Math.floor(value);
}

function createInvaderState(stats = getRocketStats()) {
    return {
        enemies: [],
        shots: [],
        enemyShots: [],
        score: 0,
        hull: 3 + Math.floor(stats.hull / 5),
        weaponLevel: stats.weapon || 1,
        shotCooldown: 0,
        enemySpawnCooldown: 0,
        wave: 1,
        started: false,
        won: false
    };
}

function resetFlight() {
    const stats = getRocketStats();
    const mission = getMission();
    lastUiRenderTime = 0;
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
        throttle: 0,
        engineActive: false,
        boostersAttached: true,
        boosterActive: false,
        boosterCharges: stats.boosters,
        boosterFuel: 0,
        boosterMaxFuel: Math.max(22, 16 + stats.thrust * 2.5),
        lastBoosterPct: 100,
        boosterEmptyAnnounced: false,
        scienceActive: false,
        scienceStored: false,
        scienceTransmitted: false,
        scienceValue: 0,
        collectedItems: 0,
        fuelCells: 0,
        boostCells: 0,
        shields: stats.shield,
        invulnerableTimer: 0,
        magnetPulse: 0,
        hitCount: 0,
        objects: createFlightObjects(mission, stats),
        parachuteDeployed: false,
        chuteDamaged: false,
        currentStage: 2,
        sas: false,
        sasMode: "stability",
        sasTarget: 0,
        rcs: false,
        mapMode: false,
        maneuverNode: null,
        maxAlt: 0,
        gravityBody: null,
        gravityHint: "",
        gravityStrength: 0,
        interstellarReached: false,
        elapsedSeconds: 0,
        phase: "cruise",
        announcedMilestones: {},
        invader: createInvaderState(stats),
        message: "Bereit: Starte die lange SciVerse-Reise. Space zündet Booster, später feuert es das Geschütz."
    };
    renderFlightSystems();
}

function igniteFlight() {
    if (!flightState || flightState.crashed || flightState.completed) resetFlight();
    flightState.engineActive = true;
    flightState.launched = true;
    flightState.landed = false;
    flightState.paused = false;
    if (flightState.throttle < 0.35) setThrottle(0.58);
    flightState.message = "Motor läuft. Weiche seitlich aus, sammle Kapseln und setze Booster mit Space ein.";
    renderFlightSystems();
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
        };
        button.addEventListener("pointerdown", event => { event.preventDefault(); set(true); });
        button.addEventListener("pointerup", () => set(false));
        button.addEventListener("pointerleave", () => set(false));
        button.addEventListener("pointercancel", () => set(false));
    });

    document.getElementById("throttleSlider")?.addEventListener("input", event => {
        setThrottle(Number(event.target.value) / 100);
    });
    document.getElementById("btnThrottleZero")?.addEventListener("click", () => setThrottle(0));
    document.getElementById("btnThrottleFull")?.addEventListener("click", () => setThrottle(1));
    document.getElementById("btnStage")?.addEventListener("click", stageRocket);
    document.getElementById("btnStageTouch")?.addEventListener("click", stageRocket);
    document.getElementById("btnSas")?.addEventListener("click", toggleSas);
    document.getElementById("btnRcs")?.addEventListener("click", toggleRcs);
    document.getElementById("btnMapMode")?.addEventListener("click", toggleMapMode);
    document.querySelectorAll("[data-sas-mode]").forEach(button => {
        button.addEventListener("click", () => setSasMode(button.dataset.sasMode));
    });
    document.getElementById("btnAddNode")?.addEventListener("click", planManeuverNode);
    document.getElementById("btnPointNode")?.addEventListener("click", pointToManeuver);
    document.getElementById("btnClearNode")?.addEventListener("click", clearManeuverNode);
    ["maneuverPrograde", "maneuverRadial"].forEach(id => {
        document.getElementById(id)?.addEventListener("input", updateManeuverReadout);
    });

    window.addEventListener("keydown", event => {
        if (event.repeat) return;
        if (event.code === "Space") { event.preventDefault(); stageRocket(); }
        if (["ShiftLeft", "ShiftRight"].includes(event.code)) { event.preventDefault(); controls.throttleUp = true; }
        if (["ControlLeft", "ControlRight"].includes(event.code)) { event.preventDefault(); controls.throttleDown = true; }
        if (event.code === "KeyZ") setThrottle(1);
        if (event.code === "KeyX") setThrottle(0);
        if (event.code === "KeyT") toggleSas();
        if (event.code === "KeyR") toggleRcs();
        if (event.code === "KeyM") toggleMapMode();
        if (event.code === "KeyF") fireInvaderShot();
        if (["KeyA", "ArrowLeft"].includes(event.code)) controls.left = true;
        if (["KeyD", "ArrowRight"].includes(event.code)) controls.right = true;
    });
    window.addEventListener("keyup", event => {
        if (["ShiftLeft", "ShiftRight"].includes(event.code)) controls.throttleUp = false;
        if (["ControlLeft", "ControlRight"].includes(event.code)) controls.throttleDown = false;
        if (["KeyA", "ArrowLeft"].includes(event.code)) controls.left = false;
        if (["KeyD", "ArrowRight"].includes(event.code)) controls.right = false;
    });
}

function setThrottle(value) {
    if (!flightState) return;
    flightState.throttle = Math.max(0, Math.min(1, value));
    const slider = document.getElementById("throttleSlider");
    const fill = document.getElementById("throttleFill");
    if (slider) slider.value = Math.round(flightState.throttle * 100);
    if (fill) fill.style.width = `${Math.round(flightState.throttle * 100)}%`;
}

function activateScience() {
    if (!flightState) return;
    const sciencePart = getEquippedPart("science");
    flightState.scienceActive = true;
    flightState.message = `${sciencePart?.name || "Science-Modul"} aktiv: fliege durch das grüne Symbol, dann Daten sichern.`;
    tryCollectScience();
    renderFlightSystems();
}

function transmitScience() {
    if (!flightState) return;
    if (!flightState.scienceStored) {
        flightState.message = "Noch keine Science-Daten gespeichert. Erst Experiment aktivieren und durch das grüne Symbol fliegen.";
        renderFlightSystems();
        return;
    }
    flightState.scienceTransmitted = true;
    if (flightState.currentStage === 1) flightState.currentStage = 0;
    flightState.message = `Science-Daten gesichert: +${flightState.scienceValue} Forschungswert für diese Mission.`;
    renderFlightSystems();
}

function stageRocket() {
    if (!flightState || flightState.crashed || flightState.completed) resetFlight();
    if (!flightState.launched) {
        igniteFlight();
        return;
    }
    if (flightState.phase === "invaders") {
        fireInvaderShot();
        renderFlightSystems();
        return;
    }
    if (flightState.boosterCharges > 0 && !flightState.boosterActive) {
        flightState.boosterActive = true;
        flightState.boostersAttached = true;
        flightState.boosterFuel = flightState.boosterMaxFuel;
        flightState.lastBoosterPct = 100;
        flightState.boosterEmptyAnnounced = false;
        flightState.boosterCharges -= 1;
        flightState.vy -= 0.32;
        flightState.message = `Booster gezündet. Noch ${flightState.boosterCharges} Booster im Stack.`;
    } else if (flightState.boosterActive) {
        flightState.boosterActive = false;
        flightState.boostersAttached = false;
        flightState.boosterFuel = 0;
        flightState.message = "Booster-Stufe abgeworfen. Die Rakete reagiert leichter.";
    } else if (flightState.currentStage === 2 && flightState.boosterCharges <= 0) {
        flightState.currentStage = 1;
        stageRocket();
        return;
    } else if (flightState.currentStage === 1) {
        if (!flightState.scienceActive) {
            activateScience();
            flightState.message = "Stufe 1: Science-Modul aktiviert. Fliege durch das grüne Symbol.";
        } else if (flightState.scienceStored && !flightState.scienceTransmitted) {
            transmitScience();
        } else if (flightState.scienceTransmitted) {
            flightState.currentStage = 0;
            flightState.message = "Science erledigt. Nächste Stufe ist der Fallschirm.";
        } else {
            flightState.message = "Science-Modul sucht noch Daten. Fliege durch das grüne Symbol.";
        }
    } else if (flightState.currentStage === 0) {
        flightState.parachuteDeployed = true;
        flightState.message = "Stufe 0: Fallschirm ausgefahren. Nicht zu früh und nicht zu schnell!";
        flightState.currentStage = -1;
    } else {
        flightState.currentStage = 1;
        flightState.message = "Keine Booster mehr. Space schaltet jetzt Science.";
    }
    renderFlightSystems();
}

function toggleSas() {
    if (!flightState) return;
    flightState.sas = !flightState.sas;
    if (flightState.sas && flightState.sasMode === "stability") {
        flightState.sasTarget = flightState.angle;
    }
    flightState.message = flightState.sas ? "SAS hält die Ausrichtung." : "SAS ausgeschaltet.";
    renderFlightSystems();
}

function toggleRcs() {
    if (!flightState) return;
    flightState.rcs = !flightState.rcs;
    flightState.message = flightState.rcs ? "RCS aktiv: kleine Korrekturdüsen helfen beim Steuern." : "RCS ausgeschaltet.";
    renderFlightSystems();
}

function toggleMapMode() {
    if (!flightState) return;
    flightState.mapMode = !flightState.mapMode;
    flightState.message = flightState.mapMode ? "Kartenmodus: Flugbahn und Planung werden sichtbar." : "Kartenmodus ausgeschaltet.";
    renderFlightSystems();
}

function setSasMode(mode) {
    if (!flightState) return;
    flightState.sas = true;
    flightState.sasMode = mode;
    if (mode === "stability") flightState.sasTarget = flightState.angle;
    if (mode === "maneuver" && !flightState.maneuverNode) planManeuverNode();
    flightState.message = `SAS-Modus: ${getSasModeLabel(mode)}.`;
    renderFlightSystems();
}

function getSasModeLabel(mode) {
    return {
        stability: "Stabil halten",
        prograde: "Prograde",
        retrograde: "Retrograde",
        maneuver: "Maneuver Node"
    }[mode] || "Stabil halten";
}

function planManeuverNode() {
    if (!flightState) return;
    let { prograde, radial } = getManeuverInputs();
    if (Math.hypot(prograde, radial) < 1) {
        prograde = 18;
        const slider = document.getElementById("maneuverPrograde");
        if (slider) slider.value = prograde;
    }
    flightState.maneuverNode = { prograde, radial };
    flightState.mapMode = true;
    flightState.message = "Maneuver Node geplant. Die blaue Linie zeigt die geplante Änderung.";
    updateManeuverReadout();
    renderFlightSystems();
}

function pointToManeuver() {
    if (!flightState) return;
    if (!flightState.maneuverNode) planManeuverNode();
    flightState.sas = true;
    flightState.sasMode = "maneuver";
    flightState.message = "SAS dreht Richtung Maneuver Node.";
    renderFlightSystems();
}

function clearManeuverNode() {
    if (!flightState) return;
    flightState.maneuverNode = null;
    if (flightState.sasMode === "maneuver") flightState.sasMode = "stability";
    flightState.message = "Maneuver Node gelöscht.";
    updateManeuverReadout();
    renderFlightSystems();
}

function getManeuverInputs() {
    return {
        prograde: Number(document.getElementById("maneuverPrograde")?.value || 0),
        radial: Number(document.getElementById("maneuverRadial")?.value || 0)
    };
}

function updateManeuverReadout() {
    const readout = document.getElementById("maneuverReadout");
    if (!readout) return;
    const node = flightState?.maneuverNode || getManeuverInputs();
    const strength = Math.hypot(node.prograde, node.radial);
    readout.textContent = strength < 1
        ? "Kein Node geplant."
        : `Delta-v ${Math.round(strength)} m/s · Prograde ${node.prograde} · Radial ${node.radial}`;
}

function startAnimationLoop() {
    if (animationId) clearTimeout(animationId);
    lastFrameTime = performance.now();
    const tick = () => {
        const now = performance.now();
        const elapsed = now - lastFrameTime;
        const minFrameMs = flightState?.launched && !flightState.paused ? 34 : 180;
        if (elapsed < minFrameMs) {
            animationId = setTimeout(tick, 16);
            return;
        }
        const dt = Math.min(3, elapsed / 16.67);
        lastFrameTime = now;
        updateFlight(dt);
        drawFlight();
        animationId = setTimeout(tick, 16);
    };
    animationId = setTimeout(tick, 16);
}

function updateFlight(dt) {
    if (!flightState || flightState.paused || flightState.crashed || flightState.completed) return;
    const stats = getRocketStats();
    const mission = getMission();

    if (controls.throttleUp) setThrottle(flightState.throttle + 0.014 * dt);
    if (controls.throttleDown) setThrottle(flightState.throttle - 0.018 * dt);
    if (flightState.invulnerableTimer > 0) flightState.invulnerableTimer = Math.max(0, flightState.invulnerableTimer - dt);

    if (!flightState.launched) return;

    flightState.elapsedSeconds += dt / 60;
    updateJourneyPhase(stats);
    if (flightState.completed) return;
    if (flightState.phase === "invaders") {
        updateInvaderFlight(dt, stats);
        return;
    }

    const altitude = Math.max(0, 585 - flightState.y);
    const manualSteering = controls.left || controls.right;
    const steer = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);
    flightState.vx += steer * (0.055 + stats.control * 0.006) * dt;
    flightState.angle += steer * stats.turnPower * 0.75 * dt;

    if (!manualSteering && stats.autopilot > 0) applyAutopilot(stats, dt);
    if (!manualSteering && flightState.sas) {
        const target = getSasTargetAngle();
        const correction = wrapAngle(target - flightState.angle);
        const maxTurn = stats.turnPower * (0.8 + stats.control * 0.04) * dt;
        flightState.angle += Math.max(-maxTurn, Math.min(maxTurn, correction));
    }
    flightState.angle = Math.max(-1.45, Math.min(1.45, flightState.angle));

    if (flightState.rcs && manualSteering && flightState.fuel > 0) {
        flightState.vx += steer * stats.control * 0.0065 * dt;
        flightState.fuel = Math.max(0, flightState.fuel - 0.018 * dt);
    }

    if (flightState.engineActive && flightState.throttle > 0.001 && flightState.fuel > 0) {
        const power = stats.thrustPower * flightState.throttle * dt;
        flightState.vx += Math.sin(flightState.angle) * power * 1.35;
        flightState.vy -= Math.cos(flightState.angle) * power * 1.35;
        flightState.fuel = Math.max(0, flightState.fuel - Math.max(0.18, stats.fuelEfficiency) * flightState.throttle * dt);
    }

    if (flightState.boosterActive && flightState.boosterFuel > 0) {
        const boosterPower = stats.thrustPower * stats.boosterPower * dt;
        flightState.vx += Math.sin(flightState.angle) * boosterPower * 1.25;
        flightState.vy -= Math.cos(flightState.angle) * boosterPower * 1.25;
        flightState.boosterFuel = Math.max(0, flightState.boosterFuel - 0.8 * dt);
        const boosterPct = Math.round((flightState.boosterFuel / flightState.boosterMaxFuel) * 100);
        if (Math.abs(boosterPct - flightState.lastBoosterPct) >= 10) {
            flightState.lastBoosterPct = boosterPct;
            updateStageStack();
        }
        if (flightState.boosterFuel === 0) {
            flightState.boosterActive = false;
            flightState.boostersAttached = false;
            flightState.message = flightState.boosterCharges > 0
                ? `Booster leer. Noch ${flightState.boosterCharges} Booster bereit.`
                : "Booster leer. Sammle Boost-Kapseln für weitere Stufen.";
            updateStageStack();
        }
    }

    applyCelestialGravity(stats, mission, dt);
    const earthGravity = altitude > VOYAGER_ALTITUDE
        ? 0.014
        : 0.031 + Math.min(0.014, altitude / 120000);
    flightState.vy += earthGravity * dt;
    flightState.vx *= Math.pow(0.988 + stats.control * 0.00035, dt);
    flightState.vy *= Math.pow(0.996, dt);

    const safeSpeed = stats.safeSpeed;
    const currentSpeed = Math.hypot(flightState.vx, flightState.vy);
    if (currentSpeed > safeSpeed * 1.35) {
        const factor = (safeSpeed * 1.35) / currentSpeed;
        flightState.vx *= factor;
        flightState.vy *= factor;
        if (flightState.invulnerableTimer <= 0) {
            flightState.message = "Sehr schnell! Retrograde ausrichten und mit Schub bremsen.";
        }
    }

    flightState.x += flightState.vx * dt * 0.95;
    flightState.y += flightState.vy * dt * 0.95;

    if (flightState.x < 60) flightState.x = 1040;
    if (flightState.x > 1040) flightState.x = 60;

    flightState.maxAlt = Math.max(flightState.maxAlt, Math.round(altitude));
    if (flightState.phase !== "calm") {
        applyObjectInteractions(stats, mission, dt);
        tryCollectScience();
    }

    const nextAltitude = Math.max(0, Math.round(585 - flightState.y));
    if (!getMission().grandTour && !flightState.interstellarReached && nextAltitude >= VOYAGER_ALTITUDE) {
        flightState.interstellarReached = true;
        flightState.message = "Voyager passiert. Hinter dir liegt das Sonnensystem, vor dir ein klarer Sternenhimmel.";
    }
    if (!mission.grandTour && nextAltitude > mission.targetAlt && flightState.collectedItems >= mission.itemGoal) {
        completeMission("Aufstieg geschafft. Ressourcen gesammelt.");
    } else if (!mission.grandTour && nextAltitude > mission.targetAlt && flightState.collectedItems < mission.itemGoal) {
        flightState.message = `Höhe erreicht, aber noch ${mission.itemGoal - flightState.collectedItems} Kapseln fehlen.`;
    }

    if (flightState.y >= 625) {
        if (flightState.maxAlt < 60) {
            flightState.y = 585;
            flightState.vx = 0;
            flightState.vy = 0;
            flightState.message = "Motor läuft. Gib etwas mehr Schub oder nutze einen Booster.";
        } else {
            flightState.crashed = true;
            flightState.message = "Abgestürzt. In Doodle-Orbit musst du Treibstoff sammeln und oben bleiben.";
        }
    }
}

function updateJourneyPhase(stats) {
    const previous = flightState.phase;
    flightState.phase = getJourneyPhase(flightState.elapsedSeconds);
    const nextEvent = getNextRouteEvent(flightState.elapsedSeconds);

    for (const event of ROUTE_TIMELINE) {
        if (flightState.elapsedSeconds >= event.time && !flightState.announcedMilestones[event.id]) {
            flightState.announcedMilestones[event.id] = true;
            flightState.message = event.id === "voyager"
                ? "Voyager zieht vorbei. Jetzt kommt eine ruhige Sternenhimmel-Phase."
                : `${event.name} zieht groß im Hintergrund vorbei.`;
        }
    }

    if (previous !== flightState.phase) {
        if (flightState.phase === "calm") {
            flightState.interstellarReached = true;
            flightState.message = "Hinter Voyager wird es ruhig: keine Hindernisse, nur klarer Sternenhimmel.";
        } else if (flightState.phase === "invaders") {
            flightState.invader = createInvaderState(stats);
            flightState.y = 535;
            flightState.vy = 0;
            flightState.angle = 0;
            flightState.message = "Space-Invaders-Endphase! A/D ausweichen, Space oder F feuert das Geschütz.";
        } else if (flightState.phase === "victory") {
            completeGrandTour("Du hast die Endphase überstanden.");
        }
    } else if (nextEvent && !flightState.gravityHint && Math.round(nextEvent.time - flightState.elapsedSeconds) === 30) {
        flightState.message = `Nächste Begegnung: ${nextEvent.name} in etwa 30 Sekunden.`;
    }
}

function getJourneyPhase(seconds) {
    if (seconds >= INVADER_END_TIME) return "victory";
    if (seconds >= INVADER_START_TIME) return "invaders";
    if (seconds >= VOYAGER_PASS_TIME) return "calm";
    return "cruise";
}

function getNextRouteEvent(seconds) {
    return ROUTE_TIMELINE.find(event => event.time > seconds) || null;
}

function getCurrentRouteEvent(seconds = flightState?.elapsedSeconds || 0, windowSeconds = 52) {
    return ROUTE_TIMELINE
        .map(event => ({ ...event, delta: seconds - event.time }))
        .filter(event => Math.abs(event.delta) <= windowSeconds)
        .sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta))[0] || null;
}

function getPhaseLabel(phase) {
    return ({
        cruise: "Sonnensystem-Reise",
        calm: "Ruhige Sternenphase",
        invaders: "Space-Invaders-Endphase",
        victory: "Goldene Rakete"
    })[phase] || "Start";
}

function formatTime(seconds) {
    const value = Math.max(0, Math.round(seconds || 0));
    const minutes = Math.floor(value / 60);
    const rest = value % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function applyCelestialGravity(stats, mission, dt) {
    if (!flightState?.launched) return;
    const event = getCurrentRouteEvent(flightState.elapsedSeconds, 42);
    if (event && event.gravity && flightState.phase === "cruise") {
        const phase = event.delta / 42;
        const falloff = Math.max(0, 1 - Math.abs(phase));
        const horizontalPull = Math.max(-1, Math.min(1, (event.x - flightState.x) / 520));
        const beforePass = event.delta < 0;
        const pull = event.gravity * falloff;
        flightState.vx += horizontalPull * pull * 0.035 * dt;
        flightState.vy += (beforePass ? -1 : 1) * pull * 0.025 * dt;
        flightState.gravityBody = event.name;
        flightState.gravityStrength = pull;
        flightState.gravityHint = `${event.name} · ${beforePass ? "Anflug: schneller" : "Vorbeiflug: bremst"}`;
    } else {
        flightState.gravityBody = null;
        flightState.gravityStrength = 0;
        flightState.gravityHint = "";
    }
}

function updateInvaderFlight(dt, stats) {
    const seconds = dt / 60;
    const invader = flightState.invader;
    const steer = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);
    flightState.vx += steer * (0.16 + stats.control * 0.018) * dt;
    flightState.vx *= Math.pow(0.86, dt);
    flightState.x = Math.max(70, Math.min(1030, flightState.x + flightState.vx * dt));
    flightState.y += (535 - flightState.y) * 0.08 * dt;
    flightState.angle = Math.max(-0.55, Math.min(0.55, flightState.vx * 0.08));
    flightState.fuel = Math.min(stats.maxFuel, flightState.fuel + 0.05 * dt);

    invader.weaponLevel = stats.weapon;
    invader.shotCooldown = Math.max(0, invader.shotCooldown - seconds);
    invader.enemySpawnCooldown -= seconds;
    if (invader.enemySpawnCooldown <= 0) {
        spawnInvader();
        const elapsedInPhase = Math.max(0, flightState.elapsedSeconds - INVADER_START_TIME);
        invader.enemySpawnCooldown = Math.max(0.55, 2.25 - elapsedInPhase / 230 - invader.weaponLevel * 0.06);
    }
    if (invader.weaponLevel >= 5 && invader.shotCooldown <= 0) fireInvaderShot(true);

    updateInvaderObjects(seconds);

    if (invader.hull <= 0) {
        flightState.crashed = true;
        flightState.message = "Endphase verloren. Das Geschütz braucht bessere Ausrüstung oder ruhigere Steuerung.";
        renderFlightSystems();
        return;
    }
    if (flightState.elapsedSeconds >= INVADER_END_TIME) {
        completeGrandTour("Space-Invaders-Endphase geschafft.");
    }
}

function spawnInvader() {
    const invader = flightState.invader;
    const wave = Math.max(1, Math.floor((flightState.elapsedSeconds - INVADER_START_TIME) / 75) + 1);
    invader.wave = wave;
    const id = `inv-${Math.round(flightState.elapsedSeconds * 100)}-${invader.enemies.length}`;
    const x = 95 + seededNoise(id) * 910;
    invader.enemies.push({
        id,
        x,
        y: -54,
        vx: (seededNoise(`${id}-vx`) - 0.5) * (30 + wave * 4),
        speed: 34 + wave * 4 + seededNoise(`${id}-speed`) * 26,
        hp: 1 + Math.floor(wave / 3),
        radius: 21 + Math.min(9, wave),
        fireCooldown: 1.4 + seededNoise(`${id}-fire`) * 2.6,
        phase: seededNoise(`${id}-phase`) * Math.PI * 2
    });
}

function fireInvaderShot(auto = false) {
    if (!flightState || flightState.phase !== "invaders" || flightState.crashed || flightState.completed) return;
    const invader = flightState.invader;
    const stats = getRocketStats();
    if (invader.shotCooldown > 0) return;
    const level = stats.weapon;
    const spread = level >= 4 ? [-0.24, 0, 0.24] : level >= 2 ? [-0.13, 0.13] : [0];
    spread.forEach(offset => {
        invader.shots.push({
            x: flightState.x,
            y: flightState.y - 54,
            dx: Math.sin(flightState.angle + offset) * 165,
            dy: -420 - level * 22,
            damage: level >= 3 ? 2 : 1,
            life: 1.45
        });
    });
    invader.shotCooldown = Math.max(0.12, stats.weaponCooldown / 60);
    if (!auto) flightState.message = `Geschütz feuert Stufe ${level}.`;
}

function updateInvaderObjects(seconds) {
    const invader = flightState.invader;
    invader.shots.forEach(shot => {
        shot.x += shot.dx * seconds;
        shot.y += shot.dy * seconds;
        shot.life -= seconds;
    });
    invader.enemyShots.forEach(shot => {
        shot.x += shot.dx * seconds;
        shot.y += shot.dy * seconds;
        shot.life -= seconds;
    });
    invader.enemies.forEach(enemy => {
        enemy.x += Math.sin(flightState.elapsedSeconds * 2.1 + enemy.phase) * 18 * seconds + enemy.vx * seconds;
        enemy.y += enemy.speed * seconds;
        enemy.fireCooldown -= seconds;
        if (enemy.fireCooldown <= 0) {
            invader.enemyShots.push({
                x: enemy.x,
                y: enemy.y + enemy.radius,
                dx: (flightState.x - enemy.x) * 0.32,
                dy: 160 + invader.wave * 10,
                life: 3
            });
            enemy.fireCooldown = Math.max(0.9, 2.8 - invader.wave * 0.12);
        }
    });

    for (const shot of invader.shots) {
        for (const enemy of invader.enemies) {
            if (enemy.dead || shot.dead) continue;
            if (distance(shot.x, shot.y, enemy.x, enemy.y) < enemy.radius + 7) {
                enemy.hp -= shot.damage;
                shot.dead = true;
                if (enemy.hp <= 0) {
                    enemy.dead = true;
                    invader.score += 10 + invader.wave;
                }
            }
        }
    }

    for (const enemy of invader.enemies) {
        if (enemy.dead) continue;
        if (enemy.y > 640 || distance(enemy.x, enemy.y, flightState.x, flightState.y) < enemy.radius + 28) {
            enemy.dead = true;
            invader.hull -= 1;
            flightState.invulnerableTimer = 30;
            flightState.message = `Treffer in der Endphase! Hülle: ${invader.hull}.`;
        }
    }

    for (const shot of invader.enemyShots) {
        if (shot.dead) continue;
        if (distance(shot.x, shot.y, flightState.x, flightState.y) < 28) {
            shot.dead = true;
            invader.hull -= 1;
            flightState.invulnerableTimer = 30;
            flightState.message = `Laser getroffen! Hülle: ${invader.hull}.`;
        }
    }

    invader.shots = invader.shots.filter(shot => !shot.dead && shot.life > 0 && shot.y > -90 && shot.x > -90 && shot.x < 1190);
    invader.enemyShots = invader.enemyShots.filter(shot => !shot.dead && shot.life > 0 && shot.y < 720 && shot.x > -90 && shot.x < 1190);
    invader.enemies = invader.enemies.filter(enemy => !enemy.dead && enemy.y < 710);
}

function completeGrandTour(message) {
    if (!flightState || flightState.completed) return;
    const mission = getMission();
    const alreadyDone = Boolean(programState.missionLog[mission.id]);
    const invaderScore = flightState.invader?.score || 0;
    const scienceBonus = flightState.scienceTransmitted ? flightState.scienceValue : Math.floor(flightState.scienceValue * 0.5);
    const earned = alreadyDone ? 0 : mission.points + scienceBonus + Math.floor(invaderScore / 4);
    programState.missionLog[mission.id] = {
        at: Date.now(),
        maxAlt: flightState.maxAlt,
        rocket: programState.model,
        science: scienceBonus,
        items: flightState.collectedItems,
        invaders: invaderScore,
        points: earned,
        goldenRocket: true
    };
    awardGoldenRocket();
    if (earned > 0) setPoints(getPoints() + earned);
    flightState.completed = true;
    flightState.phase = "victory";
    flightState.message = `${message} Goldene Rakete freigeschaltet${earned ? `, +${earned} Punkte.` : "."}`;
    saveProgramState();
    renderMissionOptions();
    renderMission();
    renderMissionJournal();
    renderRocketPanels();
    renderWorkshop();
    renderShop();
    renderSolarMap();
    renderFlightSystems();
}

function awardGoldenRocket() {
    programState.goldenRocket = true;
    if (!programState.owned.includes("paint_gold")) programState.owned.push("paint_gold");
    programState.equipped.paint = "paint_gold";
}

function applyAutopilot(stats, dt) {
    const candidate = getNearestUsefulObject();
    if (!candidate) return;
    const dx = candidate.x - flightState.x;
    const verticalGap = Math.abs(candidate.y - flightState.y);
    if (candidate.type === "hazard" && verticalGap < 130) {
        flightState.vx -= Math.sign(dx || 1) * stats.autopilot * 0.035 * dt;
        return;
    }
    if (candidate.type !== "hazard" && verticalGap < 260) {
        flightState.vx += Math.sign(dx || 0) * stats.autopilot * 0.024 * dt;
    }
}

function getNearestUsefulObject() {
    if (!flightState?.objects) return null;
    let nearest = null;
    let best = Infinity;
    for (const object of flightState.objects) {
        if (object.taken) continue;
        const dy = object.y - flightState.y;
        if (dy > 90 || dy < -320) continue;
        const score = Math.abs(dy) + Math.abs(object.x - flightState.x) * (object.type === "hazard" ? 0.7 : 1);
        if (score < best) {
            nearest = object;
            best = score;
        }
    }
    return nearest;
}

function applyObjectInteractions(stats, mission, dt) {
    if (!flightState?.objects) return;
    for (const object of flightState.objects) {
        if (object.taken) continue;
        if (object.type !== "hazard" && object.type !== "finish") {
            const dx = object.x - flightState.x;
            const dy = object.y - flightState.y;
            const distanceToObject = Math.hypot(dx, dy);
            if (distanceToObject < stats.magnetRange && distanceToObject > 4) {
                const pull = (1 - distanceToObject / stats.magnetRange) * 0.11 * dt;
                object.x -= dx * pull;
                object.y -= dy * pull;
                flightState.magnetPulse = 1;
            }
        }

        const hitRadius = object.radius + (object.type === "hazard" ? 20 : 24);
        if (distance(flightState.x, flightState.y, object.x, object.y) > hitRadius) continue;
        if (object.type === "hazard") {
            hitObstacle(object, stats);
        } else if (object.type === "finish") {
            if (flightState.collectedItems >= mission.itemGoal) {
                completeMission("Zieltor erreicht.");
                return;
            }
        } else {
            collectPickup(object, stats);
        }
    }
    if (flightState.magnetPulse > 0) flightState.magnetPulse = Math.max(0, flightState.magnetPulse - 0.05 * dt);
}

function collectPickup(object, stats) {
    object.taken = true;
    flightState.collectedItems += 1;
    if (object.type === "fuel") {
        const gained = object.value;
        flightState.fuel = Math.min(stats.maxFuel, flightState.fuel + gained);
        flightState.fuelCells += 1;
        flightState.message = `Treibstoffzelle +${Math.round(gained)} gesammelt.`;
    } else if (object.type === "boost") {
        flightState.boosterCharges += object.value;
        flightState.boostCells += 1;
        flightState.message = `Booster-Kapsel gesammelt. Booster im Stack: ${flightState.boosterCharges}.`;
    } else if (object.type === "shield") {
        flightState.shields += 1;
        flightState.message = `Schildladung gesammelt. Schild: ${flightState.shields}.`;
    } else if (object.type === "science") {
        flightState.collected = true;
        flightState.scienceStored = true;
        flightState.scienceValue += Math.max(1, Math.round(stats.science * 2.5));
        flightState.message = flightState.scienceActive
            ? `Science-Daten gesammelt. Datenwert: ${flightState.scienceValue}.`
            : "Science-Kapsel eingesammelt. Aktiviere das Experiment, um mehr daraus zu machen.";
    }
    renderFlightSystems();
}

function hitObstacle(object, stats) {
    if (flightState.invulnerableTimer > 0) return;
    if (flightState.shields > 0) {
        flightState.shields -= 1;
        flightState.invulnerableTimer = 42;
        flightState.vx += (flightState.x < object.x ? -1 : 1) * 1.25;
        flightState.vy += 0.45;
        flightState.message = "Asteroid getroffen, Schild hat gehalten.";
        renderFlightSystems();
        return;
    }
    flightState.hitCount += 1;
    flightState.invulnerableTimer = 54;
    flightState.fuel = Math.max(0, flightState.fuel - 18);
    flightState.vx += (flightState.x < object.x ? -1 : 1) * 1.7;
    flightState.vy += 0.8;
    flightState.message = `Asteroid getroffen! Treibstoff verloren (${flightState.hitCount}/3).`;
    if (flightState.hitCount >= 3 || (flightState.fuel <= 0 && flightState.maxAlt > 150)) {
        flightState.crashed = true;
        flightState.message = "Rakete beschädigt. Mission neu versuchen und langsamer/retrograde bremsen.";
    }
    renderFlightSystems();
}

function getScienceTarget(mission = getMission()) {
    return {
        x: 540 + Math.sin(mission.targetAlt * 0.02) * 170,
        y: 585 - mission.targetAlt
    };
}

function tryCollectScience() {
    if (!flightState || flightState.scienceStored || !flightState.scienceActive) return;
    const target = flightState.objects.find(object => !object.taken && object.type === "science");
    if (!target) return;
    const stats = getRocketStats();
    const radius = 34 + stats.science * 3.2;
    if (distance(flightState.x, flightState.y, target.x, target.y) >= radius) return;
    collectPickup(target, stats);
}

function renderFlightSystems() {
    if (!flightState) return;
    setThrottle(flightState.throttle || 0);

    const btnSas = document.getElementById("btnSas");
    const btnRcs = document.getElementById("btnRcs");
    const btnMap = document.getElementById("btnMapMode");
    if (btnSas) {
        btnSas.textContent = flightState.sas ? `SAS: ${getSasModeLabel(flightState.sasMode)}` : "SAS: aus";
        btnSas.classList.toggle("active", flightState.sas);
    }
    if (btnRcs) {
        btnRcs.textContent = flightState.rcs ? "RCS: an" : "RCS: aus";
        btnRcs.classList.toggle("active", flightState.rcs);
    }
    if (btnMap) {
        btnMap.textContent = flightState.mapMode ? "Karte: an" : "Karte: aus";
        btnMap.classList.toggle("active", flightState.mapMode);
    }
    document.querySelectorAll("[data-sas-mode]").forEach(button => {
        button.classList.toggle("active", flightState.sas && button.dataset.sasMode === flightState.sasMode);
    });

    updateStageStack();
    updateSciencePanel();
    updateManeuverReadout();
    updateFlightReadouts(true);
}

function updateSciencePanel() {
    const status = document.getElementById("scienceStatus");
    if (!status || !flightState) return;
    if (flightState.phase === "invaders") {
        const weapon = getEquippedPart("weapon");
        status.innerHTML = `
            <strong>${escapeHtml(weapon?.name || "Geschütz")}</strong>
            <span>Endphase aktiv</span>
            <small>Space oder F feuert. Fortschritt in den Fächern erhöht die Geschützstufe.</small>
        `;
        return;
    }
    const sciencePart = getEquippedPart("science");
    const name = sciencePart?.name || "Science-Modul";
    const stateText = !flightState.scienceActive
        ? "nicht aktiv"
        : flightState.scienceStored
            ? flightState.scienceTransmitted ? "Daten gesichert" : "Probe gespeichert"
            : "scannt Umgebung";
    status.innerHTML = `
        <strong>${escapeHtml(name)}</strong>
        <span>${escapeHtml(stateText)}</span>
        <small>${flightState.scienceStored ? `${flightState.scienceValue} Forschungswert` : "Aktivieren, durch das grüne Symbol fliegen, dann Daten sichern."}</small>
    `;
    const activateButton = document.getElementById("btnScienceActivate");
    const transmitButton = document.getElementById("btnTransmitScience");
    if (activateButton) {
        activateButton.textContent = flightState.scienceActive ? "Experiment aktiv" : "Experiment aktivieren";
        activateButton.disabled = flightState.scienceActive;
        activateButton.classList.toggle("active", flightState.scienceActive);
    }
    if (transmitButton) {
        transmitButton.disabled = !flightState.scienceStored || flightState.scienceTransmitted;
        transmitButton.classList.toggle("active", flightState.scienceTransmitted);
    }
}

function updateFlightReadouts(force = false) {
    if (!flightState) return;
    const now = performance.now();
    if (!force && now - lastUiRenderTime < 120) return;
    lastUiRenderTime = now;
    renderNavball();
    const altitude = Math.max(0, Math.round(585 - flightState.y));
    const speed = Math.hypot(flightState.vx, flightState.vy).toFixed(1);
    const stats = getRocketStats();
    const fuelPct = Math.round((flightState.fuel / stats.maxFuel) * 100);
    const mission = getMission();
    const nextRouteEvent = getNextRouteEvent(flightState.elapsedSeconds);
    const phaseLabel = getPhaseLabel(flightState.phase);
    const hud = document.getElementById("flightHud");
    if (hud) {
        const chips = [
            `Zeit ${formatTime(flightState.elapsedSeconds)}`,
            phaseLabel,
            nextRouteEvent ? `Nächstes Ziel: ${nextRouteEvent.name} (${formatTime(nextRouteEvent.time - flightState.elapsedSeconds)})` : "",
            `Tempo ${speed}`,
            `Schub ${Math.round(flightState.throttle * 100)}%`,
            `Treibstoff ${fuelPct}%`,
            flightState.phase === "invaders" ? `Welle ${flightState.invader.wave}` : `Kapseln ${flightState.collectedItems}/${mission.itemGoal}`,
            flightState.phase === "invaders" ? `Geschütz ${stats.weapon}` : "",
            flightState.phase === "invaders" ? `Hülle ${flightState.invader.hull}` : "",
            flightState.phase === "invaders" ? `Endphase ${formatTime(Math.max(0, INVADER_END_TIME - flightState.elapsedSeconds))}` : "",
            `Booster ${flightState.boosterCharges}${flightState.boosterActive ? " aktiv" : ""}`,
            flightState.gravityHint,
            flightState.shields > 0 ? `Schild ${flightState.shields}` : "",
            flightState.sas ? `SAS ${getSasModeLabel(flightState.sasMode)}` : "",
            flightState.rcs ? "RCS an" : "",
            Number(speed) > stats.safeSpeed ? "Tempo rot: retrograde bremsen" : "",
            flightState.scienceTransmitted ? "Science gesichert" : flightState.scienceStored ? "Science gespeichert" : flightState.scienceActive ? "Science aktiv" : "",
            flightState.message
        ].filter(Boolean);
        hud.innerHTML = chips.map(text => `<span class="hud-chip">${escapeHtml(text)}</span>`).join("");
    }
}

function updateStageStack() {
    const stageStack = document.getElementById("stageStack");
    if (!stageStack || !flightState) return;
    if (flightState.phase === "invaders") {
        const stats = getRocketStats();
        stageStack.innerHTML = `
            <div class="stage-card active">
                <strong>G</strong>
                <span>GeschÃ¼tz<small>Stufe ${stats.weapon} Â· Space/F feuert</small></span>
            </div>
            <div class="stage-card">
                <strong>${flightState.invader.hull}</strong>
                <span>HÃ¼lle<small>${flightState.invader.score} Punkte in der Endphase</small></span>
            </div>
        `;
        return;
    }
    const boosterPct = flightState.boosterMaxFuel
        ? Math.round((flightState.boosterFuel / flightState.boosterMaxFuel) * 100)
        : 0;
    const stages = [
        { id: 3, name: "Motor", detail: flightState.engineActive ? `${Math.round(flightState.throttle * 100)}% Schub` : "Start zündet Motor" },
        { id: 2, name: "Booster", detail: flightState.boosterActive ? `${boosterPct}% · brennt` : `${flightState.boosterCharges} bereit` },
        { id: 1, name: "Science", detail: flightState.scienceTransmitted ? "Daten gesichert" : flightState.scienceStored ? "Daten sichern" : flightState.scienceActive ? "scannt" : "Experiment aktivieren" },
        { id: 0, name: "Schild", detail: `${flightState.shields} Ladung${flightState.shields === 1 ? "" : "en"}` }
    ];
    stageStack.innerHTML = stages.map(stage => {
        const done = stage.id > flightState.currentStage;
        const active = stage.id === flightState.currentStage;
        return `
            <div class="stage-card ${active ? "active" : ""} ${done ? "done" : ""}">
                <strong>${stage.id}</strong>
                <span>${escapeHtml(stage.name)}<small>${escapeHtml(stage.detail)}</small></span>
            </div>
        `;
    }).join("");
}

function renderNavball() {
    const navball = document.getElementById("navball");
    if (!navball || !flightState) return;
    const horizon = document.getElementById("navballHorizon");
    if (horizon) {
        horizon.style.setProperty("--bank", `${-flightState.angle}rad`);
        horizon.style.setProperty("--pitch", `${Math.sin(flightState.angle) * 18}px`);
    }

    placeNavballMarker("progradeMarker", getProgradeAngle(), 46);
    placeNavballMarker("retrogradeMarker", wrapAngle(getProgradeAngle() + Math.PI), 46);
    const maneuverMarker = document.getElementById("maneuverMarker");
    if (maneuverMarker) {
        maneuverMarker.classList.toggle("visible", Boolean(flightState.maneuverNode));
        if (flightState.maneuverNode) placeNavballMarker("maneuverMarker", getManeuverAngle(), 38);
    }

    const readout = document.getElementById("navballReadout");
    if (readout) {
        const pitch = Math.round(90 - Math.abs(flightState.angle * 180 / Math.PI));
        readout.textContent = `Pitch ${pitch}° · Prograde ${Math.round(getProgradeAngle() * 180 / Math.PI)}°`;
    }
}

function placeNavballMarker(id, absoluteAngle, radius) {
    const marker = document.getElementById(id);
    if (!marker) return;
    const relative = wrapAngle(absoluteAngle - flightState.angle);
    marker.style.left = `${50 + Math.sin(relative) * radius}%`;
    marker.style.top = `${50 - Math.cos(relative) * radius}%`;
}

function getProgradeAngle() {
    if (!flightState || Math.hypot(flightState.vx, flightState.vy) < 0.08) return flightState?.angle || 0;
    return wrapAngle(Math.atan2(flightState.vx, -flightState.vy));
}

function getSasTargetAngle() {
    if (!flightState) return 0;
    if (flightState.sasMode === "prograde") return getProgradeAngle();
    if (flightState.sasMode === "retrograde") return wrapAngle(getProgradeAngle() + Math.PI);
    if (flightState.sasMode === "maneuver" && flightState.maneuverNode) return getManeuverAngle();
    return flightState.sasTarget;
}

function getManeuverAngle() {
    if (!flightState?.maneuverNode) return flightState?.angle || 0;
    const base = getProgradeAngle();
    const prograde = flightState.maneuverNode.prograde;
    const radial = flightState.maneuverNode.radial;
    const vx = Math.sin(base) * prograde + Math.cos(base) * radial;
    const vy = -Math.cos(base) * prograde + Math.sin(base) * radial;
    if (Math.hypot(vx, vy) < 0.5) return base;
    return wrapAngle(Math.atan2(vx, -vy));
}

function wrapAngle(angle) {
    let next = angle;
    while (next > Math.PI) next -= Math.PI * 2;
    while (next < -Math.PI) next += Math.PI * 2;
    return next;
}

function completeMission(message) {
    const mission = getMission();
    const alreadyDone = Boolean(programState.missionLog[mission.id]);
    const scienceBonus = flightState.scienceTransmitted ? flightState.scienceValue : Math.floor(flightState.scienceValue * 0.5);
    const earned = alreadyDone ? 0 : mission.points + scienceBonus;
    programState.missionLog[mission.id] = {
        at: Date.now(),
        maxAlt: flightState.maxAlt,
        rocket: programState.model,
        science: scienceBonus,
        items: flightState.collectedItems,
        points: earned
    };
    if (earned > 0) setPoints(getPoints() + earned);
    const next = getNextMission(mission.id);
    if (next) {
        programState.selectedMission = next.id;
        saveProgramState();
        renderMissionOptions();
        renderMission();
        renderMissionJournal();
        renderSolarMap();
        resetFlight();
        flightState.message = `${message} +${earned} Punkte. Nächste Mission: ${next.name}.`;
        renderFlightSystems();
        return;
    }
    flightState.completed = true;
    flightState.message = `${message}${earned ? ` +${earned} Punkte.` : ""} Alle Missionen im Journal geschafft.`;
    saveProgramState();
    renderMissionOptions();
    renderMission();
    renderMissionJournal();
    renderSolarMap();
    renderFlightSystems();
}

function drawFlight() {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas || !flightState) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const mission = getMission();
    const altitude = Math.max(0, 585 - flightState.y);
    const interstellar = flightState.phase === "calm" || flightState.phase === "invaders" || flightState.phase === "victory" || flightState.elapsedSeconds >= VOYAGER_PASS_TIME;

    ctx.clearRect(0, 0, w, h);
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    if (interstellar) {
        sky.addColorStop(0, "#01020a");
        sky.addColorStop(0.58, "#02030d");
        sky.addColorStop(1, "#050716");
    } else {
        sky.addColorStop(0, "#020617");
        sky.addColorStop(0.62, altitude > 4200 ? "#071525" : "#0f2a4a");
        sky.addColorStop(1, altitude > 4200 ? "#0b1828" : "#12324f");
    }
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const cameraY = Math.min(0, flightState.y - 420);
    drawStars(ctx, w, h, cameraY, interstellar);
    drawTimedRouteBackdrop(ctx, w, h, interstellar);
    if (!mission.grandTour) drawTargetLines(ctx, mission, cameraY);
    if (flightState.phase !== "invaders") drawGround(ctx, w, h, cameraY);
    if (flightState.phase !== "calm" && flightState.phase !== "invaders") drawFlightObjects(ctx, cameraY);
    if (flightState.phase === "invaders") drawInvaderField(ctx);
    if (flightState.phase !== "invaders" && (flightState.mapMode || flightState.maneuverNode)) drawProjectedTrajectory(ctx, cameraY);
    if (flightState.parachuteDeployed) drawParachute(ctx, flightState.x, flightState.y - cameraY, flightState.chuteDamaged);
    drawRocketCanvas(
        ctx,
        flightState.x,
        flightState.y - cameraY,
        flightState.angle,
        flightState.engineActive && flightState.throttle > 0.02 && flightState.fuel > 0,
        { boostersAttached: flightState.boostersAttached, boosterActive: flightState.boosterActive && flightState.boosterFuel > 0 }
    );

    updateFlightReadouts();
}

function drawStars(ctx, w, h, cameraY, clearSky = false) {
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const count = clearSky ? 180 : 110;
    const band = clearSky ? 2100 : 1400;
    const drift = clearSky ? 0.28 : 0.18;
    for (let i = 0; i < count; i++) {
        const x = (i * 97 + (i % 11) * 23) % w;
        const y = ((i * 157) % band) - band * 0.55 - cameraY * drift;
        const yy = ((y % (h + 320)) + h + 320) % (h + 320) - 160;
        ctx.globalAlpha = clearSky ? 0.45 + (i % 7) * 0.08 : 0.25 + (i % 5) * 0.13;
        ctx.beginPath();
        ctx.arc(x, yy, clearSky ? (i % 4) * 0.45 + 0.75 : (i % 3) + 0.7, 0, Math.PI * 2);
        ctx.fill();
    }
    if (clearSky) {
        ctx.strokeStyle = "rgba(255,255,255,0.16)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 18; i++) {
            const x = (i * 211) % w;
            const y = ((i * 331 - cameraY * 0.22) % (h + 420) + h + 420) % (h + 420) - 210;
            ctx.beginPath();
            ctx.moveTo(x - 6, y);
            ctx.lineTo(x + 6, y);
            ctx.moveTo(x, y - 6);
            ctx.lineTo(x, y + 6);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
}

function drawTimedRouteBackdrop(ctx, w, h, interstellar) {
    const seconds = flightState.elapsedSeconds || 0;
    const event = getCurrentRouteEvent(seconds, 58);
    if (event) {
        const progress = (event.delta + 58) / 116;
        const y = -event.radius * 0.55 + progress * (h + event.radius * 1.1);
        if (event.type === "satellites") {
            drawBackgroundSatellites(ctx, event, y, progress);
        } else if (event.type === "belt") {
            drawBackgroundBelt(ctx, event, y, progress);
        } else if (event.type === "voyager") {
            drawBackgroundVoyager(ctx, event, y, progress);
        } else {
            drawBackgroundPlanet(ctx, event, y, progress);
        }
        drawBackdropCaption(ctx, event, progress);
    }

    if (interstellar && flightState.phase === "calm") {
        ctx.save();
        ctx.fillStyle = "rgba(226, 232, 240, 0.78)";
        ctx.font = "900 20px Segoe UI";
        ctx.fillText("Ruhige Phase nach Voyager: Sternenhimmel, auftanken, durchatmen.", 28, 98);
        ctx.restore();
    }
    if (flightState.phase === "invaders") {
        ctx.save();
        ctx.fillStyle = "rgba(251, 191, 36, 0.86)";
        ctx.font = "900 18px Segoe UI";
        ctx.fillText("Space-Invaders-Endphase: Space/F feuert, 10 Minuten überstehen.", 28, 98);
        ctx.restore();
    }
}

function drawBackgroundPlanet(ctx, event, y, progress) {
    ctx.save();
    const x = event.x + Math.sin(progress * Math.PI * 2) * 34;
    ctx.globalAlpha = 0.42;
    ctx.shadowColor = event.color;
    ctx.shadowBlur = 60;
    const gradient = ctx.createRadialGradient(x - event.radius * 0.35, y - event.radius * 0.35, event.radius * 0.05, x, y, event.radius);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.18, event.color);
    gradient.addColorStop(1, event.accent || event.color);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, event.radius, 0, Math.PI * 2);
    ctx.fill();

    if (event.bands) {
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = "#7c2d12";
        ctx.lineWidth = 18;
        for (let offset = -100; offset <= 110; offset += 48) {
            ctx.beginPath();
            ctx.ellipse(x, y + offset, event.radius * 0.85, 16, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    if (event.rings) {
        ctx.globalAlpha = 0.36;
        ctx.strokeStyle = "#fde68a";
        ctx.lineWidth = 22;
        ctx.beginPath();
        ctx.ellipse(x, y, event.radius * 1.9, event.radius * 0.42, -0.16, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
}

function drawBackgroundSatellites(ctx, event, y, progress) {
    ctx.save();
    ctx.globalAlpha = 0.62;
    for (let i = 0; i < 5; i++) {
        const x = 170 + i * 190 + Math.sin(progress * Math.PI * 2 + i) * 35;
        const yy = y + Math.sin(i * 1.7) * 70;
        ctx.translate(x, yy);
        ctx.rotate(-0.25 + i * 0.08);
        ctx.fillStyle = "#cbd5e1";
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2;
        ctx.fillRect(-16, -10, 32, 20);
        ctx.strokeRect(-16, -10, 32, 20);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(-58, -7, 34, 14);
        ctx.fillRect(24, -7, 34, 14);
        ctx.strokeRect(-58, -7, 34, 14);
        ctx.strokeRect(24, -7, 34, 14);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.restore();
}

function drawBackgroundBelt(ctx, event, y, progress) {
    ctx.save();
    ctx.globalAlpha = 0.36;
    for (let i = 0; i < 90; i++) {
        const x = (i * 83 + progress * 240) % 1180 - 40;
        const yy = y + Math.sin(i * 2.1) * event.radius * 0.62;
        const r = 3 + (i % 7);
        ctx.fillStyle = i % 4 === 0 ? "#cbd5e1" : "#64748b";
        ctx.beginPath();
        ctx.arc(x, yy, r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawBackgroundVoyager(ctx, event, y, progress) {
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.translate(event.x + Math.sin(progress * Math.PI * 2) * 80, y);
    ctx.scale(2.2, 2.2);
    ctx.strokeStyle = "#e2e8f0";
    ctx.fillStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-38, -18);
    ctx.lineTo(-10, -5);
    ctx.moveTo(-38, 18);
    ctx.lineTo(-10, 5);
    ctx.moveTo(12, 0);
    ctx.lineTo(50, -28);
    ctx.moveTo(12, 0);
    ctx.lineTo(52, 24);
    ctx.stroke();
    ctx.restore();
}

function drawBackdropCaption(ctx, event, progress) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI) * 1.2);
    ctx.fillStyle = "rgba(2, 6, 23, 0.56)";
    ctx.beginPath();
    ctx.roundRect(28, 122, 330, 62, 16);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.font = "900 22px Segoe UI";
    ctx.fillText(event.name, 48, 150);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "800 13px Segoe UI";
    ctx.fillText(event.note || "", 48, 170);
    ctx.restore();
}

function drawSolarRoute(ctx, cameraY, mission, interstellar) {
    const visibleBodies = CELESTIAL_BODIES.filter(body => {
        const y = 585 - body.altitude - cameraY;
        return y > -260 && y < 920;
    });
    if (!visibleBodies.length) return;

    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 12]);
    ctx.strokeStyle = interstellar ? "rgba(148, 163, 184, 0.24)" : "rgba(125, 211, 252, 0.26)";
    ctx.beginPath();
    visibleBodies.forEach((body, index) => {
        const y = 585 - body.altitude - cameraY;
        if (index === 0) ctx.moveTo(body.x, y);
        else ctx.lineTo(body.x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    for (const body of visibleBodies) {
        drawGravityField(ctx, body, cameraY);
        drawCelestialBody(ctx, body, cameraY, mission.body === body.id);
    }

    if (interstellar) {
        ctx.fillStyle = "rgba(226, 232, 240, 0.84)";
        ctx.font = "900 18px Segoe UI";
        ctx.fillText("Interstellarer Raum: kaum Planetenlicht, klarer Sternenhimmel", 28, 92);
    }
    ctx.restore();
}

function drawGravityField(ctx, body, cameraY) {
    if (!body.influence) return;
    const y = 585 - body.altitude - cameraY;
    const isActive = flightState.gravityBody === body.name;
    ctx.save();
    ctx.globalAlpha = isActive ? 0.42 : 0.18;
    ctx.strokeStyle = isActive ? "#fbbf24" : body.color;
    ctx.lineWidth = isActive ? 3 : 1.5;
    ctx.setLineDash([8, 9]);
    ctx.beginPath();
    ctx.arc(body.x, y, body.influence, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
}

function drawCelestialBody(ctx, body, cameraY, isTarget) {
    const y = 585 - body.altitude - cameraY;
    if (body.belt) {
        drawKuiperBelt(ctx, body, y, isTarget);
        return;
    }
    if (body.voyager) {
        drawVoyagerProbe(ctx, body, y, isTarget);
        return;
    }

    ctx.save();
    ctx.shadowColor = body.color;
    ctx.shadowBlur = isTarget ? 30 : 18;
    const gradient = ctx.createRadialGradient(body.x - body.radius * 0.32, y - body.radius * 0.38, body.radius * 0.08, body.x, y, body.radius);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.18, body.color);
    gradient.addColorStop(1, body.accent || body.color);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(body.x, y, body.radius, 0, Math.PI * 2);
    ctx.fill();

    if (body.id === "earth") {
        ctx.fillStyle = "rgba(34, 197, 94, 0.78)";
        ctx.beginPath();
        ctx.ellipse(body.x - 26, y - 16, 26, 15, -0.25, 0, Math.PI * 2);
        ctx.ellipse(body.x + 30, y + 18, 30, 17, 0.35, 0, Math.PI * 2);
        ctx.fill();
    }

    if (body.id === "jupiter") {
        ctx.strokeStyle = "rgba(124, 45, 18, 0.62)";
        ctx.lineWidth = 8;
        for (let offset = -38; offset <= 40; offset += 24) {
            ctx.beginPath();
            ctx.ellipse(body.x, y + offset, body.radius * 0.9, 9, 0.03, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.fillStyle = "rgba(185, 28, 28, 0.62)";
        ctx.beginPath();
        ctx.ellipse(body.x + 34, y + 22, 16, 10, -0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    if (body.rings) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(253, 230, 138, 0.68)";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.ellipse(body.x, y, body.radius * 1.82, body.radius * 0.42, -0.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.44)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(body.x, y, body.radius * 2.18, body.radius * 0.52, -0.18, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawBodyLabel(ctx, body, y, isTarget);
    ctx.restore();
}

function drawKuiperBelt(ctx, body, y, isTarget) {
    ctx.save();
    ctx.strokeStyle = isTarget ? "rgba(251, 191, 36, 0.45)" : "rgba(148, 163, 184, 0.24)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.ellipse(body.x, y, body.radius * 2.1, body.radius * 0.66, -0.08, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    for (let i = 0; i < 42; i++) {
        const angle = (i / 42) * Math.PI * 2;
        const rx = body.radius * (1.05 + (i % 5) * 0.16);
        const ry = body.radius * (0.25 + (i % 7) * 0.055);
        const px = body.x + Math.cos(angle) * rx;
        const py = y + Math.sin(angle) * ry;
        ctx.fillStyle = i % 3 === 0 ? "#cbd5e1" : "#64748b";
        ctx.globalAlpha = 0.46 + (i % 4) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, 3 + (i % 4), 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    drawBodyLabel(ctx, body, y + 12, isTarget);
    ctx.restore();
}

function drawVoyagerProbe(ctx, body, y, isTarget) {
    ctx.save();
    ctx.translate(body.x, y);
    ctx.strokeStyle = isTarget ? "#fbbf24" : "#e2e8f0";
    ctx.fillStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#f8fafc";
    ctx.shadowBlur = isTarget ? 22 : 10;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-36, -16);
    ctx.lineTo(-10, -5);
    ctx.moveTo(-36, 16);
    ctx.lineTo(-10, 5);
    ctx.moveTo(12, 0);
    ctx.lineTo(46, -28);
    ctx.moveTo(12, 0);
    ctx.lineTo(50, 24);
    ctx.stroke();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(46, -28, 16, 7, -0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    drawBodyLabel(ctx, body, y, isTarget);
}

function drawBodyLabel(ctx, body, y, isTarget) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = isTarget ? "#fde68a" : "#e8f4ff";
    ctx.font = isTarget ? "900 20px Segoe UI" : "850 16px Segoe UI";
    ctx.fillText(body.name, Math.min(930, body.x + body.radius + 18), y - body.radius - 12);
    ctx.fillStyle = "rgba(226, 232, 240, 0.78)";
    ctx.font = "750 12px Segoe UI";
    ctx.fillText(body.note, Math.min(930, body.x + body.radius + 18), y - body.radius + 8);
}

function drawTargetLines(ctx, mission, cameraY) {
    const y = 585 - mission.targetAlt - cameraY;
    const body = getMissionBody(mission);
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
    ctx.fillText(`${mission.name}: ${body ? body.name + " · " : ""}${mission.itemGoal} Kapseln`, 24, y - 12);
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

function drawFlightObjects(ctx, cameraY) {
    if (!flightState?.objects) return;
    for (const object of flightState.objects) {
        if (object.taken) continue;
        const y = object.y - cameraY;
        if (y < -90 || y > 740) continue;
        if (object.type === "hazard") {
            drawAsteroid(ctx, object, y);
        } else if (object.type === "finish") {
            drawFinishGate(ctx, object, y);
        } else {
            drawPickup(ctx, object, y);
        }
    }
}

function drawInvaderField(ctx) {
    const invader = flightState.invader;
    if (!invader) return;
    ctx.save();
    ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
    ctx.fillRect(0, 0, 1100, 650);
    invader.shots.forEach(shot => {
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(shot.x, shot.y + 12);
        ctx.lineTo(shot.x + shot.dx * 0.035, shot.y - 20);
        ctx.stroke();
    });
    invader.enemyShots.forEach(shot => {
        ctx.strokeStyle = "#fb7185";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(shot.x, shot.y - 8);
        ctx.lineTo(shot.x + shot.dx * 0.035, shot.y + 18);
        ctx.stroke();
    });
    invader.enemies.forEach(enemy => drawInvaderEnemy(ctx, enemy));
    ctx.fillStyle = "rgba(2, 6, 23, 0.58)";
    ctx.beginPath();
    ctx.roundRect(810, 18, 260, 74, 16);
    ctx.fill();
    ctx.fillStyle = "#e8f4ff";
    ctx.font = "900 18px Segoe UI";
    ctx.fillText(`Welle ${invader.wave} · Score ${invader.score}`, 830, 48);
    ctx.fillStyle = "#fecaca";
    ctx.font = "900 15px Segoe UI";
    ctx.fillText(`Hülle ${invader.hull} · Ende in ${formatTime(Math.max(0, INVADER_END_TIME - flightState.elapsedSeconds))}`, 830, 72);
    ctx.restore();
}

function drawInvaderEnemy(ctx, enemy) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    const wobble = Math.sin(performance.now() * 0.005 + enemy.phase) * 5;
    ctx.fillStyle = "#a78bfa";
    ctx.strokeStyle = "#312e81";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -enemy.radius - 8);
    ctx.quadraticCurveTo(enemy.radius + 16, -enemy.radius * 0.25 + wobble, enemy.radius, enemy.radius);
    ctx.lineTo(enemy.radius * 0.35, enemy.radius * 0.48);
    ctx.lineTo(0, enemy.radius + 12);
    ctx.lineTo(-enemy.radius * 0.35, enemy.radius * 0.48);
    ctx.lineTo(-enemy.radius, enemy.radius);
    ctx.quadraticCurveTo(-enemy.radius - 16, -enemy.radius * 0.25 - wobble, 0, -enemy.radius - 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(-enemy.radius * 0.32, -2, 5, 0, Math.PI * 2);
    ctx.arc(enemy.radius * 0.32, -2, 5, 0, Math.PI * 2);
    ctx.fill();
    if (enemy.hp > 1) {
        ctx.fillStyle = "#fde68a";
        ctx.font = "900 12px Segoe UI";
        ctx.textAlign = "center";
        ctx.fillText(enemy.hp, 0, enemy.radius + 28);
    }
    ctx.restore();
}

function drawAsteroid(ctx, object, screenY) {
    const spin = performance.now() * 0.001 + object.phase;
    ctx.save();
    ctx.translate(object.x, screenY);
    ctx.rotate(spin);
    ctx.fillStyle = "#7c6f64";
    ctx.strokeStyle = "#292524";
    ctx.lineWidth = 3;
    ctx.beginPath();
    const points = 9;
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radius = object.radius * (0.72 + seededNoise(`${object.id}-${i}`) * 0.45);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.arc(-object.radius * 0.25, -object.radius * 0.2, object.radius * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawPickup(ctx, object, screenY) {
    const pulse = 1 + Math.sin(performance.now() * 0.006 + object.x) * 0.12;
    const colors = {
        fuel: ["#22c55e", "#bbf7d0", "F"],
        boost: ["#f97316", "#fed7aa", "B"],
        science: ["#38bdf8", "#cffafe", "S"],
        shield: ["#a78bfa", "#ede9fe", "⛨"]
    }[object.type] || ["#94a3b8", "#e2e8f0", "?"];
    ctx.save();
    ctx.translate(object.x, screenY);
    ctx.fillStyle = `${colors[0]}33`;
    ctx.beginPath();
    ctx.arc(0, 0, object.radius * 1.8 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors[0];
    ctx.strokeStyle = colors[1];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-object.radius, -object.radius, object.radius * 2, object.radius * 2, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 18px Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(colors[2], 0, 1);
    ctx.restore();
}

function drawFinishGate(ctx, object, screenY) {
    ctx.save();
    ctx.translate(object.x, screenY);
    ctx.strokeStyle = flightState.collectedItems >= object.value ? "#34d399" : "#64748b";
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, object.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#e8f4ff";
    ctx.font = "900 15px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("ZIEL", 0, 5);
    ctx.restore();
}

function drawScienceOrb(ctx, mission, cameraY) {
    if (flightState.scienceStored) return;
    const target = getScienceTarget(mission);
    const x = target.x;
    const y = target.y - cameraY;
    const pulse = 1 + Math.sin(performance.now() * 0.005) * 0.15;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = flightState.scienceActive ? "rgba(52, 211, 153, 0.24)" : "rgba(148, 163, 184, 0.16)";
    ctx.beginPath();
    ctx.arc(0, 0, 28 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = flightState.scienceActive ? "#34d399" : "#94a3b8";
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

function drawProjectedTrajectory(ctx, cameraY) {
    const stats = getRocketStats();
    const sim = {
        x: flightState.x,
        y: flightState.y,
        vx: flightState.vx,
        vy: flightState.vy,
        angle: flightState.angle
    };
    const node = flightState.maneuverNode;
    ctx.save();
    ctx.setLineDash([6, 8]);
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = node ? "rgba(96, 165, 250, 0.85)" : "rgba(125, 211, 252, 0.58)";
    ctx.beginPath();
    ctx.moveTo(sim.x, sim.y - cameraY);
    for (let i = 0; i < 150; i++) {
        if (node && i === 36) {
            const angle = getManeuverAngle();
            const impulse = Math.hypot(node.prograde, node.radial) * 0.009;
            sim.vx += Math.sin(angle) * impulse;
            sim.vy -= Math.cos(angle) * impulse;
        }
        sim.vy += 0.045;
        sim.vx *= stats.drag;
        sim.vy *= 0.999;
        sim.x += sim.vx * 0.95;
        sim.y += sim.vy * 0.95;
        if (sim.y > 616) break;
        ctx.lineTo(sim.x, sim.y - cameraY);
    }
    ctx.stroke();
    ctx.restore();
}

function drawParachute(ctx, x, y, damaged) {
    ctx.save();
    ctx.translate(x, y - 78);
    ctx.strokeStyle = damaged ? "rgba(251, 113, 133, 0.78)" : "rgba(226, 232, 240, 0.84)";
    ctx.fillStyle = damaged ? "rgba(127, 29, 29, 0.72)" : "rgba(248, 113, 113, 0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-58, 10);
    ctx.quadraticCurveTo(0, -48, 58, 10);
    ctx.lineTo(-58, 10);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-42, 10);
    ctx.lineTo(-14, 62);
    ctx.moveTo(0, -12);
    ctx.lineTo(0, 62);
    ctx.moveTo(42, 10);
    ctx.lineTo(14, 62);
    ctx.stroke();
    if (damaged) {
        ctx.strokeStyle = "#fecaca";
        ctx.beginPath();
        ctx.moveTo(-12, -16);
        ctx.lineTo(4, 6);
        ctx.lineTo(-5, 14);
        ctx.stroke();
    }
    ctx.restore();
}

function getRocketVisuals(model = getCurrentModel()) {
    const parts = Object.fromEntries(SLOTS.map(slot => [slot.id, getEquippedPart(slot.id)]));
    const paint = parts.paint;
    return {
        parts,
        color: paint?.color || model.color,
        accent: paint?.accent || model.accent,
        bodyFill: parts.body?.id === "chem_alloy" ? "#cbd5e1" : parts.body?.id === "eh_life_support" ? "#d8f3dc" : "#e5e7eb",
        engineFill: parts.engine?.id === "engine_vector" ? "#475569" : "#334155",
        noseFill: parts.nose?.id === "chem_crystal" ? "#a7f3d0" : "#e5e7eb"
    };
}

function drawRocketCanvas(ctx, x, y, angle, thrusting, options = {}) {
    const model = getCurrentModel();
    const visual = getRocketVisuals(model);
    const { parts, color, accent } = visual;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    if (parts.utility?.id === "solar_panel") {
        ctx.fillStyle = "rgba(56, 189, 248, 0.84)";
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2;
        ctx.fillRect(-74, -2, 46, 17);
        ctx.strokeRect(-74, -2, 46, 17);
        ctx.fillRect(28, -2, 46, 17);
        ctx.strokeRect(28, -2, 46, 17);
        ctx.strokeStyle = "rgba(226, 232, 240, 0.55)";
        [-62, -50, -38, 40, 52, 64].forEach(lineX => {
            ctx.beginPath();
            ctx.moveTo(lineX, -1);
            ctx.lineTo(lineX, 15);
            ctx.stroke();
        });
    }

    if (parts.weapon?.id && parts.weapon.id !== "weapon_basic") {
        ctx.strokeStyle = parts.weapon.id === "weapon_plasma" ? "#f97316" : "#facc15";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -36);
        ctx.lineTo(0, -72);
        ctx.stroke();
        ctx.fillStyle = parts.weapon.id === "weapon_targeting" ? "#38bdf8" : "#fde68a";
        ctx.beginPath();
        ctx.arc(0, -76, 7, 0, Math.PI * 2);
        ctx.fill();
    } else if (parts.weapon?.id === "weapon_basic") {
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -34);
        ctx.lineTo(0, -56);
        ctx.stroke();
    }

    if (options.boostersAttached) {
        ctx.fillStyle = "#cbd5e1";
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 3;
        [-30, 30].forEach(side => {
            ctx.beginPath();
            ctx.roundRect(side - 8, -12, 16, 58, 8);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#fb7185";
            ctx.fillRect(side - 6, 18, 12, 18);
            ctx.fillStyle = "#cbd5e1";
            if (options.boosterActive) {
                const flame = 26 + Math.sin(performance.now() * 0.045 + side) * 6;
                ctx.fillStyle = "rgba(249, 115, 22, 0.92)";
                ctx.beginPath();
                ctx.moveTo(side - 7, 46);
                ctx.lineTo(side, 46 + flame);
                ctx.lineTo(side + 7, 46);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "#cbd5e1";
            }
        });
    }
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
    ctx.fillStyle = visual.bodyFill;
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

    if (parts.nose?.id === "chem_crystal") {
        ctx.fillStyle = "rgba(52, 211, 153, 0.9)";
        ctx.beginPath();
        ctx.moveTo(0, -58);
        ctx.lineTo(12, -35);
        ctx.lineTo(0, -25);
        ctx.lineTo(-12, -35);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (parts.nose?.id === "math_nav" || parts.nose?.id === "dgb_autopilot") {
        ctx.fillStyle = parts.nose.id === "math_nav" ? "#2563eb" : "#22d3ee";
        ctx.fillRect(-11, -42, 22, 8);
        ctx.strokeRect(-11, -42, 22, 8);
    }

    ctx.fillStyle = color;
    ctx.fillRect(-16, -12, 32, 34);
    if (parts.body?.id === "chem_fuel") {
        ctx.fillStyle = "rgba(249, 115, 22, 0.86)";
        ctx.fillRect(-16, -4, 32, 6);
        ctx.fillRect(-16, 12, 32, 6);
    } else if (parts.body?.id === "chem_alloy") {
        ctx.strokeStyle = "rgba(15, 23, 42, 0.5)";
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.lineTo(15, 0);
        ctx.moveTo(-15, 18);
        ctx.lineTo(15, 18);
        ctx.stroke();
    } else if (parts.body?.id === "eh_life_support") {
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(-21, -2, 8, 24);
        ctx.fillRect(13, -2, 8, 24);
    }
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(0, -21, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (parts.science?.id && parts.science.id !== "science_empty") {
        ctx.fillStyle = parts.science.id === "bio_greenhouse" ? "#86efac" : parts.science.id === "geo_mapper" ? "#60a5fa" : "#34d399";
        ctx.strokeStyle = "#0f172a";
        if (parts.science.id === "bio_greenhouse") {
            ctx.beginPath();
            ctx.arc(0, 7, 12, Math.PI, 0);
            ctx.lineTo(12, 16);
            ctx.lineTo(-12, 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.roundRect(-10, 3, 20, 17, 5);
            ctx.fill();
            ctx.stroke();
        }
    }

    if (parts.utility?.id === "shield_heat") {
        ctx.fillStyle = "#111827";
        ctx.fillRect(-20, 34, 40, 8);
    } else if (parts.utility?.id === "music_radio" || parts.utility?.id === "english_radio") {
        ctx.strokeStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.moveTo(15, -20);
        ctx.lineTo(33, -42);
        ctx.stroke();
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(34, -44, 4, 0, Math.PI * 2);
        ctx.fill();
    } else if (parts.utility?.id === "math_optimizer") {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(-8, 22, 16, 10);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(-5, 25, 10, 2);
    }

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

    if (parts.fin?.id === "fin_gyro") {
        ctx.fillStyle = "#a7f3d0";
        [-28, 28].forEach(side => {
            ctx.beginPath();
            ctx.arc(side, 32, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
    }

    ctx.fillStyle = visual.engineFill;
    if (parts.engine?.id === "engine_vector") {
        ctx.beginPath();
        ctx.moveTo(-18, 37);
        ctx.lineTo(18, 37);
        ctx.lineTo(12 + Math.sin(angle) * 6, 58);
        ctx.lineTo(-12 + Math.sin(angle) * 6, 58);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.fillRect(-15, 36, 30, 14);
        ctx.strokeRect(-15, 36, 30, 14);
    }
    ctx.restore();
}

function rocketSvg({ model, compact = false, large = false }) {
    const visual = getRocketVisuals(model);
    const { parts, color, accent } = visual;
    const height = large ? 360 : 135;
    const scale = large ? 2.3 : compact ? 0.95 : 1.25;
    const solar = parts.utility?.id === "solar_panel"
        ? `<g opacity="0.92"><rect x="-94" y="-2" width="46" height="18" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/><rect x="48" y="-2" width="46" height="18" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/><path d="M-83 -1V15M-71 -1V15M-59 -1V15M59 -1V15M71 -1V15M83 -1V15" stroke="#dbeafe" stroke-width="1.5"/></g>`
        : "";
    const noseAddon = parts.nose?.id === "chem_crystal"
        ? `<path d="M0 -94 L15 -62 L0 -47 L-15 -62Z" fill="#6ee7b7" stroke="#0f172a" stroke-width="4"/>`
        : (parts.nose?.id === "math_nav" || parts.nose?.id === "dgb_autopilot")
            ? `<rect x="-17" y="-70" width="34" height="11" rx="4" fill="${parts.nose.id === "math_nav" ? "#2563eb" : "#22d3ee"}" stroke="#0f172a" stroke-width="3"/>`
            : "";
    const bodyAddon = parts.body?.id === "chem_fuel"
        ? `<path d="M-16 -3H16M-16 17H16" stroke="#f97316" stroke-width="7"/>`
        : parts.body?.id === "chem_alloy"
            ? `<path d="M-15 4H15M-13 25H13" stroke="#64748b" stroke-width="3" opacity="0.65"/>`
            : parts.body?.id === "eh_life_support"
                ? `<rect x="-27" y="-4" width="10" height="36" rx="4" fill="#22c55e" stroke="#0f172a" stroke-width="3"/><rect x="17" y="-4" width="10" height="36" rx="4" fill="#22c55e" stroke="#0f172a" stroke-width="3"/>`
                : "";
    const scienceAddon = parts.science?.id && parts.science.id !== "science_empty"
        ? parts.science.id === "bio_greenhouse"
            ? `<path d="M-17 20 Q0 -2 17 20Z" fill="#86efac" stroke="#0f172a" stroke-width="3"/><rect x="-17" y="20" width="34" height="10" rx="3" fill="#16a34a" stroke="#0f172a" stroke-width="3"/>`
            : `<rect x="-15" y="14" width="30" height="20" rx="6" fill="${parts.science.id === "geo_mapper" ? "#60a5fa" : "#34d399"}" stroke="#0f172a" stroke-width="3"/>`
        : "";
    const utilityAddon = parts.utility?.id === "shield_heat"
        ? `<path d="M-25 58H25L16 74H-16Z" fill="#111827" stroke="#0f172a" stroke-width="4"/>`
        : (parts.utility?.id === "music_radio" || parts.utility?.id === "english_radio")
            ? `<path d="M18 -36L42 -72" stroke="#e2e8f0" stroke-width="4"/><circle cx="44" cy="-75" r="6" fill="#fbbf24" stroke="#0f172a" stroke-width="3"/>`
            : parts.utility?.id === "math_optimizer"
                ? `<rect x="-14" y="39" width="28" height="15" rx="4" fill="#0f172a"/><path d="M-8 44H8M-8 49H8" stroke="#38bdf8" stroke-width="2"/>`
                : "";
    const finAddon = parts.fin?.id === "fin_gyro"
        ? `<circle cx="-39" cy="48" r="8" fill="#a7f3d0" stroke="#0f172a" stroke-width="3"/><circle cx="39" cy="48" r="8" fill="#a7f3d0" stroke="#0f172a" stroke-width="3"/>`
        : "";
    const engineAddon = parts.engine?.id === "engine_vector"
        ? `<path d="M-22 58H22L15 82H-15Z" fill="#475569" stroke="#0f172a" stroke-width="4"/>`
        : `<rect x="-15" y="58" width="30" height="18" rx="5" fill="#334155" stroke="#0f172a" stroke-width="4"/>`;
    const weaponAddon = parts.weapon?.id && parts.weapon.id !== "weapon_basic"
        ? `<path d="M0 -62V-105" stroke="${parts.weapon.id === "weapon_plasma" ? "#f97316" : "#facc15"}" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-111" r="9" fill="${parts.weapon.id === "weapon_targeting" ? "#38bdf8" : "#fde68a"}" stroke="#0f172a" stroke-width="3"/>`
        : parts.weapon?.id === "weapon_basic"
            ? `<path d="M0 -62V-94" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>`
            : "";
    return `
        <svg class="rocket-svg" width="${large ? 240 : 130}" height="${height}" viewBox="-70 -125 140 240" role="img" aria-label="${escapeHtml(model.name)}">
            <g transform="scale(${scale})">
                ${solar}
                ${weaponAddon}
                <path d="M0 -82 C30 -50 30 28 18 58 L-18 58 C-30 28 -30 -50 0 -82Z" fill="${visual.bodyFill}" stroke="#0f172a" stroke-width="4"/>
                ${noseAddon}
                <path d="M-16 -10 H16 V38 H-16Z" fill="${color}" opacity="0.95"/>
                ${bodyAddon}
                <circle cx="0" cy="-28" r="13" fill="${accent}" stroke="#0f172a" stroke-width="4"/>
                ${scienceAddon}
                ${utilityAddon}
                <path d="M-18 22 L-52 66 L-16 58Z" fill="${color}" stroke="#0f172a" stroke-width="4"/>
                <path d="M18 22 L52 66 L16 58Z" fill="${color}" stroke="#0f172a" stroke-width="4"/>
                ${finAddon}
                ${engineAddon}
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
