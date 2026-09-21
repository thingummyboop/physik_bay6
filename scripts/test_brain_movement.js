const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_gehirn_bewegung';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,12);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-movement-lab]'),select=zone.querySelector('select'),check=zone.querySelector('button'),feedback=zone.querySelector('[role=status]');
 const storage=JSON.stringify(w.localStorage);const values=['sensory','motor','both','unknown'];
 check.click();assert.match(feedback.textContent,/zuerst/);
 for(const [kind,answer]of [['pressure','sensory'],['command','motor'],['correction','both'],['unclear','unknown']]){
  select.focus();select.value=kind;select.dispatchEvent(new w.Event('change'));
  assert.equal(d.activeElement,select);assert.equal(zone.querySelector('input:checked'),null);assert.equal(feedback.textContent,'');
  for(const value of values){
   zone.querySelector(`input[value="${value}"]`).click();assert.match(feedback.textContent,/geändert/);
   check.focus();check.click();assert.equal(feedback.textContent.startsWith('Richtig.'),value===answer);
   assert.equal(d.activeElement,check);assert.ok(feedback.textContent.length>100);
  }
 }
 select.value='pressure';select.dispatchEvent(new w.Event('change'));check.click();assert.match(feedback.textContent,/zuerst/);
 assert.equal(zone.querySelectorAll('input[type=radio]').length,4);
 assert.match(d.body.textContent,/kein Test ihrer Fähigkeiten/);
 zone.querySelector('[data-movement-reset]').click();assert.equal(select.value,'pressure');assert.equal(d.activeElement,select);assert.equal(zone.querySelector('input:checked'),null);assert.equal(feedback.textContent,'');
 assert.equal(JSON.stringify(w.localStorage),storage);
 const keys={"bio_2_gehirn_bewegung_s1":[1,0],"bio_2_gehirn_bewegung_d1":[2,0],"bio_2_gehirn_bewegung_s2":[0,1],"bio_2_gehirn_bewegung_d2":[1,1],"bio_2_gehirn_bewegung_s3":[2,2],"bio_2_gehirn_bewegung_d3":[0,2],"bio_2_gehirn_bewegung_d5":[1,2],"bio_2_gehirn_bewegung_s4":[2,3],"bio_2_gehirn_bewegung_d4":[0,3],"bio_2_gehirn_bewegung_accuracy":[1,3],"bio_2_gehirn_bewegung_s5":[1,4],"bio_2_gehirn_bewegung_plan":[2,4]};
 const questions=w.currentChapterQuiz.questions;for(const [i,q]of questions.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id][0]);assert.equal(q.sectionIndex,keys[q.id][1]);for(let choice=0;choice<3;choice++){w.restartChapterQuiz();questions.forEach((item,n)=>d.querySelector(`input[name="chapter_q_${n}"][value="${i===n?choice:keys[item.id][0]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,choice===keys[q.id][0]?100:92);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id][0]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 assert.equal(w.chapterRevision(id),2);assert.equal(d.querySelectorAll('.bio-training-panel[data-assignment-mode="direct"]').length,5);assert.equal(d.querySelectorAll('.bio-training-card').length,15);assert.equal(d.querySelectorAll('[data-movement-solution]').length,5);assert.equal(d.querySelectorAll('.movement-data tbody tr').length,5);assert.equal(d.querySelectorAll('.movement-pathway svg').length,1);assert.equal(d.querySelectorAll('img').length,0);
 const authored=new JSDOM(data[id].sections.map(s=>s.content).join('')).window.document;assert.deepEqual([...d.querySelectorAll('.bio-training-card')].map(e=>e.textContent),[...authored.querySelectorAll('.bio-training-card')].map(e=>e.textContent));assert.ok(data[id].sections.flatMap(s=>s.quizzes).filter(q=>q.practiceOnly).every(q=>q.answers.every(a=>a.pts===0)));assert.doesNotMatch(d.body.textContent,/Stell dir eine echte Situation vor/);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));assert.equal(pd.querySelectorAll('[data-movement-paper] .movement-material').length,4);assert.equal(pd.querySelectorAll('.movement-data tbody tr').length,5);assert.equal(pd.querySelectorAll('.movement-pathway svg').length,1);assert.equal(pd.querySelectorAll('#ws-solutions [data-movement-solution]').length,5);assert.equal(pd.querySelectorAll('#ws-biology-material [data-movement-solution]').length,0);paper.window.close();
 console.log('PASS: 16 case choices, missing selection/reset/focus/storage, 36 independently keyed quiz answers and review sections, 15 direct tasks, pathway, five data rows and four paper cases with five separate solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
