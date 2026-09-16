'use strict';
function topicInit(){
 document.querySelectorAll('[data-flower-organization]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const control=zone.querySelector('[data-flower-kind]'),status=zone.querySelector('[data-flower-status]');
  const explanations={both:'Zwittrige Blüten: Jede gezeichnete Blüte enthält S und F. Die Blüte ist die betrachtete Einheit.',mono:'Einhäusig: Eine Pflanze trägt getrennte S-Blüten und F-Blüten. Keine der gezeichneten Blüten ist zwittrig.',dio:'Zweihäusig: Pflanze A trägt S-Blüten, Pflanze B trägt F-Blüten. Ein einzelner Blütenbefund genügt für diese Verteilung nicht.'};
  const update=()=>{zone.querySelectorAll('[data-flower-view]').forEach(view=>{view.hidden=view.dataset.flowerView!==control.value;});status.textContent=explanations[control.value];};
  control.addEventListener('change',update);zone.querySelector('[data-flower-reset]').addEventListener('click',()=>{control.value='both';update();control.focus();});update();
 });
 document.querySelectorAll('[data-germination-timeline]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const control=zone.querySelector('[data-germination-day]'),result=zone.querySelector('[data-germination-result]'),counts=[0,2,6,7,8],chart=zone.querySelector('svg');
  const marker=document.createElementNS('http://www.w3.org/2000/svg','line');marker.dataset.germinationMarker='';marker.setAttribute('y1','50');marker.setAttribute('y2','220');marker.setAttribute('stroke','#6b21a8');marker.setAttribute('stroke-width','2');marker.setAttribute('stroke-dasharray','2 5');chart.append(marker);
  const update=()=>{
   const day=Number(control.value),count=counts[day];marker.setAttribute('x1',String(42+72*day));marker.setAttribute('x2',String(42+72*day));
   result.textContent='Markiert: Tag '+day+'. Bisher gekeimt: A 0 von 10 = 0 %, B '+count+' von 10 = '+count*10+' %. '+(day===0?'Das ist die Ausgangszählung; eine frühere Zählung liegt nicht vor.':'Seit Tag '+(day-1)+' neu: A 0 Samen, B '+(count-counts[day-1])+' Samen ('+count+' − '+counts[day-1]+'). Die bisher gekeimten Samen werden nicht erneut als neue gezählt.');
  };
  control.addEventListener('change',update);zone.querySelector('[data-germination-reset]').addEventListener('click',()=>{control.value='0';update();control.focus();});update();
 });
 const terms={pollination:'Bestäubung',fertilization:'Befruchtung',development:'Samenentwicklung',dispersal:'Verbreitung',germination:'Keimung'};
 const tasks=[
  ['Ein Pollenkorn gelangt auf die Narbe einer Blüte.','pollination','Die Übertragung von Pollen auf eine Narbe heißt Bestäubung. Dabei ist die Eizelle noch nicht befruchtet.'],
  ['Eine männliche Geschlechtszelle verschmilzt mit der Eizelle.','fertilization','Die Zellverschmelzung ist Befruchtung. Sie folgt auf passende Bestäubung und Pollenschlauchwachstum.'],
  ['In einer Samenanlage entwickelt sich der Embryo; der Samen reift.','development','Der neue Embryo entwickelt sich im Samen. Das ist noch nicht das Auskeimen einer jungen Pflanze.'],
  ['Ein bereits reifer Samen wird an einen anderen Ort getragen.','dispersal','Das ist Verbreitung. Der Ort ändert sich; daraus folgt noch nicht, dass der Samen auch keimt.'],
  ['Ein Samen nimmt Wasser auf; die Keimwurzel tritt aus.','germination','Das Austreten der Keimwurzel zeigt Keimung. Sie nutzt zunächst Reserven des bereits gebildeten Samens.']
 ];
 document.querySelectorAll('[data-reproduction-practice]').forEach((zone,zoneIndex)=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const items=zone.querySelector('[data-reproduction-items]'),status=zone.querySelector('[data-reproduction-status]');
  const controls=tasks.map(([question,answer,explanation],index)=>{
   const row=document.createElement('div'),label=document.createElement('label'),select=document.createElement('select'),feedback=document.createElement('p');
   select.dataset.reproductionItem=String(index);feedback.id=`reproduction-feedback-${zoneIndex}-${index}`;select.setAttribute('aria-describedby',feedback.id);
   for(const [value,copy]of [['','Bitte wählen'],...Object.entries(terms)]){const option=document.createElement('option');option.value=value;option.textContent=copy;select.append(option);}
   label.append(document.createTextNode(question),select);row.append(label,feedback);items.append(row);
   select.addEventListener('change',()=>{feedback.textContent='';select.removeAttribute('aria-invalid');status.textContent='Auswahl geändert. Prüfe deine Antworten erneut.';});
   return {select,feedback,answer,explanation};
  });
  zone.querySelector('[data-reproduction-check]').addEventListener('click',()=>{
   let correct=0,missing=0;
   controls.forEach(({select,feedback,answer,explanation})=>{
    if(!select.value){missing++;feedback.textContent='Wähle einen Vorgang aus.';select.setAttribute('aria-invalid','true');return;}
    const right=select.value===answer;if(right)correct++;
    select.setAttribute('aria-invalid',String(!right));
    feedback.textContent=(right?'Richtig. ':`Deine Auswahl „${terms[select.value]}“ passt hier noch nicht. `)+explanation;
   });
   status.textContent=`${correct} von ${controls.length} Zuordnungen richtig.`+(missing?` ${missing} noch nicht ausgewählt.`:'')+' Die Begründungen stehen unter den Auswahlfeldern.';
  });
  zone.querySelector('[data-reproduction-reset]').addEventListener('click',()=>{
   controls.forEach(({select,feedback})=>{select.value='';select.removeAttribute('aria-invalid');feedback.textContent='';});
   status.textContent='Neue Runde: Alle Zuordnungen sind offen.';controls[0].select.focus();
  });
 });
}
window.topicInit=topicInit;
