// Logic for waermelehre topic
let particlesData = [];
let animationId;
let balloonY = 120;
let burnerInterval;
let coolingInterval;
let sunTimer;
let particleHintState = '';
let soupHeatTimers = [];
let soupConductionFrame;
let soupConductionStart = 0;

function getParticleBounds(temp) {
    const expansion = Math.max(0, Math.min(1, temp / 100));
    const width = 220 + expansion * 70;
    const height = 130 + expansion * 55;
    return {
        xMin: (300 - width) / 2,
        xMax: (300 + width) / 2,
        yMin: (200 - height) / 2,
        yMax: (200 + height) / 2,
        width,
        height
    };
}

function topicInit() {
    enhanceAccessibility();

    // 1. Teilchenmodell
    const particleSvg = document.getElementById('particleSvg');
    if (particleSvg) {
        particleSvg.innerHTML = '';
        particleSvg.setAttribute('viewBox', '0 0 300 200');
        particleSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        const expansionBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        expansionBox.setAttribute('id', 'particleExpansionBox');
        expansionBox.setAttribute('rx', '12');
        expansionBox.setAttribute('fill', 'rgba(239, 68, 68, 0.08)');
        expansionBox.setAttribute('stroke', '#ef4444');
        expansionBox.setAttribute('stroke-width', '3');
        expansionBox.setAttribute('stroke-dasharray', '8 6');
        particleSvg.appendChild(expansionBox);

        const initialBounds = getParticleBounds(Number(document.getElementById('tempRange')?.value || 10));
        particlesData = [];
        for(let i=0; i<60; i++) {
            let p = {
                x: initialBounds.xMin + 12 + Math.random() * (initialBounds.width - 24),
                y: initialBounds.yMin + 12 + Math.random() * (initialBounds.height - 24),
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
    resetSoupConductionModel();
    setPhase('ice');
}

function enhanceAccessibility() {
    const tempRange = document.getElementById('tempRange');
    if (tempRange) {
        tempRange.setAttribute('aria-describedby', 'tempValue particleHint');
        tempRange.setAttribute('aria-valuetext', `${Number(tempRange.value || 20)} Grad Celsius`);
    }

    const thermoRange = document.getElementById('thermoRange');
    if (thermoRange) {
        thermoRange.setAttribute('aria-describedby', 'thermoText');
        thermoRange.setAttribute('aria-valuetext', `${Number(thermoRange.value || 0)} Grad Temperaturanzeige`);
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
    tempRange.setAttribute('aria-valuetext', `${Math.round(temp)} Grad Celsius`);
    let speed = temp * 0.1;
    let color = temp < 40 ? '#1976D2' : (temp < 70 ? '#FF9800' : '#E53935');
    
    let bgBox = document.getElementById('particleBox');
    const bounds = getParticleBounds(temp);
    if (bgBox) {
        bgBox.style.background = temp < 40 ? '#e3f2fd' : (temp < 70 ? '#fff3e0' : '#ffebee');
        bgBox.style.transition = 'background 0.25s ease';
    }
    const expansionBox = document.getElementById('particleExpansionBox');
    if (expansionBox) {
        expansionBox.setAttribute('x', bounds.xMin.toFixed(1));
        expansionBox.setAttribute('y', bounds.yMin.toFixed(1));
        expansionBox.setAttribute('width', bounds.width.toFixed(1));
        expansionBox.setAttribute('height', bounds.height.toFixed(1));
        expansionBox.setAttribute('stroke', color);
        expansionBox.setAttribute('fill', temp < 40 ? 'rgba(25, 118, 210, 0.07)' : (temp < 70 ? 'rgba(255, 152, 0, 0.08)' : 'rgba(229, 57, 53, 0.10)'));
    }
    
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
        const particleMargin = 10;
        p.x = Math.min(bounds.xMax - particleMargin, Math.max(bounds.xMin + particleMargin, newX));
        p.y = Math.min(bounds.yMax - particleMargin, Math.max(bounds.yMin + particleMargin, newY));

        p.el.setAttribute('cx', p.x);
        p.el.setAttribute('cy', p.y);
        p.el.setAttribute('fill', color);
    });

    animationId = requestAnimationFrame(animateParticles);
}

// 2. Wärmeleitung
function clearSoupHeatTimers() {
    soupHeatTimers.forEach((timer) => clearTimeout(timer));
    soupHeatTimers = [];
}

function getSoupConductionAtoms() {
    return Array.from(document.querySelectorAll('.conduction-atom'));
}

function getSoupWoodNodes() {
    return Array.from(document.querySelectorAll('.wood-fiber-node'));
}

function resetSoupConductionModel() {
    clearSoupHeatTimers();
    stopSoupConductionVibration(true);

    const diagram = document.getElementById('soupDiagram');
    if (diagram) diagram.classList.remove('is-heating', 'is-hot');

    document.querySelectorAll('.conduction-spring').forEach((spring) => {
        spring.setAttribute('stroke', '#94a3b8');
        spring.setAttribute('stroke-width', '3');
    });

    getSoupConductionAtoms().forEach((atom) => {
        atom.setAttribute('fill', '#cbd5e1');
        atom.setAttribute('stroke', '#64748b');
        atom.setAttribute('cx', atom.dataset.baseCx || atom.getAttribute('cx'));
        atom.setAttribute('cy', atom.dataset.baseCy || atom.getAttribute('cy'));
    });

    document.querySelectorAll('.conduction-energy').forEach((energy) => {
        energy.setAttribute('opacity', '0');
    });

    getSoupWoodNodes().forEach((node) => {
        node.setAttribute('fill', node.dataset.baseFill || '#a16207');
        node.setAttribute('stroke', '#78350f');
        node.setAttribute('cx', node.dataset.baseCx || node.getAttribute('cx'));
        node.setAttribute('cy', node.dataset.baseCy || node.getAttribute('cy'));
    });

    document.querySelectorAll('.wood-damping-wave').forEach((wave) => {
        wave.setAttribute('opacity', '0');
        wave.setAttribute('stroke-width', '3');
    });
}

function setSoupConductionProgress(progress) {
    const atoms = getSoupConductionAtoms();
    atoms.forEach((atom) => {
        const row = Number(atom.dataset.row || 0);
        const heatAtRow = Math.max(0, Math.min(1, progress * 1.25 - row * 0.28));
        const color = heatAtRow > 0.72 ? '#ef4444' : heatAtRow > 0.35 ? '#f97316' : heatAtRow > 0.08 ? '#facc15' : '#cbd5e1';
        atom.setAttribute('fill', color);
        atom.setAttribute('stroke', heatAtRow > 0.2 ? '#b91c1c' : '#64748b');
    });

    document.querySelectorAll('.conduction-spring').forEach((spring) => {
        const row = Number(spring.dataset.row || 0);
        const heatAtRow = Math.max(0, Math.min(1, progress * 1.2 - row * 0.28));
        spring.setAttribute('stroke', heatAtRow > 0.45 ? '#f97316' : heatAtRow > 0.15 ? '#facc15' : '#94a3b8');
        spring.setAttribute('stroke-width', heatAtRow > 0.45 ? '4' : '3');
    });

    document.querySelectorAll('.conduction-energy').forEach((energy) => {
        const index = Number(energy.dataset.step || 0);
        const visible = progress > 0.18 + index * 0.18;
        energy.setAttribute('opacity', visible ? '1' : '0');
    });

    getSoupWoodNodes().forEach((node) => {
        const index = Number(node.dataset.index || 0);
        const heatAtNode = Math.max(0, Math.min(1, progress * 0.9 - index * 0.18));
        const color = heatAtNode > 0.55 ? '#d97706' : heatAtNode > 0.22 ? '#f59e0b' : (node.dataset.baseFill || '#a16207');
        node.setAttribute('fill', color);
        node.setAttribute('stroke', heatAtNode > 0.35 ? '#92400e' : '#78350f');
    });

    document.querySelectorAll('.wood-damping-wave').forEach((wave) => {
        const index = Number(wave.dataset.step || 0);
        const waveStrength = Math.max(0, Math.min(1, progress * 1.1 - index * 0.26));
        wave.setAttribute('opacity', waveStrength > 0.12 ? String(0.8 - index * 0.18) : '0');
        wave.setAttribute('stroke-width', String(Math.max(1.2, 4 - index * 0.55)));
    });
}

function startSoupConductionVibration() {
    stopSoupConductionVibration(false);
    const atoms = getSoupConductionAtoms();
    atoms.forEach((atom) => {
        if (!atom.dataset.baseCx) atom.dataset.baseCx = atom.getAttribute('cx');
        if (!atom.dataset.baseCy) atom.dataset.baseCy = atom.getAttribute('cy');
    });
    const woodNodes = getSoupWoodNodes();
    woodNodes.forEach((node) => {
        if (!node.dataset.baseCx) node.dataset.baseCx = node.getAttribute('cx');
        if (!node.dataset.baseCy) node.dataset.baseCy = node.getAttribute('cy');
        if (!node.dataset.baseFill) node.dataset.baseFill = node.getAttribute('fill');
    });

    const diagram = document.getElementById('soupDiagram');
    if (diagram) diagram.classList.add('is-heating');

    soupConductionStart = performance.now();
    const vibrate = (now) => {
        const elapsed = (now - soupConductionStart) / 1000;
        atoms.forEach((atom) => {
            const row = Number(atom.dataset.row || 0);
            const col = Number(atom.dataset.col || 0);
            const baseCx = Number(atom.dataset.baseCx);
            const baseCy = Number(atom.dataset.baseCy);
            const heatLevel = atom.getAttribute('fill') === '#cbd5e1' ? 0.5 : 1.8;
            const dx = Math.sin(elapsed * 24 + row * 1.7 + col * 0.9) * heatLevel;
            const dy = Math.cos(elapsed * 27 + row * 1.1 + col * 1.4) * heatLevel;
            atom.setAttribute('cx', (baseCx + dx).toFixed(2));
            atom.setAttribute('cy', (baseCy + dy).toFixed(2));
        });
        woodNodes.forEach((node) => {
            const index = Number(node.dataset.index || 0);
            const baseCx = Number(node.dataset.baseCx);
            const baseCy = Number(node.dataset.baseCy);
            const damping = Math.max(0.15, 1 - index * 0.12);
            const isWarm = node.getAttribute('fill') !== node.dataset.baseFill;
            const heatLevel = (isWarm ? 1.05 : 0.3) * damping;
            const dx = Math.sin(elapsed * 16 + index * 1.4) * heatLevel;
            const dy = Math.cos(elapsed * 13 + index * 0.8) * heatLevel;
            node.setAttribute('cx', (baseCx + dx).toFixed(2));
            node.setAttribute('cy', (baseCy + dy).toFixed(2));
        });
        soupConductionFrame = requestAnimationFrame(vibrate);
    };
    soupConductionFrame = requestAnimationFrame(vibrate);
}

function stopSoupConductionVibration(resetPositions) {
    if (soupConductionFrame) cancelAnimationFrame(soupConductionFrame);
    soupConductionFrame = null;
    if (resetPositions) {
        getSoupConductionAtoms().forEach((atom) => {
            if (atom.dataset.baseCx) atom.setAttribute('cx', atom.dataset.baseCx);
            if (atom.dataset.baseCy) atom.setAttribute('cy', atom.dataset.baseCy);
        });
        getSoupWoodNodes().forEach((node) => {
            if (node.dataset.baseCx) node.setAttribute('cx', node.dataset.baseCx);
            if (node.dataset.baseCy) node.setAttribute('cy', node.dataset.baseCy);
        });
    }
}

function heatSoup() {
    let btn = document.getElementById('soupBtn');
    let mSpoon = document.getElementById('metalSpoon');
    let mSpoonBowl = document.getElementById('metalSpoonBowl');
    let soup = document.getElementById('soupLiquid');
    let txt = document.getElementById('soupText');
    if (!btn || !mSpoon || !soup || !txt) return;

    resetSoupConductionModel();
    btn.disabled = true;
    soup.setAttribute('fill', '#FF5722');
    txt.innerText = "Suppe kocht! Die Wärme wandert den Metalllöffel hinauf...";
    txt.style.color = "#FF5722";
    startSoupConductionVibration();

    const diagram = document.getElementById('soupDiagram');
    if (diagram) diagram.classList.add('is-heating');

    [0.2, 0.4, 0.6, 0.8, 1].forEach((progress, index) => {
        soupHeatTimers.push(setTimeout(() => setSoupConductionProgress(progress), 350 + index * 500));
    });

    soupHeatTimers.push(setTimeout(() => {
        if (mSpoonBowl) mSpoonBowl.setAttribute('fill', '#ef5350');
        mSpoon.setAttribute('fill', '#ef5350');
        if (diagram) diagram.classList.add('is-hot');
        txt.innerText = "Aua! Der Metalllöffel ist oben heiß! Das Holz bleibt kalt.";
        
        soupHeatTimers.push(setTimeout(() => {
            resetSoupConductionModel();
            mSpoon.setAttribute('fill', '#cfd8dc');
            if (mSpoonBowl) mSpoonBowl.setAttribute('fill', '#cfd8dc');
            soup.setAttribute('fill', '#ffb74d');
            txt.innerText = "Alles wieder abgekühlt.";
            txt.style.color = "#718096";
            btn.disabled = false;
        }, 4000));
    }, 2800));
}

// 3. Wärmestrahlung
function sunShine() {
    let btn = document.getElementById('sunBtn');
    if (!btn) return;
    btn.disabled = true;
    
    const parkingSvg = document.getElementById('parkingSunSvg');
    if (parkingSvg) parkingSvg.classList.remove('is-sunny', 'is-cooking');
    const rB = document.getElementById('sunRayBlack');
    const rW = document.getElementById('sunRayWhite');
    const bR = document.getElementById('bounceRay');
    if(rB) rB.style.display = 'block';
    if(rW) rW.style.display = 'block';
    if(bR) bR.style.display = 'block';
    if (parkingSvg) parkingSvg.classList.add('is-sunny');
    
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
        if (parkingSvg && tempB >= 44) parkingSvg.classList.add('is-cooking');
        
        if(tempB >= 60) {
            clearInterval(sunTimer);
            if (parkingSvg) parkingSvg.classList.add('is-cooking');
            if (txt) txt.innerText = "Ergebnis: Auf dem schwarzen Auto brät das Spiegelei. Auf dem weißen bleibt es roh, weil viel Sonnenstrahlung reflektiert wird.";
            setTimeout(() => {
                if(rB) rB.style.display = 'none';
                if(rW) rW.style.display = 'none';
                if(bR) bR.style.display = 'none';
                if (parkingSvg) parkingSvg.classList.remove('is-sunny', 'is-cooking');
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
    const thermoRange = document.getElementById('thermoRange');
    let val = thermoRange?.value || 0;
    if (thermoRange) thermoRange.setAttribute('aria-valuetext', `${Math.round(Number(val))} Grad Temperaturanzeige`);
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
