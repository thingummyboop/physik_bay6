function topicInit() {
    bindNumberRangeWorkshops();
    const root = document.querySelector('[data-integer-move]');
    if (!root || root.dataset.bound) return;
    const start = root.querySelector('#integer-start');
    const steps = root.querySelector('#integer-steps');
    const direction = root.querySelector('#integer-direction');
    const status = root.querySelector('[data-integer-status]');
    const path = root.querySelector('[data-integer-path]');
    const figure = root.querySelector('[data-integer-figure]');
    function calculate() {
        const s = Number(start.value), n = Number(steps.value);
        path.textContent = '';
        if(figure){figure.hidden=true;figure.replaceChildren();}
        if (start.value === '' || steps.value === '' || !Number.isInteger(s) || !Number.isInteger(n) || s < -10 || s > 10 || n < 0 || n > 10) {
            status.textContent = 'Gib eine ganze Startzahl von −10 bis 10 und eine ganze Schrittzahl von 0 bis 10 ein.';
            return;
        }
        const sign = direction.value === 'plus' ? 1 : -1;
        status.textContent = `${s} ${sign === 1 ? '+' : '−'} ${n} = ${s + sign * n}. ${n} ${n === 1 ? 'Schritt' : 'Schritte'} nach ${sign === 1 ? 'rechts' : 'links'}.`;
        path.textContent = 'Besuchte Zahlen in zeitlicher Reihenfolge: ' + Array.from({length:n+1},(_,i)=>s+sign*i).join(' → ');
        if(figure){figure.hidden=false;figure.innerHTML=integerMovementSvg(s,n,sign);}
    }
    root.querySelector('[data-integer-run]').addEventListener('click', calculate);
    for (const input of [start, steps, direction]) {
        input.addEventListener('input', () => { status.textContent = ''; path.textContent = ''; if(figure){figure.hidden=true;figure.replaceChildren();} });
        input.addEventListener('keydown', event => { if(event.key === 'Enter') { event.preventDefault(); calculate(); } });
    }
    root.dataset.bound = '1';
    root.querySelector('[data-integer-reset]')?.addEventListener('click',()=>{start.value='3';steps.value='5';direction.value='minus';status.textContent='';path.textContent='';if(figure){figure.hidden=true;figure.replaceChildren();}start.focus();});
}

