// Logic for astronomie topic
let startTime, timerInterval;
let isRunning = false;

function topicInit() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isRunning = false;
    startTime = undefined;

    enhanceAstronomieAccessibility();
    updateGravity();
    calcSpeed();
    if (typeof updateCannonball === 'function') updateCannonball();
}

function enhanceAstronomieAccessibility() {
    ['planetText', 'timerDisplay', 'timerResult', 'gravTitle', 'gravDesc', 'speedText', 'novaText'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const zoomRange = document.getElementById('zoomRange');
    if (zoomRange) {
        zoomRange.setAttribute('aria-describedby', 'gravTitle gravDesc');
        zoomRange.setAttribute('aria-valuetext', getGravityValueText(Number(zoomRange.value || 1)));
    }

    const thrustRange = document.getElementById('tRange');
    if (thrustRange) {
        thrustRange.setAttribute('aria-describedby', 'speedText');
        thrustRange.setAttribute('aria-valuetext', `${Number(thrustRange.value || 3).toFixed(1)} Kilometer pro Sekunde`);
    }

    const cannonVelocity = document.getElementById('cannonVelocity');
    if (cannonVelocity) {
        cannonVelocity.setAttribute('aria-describedby', 'cannonStatus');
        cannonVelocity.setAttribute('aria-valuetext', `${Number(cannonVelocity.value || 8).toFixed(1)} Kilometer pro Sekunde`);
    }

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    if (startBtn) startBtn.setAttribute('aria-label', 'Laser starten');
    if (stopBtn) stopBtn.setAttribute('aria-label', 'Laser stoppen');

    const novaBtn = document.getElementById('novaBtn');
    if (novaBtn) {
        novaBtn.setAttribute('aria-pressed', novaBtn.disabled ? 'true' : 'false');
    }
}

function getGravityValueText(value) {
    if (value <= 1) return 'Erde: mäßige Schwerkraft';
    if (value === 2) return 'Sonne: starke Schwerkraft';
    return 'Schwarzes Loch: extreme Schwerkraft';
}

// 1. Planeten-Vergleich
function showPlanet(planet) {
    let txt = document.getElementById('planetText');
    let erde = document.getElementById('planetErde');
    let jupiter = document.getElementById('planetJupiter');
    let sonne = document.getElementById('planetSonne');
    
    if(erde) erde.style.display = 'none';
    if(jupiter) jupiter.style.display = 'none';
    if(sonne) sonne.style.display = 'none';

    if (planet === 'erde') {
        if(erde) erde.style.display = 'block';
        if(txt) {
            txt.innerText = "Die gute alte Erde. Unser Zuhause.";
            txt.style.color = "#2196F3";
        }
    } else if (planet === 'jupiter') {
        if(jupiter) jupiter.style.display = 'block';
        if(txt) {
            txt.innerText = "Whoa! Der Jupiter ist der größte Planet im Sonnensystem.";
            txt.style.color = "#FF9800";
        }
    } else {
        if(sonne) sonne.style.display = 'block';
        if(txt) {
            txt.innerText = "Gigantisch! Die Sonne macht 99,8% der Masse unseres Sonnensystems aus.";
            txt.style.color = "#E91E63";
        }
    }
}

// 2. Lichtgeschwindigkeit Reaktionszeit
function startTimer() {
    const sBtn = document.getElementById('startBtn');
    const oBtn = document.getElementById('stopBtn');
    const res = document.getElementById('timerResult');
    const disp = document.getElementById('timerDisplay');

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if(sBtn) sBtn.disabled = true;
    if(oBtn) oBtn.disabled = false;
    if(res) res.innerText = "";
    if(disp) disp.style.color = "#4A148C";

    startTime = Date.now();
    isRunning = true;

    timerInterval = setInterval(() => {
        let elapsed = (Date.now() - startTime) / 1000;
        if(disp) disp.innerText = elapsed.toFixed(2) + " s";
    }, 10);
}

function stopTimer() {
    if (!isRunning || !startTime) return;

    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    const sBtn = document.getElementById('startBtn');
    const oBtn = document.getElementById('stopBtn');
    if(sBtn) sBtn.disabled = false;
    if(oBtn) oBtn.disabled = true;

    let finalTime = (Date.now() - startTime) / 1000;
    let resultTxt = document.getElementById('timerResult');
    let display = document.getElementById('timerDisplay');
    
    if (Math.abs(finalTime - 1.30) <= 0.1) {
        if(resultTxt) resultTxt.innerText = "Perfekt getroffen! Exakt die Zeit, die das Licht zur Erde braucht.";
        if(display) display.style.color = "#4CAF50";
    } else if (finalTime < 1.30) {
        if(resultTxt) resultTxt.innerText = "Zu früh gestoppt! Du warst schneller als das Licht (das ist unmöglich!).";
        if(display) display.style.color = "#E91E63";
    } else {
        if(resultTxt) resultTxt.innerText = "Zu spät! Das Licht ist schon längst an dir vorbeigeflogen.";
        if(display) display.style.color = "#FF9800";
    }
}

// 3. Schwerkraft-Verzerrer
function updateGravity() {
    let val = Number(document.getElementById('zoomRange')?.value || 1);
    let title = document.getElementById('gravTitle');
    let desc = document.getElementById('gravDesc');
    let obj = document.getElementById('gravObject');
    let grid = document.getElementById('gravGrid');
    if(!obj || !grid) return;
    
    if (val == 1) { 
        if(title) title.innerText = "Die Erde";
        if(desc) desc.innerText = "Mäßige Schwerkraft. Ein leichtes 'Eindellen' des Raums.";
        obj.setAttribute("fill", "#2196F3");
        obj.setAttribute("r", "10");
        grid.setAttribute("d", "M 10 50 Q 100 65 190 50");
    } else if (val == 2) { 
        if(title) title.innerText = "Unsere Sonne";
        if(desc) desc.innerText = "Starke Schwerkraft. Der Raum wird deutlich gebogen!";
        obj.setAttribute("fill", "#FFC107");
        obj.setAttribute("r", "25");
        grid.setAttribute("d", "M 10 50 Q 100 110 190 50");
    } else {
        if(title) title.innerText = "Schwarzes Loch";
        if(desc) desc.innerText = "Extreme Schwerkraft! Der Raum stürzt ins Unendliche ab.";
        obj.setAttribute("fill", "#000000");
        obj.setAttribute("r", "15");
        grid.setAttribute("d", "M 10 50 Q 100 250 190 50");
    }

    const zoomRange = document.getElementById('zoomRange');
    if (zoomRange) zoomRange.setAttribute('aria-valuetext', getGravityValueText(val));
}

// 4. Fluchtgeschwindigkeits-Tacho
function calcSpeed() {
    let thrust = parseFloat(document.getElementById('tRange')?.value || 0);
    let v = thrust; 
    let txt = document.getElementById('speedText');
    let needle = document.getElementById('tachoNeedle');
    
    if(v >= 11.2) {
        if(txt) {
            txt.innerText = "Geschwindigkeit: " + v.toFixed(1) + " km/s (Willkommen im All!) 🌌";
            txt.style.color = "#4CAF50";
        }
    } else {
        if(txt) {
            txt.innerText = "Geschwindigkeit: " + v.toFixed(1) + " km/s (Du fällst zurück zur Erde!) 💥";
            txt.style.color = "#F44336";
        }
    }
    
    let angle = -90 + (v * 12);
    if(angle > 90) angle = 90;
    if(needle) needle.style.transform = `rotate(${angle}deg)`;

    const thrustRange = document.getElementById('tRange');
    if (thrustRange) thrustRange.setAttribute('aria-valuetext', `${v.toFixed(1)} Kilometer pro Sekunde`);
}

// 5. Supernova Animation
function triggerSupernova() {
    let btn = document.getElementById('novaBtn');
    let core = document.getElementById('starCore');
    let lines = document.getElementById('explosionLines');
    let txt = document.getElementById('novaText');
    if(!btn || !core || !lines) return;
    
    btn.disabled = true;
    btn.setAttribute('aria-pressed', 'true');
    if(txt) {
        txt.innerText = "Schwerkraft gewinnt! Der Kern kollabiert...";
        txt.style.color = "#FF9800";
    }
    
    core.style.transition = "all 1s";
    core.setAttribute("r", "5");
    core.setAttribute("fill", "#F44336");
    
    setTimeout(() => {
        if(txt) {
            txt.innerText = "BOOM! SUPERNOVA!";
            txt.style.color = "#fff";
        }
        
        core.style.animation = "explode 0.8s forwards";
        lines.style.display = "block";
        
        lines.querySelectorAll('line').forEach(l => {
            l.style.animation = "none";
            l.offsetHeight; 
            l.style.animation = "dash 1.5s ease-out forwards";
        });
        
    }, 1200);
    
    setTimeout(() => {
        if(txt) {
            txt.innerText = "Es bleibt Sternenstaub (und vielleicht ein Schwarzes Loch).";
            txt.style.color = "#9C27B0";
        }
        btn.disabled = false;
        btn.setAttribute('aria-pressed', 'false');
        
        core.style.animation = "none";
        core.setAttribute("r", "20");
        core.setAttribute("fill", "#FFEB3B");
        lines.style.display = "none";
    }, 4000);
}

function updateSolarZoom() {
    const val = document.getElementById('solarZoomRange')?.value;
    const group = document.getElementById('solarSystemGroup');
    if (!val || !group) return;
    // Map 0-100 to a pan/scale transformation
    // 0 = inner planets, 100 = outer planets
    const maxPan = -3600;
    const pan = (val / 100) * maxPan;
    // Slightly zoom out as we go further out to fit inclinations
    const scale = 1 - (val / 100) * 0.7;
    // Keep the sun anchored to the left but move the view right
    const baseX = 50;
    group.setAttribute('transform', `translate(${baseX + pan}, 140) scale(${scale})`);
}

function updateCannonball() {
    const velInput = document.getElementById('cannonVelocity');
    const path = document.getElementById('cannonPath');
    const anim = document.getElementById('cannonAnim');
    const status = document.getElementById('cannonStatus');
    const velText = document.getElementById('cannonVelVal');
    const velVector = document.getElementById('velVector');
    const impactPoint = document.getElementById('impactPoint');

    if(!velInput || !path || !anim || !status || !velText || !velVector) return;

    const v = parseFloat(velInput.value);
    velText.innerText = v.toFixed(1) + " km/s";
    velInput.setAttribute('aria-valuetext', `${v.toFixed(1)} Kilometer pro Sekunde`);

    const vecLength = 338 + (v - 3) * 9;
    velVector.setAttribute('x2', vecLength);

    if (impactPoint) {
        impactPoint.setAttribute('opacity', '0');
        impactPoint.setAttribute('r', '0');
    }

    let flightPath = '';

    if (v < 7.5) {
        const t = Math.max(0, Math.min(1, (v - 3) / 4.5));
        const theta = (-76 + t * 98) * Math.PI / 180;
        const hitX = 310 + Math.cos(theta) * 72;
        const hitY = 165 + Math.sin(theta) * 72;
        const controlX = 328 + v * 12;
        const controlY = 34 + t * 58;
        flightPath = `M 310 53 Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${hitX.toFixed(1)} ${hitY.toFixed(1)}`;
        path.setAttribute('stroke', '#ef4444');
        path.setAttribute('stroke-dasharray', '5 6');
        anim.setAttribute('dur', '2.6s');
        status.innerText = "Zu langsam: Die Kugel trifft wieder auf die Erde.";
        status.style.color = "#ef4444";
        if (impactPoint) {
            impactPoint.setAttribute('cx', hitX.toFixed(1));
            impactPoint.setAttribute('cy', hitY.toFixed(1));
            impactPoint.setAttribute('r', '5');
            impactPoint.setAttribute('opacity', '1');
        }
    } else if (v >= 7.5 && v <= 8.5) {
        flightPath = "M 310 53 A 112 112 0 1 1 309.9 53";
        path.setAttribute('stroke', '#38bdf8');
        path.setAttribute('stroke-dasharray', '8 8');
        anim.setAttribute('dur', '5s');
        status.innerText = "Passende Geschwindigkeit: Die Kugel fällt ständig zur Erde, verfehlt aber den Boden.";
        status.style.color = "#38bdf8";
    } else if (v > 8.5 && v < 11.2) {
        const t = (v - 8.5) / 2.7;
        const rx = 116 + t * 74;
        const bottom = 277 + t * 30;
        const right = 310 + rx;
        const left = 310 - rx;
        flightPath = `M 310 53 C ${310 + rx * 0.9} 52 ${right} 96 ${right} 165 C ${right} 238 ${310 + rx * 0.72} ${bottom} 310 ${bottom} C ${310 - rx * 0.72} ${bottom} ${left} 238 ${left} 165 C ${left} 96 ${310 - rx * 0.9} 52 310 53`;
        path.setAttribute('stroke', '#facc15');
        path.setAttribute('stroke-dasharray', '8 8');
        anim.setAttribute('dur', '6.5s');
        status.innerText = "Schneller Start: Die Kugel bleibt gebunden, aber auf einer längeren elliptischen Bahn.";
        status.style.color = "#facc15";
    } else {
        flightPath = `M 310 53 C 380 45 470 18 600 -18`;
        path.setAttribute('stroke', '#22c55e');
        path.setAttribute('stroke-dasharray', '10 10');
        anim.setAttribute('dur', '3s');
        status.innerText = "Sehr schnell: Die Kugel erreicht Fluchtgeschwindigkeit und verlässt die Erde.";
        status.style.color = "#22c55e";
    }

    path.setAttribute('d', flightPath);
    anim.setAttribute('path', flightPath);
    if (typeof anim.beginElement === 'function') {
        try {
            anim.beginElement();
        } catch (e) {
            // Some browsers do not allow restarting SMIL animations programmatically.
        }
    }
}
