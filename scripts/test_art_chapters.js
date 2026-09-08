const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const ids=Object.keys(data).filter(id=>id.startsWith('kunst_'));assert.equal(ids.length,11);let studies=0;
 for(const id of ids){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const file of ['curriculum','chapter-revisions','common','core-learning','language-workshop','art-workshop','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
  const expected=['kunst_3_kunstgeschichte','kunst_3_foto_medien','kunst_4_portfolio'].includes(id)?12:id==='kunst_1_linie_farbe'?6:['kunst_2_design','kunst_3_foto_medien','kunst_3_kunstgeschichte','kunst_4_portfolio'].includes(id)?10:['kunst_2_design','kunst_4_koerper_selbstbild','kunst_3_kunstgeschichte','kunst_4_portfolio','kunst_3_foto_medien','kunst_1_wahrnehmen','kunst_2_raum'].includes(id)?8:['kunst_3_zeichen_marken','kunst_2_design','kunst_2_raum','kunst_1_museum','kunst_1_wahrnehmen','kunst_3_foto_medien','kunst_4_koerper_selbstbild','kunst_4_gebaeude_umnutzen'].includes(id)?6:4;assert.equal(d.querySelectorAll('.practice-box').length,expected,id);assert.equal(d.querySelectorAll('.chapter-question').length,expected,id);
  assert.ok(w.SCIVERSE_CURRICULUM.kunst.topics.find(t=>t.id===id).available!==false);
  const workshop=d.querySelector('[data-language-workshop]');assert.match(workshop.textContent,/ersetzt nicht die bildnerische Arbeit/);
  [...workshop.querySelectorAll('select')].forEach((s,i)=>s.value=data[id].workshop.items[i].answer);
  [...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
  const draft=workshop.querySelector('textarea');draft.value='Meine nächste Variante: Abstand verkleinern.';draft.dispatchEvent(new w.Event('input'));assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value);
  if(id==='kunst_1_linie_farbe'){
   assert.equal(w.chapterRevision(id),1);assert.ok(d.querySelector('a[href="https://www.mainz.de/microsite/gutenberg-museum/Forschung_Sammlung_/Gutenberg_Bibeln"]'));
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,6);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_3_kunstgeschichte'){
   assert.deepEqual(data[id].sections.map(s=>s.id),['section0','werkbeispiel','section1','kunstmarkt','section2','originaldruck','raumvergleich']);
   const expectedSections={kunst_3_kunstgeschichte_q0:0,kunst_3_kunstgeschichte_werk1:1,kunst_3_kunstgeschichte_werk2:1,kunst_3_kunstgeschichte_q1:2,kunst_3_kunstgeschichte_markt1:3,kunst_3_kunstgeschichte_markt2:3,kunst_3_kunstgeschichte_q2:4,kunst_3_kunstgeschichte_q3:4,kunst_3_kunstgeschichte_druck1:5,kunst_3_kunstgeschichte_druck2:5,kunst_3_kunstgeschichte_raum1:6,kunst_3_kunstgeschichte_raum2:6};
   for(const q of w.currentChapterQuiz.questions){assert.equal(q.sectionIndex,expectedSections[q.id],q.id);const section=d.querySelector('[data-chapter-section="'+q.sectionIndex+'"]');assert.ok(section);assert.equal(section.querySelector('h2').textContent,data[id].sections[q.sectionIndex].title);}

   assert.equal(w.chapterRevision(id),4);const comparison=d.querySelector('[data-chapter-section="6"]');assert.equal(comparison.querySelectorAll('tbody tr').length,2);assert.equal(comparison.querySelectorAll('a[target="_blank"]').length,2);assert.ok(d.querySelector('a[href="https://www.metmuseum.org/art/collection/search/45434"]'));const link=d.querySelector('a[href*="CQEeZWQPOI2Yjg"]');assert.ok(link);assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,12);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_4_koerper_selbstbild'){
   assert.equal(w.chapterRevision(id),1);assert.ok(d.querySelector('a[href="https://www.moma.org/collection/works/56618"]'));assert.ok(d.querySelector('a[href="https://www.sammlung.pinakothek.de/de/artwork/Qlx2QpQ4Xq"]'));
   const figure=d.querySelector('svg[role="img"]');assert.ok(figure);assert.match(figure.getAttribute('aria-label'),/Arme schräg nach unten.*Arme schräg nach oben/);assert.ok(w.SCIVERSE_CURRICULUM.kunst.topics.findIndex(t=>t.id===id)<w.SCIVERSE_CURRICULUM.kunst.topics.findIndex(t=>t.id==='kunst_4_portfolio'));assert.equal(w.SCIVERSE_CURRICULUM.kunst.topics.at(-1).id,'kunst_4_portfolio');
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,8);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_4_gebaeude_umnutzen'){
   const link=d.querySelector('a[href*="2001/07/05/"]');assert.ok(link);assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);assert.equal(d.querySelectorAll('table tbody th[scope="row"]').length,5);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,6);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_1_wahrnehmen'){
   assert.equal(w.chapterRevision(id),3);assert.equal(data[id].sections[3].id,'meine_plaetze');
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_platz')))assert.equal(q.sectionIndex,3);
   const examples=d.querySelector('[data-art-rework-examples]');assert.equal(examples.querySelectorAll('svg[role=img]').length,3);assert.equal(new Set([...examples.querySelectorAll('[data-reused-shape]')].map(el=>el.getAttribute('d'))).size,1);for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_umbauen')))assert.equal(q.sectionIndex,4);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,8);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_1_museum'){
   const link=d.querySelector('a[href*="CQEeZWQPOI2Yjg"]');assert.ok(link);assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);assert.equal(d.querySelectorAll('table th[scope="row"]').length,4);assert.match(w.SCIVERSE_CURRICULUM.kunst.topics.find(t=>t.id===id).grade,/5. Schulstufe/);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,6);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_2_raum'){
   assert.equal(w.chapterRevision(id),2);assert.equal(data[id].sections[3].id,'raumbild_erzaehlen');
   const scene=d.querySelector('[data-art-story-scene] svg');assert.ok(scene);assert.equal(scene.getAttribute('viewBox'),'0 0 460 310');
   const description=scene.getAttribute('aria-labelledby').split(' ').map(id=>d.getElementById(id)?.textContent).join(' ');assert.match(description,/Blatt.*Stift.*Stuhl.*Tür/);assert.match(description,/Keine Person/);

   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_erzaehlen')))assert.equal(q.sectionIndex,3);
   assert.ok(d.querySelector('a[href*="Hausordnung_Stephanskirche.pdf"]'));for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_raumtypen')))assert.equal(q.sectionIndex,4);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,8);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_2_design'){
   assert.equal(d.querySelectorAll('[data-art-commission-examples] svg').length,2);
   assert.ok(d.querySelector('a[href="https://www.ikg-wien.at/rabbinat/friedh%C3%B6fe/wien/mahnmal-am-judenplatz"]'));assert.ok(d.querySelector('a[href="https://presse.wien.gv.at/1996/01/25/holocaust-memorial-projekt-von-rachel-whiteread-wird-verwirklicht"]'));
   assert.equal(w.chapterRevision(id),3);assert.equal(data[id].sections[3].id,'bewahren');
   for(const href of ['https://sammlung.wienmuseum.at/objekt/1073765-walfisch-vom-gasthaus-zum-walfisch-im-prater/','https://magazin.wienmuseum.at/der-walfisch-aus-dem-prater']){const link=d.querySelector('a[href="'+href+'"]');assert.ok(link);assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);}
