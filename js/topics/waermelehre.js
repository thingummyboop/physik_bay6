// Logic for waermelehre topic
let particlesData = [];
let animationId;
let balloonY = 120;
let burnerInterval;
let coolingInterval;
let sunTimer;
let particleHintState = '';

function topicInit() {
    enhanceAccessibility();

    // 1. Teilchenmodell
    const particleSvg = document.getElementById('particleSvg');
    if (particleSvg) {
        particleSvg.innerHTML = '';
        particlesData = [];
        for(let i=0; i<60; i++) {
            let p = {
                x: 20 + Math.random() * 260,
                y: 20 + Math.random() * 160,
                el: document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            };
            p.el.setAttribute('cx', p.x);
            p.el.setAttribute('cy', p.y);
            p.el.setAttribute('r', '5');
            p.el.setAttribute('fill', '#1976D2');
            particleSvg.appendChild(p.el);
            particlesData.push(p);
        }
        if (animationId) cancelAnimationFrame(animationId);
        animateParticles();
    }
    
    // Initial calls
    particleHintState = '';
    updateThermometer();
    setPhase('ice');
}

function enhanceAccessibility() {
    const tempRange = document.getElementById('tempRange');
    if (tempRange) {
        tempRange.setAttribute('aria-describedby', 'tempValue particleHint');
    }

    const thermoRange = document.getElementById('thermoRange');
    if (thermoRange) {
        thermoRange.setAttribute('aria-describedby', 'thermoText');
    }

    const particleHint = document.getElementById('particleHint');
    if (particleHint) {
        particleHint.setAttribute('role', 'note');
    }

    const soupText = document.getElementById('soupText');
    if (soupText) {
        soupText.setAttribute('role', 'status');
        soupText.setAttribute('aria-live', 'polite');
        soupText.setAttribute('aria-atomic', 'true');
    }

    const sunText = document.getElementById('sunText');
    if (sunText) {
        sunText.setAttribute('role', 'status');
        sunText.setAttribute('aria-live', 'polite');
        sunText.setAttribute('aria-atomic', 'true');
    }

    const thermoText = document.getElementById('thermoText');
    if (thermoText) {
        thermoText.setAttribute('role', 'status');
        thermoText.setAttribute('aria-live', 'polite');
        thermoText.setAttribute('aria-atomic', 'true');
    }

    const soupBtn = document.getElementById('soupBtn');
    if (soupBtn) {
        soupBtn.setAttribute('aria-describedby', 'soupText');
    }

    const sunBtn = document.getElementById('sunBtn');
    if (sunBtn) {
        sunBtn.setAttribute('aria-describedby', 'sunText');
    }

    const balloonButton = document.querySelector('#balloonZone button');
    if (balloonButton && !balloonButton.dataset.a11yBound) {
        balloonButton.dataset.a11yBound = 'true';

        balloonButton.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                startBurner();
            }
        });

        balloonButton.addEventListener('keyup', (event) => {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                stopBurner();
            }
        });

        balloonButton.addEventListener('blur', stopBurner);
    }
}

// 1. Teilchenmodell Animation
function animateParticles() {
    const tempRange = document.getElementById('tempRange');
    if (!tempRange) return;

    let temp = parseFloat(tempRange.value);
    let speed = temp * 0.1;
    let color = temp < 40 ? '#1976D2' : (temp < 70 ? '#FF9800' : '#E53935');
    
    let bgBox = document.getElementById('particleBox');
    if (bgBox) bgBox.style.background = temp < 40 ? '#e3f2fd' : (temp < 70 ? '#fff3e0' : '#ffebee');
    
    let tempLabel = temp < 40 ? "Kalt" : (temp < 70 ? "Warm" : "Heiß!");
    let txt = document.getElementById('tempValue');
    if (txt) {
        txt.innerText = `${temp}°C (${tempLabel})`;
        txt.style.color = color;
    }
    const hint = document.getElementById('particleHint');
    const nextHintState = temp < 40 ? 'cold' : (temp < 70 ? 'warm' : 'hot');
    if (hint && particleHintState !== nextHintState) {
        particleHintState = nextHintState;
        hint.innerText = nextHintState === 'cold'
            ? "Kalt: Die Teilchen bewegen sich wenig. Der Stoff braucht weniger Platz."
            : nextHintState === 'warm'
                ? "Warm: Die Teilchen bewegen sich stärker und stoßen öfter zusammen."
                : "Heiß: Die Teilchen bewegen sich schnell. Viele Stoffe dehnen sich aus.";
    }

    particlesData.forEach(p => {
        let jitterX = (Math.random() - 0.5) * speed;
        let jitterY = (Math.random() - 0.5) * speed;
        
        let newX = p.x + jitterX;
        let newY = p.y + jitterY;
        if(newX > 10 && newX < 290) p.x = newX;
        if(newY > 10 && newY < 190) p.y = newY;

        p.el.setAttribute('cx', p.x);
        p.el.setAttribute('cy', p.y);
        p.el.setAttribute('fill', color);
    });

    animationId = requestAnimationFrame(animateParticles);
}

