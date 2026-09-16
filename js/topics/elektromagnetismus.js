// Logic for elektromagnetismus topic
let energy = 0;
let isDraining = false;
let relayClosed = false;
let drainInterval = null;
let electromagnetismA11yInit = false;

function ensureLiveRegion(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    return el;
}

function enhanceElectromagnetismAccessibility() {
    if (electromagnetismA11yInit) return;

    const currentRange = document.getElementById('currentRange');
    if (currentRange) {
        currentRange.setAttribute('aria-label', 'Stromstärke-Regler');
        currentRange.setAttribute('aria-describedby', document.getElementById('currentFieldStatus') ? 'currentFieldStatus' : 'materialText');
    }

    const transRange = document.getElementById('transRange');
    if (transRange) {
        transRange.setAttribute('aria-label', 'Sekundärspulen-Regler');
        transRange.setAttribute('aria-describedby', 'transText voltValSec');
    }

    ['materialText', 'directionText', 'relayStatus', 'transText', 'voltValSec'].forEach(ensureLiveRegion);

    const relayBtn = document.getElementById('relayBtn');
    if (relayBtn) {
        relayBtn.setAttribute('aria-pressed', String(relayClosed));
    }

    electromagnetismA11yInit = true;
}

function topicInit() {
    initMagnetPoles();
    initInductionLab();
    initMotorLab();
    initRelayLab();
    if (drainInterval) {
        clearInterval(drainInterval);
        drainInterval = null;
    }
    isDraining = false;
    energy = 0;

    const beam = document.getElementById('lightBeam');
    const enDisp = document.getElementById('energyLevel');
    if (beam) {
        beam.style.opacity = '0';
        beam.setAttribute('aria-label', 'Lichtstärke 0 Prozent');
    }
    if (enDisp) enDisp.innerText = '0';

    enhanceElectromagnetismAccessibility();
    updateMagnetField(30);
    updateTransformer(5);
    updateRelay(false);
}

