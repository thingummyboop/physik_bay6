const fs = require('fs');
const path = require('path');

const filePath = 'physik_bay6_repo/js/space_program.js';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace ROCKET_MODELS and PARTS
const newConfig = `const ROCKET_MODELS = [
    {
        id: "sparrow",
        name: "Spatz I",
        tagline: "Schmales Rohr, leicht und wendig.",
        color: "#78716c",
        accent: "#ef4444",
        stats: { thrust: 7, fuel: 6, control: 8, science: 3, hull: 4 }
    },
    {
        id: "atlas",
        name: "Atlas Schrottrakete",
        tagline: "Ein solider Stapel Ölfässer.",
        color: "#57534e",
        accent: "#3b82f6",
        stats: { thrust: 6, fuel: 7, control: 6, science: 5, hull: 6 }
    },
    {
        id: "mammut",
        name: "Mammut Kessel",
        tagline: "Breiter Boiler, viel Platz, träge.",
        color: "#44403c",
        accent: "#f59e0b",
        stats: { thrust: 9, fuel: 8, control: 4, science: 2, hull: 8 }
    }
];

const SUBJECT_BONUSES = {
    physik: { label: "Physik", unlock: "Triebwerke, Gyros, Schilde", effect: "Mehr Schub und Stabilität." },
    mathematik: { label: "Mathematik", unlock: "Nav-Systeme, Optimierer", effect: "Feinere Drehung und weniger Verbrauch." },
    chemie: { label: "Chemie", unlock: "Tanks, Kristalle, Waffen", effect: "Energie und Feuerkraft." },
    biologie: { label: "Biologie", unlock: "Gurkenglas, Terrarium", effect: "Mehr Forschungspunkte." },
    dgb: { label: "Digitale Grundbildung", unlock: "Röhrenmonitor-Autopilot", effect: "Starke automatische Steuerung." },
    geographie: { label: "Geographie", unlock: "Polaroid-Kamera", effect: "Scans vom Orbit." },
    deutsch: { label: "Deutsch", unlock: "Notizbrett", effect: "Forschungs-Bonus." },
    englisch: { label: "Englisch", unlock: "CB-Funkgerät", effect: "Internationale Kommunikation." },
    musik: { label: "Musik", unlock: "Ghetto-Blaster", effect: "Beruhigende Tunes." },
    kunst: { label: "Kunst", unlock: "Graffiti-Dosen", effect: "Bunter Schrottplatz-Look." },
    ernaehrung: { label: "Ernährung & Haushalt", unlock: "Kühlschrank", effect: "Snacks für lange Flüge." }
};

const PARTS = [
    { id: "nose_basic", slot: "nose", name: "Verkehrspylone", subject: "start", cost: 0, globalReq: 0, stats: { control: 1 }, desc: "Ein Pylon mit Klebeband. Aerodynamisch genug." },
    { id: "body_basic", slot: "body", name: "Rostiges Ölfass", subject: "start", cost: 0, globalReq: 0, stats: { fuel: 1, hull: 1 }, desc: "Hat mal Öl enthalten, jetzt Treibstoff." },
    { id: "engine_basic", slot: "engine", name: "Blecheimer-Düse", subject: "start", cost: 0, globalReq: 0, stats: { thrust: 1 }, desc: "Ein durchlöcherter Eimer. Funktioniert." },
    { id: "fin_basic", slot: "fin", name: "Pappkarton-Flügel", subject: "start", cost: 0, globalReq: 0, stats: { control: 1 }, desc: "Mit extra viel Panzertape befestigt." },
    { id: "science_empty", slot: "science", name: "Leere Holzkiste", subject: "start", cost: 0, globalReq: 0, stats: {}, desc: "Platz für Schrott-Experimente." },
    { id: "utility_basic", slot: "utility", name: "Taschenlampe", subject: "start", cost: 0, globalReq: 0, stats: { hull: 1 }, desc: "Mit Kabelbindern festgemacht." },
    { id: "weapon_basic", slot: "weapon", name: "Gummiband-Schleuder", subject: "start", cost: 0, globalReq: 0, stats: { weapon: 1 }, desc: "Verschießt rostige Schrauben." },
    { id: "paint_school", slot: "paint", name: "Rost & Grundierung", subject: "start", cost: 0, globalReq: 0, stats: {}, color: "#78716c", accent: "#fbbf24", desc: "Abgeplatzter Lack und nacktes Metall." },

    { id: "music_radio", slot: "utility", name: "Retro Ghetto-Blaster", subject: "musik", globalReq: 1, cost: 35, stats: { control: 1 }, desc: "Spielt laute Beats zur Beruhigung." },
    { id: "geo_mapper", slot: "science", name: "Polaroid-Kamera", subject: "geographie", globalReq: 2, cost: 50, stats: { science: 3, control: 1 }, desc: "Macht körnige Fotos vom Orbit." },
    { id: "math_nav", slot: "nose", name: "Nudelsieb-Satellit", subject: "mathematik", globalReq: 3, cost: 45, stats: { control: 4 }, desc: "Empfängt wackelige Signale." },
    { id: "art_paint", slot: "paint", name: "Graffiti-Sprühdose", subject: "kunst", globalReq: 4, cost: 40, stats: {}, color: "#ec4899", accent: "#06b6d4", desc: "Wilde Farben aus der Dose." },
    { id: "bio_probe", slot: "science", name: "Gurkenglas", subject: "biologie", globalReq: 5, cost: 45, stats: { science: 4 }, desc: "Gefüllt mit mysteriöser grüner Probe." },
    { id: "engine_vector", slot: "engine", name: "Waschmaschinentrommel", subject: "physik", globalReq: 6, cost: 45, stats: { thrust: 3, control: 1 }, desc: "Rotiert wild und gibt Schub." },
    { id: "chem_fuel", slot: "body", name: "Propangas-Flaschen", subject: "chemie", globalReq: 7, cost: 50, stats: { fuel: 4, thrust: 1 }, desc: "Rot lackiert und hoch explosiv." },
    { id: "english_radio", slot: "utility", name: "CB-Funkgerät", subject: "englisch", globalReq: 8, cost: 35, stats: { science: 1 }, desc: "Rauscht auf allen Frequenzen." },
    { id: "fin_gyro", slot: "fin", name: "Fahrradreifen-Kreisel", subject: "physik", globalReq: 9, cost: 55, stats: { control: 3, hull: 1 }, desc: "Gyroskopische Stabilität." },
    { id: "de_logbook", slot: "science", name: "Klemmbrett", subject: "deutsch", globalReq: 10, cost: 35, stats: { science: 2 }, desc: "Flattert gefährlich im Fahrtwind." },
    { id: "math_optimizer", slot: "utility", name: "Autobatterie", subject: "mathematik", globalReq: 11, cost: 75, stats: { fuel: 2, control: 2 }, desc: "Überbrückungskabel inklusive." },
    { id: "eh_life_support", slot: "body", name: "Kühlschrank", subject: "ernaehrung", globalReq: 12, cost: 55, stats: { fuel: 1, hull: 3 }, desc: "Hält die Crew und Snacks kalt." },
    { id: "shield_heat", slot: "utility", name: "Gusseisen-Pfanne", subject: "physik", globalReq: 13, cost: 70, stats: { hull: 4 }, desc: "Der beste Schrottplatz-Hitzeschild." },
    { id: "weapon_photon", slot: "weapon", name: "Schweißbrenner", subject: "physik", globalReq: 14, cost: 110, stats: { weapon: 2, control: 1 }, desc: "Spuckt heiße blaue Flammen." },
    { id: "chem_alloy", slot: "body", name: "Alufolien-Rüstung", subject: "chemie", globalReq: 15, cost: 80, stats: { hull: 3, fuel: 2 }, desc: "Mehrfach gewickelt für Schutz." },
    { id: "solar_panel", slot: "utility", name: "Regenschirm-Panel", subject: "physik", globalReq: 16, cost: 80, stats: { science: 1, fuel: 1 }, desc: "Mit Solarfolie beklebt." },
    { id: "math_grid_paint", slot: "paint", name: "Kariertes Papier", subject: "mathematik", globalReq: 17, cost: 55, stats: {}, color: "#f8fafc", accent: "#3b82f6", desc: "Ein fliegendes Matheheft." },
    { id: "bio_greenhouse", slot: "science", name: "Plastik-Terrarium", subject: "biologie", globalReq: 18, cost: 65, stats: { science: 5, hull: 1 }, desc: "Ein Bonsai kämpft ums Überleben." },
    { id: "chem_crystal", slot: "nose", name: "Leuchtkristall", subject: "chemie", globalReq: 19, cost: 95, stats: { science: 2, control: 2 }, desc: "Vibriert und summt leise." },
    { id: "dgb_autopilot", slot: "nose", name: "Röhrenmonitor", subject: "dgb", globalReq: 20, cost: 60, stats: { control: 5 }, desc: "Zeigt grünen Code auf schwarzem Grund." },
    { id: "weapon_plasma", slot: "weapon", name: "Offene Mikrowelle", subject: "chemie", globalReq: 21, cost: 120, stats: { weapon: 3 }, desc: "Strahlend gefährlich." },
    { id: "weapon_targeting", slot: "weapon", name: "Zielfernrohr", subject: "dgb", globalReq: 22, cost: 130, stats: { weapon: 2, control: 2 }, desc: "An die Schleuder getapt." },
    { id: "paint_gold", slot: "paint", name: "Goldfolie", subject: "victory", cost: 0, globalReq: 999, stats: { weapon: 1, hull: 1 }, color: "#facc15", accent: "#fff7ad", desc: "Glänzt wie der pure Sieg." }
];

const SLOTS = [`;

