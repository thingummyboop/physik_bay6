// Logic for Licht & Schatten

function topicInit() {
    updateShadow1();
    updateShadow2();
    updateEclipse1();
}

// 1. Point Source Shadow
function updateShadow1() {
    const range = document.getElementById('posRange1');
    if (!range) return;
    const objX = parseInt(range.value);
    const obj = document.getElementById('obj1');
    const shadow = document.getElementById('shadowArea1');
    const ray1 = document.getElementById('ray1_1');
    const ray2 = document.getElementById('ray1_2');
    
    if (obj) obj.setAttribute('x', objX);
    
    const x1 = 30, y1 = 75;
    const objTopY = 60, objBotY = 90;
    
    const shadowTopY = y1 + (objTopY - y1) * (400 - x1) / (objX - x1);
    const shadowBotY = y1 + (objBotY - y1) * (400 - x1) / (objX - x1);
    
    if (shadow) {
        shadow.setAttribute('points', `${objX},${objTopY} 400,${shadowTopY} 400,${shadowBotY} ${objX},${objBotY}`);
    }
    if (ray1) ray1.setAttribute('x2', 400); ray1.setAttribute('y2', shadowTopY);
    if (ray2) ray2.setAttribute('x2', 400); ray2.setAttribute('y2', shadowBotY);
}

// 2. Two Lamps Shadow
let lamp1On = true;
let lamp2On = true;

function toggleLamp(n) {
    if (n === 1) lamp1On = !lamp1On;
    else lamp2On = !lamp2On;
    
    const btn = document.getElementById('btnL' + n);
    const lamp = document.getElementById('lamp' + n);
    if (btn) btn.innerText = `Lampe ${n}: ${n===1 ? (lamp1On ? 'AN' : 'AUS') : (lamp2On ? 'AN' : 'AUS')}`;
    if (lamp) lamp.setAttribute('fill', (n===1 ? (lamp1On ? '#fff' : '#444') : (lamp2On ? '#fff' : '#444')));
    
    updateShadow2();
}

function updateShadow2() {
    const hs1 = document.getElementById('hShadow1');
    const hs2 = document.getElementById('hShadow2');
    const ks = document.getElementById('kShadow');
    
    const objX = 180, objW = 15, objY = 85, objH = 30;
    const L1x = 30, L1y = 60;
    const L2x = 30, L2y = 140;
    
    const s1TopY = L1y + (objY - L1y) * (400 - L1x) / (objX - L1x);
    const s1BotY = L1y + (objY + objH - L1y) * (400 - L1x) / (objX - L1x);
    const p1 = `${objX},${objY} 400,${s1TopY} 400,${s1BotY} ${objX},${objY+objH}`;
    
    const s2TopY = L2y + (objY - L2y) * (400 - L2x) / (objX - L2x);
    const s2BotY = L2y + (objY + objH - L2y) * (400 - L2x) / (objX - L2x);
    const p2 = `${objX},${objY} 400,${s2TopY} 400,${s2BotY} ${objX},${objY+objH}`;

    if (hs1) {
        hs1.setAttribute('points', lamp1On ? p1 : "");
        hs1.setAttribute('fill', lamp2On ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.7)");
    }
    if (hs2) {
        hs2.setAttribute('points', lamp2On ? p2 : "");
        hs2.setAttribute('fill', lamp1On ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.7)");
    }
    
    if (ks) {
        if (lamp1On && lamp2On) {
            const top = Math.max(s1TopY, s2TopY);
            const bot = Math.min(s1BotY, s2BotY);
            if (bot > top) {
                ks.setAttribute('points', `${objX},${objY+objH/2} 400,${top} 400,${bot}`);
                ks.setAttribute('display', 'block');
            } else {
                ks.setAttribute('display', 'none');
            }
        } else {
            ks.setAttribute('display', 'none');
        }
    }
}

