// Logic for kraft und bewegung topic
function topicInit() {
    initPlaneMotion();
    enhanceForceMotionAccessibility();
    updateLever();
    updateFrictionModel();
    updateForceLab();
    updateNetForceLab();
}

function initPlaneMotion() {
    const zone = document.querySelector('[data-motion-plane]');
    if (!zone || zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const positions = [[0,0],[2,0],[4,0],[4,2],[4,4],[2,4],[0,4],[0,2],[0,0]];
    const time = zone.querySelector('[data-motion-time]');
    const render = () => {
        const index = Math.max(0, Math.min(8, Math.round(Number(time.value) || 0)));
        time.value = String(index);
        const [x,y] = positions[index];
        const marker = zone.querySelector('[data-motion-position]');
        marker.setAttribute('cx', 70 + 40 * x);
        marker.setAttribute('cy', 250 - 40 * y);
        zone.querySelector('[data-motion-trail]').setAttribute('points', positions.slice(0,index+1).map(([px,py]) => (70+40*px)+','+(250-40*py)).join(' '));
        zone.querySelector('[data-motion-time-value]').textContent = index + ' s';
        time.setAttribute('aria-valuetext', index + ' Sekunden; Position x ' + x + ' Meter, y ' + y + ' Meter');
        let direction = 'Start: Noch kein Weg zurückgelegt.';
        if (index > 0) {
            const [previousX,previousY] = positions[index-1];
            const word = x > previousX ? 'rechts' : x < previousX ? 'links' : y > previousY ? 'oben im Plan' : 'unten im Plan';
            direction = 'Im letzten Zeitabschnitt: 2 m in 1 s nach ' + word + '.';
        }
        const text = 'Zeit: ' + index + ' s. Position: (' + x + ' m | ' + y + ' m). Bisher zurückgelegter Weg: ' + (2*index) + ' m. ' + direction + (index===8 ? ' Wieder am Start, aber 16 m Weg zurückgelegt.' : '');
        zone.querySelector('[data-motion-status]').textContent = text;
        zone.querySelector('[data-motion-diagram]').setAttribute('aria-label', 'Bewegung in einer Ebene. ' + text);
    };
    time.addEventListener('input', render);
    zone.querySelector('[data-motion-reset]').addEventListener('click', () => { time.value='0'; render(); });
    render();
}

function updateNetForceLab() {
    const right = document.getElementById('net-force-right');
    const left = document.getElementById('net-force-left');
    const result = document.getElementById('net-force-result');
    if (!right || !left || !result) return;
    const r = Number(right.value), l = Number(left.value), net = r - l;
    right.setAttribute('aria-valuetext', `${r} Newton nach rechts`);
    left.setAttribute('aria-valuetext', `${l} Newton nach links`);
    const acceleration = (net / 2).toLocaleString('de-AT', {maximumFractionDigits: 1});
    result.textContent = `${r} N nach rechts − ${l} N nach links = ${net} N resultierende Kraft. Beschleunigung: ${net} N ÷ 2 kg = ${acceleration} m/s². ` +
        (net === 0 ? 'Kräftegleichgewicht: Ein ruhendes Wagerl bleibt stehen, ein rollendes behält seine Geschwindigkeit und Richtung.' :
            `Die Beschleunigung zeigt nach ${net > 0 ? 'rechts' : 'links'}. Das ist nicht automatisch die Bewegungsrichtung: Bei entgegengesetzter Bewegung wird das Wagerl zunächst langsamer.`);
}

function enhanceForceMotionAccessibility() {
    [
        'kickText',
        'inertiaInsight',
        'frictionRaceText',
        'gravityText',
        'dropResult',
        'rocketText',
        'leverText',
        'leverValue',
        'leverRule',
        'forceLabText',
        'raceText',
        'frictionText'
    ].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const predictionButtons = document.querySelectorAll('[data-predict-group][data-predict-value]');
    predictionButtons.forEach((btn) => {
        if (btn.tagName !== 'BUTTON') btn.setAttribute('role', 'button');
        if (btn.tagName !== 'BUTTON' && !btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
        if (!btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', 'false');
        if (btn.dataset.predictBound === '1') return;
        btn.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setPrediction(btn.dataset.predictGroup, btn.dataset.predictValue);
            }
        });
        btn.dataset.predictBound = '1';
    });

    const leverRange = document.getElementById('leverRange');
    if (leverRange) {
        leverRange.setAttribute('aria-describedby', 'leverValue leverText leverRule');
        leverRange.setAttribute('aria-valuetext', getLeverValueText(Number(leverRange.value || 1)));
    }

    const forceRange = document.getElementById('forceRange');
    if (forceRange) {
        forceRange.setAttribute('aria-describedby', 'forceLabel forceLabText');
        forceRange.setAttribute('aria-valuetext', `${forceRange.value || 6} Newton`);
    }

    const massRange = document.getElementById('massRange');
    if (massRange) {
        massRange.setAttribute('aria-describedby', 'massLabel forceLabText');
        massRange.setAttribute('aria-valuetext', `${massRange.value || 3} Kilogramm`);
    }
}

