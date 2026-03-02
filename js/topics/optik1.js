// Logic for Optik 1: Licht & Schatten overhaul

function topicInit() {
    updateShadow1();
    updateShadow2();
    updateEclipse1();
    updateReflection();
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
    if (ray1) { ray1.setAttribute('x2', 400); ray1.setAttribute('y2', shadowTopY); }
    if (ray2) { ray2.setAttribute('x2', 400); ray2.setAttribute('y2', shadowBotY); }
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
    if(!hs1 || !hs2 || !ks) return;

    const objX = 180, objY = 85, objH = 30;
    const L1x = 30, L1y = 60;
    const L2x = 30, L2y = 140;
    
    const s1TopY = L1y + (objY - L1y) * (400 - L1x) / (objX - L1x);
    const s1BotY = L1y + (objY + objH - L1y) * (400 - L1x) / (objX - L1x);
    const p1 = `${objX},${objY} 400,${s1TopY} 400,${s1BotY} ${objX},${objY+objH}`;
    
    const s2TopY = L2y + (objY - L2y) * (400 - L2x) / (objX - L2x);
    const s2BotY = L2y + (objY + objH - L2y) * (400 - L2x) / (objX - L2x);
    const p2 = `${objX},${objY} 400,${s2TopY} 400,${s2BotY} ${objX},${objY+objH}`;

    hs1.setAttribute('points', lamp1On ? p1 : "");
    hs1.setAttribute('fill', lamp2On ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.8)");
    
    hs2.setAttribute('points', lamp2On ? p2 : "");
    hs2.setAttribute('fill', lamp1On ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.8)");
    
    if (lamp1On && lamp2On) {
        const top = Math.max(s1TopY, s2TopY);
        const bot = Math.min(s1BotY, s2BotY);
        if (bot > top) {
            ks.setAttribute('points', `${objX},100 400,${top} 400,${bot}`);
            ks.setAttribute('display', 'block');
        } else { ks.setAttribute('display', 'none'); }
    } else { ks.setAttribute('display', 'none'); }
}

// 3. Eclipses
function updateEclipse1() {
    const range = document.getElementById('moonPos');
    if (!range) return;
    const moonX = parseInt(range.value);
    const moon = document.getElementById('moonObj');
    const umbra = document.getElementById('moonUmbra');
    const penumbra = document.getElementById('moonPenumbra');
    const status = document.getElementById('statusText');
    
    if (moon) moon.setAttribute('cx', moonX);
    
    const sX = 40, sY = 90, sR = 30;
    const mR = 10;
    
    const uY1 = 60 + (80 - 60) * (400 - sX) / (moonX - sX);
    const uY2 = 120 + (100 - 120) * (400 - sX) / (moonX - sX);
    const pY1 = 60 + (100 - 60) * (400 - sX) / (moonX - sX);
    const pY2 = 120 + (80 - 120) * (400 - sX) / (moonX - sX);
    
    const xV = sX + (sR * (moonX - sX) / (sR - mR));

    if (umbra) {
        if (xV > 400) umbra.setAttribute('points', `${moonX},80 400,${uY1} 400,${uY2} ${moonX},100`);
        else umbra.setAttribute('points', `${moonX},80 ${xV},90 ${moonX},100`);
    }
    if (penumbra) penumbra.setAttribute('points', `${moonX},80 400,${pY2} 400,${pY1} ${moonX},100`);
    
    if (status) {
        if (xV > 400 && 90 >= Math.min(uY1, uY2) && 90 <= Math.max(uY1, uY2)) {
            status.innerText = "🌟 Totale Sonnenfinsternis!";
            status.setAttribute('fill', '#fbbf24');
        } else if (90 >= Math.min(pY1, pY2) && 90 <= Math.max(pY1, pY2)) {
            status.innerText = "🌗 Partielle Sonnenfinsternis";
            status.setAttribute('fill', '#94a3b8');
        } else {
            status.innerText = "Suche die Finsternis...";
            status.setAttribute('fill', 'white');
        }
    }
}

