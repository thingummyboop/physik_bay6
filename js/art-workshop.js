'use strict';
// Original geometric study: controls change only this local illustration.
function initArtWorkshops(){
 document.querySelectorAll('[data-art-framing]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const control=zone.querySelector('[data-framing-choice]'),headline=zone.querySelector('[data-framing-headline]'),feedback=zone.querySelector('[data-framing-feedback]'),status=zone.querySelector('[data-framing-status]');
  const selected=()=>{if(control.selectedIndex<0)control.selectedIndex=0;return control.options[control.selectedIndex];};
  const render=()=>{headline.textContent=selected().textContent;feedback.hidden=true;feedback.textContent='';status.textContent='Gewählte Überschrift: '+headline.textContent+'. Falltext und Planzeichnung bleiben gleich. Prüfe Schwerpunkt und Belege.';};
  control.addEventListener('change',render);
  zone.querySelector('[data-framing-check]').addEventListener('click',()=>{if(control.selectedIndex<0)render();feedback.textContent=selected().dataset.reason;feedback.hidden=false;status.textContent=feedback.textContent;});
  zone.querySelector('[data-framing-reset]').addEventListener('click',()=>{control.selectedIndex=0;render();});render();
 });
 document.querySelectorAll('[data-art-story]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const list=zone.querySelector('[data-story-list]'),original=[...list.children],status=zone.querySelector('[data-story-status]'),preview=zone.querySelector('[data-story-preview]');
  let saved=null;
  const order=()=>[...list.children].map(el=>el.dataset.storyFrame).join(' – ');
  const render=()=>{
   [...list.children].forEach((frame,index)=>frame.querySelectorAll('[data-story-move]').forEach(button=>{
    const blocked=Number(button.dataset.storyMove)<0?index===0:index===list.children.length-1;
    button.setAttribute('aria-disabled',String(blocked));
   }));
   status.textContent='Aktuelle Folge: '+order()+'. '+(saved?'Gemerkte Folge: '+saved+'. Vergleiche die mögliche Handlung und begründe mit Bildhinweisen.':'Merke eine Folge, um sie mit einer anderen Anordnung zu vergleichen.')+' Die Varianten bleiben nur während dieses Seitenbesuchs erhalten.';
  };
  list.addEventListener('click',event=>{
   const button=event.target.closest('[data-story-move]');if(!button||!list.contains(button)||button.getAttribute('aria-disabled')==='true')return;
   const frame=button.closest('[data-story-frame]');
   if(Number(button.dataset.storyMove)<0)frame.previousElementSibling.before(frame);else frame.nextElementSibling.after(frame);
   render();button.focus();
  });
  zone.querySelector('[data-story-remember]').addEventListener('click',()=>{
   saved=order();const heading=document.createElement('h4');heading.textContent='Gemerkte Folge A: '+saved;
   const copy=list.cloneNode(true);copy.removeAttribute('data-story-list');copy.querySelectorAll('button').forEach(el=>el.remove());
   preview.replaceChildren(heading,copy);preview.hidden=false;render();
  });
  zone.querySelector('[data-story-reset]').addEventListener('click',()=>{list.append(...original);saved=null;preview.replaceChildren();preview.hidden=true;render();});
  render();
 });
 document.querySelectorAll('[data-art-brand-gap]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const control=zone.querySelector('[data-brand-gap]'),combination=zone.querySelector('[data-brand-combination]'),value=zone.querySelector('[data-brand-gap-value]'),status=zone.querySelector('[data-brand-status]'),preview=zone.querySelector('[data-brand-preview]');let saved=null;
  combination.querySelector('svg').style.flexShrink='0';
  const render=()=>{combination.style.gap=control.value+'px';value.textContent=control.value;control.setAttribute('aria-valuetext',control.value+' Pixel Abstand zwischen Wort und Bild');};
  control.addEventListener('input',()=>{render();status.textContent='Aktueller Abstand: '+control.value+' Pixel. Wort und Bild bleiben unverändert. Beschreibe ihre Zusammengehörigkeit.';});
  zone.querySelector('[data-brand-remember]').addEventListener('click',()=>{saved=Number(control.value);const heading=document.createElement('h4');heading.textContent='Gemerkte Variante A: '+saved+' Pixel Abstand';const copy=combination.cloneNode(true);copy.removeAttribute('data-brand-combination');copy.dataset.brandSaved='true';const frame=document.createElement('div');frame.style.overflowX='auto';frame.tabIndex=0;frame.setAttribute('role','region');frame.setAttribute('aria-label','Gemerkte Wort-Bild-Kombination mit '+saved+' Pixel Abstand');frame.append(copy);preview.replaceChildren(heading,frame);preview.hidden=false;status.textContent='Abstand A: '+saved+' Pixel gemerkt. Verändere nun den Abstand.';});
  zone.querySelector('[data-brand-compare]').addEventListener('click',()=>{status.textContent=saved===null?'Merke zuerst Abstand A.':saved===Number(control.value)?'Beide Abstände sind gleich: '+saved+' Pixel.':'Abstand A: '+saved+' Pixel; aktueller Abstand B: '+control.value+' Pixel. Welcher passt zu deiner Absicht? Begründe an der Anordnung.';});
  zone.querySelector('[data-brand-reset]').addEventListener('click',()=>{control.value=16;saved=null;preview.replaceChildren();preview.hidden=true;render();status.textContent='Ausgangsabstand 16 Pixel wiederhergestellt; gemerkter Abstand gelöscht.';});render();
 });
 document.querySelectorAll('[data-art-ad]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-ad-emphasis]'),invitation=zone.querySelector('[data-ad-invitation]'),details=zone.querySelector('[data-ad-details]'),status=zone.querySelector('[data-ad-status]');
  const render=()=>{const showDetails=select.value==='details';
   for(const [element,emphasis] of [[invitation,!showDetails],[details,showDetails]]){element.style.fontSize=emphasis?'2rem':'1rem';element.style.fontWeight=emphasis?'800':'400';}
   status.textContent=(showDetails?'Ort und Zeit sind':'Die Einladung ist')+' größer und fetter hervorgehoben. Die andere Information bleibt kleiner und normal gesetzt sichtbar. Welche Wirkung vermutest du? Begründe sie am Entwurf.';
  };
  select.addEventListener('change',render);zone.querySelector('[data-ad-reset]').addEventListener('click',()=>{select.value='invitation';render();});render();
 });
 document.querySelectorAll('[data-art-study]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const svg=zone.querySelector('svg'),circle=svg.querySelector('[data-circle]'),ground=svg.querySelector('[data-ground]'),status=zone.querySelector('[data-status]');
  const controls=[...zone.querySelectorAll('[data-setting]')];
  const state=()=>({...Object.fromEntries(controls.map(el=>[el.dataset.setting,Number(el.value)])),...(captionChoice?{caption:captionChoice.selectedOptions[0].textContent}:{})});
  const describe=s=>`Kreis: waagrechte Position ${s.x}, Radius ${s.size}. Hintergrund: Farbton ${s.hue} Grad. Bildausschnitt: ${s.crop===0?'ganzes Bild':'verkleinerter Ausschnitt'}.${s.caption?' Bildunterschrift: '+s.caption+'.':''}`;
  const render=()=>{const s=state();circle.setAttribute('cx',s.x);circle.setAttribute('r',s.size);ground.setAttribute('fill',`hsl(${s.hue} 45% 80%)`);svg.setAttribute('viewBox',s.crop===0?'0 0 400 240':'80 30 240 180');svg.setAttribute('aria-label','Geometrische Studie: ein orangefarbener Kreis, ein blaues Rechteck und ein dunkler diagonaler Strich. '+describe({...s,caption:undefined}));controls.forEach(el=>zone.querySelector('[data-value="'+el.dataset.setting+'"]').textContent=el.value);};
  controls.forEach(el=>el.addEventListener('input',render));
  const captionChoice=zone.querySelector('[data-caption-choice]'),caption=zone.querySelector('[data-art-caption]');
  const renderCaption=()=>{if(!captionChoice||!caption)return;caption.textContent=captionChoice.selectedOptions[0].textContent;status.textContent='Bildunterschrift: '+caption.textContent+'. Die Zeichnung bleibt unverändert. Beschreibe, welche Deutung der Text nahelegt.';};
  captionChoice?.addEventListener('change',renderCaption);
  const preview=document.createElement('figure');preview.dataset.artStudySaved='true';preview.hidden=true;status.before(preview);
  let a=null;
  zone.querySelector('[data-remember]').addEventListener('click',()=>{a=state();const heading=document.createElement('h4');heading.textContent='Gemerkte Variante A';const copy=svg.cloneNode(true);const description=document.createElement('figcaption');description.textContent=describe(a);preview.replaceChildren(heading,copy,description);preview.hidden=false;status.textContent='Variante A gemerkt. '+describe(a)+' Verändere nun genau ein Merkmal und vergleiche.';});
  zone.querySelector('[data-compare]').addEventListener('click',()=>{if(!a){status.textContent='Merke zuerst eine Variante A.';return;}const b=state(),names={x:'Position',size:'Größe',hue:'Hintergrundfarbe',crop:'Bildausschnitt',caption:'Bildunterschrift'},changed=Object.keys(a).filter(k=>a[k]!==b[k]);status.textContent=changed.length?'Verändert: '+changed.map(k=>names[k]).join(', ')+'. Variante A: '+describe(a)+' Variante B: '+describe(b)+' Beschreibe die Wirkung und begründe sie an sichtbaren Merkmalen.':'A und B sind gleich. Ändere ein Merkmal, um seine Wirkung zu untersuchen.';});
  zone.querySelector('[data-reset]').addEventListener('click',()=>{controls.forEach(el=>el.value=el.defaultValue);a=null;preview.replaceChildren();preview.hidden=true;render();if(captionChoice){captionChoice.value='description';renderCaption();}status.textContent='Ausgangsbild wiederhergestellt.';});render();
 });
}
window.initArtWorkshops=initArtWorkshops;
