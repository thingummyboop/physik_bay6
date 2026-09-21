const prismViews = {
    box: {
        title: "Schuhkarton als Prisma",
        desc: "Ein Quader mit markierter Grundfläche, Deckfläche, Seitenfläche und Höhe.",
        feedback: "Schuhkarton: vorne und hinten sind gleiche Rechtecke. Die Seitenflächen verbinden diese beiden Flächen."
    },
    tri: {
        title: "Dreiecksprisma",
        desc: "Ein Dreiecksprisma mit zwei gleichen Dreiecken und drei Seitenflächen.",
        feedback: "Dreiecksprisma: vorne und hinten sind gleiche Dreiecke. So kann zum Beispiel eine dreieckige Verpackung aufgebaut sein."
    },
    pent: {
        title: "Fünfeckprisma",
        desc: "Ein Fünfeckprisma mit zwei kongruenten Fünfecken und fünf Seitenflächen.",
        feedback: "Fünfeckprisma: Auch ein Fünfeck kann Grundfläche und Deckfläche sein. Wichtig ist: beide Flächen sind gleich und parallel."
    },
    net: {
        title: "Netz eines Dreiecksprismas",
        desc: "Das Netz zeigt zwei gleichseitige Dreiecke und drei gleich breite Rechtecke.",
        feedback: "Netz: Zwei gleichseitige Dreiecke und drei Rechtecke bilden die fünf Flächen dieses Beispiels. Jede Rechteckbreite entspricht einer Dreiecksseite. Die gemeinsame Rechteckhöhe ist die Körperhöhe."
    }
};

function topicInit() {
    initPrismExplorer();
    initTriangleExplorer();
    initReflectionExplorer();
    initTranslationExplorer();
    initQuadrilateralConstruction();
    initDiagonalArea();
    initCoordinateDrawing();
    initFigureSymmetry();
}

function coordinateDrawingModel(index) {
    if(!Number.isInteger(index)||index<0||index>2)return null;
    const original=[[-3,-2],[2,-2],[2,2],[-3,2]];
    const expected=original.map(([x,y])=>index===1?[x+2,y-1]:index===2?[-x,y]:[x,y]);
    const instruction=index===0?'Trage A(−3|−2), B(2|−2), C(2|2) und D(−3|2) ein. Verbinde sie in dieser Reihenfolge.':index===1?'Verschiebe das Rechteck A(−3|−2), B(2|−2), C(2|2), D(−3|2) um 2 Einheiten nach rechts und 1 nach unten. Berechne alle Bildpunkte selbst.':'Spiegle das Rechteck A(−3|−2), B(2|−2), C(2|2), D(−3|2) an der y-Achse. Trage alle Bildpunkte ein.';
    return {index,original,expected,instruction};
}

const GEOMETRY_SYMMETRY_SHAPES=[
    {name:'Rechteck',points:[[-3,-2],[3,-2],[3,2],[-3,2]]},
    {name:'Parallelogramm',points:[[-3,-2],[1,-2],[3,2],[-1,2]]},
    {name:'Dreieck',points:[[-3,-2],[3,-2],[0,3]]},
    {name:'Deltoid',points:[[0,4],[2,0],[0,-2],[-2,0]]},
    {name:'Quadrat',points:[[-2,-2],[2,-2],[2,2],[-2,2]]}
];

function figureSymmetryModel(index,axis) {
    if(!Number.isInteger(index)||!GEOMETRY_SYMMETRY_SHAPES[index]||!['x','y','up','down'].includes(axis))return null;
    const shape=GEOMETRY_SYMMETRY_SHAPES[index],image=shape.points.map(([x,y])=>axis==='x'?[x,-y]:axis==='y'?[-x,y]:axis==='up'?[y,x]:[-y,-x]);
    const matches=image.map(p=>shape.points.findIndex(q=>p[0]===q[0]&&p[1]===q[1]));
    return {name:shape.name,points:shape.points.map(p=>p.slice()),image,matches,symmetric:matches.every(i=>i>=0),axis};
}

