// Logic for arbeit topic
let currentSurface = "ice";
let springCompressed = false;
let workSceneToken = 0;

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
        text: "Beim gleichmäßigen Tragen wirkt deine Haltekraft nach oben, der Weg ist waagerecht. Kraft und Weg zeigen nicht in dieselbe Richtung.",
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
    const token = ++workSceneToken;
    const data = workCases[type];
    const text = document.getElementById("workCaseText");
    const formula = document.getElementById("workCaseFormula");
    const person = document.getElementById("personGroup");
    const box = document.getElementById("boxGroup");
    const wall = document.getElementById("wallGroup");
    const bag = document.getElementById("bagGroup");
    const arrow = document.getElementById("workForceArrow");
    const arrowLine = document.getElementById("workForceLine");
    const arrowHead = document.getElementById("workForceHead");
    const arrowLabel = document.getElementById("workForceLabel");
    const carryVectors = document.getElementById("carryVectors");
    const holdForceVector = document.getElementById("holdForceVector");
    const carryPathVector = document.getElementById("carryPathVector");
    if (!data) return;

    if (text) {
        text.innerText = data.text;
        text.style.color = data.color;
    }
    if (formula) formula.innerText = data.work;
    document.querySelectorAll("[data-work-case]").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.workCase === type);
    });

    [person, box, bag, carryVectors].forEach((el) => {
        if (!el) return;
        if (el.getAnimations) el.getAnimations().forEach((animation) => animation.cancel());
        el.style.transform = "translate(0px, 0px)";
        el.removeAttribute("transform");
    });

    if (box) box.style.display = type === "box" ? "block" : "none";
    if (wall) wall.style.display = type === "wall" ? "block" : "none";
    if (bag) {
        bag.style.display = type === "hold" || type === "carry" ? "block" : "none";
        bag.style.opacity = "1";
    }
    if (arrow) arrow.setAttribute("opacity", "0");
    if (carryVectors) {
        carryVectors.style.display = type === "hold" || type === "carry" ? "block" : "none";
        carryVectors.setAttribute("opacity", type === "hold" || type === "carry" ? "1" : "0");
    }
    if (holdForceVector) holdForceVector.style.display = type === "hold" || type === "carry" ? "block" : "none";
    if (carryPathVector) carryPathVector.style.display = type === "carry" ? "block" : "none";

    if (type === "box") {
        if (arrowLine) {
            arrowLine.setAttribute("x1", "238");
            arrowLine.setAttribute("y1", "132");
            arrowLine.setAttribute("x2", "268");
            arrowLine.setAttribute("y2", "132");
        }
        if (arrowHead) arrowHead.setAttribute("points", "268,132 258,126 258,138");
        if (arrowLabel) {
            arrowLabel.setAttribute("x", "253");
            arrowLabel.setAttribute("y", "121");
        }
        if (person) {
            const approach = person.animate([
                { transform: "translate(0px, 0px)" },
                { transform: "translate(48px, 0px)" }
            ], { duration: 650, fill: "forwards", easing: "ease" });

            approach.finished.then(() => {
                if (token !== workSceneToken) return;
                if (arrow) arrow.setAttribute("opacity", "1");
                person.animate([
                    { transform: "translate(48px, 0px)" },
                    { transform: "translate(118px, 0px)" }
                ], { duration: 900, fill: "forwards", easing: "ease" });
                if (box) box.animate([
                    { transform: "translate(0px, 0px)" },
                    { transform: "translate(70px, 0px)" }
                ], { duration: 900, fill: "forwards", easing: "ease" });
            });
        }
    }
    if (type === "wall") {
        if (arrowLine) {
            arrowLine.setAttribute("x1", "314");
            arrowLine.setAttribute("y1", "132");
            arrowLine.setAttribute("x2", "338");
            arrowLine.setAttribute("y2", "132");
        }
        if (arrowHead) arrowHead.setAttribute("points", "338,132 328,126 328,138");
        if (arrowLabel) {
            arrowLabel.setAttribute("x", "326");
            arrowLabel.setAttribute("y", "121");
        }
        if (person) {
            const approach = person.animate([
                { transform: "translate(0px, 0px)" },
                { transform: "translate(188px, 0px)" }
            ], { duration: 900, fill: "forwards", easing: "ease" });

            approach.finished.then(() => {
                if (token !== workSceneToken) return;
                if (arrow) arrow.setAttribute("opacity", "1");
            });
        }
    }
    if (type === "carry") {
        if (person) person.animate([
            { transform: "translate(0px, 0px)" },
            { transform: "translate(140px, 0px)" }
        ], { duration: 900, fill: "forwards", easing: "ease" });
        if (carryVectors) {
            const vectorMove = carryVectors.animate([
                { transform: "translate(0px, 0px)" },
                { transform: "translate(140px, 0px)" }
            ], { duration: 900, fill: "forwards", easing: "ease" });
            vectorMove.finished.then(() => {
                if (token !== workSceneToken) return;
                carryVectors.setAttribute("transform", "translate(140 0)");
            });
        }
        if (bag) {
            const bagMove = bag.animate([
                { transform: "translate(0px, 0px)" },
                { transform: "translate(140px, 0px)" }
            ], { duration: 900, fill: "forwards", easing: "ease" });
            bagMove.finished.then(() => {
                if (token !== workSceneToken) return;
                bag.setAttribute("transform", "translate(140 0)");
            });
        }
    }
}

