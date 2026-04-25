// Logic for arbeit topic
let currentSurface = "ice";
let springCompressed = false;

const workCases = {
    wall: {
        text: "Keine physikalische Arbeit am Gegenstand: Du drückst zwar mit Kraft, aber der Weg ist 0 m.",
        color: "#b91c1c",
        work: "W = F · 0 m = 0 J"
    },
    box: {
        text: "Physikalische Arbeit: Die Kraft bewegt die Kiste entlang eines Weges.",
        color: "#15803d",
        work: "W = F · s"
    },
    hold: {
        text: "Anstrengend, aber am Rucksack wird keine Hubarbeit verrichtet, solange er auf gleicher Höhe bleibt.",
        color: "#b45309",
        work: "Höhe bleibt gleich: h = 0 m"
    },
    carry: {
        text: "Beim gleichmäßigen Tragen wirkt deine Haltekraft nach oben, der Weg ist waagerecht. In dieser Richtung verrichtest du am Rucksack kaum mechanische Arbeit.",
        color: "#7c3aed",
        work: "Kraft und Weg zeigen nicht in dieselbe Richtung."
    }
};

const liftObjects = {
    bag: { label: "Schulrucksack", mass: 6 },
    crate: { label: "Getränkekiste", mass: 12 },
    brick: { label: "Ziegelstein", mass: 3 }
};

function topicInit() {
    calcWork();
    chooseLiftObject("bag");
    updateLiftHeight();
    setSurface("ice");
    compareRamp("steep");
    updateBike();
}

// 1. Arbeit oder keine Arbeit?
function chooseWorkCase(type) {
    const data = workCases[type];
    const text = document.getElementById("workCaseText");
    const formula = document.getElementById("workCaseFormula");
    const person = document.getElementById("personGroup");
    const box = document.getElementById("boxGroup");
    const wall = document.getElementById("wallGroup");
    const bag = document.getElementById("bagGroup");
    if (!data) return;

    if (text) {
        text.innerText = data.text;
        text.style.color = data.color;
    }
    if (formula) formula.innerText = data.work;

    if (person) person.style.transform = "translateX(0px)";
    if (box) box.style.transform = "translateX(0px)";
    if (wall) wall.style.opacity = type === "wall" ? "1" : "0.35";
    if (bag) bag.style.opacity = type === "hold" || type === "carry" ? "1" : "0.25";

    if (type === "box" && box) box.style.transform = "translateX(120px)";
    if (type === "wall" && person) person.style.transform = "translateX(80px)";
    if (type === "carry" && person) person.style.transform = "translateX(140px)";
}

// Old buttons may still exist in cached pages.
function pushWall() {
    chooseWorkCase("wall");
}

function pushBox() {
    chooseWorkCase("box");
}

function calcWork() {
    const force = Number(document.getElementById("forceRange")?.value || 50);
    const distance = Number(document.getElementById("distanceRange")?.value || 3);
    const forceVal = document.getElementById("forceVal");
    const distanceVal = document.getElementById("distanceVal");
    const workVal = document.getElementById("workValue");
    const fill = document.getElementById("workMeter");
    const equation = document.getElementById("workEquation");
    const work = force * distance;

    if (forceVal) forceVal.innerText = force;
    if (distanceVal) distanceVal.innerText = distance;
    if (workVal) workVal.innerText = `${work} J`;
    if (equation) equation.innerText = `W = ${force} N · ${distance} m = ${work} J`;
    if (fill) fill.style.width = `${Math.min(100, work / 6)}%`;
}

// 2. Hubarbeit
function chooseLiftObject(type) {
    const data = liftObjects[type] || liftObjects.bag;
    const objectName = document.getElementById("liftObjectName");
    const massText = document.getElementById("liftMass");
    const load = document.getElementById("craneLoad");

    document.querySelectorAll("[data-lift-object]").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.liftObject === type);
    });

    if (objectName) objectName.innerText = data.label;
    if (massText) massText.innerText = data.mass;
    if (load) load.setAttribute("fill", type === "crate" ? "#f97316" : type === "brick" ? "#b45309" : "#2563eb");
    updateLiftHeight();
}

function updateLiftHeight() {
    const height = Number(document.getElementById("heightRange")?.value || 1);
    const heightVal = document.getElementById("heightVal");
    const mass = Number(document.getElementById("liftMass")?.innerText || 6);
    const result = document.getElementById("liftWorkText");
    const rope = document.getElementById("craneRope");
    const load = document.getElementById("craneLoadGroup");
    const fill = document.getElementById("liftMeter");
    const work = mass * 10 * height;

    if (heightVal) heightVal.innerText = height.toFixed(1);
    if (result) result.innerText = `W = m · g · h = ${mass} kg · 10 N/kg · ${height.toFixed(1)} m = ${work.toFixed(0)} J`;
    if (rope) rope.setAttribute("y2", String(210 - height * 55));
    if (load) load.style.transform = `translateY(${-height * 55}px)`;
    if (fill) fill.style.width = `${Math.min(100, work / 6)}%`;
}

// Old names for older markup.
function liftBeam() {
    const range = document.getElementById("heightRange");
    if (range) range.value = 2;
    updateLiftHeight();
}

function dropBeam() {
    const range = document.getElementById("heightRange");
    if (range) range.value = 0;
    updateLiftHeight();
}

