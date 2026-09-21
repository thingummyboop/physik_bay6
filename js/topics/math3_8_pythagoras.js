function checkPyth(){const input=document.getElementById('pyth_in'),out=document.getElementById('pyth_feedback'),raw=input.value.trim(),value=/^\d+(?:[.,]\d+)?$/.test(raw)?Number(raw.replace(',','.')):NaN;out.textContent=!Number.isFinite(value)?'Gib die gesuchte Länge als Zahl ein, zum Beispiel 5.':value===5?'Richtig! c² = 3² + 4² = 25 cm². Deshalb c = √25 cm = 5 cm.':'Noch nicht richtig. Berechne zuerst 3² + 4² und ziehe dann die positive Quadratwurzel.';}


function topicInit() {
    initPythPuzzle();
    const input=document.getElementById('pyth_in');if(input){input.oninput=()=>document.getElementById('pyth_feedback').textContent='';input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();checkPyth();}};}
    bindPythProof();bindPythConverse();
}


let pythFilled = 0;
const pythTargets = [];

function initPythPuzzle() {
    const c2Grid = document.getElementById('pyth-c2-grid');
    const a2Grid = document.getElementById('pyth-a2-grid');
    const b2Grid = document.getElementById('pyth-b2-grid');
    if (!c2Grid || !a2Grid || !b2Grid) return;
    
    c2Grid.innerHTML = '';
    a2Grid.innerHTML = '';
    b2Grid.innerHTML = '';
    pythTargets.length = 0;
    pythFilled = 0;
    document.getElementById('pyth-success-msg').textContent = '0 von 25 Flächenteilen umgelegt.';
    const nextButton=document.querySelector('[data-pyth-next]');if(nextButton){nextButton.disabled=false;nextButton.onclick=()=>document.querySelector('#pyth-puzzle-svg [role="button"]:not([data-moved])')?.onclick();}

    // A = (200, 110), B = (320, 200)
    // Vector u = (120, 90) / 5 = (24, 18)
    // Vector v = (90, -120) / 5 = (18, -24) -> Outwards pointing normal
    
    // Generate c² target slots
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            const p1 = { x: 200 + i*24 + j*18, y: 110 + i*18 + j*(-24) };
            const p2 = { x: p1.x + 24, y: p1.y + 18 };
            const p3 = { x: p2.x + 18, y: p2.y - 24 };
            const p4 = { x: p1.x + 18, y: p1.y - 24 };
            
            const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute("points", `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`);
            c2Grid.appendChild(poly);
            
            pythTargets.push({ p1, p2, p3, p4 });
        }
    }
    
    // Shuffle targets so they fill randomly
    for (let k = pythTargets.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [pythTargets[k], pythTargets[j]] = [pythTargets[j], pythTargets[k]];
    }

    // Generate a² squares (3x3 grid going left and up from (200, 200) to (200, 110))
    // Wait, side a is vertical (200,110) to (200,200). Length is 90. So 3 squares of 30x30.
    // They extend to the left: X from 110 to 200, Y from 110 to 200.
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            const x = 110 + i*30;
            const y = 110 + j*30;
            createDraggableSquare(a2Grid, x, y, 30, '#3b82f6');
        }
    }

    // Generate b² squares (4x4 grid going right and down from (200, 200) to (320, 200))
    // Side b is horizontal (200,200) to (320,200). Length is 120. So 4 squares of 30x30.
    // They extend down: X from 200 to 320, Y from 200 to 320.
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            const x = 200 + i*30;
            const y = 200 + j*30;
            createDraggableSquare(b2Grid, x, y, 30, '#ef4444');
        }
    }
}

