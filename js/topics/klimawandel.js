// Klimawandel: interaktive Lernmodelle

const climateTimelinePoints = [
    { year: 1880, global: -0.2, austria: -0.5 },
    { year: 1900, global: -0.1, austria: -0.3 },
    { year: 1940, global: 0.1, austria: 0.2 },
    { year: 1970, global: 0.0, austria: 0.5 },
    { year: 1990, global: 0.45, austria: 1.1 },
    { year: 2010, global: 0.9, austria: 2.0 },
    { year: 2024, global: 1.4, austria: 3.1 }
];

const impactTexts = {
    heat: {
        title: "Hitze in der Stadt",
        text: "Asphalt, Beton und dunkle Dächer speichern Wärme. In Städten können Nächte dadurch sehr warm bleiben. Bäume, Schatten, helle Flächen und Trinkbrunnen helfen bei der Anpassung.",
        color: "#ef4444"
    },
    drought: {
        title: "Trockenstress",
        text: "Auch wenn nicht überall weniger Regen fällt, verdunstet bei höheren Temperaturen mehr Wasser. Böden, Wälder und Felder trocknen schneller aus.",
        color: "#f97316"
    },
    heavyRain: {
        title: "Starkregen",
        text: "Warme Luft kann mehr Wasserdampf aufnehmen. Wenn diese Luft aufsteigt und abkühlt, kann Regen heftiger ausfallen. Kanalisation und Böden können überfordert sein.",
        color: "#2563eb"
    },
    alps: {
        title: "Alpen und Gletscher",
        text: "Schnee und Eis reagieren stark auf Erwärmung. Gletscher verlieren Masse, Permafrost kann tauen und Hänge können instabiler werden.",
        color: "#0891b2"
    }
};

const actionState = {
    answered: new Set(),
    correct: 0
};

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function interpolateClimate(year, key) {
    for (let i = 0; i < climateTimelinePoints.length - 1; i++) {
        const a = climateTimelinePoints[i];
        const b = climateTimelinePoints[i + 1];
        if (year >= a.year && year <= b.year) {
            const t = (year - a.year) / (b.year - a.year);
            return a[key] + (b[key] - a[key]) * t;
        }
    }
    return climateTimelinePoints[climateTimelinePoints.length - 1][key];
}

function climateColor(anomaly) {
    if (anomaly < -0.25) return "#2563eb";
    if (anomaly < 0) return "#60a5fa";
    if (anomaly < 0.4) return "#fef3c7";
    if (anomaly < 0.9) return "#fb923c";
    if (anomaly < 1.5) return "#ef4444";
    return "#991b1b";
}