code = code.replace(/const ROCKET_MODELS = \[[\s\S]*?const SLOTS = \[/, newConfig);

// 2. Replace isPartUnlocked and renderShop
const shopReplacements = `function isPartUnlocked(part, progress = getSubjectProgress()) {
    if (part.subject === "start") return true;
    if (part.subject === "victory") return Boolean(programState.goldenRocket || programState.owned.includes(part.id));
    return getCompletedChapterCount() >= (part.globalReq || 0);
}

function buyPart(partId) {`;

code = code.replace(/function isPartUnlocked[\s\S]*?function buyPart\(partId\) \{/, shopReplacements);

const renderShopFix = `const buttonLabel = owned ? "gekauft" : unlocked ? \`\${part.cost} Punkte\` : part.subject === "victory" ? "Finale schaffen" : \`\${part.globalReq || 0} Kapitelquizze nötig\`;`;
code = code.replace(/const buttonLabel = owned[\s\S]*?\`\$\{part\.req \|\| 0\} Kapitelquiz nötig\`;/, renderShopFix);

// 3. Add Canvas Preview Logic
const canvasPreviewLogic = `
function drawAllPreviews() {
    document.querySelectorAll('.rocket-preview-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const modelId = canvas.dataset.model;
        const model = ROCKET_MODELS.find(m => m.id === modelId) || ROCKET_MODELS[0];
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w/2, h/2 + (canvas.dataset.compact ? 20 : 40));
        const scale = canvas.dataset.large ? 2.3 : canvas.dataset.compact ? 0.95 : 1.25;
        ctx.scale(scale, scale);
        drawRocketCanvas(ctx, 0, 0, 0, false, { preview: true, modelOverride: model });
        ctx.restore();
    });
}
`;

// Replace renderModelCards, renderWorkshop, renderRocketPanels
code = code.replace(/function renderModelCards\(\) \{[\s\S]*?function chooseModel/, `function renderModelCards() {
    const grid = document.getElementById("rocketModelCards");
    grid.innerHTML = ROCKET_MODELS.map(model => \`
        <button type="button" class="model-card" data-model="\${model.id}">
            <div class="model-rocket"><canvas class="rocket-preview-canvas" width="130" height="135" data-model="\${model.id}" data-compact="true"></canvas></div>
            <p class="space-kicker">Startmodell</p>
            <h3>\${escapeHtml(model.name)}</h3>
            <p>\${escapeHtml(model.tagline)}</p>
            <div class="model-stat-list">
                <span>Schub \${model.stats.thrust}</span>
                <span>Treibstoff \${model.stats.fuel}</span>
                <span>Steuerung \${model.stats.control}</span>
            </div>
        </button>
    \`).join("");
    grid.querySelectorAll(".model-card").forEach(card => {
        card.addEventListener("click", () => chooseModel(card.dataset.model));
    });
    drawAllPreviews();
}

function chooseModel`);

code = code.replace(/document\.getElementById\("compactRocketPreview"\)\.innerHTML = rocketSvg\(\{ model: getCurrentModel\(\), compact: true \}\);/, `document.getElementById("compactRocketPreview").innerHTML = \`<canvas class="rocket-preview-canvas" width="130" height="135" data-model="\${getCurrentModel().id}" data-compact="true"></canvas>\`;\n    drawAllPreviews();`);

code = code.replace(/document\.getElementById\("workshopRocketPreview"\)\.innerHTML = rocketSvg\(\{ model: getCurrentModel\(\), large: true \}\);/, `document.getElementById("workshopRocketPreview").innerHTML = \`<canvas class="rocket-preview-canvas" width="240" height="360" data-model="\${getCurrentModel().id}" data-large="true"></canvas>\`;`);
code = code.replace(/renderSlotParts\(\);\n\}/, `renderSlotParts();\n    drawAllPreviews();\n}`);

// Remove rocketSvg completely
code = code.replace(/function rocketSvg\(\{[\s\S]*?return \`[\s\S]*?<\/svg>\n    \`;\n\}/, '');

// Replace getRocketVisuals and drawRocketCanvas with the Junkyard Renderer
const junkyardRenderer = `
function getRocketVisuals(model = getCurrentModel()) {
    const parts = Object.fromEntries(SLOTS.map(slot => [slot.id, getEquippedPart(slot.id)]));
    const paint = parts.paint;
    return {
        parts,
        color: paint?.color || model.color,
        accent: paint?.accent || model.accent
    };
}

function drawTape(ctx, x, y, angle, length) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#94a3b8"; // duct tape gray
    ctx.fillRect(-length/2, -3, length, 6);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(-length/2, -3, length, 6);
    // tape wrinkles
    ctx.beginPath(); ctx.moveTo(-length/3, -2); ctx.lineTo(-length/4, 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(length/4, -2); ctx.lineTo(length/3, 2); ctx.stroke();
    ctx.restore();
}

function drawJunkyardBase(ctx, modelId, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "#1c1917";
    ctx.lineWidth = 3;
    
    if (modelId === "sparrow") {
        // Thin pipe
        ctx.beginPath();
        ctx.rect(-12, -40, 24, 80);
        ctx.fill(); ctx.stroke();
        // Rust spots
        ctx.fillStyle = "#78350f";
        ctx.beginPath(); ctx.arc(-4, -20, 3, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(6, 15, 4, 0, Math.PI*2); ctx.fill();
        drawTape(ctx, 0, 0, 0.1, 26);
    } 
    else if (modelId === "atlas") {
        // Oil drum stack
        ctx.beginPath();
        ctx.rect(-20, -35, 40, 75);
        ctx.fill(); ctx.stroke();
        // Drum ribs
        ctx.beginPath(); ctx.moveTo(-20, -10); ctx.lineTo(20, -10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-20, 15); ctx.lineTo(20, 15); ctx.stroke();
        // Patches
        ctx.fillStyle = "#a8a29e";
        ctx.fillRect(-10, -5, 12, 12);
        ctx.strokeRect(-10, -5, 12, 12);
        drawTape(ctx, -4, 1, 0.5, 18);
    } 
    else if (modelId === "mammut") {
        // Bulky Boiler
        ctx.beginPath();
        ctx.ellipse(0, 5, 30, 45, 0, 0, Math.PI*2);
        ctx.fill(); ctx.stroke();
        // Rivets
        ctx.fillStyle = "#1c1917";
        for(let i=0; i<8; i++) {
            ctx.beginPath(); ctx.arc(-24 + i*7, -30, 1.5, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(-24 + i*7, 40, 1.5, 0, Math.PI*2); ctx.fill();
        }
        drawTape(ctx, -15, 0, -0.2, 20);
        drawTape(ctx, 15, -10, 0.4, 25);
    }
}

function drawRocketCanvas(ctx, x, y, angle, thrusting, options = {}) {
    const model = options.modelOverride || getCurrentModel();
    const visual = getRocketVisuals(model);
    const parts = visual.parts;
    const t = options.preview ? 0 : performance.now();
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // --- 1. ENGINE ---
    if (parts.engine?.id === "engine_vector") {
        // Washing machine drum
        ctx.fillStyle = "#cbd5e1";
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 3;
        const gimbal = options.preview ? 0 : Math.sin(t*0.01)*0.2;
        ctx.save();
        ctx.translate(0, 45); // attach point
        ctx.rotate(gimbal);
        ctx.beginPath(); ctx.rect(-16, 0, 32, 18); ctx.fill(); ctx.stroke();
        // Drum holes
        ctx.fillStyle = "#1e293b";
        for(let i=0; i<3; i++) {
            for(let j=0; j<2; j++) {
                ctx.beginPath(); ctx.arc(-10 + i*10, 4 + j*8, 2, 0, Math.PI*2); ctx.fill();
            }
        }
        // Flame
        if (thrusting) {
            ctx.fillStyle = "rgba(56, 189, 248, 0.9)"; // blue flame for vector
            ctx.beginPath(); ctx.moveTo(-12, 18); ctx.lineTo(0, 18 + 40 + Math.random()*15); ctx.lineTo(12, 18); ctx.fill();
        }
        ctx.restore();
    } else {
        // Blecheimer (Bucket)
        ctx.fillStyle = "#94a3b8";
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(14, 40); ctx.lineTo(10, 58); ctx.lineTo(-10, 58); ctx.closePath();
        ctx.fill(); ctx.stroke();
        // Handle hanging down
        ctx.beginPath(); ctx.arc(0, 58, 12, 0, Math.PI, false); ctx.stroke();
        if (thrusting) {
            ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
            ctx.beginPath(); ctx.moveTo(-8, 58); ctx.lineTo(0, 58 + 35 + Math.random()*10); ctx.lineTo(8, 58); ctx.fill();
        }
    }

    // --- 2. BOOSTERS (if active) ---
    if (options.boostersAttached) {
        [-25, 25].forEach(bx => {
            // tied on fire extinguishers
            ctx.fillStyle = "#ef4444";
            ctx.strokeStyle = "#450a0a";
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(bx - 6, -10, 12, 45, 4); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#facc15"; ctx.fillRect(bx - 6, 0, 12, 5); // yellow stripe
            drawTape(ctx, bx, 10, bx < 0 ? 0.2 : -0.2, 18);
            drawTape(ctx, bx, 25, bx < 0 ? -0.1 : 0.1, 18);
            
            if (options.boosterActive) {
                ctx.fillStyle = "rgba(249, 115, 22, 0.9)";
                ctx.beginPath(); ctx.moveTo(bx-5, 35); ctx.lineTo(bx, 35 + 40 + Math.random()*20); ctx.lineTo(bx+5, 35); ctx.fill();
            }
        });
    }

    // --- 3. FINS ---
    if (parts.fin?.id === "fin_gyro") {
        // Bike wheels
        [-24, 24].forEach(fx => {
            ctx.save();
            ctx.translate(fx, 25);
            ctx.rotate(options.preview ? 0 : t*0.01);
            ctx.strokeStyle = "#475569"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI*2); ctx.stroke();
            ctx.lineWidth = 1; ctx.strokeStyle = "#94a3b8";
            for(let i=0; i<4; i++) {
                ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke();
                ctx.rotate(Math.PI/4);
            }
            ctx.restore();
            // Axle mount
            ctx.fillStyle="#1e293b"; ctx.fillRect(fx>0 ? 12 : -18, 23, 6, 4);
        });
    } else {
        // Pappkarton
        ctx.fillStyle = "#d97706";
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-15, 10); ctx.lineTo(-35, 40); ctx.lineTo(-15, 30); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(15, 10); ctx.lineTo(35, 40); ctx.lineTo(15, 30); ctx.fill(); ctx.stroke();
        drawTape(ctx, -20, 25, 0.5, 15);
        drawTape(ctx, 20, 25, -0.5, 15);
    }

    // --- 4. BODY ---
    drawJunkyardBase(ctx, model.id, visual.color);

    // Body Addons
    if (parts.body?.id === "chem_fuel") {
        // Extra propane tanks
        ctx.fillStyle = "#ef4444"; ctx.strokeStyle="#450a0a"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.roundRect(-22, -5, 8, 25, 4); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.roundRect(14, -5, 8, 25, 4); ctx.fill(); ctx.stroke();
        drawTape(ctx, 0, 5, 0, 46);
    } else if (parts.body?.id === "chem_alloy") {
        // Tinfoil wraps
        ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(-15, -15); ctx.lineTo(15, -5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-18, 5); ctx.lineTo(18, 15); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-12, 25); ctx.lineTo(12, 20); ctx.stroke();
    } else if (parts.body?.id === "eh_life_support") {
        // Fridge
        ctx.fillStyle = "#f8fafc"; ctx.strokeStyle="#475569"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-12, -15, 24, 30); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#0f172a"; ctx.fillRect(10, -5, 2, 10); // Handle
        drawTape(ctx, 0, -10, 0, 26);
        drawTape(ctx, 0, 10, 0, 26);
    }

    // --- 5. NOSE ---
    ctx.save();
    ctx.translate(0, model.id === "sparrow" ? -40 : model.id === "atlas" ? -35 : -25); // Nose attach point
    
    if (parts.nose?.id === "chem_crystal") {
        // Glowing Crystal
        ctx.fillStyle = "#a7f3d0"; ctx.strokeStyle = "#059669"; ctx.lineWidth=2;
        ctx.shadowColor = "#34d399"; ctx.shadowBlur = 15;
        ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(0, -35); ctx.lineTo(8, 0); ctx.lineTo(0, 5); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;
        // Wires holding it
        ctx.strokeStyle="#1e293b"; ctx.beginPath(); ctx.moveTo(-12, 5); ctx.lineTo(12, -5); ctx.stroke();
    } else if (parts.nose?.id === "math_nav") {
        // Nudelsieb
        ctx.fillStyle = "#94a3b8"; ctx.strokeStyle="#334155"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0, 0, 16, Math.PI, 0); ctx.fill(); ctx.stroke();
        // Antenna
        ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(0, -35); ctx.stroke();
        ctx.fillStyle="#ef4444"; ctx.beginPath(); ctx.arc(0, -35, 3, 0, Math.PI*2); ctx.fill();
    } else if (parts.nose?.id === "dgb_autopilot") {
        // CRT Monitor
        ctx.fillStyle = "#e5e5e5"; ctx.strokeStyle="#404040"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.roundRect(-14, -25, 28, 25, 3); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#064e3b"; ctx.fillRect(-10, -21, 20, 17); // screen
        ctx.fillStyle = "#4ade80"; ctx.font="8px monospace"; ctx.fillText(">_", -8, -10);
        drawTape(ctx, -10, 5, 0.4, 20);
        drawTape(ctx, 10, 5, -0.4, 20);
    } else {
        // Verkehrspylone
        ctx.fillStyle = "#f97316"; ctx.strokeStyle="#7c2d12"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, -30); ctx.lineTo(14, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#f8fafc"; ctx.beginPath(); ctx.moveTo(-8, -15); ctx.lineTo(0, -15); ctx.lineTo(8, -15); ctx.lineTo(10, -10); ctx.lineTo(-10, -10); ctx.closePath(); ctx.fill();
        drawTape(ctx, 0, 5, 0, 30);
    }
    ctx.restore();

    // --- 6. UTILITY ---
    ctx.save();
    ctx.translate(18, 0); // Right side attach
    if (parts.utility?.id === "music_radio" || parts.utility?.id === "english_radio") {
        // Boombox
        ctx.fillStyle = "#334155"; ctx.strokeStyle="#0f172a"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(0, -10, 16, 20); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#1e293b"; ctx.beginPath(); ctx.arc(8, -2, 4, 0, Math.PI*2); ctx.arc(8, 6, 4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(4, -10); ctx.lineTo(16, -25); ctx.stroke(); // antenna
        drawTape(ctx, 2, 0, Math.PI/2, 25);
    } else if (parts.utility?.id === "math_optimizer") {
        // Car battery
        ctx.fillStyle = "#1e293b"; ctx.strokeStyle="#020617"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(0, -8, 14, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#ef4444"; ctx.fillRect(2, -12, 4, 4); // + terminal
        ctx.fillStyle="#3b82f6"; ctx.fillRect(8, -12, 4, 4); // - terminal
        // Jumper cables
        ctx.strokeStyle="#ef4444"; ctx.beginPath(); ctx.moveTo(4,-12); ctx.quadraticCurveTo(10, -25, -5, -20); ctx.stroke();
        drawTape(ctx, 2, 0, Math.PI/2, 20);
    } else if (parts.utility?.id === "solar_panel") {
        // Umbrella Solar
        ctx.strokeStyle="#475569"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(25, -15); ctx.stroke(); // stick
        ctx.fillStyle="#0ea5e9"; ctx.strokeStyle="#0284c7";
        ctx.translate(25, -15); ctx.rotate(0.5);
        ctx.beginPath(); ctx.arc(0, 0, 18, Math.PI, 0); ctx.fill(); ctx.stroke();
    } else if (parts.utility?.id === "shield_heat") {
        // Pan (attached to bottom, overriding translate)
        ctx.restore(); ctx.save();
        ctx.translate(0, 38);
        ctx.fillStyle="#1c1917"; ctx.strokeStyle="#000"; ctx.lineWidth=3;
        ctx.beginPath(); ctx.ellipse(0, 0, 25, 8, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(25, 0); ctx.lineTo(40, -10); ctx.stroke(); // handle
    } else {
        // Flashlight
        ctx.fillStyle = "#fbbf24"; ctx.strokeStyle="#b45309"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(0, -8, 8, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#fef08a"; ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(14, -12); ctx.lineTo(14, -4); ctx.closePath(); ctx.fill();
        drawTape(ctx, 2, 0, Math.PI/2, 20);
    }
    ctx.restore();

    // --- 7. SCIENCE ---
    ctx.save();
    ctx.translate(-18, -10); // Left side attach
    if (parts.science?.id === "bio_probe") {
        // Pickle jar
        ctx.fillStyle = "rgba(167, 243, 208, 0.6)"; ctx.strokeStyle="#059669"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-14, -12, 14, 24); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#64748b"; ctx.fillRect(-15, -16, 16, 4); // lid
        ctx.fillStyle="#22c55e"; ctx.beginPath(); ctx.arc(-7, 0, 4, 0, Math.PI*2); ctx.fill(); // floating thing
        drawTape(ctx, -2, 0, Math.PI/2, 30);
    } else if (parts.science?.id === "bio_greenhouse") {
        // Plastic bag terrarium
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; ctx.strokeStyle="#cbd5e1"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.ellipse(-10, 0, 12, 16, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#15803d"; ctx.beginPath(); ctx.moveTo(-10, 10); ctx.lineTo(-14, 0); ctx.lineTo(-6, 0); ctx.closePath(); ctx.fill(); // plant
        drawTape(ctx, 0, 0, Math.PI/2, 20);
    } else if (parts.science?.id === "geo_mapper") {
        // Polaroid
        ctx.fillStyle = "#f8fafc"; ctx.strokeStyle="#475569"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-16, -10, 16, 20); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#1e293b"; ctx.beginPath(); ctx.arc(-8, -2, 5, 0, Math.PI*2); ctx.fill(); // lens
        ctx.fillStyle="#ef4444"; ctx.fillRect(-12, 8, 8, 2); // rainbow stripe
        drawTape(ctx, -2, 0, Math.PI/2, 25);
    } else if (parts.science?.id === "de_logbook") {
        // Clipboard
        ctx.fillStyle = "#fef08a"; ctx.strokeStyle="#b45309"; ctx.lineWidth=2;
        const flap = options.preview ? 0 : Math.sin(t*0.02)*0.2;
        ctx.rotate(flap);
        ctx.beginPath(); ctx.rect(-18, -12, 18, 24); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#1e293b"; ctx.fillRect(-16, -10, 14, 3); // clip
        // paper lines
        ctx.strokeStyle="#94a3b8"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(-14, -2); ctx.lineTo(-4, -2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-14, 4); ctx.lineTo(-6, 4); ctx.stroke();
        drawTape(ctx, 0, 0, Math.PI/2, 20);
    } else {
        // Empty Crate
        ctx.fillStyle = "#a16207"; ctx.strokeStyle="#78350f"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-12, -8, 12, 16); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-12, -8); ctx.lineTo(0, 8); ctx.stroke();
        drawTape(ctx, -2, 0, Math.PI/2, 20);
    }
    ctx.restore();

    // --- 8. WEAPON ---
    ctx.save();
    ctx.translate(0, model.id === "sparrow" ? -80 : model.id === "atlas" ? -75 : -55);
    if (parts.weapon?.id === "weapon_photon") {
        // Welder torch
        ctx.fillStyle = "#334155"; ctx.strokeStyle="#0f172a"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-4, -15, 8, 15); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#ef4444"; ctx.fillRect(-6, -5, 12, 4);
        ctx.fillStyle = "#38bdf8"; ctx.beginPath(); ctx.moveTo(-2, -15); ctx.lineTo(0, -25); ctx.lineTo(2, -15); ctx.fill(); // flame tip
        drawTape(ctx, 0, -2, 0, 16);
    } else if (parts.weapon?.id === "weapon_plasma") {
        // Microwave
        ctx.fillStyle = "#f8fafc"; ctx.strokeStyle="#475569"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-12, -20, 24, 20); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#facc15"; ctx.fillRect(-8, -16, 12, 12); // inside glow
        ctx.fillStyle = "#1e293b"; ctx.fillRect(10, -18, 2, 16); // buttons
        drawTape(ctx, 0, -2, 0, 30);
    } else if (parts.weapon?.id === "weapon_targeting") {
        // Sniper Scope
        ctx.fillStyle = "#1e293b"; ctx.strokeStyle="#000"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.rect(-3, -25, 6, 25); ctx.fill(); ctx.stroke();
        ctx.fillRect(-6, -25, 12, 6); // lens
        ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.arc(0, -22, 2, 0, Math.PI*2); ctx.fill();
        drawTape(ctx, 0, -8, 0, 14);
    } else {
        // Slingshot
        ctx.strokeStyle = "#78350f"; ctx.lineWidth=3;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -10); ctx.moveTo(0, -10); ctx.lineTo(-8, -20); ctx.moveTo(0, -10); ctx.lineTo(8, -20); ctx.stroke();
        ctx.strokeStyle = "#ef4444"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(-8, -20); ctx.lineTo(0, -25); ctx.lineTo(8, -20); ctx.stroke(); // band
        drawTape(ctx, 0, -2, 0, 12);
    }
    ctx.restore();

    ctx.restore();
}
`;

code = code.replace(/function getRocketVisuals[\s\S]*?ctx\.restore\(\);\n\}/, junkyardRenderer);

// Append drawAllPreviews definition and call
code += canvasPreviewLogic;

fs.writeFileSync(filePath, code, 'utf8');
console.log("update complete");
