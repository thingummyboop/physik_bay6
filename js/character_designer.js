const CHARACTER_KEY = "learnquest_character";
const CHARACTER_COINS_KEY = "learning_coins";
let characterShopFilter = "all";

const CHARACTER_GROUPS = {
    ork: {
        label: "Orks",
        tag: "kantig, stark, Pausenhof-Energie",
        body: "power",
        models: [
            { skin: "#8fcf5b", hair: "#172413", cheek: "#5b8f3f" },
            { skin: "#78b957", hair: "#2f2417", cheek: "#4f7f37" },
            { skin: "#a3d86c", hair: "#1f2937", cheek: "#699a42" },
            { skin: "#6eaa52", hair: "#3f2a1d", cheek: "#4c7a37" },
            { skin: "#9cc96a", hair: "#553c1c", cheek: "#6a913d" },
            { skin: "#7fc36b", hair: "#111827", cheek: "#4f8d42" }
        ]
    },
    zwerg: {
        label: "Zwerge",
        tag: "klein, rund, praktisch",
        body: "compact",
        models: [
            { skin: "#f1c7a3", hair: "#5b341a", cheek: "#d58a74" },
            { skin: "#d99b73", hair: "#2d1c12", cheek: "#b86b5a" },
            { skin: "#f4d2b4", hair: "#7c4a21", cheek: "#e6a18b" },
            { skin: "#b87552", hair: "#171717", cheek: "#955443" },
            { skin: "#f0b58d", hair: "#b45309", cheek: "#d77c68" },
            { skin: "#8f5b43", hair: "#111827", cheek: "#704331" }
        ]
    },
    elf: {
        label: "Elfen",
        tag: "gross, fein, flink",
        body: "slim",
        models: [
            { skin: "#f8d8bd", hair: "#d6b45a", cheek: "#e8a58f" },
            { skin: "#dfaa84", hair: "#3b2415", cheek: "#bd775f" },
            { skin: "#f1c2a2", hair: "#111827", cheek: "#d98b78" },
            { skin: "#b97958", hair: "#f3e8a2", cheek: "#955b48" },
            { skin: "#f5e0c8", hair: "#8b5cf6", cheek: "#d8a1bb" },
            { skin: "#9d6b52", hair: "#0f766e", cheek: "#7a4a39" }
        ]
    },
    zauberer: {
        label: "Zauberer",
        tag: "schlau, genau, T&uuml;ftelkopf",
        body: "clever",
        models: [
            { skin: "#f2c9a0", hair: "#2b1b12", cheek: "#d68f78" },
            { skin: "#d7a27c", hair: "#111827", cheek: "#b86b56" },
            { skin: "#f6ddc6", hair: "#7c2d12", cheek: "#df9f8b" },
            { skin: "#a36b4f", hair: "#1f2937", cheek: "#7a4f3b" },
            { skin: "#e7b98e", hair: "#6b7280", cheek: "#c9836d" },
            { skin: "#80543f", hair: "#111827", cheek: "#5f3b2d" }
        ]
    },
    druide: {
        label: "Druiden",
        tag: "naturverbunden, wild, neugierig",
        body: "nature",
        models: [
            { skin: "#e5ba91", hair: "#31572c", cheek: "#a16207" },
            { skin: "#c9865f", hair: "#4d7c0f", cheek: "#854d0e" },
            { skin: "#f0d0aa", hair: "#713f12", cheek: "#b45309" },
            { skin: "#8d5d45", hair: "#365314", cheek: "#6b3f2a" },
            { skin: "#d7a47a", hair: "#166534", cheek: "#8b5a2b" },
            { skin: "#f6dfc8", hair: "#84cc16", cheek: "#a16207" }
        ]
    }
};

const CHARACTER_GENDERS = [
    { id: "neutral", label: "neutral" },
    { id: "female", label: "weiblich" },
    { id: "male", label: "m&auml;nnlich" }
];

