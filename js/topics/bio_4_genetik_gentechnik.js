'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-genetics-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const first=zone.querySelector('[data-genetics-parent1]'),second=zone.querySelector('[data-genetics-parent2]'),rule=zone.querySelector('[data-genetics-rule]'),result=zone.querySelector('[data-genetics-result]');
  const clear=()=>{result.replaceChildren();delete result.dataset.invalid;};
  for(const input of [first,second,rule])input.addEventListener('change',clear);
  const element=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  zone.querySelector('[data-genetics-check]').addEventListener('click',()=>{
   clear();for(const[input,allowed,label,key]of [[first,['AA','Aa','aa'],'Genotyp von Elternteil 1','parent1'],[second,['AA','Aa','aa'],'Genotyp von Elternteil 2','parent2'],[rule,['unknown','dominant','intermediate'],'Merkmalsregel','rule']])if(!allowed.includes(input.value)){result.dataset.invalid=key;result.append(element('p','Bitte wähle einen gültigen Wert für '+label+'.'));input.focus();return;}
   const counts={AA:0,Aa:0,aa:0},names={unknown:'Keine Zuordnung',dominant:'A dominant',intermediate:'Zwischenform'},colors={AA:'Rot',Aa:rule.value==='dominant'?'Rot':'Rosa',aa:'Weiß'};
   result.append(element('h4',first.value+' × '+second.value+' – '+names[rule.value]));
   result.append(element('p','Jede Zeile und Spalte steht für einen der beiden möglichen Allelbeiträge des jeweiligen Elternteils. Gleiche Buchstaben wiederholen sich bei AA und aa bewusst. Jedes Feld hat die Wahrscheinlichkeit 1/4 = 25 %.'));
   const square=element('table');square.className='bio-data-table genetics-square';
   const caption=element('caption','Viererquadrat: Zeilen = Elternteil 1, Spalten = Elternteil 2');square.append(caption);
   const head=element('thead'),headRow=element('tr');headRow.append(element('th','1 ↓ / 2 →'));for(const a of second.value){const th=element('th',a);th.scope='col';headRow.append(th);}head.append(headRow);square.append(head);
   const body=element('tbody');for(const a of first.value){const row=element('tr'),th=element('th',a);th.scope='row';row.append(th);for(const b of second.value){const genotype=a===b?a+b:'Aa';counts[genotype]++;const td=element('td');td.dataset.geneticsCombination=genotype;td.append(element('strong',genotype),element('br'),element('span',a+' + '+b));row.append(td);}body.append(row);}square.append(body);result.append(square);
   const table=element('table');table.className='bio-data-table genetics-distribution';const summaryHead=element('thead'),summaryRow=element('tr');for(const label of ['Genotyp','Wahrscheinlichkeit','Ausprägung']){const th=element('th',label);th.scope='col';summaryRow.append(th);}summaryHead.append(summaryRow);table.append(summaryHead);const summaryBody=element('tbody');
   for(const genotype of ['AA','Aa','aa']){const row=element('tr'),th=element('th',genotype);th.scope='row';row.append(th);const chance=element('td',counts[genotype]+'/4 = '+counts[genotype]*25+' %');chance.dataset.label='Wahrscheinlichkeit';chance.dataset.geneticsGenotype=genotype;chance.dataset.geneticsCount=String(counts[genotype]);row.append(chance);const trait=element('td',rule.value==='unknown'?'Unbekannt':colors[genotype]);trait.dataset.label='Ausprägung';row.append(trait);summaryBody.append(row);}table.append(summaryBody);result.append(table);
   const phenotype=element('p');phenotype.dataset.geneticsPhenotype=rule.value;
   if(rule.value==='unknown')phenotype.textContent='Ohne Merkmalsregel sind keine Farbwahrscheinlichkeiten ableitbar. Auch 100 % Aa legt allein noch keine Farbe fest.';
   else{const red=counts.AA+(rule.value==='dominant'?counts.Aa:0),pink=rule.value==='intermediate'?counts.Aa:0,white=counts.aa;phenotype.textContent='Farbwahrscheinlichkeiten: Rot '+red*25+' %, Rosa '+pink*25+' %, Weiß '+white*25+' %.';phenotype.dataset.geneticsColors=[red,pink,white].join(',');}
   result.append(phenotype,element('p','Die Weitergabe bleibt bei einem Wechsel der Merkmalsregel gleich. Das Viererquadrat ist keine feste Reihenfolge von vier Nachkommen. Frühere Ergebnisse verändern die Wahrscheinlichkeit des nächsten Nachkommens im unabhängigen Modell nicht.'),element('p','Erfundene Pflanzenart, ein Genort und vorgegebene Regeln: keine Vorhersage menschlicher Eigenschaften oder individueller Erkrankungen.'));result.focus();
  });
  zone.querySelector('[data-genetics-reset]').addEventListener('click',()=>{first.value='Aa';second.value='Aa';rule.value='unknown';clear();first.focus();});
 });
};
