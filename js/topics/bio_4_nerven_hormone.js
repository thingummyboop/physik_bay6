'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-regulation-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const start=zone.querySelector('[data-regulation-start]'),change=zone.querySelector('[data-regulation-change]'),mode=zone.querySelector('[data-regulation-mode]'),result=zone.querySelector('[data-regulation-result]');
  const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;},signed=n=>n>0?'+'+n:n<0?'−'+Math.abs(n):'0';
  const clear=()=>{result.replaceChildren();delete result.dataset.invalid;};for(const input of [start,change,mode])input.addEventListener('change',clear);
  zone.querySelector('[data-regulation-check]').addEventListener('click',()=>{
   clear();for(const[input,allowed,label,key]of [[start,['40','50','60'],'Ausgangswert','start'],[change,['-10','0','10'],'einmaligen Einfluss','change'],[mode,['on','off'],'Regelung','mode']])if(!allowed.includes(input.value)){result.dataset.invalid=key;result.append(el('p','Bitte wähle einen gültigen Wert für '+label+'.'));input.focus();return;}
   const initial=Number(start.value),influence=Number(change.value),rows=[['Vor Einfluss',initial,null]];let value=initial+influence;rows.push(['Nach Einfluss (0)',value,influence]);
   for(let step=1;step<=4;step++){const correction=mode.value==='off'||value===50?0:value<50?5:-5;value+=correction;rows.push(['Schritt '+step,value,correction]);}
   result.append(el('h4','Verlauf: '+initial+' E, Einfluss '+signed(influence)+' E, Regelung '+(mode.value==='on'?'an':'aus')));
   const figure=el('figure');figure.className='regulation-chart';const ns='http://www.w3.org/2000/svg',svg=(name,attrs,text)=>{const e=document.createElementNS(ns,name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text!==undefined)e.textContent=text;return e;};
   const graph=svg('svg',{viewBox:'0 0 320 280',role:'img','aria-label':'Verlauf der Modellgröße X. Durchgezogene Linie: X. Gestrichelte Linie: Zielwert 50 E. Alle Werte stehen in der folgenden Tabelle.'});
   graph.append(svg('text',{x:160,y:20,'text-anchor':'middle',fill:'currentColor','font-size':18},'X in erfundenen Einheiten E'));
   graph.append(svg('path',{d:'M40 48V218H294',fill:'none',stroke:'currentColor','stroke-width':1.5}));
   for(const n of [0,20,40,60,80]){const y=218-n*2;graph.append(svg('path',{d:'M36 '+y+'H40',stroke:'currentColor'}),svg('text',{x:32,y:y+5,'text-anchor':'end',fill:'currentColor','font-size':18},String(n)));}
   graph.append(svg('path',{d:'M40 118H290',stroke:'currentColor','stroke-dasharray':'5 4','stroke-width':1.5}));
   const points=rows.map((row,i)=>[40+i*50,218-row[1]*2]);graph.append(svg('polyline',{points:points.map(p=>p.join(',')).join(' '),fill:'none',stroke:'currentColor','stroke-width':3,'data-regulation-line':'true'}));
   points.forEach(([x,y],i)=>{graph.append(svg('circle',{cx:x,cy:y,r:4,fill:'currentColor'}),svg('text',{x,y:242,'text-anchor':'middle',fill:'currentColor','font-size':18},['B','0','1','2','3','4'][i]));});
   graph.append(svg('text',{x:160,y:269,'text-anchor':'middle',fill:'currentColor','font-size':18},'Stufe'));figure.append(graph,el('figcaption','Durchgezogen: X; gestrichelt: Ziel 50 E. B = vor Einfluss, 0 = danach, 1–4 = Regelschritte. Die Achse 0–80 E bleibt gleich. Stufen sind keine gemessenen Zeitabstände.'));result.append(figure);
   const table=el('table');table.className='bio-data-table regulation-results';table.append(el('caption','Alle Stufen: Einfluss genau einmal, danach vier Regelschritte. Abstand = Betrag der Differenz zu 50 E.'));
   const head=el('thead'),hr=el('tr'),labels=['Stufe','X (E)','Änderung (E)','Abstand zu 50 (E)'];for(const label of labels){const th=el('th',label);th.scope='col';hr.append(th);}head.append(hr);table.append(head);const body=el('tbody');
   rows.forEach(([label,v,delta])=>{const row=el('tr');row.dataset.regulationValue=String(v);row.dataset.regulationDelta=delta===null?'initial':String(delta);const th=el('th',label);th.scope='row';row.append(th);[String(v),delta===null?'—':signed(delta),String(Math.abs(v-50))].forEach((text,i)=>{const td=el('td',text);td.dataset.label=labels[i+1];row.append(td);});body.append(row);});table.append(body);result.append(table);
   const hit=rows.slice(1).findIndex(row=>row[1]===50),summary=el('p');summary.dataset.regulationConclusion='true';summary.textContent=hit===-1?'50 E wird nach dem Einfluss in keinem der vier Regelschritte erreicht.':hit===0?'Direkt nach dem Einfluss ist X bereits bei 50 E; es bleibt im Modell dort.':'Der Zielwert 50 E wird erstmals nach Regelschritt '+hit+' erreicht.';
   result.append(summary,el('p',mode.value==='on'?'Die Korrektur hängt vom jeweils aktuellen Wert ab. Unterhalb von 50 E erhöht sie X, oberhalb senkt sie X. Bei 50 E ist die Korrektur null.':'Die Regelung ist ausgeschaltet. Nach dem einmaligen Einfluss bleibt X gleich, weil das Modell keine weiteren Einflüsse vorsieht.'),el('p','Ein unveränderter Zielwert allein beweist keine Regelung: Vergleiche 50 E mit Einfluss 0 E bei an und aus. Modellgrenzen: fester Zielwert, sofortige Schritte, keine Messfehler oder weiteren Einflüsse. Kein Blutzuckerwert und keine Behandlungsvorhersage.'));result.focus();
  });
  zone.querySelector('[data-regulation-reset]').addEventListener('click',()=>{start.value='60';change.value='10';mode.value='on';clear();start.focus();});
 });
};
