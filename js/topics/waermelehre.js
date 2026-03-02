// Logic for waermelehre topic
let particlesData = [];
let animationId;
let balloonY = 120;
let burnerInterval;
let coolingInterval;
let sunTimer;

function topicInit() {
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
    
    document.getElementById('sunRayBlack').style.display = 'block';
    document.getElementById('sunRayWhite').style.display = 'block';
    document.getElementById('bounceRay').style.display = 'block';
    
    let tempB = 20;
    let tempW = 20;
    let tBlack = document.getElementById('tempBlack');
    let tWhite = document.getElementById('tempWhite');
    let txt = document.getElementById('sunText');
    
    if (txt) txt.innerText = "Die Strahlung trifft auf! Schwarz absorbiert, Weiß reflektiert.";

    if (sunTimer) clearInterval(sunTimer);
    sunTimer = setInterval(() => {
        tempB += 2;
        tempW += 0.5;
        if (tBlack) tBlack.innerText = Math.floor(tempB) + "°C";
        if (tWhite) tWhite.innerText = Math.floor(tempW) + "°C";
        
        if(tempB >= 60) {
            clearInterval(sunTimer);
            if (txt) txt.innerText = "Puh! 60°C im schwarzen Auto. Im weißen ist es viel angenehmer!";
            setTimeout(() => {
                document.getElementById('sunRayBlack').style.display = 'none';
                document.getElementById('sunRayWhite').style.display = 'none';
                document.getElementById('bounceRay').style.display = 'none';
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
    const flame = document.getElementById('burnerFlame');
    if (flame) flame.style.display = 'none';
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
        txt.innerText = "Fest (Eis): Die Teilchen sitzen starr als Gitter zusammen.";
        txt.style.color = "#1976D2";
    } else if(phase === 'water') {
        if (water) water.style.display = 'block';
        txt.innerText = "Flüssig (Wasser): Die Teilchen sind gelöst und schwimmen wild durcheinander.";
        txt.style.color = "#0288D1";
    } else {
        if (steam) steam.style.display = 'block';
        txt.innerText = "Gasförmig (Dampf): Die Teilchen haben viel Energie und fliegen komplett auseinander!";
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
}

if (document.readyState === 'complete') {
    topicInit();
}