// 3. Reibungsarbeit
function setSurface(surface) {
    currentSurface = surface;
    const floor = document.getElementById("floor");
    const text = document.getElementById("frictionText");
    const force = surface === "sand" ? 80 : 20;
    const work = force * 4;

    document.querySelectorAll("[data-surface]").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.surface === surface);
    });

    if (floor) floor.setAttribute("fill", surface === "sand" ? "#fbbf24" : "#bae6fd");
    if (text) {
        text.innerText = surface === "sand"
            ? `Sand: große Reibung. F = ${force} N, s = 4 m, W = ${work} J. Mehr Arbeit wird in Wärme umgewandelt.`
            : `Eis: kleine Reibung. F = ${force} N, s = 4 m, W = ${work} J.`;
        text.style.color = surface === "sand" ? "#b45309" : "#0369a1";
    }
    updateFrictionMeter(work);
}

function setIce() {
    setSurface("ice");
}

function setSand() {
    setSurface("sand");
}

function updateFrictionMeter(work) {
    const fill = document.getElementById("frictionMeter");
    const heat = document.getElementById("heatSparks");
    if (fill) fill.style.width = `${Math.min(100, work / 4)}%`;
    if (heat) heat.style.opacity = currentSurface === "sand" ? "1" : "0.25";
}

function pullSled() {
    const sled = document.getElementById("sledGroup");
    const rope = document.getElementById("pullRope");
    const heat = document.getElementById("heatSparks");
    const duration = currentSurface === "sand" ? "2.8s" : "1.2s";
    if (!sled || !rope) return;

    sled.style.transition = `transform ${duration} linear`;
    rope.style.transition = `transform ${duration} linear`;
    sled.style.transform = "translateX(250px)";
    rope.style.transform = "translateX(250px)";
    if (heat) heat.style.animation = currentSurface === "sand" ? "sweat 0.5s infinite" : "none";

    setTimeout(() => {
        sled.style.transform = "translateX(0px)";
        rope.style.transform = "translateX(0px)";
        if (heat) heat.style.animation = "none";
    }, currentSurface === "sand" ? 3100 : 1500);
}

// 4. Goldene Regel der Mechanik
function compareRamp(type) {
    const ball = document.getElementById("ballGroup");
    const text = document.getElementById("rampText");
    const forceCell = document.getElementById("rampForce");
    const pathCell = document.getElementById("rampPath");
    const workCell = document.getElementById("rampWork");
    const rampSteep = document.getElementById("rampSteep");
    const rampFlat = document.getElementById("rampFlat");

    document.querySelectorAll("[data-ramp]").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.ramp === type);
    });

    const data = type === "flat"
        ? { force: "wenig Kraft: 100 N", path: "langer Weg: 6 m", work: "600 J", msg: "Flache Rampe: Du sparst Kraft, musst aber einen längeren Weg gehen.", x: 250, y: 78 }
        : { force: "viel Kraft: 300 N", path: "kurzer Weg: 2 m", work: "600 J", msg: "Steile Rampe: Der Weg ist kurz, aber du brauchst viel Kraft.", x: 250, y: 78 };

    if (ball) {
        ball.style.transition = "transform 0.9s ease-in-out";
        ball.style.transform = `translate(${data.x}px, ${data.y}px)`;
    }
    if (rampSteep) rampSteep.style.opacity = type === "steep" ? "1" : "0.35";
    if (rampFlat) rampFlat.style.opacity = type === "flat" ? "1" : "0.35";
    if (forceCell) forceCell.innerText = data.force;
    if (pathCell) pathCell.innerText = data.path;
    if (workCell) workCell.innerText = data.work;
    if (text) text.innerText = `${data.msg} Die Arbeit bleibt idealisiert gleich.`;
}

function rollSteep() {
    compareRamp("steep");
}

function rollFlat() {
    compareRamp("flat");
}

// 5. Verformungs- und Beschleunigungsarbeit
function compressSpring() {
    const spring = document.getElementById("springGroup");
    const block = document.getElementById("springBlockGroup");
    const text = document.getElementById("springText");
    const btn = document.getElementById("springBtn");
    const fill = document.getElementById("springMeter");

    springCompressed = !springCompressed;
    if (spring) spring.style.transform = springCompressed ? "scaleX(0.52)" : "scaleX(1)";
    if (block) block.style.transform = springCompressed ? "translateX(-82px)" : "translateX(0px)";
    if (fill) fill.style.width = springCompressed ? "85%" : "15%";
    if (text) {
        text.innerText = springCompressed
            ? "Verformungsarbeit: Die Feder ist zusammengedrückt und speichert Energie."
            : "Die Feder ist entspannt. Kaum Verformungsenergie gespeichert.";
        text.style.color = springCompressed ? "#b91c1c" : "#15803d";
    }
    if (btn) btn.innerText = springCompressed ? "Feder entspannen" : "Feder drücken";
}

function updateBike() {
    const speed = Number(document.getElementById("bikeSpeedRange")?.value || 5);
    const speedVal = document.getElementById("bikeSpeedVal");
    const bike = document.getElementById("bikeGroup");
    const text = document.getElementById("bikeText");
    const fill = document.getElementById("bikeMeter");
    const energy = 0.5 * speed * speed;

    if (speedVal) speedVal.innerText = speed;
    if (bike) bike.style.transform = `translateX(${speed * 10}px)`;
    if (fill) fill.style.width = `${Math.min(100, energy)}%`;
    if (text) text.innerText = `Beschleunigungsarbeit: Je schneller das Fahrrad wird, desto größer wird die Bewegungsenergie. Vergleichswert: ${energy.toFixed(1)}.`;
}
