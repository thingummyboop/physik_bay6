// Klimawandel: interaktive Lernmodelle

const climateTimelinePoints = [{"year":1880,"global":-0.17,"austria":-0.1},{"year":1881,"global":-0.09,"austria":-0.87},{"year":1882,"global":-0.11,"austria":0.13},{"year":1883,"global":-0.17,"austria":-0.91},{"year":1884,"global":-0.28,"austria":-0.41},{"year":1885,"global":-0.33,"austria":-0.4},{"year":1886,"global":-0.32,"austria":-0.27},{"year":1887,"global":-0.36,"austria":-1.19},{"year":1888,"global":-0.18,"austria":-1.22},{"year":1889,"global":-0.11,"austria":-1.12},{"year":1890,"global":-0.36,"austria":-1.05},{"year":1891,"global":-0.22,"austria":-1.02},{"year":1892,"global":-0.27,"austria":-0.58},{"year":1893,"global":-0.31,"austria":-0.69},{"year":1894,"global":-0.3,"austria":-0.39},{"year":1895,"global":-0.23,"austria":-0.9},{"year":1896,"global":-0.12,"austria":-1.01},{"year":1897,"global":-0.11,"austria":-0.24},{"year":1898,"global":-0.28,"austria":0.46},{"year":1899,"global":-0.18,"austria":-0.37},{"year":1900,"global":-0.09,"austria":0.2},{"year":1901,"global":-0.15,"austria":-0.77},{"year":1902,"global":-0.28,"austria":-0.74},{"year":1903,"global":-0.37,"austria":-0.22},{"year":1904,"global":-0.48,"austria":0.08},{"year":1905,"global":-0.27,"austria":-0.45},{"year":1906,"global":-0.23,"austria":-0.5},{"year":1907,"global":-0.39,"austria":-0.49},{"year":1908,"global":-0.43,"austria":-0.92},{"year":1909,"global":-0.49,"austria":-1.07},{"year":1910,"global":-0.44,"austria":-0.32},{"year":1911,"global":-0.45,"austria":0.2},{"year":1912,"global":-0.37,"austria":-0.89},{"year":1913,"global":-0.35,"austria":-0.35},{"year":1914,"global":-0.16,"austria":-0.57},{"year":1915,"global":-0.15,"austria":-0.54},{"year":1916,"global":-0.36,"austria":0.33},{"year":1917,"global":-0.46,"austria":-0.69},{"year":1918,"global":-0.3,"austria":-0.02},{"year":1919,"global":-0.28,"austria":-1.02},{"year":1920,"global":-0.28,"austria":0.52},{"year":1921,"global":-0.19,"austria":0.5},{"year":1922,"global":-0.28,"austria":-0.79},{"year":1923,"global":-0.26,"austria":0.06},{"year":1924,"global":-0.27,"austria":-0.67},{"year":1925,"global":-0.22,"austria":-0.4},{"year":1926,"global":-0.11,"austria":0.39},{"year":1927,"global":-0.22,"austria":0.08},{"year":1928,"global":-0.2,"austria":0.18},{"year":1929,"global":-0.36,"austria":-0.87},{"year":1930,"global":-0.16,"austria":0.45},{"year":1931,"global":-0.09,"austria":-0.79},{"year":1932,"global":-0.16,"austria":-0.02},{"year":1933,"global":-0.29,"austria":-1.05},{"year":1934,"global":-0.13,"austria":0.96},{"year":1935,"global":-0.2,"austria":-0.33},{"year":1936,"global":-0.15,"austria":0.05},{"year":1937,"global":-0.03,"austria":0.08},{"year":1938,"global":0,"austria":-0.08},{"year":1939,"global":-0.02,"austria":-0.23},{"year":1940,"global":0.12,"austria":-1.58},{"year":1941,"global":0.18,"austria":-1.04},{"year":1942,"global":0.06,"austria":-0.47},{"year":1943,"global":0.09,"austria":0.58},{"year":1944,"global":0.2,"austria":-0.53},{"year":1945,"global":0.09,"austria":0.33},{"year":1946,"global":-0.07,"austria":0.48},{"year":1947,"global":-0.03,"austria":0.59},{"year":1948,"global":-0.11,"austria":0.69},{"year":1949,"global":-0.11,"austria":0.69},{"year":1950,"global":-0.17,"austria":0.68},{"year":1951,"global":-0.07,"austria":0.68},{"year":1952,"global":0.01,"austria":-0.28},{"year":1953,"global":0.08,"austria":0.53},{"year":1954,"global":-0.13,"austria":-0.68},{"year":1955,"global":-0.14,"austria":-0.5},{"year":1956,"global":-0.19,"austria":-1.14},{"year":1957,"global":0.05,"austria":0.42},{"year":1958,"global":0.06,"austria":0.27},{"year":1959,"global":0.03,"austria":0.5},{"year":1960,"global":-0.02,"austria":0.18},{"year":1961,"global":0.06,"austria":0.82},{"year":1962,"global":0.03,"austria":-0.87},{"year":1963,"global":0.05,"austria":-0.59},{"year":1964,"global":-0.2,"austria":0.01},{"year":1965,"global":-0.11,"austria":-0.77},{"year":1966,"global":-0.06,"austria":0.48},{"year":1967,"global":-0.02,"austria":0.59},{"year":1968,"global":-0.08,"austria":0.1},{"year":1969,"global":0.05,"austria":-0.19},{"year":1970,"global":0.03,"austria":-0.3},{"year":1971,"global":-0.08,"austria":0.16},{"year":1972,"global":0.01,"austria":-0.08},{"year":1973,"global":0.16,"austria":-0.05},{"year":1974,"global":-0.07,"austria":0.45},{"year":1975,"global":-0.01,"austria":0.59},{"year":1976,"global":-0.1,"austria":0.1},{"year":1977,"global":0.18,"austria":0.66},{"year":1978,"global":0.07,"austria":-0.42},{"year":1979,"global":0.16,"austria":0.03},{"year":1980,"global":0.26,"austria":-0.67},{"year":1981,"global":0.32,"austria":0.15},{"year":1982,"global":0.14,"austria":0.66},{"year":1983,"global":0.31,"austria":0.98},{"year":1984,"global":0.15,"austria":-0.22},{"year":1985,"global":0.12,"austria":-0.27},{"year":1986,"global":0.18,"austria":0.08},{"year":1987,"global":0.32,"austria":-0.01},{"year":1988,"global":0.39,"austria":0.87},{"year":1989,"global":0.27,"austria":1.13},{"year":1990,"global":0.45,"austria":1.11},{"year":1991,"global":0.4,"austria":0.13},{"year":1992,"global":0.22,"austria":1.43},{"year":1993,"global":0.23,"austria":0.7},{"year":1994,"global":0.31,"austria":1.96},{"year":1995,"global":0.44,"austria":0.64},{"year":1996,"global":0.33,"austria":-0.27},{"year":1997,"global":0.46,"austria":0.92},{"year":1998,"global":0.61,"austria":1},{"year":1999,"global":0.38,"austria":1},{"year":2000,"global":0.39,"austria":1.88},{"year":2001,"global":0.53,"austria":1},{"year":2002,"global":0.63,"austria":1.81},{"year":2003,"global":0.62,"austria":1.41},{"year":2004,"global":0.53,"austria":0.81},{"year":2005,"global":0.68,"austria":0.43},{"year":2006,"global":0.64,"austria":1.16},{"year":2007,"global":0.66,"austria":1.88},{"year":2008,"global":0.54,"austria":1.63},{"year":2009,"global":0.66,"austria":1.41},{"year":2010,"global":0.73,"austria":0.45},{"year":2011,"global":0.61,"austria":1.8},{"year":2012,"global":0.65,"austria":1.54},{"year":2013,"global":0.68,"austria":1.27},{"year":2014,"global":0.75,"austria":2.39},{"year":2015,"global":0.9,"austria":2.38},{"year":2016,"global":1.01,"austria":1.9},{"year":2017,"global":0.92,"austria":1.73},{"year":2018,"global":0.85,"austria":2.58},{"year":2019,"global":0.98,"austria":2.47},{"year":2020,"global":1.01,"austria":2.23},{"year":2021,"global":0.85,"austria":1.32},{"year":2022,"global":0.89,"austria":2.62},{"year":2023,"global":1.17,"austria":2.68},{"year":2024,"global":1.28,"austria":3.25},{"year":2025,"global":1.19,"austria":2.32}];

