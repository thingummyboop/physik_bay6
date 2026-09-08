'use strict';
function topicInit(){
 const parts=[
  ['membrane','Zellmembran','Grenzt die Zelle ab und reguliert den Stoffaustausch.'],
  ['plasma','Zellplasma','Zellinneres außerhalb des Zellkerns; hier laufen zahlreiche Stoffwechselvorgänge ab.'],
  ['nucleus','Zellkern','Enthält den größten Teil der Erbinformation der hier verglichenen Zellen.'],
  ['mitochondria','Mitochondrien','Hier laufen wichtige Schritte der Zellatmung ab.'],
  ['wall','Zellwand','Gibt zusätzliche Stabilität außerhalb der Zellmembran.'],
  ['vacuole','Große Zentralvakuole','Enthält Zellsaft; trägt zum Wasserhaushalt und Innendruck bei.'],
  ['chloroplasts','Chloroplasten','Hier findet Fotosynthese statt.']
 ];
 const notes={
  leaf:'Die grüne Blattzelle besitzt Chloroplasten und Mitochondrien: Fotosynthese und Zellatmung erfüllen unterschiedliche Aufgaben.',
  root:'Die unterirdische Wurzelzelle besitzt im Beispiel keine Chloroplasten, aber Zellwand, Zentralvakuole und Mitochondrien. Sie bleibt eine Pflanzenzelle und nutzt zugeführten Zucker.',
  animal:'Die tierische Hautzelle besitzt Zellmembran, Zellplasma, Zellkern und Mitochondrien, aber keine Zellwand, Chloroplasten oder große Zentralvakuole.'
 };
 document.querySelectorAll('[data-cell-comparison]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-cell-kind]'),body=zone.querySelector('[data-cell-rows]');
  const update=()=>{
   const kind=select.value;body.replaceChildren();
   parts.forEach(([id,name,task])=>{
    const present=id==='chloroplasts'?kind==='leaf':['wall','vacuole'].includes(id)?kind!=='animal':true;
    const row=document.createElement('tr');row.dataset.cellPart=id;
    [name,present?'Ja':'Nein',task].forEach((copy,index)=>{const cell=document.createElement(index===0?'th':'td');if(index===0)cell.scope='row';cell.textContent=copy;row.append(cell);});body.append(row);
   });
   zone.querySelector('[data-cell-status]').textContent=notes[kind];
  };
  select.addEventListener('change',update);update();
 });
}
window.topicInit=topicInit;
