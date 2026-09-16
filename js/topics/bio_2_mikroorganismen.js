'use strict';
function topicInit(){
 document.querySelectorAll('[data-kitchen-trace]').forEach(zone=>{
  if(zone.dataset.initialized)return;
  zone.dataset.initialized='true';
  let hands=false,tools=false,salad=false,step=0,history=[];
  const status=zone.querySelector('[data-microbe-status]'),log=zone.querySelector('[data-microbe-history]');
  const names={touch:'Rohware anfassen',cut:'Rohware schneiden',hands:'Hände waschen',tools:'Geräte reinigen',salad:'Salat schneiden'};
  const render=message=>{
   for(const [id,value]of Object.entries({source:true,hands,tools,salad})){
    const card=zone.querySelector(`[data-microbe-station="${id}"]`);
    card.dataset.marked=String(value);
    zone.querySelector(`[data-microbe-mark="${id}"]`).textContent=value?'● Modellspur vorhanden':'○ Keine Modellspur';
   }
   status.textContent=message+' Hände '+Number(hands)+', Geräte '+Number(tools)+', Salat '+Number(salad)+'. 1 = Modellspur, 0 = keine Modellspur.';
   log.replaceChildren();
   for(const item of history){const li=document.createElement('li');li.textContent=item;log.appendChild(li);}
  };
  zone.querySelectorAll('[data-microbe-action]').forEach(button=>button.addEventListener('click',()=>{
   const action=button.dataset.microbeAction;
   if(action==='touch')hands=true;
   else if(action==='cut'){hands=true;tools=true;}
   else if(action==='hands')hands=false;
   else if(action==='tools')tools=false;
   else if(action==='salad'){const shared=hands||tools||salad;hands=shared;tools=shared;salad=shared;}
   else return;
   step++;
   history.push(`${step}. ${names[action]}: Hände ${Number(hands)}, Geräte ${Number(tools)}, Salat ${Number(salad)}.`);history=history.slice(-4);
   const explanation=action==='salad'?(salad?'Beim Kontakt wird die vorhandene Spur zwischen Händen, Geräten und Salat weitergegeben.':'Keine der drei beteiligten Stationen hatte eine Modellspur.'):(action==='hands'||action==='tools')?'Nur die gewählte Station wurde im Modell gereinigt.':'Die Rohware bleibt eine Quelle; die berührten Stationen erhalten ihre Spur.';
   render(`Schritt ${step}: ${names[action]}. ${explanation}`);
  }));
  zone.querySelector('[data-microbe-reset]').addEventListener('click',()=>{hands=false;tools=false;salad=false;step=0;history=[];render('Neu gestartet. Nur die Rohware trägt eine Spur.');zone.querySelector('[data-microbe-action]').focus();});
  render('Start. Nur die Rohware trägt eine Spur.');
 });
}
window.topicInit=topicInit;