const BASE_CHARACTER_ITEMS = [
    { id: "hair_short", type: "hair", label: "Kurze Schulfrisur", cost: 0, free: true, color: "#3b2415", style: "short" },
    { id: "hair_long", type: "hair", label: "Lange Str&auml;hnen", cost: 0, free: true, color: "#5b341a", style: "long" },
    { id: "hair_curls", type: "hair", label: "Locken", cost: 0, free: true, color: "#111827", style: "curls" },
    { id: "hair_bun", type: "hair", label: "Knoten", cost: 0, free: true, color: "#7c2d12", style: "bun" },
    { id: "outfit_hoodie", type: "outfit", label: "Schul-Hoodie", cost: 0, free: true, color: "#0f766e", style: "hoodie" },
    { id: "outfit_sport", type: "outfit", label: "Sportshirt", cost: 0, free: true, color: "#2563eb", style: "shirt" },
    { id: "outfit_overall", type: "outfit", label: "Werkstatt-Latzhose", cost: 0, free: true, color: "#7c3aed", style: "overall" },
    { id: "acc_none", type: "accessory", label: "Ohne Gegenstand", cost: 0, free: true, icon: "" },
    { id: "acc_backpack", type: "accessory", label: "Rucksack", cost: 0, free: true, icon: "R" },
    { id: "acc_glasses", type: "accessory", label: "Brille", cost: 0, free: true, icon: "oo" },
    { id: "acc_headphones", type: "accessory", label: "Kopfh&ouml;rer", cost: 0, free: true, icon: "H" },
    { id: "makeup_none", type: "makeup", label: "Ohne Schminke", cost: 0, free: true, style: "none" },
    { id: "makeup_freckles", type: "makeup", label: "Sommersprossen", cost: 0, free: true, style: "freckles" },
    { id: "makeup_star", type: "makeup", label: "Sternchen", cost: 0, free: true, style: "star" },
    { id: "makeup_choco", type: "makeup", label: "Schokospur", cost: 0, free: true, style: "choco" }
];

const SUBJECT_ITEM_STYLES = {
    physik: { icon: "&#9883;", color: "#0f766e", thing: "Messgeraet" },
    mathematik: { icon: "+", color: "#2563eb", thing: "Zahlenwuerfel" },
    chemie: { icon: "E", color: "#0891b2", thing: "Kolben" },
    dgb: { icon: "PC", color: "#7c3aed", thing: "Mini-PC" },
    geographie: { icon: "G", color: "#16a34a", thing: "Globus" },
    biologie: { icon: "B", color: "#059669", thing: "Forscherglas" },
    deutsch: { icon: "Aa", color: "#dc2626", thing: "Notizbuch" },
    englisch: { icon: "UK", color: "#0284c7", thing: "Reisepass" },
    musik: { icon: "&#9835;", color: "#c026d3", thing: "Notenclip" },
    kunst: { icon: "K", color: "#ea580c", thing: "Pinsel" },
    ernaehrung: { icon: "EH", color: "#65a30d", thing: "Kochloeffel" }
};

function defaultCharacterState() {
    return {
        group: "ork",
        gender: "neutral",
        model: 0,
        purchased: [],
        equipped: {
            hair: "hair_short",
            outfit: "outfit_hoodie",
            accessory: "acc_backpack",
            makeup: "makeup_none"
        }
    };
}

function loadCharacterState() {
    try {
        const saved = JSON.parse(localStorage.getItem(CHARACTER_KEY) || "{}");
        return {
            ...defaultCharacterState(),
            ...saved,
            equipped: { ...defaultCharacterState().equipped, ...(saved.equipped || {}) },
            purchased: Array.isArray(saved.purchased) ? saved.purchased : []
        };
    } catch (error) {
        return defaultCharacterState();
    }
}

function saveCharacterState(state) {
    localStorage.setItem(CHARACTER_KEY, JSON.stringify(state));
}

function getCharacterCoins() {
    return Number(localStorage.getItem(CHARACTER_COINS_KEY) || 0);
}

function setCharacterCoins(coins) {
    localStorage.setItem(CHARACTER_COINS_KEY, String(Math.max(0, Math.floor(coins))));
    if (typeof updateShellStats === "function") updateShellStats();
}