function integerMovementSvg(start,steps,sign){
 const end=start+steps*sign,min=Math.min(start,end,0)-1,max=Math.max(start,end,0)+1,x=n=>25+(n-min)*280/(max-min),label=(value,y,prefix)=>{const at=x(value),anchor=at<80?'start':at>250?'end':'middle',pos=at<80?5:at>250?325:at;return '<text x="'+pos+'" y="'+y+'" text-anchor="'+anchor+'" fill="currentColor" font-size="22">'+prefix+' '+String(value).replace('-','−')+'</text>';};
 let svg='<figure><svg class="number-range-svg" data-integer-svg viewBox="0 0 330 165" role="img" aria-labelledby="integer-movement-title"><title id="integer-movement-title">Start '+start+', '+steps+' Schritte nach '+(sign===1?'rechts':'links')+', Ergebnis '+end+'.</title><line x1="25" x2="305" y1="70" y2="70" stroke="currentColor" stroke-width="2"/>';
 for(let n=min;n<=max;n++)svg+='<line x1="'+x(n)+'" x2="'+x(n)+'" y1="64" y2="76" stroke="currentColor"/>';
 if(steps)svg+='<path data-integer-arrow d="M'+x(start)+' 50H'+x(end)+'M'+(x(end)-sign*8)+' 44L'+x(end)+' 50L'+(x(end)-sign*8)+' 56" fill="none" stroke="#2563eb" stroke-width="3"/>';
 svg+='<circle data-integer-origin cx="'+x(start)+'" cy="50" r="6" fill="#fff" stroke="#2563eb" stroke-width="2"/><rect data-integer-end x="'+(x(end)-4)+'" y="46" width="8" height="8" fill="#f59e0b" stroke="#111"/>'+label(start,32,'Start')+label(end,132,'Ziel')+'<text x="'+x(0)+'" y="100" text-anchor="middle" fill="currentColor" font-size="22">0</text></svg><figcaption>Kreis: Start. Quadrat: Ziel. Jeder Teilstrich ist eine Einheit. Die Ansicht passt sich dem Weg an; bei 0 Schritten bleiben beide Markierungen am selben Ort.</figcaption></figure>';return svg;
}
function numberRangeGcd(a,b){a=Math.abs(a);while(b){const r=a%b;a=b;b=r;}return a;}
function numberRangeFraction(n,d){const g=numberRangeGcd(n,d);return {n:n/g,d:d/g};}
function numberRangeLabel(r){return r.d===1?String(r.n):r.n+'/'+r.d;}
function numberClassModel(index){
 const bank=[['0',0,1],['4',4,1],['−4',-4,1],['1/2',1,2],['6/3',2,1],['0,5',1,2],['2,0',2,1],['0/7',0,1],['7/4',7,4],['−12',-12,1],['0,(3)',1,3],['0,(9)',1,1]];
 if(!Number.isInteger(index)||index<0||index>=bank.length)return null;
 const [label,n,d]=bank[index],integer=n%d===0,natural=integer&&n>=0,fraction=n>=0,explanation=label+' hat den Wert '+numberRangeLabel({n,d})+'. '+(natural?'Dieser Wert gehört zu allen drei betrachteten Bereichen.':integer?'Er ist ganz, aber negativ und gehört daher nicht zu den beiden nichtnegativen Bereichen.':'Er ist nichtnegativ und als Bruch darstellbar, aber nicht ganz.');
 return {label,n,d,flags:[natural,integer,fraction],explanation};
}
function numberBetweenModel(index,step){
 const bank=[[[0,1],[1,1]],[[3,1],[4,1]],[[1,2],[3,4]],[[1,3],[1,2]],[[2,5],[3,5]],[[1,1],[3,2]],[[7,4],[2,1]],[[1,10],[1,5]],[[4,1],[5,1]],[[0,1],[1,1000]],[[999,1000],[1,1]],[[5,6],[1,1]]];
 if(!Number.isInteger(index)||index<0||index>=bank.length||!Number.isInteger(step)||step<0||step>6)return null;
 const a=numberRangeFraction(...bank[index][0]),b=numberRangeFraction(...bank[index][1]);let right=b;const history=[];
 for(let i=0;i<step;i++){const mid=numberRangeFraction(a.n*right.d+right.n*a.d,2*a.d*right.d);history.push({left:a,right,mid});right=mid;}
 return {a,b,history,current:history.length?history[history.length-1]:{left:a,right:b,mid:null}};
}
function numberBetweenSvg(current){const a=numberRangeLabel(current.left),b=numberRangeLabel(current.right),m=current.mid&&numberRangeLabel(current.mid);return '<figure><svg class="number-range-svg" viewBox="0 0 330 155" role="img" aria-labelledby="number-between-title"><title id="number-between-title">Vergrößerte Ansicht zwischen '+a+' und '+b+(m?'; in der Mitte '+m:'')+'.</title><line x1="25" x2="305" y1="50" y2="50" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="50" r="5" fill="#2563eb"/><circle cx="305" cy="50" r="5" fill="#2563eb"/><text x="5" y="88" font-size="22" fill="currentColor">'+a+'</text><text x="325" y="88" text-anchor="end" font-size="22" fill="currentColor">'+b+'</text>'+(m?'<path data-number-midpoint d="M165 43L172 57H158Z" fill="#f59e0b" stroke="#111"/><text x="165" y="131" text-anchor="middle" font-size="22" fill="currentColor">'+m+'</text>':'')+'</svg><figcaption>Die beiden Kreise begrenzen das aktuell betrachtete Intervall.'+(m?' Das Dreieck markiert seinen Mittelwert.':' Noch kein Mittelwert markiert.')+'</figcaption></figure>';}
function bindNumberRangeWorkshops(){
 const classification=document.querySelector('[data-number-classify]');if(classification&&!classification.dataset.bound){classification.dataset.bound='true';const select=classification.querySelector('select'),boxes=[...classification.querySelectorAll('input')],out=classification.querySelector('[data-number-class-status]');for(let i=0;numberClassModel(i);i++){const option=document.createElement('option');option.value=String(i);option.textContent=numberClassModel(i).label;select.append(option);}const clear=()=>{out.textContent='';};select.addEventListener('change',()=>{boxes.forEach(b=>b.checked=false);clear();});boxes.forEach(b=>b.addEventListener('change',clear));classification.querySelector('[data-number-class-check]').addEventListener('click',()=>{const m=numberClassModel(Number(select.value)),correct=boxes.every((b,i)=>b.checked===m.flags[i]);out.textContent=(correct?'Richtig: ':'Noch nicht: ')+m.explanation;});classification.querySelector('[data-number-class-reset]').addEventListener('click',()=>{select.value='4';boxes.forEach(b=>b.checked=false);clear();select.focus();});select.value='4';}
 const host=document.querySelector('[data-number-between]');if(!host||host.dataset.bound)return;host.dataset.bound='true';const q=s=>host.querySelector(s),select=q('select'),n=q('#number-between-n'),den=q('#number-between-d'),out=q('[data-number-between-status]'),view=q('[data-number-between-view]'),list=q('[data-number-between-history]'),button=q('[data-number-between-step]');let step=0;
 for(let i=0;numberBetweenModel(i,0);i++){const m=numberBetweenModel(i,0),option=document.createElement('option');option.value=String(i);option.textContent=numberRangeLabel(m.a)+' bis '+numberRangeLabel(m.b);select.append(option);}
 function render(){const m=numberBetweenModel(Number(select.value),step);view.innerHTML=numberBetweenSvg(m.current);list.innerHTML=m.history.map(h=>'<li>Zwischen '+numberRangeLabel(h.left)+' und '+numberRangeLabel(h.right)+' liegt ('+numberRangeLabel(h.left)+' + '+numberRangeLabel(h.right)+') : 2 = <strong>'+numberRangeLabel(h.mid)+'</strong>.</li>').join('');button.disabled=step===6;}
 function reset(){step=0;n.value='';den.value='';out.textContent='';render();}
 function check(){const ns=n.value.trim(),ds=den.value.trim();if(!/^\d{1,6}$/.test(ns)||!/^\d{1,6}$/.test(ds)||Number(ds)===0){out.textContent='Gib einen nichtnegativen Zähler und einen positiven Nenner mit jeweils höchstens sechs Ziffern ein.';return;}const a=Number(ns),b=Number(ds),m=numberBetweenModel(Number(select.value),0),inside=a*m.a.d>m.a.n*b&&a*m.b.d<m.b.n*b;out.textContent=inside?'Richtig: '+ns+'/'+ds+' liegt strikt zwischen den gewählten Ausgangswerten. Auch andere Zwischenzahlen sind möglich.':'Noch nicht: Deine Zahl muss größer als '+numberRangeLabel(m.a)+' und kleiner als '+numberRangeLabel(m.b)+' sein. Die Endpunkte zählen nicht als Zwischenwerte.';}
 select.addEventListener('change',reset);[n,den].forEach(input=>{input.addEventListener('input',()=>out.textContent='');input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});});q('[data-number-between-check]').addEventListener('click',check);button.addEventListener('click',()=>{if(step>=6)return;step++;render();const m=numberBetweenModel(Number(select.value),step);out.textContent='Halbierung '+step+': '+numberRangeLabel(m.current.mid)+' liegt strikt im zuletzt betrachteten Intervall.'+(step===6?' Die Anzeige endet hier; mathematisch lässt sich die Halbierung immer fortsetzen.':'');if(step===6)q('[data-number-between-reset]').focus();});q('[data-number-between-reset]').addEventListener('click',()=>{select.value='2';reset();select.focus();});select.value='2';reset();
}
