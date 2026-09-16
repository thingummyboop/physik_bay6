'use strict';
// Decode character references without interpreting text as HTML markup.
function worksheetText(value) {
 const decoder=document.createElement('textarea');
 return String(value).replace(/&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi, entity=>{decoder.innerHTML=entity;return decoder.value;});
}
function worksheetQuestions(topic) {
 const questions=[...(topic.sections||[]).filter(s=>!s.practiceOnly).flatMap(s=>s.quizzes||[]),...(topic.quizzes||[]),...(topic.diplom?.questions||[])],seen=new Set();
 return questions.filter(q=>{if(q.practiceOnly||!q.question)return false;const key=JSON.stringify([q.question.replace(/^\s*\d+[.)]\s*/,''),q.answers]);if(seen.has(key))return false;seen.add(key);return true;});
}
function renderWorksheetQuestions(topic,content) {
 const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=worksheetText(text);return el;};
 const questions=worksheetQuestions(topic);
 if(!questions.length){content.append(make('p','Für dieses Kapitel sind noch keine druckbaren Übungsfragen hinterlegt. Nutze die Aufgaben im Lernkapitel.'));return;}
 const context=make('p','Bearbeite die Aufgaben mit dem Lernkapitel. Dort findest du die zugehörigen Texte, Abbildungen und interaktiven Modelle. Kreuze bei Auswahlfragen eine Antwort an und begründe deine Wahl.');content.append(context);
 const answers=make('section');answers.id='ws-solutions';answers.hidden=true;answers.append(make('h2','Lösungen und Hinweise'));
 questions.forEach((q,i)=>{
  const block=make('section');block.className='question-block';block.append(make('h2',(i+1)+'. '+q.question.replace(/^\s*\d+[.)]\s*/,'')));
  const options=make('ul');options.className='worksheet-options';
  (q.answers||[]).forEach(answer=>options.append(make('li','□ '+answer.text)));block.append(options);
  block.append(make('p','Begründung / Rechenweg:'));for(let n=0;n<2;n++){const line=make('div');line.className='answer-lines';block.append(line);}content.append(block);
  const solution=make('section');solution.className='question-block';solution.append(make('h3','Aufgabe '+(i+1)));
  const correct=(q.answers||[]).filter(a=>a.correct);solution.append(make('p',correct.length?correct.map(a=>a.text).join(' / '):'Besprich deinen Lösungsweg mit der Lehrkraft.'));
  for(const answer of correct)if(answer.feedback)solution.append(make('p',answer.feedback));answers.append(solution);
 });content.append(answers);
 const control=document.getElementById('ws-solution-control');control.hidden=false;
 const checkbox=document.getElementById('ws-include-solutions');checkbox.checked=false;checkbox.onchange=()=>{answers.hidden=!checkbox.checked;};
}