function coordinateDrawingSvg(points,names=['A','B','C','D'],overlay=null,axis=null) {
    const project=([x,y])=>[165+20*x,165-20*y],valid=p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isInteger(n)&&Math.abs(n)<=6);
    if(!Array.isArray(points)||points.some(p=>p!==null&&!valid(p))||overlay?.some(p=>!valid(p)))return '';
    let body='';
    for(let n=-6;n<=6;n++)body+=`<path d="M${165+20*n} 45 V285 M45 ${165-20*n} H285" stroke="#cbd5e1" stroke-width="1"/>`;
    body+='<path d="M30 165 H300 M165 300 V30" stroke="#172554" stroke-width="2"/>';
    if(axis)body+=`<path data-symmetry-axis d="${axis==='x'?'M30 165 H300':axis==='y'?'M165 30 V300':axis==='up'?'M45 285 L285 45':'M45 45 L285 285'}" stroke="#7c3aed" stroke-width="3"/>`;
    if(points.length>=3&&points.every(p=>p!==null))body+=`<polygon data-coordinate-polygon points="${points.map(p=>project(p).join(',')).join(' ')}" fill="#bfdbfe" fill-opacity=".5" stroke="#1d4ed8" stroke-width="2"/>`;
    if(overlay)body+=`<polygon data-coordinate-image points="${overlay.map(p=>project(p).join(',')).join(' ')}" fill="none" stroke="#9a3412" stroke-width="3" stroke-dasharray="6 4"/>`;
    body+='<g fill="#172554" font-size="22">';
    for(const n of [-6,-3,3,6])body+=`<text x="${165+20*n}" y="189" text-anchor="middle">${n}</text><text x="151" y="${172-20*n}" text-anchor="end">${n}</text>`;
    body+='<text x="151" y="189" text-anchor="end">0</text><text x="303" y="158">x</text><text x="175" y="28">y</text></g>';
    const groups=new Map();points.forEach((p,i)=>{if(p){const key=p.join(',');if(!groups.has(key))groups.set(key,{p,names:[]});groups.get(key).names.push(names[i]);}});
    for(const{p,names:labels}of groups.values()){const[x,y]=project(p),right=p[0]>=0;body+=`<circle cx="${x}" cy="${y}" r="4" fill="#1d4ed8"/><text x="${x+(right?-8:8)}" y="${y+(p[1]<0?26:-12)}" text-anchor="${right?'end':'start'}" fill="#172554" font-size="22">${labels.join(',')}</text>`;}
    return `<svg class="coordinate-svg" viewBox="0 0 330 330" role="img" aria-label="Koordinatensystem von minus sechs bis sechs. Ein Kästchen entspricht einer Einheit. Die Punktwerte und Aufgaben stehen im begleitenden Text."><rect width="330" height="330" fill="white"/>${body}</svg>`;
}

