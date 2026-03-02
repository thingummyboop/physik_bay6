// Logic for drehundstatik topic
let skaterAnim;

function topicInit() {
    // Skater-Animation mit der Web Animations API einrichten
    let skater = document.getElementById('skater');
    if (skater) {
        skaterAnim = skater.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 4000, // Basis-Geschwindigkeit (langsam)
            iterations: Infinity
        });
    }
    
    // Murmel an die richtige Position setzen
    testEquilibrium('stable');
}

// 1. Schwerpunkt (Seiltänzer)
function updateBalance() {
    let val = parseInt(document.getElementById('cgRange')?.value || 0);
    let acrobat = document.getElementById('acrobat');
    let marker = document.getElementById('cgMarker');
    let txt = document.getElementById('balanceText');
    if (!acrobat || !marker) return;
    
    marker.style.transform = `translateX(${val}px)`;
    
    if (val > 25) {
        acrobat.style.transform = 'rotate(70deg)';
        if(txt) {
            txt.innerText = "Oh nein! Zu weit rechts! Der Artist fällt!";
            txt.style.color = "#D32F2F";
        }
    } else if (val < -25) {
        acrobat.style.transform = 'rotate(-70deg)';
        if(txt) {
            txt.innerText = "Achtung! Zu weit links! Absturz!";
            txt.style.color = "#D32F2F";
        }
    } else {
        let tilt = val * 0.5;
        acrobat.style.transform = `rotate(${tilt}deg)`;
        if(txt) {
            txt.innerText = "Sicher ausbalanciert! Der Schwerpunkt ist über dem Seil.";
            txt.style.color = "#00796B";
        }
    }
}

