'use strict';
function topicInit(){
 const expected=['eggs','larva','froglet','adult'];
 const hints=['Am Anfang stehen Eier in gallertigen Hüllen.','Nach dem Schlüpfen folgt hier eine Kaulquappe ohne sichtbare Beine.','Vier Beine und ein Schwanzrest kennzeichnen hier den Übergang.','Die letzte Karte zeigt das erwachsene Tier ohne Schwanz.'];
 document.querySelectorAll('[data-aquatic-order]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const selects=[...zone.querySelectorAll('[data-aquatic-slot]')],feedback=zone.querySelector('[data-aquatic-feedback]');
  selects.forEach(select=>select.addEventListener('change',()=>{feedback.textContent='Auswahl geändert. Begründe die Übergänge und prüfe erneut.';}));
  zone.querySelector('[data-aquatic-check]').addEventListener('click',()=>{
   const values=selects.map(s=>s.value);
   if(values.some(v=>!v)){feedback.textContent='Wähle für jeden der vier Schritte eine Karte.';return;}
   if(new Set(values).size!==4){feedback.textContent='Verwende jede Karte genau einmal. Mindestens eine Karte ist doppelt gewählt.';return;}
   const count=values.filter((v,i)=>v===expected[i]).length;
   feedback.replaceChildren();const p=document.createElement('p');p.textContent=count===4?'Alle vier Schritte passen: B → D → C → A.':'Noch nicht vollständig passend: '+count+' von 4 Schritten stimmen mit der vorgegebenen Abfolge überein.';feedback.append(p);
   const list=document.createElement('ol');values.forEach((v,i)=>{const li=document.createElement('li');li.textContent=(v===expected[i]?'Passt. ':'Prüfe diesen Schritt. ')+hints[i];list.append(li);});feedback.append(list);
   const note=document.createElement('p');note.textContent='Neue Eier entstehen erst durch Fortpflanzung: nächste Generation. Ein erwachsener Frosch wird nicht selbst wieder zum Ei. Die Karten zeigen keine festen Zeitabstände.';feedback.append(note);
  });
  zone.querySelector('[data-aquatic-reset]').addEventListener('click',()=>{selects.forEach(s=>s.value='');feedback.textContent='';selects[0].focus();});
 });
}
window.topicInit=topicInit;