function initCoordinateDrawing() {
    document.querySelectorAll('[data-coordinate-drawing]').forEach(lab=>{
        if(lab.dataset.bound)return;lab.dataset.bound='true';
        const task=lab.querySelector('[data-coordinate-task]'),point=lab.querySelector('[data-coordinate-point]'),x=lab.querySelector('[data-coordinate-x]'),y=lab.querySelector('[data-coordinate-y]'),status=lab.querySelector('[data-coordinate-status]');let entered=[null,null,null,null],dirty=false;
        const names=()=>['A','B','C','D'].map(s=>Number(task.value)?s+'′':s);
        function draw(){const m=coordinateDrawingModel(Number(task.value));lab.querySelector('[data-coordinate-instruction]').textContent=m.instruction;lab.querySelector('[data-coordinate-source]').innerHTML=m.index?'<h4>Ausgangsfigur</h4>'+coordinateDrawingSvg(m.original):'';lab.querySelector('[data-coordinate-view]').innerHTML=coordinateDrawingSvg(entered,names());lab.querySelector('[data-coordinate-values]').textContent=entered.map((p,i)=>names()[i]+(p?'('+p.join('|')+')':': noch offen')).join('; ');}
        function fill(){const p=entered[Number(point.value)];x.value=p?String(p[0]):'';y.value=p?String(p[1]):'';dirty=false;[x,y].forEach(el=>el.removeAttribute('aria-invalid'));status.textContent='';}
        function place(){const values=[];for(const el of [x,y]){const raw=el.value.trim().replace('−','-');if(!/^[+-]?[0-6]$/.test(raw)){el.setAttribute('aria-invalid','true');status.textContent='Gib für x und y ganze Zahlen von −6 bis 6 ein.';el.focus();return false;}values.push(Number(raw));el.removeAttribute('aria-invalid');}entered[Number(point.value)]=values;dirty=false;draw();status.textContent=names()[Number(point.value)]+'('+values.join('|')+') ist eingetragen. Mit „Figur prüfen“ vergleichst du alle vier Punkte.';return true;}
        function reset(){entered=[null,null,null,null];point.value='0';fill();draw();}
        task.addEventListener('change',reset);point.addEventListener('change',fill);[x,y].forEach(el=>{el.addEventListener('input',()=>{dirty=true;status.textContent='';el.removeAttribute('aria-invalid');});el.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();place();}});});lab.querySelector('[data-coordinate-place]').addEventListener('click',place);
        lab.querySelector('[data-coordinate-check]').addEventListener('click',()=>{if(dirty&&!place())return;const missing=entered.findIndex(p=>p===null);if(missing>=0){status.textContent='Trage zuerst alle vier Punkte ein. Es fehlt noch '+names()[missing]+'.';point.focus();return;}const m=coordinateDrawingModel(Number(task.value)),wrong=entered.map((p,i)=>p.every((v,j)=>v===m.expected[i][j])?null:names()[i]+': '+(p[0]!==m.expected[i][0]?'x':'y')+' stimmt noch nicht.').filter(Boolean);status.textContent=wrong.length?wrong.join(' ')+' Prüfe Vorzeichen und Reihenfolge.':'Alle vier Punkte passen. Begründe zusätzlich auf Papier, warum die Figur ein Rechteck ist und warum Verschieben bzw. Spiegeln Längen und Winkel erhält.';});
        lab.querySelector('[data-coordinate-reset]').addEventListener('click',()=>{task.value='0';reset();task.focus();});reset();
    });
}

function initFigureSymmetry() {
    document.querySelectorAll('[data-figure-symmetry]').forEach(lab=>{
        if(lab.dataset.bound)return;lab.dataset.bound='true';
        const shape=lab.querySelector('[data-symmetry-shape]'),axis=lab.querySelector('[data-symmetry-axis-choice]'),guess=lab.querySelector('[data-symmetry-guess]'),status=lab.querySelector('[data-symmetry-status]');
        function render(show=false){const m=figureSymmetryModel(Number(shape.value),axis.value);lab.querySelector('[data-symmetry-view]').innerHTML=coordinateDrawingSvg(m.points,['A','B','C','D'],show?m.image:null,m.axis);lab.querySelector('[data-symmetry-values]').textContent='Eckpunkte: '+m.points.map((p,i)=>['A','B','C','D'][i]+'('+p.join('|')+')').join(', ')+'.';if(!show){status.textContent='';guess.value='';return;}const correct=(guess.value==='yes')===m.symmetric,detail=m.symmetric?'Das Spiegelbild deckt die Ausgangsfigur. Entsprechende Ecken: '+m.matches.map((j,i)=>['A','B','C','D'][i]+'′ = '+['A','B','C','D'][j]).join(', ')+'.':(()=>{const i=m.matches.findIndex(j=>j<0);return 'Zum Beispiel landet '+['A','B','C','D'][i]+'′ bei ('+m.image[i].join('|')+'), wo die Ausgangsfigur keine entsprechende Ecke hat. Die Figur deckt sich nicht mit ihrem Spiegelbild.';})();status.textContent=(correct?'Deine Vermutung stimmt. ':'Prüfe deine Vermutung noch einmal. ')+(m.symmetric?'Diese Gerade ist eine Symmetrieachse. ':'Diese Gerade ist keine Symmetrieachse. ')+detail;}
        [shape,axis].forEach(el=>el.addEventListener('change',()=>render()));guess.addEventListener('change',()=>{status.textContent='';});lab.querySelector('[data-symmetry-check]').addEventListener('click',()=>{if(!guess.value){status.textContent='Wähle zuerst deine Vermutung: ja oder nein.';guess.focus();return;}render(true);});lab.querySelector('[data-symmetry-reset]').addEventListener('click',()=>{shape.value='0';axis.value='y';render();shape.focus();});render();
    });
}