// Old buttons may still exist in cached pages.
function pushWall() { chooseWorkCase("wall"); }
function pushBox() { chooseWorkCase("box"); }

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
    
    // Animate robustly
    if (rope) {
        rope.animate([{ y2: String(210 - height * 55) }], { duration: 300, fill: 'forwards' });
    }
    if (load) {
        load.animate([{ transform: `translate(0, ${-height * 55}px)` }], { duration: 300, fill: 'forwards', easing: 'ease-out' });
    }
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

function setIce() { setSurface("ice"); }
function setSand() { setSurface("sand"); }

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
    const durationMs = currentSurface === "sand" ? 2800 : 1200;
    if (!sled || !rope) return;

    // Use animate() for safe SVG transforms
    sled.animate([
        { transform: "translate(0, 0)" },
        { transform: "translate(250px, 0)" }
    ], { duration: durationMs, fill: 'forwards', easing: 'linear' });

    rope.animate([
        { transform: "translate(0, 0)" },
        { transform: "translate(250px, 0)" }
    ], { duration: durationMs, fill: 'forwards', easing: 'linear' });

    if (heat) heat.style.animation = currentSurface === "sand" ? "sweat 0.5s infinite" : "none";

    setTimeout(() => {
        sled.animate([
            { transform: "translate(250px, 0)" },
            { transform: "translate(0, 0)" }
        ], { duration: 500, fill: 'forwards', easing: 'linear' });

        rope.animate([
            { transform: "translate(250px, 0)" },
            { transform: "translate(0, 0)" }
        ], { duration: 500, fill: 'forwards', easing: 'linear' });
        
        if (heat) heat.style.animation = "none";
    }, durationMs + 300);
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
        ? { force: "wenig Kraft: 100 N", path: "langer Weg: 6 m", work: "600 J", msg: "Flache Rampe: Du sparst Kraft, musst aber einen längeren Weg gehen.", x: 275, y: -100, startX: 0, startY: 0, duration: 2500 }
        : { force: "viel Kraft: 300 N", path: "kurzer Weg: 2 m", work: "600 J", msg: "Steile Rampe: Der Weg ist kurz, aber du brauchst viel Kraft.", x: 275, y: -100, startX: 175, startY: 0, duration: 1000 };

    if (ball) {
        // Jump to start of the correct ramp, then roll up
        ball.animate([
            { transform: `translate(${data.startX}px, ${data.startY}px)` },
            { transform: `translate(${data.x}px, ${data.y}px)` }
        ], { duration: data.duration, fill: 'forwards', easing: 'ease-in-out' });
    }
    
    if (rampSteep) rampSteep.style.opacity = type === "steep" ? "1" : "0.35";
    if (rampFlat) rampFlat.style.opacity = type === "flat" ? "1" : "0.35";
    if (forceCell) forceCell.innerText = data.force;
    if (pathCell) pathCell.innerText = data.path;
    if (workCell) workCell.innerText = data.work;
    if (text) text.innerText = `${data.msg} Die Arbeit bleibt idealisiert gleich.`;
}

function rollSteep() { compareRamp("steep"); }
function rollFlat() { compareRamp("flat"); }

// 5. Verformungs- und Beschleunigungsarbeit
function compressSpring() {
    const spring = document.getElementById("springGroup");
    const block = document.getElementById("springBlockGroup");
    const text = document.getElementById("springText");
    const btn = document.getElementById("springBtn");
    const fill = document.getElementById("springMeter");

    springCompressed = !springCompressed;
    
    if (spring) {
        spring.animate([{ transform: springCompressed ? "scaleX(0.52)" : "scaleX(1)" }], { duration: 400, fill: 'forwards', easing: 'ease-in-out' });
    }
    if (block) {
        block.animate([{ transform: springCompressed ? "translate(-82px, 0)" : "translate(0, 0)" }], { duration: 400, fill: 'forwards', easing: 'ease-in-out' });
    }
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
    if (bike) {
        bike.animate([{ transform: `translate(${speed * 10}px, 0)` }], { duration: 300, fill: 'forwards', easing: 'ease-out' });
    }
    if (fill) fill.style.width = `${Math.min(100, energy)}%`;
    if (text) text.innerText = "Beschleunigungsarbeit: Je schneller das Fahrrad wird, desto größer wird die Bewegungsenergie. Doppelt so schnell bedeutet ungefähr viermal so viel Bewegungsenergie.";
}