// 3. Solar Eclipse
function updateEclipse1() {
    const range = document.getElementById('moonPos');
    if (!range) return;
    const moonX = parseInt(range.value);
    const moon = document.getElementById('moonObj');
    const umbra = document.getElementById('moonUmbra') || document.getElementById('moonShadow');
    const penumbra = document.getElementById('moonPenumbra');
    const status = document.getElementById('statusText');
    const ray1 = document.getElementById('rayL1');
    const ray2 = document.getElementById('rayL2');
    
    if (moon) moon.setAttribute('cx', moonX);
    
    const sX = 40, sY = 90, sR = 30;
    const mY = 90, mR = 10;
    
    // Outer tangents for Umbra (S_top to M_top, S_bot to M_bot)
    // S_top is at 60, M_top at 80. Slope = (80-60)/(moonX-40)
    const uY1 = 60 + (80 - 60) * (400 - sX) / (moonX - sX);
    const uY2 = 120 + (100 - 120) * (400 - sX) / (moonX - sX);
    
    // Inner tangents for Penumbra (S_top to M_bot, S_bot to M_top)
    // S_top is at 60, M_bot at 100. Slope = (100-60)/(moonX-40)
    const pY1 = 60 + (100 - 60) * (400 - sX) / (moonX - sX);
    const pY2 = 120 + (80 - 120) * (400 - sX) / (moonX - sX);
    
    const xV = sX + (sR * (moonX - sX) / (sR - mR)); // Umbra vertex

    if (umbra) {
        if (xV > 400) {
            // Umbra cone hits the screen
            umbra.setAttribute('points', `${moonX},80 400,${uY1} 400,${uY2} ${moonX},100`);
            umbra.setAttribute('display', 'block');
        } else {
            // Umbra cone closes before the screen
            umbra.setAttribute('points', `${moonX},80 ${xV},90 ${moonX},100`);
        }
    }
    
    if (penumbra) {
        penumbra.setAttribute('points', `${moonX},80 400,${pY2} 400,${pY1} ${moonX},100`);
    }
    
    if (ray1) { ray1.setAttribute('x2', 400); ray1.setAttribute('y2', uY1); }
    if (ray2) { ray2.setAttribute('x2', 400); ray2.setAttribute('y2', uY2); }
    
    // Detection
    const uMin = Math.min(uY1, uY2);
    const uMax = Math.max(uY1, uY2);
    const pMin = Math.min(pY1, pY2);
    const pMax = Math.max(pY1, pY2);

    if (xV > 400 && 90 >= uMin && 90 <= uMax) {
        status.innerText = "🌟 Totale Sonnenfinsternis!";
        status.setAttribute('fill', '#fbbf24');
    } else if (90 >= pMin && 90 <= pMax) {
        status.innerText = "🌗 Partielle Sonnenfinsternis";
        status.setAttribute('fill', '#94a3b8');
    } else {
        status.innerText = "Suche die Finsternis...";
        status.setAttribute('fill', 'white');
    }
}

// 4. Lunar Eclipse
let moonOrbiting = false;
let moonAngle = 0;
function startMoonOrbit() {
    if (moonOrbiting) return;
    moonOrbiting = true;
    function animate() {
        moonAngle += 0.02;
        const x = 220 + Math.cos(moonAngle) * 150;
        const y = 100 + Math.sin(moonAngle) * 60;
        const moon = document.getElementById('orbitMoon');
        if (moon) {
            moon.setAttribute('cx', x);
            moon.setAttribute('cy', y);
            if (x > 220 && y > 65 && y < 135) {
                moon.setAttribute('fill', '#880e4f');
            } else {
                moon.setAttribute('fill', '#ddd');
            }
        }
        if (moonOrbiting) requestAnimationFrame(animate);
    }
    animate();
}

function showOrbital(type) {
    const moon = document.getElementById('moonOrbit');
    const earth = document.getElementById('earthOrbit');
    const txt = document.getElementById('orbitalText');
    if(!moon || !earth) return;

    if(type === 'moon') {
        moon.style.display = 'block';
        earth.style.display = 'none';
        if(txt) txt.innerText = "Der Mond kreist in ca. 27 Tagen einmal um die Erde.";
    } else {
        moon.style.display = 'none';
        earth.style.display = 'block';
        if(txt) txt.innerText = "Die Erde kreist in einem Jahr einmal um die Sonne.";
    }
}

function setPhase(phase) {
    const moon = document.getElementById('moonPhase');
    const txt = document.getElementById('phaseText');
    if(!moon) return;

    if(phase === 'new') {
        moon.setAttribute('fill', '#333');
        if(txt) txt.innerText = "Neumond: Die beleuchtete Seite zeigt von uns weg.";
    } else if(phase === 'full') {
        moon.setAttribute('fill', '#fff176');
        if(txt) txt.innerText = "Vollmond: Wir sehen die komplette beleuchtete Seite.";
    } else {
        moon.setAttribute('fill', 'url(#halfMoonGrad)');
        if(txt) txt.innerText = "Halbmond: Wir sehen nur einen Teil der beleuchteten Seite.";
    }
}