Object.assign(window,{coordinateDrawingModel,coordinateDrawingSvg,figureSymmetryModel});

// Coordinates are mathematical centimetres; screen drawings are scalable sketches.
const QUAD_CONSTRUCTION_CASES = [
    {kind:'trapezoid',a:6,c:4,h:3,d:1},
    {kind:'trapezoid',a:8,c:3,h:4,d:2},
    {kind:'trapezoid',a:4,c:4,h:3,d:1},
    {kind:'kite',e:6,f:4,u:2},
    {kind:'kite',e:8,f:6,u:3},
    {kind:'kite',e:6,f:4,u:3},
    {kind:'kite',e:6,f:6,u:3}
];

function diagonalAreaModel(e,f,u) {
    if(![4,6,8].includes(e)||![2,4,6].includes(f)||!Number.isInteger(u)||u<1||u>=e)return null;
    return {kind:'kite',e,f,u,v:e-u,points:[[0,u],[f/2,0],[0,u-e],[-f/2,0]],upper:f*u/2,lower:f*(e-u)/2,area:e*f/2,rhombus:2*u===e,square:2*u===e&&e===f};
}

function quadConstructionModel(index) {
    if(!Number.isInteger(index)||!QUAD_CONSTRUCTION_CASES[index])return null;
    const c=QUAD_CONSTRUCTION_CASES[index];
    if(c.kind==='kite')return diagonalAreaModel(c.e,c.f,c.u);
    return {...c,points:[[0,0],[c.a,0],[c.d+c.c,c.h],[c.d,c.h]],area:(c.a+c.c)*c.h/2,parallelogram:c.a===c.c};
}

function quadConstructionSteps(m) {
    if(m.kind==='trapezoid')return [
        `Planfigur: AB = ${m.a} cm, CD = ${m.c} cm, Höhe ${m.h} cm. Der Höhenfuß E auf AB liegt ${m.d} cm von A in Richtung B. AB und CD sollen parallel sein.`,
        `1. Zeichne AB = ${m.a} cm waagrecht von links nach rechts.`,
        `2. Markiere E auf AB mit AE = ${m.d} cm. Errichte dort die Senkrechte und trage ED = ${m.h} cm nach oben ab. ED ist die Höhe.`,
        '3. Zeichne durch D eine Parallele zu AB.',
        `4. Trage auf dieser Parallelen von D nach rechts DC = ${m.c} cm ab.`,
        '5. Verbinde B mit C und D mit A. Prüfe AB ∥ CD, die beiden Grundseiten, AE und die senkrechte Höhe. '+(m.parallelogram?'Hier sind beide Paare gegenüberliegender Seiten parallel: ein Parallelogramm und damit auch ein Trapez.':'Die schrägen Seiten sind nicht die Höhe.')
    ];
    return [
        `Planfigur: Diagonale AC = ${m.e} cm, Diagonale BD = ${m.f} cm. Ihr Schnittpunkt O liegt auf AC mit AO = ${m.u} cm. BD soll senkrecht auf AC stehen und von O halbiert werden.`,
        `1. Zeichne AC = ${m.e} cm senkrecht, A oberhalb von C.`,
        `2. Markiere O auf AC mit AO = ${m.u} cm. Dann ist OC = ${m.v} cm.`,
        '3. Errichte durch O eine Senkrechte zu AC.',
        `4. Trage darauf OB = OD = ${m.f/2} cm auf verschiedenen Seiten von O ab: B rechts, D links.`,
        '5. Verbinde A–B–C–D–A. Prüfe AB = AD und BC = CD, beide Diagonalen und den rechten Winkel bei O. '+(m.square?'Beide Diagonalen halbieren einander und sind gleich lang: Hier entsteht ein Quadrat.':m.rhombus?'O halbiert auch AC: Hier entsteht eine Raute.':'O halbiert BD, aber nicht AC. Die Figur ist ein Deltoid, keine Raute.')
    ];
}