function initMagnetPoles() {
    const zone = document.querySelector('[data-magnet-poles]');
    if (!zone || zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const get = name => zone.querySelector('[data-magnet-' + name + ']');
    let reversedA = false, reversedB = false;
    const render = () => {
        const aLeft = reversedA ? 'N' : 'S', bLeft = reversedB ? 'N' : 'S';
        const opposite = pole => pole === 'N' ? 'S' : 'N';
        const aRight = opposite(aLeft), bRight = opposite(bLeft);
        for (const [name,pole] of [['a-left',aLeft],['a-right',aRight],['b-left',bLeft],['b-right',bRight]]) {
            get(name).setAttribute('fill',pole==='N'?'#b91c1c':'#1d4ed8');
            get(name+'-label').textContent=pole;
        }
        const attract = aRight !== bLeft;
        get('a-arrow').textContent = attract ? '→' : '←';
        get('b-arrow').textContent = attract ? '←' : '→';
        get('a').setAttribute('aria-pressed',String(reversedA));
        get('b').setAttribute('aria-pressed',String(reversedB));
        const description = 'Einander zugewandt: '+aRight+' bei Magnet A und '+bLeft+' bei Magnet B. '+
            (attract?'Ungleichnamige Pole: Die Magnete ziehen einander an.':'Gleichnamige Pole: Die Magnete stoßen einander ab.');
        get('status').textContent = description;
        get('diagram').setAttribute('aria-label',description);
    };
    get('a').addEventListener('click',()=>{reversedA=!reversedA;render();});
    get('b').addEventListener('click',()=>{reversedB=!reversedB;render();});
    get('reset').addEventListener('click',()=>{reversedA=false;reversedB=false;render();});
    render();
}

function updateMagnetField(val) {
    const lines = document.getElementById('fieldLines')?.children;
    const arrow = document.getElementById('currentArrow');
    const currentRange = document.getElementById('currentRange');
    if(!arrow || !lines) return;
    
    const numericVal = parseInt(val, 10) || 0;
    const arrowLength = 10 + (numericVal * 0.4);
    arrow.setAttribute('d', `M ${200 - arrowLength/2} 75 L ${200 + arrowLength/2} 75`);
    arrow.style.opacity = numericVal === 0 ? '0' : '1';
    const status = document.getElementById('currentFieldStatus');
    if (status) status.textContent = numericVal === 0 ? 'Stromstufe 0: kein durch diesen Leiter erzeugtes Magnetfeld. Andere Magnetfelder sind nicht dargestellt.' : `Relative Stromstufe ${numericVal}: stärkere Stufe bedeutet eine stärkere Feldwirkung im Modell; keine Messung in Ampere oder Tesla.`;
    
    for(let line of lines) {
        line.style.opacity = numericVal === 0 ? 0 : (numericVal / 150) + 0.1;
        line.style.strokeWidth = 1 + (numericVal / 25);
    }

    if (currentRange) {
        currentRange.setAttribute('aria-valuetext', `Relative Stromstufe ${numericVal}; keine Ampere-Messung`);
    }
}

function setMaterial(type) {
    const core = document.getElementById('materialCore');
    const field = document.getElementById('spuleField');
    const txt = document.getElementById('materialText');
    if(!core || !field) return;
    
    if(type === 'none') {
        core.setAttribute('fill', 'transparent');
        field.style.opacity = "0.2";
        if(txt) txt.innerText = "Kern: Luft";
    } else if(type === 'wood') {
        core.setAttribute('fill', '#deb887');
        field.style.opacity = "0.2";
        if(txt) txt.innerText = "Kern: Holz";
    } else if(type === 'iron') {
        core.setAttribute('fill', '#718096');
        field.style.opacity = "1";
        if(txt) txt.innerText = "Kern: Weicheisen; stärkere Feldwirkung im Modell";
    }

    core.setAttribute('aria-label', `Spulenkern-Material: ${txt ? txt.innerText : type}`);
}

let isUp = true;
function changeDirection() {
    const arrow = document.getElementById('forceArrow');
    const txt = document.getElementById('directionText');
    if(!arrow) return;
    isUp = !isUp;
    const symbol = document.getElementById("currentDirectionSymbol");
    if(symbol){symbol.setAttribute("d",isUp?"M200 90 h0":"M194 84 L206 96 M194 96 L206 84");symbol.setAttribute("stroke-width",isUp?"7":"3");}
    if(isUp) {
        arrow.setAttribute('d', 'M 200 75 L 200 20');
        if(txt) txt.textContent = "Technischer Strom aus der Ebene (Punkt); Magnetfeld nach rechts; Kraft nach oben.";
    } else {
        arrow.setAttribute('d', 'M 200 105 L 200 160');
        if(txt) txt.textContent = "Technischer Strom in die Ebene (Kreuz); Magnetfeld nach rechts; Kraft nach unten.";
    }
    arrow.setAttribute('aria-label', txt ? txt.textContent : (isUp ? 'Kraft nach oben' : 'Kraft nach unten'));
}

function shakeFlashlight() {
    const fl = document.getElementById('flashlight');
    const beam = document.getElementById('lightBeam');
    const enDisp = document.getElementById('energyLevel');
    if(!fl || !beam) return;

    fl.classList.add('shaking');
    energy = Math.min(energy + 15, 100);
    beam.style.opacity = energy / 100;
    if(enDisp) {
        enDisp.innerText = energy;
        enDisp.setAttribute('role', 'status');
        enDisp.setAttribute('aria-live', 'polite');
        enDisp.setAttribute('aria-atomic', 'true');
    }
    beam.setAttribute('aria-label', `Lichtstärke ${Math.floor(energy)} Prozent`);
    setTimeout(() => fl.classList.remove('shaking'), 150);
    
    if(!isDraining) {
        isDraining = true;
        drainInterval = setInterval(() => {
            energy = Math.max(energy - 2, 0);
            beam.style.opacity = energy / 100;
            beam.setAttribute('aria-label', `Lichtstärke ${Math.floor(energy)} Prozent`);
            if(enDisp) enDisp.innerText = Math.floor(energy);
            if(energy === 0) { 
                clearInterval(drainInterval);
                drainInterval = null;
                isDraining = false; 
            }
        }, 150);
    }
}

function updateTransformer(val) {
    const coil2 = document.getElementById('coil2');
    const txt = document.getElementById('transText');
    const flux = document.getElementById('magneticFlux');
    const fluxField = document.getElementById('fluxField');
    const voltBarSec = document.getElementById('voltBarSec');
    const voltValSec = document.getElementById('voltValSec');
    const transRange = document.getElementById('transRange');
    
    if(!coil2) return;
    
    const windings1 = 5; 
    const windings2 = Number(val);
    if (!Number.isInteger(windings2) || windings2 < 1 || windings2 > 10) return;
    const u1 = 230;
    const u2 = Math.round(u1 * (windings2 / windings1));
    
    // The unloaded secondary shows turns without depicting a load current.
    coil2.innerHTML = '';
    for(let i=0; i < windings2; i++) {
        const y = 60 + (i * 100 / (windings2 + 1 || 1));
        
        // Wire piece
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M 285 ${y} L 315 ${y+5}`);
        path.setAttribute("stroke", "#ED8936");
        path.setAttribute("stroke-width", "6");
        coil2.appendChild(path);
        

    }
    
    // Update Secondary Voltage Bar
    if(voltBarSec) {
        const h = windings2 * 10;
        voltBarSec.setAttribute('height', h);
        voltBarSec.setAttribute('y', 160 - h);
    }
    if(voltValSec) voltValSec.textContent = u2 + "V";
    const turnsLabel = document.querySelector('[data-transformer-turns]');
    if (turnsLabel) turnsLabel.textContent = String(windings2);
    if (transRange) {
        transRange.value = String(windings2);
        transRange.setAttribute('aria-valuetext', `${windings2} Windungen sekundär, etwa ${u2} Volt`);
    }
    
    // Magnetic Flux Intensity Visualization
    if(flux) flux.style.strokeWidth = 3;
    if(fluxField) fluxField.setAttribute('opacity', '0.5');

    // Update Description Text
    if(windings2 < windings1) {
        if(txt) {
            txt.textContent = `Abwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "inherit";
        }
    } else if(windings2 > windings1) {
        if(txt) {
            txt.textContent = `Aufwärtstransformator (${u1}V ➔ ${u2}V)`;
            txt.style.color = "inherit";
        }
    } else {
        if(txt) {
            txt.textContent = `1:1 Übertragung (${u1}V ➔ ${u2}V)`;
            txt.style.color = "inherit";
        }
    }
}

