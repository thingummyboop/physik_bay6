// Logic for sieinheiten topic
let startTime, timerInterval;
let isRunning = false;

function topicInit() {
    updateZoom();
}

// 1. Maßband-Chaos
function measure(unit) {
    let txt = document.getElementById('measureText');
    let ticksCm = document.getElementById('ticksCm');
    let ticksFeet = document.getElementById('ticksFeet');
    let ticksHands = document.getElementById('ticksHands');
    
    if(ticksCm) ticksCm.style.display = 'none';
    if(ticksFeet) ticksFeet.style.display = 'none';
    if(ticksHands) ticksHands.style.display = 'none';

    if (unit === 'cm') {
        if(ticksCm) ticksCm.style.display = 'block';
        if(txt) {
            txt.innerText = "Länge: Exakt 20 Zentimeter";
            txt.style.color = "#4CAF50";
        }
    } else if (unit === 'feet') {
        if(ticksFeet) ticksFeet.style.display = 'block';
        if(txt) {
            txt.innerText = "Länge: 1,3 riesige Königs-Füße?!";
            txt.style.color = "#FF9800";
        }
    } else {
        if(ticksHands) ticksHands.style.display = 'block';
        if(txt) {
            txt.innerText = "Länge: 15 winzige Baby-Hände?!";
            txt.style.color = "#E91E63";
        }
    }
}

// 2. Reaktionszeit
function startTimer() {
    const sBtn = document.getElementById('startBtn');
    const oBtn = document.getElementById('stopBtn');
    const res = document.getElementById('timerResult');
    const disp = document.getElementById('timerDisplay');
    
    if(sBtn) sBtn.disabled = true;
    if(oBtn) oBtn.disabled = false;
    if(res) res.innerText = "";
    if(disp) disp.style.color = "#1A237E";
    
    startTime = Date.now();
    isRunning = true;
    
    timerInterval = setInterval(() => {
        let elapsed = (Date.now() - startTime) / 1000;
        if(disp) disp.innerText = elapsed.toFixed(2) + " s";
    }, 10);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    const sBtn = document.getElementById('startBtn');
    const oBtn = document.getElementById('stopBtn');
    if(sBtn) sBtn.disabled = false;
    if(oBtn) oBtn.disabled = true;
    
    let finalTime = (Date.now() - startTime) / 1000;
    let resultTxt = document.getElementById('timerResult');
    let display = document.getElementById('timerDisplay');
    
    if (Math.abs(finalTime - 2.00) <= 0.1) {
        if(resultTxt) resultTxt.innerText = "Wahnsinn! Fast exakt 2 Sekunden! Perfektes Zeitgefühl.";
        if(display) display.style.color = "#4CAF50";
    } else if (finalTime < 2.00) {
        if(resultTxt) resultTxt.innerText = "Zu früh! Du musst länger warten.";
        if(display) display.style.color = "#E91E63";
    } else {
        if(resultTxt) resultTxt.innerText = "Zu spät! Du warst zu langsam.";
        if(display) display.style.color = "#FF9800";
    }
}

// 3. Zoom / Präfixe
function updateZoom() {
    let val = document.getElementById('zoomRange')?.value || 2;
    let title = document.getElementById('zoomTitle');
    let desc = document.getElementById('zoomDesc');
    let zMilli = document.getElementById('zoomMilli');
    let zMeter = document.getElementById('zoomMeter');
    let zKilo = document.getElementById('zoomKilo');
    
    if(zMilli) zMilli.style.display = 'none';
    if(zMeter) zMeter.style.display = 'none';
    if(zKilo) zKilo.style.display = 'none';
    
    if (val == 1) { 
        if(title) title.innerText = "1 Millimeter (mm)";
        if(desc) desc.innerText = "Winzig! So klein wie eine kleine Ameise.";
        if(zMilli) zMilli.style.display = 'block';
    } else if (val == 2) { 
        if(title) title.innerText = "1 Meter (m)";
        if(desc) desc.innerText = "Die Basis! Etwa die Größe eines Kindes oder eines großen Schrittes.";
        if(zMeter) zMeter.style.display = 'block';
    } else { 
        if(title) title.innerText = "1 Kilometer (km)";
        if(desc) desc.innerText = "Riesig! Die Strecke durch eine halbe Stadt (1.000 Meter).";
        if(zKilo) zKilo.style.display = 'block';
    }
}

// 4. Formel-Flitzer
function calcSpeed() {
    let s = parseFloat(document.getElementById('sRange')?.value || 10);
    let t = parseFloat(document.getElementById('tRange')?.value || 2);
    let sVal = document.getElementById('sVal');
    let tVal = document.getElementById('tVal');
    let spTxt = document.getElementById('speedText');
    let needle = document.getElementById('tachoNeedle');
    
    if(sVal) sVal.innerText = s;
    if(tVal) tVal.innerText = t;
    
    let v = s / t; 
    if(spTxt) spTxt.innerText = "Geschwindigkeit (v) = " + v.toFixed(1) + " m/s";
    
    let angle = -90 + (v * 4); 
    if(angle > 90) angle = 90;
    if(needle) needle.style.transform = `rotate(${angle}deg)`;
}

// 5. Diagramm
function drawGraph() {
    let btn = document.getElementById('graphBtn');
    let path = document.getElementById('rocketPath');
    let points = document.querySelectorAll('.graphPoint');
    let txt = document.getElementById('graphText');
    if(!btn || !path) return;
    
    btn.disabled = true;
    if(txt) txt.innerText = "Rakete steigt! Das Diagramm zeichnet den Verlauf...";
    
    path.style.animation = "none";
    path.offsetHeight; 
    path.style.animation = "dash 3s linear forwards";
    
    points.forEach((p, index) => {
        setTimeout(() => {
            p.style.opacity = "1";
            p.style.transition = "opacity 0.3s";
        }, index * 750);
    });
    
    setTimeout(() => {
        if(txt) txt.innerText = "Diagramm fertig! Man sieht eine schöne steile Kurve nach oben.";
        btn.disabled = false;
    }, 3500);
}