function quadConstructionSvg(m,step=5,area=false,staticId='') {
    if(!m||!Number.isInteger(step)||step<0||step>5)return '';
    if(step===0)return quadConstructionSvg(m,5,area,staticId).replace(/aria-label="[^"]*"/,'aria-label="'+quadConstructionSteps(m)[0]+'"');
    const kite=m.kind==='kite',project=([x,y])=>kite?[165+22*x,45+22*(m.u-y)]:[55+25*x,215-25*y],pts=m.points.map(project);
    const line=(p,q,attrs='')=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" ${attrs}/>`;
    const point=(p,name,dx=0,dy=0,anchor='middle')=>`<circle cx="${p[0]}" cy="${p[1]}" r="3"/><text x="${p[0]+dx}" y="${p[1]+dy}" text-anchor="${anchor}">${name}</text>`;
    let body='';
    if(step>=1)body+=line(pts[0],pts[kite?2:1],'stroke-width="3"');
    if(kite){
        const o=project([0,0]);
        if(step>=3)body+=line([70,o[1]],[260,o[1]],'stroke="#64748b" stroke-dasharray="5 4"');
        if(step>=5){
            body+=`<polygon data-quad-polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="#dbeafe" stroke-width="3"/>`;
            if(area)body+=`<polygon data-diagonal-upper points="${[pts[0],pts[1],pts[3]].map(p=>p.join(',')).join(' ')}" fill="#93c5fd"/><polygon data-diagonal-lower points="${[pts[2],pts[1],pts[3]].map(p=>p.join(',')).join(' ')}" fill="#fde68a"/>`;
            body+=line(pts[0],pts[2],'stroke-dasharray="5 4"')+line(pts[1],pts[3],'stroke-width="2"')+`<path d="M${o[0]} ${o[1]-10} h10 v10" fill="none"/>`;
        }
        if(step>=1)body+=point(pts[0],'A',0,-14)+point(pts[2],'C',0,27);
        if(step>=2)body+=point(o,'O',14,26,'start');
        if(step>=4)body+=point(pts[1],'B',14,7,'start')+point(pts[3],'D',-14,7,'end');
    }else{
        const e=project([m.d,0]);
        if(step>=2)body+=line(e,pts[3],'stroke="#64748b" stroke-dasharray="5 4"')+`<path d="M${e[0]} ${e[1]-10} h10 v10" fill="none"/>`;
        if(step>=3)body+=line([35,pts[3][1]],[290,pts[3][1]],'stroke="#64748b" stroke-dasharray="5 4"');
        if(step>=4)body+=line(pts[3],pts[2],'stroke-width="3"');
        if(step>=5)body+=`<polygon data-quad-polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="#dbeafe" fill-opacity=".6" stroke-width="3"/>`;
        if(step>=1)body+=point(pts[0],'A',-12,27)+point(pts[1],'B',8,27);
        if(step>=2)body+=point(e,'E',0,27)+point(pts[3],'D',-8,-14);
        if(step>=4)body+=point(pts[2],'C',8,-14);
    }
    const description=area?`Deltoid mit senkrechten Diagonalen AC = ${m.e} cm und BD = ${m.f} cm. BD teilt die Fläche in zwei Dreiecke mit Höhen ${m.u} cm und ${m.v} cm.`:quadConstructionSteps(m)[step];
    return `<svg class="quad-svg" viewBox="0 0 330 290" role="img" aria-label="${description}"${staticId?' data-worksheet-static="true"':''}><rect width="330" height="290" fill="white"/><g fill="#172554" stroke="#172554" stroke-width="1.5" font-size="22">${body.replaceAll('<text ','<text stroke="none" ')}</g></svg>`;
}

