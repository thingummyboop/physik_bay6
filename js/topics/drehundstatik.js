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
    const acrobat = document.getElementById('acrobat');
    const marker = document.getElementById('cgMarker');
    const txt = document.getElementById('balanceText');
    if (!acrobat || !marker) return;

    marker.style.transform = `translateX(${val}px)`;

    if (val > 25) {
        acrobat.style.transform = 'rotate(70deg)';
        if (txt) {
            txt.innerText = "Zu weit rechts: Der Schwerpunkt liegt nicht mehr über dem Seil. Der Artist kippt.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else if (val < -25) {
        acrobat.style.transform = 'rotate(-70deg)';
        if (txt) {
            txt.innerText = "Zu weit links: Der Schwerpunkt liegt außerhalb der Standfläche. Es wird instabil.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('balanceMeter', 20);
    } else {
        acrobat.style.transform = `rotate(${val * 0.5}deg)`;
        if (txt) {
            txt.innerText = "Sicher: Der Schwerpunkt bleibt über dem Seil. Das Gleichgewicht hält.";
            txt.style.color = "#00796B";
        }
        updateMeter('balanceMeter', 90);
    }
}

// 2. Drehmoment
function pushDoor(pos) {
    const door = document.getElementById('door');
    const arrow = document.getElementById('forceArrow');
    const arrowLine = document.getElementById('arrowLine');
    const arrowHead = document.getElementById('arrowHead');
    const txt = document.getElementById('doorText');
    if (!door || !arrow) return;

    arrow.style.display = 'block';

    if (pos === 'hinge') {
        arrow.style.transform = 'translateX(65px)';
        if (arrowLine) arrowLine.setAttribute('stroke', '#F44336');
        if (arrowHead) arrowHead.setAttribute('fill', '#F44336');
        door.style.transform = 'rotate(-5deg)';
        if (txt) {
            txt.innerText = "Nah am Scharnier: kleiner Hebelarm, kleines Drehmoment. Die Tür bewegt sich kaum.";
            txt.style.color = "#D32F2F";
        }
        updateMeter('torqueMeter', 15);
    } else if (pos === 'middle') {
        arrow.style.transform = 'translateX(180px)';
        if (arrowLine) arrowLine.setAttribute('stroke', '#FF9800');
        if (arrowHead) arrowHead.setAttribute('fill', '#FF9800');
        door.style.transform = 'rotate(-45deg)';
        if (txt) {
            txt.innerText = "In der Mitte: mittlerer Hebelarm. Es geht, aber du brauchst noch viel Kraft.";
            txt.style.color = "#F57C00";
        }
        updateMeter('torqueMeter', 55);
    } else {
        arrow.style.transform = 'translateX(280px)';
        if (arrowLine) arrowLine.setAttribute('stroke', '#4CAF50');
        if (arrowHead) arrowHead.setAttribute('fill', '#4CAF50');
        door.style.transform = 'rotate(-85deg)';
        if (txt) {
            txt.innerText = "An der Klinke: langer Hebelarm, großes Drehmoment. Die Tür öffnet sich leicht.";
            txt.style.color = "#388E3C";
        }
        updateMeter('torqueMeter', 95);
    }

    arrow.animate([
        { transform: arrow.style.transform + ' translateY(0px)' },
        { transform: arrow.style.transform + ' translateY(-15px)' }
    ], { duration: 300, iterations: 2, direction: 'alternate' });

    setTimeout(() => {
        door.style.transform = 'rotate(0deg)';
        arrow.style.display = 'none';
    }, 3000);
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
    const carousel = document.getElementById('carousel');
    const rider1 = document.getElementById('rider');
    const arm1 = document.getElementById('cArm1');
    const rider2 = document.getElementById('rider2');
    const arm2 = document.getElementById('cArm2');
    const speedTxt = document.getElementById('speedValue');
    const forceTxt = document.getElementById('carouselText');
    if (!carousel) return;

    if (speed === 0) {
        carousel.style.animation = 'none';
        if (speedTxt) speedTxt.innerText = "Steht still";
        if (forceTxt) forceTxt.innerText = "Ohne Drehung hängen die Sitze nach unten.";
        if (rider1) rider1.setAttribute('cy', '40');
        if (arm1) arm1.setAttribute('y2', '40');
        if (rider2) rider2.setAttribute('cy', '160');
        if (arm2) arm2.setAttribute('y2', '160');
        updateMeter('carouselMeter', 0);
    } else {
        const duration = 3 - (speed / 100) * 2.8;
        carousel.style.animation = `spinFast ${duration}s linear infinite`;
        if (!document.getElementById('dynStyle')) {
            const s = document.createElement('style');
            s.id = 'dynStyle';
            s.innerHTML = `@keyframes spinFast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
            document.head.appendChild(s);
        }

        if (speedTxt) speedTxt.innerText = `Stufe ${speed} (Rotationsdauer: ${duration.toFixed(1)}s)`;
        if (forceTxt) forceTxt.innerText = "Je schneller die Kreisbewegung ist, desto stärker wollen die Sitze nach außen.";
        const stretch = (speed / 100) * 45;
        if (rider1) rider1.setAttribute('cy', 40 - stretch);
        if (arm1) arm1.setAttribute('y2', 40 - stretch);
        if (rider2) rider2.setAttribute('cy', 160 + stretch);
        if (arm2) arm2.setAttribute('y2', 160 + stretch);
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
