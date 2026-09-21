'use strict';
window.topicInit=function(){
 const zone=document.querySelector('[data-respiration-lab]');if(!zone||zone.dataset.initialized==='true')return;zone.dataset.initialized='true';
 const count=zone.querySelector('[data-respiration-count]'),seconds=zone.querySelector('[data-respiration-seconds]'),out=zone.querySelector('[data-respiration-output]');
 const changed=()=>{count.removeAttribute('aria-invalid');out.textContent='Zahlen geändert. Sage das Ergebnis voraus und berechne dann neu.';};
 count.addEventListener('input',changed);seconds.addEventListener('change',changed);
 const presets=[[8,30],[13,30],[9,30],[16,60]];
 zone.querySelectorAll('[data-respiration-preset]').forEach(button=>button.addEventListener('click',()=>{const pair=presets[Number(button.dataset.respirationPreset)];count.value=pair[0];seconds.value=pair[1];changed();}));
 zone.querySelector('[data-respiration-calculate]').addEventListener('click',()=>{
  const raw=count.value.trim(),n=Number(raw),t=Number(seconds.value);
  if(!raw||!Number.isInteger(n)||n<0||n>120){count.setAttribute('aria-invalid','true');out.textContent='Trage eine ganze Anzahl von 0 bis 120 ein. Diese Grenzen dienen nur der Rechenaufgabe.';return;}
  if(![15,30,60].includes(t)){out.textContent='Wähle eine Messdauer von 15, 30 oder 60 Sekunden.';return;}
  count.removeAttribute('aria-invalid');const rate=n*60/t,step=60/t;
  out.replaceChildren();
  const p=document.createElement('p');p.dataset.respirationRate=String(rate);p.textContent=`${n} × 60 ÷ ${t} = ${rate} Atemzüge pro Minute.`;out.append(p);
  const difference=document.createElement('p');difference.dataset.respirationDifference=String(step);difference.textContent=`Ein zusätzlich gezählter Atemzug verändert das Ergebnis um ${step} Atemzüge pro Minute. Das erfasst nur diesen Zählunterschied, nicht alle Messfehler.`;out.append(difference);
  const limit=document.createElement('p');limit.textContent='Das Ergebnis gilt als umgerechnete Häufigkeit für diesen Zeitraum. Atemtiefe, bewegte Liter Luft, Fitness oder eine Krankheit sind damit nicht bestimmt.';out.append(limit);
 });
 zone.querySelector('[data-respiration-reset]').addEventListener('click',()=>{count.value='8';seconds.value='30';count.removeAttribute('aria-invalid');out.textContent='';count.focus();});
};
