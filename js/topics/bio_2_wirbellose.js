'use strict';
function topicInit(){
 const examples=[
  {id:'ant',name:'Ameisenarbeiterin',legs:'6',shell:'no',description:'Erwachsenes Insekt: drei Beinpaare, Kopf, Brust und Hinterleib; Fühlerpaar, keine Flügel bei dieser Arbeiterin.'},
  {id:'spider',name:'Kreuzspinne',legs:'8',shell:'no',description:'Spinnentier: vier Laufbeinpaare, zwei deutlich erkennbare große Körperabschnitte, keine Fühler.'},
  {id:'woodlouse',name:'Kellerassel',legs:'many',shell:'no',description:'Erwachsenes Krebstier an Land: sieben Laufbeinpaare und gegliederter Körper. Das Außenskelett ist kein Schneckenhaus.'},
  {id:'snail',name:'Gehäuseschnecke',legs:'0',shell:'yes',description:'Weichtier mit Gehäuse und muskulösem Kriechfuß; keine gegliederten Laufbeine.'},
  {id:'worm',name:'Regenwurm',legs:'0',shell:'no',description:'Ringelwurm mit gegliedertem Körper und kleinen Borsten; keine gegliederten Laufbeine und kein Gehäuse.'}
 ];
 document.querySelectorAll('[data-invertebrate-key]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const legs=zone.querySelector('[data-key-legs]'),shell=zone.querySelector('[data-key-shell]'),list=zone.querySelector('[data-key-results]'),status=zone.querySelector('[data-key-status]');
  const update=()=>{
   const matching=examples.filter(e=>(!legs.value||e.legs===legs.value)&&(!shell.value||e.shell===shell.value));
   list.replaceChildren();matching.forEach(e=>{const item=document.createElement('li');item.dataset.animalExample=e.id;const name=document.createElement('strong');name.textContent=e.name;item.append(name,document.createTextNode(': '+e.description));list.append(item);});
   status.textContent=matching.length?`${matching.length} von 5 Beispielen passen zu den gewählten Merkmalen. Die Auswahl umfasst nicht alle Tierarten.`:'Keines der fünf Beispiele passt. Prüfe die Beobachtung oder nutze einen umfangreicheren Schlüssel. Kein Treffer bedeutet nicht, dass ein solches Tier unmöglich ist.';
  };
  legs.addEventListener('change',update);shell.addEventListener('change',update);
  zone.querySelector('[data-key-reset]').addEventListener('click',()=>{legs.value='';shell.value='';update();legs.focus();});update();
 });
}
window.topicInit=topicInit;