// 2. Drehmoment (Tür)
function pushDoor(pos) {
    let door = document.getElementById('door');
    let arrow = document.getElementById('forceArrow');
    let arrowLine = document.getElementById('arrowLine');
    let arrowHead = document.getElementById('arrowHead');
    let txt = document.getElementById('doorText');
    if (!door || !arrow) return;
    
    arrow.style.display = 'block';
    
    if(pos === 'hinge') {
        arrow.style.transform = 'translateX(65px)';
        if(arrowLine) arrowLine.setAttribute('stroke', '#F44336');
        if(arrowHead) arrowHead.setAttribute('fill', '#F44336');
        door.style.transform = 'rotate(-5deg)';
        if(txt) {
            txt.innerText = "Puh! Extrem anstrengend. Der Hebelarm ist winzig, das Drehmoment reicht kaum aus!";
            txt.style.color = "#D32F2F";
        }
    } else if(pos === 'middle') {
        arrow.style.transform = 'translateX(180px)';
        if(arrowLine) arrowLine.setAttribute('stroke', '#FF9800');
        if(arrowHead) arrowHead.setAttribute('fill', '#FF9800');
        door.style.transform = 'rotate(-45deg)'; 
        if(txt) {
            txt.innerText = "Es geht schon besser, aber du brauchst immer noch ziemlich viel Muskelkraft.";
            txt.style.color = "#F57C00";
        }
    } else {
        arrow.style.transform = 'translateX(280px)';
        if(arrowLine) arrowLine.setAttribute('stroke', '#4CAF50');
        if(arrowHead) arrowHead.setAttribute('fill', '#4CAF50');
        door.style.transform = 'rotate(-85deg)';
        if(txt) {
            txt.innerText = "Perfekt! Du drückst ganz außen. Der lange Hebelarm erzeugt ein riesiges Drehmoment!";
            txt.style.color = "#388E3C";
        }
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
    let pStable = document.getElementById('pathStable');
    let pUnstable = document.getElementById('pathUnstable');
    let pIndiff = document.getElementById('pathIndiff');
    let marble = document.getElementById('marble');
    let txt = document.getElementById('eqText');
    if (!marble) return;
    
    if(pStable) pStable.style.display = 'none';
    if(pUnstable) pUnstable.style.display = 'none';
    if(pIndiff) pIndiff.style.display = 'none';
    
    marble.style.transition = 'none'; 
    
    if (type === 'stable') {
        if(pStable) pStable.style.display = 'block';
        marble.setAttribute('cx', '50');
        marble.setAttribute('cy', '40');
        if(txt) txt.innerText = "Stabil: Du stupst sie an, sie rollt in die Mitte zurück und bleibt sicher liegen.";
        
        setTimeout(() => {
            marble.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
            marble.setAttribute('cx', '150'); 
            marble.setAttribute('cy', '115'); 
        }, 50);

    } else if (type === 'unstable') {
        if(pUnstable) pUnstable.style.display = 'block';
        marble.setAttribute('cx', '150'); 
        marble.setAttribute('cy', '65');
        if(txt) txt.innerText = "Labil: Ein kleiner Windhauch, und sie stürzt ab – und kommt nie wieder hoch!";
        
        setTimeout(() => {
            marble.style.transition = 'all 1s cubic-bezier(0.5, 0, 1, 1)';
            marble.setAttribute('cx', '250'); 
            marble.setAttribute('cy', '140'); 
        }, 400); 

    } else {
        if(pIndiff) pIndiff.style.display = 'block';
        marble.setAttribute('cx', '100'); 
        marble.setAttribute('cy', '90');
        if(txt) txt.innerText = "Indifferent: Du stupst sie an, sie rollt ein Stückchen und bleibt genau dort liegen.";
        
        setTimeout(() => {
            marble.style.transition = 'all 1s ease-out';
            marble.setAttribute('cx', '200'); 
        }, 50);
    }
}

// 4. Fliehkraft Karussell
function updateCarousel() {
    let speed = parseInt(document.getElementById('speedRange')?.value || 0);
    let carousel = document.getElementById('carousel');
    let rider1 = document.getElementById('rider');
    let arm1 = document.getElementById('cArm1');
    let rider2 = document.getElementById('rider2');
    let arm2 = document.getElementById('cArm2');
    let speedTxt = document.getElementById('speedValue');
    if (!carousel) return;
    
    if(speed === 0) {
        carousel.style.animation = 'none';
        if(speedTxt) speedTxt.innerText = "Steht still";
        if(rider1) rider1.setAttribute('cy', '40');
        if(arm1) arm1.setAttribute('y2', '40');
        if(rider2) rider2.setAttribute('cy', '160');
        if(arm2) arm2.setAttribute('y2', '160');
    } else {
        let duration = 3 - (speed / 100) * 2.8; 
        carousel.style.animation = `spinFast ${duration}s linear infinite`;
        if(!document.getElementById('dynStyle')) {
            let s = document.createElement('style');
            s.id = 'dynStyle';
            s.innerHTML = `@keyframes spinFast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
            document.head.appendChild(s);
        }
        
        if(speedTxt) speedTxt.innerText = `Stufe ${speed} (Rotationsdauer: ${duration.toFixed(1)}s)`;
        let stretch = (speed / 100) * 45; 
        if(rider1) rider1.setAttribute('cy', 40 - stretch);
        if(arm1) arm1.setAttribute('y2', 40 - stretch);
        if(rider2) rider2.setAttribute('cy', 160 + stretch);
        if(arm2) arm2.setAttribute('y2', 160 + stretch);
    }
}

// 5. Drehimpuls
function setSkater(state) {
    let armL = document.getElementById('armLeft');
    let armR = document.getElementById('armRight');
    let txt = document.getElementById('skaterText');
    let bOut = document.getElementById('btnOut');
    let bIn = document.getElementById('btnIn');
    if (!skaterAnim) return;
    
    if (state === 'in') {
        if(armL) armL.setAttribute('x2', '85');
        if(armR) armR.setAttribute('x2', '115');
        skaterAnim.playbackRate = 8; 
        if(txt) {
            txt.innerText = "Arme angezogen: Die Masse ist nah der Drehachse. Das Drehen wird EXTREM SCHNELL!";
            txt.style.color = "#D32F2F";
        }
        if(bIn) bIn.disabled = true;
        if(bOut) bOut.disabled = false;
    } else {
        if(armL) armL.setAttribute('x2', '30');
        if(armR) armR.setAttribute('x2', '170');
        skaterAnim.playbackRate = 1;
        if(txt) {
            txt.innerText = "Arme draußen: Die Masse ist weit außen verteilt. Das Drehen wird stark gebremst.";
            txt.style.color = "#0288D1";
        }
        if(bOut) bOut.disabled = true;
        if(bIn) bIn.disabled = false;
    }
}
