'use strict';
function topicInit(){
 document.querySelectorAll('[data-contrast-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const toggle=zone.querySelector('[data-contrast-toggle]'),status=zone.querySelector('[data-contrast-status]');let equal=false;
  toggle.addEventListener('click',()=>{
   equal=!equal;
   zone.querySelector('[data-contrast-background="left"]').setAttribute('fill',equal?'#bbbbbb':'#222222');
   zone.querySelector('[data-contrast-background="right"]').setAttribute('fill',equal?'#bbbbbb':'#eeeeee');
   toggle.setAttribute('aria-pressed',String(equal));toggle.textContent=equal?'Unterschiedliche Hintergründe zeigen':'Hintergründe angleichen';
   zone.querySelector('svg').setAttribute('aria-label',equal?'Zwei gleich graue innere Quadrate vor gleichen Hintergründen.':'Zwei gleich graue innere Quadrate vor einem dunklen und einem hellen Hintergrund.');
   status.textContent=equal?'Die Hintergründe sind jetzt gleich. Die inneren Quadrate wurden nicht verändert: Beide haben weiterhin denselben Grauwert.':'Die Hintergründe sind wieder verschieden. Die inneren Quadrate behalten denselben Grauwert. Vergleiche, ob sich dein Eindruck verändert.';
  });
 });
}
window.topicInit=topicInit;
