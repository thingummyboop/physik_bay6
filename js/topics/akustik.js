// Logic for akustik topic
let glassBroken = false;

function topicInit() {
    glassBroken = false;
    // 2. Vakuum: Init air particles inside the existing <g id="airParticles">
    const airParticles = document.getElementById('airParticles');
    if (airParticles) {
        airParticles.innerHTML = '';
        for(let i=0; i<40; i++) {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", Math.random()*160 + 120); 
            c.setAttribute("cy", Math.random()*100 + 100); 
            c.setAttribute("r", "2");
            c.setAttribute("fill", "#718096");
            c.classList.add("particle");
            airParticles.appendChild(c);
        }
    }

    // Oszilloskop init
    drawWave();
    
    // Resonanz init
    checkResonance();

    // Event listener for distRange
    document.getElementById('distRange')?.addEventListener('input', (e) => {
        const val = e.target.value;
        const txt = document.getElementById('distText');
        if (txt) txt.innerText = `${val} km (${val * 3} Sekunden)`;
    });
}

// 1. Stimmgabel
function strikeFork() {
    const fork = document.getElementById('tuningFork');
    const waveGrp = document.getElementById('soundWavesGrp');
    const txt = document.getElementById('forkText');
    if (!fork) return;

    fork.classList.add('anim-shake');
    if(waveGrp) waveGrp.style.display = "block";
    if(txt) txt.innerText = "Die Stimmgabel zittert (Schwingung)!";
    
    setTimeout(() => {
        fork.classList.remove('anim-shake');
        if(waveGrp) waveGrp.style.display = "none";
        if(txt) txt.innerText = "Die Stimmgabel ruht.";
    }, 2000);
}

// 2. Vakuum
function toggleVacuum() {
    const btn = document.getElementById('vacBtn');
    const waves = document.getElementById('bellWaves');
    const particles = document.querySelectorAll('.particle');
    const txt = document.getElementById('vacText');
    if (!btn) return;

    let isVacuum = btn.innerText.includes('abpumpen') || btn.innerText.includes('PUMPE');

    if (isVacuum) {
        btn.innerText = "💨 Luft einlassen";
        btn.style.background = "#4a5568";
        if (waves) waves.style.display = "none";
        if (txt) txt.innerText = "Vakuum: Keine Luftteilchen, kein Schall!";
        particles.forEach(p => p.style.opacity = "0");
    } else {
        btn.innerText = "🌬️ Luft abpumpen";
        btn.style.background = "#2196F3";
        if (waves) waves.style.display = "block";
        if (txt) txt.innerText = "Luft ist drin: Der Wecker ist laut zu hören!";
        particles.forEach(p => p.style.opacity = "1");
    }
}

// 3. Oszilloskop
function drawWave() {
    const freq = document.getElementById('freqRange')?.value || 2;
    const amp = document.getElementById('ampRange')?.value || 40;
    const path = document.getElementById('osciWave');
    const lblFreq = document.getElementById('lblFreq');
    const lblAmp = document.getElementById('lblAmp');

    if (lblFreq) {
        if(freq < 2) lblFreq.innerText = "Tief (Brummen)";
        else if(freq > 3.5) lblFreq.innerText = "Hoch (Piepsen)";
        else lblFreq.innerText = "Mittel";
    }
    
    if (lblAmp) {
        if(amp < 25) lblAmp.innerText = "Leise (Flüstern)";
        else if(amp > 60) lblAmp.innerText = "Laut (Brüllen)";
        else lblAmp.innerText = "Mittel";
    }

    if (!path) return;
    let d = "M 0 80 ";
    for(let x=0; x<=300; x+=5) {
        let y = 80 + Math.sin(x * freq * 0.1) * (amp/2);
        d += `L ${x} ${y} `;
    }
    path.setAttribute('d', d);
}

