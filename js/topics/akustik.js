// Logic for akustik topic
function topicInit() {
    // 2. Vakuum
    let isVacuum = false;
    const airParticles = document.getElementById('airParticles');
    if (airParticles) {
        airParticles.innerHTML = '';
        for(let i=0; i<40; i++) {
            airParticles.innerHTML += `<circle cx="${Math.random()*380 + 10}" cy="${Math.random()*180 + 10}" r="2" fill="#718096" class="particle"></circle>`;
        }
    }

    // Initialize displays
    drawWave();
    checkResonance();
}

// 1. Stimmgabel
function strikeFork() {
    const fork = document.getElementById('tuningFork');
    const wave = document.getElementById('soundWave');
    if (!fork) return;

    fork.style.animation = "vibrate 0.1s infinite alternate";
    if (wave) {
        wave.style.display = "block";
        wave.style.animation = "ripple 2s infinite linear";
    }
    
    setTimeout(() => {
        fork.style.animation = "none";
        if (wave) {
            wave.style.display = "none";
            wave.style.animation = "none";
        }
    }, 2000);
}

// 2. Vakuum
function toggleVacuum() {
    const btn = document.getElementById('vacBtn');
    const wave = document.getElementById('vacWave');
    const particles = document.querySelectorAll('.particle');
    if (!btn) return;

    let isVacuum = btn.innerText.includes('START');

    if (isVacuum) {
        btn.innerText = "🔇 Luft ist raus (Vakuum)";
        btn.style.background = "#e53e3e";
        if (wave) wave.style.opacity = "0";
        particles.forEach(p => p.style.opacity = "0");
    } else {
        btn.innerText = "🔔 Glocke läuten (Luft)";
        btn.style.background = "#48bb78";
        if (wave) wave.style.opacity = "1";
        particles.forEach(p => p.style.opacity = "1");
    }
}

// 3. Oszilloskop
function drawWave() {
    const freq = document.getElementById('freqRange')?.value || 2;
    const amp = document.getElementById('ampRange')?.value || 40;
    const path = document.getElementById('wavePath');
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
    let d = "M 0 100 ";
    for(let x=0; x<=400; x+=5) {
        let y = 100 + Math.sin(x * freq * 0.05) * amp;
        d += `L ${x} ${y} `;
    }
    path.setAttribute('d', d);
}

// 4. Gewitter
function triggerLightning() {
    const sky = document.getElementById('skyBox');
    const bolt = document.getElementById('lightningBolt');
    const dist = document.getElementById('distRange')?.value || 2;
    const btn = document.getElementById('btnLightning');
    if (!sky || !bolt || !btn) return;

    btn.disabled = true;
    sky.style.background = "#fff";
    bolt.style.display = "block";
    
    setTimeout(() => {
        sky.style.background = "#2d3748";
        bolt.style.display = "none";
    }, 100);

    setTimeout(() => {
        const audio = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audio.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audio.currentTime + 1.5);
        gain.gain.setValueAtTime(0.3, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 1.5);
        btn.disabled = false;
    }, dist * 1000);
}

document.getElementById('distRange')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const txt = document.getElementById('distText');
    if (txt) txt.innerText = `${val} km (${val * 3} Sekunden)`;
});

// 5. Echo
function sendEcho() {
    const out = document.getElementById('batSignalOut');
    const back = document.getElementById('butterflyEchoIn');
    const txt = document.getElementById('echoText');
    const btn = document.getElementById('btnEcho');
    if (!out || !back || !txt || !btn) return;

    btn.disabled = true;
    txt.innerText = "Sende Ultraschall...";
    out.style.animation = "ping 1s forwards";
    
    setTimeout(() => {
        txt.innerText = "Echo kommt zurück!";
        back.style.animation = "ping 1s forwards";
        setTimeout(() => {
            txt.innerText = "Gefunden! Leckerer Falter!";
            btn.disabled = false;
        }, 1000);
    }, 1000);
}

// 6. Resonanz
function checkResonance() {
    const val = parseFloat(document.getElementById('resRange')?.value || 1);
    const disp = document.getElementById('resValue');
    const glass = document.getElementById('glass');
    if (disp) disp.innerText = val.toFixed(1);
    if (!glass) return;

    if (Math.abs(val - 4.0) < 0.2) {
        glass.style.animation = "vibrate 0.1s infinite";
        glass.querySelector('path').setAttribute('fill', 'rgba(76, 175, 80, 0.4)');
    } else {
        glass.style.animation = "none";
        glass.querySelector('path').setAttribute('fill', 'rgba(156, 39, 176, 0.2)');
    }
}

// Ensure init runs if DOM already loaded
if (document.readyState === 'complete') {
    topicInit();
}
