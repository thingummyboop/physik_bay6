'use strict';
const subjectNames={physik:'Physik',mathematik:'Mathematik',biologie:'Biologie und Umweltbildung',chemie:'Chemie',deutsch:'Deutsch',dgb:'Digitale Grundbildung',englisch:'Englisch',ernaehrung:'Ernährung und Haushalt',geographie:'Geografie und wirtschaftliche Bildung',kunst:'Kunst und Gestaltung',musik:'Musik'};
const englishSubjectNames={physik:'Physics',mathematik:'Mathematics',biologie:'Biology and environmental education',chemie:'Chemistry',deutsch:'German',dgb:'Digital literacy',englisch:'English',ernaehrung:'Nutrition and household management',geographie:'Geography and economic education',kunst:'Art and design',musik:'Music'};
const catalog=Object.entries(window.SCIVERSE_CURRICULUM).flatMap(([subject,data])=>data.topics.filter(t=>t.available!==false).map(t=>({...t,subject})));
const byId=new Map(catalog.map(t=>[t.id,t]));
const $=id=>document.getElementById(id);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}}
const params=new URLSearchParams(location.search);
const initialPlan=params.has('plan')?params.get('plan').split(','):read('sciverse_study_plan',[]);
const planIds=(Array.isArray(initialPlan)?initialPlan:[]).filter(id=>typeof id==='string'&&id.length>0);
let unknownLinkedChapters=[...new Set(planIds.filter(id=>!byId.has(id)))];
let chosen=new Set(planIds.filter(id=>byId.has(id)));
let retainedStoredPlan=params.has('plan')&&!chosen.size&&unknownLinkedChapters.length>0;
let mode=['learn','review','teach'].includes(params.get('mode'))?params.get('mode'):(params.has('plan')?'review':'learn');
let content={};
const languageNames={en:'English',ar:'العربية',sr:'Srpski',tr:'Türkçe',uk:'Українська'};
let preferredLanguage='de';try{const saved=localStorage.getItem('physik_lang');if(languageNames[saved])preferredLanguage=saved;}catch{}
function translatedMetadata(id,language=preferredLanguage){const entry=window.SCIVERSE_TRANSLATED_TITLES?.[language]?.[id];return entry&&entry.revision===(window.chapterRevision?.(id)||0)?entry:null;}
function setMetadataLanguage(node,translated){node.lang=translated?preferredLanguage:'de';node.dir=node.lang==='ar'?'rtl':'ltr';}
function translatedTitle(id,language=preferredLanguage){const entry=window.SCIVERSE_TRANSLATED_TITLES?.[language]?.[id];return entry&&entry.revision===(window.chapterRevision?.(id)||0)?entry.title:'';}
function appendOriginalTitle(card,t){if(!translatedTitle(t.id)||chapterTitle(t)===germanChapterTitle(t))return;const line=element('p','Deutsch: '+germanChapterTitle(t),'original-chapter-title');line.lang='de';line.dir='ltr';card.append(line);}

