'use strict';
function topicInit(){
 const cases={
  "pressure": {
    "title": "A: Druck an der Hand",
    "text": "Betrachtet wird nur diese Teilstrecke: Sinneszellen der Hand melden zunehmenden Druck über Nerven an Rückenmark und Gehirn.",
    "answer": "sensory",
    "explanation": "Die Angabe nennt die Meldung von Sinneszellen der Hand an Rückenmark und Gehirn. Das ist der sensorische Weg zum zentralen Nervensystem."
  },
  "command": {
    "title": "B: Die Hand schließt sich",
    "text": "Betrachtet wird nur diese Teilstrecke: Vom zentralen Nervensystem gelangen Signale über Nerven zu Handmuskeln, die Zugkraft entwickeln.",
    "answer": "motor",
    "explanation": "Die Angabe beginnt beim zentralen Nervensystem und endet bei Handmuskeln. Dieser beschriebene Weg ist motorisch."
  },
  "correction": {
    "title": "C: Einen rutschenden Stift halten",
    "text": "Betrachtet wird der gesamte beschriebene Vorgang: Sinneszellen melden, dass der Stift rutscht. Das zentrale Nervensystem verarbeitet die Information und passt Signale an Handmuskeln an.",
    "answer": "both",
    "explanation": "Die Beschreibung enthält zuerst die sensorische Rückmeldung und danach angepasste motorische Signale. Hier sind beide Richtungen belegt."
  },
  "unclear": {
    "title": "D: Ein unvollständiger Bericht",
    "text": "Im Protokoll steht nur: „In einem Armnerv wurde ein Signal beobachtet.“ Herkunft, Richtung und beteiligte Nervenfasern sind nicht angegeben.",
    "answer": "unknown",
    "explanation": "Der Bericht nennt weder Herkunft noch Richtung oder Fasertyp. Ein Armnerv kann verschiedene Nervenfasern enthalten; aus seiner Lage allein folgt keine Richtung."
  }
};
 document.querySelectorAll('[data-movement-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-movement-case]'),observation=zone.querySelector('[data-movement-observation]'),feedback=zone.querySelector('[data-movement-feedback]'),radios=[...zone.querySelectorAll('input[type=radio]')];
  const change=()=>{observation.textContent=cases[select.value].text;radios.forEach(r=>r.checked=false);feedback.textContent='';};
  select.addEventListener('change',change);
  radios.forEach(r=>r.addEventListener('change',()=>{feedback.textContent='Auswahl geändert. Prüfe deine Zuordnung und begründe sie mit der Fallbeschreibung.';}));
  zone.querySelector('[data-movement-check]').addEventListener('click',()=>{
   const chosen=radios.find(r=>r.checked);if(!chosen){feedback.textContent='Wähle zuerst eine Zuordnung. Suche in der Beschreibung nach Ausgang und Ziel der Information.';return;}
   const item=cases[select.value];feedback.textContent=(chosen.value===item.answer?'Richtig. ':'Noch nicht passend. ')+item.explanation;
  });
  zone.querySelector('[data-movement-reset]').addEventListener('click',()=>{select.value='pressure';change();select.focus();});change();
 });
}
window.topicInit=topicInit;