function allThemeGroups() {
    const app = window.LEARNQUEST_CURRICULUM;
    const groups = [];
    Object.entries(app.subjects).forEach(([subjectId, subject]) => {
        const map = new Map();
        subject.topics.forEach(topic => {
            const key = `${subjectId}|${topic.grade || 0}|${topic.strand}`;
            if (!map.has(key)) {
                map.set(key, {
                    subjectId,
                    subject,
                    grade: topic.grade || 0,
                    strand: topic.strand,
                    topics: []
                });
            }
            map.get(key).topics.push(topic);
        });
        groups.push(...map.values());
    });
    return groups;
}

function themeShopItems() {
    const items = [];
    allThemeGroups().forEach(group => {
        const style = SUBJECT_ITEM_STYLES[group.subjectId] || { icon: group.subject.icon, color: group.subject.accent, thing: "Fundstueck" };
        const idBase = `${group.subjectId}_${group.grade}_${slugify(group.strand)}`;
        const requiredTopics = group.topics.filter(topic => topic.available).map(topic => topic.id);
        const labelBase = `${group.subject.label}: ${gradeLabel(group.grade)} ${group.strand}`;
        items.push({
            id: `${idBase}_hair`,
            type: "hair",
            label: `${group.strand}-Str&auml;hne`,
            cost: 18,
            color: style.color,
            style: "streak",
            icon: style.icon,
            theme: labelBase,
            requiredTopics
        });
        items.push({
            id: `${idBase}_outfit`,
            type: "outfit",
            label: `${group.strand}-Outfit`,
            cost: 28,
            color: style.color,
            style: "jacket",
            icon: style.icon,
            theme: labelBase,
            requiredTopics
        });
        items.push({
            id: `${idBase}_accessory`,
            type: "accessory",
            label: style.thing,
            cost: 22,
            color: style.color,
            icon: style.icon,
            theme: labelBase,
            requiredTopics
        });
    });
    return items;
}

function allCharacterItems() {
    return [...BASE_CHARACTER_ITEMS, ...themeShopItems()];
}

function itemById(itemId) {
    return allCharacterItems().find(item => item.id === itemId) || null;
}

function itemsByType(type) {
    return allCharacterItems().filter(item => item.type === type);
}

function isCharacterItemOwned(state, item) {
    return Boolean(item.free || state.purchased.includes(item.id));
}

function getCompletedForCharacter() {
    try {
        return new Set(JSON.parse(localStorage.getItem("challenge_completed_topics") || "[]"));
    } catch (error) {
        return new Set();
    }
}

function itemUnlockProgress(item, completed) {
    if (item.free) return { unlocked: true, done: 0, total: 0 };
    const required = item.requiredTopics || [];
    if (!required.length) return { unlocked: false, done: 0, total: 0 };
    const done = required.filter(topicId => completed.has(topicId)).length;
    return { unlocked: done === required.length, done, total: required.length };
}