function setPrediction(group, value) {
    const buttons = document.querySelectorAll(`[data-predict-group="${group}"]`);
    buttons.forEach((btn) => {
        const isSelected = btn.dataset.predictValue === value;
        btn.classList.toggle('selected', isSelected);
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
    const output = document.getElementById(`${group}Prediction`);
    if (output) output.innerText = getPredictionPrompt(group, value);
}

function getPredictionPrompt(group, value) {
    const prompts = {
        inertia: {
            stop: "Vermutung gespeichert: Du denkst an Alltag mit Reibung. Teste jetzt, was ohne starke Bremse passiert.",
            keep: "Vermutung gespeichert: Du achtest auf fehlende Bremskräfte. Jetzt testen!"
        },
        friction: {
            ice: "Vermutung gespeichert: Fläche A hat weniger Gleitreibung. Prüfe den berechneten Weg.",
            carpet: "Vermutung gespeichert: Fläche B hat mehr Gleitreibung. Prüfe, was das für den Weg bedeutet."
        },
        drop: {
            same: "Vermutung gespeichert: Du trennst Schwerkraft von Luftwiderstand. Teste mit und ohne Luft.",
            apple: "Vermutung gespeichert: Das wirkt im Alltag logisch. Teste, welche Rolle Luft spielt.",
            feather: "Vermutung gespeichert: Beobachte genau, ob die Feder wirklich Antrieb hat."
        },
        lever: {
            load: "Vermutung gespeichert: Nah an der Last macht den Lastarm kurz. Schiebe den Drehpunkt und beobachte.",
            middle: "Vermutung gespeichert: Mitte klingt fair. Prüfe, ob fair auch kräftesparend ist.",
            force: "Vermutung gespeichert: Nah an der Kraft macht den Kraftarm kurz. Teste, wie schwer es wird."
        }
    };
    return prompts[group]?.[value] || "Vermutung gespeichert. Jetzt testen!";
}

// 1. Trägheit (Ball schubsen)
function kickBall() {
    let ball = document.getElementById('spaceBall');
    let txt = document.getElementById('kickText');
    if (!ball || !txt) return;
    
    ball.style.transition = 'transform 6s linear'; 
    ball.style.transform = 'translateX(800px)'; 
    
    txt.innerText = "Bei resultierender Kraft null fliegt der Ball geradlinig mit gleichbleibender Geschwindigkeit weiter. Das ist Trägheit.";
    const insight = document.getElementById('inertiaInsight');
    if (insight) insight.innerText = "Erkenntnis: Bewegung braucht keine dauernde Kraft. Eine Kraft ist nötig, um Bewegung zu ändern.";
}

function resetBall() {
    let ball = document.getElementById('spaceBall');
    let txt = document.getElementById('kickText');
    if (!ball || !txt) return;
    ball.style.transition = 'none'; 
    ball.style.transform = 'translateX(0px)';
    txt.innerText = "";
    const insight = document.getElementById('inertiaInsight');
    if (insight) insight.innerText = "";
}

// 2. Reibung
function pushBlocks() {
    const slider = document.getElementById('frictionTime');
    if (!slider) return;
    slider.value = 0;
    updateFrictionModel();
}

function updateFrictionModel() {
    const slider = document.getElementById('frictionTime');
    if (!slider) return;
    const time = Math.max(0, Math.min(4, Number(slider.value) || 0));
    const format = n => Number(n.toFixed(3)).toLocaleString('de-DE');
    const descriptions = [];
    for (const [name, id, deceleration] of [['A', 'iceBlock', 0.5], ['B', 'sandBlock', 2]]) {
        const stopTime = 2 / deceleration;
        const movingTime = Math.min(time, stopTime);
        const distance = 2 * movingTime - 0.5 * deceleration * movingTime * movingTime;
        const speed = Math.max(0, 2 - deceleration * time);
        const force = speed > 0 ? deceleration : 0;
        const row = document.querySelector('[data-friction-row="' + name + '"]');
        if (!row) continue;
        row.querySelector('[data-friction-distance]').textContent = format(distance) + ' m';
        row.querySelector('[data-friction-speed]').textContent = format(speed) + ' m/s';
        row.querySelector('[data-friction-force]').textContent = format(force) + ' N' + (force ? ' nach links' : '');
        const block = document.getElementById(id);
        if (block) block.setAttribute('x', String(20 + 100 * distance));
        const description = 'Fläche ' + name + ': Weg ' + format(distance) + ' m, Tempo ' + format(speed) + ' m/s' + (speed === 0 ? ', Stillstand.' : '.');
        const diagram = document.querySelector('[data-friction-diagram="' + id + '"]');
        if (diagram) diagram.setAttribute('aria-label', description);
        descriptions.push(description);
    }
    slider.setAttribute('aria-valuetext', format(time) + ' Sekunden nach dem Start');
    const status = document.getElementById('frictionRaceText');
    if (status) status.textContent = 'Modellzeit ' + format(time) + ' s. ' + descriptions.join(' ');
}

// 3. Schwerkraft (Vakuum)
function dropItems(isVacuum) {
    let apple = document.getElementById('apple');
    let feather = document.getElementById('feather');
    let txt = document.getElementById('gravityText');
    if (!apple || !feather || !txt) return;
    
    apple.style.transition = 'none';
    feather.style.transition = 'none';
    apple.style.transform = 'translateY(20px)';
    feather.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        apple.style.transition = 'transform 1s cubic-bezier(0.5, 0, 1, 1)'; 
        apple.style.transform = 'translateY(215px)';
        
        if(isVacuum) {
            feather.style.transition = 'transform 1s cubic-bezier(0.5, 0, 1, 1)';
            feather.style.transform = 'translateY(225px)';
            txt.innerText = "Im Vakuum gibt es keinen Luftwiderstand. Beide fallen gleich schnell.";
            txt.style.color = "#E91E63";
            const result = document.getElementById('dropResult');
            if (result) result.innerText = "Erkenntnis: Ohne Luftwiderstand entscheidet nicht die Form. Beide werden gleich beschleunigt.";
        } else {
            feather.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.6, 1)'; 
            feather.style.transform = 'translateY(225px)';
            txt.innerText = "Mit Luft: Der Apfel ist schwer und kompakt. Die Luft bremst die breite Feder stark ab.";
            txt.style.color = "#1976D2";
            const result = document.getElementById('dropResult');
            if (result) result.innerText = "Erkenntnis: In Luft wirkt zusätzlich Luftwiderstand. Er bremst breite, leichte Dinge stark.";
        }
    }, 50);
}