function updateRelay(active) {
    const lab = document.querySelector('[data-relay-lab]');
    if (lab) {
        relayClosed = !!active;
        lab.dataset.control = String(relayClosed);
        renderRelayLab();
        return;
    }
    const armature = document.getElementById('relayArmature');
    const contact = document.getElementById('relayContact');
    const bulb = document.getElementById('relayBulb');
    const status = document.getElementById('relayStatus');
    const btn = document.getElementById('relayBtn');
    
    if(!armature || !contact || !bulb) return;
    
    if(active) {
        armature.setAttribute('transform', 'rotate(10, 150, 50)');
        contact.setAttribute('stroke', '#4CAF50');
        bulb.setAttribute('fill', '#FFF59D');
        if(status) status.innerText = "Steuerstrom AN: Magnet zieht an, Kreis geschlossen!";
        if(btn) btn.innerText = "Steuerstrom AUSSCHALTEN 🛑";
    } else {
        armature.setAttribute('transform', 'rotate(0, 150, 50)');
        contact.setAttribute('stroke', '#718096');
        bulb.setAttribute('fill', '#444');
        if(status) status.innerText = "Steuerstrom AUS: Feder zieht Anker zurück.";
        if(btn) btn.innerText = "Steuerstrom EINSCHALTEN ⚡";
    }
    relayClosed = active;
    if (btn) btn.setAttribute('aria-pressed', String(relayClosed));
    bulb.setAttribute('aria-label', relayClosed ? 'Lampe an' : 'Lampe aus');
}

function toggleRelay() {
    updateRelay(!relayClosed);
}

function sciverseRelayState(control, supply, lamp) {
    if ([control,supply,lamp].some(v=>typeof v!=='boolean')) return null;
    return {control, supply, lamp, coil:control, contact:control, loadClosed:control&&lamp, lit:control&&supply&&lamp};
}

