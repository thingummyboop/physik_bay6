// Logic for sieinheiten topic
let startTime;
let timerInterval;

const unitObjects = {
    door: { label: "Türhöhe", value: "2,1", unit: "m", reason: "Eine Tür misst man sinnvoll in Metern." },
    bottle: { label: "Masse der Trinkflasche", value: "500", unit: "g", reason: "Hier geht es um die Masse, nicht um das Fassungsvermögen. Gramm ist dafür eine mögliche Einheit." },
    school: { label: "Schulweg", value: "1,4", unit: "km", reason: "Längere Strecken im Alltag misst man oft in Kilometern." },
    sprint: { label: "Sprintzeit", value: "12", unit: "s", reason: "Kurze Zeiten misst man in Sekunden." },
    room: { label: "Klassenraum", value: "22", unit: "Grad Celsius", reason: "Temperatur im Alltag geben wir meistens in Grad Celsius an." }
};

const conversionTasks = [
    { question: "2 m = ? cm", answer: 200, unit: "cm", hint: "1 m = 100 cm, also 2 mal 100." },
    { question: "3 km = ? m", answer: 3000, unit: "m", hint: "1 km = 1000 m, also 3 mal 1000." },
    { question: "1500 g = ? kg", answer: 1.5, unit: "kg", hint: "1000 g = 1 kg. 1500 g sind 1,5 kg." },
    { question: "4 min = ? s", answer: 240, unit: "s", hint: "1 min = 60 s, also 4 mal 60." }
];

function topicInit() {
    ensureSIAccessibility();
    updateZoom();
    calcSpeed();
    setFormulaTarget("v");
}

function ensureSIAccessibility() {
    const liveIds = [
        "measureText",
        "unitMatchText",
        "timerResult",
        "baseUnitText",
        "zoomDesc",
        "conversionText",
        "formulaRule",
        "speedText",
        "speedExample",
        "graphText"
    ];

    liveIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute("role", "status");
        el.setAttribute("aria-live", "polite");
        el.setAttribute("aria-atomic", "true");
    });

    const zoomRange = document.getElementById("zoomRange");
    if (zoomRange) zoomRange.setAttribute("aria-describedby", "zoomDesc");

    const sRange = document.getElementById("sRange");
    const tRange = document.getElementById("tRange");
    if (sRange) sRange.setAttribute("aria-describedby", "speedText speedExample");
    if (tRange) tRange.setAttribute("aria-describedby", "speedText speedExample");

    const formulaButtons = document.querySelectorAll("[data-formula-target]");
    formulaButtons.forEach((btn) => {
        btn.setAttribute("role", "button");
        if (!btn.hasAttribute("tabindex")) btn.setAttribute("tabindex", "0");
        if (btn.dataset.a11yBound === "1") return;
        btn.dataset.a11yBound = "1";
        btn.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                btn.click();
            }
        });
    });
}

// 1. Messgroesse und Einheit
function measure(unit) {
    const txt = document.getElementById("measureText");
    const ticksCm = document.getElementById("ticksCm");
    const ticksFeet = document.getElementById("ticksFeet");
    const ticksHands = document.getElementById("ticksHands");

    if (ticksCm) ticksCm.style.display = "none";
    if (ticksFeet) ticksFeet.style.display = "none";
    if (ticksHands) ticksHands.style.display = "none";

    if (unit === "cm") {
        if (ticksCm) ticksCm.style.display = "block";
        if (txt) {
            txt.innerText = "Modelllänge = 20 cm: Jede der zehn gleich großen Teilstrecken steht hier für 2 cm. Die Bildschirmgröße ist kein echter Zentimetermaßstab.";
            txt.style.color = "#15803d";
        }
    } else if (unit === "feet") {
        if (ticksFeet) ticksFeet.style.display = "block";
        if (txt) {
            txt.innerText = "Unklar: Verschiedene Füße ergeben verschiedene Ergebnisse.";
            txt.style.color = "#c2410c";
        }
    } else {
        if (ticksHands) ticksHands.style.display = "block";
        if (txt) {
            txt.innerText = "Unklar: Hände sind nicht überall gleich groß.";
            txt.style.color = "#be123c";
        }
    }
}

function checkUnitObject(objectKey, chosenUnit) {
    const data = unitObjects[objectKey];
    const out = document.getElementById("unitMatchText");
    if (!data || !out) return;

    if (data.unit === chosenUnit) {
        out.innerText = `Passendes erfundenes Beispiel: ${data.label} = ${data.value} ${data.unit}. ${data.reason}`;
        out.style.color = "#15803d";
    } else {
        out.innerText = `Noch nicht: Für ${data.label} passt ${data.unit} besser. ${data.reason}`;
        out.style.color = "#b45309";
    }
}