// 4. Rakete (Aktion/Reaktion)
function launchRocket() {
    let rocket = document.getElementById('rocket');
    let flame = document.getElementById('rocketFlame');
    if (!rocket || !flame) return;
    
    flame.style.display = 'block';
    flame.classList.add('anim-shake');
    const result = document.getElementById('rocketText');
    if (result) result.innerText = "Aktion: Gase werden nach unten gedrückt.";
    
    setTimeout(() => {
        rocket.style.transform = 'translateY(-100px)';
        if (result) result.innerText = "Reaktion: Die Rakete wird nach oben gedrückt.";
        setTimeout(() => {
            flame.style.display = 'none';
            rocket.style.transform = 'translateY(200px)'; 
        }, 2500);
    }, 500);
}

// 5. Hebelwirkung
function updateLever() {
    const range = document.getElementById('leverRange');
    const fulcrum = document.getElementById('fulcrum');
    const seesaw = document.getElementById('seesawGroup');
    if (!range || !fulcrum || !seesaw) return;
    const leftArm = Math.max(0.2, Math.min(1.8, Number(range.value) || 1));
    const rightArm = 2 - leftArm;
    const leftMoment = 40 * leftArm;
    const rightMoment = 10 * rightArm;
    const format = n => Number(n.toFixed(2)).toLocaleString('de-DE');
    const text = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
    const pivot = 50 + 105 * leftArm;
    fulcrum.style.transform = 'translateX(' + (pivot - 150) + 'px)';
    seesaw.style.transformOrigin = pivot + 'px 90px';
    const balance = Math.abs(leftMoment - rightMoment) < 1e-9;
    const lifts = rightMoment > leftMoment;
    seesaw.style.transform = 'rotate(' + (balance ? 0 : lifts ? 12 : -12) + 'deg)';
    const result = balance ? 'Gleichgewicht der Drehmomente: keine anfängliche Drehbeschleunigung im Modell.' : lifts ? 'Das rechte Drehmoment ist größer: Die linke Last beginnt sich zu heben.' : 'Das linke Drehmoment ist größer: Die linke Last beginnt sich zu senken.';
    text('#leverValue', format(leftArm) + ' m von der linken Last');
    text('#leverForceArm', format(rightArm) + ' m');
    text('#leverLoadArm', format(leftArm) + ' m');
    text('[data-lever-left-arm]', format(leftArm) + ' m');
    text('[data-lever-right-arm]', format(rightArm) + ' m');
    text('[data-lever-left-moment]', format(leftMoment) + ' N·m');
    text('[data-lever-right-moment]', format(rightMoment) + ' N·m');
    text('#leverText', result);
    text('#leverRule', 'Links: 40 N × ' + format(leftArm) + ' m = ' + format(leftMoment) + ' N·m. Rechts: 10 N × ' + format(rightArm) + ' m = ' + format(rightMoment) + ' N·m. ' + result);
    range.setAttribute('aria-valuetext', getLeverValueText(leftArm) + '. ' + result);
    const diagram = document.querySelector('[data-lever-diagram]');
    if (diagram) diagram.setAttribute('aria-label', getLeverValueText(leftArm) + '. Links ' + format(leftMoment) + ' Newtonmeter, rechts ' + format(rightMoment) + ' Newtonmeter. ' + result);
}