function sciverseRelaySvg(control, supply, lamp, paper=false) {
    const s=sciverseRelayState(control,supply,lamp);if(!s)return '';
    const colors={control:s.coil?'#0369a1':'#475569',load:s.lit?'#0369a1':'#475569'};
    const id=name=>paper?'':` id="${name}"`;
    const wire=(kind,x1,y1,x2,y2,extra='')=>`<line data-relay-wire="${kind}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors[kind]}" stroke-width="4" ${extra}/>`;
    let svg=`<svg data-relay-svg${paper?' data-worksheet-static="true"':''} viewBox="0 0 360 500" role="img" aria-label="Zwei elektrisch getrennte Stromkreise. Steuerstrom ${s.coil?'ein':'aus'}, Relaiskontakt ${s.contact?'geschlossen':'offen'}, Quelle Q2 ${s.supply?'ein':'aus'}, Lampe ${s.lamp?(s.lit?'leuchtet':'aus'):'entfernt'}. Die gestrichelte Verbindung überträgt nur eine mechanische Bewegung." xmlns="http://www.w3.org/2000/svg" style="background:white;font-family:Arial,sans-serif"><text x="16" y="32" font-size="28" fill="#172033">Steuerkreis</text><text x="16" y="280" font-size="28" fill="#172033">Lastkreis</text>`;
    for(const a of [[50,70,125,70],[205,70,310,70],[310,70,310,190],[310,190,230,190],[150,190,50,190],[50,190,50,144],[50,128,50,70]])svg+=wire('control',...a);
    svg+=wire('control',125,70,s.control?205:190,s.control?70:45,'data-relay-control-switch');
    svg+=`<circle cx="125" cy="70" r="5" fill="#172033"/><circle cx="205" cy="70" r="5" fill="#172033"/><g data-relay-source="control"><path d="M33 128H67M40 144H60" stroke="#172033" stroke-width="4"/><text x="8" y="123" font-size="28" fill="#172033">Q1</text></g><rect data-relay-coil x="150" y="170" width="80" height="40" fill="${s.coil?'#dbeafe':'white'}" stroke="${colors.control}" stroke-width="4"/><text x="190" y="198" text-anchor="middle" font-size="28" fill="#172033">Spule</text>`;
    // A dashed mechanical linkage is deliberately not a conducting wire.
    svg+=`<g${id('relayArmature')}><path data-relay-mechanical d="M190 210V290L${s.contact?170:161.5} ${s.contact?330:317.5}" fill="none" stroke="#92400e" stroke-width="3" stroke-dasharray="7 5"/></g>`;
    for(const a of [[50,330,130,330],[210,330,310,330],[310,330,310,388],[310,432,310,470],[310,470,50,470],[50,470,50,420],[50,404,50,330]])svg+=wire('load',...a);
    svg+=wire('load',130,330,s.contact?210:193,s.contact?330:305,`${id('relayContact')} data-relay-contact`);
    svg+=`<circle cx="130" cy="330" r="5" fill="#172033"/><circle cx="210" cy="330" r="5" fill="#172033"/><g data-relay-source="load" data-enabled="${s.supply}"><path d="M33 404H67M40 420H60" stroke="#172033" stroke-width="4"/><text x="8" y="399" font-size="28" fill="#172033">Q2</text>${s.supply?'':'<path d="M31 393L69 432" stroke="#b91c1c" stroke-width="3"/>'}</g><circle${id('relayBulb')} data-relay-lamp data-present="${s.lamp}" data-lit="${s.lit}" cx="310" cy="410" r="22" fill="${s.lit?'#fde047':'white'}" stroke="#172033" stroke-width="3"${s.lamp?'':' stroke-dasharray="4 4"'}/>`;
    if(s.lamp)svg+='<path d="M295 395L325 425M325 395L295 425" stroke="#172033" stroke-width="3"/>';
    else svg+='<circle cx="310" cy="388" r="4" fill="#172033"/><circle cx="310" cy="432" r="4" fill="#172033"/>';
    return svg+'</svg>';
}