function initQuadrilateralConstruction() {
    document.querySelectorAll('[data-quad-construction]').forEach(lab=>{
        if(lab.dataset.bound)return;lab.dataset.bound='true';
        const select=lab.querySelector('select'),view=lab.querySelector('[data-quad-view]'),status=lab.querySelector('[data-quad-status]'),prev=lab.querySelector('[data-quad-prev]'),next=lab.querySelector('[data-quad-next]');let step=0;
        function render(){const m=quadConstructionModel(Number(select.value));status.textContent=quadConstructionSteps(m)[step];view.innerHTML=quadConstructionSvg(m,step);lab.dataset.step=String(step);prev.disabled=step===0;next.disabled=step===5;}
        status.tabIndex=-1;
        select.addEventListener('change',()=>{step=0;render();});prev.addEventListener('click',()=>{step=Math.max(0,step-1);render();if(step===0)status.focus();});next.addEventListener('click',()=>{step=Math.min(5,step+1);render();if(step===5)status.focus();});lab.querySelector('[data-quad-reset]').addEventListener('click',()=>{select.value='0';step=0;render();select.focus();});render();
    });
}

function initDiagonalArea() {
    document.querySelectorAll('[data-diagonal-area]').forEach(lab=>{
        if(lab.dataset.bound)return;lab.dataset.bound='true';
        const e=lab.querySelector('[data-diagonal-e]'),f=lab.querySelector('[data-diagonal-f]'),u=lab.querySelector('[data-diagonal-u]');
        function render(){u.max=String(Number(e.value)-1);if(Number(u.value)>Number(u.max))u.value=u.max;const m=diagonalAreaModel(Number(e.value),Number(f.value),Number(u.value));u.setAttribute('aria-valuetext','AO = '+m.u+' Zentimeter');lab.querySelector('[data-diagonal-view]').innerHTML=quadConstructionSvg(m,5,true);lab.querySelector('[data-diagonal-status]').textContent=`AO = ${m.u} cm, OC = ${m.v} cm. Blau: ${m.f} · ${m.u} : 2 = ${m.upper} cm². Gelb: ${m.f} · ${m.v} : 2 = ${m.lower} cm². Zusammen: ${m.upper} + ${m.lower} = ${m.area} cm² = ${m.e} · ${m.f} : 2. `+(m.square?'Quadrat: Die Diagonalen sind gleich lang und halbieren einander.':m.rhombus?'Raute: O halbiert beide Diagonalen.':'Deltoid: O halbiert nur BD, nicht AC.');}
        [e,f].forEach(el=>el.addEventListener('change',render));u.addEventListener('input',render);lab.querySelector('[data-diagonal-reset]').addEventListener('click',()=>{e.value='6';f.value='4';u.value='2';render();e.focus();});render();
    });
}

Object.assign(window,{quadConstructionModel,quadConstructionSteps,quadConstructionSvg,diagonalAreaModel});

function initTranslationExplorer() {
    document.querySelectorAll('[data-translation-lab]').forEach(lab=>{
        if(lab.dataset.ready)return;lab.dataset.ready='true';
        const xi=lab.querySelector('[data-shift-x]'),yi=lab.querySelector('[data-shift-y]');
        const original=[[-2,-1],[1,-1],[-2,1]];
        const update=()=>{
            const dx=Number(xi.value),dy=Number(yi.value),shifted=original.map(([x,y])=>[x+dx,y+dy]);
            const status=lab.querySelector('[data-translation-status]');
            status.textContent=`Verschiebung: waagrecht ${dx}, senkrecht ${dy}. `+shifted.map(([x,y],i)=>`${['A','B','C'][i]}′(${x}|${y})`).join(', ')+'. '+(dx===0&&dy===0?'Die Figuren liegen genau aufeinander.':'Form und Größe bleiben gleich.');
            xi.setAttribute('aria-valuetext',dx+' waagrechte Schritte');yi.setAttribute('aria-valuetext',dy+' senkrechte Schritte');
            const project=points=>points.map(([x,y])=>[180+26*x,180-26*y]);
            const grid=Array.from({length:11},(_,i)=>i-5).map(n=>`<path d="M${180+26*n} 50 V310 M50 ${180-26*n} H310" stroke="#cbd5e1"/>${n?`<text x="${180+26*n}" y="198" text-anchor="middle">${n}</text><text x="170" y="${184-26*n}" text-anchor="end">${n}</text>`:''}`).join('');
            const points=project(shifted);
            lab.querySelector('[data-translation-drawing]').innerHTML=`<svg viewBox="0 0 360 360" role="img" aria-label="${status.textContent}" style="width:100%;max-width:480px;background:white"><g fill="#172554" font-size="12">${grid}<path d="M40 180 H325 M180 325 V35" stroke="#172554" stroke-width="2"/><text x="330" y="176">x</text><text x="188" y="30">y</text><text x="185" y="196">0</text><polygon data-shift-original points="${project(original).map(p=>p.join(',')).join(' ')}" fill="#bfdbfe" fill-opacity="0.6" stroke="#1d4ed8" stroke-width="2"/><polygon data-shift-image points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#92400e" stroke-width="3" stroke-dasharray="6 4"/>${points.map(([x,y],i)=>`<text x="${x+8}" y="${y-8}">${['A','B','C'][i]}′</text>`).join('')}</g></svg>`;
        };
        [xi,yi].forEach(input=>input.addEventListener('input',update));
        lab.querySelector('[data-shift-reset]').addEventListener('click',()=>{xi.value=0;yi.value=0;update();});update();
    });
}