function getLeverValueText(value) {
    return 'Drehpunkt ' + Number(value).toLocaleString('de-DE') + ' Meter von der linken Last';
}

function updateForceLab() {
    const force = Number(document.getElementById('forceRange')?.value || 6);
    const mass = Number(document.getElementById('massRange')?.value || 3);
    const forceLabel = document.getElementById('forceLabel');
    const massLabel = document.getElementById('massLabel');
    const accelLabel = document.getElementById('accelLabel');
    const accelMeter = document.getElementById('accelMeter');
    const acceleration = force / mass;

    if (forceLabel) forceLabel.innerText = `${force} N`;
    if (massLabel) massLabel.innerText = `${mass} kg`;
    if (accelLabel) accelLabel.innerText = `${acceleration.toFixed(1)} m/s²`;
    if (accelMeter) accelMeter.style.width = `${Math.min(100, acceleration * 18)}%`;
    document.getElementById('forceRange')?.setAttribute('aria-valuetext', `${force} Newton`);
    document.getElementById('massRange')?.setAttribute('aria-valuetext', `${mass} Kilogramm`);

    const result = document.getElementById('forceLabText');
    if (result) {
        result.innerText = `Resultierende Kraft ${force} N ÷ Masse ${mass} kg = ${acceleration.toFixed(1)} m/s². Bei gleicher Masse erhöht mehr resultierende Kraft die Beschleunigung; bei gleicher Kraft verringert mehr Masse die Beschleunigung.`;
    }
}