function renderRelayLab() {
    const lab=document.querySelector('[data-relay-lab]');if(!lab)return;
    const s=sciverseRelayState(lab.dataset.control==='true',lab.querySelector('[data-relay-supply]').value==='on',lab.querySelector('[data-relay-lamp-select]').value==='present');
    lab.querySelector('[data-relay-plot]').innerHTML=sciverseRelaySvg(s.control,s.supply,s.lamp);
    const btn=lab.querySelector('#relayBtn');btn.textContent=s.control?'Steuerkreis öffnen':'Steuerkreis schließen';btn.setAttribute('aria-pressed',String(s.control));
    const reason=!s.contact?'Der Relaiskontakt ist offen.':!s.lamp?'Die entfernte Lampe unterbricht den Lastkreis.':!s.supply?'Der leitende Lastkreis ist geschlossen, aber Q2 liefert keine Spannung.':'Q2 versorgt den geschlossenen Lastkreis mit eingesetzter Lampe.';
    lab.querySelector('#relayStatus').textContent='Steuerstrom '+(s.coil?'ein':'aus')+'. Relaiskontakt '+(s.contact?'geschlossen':'offen')+'. Lampe '+(s.lit?'leuchtet.':'leuchtet nicht.')+' '+reason+' Die beiden Stromkreise sind elektrisch getrennt.';
    lab.querySelector('[data-relay-feedback]').textContent='';
}

function initRelayLab() {
    const lab=document.querySelector('[data-relay-lab]');if(!lab||lab.dataset.bound)return;lab.dataset.bound='true';
    if(!lab.dataset.control)lab.dataset.control='false';
    for(const el of lab.querySelectorAll('select'))el.addEventListener('change',renderRelayLab);
    for(const btn of lab.querySelectorAll('[data-relay-verdict]'))btn.addEventListener('click',()=>{
        const s=sciverseRelayState(lab.dataset.control==='true',lab.querySelector('[data-relay-supply]').value==='on',lab.querySelector('[data-relay-lamp-select]').value==='present'),expected=!s.contact?0:s.lit?2:1;
        const text=!s.contact?'Ohne Steuerstrom bleibt der Schließerkontakt offen.':s.lit?'Der Steuerstrom schließt den Kontakt; die Energie für die Lampe kommt aus Q2.':'Die Spule schaltet den Kontakt auch ohne leuchtende Lampe. '+(!s.lamp?'Eine entfernte Lampe unterbricht ihren eigenen Stromkreis.':'Ohne Spannung von Q2 fließt dort kein Laststrom.');
        lab.querySelector('[data-relay-feedback]').textContent=(Number(btn.dataset.relayVerdict)===expected?'Richtig: ':'Noch nicht: ')+text;
    });
    lab.querySelector('[data-relay-reset]').addEventListener('click',()=>{lab.querySelector('[data-relay-supply]').value='on';lab.querySelector('[data-relay-lamp-select]').value='present';updateRelay(false);lab.querySelector('#relayBtn').focus();});
    renderRelayLab();
}

// Qualitative induction: signs are relative to one fixed winding/terminal convention.
function inductionState(pole, motion, speed, circuit) {
    if (!['N','S'].includes(pole) || !['rest','in','out'].includes(motion) || !['slow','fast'].includes(speed) || !['open','closed'].includes(circuit)) return null;
    const sign = motion === 'rest' ? 0 : (pole === 'N' ? 1 : -1) * (motion === 'in' ? 1 : -1);
    return {sign, level: sign * (speed === 'fast' ? 2 : 1), current: sign !== 0 && circuit === 'closed'};
}