function updateGreenhouseLab() {
    const range = document.getElementById("climateGasRange");
    if (!range) return;

    const val = Number(range.value || 70);
    const ppm = Math.round(280 + val * 2);
    const retained = Math.round(35 + val * 0.6);
    const tempRise = (val / 100 * 1.7).toFixed(1);

    const ppmLabel = document.getElementById("climatePpmLabel");
    const heatLabel = document.getElementById("climateHeatLabel");
    const layer = document.getElementById("greenhouseLayer");
    const returningHeat = document.getElementById("returningHeat");
    const escapedHeat = document.getElementById("escapedHeat");
    const heatMeter = document.getElementById("climateHeatMeter");
    const earthGlow = document.getElementById("earthGlow");
    const warmingLabel = document.getElementById("greenhouseWarmingLabel");
    const warmingBar = document.getElementById("greenhouseWarmingBar");
    const warmingBox = document.getElementById("greenhouseWarmingBox");

    range.setAttribute("aria-valuetext", `${ppm} ppm CO2-Modellwert`);
    if (ppmLabel) ppmLabel.textContent = `${ppm} ppm`;
    if (heatLabel) heatLabel.textContent = `${retained}% Wärmerückhalt`;
    if (layer) layer.setAttribute("opacity", (0.18 + val / 125).toFixed(2));
    if (returningHeat) returningHeat.setAttribute("stroke-width", String(2 + val / 18));
    if (escapedHeat) escapedHeat.setAttribute("opacity", String(clamp(0.85 - val / 130, 0.15, 0.85)));
    if (heatMeter) heatMeter.style.width = `${retained}%`;
    if (earthGlow) earthGlow.setAttribute("fill", val > 75 ? "#fb923c" : val > 45 ? "#fbbf24" : "#86efac");
    if (warmingLabel) warmingLabel.textContent = `+${tempRise} °C`;
    if (warmingBar) {
        const warmingBarHeight = 8 + (val / 100) * 28;
        warmingBar.setAttribute("y", (54 - warmingBarHeight).toFixed(1));
        warmingBar.setAttribute("height", warmingBarHeight.toFixed(1));
    }
    if (warmingBox) warmingBox.setAttribute("stroke", val > 75 ? "#dc2626" : val > 45 ? "#f97316" : "#22c55e");

    const explanation = document.getElementById("greenhouseExplanation");
    if (explanation) {
        explanation.innerHTML = `<strong>Modell:</strong> Mehr Treibhausgase bedeuten: Ein größerer Teil der Wärmestrahlung bleibt im Erdsystem. Die Zahl ${tempRise} °C ist hier nur eine vereinfachte Modellanzeige, keine Wettervorhersage für einen bestimmten Tag.`;
    }
}

function buildClimateStripes() {
    const stripeBox = document.getElementById("climateStripes");
    if (!stripeBox || stripeBox.dataset.ready === "true") return;

    const years = [];
    for (let year = 1880; year <= 2024; year += 5) years.push(year);
    stripeBox.innerHTML = years.map(year => {
        const anomaly = interpolateClimate(year, "global");
        return `<span class="climate-stripe" data-year="${year}" title="${year}: ${anomaly.toFixed(1)} °C" style="background:${climateColor(anomaly)}"></span>`;
    }).join("");
    stripeBox.dataset.ready = "true";
}

function updateClimateTimeline() {
    const range = document.getElementById("climateYearRange");
    if (!range) return;

    const year = Number(range.value || 2024);
    const global = interpolateClimate(year, "global");
    const austria = interpolateClimate(year, "austria");
    const yearLabel = document.getElementById("climateYearLabel");
    const globalLabel = document.getElementById("globalTempLabel");
    const austriaLabel = document.getElementById("austriaTempLabel");
    const earth = document.getElementById("timelineEarth");
    const tempFill = document.getElementById("timelineTempFill");
    const tempNeedle = document.getElementById("timelineTempNeedle");

    range.setAttribute("aria-valuetext", `${year}`);
    if (yearLabel) yearLabel.textContent = year;
    if (globalLabel) globalLabel.textContent = `${global >= 0 ? "+" : ""}${global.toFixed(1)} °C global`;
    if (austriaLabel) austriaLabel.textContent = `${austria >= 0 ? "+" : ""}${austria.toFixed(1)} °C Österreich`;
    if (earth) earth.setAttribute("fill", climateColor(global));

    const fillHeight = clamp((global + 0.3) / 1.9, 0, 1) * 135;
    if (tempFill) {
        tempFill.setAttribute("y", String(202 - fillHeight));
        tempFill.setAttribute("height", String(fillHeight));
    }
    if (tempNeedle) tempNeedle.setAttribute("y1", String(202 - fillHeight));

    document.querySelectorAll(".climate-stripe").forEach(stripe => {
        const stripeYear = Number(stripe.dataset.year || 0);
        stripe.classList.toggle("active", Math.abs(stripeYear - year) <= 2);
    });
}

function showClimateImpact(type) {
    const data = impactTexts[type] || impactTexts.heat;
    const title = document.getElementById("impactTitle");
    const text = document.getElementById("impactText");
    const icon = document.getElementById("impactIcon");

    document.querySelectorAll(".climate-impact-card").forEach(card => {
        card.classList.toggle("active", card.dataset.impact === type);
    });

    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (icon) icon.setAttribute("fill", data.color);
}