function createDraggableSquare(parent, x, y, size, color) {
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    // Standard square points
    const pts = `${x},${y} ${x+size},${y} ${x+size},${y+size} ${x},${y+size}`;
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", color);
    poly.style.cursor = "pointer";
    poly.style.transition = "all 0.5s ease-in-out";
    poly.setAttribute('role','button');poly.setAttribute('tabindex','0');poly.setAttribute('aria-label',(parent.id==='pyth-a2-grid'?'a²':'b²')+': Flächenteil '+(parent.children.length+1)+' umlegen');
    
    poly.onclick = function() {
        if (poly.getAttribute("data-moved") === "true") return;
        poly.setAttribute("data-moved", "true");
        poly.setAttribute('aria-disabled','true');poly.setAttribute('tabindex','-1');
        
        const target = pythTargets[pythFilled];
        if (!target) return;
        
        const newPts = `${target.p1.x},${target.p1.y} ${target.p2.x},${target.p2.y} ${target.p3.x},${target.p3.y} ${target.p4.x},${target.p4.y}`;
        
        poly.setAttribute("points", newPts);
        pythFilled++;
        
        document.getElementById('pyth-success-msg').textContent=pythFilled===25?'Beispiel überprüft: 9 cm² + 16 cm² = 25 cm². Ein Beispiel allein ist kein allgemeiner Beweis.':pythFilled+' von 25 Flächenteilen umgelegt.';
        if(pythFilled===25){const nextButton=document.querySelector('[data-pyth-next]');if(nextButton){const hadFocus=document.activeElement===nextButton;nextButton.disabled=true;if(hadFocus)document.querySelector('[data-pyth-puzzle-reset]')?.focus();}}
    };
    poly.onkeydown=function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();poly.onclick();const next=document.querySelector('#pyth-puzzle-svg [role="button"][tabindex="0"]');if(next)next.focus();else document.querySelector('[data-pyth-puzzle-reset]').focus();}};
    parent.appendChild(poly);
}

function resetPythPuzzle() {
    initPythPuzzle();
    document.querySelector('#pyth-puzzle-svg [role="button"]')?.focus();
}

