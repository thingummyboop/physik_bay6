'use strict';
function topicInit(){
 const cases={
  wood:{answer:'decomposer',observation:'Der Ast ist bereits abgestorben. Pilzfäden geben Enzyme ab, Holzbestandteile werden abgebaut und gelöste Produkte vom Pilz aufgenommen.',reason:'Zersetzung: Der Pilz nutzt organische Stoffe aus totem Material. Es gibt hier keinen lebenden Wirt, dessen Versorgung durch diesen Vorgang geschädigt wird.'},
  root:{answer:'mutualism',observation:'Ein Pilz erhält Zucker von einer lebenden Pflanze. Seine Fäden erschließen Wasser und Mineralstoffe, von denen ein Teil zur Pflanzenwurzel gelangt. In diesem Beispiel verbessert der Austausch die Versorgung beider Partner.',reason:'Symbiose: Beide Partner profitieren im beschriebenen Fall. Die Mykorrhiza verbindet den Pilz mit der Wurzel. Der Nutzen ist von Partnern und Umweltbedingungen abhängig.'},
  leaf:{answer:'parasite',observation:'Ein Pilz entnimmt einem lebenden Blatt organische Stoffe. Das betroffene Blattgewebe wird geschädigt; der Pflanze entsteht dadurch ein Nachteil.',reason:'Parasitismus: Der Pilz profitiert und der lebende Wirt wird geschädigt. Der entscheidende Hinweis ist die Wirkung, nicht allein der Ort des Pilzes.'},
  nearby:{answer:'unknown',observation:'Ein Fruchtkörper steht einen halben Meter neben einem lebenden Baum. Unbekannt sind seine Verbindung zu Wurzeln, die Herkunft seiner organischen Stoffe und seine Wirkung auf den Baum.',reason:'Die Hinweise reichen nicht aus: Nähe allein beweist keinen Stoffaustausch. Der Pilz könnte etwa auch abgestorbenes Material nutzen. Für eine Zuordnung fehlen Angaben zu Nahrungsquelle und Wirkung auf den Baum.'}
 };
 document.querySelectorAll('[data-fungi-relations]').forEach((zone,index)=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-fungi-case]'),observation=zone.querySelector('[data-fungi-observation]'),feedback=zone.querySelector('[data-fungi-feedback]');
  const radios=[...zone.querySelectorAll('input[type=radio]')];
  radios.forEach(r=>{r.name='fungi-relation-'+index;r.addEventListener('change',()=>{feedback.textContent='Auswahl geändert. Prüfe deine Begründung.';});});
  const update=()=>{observation.textContent=cases[select.value].observation;radios.forEach(r=>{r.checked=false;});feedback.textContent='';};
  select.addEventListener('change',update);
  zone.querySelector('[data-fungi-check]').addEventListener('click',()=>{
   const chosen=radios.find(r=>r.checked);
   if(!chosen){feedback.textContent='Wähle zuerst eine Beziehung aus. Nutze die Hinweise auf Nahrungsquelle und Wirkung.';return;}
   const item=cases[select.value];feedback.textContent=(chosen.value===item.answer?'Richtig. ':'Noch nicht. ')+item.reason;
  });
  zone.querySelector('[data-fungi-reset]').addEventListener('click',()=>{select.value='wood';update();select.focus();});
  update();
 });
}
window.topicInit=topicInit;