function appendPaperSolutions(topic, content) {
 const entries=[];
 // Generated practice and its answers must use the same draw, including when reloading.
 for(const template of content.querySelectorAll('template[data-generated-worksheet-solutions]')){
  entries.push(...template.content.cloneNode(true).children);
  template.remove();
 }
 for(const section of topic.sections||[]){
  const source=document.createElement('div');source.innerHTML=section.content||'';
  for(const details of source.querySelectorAll('details[data-worksheet-solution="true"]')){
   const block=document.createElement('section');block.className='ws-paper-solution';
   const heading=document.createElement('h3'),summary=details.querySelector(':scope > summary');heading.textContent=worksheetText(section.title)+' – '+(summary?.textContent||'Vergleichslösung');block.append(heading);
   const body=document.createElement('div');for(const node of [...details.childNodes])if(node!==summary)body.append(node.cloneNode(true));
   body.querySelectorAll('script,style,details,svg,canvas,img,iframe,object,embed,audio,video,input,button,select,textarea,[hidden]').forEach(el=>el.remove());
   for(const el of body.querySelectorAll('*'))for(const attr of [...el.attributes])if(/^on/i.test(attr.name)||['style','id'].includes(attr.name))el.removeAttribute(attr.name);
   block.append(body);entries.push(block);
  }
 }
 if(!entries.length)return;
 let answers=document.getElementById('ws-solutions');
 if(!answers){answers=document.createElement('section');answers.id='ws-solutions';answers.hidden=true;const title=document.createElement('h2');title.textContent='Lösungen und Hinweise';answers.append(title);content.append(answers);}
 const heading=document.createElement('h2');heading.textContent='Vergleichslösungen zu den Papieraufgaben';answers.append(heading,...entries);
 const checkbox=document.getElementById('ws-include-solutions');document.getElementById('ws-solution-control').hidden=false;checkbox.checked=false;checkbox.onchange=()=>{answers.hidden=!checkbox.checked;};
}
function appendWorksheetWorkshop(topic,material) {
 const spec=topic.workshop;if(!spec)return;
 const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=worksheetText(text);return el;};
 const task=make('section');task.dataset.worksheetWorkshop='true';
 task.append(make('h3',spec.title||'Praktischer Lernauftrag'));
 if(spec.listen){const spoken=make('p',spec.listen);spoken.lang=spec.voice||(topic.contentLanguage==='de-en'?'en':'de');task.append(make('h4','Hörtext / Lesetext'),spoken,make('p','Für die Hörübung liest eine zweite Person den Text vor. Decke den Text beim Zuhören ab. Allein kannst du ihn als Lesetext bearbeiten und diese Änderung notieren.'));}
 task.append(make('p',spec.writing||''),make('p','Bearbeite den Auftrag auf einem eigenen Blatt oder mit dem angegebenen Material. Nutze die folgenden Felder, um deine Arbeit zu prüfen. Die Selbsteinschätzung ist keine automatische Benotung.'));
 for(const criterion of spec.rubric||[]){
  const block=make('div');block.className='worksheet-reflection';block.append(make('p','□ '+criterion),make('p','Beleg aus meiner Arbeit / nächster Überarbeitungsschritt:'));
  for(let n=0;n<2;n++){const line=make('div');line.className='answer-lines';block.append(line);}task.append(block);
 }
 material.append(task);
}
function renderWorksheetWorkshopMaterial(topic,content) {
 if(!topic.workshop)return;
 const material=document.createElement('section');material.id='ws-workshop-material';appendWorksheetWorkshop(topic,material);content.append(material);
 const control=document.getElementById('ws-material-control'),checkbox=document.getElementById('ws-include-material');control.hidden=false;checkbox.checked=true;checkbox.onchange=()=>{material.hidden=!checkbox.checked;};
 const label=document.getElementById('ws-material-label');if(label)label.textContent='Praktischen Lernauftrag und Selbsteinschätzung mitdrucken';
}
function renderArtWorksheetMaterial(topic,content) {
 const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=worksheetText(text);return el;};
 const material=make('section');material.id='ws-art-material';material.append(make('h2','Lernmaterial und Gestaltungsauftrag'));
 material.append(make('p','Die Bildlabore enthalten hier statische Vorlagen und Papieraufträge; im Lernkapitel kannst du zusätzlich die interaktiven Einstellungen nutzen. Externe Museumsabbildungen sind über die angegebenen Quellen zugänglich.'));
 for(const section of topic.sections||[]){
  const article=make('article');article.append(make('h3',section.title));const body=make('div');
  body.innerHTML=(section.content||'').replace(/\{\{QUIZ_[^}]+\}\}/g,'');
  body.querySelectorAll('[data-art-study]').forEach(zone=>{
   const svg=zone.querySelector('svg'),captions=[...zone.querySelectorAll('[data-caption-choice] option')].map(option=>option.textContent);
   zone.replaceChildren(make('h4','Bildvorlage für den Papiervergleich'));
   if(svg)zone.append(svg);
   zone.append(make('p','Übertrage die geometrische Studie vereinfacht zweimal auf Papier. Verändere in der zweiten Zeichnung nur ein Merkmal, etwa Kreisgröße oder Position. Für einen Ausschnittvergleich deckst du einen Randbereich mit einem Blatt ab. Beschreibe zuerst die sichtbare Änderung, dann deine vermutete Wirkung. Die Darstellung ist eine eigene schematische Studie, kein historisches Kunstwerk.'));
   if(captions.length){zone.append(make('p','Vergleiche dieselbe unveränderte Zeichnung mit diesen Bildunterschriften:'));const list=make('ul');captions.forEach(text=>list.append(make('li',text)));zone.append(list);}
  });
  body.querySelectorAll('[data-art-ad]').forEach(zone=>{
   const original=zone.querySelector('figure');if(!original)return;const other=original.cloneNode(true);
   for(const [figure,details] of [[original,false],[other,true]]){
    const invitation=figure.querySelector('[data-ad-invitation]'),info=figure.querySelector('[data-ad-details]');
    invitation.style.fontSize=details?'1rem':'2rem';invitation.style.fontWeight=details?'400':'800';info.style.fontSize=details?'2rem':'1rem';info.style.fontWeight=details?'800':'400';
   }
   zone.replaceChildren(make('h4','Zwei Plakatvarianten vergleichen'),make('p','Beide fiktiven Entwürfe enthalten denselben Wortlaut. Vergleiche nur die unterschiedliche Schriftgewichtung. Beschreibe sichtbare Merkmale, bevor du eine Wirkung vermutest.'),make('h5','Variante A: Einladung hervorgehoben'),original,make('h5','Variante B: Ort und Zeit hervorgehoben'),other);
  });
  body.querySelectorAll('[data-art-brand-gap]').forEach(zone=>{zone.append(make('p','Papiervergleich: Zeichne die Kombination zweimal mit gleicher Wort- und Bildgröße, aber mit unterschiedlichem Abstand. Notiere, welcher Abstand deine Absicht besser unterstützt.'));});
  body.querySelectorAll('details,script,iframe,video,audio,object,embed').forEach(el=>el.remove());
  body.querySelectorAll('label,button,input,select,textarea,output,progress,[role="status"]').forEach(el=>el.remove());
  body.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes])if(/^on/i.test(attr.name))el.removeAttribute(attr.name);});
  body.querySelectorAll('a[href]').forEach(link=>{if(/^https?:/i.test(link.getAttribute('href')))link.after(make('span',' ('+link.href+')'));});
  article.append(body);material.append(article);
 }
 appendWorksheetWorkshop(topic,material);
 if(topic.sources?.length){material.append(make('h3','Quellen'));const list=make('ul');for(const source of topic.sources)list.append(make('li',source.title+' – '+source.url));material.append(list);}
 content.append(material);const control=document.getElementById('ws-material-control'),checkbox=document.getElementById('ws-include-material');control.hidden=false;checkbox.checked=true;checkbox.onchange=()=>{material.hidden=!checkbox.checked;};
}
function renderChapterWorksheetMaterial(topic,content,topicId,subject) {
 const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=worksheetText(text);return el;};
 const languageSubject=['deutsch','englisch'].includes(subject);
 const material=make('section');material.id=languageSubject?'ws-language-material':subject==='physik'?'ws-physics-material':subject==='musik'?'ws-music-material':subject==='dgb'?'ws-dgb-material':subject==='mathematik'?'ws-math-material':subject==='chemie'?'ws-chemistry-material':subject==='biologie'?'ws-biology-material':'ws-household-material';material.className='ws-chapter-material';
 material.append(make('h2','Texte, Daten und Arbeitsaufträge'),make('p',languageSubject?'Diese Blätter enthalten die Texte, Erklärungen und Schreibaufträge zum Kapitel. Bei Hörübungen liest eine zweite Person den Hörtext vor; verdecke dabei alle gedruckten Fassungen dieses Textes. Allein kannst du ihn als Lesetext bearbeiten und diese Änderung notieren.':'Dieses Material ergänzt die Übungsfragen. Modelle, Animationen und Abbildungen sind im verlinkten Onlinekapitel zugänglich. Aufgaben mit Reglern benötigen das Onlinekapitel; reale Versuche erfolgen nach Anleitung der Lehrperson.'));
 for(const [sectionIndex,section] of (topic.sections||[]).entries()){
  const article=make('article');article.dataset.sourceSection=section.id||'learning-section-'+sectionIndex;
  const header=make('header');header.className='ws-section-header';header.append(make('h3',section.title));
  const link=make('a','Zum Abschnitt im Onlinekapitel');link.href='template.html?topic='+encodeURIComponent(topicId)+'#learning-section-'+sectionIndex;
  const reference=make('p');reference.className='ws-section-link';reference.append(link,document.createTextNode(link.href));header.append(reference);article.append(header);
  const body=make('div');body.innerHTML=(section.content||'').replace(/\{\{QUIZ_[^}]+\}\}/g,'');
  // Never print an uninitialized simulation or an answer disclosure as a static result.
  // Vocabulary disclosures contain lesson material, not answers. Print them as plain text.
  for(const item of body.querySelectorAll('details.bio-vocab-item')){
   const summary=item.querySelector(':scope > summary'),entry=make('div');entry.className='ws-glossary-entry';
   entry.append(make('strong',summary?.textContent||'Fachwort'));
   for(const node of [...item.childNodes])if(node!==summary)entry.append(node.cloneNode(true));
   item.replaceWith(entry);
  }
  body.querySelectorAll('details,script,style,[hidden],[data-worksheet-omit]').forEach(el=>el.remove());
  const dynamic='.interactive-zone,.diagram-box';
  for(const zone of [...body.querySelectorAll(dynamic)]){
   if(!body.contains(zone)||zone.parentElement?.closest(dynamic))continue;
   const title=zone.querySelector('h3,h4')?.textContent?.trim();
   const alternative=zone.querySelector(':scope > template[data-worksheet-alternative]');
   if(alternative){
    const paper=make('div');paper.className='ws-model-alternative';
    if(title)paper.append(make('h4',title+' – Papieraufgabe'));
    paper.append(alternative.content.cloneNode(true));
    paper.querySelectorAll('details,script,style,template,[hidden]').forEach(el=>el.remove());
    zone.replaceWith(paper);
   }else zone.replaceWith(make('p',(title?title+': ':'')+'Modell oder Abbildung im Onlinekapitel bearbeiten. Übertrage Beobachtungen und Skizzen auf dein Arbeitsblatt.'));
  }
  for(const media of [...body.querySelectorAll('svg,canvas,img,iframe,video,audio,object,embed')]){
   if(!body.contains(media))continue;
   if(media.tagName.toLowerCase()==='svg'&&media.getAttribute('data-worksheet-static')==='true')continue;
   if(subject==='musik'&&media.tagName.toLowerCase()==='svg'&&media.closest('[data-music-score]'))continue;
   media.replaceWith(make('p','Abbildung oder Medium im Onlinekapitel: '+(media.getAttribute('alt')||media.getAttribute('aria-label')||media.getAttribute('title')||'siehe Abschnittslink.')));
  }
  body.querySelectorAll('label,button,input,select,textarea,output,progress,[role="status"]').forEach(el=>el.remove());
  body.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes])if(/^on/i.test(attr.name)||attr.name==='style')el.removeAttribute(attr.name);});
  body.querySelectorAll('a[href]').forEach(a=>{if(/^https?:/i.test(a.getAttribute('href')))a.after(make('span',' ('+a.href+')'));});
  const writingPrompt=make('p','Eigene Beobachtung, Skizze oder Begründung:');writingPrompt.className='ws-writing-prompt';
  article.append(body,writingPrompt);
  for(let i=0;i<3;i++){const line=make('div');line.className='answer-lines';article.append(line);}
  material.append(article);
 }
 appendWorksheetWorkshop(topic,material);
 if(topic.sources?.length){material.append(make('h3','Weitere Kapitelquellen'));const list=make('ul');for(const source of topic.sources)list.append(make('li',source.title+' – '+source.url));material.append(list);}
 content.append(material);
 const control=document.getElementById('ws-material-control'),checkbox=document.getElementById('ws-include-material');control.hidden=false;checkbox.checked=true;checkbox.onchange=()=>{material.hidden=!checkbox.checked;};
 const label=document.getElementById('ws-material-label');if(label)label.textContent='Kapiteltexte, Daten und Arbeitsaufträge mitdrucken';
}
async function loadWorksheet() {
 const content=document.getElementById('ws-content'),print=document.getElementById('ws-print');print.disabled=true;
 document.getElementById('ws-solution-control').hidden=true;document.getElementById('ws-material-control').hidden=true;
 const topicId=new URLSearchParams(location.search).get('topic');
 if(!topicId){content.textContent='Kein Kapitel ausgewählt. Öffne das Arbeitsblatt über ein Lernkapitel.';return;}
 try{
  const response=await fetch('../lang/de.json?v=10.8');if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json(),topic=data[topicId];if(!topic){content.textContent='Dieses Kapitel wurde nicht gefunden. Öffne das Arbeitsblatt erneut über die Kapitelübersicht.';return;}
  const title=worksheetText(topic.title).replace(/\p{Extended_Pictographic}|\uFE0F/gu,'').trim();document.getElementById('ws-title').textContent='Arbeitsblatt: '+title;document.title='Arbeitsblatt – '+title;
  const entry=Object.entries(window.SCIVERSE_CURRICULUM||{}).find(([,s])=>s.topics?.some(t=>t.id===topicId));
  const subjects={mathematik:'Mathematik',physik:'Physik',chemie:'Chemie',biologie:'Biologie und Umweltbildung',geographie:'Geografie und wirtschaftliche Bildung',deutsch:'Deutsch',englisch:'Englisch',kunst:'Kunst und Gestaltung',ernaehrung:'Ernährung und Haushalt',musik:'Musik',dgb:'Digitale Grundbildung'};
  document.getElementById('ws-subject').textContent=subjects[entry?.[0]]||'Lernkapitel';
  const link=document.getElementById('ws-chapter-link');link.href='template.html?topic='+encodeURIComponent(topicId);link.textContent='Zum Lernkapitel: '+title;
  content.replaceChildren();
  if(topic.learningGoals?.length){const heading=document.createElement('h2');heading.textContent='Das übst du';content.append(heading);const list=document.createElement('ul');for(const goal of topic.learningGoals){const li=document.createElement('li');li.textContent=worksheetText(goal);list.append(li);}content.append(list);}
  if(entry?.[0]==='kunst')renderArtWorksheetMaterial(topic,content);else if(['physik','ernaehrung','musik','deutsch','englisch','dgb','mathematik','chemie','biologie'].includes(entry?.[0]))renderChapterWorksheetMaterial(topic,content,topicId,entry[0]);else renderWorksheetWorkshopMaterial(topic,content);
  const dynamic=typeof generateWorksheetContent==='function'?generateWorksheetContent(topicId,title):null;
  const note=document.getElementById('ws-description');
  if(dynamic){content.insertAdjacentHTML('beforeend',dynamic);if(worksheetQuestions(topic).length){const heading=document.createElement('h2');heading.textContent='Verständnisfragen zum Kapitel';content.append(heading);renderWorksheetQuestions(topic,content);}note.textContent='Dieses Arbeitsblatt enthält zusätzliche Rechenübungen. Beim Neuladen können sich die Übungszahlen ändern. Es ersetzt nicht alle Lernaufgaben des Kapitels.';}
  else{renderWorksheetQuestions(topic,content);note.textContent=worksheetQuestions(topic).length?'Dieses Arbeitsblatt verwendet die aktuellen Kapitelaufgaben auf Deutsch. Die Aufgaben bleiben beim Neuladen gleich. Lösungen kannst du vor dem Drucken einblenden.':'Dieses Arbeitsblatt enthält Kapitelmaterial und Arbeitsaufträge. Für dieses Kapitel sind keine gesonderten druckbaren Quizfragen hinterlegt.';}
  appendPaperSolutions(topic,content);
  const needsMath=/\\\(|\\\[|\$\$/.test(content.textContent);
  if(needsMath){
   const status=document.getElementById('ws-math-status');status.hidden=false;status.textContent='Die Formeln werden für den Druck vorbereitet.';
   try{
    if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;
    if(!window.MathJax?.typesetPromise)throw Error('Formula renderer unavailable');
    await window.MathJax.typesetPromise([content]);
    if(document.fonts?.ready)await document.fonts.ready;
    status.hidden=true;
   }catch(error){status.textContent='Die Formeln konnten nicht vollständig dargestellt werden. Prüfe deine Verbindung und lade die Seite erneut, bevor du druckst. Die Übungszahlen können sich beim Neuladen ändern.';return;}
  }
  print.disabled=false;
 }catch(error){content.textContent='Das Arbeitsblatt konnte nicht geladen werden. Prüfe deine Verbindung und lade die Seite erneut.';}
}
loadWorksheet();
