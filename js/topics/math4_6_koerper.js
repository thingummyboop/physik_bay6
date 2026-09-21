function ensureKoerperFeedback(host) {
    if (!host) return null;
    let feedback = document.getElementById('koerper_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'koerper_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        host.appendChild(feedback);
    }
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    return feedback;
}

function bindKoerperHintExercise() {
    const input = document.getElementById('cyl_v');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    if (!button) return;

    const feedback = ensureKoerperFeedback(zone);
    input.setAttribute('aria-describedby', 'koerper_feedback');
    input.setAttribute('aria-label', 'Volumen in Kubikzentimetern bei Grundfläche 20 Quadratzentimeter und Höhe 10 Zentimeter');
    input.oninput=()=>feedback.textContent='';
    let check = zone.querySelector('[data-check-cylinder]');
    if (!check) {
        check = document.createElement('button');
        check.type = 'button';
        check.dataset.checkCylinder = 'true';
        check.textContent = 'Ergebnis prüfen';
        check.style.minHeight = '44px';
        button.after(check);
    }
    const checkAnswer = () => {
        if (!input.value.trim() || !Number.isFinite(Number(input.value))) {
            feedback.textContent = 'Trage zuerst ein Volumen ein. Für diese Aufgabe gelten G = 20 cm² und h = 10 cm.';
        } else {
            feedback.textContent = Number(input.value) === 200
                ? 'Richtig: V = 20 cm² · 10 cm = 200 cm³.'
                : 'Noch nicht: Multipliziere die Grundfläche 20 cm² mit der Höhe 10 cm. Prüfe auch die Einheit cm³.';
        }
    };
    check.onclick = checkAnswer;

    button.onclick = (event) => {
        event.preventDefault();
        if (feedback) feedback.innerText = 'Tipp: Für den Zylinder gilt V = G × h. Die Grundfläche G ist die Kreisfläche π·r².';
    };

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkAnswer();
            }
        });
    }
}

function topicInit() {
    const external=document.getElementById('ggb-koerper'),disclosure=external?.closest('details');
    if (external && external.dataset.toggleBound!=='true') {
        external.dataset.toggleBound='true';
        const loadExplorer=()=>{
        if(disclosure&&!disclosure.open||external.dataset.bound==='true')return;
        external.dataset.bound='true';
        if (typeof GGBApplet !== 'undefined') {
            var params = {
                appName: '3d',
                width: Math.max(200, external.clientWidth),
                height: 500,
                showToolBar: true,
                showAlgebraInput: false,
                showMenuBar: false,
            };
            var applet = new GGBApplet(params, true);
            applet.inject('ggb-koerper');
        } else {
            document.getElementById('ggb-koerper').innerHTML = '<p style="padding: 20px; color: red;">GeoGebra konnte nicht geladen werden. Bitte lade die Seite neu.</p>';
        }
        };
        if(disclosure)disclosure.addEventListener('toggle',loadExplorer);loadExplorer();
    }

    bindKoerperHintExercise();
    bindRoundInverse();bindRoundMass();
}

