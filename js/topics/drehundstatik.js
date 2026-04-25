// Logic for drehundstatik topic
let skaterAngle = 0;
let skaterSpeed = 0.025;
let skaterAnimationStarted = false;

function topicInit() {
    testEquilibrium('stable');
    updateBalance();
    updateCarousel();
    resetDoor();
    updateMeter('spinMeter', 30);
    startSkaterAnimation();
}

function setPrediction(group, value) {
    const buttons = document.querySelectorAll(`[data-predict-group="${group}"]`);
    buttons.forEach(btn => btn.classList.toggle('selected', btn.dataset.predictValue === value));
    const output = document.getElementById(`${group}Prediction`);
    if (output) output.innerText = "Vermutung gespeichert. Jetzt testen!";
}

function updateMeter(id, value) {
    const meter = document.getElementById(id);
    if (meter) meter.style.width = `${value}%`;
}

// 1. Schwerpunkt
function updateBalance() {
    const val = parseInt(document.getElementById('cgRange')?.value || 0);
    const acrobat = document.getElementById('acrobatBody');
    const marker = document.getElementById('cgMarker');
    const txt = document.getElementById('balanceText');
    if (!acrobat || !marker) return;

    marker.style.transform = `translateX(${val}px)`;

    if (val > 25) {
        acrobat.style.transform = `translateX(${val * 0.18}px) rotate(10deg)`;
        if (txt) {
            txt.innerText = "Zu weit rechts: Die Lotlinie des Schwerpunkts trifft nicht mehr das Seil. Der Artist kippt seitlich.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else if (val < -25) {
        acrobat.style.transform = `translateX(${val * 0.18}px) rotate(-10deg)`;
        if (txt) {
            txt.innerText = "Zu weit links: Die Lotlinie liegt neben dem Seil. Das Gleichgewicht ist verloren.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else {
        acrobat.style.transform = `translateX(${val * 0.06}px) rotate(${val * 0.06}deg)`;
        if (txt) {
            txt.innerText = "Sicher: Die Lotlinie des Schwerpunkts trifft das Seil. Das Gleichgewicht hält.";
            txt.style.color = "#00796B";
        }
        updateMeter('balanceMeter', 90);
    }
}

// 2. Drehmoment
function pushDoor(pos) {
    const door = document.getElementById('doorPanel');
    const handle = document.getElementById('doorHandle');
    const armLine = document.getElementById('leverArmLine');
    const arrow = document.getElementById('doorForceArrow');
    const txt = document.getElementById('doorText');
    if (!door || !handle || !armLine || !arrow) return;

    arrow.style.display = 'block';

    if (pos === 'hinge') {
        setDoorTopView(10, 50, '#F44336');
        if (txt) {
            txt.innerText = "Nah am Scharnier: kleiner Hebelarm, kleines Drehmoment. Die Tür bewegt sich kaum.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('torqueMeter', 15);
    } else if (pos === 'middle') {
        setDoorTopView(42, 135, '#FF9800');
        if (txt) {
            txt.innerText = "In der Mitte: mittlerer Hebelarm. Es geht, aber du brauchst noch viel Kraft.";
            txt.style.color = "#F57C00";
        }
        updateMeter('torqueMeter', 55);
    } else {
        setDoorTopView(72, 215, '#4CAF50');
        if (txt) {
            txt.innerText = "An der Klinke: langer Hebelarm, großes Drehmoment. Die Tür öffnet sich leicht.";
            txt.style.color = "#388E3C";
        }
        updateMeter('torqueMeter', 95);
    }
}

function setDoorTopView(angleDeg, pushDistance, color) {
    const hingeX = 95;
    const hingeY = 170;
    const length = 270;
    const thickness = 28;
    const angle = -angleDeg * Math.PI / 180;
    const vx = Math.cos(angle);
    const vy = Math.sin(angle);
    const nx = -vy;
    const ny = vx;

    const h1 = [hingeX + nx * thickness / 2, hingeY + ny * thickness / 2];
    const h2 = [hingeX - nx * thickness / 2, hingeY - ny * thickness / 2];
    const f1 = [hingeX + vx * length + nx * thickness / 2, hingeY + vy * length + ny * thickness / 2];
    const f2 = [hingeX + vx * length - nx * thickness / 2, hingeY + vy * length - ny * thickness / 2];
    const handle = [hingeX + vx * (length - 20), hingeY + vy * (length - 20)];
    const pushPoint = [hingeX + vx * pushDistance, hingeY + vy * pushDistance];
    const arrowStart = [pushPoint[0] + nx * 46, pushPoint[1] + ny * 46];
    const arrowEnd = [pushPoint[0] + nx * 14, pushPoint[1] + ny * 14];

    document.getElementById('doorPanel')?.setAttribute('points', `${h1[0]},${h1[1]} ${f1[0]},${f1[1]} ${f2[0]},${f2[1]} ${h2[0]},${h2[1]}`);
    document.getElementById('doorHandle')?.setAttribute('cx', handle[0]);
    document.getElementById('doorHandle')?.setAttribute('cy', handle[1]);
    document.getElementById('doorPushPoint')?.setAttribute('cx', pushPoint[0]);
    document.getElementById('doorPushPoint')?.setAttribute('cy', pushPoint[1]);
    document.getElementById('doorPushPoint')?.setAttribute('opacity', '1');
    document.getElementById('doorPushHalo')?.setAttribute('cx', pushPoint[0]);
    document.getElementById('doorPushHalo')?.setAttribute('cy', pushPoint[1]);
    document.getElementById('doorPushHalo')?.setAttribute('opacity', '1');
    document.getElementById('doorPushLabel')?.setAttribute('x', pushPoint[0]);
    document.getElementById('doorPushLabel')?.setAttribute('y', pushPoint[1] + 42);
    document.getElementById('doorPushLabel')?.setAttribute('opacity', '1');

    const armLine = document.getElementById('leverArmLine');
    if (armLine) {
        armLine.setAttribute('x1', hingeX);
        armLine.setAttribute('y1', hingeY);
        armLine.setAttribute('x2', pushPoint[0]);
        armLine.setAttribute('y2', pushPoint[1]);
        armLine.setAttribute('stroke', color);
    }

    const arrow = document.getElementById('doorForceArrow');
    if (arrow) {
        arrow.setAttribute('x1', arrowStart[0]);
        arrow.setAttribute('y1', arrowStart[1]);
        arrow.setAttribute('x2', arrowEnd[0]);
        arrow.setAttribute('y2', arrowEnd[1]);
        arrow.setAttribute('stroke', color);
        arrow.style.display = 'block';
    }
}

function resetDoor() {
    const hingeX = 95;
    const hingeY = 170;
    const length = 270;
    const thickness = 28;
    const h1 = [hingeX, hingeY - thickness / 2];
    const h2 = [hingeX, hingeY + thickness / 2];
    const f1 = [hingeX + length, hingeY - thickness / 2];
    const f2 = [hingeX + length, hingeY + thickness / 2];
    document.getElementById('doorPanel')?.setAttribute('points', `${h1[0]},${h1[1]} ${f1[0]},${f1[1]} ${f2[0]},${f2[1]} ${h2[0]},${h2[1]}`);
    document.getElementById('doorHandle')?.setAttribute('cx', hingeX + length - 25);
    document.getElementById('doorHandle')?.setAttribute('cy', hingeY);
    document.getElementById('leverArmLine')?.setAttribute('x1', hingeX);
    document.getElementById('leverArmLine')?.setAttribute('y1', hingeY);
    document.getElementById('leverArmLine')?.setAttribute('x2', hingeX + length - 25);
    document.getElementById('leverArmLine')?.setAttribute('y2', hingeY);
    document.getElementById('leverArmLine')?.setAttribute('stroke', '#2563eb');
    document.getElementById('doorPushPoint')?.setAttribute('opacity', '0');
    document.getElementById('doorPushHalo')?.setAttribute('opacity', '0');
    document.getElementById('doorPushLabel')?.setAttribute('opacity', '0');
    const arrow = document.getElementById('doorForceArrow');
    if (arrow) arrow.style.display = 'none';
    const txt = document.getElementById('doorText');
    if (txt) {
        txt.innerText = "Tür geschlossen. Wähle einen Druckpunkt und teste das Drehmoment.";
        txt.style.color = "#334155";
    }
    updateMeter('torqueMeter', 0);
}

// 3. Gleichgewichtsarten
function testEquilibrium(type) {
    const pStable = document.getElementById('pathStable');
    const pUnstable = document.getElementById('pathUnstable');
    const pIndiff = document.getElementById('pathIndiff');
    const marble = document.getElementById('marble');
    const txt = document.getElementById('eqText');
    if (!marble) return;

    if (pStable) pStable.style.display = 'none';
    if (pUnstable) pUnstable.style.display = 'none';
    if (pIndiff) pIndiff.style.display = 'none';

    if (type === 'stable') {
        if (pStable) pStable.style.display = 'block';
        if (txt) txt.innerText = "Stabil: Die Murmel rollt wirklich entlang der Schüsselkurve zurück in die tiefste Stelle.";
        animateMarbleOnQuadratic({ x: 62, y: 82 }, { x: 160, y: 176 }, { x: 258, y: 82 }, 0.08, 0.5, 1200);
    } else if (type === 'unstable') {
        if (pUnstable) pUnstable.style.display = 'block';
        if (txt) txt.innerText = "Labil: Vom höchsten Punkt rollt die Murmel entlang der Bergkurve weg.";
        animateMarbleOnQuadratic({ x: 48, y: 162 }, { x: 160, y: 42 }, { x: 272, y: 162 }, 0.5, 0.9, 1200);
    } else {
        if (pIndiff) pIndiff.style.display = 'block';
        if (txt) txt.innerText = "Indifferent: Auf der ebenen Bahn bleibt die Höhe gleich. Die Murmel bleibt an einer neuen Stelle.";
        animateMarbleOnLine({ x: 75, y: 112 }, { x: 230, y: 112 }, 1000);
    }
}

function animateMarbleOnQuadratic(p0, p1, p2, fromT, toT, duration) {
    const marble = document.getElementById('marble');
    if (!marble) return;
    const start = performance.now();

    function point(t) {
        const u = 1 - t;
        return {
            x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
            y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
        };
    }

    function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const t = fromT + (toT - fromT) * eased;
        const p = point(t);
        marble.setAttribute('cx', p.x);
        marble.setAttribute('cy', p.y);
        if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function animateMarbleOnLine(p0, p1, duration) {
    const marble = document.getElementById('marble');
    if (!marble) return;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        marble.setAttribute('cx', p0.x + (p1.x - p0.x) * eased);
        marble.setAttribute('cy', p0.y + (p1.y - p0.y) * eased);
        if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

// 4. Kreisbewegung
function updateCarousel() {
    const speed = parseInt(document.getElementById('speedRange')?.value || 0);
    const chainL = document.getElementById('chainL');
    const chainR = document.getElementById('chainR');
    const seatL = document.getElementById('seatL');
    const seatR = document.getElementById('seatR');
    const arrows = document.getElementById('outwardArrows');
    const speedTxt = document.getElementById('speedValue');
    const forceTxt = document.getElementById('carouselText');

    if (speed === 0) {
        if (speedTxt) speedTxt.innerText = "Steht still";
        if (forceTxt) forceTxt.innerText = "Ohne Drehung hängen die Sitze nach unten.";
        if (chainL) { chainL.setAttribute('x2', '95'); chainL.setAttribute('y2', '172'); }
        if (chainR) { chainR.setAttribute('x2', '335'); chainR.setAttribute('y2', '172'); }
        if (seatL) seatL.style.transform = 'translate(0px, 0px)';
        if (seatR) seatR.style.transform = 'translate(0px, 0px)';
        if (arrows) arrows.setAttribute('opacity', '0');
        updateMeter('carouselMeter', 0);
    } else {
        if (speedTxt) speedTxt.innerText = `Stufe ${speed}`;
        if (forceTxt) forceTxt.innerText = "Je schneller die Kreisbewegung ist, desto stärker wollen die Sitze nach außen.";
        const swing = (speed / 100) * 55;
        const lift = (speed / 100) * 18;
        if (chainL) { chainL.setAttribute('x2', 95 - swing); chainL.setAttribute('y2', 172 - lift); }
        if (chainR) { chainR.setAttribute('x2', 335 + swing); chainR.setAttribute('y2', 172 - lift); }
        if (seatL) seatL.style.transform = `translate(${-swing}px, ${-lift}px)`;
        if (seatR) seatR.style.transform = `translate(${swing}px, ${-lift}px)`;
        if (arrows) arrows.setAttribute('opacity', String(Math.max(0.2, speed / 100)));
        updateMeter('carouselMeter', speed);
    }
}

// 5. Drehimpuls
function startSkaterAnimation() {
    if (skaterAnimationStarted) return;
    skaterAnimationStarted = true;

    function frame() {
        const skater = document.getElementById('skater');
        if (skater) {
            skaterAngle = (skaterAngle + skaterSpeed) % 360;
            skater.setAttribute('transform', `rotate(${skaterAngle} 150 150)`);
        }
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function setSkater(state) {
    const armL = document.getElementById('armLeft');
    const armR = document.getElementById('armRight');
    const massL = document.getElementById('massLeft');
    const massR = document.getElementById('massRight');
    const txt = document.getElementById('skaterText');
    const bOut = document.getElementById('btnOut');
    const bIn = document.getElementById('btnIn');

    if (state === 'in') {
        if (armL) armL.setAttribute('x2', '128');
        if (armR) armR.setAttribute('x2', '172');
        if (massL) massL.setAttribute('cx', '128');
        if (massR) massR.setAttribute('cx', '172');
        skaterSpeed = 2.4;
        if (txt) {
            txt.innerText = "Arme angezogen: Die Masse ist nahe an der Drehachse. Die manuelle Rotation wird deutlich schneller.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('spinMeter', 95);
        if (bIn) bIn.disabled = true;
        if (bOut) bOut.disabled = false;
    } else {
        if (armL) armL.setAttribute('x2', '70');
        if (armR) armR.setAttribute('x2', '230');
        if (massL) massL.setAttribute('cx', '70');
        if (massR) massR.setAttribute('cx', '230');
        skaterSpeed = 0.45;
        if (txt) {
            txt.innerText = "Arme draußen: Die Masse ist weit von der Drehachse entfernt. Die Drehung wird langsam.";
            txt.style.color = "#0288D1";
        }
        updateMeter('spinMeter', 30);
        if (bOut) bOut.disabled = true;
        if (bIn) bIn.disabled = false;
    }
}
