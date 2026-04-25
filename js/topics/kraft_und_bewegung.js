// Logic for kraft und bewegung topic
function topicInit() {
    updateLever();
}

// 1. Trägheit (Ball schubsen)
function kickBall() {
    let ball = document.getElementById('spaceBall');
    let txt = document.getElementById('kickText');
    if (!ball || !txt) return;
    
    ball.style.transition = 'transform 6s linear'; 
    ball.style.transform = 'translateX(800px)'; 
    
    txt.innerText = "Ohne bremsende Kraft fliegt der Ball weiter. Das ist Trägheit.";
}

function resetBall() {
    let ball = document.getElementById('spaceBall');
    let txt = document.getElementById('kickText');
    if (!ball || !txt) return;
    ball.style.transition = 'none'; 
    ball.style.transform = 'translateX(0px)';
    txt.innerText = "";
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
    
    setTimeout(() => {
        ice.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        sand.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)'; 
        
        ice.style.transform = 'translateX(400px)'; 
        sand.style.transform = 'translateX(60px)';  
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
        } else {
            feather.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.6, 1)'; 
            feather.style.transform = 'translateY(225px)';
            txt.innerText = "Mit Luft: Der Apfel ist schwer und kompakt. Die Luft bremst die breite Feder stark ab.";
            txt.style.color = "#1976D2";
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
    
    setTimeout(() => {
        rocket.style.transform = 'translateY(-100px)';
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
    if (!fulcrum || !seesaw) return;
    
    let pixelX = 40 + ((val - 10) / 80) * 220;
    fulcrum.style.transform = `translateX(${pixelX - 150}px)`; 
    seesaw.style.transformOrigin = `${pixelX}px 70px`;
    
    if (val < 40) {
        seesaw.style.transform = 'rotate(15deg)';
        if (txt) {
            txt.innerText = "Super! Der Hebelarm auf der roten Seite ist so lang, dass das kleine Gewicht den Elefanten hochhebt!";
            txt.style.color = "#4CAF50";
        }
        if (txtPos) txtPos.innerText = "Nah an der Last (Perfekt!)";
    } else if (val > 60) {
        seesaw.style.transform = 'rotate(-25deg)';
        if (txt) {
            txt.innerText = "Oh nein! Der Hebelarm beim Elefanten ist viel zu lang. Er knallt auf den Boden.";
            txt.style.color = "#F44336";
        }
        if (txtPos) txtPos.innerText = "Nah an der Kraft (Schlecht!)";
    } else {
        seesaw.style.transform = 'rotate(-15deg)';
        if (txt) {
            txt.innerText = "Beide Arme sind ähnlich lang. Der Elefant ist zu schwer, die Wippe kippt nach links!";
            txt.style.color = "#E91E63";
        }
        if (txtPos) txtPos.innerText = "Mitte";
    }
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
