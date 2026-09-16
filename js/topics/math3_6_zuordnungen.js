'use strict';
(() => {
window.checkKino=function checkKino(){
 const input=document.getElementById('kino_in'),feedback=document.getElementById('kino_feedback');if(!input||!feedback)return;
 const raw=input.value.trim().replace(',','.');
 if(!/^\d+(?:\.\d{1,2})?$/.test(raw)||!Number.isFinite(Number(raw))){input.setAttribute('aria-invalid','true');feedback.textContent='Gib einen nicht negativen Preis in Euro ein, mit höchstens zwei Nachkommastellen.';return;}
 input.removeAttribute('aria-invalid');feedback.textContent=Number(raw)===50?'Richtig: 20 € : 2 = 10 € pro Ticket. 5 · 10 € = 50 €.':'Noch nicht: Bestimme zuerst den Preis für ein Ticket mit 20 € : 2. Multipliziere diesen Stückpreis dann mit 5.';
};
const assignmentModels={a:{values:[2,3,4],initial:3,label:'Preis je Heft in Euro'},b:{values:[6,12,24],initial:12,label:'Arbeitsmenge in Personenstunden'},c:{values:[0,5,10],initial:5,label:'Feste Gebühr in Euro'}};
const assignmentValue=(key,p,x)=>key==='b'?(x===0?null:p/x):key==='a'?p*x:p+3*x;
const assignmentFormat=n=>{if(n===null)return 'nicht definiert';const rounded=Math.round(n*100)/100;return (Math.abs(rounded-n)>1e-9?'≈ ':'')+new Intl.NumberFormat('de-AT',{maximumFractionDigits:2}).format(rounded);};
const assignmentFormula=(key,p)=>key==='b'?`y = ${p} : x`:key==='a'?`y = ${p}x`:`y = ${p} + 3x`;
// The diagram is also embedded as a static example in the printable source.
window.sciverseAssignmentSvg=function(key,p,selected=2){
 if(!assignmentModels[key]||!assignmentModels[key].values.includes(p)||!Number.isInteger(selected)||selected<0||selected>6)return '';
 const inverse=key==='b',maxY=inverse?24:30,unit=inverse?'Stunden':'Euro',quantity=inverse?'Personen':'Hefte';
 const px=n=>45+n*45,py=n=>240-n*200/maxY,txt=(x,y,t,anchor='middle',size=18)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="#172033">${t}</text>`;
 let body='<path d="M45 35V240H325" stroke="#172033" fill="none" stroke-width="2"/>';
 for(let n=0;n<=6;n++)body+=txt(px(n),268,n);
 for(const n of inverse?[0,6,12,18,24]:[0,5,10,15,20,25,30])body+=`<path d="M45 ${py(n)}H315" stroke="#d1d5db"/>`+txt(32,py(n)+5,n,'end');
 body+=txt(45,20,'y / '+unit,'start',16)+txt(330,289,'x / '+quantity,'end',16);
 for(let x=0;x<=6;x++){
  const y=assignmentValue(key,p,x);if(y===null)continue;const extension=key==='c'&&p>0&&x===0;
  body+=`<circle data-assignment-point="${x}" data-value="${y}" data-extension="${extension}" cx="${px(x)}" cy="${py(y)}" r="5" fill="${extension?'white':'#176c90'}" stroke="#176c90" stroke-width="2"/>`;
  if(selected===x)body+=`<circle data-assignment-selected="${x}" cx="${px(x)}" cy="${py(y)}" r="10" fill="none" stroke="#172033" stroke-width="3"/>`;
 }
 const y=assignmentValue(key,p,selected),description=`${assignmentFormula(key,p)}. x in ${quantity}, y in ${unit}. ${y===null?'Kein Punkt bei x = 0.':`Markiert: (${selected} | ${assignmentFormat(y)}).`} ${key==='c'&&p>0?'Hohler Punkt bei x = 0: nur mathematische Fortsetzung.':''}`;
 return `<svg data-assignment-svg="${key}" viewBox="0 0 360 300" role="img" aria-label="${description}" style="background:white;font-family:Arial,sans-serif">${body}</svg>`;
};
window.topicInit=function topicInit(){
 const input=document.getElementById('kino_in'),feedback=document.getElementById('kino_feedback');
 if(input&&feedback&&!input.dataset.bound){input.dataset.bound='true';input.setAttribute('aria-describedby','kino_feedback');feedback.setAttribute('role','status');feedback.setAttribute('aria-atomic','true');input.addEventListener('input',()=>{feedback.textContent='';input.removeAttribute('aria-invalid');});input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();window.checkKino();}});const button=input.closest('.interactive-zone').querySelector('button');button.type='button';button.onclick=window.checkKino;}
 const zone=document.querySelector('[data-assignment-graph]');if(!zone||zone.dataset.bound)return;zone.dataset.bound='true';
 const model=zone.querySelector('#assignment-model'),parameter=zone.querySelector('[data-assignment-parameter]'),slider=zone.querySelector('#assignment-x'),value=zone.querySelector('#assignment-x-value'),result=zone.querySelector('#assignment-result'),plot=zone.querySelector('[data-assignment-plot]'),table=zone.querySelector('[data-assignment-live-table]'),verdict=zone.querySelector('[data-assignment-verdict-feedback]');
 for(const el of [model,slider,parameter].filter(Boolean))el.setAttribute('aria-describedby',result.id);
 const settings=()=>({key:model.value,p:parameter?Number(parameter.value):assignmentModels[model.value].initial,x:Number(slider.value)});
 function resetParameter(){if(!parameter)return;const m=assignmentModels[model.value];parameter.replaceChildren(...m.values.map(n=>{const o=document.createElement('option');o.value=String(n);o.textContent=String(n);return o;}));parameter.value=String(m.initial);zone.querySelector('[data-assignment-parameter-label]').textContent=m.label;}
 function draw(){
  const {key,p,x}=settings(),inverse=key==='b',y=assignmentValue(key,p,x),unit=inverse?'Stunden':'Euro';
  value.textContent=x+' '+(inverse?'Personen':'Hefte');slider.setAttribute('aria-valuetext',value.textContent);
  result.textContent=assignmentFormula(key,p)+'. '+(y===null?'Für x = 0 ist die Division nicht definiert. Ohne Personen wird die Modellarbeit nicht erledigt.':`Bei x = ${x} gilt y = ${assignmentFormat(y)} ${unit}. `+(key==='b'?`Für positive x bleibt x · y = ${p} Personenstunden.`:key==='a'?`Für positive x bleibt y : x = ${p} Euro je Heft.`:`Der Preis enthält ${p} Euro feste Gebühr und 3 Euro je Heft.`)+(key==='c'&&p>0&&x===0?' Dies ist nur die mathematische Fortsetzung. Ohne Bestellung fällt in dieser Aufgabe keine Gebühr an.':''));
  plot.innerHTML=window.sciverseAssignmentSvg(key,p,x);
  if(table){table.innerHTML=`<caption>${assignmentFormula(key,p)} – x in ${inverse?'Personen':'Heften'}, y in ${unit}</caption><thead><tr><th scope="col">x</th><th scope="col">y</th><th scope="col">y : x</th><th scope="col">x · y</th></tr></thead><tbody>`+Array.from({length:7},(_,n)=>{const v=assignmentValue(key,p,n),extension=key==='c'&&p>0&&n===0;return `<tr${n===x?' data-selected="true"':''}><th scope="row">${n}${n===x?' ←':''}${extension?' *':''}</th><td>${v===null?'–':assignmentFormat(v)}</td><td>${n===0?'–':assignmentFormat(v/n)}</td><td>${v===null?'–':assignmentFormat(n*v)}</td></tr>`;}).join('')+'</tbody>';}
  const note=zone.querySelector('[data-assignment-table-note]');if(note)note.textContent='← markiert die Auswahl. – bedeutet: nicht definiert. ≈ kennzeichnet Rundung auf zwei Nachkommastellen.'+(key==='c'&&p>0?' * und der hohle Punkt bei x = 0 gehören nur zur mathematischen Fortsetzung; keine Bestellung bedeutet hier keine Gebühr.':'');
  if(verdict)verdict.textContent='';
 }
 model.addEventListener('change',()=>{resetParameter();draw();});parameter?.addEventListener('change',draw);slider.addEventListener('input',draw);
 for(const button of zone.querySelectorAll('[data-assignment-verdict]'))button.addEventListener('click',()=>{const {key,p}=settings(),expected=key==='b'?'inverse':key==='a'||p===0?'direct':'neither';const reason=expected==='direct'?'Für positive x ist y : x konstant; die mathematische Gerade geht durch den Ursprung.':expected==='inverse'?'Für positive x ist x · y konstant. Doppelt so viele Personen benötigen im Modell die halbe Zeit.':'Bei positiver Grundgebühr sind weder y : x noch x · y konstant. Die steigenden Werte allein genügen nicht.';verdict.textContent=(button.dataset.assignmentVerdict===expected?'Richtig: ':'Noch nicht: ')+reason;});
 zone.querySelector('[data-assignment-reset]').addEventListener('click',()=>{model.value='a';resetParameter();slider.value='2';draw();model.focus();});resetParameter();draw();
};
})();