let contentState='loading';
const searchIndex=new Map();
function normalizeSearch(value){return String(value).toLocaleLowerCase('de').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function searchableChapter(t){
 if(!searchIndex.has(t.id)){
  const topic=content[t.id]||{};
  searchIndex.set(t.id,normalizeSearch([germanChapterTitle(t),...Object.keys(languageNames).flatMap(language=>{const translated=translatedMetadata(t.id,language);return translated?[translated.title,translated.subtitle,...(translated.learningGoals||[])]:[];}),subjectNames[t.subject],englishSubjectNames[t.subject],t.category||'',text(topic.subtitle),...topicsToLearn(t),...(topic.summary||[]).map(text),...(topic.sections||[]).flatMap(s=>[text(s.title),text(s.content)])].join(' ')));
 }
 return searchIndex.get(t.id);
}
function printablePlan(){return chosen.size>0&&contentState==='ready'&&[...chosen].every(id=>topicsToLearn(byId.get(id)).length>0);}
function text(html){const t=document.createElement('template');t.innerHTML=String(html||'');return (t.content.textContent||'').replace(/\s+/g,' ').trim();}
function element(tag,copy,cls){const e=document.createElement(tag);if(copy!==undefined)e.textContent=copy;if(cls)e.className=cls;return e;}
function germanChapterTitle(t){return text(content[t.id]?.title||t.title);}
function chapterTitle(t){return translatedTitle(t.id)||germanChapterTitle(t);}
function chapterTitleElement(tag,t){const node=element(tag,chapterTitle(t));setMetadataLanguage(node,!!translatedTitle(t.id));return node;}
function chapterMetadata(t){
 const english=preferredLanguage==='en',node=element('p',undefined,'meta');node.dataset.chapterMetadata='true';node.lang=english?'en':'de';
 const subject=element('span',(english?englishSubjectNames[t.subject]:subjectNames[t.subject])||t.subject);subject.lang=english&&englishSubjectNames[t.subject]?'en':'de';
 const yearLabels={
  'Grundlagen für die 6.–8. Schulstufe':'Foundations for Mittelschule years 2–4 · school years 6–8',
  '6. Schulstufe (2. Kl.)':'Mittelschule year 2 · school year 6',
  '7. Schulstufe (3. Kl.)':'Mittelschule year 3 · school year 7',
  '8. Schulstufe (4. Kl.)':'Mittelschule year 4 · school year 8',
  'Vertiefung':'Extension',
  '5. Schulstufe (1. Kl.)':'Mittelschule year 1 · school year 5',
  '5./6. Schulstufe':'Mittelschule years 1–2 · school years 5–6',
  '1. Klasse (5. Schulstufe)':'Mittelschule year 1 · school year 5',
  '2. Klasse (6. Schulstufe)':'Mittelschule year 2 · school year 6',
  '2.–3. Klasse (6.–7. Schulstufe)':'Mittelschule years 2–3 · school years 6–7',
  '3. Klasse (7. Schulstufe)':'Mittelschule year 3 · school year 7',
  '4. Klasse (8. Schulstufe)':'Mittelschule year 4 · school year 8',
  'Extra':'Extra'
 };
 const grade=element('span',english?(yearLabels[t.grade]||t.grade):t.grade);grade.lang=english&&yearLabels[t.grade]?'en':'de';node.append(subject,document.createTextNode(' · '),grade);return node;
}
function gradeLevels(t){
 if(Array.isArray(t.gradeLevels))return t.gradeLevels.filter(n=>[5,6,7,8].includes(n)).map(String);
 return [...String(t.grade||'').matchAll(/([5-8])\./g)].map(m=>m[1]);
}
function topicsToLearn(t){const translated=translatedMetadata(t.id);if(translated?.learningGoals?.length)return translated.learningGoals;const topic=content[t.id];if(Array.isArray(topic?.learningGoals))return topic.learningGoals.map(text);return (topic?.sections||[]).map(s=>text(s.title)).filter(Boolean);}
function openChapter(id){if(!byId.has(id))return;const page=mode==='review'||chosen.size||unknownLinkedChapters.length||params.has('plan')?'topics/template.html?'+new URLSearchParams({topic:id,mode,plan:[...chosen,...unknownLinkedChapters].join(',')}):id;if(window.parent!==window){window.parent.location.hash=page;}else{location.href='../index.html#'+page;}}
function planControlText(label){return preferredLanguage==='en'?({'Kapitel öffnen':'Open chapter','Aus Liste entfernen':'Remove from list','Nach oben':'Move up','Nach unten':'Move down','Vorwissen öffnen':'Open prerequisite','Vorwissen davor einfügen':'Insert prerequisite before this chapter','Vorwissen davor verschieben':'Move prerequisite before this chapter'}[label]||label):label;}
function button(label,action,cls){const b=element('button',planControlText(label),cls);b.lang=preferredLanguage==='en'?'en':'de';b.type='button';b.addEventListener('click',action);return b;}
function focusKey(button,key){button.dataset.focusKey=key;return button;}
let planNotice=null;
function showPlanNotice(kind=planNotice){
 planNotice=kind;const node=$('notice');node.lang=preferredLanguage==='en'?'en':'de';
 node.textContent=kind==='storage-error'?entryText('Die Liste kann hier nicht dauerhaft gespeichert werden. Erstelle einen Link, um sie wieder zu öffnen.','This list cannot be saved permanently here. Create a link so you can open it again.'):kind==='shared'?entryText('Kopiere diesen Link. Er enthält die Kapitel der Liste, keine persönlichen Ergebnisse.','Copy this link. It contains the chapters in the list, not personal results.'):'';
}
function save(){try{localStorage.setItem('sciverse_study_plan',JSON.stringify([...chosen,...unknownLinkedChapters]));retainedStoredPlan=false;showPlanNotice(null);}catch{showPlanNotice('storage-error');}}
function learningResult(id){const r=read('sciverse_chapter_quiz_results',{})[id];return window.currentChapterResult?window.currentChapterResult(id,r):r;}
function entryText(de,en){return preferredLanguage==='en'?en:de;}
function entryElement(tag,de,en,cls){const node=element(tag,entryText(de,en),cls);node.lang=preferredLanguage==='en'?'en':'de';return node;}
function outcomeElement(id,cls){const node=element('p',outcome(id),cls);node.lang=preferredLanguage==='en'?'en':'de';return node;}
function outcome(id){const r=learningResult(id);if(r?.outdated)return entryText('Kapitel überarbeitet · neuer Kapitelcheck empfohlen','Chapter updated · a new chapter check is recommended');if(!r||typeof r.lastPercent!=='number')return entryText('Noch kein Kapitelcheck','No chapter check yet');return entryText('Letzter Kapitelcheck: '+r.lastPercent+' % · '+(r.lastPercent>70?'später wiederholen':'noch üben'),'Last chapter check: '+r.lastPercent+'% · '+(r.lastPercent>70?'review again later':'keep practising'));}
function toggle(id){if(chosen.has(id))chosen.delete(id);else chosen.add(id);save();$('share-wrap').hidden=true;render();}
function moveChapter(id,delta){
 const order=[...chosen],from=order.indexOf(id),to=from+delta;
 if(from<0||to<0||to>=order.length||![-1,1].includes(delta))return;
 [order[from],order[to]]=[order[to],order[from]];chosen=new Set(order);
 save();$('share-wrap').hidden=true;render();
 $('plan-progress').append(document.createTextNode(entryText(` · ${chapterTitle(byId.get(id))} steht jetzt an Stelle ${to+1}.`,` · ${chapterTitle(byId.get(id))} is now at position ${to+1}.`)));
}
function placePrerequisiteBefore(id, prerequisite){
 if(!chosen.has(id)||!byId.has(prerequisite)||!content[id]?.prerequisites?.includes(prerequisite)||id===prerequisite)return;
 const existing=[...chosen];
 if(existing.includes(prerequisite)&&existing.indexOf(prerequisite)<existing.indexOf(id))return;
 const order=existing.filter(item=>item!==prerequisite);
 order.splice(order.indexOf(id),0,prerequisite);chosen=new Set(order);
 save();$('share-wrap').hidden=true;render();
 const target=[...document.querySelectorAll('[data-focus-key]')].find(button=>button.dataset.focusKey==='plan-prior-'+id+'-'+prerequisite);
 target?.focus({preventScroll:true});
 $('plan-progress').append(document.createTextNode(entryText(' · '+chapterTitle(byId.get(prerequisite))+' steht jetzt vor '+chapterTitle(byId.get(id))+'.',' · '+chapterTitle(byId.get(prerequisite))+' is now before '+chapterTitle(byId.get(id))+'.')));
}
function renderPlan(){
 $('selected').replaceChildren();let checked=0;
 for(const id of chosen){const t=byId.get(id);const li=element('li');li.append(chapterTitleElement('strong',t),chapterMetadata(t));
 const goals=topicsToLearn(t),ul=element('ul');setMetadataLanguage(ul,!!translatedMetadata(t.id)?.learningGoals?.length);ul.dataset.planGoals='true';goals.forEach(goal=>ul.append(element('li',goal)));li.append(ul);
 const address=new URL('../index.html',location.href);address.hash=id;
 const resource=element('p',undefined,'plan-chapter-link'),link=element('a');link.append(entryElement('span','Online-Kapitel: ','Online chapter: '),chapterTitleElement('bdi',t));link.href=address.href;link.target='_top';resource.append(link);li.append(resource);

 if(!goals.length)li.append(entryElement('p',contentState==='loading'?'Lernziele werden geladen …':'Lernziele sind derzeit nicht verfügbar.',contentState==='loading'?'Loading learning goals…':'Learning goals are currently unavailable.','meta'));
 const prerequisites=content[id]?.prerequisites;
 if(Array.isArray(prerequisites)&&prerequisites.length){
  const prior=element('div',undefined,'plan-prerequisites'),list=element('ul'),sequence=[...chosen];
  prior.append(entryElement('h4','Hilfreiches Vorwissen','Helpful prior knowledge'));
  for(const item of prerequisites){
   const entry=element('li'),chapter=byId.get(item);
   if(chapter){
    const index=sequence.indexOf(item),before=index>=0&&index<sequence.indexOf(id);
    entry.append(chapterTitleElement('bdi',chapter),entryElement('span',' · '+(index<0?'nicht in dieser Stoffliste':before?'davor eingeplant':'erst später eingeplant'),' · '+(index<0?'not in this topic list':before?'scheduled before this chapter':'scheduled later')));
    const openPrior=focusKey(button('Vorwissen öffnen',()=>openChapter(item)),'plan-prior-'+id+'-'+item);openPrior.setAttribute('aria-label',planControlText('Vorwissen öffnen')+': '+chapterTitle(chapter));entry.append(openPrior);
    if(!before&&item!==id){
     const label=index<0?'Vorwissen davor einfügen':'Vorwissen davor verschieben';
     const arrange=focusKey(button(label,()=>placePrerequisiteBefore(id,item)),'plan-prior-place-'+id+'-'+item);
     arrange.setAttribute('aria-label',chapterTitle(chapter)+': '+planControlText(label)+' – '+chapterTitle(t));entry.append(arrange);
    }

   }else entry.textContent=text(item);
   list.append(entry);
  }
  prior.append(list,entryElement('p','Vorwissen kann bereits bekannt sein. Du entscheidest, ob du es wiederholst oder in die Liste aufnimmst.','You may already know this material. You decide whether to review it or add it to the list.','meta'));li.append(prior);
 }

 if(mode!=='teach')li.append(outcomeElement(id,'meta personal-result'));
 li.append(focusKey(button('Kapitel öffnen',()=>openChapter(id)),'plan-open-'+id),focusKey(button('Aus Liste entfernen',()=>toggle(id)),'plan-remove-'+id));
 const order=[...chosen],position=order.indexOf(id),reorder=element('div',undefined,'actions');
 for(const [delta,label]of [[-1,'Nach oben'],[1,'Nach unten']]){
  const control=focusKey(button(label,()=>moveChapter(id,delta)),'plan-move-'+delta+'-'+id);
  control.setAttribute('aria-label',chapterTitle(t)+': '+planControlText(label));
  control.setAttribute('aria-disabled',String(position+delta<0||position+delta>=order.length));
  reorder.append(control);
 }
 li.append(reorder);
 $('selected').append(li);if((learningResult(id)?.lastPercent||0)>70)checked++;
 }
 $('plan-progress').lang=preferredLanguage==='en'?'en':'de';$('plan-progress').textContent=chosen.size?entryText(`${chosen.size} Kapitel ausgewählt`,`${chosen.size} chapters selected`):entryText(unknownLinkedChapters.length?'Keine verfügbaren Kapitel ausgewählt.':'Noch keine Kapitel ausgewählt.',unknownLinkedChapters.length?'No available chapters selected.':'No chapters selected yet.');
 if(chosen.size&&mode!=='teach')$('plan-progress').append(entryElement('span',` · ${checked} im letzten Kapitelcheck über 70 %`,` · ${checked} above 70% in the last chapter check`,'personal-result'));
 $('share').disabled=!chosen.size&&!unknownLinkedChapters.length;
 $('print').disabled=!printablePlan();
 $('content-status').lang=preferredLanguage==='en'?'en':'de';$('content-status').textContent=contentState==='loading'?entryText('Lernziele werden geladen. Drucken ist danach möglich.','Learning goals are loading. Printing will be available afterwards.'):contentState==='error'?entryText('Lernziele konnten nicht geladen werden. Du kannst Kapitel weiterhin öffnen und die Auswahl teilen.','Learning goals could not be loaded. You can still open chapters and share your selection.'):chosen.size&&!printablePlan()?entryText('Für mindestens ein ausgewähltes Kapitel fehlen Lernziele. Die vollständige Stoffliste kann noch nicht gedruckt werden.','Learning goals are missing for at least one selected chapter. The complete topic list cannot be printed yet.'):'';
 $('retry-content').hidden=contentState==='ready'&&(!chosen.size||printablePlan());
 $('retry-content').disabled=contentState==='loading';
}
function renderEntryLanguage(){
 showPlanNotice();
 const english=preferredLanguage==='en',lang=english?'en':'de';
 const heading=document.querySelector('header h1');heading.lang=lang;heading.textContent=english?'What would you like to learn?':'Was möchtest du lernen?';
 const navigation=document.querySelector('.modes');navigation.lang=lang;navigation.setAttribute('aria-label',english?'Learning path':'Lernweg');
 const names=english?{learn:'Learn something new',review:'Prepare for a test',teach:'Plan lessons'}:{learn:'Neues lernen',review:'Prüfung vorbereiten',teach:'Unterricht planen'};
 navigation.querySelectorAll('[data-mode]').forEach(button=>button.textContent=names[button.dataset.mode]);
 const help=$('mode-help');help.lang=lang;if(english)help.textContent={learn:'Choose your subject and year. Open a chapter and work at your own pace.',review:'Choose your test material. Review the content and check your understanding in the chapter quiz.',teach:'Select chapters for lessons or assessments. You can share and print the list of topics.'}[mode];
 for(const [id,de,en]of [
 ['share-label','Link zum Kopieren','Link to copy'],
 ['storage-heading','Wie wird mein Fortschritt gespeichert?','How is my progress saved?'],
 ['storage-explanation','Ergebnisse und deine Stoffliste bleiben in diesem Browser auf diesem Gerät. Sie werden nicht an deine Lehrkraft gesendet. Ein geteilter Link enthält nur die ausgewählten Kapitel, keine Ergebnisse. Ein Quiz ist eine Lernhilfe und keine Schulnote.','Results and your topic list stay in this browser on this device. They are not sent to your teacher. A shared link contains only the selected chapters, not results. A quiz supports learning and is not a school grade.'],
 ['curriculum-note','Orientierung am österreichischen Mittelschullehrplan. Welche Kapitel und Vertiefungen zu deiner Prüfung gehören, legt deine Lehrkraft fest.','Based on the Austrian Mittelschule curriculum. Your teacher decides which chapters and extension topics are included in your assessment.'],
 ['curriculum-link','Lehrplan der Mittelschule','Mittelschule curriculum'],
 ['plan-help','Füge Kapitel hinzu und ordne sie mit „Nach oben“ und „Nach unten“. Diese Reihenfolge gilt auch im geteilten Link und beim Wiederholen.','Add chapters and arrange them with “Move up” and “Move down”. This order also applies to the shared link and when reviewing.'],
 ['share','Link zur Stoffliste erstellen','Create a link to the topic list'],['print','Stoffliste drucken','Print topic list'],['retry-content','Lernziele erneut laden','Reload learning goals']]){const node=$(id);node.lang=lang;node.textContent=english?en:de;}
 const missing=$('unavailable-chapters');missing.replaceChildren();missing.hidden=!unknownLinkedChapters.length;missing.lang=lang;
 for(const id of unknownLinkedChapters){
  const row=element('li');row.append(element('span',entryText('Nicht verfügbar: ','Unavailable: ')+id));
  const remove=focusKey(button('Aus Liste entfernen',()=>{
   unknownLinkedChapters=unknownLinkedChapters.filter(value=>value!==id);save();$('share-wrap').hidden=true;render();
  }),'plan-unavailable-'+id);remove.setAttribute('aria-label',entryText('Nicht verfügbares Kapitel entfernen: ','Remove unavailable chapter: ')+id);row.append(remove);missing.append(row);
 }
 const warning=$('plan-link-warning');warning.hidden=!unknownLinkedChapters.length;warning.lang=lang;
 if(unknownLinkedChapters.length){warning.textContent=entryText(unknownLinkedChapters.length+(params.has('plan')?' Kapitel aus diesem Link':' Kapitel in dieser Stoffliste')+' sind nicht verfügbar. Die angezeigte Stoffliste ist unvollständig. Bitte kläre den fehlenden Prüfungsstoff mit der Person, die den Link geteilt hat.',unknownLinkedChapters.length+(params.has('plan')?(unknownLinkedChapters.length===1?' chapter from this link is unavailable.':' chapters from this link are unavailable.'):(unknownLinkedChapters.length===1?' chapter in this topic list is unavailable.':' chapters in this topic list are unavailable.'))+' The displayed topic list is incomplete. Ask the person who shared the link about the missing material.');if(retainedStoredPlan)warning.textContent+=entryText(' Deine bisher gespeicherte Stoffliste bleibt erhalten.',' Your previously saved topic list is retained.');}
 const filters=document.querySelector('.filters');filters.lang=lang;filters.setAttribute('aria-label',english?'Find chapters':'Kapitel finden');
 for(const [id,de,en]of [['subject-label','Fach','Subject'],['grade-label','Klasse','Year'],['search-label','Kapitel suchen','Search chapters']])if($(id))$(id).textContent=english?en:de;
 $('search').placeholder=english?'e.g. light, fractions, museum':'z. B. Licht, Brüche, Wald';
 const subjects=englishSubjectNames;
 [...$('subject').options].forEach(option=>option.textContent=option.value?(english?subjects[option.value]:subjectNames[option.value]):english?'All subjects':'Alle Fächer');
 [...$('grade').options].forEach(option=>{const grade=Number(option.value);option.textContent=option.value?(english?'Mittelschule year '+(grade-4)+' · school year '+grade:(grade-4)+'. Klasse · '+grade+'. Schulstufe'):english?'All years':'Alle Klassen';});
}
function render(){
 const activeKey=document.activeElement?.dataset.focusKey;
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
 $('mode-help').textContent={learn:'Wähle dein Fach und deine Klasse. Öffne ein Kapitel und arbeite in deinem Tempo.',review:'Wähle deinen Prüfungsstoff. Wiederhole die Inhalte und prüfe dein Verständnis im Kapitelcheck.',teach:'Wähle Kapitel als Unterrichts- oder Prüfungsstoff. Die Stoffliste mit Kapitelabschnitten lässt sich teilen und drucken.'}[mode];
 $('plan').querySelector('h2').lang=preferredLanguage==='en'?'en':'de';$('plan').querySelector('h2').textContent=entryText(mode==='teach'?'Stoffliste für die Klasse':'Mein Prüfungsstoff',mode==='teach'?'Class topic list':'My test material');
 $('chapters').replaceChildren();
 const needles=normalizeSearch($('search').value).trim().split(/\s+/).filter(Boolean);
 const matching=catalog.filter(t=>(!$('subject').value||t.subject===$('subject').value)&&(!$('grade').value||gradeLevels(t).includes($('grade').value))&&needles.every(needle=>searchableChapter(t).includes(needle)));
 $('count').lang=preferredLanguage==='en'?'en':'de';$('count').textContent=entryText(matching.length+' Kapitel',matching.length+(matching.length===1?' chapter':' chapters'));
 if(!matching.length)$('chapters').append(entryElement('p','Keine passenden Kapitel. Ändere die Suche oder die Klasse.','No matching chapters. Change the search or year filter.','empty'));
 matching.forEach(t=>{
  const card=element('article',undefined,'chapter');card.append(chapterMetadata(t),chapterTitleElement('h2',t));
  appendOriginalTitle(card,t);
  const translated=translatedMetadata(t.id),subtitle=translated?.subtitle||content[t.id]?.subtitle;if(subtitle){const paragraph=element('p',text(subtitle));paragraph.dataset.chapterSubtitle='true';setMetadataLanguage(paragraph,!!translated?.subtitle);card.append(paragraph);}
  const goals=topicsToLearn(t);if(goals.length){const details=element('details');details.append(entryElement('summary','Das gehört zu diesem Kapitel','What this chapter covers'));const list=element('ul');list.dataset.chapterGoals='true';setMetadataLanguage(list,!!translated?.learningGoals?.length);goals.forEach(g=>list.append(element('li',g)));details.append(list);card.append(details);}
  if(mode!=='teach')card.append(outcomeElement(t.id,'status personal-result'));
  const actions=element('div',undefined,'actions');actions.lang=preferredLanguage==='en'?'en':'de';actions.append(focusKey(button(entryText(mode==='learn'?'Kapitel lernen':mode==='teach'?'Kapitel ansehen':'Kapitel wiederholen',mode==='learn'?'Learn chapter':mode==='teach'?'View chapter':'Review chapter'),()=>openChapter(t.id),'primary'),'catalog-open-'+t.id));
  const add=focusKey(button(entryText(chosen.has(t.id)?'✓ Im Prüfungsstoff':'Zum Prüfungsstoff',chosen.has(t.id)?'✓ In test material':'Add to test material'),()=>toggle(t.id)),'catalog-toggle-'+t.id);add.setAttribute('aria-pressed',String(chosen.has(t.id)));actions.append(add);card.append(actions);$('chapters').append(card);
 });renderPlan();renderEntryLanguage();
 if(activeKey){
  const target=[...document.querySelectorAll('[data-focus-key]')].find(b=>b.dataset.focusKey===activeKey);
  if(target)target.focus({preventScroll:true});
  else if(activeKey.startsWith('plan-')){const heading=$('plan').querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
}
Object.keys(window.SCIVERSE_CURRICULUM).forEach(subject=>{const o=element('option',subjectNames[subject]||subject);o.value=subject;$('subject').append(o);});
$('subject').value=byId.get([...chosen][0])?.subject||'physik';
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;render();}));
['subject','grade','search'].forEach(id=>$(id).addEventListener('input',render));
$('share').addEventListener('click',()=>{
 const link=new URL('../index.html',location.href);link.hash='topics/learning.html?'+new URLSearchParams({mode:'review',plan:[...chosen,...unknownLinkedChapters].join(',')});
 $('share-url').value=link.href;$('share-wrap').hidden=false;$('share-url').focus();$('share-url').select();showPlanNotice('shared');
});
$('print').addEventListener('click',()=>{if(printablePlan())window.print();});
$('retry-content').addEventListener('click',loadContent);
try{if(localStorage.getItem('physik_dark_mode')==='true')document.documentElement.dataset.theme='dark';}catch{/* Learning and sharing remain available without browser storage. */}
window.addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.type==='languageChange'){preferredLanguage=languageNames[event.data.lang]?event.data.lang:'de';render();}});
window.addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.type==='themeChange'){if(event.data.isDark)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;}});
window.addEventListener('storage',event=>{
 // Re-read current storage: an older queued event may already have been superseded.
 // A shared URL remains its own explicit topic list; only the local list follows other tabs.
 const key=event.key;
 try{
  if(event.storageArea&&event.storageArea!==localStorage)return;
  if(key==null||key==='physik_lang'){
   const saved=localStorage.getItem('physik_lang');preferredLanguage=languageNames[saved]?saved:'de';
  }
  if(key==null||key==='physik_dark_mode'){
   if(localStorage.getItem('physik_dark_mode')==='true')document.documentElement.dataset.theme='dark';
   else delete document.documentElement.dataset.theme;
  }
  if(!params.has('plan')&&(key==null||key==='sciverse_study_plan')){
   const saved=JSON.parse(localStorage.getItem('sciverse_study_plan')||'[]');
   if(Array.isArray(saved)&&saved.every(id=>typeof id==='string')){
    const next=new Set(saved.filter(id=>byId.has(id))),missing=[...new Set(saved.filter(id=>id&&!byId.has(id)))];
    if(JSON.stringify([...next,...missing])!==JSON.stringify([...chosen,...unknownLinkedChapters])){
     chosen=next;unknownLinkedChapters=missing;retainedStoredPlan=false;$('share-wrap').hidden=true;showPlanNotice(null);
    }
   }
  }
 }catch{/* Keep the usable in-memory view if storage is unavailable or malformed. */}
 if(key==null||['physik_lang','physik_dark_mode','sciverse_study_plan','sciverse_chapter_quiz_results'].includes(key))render();
});
async function loadContent(){
 if(contentState==='loading'&&loadContent.pending)return;
 loadContent.pending=true;
 const status=$('content-status');
 const retryFocused=document.activeElement===$('retry-content');
 if(retryFocused){status.tabIndex=-1;status.focus({preventScroll:true});}
 contentState='loading';render();
 try{const response=await fetch('../lang/de.json');if(!response.ok)throw Error('load');const data=await response.json();if(!data||typeof data!=='object'||Array.isArray(data))throw Error('format');content=data;searchIndex.clear();contentState='ready';}
 catch{contentState='error';}
 loadContent.pending=false;
 render();
 if(retryFocused&&document.activeElement===status){
  if(!$('retry-content').hidden)$('retry-content').focus({preventScroll:true});
  else if(!$('print').disabled)$('print').focus({preventScroll:true});
  else{const heading=$('plan').querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
}

if(params.has('plan')&&(chosen.size||!unknownLinkedChapters.length))save();
loadContent();