// 2. Reaktionszeit
function startTimer() {
    const sBtn = document.getElementById("startBtn");
    const oBtn = document.getElementById("stopBtn");
    const res = document.getElementById("timerResult");
    const disp = document.getElementById("timerDisplay");

    if (sBtn) sBtn.disabled = true;
    if (oBtn) oBtn.disabled = false;
    if (res) res.innerText = "";
    if (disp) disp.style.color = "#1d4ed8";

    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (disp) disp.innerText = elapsed.toFixed(2).replace('.', ',') + " s";
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    const sBtn = document.getElementById("startBtn");
    const oBtn = document.getElementById("stopBtn");
    if (sBtn) sBtn.disabled = false;
    if (oBtn) oBtn.disabled = true;

    const finalTime = (Date.now() - startTime) / 1000;
    const resultTxt = document.getElementById("timerResult");
    const display = document.getElementById("timerDisplay");
    if (!resultTxt || !display) return;
    display.innerText = finalTime.toFixed(2).replace('.', ',') + " s";

    if (Math.abs(finalTime - 2.00) <= 0.1) {
        resultTxt.innerText = "Du hast nahe bei 2,00 s gestoppt. Das beschreibt deinen Treffer beim Schätzen, nicht die Genauigkeit der Zeitmessung.";
        display.style.color = "#15803d";
    } else if (finalTime < 2.00) {
        resultTxt.innerText = "Zu früh gestoppt. Der Messwert ist kleiner als 2,00 s.";
        display.style.color = "#be123c";
    } else {
        resultTxt.innerText = "Zu spät gestoppt. Der Messwert ist größer als 2,00 s.";
        display.style.color = "#b45309";
    }
}

function showBaseUnit(type) {
    const facts = {
        length: ["Länge", "Meter", "m", "Beispiel: Türhöhe, Tischlänge, Schulweg"],
        mass: ["Masse", "Kilogramm", "kg", "Beispiel: Körpermasse, Schultasche, Einkauf"],
        time: ["Zeit", "Sekunde", "s", "Beispiel: Laufzeit, Reaktionszeit, Unterrichtsminute"],
        current: ["Stromstärke", "Ampere", "A", "Beispiel: Strom in einem Ladekabel"],
        temperature: ["Temperatur", "Kelvin", "K", "In der Schule rechnen wir oft zusätzlich mit °C."],
        amount: ["Stoffmenge", "Mol", "mol", "Wichtig in Chemie, wenn man sehr viele Teilchen zählt."],
        light: ["Lichtstärke", "Candela", "cd", "Beschreibt die Lichtabgabe in eine bestimmte Richtung, bewertet nach der Hellempfindlichkeit des menschlichen Auges."]
    };
    const out = document.getElementById("baseUnitText");
    if (!out || !facts[type]) return;
    const [quantity, unit, symbol, example] = facts[type];
    out.innerText = `${quantity}: Einheit ${unit}, Zeichen ${symbol}. ${example}`;
}

// 3. Zoom / Praefixe und Umrechnen
function updateZoom() {
    const zoomRange = document.getElementById("zoomRange");
    const val = Number(zoomRange?.value || 2);
    const title = document.getElementById("zoomTitle");
    const desc = document.getElementById("zoomDesc");
    const zMilli = document.getElementById("zoomMilli");
    const zCenti = document.getElementById("zoomCenti");
    const zMeter = document.getElementById("zoomMeter");
    const zKilo = document.getElementById("zoomKilo");

    [zMilli, zCenti, zMeter, zKilo].forEach((el) => {
        if (el) el.style.display = "none";
    });

    if (val === 1) {
        if (title) title.innerText = "1 Millimeter (mm)";
        if (desc) desc.innerText = "Sehr klein: Dicke einer Bankkarte oder Bleistiftspitze.";
        if (zMilli) zMilli.style.display = "block";
    } else if (val === 2) {
        if (title) title.innerText = "1 Zentimeter (cm)";
        if (desc) desc.innerText = "Klein: Fingernagel, Radiergummi, Heftlinie.";
        if (zCenti) zCenti.style.display = "block";
    } else if (val === 3) {
        if (title) title.innerText = "1 Meter (m)";
        if (desc) desc.innerText = "Basis: großer Schritt, Tischhöhe, Körpergröße.";
        if (zMeter) zMeter.style.display = "block";
    } else {
        if (title) title.innerText = "1 Kilometer (km)";
        if (desc) desc.innerText = "Groß: Schulweg, U-Bahn-Strecke, Weg durch den Bezirk.";
        if (zKilo) zKilo.style.display = "block";
    }

    if (zoomRange) {
        const zoomMap = {
            1: "1 Millimeter",
            2: "1 Zentimeter",
            3: "1 Meter",
            4: "1 Kilometer"
        };
        zoomRange.setAttribute("aria-valuetext", zoomMap[val] || "1 Zentimeter");
    }
}