function inductionSvg(pole, motion, speed, circuit) {
    const state = inductionState(pole,motion,speed,circuit); if (!state) return '';
    const toward = motion === 'in', left = pole === 'N' ? 'S' : 'N', x = 180 + 50 * state.level;
    const colors = {N:'#b91c1c',S:'#1d4ed8'};
    let svg = '<svg data-induction-svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schema: '+pole+'-Pol zur Spule. '+(motion==='rest'?'Magnet ruht.':toward?'Magnet bewegt sich zur Spule.':'Magnet bewegt sich von der Spule weg.')+' Induzierte Spannung '+(state.sign===0?'null':state.sign>0?'positiv':'negativ')+'." style="background:white;font-family:Arial,sans-serif;color:#172033"><text x="26" y="25" font-size="17" fill="#172033">Magnet</text><text x="232" y="25" font-size="17" fill="#172033">Spule</text><rect x="25" y="50" width="55" height="48" fill="'+colors[left]+'"/><rect x="80" y="50" width="55" height="48" fill="'+colors[pole]+'"/><text data-induction-left x="52" y="82" text-anchor="middle" font-size="23" fill="white">'+left+'</text><text data-induction-pole x="108" y="82" text-anchor="middle" font-size="23" fill="white">'+pole+'</text>';
    for(let i=0;i<6;i++)svg+='<ellipse cx="'+(234+i*15)+'" cy="74" rx="12" ry="36" fill="none" stroke="#92400e" stroke-width="3"/>';
    if(state.sign)svg+='<path data-induction-motion d="'+(toward?'M151 74H210l-9 -6m9 6l-9 6':'M210 74H151l9 -6m-9 6l9 6')+'" stroke="#172033" stroke-width="3" fill="none"/>';
    svg+='<text x="180" y="142" text-anchor="middle" font-size="16" fill="#172033">'+(motion==='rest'?'Ruhe: keine Flussänderung':speed==='fast'?'Gleicher Weg, schneller bewegt':'Gleicher Weg, langsam bewegt')+'</text><text x="180" y="176" text-anchor="middle" font-size="17" fill="#172033">Qualitativer Spannungsausschlag</text><path d="M60 220H300" stroke="#172033" fill="none"/>';
    for(const [pos,label]of [[80,'−'],[180,'0'],[280,'+']])svg+='<path d="M'+pos+' 212V228" stroke="#172033"/><text x="'+pos+'" y="253" text-anchor="middle" font-size="21" fill="#172033">'+label+'</text>';
    svg+='<path data-induction-pointer data-sign="'+state.sign+'" data-level="'+state.level+'" d="M'+x+' 195V216l-6 -9m6 9l6 -9" stroke="#146885" stroke-width="4" fill="none"/><text x="180" y="290" text-anchor="middle" font-size="16" fill="#172033">Lastkreis '+(circuit==='open'?'offen':'geschlossen')+': '+(state.current?'Strom möglich':'kein Laststrom')+'</text></svg>';
    return svg;
}