function classifyClimateAction(button, expected) {
    if (!button || actionState.answered.has(button.dataset.actionId)) return;

    const actual = button.dataset.type;
    const isCorrect = actual === expected;
    actionState.answered.add(button.dataset.actionId);
    button.classList.add(isCorrect ? "correct" : "wrong");
    button.classList.add("selected");
    if (isCorrect) actionState.correct += 1;

    const feedback = document.getElementById("climateActionFeedback");
    if (feedback) {
        const kind = actual === "schutz" ? "Klimaschutz" : "Anpassung";
        feedback.innerHTML = isCorrect
            ? `<strong>Richtig:</strong> Das ist ${kind}.`
            : `<strong>Noch einmal überlegen:</strong> Diese Maßnahme gehört eher zu ${kind}.`;
    }

    const score = document.getElementById("climateActionScore");
    if (score) score.textContent = `${actionState.correct}/${actionState.answered.size} richtig`;
}

function resetClimateActions() {
    actionState.answered.clear();
    actionState.correct = 0;
    document.querySelectorAll(".climate-action-card").forEach(card => {
        card.classList.remove("correct", "wrong", "selected");
    });
    const feedback = document.getElementById("climateActionFeedback");
    if (feedback) feedback.textContent = "Wähle eine Karte und ordne sie zu.";
    const score = document.getElementById("climateActionScore");
    if (score) score.textContent = "0/0 richtig";
}

function updateTippingRisk() {
    const range = document.getElementById("warmingRange");
    if (!range) return;

    const warming = Number(range.value || 1.5);
    const label = document.getElementById("warmingLabel");
    const fill = document.getElementById("warmingMeterFill");
    const note = document.getElementById("tippingNote");

    range.setAttribute("aria-valuetext", `${warming.toFixed(1)} Grad Erwärmung`);
    if (label) label.textContent = `${warming.toFixed(1)} °C`;
    if (fill) fill.style.width = `${clamp((warming - 1) / 3, 0, 1) * 100}%`;

    document.querySelectorAll(".climate-risk-card").forEach(card => {
        const threshold = Number(card.dataset.threshold || 99);
        card.classList.toggle("warning", warming >= threshold - 0.3);
        card.classList.toggle("high", warming >= threshold);
    });

    if (note) {
        if (warming < 1.5) {
            note.textContent = "Viele Risiken steigen bereits, aber jedes vermiedene Zehntelgrad hilft.";
        } else if (warming < 2) {
            note.textContent = "Bei etwa 1,5 bis 2 °C werden einige Risiken deutlich größer. Es gibt keine magische harte Linie.";
        } else {
            note.textContent = "Bei stärkerer Erwärmung nehmen Schäden und schwer umkehrbare Veränderungen deutlich zu.";
        }
    }
}

function enhanceClimateChangeAccessibility() {
    ["climateGasRange", "climateYearRange", "warmingRange"].forEach(id => {
        const range = document.getElementById(id);
        if (range) range.setAttribute("role", "slider");
    });

    const sliderDescriptions = {
        climateGasRange: "greenhouseExplanation",
        climateYearRange: "climateYearLabel",
        warmingRange: "tippingNote"
    };
    Object.entries(sliderDescriptions).forEach(([id, describedBy]) => {
        const range = document.getElementById(id);
        if (range) range.setAttribute("aria-describedby", describedBy);
    });

    ["climatePpmLabel", "greenhouseWarmingLabel", "climateYearLabel", "impactText", "climateActionFeedback", "tippingNote"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute("role", "status");
            el.setAttribute("aria-live", "polite");
            el.setAttribute("aria-atomic", "true");
        }
    });
}

function topicInit() {
    enhanceClimateChangeAccessibility();
    buildClimateStripes();
    updateGreenhouseLab();
    updateClimateTimeline();
    showClimateImpact("heat");
    resetClimateActions();
    updateTippingRisk();
}
