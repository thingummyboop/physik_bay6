const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_pilze';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,13);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-fungi-relations]'),select=zone.querySelector('select'),check=zone.querySelector('button'),feedback=zone.querySelector('[role=status]');
 const values=['decomposer','mutualism','parasite','unknown'];
 check.click();assert.match(feedback.textContent,/zuerst/);
 for(const [kind,answer]of [['wood','decomposer'],['root','mutualism'],['leaf','parasite'],['nearby','unknown']]){
  select.focus();select.value=kind;select.dispatchEvent(new w.Event('change'));
  assert.equal(d.activeElement,select);assert.equal(zone.querySelector('input:checked'),null);assert.equal(feedback.textContent,'');
  for(const value of values){
   zone.querySelector(`input[value="${value}"]`).click();assert.match(feedback.textContent,/geändert/);
   check.focus();check.click();assert.equal(feedback.textContent.startsWith('Richtig.'),value===answer);
   assert.equal(d.activeElement,check);assert.ok(feedback.textContent.length>100);
  }
 }
 select.value='wood';select.dispatchEvent(new w.Event('change'));check.click();assert.match(feedback.textContent,/zuerst/);
 assert.equal(zone.querySelectorAll('input[type=radio]').length,4);
 assert.match(d.body.textContent,/allein beweist noch keine Mykorrhiza/);
 zone.querySelector('[data-fungi-reset]').click();assert.equal(select.value,'wood');assert.equal(d.activeElement,select);assert.equal(zone.querySelector('input:checked'),null);assert.equal(feedback.textContent,'');
 const keys={bio_2_pilze_s1:[1,0],bio_2_pilze_d1:[2,0],bio_2_pilze_d5:[0,0],bio_2_pilze_s2:[2,1],bio_2_pilze_d2:[1,1],bio_2_pilze_s3:[0,2],bio_2_pilze_d3:[2,2],bio_2_pilze_s4:[1,3],bio_2_pilze_relations:[0,3],bio_2_pilze_d4:[2,3],bio_2_pilze_evidence:[2,3],bio_2_pilze_s5:[1,4],bio_2_pilze_yeast:[0,4]};
 const questions=w.currentChapterQuiz.questions;for(const [i,q]of questions.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id][0]);assert.equal(q.sectionIndex,keys[q.id][1]);for(let choice=0;choice<3;choice++){w.restartChapterQuiz();questions.forEach((item,n)=>d.querySelector(`input[name="chapter_q_${n}"][value="${i===n?choice:keys[item.id][0]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,choice===keys[q.id][0]?100:92);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id][0]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 assert.equal(w.chapterRevision(id),2);assert.equal(d.querySelectorAll('.bio-training-panel[data-assignment-mode="direct"]').length,5);assert.equal(d.querySelectorAll('.bio-training-card').length,15);assert.equal(d.querySelectorAll('[data-fungi-solution]').length,5);assert.equal(d.querySelectorAll('.fungi-data tbody tr').length,6);assert.equal(d.querySelectorAll('.fungi-profile svg').length,1);assert.equal(d.querySelectorAll('img').length,0);
 const authored=new JSDOM(data[id].sections.map(s=>s.content).join('')).window.document;assert.deepEqual([...d.querySelectorAll('.bio-training-card')].map(e=>e.textContent),[...authored.querySelectorAll('.bio-training-card')].map(e=>e.textContent));assert.ok(data[id].sections.flatMap(s=>s.quizzes).filter(q=>q.practiceOnly).every(q=>q.answers.every(a=>a.pts===0)));assert.doesNotMatch(d.body.textContent,/Stell dir eine echte Situation vor/);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));assert.equal(pd.querySelectorAll('[data-fungi-paper] .fungi-material').length,4);assert.equal(pd.querySelectorAll('.fungi-data tbody tr').length,6);assert.equal(pd.querySelectorAll('.fungi-profile svg').length,1);assert.equal(pd.querySelectorAll('#ws-solutions [data-fungi-solution]').length,5);assert.equal(pd.querySelectorAll('#ws-biology-material [data-fungi-solution]').length,0);paper.window.close();
 console.log('PASS: 16 relation choices including insufficient evidence, reset/focus/double initialization, 39 independently keyed quiz answers and review sections, 15 direct tasks, two datasets, diagram and four paper cases with five separate solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