function checkConversion(index) {
    const task = conversionTasks[index];
    const input = document.getElementById(`convInput${index}`);
    const out = document.getElementById("conversionText");
    if (!task || !input || !out) return;

    const raw = String(input.value).trim();
    const value = Number(raw.replace(",", "."));
    if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(raw) || !Number.isFinite(value)) {
        out.innerText = "Gib zuerst eine Zahl ein.";
        out.style.color = "#b45309";
        return;
    }

    if (value === task.answer) {
        out.innerText = `Richtig: ${task.question.replace("?", String(task.answer).replace('.', ','))}.`;
        out.style.color = "#15803d";
    } else {
        out.innerText = `Noch nicht. Tipp: ${task.hint}`;
        out.style.color = "#be123c";
    }
}

// 4. Formel-Flitzer
function setFormulaTarget(target) {
    document.querySelectorAll("[data-formula-target]").forEach((btn) => {
        const selected = btn.dataset.formulaTarget === target;
        btn.classList.toggle("selected", selected);
        btn.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    const out = document.getElementById("formulaRule");
    if (!out) return;

    const rules = {
        v: "Ich suche v: Weg durch Zeit teilen. v = s / t",
        s: "Ich suche s: Geschwindigkeit mal Zeit. s = v · t",
        t: "Ich suche t: Weg durch Geschwindigkeit. t = s / v"
    };
    out.innerText = rules[target] || rules.v;
}

function calcSpeed() {
    const s = parseFloat(document.getElementById("sRange")?.value || 100);
    const t = parseFloat(document.getElementById("tRange")?.value || 10);
    const sVal = document.getElementById("sVal");
    const tVal = document.getElementById("tVal");
    const spTxt = document.getElementById("speedText");
    const needle = document.getElementById("tachoNeedle");
    const example = document.getElementById("speedExample");

    if (sVal) sVal.innerText = s;
    if (tVal) tVal.innerText = t;

    const sRange = document.getElementById("sRange");
    const tRange = document.getElementById("tRange");
    if (sRange) sRange.setAttribute("aria-valuetext", `${s} Meter`);
    if (tRange) tRange.setAttribute("aria-valuetext", `${t} Sekunden`);

    const v = s / t;
    if (spTxt) spTxt.innerText = `Mittlere Geschwindigkeit: v = ${s} m / ${t} s = ${v.toFixed(1).replace('.', ',')} m/s`;
    if (example) example.innerText = v < 3 ? "Das ist gemütlich." : v < 8 ? "Das ist schon schnell." : "Das ist sehr schnell.";

    const angle = Math.min(90, -90 + v * 8);
    if (needle) needle.style.transform = `rotate(${angle}deg)`;
}

// 5. Diagramm
function drawGraph() {
    const btn = document.getElementById("graphBtn");
    const path = document.getElementById("rocketPath");
    const points = document.querySelectorAll(".graphPoint");
    if (!btn || !path) return;
    path.style.opacity = "1";
    points.forEach(p=>{p.style.opacity="1";});
    const selection=document.getElementById("graphTime");
    if(selection){selection.disabled=false;selectMeasurementPoint();}
}

function selectMeasurementPoint() {
    const selection=document.getElementById("graphTime"),out=document.getElementById("graphText");
    if(!selection||selection.disabled||!out)return;
    const index=Number(selection.value),rows=[...document.querySelectorAll(".graphRow")];
    if(!Number.isInteger(index)||!rows[index])return;
    const values=[...rows[index].cells].map(cell=>cell.textContent.trim());
    rows.forEach((row,i)=>{if(i===index)row.setAttribute("aria-current","true");else row.removeAttribute("aria-current");});
    document.querySelectorAll(".graphPoint").forEach((point,i)=>{
        point.setAttribute("r",i===index?"7":"4");
        point.setAttribute("fill",i===index?"#995000":"#1765a8");
    });
    out.innerText=`Modellwerte: Bei t = ${values[0]} s ist h = ${values[1]} m. Waagerecht liest du die Zeit, senkrecht die Höhe. Die Verbindungslinie ergänzt keine Messwerte.`;
}

function resetMeasurementGraph() {
    const selection=document.getElementById("graphTime"),out=document.getElementById("graphText"),path=document.getElementById("rocketPath");
    if(selection){selection.disabled=true;selection.value="0";}
    if(path)path.style.opacity="0";
    document.querySelectorAll(".graphPoint").forEach(point=>{point.style.opacity="0";point.setAttribute("r","4");point.setAttribute("fill","#1765a8");});
    document.querySelectorAll(".graphRow").forEach(row=>row.removeAttribute("aria-current"));
    if(out)out.innerText="Die Achsen sind vorbereitet. Zeichne die Punkte ein. Die Tabelle bleibt unverändert.";
}
