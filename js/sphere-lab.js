'use strict';
function sphereMeasures(r){return{surface:4*Math.PI*r*r,volume:4*Math.PI*r*r*r/3};}
function initSphereLabs(){document.querySelectorAll('[data-sphere-lab]').forEach(zone=>{
 if(zone.dataset.initialized)return;zone.dataset.initialized='true';const input=zone.querySelector('input'),circle=zone.querySelector('circle'),radius=zone.querySelector('[data-radius-line]'),status=zone.querySelector('[data-status]');
 const update=()=>{const r=Number(input.value),s=sphereMeasures(r),fmt=n=>n.toLocaleString('de-AT',{maximumFractionDigits:2});circle.setAttribute('r',r*10);radius.setAttribute('x2',130+r*10);zone.querySelector('[data-radius-label]').textContent='r = '+fmt(r)+' cm';zone.querySelector('[data-radius-output]').textContent=fmt(r);status.textContent=`Durchmesser d = ${fmt(2*r)} cm. Oberfläche O = 4 · π · ${fmt(r)}² ≈ ${fmt(s.surface)} cm². Volumen V = 4/3 · π · ${fmt(r)}³ ≈ ${fmt(s.volume)} cm³.`;zone.querySelector('svg').setAttribute('aria-label','Kreisförmiger Schnitt durch den Kugelmittelpunkt. Radius '+fmt(r)+' cm; der Durchmesser ist doppelt so groß.');};input.addEventListener('input',update);update();
});}
window.sphereMeasures=sphereMeasures;window.initSphereLabs=initSphereLabs;