const impactTexts = {
    heat: {
        title: "Hitze in der Stadt",
        text: "Asphalt, Beton und dunkle Dächer speichern Wärme. In Städten können Nächte dadurch sehr warm bleiben. Bäume, Schatten, helle Flächen und Trinkbrunnen helfen bei der Anpassung.",
        color: "#ef4444"
    },
    drought: {
        title: "Trockenstress",
        text: "Auch wenn nicht überall weniger Regen fällt, können wärmere Bedingungen den Verdunstungsbedarf erhöhen. Wie viel Wasser tatsächlich verdunstet, hängt auch von seiner Verfügbarkeit ab. Regenverteilung, Speicherung und Wasserverluste beeinflussen Trockenstress.",
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

function climateEnglish() { return document.querySelector('[data-climate-language]')?.dataset.climateLanguage === 'en'; }
function climateText(de, en) { return climateEnglish() ? en : de; }
const impactTextsEnglish = {
 heat: {title:'Heat in the city',text:'Asphalt, concrete and dark roofs store heat. Nights in cities can therefore remain very warm. Trees, shade, light-coloured surfaces and drinking fountains can support adaptation.',color:'#ef4444'},
 drought: {title:'Drought stress',text:'Even where rainfall does not decrease, warmer conditions can increase evaporative demand. Actual evaporation also depends on available water. The timing of rain, water storage and water losses influence drought stress.',color:'#f97316'},
 heavyRain: {title:'Heavy rain',text:'Warmer air can contain more water vapour. When moist air rises and cools, heavier rainfall can occur. Drainage systems and soils may be unable to handle the water.',color:'#2563eb'},
 alps: {title:'Alps and glaciers',text:'Snow and ice respond strongly to warming. Glaciers lose mass, permafrost can thaw and slopes can become less stable.',color:'#0891b2'}
};

const actionState = {
    answered: new Set(),
    correct: 0
};

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function climateAnnualValue(year, key) {
    const record = climateTimelinePoints.find(point => point.year === year);
    return record ? record[key] : null;
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
    const range = document.getElementById('climateGasRange');
    if (!range) return;
    const value = clamp(Number(range.value), 0, 2);
    const labels = climateEnglish() ? ['fewer', 'medium', 'more'] : ['weniger', 'mittel', 'mehr'];
    const label = labels[value];
    range.setAttribute('aria-valuetext', label + climateText(' Treibhausgase im qualitativen Vergleich', ' greenhouse gases in the qualitative comparison'));
    const output = document.getElementById('climatePpmLabel');
    if (output) output.textContent = label + climateText(' Treibhausgase', ' greenhouse gases');
    document.getElementById('greenhouseLayer')?.setAttribute('opacity', String(0.2 + value * 0.3));
    document.getElementById('returningHeat')?.setAttribute('stroke-width', String(2 + value * 2));
    document.getElementById('escapedHeat')?.setAttribute('opacity', String(0.85 - value * 0.3));
    const explanation = document.getElementById('greenhouseExplanation');
    if (explanation) explanation.textContent = (climateEnglish() ? 'Comparison: ' + label + ' greenhouse gases. At the same initial temperature and otherwise equal conditions, more greenhouse gases mean less thermal radiation reaches space. The Earth system warms until a new radiation balance is reached. The arrows show only the direction of this relationship, not measured energy amounts or calculated temperatures.' : 'Vergleich: ' + label + ' Treibhausgase. Bei zunächst gleicher Temperatur und sonst gleichen Bedingungen gelangt mit mehr Treibhausgasen weniger Wärmestrahlung ins All. Das Erdsystem erwärmt sich, bis wieder ein Strahlungsgleichgewicht erreicht wird. Die Pfeile zeigen nur die Richtung des Zusammenhangs, keine gemessenen Energiemengen oder berechneten Temperaturen.');
}

function buildClimateStripes() {
    const stripeBox = document.getElementById("climateStripes");
    if (!stripeBox || stripeBox.dataset.ready === "true") return;

    const years = [];
    for (let year = 1880; year <= 2025; year++) years.push(year);
    stripeBox.innerHTML = years.map(year => {
        const anomaly = climateAnnualValue(year, "global");
        return `<span class="climate-stripe" data-year="${year}" title="${year}: ${anomaly.toFixed(2)} °C" style="background:${climateColor(anomaly)}"></span>`;
    }).join("");
    stripeBox.dataset.ready = "true";
}

function updateClimateTimeline() {
    const range = document.getElementById("climateYearRange");
    if (!range) return;

    const year = Number(range.value || 2025);
    const global = climateAnnualValue(year, "global");
    const austria = climateAnnualValue(year, "austria");
    if (global === null || austria === null) return;
    const yearLabel = document.getElementById("climateYearLabel");
    const globalLabel = document.getElementById("globalTempLabel");
    const austriaLabel = document.getElementById("austriaTempLabel");
    const earth = document.getElementById("timelineEarth");
    const tempFill = document.getElementById("timelineTempFill");
    const tempNeedle = document.getElementById("timelineTempNeedle");

    range.setAttribute("aria-valuetext", `${year}`);
    if (yearLabel) yearLabel.textContent = year;
    if (globalLabel) globalLabel.textContent = `${global >= 0 ? "+" : ""}${global.toFixed(2)} °C ${climateText("global", "global")}`;
    if (austriaLabel) austriaLabel.textContent = `${austria >= 0 ? "+" : ""}${austria.toFixed(2)} °C ${climateText("Österreich", "Austria")}`;
    if (earth) earth.setAttribute("fill", climateColor(global));

    const fillHeight = clamp((global + 1) / 3, 0, 1) * 135;
    if (tempFill) {
        tempFill.setAttribute("y", String(202 - fillHeight));
        tempFill.setAttribute("height", String(fillHeight));
    }
    if (tempNeedle) tempNeedle.setAttribute("y1", String(202 - fillHeight));

    document.querySelectorAll(".climate-stripe").forEach(stripe => {
        const stripeYear = Number(stripe.dataset.year || 0);
        stripe.classList.toggle("active", stripeYear === year);
    });
    updateClimateComparison();
}

let climateReferenceYear = null;
function rememberClimateYear() {
    const year = Number(document.getElementById('climateYearRange')?.value);
    if (climateAnnualValue(year, 'global') === null) return;
    climateReferenceYear = year;
    updateClimateComparison();
}
function clearClimateComparison() {
    climateReferenceYear = null;
    updateClimateComparison();
}
function updateClimateComparison() {
    const box = document.getElementById('climateYearComparison');
    if (!box) return;
    box.replaceChildren();
    if (climateReferenceYear === null) {
        box.textContent = climateText('Merke zuerst Jahr A und wähle dann Jahr B mit dem Jahresregler.', 'Save year A first, then choose year B with the year slider.');
        return;
    }
    const year = Number(document.getElementById('climateYearRange')?.value);
    if (climateAnnualValue(year, 'global') === null) return;
    const format = value => (value > 0 ? '+' : '') + value.toFixed(2).replace('.', climateEnglish() ? '.' : ',') + ' °C';
    const table = document.createElement('table');
    const caption = table.createCaption();
    caption.textContent = climateText('Jahresvergleich: Abweichungen gegenüber 1951–1980', 'Annual comparison: deviations relative to 1951–1980');
    const head = table.createTHead().insertRow();
    for (const label of [climateText('Gebiet', 'Area'), 'A: ' + climateReferenceYear, 'B: ' + year, climateText('Differenz B − A', 'Difference B − A')]) {
        const cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = label; head.append(cell);
    }
    const body = table.createTBody();
    for (const [key, label] of [['global', climateText('Global', 'Global')], ['austria', climateText('Österreich', 'Austria')]]) {
        const a = climateAnnualValue(climateReferenceYear, key), b = climateAnnualValue(year, key), row = body.insertRow();
        const heading = document.createElement('th'); heading.scope = 'row'; heading.textContent = label; row.append(heading);
        for (const number of [a, b, Number((b - a).toFixed(2))]) row.insertCell().textContent = format(number);
    }
    box.append(table);
    const note = document.createElement('p');
    note.textContent = climateText('Positiv bedeutet: B liegt über A; negativ: B liegt unter A. Die Differenz vergleicht zwei Jahreswerte, nicht den gesamten Klimatrend. Untersuche dafür viele Jahre. Jahr A bleibt nur während dieses Seitenbesuchs gemerkt.', 'Positive means B is above A; negative means B is below A. The difference compares two annual values, not the whole climate trend. Examine many years for that. Year A is saved only during this page visit.');
    box.append(note);
}

function showClimateImpact(type) {
    const selected = Object.hasOwn(impactTexts, type) ? type : "heat";
    const data = (climateEnglish() ? impactTextsEnglish : impactTexts)[selected];
    const title = document.getElementById("impactTitle");
    const text = document.getElementById("impactText");
    const icon = document.getElementById("impactIcon");

    document.querySelectorAll(".climate-impact-card").forEach(card => {
        card.classList.toggle("active", card.dataset.impact === selected);
        card.setAttribute("aria-pressed", String(card.dataset.impact === selected));
    });

    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (icon) icon.setAttribute("fill", data.color);
}

function classifyClimateAction(card, selected) {
    if (!card || actionState.answered.has(card.dataset.actionId)) return;
    const isCorrect = card.dataset.type === selected;
    card.classList.remove('correct', 'wrong');
    card.classList.add(isCorrect ? 'correct' : 'wrong', 'selected');
    if (isCorrect) {
        actionState.answered.add(card.dataset.actionId);
        actionState.correct = actionState.answered.size;
        card.querySelectorAll('button').forEach(button => button.setAttribute('aria-disabled', 'true'));
    }
    const message = (isCorrect ? climateText('Richtig zugeordnet. ', 'Correct classification. ') : climateText('Noch nicht. ', 'Not yet. ')) + card.dataset.explanation + (isCorrect ? '' : climateText(' Versuche diese Karte erneut.', ' Try this card again.'));
    const local = card.querySelector('[data-action-feedback]');
    if (local) local.textContent = message;
    const feedback = document.getElementById('climateActionFeedback');
    if (feedback) feedback.textContent = card.querySelector('strong').textContent + ': ' + message;
    const score = document.getElementById('climateActionScore');
    if (score) score.textContent = actionState.answered.size + climateText(' von ', ' of ') + document.querySelectorAll('.climate-action-card').length + climateText(' zugeordnet', ' classified');
}

function resetClimateActions() {
    actionState.answered.clear();
    actionState.correct = 0;
    document.querySelectorAll('.climate-action-card').forEach(card => {
        card.classList.remove('correct', 'wrong', 'selected');
        card.querySelectorAll('button').forEach(button => button.removeAttribute('aria-disabled'));
        card.querySelector('[data-action-feedback]')?.replaceChildren();
    });
    const feedback = document.getElementById('climateActionFeedback');
    if (feedback) feedback.textContent = climateText('Wähle eine Karte und ordne die beschriebene Wirkung zu.', 'Choose a card and classify the effect described.');
    const score = document.getElementById('climateActionScore');
    if (score) score.textContent = climateText('0 von ', '0 of ') + document.querySelectorAll('.climate-action-card').length + climateText(' zugeordnet', ' classified');
}

function updateTippingRisk() {
    const range = document.getElementById("warmingRange");
    if (!range) return;

    const warming = Number(range.value || 1.5);
    const label = document.getElementById("warmingLabel");
    const fill = document.getElementById("warmingMeterFill");
    const note = document.getElementById("tippingNote");

    range.setAttribute("aria-valuetext", `${warming.toFixed(1)} ${climateText("Grad Erwärmung", "degrees of warming")}`);
    if (label) label.textContent = `${warming.toFixed(1)} °C`;
    if (fill) fill.style.width = `${clamp((warming - 1) / 3, 0, 1) * 100}%`;

    if (note) {
        note.textContent = climateEnglish() ? 'Selected long-term warming level: ' + warming.toFixed(1) + ' °C relative to 1850–1900. Higher global warming increases the risks of abrupt or hard-to-reverse changes. This does not give an exact trigger value for any example or a probability in percent. The duration and course of warming also matter. Turning the slider back does not reverse real changes.' : 'Gewähltes langfristiges Erwärmungsniveau: ' + warming.toFixed(1).replace('.', ',') + ' °C gegenüber 1850–1900. Mit höherer globaler Erwärmung wachsen die Risiken abrupter oder schwer umkehrbarer Veränderungen. Daraus folgt kein exakter Auslösewert für eines der Beispiele und keine Eintrittswahrscheinlichkeit in Prozent. Dauer und Verlauf der Erwärmung spielen ebenfalls eine Rolle. Ein Zurückstellen des Reglers macht reale Veränderungen nicht rückgängig.';
    }
}

function enhanceClimateChangeAccessibility() {
    const rangeDescriptions = {
        climateGasRange: "climatePpmLabel greenhouseExplanation",
        climateYearRange: "climateYearLabel globalTempLabel austriaTempLabel",
        warmingRange: "warmingLabel tippingNote"
    };

    ["climateGasRange", "climateYearRange", "warmingRange"].forEach(id => {
        const range = document.getElementById(id);
        if (range) {
            range.setAttribute("role", "slider");
            range.setAttribute("aria-describedby", rangeDescriptions[id]);
        }
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
