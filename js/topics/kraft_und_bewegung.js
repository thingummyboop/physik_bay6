// Logic for kraft und bewegung topic
function topicInit() {
    enhanceForceMotionAccessibility();
    updateLever();
    updateForceLab();
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
    });

    const leverRange = document.getElementById('leverRange');
    if (leverRange) {
        leverRange.setAttribute('aria-describedby', 'leverValue leverText leverRule');
        leverRange.setAttribute('aria-valuetext', getLeverValueText(Number(leverRange.value || 50)));
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
    buttons.forEach(btn => btn.classList.toggle('selected', btn.dataset.predictValue === value));
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
            ice: "Vermutung gespeichert: Weniger Reibung könnte weiter führen. Teste das Rennen.",
            carpet: "Vermutung gespeichert: Teppich fühlt sich griffig an. Prüfe, ob griffig auch weiter bedeutet."
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
    
    txt.innerText = "Ohne bremsende Kraft fliegt der Ball weiter. Das ist Trägheit.";
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
    let ice = document.getElementById('iceBlock');
    let sand = document.getElementById('sandBlock');
    if (!ice || !sand) return;
    
    ice.style.transition = 'none';
    sand.style.transition = 'none';
    ice.style.transform = 'translateX(0)';
    sand.style.transform = 'translateX(0)';
    const iceMeter = document.getElementById('iceDistance');
    const carpetMeter = document.getElementById('carpetDistance');
    const result = document.getElementById('frictionRaceText');
    if (iceMeter) iceMeter.style.width = '0%';
    if (carpetMeter) carpetMeter.style.width = '0%';
    if (result) result.innerText = "";
    
    setTimeout(() => {
        ice.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        sand.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)'; 
        
        ice.style.transform = 'translateX(400px)'; 
        sand.style.transform = 'translateX(60px)';  
        if (iceMeter) iceMeter.style.width = '92%';
        if (carpetMeter) carpetMeter.style.width = '28%';
        if (result) result.innerText = "Ergebnis: Auf Eis kommt der Block viel weiter. Der Teppich bremst stärker.";
    }, 50);
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
    let val = document.getElementById('leverRange')?.value || 50;
    let fulcrum = document.getElementById('fulcrum');
    let seesaw = document.getElementById('seesawGroup');
    let txt = document.getElementById('leverText');
    let txtPos = document.getElementById('leverValue');
    let forceArmText = document.getElementById('leverForceArm');
    let loadArmText = document.getElementById('leverLoadArm');
    let ruleText = document.getElementById('leverRule');
    if (!fulcrum || !seesaw) return;
    const leverRange = document.getElementById('leverRange');
    if (leverRange) leverRange.setAttribute('aria-valuetext', getLeverValueText(Number(val)));
    
    let pixelX = 40 + ((val - 10) / 80) * 220;
    fulcrum.style.transform = `translateX(${pixelX - 150}px)`; 
    seesaw.style.transformOrigin = `${pixelX}px 90px`;

    const forceArm = Math.max(1, Math.round(260 - pixelX));
    const loadArm = Math.max(1, Math.round(pixelX - 50));
    if (forceArmText) forceArmText.innerText = forceArm > 160 ? "lang" : forceArm > 95 ? "mittel" : "kurz";
    if (loadArmText) loadArmText.innerText = loadArm < 55 ? "kurz" : loadArm < 125 ? "mittel" : "lang";
    
    if (val < 40) {
        seesaw.style.transform = 'rotate(15deg)';
        if (txt) {
            txt.innerText = "Guter Hebel: Der Kraftarm beim roten Gewicht ist lang, der Lastarm bei der schweren Last ist kurz.";
            txt.style.color = "#4CAF50";
        }
        if (txtPos) txtPos.innerText = "Nah an der Last (Perfekt!)";
        if (ruleText) ruleText.innerText = "Erkenntnis: Setzt du den Drehpunkt nahe an die Last, kann eine kleine Kraft auf einem langen Weg viel bewirken.";
        updateLeverMeter(85);
    } else if (val > 60) {
        seesaw.style.transform = 'rotate(-25deg)';
        if (txt) {
            txt.innerText = "Ungünstig: Der Kraftarm ist kurz und der Lastarm ist lang. Du brauchst sehr viel Kraft.";
            txt.style.color = "#F44336";
        }
        if (txtPos) txtPos.innerText = "Nah an der Kraft (Schlecht!)";
        if (ruleText) ruleText.innerText = "Erkenntnis: Nah an der Kraft ist für schwere Lasten ungünstig. Der Weg ist kurz, aber die nötige Kraft ist groß.";
        updateLeverMeter(20);
    } else {
        seesaw.style.transform = 'rotate(-15deg)';
        if (txt) {
            txt.innerText = "Mittelmäßig: Beide Arme sind ähnlich lang. Die schwere Last gewinnt noch.";
            txt.style.color = "#E91E63";
        }
        if (txtPos) txtPos.innerText = "Mitte";
        if (ruleText) ruleText.innerText = "Erkenntnis: Ein Hebel hilft besonders dann, wenn der Kraftarm deutlich länger ist als der Lastarm.";
        updateLeverMeter(45);
    }
}

function getLeverValueText(value) {
    if (value < 40) return "Drehpunkt nah an der Last, günstiger langer Kraftarm";
    if (value > 60) return "Drehpunkt nah an der Kraft, ungünstiger kurzer Kraftarm";
    return "Drehpunkt ungefähr in der Mitte";
}

function updateLeverMeter(value) {
    const meter = document.getElementById('leverChance');
    if (meter) meter.style.width = `${value}%`;
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
        result.innerText = acceleration >= 3
            ? "Schätzung: starke Beschleunigung. Hohe Kraft und kleine Masse passen gut zusammen."
            : "Schätzung: eher langsame Beschleunigung. Mehr Masse macht den Start träger.";
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
        result.innerText = `Ergebnis: ${force} N Kraft bei ${mass} kg Masse ergeben ${acceleration.toFixed(1)} m/s². Rechenweg: a = F ÷ m = ${force} ÷ ${mass}. Mehr Kraft hilft. Mehr Masse macht die Beschleunigung kleiner.`;
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