function initInductionLab() {
    const lab=document.querySelector('[data-induction-lab]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';
    const pole=lab.querySelector('[data-induction-pole-select]'),motion=lab.querySelector('[data-induction-motion-select]'),speed=lab.querySelector('[data-induction-speed]'),circuit=lab.querySelector('[data-induction-circuit]'),feedback=lab.querySelector('[data-induction-feedback]');
    const draw=()=>{
        const s=inductionState(pole.value,motion.value,speed.value,circuit.value); if(!s)return;
        const text=s.sign===0?'Keine induzierte Spannung: Magnet und Spule ruhen; das Feld bleibt zeitlich unverändert.':(s.sign>0?'Positive':'Negative')+' induzierte Spannung in der festgelegten Anschlussrichtung. '+(speed.value==='fast'?'Schnellere Änderung auf demselben Weg: stärkerer Ausschlag.':'Langsamere Änderung auf demselben Weg: schwächerer Ausschlag.');
        lab.querySelector('[data-induction-status]').textContent=text+' '+(s.current?'Im geschlossenen Lastkreis ist während der Bewegung Strom möglich.':circuit.value==='open'?'Der Lastkreis ist offen; es fließt kein Laststrom.':'Ohne induzierte Spannung fließt hier auch im geschlossenen Lastkreis kein Strom.');
        lab.querySelector('[data-induction-plot]').innerHTML=inductionSvg(pole.value,motion.value,speed.value,circuit.value);feedback.textContent='';
    };
    for(const select of [pole,motion,speed,circuit])select.addEventListener('change',draw);
    for(const button of lab.querySelectorAll('[data-induction-verdict]'))button.addEventListener('click',()=>{
        const s=inductionState(pole.value,motion.value,speed.value,circuit.value),correct=Number(button.dataset.inductionVerdict)===s.sign;
        feedback.textContent=(correct?'Richtig: ':'Noch nicht: ')+(s.sign===0?'Ein unbewegter Magnet bei unverändertem Feld genügt nicht. Es braucht eine Flussänderung.':'In dieser Anschlussrichtung ist der Ausschlag '+(s.sign>0?'positiv':'negativ')+'. Nur die Bewegungsrichtung oder nur den Pol umzukehren, kehrt das Vorzeichen um. Beides zusammen lässt es gleich.')+' Spannung und Laststrom sind dabei verschiedene Größen.';
    });
    lab.querySelector('[data-induction-reset]').addEventListener('click',()=>{pole.value='N';motion.value='rest';speed.value='slow';circuit.value='open';draw();pole.focus();});draw();
}

function sciverseMotorState(angle, mode, polarity, power) {
    const degrees = Number(angle);
    if (!Number.isInteger(degrees) || degrees < 0 || degrees > 315 || degrees % 45 !== 0 || !['commutator','fixed'].includes(mode) || !['normal','reverse'].includes(polarity) || !['on','off'].includes(power)) return null;
    const radians = degrees * Math.PI / 180;
    const x = Math.abs(Math.cos(radians)) < 1e-10 ? 0 : Math.cos(radians);
    const y = Math.abs(Math.sin(radians)) < 1e-10 ? 0 : Math.sin(radians);
    const contactGap = mode === 'commutator' && x === 0;
    const currentA = power === 'off' || contactGap ? 0 : (polarity === 'normal' ? 1 : -1) * (mode === 'commutator' && x < 0 ? -1 : 1);
    // Current is along +/-z; B is +x. Thus F_y = I_z B_x and tau_z = r_x F_y.
    const torque = x === 0 || currentA === 0 ? 0 : x * currentA;
    return { degrees, mode, polarity, power, x, y, contactGap, currentA, currentB: -currentA, torque, direction: Math.sign(torque) };
}

function sciverseMotorSvg(angle, mode, polarity, power, paper = false) {
    const s = sciverseMotorState(angle, mode, polarity, power);
    if (!s) return '';
    const a = {x:180 + 60*s.x, y:140 - 60*s.y}, b = {x:180 - 60*s.x, y:140 + 60*s.y};
    const num = v => Number(v.toFixed(3));
    const describe = i => i === 0 ? 'kein Strom, keine magnetische Kraft' : i > 0 ? 'Strom aus der Ebene, Kraft nach oben' : 'Strom in die Ebene, Kraft nach unten';
    function side(p, current, name) {
        const x=num(p.x), y=num(p.y), start=num(y-current*20), end=num(y-current*55);
        const symbol = current > 0 ? `<circle cx="${x}" cy="${y}" r="5" fill="#172554"/>` : current < 0 ? `<path d="M${x-6} ${y-6}l12 12m0 -12l-12 12" stroke="#172554" stroke-width="3"/>` : '';
        const force = current === 0 ? '' : `<path data-motor-force="${name}" data-direction="${current}" d="M${x} ${start}V${end}m-7 ${current*10}l7 ${-current*10}l7 ${current*10}" fill="none" stroke="#166534" stroke-width="4" stroke-linejoin="round"/>`;
        return `<g data-motor-side="${name}" data-current="${current}"><circle cx="${x}" cy="${y}" r="14" fill="#fef3c7" stroke="#172554" stroke-width="2"/>${symbol}${force}<text x="${x+19}" y="${y+10}" font-size="28" fill="#172033">${name}</text></g>`;
    }
    return `<svg data-motor-svg${paper?' data-worksheet-static="true"':''} viewBox="0 0 360 280" role="img" aria-label="Stirnansicht einer drehbaren Spule bei ${s.degrees} Grad. Festes Magnetfeld nach rechts. Seite A: ${describe(s.currentA)}. Seite B: ${describe(s.currentB)}. Grüne Pfeile zeigen die Kräfte." xmlns="http://www.w3.org/2000/svg" style="background:white;font-family:Arial,sans-serif"><rect x="6" y="65" width="40" height="150" rx="4" fill="#b91c1c"/><rect x="314" y="65" width="40" height="150" rx="4" fill="#1d4ed8"/><text x="26" y="151" text-anchor="middle" font-size="28" fill="white">N</text><text x="334" y="151" text-anchor="middle" font-size="28" fill="white">S</text><path d="M75 24H285l-12 -7m12 7l-12 7" stroke="#475569" fill="none" stroke-width="3"/><circle cx="180" cy="140" r="60" fill="none" stroke="#64748b" stroke-dasharray="4 5"/><path data-motor-rotor d="M${num(a.x)} ${num(a.y)}L${num(b.x)} ${num(b.y)}" stroke="#92400e" stroke-width="5"/><circle cx="180" cy="140" r="7" fill="#475569"/>${side(a,s.currentA,'A')}${side(b,s.currentB,'B')}</svg>`;
}

function initMotorLab() {
    const lab = document.querySelector('[data-motor-lab]');
    if (!lab || lab.dataset.bound) return;
    lab.dataset.bound = 'true';
    const angle=lab.querySelector('[data-motor-angle]'),mode=lab.querySelector('[data-motor-mode]'),polarity=lab.querySelector('[data-motor-polarity]'),power=lab.querySelector('[data-motor-power]');
    const feedback=lab.querySelector('[data-motor-feedback]');
    const state=()=>sciverseMotorState(angle.value,mode.value,polarity.value,power.value);
    const currentText=i=>i===0?'kein Strom':i>0?'Strom aus der Ebene (Punkt), Kraft nach oben':'Strom in die Ebene (Kreuz), Kraft nach unten';
    function draw() {
        const s=state(); if(!s)return;
        angle.setAttribute('aria-valuetext',s.degrees+' Grad; von außen eingestellte Spulenstellung');
        lab.querySelector('[data-motor-angle-value]').textContent=s.degrees+'°';
        lab.querySelector('[data-motor-plot]').innerHTML=sciverseMotorSvg(s.degrees,s.mode,s.polarity,s.power);
        const explanation=s.power==='off'?'Versorgung aus.':s.contactGap?'Kontaktwechsel: Der Polwender unterbricht den Strom in dieser Stellung.':s.mode==='fixed'?'Feste Stromrichtung in der Spule; keine winkelabhängige Umpolung.':'Polwender aktiv: Nach jeder halben Umdrehung sind die Spulenanschlüsse vertauscht.';
        lab.querySelector('[data-motor-status]').textContent=s.degrees+'°. '+explanation+' Seite A: '+currentText(s.currentA)+'. Seite B: '+currentText(s.currentB)+'.';
        feedback.textContent='';
    }
    angle.addEventListener('input',draw);
    for(const el of [mode,polarity,power])el.addEventListener('change',draw);
    for(const btn of lab.querySelectorAll('[data-motor-step]'))btn.addEventListener('click',()=>{angle.value=String((Number(angle.value)+Number(btn.dataset.motorStep)+360)%360);draw();});
    for(const btn of lab.querySelectorAll('[data-motor-verdict]'))btn.addEventListener('click',()=>{
        const s=state();if(!s)return;
        const expected=s.direction===0?'keine antreibende Drehwirkung':s.direction>0?'Drehwirkung gegen den Uhrzeigersinn':'Drehwirkung im Uhrzeigersinn';
        const why=s.power==='off'?'Ohne Spulenstrom gibt es hier keine magnetischen Kräfte auf die Leiterseiten.':s.x===0?(s.contactGap?'Im dargestellten Kontaktwechsel ist der Strom unterbrochen. Ein bereits drehender Rotor kann durch seine Trägheit weiterlaufen; Start aus genau dieser Ruheposition gelingt nicht von selbst.':'Die beiden Kräfte wirken entlang derselben Linie durch die Achse. Trotz vorhandener Kräfte fehlt die Drehwirkung.'):'Die Kräfte greifen auf verschiedenen Seiten der Achse an und erzeugen gemeinsam diese Drehwirkung. Entgegengesetzte Kräfte bedeuten nicht automatisch keine Drehung.';
        feedback.textContent=(Number(btn.dataset.motorVerdict)===s.direction?'Richtig: ':'Noch nicht: ')+expected+'. '+why+' Die Anzeige beschreibt das antreibende Drehmoment, nicht die aktuelle Bewegung oder Drehzahl.';
    });
    lab.querySelector('[data-motor-reset]').addEventListener('click',()=>{angle.value='0';mode.value='commutator';polarity.value='normal';power.value='on';draw();angle.focus();});
    draw();
}