// 4. Gewitter
function triggerLightning() {
    const sky = document.getElementById('skyBox');
    const bolt = document.getElementById('lightningBolt');
    const dist = parseFloat(document.getElementById('distRange')?.value || 2);
    const btn = document.getElementById('btnLightning');
    const msg = document.getElementById('thunderMsg');
    const wave = document.getElementById('thunderWave');
    
    if (!sky || !bolt || !btn) return;

    btn.disabled = true;
    
    sky.style.background = "#fff";
    bolt.style.display = "block";
    if(msg) msg.innerText = "⚡ BLITZ! Das Licht ist sofort da...";
    
    setTimeout(() => {
        sky.style.background = "#2d3748";
        bolt.style.display = "none";
    }, 200);

    const travelTime = dist * 3000; 
    if(wave) {
        wave.style.transition = "none";
        wave.style.r = "10";
        wave.style.opacity = "0.7";
        void wave.offsetWidth; 
        wave.style.transition = `all ${travelTime}ms linear`;
        wave.style.r = "280"; 
    }

    setTimeout(() => {
        if(msg) msg.innerText = "💥 BOOM! Der Schall erreicht dich!";
        if(wave) wave.style.opacity = "0";
        
        playThunder();
        
        setTimeout(() => {
            if(msg) msg.innerText = "Warte auf den nächsten Blitz...";
            btn.disabled = false;
        }, 2000);
    }, travelTime);
}

function playThunder() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 2);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 2);
    } catch(e) {}
}

// 5. Echo
function sendEcho() {
    const out = document.getElementById('batSignalOut');
    const back = document.getElementById('butterflyEchoIn');
    const txt = document.getElementById('echoText');
    const btn = document.getElementById('btnEcho');
    if (!out || !back || !txt || !btn) return;

    btn.disabled = true;
    txt.innerText = "Sende Ultraschall...";
    out.classList.remove('anim-ping');
    void out.offsetWidth; 
    out.classList.add('anim-ping');
    
    setTimeout(() => {
        txt.innerText = "Echo kommt zurück!";
        back.classList.remove('anim-ping');
        void back.offsetWidth;
        back.classList.add('anim-ping');
        setTimeout(() => {
            txt.innerText = "Gefunden! Leckerer Falter!";
            btn.disabled = false;
        }, 1000);
    }, 1000);
}

// 6. Resonanz
function checkResonance() {
    if (glassBroken) return;

    const val = parseFloat(document.getElementById('resRange')?.value || 1);
    const disp = document.getElementById('resValue');
    const glass = document.getElementById('glass');
    const membrane = document.getElementById('speakerMembrane');
    const waves = document.getElementById('resWaves');
    const intact = document.getElementById('intactGlass');
    const broken = document.getElementById('brokenGlass');
    const status = document.getElementById('resText');
    const crack = document.getElementById('crack');
    
    if (disp) disp.innerText = val.toFixed(1);
    if (!glass) return;

    const diff = Math.abs(val - 4.0);
    
    // Speaker membrane vibration
    if (membrane) {
        membrane.style.animation = `shake ${0.1 / (val/4)}s infinite`;
    }

    if (diff < 1.5) {
        // Approaching resonance: Start vibrating
        const intensity = (1.5 - diff) / 1.5; // 0 to 1
        glass.style.animation = `shake ${0.2 / (intensity + 0.1)}s infinite`;
        if (waves) {
            waves.style.opacity = intensity;
            waves.style.transform = `scale(${0.8 + intensity*0.4})`;
        }
        
        if (diff < 0.1) {
            // PERFECT RESONANCE: BREAK!
            glassBroken = true;
            glass.style.animation = "none";
            if (intact) intact.style.display = "none";
            if (broken) broken.style.display = "block";
            if (crack) crack.style.display = "none";
            if (status) {
                status.innerText = "💥 KLIRR! Das Glas ist bei 4.0 Hz zersprungen!";
                status.style.color = "#E91E63";
            }
            // Add a reset button effect
            setTimeout(() => {
                if (status) status.innerHTML += '<br><button onclick="topicInit()" style="margin-top:10px; background:#9C27B0;">Neues Glas hinstellen 🍷</button>';
            }, 500);
        } else if (diff < 0.4) {
            if (crack) crack.style.display = "block";
            if (status) status.innerText = "⚠️ GEFÄHRLICH! Das Glas bekommt Risse!";
        } else {
            if (crack) crack.style.display = "none";
            if (status) status.innerText = "⚡ RESONANZ! Das Schwingen wird stärker...";
        }
    } else {
        // Far from resonance
        glass.style.animation = "none";
        if (waves) waves.style.opacity = "0.1";
        if (crack) crack.style.display = "none";
        if (status) {
            status.innerText = val < 4.0 ? "Zu tief... erhöhe die Frequenz." : "Zu hoch... senke die Frequenz.";
            status.style.color = "#718096";
        }
    }
}