function initReflectionExplorer() {
    document.querySelectorAll('[data-reflection-lab]').forEach(lab=>{
        if(lab.dataset.ready)return;lab.dataset.ready='true';
        const xInput=lab.querySelector('[data-reflect-x]'),yInput=lab.querySelector('[data-reflect-y]'),axis=lab.querySelector('[data-reflect-axis]');
        const update=()=>{
            const x=Number(xInput.value),y=Number(yInput.value),rx=axis.value==='y'?-x:x,ry=axis.value==='x'?-y:y;
            const same=x===rx&&y===ry,status=lab.querySelector('[data-reflection-status]');
            status.textContent=`P(${x}|${y}) → P′(${rx}|${ry}), gespiegelt an der ${axis.value}-Achse. `+(same?'P liegt auf der Achse und bleibt fest.':'Beide Punkte haben denselben senkrechten Abstand zur Spiegelachse.');
            xInput.setAttribute('aria-valuetext','x = '+x);yInput.setAttribute('aria-valuetext','y = '+y);
            const px=180+26*x,py=180-26*y,qx=180+26*rx,qy=180-26*ry;
            const grid=Array.from({length:11},(_,i)=>i-5).map(n=>`<path d="M${180+26*n} 50 V310 M50 ${180-26*n} H310" stroke="#cbd5e1"/>${n?`<text x="${180+26*n}" y="198" text-anchor="middle">${n}</text><text x="170" y="${184-26*n}" text-anchor="end">${n}</text>`:''}`).join('');
            lab.querySelector('[data-reflection-drawing]').innerHTML=`<svg viewBox="0 0 360 360" role="img" aria-label="${status.textContent}" style="width:100%;max-width:480px;background:white"><g fill="#172554" font-size="12">${grid}<path d="M40 180 H325 M180 325 V35" stroke="#172554" stroke-width="2"/><path data-mirror-axis d="${axis.value==='y'?'M180 40 V320':'M40 180 H320'}" stroke="#7c3aed" stroke-width="4"/><text x="330" y="176">x</text><text x="188" y="30">y</text><text x="185" y="196">0</text><line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" stroke="#334155" stroke-dasharray="5 4"/><circle data-original cx="${px}" cy="${py}" r="6" fill="#1d4ed8"/><circle data-image cx="${qx}" cy="${qy}" r="9" fill="none" stroke="#b45309" stroke-width="3"/><text x="${px+12}" y="${py-12}">${same?'P = P′':'P'}</text>${same?'':`<text x="${qx+12}" y="${qy-12}">P′</text>`}</g></svg>`;
        };
        [xInput,yInput].forEach(input=>input.addEventListener('input',update));axis.addEventListener('change',update);update();
    });
}

