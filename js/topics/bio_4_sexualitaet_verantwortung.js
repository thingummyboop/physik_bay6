'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-responsibility-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;
  zone.dataset.initialized='true';
  const select=zone.querySelector('[data-responsibility-select]'),panels=[...zone.querySelectorAll('[data-responsibility-case]')],result=zone.querySelector('[data-responsibility-result]');
  const clear=()=>{result.replaceChildren();delete result.dataset.supported;delete result.dataset.invalid;};
  const show=()=>{clear();panels.forEach(panel=>{panel.hidden=panel.dataset.responsibilityCase!==select.value;panel.querySelectorAll('input').forEach(input=>{input.checked=false;});});};
  select.addEventListener('change',show);
  panels.forEach(panel=>panel.querySelectorAll('input').forEach(input=>input.addEventListener('change',clear)));
  zone.querySelector('[data-responsibility-check]').addEventListener('click',()=>{
   clear();const panel=panels.find(panel=>panel.dataset.responsibilityCase===select.value);
   if(!panel){result.dataset.invalid='case';result.textContent='Bitte wähle einen der sechs Fälle.';select.focus();return;}
   const answer=panel.querySelector('input:checked');
   if(!answer){result.dataset.invalid='answer';result.textContent='Wähle zuerst eine Antwort zu diesem erfundenen Fall.';panel.querySelector('input').focus();return;}
   result.dataset.supported=answer.dataset.supported;
   const title=document.createElement('h4');title.textContent=answer.dataset.supported==='true'?'Die Entscheidung ist begründet.':'Diese Entscheidung trägt nicht.';
   const reason=document.createElement('p');reason.textContent=answer.dataset.reason;
   const next=document.createElement('p');next.textContent='Prüfe auch eine andere Antwort und vergleiche die Gründe. Alle Fälle sind erfunden; die Übung bewertet keine persönlichen Erfahrungen.';
   result.append(title,reason,next);result.focus();
  });
  zone.querySelector('[data-responsibility-reset]').addEventListener('click',()=>{select.value='0';show();select.focus();});
  show();
 });
};
