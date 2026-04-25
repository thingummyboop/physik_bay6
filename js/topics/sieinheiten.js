// Logic for sieinheiten topic
let startTime;
let timerInterval;

const unitObjects = {
    door: { label: "Türhöhe", value: "2,1", unit: "m", reason: "Eine Tür misst man sinnvoll in Metern." },
    bottle: { label: "Trinkflasche", value: "500", unit: "g", reason: "Die Masse einer vollen Flasche passt gut zu Gramm." },
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
    updateZoom();
    calcSpeed();
    setFormulaTarget("v");
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
            txt.innerText = "Länge = 20 cm. Zahlenwert und Einheit sind klar.";
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
        out.innerText = `Richtig: ${data.label} = ${data.value} ${data.unit}. ${data.reason}`;
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
        if (disp) disp.innerText = elapsed.toFixed(2) + " s";
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

    if (Math.abs(finalTime - 2.00) <= 0.1) {
        resultTxt.innerText = "Sehr genau. Dein Messwert liegt nahe bei 2,00 s.";
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
        light: ["Lichtstärke", "Candela", "cd", "Beschreibt, wie stark eine Lichtquelle leuchtet."]
    };
    const out = document.getElementById("baseUnitText");
    if (!out || !facts[type]) return;
    const [quantity, unit, symbol, example] = facts[type];
    out.innerText = `${quantity}: Einheit ${unit}, Zeichen ${symbol}. ${example}`;
}

// 3. Zoom / Praefixe und Umrechnen
function updateZoom() {
    const val = Number(document.getElementById("zoomRange")?.value || 2);
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
}

function checkConversion(index) {
    const task = conversionTasks[index];
    const input = document.getElementById(`convInput${index}`);
    const out = document.getElementById("conversionText");
    if (!task || !input || !out) return;

    const value = Number(String(input.value).replace(",", "."));
    if (!Number.isFinite(value)) {
        out.innerText = "Gib zuerst eine Zahl ein.";
        out.style.color = "#b45309";
        return;
    }

    if (Math.abs(value - task.answer) < 0.001) {
        out.innerText = `Richtig: ${task.question.replace("?", String(task.answer))}.`;
        out.style.color = "#15803d";
    } else {
        out.innerText = `Noch nicht. Tipp: ${task.hint}`;
        out.style.color = "#be123c";
    }
}

// 4. Formel-Flitzer
function setFormulaTarget(target) {
    document.querySelectorAll("[data-formula-target]").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.formulaTarget === target);
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

    const v = s / t;
    if (spTxt) spTxt.innerText = `v = ${s} m / ${t} s = ${v.toFixed(1)} m/s`;
    if (example) example.innerText = v < 3 ? "Das ist gemütlich." : v < 8 ? "Das ist schon schnell." : "Das ist sehr schnell.";

    const angle = Math.min(90, -90 + v * 8);
    if (needle) needle.style.transform = `rotate(${angle}deg)`;
}

// 5. Diagramm
function drawGraph() {
    const btn = document.getElementById("graphBtn");
    const path = document.getElementById("rocketPath");
    const points = document.querySelectorAll(".graphPoint");
    const rows = document.querySelectorAll(".graphRow");
    const txt = document.getElementById("graphText");
    if (!btn || !path) return;

    btn.disabled = true;
    points.forEach((p) => {
        p.style.opacity = "0";
    });
    rows.forEach((row) => {
        row.style.background = "transparent";
    });
    if (txt) txt.innerText = "Zuerst entstehen Messwerte. Dann werden daraus Punkte im Diagramm.";

    path.style.animation = "none";
    path.style.strokeDashoffset = "400";
    path.offsetHeight;
    path.style.animation = "dash 3s linear forwards";

    points.forEach((p, index) => {
        setTimeout(() => {
            p.style.opacity = "1";
            p.style.transition = "opacity 0.3s";
            if (rows[index]) rows[index].style.background = "#dbeafe";
        }, index * 650);
    });

    setTimeout(() => {
        if (txt) txt.innerText = "Fertig: Jede Tabellenzeile ist ein Punkt. Die Punkte zeigen den Verlauf.";
        btn.disabled = false;
    }, 3400);
}