function initTriangleExplorer() {
    document.querySelectorAll('[data-triangle-lab]').forEach(lab => {
        if (lab.dataset.ready) return;
        lab.dataset.ready = 'true';
        const inputs = [...lab.querySelectorAll('[data-triangle-side]')];
        const result = lab.querySelector('[data-triangle-result]');
        const drawing = lab.querySelector('[data-triangle-drawing]');
        const update = () => {
            const [a,b,c] = inputs.map(input => Number(input.value));
            inputs.forEach(input => input.setAttribute('aria-valuetext', input.value + ' Zentimeter'));
            const sorted = [a,b,c].sort((x,y) => x-y);
            const sum = sorted[0] + sorted[1], longest = sorted[2];
            const prefix = `a = ${a} cm, b = ${b} cm, c = ${c} cm. `;
            result.dataset.valid = String(sum > longest);
            if (sum <= longest) {
                drawing.replaceChildren();
                result.textContent = prefix + (sum === longest
                    ? `${sorted[0]} + ${sorted[1]} = ${longest}. Die Strecken liegen gestreckt auf einer Geraden und schließen keine Dreiecksfläche ein.`
                    : `${sorted[0]} + ${sorted[1]} < ${longest}. Die beiden kürzeren Seiten reichen nicht, um die längste Seite zu verbinden.`);
                return;
            }
            // AB=c, AC=b, BC=a. Project C onto AB, then derive its altitude.
            const x = (b*b+c*c-a*a)/(2*c), y = Math.sqrt(Math.max(0,b*b-x*x));
            const points = [[0,0],[c,0],[x,y]].map(([px,py]) => [250+20*px,250-20*py]);
            const sideType = a===b&&b===c ? 'gleichseitig' : a===b||a===c||b===c ? 'gleichschenklig' : 'ungleichseitig';
            const squareSum = sorted[0]**2 + sorted[1]**2;
            const angleType = squareSum===longest**2 ? 'rechtwinklig' : squareSum>longest**2 ? 'spitzwinklig' : 'stumpfwinklig';
            result.textContent = prefix + `${sorted[0]} + ${sorted[1]} > ${longest}. Ein Dreieck ist möglich: ${sideType} und ${angleType}.`;
            drawing.innerHTML = `<svg viewBox="0 0 500 290" role="img" aria-label="${result.textContent}" style="width:100%;max-width:600px;background:white"><polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="#dbeafe" stroke="#172554" stroke-width="3"/><g fill="#172554" font-size="15"><text x="238" y="270">A</text><text x="${points[1][0]}" y="270">B</text><text x="${points[2][0]}" y="${points[2][1]-10}">C</text></g></svg>`;
        };
        inputs.forEach(input => input.addEventListener('input', update));
        lab.querySelector('[data-triangle-reset]').addEventListener('click', () => {
            inputs.forEach((input,i) => input.value = [3,4,5][i]);
            update();
        });
        update();
    });
}

function initPrismExplorer() {
    const lab = document.querySelector("[data-prism-lab]");
    if (!lab) return;

    const buttons = lab.querySelectorAll("[data-prism-view]");
    const scenes = lab.querySelectorAll("[data-prism-scene]");
    const title = document.getElementById("prismSceneTitle");
    const desc = document.getElementById("prismSceneDesc");
    const feedback = document.getElementById("prismFeedback");

    if (feedback) {
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.setAttribute("aria-atomic", "true");
    }

    function setView(view) {
        const data = prismViews[view] || prismViews.box;

        buttons.forEach((button) => {
            const active = button.dataset.prismView === view;
            button.classList.toggle("selected", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        scenes.forEach((scene) => {
            const active = scene.dataset.prismScene === view;
            scene.style.display = active ? "" : "none";
            scene.setAttribute("aria-hidden", active ? "false" : "true");
        });

        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        if (feedback) feedback.textContent = data.feedback;
    }

    buttons.forEach((button) => {
        if (!button.dataset.prismViewA11yBound) {
            button.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " " && event.code !== "Space") return;
                event.preventDefault();
                setView(button.dataset.prismView);
            });
            button.addEventListener("click", () => setView(button.dataset.prismView));
            button.dataset.prismViewA11yBound = "true";
        }

        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
    });

    setView("box");
}
