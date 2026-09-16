'use strict';
function enhanceCoreLearning(topic,topicId,language,resolveChapter){
 const uiLanguage=topic.languageFallback||['de','de-en'].includes(topic.contentLanguage)?'de':(topic.contentLanguage||language||'de');
 const coreLabels={"en":{"Dein Wiederholungsweg":"Your review path","Dein Lernweg":"Your learning path","Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte.":"Test your knowledge first or review selected sections.","Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.":"Work through the sections in order. Try the activities and check your understanding at the end.","Selbsttest starten":"Start self-test","Zum Kapitelcheck":"Go to chapter check","Zur Stoffliste":"Back to study list","Beim letzten Versuch noch unsicher":"Topics to revisit from your last attempt","Abschnitt wiederholen: ":"Review section: ","Zusammenfassung wiederholen":"Review the summary","Lernziele und Vorwissen":"Learning goals and prior knowledge","Das kannst du danach":"What you will be able to do","Hilfreiches Vorwissen: ":"Useful prior knowledge: ","Kurz wiederholen":"Quick review","Zur Zusammenfassung":"Go to summary","Quellen und weiterführende Informationen":"Sources and further information","Weiter in deiner Stoffliste":"Continue through your study list","Weitere Kapitel dieses Fachs":"More chapters in this subject","Dein nächster Lernschritt":"Your next learning step","Vorheriges Kapitel":"Previous chapter","Nächstes Kapitel":"Next chapter","Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest.":"You have reached the end of your study list. Check the overview for topics you want to revisit.","Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.":"You have reached the end of this subject’s chapter list. Use your study list for further practice."},"tr":{"Dein Wiederholungsweg":"Tekrar yolun","Dein Lernweg":"Öğrenme yolun","Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte.":"Önce bilgini sına veya seçtiğin bölümleri tekrar et.","Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.":"Bölümleri sırayla çalış. Etkinlikleri yap ve sonunda anladıklarını kontrol et.","Selbsttest starten":"Öz değerlendirmeyi başlat","Zum Kapitelcheck":"Bölüm kontrolüne git","Zur Stoffliste":"Konu listesine dön","Beim letzten Versuch noch unsicher":"Son denemede tekrar gerektiren konular","Abschnitt wiederholen: ":"Bölümü tekrar et: ","Zusammenfassung wiederholen":"Özeti tekrar et","Lernziele und Vorwissen":"Öğrenme hedefleri ve ön bilgiler","Das kannst du danach":"Bölüm sonunda yapabileceklerin","Hilfreiches Vorwissen: ":"Yararlı ön bilgiler: ","Kurz wiederholen":"Kısa tekrar","Zur Zusammenfassung":"Özete git","Quellen und weiterführende Informationen":"Kaynaklar ve ek bilgiler","Weiter in deiner Stoffliste":"Konu listende devam et","Weitere Kapitel dieses Fachs":"Bu dersin diğer bölümleri","Dein nächster Lernschritt":"Sonraki öğrenme adımın","Vorheriges Kapitel":"Önceki bölüm","Nächstes Kapitel":"Sonraki bölüm","Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest.":"Konu listenin sonuna geldin. Hangi konuları tekrar etmek istediğine genel bakışta bak.","Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.":"Bu dersin bölüm listesinin sonuna geldin. Konu listeni kullanarak çalışmaya devam edebilirsin."},"uk":{"Dein Wiederholungsweg":"Твій шлях повторення","Dein Lernweg":"Твій шлях навчання","Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte.":"Спочатку перевір знання або повтори вибрані розділи.","Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.":"Опрацьовуй розділи послідовно. Виконуй вправи й наприкінці перевір розуміння.","Selbsttest starten":"Почати самоперевірку","Zum Kapitelcheck":"Перейти до перевірки теми","Zur Stoffliste":"До списку тем","Beim letzten Versuch noch unsicher":"Що варто повторити після останньої спроби","Abschnitt wiederholen: ":"Повторити розділ: ","Zusammenfassung wiederholen":"Повторити підсумок","Lernziele und Vorwissen":"Навчальні цілі й попередні знання","Das kannst du danach":"Що ти зможеш після навчання","Hilfreiches Vorwissen: ":"Корисні попередні знання: ","Kurz wiederholen":"Коротке повторення","Zur Zusammenfassung":"До підсумку","Quellen und weiterführende Informationen":"Джерела й додаткова інформація","Weiter in deiner Stoffliste":"Продовжити за списком тем","Weitere Kapitel dieses Fachs":"Інші теми цього предмета","Dein nächster Lernschritt":"Твій наступний крок у навчанні","Vorheriges Kapitel":"Попередня тема","Nächstes Kapitel":"Наступна тема","Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest.":"Ти дійшов або дійшла до кінця списку тем. Перевір в огляді, що ще хочеш повторити.","Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.":"Це кінець переліку тем цього предмета. Продовжуй практику за своїм списком тем."},"sr":{"Dein Wiederholungsweg":"Tvoj put ponavljanja","Dein Lernweg":"Tvoj put učenja","Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte.":"Prvo proveri znanje ili ponovi odabrane odeljke.","Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.":"Obradi odeljke redom. Uradi vežbe i na kraju proveri razumevanje.","Selbsttest starten":"Započni samoproveru","Zum Kapitelcheck":"Idi na proveru poglavlja","Zur Stoffliste":"Nazad na spisak gradiva","Beim letzten Versuch noch unsicher":"Šta treba ponoviti posle poslednjeg pokušaja","Abschnitt wiederholen: ":"Ponovi odeljak: ","Zusammenfassung wiederholen":"Ponovi sažetak","Lernziele und Vorwissen":"Ciljevi učenja i predznanje","Das kannst du danach":"Šta ćeš moći nakon učenja","Hilfreiches Vorwissen: ":"Korisno predznanje: ","Kurz wiederholen":"Kratko ponavljanje","Zur Zusammenfassung":"Idi na sažetak","Quellen und weiterführende Informationen":"Izvori i dodatne informacije","Weiter in deiner Stoffliste":"Nastavi kroz spisak gradiva","Weitere Kapitel dieses Fachs":"Druga poglavlja ovog predmeta","Dein nächster Lernschritt":"Tvoj sledeći korak u učenju","Vorheriges Kapitel":"Prethodno poglavlje","Nächstes Kapitel":"Sledeće poglavlje","Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest.":"Ovo je kraj tvog spiska gradiva. U pregledu proveri šta još želiš da ponoviš.","Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.":"Ovo je kraj spiska poglavlja ovog predmeta. Nastavi da vežbaš pomoću svog spiska gradiva."},"ar":{"Dein Wiederholungsweg":"مسار المراجعة","Dein Lernweg":"مسار التعلم","Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte.":"اختبر معرفتك أولًا أو راجع أقسامًا مختارة.","Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.":"ادرس الأقسام بالترتيب. نفّذ الأنشطة وتحقق من فهمك في النهاية.","Selbsttest starten":"بدء الاختبار الذاتي","Zum Kapitelcheck":"الانتقال إلى اختبار الفصل","Zur Stoffliste":"العودة إلى قائمة الدراسة","Beim letzten Versuch noch unsicher":"موضوعات للمراجعة بعد المحاولة الأخيرة","Abschnitt wiederholen: ":"مراجعة القسم: ","Zusammenfassung wiederholen":"مراجعة الملخص","Lernziele und Vorwissen":"أهداف التعلم والمعرفة السابقة","Das kannst du danach":"ما ستتمكن من فعله بعد التعلم","Hilfreiches Vorwissen: ":"معرفة سابقة مفيدة: ","Kurz wiederholen":"مراجعة سريعة","Zur Zusammenfassung":"الانتقال إلى الملخص","Quellen und weiterführende Informationen":"المصادر والمعلومات الإضافية","Weiter in deiner Stoffliste":"المتابعة في قائمة الدراسة","Weitere Kapitel dieses Fachs":"فصول أخرى في هذه المادة","Dein nächster Lernschritt":"خطوتك التعليمية التالية","Vorheriges Kapitel":"الفصل السابق","Nächstes Kapitel":"الفصل التالي","Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest.":"وصلت إلى نهاية قائمة الدراسة. راجع النظرة العامة لتحديد الموضوعات التي تريد مراجعتها.","Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.":"وصلت إلى نهاية فصول هذه المادة. استخدم قائمة الدراسة لمواصلة التدريب."}};
 const ui=label=>coreLabels[uiLanguage]?.[label]||label;
 const container=document.getElementById('sections-container');
 if(container.querySelector('[data-core-navigation]'))return;
 const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
 const chapterTitle=chapter=>{
  const resolved=typeof resolveChapter==='function'?resolveChapter(chapter.id):null;
  const template=document.createElement('template');template.innerHTML=String(resolved?.title||chapter.title||chapter.id);
  return template.content.textContent||chapter.id;
 };
 const navigation=make('section');navigation.className='card';navigation.dataset.coreNavigation='true';
 const routeParams=new URLSearchParams(location.search);
 const review=routeParams.get('mode')==='review';
 const explicitPlan=routeParams.has('plan')?[...new Set(routeParams.get('plan').split(',').filter(Boolean))]:null;
 const routeMode=review?'review':routeParams.get('mode')==='teach'?'teach':'learn';
 const overviewQuery=new URLSearchParams({mode:routeMode});
 const chapterAddress=id=>'../index.html#'+(explicitPlan?'topics/template.html?'+new URLSearchParams({topic:id,mode:routeMode,plan:explicitPlan.join(',')}):encodeURIComponent(id));
 const availableChapters=new Set(Object.values(window.SCIVERSE_CURRICULUM||{}).flatMap(subject=>subject.topics||[]).filter(chapter=>chapter.available!==false).map(chapter=>chapter.id));
 container.querySelectorAll('a[data-learning-chapter]').forEach(link=>{
  if(availableChapters.has(link.dataset.learningChapter)){link.href=chapterAddress(link.dataset.learningChapter);link.target='_top';}
 });
 if(explicitPlan)overviewQuery.set('plan',[...new Set(explicitPlan)].join(','));
 navigation.append(make('h2',review?ui("Dein Wiederholungsweg"):ui("Dein Lernweg")));
 navigation.append(make('p',review?ui("Prüfe zuerst dein Wissen oder wiederhole gezielt einzelne Abschnitte."):ui("Arbeite die Abschnitte in Reihenfolge durch. Nutze die Übungen und prüfe dein Verständnis am Ende.")));
 const sections=[...container.children].filter(el=>el.classList.contains('card'));
 const links=make('ol');sections.forEach((card,index)=>{card.id='learning-section-'+index;const heading=card.querySelector('h2');if(!heading)return;const li=make('li'),link=make('a',heading.textContent);link.href='#'+card.id;li.append(link);links.append(li);});navigation.append(links);
 if(window.currentChapterQuiz?.questions.length){const start=make('button',review?ui("Selbsttest starten"):ui("Zum Kapitelcheck"));start.type='button';start.addEventListener('click',()=>startChapterQuiz());navigation.append(start);}
 const back=make('a',ui("Zur Stoffliste"));back.href='../index.html#topics/learning.html?'+overviewQuery;back.target='_top';back.style.marginLeft='1rem';navigation.append(back);
 const reviewBox=make('div');reviewBox.dataset.chapterReview='true';navigation.append(reviewBox);
 const renderReview=()=>{reviewBox.replaceChildren();
 try{const stored=JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')||'{}')[topicId];const result=window.currentChapterResult?window.currentChapterResult(topicId,stored):stored;if(result?.reviewQuestionIds?.length){const unknown=new Set(result.reviewQuestionIds),list=make('ul');reviewBox.append(make('h3',ui("Beim letzten Versuch noch unsicher")));
  for(const question of window.currentChapterQuiz?.questions||[]){if(!unknown.has(question.id))continue;const li=make('li',question.question);
   const section=Number.isInteger(question.sectionIndex)?container.querySelector(`[data-chapter-section="${question.sectionIndex}"]`):null;
   if(section){const link=make('a',ui("Abschnitt wiederholen: ")+(section.querySelector('h2')?.textContent||''));link.href='#'+section.id;li.append(make('br'),link);}
   else if(topic.summary?.length){const link=make('a',ui("Zusammenfassung wiederholen"));link.href='#chapter-summary';li.append(make('br'),link);}
   list.append(li);}reviewBox.append(list);}}
 catch{/* No usable local result yet. */}
 };
 renderReview();
 window.addEventListener('sciverse:chapter-result',event=>{if(event.detail?.topicId===topicId)renderReview();});
 container.prepend(navigation);
 if(topic.learningGoals?.length){
  const intro=make('section');intro.className='card';intro.dataset.coreIntro='true';intro.setAttribute('aria-label',ui("Lernziele und Vorwissen"));intro.append(make('h2',ui("Das kannst du danach")));
  const goals=make('ul');topic.learningGoals.forEach(goal=>goals.append(make('li',goal)));intro.append(goals);
  if(topic.prerequisites?.length){
   const p=make('p',ui("Hilfreiches Vorwissen: "));let catalog=window.SCIVERSE_CURRICULUM||{};
   try{catalog=window.parent?.SCIVERSE_CURRICULUM||catalog;}catch{/* Standalone embedding may have a different origin. */}
   const entries=Object.values(catalog).flatMap(subject=>subject.topics||[]);
   topic.prerequisites.forEach((item,i)=>{if(i)p.append(document.createTextNode(' · '));const chapter=entries.find(t=>t.id===item);
    if(chapter){const a=make('a',chapterTitle(chapter));a.href=chapterAddress(chapter.id);a.target='_top';p.append(a);}
    else p.append(document.createTextNode(item));
   });intro.append(p);
  }
  if(language!=='de'&&topic.contentLanguage==='de-en'){intro.append(make('p','In diesem Englischkapitel sind die Übungstexte auf Englisch und die Lernhilfen auf Deutsch.'));}
  container.prepend(intro);
 }
 if(topic.summary?.length){const summary=make('section');summary.className='card';summary.id='chapter-summary';summary.append(make('h2',ui("Kurz wiederholen")));const ul=make('ul');topic.summary.forEach(item=>ul.append(make('li',item)));summary.append(ul);container.insertBefore(summary,container.querySelector('#chapter-quiz-card')?.parentElement||null);const jump=make('a',ui("Zur Zusammenfassung"));jump.href='#chapter-summary';jump.style.marginLeft='1rem';navigation.append(jump);}
 if(topic.sources?.length){const card=make('section');card.className='card';const details=make('details');details.append(make('summary',ui("Quellen und weiterführende Informationen")));const ul=make('ul');topic.sources.forEach(source=>{const li=make('li'),a=make('a',source.title);a.href=source.url;a.target='_blank';a.rel='noopener';li.append(a);ul.append(li);});details.append(ul);card.append(details);container.append(card);}
 const subjects=Object.values(window.SCIVERSE_CURRICULUM||{});
 const subject=subjects.find(s=>s.topics?.some(t=>t.id===topicId));
 let route=(subject?.topics||[]).filter(t=>t.available!==false);
 if(review){
  try{
   const saved=explicitPlan??JSON.parse(localStorage.getItem('sciverse_study_plan')||'[]');
   const all=new Map(subjects.flatMap(s=>s.topics||[]).filter(t=>t.available!==false).map(t=>[t.id,t]));
   route=Array.isArray(saved)&&saved.includes(topicId)?[...new Set(saved)].map(id=>all.get(id)).filter(Boolean):[];
  }catch{route=[];}
 }
 const position=route.findIndex(t=>t.id===topicId);
 if(position>=0){
  const continuation=make('nav');continuation.className='card';continuation.dataset.chapterContinuation='true';continuation.setAttribute('aria-label',review?ui("Weiter in deiner Stoffliste"):ui("Weitere Kapitel dieses Fachs"));
  continuation.append(make('h2',review?ui("Weiter in deiner Stoffliste"):ui("Dein nächster Lernschritt")));
  const links=make('ul');
  for(const [offset,label]of [[-1,ui("Vorheriges Kapitel")],[1,ui("Nächstes Kapitel")]]){
   const next=route[position+offset];if(!next)continue;
   const li=make('li'),link=make('a',label+': '+chapterTitle(next));
   link.href=review?'../index.html#topics/template.html?'+new URLSearchParams({topic:next.id,mode:'review',plan:(explicitPlan??route.map(t=>t.id)).join(',')}):chapterAddress(next.id);link.target='_top';li.append(link,make('p',next.grade||''));links.append(li);
  }
  if(position===route.length-1)continuation.append(make('p',review?ui("Du bist am Ende deiner Stoffliste. Prüfe in der Übersicht, welche Inhalte du noch wiederholen möchtest."):ui("Du bist am Ende der Kapitelübersicht dieses Fachs. In deiner Stoffliste kannst du gezielt weiterüben.")));
  continuation.append(links);const overview=make('a',ui("Zur Stoffliste"));overview.href='../index.html#topics/learning.html?'+overviewQuery;overview.target='_top';continuation.append(overview);container.append(continuation);
 }
 document.querySelectorAll('[data-core-experiment]').forEach((zone,experimentIndex)=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const type=zone.dataset.coreExperiment;
  if(type==='profile-traces'){
   const controls=[...zone.querySelectorAll('[data-trace-toggle]')],rows=[...zone.querySelectorAll('[data-trace-events] tbody tr')],totals=[...zone.querySelectorAll('[data-trace-count]')],result=zone.querySelector('[data-trace-result]');
   result.id='trace-result-'+experimentIndex;controls.forEach(control=>control.setAttribute('aria-describedby',result.id));
   const update=()=>{
    const selected=new Set(controls.filter(control=>control.checked).map(control=>control.dataset.traceToggle));
    const counts=new Map(totals.map(cell=>[cell.dataset.traceCount,0]));let events=0;
    for(const row of rows){row.hidden=!selected.has(row.dataset.traceSource);if(!row.hidden){events++;const key=row.dataset.traceCategory;counts.set(key,(counts.get(key)||0)+1);}}
    totals.forEach(cell=>cell.textContent=String(counts.get(cell.dataset.traceCount)));
    const categories=[...counts].filter(([,count])=>count>0).map(([category])=>category);
    result.textContent=events?events+' Ereignisse ausgewählt. Die Modellregel vermutet Interesse an '+categories.join(' und ')+'. Das ist kein Beweis für die Interessen oder Absichten einer bestimmten Person.':'Keine Quellen ausgewählt. Die Regel hat keine Ereignisse für eine Vermutung; das bedeutet nicht, dass eine Person keine Interessen hat.';
   };
   controls.forEach(control=>control.addEventListener('change',update));
   zone.querySelector('[data-trace-reset]').addEventListener('click',()=>{controls.forEach(control=>control.checked=false);zone.querySelector('[data-trace-context]').open=false;update();controls[0].focus();});update();
  }
  if(type==='boundary-cases'){
   const control=zone.querySelector('[data-boundary-control]'),cases=[...zone.querySelectorAll('[data-boundary-case]')],result=zone.querySelector('[data-boundary-result]');
   const update=()=>{
    cases.forEach((item,i)=>{item.hidden=i!==Number(control.value);});
    result.textContent='Wähle eine Handlung.';
   };
   for(const item of cases)for(const button of item.querySelectorAll('[data-boundary-answer]')){
    button.addEventListener('click',()=>{result.textContent=button.dataset.feedback;});
   }
   control.addEventListener('change',update);
   zone.querySelector('[data-boundary-reset]').addEventListener('click',()=>{control.value='0';update();control.focus();});update();
  }
  if(type==='digestion-model'){
   const control=zone.querySelector('[data-digestion-control]'),stages=[...zone.querySelectorAll('[data-digestion-stage]')],status=zone.querySelector('[data-digestion-status]');
   const update=()=>{
    const index=Number(control.value);stages.forEach((stage,i)=>{stage.hidden=i!==index;});
    status.textContent='Bild '+(index+1)+' von '+stages.length+': '+stages[index].querySelector('h4').textContent+'. '+stages[index].querySelector('p').textContent;
   };
   control.addEventListener('change',update);zone.querySelector('[data-digestion-reset]').addEventListener('click',()=>{control.value='0';update();control.focus();});update();
  }
  if(type==='drink-portions'){
   const fields=['a','b'].map(key=>zone.querySelector('[data-drink-amount="'+key+'"]')),out=zone.querySelector('[data-drink-result]'),chart=zone.querySelector('[data-drink-chart]');
   const format=value=>value.toLocaleString('de',{maximumFractionDigits:1});
   const update=()=>{
    const volumes=fields.map(field=>Number(field.value)),grams=volumes.map((v,i)=>v*[6,4][i]/100);
    ['a','b'].forEach((key,i)=>{
     zone.querySelector('[data-drink-volume="'+key+'"]').textContent=format(volumes[i]);fields[i].setAttribute('aria-valuetext',format(volumes[i])+' Milliliter');
     chart.querySelector('[data-drink-bar="'+key+'"]').setAttribute('width',260*grams[i]/30);
     chart.querySelector('[data-drink-label="'+key+'"]').textContent=key.toUpperCase()+': '+format(grams[i])+' g Zucker';
    });
    const comparison=grams[0]===grams[1]?'Beide Mengen enthalten gleich viel Zucker.':grams[0]>grams[1]?'Die betrachtete Menge A enthält mehr Zucker.':'Die betrachtete Menge B enthält mehr Zucker.';
    out.textContent='A: 6 g × '+format(volumes[0]/100)+' = '+format(grams[0])+' g. B: 4 g × '+format(volumes[1]/100)+' = '+format(grams[1])+' g. '+comparison+' Die Angaben je 100 ml bleiben A: 6 g und B: 4 g.';
    chart.setAttribute('aria-label','Zucker in den betrachteten Mengen: A '+format(grams[0])+' g bei '+volumes[0]+' ml, B '+format(grams[1])+' g bei '+volumes[1]+' ml. Gemeinsame Skala 0 bis 30 g.');
   };
   fields.forEach(field=>field.addEventListener('input',update));zone.querySelector('[data-drink-reset]').addEventListener('click',()=>{fields[0].value='200';fields[1].value='500';update();fields[0].focus();});update();
  }
  if(type==='muscle-actions'){
   const action=zone.querySelector('[data-muscle-action]'),prediction=zone.querySelector('[data-muscle-prediction]'),diagram=zone.querySelector('[data-muscle-diagram]'),out=zone.querySelector('[data-muscle-result]'),motion=zone.querySelector('[data-muscle-motion]');
   out.id='muscle-result-'+experimentIndex;prediction.setAttribute('aria-describedby',out.id);
   const clear=()=>{out.textContent='Noch nicht geprüft.';delete zone.dataset.muscleState;};
   const update=()=>{
    const option=action.selectedOptions[0],start=Number(option.dataset.start),end=Number(option.dataset.end);
    for(const [part,angle]of [['start',start],['end',end]]){
     const line=diagram.querySelector('[data-muscle-'+part+']'),radians=angle*Math.PI/180;
     line.setAttribute('x2',105+105*Math.sin(radians));line.setAttribute('y2',150-105*Math.cos(radians));
    }
    motion.textContent='Gelenkwinkel: '+start+'° → '+end+'°. Die Knochenlängen bleiben gleich.';
    diagram.setAttribute('aria-label','Modell: '+option.textContent+', Winkel von '+start+' auf '+end+' Grad. Knochenlängen bleiben gleich.');
    prediction.value='';clear();
   };
   action.addEventListener('change',update);prediction.addEventListener('change',clear);
   zone.querySelector('[data-muscle-check]').addEventListener('click',()=>{
    if(!prediction.value){out.textContent='Wähle zuerst deine Vorhersage zur Muskellänge.';zone.dataset.muscleState='open';return;}
    const correct=prediction.value===action.selectedOptions[0].dataset.correct;
    zone.dataset.muscleState=correct?'correct':'review';out.textContent=(correct?'Passend. ':'Vergleiche noch einmal. ')+zone.querySelector('[data-muscle-explanation="'+action.value+'"]').content.textContent;
   });
   zone.querySelector('[data-muscle-reset]').addEventListener('click',()=>{action.value='lift';update();action.focus();});update();
  }
  if(type==='pet-evidence'){
   const rows=[...zone.querySelectorAll('[data-pet-statement]')],out=zone.querySelector('[data-pet-result]');
   for(const [i,row]of rows.entries()){
    const select=row.querySelector('select'),feedback=row.querySelector('[data-pet-feedback]');
    feedback.id='pet-feedback-'+experimentIndex+'-'+i;select.setAttribute('aria-describedby',feedback.id);
    select.setAttribute('aria-label','Zuordnung: '+row.querySelector('p').textContent);
    select.addEventListener('change',()=>{feedback.textContent='';delete row.dataset.petState;out.textContent='Auswahl geändert. Prüfe deine Zuordnungen erneut.';});
   }
   zone.querySelector('[data-pet-check]').addEventListener('click',()=>{
    let correct=0,missing=0;
    for(const row of rows){
     const value=row.querySelector('select').value,feedback=row.querySelector('[data-pet-feedback]');
     if(!value){missing++;row.dataset.petState='open';feedback.textContent='Noch offen: Wähle eine Zuordnung.';}
     else if(value===row.dataset.petCorrect){correct++;row.dataset.petState='correct';feedback.textContent='Passend: '+row.querySelector('[data-pet-explanation]').content.textContent;}
     else{row.dataset.petState='review';feedback.textContent='Prüfe noch einmal: '+row.querySelector('[data-pet-hint]').content.textContent;}
    }
    out.textContent=correct+' von '+rows.length+' Zuordnungen passen. '+missing+' noch offen. Lies die Begründungen bei den Aussagen.';
   });
   zone.querySelector('[data-pet-reset]').addEventListener('click',()=>{
    for(const row of rows){row.querySelector('select').value='';row.querySelector('[data-pet-feedback]').textContent='';delete row.dataset.petState;}
    out.textContent='Noch nicht geprüft.';rows[0].querySelector('select').focus();
   });
  }
  if(type==='food-web'){
   const control=zone.querySelector('[data-foodweb-missing]'),diagram=zone.querySelector('[data-foodweb-diagram]'),out=zone.querySelector('[data-foodweb-result]');
   const edges=[...diagram.querySelectorAll('[data-foodweb-from]')],names=new Map([...control.options].map(o=>[o.value,o.textContent]));
   out.id=out.id||'foodweb-result-'+experimentIndex;control.setAttribute('aria-describedby',out.id);
   const update=()=>{
    const missing=control.value,active=edges.filter(e=>e.dataset.foodwebFrom!==missing&&e.dataset.foodwebTo!==missing);
    for(const edge of edges)edge.setAttribute('display',active.includes(edge)?'inline':'none');
    for(const node of diagram.querySelectorAll('[data-foodweb-node]')){
     const absent=node.dataset.foodwebNode===missing;node.querySelector('rect').setAttribute('stroke-dasharray',absent?'6 4':'none');node.querySelector('[data-foodweb-node-status]').textContent=absent?'fehlt':'';
    }
    out.replaceChildren(make('p',missing==='none'?'Ausgangsnetz: Alle sechs dargestellten Beziehungen sind sichtbar.':names.get(missing)+' fehlt im Gedankenexperiment. '+(edges.length-active.length)+' direkte Nahrungspfeile entfallen.'));
    if(missing!=='none'){
     const consumers=edges.filter(e=>e.dataset.foodwebFrom===missing).map(e=>e.dataset.foodwebTo),list=make('ul');
     for(const consumer of consumers){const remaining=active.filter(e=>e.dataset.foodwebTo===consumer).map(e=>names.get(e.dataset.foodwebFrom));list.append(make('li',names.get(consumer)+' verliert diese Nahrungsquelle. Weiterhin dargestellt: '+(remaining.length?remaining.join(', '):'keine weitere Nahrungsquelle in diesem Ausschnitt')+'.'));}
     if(consumers.length)out.append(list);else out.append(make('p','Das Ausgangsnetz zeigt kein anderes Lebewesen, das diesen Bestandteil frisst.'));
     const food=edges.filter(e=>e.dataset.foodwebTo===missing).map(e=>names.get(e.dataset.foodwebFrom));if(food.length)out.append(make('p','Auch diese Beziehungen entfallen: '+food.map(name=>name+' → '+names.get(missing)).join('; ')+'.'));
     out.append(make('p','Dies zeigt direkte Beziehungen, keine berechneten Bestände. Andere Nahrung und indirekte Folgen sind damit nicht ausgeschlossen.'));
    }
    diagram.setAttribute('aria-label',(missing==='none'?'Ausgangsnetz.':names.get(missing)+' fehlt. Sichtbare Nahrungspfeile:')+' '+active.map(e=>names.get(e.dataset.foodwebFrom)+' zu '+names.get(e.dataset.foodwebTo)).join('; ')+'.');
   };
   control.addEventListener('change',update);zone.querySelector('[data-foodweb-reset]').addEventListener('click',()=>{control.value='none';update();control.focus();});update();
  }
  if(type==='pollen-stages'){
   const control=zone.querySelector('[data-pollen-stage]'),diagram=zone.querySelector('[data-pollen-diagram]'),out=zone.querySelector('[data-pollen-result]');
   const descriptions=[...zone.querySelector('[data-pollen-descriptions]').children].map(el=>el.textContent);
   out.id=out.id||'pollen-result-'+experimentIndex;control.setAttribute('aria-describedby',out.id);
   const update=()=>{
    const stage=Number(control.value);
    for(const [part,visible]of [['grain',stage>=1],['tube',stage>=2],['male',stage===2],['fusion',stage===3]])diagram.querySelector('[data-pollen-part="'+part+'"]').setAttribute('display',visible?'inline':'none');
    diagram.querySelector('[data-pollen-egg-label]').innerHTML=stage===3?'<tspan x="240">befruchtete </tspan><tspan x="240" dy="22">Eizelle</tspan>':'Eizelle';
    out.textContent=descriptions[stage];diagram.setAttribute('aria-label',control.selectedOptions[0].textContent+': '+descriptions[stage]);
   };
   control.addEventListener('change',update);zone.querySelector('[data-pollen-reset]').addEventListener('click',()=>{control.value='0';update();control.focus();});update();
  }
  if(type==='chart-baseline'){
   const control=zone.querySelector('[data-chart-baseline]'),plot=zone.querySelector('[data-chart-baseline-plot]'),out=zone.querySelector('[data-chart-baseline-result]');
   const records=[...zone.closest('[data-chart-check]').querySelectorAll('[data-chart-check-data] tbody tr')].map(row=>({name:row.cells[0].textContent,total:Number(row.cells[1].textContent),yes:Number(row.cells[2].textContent)}));
   out.id=out.id||'chart-baseline-result-'+experimentIndex;control.setAttribute('aria-describedby',out.id);
   const svgEl=(name,attrs={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',name);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;return el;};
   const update=()=>{
    const start=Number(control.value),height=value=>180*(value-start)/(50-start);
    const description='Fiktive Befragung. '+records.map(r=>r.name+': '+r.yes+' von '+r.total+' Antworten ja').join('; ')+'. Werteachse von '+start+' bis 50.';
    const svg=svgEl('svg',{viewBox:'0 0 460 280',role:'img','aria-label':description,style:'display:block;width:100%;max-width:600px;height:auto;background:white'});
    svg.append(svgEl('text',{x:55,y:20,fill:'#172033','font-size':14},'Ja-Antworten / Personen'));
    const ticks=start===0?[0,10,20,30,40,50]:[36,40,44,48,50];
    ticks.forEach(n=>{const y=220-height(n);svg.append(svgEl('line',{x1:55,x2:430,y1:y,y2:y,stroke:'#d1d5db'}),svgEl('text',{x:45,y:y+4,'text-anchor':'end',fill:'#172033','font-size':13},n));});
    svg.append(svgEl('path',{d:'M55 35 V220 H430',stroke:'#172033',fill:'none','stroke-width':2}));
    records.forEach((r,i)=>{const h=height(r.yes),x=110+i*180;svg.append(svgEl('rect',{x,y:220-h,width:75,height:h,fill:'#176c90','data-baseline-bar':i}),svgEl('text',{x:x+37.5,y:212-h,'text-anchor':'middle',fill:'#172033','font-size':14},r.yes),svgEl('text',{x:x+37.5,y:245,'text-anchor':'middle',fill:'#172033','font-size':13},i===0?'A: Papier':'B: App'));});
    svg.append(svgEl('text',{x:55,y:270,fill:'#172033','font-size':13},start===0?'Achse beginnt bei 0.':'Gegenbeispiel: Achse beginnt bei 36, nicht bei 0.'));
    plot.replaceChildren(svg);out.textContent=description+' '+(start===0?'Die Säulen zeigen die vollständigen Werte.':'Die sichtbaren Säulen zeigen nur den Abstand zu 36. B erscheint deshalb doppelt so hoch wie A; die Werte bleiben 40 und 44.');
   };
   control.addEventListener('change',update);update();
  }
  if(type==='vertebrate-cards'){
   const rows=[...zone.closest('[data-vertebrate-workshop]').querySelectorAll('[data-vertebrate-card]')];
   const records=rows.map(row=>({id:row.dataset.vertebrateCard,name:row.cells[0].textContent,traits:[...row.cells].slice(1).map(cell=>cell.textContent)}));
   const fields=[...zone.querySelectorAll('[data-vertebrate-feature]')],out=zone.querySelector('[data-vertebrate-result]'),list=zone.querySelector('[data-vertebrate-matches]');
   out.id=out.id||'vertebrate-result-'+experimentIndex;fields.forEach(field=>field.setAttribute('aria-describedby',out.id));
   const update=()=>{
    const matches=records.filter(record=>fields.every((field,i)=>!field.value||record.traits[i]===field.value));
    list.replaceChildren();matches.forEach(record=>{const li=make('li',record.name);li.dataset.vertebrateMatch=record.id;list.append(li);});
    out.textContent=matches.length+' von '+records.length+' Karten passen. '+(matches.length===0?'Keine der fünf Karten erfüllt alle Angaben. Das ist keine allgemeine Aussage über sämtliche Tiere.':matches.length===1?'Ein Beispiel bleibt in dieser Sammlung übrig. Eine echte Art ist damit noch nicht bestimmt.':'Mehrere Beispiele passen. Nutze ein weiteres bekanntes Merkmal; unbekannt bedeutet nicht nein.');
   };
   fields.forEach(field=>field.addEventListener('change',update));
   zone.querySelector('[data-vertebrate-reset]').addEventListener('click',()=>{fields.forEach(field=>{field.value='';});update();fields[0].focus();});update();
  }
  if(type==='packet-order'){
   const source=zone.closest('[data-packet-workshop]').querySelector('[data-packet-source]');
   const cards=[...source.querySelectorAll('tbody tr')].map(row=>row.cells[1].textContent);
   const arrivals=zone.querySelector('[data-packet-arrivals]'),message=zone.querySelector('[data-packet-message]'),out=zone.querySelector('[data-packet-result]');
   const received=new Set();let history=[];
   out.id=out.id||'packet-result-'+experimentIndex;
   const render=(prefix='')=>{
    const missing=cards.map((_,i)=>i+1).filter(n=>!received.has(n));
    arrivals.textContent=history.length?history.join(' – '):'noch keine Karte';
    message.textContent=cards.map((word,i)=>received.has(i+1)?word:'…').join(' | ');
    out.textContent=prefix+received.size+' von '+cards.length+' verschiedenen Karten vorhanden. '+(missing.length?'Fehlende Positionen: '+missing.join(', ')+'.':'Vollständig: '+cards.join(' '));
   };
   zone.querySelectorAll('[data-packet-receive]').forEach(button=>{
    button.setAttribute('aria-describedby',out.id);
    button.addEventListener('click',()=>{const n=Number(button.dataset.packetReceive),duplicate=received.has(n);history.push(n);received.add(n);render(duplicate?'Karte '+n+' ist doppelt angekommen; ihr Inhalt wird nicht erneut eingefügt. ':'Karte '+n+' ist angekommen. ');});
   });
   zone.querySelector('[data-packet-reset]').addEventListener('click',()=>{received.clear();history=[];render('Neu begonnen. ');});render();
  }
  if(type==='resource-filter'){
   const active=zone.querySelector('[data-filter-active]'),subject=zone.querySelector('[data-filter-subject]'),logic=zone.querySelector('[data-filter-logic]'),duration=zone.querySelector('[data-filter-duration]'),out=zone.querySelector('[data-filter-result]'),body=zone.querySelector('[data-filter-rows]');
   const order=zone.querySelector('[data-filter-sort]');
   const records=[...document.querySelectorAll('[data-resource-records] tbody tr')].map(row=>[...row.children].map(cell=>cell.textContent));
   if(!out.id)out.id='resource-filter-result-'+experimentIndex;
   [active,subject,logic,duration,order].forEach(control=>control.setAttribute('aria-describedby',out.id));
   const update=()=>{
    const limit=Number(duration.value);
    const selected=records.filter(row=>!active.checked||(logic.value==='and'?(row[2]===subject.value&&Number(row[3])<=limit):(row[2]===subject.value||Number(row[3])<=limit)));
    if(order.value!=='original')selected.sort((a,b)=>(order.value==='ascending'?1:-1)*(Number(a[3])-Number(b[3]))||a[0].localeCompare(b[0]));
    body.replaceChildren();selected.forEach(record=>{const row=make('tr');record.forEach((value,i)=>{const cell=make(i===0?'th':'td',value);if(i===0)cell.scope='row';row.append(cell);});body.append(row);});
    out.textContent=selected.length+' von '+records.length+' Einträgen. '+(!active.checked?'Filter aus: Alle Einträge werden angezeigt.':(logic.value==='and'?'Beide Bedingungen müssen erfüllt sein: ':'Mindestens eine Bedingung muss erfüllt sein: ')+'Fach '+subject.value+', Dauer höchstens '+limit+' Minuten.')+(selected.length===0?' Keine passenden Einträge.':'')+' Reihenfolge: '+order.selectedOptions[0].textContent+'.';
   };
   [active,subject,logic,duration,order].forEach(control=>control.addEventListener('change',update));update();
  }
  if(type==='selection-counts'){
   const fields=[zone.querySelector('[data-selection-light]'),zone.querySelector('[data-selection-dark]')],out=zone.querySelector('[data-selection-result]');
   const plot=zone.querySelector('[data-selection-plot]');
   const clearPlot=()=>{if(plot)plot.setAttribute('hidden','');};
   const drawPlot=(light,dark,share)=>{
    if(!plot)return;plot.removeAttribute('hidden');
    for(const [row,multiplier]of [['search',1],['offspring',2]]){
     const lightBar=plot.querySelector('[data-selection-bar="'+row+'-light"]'),darkBar=plot.querySelector('[data-selection-bar="'+row+'-dark"]');
     lightBar.setAttribute('width',6.5*light*multiplier);darkBar.setAttribute('x',20+6.5*light*multiplier);darkBar.setAttribute('width',6.5*dark*multiplier);
     plot.querySelector('[data-selection-count-label="'+row+'"]').textContent=multiplier*light+' hell + '+multiplier*dark+' dunkel = '+multiplier*(light+dark);
     plot.querySelector('[data-selection-share-label="'+row+'"]').textContent='Dunkler Anteil: '+share;
    }
    plot.setAttribute('aria-label','Beide Balken auf derselben Anzahlskala von 0 bis 40. Nach der Suche '+light+' helle und '+dark+' dunkle Punkte; nach der Vermehrung '+2*light+' helle und '+2*dark+' dunkle. Dunkler Anteil jeweils '+share+'.');
   };
   if(!out.id)out.id='selection-result-'+experimentIndex;
   fields.forEach(field=>field.setAttribute('aria-describedby',out.id));
   const calculate=()=>{
    clearPlot();
    const values=fields.map(field=>/^(?:[0-9]|10)$/.test(field.value.trim())?Number(field.value.trim()):null);
    if(values.includes(null)){out.textContent='Bitte trage für beide Farben eine ganze Anzahl von 0 bis 10 ein. Leer bedeutet nicht null.';return;}
    const [light,dark]=values,total=light+dark;
    if(total===0){out.textContent='Keine Überlebenden: Dieser Durchgang endet. Es gibt keine Nachkommen; bei insgesamt null Punkten ist kein Farbanteil definiert.';return;}
    const share=100*dark/total,number=share.toLocaleString('de',{maximumFractionDigits:1});
    drawPlot(light,dark,(Math.abs(share-Math.round(share*10)/10)>1e-9?'ca. ':'')+number+' %');
    out.textContent='Aus deinen Eingaben berechnet: Nach der Suche '+total+' Punkte. Nach der Vermehrung '+2*light+' helle und '+2*dark+' dunkle, insgesamt '+2*total+'. Dunkler Anteil vor und nach der Vermehrung: '+(Math.abs(share-Math.round(share*10)/10)>1e-9?'ungefähr ':'')+number+' %. '+(share===50?'Der Anteil entspricht den anfänglichen 50 %.':share>50?'Der Anteil ist gegenüber den anfänglichen 50 % gestiegen.':'Der Anteil ist gegenüber den anfänglichen 50 % gesunken.');
   };
   fields.forEach(field=>{field.addEventListener('input',()=>{clearPlot();out.textContent='Eingaben geändert. Berechne die Modellwerte erneut.';});field.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();calculate();}});});
   zone.querySelector('[data-selection-calculate]').addEventListener('click',calculate);
   zone.querySelector('[data-selection-reset]').addEventListener('click',()=>{fields.forEach(field=>{field.value='';});clearPlot();out.textContent='Trage beide Anzahlen ein.';fields[0].focus();});
  }
  if(type==='moon'){
   const slider=zone.querySelector('#moon-angle'),out=zone.querySelector('#moon-explanation'),bar=zone.querySelector('#moon-lit');
   const update=()=>{const angle=Number(slider.value),lit=Math.round(50*(1-Math.cos(angle*Math.PI/180)));const english=zone.dataset.locale==='en',turkish=zone.dataset.locale==='tr',ukrainian=zone.dataset.locale==='uk',serbian=zone.dataset.locale==='sr',arabic=zone.dataset.locale==='ar';const isolate=value=>'⁦'+value+'⁩';const germanPhase=angle===0||angle===360?'Neumond':angle===180?'Vollmond':angle===90?'Zunehmender Halbmond':angle===270?'Abnehmender Halbmond':angle<180?'Zunehmender Mond':'Abnehmender Mond';const phase=arabic?({'Neumond':'المحاق','Vollmond':'البدر','Zunehmender Halbmond':'التربيع الأول','Abnehmender Halbmond':'التربيع الأخير','Zunehmender Mond':'القمر المتزايد','Abnehmender Mond':'القمر المتناقص'}[germanPhase]):serbian?({'Neumond':'Mlad Mesec','Vollmond':'Pun Mesec','Zunehmender Halbmond':'Prva četvrt','Abnehmender Halbmond':'Poslednja četvrt','Zunehmender Mond':'Mesec raste','Abnehmender Mond':'Mesec opada'}[germanPhase]):ukrainian?({'Neumond':'Молодик','Vollmond':'Повня','Zunehmender Halbmond':'Перша чверть','Abnehmender Halbmond':'Остання чверть','Zunehmender Mond':'Зростаючий Місяць','Abnehmender Mond':'Спадний Місяць'}[germanPhase]):turkish?({'Neumond':'Yeni ay','Vollmond':'Dolunay','Zunehmender Halbmond':'İlk dördün','Abnehmender Halbmond':'Son dördün','Zunehmender Mond':'Büyüyen ay','Abnehmender Mond':'Küçülen ay'}[germanPhase]):english?({'Neumond':'New Moon','Vollmond':'Full Moon','Zunehmender Halbmond':'First quarter','Abnehmender Halbmond':'Last quarter','Zunehmender Mond':'Waxing Moon','Abnehmender Mond':'Waning Moon'}[germanPhase]):germanPhase;out.textContent=arabic?`${isolate(angle+"°")} · ${phase}: النسبة المضاءة من قرص القمر المرئي هي ${isolate(lit+"%")}.`:serbian?`${angle}° · ${phase}: osvetljeno je ${lit}% vidljivog Mesečevog diska.`:ukrainian?`${angle}° · ${phase}: освітлено ${lit}% видимого диска Місяця.`:turkish?`${angle}° · ${phase}: Görünen Ay diskinin %${lit} kadarı aydınlık.`:english?`${angle}° · ${phase}: ${lit}% of the visible Moon disc is illuminated.`:`${angle}° · ${phase}: ${lit} % der sichtbaren Mondscheibe sind beleuchtet.`;slider.setAttribute('aria-valuetext',arabic?`${isolate(angle)} درجة، ${phase}، النسبة المضاءة ${isolate(lit)} بالمئة`:serbian?`${angle} stepeni, ${phase}, osvetljeno ${lit} procenata`:ukrainian?`Положення: ${angle}°. ${phase}. Освітлено: ${lit}%.`:turkish?`${angle} derece, ${phase}, yüzde ${lit} aydınlık`:english?`${angle} degrees, ${phase}, ${lit} percent illuminated`:`${angle} Grad, ${phase}, ${lit} Prozent beleuchtet`);bar.value=lit;
    const disc=zone.querySelector('#moon-disc'),light=zone.querySelector('#moon-disc-light');
    if(disc&&light){
     const side=angle<=180?1:-1,cos=Math.cos(angle*Math.PI/180),points=[];
     for(let i=0;i<=128;i++){const a=-Math.PI/2+i*Math.PI/128;points.push([100+side*80*Math.cos(a),100+80*Math.sin(a)]);}
     for(let i=128;i>=0;i--){const a=-Math.PI/2+i*Math.PI/128;points.push([100+side*cos*80*Math.cos(a),100+80*Math.sin(a)]);}
     light.setAttribute('d',points.map((p,i)=>(i?'L':'M')+' '+p.map(n=>n.toFixed(4)).join(' ')).join(' ')+' Z');
     disc.setAttribute('aria-label',arabic?phase+': النسبة المضاءة من القرص المرئي '+isolate(lit)+' بالمئة. رسم تخطيطي من دون ظل الأرض.':serbian?phase+': osvetljeno '+lit+' procenata vidljivog diska. Šematski prikaz bez Zemljine senke.':ukrainian?phase+': освітлено '+lit+'% видимого диска. Схематичний вигляд без тіні Землі.':turkish?phase+': Görünen diskin yüzde '+lit+' kadarı aydınlık. Dünya gölgesi olmadan şematik görünüm.':english?phase+': '+lit+' percent of the visible disc illuminated. Schematic view without Earth’s shadow.':phase+': '+lit+' Prozent der sichtbaren Scheibe beleuchtet. Schematische Darstellung ohne Erdschatten.');
    }
   };slider.addEventListener('input',update);update();
  }
  if(type==='decay'){
   let remaining=200,step=0,comparisonNumber=0;const history=zone.querySelector('#decay-history'),out=zone.querySelector('#decay-status');
   const record=()=>{const expected=200/2**step;out.textContent=`Nach ${step} Halbwertszeiten: ${remaining} Modellkerne übrig. Erwartungswert: ${Number(expected.toFixed(2)).toLocaleString('de')}.`+(remaining===0?' In diesem Versuch sind alle Ausgangskerne zerfallen. Der Erwartungswert beschreibt den Mittelwert vieler solcher Versuche, keine Bruchteile eines einzelnen Kerns.':'')+(step>=10?' Die zehn Schritte dieses Modellversuchs sind abgeschlossen. Starte mit „Neuer Versuch mit 200 Kernen“ einen Vergleichsversuch.':'');zone.querySelector('#decay-bar').value=remaining;const row=make('tr');[step,remaining,Number(expected.toFixed(2))].forEach(value=>row.append(make('td',value.toLocaleString('de'))));history.append(row);zone.querySelector('#decay-step').disabled=step>=10;};
   const comparisons=zone.querySelector('#decay-comparisons'),comparisonStatus=zone.querySelector('#decay-comparison-status');
   const compare=()=>{
    if(step!==2||!comparisons)return;
    comparisonNumber++;const row=make('tr');[comparisonNumber,remaining,50].forEach(value=>row.append(make('td',String(value))));comparisons.append(row);
    while(comparisons.rows.length>10)comparisons.firstElementChild.remove();
    const values=Array.from(comparisons.rows,row=>Number(row.cells[1].textContent)),mean=values.reduce((sum,n)=>sum+n,0)/values.length;
    comparisonStatus.textContent='Versuch '+comparisonNumber+' erfasst: '+remaining+' Modellkerne nach zwei Halbwertszeiten. Erwartungswert je Versuch: 50. Sichtbare Vergleichsversuche: '+values.length+'. Mittelwert dieser Versuche: '+mean.toLocaleString('de',{maximumFractionDigits:2})+' (auf höchstens zwei Dezimalstellen gerundet). Kleinste Restzahl: '+Math.min(...values)+', größte Restzahl: '+Math.max(...values)+'. Auch dieser beobachtete Mittelwert muss nicht genau 50 betragen.';
   };
   zone.querySelector('#decay-clear-comparisons')?.addEventListener('click',()=>{comparisons.replaceChildren();comparisonNumber=0;comparisonStatus.textContent='Vergleich geleert. Ein neuer Versuch wird nach seinem zweiten Schritt erfasst.';});
   zone.querySelector('#decay-step').addEventListener('click',()=>{if(step>=10)return;let next=0;for(let i=0;i<remaining;i++)if(Math.random()<.5)next++;remaining=next;step++;record();compare();});
   zone.querySelector('#decay-reset').addEventListener('click',()=>{remaining=200;step=0;history.replaceChildren();record();});record();
  }
  if(type==='storage'){
   const energy=zone.querySelector('[data-storage-energy]'),power=zone.querySelector('[data-storage-power]'),status=zone.querySelector('[data-storage-status]');
   if(!status.id)status.id='core-storage-status-'+experimentIndex;
   [energy,power].forEach(field=>{const descriptions=new Set((field.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean));descriptions.add(status.id);field.setAttribute('aria-describedby',[...descriptions].join(' '));});
   const number=n=>n.toLocaleString('de',{maximumFractionDigits:2});
   const update=()=>{
    const e=Number(energy.value),p=Number(power.value);
    zone.querySelector('[data-storage-energy-value]').textContent=number(e)+' kWh';zone.querySelector('[data-storage-power-value]').textContent=number(p)+' kW';
    energy.setAttribute('aria-valuetext',number(e)+' Kilowattstunden');power.setAttribute('aria-valuetext',number(p)+' Kilowatt');
    if(e===0){status.textContent='Keine nutzbare Energie vorhanden. Der Speicher kann keine Energie für den Verbrauch bereitstellen.';return;}
    if(p===0){status.textContent='Keine Leistungsentnahme: Die '+number(e)+' kWh bleiben im Modell gespeichert. Ohne Entnahme wird keine Entladezeit berechnet; Selbstentladung und Eigenverbrauch sind hier nicht berücksichtigt.';return;}
    const hours=e/p,rounded=Math.round(hours*100)/100;
    status.textContent=number(e)+' kWh ÷ '+number(p)+' kW '+(Math.abs(hours-rounded)>1e-9?'≈':'=')+' '+number(hours)+' h. Bei dieser konstanten Entnahme reicht die nutzbare Energie entsprechend lange.';
   };
   [energy,power].forEach(field=>field.addEventListener('input',update));zone.querySelector('[data-storage-reset]').addEventListener('click',()=>{energy.value=10;power.value=2;update();});update();
  }
  if(type==='power'){

   const select=zone.querySelector('#power-mode'),table=zone.querySelector('#power-table');
   const update=()=>{const combined=select.value==='chp';const values=[['Elektrische Energie',40],['Genutzte Wärme',combined?45:0],['Andere Energieabgaben',combined?15:60]];table.replaceChildren();values.forEach(([name,value])=>{const row=make('tr');row.append(make('th',name),make('td',String(value)));table.append(row);});zone.querySelector('#power-status').textContent=combined?'85 von 100 Einheiten genutzt: 40 als Strom und 45 als Fernwärme.':'40 von 100 Einheiten als Strom genutzt. 60 Einheiten werden anders abgegeben.';};select.addEventListener('change',update);update();
  }
 });
}
window.enhanceCoreLearning=enhanceCoreLearning;
