function ensureFractionExerciseFeedback(input, feedbackId) {
    if (!input) return null;

    let feedback = document.getElementById(feedbackId);
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = feedbackId;
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        input.closest('.interactive-zone')?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', feedbackId);

    return feedback;
}

function parseFractionInput(id) {
    const raw = String(document.getElementById(id)?.value || '').trim();
    return /^\d{1,6}$/.test(raw) ? Number(raw) : NaN;
}

function bindFractionExercise({ inputIds, feedbackId, check, successText, hintText }) {
    const firstInput = document.getElementById(inputIds[0]);
    if (!firstInput) return;

    const zone = firstInput.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    const feedback = ensureFractionExerciseFeedback(firstInput, feedbackId);
    inputIds.forEach((id) => document.getElementById(id)?.setAttribute('aria-describedby', feedbackId));

    const evaluate = () => {
        if (check()) {
            if (feedback) feedback.innerText = successText;
        } else if (feedback) {
            feedback.innerText = hintText;
        }
    };

    if (button) {
        button.onclick = (event) => {
            event.preventDefault();
            evaluate();
        };
    }

    inputIds.forEach((id) => {
        const input = document.getElementById(id);
        if (!input || input.dataset.enterBound === 'true') return;
        input.dataset.enterBound = 'true';
        input.addEventListener('input', () => { if (feedback) feedback.innerText = ''; });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    });
}

function topicInit() {
    bindFractionModels();
    bindFractionExercise({
        inputIds: ['bruch_common_n', 'bruch_common_d'],
        feedbackId: 'bruch_common_feedback',
        check: () => {
            const n = parseFractionInput('bruch_common_n'), d = parseFractionInput('bruch_common_d');
            return Number.isSafeInteger(n) && Number.isSafeInteger(d) && d > 0 && n > 0 && BigInt(n) * 4n === BigInt(d) * 3n;
        },
        successText: 'Richtig! 1/2 = 2/4. Dazu 1/4 ergibt 3/4. Gleichwertige Brüche wie 6/8 stimmen ebenfalls.',
        hintText: 'Schreibe 1/2 als 2/4 und addiere 1/4. Gib Zähler und einen positiven Nenner als ganze Zahlen ein; der Nenner bleibt beim Addieren gleich.'
    });
    bindFractionExercise({
        inputIds: ['bruch_z'],
        feedbackId: 'bruch_z_feedback',
        check: () => parseFractionInput('bruch_z') === 3,
        successText: 'Super! 3/4 ist richtig. Der Nenner bleibt 4, weil die Stücke gleich groß sind.',
        hintText: 'Noch nicht: Bei gleichem Nenner rechnest du oben 1 + 2.'
    });

    bindFractionExercise({
        inputIds: ['bruch_m1', 'bruch_m2'],
        feedbackId: 'bruch_m_feedback',
        check: () => { const n=parseFractionInput('bruch_m1'),d=parseFractionInput('bruch_m2');return Number.isInteger(n)&&Number.isInteger(d)&&d>0&&n*8===d*3; },
        successText: 'Richtig! Oben rechnest du 1 mal 3, unten 2 mal 4. Das ergibt 3/8.',
        hintText: 'Tipp: Beim Multiplizieren gilt oben mal oben und unten mal unten.'
    });

    bindFractionExercise({
        inputIds: ['bruch_d1', 'bruch_d2'],
        feedbackId: 'bruch_d_feedback',
        check: () => { const n=parseFractionInput('bruch_d1'),d=parseFractionInput('bruch_d2');return Number.isInteger(n)&&Number.isInteger(d)&&d>0&&n*3===d*4; },
        successText: 'Richtig! Aus geteilt durch 1/2 wird mal 2/1. Das Ergebnis ist 4/3.',
        hintText: 'Noch nicht: Drehe den zweiten Bruch um. Dann rechnest du 2 mal 2 oben und 3 mal 1 unten.'
    });
}

