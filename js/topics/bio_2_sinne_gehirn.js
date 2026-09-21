'use strict';
function topicInit(){
 document.querySelectorAll('[data-contrast-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const status=zone.querySelector('[data-contrast-status]'),buttons=[...zone.querySelectorAll('[data-contrast-mode]')];
  const modes={original:{left:'#222222',right:'#eeeeee',description:'A: links dunkler Hintergrund, rechts heller Hintergrund'},swapped:{left:'#eeeeee',right:'#222222',description:'B: links heller Hintergrund, rechts dunkler Hintergrund'},equal:{left:'#bbbbbb',right:'#bbbbbb',description:'C: beide Hintergründe gleich'}};
  const show=mode=>{
   const setting=modes[mode];
   zone.querySelector('[data-contrast-background="left"]').setAttribute('fill',setting.left);
   zone.querySelector('[data-contrast-background="right"]').setAttribute('fill',setting.right);
   buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.contrastMode===mode)));
   zone.querySelector('svg').setAttribute('aria-label',`Darstellung ${setting.description}. Die beiden inneren Quadrate behalten denselben vorgegebenen Grauwert.`);
   status.textContent=`Darstellung ${setting.description}. Grauwert, Größe und Position der inneren Quadrate wurden nicht verändert. Notiere deinen Eindruck.`;
  };
  buttons.forEach(button=>button.addEventListener('click',()=>show(button.dataset.contrastMode)));
  zone.querySelector('[data-contrast-reset]').addEventListener('click',()=>{show('original');buttons[0].focus();});
 });
}
window.topicInit=topicInit;