function roundNumber(value,digits=2){return value.toLocaleString('de-AT',{maximumFractionDigits:digits});}
function roundShapeSVG(cone,staticFigure=false){
 const shape=cone?'<path d="M65 230L180 45L295 230" fill="#dbeafe" stroke="#174d83" stroke-width="3"/><ellipse cx="180" cy="230" rx="115" ry="28" fill="#dbeafe" stroke="#174d83" stroke-width="3"/><path d="M180 45V230" stroke="#172b4d" stroke-width="2" stroke-dasharray="6 5"/><text x="194" y="142">h</text><text x="275" y="124">s</text><path d="M267 128L249 157" stroke="#172b4d" fill="none"/>':'<path d="M65 75V230M295 75V230" stroke="#174d83" stroke-width="3"/><path d="M65 75V230Q180 286 295 230V75" fill="#dbeafe"/><ellipse cx="180" cy="230" rx="115" ry="28" fill="#dbeafe" stroke="#174d83" stroke-width="3"/><ellipse cx="180" cy="75" rx="115" ry="28" fill="#dbeafe" stroke="#174d83" stroke-width="3"/><path d="M65 75V230M295 75V230" stroke="#174d83" stroke-width="3"/><path d="M325 75V230M319 75H331M319 230H331" stroke="#172b4d" stroke-width="2"/><text x="337" y="159">h</text>';
 return `<svg ${staticFigure?'data-worksheet-static="true"':''} viewBox="0 0 380 310" role="img" aria-label="${cone?'Gerader Kreiskegel mit Radius r, senkrechter Höhe h und Mantellinie s':'Gerader Kreiszylinder mit Radius r und senkrechter Höhe h'}; schematische Schrägansicht"><rect width="380" height="310" fill="white"/><g font-size="26" fill="#172b4d">${shape}<path d="M180 230H295" stroke="#9a4800" stroke-width="3"/><circle cx="180" cy="230" r="4" fill="#172b4d"/><path d="M237 235V258" stroke="#172b4d" fill="none"/><text x="230" y="287">r</text></g></svg>`;
}
function roundInverseModel(mode,index){
 const triples=[[3,4,5],[5,12,13],[8,15,17]],base=triples[index%3],factor=index<3?1:2,[r,h,s]=base.map(x=>factor*x),cone=mode.startsWith('cone'),v=r*r*h/(cone?3:1),o=cone?r*r+r*s:2*r*r+2*r*h,kind=mode.endsWith('_r')?'r':'h';
 let given,steps;
 if(mode.endsWith('_surface')){given='r = '+r+' cm; O = '+o+'π cm² (einschließlich Grundfläche'+(cone?'':' und Deckel')+').';steps=cone?['s = O/(πr) − r = '+o+'/'+r+' − '+r+' = '+s+' cm.','h = √(s² − r²) = √('+s+'² − '+r+'²) = '+h+' cm.','Probe: O = π · '+r+'² + π · '+r+' · '+s+' = '+o+'π cm².']:['h = (O − 2πr²)/(2πr) = ('+o+' − '+(2*r*r)+')/'+(2*r)+' = '+h+' cm.','Probe: O = 2π · '+r+'² + 2π · '+r+' · '+h+' = '+o+'π cm².'];}
 else if(kind==='h'){given='r = '+r+' cm; V = '+v+'π cm³.';steps=['h = '+(cone?'3V':'V')+'/(πr²) = '+(cone?3*v:v)+'/'+(r*r)+' = '+h+' cm.','Probe: V = π · '+r+'² · '+h+(cone?' / 3':'')+' = '+v+'π cm³.'];}
 else{given='h = '+h+' cm; V = '+v+'π cm³.';steps=['r = √('+(cone?'3V':'V')+'/(πh)) = √('+(cone?3*v:v)+'/'+h+') = '+r+' cm.','Probe: V = π · '+r+'² · '+h+(cone?' / 3':'')+' = '+v+'π cm³.'];}
 return {r,h,s,cone,v,o,kind,given,steps,answer:kind==='r'?r:h};
}
function roundMassModel(shape,r,h,material,target){const densities=[.5,1.2,2.7],density=densities[material],volumeCoefficient=r*r*h/(shape==='cone'?3:1),massCoefficient=Math.round(density*volumeCoefficient*1e6)/1e6,volume=volumeCoefficient*Math.PI,mass=massCoefficient*Math.PI;return {shape,r,h,density,volumeCoefficient,massCoefficient,volume,mass,target,answer:target==='mass'?mass:density,unit:target==='mass'?'g':'g/cm³'};}
function roundReadAnswer(input){const raw=input.value.trim(),v=/^\d+(?:[.,]\d+)?$/.test(raw)?Number(raw.replace(',','.')):NaN;return Number.isFinite(v)&&v>0&&v<=10000?v:null;}
function bindRoundInverse(){
 const lab=document.querySelector('[data-round-inverse]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';const mode=lab.querySelector('#round-mode'),preset=lab.querySelector('#round-case'),input=lab.querySelector('#round-answer'),out=lab.querySelector('#round-status'),steps=lab.querySelector('[data-round-steps]');
 const model=()=>roundInverseModel(mode.value,Number(preset.value)),clear=()=>{out.textContent='';steps.replaceChildren();input.removeAttribute('aria-invalid');};
 const draw=()=>{clear();input.value='';const m=model();lab.querySelector('[data-round-given]').textContent=(m.cone?'Gerader Kegel. ':'Geschlossener gerader Zylinder. ')+m.given;lab.querySelector('[data-round-question]').textContent='Gesucht: '+(m.kind==='r'?'Radius r':'senkrechte Höhe h')+' in cm.';lab.querySelector('[data-round-drawing]').innerHTML=roundShapeSVG(m.cone);};
 const show=()=>{steps.replaceChildren(...model().steps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));};
 const check=()=>{clear();const v=roundReadAnswer(input);if(v===null){input.setAttribute('aria-invalid','true');out.textContent='Gib eine positive Länge bis 10 000 cm als Zahl ein.';input.focus();return;}out.textContent=(Math.abs(v-model().answer)<1e-9?'Richtig. ':'Noch nicht richtig. ')+'Stelle nach der gesuchten Länge um und prüfe mit der ursprünglichen Formel.';show();out.focus();};
 mode.onchange=draw;preset.onchange=draw;input.oninput=clear;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};lab.querySelector('[data-round-check]').onclick=check;lab.querySelector('[data-round-show]').onclick=()=>{clear();show();out.textContent='Vergleiche Umformung und Probe.';out.focus();};lab.querySelector('[data-round-reset]').onclick=()=>{mode.value='cylinder_h';preset.value='0';draw();mode.focus();};draw();
}
function bindRoundMass(){
 const lab=document.querySelector('[data-round-mass]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';const controls=['shape','r','h','material','target'].map(k=>lab.querySelector('#mass-'+k)),input=lab.querySelector('#mass-answer'),out=lab.querySelector('#mass-status'),steps=lab.querySelector('[data-mass-steps]');
 const model=()=>roundMassModel(controls[0].value,Number(controls[1].value),Number(controls[2].value),Number(controls[3].value),controls[4].value),clear=()=>{out.textContent='';steps.replaceChildren();input.removeAttribute('aria-invalid');};
 const draw=()=>{clear();input.value='';const m=model();lab.querySelector('[data-mass-given]').textContent='Massiver '+(m.shape==='cone'?'gerader Kegel':'gerader Zylinder')+': r = '+m.r+' cm, h = '+m.h+' cm. '+(m.target==='mass'?'Gegebene Modelldichte ρ = '+roundNumber(m.density)+' g/cm³.':'Gegebene exakte Masse m = '+roundNumber(m.massCoefficient,6)+'π g.');lab.querySelector('[data-mass-question]').textContent='Berechne '+(m.target==='mass'?'die Masse in g':'die Dichte in g/cm³')+'. Runde nur das Endergebnis auf zwei Nachkommastellen.';};
 const show=()=>{const m=model(),lines=['V = π · '+m.r+'² · '+m.h+(m.shape==='cone'?' / 3':'')+' = '+m.volumeCoefficient+'π cm³.'];lines.push(m.target==='mass'?'m = ρ · V = '+roundNumber(m.density)+' · '+m.volumeCoefficient+'π = '+roundNumber(m.massCoefficient,6)+'π g ≈ '+m.mass.toLocaleString('de-AT',{minimumFractionDigits:2,maximumFractionDigits:2})+' g.':'ρ = m/V = '+roundNumber(m.massCoefficient,6)+'π / ('+m.volumeCoefficient+'π) = '+roundNumber(m.density)+' g/cm³.');lines.push('Verwendet wird das Materialvolumen eines homogenen massiven Körpers; Hohlräume sind in diesem Modell nicht enthalten.');steps.replaceChildren(...lines.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));};
 const check=()=>{clear();const v=roundReadAnswer(input);if(v===null){input.setAttribute('aria-invalid','true');out.textContent='Gib einen positiven Zahlenwert bis 10 000 ein; die gesuchte Einheit steht über dem Feld.';input.focus();return;}out.textContent=(Math.abs(v-model().answer)<=.00500000001?'Richtig auf zwei Nachkommastellen. ':'Noch nicht richtig. ')+'Berechne zuerst das Volumen und verwende passende Einheiten.';show();out.focus();};
 controls.forEach(c=>c.onchange=draw);input.oninput=clear;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};lab.querySelector('[data-mass-check]').onclick=check;lab.querySelector('[data-mass-show]').onclick=()=>{clear();show();out.textContent='Vergleiche Volumen und Masse oder Dichte.';out.focus();};lab.querySelector('[data-mass-reset]').onclick=()=>{['cylinder','3','6','1','mass'].forEach((v,i)=>controls[i].value=v);draw();controls[0].focus();};draw();
}
