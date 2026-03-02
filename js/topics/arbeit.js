// Logic for arbeit topic
let isSand = false;
let isCompressed = false;

function topicInit() {}

// 1. Kiste vs Mauer
function pushWall() {
    let person = document.getElementById('personGroup');
    let arm = document.getElementById('arm');
    let sweat = document.getElementById('sweat');
    let txt = document.getElementById('workText');
    if(!person || !arm || !sweat) return;
    
    person.style.transform = 'translateX(280px)';
    arm.setAttribute('x2', '50'); 
    arm.setAttribute('y2', '80'); 
    sweat.classList.add('anim-sweat');
    
    if(txt) {
        txt.innerText = "Du drückst mit viel Kraft, aber nichts bewegt sich (s = 0). Arbeit = 0 Joule!";
        txt.style.color = "#D32F2F";
    }
    
    setTimeout(() => {
        person.style.transform = 'translateX(40px)';
        arm.setAttribute('x2', '60');
        arm.setAttribute('y2', '100');
        sweat.classList.remove('anim-sweat');
    }, 3000);
}

function pushBox() {
    let person = document.getElementById('personGroup');
    let box = document.getElementById('boxGroup');
    let arm = document.getElementById('arm');
    let txt = document.getElementById('workText');
    if(!person || !box || !arm) return;
    
    person.style.transform = 'translateX(210px)';
    box.style.transform = 'translateX(260px)';
    arm.setAttribute('x2', '50'); 
    arm.setAttribute('y2', '80'); 
    
    if(txt) {
        txt.innerText = "Die Kiste bewegt sich! Kraft + Weg = Du hast physikalische Arbeit verrichtet!";
        txt.style.color = "#2E7D32";
    }
    
    setTimeout(() => {
        person.style.transform = 'translateX(40px)';
        box.style.transform = 'translateX(100px)';
        arm.setAttribute('x2', '60');
        arm.setAttribute('y2', '100');
    }, 3000);
}

// 2. Kran (Hubarbeit)
function liftBeam() {
    const rope = document.getElementById('craneRope');
    const load = document.getElementById('craneLoad');
    const txt = document.getElementById('craneText');
    if(!rope || !load) return;

    rope.setAttribute('y2', '120');
    load.style.transform = 'translateY(-100px)';
    if(txt) {
        txt.innerText = "Träger angehoben! Hubarbeit wurde verrichtet (W = m · g · h).";
        txt.style.color = "#E65100";
    }
}
function dropBeam() {
    const rope = document.getElementById('craneRope');
    const load = document.getElementById('craneLoad');
    const txt = document.getElementById('craneText');
    if(!rope || !load) return;

    rope.setAttribute('y2', '220');
    load.style.transform = 'translateY(0px)';
    if(txt) {
        txt.innerText = "Träger unten. Keine Arbeit im System gespeichert.";
        txt.style.color = "#455A64";
    }
}

// 3. Reibungsschlitten
function setIce() {
    isSand = false;
    const floor = document.getElementById('floor');
    const txt = document.getElementById('frictionText');
    if(floor) floor.setAttribute('fill', '#81D4FA');
    if(txt) {
        txt.innerText = "Boden: Eis. Wenig Reibung = Wenig Kraft = Wenig Arbeit.";
        txt.style.color = "#0288D1";
    }
}
function setSand() {
    isSand = true;
    const floor = document.getElementById('floor');
    const txt = document.getElementById('frictionText');
    if(floor) floor.setAttribute('fill', '#FFCC80');
    if(txt) {
        txt.innerText = "Boden: Sand. Hohe Reibung = Viel Kraft = Viel Reibungsarbeit!";
        txt.style.color = "#E65100";
    }
}
function pullSled() {
    let sled = document.getElementById('sledGroup');
    let rope = document.getElementById('pullRope');
    let sparks = document.getElementById('heatSparks');
    if(!sled || !rope) return;
    
    let duration = isSand ? "3s" : "1s";
    sled.style.transition = "transform " + duration + " linear";
    rope.style.transition = "transform " + duration + " linear";
    
    sled.style.transform = 'translateX(250px)';
    rope.style.transform = 'translateX(250px)';
    
    if(isSand && sparks) {
        sparks.style.opacity = '1';
        sparks.style.animation = "sweat 0.5s infinite";
    }
    
    setTimeout(() => {
        sled.style.transform = 'translateX(20px)';
        rope.style.transform = 'translateX(0px)';
        if(sparks) {
            sparks.style.opacity = '0';
            sparks.style.animation = "none";
        }
    }, isSand ? 3500 : 1500);
}

// 4. Schiefe Ebene
function rollSteep() {
    let ball = document.getElementById('ballGroup');
    let txt = document.getElementById('rampText');
    if(!ball) return;
    ball.style.transition = "none";
    ball.style.transform = 'translate(180px, 170px)';
    
    setTimeout(() => {
        ball.style.transition = "transform 1.5s ease-in-out";
        ball.style.transform = 'translate(280px, 70px)';
        if(txt) {
            txt.innerText = "Kurzer Weg, aber du brauchst viel Kraft!";
            txt.style.color = "#D32F2F";
        }
    }, 50);
}
function rollFlat() {
    let ball = document.getElementById('ballGroup');
    let txt = document.getElementById('rampText');
    if(!ball) return;
    ball.style.transition = "none";
    ball.style.transform = 'translate(20px, 170px)';
    
    setTimeout(() => {
        ball.style.transition = "transform 2.5s ease-in-out";
        ball.style.transform = 'translate(280px, 70px)';
        if(txt) {
            txt.innerText = "Langer Weg, aber viel weniger Kraft nötig. Arbeit bleibt gleich!";
            txt.style.color = "#388E3C";
        }
    }, 50);
}

// 5. Verformung (Feder)
function compressSpring() {
    let spring = document.getElementById('springGroup');
    let block = document.getElementById('springBlockGroup');
    let text = document.getElementById('springText');
    let btn = document.getElementById('springBtn');
    if(!spring || !block || !btn) return;

    isCompressed = !isCompressed;

    if (isCompressed) {
        spring.style.transform = 'scaleX(0.5)';
        block.style.transform = 'translateX(-80px)';
        if(text) {
            text.innerText = "Feder zusammengedrückt! Verformungsarbeit wurde verrichtet.";
            text.style.color = "#C62828";
        }
        btn.innerText = "Feder loslassen 🚀";
    } else {
        spring.style.transform = 'scaleX(1)';
        block.style.transform = 'translateX(0px)';
        if(text) {
            text.innerText = "Die Feder ist wieder entspannt.";
            text.style.color = "#388E3C";
        }
        btn.innerText = "Feder drücken 🗜️";
    }
}
