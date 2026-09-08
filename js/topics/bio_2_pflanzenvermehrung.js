'use strict';
function topicInit(){
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
