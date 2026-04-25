// Logic for drehundstatik topic
let skaterAnim;

function topicInit() {
    const skater = document.getElementById('skater');
    if (skater) {
        skaterAnim = skater.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 4000,
            iterations: Infinity
        });
    }

    testEquilibrium('stable');
    updateBalance();
    updateCarousel();
    updateMeter('spinMeter', 30);
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
        acrobat.style.transform = `translateX(${val * 0.18}px) rotate(12deg)`;
        if (txt) {
            txt.innerText = "Zu weit rechts: Der Schwerpunkt liegt nicht mehr über dem Seil. Der Artist kippt.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else if (val < -25) {
        acrobat.style.transform = `translateX(${val * 0.18}px) rotate(-12deg)`;
        if (txt) {
            txt.innerText = "Zu weit links: Der Schwerpunkt liegt außerhalb der Standfläche. Es wird instabil.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else {
        acrobat.style.transform = `translateX(${val * 0.08}px) rotate(${val * 0.08}deg)`;
        if (txt) {
            txt.innerText = "Sicher: Der Schwerpunkt bleibt über dem Seil. Das Gleichgewicht hält.";
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
    const hingeX = 85;
    const hingeY = 120;
    const length = 230;
    const thickness = 22;
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
    const arrowStart = [pushPoint[0] - nx * 42, pushPoint[1] - ny * 42];
    const arrowEnd = [pushPoint[0] - nx * 12, pushPoint[1] - ny * 12];

    document.getElementById('doorPanel')?.setAttribute('points', `${h1[0]},${h1[1]} ${f1[0]},${f1[1]} ${f2[0]},${f2[1]} ${h2[0]},${h2[1]}`);
    document.getElementById('doorHandle')?.setAttribute('cx', handle[0]);
    document.getElementById('doorHandle')?.setAttribute('cy', handle[1]);
    document.getElementById('doorPushPoint')?.setAttribute('cx', pushPoint[0]);
    document.getElementById('doorPushPoint')?.setAttribute('cy', pushPoint[1]);
    document.getElementById('doorPushPoint')?.setAttribute('opacity', '1');
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
    }
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

    marble.style.transition = 'none';

    if (type === 'stable') {
        if (pStable) pStable.style.display = 'block';
        marble.setAttribute('cx', '50');
        marble.setAttribute('cy', '40');
        if (txt) txt.innerText = "Stabil: Du stupst sie an, sie rollt zurück in die Mitte. So steht ein niedriger, breiter Gegenstand sicher.";

        setTimeout(() => {
            marble.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
            marble.setAttribute('cx', '150');
            marble.setAttribute('cy', '115');
        }, 50);
    } else if (type === 'unstable') {
        if (pUnstable) pUnstable.style.display = 'block';
        marble.setAttribute('cx', '150');
        marble.setAttribute('cy', '65');
        if (txt) txt.innerText = "Labil: Ein kleiner Stups reicht, und sie rollt weg. So kippt ein hoher, schmaler Gegenstand leicht.";

        setTimeout(() => {
            marble.style.transition = 'all 1s cubic-bezier(0.5, 0, 1, 1)';
            marble.setAttribute('cx', '250');
            marble.setAttribute('cy', '140');
        }, 400);
    } else {
        if (pIndiff) pIndiff.style.display = 'block';
        marble.setAttribute('cx', '100');
        marble.setAttribute('cy', '90');
        if (txt) txt.innerText = "Indifferent: Du stupst sie an, sie bleibt an der neuen Stelle. Es gibt keine bevorzugte Mitte.";

        setTimeout(() => {
            marble.style.transition = 'all 1s ease-out';
            marble.setAttribute('cx', '200');
        }, 50);
    }
}

// 4. Kreisbewegung
function updateCarousel() {
    const speed = parseInt(document.getElementById('speedRange')?.value || 0);
    const chainL = document.getElementById('chainL');
    const chainR = document.getElementById('chainR');
    const seatL = document.getElementById('seatL');
    const seatR = document.getElementById('seatR');
    const arrows = document.getElementById('outwardArrows');
    const arm1 = document.getElementById('cArm1');
    const arm2 = document.getElementById('cArm2');
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
        if (arm1) arm1.setAttribute('y2', '172');
        if (arm2) arm2.setAttribute('y2', '172');
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
        if (arm1) arm1.setAttribute('y2', 172 - lift);
        if (arm2) arm2.setAttribute('y2', 172 - lift);
        updateMeter('carouselMeter', speed);
    }
}

// 5. Drehimpuls
function setSkater(state) {
    const armL = document.getElementById('armLeft');
    const armR = document.getElementById('armRight');
    const txt = document.getElementById('skaterText');
    const bOut = document.getElementById('btnOut');
    const bIn = document.getElementById('btnIn');
    if (!skaterAnim) return;

    if (state === 'in') {
        if (armL) armL.setAttribute('x2', '85');
        if (armR) armR.setAttribute('x2', '115');
        skaterAnim.playbackRate = 8;
        if (txt) {
            txt.innerText = "Arme angezogen: Die Masse ist nah an der Drehachse. Die Drehung wird viel schneller.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('spinMeter', 95);
        if (bIn) bIn.disabled = true;
        if (bOut) bOut.disabled = false;
    } else {
        if (armL) armL.setAttribute('x2', '30');
        if (armR) armR.setAttribute('x2', '170');
        skaterAnim.playbackRate = 1;
        if (txt) {
            txt.innerText = "Arme draußen: Die Masse ist weit außen verteilt. Die Drehung wird langsamer.";
            txt.style.color = "#0288D1";
        }
        updateMeter('spinMeter', 30);
        if (bOut) bOut.disabled = true;
        if (bIn) bIn.disabled = false;
    }
}
