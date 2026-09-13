function checkKino() {
 const input = document.getElementById('kino_in'), feedback = document.getElementById('kino_feedback');
 if (!input || !feedback) return;
 const raw = input.value.trim().replace(',', '.');
 if (!/^\d+(?:\.\d{1,2})?$/.test(raw) || !Number.isFinite(Number(raw))) {
  feedback.textContent = 'Gib einen nicht negativen Preis in Euro ein, mit höchstens zwei Nachkommastellen.';
  return;
 }
 feedback.textContent = Number(raw) === 50 ? 'Richtig: 20 € : 2 = 10 € pro Ticket. 5 × 10 € = 50 €.' : 'Noch nicht: Bestimme zuerst den Preis für ein Ticket mit 20 € : 2. Multipliziere diesen Stückpreis dann mit 5.';
}
function topicInit() {
 initAssignmentGraph();
 const input = document.getElementById('kino_in'), feedback = document.getElementById('kino_feedback');
 if (!input || !feedback || input.dataset.bound === 'true') return;
 input.dataset.bound = 'true';
 input.setAttribute('aria-describedby', 'kino_feedback');
 feedback.setAttribute('role', 'status');feedback.setAttribute('aria-live', 'polite');feedback.setAttribute('aria-atomic', 'true');
 input.addEventListener('input', () => { feedback.textContent = ''; });
 input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault();checkKino(); } });
 const button = input.closest('.interactive-zone').querySelector('button');
 button.type = 'button';button.onclick = checkKino;
}

function initAssignmentGraph() {
 const zone=document.querySelector('[data-assignment-graph]');
 if(!zone||zone.dataset.bound==='true')return;zone.dataset.bound='true';
 const model=zone.querySelector('#assignment-model'),slider=zone.querySelector('#assignment-x'),value=zone.querySelector('#assignment-x-value'),result=zone.querySelector('#assignment-result'),plot=zone.querySelector('[data-assignment-plot]');
 [model,slider].forEach(control=>control.setAttribute('aria-describedby',result.id));
 const svgElement=(name,attributes={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',name);Object.entries(attributes).forEach(([key,val])=>el.setAttribute(key,val));if(text!==undefined)el.textContent=text;return el;};
 const format=n=>new Intl.NumberFormat('de-AT',{maximumFractionDigits:2}).format(n);
 const draw=()=>{
  const m=model.value,x=Number(slider.value),inverse=m==='b',maxY=inverse?12:25,unit=inverse?'Stunden':'Euro',quantity=inverse?'Personen':'Hefte';
  const calculate=n=>inverse?(n===0?null:12/n):(m==='c'?5:0)+3*n;
  const y=calculate(x);value.textContent=x+' '+quantity;slider.setAttribute('aria-valuetext',value.textContent);
  const formula=inverse?'y = 12 : x':m==='c'?'y = 5 + 3x':'y = 3x';
  result.textContent=formula+'. '+(y===null?'Für x = 0 ist die Division nicht definiert. Ohne Personen wird die Modellarbeit nicht erledigt.':
   'Bei x = '+x+' gilt y = '+format(y)+' '+unit+'. '+(inverse?'Das Produkt x · y bleibt 12 Personenstunden.':m==='c'?'Die feste Gebühr verhindert direkte Proportionalität.':'Der Preis pro Heft bleibt 3 €.')+(m==='c'&&x===0?' Die 5 € sind der Achsenabschnitt der mathematischen Fortsetzung; ohne Bestellung fällt in dieser Aufgabe keine Gebühr an.':''));
  const svg=svgElement('svg',{viewBox:'0 0 500 300',role:'img','aria-label':'Modell '+m.toUpperCase()+': '+formula+'. x in '+quantity+', y in '+unit+'. '+(y===null?'Kein Punkt für x = 0.':'Ausgewähltes Wertepaar ('+x+' | '+format(y)+').'),style:'display:block;width:100%;max-width:600px;height:auto;background:#fff;color:#172033'});
  const px=n=>55+n*65,py=n=>245-n*200/maxY;
  svg.append(svgElement('path',{d:'M55 35 V245 H450',stroke:'#172033',fill:'none','stroke-width':2}));
  for(let n=0;n<=6;n++){
   svg.append(svgElement('text',{x:px(n),y:265,'text-anchor':'middle','font-size':13,fill:'#172033'},n));
  }
  const ticks=inverse?[0,3,6,9,12]:[0,5,10,15,20,25];
  ticks.forEach(n=>{svg.append(svgElement('line',{x1:55,y1:py(n),x2:445,y2:py(n),stroke:'#d1d5db'}));svg.append(svgElement('text',{x:45,y:py(n)+4,'text-anchor':'end','font-size':13,fill:'#172033'},n));});
  svg.append(svgElement('text',{x:55,y:20,'font-size':14,fill:'#172033'},'y / '+unit),svgElement('text',{x:445,y:290,'text-anchor':'end','font-size':14,fill:'#172033'},'x / '+quantity));
  for(let n=0;n<=6;n++){
   const ordinate=calculate(n);if(ordinate===null)continue;
   svg.append(svgElement('circle',{cx:px(n),cy:py(ordinate),r:5,fill:'#176c90','data-assignment-point':n,'data-value':ordinate}));
   if(n===x)svg.append(svgElement('circle',{cx:px(n),cy:py(ordinate),r:10,fill:'none',stroke:'#172033','stroke-width':3,'data-assignment-selected':n}));
  }
  plot.replaceChildren(svg);
 };
 model.addEventListener('change',draw);slider.addEventListener('input',draw);
 zone.querySelector('[data-assignment-reset]').addEventListener('click',()=>{model.value='a';slider.value='2';draw();model.focus();});draw();
}
