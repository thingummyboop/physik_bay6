const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const ids=Object.keys(data).filter(id=>id.startsWith('deutsch_'));assert.equal(ids.length,11);
 for(const id of ids){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const file of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+file+'.js'));
  await w.renderTopic();
  const expected=['deutsch_1_schreiben','deutsch_1_lesen','deutsch_2_literatur','deutsch_2_sachtexte','deutsch_3_argumentieren','deutsch_4_analyse'].includes(id)?7:id==='deutsch_1_sprache'?10:4;assert.equal(d.querySelectorAll('.practice-box').length,expected);assert.equal(d.querySelectorAll('.chapter-question').length,expected);
  if(id==='deutsch_2_sachtexte'){
   assert.deepEqual([...d.querySelectorAll('[data-schoolway-table] tbody td')].map(x=>Number(x.textContent)),[10,8,4,2]);
   assert.equal(Number(d.querySelector('[data-schoolway-table] tfoot td').textContent),24);
   assert.equal(d.querySelectorAll('[data-material-method] > li').length,4);
   assert.equal(d.querySelectorAll('[data-material-notes] tbody tr').length,3);
   assert.ok(d.querySelector('[data-schoolway-second]'));assert.ok(d.querySelector('[data-schoolway-comment]'));
  }
  if(id==='deutsch_3_argumentieren'){
   assert.deepEqual([...d.querySelectorAll('[data-reading-vote] tbody td')].map(x=>Number(x.textContent)),[16,5,3]);
   assert.equal(d.querySelectorAll('[data-discussion-roles] tbody tr').length,5);
   assert.equal(d.querySelectorAll('[data-discussion-sequence] > li').length,5);
   assert.ok(d.querySelector('[data-reading-planning]'));assert.ok(d.querySelector('[data-discussion-model]'));
  }
  if(id==='deutsch_4_analyse'){
   const poem=d.querySelector('[data-goethe-poem]');assert.equal(poem.querySelectorAll('br').length,7);
   assert.deepEqual([...poem.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent),['Ueber allen Gipfeln','Ist Ruh’,','In allen Wipfeln','Spürest du','Kaum einen Hauch;','Die Vögelein schweigen im Walde.','Warte nur, balde','Ruhest du auch.']);
   assert.equal(d.querySelectorAll('[data-goethe-comparison] tbody tr').length,3);
   assert.ok(d.querySelector('a[href*="oldid=3682272"]'));assert.ok(d.querySelector('[data-goethe-model]'));
  }
  if(id==='deutsch_1_schreiben'){
   assert.equal(d.querySelectorAll('[data-revision-steps] tbody tr').length,4);assert.ok(d.querySelector('[data-revision-draft]'));assert.ok(d.querySelector('[data-revision-model]'));
  }
  if(id==='deutsch_1_sprache'){
   assert.equal(d.querySelectorAll('[data-spelling-strategies] tbody tr').length,4);
   assert.equal(d.querySelector('[data-spelling-draft]').textContent,'Im garten liegt ein Blat. Zwei kinder beobachten einen Hunt.');
   assert.equal(d.querySelectorAll('[data-language-registers] tbody tr').length,2);
   assert.ok(d.querySelector('[data-register-model]'));assert.ok(d.querySelector('[data-spelling-model]'));
  }
  if(id==='deutsch_1_lesen'){
   assert.equal(d.querySelectorAll('[data-reading-rehearsal] > li').length,4);
   assert.equal(d.querySelectorAll('[data-reading-feedback] tbody tr').length,3);
   assert.equal(d.querySelectorAll('[data-reading-log] thead th').length,4);
  }
  if(id==='deutsch_2_literatur'){
   assert.equal(d.querySelectorAll('[data-literary-poem] br').length,8);
   assert.equal(d.querySelectorAll('[data-literary-scene] strong').length,4);
   assert.equal(d.querySelectorAll('[data-literary-comparison] tbody tr').length,3);
   assert.ok(d.querySelector('[data-literary-model]'));
  }
  if(['deutsch_1_schreiben','deutsch_1_sprache','deutsch_1_lesen','deutsch_2_literatur','deutsch_2_sachtexte','deutsch_3_argumentieren','deutsch_4_analyse'].includes(id)){
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
   for(const [index,q] of w.currentChapterQuiz.questions.entries()){
    if(q.id.startsWith('de_goethe_'))assert.equal(q.sectionIndex,2);
    if(q.id.startsWith('de_diskussion_'))assert.equal(q.sectionIndex,2);
    if(q.id.startsWith('de_material_'))assert.equal(q.sectionIndex,2);
    if(q.id.startsWith('de_revision_'))assert.equal(q.sectionIndex,2);
    if(q.id.startsWith('de_strategie_'))assert.equal(q.sectionIndex,2);
    if(q.id.startsWith('de_register_'))assert.equal(q.sectionIndex,3);
    if(q.id.startsWith('de_leseweg_')||q.id.startsWith('de_formen_'))assert.equal(q.sectionIndex,2);
    for(let choice=0;choice<q.answers.length;choice++){
     w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
     w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(expected-(q.answers[choice].correct?0:1))/expected));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
    }
   }
  }
  const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);assert.ok(d.querySelector('a[href="#language-workshop"]'));
  const check=[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen');check.click();assert.match(workshop.textContent,/Ordne zuerst alle Beispiele zu/);
  const selects=[...workshop.querySelectorAll('select')];selects.forEach((select,i)=>{select.value=data[id].workshop.items[i].answer;});check.click();assert.match(workshop.textContent,/3 von 3 Zuordnungen passen/);
  selects[0].value=data[id].workshop.categories.find(x=>x!==data[id].workshop.items[0].answer);check.click();assert.match(workshop.textContent,/2 von 3 Zuordnungen passen/);
  const draft=d.querySelector('#workshop-draft');draft.value='Mein Entwurf <script>kein HTML</script>';draft.dispatchEvent(new w.Event('input'));
  assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value,'Draft saved before navigation, without debounce loss');
  workshop.remove();w.buildLanguageWorkshop(data[id],id);assert.equal(d.querySelector('#workshop-draft').value,draft.value);assert.equal(d.querySelector('#workshop-draft').childElementCount,0);
  assert.equal(d.querySelectorAll('#language-workshop input[type=checkbox]').length,data[id].workshop.rubric.length);
  const count=d.querySelectorAll('[data-language-workshop]').length;w.buildLanguageWorkshop(data[id],id);assert.equal(d.querySelectorAll('[data-language-workshop]').length,count);
  assert.ok(w.SCIVERSE_CURRICULUM.deutsch.topics.find(t=>t.id===id).available!==false);
  dom.window.close();
 }
 console.log('PASS: 11 German chapter renders, 68 practice/check questions, 156 answer paths in seven revised chapters, 33 classifications, feedback, immediate local drafts, restore, text safety, rubrics and navigation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
