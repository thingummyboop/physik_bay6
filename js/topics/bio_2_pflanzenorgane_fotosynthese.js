'use strict';
function topicInit(){
 document.querySelectorAll('[data-plant-balance]').forEach(zone=>{
  if(zone.dataset.initialized)return;
  zone.dataset.initialized='true';
  const select=zone.querySelector('[data-plant-light]');
  const update=()=>{
   const produced=Number(select.value),net=produced-2;
   zone.querySelector('[data-plant-produced]').textContent=String(produced);
   zone.querySelector('[data-plant-status]').textContent=net<0?
    'Bilanz: 0 − 2 = −2. Die Pflanze nimmt im Modell 2 Einheiten Sauerstoff auf. Im Dunkeln findet keine Fotosynthese statt; Zellatmung verbraucht weiter Sauerstoff.':net===0?
    'Bilanz: 2 − 2 = 0. Keine Nettoabgabe und keine Nettoaufnahme: Fotosynthese und Zellatmung laufen beide ab und gleichen sich im Modell aus.':
    'Bilanz: 6 − 2 = 4. Die Pflanze gibt im Modell 4 Einheiten Sauerstoff ab. Auch bei Licht verbraucht die Zellatmung 2 der gebildeten Einheiten.';
  };
  select.addEventListener('change',update);update();
 });
}
window.topicInit=topicInit;