function runForceLab() {
    updateForceLab();
    const force = Number(document.getElementById('forceRange')?.value || 6);
    const mass = Number(document.getElementById('massRange')?.value || 3);
    const acceleration = force / mass;
    const cart = document.getElementById('forceCart');
    const result = document.getElementById('forceLabText');
    if (!cart || !result) return;

    const duration = Math.max(0.7, 4.2 / acceleration);
    cart.style.transition = 'none';
    cart.style.transform = 'translateX(10px)';

    setTimeout(() => {
        cart.style.transition = `transform ${duration}s ease-in`;
        cart.style.transform = 'translateX(300px)';
        result.innerText = `Ergebnis: ${force} N resultierende Kraft bei ${mass} kg Masse ergeben ${acceleration.toFixed(1)} m/s². Rechenweg: a = F ÷ m = ${force} ÷ ${mass}. Die Animation ist ein schematischer Vergleich, keine maßstäbliche Weg-Zeit-Messung.`;
    }, 50);
}

// 6. Newton 2 (Rennen)
function race(vehicle) {
    const racer = document.getElementById('racer');
    const emoji = document.getElementById('racerEmoji');
    const txt = document.getElementById('raceText');
    if(!racer || !emoji || !txt) return;

    racer.style.transition = 'none';
    racer.style.transform = 'translateX(10px)';
    
    let time = 1;
    let name = "";
    if(vehicle === 'bike') { time = 1; name = "Fahrrad (Leicht)"; emoji.innerText = "🚲"; }
    if(vehicle === 'car') { time = 2; name = "Auto (Mittel)"; emoji.innerText = "🚗"; }
    if(vehicle === 'truck') { time = 4; name = "LKW (Schwer)"; emoji.innerText = "🚛"; }

    txt.innerText = `${name} startet...`;
    
    setTimeout(() => {
        racer.style.transition = `transform ${time}s ease-in`;
        racer.style.transform = 'translateX(300px)';
        setTimeout(() => {
            txt.innerText = `${name} braucht ${time}s für die Beschleunigung bei gleicher Kraft. Mehr Masse reagiert langsamer.`;
        }, time * 1000);
    }, 50);
}

// 7. Reibungsarten
function moveBox(mode) {
    const box = document.getElementById('boxGroup');
    const wheels = document.getElementById('boxWheels');
    const txt = document.getElementById('frictionText');
    if(!box || !wheels || !txt) return;

    box.style.transition = 'none';
    box.style.transform = 'translateX(20px)';
    wheels.style.display = 'none';

    setTimeout(() => {
        if(mode === 'slide') {
            wheels.style.display = 'none';
            box.style.transition = 'transform 2s ease-out';
            box.style.transform = 'translateX(100px)';
            txt.innerText = "Gleitreibung bremst stark ab. Schwer zu schieben.";
            txt.style.color = "#E91E63";
        } else {
            wheels.style.display = 'block';
            box.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.4, 1)';
            box.style.transform = 'translateX(250px)';
            txt.innerText = "Rollreibung ist viel kleiner. Mit Rädern geht es deutlich leichter.";
            txt.style.color = "#4CAF50";
        }
    }, 50);
}