let moonOrbiting = false;
let moonAngle = 0;
function startMoonOrbit() {
    if (moonOrbiting) return;
    moonOrbiting = true;
    const status = document.getElementById('moonStatusText');
    const moon = document.getElementById('orbitMoon');
    
    function animate() {
        moonAngle += 0.015;
        const cx = 220, cy = 125;
        const rx = 160, ry = 80;
        
        const x = cx + Math.cos(moonAngle) * rx;
        const y = cy + Math.sin(moonAngle) * ry;
        
        if (moon) {
            moon.setAttribute('cx', x);
            moon.setAttribute('cy', y);
            
            const z = Math.sin(moonAngle); 
            const scale = 0.8 + (z + 1) * 0.2; 
            moon.setAttribute('r', 12 * scale);
            
            const isBehind = (y < cy && Math.abs(x - cx) < 45);
            if (isBehind) {
                moon.style.opacity = "0.1";
            } else {
                moon.style.opacity = "1";
            }

            // Shadow logic (tuned to new JSON coords)
            const shadowYTop = 85 + (65 - 85) * (x - 220) / 230;
            const shadowYBot = 165 + (185 - 165) * (x - 220) / 230;
            
            if (x > 220 && y > shadowYTop && y < shadowYBot) {
                moon.setAttribute('fill', '#880e4f'); 
                if(status) status.innerText = "🌑 Im Erdschatten: Blutmond!";
            } else {
                // Keep the moon white/gray, no turning back to default too early
                moon.setAttribute('fill', '#ddd');
                if(status) {
                    if (x < 220) status.innerText = "☀️ Tagseite (Sonne beleuchtet den Mond)";
                    else status.innerText = "🌙 Mond außerhalb des Schattens";
                }
            }
        }
        if (moonOrbiting) requestAnimationFrame(animate);
    }
    animate();
}

// 4. Reflection
function updateReflection() {
    const range = document.getElementById('reflectRange');
    if(!range) return;
    const angle = parseInt(range.value);
    const valDisp = document.getElementById('angleValue');
    if(valDisp) valDisp.innerText = angle;

    const rad = (90 - angle) * Math.PI / 180;
    const length = 160;
    
    const incident = document.getElementById('incidentRay');
    const reflected = document.getElementById('reflectedRay');
    
    if(incident) {
        const xIn = 200 - Math.cos(rad) * length;
        const yIn = 170 - Math.sin(rad) * length;
        incident.setAttribute('x1', xIn);
        incident.setAttribute('y1', yIn);
        incident.setAttribute('x2', 200);
        incident.setAttribute('y2', 170);
    }
    
    if(reflected) {
        const xRef = 200 + Math.cos(rad) * length;
        const yRef = 170 - Math.sin(rad) * length;
        reflected.setAttribute('x1', 200);
        reflected.setAttribute('y1', 170);
        reflected.setAttribute('x2', xRef);
        reflected.setAttribute('y2', yRef);
    }
}

// 5. Diffraction (Slit)
let slitState = 0;
function narrowSlit() {
    const wallTop = document.getElementById('wallTop');
    const wallBot = document.getElementById('wallBot');
    const wavesBroad = document.getElementById('wavesBroad');
    const wavesNarrow = document.getElementById('wavesNarrow');
    const beam = document.getElementById('photonBeam');
    const txt = document.getElementById('slitText');
    if(!wallTop || !wallBot) return;

    slitState = (slitState + 1) % 2;

    if (slitState === 0) {
        wallTop.setAttribute('height', '60');
        wallBot.setAttribute('y', '140');
        wallBot.setAttribute('height', '60');
        if(wavesBroad) wavesBroad.style.display = "block";
        if(wavesNarrow) wavesNarrow.style.display = "none";
        if(beam) beam.style.display = "none";
        if(txt) txt.innerText = "Breiter Spalt: Das Licht geht fast nur als gerade Welle durch.";
    } else {
        wallTop.setAttribute('height', '95');
        wallBot.setAttribute('y', '105');
        wallBot.setAttribute('height', '95');
        if(wavesBroad) wavesBroad.style.display = "none";
        if(wavesNarrow) wavesNarrow.style.display = "block";
        if(beam) beam.style.display = "block";
        if(txt) txt.innerText = "Sehr enger Spalt: Starke Beugung! Huygens' neue Kreiswellen entstehen.";
    }
}