// 2. Wärmeleitung
function heatSoup() {
    let btn = document.getElementById('soupBtn');
    let mSpoon = document.getElementById('metalSpoon');
    let mSpoonBowl = document.getElementById('metalSpoonBowl');
    let soup = document.getElementById('soupLiquid');
    let txt = document.getElementById('soupText');
    if (!btn || !mSpoon || !soup || !txt) return;

    btn.disabled = true;
    soup.setAttribute('fill', '#FF5722');
    txt.innerText = "Suppe kocht! Die Wärme wandert den Metalllöffel hinauf...";
    txt.style.color = "#FF5722";

    setTimeout(() => {
        if (mSpoonBowl) mSpoonBowl.setAttribute('fill', '#ef5350');
        mSpoon.setAttribute('fill', '#ef5350');
        txt.innerText = "Aua! Der Metalllöffel ist oben heiß! Das Holz bleibt kalt.";
        
        setTimeout(() => {
            mSpoon.setAttribute('fill', '#cfd8dc');
            if (mSpoonBowl) mSpoonBowl.setAttribute('fill', '#cfd8dc');
            soup.setAttribute('fill', '#ffb74d');
            txt.innerText = "Alles wieder abgekühlt.";
            txt.style.color = "#718096";
            btn.disabled = false;
        }, 4000);
    }, 500);
}

// 3. Wärmestrahlung
function sunShine() {
    let btn = document.getElementById('sunBtn');
    if (!btn) return;
    btn.disabled = true;
    
    const rB = document.getElementById('sunRayBlack');
    const rW = document.getElementById('sunRayWhite');
    const bR = document.getElementById('bounceRay');
    if(rB) rB.style.display = 'block';
    if(rW) rW.style.display = 'block';
    if(bR) bR.style.display = 'block';
    
    let tempB = 20;
    let tempW = 20;
    let tBlack = document.getElementById('tempBlack');
    let tWhite = document.getElementById('tempWhite');
    let txt = document.getElementById('sunText');
    
    if (txt) txt.innerText = "Die Strahlung trifft auf: Schwarz nimmt viel Energie auf, Weiß wirft viel zurück.";

    if (sunTimer) clearInterval(sunTimer);
    sunTimer = setInterval(() => {
        tempB += 2;
        tempW += 0.5;
        if (tBlack) tBlack.innerText = Math.floor(tempB) + "°C";
        if (tWhite) tWhite.innerText = Math.floor(tempW) + "°C";
        
        if(tempB >= 60) {
            clearInterval(sunTimer);
            if (txt) txt.innerText = "Ergebnis: Das schwarze Auto wird viel heißer. Helle Farbe reflektiert mehr Sonnenstrahlung.";
            setTimeout(() => {
                if(rB) rB.style.display = 'none';
                if(rW) rW.style.display = 'none';
                if(bR) bR.style.display = 'none';
                if (tBlack) tBlack.innerText = "20°C";
                if (tWhite) tWhite.innerText = "20°C";
                if (txt) txt.innerText = "";
                btn.disabled = false;
            }, 4000);
        }
    }, 100);
}

// 4. Konvektion
function startBurner() {
    clearInterval(coolingInterval);
    clearInterval(burnerInterval);
    const flame = document.getElementById('burnerFlame');
    if (flame) flame.style.display = 'block';
    burnerInterval = setInterval(() => {
        balloonY -= 2;
        if(balloonY < -20) balloonY = -20;
        const balloon = document.getElementById('hotAirBalloon');
        if (balloon) balloon.style.transform = `translateY(${balloonY}px)`;
    }, 20);
}

function stopBurner() {
    clearInterval(burnerInterval);
    clearInterval(coolingInterval);
    const flame = document.getElementById('burnerFlame');
    if (flame) flame.style.display = 'none';
    if (balloonY >= 120) return;

    coolingInterval = setInterval(() => {
        balloonY += 1;
        if(balloonY > 120) balloonY = 120;
        const balloon = document.getElementById('hotAirBalloon');
        if (balloon) balloon.style.transform = `translateY(${balloonY}px)`;
        if(balloonY >= 120) clearInterval(coolingInterval);
    }, 30);
}

// 5. Aggregatzustände
function setPhase(phase) {
    const ice = document.getElementById('phaseIce');
    const water = document.getElementById('phaseWater');
    const steam = document.getElementById('phaseSteam');
    if (ice) ice.style.display = 'none';
    if (water) water.style.display = 'none';
    if (steam) steam.style.display = 'none';
    
    let txt = document.getElementById('phaseText');
    if (!txt) return;

    if(phase === 'ice') {
        if (ice) ice.style.display = 'block';
        txt.innerText = "Fest (Eis): Die Teilchen sitzen dicht zusammen und bleiben fast an ihrem Platz.";
        txt.style.color = "#1976D2";
    } else if(phase === 'water') {
        if (water) water.style.display = 'block';
        txt.innerText = "Flüssig (Wasser): Die Teilchen bleiben nahe beisammen, können aber aneinander vorbeirutschen.";
        txt.style.color = "#0288D1";
    } else {
        if (steam) steam.style.display = 'block';
        txt.innerText = "Gasförmig (Dampf): Die Teilchen sind weit auseinander und bewegen sich schnell durch den Raum.";
        txt.style.color = "#78909C";
    }
}

// 6. Ausdehnung
function updateThermometer() {
    let val = document.getElementById('thermoRange')?.value || 0;
    let liquid = document.getElementById('thermoLiquid');
    if (!liquid) return;
    
    let newHeight = val * 1; 
    let newY = 200 - newHeight;
    liquid.setAttribute('height', newHeight);
    liquid.setAttribute('y', newY);
    const text = document.getElementById('thermoText');
    if (text) {
        text.innerText = val < 35
            ? "Niedrige Temperatur: Die Flüssigkeit braucht wenig Platz."
            : val < 70
                ? "Wärmer: Die Flüssigkeit dehnt sich aus und steigt im Röhrchen."
                : "Heiß: Starke Ausdehnung. Darum muss auch bei Brücken Platz für Bewegung bleiben.";
    }
}
