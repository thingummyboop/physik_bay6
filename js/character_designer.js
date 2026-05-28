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
        <!-- Eye Whites -->
        <ellipse cx="96" cy="78" rx="8" ry="6" fill="#ffffff" filter="url(#soft-shadow)"/>
        <ellipse cx="124" cy="78" rx="8" ry="6" fill="#ffffff" filter="url(#soft-shadow)"/>
        
        <!-- Irises & Pupils -->
        <circle cx="96" cy="78" r="4.5" fill="url(#eye-iris)"/>
        <circle cx="96" cy="78" r="2" fill="#000000"/>
        <circle cx="124" cy="78" r="4.5" fill="url(#eye-iris)"/>
        <circle cx="124" cy="78" r="2" fill="#000000"/>
        
        <!-- Eye Highlights -->
        <circle cx="94" cy="76" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="122" cy="76" r="1.5" fill="#ffffff" opacity="0.9"/>
        
        ${lashes}
        
        <!-- Eyebrows -->
        <path d="M86 68 Q96 64 104 68" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
        <path d="M134 68 Q124 64 116 68" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
        
        <!-- Nose -->
        <path d="M106 88 Q110 93 114 88" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        
        <!-- Mouth -->
        <path d="M102 98 Q110 104 118 98" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
        <path d="M106 98 Q110 102 114 98" fill="#ec4899" opacity="0.6"/>
        
        <!-- Blush -->
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

function miniPortraitSvg(groupId, index) {
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