function slugify(value) {
    return String(value || "extra")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function characterEscape(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

window.renderCharacterDesigner = function renderCharacterDesigner(mainView) {
    const state = loadCharacterState();
    const completed = getCompletedForCharacter();
    mainView.dataset.shellView = "character";
    mainView.innerHTML = `
        <section class="character-hero">
            <p class="eyebrow">Charakterdesigner</p>
            <h1>Dein Schulavatar</h1>
            <p>Erstelle eine Spielfigur f&uuml;r deinen Lernweg. Neue Fach-Styles werden durch abgeschlossene Themen freigeschaltet und mit Plus-M&uuml;nzen gekauft.</p>
        </section>
        <section class="character-layout">
            <aside class="character-preview-panel">
                <div class="character-stage">${characterSvg(state)}</div>
                <div class="character-summary">
                    <strong>${CHARACTER_GROUPS[state.group].label}</strong>
                    <span>${genderLabel(state.gender)} &middot; Modell ${Number(state.model) + 1}</span>
                    <small>${ownedCount(state)} Gegenst&auml;nde verf&uuml;gbar &middot; ${getCharacterCoins()} Plus-M&uuml;nzen</small>
                </div>
            </aside>
            <section class="character-control-panel">
                <div class="designer-block">
                    <div class="designer-block-head">
                        <h2>Gruppe</h2>
                        <span>Fantasy-Schulgruppen</span>
                    </div>
                    <div class="choice-grid group-grid">${renderGroupChoices(state)}</div>
                </div>
                <div class="designer-block split-block">
                    <div>
                        <div class="designer-block-head"><h2>Geschlecht</h2><span>frei w&auml;hlbar</span></div>
                        <div class="choice-row">${renderGenderChoices(state)}</div>
                    </div>
                    <div>
                        <div class="designer-block-head"><h2>Modell</h2><span>6 Varianten je Gruppe</span></div>
                        <div class="model-row">${renderModelChoices(state)}</div>
                    </div>
                </div>
                <div class="designer-block">
                    <div class="designer-block-head">
                        <h2>Ausr&uuml;sten</h2>
                        <span>Frisur, Kleidung, Schmuck und Schminke</span>
                    </div>
                    ${renderWardrobe(state, completed)}
                </div>
                <div class="designer-block">
                    <div class="designer-block-head">
                        <h2>Shop</h2>
                        <span>Freischalten durch Themen, kaufen mit Plus</span>
                    </div>
                    ${renderShopFilters()}
                    <div class="shop-grid">${renderShopItems(state, completed)}</div>
                </div>
            </section>
        </section>
    `;
    bindCharacterDesigner(mainView);
};

function bindCharacterDesigner(mainView) {
    mainView.onclick = event => {
        const setBtn = event.target.closest("[data-character-set]");
        if (setBtn) {
            const state = loadCharacterState();
            const field = setBtn.dataset.characterSet;
            const value = setBtn.dataset.value;
            if (field === "group" && CHARACTER_GROUPS[value]) {
                state.group = value;
                state.model = 0;
            }
            if (field === "gender") state.gender = value;
            if (field === "model") state.model = Number(value) || 0;
            saveCharacterState(state);
            window.renderCharacterDesigner(mainView);
            return;
        }

        const equipBtn = event.target.closest("[data-character-equip]");
        if (equipBtn) {
            equipCharacterItem(equipBtn.dataset.characterEquip, mainView);
            return;
        }

        const buyBtn = event.target.closest("[data-character-buy]");
        if (buyBtn) {
            buyCharacterItem(buyBtn.dataset.characterBuy, mainView);
            return;
        }

        const filterBtn = event.target.closest("[data-character-filter]");
        if (filterBtn) {
            characterShopFilter = filterBtn.dataset.characterFilter;
            window.renderCharacterDesigner(mainView);
        }
    };
}

function equipCharacterItem(itemId, mainView) {
    const state = loadCharacterState();
    const item = itemById(itemId);
    if (!item || !isCharacterItemOwned(state, item)) return;
    state.equipped[item.type] = item.id;
    saveCharacterState(state);
    window.renderCharacterDesigner(mainView);
}

function buyCharacterItem(itemId, mainView) {
    const state = loadCharacterState();
    const item = itemById(itemId);
    if (!item || item.free || isCharacterItemOwned(state, item)) return;
    const progress = itemUnlockProgress(item, getCompletedForCharacter());
    if (!progress.unlocked) return;
    const coins = getCharacterCoins();
    if (coins < item.cost) {
        window.alert("Dafuer fehlen noch Plus-Muenzen.");
        return;
    }
    state.purchased = [...new Set([...state.purchased, item.id])];
    state.equipped[item.type] = item.id;
    saveCharacterState(state);
    setCharacterCoins(coins - item.cost);
    window.renderCharacterDesigner(mainView);
}

function renderGroupChoices(state) {
    return Object.entries(CHARACTER_GROUPS).map(([groupId, group]) => `
        <button type="button" class="group-choice ${state.group === groupId ? "active" : ""}" data-character-set="group" data-value="${groupId}">
            <span class="group-mini">${miniPortraitSvg(groupId, 0)}</span>
            <span class="group-copy"><strong>${group.label}</strong><small>${group.tag}</small></span>
        </button>
    `).join("");
}

function renderGenderChoices(state) {
    return CHARACTER_GENDERS.map(gender => `
        <button type="button" class="pill-choice ${state.gender === gender.id ? "active" : ""}" data-character-set="gender" data-value="${gender.id}">
            ${gender.label}
        </button>
    `).join("");
}

function renderModelChoices(state) {
    return CHARACTER_GROUPS[state.group].models.map((model, index) => `
        <button type="button" class="model-choice ${Number(state.model) === index ? "active" : ""}" data-character-set="model" data-value="${index}" aria-label="Modell ${index + 1}">
            ${miniPortraitSvg(state.group, index)}
        </button>
    `).join("");
}

function renderWardrobe(state, completed) {
    return ["hair", "outfit", "accessory", "makeup"].map(type => `
        <section class="wardrobe-section">
            <h3>${typeLabel(type)}</h3>
            <div class="item-row">${itemsByType(type).filter(item => item.free || isCharacterItemOwned(state, item)).map(item => renderItemCard(item, state, completed, "wardrobe")).join("")}</div>
        </section>
    `).join("");
}

function renderShopFilters() {
    const filters = [
        ["all", "Alle"],
        ["hair", "Frisuren"],
        ["outfit", "Kleidung"],
        ["accessory", "Accessoires"]
    ];
    return `<div class="shop-filters">${filters.map(([id, label]) => `
        <button type="button" class="pill-choice ${characterShopFilter === id ? "active" : ""}" data-character-filter="${id}">${label}</button>
    `).join("")}</div>`;
}

function renderShopItems(state, completed) {
    const items = themeShopItems().filter(item => characterShopFilter === "all" || item.type === characterShopFilter);
    return items.map(item => renderItemCard(item, state, completed, "shop")).join("");
}

function renderItemCard(item, state, completed, mode) {
    const owned = isCharacterItemOwned(state, item);
    const equipped = state.equipped[item.type] === item.id;
    const progress = itemUnlockProgress(item, completed);
    const locked = !progress.unlocked;
    const coins = getCharacterCoins();
    const canBuy = progress.unlocked && !owned && coins >= item.cost;
    const status = item.free
        ? "Startteil"
        : owned
            ? "gekauft"
            : locked
                ? `gesperrt ${progress.done}/${progress.total}`
                : `${item.cost} Plus`;
    const action = owned
        ? `<button type="button" class="item-action" data-character-equip="${item.id}" ${equipped ? "disabled" : ""}>${equipped ? "aktiv" : "anlegen"}</button>`
        : `<button type="button" class="item-action" data-character-buy="${item.id}" ${canBuy ? "" : "disabled"}>${locked ? "gesperrt" : "kaufen"}</button>`;
    return `
        <article class="item-card ${owned ? "owned" : ""} ${locked ? "locked" : ""} ${equipped ? "equipped" : ""}">
            <div class="item-token" style="--item-color:${item.color || "#0f766e"}">${item.icon || itemTokenLabel(item)}</div>
            <strong>${item.label}</strong>
            <small>${item.theme ? characterEscape(item.theme) : typeLabel(item.type)}</small>
            <span>${status}</span>
            ${mode === "wardrobe" && !owned ? "" : action}
        </article>
    `;
}

function itemTokenLabel(item) {
    if (item.type === "hair") return "H";
    if (item.type === "outfit") return "T";
    if (item.type === "makeup") return "*";
    return "A";
}

function typeLabel(type) {
    const labels = {
        hair: "Frisuren",
        outfit: "Kleidung",
        accessory: "Accessoires",
        makeup: "Schminke"
    };
    return labels[type] || type;
}

function genderLabel(genderId) {
    return CHARACTER_GENDERS.find(gender => gender.id === genderId)?.label || "neutral";
}

function ownedCount(state) {
    return allCharacterItems().filter(item => isCharacterItemOwned(state, item)).length;
}

function visualItem(state, type) {
    return itemById(state.equipped[type]) || BASE_CHARACTER_ITEMS.find(item => item.type === type);
}

function characterSvg(state) {
    const group = CHARACTER_GROUPS[state.group] || CHARACTER_GROUPS.ork;
    const model = group.models[Number(state.model) % group.models.length] || group.models[0];
    const hair = visualItem(state, "hair") || {};
    const outfit = visualItem(state, "outfit") || {};
    const accessory = visualItem(state, "accessory") || {};
    const makeup = visualItem(state, "makeup") || {};
    const body = bodyMetrics(group.body);
    const outfitColor = outfit.color || "#0f766e";
    const hairColor = hair.color || model.hair;
    const accent = accessory.color || outfitColor;

    return `
        <svg class="character-svg" viewBox="0 0 220 300" role="img" aria-label="Schulavatar">
            <defs>
                <linearGradient id="char-floor" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.76"/>
                    <stop offset="1" stop-color="${outfitColor}" stop-opacity="0.18"/>
                </linearGradient>
            </defs>
            <ellipse cx="110" cy="270" rx="70" ry="14" fill="#0f172a" opacity="0.18"/>
            ${accessory.id === "acc_backpack" ? `<rect x="${body.backpackX}" y="120" width="44" height="92" rx="16" fill="#78350f" opacity="0.88"/><path d="M72 138c-18 22-18 48-2 70" fill="none" stroke="#92400e" stroke-width="6" stroke-linecap="round"/>` : ""}
            <path d="M${110 - body.shoulder} 130 Q110 112 ${110 + body.shoulder} 130 L${110 + body.waist} 235 Q110 252 ${110 - body.waist} 235 Z" fill="${outfitColor}" stroke="#102a27" stroke-width="4"/>
            ${outfitPattern(outfit, body, accent)}
            <path d="M${110 - body.shoulder + 6} 145 Q${60 - body.armOffset} 172 ${69 - body.armOffset} 218" fill="none" stroke="${model.skin}" stroke-width="17" stroke-linecap="round"/>
            <path d="M${110 + body.shoulder - 6} 145 Q${160 + body.armOffset} 172 ${151 + body.armOffset} 218" fill="none" stroke="${model.skin}" stroke-width="17" stroke-linecap="round"/>
            ${heldAccessory(accessory, accent)}
            <path d="M91 232 L83 268" stroke="#1f2937" stroke-width="${body.legWidth}" stroke-linecap="round"/>
            <path d="M129 232 L137 268" stroke="#1f2937" stroke-width="${body.legWidth}" stroke-linecap="round"/>
            <path d="M70 268h30M120 268h30" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
            ${groupExtrasBehind(state.group, model)}
            <circle cx="110" cy="78" r="${body.head}" fill="${model.skin}" stroke="#102a27" stroke-width="4"/>
            ${earSvg(state.group, model, body)}
            ${hairSvg(hair.style || "short", hairColor, state.group)}
            ${faceSvg(state, model, makeup)}
            ${groupExtrasFront(state.group, model)}
            ${accessoryOnFace(accessory, accent)}
        </svg>
    `;
}

function bodyMetrics(body) {
    const map = {
        power: { shoulder: 55, waist: 35, head: 31, legWidth: 15, armOffset: 12, backpackX: 52 },
        compact: { shoulder: 48, waist: 42, head: 30, legWidth: 18, armOffset: 5, backpackX: 56 },
        slim: { shoulder: 38, waist: 24, head: 28, legWidth: 12, armOffset: 0, backpackX: 62 },
        clever: { shoulder: 42, waist: 29, head: 29, legWidth: 13, armOffset: 0, backpackX: 60 },
        nature: { shoulder: 44, waist: 31, head: 30, legWidth: 14, armOffset: 4, backpackX: 58 }
    };
    return map[body] || map.clever;
}

function outfitPattern(outfit, body, accent) {
    if (outfit.style === "overall") {
        return `<path d="M86 132v95M134 132v95M86 178h48" stroke="#e0f2fe" stroke-width="6" opacity="0.5"/><circle cx="92" cy="154" r="4" fill="#facc15"/><circle cx="128" cy="154" r="4" fill="#facc15"/>`;
    }
    if (outfit.style === "jacket") {
        return `<path d="M110 122v117M80 152h60" stroke="#ffffff" stroke-width="5" opacity="0.62"/><rect x="96" y="154" width="28" height="36" rx="8" fill="${accent}" opacity="0.42"/>`;
    }
    return `<path d="M85 150 Q110 166 135 150" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.58"/><path d="M101 130l9 14 9-14" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.62"/>`;
}

function hairSvg(style, color, groupId) {
    const twig = groupId === "druide" ? `<path d="M94 35l-10-17M125 36l13-18" stroke="#365314" stroke-width="4" stroke-linecap="round"/><circle cx="82" cy="17" r="5" fill="#84cc16"/><circle cx="139" cy="17" r="5" fill="#84cc16"/>` : "";
    if (style === "long") return `${twig}<path d="M78 72 Q77 33 111 31 Q146 34 144 83 Q139 119 128 133 Q126 98 129 69 Q111 53 88 67 Q91 102 86 132 Q76 112 78 72Z" fill="${color}" stroke="#102a27" stroke-width="3"/>`;
    if (style === "curls") return `${twig}<g fill="${color}" stroke="#102a27" stroke-width="2"><circle cx="82" cy="57" r="13"/><circle cx="96" cy="43" r="14"/><circle cx="114" cy="39" r="15"/><circle cx="132" cy="48" r="14"/><circle cx="142" cy="65" r="12"/></g>`;
    if (style === "bun") return `${twig}<path d="M80 72 Q84 37 111 34 Q139 38 141 72 Q113 54 80 72Z" fill="${color}" stroke="#102a27" stroke-width="3"/><circle cx="145" cy="47" r="14" fill="${color}" stroke="#102a27" stroke-width="3"/>`;
    if (style === "streak") return `${twig}<path d="M80 72 Q84 34 111 32 Q140 38 141 74 Q112 52 80 72Z" fill="${color}" stroke="#102a27" stroke-width="3"/><path d="M101 34 Q111 52 105 83" stroke="#fff7ed" stroke-width="7" stroke-linecap="round" opacity="0.82"/>`;
    return `${twig}<path d="M80 72 Q84 35 111 32 Q140 38 141 73 Q111 54 80 72Z" fill="${color}" stroke="#102a27" stroke-width="3"/>`;
}

function earSvg(groupId, model, body) {
    if (groupId === "elf") {
        return `<path d="M82 76 L49 58 L78 94Z" fill="${model.skin}" stroke="#102a27" stroke-width="4"/><path d="M138 76 L171 58 L142 94Z" fill="${model.skin}" stroke="#102a27" stroke-width="4"/>`;
    }
    if (groupId === "ork") {
        return `<path d="M82 80 L56 72 L78 96Z" fill="${model.skin}" stroke="#102a27" stroke-width="4"/><path d="M138 80 L164 72 L142 96Z" fill="${model.skin}" stroke="#102a27" stroke-width="4"/>`;
    }
    return `<circle cx="${110 - body.head}" cy="80" r="8" fill="${model.skin}" stroke="#102a27" stroke-width="3"/><circle cx="${110 + body.head}" cy="80" r="8" fill="${model.skin}" stroke="#102a27" stroke-width="3"/>`;
}

function faceSvg(state, model, makeup) {
    const lashes = state.gender === "female" ? `<path d="M96 75l-6-5M124 75l6-5" stroke="#102a27" stroke-width="2" stroke-linecap="round"/>` : "";
    const freckles = makeup.style === "freckles" ? `<g fill="${model.cheek}"><circle cx="91" cy="87" r="2"/><circle cx="98" cy="90" r="1.8"/><circle cx="122" cy="90" r="1.8"/><circle cx="129" cy="87" r="2"/></g>` : "";
    const star = makeup.style === "star" ? `<path d="M135 88l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#facc15" stroke="#92400e" stroke-width="1.5"/>` : "";
    const choco = makeup.style === "choco" ? `<path d="M84 91 Q95 102 106 93" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" opacity="0.75"/>` : "";
    return `
        <circle cx="97" cy="78" r="4" fill="#102a27"/>
        <circle cx="123" cy="78" r="4" fill="#102a27"/>
        ${lashes}
        <path d="M104 94 Q110 99 116 94" fill="none" stroke="#102a27" stroke-width="3" stroke-linecap="round"/>
        <circle cx="88" cy="92" r="7" fill="${model.cheek}" opacity="0.35"/>
        <circle cx="132" cy="92" r="7" fill="${model.cheek}" opacity="0.35"/>
        ${freckles}${star}${choco}
    `;
}

function groupExtrasBehind(groupId, model) {
    if (groupId === "elf") return `<path d="M110 45 Q120 16 138 31" fill="none" stroke="#fef3c7" stroke-width="4" opacity="0.8"/>`;
    return "";
}

function groupExtrasFront(groupId, model) {
    if (groupId === "ork") {
        return `<path d="M94 99l5 13 6-13M116 99l6 13 5-13" fill="#f8fafc" stroke="#102a27" stroke-width="2"/><path d="M90 67l16-5M130 67l-16-5" stroke="#102a27" stroke-width="4" stroke-linecap="round"/>`;
    }
    if (groupId === "zauberer") {
        return `<circle cx="97" cy="78" r="10" fill="none" stroke="#0f172a" stroke-width="3"/><circle cx="123" cy="78" r="10" fill="none" stroke="#0f172a" stroke-width="3"/><path d="M107 78h6" stroke="#0f172a" stroke-width="3"/><path d="M136 54l14-9" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>`;
    }
    if (groupId === "druide") {
        return `<path d="M129 96q11 10 20 1" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" opacity="0.7"/>`;
    }
    if (groupId === "zwerg") {
        return `<circle cx="86" cy="78" r="3" fill="#92400e"/><circle cx="134" cy="78" r="3" fill="#92400e"/>`;
    }
    return "";
}

function heldAccessory(accessory, accent) {
    if (accessory.id === "acc_none" || accessory.id === "acc_backpack" || accessory.id === "acc_glasses" || accessory.id === "acc_headphones") return "";
    return `<g transform="translate(151 190)"><rect x="-15" y="-18" width="30" height="34" rx="8" fill="${accent}" stroke="#102a27" stroke-width="3"/><text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${accessory.icon || "A"}</text></g>`;
}

function accessoryOnFace(accessory, accent) {
    if (accessory.id === "acc_glasses") return `<circle cx="97" cy="78" r="11" fill="none" stroke="#111827" stroke-width="3"/><circle cx="123" cy="78" r="11" fill="none" stroke="#111827" stroke-width="3"/><path d="M108 78h4" stroke="#111827" stroke-width="3"/>`;
    if (accessory.id === "acc_headphones") return `<path d="M80 76 Q110 35 140 76" fill="none" stroke="#111827" stroke-width="6"/><rect x="73" y="72" width="13" height="28" rx="6" fill="${accent}"/><rect x="134" y="72" width="13" height="28" rx="6" fill="${accent}"/>`;
    return "";
}

function miniPortraitSvg(groupId, index) {
    const group = CHARACTER_GROUPS[groupId] || CHARACTER_GROUPS.ork;
    const model = group.models[index % group.models.length];
    return `
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <circle cx="32" cy="24" r="16" fill="${model.skin}" stroke="#102a27" stroke-width="3"/>
            ${groupId === "elf" ? `<path d="M18 25L5 17l10 18M46 25l13-8-10 18" fill="${model.skin}" stroke="#102a27" stroke-width="3"/>` : ""}
            ${groupId === "ork" ? `<path d="M18 26L8 22l8 12M46 26l10-4-8 12" fill="${model.skin}" stroke="#102a27" stroke-width="3"/>` : ""}
            <path d="M16 24 Q19 6 33 8 Q48 10 48 26 Q33 16 16 24Z" fill="${model.hair}" stroke="#102a27" stroke-width="2"/>
            <circle cx="26" cy="24" r="2" fill="#102a27"/>
            <circle cx="38" cy="24" r="2" fill="#102a27"/>
            <path d="M27 34q5 4 10 0" fill="none" stroke="#102a27" stroke-width="2" stroke-linecap="round"/>
            <path d="M18 46 Q32 38 46 46 L50 62H14Z" fill="#0f766e" stroke="#102a27" stroke-width="3"/>
            ${groupId === "druide" ? `<path d="M27 8l-6-8M39 9l8-7" stroke="#365314" stroke-width="3"/><circle cx="20" cy="1" r="3" fill="#84cc16"/>` : ""}
            ${groupId === "zauberer" ? `<circle cx="26" cy="24" r="5" fill="none" stroke="#111827" stroke-width="2"/><circle cx="38" cy="24" r="5" fill="none" stroke="#111827" stroke-width="2"/>` : ""}
        </svg>
    `;
}
