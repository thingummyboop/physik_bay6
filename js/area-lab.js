'use strict';
function areaValue(shape,b,h,a){return shape==='triangle'?b*h/2:shape==='trapezoid'?(a+b)*h/2:b*h;}
function initAreaLabs(){document.querySelectorAll('[data-area-lab]').forEach(zone=>{
 if(zone.dataset.initialized)return;zone.dataset.initialized='true';
 const shape=zone.querySelector('[data-shape]'),b=zone.querySelector('[data-base]'),h=zone.querySelector('[data-height]'),a=zone.querySelector('[data-top]'),svg=zone.querySelector('svg'),poly=svg.querySelector('polygon'),heightLine=svg.querySelector('[data-height-line]'),status=zone.querySelector('[data-status]');
 const render=()=>{const B=Number(b.value),H=Number(h.value),A=Number(a.value),kind=shape.value,scale=20,x=50,y=240;
  a.closest('label').hidden=kind!=='trapezoid';a.disabled=kind!=='trapezoid';
  const shift=kind==='parallelogram'?40:0,top=kind==='trapezoid'?A*scale:B*scale;
  const pts=kind==='triangle'?[[x,y],[x+B*scale,y],[x,y-H*scale]]:[[x,y],[x+B*scale,y],[x+shift+top,y-H*scale],[x+shift,y-H*scale]];
  poly.setAttribute('points',pts.map(p=>p.join(',')).join(' '));
  heightLine.setAttribute('x1',x+shift);heightLine.setAttribute('x2',x+shift);heightLine.setAttribute('y1',y);heightLine.setAttribute('y2',y-H*scale);
  zone.querySelector('[data-height-label]').setAttribute('y',y-H*scale/2);zone.querySelector('[data-height-label]').setAttribute('x',x+shift+5);zone.querySelector('[data-height-label]').textContent='h = '+H+' cm';
  zone.querySelector('[data-base-label]').textContent='b = '+B+' cm';zone.querySelector('[data-base-label]').setAttribute('x',x+B*scale/2);
  zone.querySelector('[data-top-label]').textContent=kind==='trapezoid'?'a = '+A+' cm':'';zone.querySelector('[data-top-label]').setAttribute('y',y-H*scale-10);
  for(const el of [b,h,a])zone.querySelector('[data-value="'+el.dataset.dimension+'"]').textContent=el.value;
  const formula=kind==='triangle'?`${B} · ${H} / 2`:kind==='trapezoid'?`(${A} + ${B}) · ${H} / 2`:`${B} · ${H}`;
  status.textContent='A = '+formula+' = '+areaValue(kind,B,H,A).toLocaleString(zone.dataset.locale||'de-AT')+' cm².';
  svg.setAttribute('aria-label',shape.options[shape.selectedIndex].text+': '+(zone.dataset.baseName||'Grundseite')+' '+B+' cm, '+(zone.dataset.heightName||'senkrechte Höhe')+' '+H+' cm'+(kind==='trapezoid'?', '+(zone.dataset.topName||'parallele zweite Seite')+' '+A+' cm':'')+'. '+status.textContent);
 };[shape,b,h,a].forEach(el=>el.addEventListener('input',render));render();
});}
window.areaValue=areaValue;window.initAreaLabs=initAreaLabs;