function pythProofGeometry(a,b,layout){
 const L=a+b;
 return layout==='central'?{triangles:[[[0,0],[a,0],[0,b]],[[a,0],[L,0],[L,a]],[[L,a],[L,L],[b,L]],[[b,L],[0,L],[0,b]]],squares:[[[a,0],[L,a],[b,L],[0,b]]]}:{triangles:[[[a,0],[L,0],[a,a]],[[L,0],[L,a],[a,a]],[[0,a],[a,a],[0,L]],[[a,a],[a,L],[0,L]]],squares:[[[0,0],[a,0],[a,a],[0,a]],[[a,a],[L,a],[L,L],[a,L]]]};
}
function pythDrawProof(a,b,layout){
 const s=240/(a+b),point=p=>p.map(v=>50+v*s).join(','),g=pythProofGeometry(a,b,layout);
 return `<svg viewBox="0 0 340 330" role="img" aria-label="${layout==='central'?'Vier Dreiecke um c²':'Vier Dreiecke neben a² und b²'}; a = ${a}, b = ${b}"><rect x="50" y="50" width="240" height="240" fill="#fff" stroke="#172b4d" stroke-width="2"/>${g.squares.map(points=>`<polygon data-pyth-square points="${points.map(point).join(' ')}" fill="#dbeafe" stroke="#174d83" stroke-width="2"/>`).join('')}${g.triangles.map(points=>`<polygon data-pyth-piece points="${points.map(point).join(' ')}" fill="#fdba74" stroke="#713f12" stroke-width="2"/>`).join('')}<g fill="#172b4d" font-size="22" text-anchor="middle"><text x="170" y="30">a + b</text>${layout==='central'?'<text x="170" y="178">c²</text>':`<text x="${50+a*s/2}" y="${58+a*s/2}">a²</text><text x="${50+(a+b/2)*s}" y="${58+(a+b/2)*s}">b²</text>`}</g></svg>`;
}
function bindPythProof(){
 const lab=document.querySelector('[data-pyth-proof]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';const a=lab.querySelector('#proof-a'),b=lab.querySelector('#proof-b'),input=lab.querySelector('#proof-answer'),out=lab.querySelector('#proof-status'),result=lab.querySelector('[data-proof-result]');
 const values=()=>({a:Number(a.value),b:Number(b.value)}),clear=()=>{out.textContent='';result.replaceChildren();input.removeAttribute('aria-invalid');};
 const draw=()=>{clear();input.value='';const v=values();a.setAttribute('aria-valuetext',v.a+' cm');b.setAttribute('aria-valuetext',v.b+' cm');lab.querySelector('[data-proof-caption]').textContent='a = '+v.a+' cm, b = '+v.b+' cm. Beide äußeren Quadrate haben Seitenlänge '+(v.a+v.b)+' cm. Die Zeichnungen passen ihre Größe an den Bildschirm an.';lab.querySelector('[data-proof-drawings]').innerHTML=['central','split'].map((layout,i)=>'<figure class="pyth-figure">'+pythDrawProof(v.a,v.b,layout)+'<figcaption>'+(i===0?'Restfläche c²':'Restflächen a² und b²')+'</figcaption></figure>').join('');};
 const show=()=>{const v=values(),p=document.createElement('p');p.textContent='Äußeres Quadrat: '+(v.a+v.b)+'² = '+(v.a+v.b)**2+' cm². Ein Dreieck: '+v.a+' · '+v.b+' : 2 = '+(v.a*v.b/2).toLocaleString('de-AT')+' cm². Vier Dreiecke: '+(2*v.a*v.b)+' cm². Restfläche: '+(v.a+v.b)**2+' − '+2*v.a*v.b+' = '+(v.a*v.a+v.b*v.b)+' cm². Das ist auch '+v.a+'² + '+v.b+'² = c².';result.replaceChildren(p);};
 const check=()=>{clear();const raw=input.value.trim(),value=/^\d+(?:[.,]\d+)?$/.test(raw)?Number(raw.replace(',','.')):NaN;if(!Number.isFinite(value)||value>200){input.setAttribute('aria-invalid','true');out.textContent='Gib eine Fläche von 0 bis 200 als Zahl in cm² ein.';input.focus();return;}const v=values();out.textContent=value===v.a*v.a+v.b*v.b?'Richtig. Die Restfläche stimmt mit a² + b² überein.':'Noch nicht richtig. Ziehe die Fläche der vier Dreiecke von der äußeren Quadratfläche ab.';show();out.focus();};
 a.oninput=draw;b.oninput=draw;input.oninput=clear;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};lab.querySelector('[data-proof-check]').onclick=check;lab.querySelector('[data-proof-show]').onclick=()=>{clear();show();out.textContent='Vergleiche die Restfläche in beiden Anordnungen.';out.focus();};lab.querySelector('[data-proof-reset]').onclick=()=>{a.value='3';b.value='4';draw();a.focus();};draw();
}
function pythConverseResult(units){const [x,y,z]=[...units].sort((a,b)=>a-b);return {x,y,z,triangle:x>0&&x+y>z,right:x>0&&x+y>z&&x*x+y*y===z*z,left:x*x+y*y,rightSquare:z*z};}
function bindPythConverse(){
 const lab=document.querySelector('[data-pyth-converse]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';const inputs=[...lab.querySelectorAll('input')],out=lab.querySelector('[data-converse-status]');out.id='converse-status';for(const input of inputs)input.setAttribute('aria-describedby',out.id);
 const clear=()=>{out.textContent='';inputs.forEach(i=>i.removeAttribute('aria-invalid'));};
 const check=()=>{clear();const values=[];for(const input of inputs){const raw=input.value.trim().replace(',','.'),v=/^\d+(?:\.\d{1,2})?$/.test(raw)?Number(raw):NaN;if(!Number.isFinite(v)||v<=0||v>100){input.setAttribute('aria-invalid','true');out.textContent='Gib jede Länge als Zahl über 0 bis 100 cm mit höchstens zwei Nachkommastellen ein.';input.focus();return;}const [whole,fraction='']=raw.split('.');values.push(Number(whole)*100+Number(fraction.padEnd(2,'0')));}const r=pythConverseResult(values),f=(x,scale=100)=>(x/scale).toLocaleString('de-AT',{maximumFractionDigits:4});out.textContent='Sortiert: '+[r.x,r.y,r.z].map(x=>f(x)+' cm').join(', ')+'. '+(!r.triangle?'Kein Dreieck: '+f(r.x)+' + '+f(r.y)+' '+(r.x+r.y===r.z?'=':'<')+' '+f(r.z)+'. Die beiden kürzeren Seiten müssen zusammen länger als die längste sein.':(r.right?'Rechtwinklig. ':'Nicht rechtwinklig. ')+f(r.x)+'² + '+f(r.y)+'² = '+f(r.left,10000)+' cm²; '+f(r.z)+'² = '+f(r.rightSquare,10000)+' cm². '+(r.right?'Die Quadrate stimmen überein; der rechte Winkel liegt gegenüber '+f(r.z)+' cm.':'Die Quadrate stimmen nicht überein.'));out.focus();};
 inputs.forEach(input=>{input.oninput=clear;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};});lab.querySelector('[data-converse-check]').onclick=check;lab.querySelector('[data-converse-reset]').onclick=()=>{inputs.forEach((input,i)=>input.value=String(i+3));clear();inputs[0].focus();};
}
