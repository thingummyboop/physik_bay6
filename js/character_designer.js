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
            { skin: "#a3d86c", hair: "#1f2937", cheek: "#699a42" }
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

function characterGradeLabel(grade) {
    if (!grade) return "Extra";
    return `${grade}. Klasse`;
}

function themeShopItems() {
    const items = [];
    allThemeGroups().forEach(group => {
        const style = SUBJECT_ITEM_STYLES[group.subjectId] || { icon: group.subject.icon, color: group.subject.accent, thing: "Fundstueck" };
        const idBase = `${group.subjectId}_${group.grade}_${slugify(group.strand)}`;
        const requiredTopics = group.topics.filter(topic => topic.available).map(topic => topic.id);
        const labelBase = `${group.subject.label}: ${characterGradeLabel(group.grade)} ${group.strand}`;
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
    const group = CHARACTER_GROUPS[state.group] || CHARACTER_GROUPS.ork;
    if (Number(state.model) >= group.models.length) {
        state.model = Number(state.model) % group.models.length;
        saveCharacterState(state);
    }
    const completed = getCompletedForCharacter();
    mainView.dataset.shellView = "character";
    mainView.innerHTML = `
        <section class="character-hero">
            <p class="eyebrow">Charakterdesigner</p>
            <h1>Dein Schulavatar</h1>
            <p>Erstelle eine Spielfigur f&uuml;r deinen Lernweg. Neue Fach-Styles werden durch abgeschlossene Themen freigeschaltet und mit + gekauft.</p>
        </section>
        <section class="character-layout">
            <aside class="character-preview-panel">
                <div class="character-stage">${characterSvg(state)}</div>
                <div class="character-summary">
                    <strong>${CHARACTER_GROUPS[state.group].label}</strong>
                    <span>${genderLabel(state.gender)} &middot; Modell ${Number(state.model) + 1}</span>
                    <small>${ownedCount(state)} Gegenst&auml;nde verf&uuml;gbar &middot; ${getCharacterCoins()} +</small>
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
                        <div class="designer-block-head"><h2>Modell</h2><span>${CHARACTER_GROUPS[state.group].models.length} Varianten</span></div>
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
                        <span>Freischalten durch Themen, kaufen mit +</span>
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
        window.alert("Dafuer fehlen noch +.");
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
                : `${item.cost} +`;
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

    if (state.group === "ork") {
        return premiumOrkSvg(state, model, hair, outfit, accessory, makeup, outfitColor, hairColor, accent);
    }

    return `
        <svg class="character-svg" viewBox="0 0 220 300" role="img" aria-label="Schulavatar">
            <defs>
                <linearGradient id="char-floor" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.76"/>
                    <stop offset="1" stop-color="${outfitColor}" stop-opacity="0.18"/>
                </linearGradient>
                <radialGradient id="skin-gradient" cx="40%" cy="40%" r="70%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
                    <stop offset="50%" stop-color="${model.skin}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
                </radialGradient>
                <linearGradient id="outfit-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${outfitColor}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
                </linearGradient>
                <linearGradient id="leg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#111827"/>
                    <stop offset="50%" stop-color="#374151"/>
                    <stop offset="100%" stop-color="#111827"/>
                </linearGradient>
                <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.3"/>
                </filter>
                <filter id="soft-shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.15"/>
                </filter>
                <radialGradient id="eye-iris" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="${outfitColor}"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </radialGradient>
            </defs>
            <ellipse cx="110" cy="285" rx="75" ry="12" fill="#0f172a" opacity="0.25" filter="url(#soft-shadow)"/>
            
            ${accessory.id === "acc_backpack" ? `<rect x="${body.backpackX}" y="120" width="46" height="96" rx="18" fill="#78350f" filter="url(#drop-shadow)"/><path d="M70 140c-20 24-20 52-2 74" fill="none" stroke="#92400e" stroke-width="8" stroke-linecap="round" filter="url(#soft-shadow)"/>` : ""}
            
            <!-- Body -->
            <path d="M${110 - body.shoulder} 130 Q110 115 ${110 + body.shoulder} 130 L${110 + body.waist} 240 Q110 255 ${110 - body.waist} 240 Z" fill="url(#outfit-gradient)" filter="url(#drop-shadow)"/>
            ${outfitPattern(outfit, body, accent)}
            
            <!-- Legs -->
            <path d="M91 235 L83 275" stroke="url(#leg-gradient)" stroke-width="${body.legWidth}" stroke-linecap="round" filter="url(#soft-shadow)"/>
            <path d="M129 235 L137 275" stroke="url(#leg-gradient)" stroke-width="${body.legWidth}" stroke-linecap="round" filter="url(#soft-shadow)"/>
            
            <!-- Shoes -->
            <path d="M68 275h32a6 6 0 0 1 0 12H68a6 6 0 0 1 0-12zM120 275h32a6 6 0 0 1 0 12h-32a6 6 0 0 1 0-12z" fill="#1f2937" filter="url(#soft-shadow)"/>
            <path d="M72 284h24M124 284h24" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>

            <!-- Arms -->
            <path d="M${110 - body.shoulder + 6} 145 Q${55 - body.armOffset} 175 ${66 - body.armOffset} 225" fill="none" stroke="url(#skin-gradient)" stroke-width="18" stroke-linecap="round" filter="url(#drop-shadow)"/>
            <path d="M${110 + body.shoulder - 6} 145 Q${165 + body.armOffset} 175 ${154 + body.armOffset} 225" fill="none" stroke="url(#skin-gradient)" stroke-width="18" stroke-linecap="round" filter="url(#drop-shadow)"/>
            
            <!-- Hands -->
            <circle cx="${66 - body.armOffset}" cy="225" r="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>
            <circle cx="${154 + body.armOffset}" cy="225" r="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>

            ${heldAccessory(accessory, accent)}
            ${groupExtrasBehind(state.group, model)}
            
            <!-- Neck shadow -->
            <path d="M98 128 Q110 140 122 128" fill="#000000" opacity="0.2"/>

            <!-- Head -->
            <circle cx="110" cy="78" r="${body.head}" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/>
            
            ${earSvg(state.group, model, body)}
            ${hairSvg(hair.style || "short", hairColor, state.group)}
            ${faceSvg(state, model, makeup)}
            ${groupExtrasFront(state.group, model)}
            ${accessoryOnFace(accessory, accent)}
        </svg>
    `;
}

function premiumOrkSvg(state, model, hair, outfit, accessory, makeup, outfitColor, hairColor, accent) {
    const modelIndex = Math.abs(Number(state.model) || 0) % 3;
    const ids = {
        skin: "premium-ork-skin",
        skinSide: "premium-ork-skin-side",
        coat: "premium-ork-coat",
        hoodie: "premium-ork-hoodie",
        pants: "premium-ork-pants",
        boot: "premium-ork-boot",
        scarf: "premium-ork-scarf",
        shadow: "premium-ork-shadow",
        soft: "premium-ork-soft",
        iris: "premium-ork-iris",
        classroom: "premium-ork-classroom",
        floor: "premium-ork-floor"
    };
    const cheek = model.cheek || "#4f7f37";
    const genderPose = state.gender === "male" ? 2 : state.gender === "female" ? -1 : 0;
    const modelLean = (modelIndex - 1) * 0.8 + genderPose * 0.25;
    const coatColor = modelIndex === 1 ? "#2f5138" : modelIndex === 2 ? "#315c3a" : "#2f6f3e";

    return `
        <svg class="character-svg" viewBox="0 0 280 360" role="img" aria-label="Schulavatar Ork">
            <defs>
                <linearGradient id="${ids.classroom}" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#cfc2b6"/>
                    <stop offset="100%" stop-color="#8c7b6c"/>
                </linearGradient>
                <linearGradient id="${ids.floor}" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#69513e"/>
                    <stop offset="100%" stop-color="#402e21"/>
                </linearGradient>
                <linearGradient id="${ids.skin}" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${model.skin}"/>
                    <stop offset="100%" stop-color="#345c32"/>
                </linearGradient>
                <linearGradient id="${ids.skinSide}" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#6ba64b"/>
                    <stop offset="100%" stop-color="#214221"/>
                </linearGradient>
                <linearGradient id="${ids.coat}" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${coatColor}"/>
                    <stop offset="100%" stop-color="#143621"/>
                </linearGradient>
                <linearGradient id="${ids.hoodie}" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#6b4c3a"/>
                    <stop offset="100%" stop-color="#302018"/>
                </linearGradient>
                <linearGradient id="${ids.pants}" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#8a5c37"/>
                    <stop offset="100%" stop-color="#462c18"/>
                </linearGradient>
                <linearGradient id="${ids.boot}" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#4a3b32"/>
                    <stop offset="100%" stop-color="#1c1410"/>
                </linearGradient>
                <linearGradient id="${ids.scarf}" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stop-color="#e8b923"/>
                    <stop offset="47%" stop-color="#a67c0c"/>
                    <stop offset="100%" stop-color="#e8b923"/>
                </linearGradient>
                <radialGradient id="${ids.iris}" cx="45%" cy="38%" r="65%">
                    <stop offset="0%" stop-color="#fdfa72"/>
                    <stop offset="58%" stop-color="${outfitColor || accent}"/>
                    <stop offset="100%" stop-color="#022c22"/>
                </radialGradient>
                <filter id="${ids.shadow}" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="2" dy="8" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>  
                </filter>
                <filter id="${ids.soft}" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>   
                </filter>
            </defs>
            
            ${premiumOrkClassroomBackdrop(modelIndex, ids)}
            <ellipse cx="140" cy="340" rx="80" ry="12" fill="#000000" opacity="0.4"/>

            <g filter="url(#${ids.shadow})" transform="rotate(${modelLean} 140 184)">
                ${premiumOrkSatchel(accessory, ids, accent)}
                ${premiumOrkLegs(ids, accent, modelIndex)}
                ${premiumOrkArmsBehind(ids, modelIndex, model)}
                ${premiumOrkOutfit(outfit, ids, accent, modelIndex)}
                ${premiumOrkArmsFront(ids, modelIndex, model)}
                ${premiumOrkHeldAccessory(accessory, accent)}

                <!-- Low Poly Head Base -->
                <polygon points="105,120 135,120 160,110 170,80 160,40 135,25 105,25 80,40 70,80 80,110" fill="url(#${ids.skin})"/>
                <!-- Faceted shading on jaw -->
                <polygon points="105,120 135,120 120,135" fill="url(#${ids.skinSide})"/>
                <polygon points="80,110 105,120 120,135 90,125" fill="#2d4a23"/>
                <polygon points="160,110 135,120 120,135 150,125" fill="#1b3314"/>

                <!-- Ears (Polygonal) -->
                <polygon points="75,70 30,85 70,90" fill="url(#${ids.skinSide})"/>
                <polygon points="75,70 30,85 60,75" fill="url(#${ids.skin})"/>
                
                <polygon points="165,70 210,85 170,90" fill="url(#${ids.skinSide})"/>
                <polygon points="165,70 210,85 180,75" fill="url(#${ids.skin})"/>

                ${premiumOrkHair(modelIndex, hair.style || "short", hairColor, accent, ids)}
                ${premiumOrkFace(state, makeup, cheek, ids, accent, model)}
                ${premiumOrkFaceAccessory(accessory, ids, accent)}
            </g>
        </svg>
    `;
}

function premiumOrkClassroomBackdrop(modelIndex, ids) {
    return `
        <g opacity="0.95">
            <rect x="12" y="10" width="256" height="340" rx="16" fill="url(#${ids.classroom})"/>
            <!-- Stone wall pattern (polygonal background) -->
            <path d="M 12 10 L 80 10 L 90 60 L 12 70 Z" fill="#b0a396" opacity="0.4"/>
            <path d="M 80 10 L 170 10 L 160 50 L 90 60 Z" fill="#c4b6a8" opacity="0.4"/>
            <path d="M 170 10 L 268 10 L 268 70 L 160 50 Z" fill="#9e9185" opacity="0.4"/>
            <path d="M 12 70 L 90 60 L 80 120 L 12 110 Z" fill="#9e9185" opacity="0.4"/>
            <path d="M 90 60 L 160 50 L 180 100 L 80 120 Z" fill="#a69a8e" opacity="0.4"/>
            <path d="M 160 50 L 268 70 L 268 130 L 180 100 Z" fill="#b0a396" opacity="0.4"/>

            <rect x="12" y="220" width="256" height="130" fill="url(#${ids.floor})"/>
            <!-- Wooden floor boards -->
            <polygon points="12,220 50,220 30,350 12,350" fill="#523a27" stroke="#362416" stroke-width="2"/>
            <polygon points="50,220 120,220 100,350 30,350" fill="#4d3523" stroke="#362416" stroke-width="2"/>
            <polygon points="120,220 180,220 170,350 100,350" fill="#5c412c" stroke="#362416" stroke-width="2"/>
            <polygon points="180,220 268,220 268,350 170,350" fill="#4a3322" stroke="#362416" stroke-width="2"/>

            <!-- Chalkboard -->
            <polygon points="30,80 110,80 110,180 30,180" fill="#3a453f" stroke="#5c432d" stroke-width="6"/>
            <!-- Chalk runes -->
            <path d="M 45 100 L 55 100 L 50 110 M 65 100 L 60 110 L 70 110 M 80 100 L 80 110 L 90 105 Z" fill="none" stroke="#e2e8f0" stroke-width="2" opacity="0.6"/>
        </g>
    `;
}

function premiumOrkLegs(ids, accent, modelIndex) {
    return `
        <!-- Left Leg -->
        <polygon points="115,220 115,280 90,300 80,220" fill="url(#${ids.pants})" stroke="#26170d" stroke-width="3" stroke-linejoin="round"/>
        <!-- Right Leg -->
        <polygon points="125,220 160,220 150,300 125,280" fill="url(#${ids.pants})" stroke="#26170d" stroke-width="3" stroke-linejoin="round"/>
        
        <!-- Patches -->
        <polygon points="90,260 105,255 100,275 85,270" fill="#593c24" stroke="#a37651" stroke-width="1.5" stroke-dasharray="2 2"/>
        <polygon points="135,265 148,270 145,285 130,280" fill="#452f1b" stroke="#a37651" stroke-width="1.5" stroke-dasharray="2 2"/>

        <!-- Left Boot -->
        <polygon points="90,290 115,280 120,310 110,335 70,335 70,310" fill="url(#${ids.boot})" stroke="#120c08" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="70,335 110,335 110,345 70,345" fill="#291e17" stroke="#120c08" stroke-width="2"/>
        
        <!-- Right Boot -->
        <polygon points="125,280 150,290 170,310 170,335 130,335 120,310" fill="url(#${ids.boot})" stroke="#120c08" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="130,335 170,335 170,345 130,345" fill="#291e17" stroke="#120c08" stroke-width="2"/>
    `;
}

function premiumOrkArmsBehind(ids, modelIndex, model) {
    return `
        <!-- Left Arm Sleeve (Low Poly) -->
        <polygon points="70,140 85,150 70,220 45,200" fill="url(#${ids.hoodie})" stroke="#1c110b" stroke-width="3" stroke-linejoin="round"/>
        <!-- Right Arm Sleeve -->
        <polygon points="170,140 155,150 170,220 195,200" fill="url(#${ids.hoodie})" stroke="#1c110b" stroke-width="3" stroke-linejoin="round"/>
    `;
}

function premiumOrkArmsFront(ids, modelIndex, model) {
    return `
        <!-- Left Hand -->
        <polygon points="45,200 70,220 65,245 40,240 35,215" fill="url(#${ids.skin})" stroke="#182e16" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="40,240 65,245 55,230" fill="url(#${ids.skinSide})"/>
        
        <!-- Right Hand -->
        <polygon points="195,200 170,220 175,245 200,240 205,215" fill="url(#${ids.skin})" stroke="#182e16" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="200,240 175,245 185,230" fill="url(#${ids.skinSide})"/>
        
        <!-- Book in left hand (Zelda style prop) -->
        <polygon points="20,195 45,205 35,255 10,245" fill="#8b3420" stroke="#3d140b" stroke-width="2" stroke-linejoin="round" filter="url(#${ids.soft})"/>
        <polygon points="45,205 52,202 42,252 35,255" fill="#d4c39e" stroke="#3d140b" stroke-width="1"/>
    `;
}

function premiumOrkOutfit(outfit, ids, accent, modelIndex) {
    return `
        <!-- Undershirt -->
        <polygon points="90,120 150,120 155,160 145,230 95,230 85,160" fill="url(#${ids.hoodie})" stroke="#1c110b" stroke-width="3" stroke-linejoin="round"/>
        
        <!-- Heavy Tunic / Coat -->
        <polygon points="75,130 95,120 90,240 65,230" fill="url(#${ids.coat})" stroke="#0a1a10" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="165,130 145,120 150,240 175,230" fill="url(#${ids.coat})" stroke="#0a1a10" stroke-width="3" stroke-linejoin="round"/>
        
        <!-- Scarf Wrapped -->
        <polygon points="85,115 155,115 160,135 80,135" fill="url(#${ids.scarf})" stroke="#5c4403" stroke-width="3" stroke-linejoin="round"/>
        <!-- Scarf Tails -->
        <polygon points="110,135 130,135 135,185 125,190 115,185" fill="url(#${ids.scarf})" stroke="#5c4403" stroke-width="3" stroke-linejoin="round" filter="url(#${ids.soft})"/>
        <polygon points="110,135 115,185 110,175" fill="#9e7304"/>
        
        <!-- Belt -->
        <polygon points="88,210 152,210 150,225 90,225" fill="#4a2e19" stroke="#1c1008" stroke-width="2"/>
        <polygon points="110,205 130,205 130,230 110,230" fill="#a8a39a" stroke="#2e2b27" stroke-width="2" filter="url(#${ids.soft})"/>
        <rect x="115" y="210" width="10" height="15" fill="#1c1008"/>
    `;
}

function premiumOrkSatchel(accessory, ids, accent) {
    if (accessory.id !== "acc_backpack") return "";
    return `
        <!-- Satchel Strap -->
        <polygon points="90,135 175,210 165,220 80,145" fill="#633c1d" stroke="#2e1a0b" stroke-width="2"/>
        <!-- Satchel Bag -->
        <polygon points="150,185 210,195 200,260 140,250" fill="#9c6335" stroke="#3b2311" stroke-width="3" stroke-linejoin="round" filter="url(#${ids.shadow})"/>
        <polygon points="150,185 210,195 205,230 145,220" fill="#ba7c47" stroke="#3b2311" stroke-width="2"/>
        <!-- Satchel Buckle -->
        <polygon points="170,215 180,217 178,235 168,233" fill="#cfc1a5" stroke="#3b2311" stroke-width="1.5"/>
        <!-- Fun Patch -->
        <polygon points="185,205 195,207 193,217 183,215" fill="${accent}" opacity="0.9" stroke="#fff" stroke-width="1"/>
    `;
}

function premiumOrkHair(modelIndex, style, hairColor, accent, ids) {
    let hair = ``;
    if (style === "long") {
        hair = `
            <polygon points="105,30 135,30 155,45 165,80 155,95 165,130 150,140 145,110 150,85 140,65" fill="${hairColor}" stroke="#111" stroke-width="2"/>
            <polygon points="105,30 135,30 85,45 75,80 85,95 75,130 90,140 95,110 90,85 100,65" fill="${hairColor}" stroke="#111" stroke-width="2"/>
        `;
    } else if (style === "bun") {
        hair = `
            <polygon points="105,30 135,30 150,55 140,65 100,65 90,55" fill="${hairColor}" stroke="#111" stroke-width="2"/>
            <polygon points="110,30 130,30 135,10 120,5 105,10" fill="${hairColor}" stroke="#111" stroke-width="2"/>
        `;
    } else {
        hair = `
            <polygon points="95,45 110,25 120,35 130,25 145,45 155,65 145,75 140,60 100,60 95,75 85,65" fill="${hairColor}" stroke="#111" stroke-width="2"/>
        `;
    }
    return hair;
}

function premiumOrkFace(state, makeup, cheek, ids, accent, model) {
    const isFemale = state.gender === "female";
    
    return `
        <!-- Brow Ridge (Heavy) -->
        <polygon points="85,65 115,75 125,75 155,65 145,55 120,60 95,55" fill="url(#${ids.skinSide})"/>
        
        <!-- Eyes (Deep set, angled) -->
        <polygon points="95,75 110,78 115,73 98,70" fill="#fff"/>
        <polygon points="145,75 130,78 125,73 142,70" fill="#fff"/>
        
        <circle cx="105" cy="74" r="3" fill="url(#${ids.iris})"/>
        <circle cx="105" cy="74" r="1.5" fill="#000"/>
        
        <circle cx="135" cy="74" r="3" fill="url(#${ids.iris})"/>
        <circle cx="135" cy="74" r="1.5" fill="#000"/>
        
        ${isFemale ? `<path d="M 95 70 L 90 65 M 145 70 L 150 65" stroke="#111" stroke-width="2"/>` : ""}

        <!-- Nose (Wide, flat polygon) -->
        <polygon points="115,75 125,75 130,95 110,95" fill="url(#${ids.skinSide})" opacity="0.8"/>
        <polygon points="110,95 130,95 120,105" fill="#2d4a23"/>
        
        <!-- Nostrils -->
        <polygon points="105,95 115,95 110,100" fill="#111"/>
        <polygon points="135,95 125,95 130,100" fill="#111"/>

        <!-- Underbite / Mouth -->
        <polygon points="100,110 140,110 135,115 105,115" fill="#111"/>
        
        <!-- Tusks -->
        <polygon points="105,115 110,115 105,95" fill="#fdfaed" stroke="#b0a582" stroke-width="1" stroke-linejoin="round"/>
        <polygon points="135,115 130,115 135,95" fill="#fdfaed" stroke="#b0a582" stroke-width="1" stroke-linejoin="round"/>
        
        <!-- Blush -->
        <polygon points="85,90 100,95 90,100" fill="${cheek}" opacity="0.6" filter="url(#${ids.soft})"/>
        <polygon points="155,90 140,95 150,100" fill="${cheek}" opacity="0.6" filter="url(#${ids.soft})"/>
    `;
}

function premiumOrkHeldAccessory(accessory, accent) {
    if (accessory.id !== "acc_backpack") {
        return `<g transform="translate(195 240)" filter="url(#premium-ork-soft)"><rect x="-15" y="-15" width="30" height="30" rx="4" fill="${accent}" stroke="#111" stroke-width="2"/><text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${accessory.icon || "A"}</text></g>`;
    }
    return "";
}

function premiumOrkFaceAccessory(accessory, ids, accent) {
    if (accessory.id === "acc_glasses") {
        return `
            <polygon points="90,75 115,80 115,65 95,65" fill="none" stroke="#111" stroke-width="3"/>
            <polygon points="150,75 125,80 125,65 145,65" fill="none" stroke="#111" stroke-width="3"/>
            <line x1="115" y1="72" x2="125" y2="72" stroke="#111" stroke-width="3"/>
        `;
    }
    if (accessory.id === "acc_headphones") {
        return `
            <path d="M 85 70 C 85 20, 155 20, 155 70" fill="none" stroke="#111" stroke-width="6"/>
            <polygon points="75,60 90,60 90,95 75,95" fill="${accent}" stroke="#111" stroke-width="2"/>
            <polygon points="165,60 150,60 150,95 165,95" fill="${accent}" stroke="#111" stroke-width="2"/>
        `;
    }
    return "";
}

function bodyMetrics(body) {
    const map = {
        power: { shoulder: 58, waist: 38, head: 33, legWidth: 17, armOffset: 14, backpackX: 50 },
        compact: { shoulder: 50, waist: 44, head: 32, legWidth: 20, armOffset: 6, backpackX: 54 },
        slim: { shoulder: 40, waist: 26, head: 29, legWidth: 14, armOffset: 0, backpackX: 60 },
        clever: { shoulder: 44, waist: 30, head: 31, legWidth: 15, armOffset: 0, backpackX: 58 },
        nature: { shoulder: 46, waist: 33, head: 32, legWidth: 16, armOffset: 4, backpackX: 56 }
    };
    return map[body] || map.clever;
}

function outfitPattern(outfit, body, accent) {
    if (outfit.style === "overall") {
        return `<path d="M84 135v105M136 135v105M84 185h52" stroke="#e0f2fe" stroke-width="6" opacity="0.6" filter="url(#soft-shadow)"/><circle cx="90" cy="156" r="5" fill="#facc15" filter="url(#soft-shadow)"/><circle cx="130" cy="156" r="5" fill="#facc15" filter="url(#soft-shadow)"/>`;
    }
    if (outfit.style === "jacket") {
        return `<path d="M110 125v115M78 155h64" stroke="#ffffff" stroke-width="6" opacity="0.7" filter="url(#soft-shadow)"/><rect x="94" y="156" width="32" height="40" rx="10" fill="${accent}" opacity="0.6" filter="url(#soft-shadow)"/>`;
    }
    return `<path d="M82 152 Q110 170 138 152" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.6" filter="url(#soft-shadow)"/><path d="M99 132l11 16 11-16" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.7" filter="url(#soft-shadow)"/>`;
}

function hairSvg(style, color, groupId) {
    const twig = groupId === "druide" ? `<path d="M92 32l-12-19M128 33l15-20" stroke="#365314" stroke-width="5" stroke-linecap="round" filter="url(#soft-shadow)"/><circle cx="78" cy="12" r="6" fill="#84cc16" filter="url(#soft-shadow)"/><circle cx="145" cy="12" r="6" fill="#84cc16" filter="url(#soft-shadow)"/>` : "";
    const highlight = `<path d="M85 55 Q110 45 135 55" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.15" stroke-linecap="round"/>`;

    if (style === "long") return `${twig}<path d="M74 74 Q73 30 111 28 Q150 32 148 85 Q142 125 130 140 Q127 100 131 68 Q111 50 86 65 Q89 105 84 138 Q72 115 74 74Z" fill="${color}" filter="url(#drop-shadow)"/>${highlight}`;
    if (style === "curls") return `${twig}<g fill="${color}" filter="url(#drop-shadow)"><circle cx="80" cy="55" r="15"/><circle cx="94" cy="40" r="16"/><circle cx="114" cy="35" r="18"/><circle cx="134" cy="45" r="16"/><circle cx="145" cy="65" r="14"/><circle cx="75" cy="70" r="12"/><circle cx="142" cy="82" r="12"/></g>${highlight}`;
    if (style === "bun") return `${twig}<path d="M78 74 Q82 34 111 30 Q142 36 144 74 Q113 52 78 74Z" fill="${color}" filter="url(#drop-shadow)"/><circle cx="148" cy="45" r="16" fill="${color}" filter="url(#drop-shadow)"/>${highlight}`;
    if (style === "streak") return `${twig}<path d="M78 74 Q82 32 111 28 Q144 36 144 76 Q112 50 78 74Z" fill="${color}" filter="url(#drop-shadow)"/><path d="M99 32 Q110 52 103 86" stroke="#fff7ed" stroke-width="8" stroke-linecap="round" opacity="0.9" filter="url(#soft-shadow)"/>${highlight}`;
    return `${twig}<path d="M78 74 Q82 32 111 28 Q144 36 144 75 Q111 52 78 74Z" fill="${color}" filter="url(#drop-shadow)"/>${highlight}`;
}

function earSvg(groupId, model, body) {
    if (groupId === "elf") {
        return `<path d="M80 76 L42 54 L76 96Z" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/><path d="M140 76 L178 54 L144 96Z" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>`;
    }
    if (groupId === "ork") {
        return `<path d="M80 82 L50 72 L76 100Z" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/><path d="M140 82 L170 72 L144 100Z" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>`;
    }
    return `<ellipse cx="${110 - body.head}" cy="80" rx="6" ry="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/><ellipse cx="${110 + body.head}" cy="80" rx="6" ry="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>`;
}

function faceSvg(state, model, makeup) {
    const lashes = state.gender === "female" ? `<path d="M92 73l-7-6M128 73l7-6" stroke="#111827" stroke-width="3" stroke-linecap="round"/>` : "";
    const freckles = makeup.style === "freckles" ? `<g fill="${model.cheek}" opacity="0.8"><circle cx="89" cy="89" r="2.5"/><circle cx="97" cy="92" r="2"/><circle cx="123" cy="92" r="2"/><circle cx="131" cy="89" r="2.5"/><circle cx="93" cy="94" r="1.5"/><circle cx="127" cy="94" r="1.5"/></g>` : "";
    const star = makeup.style === "star" ? `<path d="M136 90l3.5 7 8 1-6 6 1.5 8-7-3.5-7 3.5 1.5-8-6-6 8-1z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" filter="url(#soft-shadow)"/>` : "";
    const choco = makeup.style === "choco" ? `<path d="M82 93 Q94 105 106 95" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round" opacity="0.85"/>` : "";

    return `
        <ellipse cx="96" cy="78" rx="8" ry="6" fill="#ffffff" filter="url(#soft-shadow)"/>
        <ellipse cx="124" cy="78" rx="8" ry="6" fill="#ffffff" filter="url(#soft-shadow)"/>
        <circle cx="96" cy="78" r="4.5" fill="url(#eye-iris)"/>
        <circle cx="96" cy="78" r="2" fill="#000000"/>
        <circle cx="124" cy="78" r="4.5" fill="url(#eye-iris)"/>
        <circle cx="124" cy="78" r="2" fill="#000000"/>
        <circle cx="94" cy="76" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="122" cy="76" r="1.5" fill="#ffffff" opacity="0.9"/>
        ${lashes}
        <path d="M86 68 Q96 64 104 68" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
        <path d="M134 68 Q124 64 116 68" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
        <path d="M106 88 Q110 93 114 88" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M102 98 Q110 104 118 98" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
        <path d="M106 98 Q110 102 114 98" fill="#ec4899" opacity="0.6"/>
        <ellipse cx="86" cy="94" rx="9" ry="6" fill="${model.cheek}" opacity="0.5" filter="url(#soft-shadow)"/>
        <ellipse cx="134" cy="94" rx="9" ry="6" fill="${model.cheek}" opacity="0.5" filter="url(#soft-shadow)"/>
        ${freckles}${star}${choco}
    `;
}

function groupExtrasBehind(groupId, model) {
    if (groupId === "elf") return `<path d="M110 42 Q122 10 142 28" fill="none" stroke="#fde047" stroke-width="5" opacity="0.9" filter="url(#drop-shadow)"/>`;
    return "";
}

function groupExtrasFront(groupId, model) {
    if (groupId === "ork") {
        return `<path d="M93 103l4 14 5-14M117 103l5 14 4-14" fill="#f8fafc" stroke="#111827" stroke-width="2" filter="url(#soft-shadow)"/><path d="M88 65l18-6M132 65l-18-6" stroke="#111827" stroke-width="5" stroke-linecap="round" filter="url(#soft-shadow)"/>`;
    }
    if (groupId === "zauberer") {
        return `<circle cx="96" cy="78" r="11" fill="none" stroke="#eab308" stroke-width="3" filter="url(#soft-shadow)"/><circle cx="124" cy="78" r="11" fill="none" stroke="#eab308" stroke-width="3" filter="url(#soft-shadow)"/><path d="M107 78h9" stroke="#eab308" stroke-width="3" filter="url(#soft-shadow)"/><path d="M138 52l15-10" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#drop-shadow)"/>`;
    }
    if (groupId === "druide") {
        return `<path d="M128 98q12 12 22 2" stroke="#451a03" stroke-width="6" stroke-linecap="round" opacity="0.8" filter="url(#soft-shadow)"/>`;
    }
    if (groupId === "zwerg") {
        return `<ellipse cx="85" cy="80" rx="4" ry="5" fill="#78350f" filter="url(#soft-shadow)"/><ellipse cx="135" cy="80" rx="4" ry="5" fill="#78350f" filter="url(#soft-shadow)"/>`;
    }
    return "";
}

function heldAccessory(accessory, accent) {
    if (accessory.id === "acc_none" || accessory.id === "acc_backpack" || accessory.id === "acc_glasses" || accessory.id === "acc_headphones") return "";
    return `<g transform="translate(151 190)" filter="url(#soft-shadow)"><rect x="-15" y="-18" width="30" height="34" rx="8" fill="${accent}" stroke="#102a27" stroke-width="3"/><text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${accessory.icon || "A"}</text></g>`;
}

function accessoryOnFace(accessory, accent) {
    if (accessory.id === "acc_glasses") return `<circle cx="97" cy="78" r="11" fill="none" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/><circle cx="123" cy="78" r="11" fill="none" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/><path d="M108 78h4" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/>`;
    if (accessory.id === "acc_headphones") return `<path d="M80 76 Q110 35 140 76" fill="none" stroke="#111827" stroke-width="6" filter="url(#soft-shadow)"/><rect x="73" y="72" width="13" height="28" rx="6" fill="${accent}" filter="url(#soft-shadow)"/><rect x="134" y="72" width="13" height="28" rx="6" fill="${accent}" filter="url(#soft-shadow)"/>`;
    return "";
}

function orkMiniPortraitSvg(index) {
    const model = CHARACTER_GROUPS.ork.models[index % CHARACTER_GROUPS.ork.models.length];
    const hair = model.hair || "#1f2937";
    const ribbon = index % 3 === 0
        ? `<path d="M32 11c-6-6-12-5-16 0c5 3 11 3 16 0z" fill="#d8a546" stroke="#6b3f1f" stroke-width="1.5"/><path d="M34 11c6-6 12-5 16 0c-5 3-11 3-16 0z" fill="#d8a546" stroke="#6b3f1f" stroke-width="1.5"/><circle cx="33" cy="11" r="2.8" fill="#9a641c"/>`
        : index % 3 === 1
            ? `<path d="M31 8c3-10 14-9 16 0c-8 0-10 6-6 12" fill="${hair}"/>`
            : `<circle cx="33" cy="8" r="8" fill="${hair}"/><path d="M21 16q12-7 24 0" stroke="#9a6b3c" stroke-width="3" stroke-linecap="round"/>`;
    const braids = index % 3 === 1 ? "" : `
        <g fill="${hair}" opacity="0.95">
            <ellipse cx="18" cy="35" rx="4" ry="6"/><ellipse cx="16" cy="44" rx="4" ry="6"/>
            <ellipse cx="46" cy="35" rx="4" ry="6"/><ellipse cx="48" cy="44" rx="4" ry="6"/>
        </g>
    `;
    return `
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="ork-mini-skin-${index}" cx="38%" cy="34%" r="70%">
                    <stop offset="0%" stop-color="#f2ffd7" stop-opacity="0.35"/>
                    <stop offset="52%" stop-color="${model.skin}"/>
                    <stop offset="100%" stop-color="#33582e"/>
                </radialGradient>
                <filter id="ork-mini-shadow-${index}"><feDropShadow dx="1" dy="2" stdDeviation="1" flood-opacity="0.28"/></filter>
            </defs>
            <rect x="2" y="2" width="60" height="60" rx="19" fill="#d9f99d"/>
            <rect x="5" y="6" width="54" height="56" rx="17" fill="#14532d" opacity="0.18"/>
            <path d="M16 30L4 22l9 17M48 30l12-8l-9 17" fill="url(#ork-mini-skin-${index})" filter="url(#ork-mini-shadow-${index})"/>
            <path d="M18 57q14-15 28 0l5 7H13z" fill="#166534" filter="url(#ork-mini-shadow-${index})"/>
            <path d="M22 47q10 7 20 0" stroke="#f5c94c" stroke-width="4" stroke-linecap="round"/>
            <circle cx="32" cy="27" r="18" fill="url(#ork-mini-skin-${index})" filter="url(#ork-mini-shadow-${index})"/>
            <path d="M17 26Q21 6 34 8Q48 10 48 28Q33 17 17 26Z" fill="${hair}" filter="url(#ork-mini-shadow-${index})"/>
            ${ribbon}
            ${braids}
            <ellipse cx="26" cy="27" rx="3.6" ry="3" fill="#ffffff"/><circle cx="26" cy="27" r="1.6" fill="#111827"/>
            <ellipse cx="38" cy="27" rx="3.6" ry="3" fill="#ffffff"/><circle cx="38" cy="27" r="1.6" fill="#111827"/>
            <path d="M21 21l8-3M35 18l8 3" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M26 38q6 5 12 0" fill="none" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M26 37l2 7l3-6M36 38l3 6l2-7" fill="#ffffff" stroke="#111827" stroke-width="1"/>
            <g fill="${model.cheek}" opacity="0.62"><circle cx="23" cy="35" r="1.4"/><circle cx="41" cy="35" r="1.4"/></g>
            <rect x="3" y="3" width="58" height="58" rx="18" fill="none" stroke="#bbf7d0" stroke-width="2"/>
        </svg>
    `;
}

function miniPortraitSvg(groupId, index) {
    if (groupId === "ork") return orkMiniPortraitSvg(index);

    const group = CHARACTER_GROUPS[groupId] || CHARACTER_GROUPS.ork;
    const model = group.models[index % group.models.length];
    return `
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="mini-skin-${index}" cx="40%" cy="40%" r="70%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
                    <stop offset="50%" stop-color="${model.skin}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
                </radialGradient>
                <filter id="mini-shadow"><feDropShadow dx="1" dy="2" stdDeviation="1" flood-opacity="0.3"/></filter>
            </defs>
            <circle cx="32" cy="24" r="16" fill="url(#mini-skin-${index})" filter="url(#mini-shadow)"/>
            ${groupId === "elf" ? `<path d="M18 25L3 15l12 20M46 25l15-10-12 20" fill="url(#mini-skin-${index})" filter="url(#mini-shadow)"/>` : ""}
            ${groupId === "ork" ? `<path d="M18 26L6 20l10 14M46 26l12-6-10 14" fill="url(#mini-skin-${index})" filter="url(#mini-shadow)"/>` : ""}
            <path d="M16 24 Q19 4 33 6 Q48 8 48 26 Q33 14 16 24Z" fill="${model.hair}" filter="url(#mini-shadow)"/>
            
            <ellipse cx="26" cy="24" r="3" fill="#ffffff"/><circle cx="26" cy="24" r="1.5" fill="#111827"/>
            <ellipse cx="38" cy="24" r="3" fill="#ffffff"/><circle cx="38" cy="24" r="1.5" fill="#111827"/>
            
            <path d="M27 34q5 5 10 0" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 46 Q32 36 48 46 L52 64H12Z" fill="#0f766e" filter="url(#mini-shadow)"/>
            ${groupId === "druide" ? `<path d="M27 6l-8-10M39 7l10-9" stroke="#365314" stroke-width="4"/><circle cx="19" cy="-4" r="4" fill="#84cc16"/>` : ""}
            ${groupId === "zauberer" ? `<circle cx="26" cy="24" r="5" fill="none" stroke="#eab308" stroke-width="2"/><circle cx="38" cy="24" r="5" fill="none" stroke="#eab308" stroke-width="2"/>` : ""}
        </svg>
    `;
}

// Hidden Feature: Principal (Direktor)
window.secretDirektorSvg = function secretDirektorSvg(metal) {
    const m = {
        gold: { base: "#fbbf24", dark: "#b45309", light: "#fef08a", robe: "#451a03", accent: "#f59e0b" },
        silber: { base: "#94a3b8", dark: "#334155", light: "#f8fafc", robe: "#0f172a", accent: "#cbd5e1" },
        kupfer: { base: "#d97706", dark: "#78350f", light: "#fcd34d", robe: "#2e1065", accent: "#b45309" }
    };
    const c = m[metal] || m.gold;
    return `
        <svg class="character-svg" viewBox="0 0 220 300" role="img" aria-label="Geheimer Direktor">
            <defs>
                <linearGradient id="dir-robe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${c.robe}"/>
                    <stop offset="100%" stop-color="#000"/>
                </linearGradient>
                <radialGradient id="dir-metal" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="${c.light}"/>
                    <stop offset="40%" stop-color="${c.base}"/>
                    <stop offset="100%" stop-color="${c.dark}"/>
                </radialGradient>
                <filter id="dir-shadow">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/>
                </filter>
            </defs>
            <ellipse cx="110" cy="285" rx="75" ry="12" fill="#0f172a" opacity="0.25"/>
            <!-- Robe -->
            <path d="M 60 120 C 30 150, 20 200, 10 300 L 210 300 C 200 200, 190 150, 160 120 C 130 100, 90 100, 60 120 Z" fill="url(#dir-robe)" filter="url(#dir-shadow)"/>
            <!-- Robe Accents -->
            <path d="M 110 130 L 90 300 L 130 300 Z" fill="${c.accent}" opacity="0.3"/>
            <!-- Metal Head (Neutral, abstract/funny shape) -->
            <path d="M 110 130 C 60 130, 60 60, 110 60 C 160 60, 160 130, 110 130 Z" fill="url(#dir-metal)" filter="url(#dir-shadow)"/>
            <!-- Big Metal Nose -->
            <ellipse cx="110" cy="100" rx="15" ry="10" fill="url(#dir-metal)" filter="url(#dir-shadow)"/>
            <!-- Big Mustache -->
            <path d="M 80 110 Q 110 100 140 110 Q 150 120 145 125 Q 110 115 75 125 Q 70 120 80 110 Z" fill="${c.light}" filter="url(#dir-shadow)"/>
            <!-- Stern Eyes -->
            <path d="M 85 85 L 105 90 L 105 85 Z" fill="#000"/>
            <path d="M 135 85 L 115 90 L 115 85 Z" fill="#000"/>
            <circle cx="95" cy="92" r="3" fill="#000"/>
            <circle cx="125" cy="92" r="3" fill="#000"/>
            <!-- Monocle -->
            <circle cx="125" cy="92" r="10" fill="none" stroke="${c.light}" stroke-width="2" filter="url(#dir-shadow)"/>
            <path d="M 133 100 Q 140 120 135 150" fill="none" stroke="${c.light}" stroke-width="1.5"/>
            <!-- Graduation Cap -->
            <path d="M 110 20 L 160 40 L 110 60 L 60 40 Z" fill="#111827" filter="url(#dir-shadow)"/>
            <path d="M 80 48 L 80 65 C 80 70, 140 70, 140 65 L 140 48 Z" fill="#1f2937"/>
            <!-- Tassel -->
            <path d="M 110 40 Q 150 40 155 60 L 155 75" fill="none" stroke="${c.accent}" stroke-width="2"/>
            <path d="M 152 75 L 158 75 L 156 85 L 154 85 Z" fill="${c.accent}"/>
        </svg>
    `;
};

