'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-bio4path-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-bio4path-select]'),panels=[...zone.querySelectorAll('[data-bio4path-case]')],result=zone.querySelector('[data-bio4path-result]'),progress=zone.querySelector('[data-bio4path-progress]'),plan=zone.querySelector('[data-bio4path-plan]'),all=zone.querySelector('[data-bio4path-all]'),states=new Map();
  const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  const chapterURL=panel=>{const url=new URL('../index.html',location.href);url.hash='topics/template.html?'+new URLSearchParams({topic:panel.dataset.chapter,mode:'review'})+'#learning-section-'+panel.dataset.section;return url.href;};
  const planURL=items=>{const url=new URL('../index.html',location.href);url.hash='topics/learning.html?'+new URLSearchParams({mode:'review',plan:items.map(p=>p.dataset.chapter).join(',')});return url.href;};
  const saved=()=>{try{const value=JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')||'{}');if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid result data');return{value};}catch{return{error:true};}};
  const savedLabel=(data,id)=>{
   if(data.error)return'Gespeicherter Kapitelcheck gerade nicht lesbar.';
   if(!Object.hasOwn(data.value,id))return'Noch kein gespeicherter Kapitelcheck in diesem Browser.';
   const raw=data.value[id];if(!raw||typeof raw!=='object'||Array.isArray(raw))return'Gespeicherter Kapitelcheck gerade nicht lesbar.';
   if(typeof window.currentChapterResult!=='function')return'Inhaltsfassung des gespeicherten Kapitelchecks gerade nicht prüfbar.';
   const current=window.currentChapterResult(id,raw);if(current.outdated)return'Kapitel überarbeitet: Der gespeicherte Versuch gehört zu einer früheren Inhaltsfassung.';
   if(typeof current.lastPercent!=='number'||!Number.isFinite(current.lastPercent)||current.lastPercent<0||current.lastPercent>100)return'Gespeicherter Kapitelcheck gerade nicht lesbar.';
   return'Letzter gespeicherter Kapitelcheck: '+current.lastPercent.toLocaleString('de-AT')+' Prozent. Das ist ein anderer Test als dieser Kurzcheck.';
  };
  const renderProgress=()=>{
   const data=saved();progress.replaceChildren();let checked=0,correct=0;
   panels.forEach((panel,i)=>{const state=states.get(i),li=el('li');li.dataset.bio4pathProgress=String(i);li.dataset.state=state?(state.correct?'correct':'review'):'unanswered';
    const heading=el('strong',panel.querySelector('legend').textContent),status=el('p',state?(state.correct?'Kurzcheck: Auswahl richtig. Prüfe auch deine eigene Begründung.':'Kurzcheck: noch unsicher. Bearbeite den verlinkten Abschnitt und begründe erneut.'):'Kurzcheck: noch nicht bearbeitet oder geändert, noch nicht geprüft.');
    const link=el('a','Passenden Abschnitt öffnen');link.href=chapterURL(panel);link.target='_top';
    const record=el('p',savedLabel(data,panel.dataset.chapter));record.className='bio4path-saved';li.append(heading,status,link,record);progress.append(li);if(state)checked++;if(state?.correct)correct++;
   });
   const open=panels.filter((p,i)=>!states.get(i)?.correct);plan.hidden=!open.length;if(open.length)plan.href=planURL(open);else plan.removeAttribute('href');all.href=planURL(panels);
   zone.querySelector('[data-bio4path-count]').textContent=checked+' von '+panels.length+' Kurzaufgaben geprüft; '+correct+' Auswahlantworten richtig. '+(open.length?open.length+' Kapitel haben noch offene Kurzaufgaben.':'Alle acht Auswahlantworten sind richtig. Nutze zusätzlich eigene Erklärungen und praktische Nachweise.');
  };
  const clear=()=>{result.replaceChildren();delete result.dataset.invalid;delete result.dataset.supported;};
  const active=()=>panels.findIndex(p=>p.dataset.bio4pathCase===select.value);
  const renderResult=()=>{clear();const i=active(),state=states.get(i);if(!state)return;result.dataset.supported=String(state.correct);result.append(el('h4',state.correct?'Die Auswahl passt.':'Prüfe deine Begründung noch einmal.'),el('p',state.feedback));const link=el('a','Hier den passenden Abschnitt wiederholen');link.href=chapterURL(panels[i]);link.target='_top';result.append(link);};
  const show=()=>{const i=active();panels.forEach((p,j)=>p.hidden=j!==i);renderResult();};select.addEventListener('change',show);
  panels.forEach((panel,i)=>panel.querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{states.delete(i);clear();renderProgress();})));
  zone.querySelector('[data-bio4path-check]').addEventListener('click',()=>{
   clear();const i=active();if(i<0){result.dataset.invalid='case';result.append(el('p','Bitte wähle eine Aufgabe.'));select.focus();return;}
   const chosen=panels[i].querySelector('input:checked');if(!chosen){result.dataset.invalid='answer';result.append(el('p','Bitte wähle zuerst eine Antwort.'));panels[i].querySelector('input').focus();return;}
   states.set(i,{correct:chosen.dataset.supported==='true',feedback:chosen.dataset.feedback});renderResult();renderProgress();result.focus();
  });
  zone.querySelector('[data-bio4path-reset]').addEventListener('click',()=>{states.clear();panels.forEach(p=>p.querySelectorAll('input').forEach(input=>input.checked=false));select.value='0';show();renderProgress();select.focus();});
  window.addEventListener('storage',event=>{if(event.key===null||event.key==='sciverse_chapter_quiz_results')renderProgress();});
  show();renderProgress();
 });
};
