'use strict';
// Keep the original exercise callable in language versions not yet revised.
window.checkPot=function(){const i=document.getElementById('pot1'),f=document.getElementById('potFb');if(!i||!f)return;f.setAttribute('role','status');const t=i.value.trim();f.textContent=!t||!Number.isFinite(Number(t))?'Gib zuerst eine Hochzahl ein.':Number(t)===4?'Richtig: Vier Faktoren 5 ergeben 5⁴.':'Zähle die Faktoren: 5 · 5 · 5 · 5 enthält viermal die 5.';};
// Used by the live model and the printable examples. Input text is never executed.
window.sciversePowerDiagram=function(mode,a,b){
 if(!['sum','difference','product'].includes(mode)||!Number.isInteger(a)||!Number.isInteger(b)||a<2||a>8||b<0||b>8)return '';
 if(mode!=='sum'&&a<b)return '';
 const blue='#dbeafe',yellow='#fef3c7',red='#fee2e2',purple='#e9d5ff';
 const text=(x,y,value,size=16)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#172554">${value}</text>`;
 const rect=(x,y,w,h,fill,area,key)=>w&&h?`<rect data-power-piece="${key}" data-area="${area}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#334155"/>${text(x+w/2,y+h/2+5,area)}`:'';
 let body='',title='',height=360;
 if(mode==='sum'){
  const u=260/(a+b),x=35,y=35;
  title=`Quadrat mit Seite ${a}+${b}; Teilflächen ${a*a}, zweimal ${a*b} und ${b*b}.`;
  body=rect(x,y,a*u,a*u,blue,a*a,'a2')+rect(x+a*u,y,b*u,a*u,yellow,a*b,'ab1')+rect(x,y+a*u,a*u,b*u,yellow,a*b,'ab2')+rect(x+a*u,y+a*u,b*u,b*u,purple,b*b,'b2')+text(x+a*u/2,24,a)+(b?text(x+a*u+b*u/2,24,b):'')+text(20,y+a*u/2+5,a)+(b?text(20,y+a*u+b*u/2+5,b):'')+text(180,347,`${(a+b)**2} = ${a*a} + ${a*b} + ${a*b} + ${b*b}`);
 }else if(mode==='difference'){
  const u=240/a,x=60,y=35,r=a-b;
  title=`Aus Quadrat ${a} mal ${a} zwei Streifen der Fläche ${a*b} entfernen; Überlappung ${b*b} einmal zurückgeben. Rest ${r*r}.`;
  body=rect(x,y,r*u,r*u,blue,r*r,'remaining')+rect(x+r*u,y,b*u,r*u,red,b*r,'right')+rect(x,y+r*u,r*u,b*u,red,b*r,'bottom')+rect(x+r*u,y+r*u,b*u,b*u,purple,b*b,'overlap')+text(x+a*u/2,24,`a = ${a}`)+text(30,y+a*u/2,a)+text(180,298,`Jeder ganze Randstreifen: ${a*b}`)+text(180,324,`Überlappung: ${b*b}; Rest: ${r*r}`)+text(180,348,`${a*a} − ${a*b} − ${a*b} + ${b*b} = ${r*r}`);
 }else{
  const u=144/a,x=35,y=35,r=a-b;height=400;
  title=`Quadratfläche ${a*a} minus Eckquadrat ${b*b}; restliche Teile ${a*r} und ${b*r} bilden ein Rechteck ${a+b} mal ${r}.`;
  body=rect(x,y,a*u,r*u,blue,a*r,'top')+rect(x,y+r*u,r*u,b*u,yellow,b*r,'bottom')+rect(x+r*u,y+r*u,b*u,b*u,'#e5e7eb',b*b,'removed')+text(x+a*u/2,24,`a = ${a}`)+`<path d="M250 65V177L244 166M250 177L256 166" fill="none" stroke="#172554"/>`+text(258,44,'Teile umlegen',13)+rect(x,205,a*u,r*u,blue,a*r,'newLeft')+rect(x+a*u,205,b*u,r*u,yellow,b*r,'newRight')+text(x+(a+b)*u/2,194,`a + b = ${a+b}`)+text(180,370,`Höhe a − b = ${r}`)+text(180,393,`${a*a} − ${b*b} = ${a+b} · ${r} = ${a*a-b*b}`);
  if(!r)body+=text(180,240,'Höhe 0: Es bleibt keine Fläche übrig.');
 }
 return `<svg data-power-diagram="${mode}" viewBox="0 0 360 ${height}" role="img" aria-label="${title}" style="background:white;font-family:Arial,sans-serif">${body}</svg>`;
};
window.topicInit=function(){
 const lab=document.querySelector('[data-power-lab]');if(!lab||lab.dataset.bound)return;lab.dataset.bound='true';
 const mode=lab.querySelector('[data-power-mode]'),aInput=lab.querySelector('[data-power-a]'),bInput=lab.querySelector('[data-power-b]'),diagram=lab.querySelector('[data-power-model]'),feedback=lab.querySelector('[role=status]');
 function update(){
  const a=Number(aInput.value),b=Number(bInput.value),key=mode.value;
  const v={sum:{original:`(${a} + ${b})²`,expanded:`${a*a} + ${2*a*b} + ${b*b}`,result:(a+b)**2,mistaken:a*a+b*b,mistake:'a² + b² (gemischter Term fehlt)'},difference:{original:`(${a} − ${b})²`,expanded:`${a*a} − ${2*a*b} + ${b*b}`,result:(a-b)**2,mistaken:a*a-b*b,mistake:'a² − b² (Quadrat der Differenz verwechselt)'},product:{original:`(${a} + ${b}) · (${a} − ${b})`,expanded:`${a*a} − ${b*b}`,result:a*a-b*b,mistaken:(a-b)**2,mistake:'(a − b)² (Produkt verwechselt)'}}[key];if(!v)return;
  lab.querySelector('[data-power-original]').textContent=`${v.original} = ${v.result}`;
  lab.querySelector('[data-power-expanded]').textContent=`${v.expanded} = ${v.result}`;
  lab.querySelector('[data-power-mistake]').textContent=`${v.mistake}: ${v.mistaken}`;
  lab.querySelector('[data-power-comparison]').textContent=v.mistaken===v.result?'Für diese Werte gleich. Eine passende Einsetzprobe beweist keine allgemeine Regel. Wähle andere Werte und nutze die Herleitung.':`Die Werte unterscheiden sich um ${Math.abs(v.result-v.mistaken)}. Damit ist die vorgeschlagene falsche Regel widerlegt.`;
  diagram.innerHTML=window.sciversePowerDiagram(key,a,b);diagram.hidden=!diagram.innerHTML;
  const notes={sum:'Die gesamte Fläche enthält a², zweimal ab und b².',difference:'Jeder ganze Randstreifen besteht aus einem roten Feld und der violetten Ecke. Beim Abziehen beider Streifen wird die Ecke doppelt erfasst; einmal b² zurückgeben.',product:'Das graue Eckquadrat wird entfernt. Der untere gelbe Reststreifen wird gedreht und rechts an das blaue Rechteck gelegt.'};
  feedback.textContent=`a = ${a}, b = ${b}. Beide richtigen Schreibweisen ergeben ${v.result}. `+(key!=='sum'&&a<b?'Für dieses Flächenbild wäre a − b negativ. Es wird deshalb nicht gezeichnet. Die algebraische Formel gilt weiterhin.':notes[key]+' Zahlen in den Teilflächen sind Flächeninhalte, Randzahlen sind Seitenlängen. Bei Länge 0 verschwindet die Teilfläche. Die Bilder werden zur besseren Lesbarkeit unterschiedlich groß dargestellt.');
 }
 for(const el of [mode,aInput,bInput])el.addEventListener('change',update);
 lab.querySelector('[data-power-reset]').addEventListener('click',()=>{mode.value='sum';aInput.value='6';bInput.value='2';update();mode.focus();});update();
};