assert.equal(d.querySelectorAll('table tbody th[scope="row"]').length,3);
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_bewahren')))assert.equal(q.sectionIndex,3);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,10);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_3_zeichen_marken'){
   const examples=d.querySelector('[data-art-brand-examples]');assert.equal(examples.querySelectorAll('figure').length,3);assert.equal(examples.querySelectorAll('svg[role="img"][aria-label]').length,2);
   const lab=examples.querySelector('[data-art-brand-gap]'),control=lab.querySelector('[data-brand-gap]'),combination=lab.querySelector('[data-brand-combination]'),unchanged=combination.innerHTML,status=lab.querySelector('[data-brand-status]');
   assert.ok(control.closest('label'));lab.querySelector('[data-brand-compare]').click();assert.match(status.textContent,/Merke zuerst/);lab.querySelector('[data-brand-remember]').click();
   for(let gap=0;gap<=64;gap+=8){control.value=gap;control.dispatchEvent(new w.Event('input'));assert.equal(combination.style.gap,gap+'px');assert.equal(combination.innerHTML,unchanged);assert.equal(lab.querySelector('[data-brand-saved]').style.gap,'16px');assert.equal(lab.querySelector('[data-brand-saved]').innerHTML,unchanged);assert.equal(lab.querySelector('[data-brand-gap-value]').textContent,String(gap));assert.match(control.getAttribute('aria-valuetext'),new RegExp('^'+gap+' Pixel'));}
   lab.querySelector('[data-brand-compare]').click();assert.match(status.textContent,/Abstand A: 16 Pixel; aktueller Abstand B: 64 Pixel/);lab.querySelector('[data-brand-remember]').click();assert.equal(lab.querySelectorAll('[data-brand-saved]').length,1);control.value=0;control.dispatchEvent(new w.Event('input'));lab.querySelector('[data-brand-remember]').click();control.value=8;control.dispatchEvent(new w.Event('input'));lab.querySelector('[data-brand-compare]').click();assert.match(status.textContent,/Abstand A: 0 Pixel; aktueller Abstand B: 8 Pixel/);assert.equal(lab.querySelector('[data-brand-saved]').style.gap,'0px');assert.equal(lab.querySelectorAll('[data-brand-saved]').length,1);w.initArtWorkshops();const reset=lab.querySelector('[data-brand-reset]');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(control.value,'16');assert.equal(combination.style.gap,'16px');assert.equal(lab.querySelector('[data-brand-preview]').hidden,true);assert.equal(lab.querySelector('[data-brand-saved]'),null);lab.querySelector('[data-brand-compare]').click();assert.match(status.textContent,/Merke zuerst/);

   assert.match(w.SCIVERSE_CURRICULUM.kunst.topics.find(t=>t.id===id).grade,/7. Schulstufe/);
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,6);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  const ad=d.querySelector('[data-art-ad]');if(id==='kunst_4_portfolio'){
   assert.deepEqual(data[id].sections.map(s=>s.id),['section0','werbung','raum_zeit','section1','section2','bild_wort_ton','medien_perspektiven']);
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('kunst_4_portfolio_ad')))assert.equal(q.sectionIndex,1);
   assert.ok(ad);for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_ton')))assert.equal(q.sectionIndex,5);assert.equal(d.querySelector('[data-chapter-section="5"]').querySelectorAll('table tbody tr').length,3);assert.equal(w.chapterRevision(id),5);const figure=ad.querySelector('figure'),original=figure.textContent,select=ad.querySelector('select'),invitation=ad.querySelector('[data-ad-invitation]'),details=ad.querySelector('[data-ad-details]');
   assert.match(original,/FIKTIVER/);assert.ok(select.closest('label'));assert.equal(ad.querySelector('[data-ad-status]').getAttribute('aria-live'),'polite');
   for(let i=0;i<20;i++){select.value=i%2?'invitation':'details';select.dispatchEvent(new w.Event('change'));const detail=i%2===0;assert.equal(details.style.fontSize,detail?'2rem':'1rem');assert.equal(invitation.style.fontSize,detail?'1rem':'2rem');assert.equal(details.style.fontWeight,detail?'800':'400');assert.equal(invitation.style.fontWeight,detail?'400':'800');assert.equal(figure.textContent,original);assert.match(ad.querySelector('[data-ad-status]').textContent,detail?/Ort und Zeit sind/:/Die Einladung ist/);}
   w.initArtWorkshops();const reset=ad.querySelector('[data-ad-reset]');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(select.value,'invitation');assert.equal(invitation.style.fontSize,'2rem');
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,12);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  if(id==='kunst_3_foto_medien'){
   const adaptation=d.querySelector('[data-chapter-section="6"]');assert.equal(adaptation.querySelectorAll('a[target="_blank"]').length,3);for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.includes('_adaption')))assert.equal(q.sectionIndex,6);
   const examples=d.querySelector('[data-art-trace-examples]');assert.ok(examples);const drawings=examples.querySelectorAll('[data-trace-geometry]');assert.equal(drawings.length,2);assert.equal(drawings[0].innerHTML,drawings[1].innerHTML);assert.notEqual(drawings[0].getAttribute('stroke-width'),drawings[1].getAttribute('stroke-width'));assert.notEqual(drawings[0].getAttribute('fill'),drawings[1].getAttribute('fill'));
   assert.equal(w.chapterRevision(id),4);const zone=d.querySelector('[data-art-study]'),svg=zone.querySelector('svg'),before=svg.outerHTML,select=zone.querySelector('[data-caption-choice]'),caption=zone.querySelector('[data-art-caption]');assert.ok(select.closest('label'));
   for(const value of ['escape','meeting','description']){select.value=value;select.dispatchEvent(new w.Event('change'));assert.equal(caption.textContent,select.selectedOptions[0].textContent);assert.equal(svg.outerHTML,before);assert.doesNotMatch(svg.getAttribute('aria-label'),/Bildunterschrift/);assert.match(zone.querySelector('[data-status]').textContent,/Zeichnung bleibt unverändert/);}
   zone.querySelector('[data-remember]').click();const savedCaption=zone.querySelector('[data-art-study-saved] figcaption').textContent;select.value='escape';select.dispatchEvent(new w.Event('change'));zone.querySelector('[data-compare]').click();assert.match(zone.querySelector('[data-status]').textContent,/Verändert: Bildunterschrift/);assert.equal(zone.querySelector('[data-art-study-saved] figcaption').textContent,savedCaption);assert.match(savedCaption,/Formen auf einer hellen Fläche/);zone.querySelector('[data-reset]').click();assert.equal(select.value,'description');assert.equal(caption.textContent,'Formen auf einer hellen Fläche');
   for(const answer of [0,1,2]){w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,12);w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[answer].feedback)));}
  }
  const zone=d.querySelector('[data-art-study]');if(zone){studies++;
   const svg=zone.querySelector('svg'),status=()=>zone.querySelector('[data-status]').textContent;
   const set=(key,value)=>{const el=zone.querySelector('[data-setting="'+key+'"]');el.value=value;el.dispatchEvent(new w.Event('input'));assert.equal(zone.querySelector('[data-value="'+key+'"]').textContent,String(value));};
   zone.querySelector('[data-compare]').click();assert.match(status(),/Merke zuerst/);
   zone.querySelector('[data-remember]').click();zone.querySelector('[data-compare]').click();assert.match(status(),/gleich/);
   const preview=zone.querySelector('[data-art-study-saved]');assert.equal(preview.hidden,false);const saved=preview.querySelector('svg').outerHTML;assert.equal(saved,svg.outerHTML);
   set('x',340);set('size',80);set('hue',300);set('crop',1);
   assert.equal(svg.querySelector('circle').getAttribute('cx'),'340');assert.equal(svg.querySelector('circle').getAttribute('r'),'80');assert.equal(svg.querySelector('[data-ground]').getAttribute('fill'),'hsl(300 45% 80%)');assert.equal(svg.getAttribute('viewBox'),'80 30 240 180');assert.match(svg.getAttribute('aria-label'),/Position 340.*Radius 80.*300 Grad/);
   zone.querySelector('[data-compare]').click();assert.match(status(),/Position, Größe, Hintergrundfarbe, Bildausschnitt/);assert.match(status(),/Position 145.*Position 340/);
   assert.equal(preview.querySelector('svg').outerHTML,saved);zone.querySelector('[data-remember]').click();assert.equal(preview.querySelectorAll('svg').length,1);assert.equal(preview.querySelector('svg').outerHTML,svg.outerHTML);assert.match(preview.textContent,/Position 340/);
   w.initArtWorkshops();assert.equal(zone.querySelectorAll('[data-art-study-saved]').length,1);zone.querySelector('[data-reset]').click();assert.equal(preview.hidden,true);assert.equal(preview.children.length,0);assert.equal(svg.getAttribute('viewBox'),'0 0 400 240');assert.equal(svg.querySelector('circle').getAttribute('cx'),'145');assert.equal(svg.querySelector('circle').getAttribute('r'),'50');
   zone.querySelector('[data-compare]').click();assert.match(status(),/Merke zuerst/);
  }
  dom.window.close();
 }
 assert.equal(studies,3);console.log('PASS: 11 art chapter integrations, 94 questions, 33 classifications and local reflection drafts; 3 SVG studies with position/size/color/crop controls, A/B comparison, accessibility description and reset; advertising emphasis with stable wording and twelve-question portfolio assessment.');
})().catch(error=>{console.error(error);process.exitCode=1;});
