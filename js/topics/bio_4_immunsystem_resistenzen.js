'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-immunity-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const start=zone.querySelector('[data-immunity-start]'),rule=zone.querySelector('[data-immunity-rule]'),rounds=zone.querySelector('[data-immunity-rounds]'),result=zone.querySelector('[data-immunity-result]');
  const element=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  const clear=()=>{result.replaceChildren();delete result.dataset.invalid;};
  for(const input of [start,rule,rounds])input.addEventListener('change',clear);
  zone.querySelector('[data-immunity-check]').addEventListener('click',()=>{
   clear();for(const[input,allowed,label,key]of [[start,['0','10','40'],'Anfangsbestand','start'],[rule,['N','S','V'],'Auswahlregel','rule'],[rounds,['0','1','2'],'Teilungsrunden','rounds']])if(!allowed.includes(input.value)){result.dataset.invalid=key;result.append(element('p','Bitte wähle einen gültigen Wert für '+label+'.'));input.focus();return;}
   let resistant=Number(start.value),sensitive=100-resistant;
   const rows=[['Anfang',sensitive,resistant]],format=n=>Number.isInteger(n)?String(n):n.toFixed(1).replace('.',',');
   sensitive=rule.value==='V'?0:rule.value==='S'?sensitive/10:sensitive;
   rows.push(['Direkt nach Auswahl',sensitive,resistant]);
   for(let i=1;i<=Number(rounds.value);i++){sensitive*=2;resistant*=2;rows.push(['Teilungsrunde '+i,sensitive,resistant]);}
   result.append(element('h4','Verlauf: '+start.value+' R am Anfang, Regel '+rule.value+', '+rounds.value+' Teilungsrunden'));
   const table=element('table');table.className='bio-data-table immunity-results';table.append(element('caption','Anzahl und Anteil getrennt: E = empfindlich, R = resistent gegenüber A. Anteile gegebenenfalls auf eine Nachkommastelle gerundet.'));
   const head=element('thead'),hr=element('tr'),labels=['Stufe','Anzahl E','Anzahl R','Gesamtzahl','Anteil R'];for(const label of labels){const th=element('th',label);th.scope='col';hr.append(th);}head.append(hr);table.append(head);const body=element('tbody');
   for(const[label,e,r]of rows){const row=element('tr'),total=e+r,share=total?r/total*100:null;row.dataset.immunityStage=label;row.dataset.sensitive=String(e);row.dataset.resistant=String(r);row.dataset.total=String(total);row.dataset.share=share===null?'undefined':String(share);const th=element('th',label);th.scope='row';row.append(th);[e,r,total,share===null?'Nicht bestimmbar (keine Bakterien)':format(share)+' %'].forEach((value,i)=>{const td=element('td',String(value));td.dataset.label=labels[i+1];row.append(td);});body.append(row);}table.append(body);result.append(table);
   const selected=rows[1],totalAfter=selected[1]+selected[2],comparison=element('p');comparison.dataset.immunityComparison='true';
   comparison.textContent=totalAfter===0?'Nach der Auswahl ist die Population leer. Der Anteil R ist nicht bestimmbar (0/0). Ohne überlebende Bakterien entstehen durch die vorgesehenen Teilungen auch keine neuen.':'Direkt nach der Auswahl bleibt die Anzahl R bei '+start.value+'. Die Gesamtzahl verändert sich von 100 auf '+totalAfter+'. Der Anteil R beträgt danach '+format(selected[2]/totalAfter*100)+' %.';
   result.append(comparison,element('p','In den folgenden Teilungsrunden verdoppeln sich E und R jeweils gleich oft. Dadurch bleibt ihr Anteil bei vorhandener Population gleich; ihre Anzahlen können wachsen. Es gibt nur eine Auswahl vor den Teilungen.'),element('p','Das Modell setzt die anfängliche Resistenz voraus. Keine Mutation, kein Genaustausch, keine Nahrungs- oder Platzgrenze. Die Regeln beschreiben keine Dosierung oder Therapie und sagen keine Behandlung voraus.'));result.focus();
  });
  zone.querySelector('[data-immunity-reset]').addEventListener('click',()=>{start.value='10';rule.value='V';rounds.value='1';clear();start.focus();});
 });
};