function fractionModelGcd(a,b){while(b){const r=a%b;a=b;b=r;}return a;}
function fractionOperationModel(kind,index){
 const banks={multiply:[[1,2,3,4],[2,3,4,5],[3,4,2,5],[1,3,2,3],[2,3,3,4],[3,2,3,4],[3,2,3,2],[0,1,3,4],[1,1,3,4],[3,4,1,1],[5,4,2,3],[1,6,5,6],[5,6,5,6],[2,1,1,2],[2,3,0,1],[1,1,1,1]],divide:[[1,2,1,4],[3,4,1,8],[2,3,1,2],[1,2,3,4],[3,2,1,4],[3,2,3,4],[3,4,1,1],[3,4,3,2],[0,1,1,2],[1,1,2,3],[5,6,1,3],[7,6,2,3]]};
 if(!banks[kind]||!Number.isInteger(index)||index<0||index>=banks[kind].length)return null;
 const [a,b,c,d]=banks[kind][index],num=kind==='multiply'?a*c:a*d,den=kind==='multiply'?b*d:b*c,g=fractionModelGcd(num,den),common=b*d/fractionModelGcd(b,d),first=a*(common/b),second=c*(common/d);
 return {kind,a,b,c,d,num,den,n:num/g,q:den/g,common,first,second,full:kind==='divide'?Math.floor(first/second):null,remainder:kind==='divide'?first%second:null};
}
function fractionAreaSvg(m){
 const ux=Math.max(1,Math.ceil(m.a/m.b)),uy=Math.max(1,Math.ceil(m.c/m.d)),unit=120,left=35,top=30,cols=ux*m.b,rows=uy*m.d,cw=unit/m.b,ch=unit/m.d;
 let svg='<svg class="fraction-figure" viewBox="0 0 '+(ux*unit+65)+' '+(uy*unit+80)+'" role="img" aria-labelledby="fraction-multiply-title"><title id="fraction-multiply-title">Flächenmodell: '+m.a+'/'+m.b+' mal '+m.c+'/'+m.d+'. '+(m.a*m.c)+' schraffierte Zellen, '+(m.b*m.d)+' Zellen je Ganzem.</title><defs><pattern id="fraction-overlap-pattern" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#dbeafe"/><path d="M-2 2L2 -2M0 8L8 0M6 10L10 6" stroke="#1d4ed8" stroke-width="2"/></pattern></defs>';
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){const overlap=col<m.a&&row<m.c,fill=overlap?'url(#fraction-overlap-pattern)':col<m.a?'#fde68a':row<m.c?'#c4b5fd':'#fff';svg+='<rect data-area-cell data-area-overlap="'+overlap+'" x="'+(left+col*cw)+'" y="'+(top+row*ch)+'" width="'+cw+'" height="'+ch+'" fill="'+fill+'" stroke="#334155" stroke-width=".7"/>';}
 for(let y=0;y<uy;y++)for(let x=0;x<ux;x++)svg+='<rect data-area-whole x="'+(left+x*unit)+'" y="'+(top+y*unit)+'" width="'+unit+'" height="'+unit+'" fill="none" stroke="#111" stroke-width="2.5"/>';
 for(let x=0;x<=ux;x++)svg+='<text x="'+(left+x*unit)+'" y="'+(top+uy*unit+24)+'" text-anchor="middle" fill="currentColor" font-size="20">'+x+'</text>';
 for(let y=0;y<=uy;y++)svg+='<text x="20" y="'+(top+y*unit+6)+'" text-anchor="end" fill="currentColor" font-size="20">'+y+'</text>';
 return svg+'</svg>';
}
function fractionDivisionSvg(m){
 const groups=Math.ceil(m.first/m.second),units=Math.max(1,Math.ceil(Math.max(m.first,m.second,groups*m.second)/m.common)),cell=270/(units*m.common),left=20;
 let svg='<svg class="fraction-figure" viewBox="0 0 330 250" role="img" aria-labelledby="fraction-divide-title"><title id="fraction-divide-title">Portionenmodell: '+m.a+'/'+m.b+' Liter Vorrat, '+m.c+'/'+m.d+' Liter je Portion; '+m.full+' volle Portionen und '+m.remainder+'/'+m.common+' Liter Rest.</title>';
 const labels=['Vorrat','Eine Portion','Abgemessen'];for(let row=0;row<3;row++){const y=40+row*75;svg+='<text x="20" y="'+(y-8)+'" font-size="22" fill="currentColor">'+labels[row]+'</text>';for(let i=0;i<units*m.common;i++){const filled=i<(row===1?m.second:m.first),fill=filled?(row===1?'#c4b5fd':row===2&&Math.floor(i/m.second)%2?'#fde68a':'#93c5fd'):'#fff';svg+='<rect data-division-row="'+row+'" data-division-filled="'+filled+'" x="'+(left+i*cell)+'" y="'+y+'" width="'+cell+'" height="26" fill="'+fill+'" stroke="#334155" stroke-width=".6"/>';}
 for(let i=0;i<=units;i++){const x=left+i*m.common*cell;svg+='<line x1="'+x+'" x2="'+x+'" y1="'+y+'" y2="'+(y+31)+'" stroke="#111" stroke-width="2"/>';if(row===2)svg+='<text x="'+x+'" y="'+(y+49)+'" text-anchor="middle" fill="currentColor" font-size="22">'+i+' L</text>';}
 if(row===2)for(let i=0;i<groups;i++)svg+='<rect data-division-group x="'+(left+i*m.second*cell)+'" y="'+(y-2)+'" width="'+(m.second*cell)+'" height="30" fill="none" stroke="#111" stroke-width="2"'+(i===groups-1&&m.remainder?' stroke-dasharray="4 3"':'')+'/>';
 }return svg+'</svg>';
}
function bindFractionModels(){
 document.querySelectorAll('[data-fraction-model]').forEach(host=>{if(host.dataset.bound)return;host.dataset.bound='true';const kind=host.dataset.fractionModel,q=s=>host.querySelector(s),select=q('[data-fraction-case]'),n=q('[data-fraction-n]'),d=q('[data-fraction-d]'),status=q('[data-fraction-status]'),view=q('[data-fraction-view]');
 for(let i=0;fractionOperationModel(kind,i);i++){const m=fractionOperationModel(kind,i),option=document.createElement('option');option.value=String(i);option.textContent=m.a+'/'+m.b+(kind==='multiply'?' · ':' : ')+m.c+'/'+m.d;select.append(option);}
 function resetView(){n.value='';d.value='';status.textContent='';view.hidden=true;view.replaceChildren();}
 function check(){const a=n.value.trim(),b=d.value.trim();if(!/^\d{1,6}$/.test(a)||!/^\d{1,6}$/.test(b)||Number(b)===0){status.textContent='Gib einen nichtnegativen ganzzahligen Zähler und einen positiven ganzzahligen Nenner ein (je höchstens sechs Ziffern).';return;}const m=fractionOperationModel(kind,Number(select.value));status.textContent=Number(a)*m.q===Number(b)*m.n?'Richtig: Dein Bruch ist gleichwertig zu '+m.n+'/'+m.q+'.':'Noch nicht. Prüfe deinen Rechenweg am Modell. Achte auf die Bedeutung der Teile und des Ganzen.';}
 function show(){const m=fractionOperationModel(kind,Number(select.value)),result=m.n+'/'+m.q;view.hidden=false;
 if(kind==='multiply')view.innerHTML='<figure>'+fractionAreaSvg(m)+'<figcaption>Breite '+m.a+'/'+m.b+', Höhe '+m.c+'/'+m.d+'. Jedes dick umrandete Quadrat ist ein Ganzes. Gelb markiert die gewählten Spalten, Violett die gewählten Reihen; die gemeinsame Auswahl ist schraffiert.</figcaption></figure><p>'+m.a+' Spalten · '+m.c+' Reihen = '+m.num+' schraffierte Zellen. Ein Ganzes enthält '+m.b+' · '+m.d+' = '+m.den+' Zellen. Anteil: '+m.num+'/'+m.den+' = '+result+'.</p>';
 else{const rG=fractionModelGcd(m.remainder,m.common),pG=fractionModelGcd(m.remainder,m.second);view.innerHTML='<figure>'+fractionDivisionSvg(m)+'<figcaption>Alle Balken haben denselben Litermaßstab. Jeder kleine Abschnitt bedeutet 1/'+m.common+' L. Die Rahmen im unteren Balken sind volle Portionsgrößen; ein gestrichelter Rahmen ist nur teilweise gefüllt.</figcaption></figure><p>Vorrat: '+m.first+'/'+m.common+' L. Eine Portion: '+m.second+'/'+m.common+' L. Deshalb '+m.first+' : '+m.second+' = '+result+' Portionen.</p><p>Volle Portionen: '+m.full+'. Rest: '+(m.remainder/rG)+'/'+(m.common/rG)+' L. Das ist '+(m.remainder/pG)+'/'+(m.second/pG)+' einer weiteren Portion.</p><p>Kehrwertregel: '+m.a+'/'+m.b+' · '+m.d+'/'+m.c+' = '+m.num+'/'+m.den+' = '+result+'. Probe: '+result+' · '+m.c+'/'+m.d+' = '+m.a+'/'+m.b+'.</p>';}
 status.textContent='Modell und Rechenweg angezeigt. Ergebnis: '+result+(kind==='divide'?' Portionen.':'.');}
 select.addEventListener('change',resetView);[n,d].forEach(input=>{input.addEventListener('input',()=>status.textContent='');input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});});q('[data-fraction-check]').addEventListener('click',check);q('[data-fraction-show]').addEventListener('click',show);q('[data-fraction-reset]').addEventListener('click',()=>{select.value=kind==='divide'?'2':'0';resetView();select.focus();});select.value=kind==='divide'?'2':'0';resetView();
 });
}
