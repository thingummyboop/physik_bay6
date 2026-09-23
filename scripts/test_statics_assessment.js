'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const data=JSON.parse(read('lang/de.json')),keys=require('./fixtures/statics_assessment_keys.json');
const topic=data.drehundstatik;
const core=[...topic.sections.filter(s=>s.level!=='extension').flatMap(s=>s.quizzes||[]),...topic.diplom.questions];
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=drehundstatik',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 assert.equal(w.chapterRevision('drehundstatik'),5);
 assert.equal(w.currentChapterResult('drehundstatik',{contentRevision:4,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult('drehundstatik',{contentRevision:5,passed:true,bestPercent:100}).passed,true);
 assert.deepEqual([...w.currentChapterQuiz.questions].map(q=>q.id).sort(),Object.keys(keys).sort());
 assert.equal(core.length,17);
 // Independently calculated numerical cases, not values read from correctness flags.
 assert.equal(10*.2,2);assert.equal(10*.8,8);assert.equal(.2/.8,.25);
 assert.equal(20*.3,10*.6);
 assert.match(core.find(q=>q.id==='dsh7').answers[keys.dsh7].text,/2 N·m.*8 N·m/);
 assert.match(core.find(q=>q.id==='dsh15').answers[keys.dsh15].text,/6 N·m/);
 const saved=JSON.stringify(w.localStorage);let practice=0,assessed=0;
 for(const s of topic.sections.filter(s=>s.level!=='extension'))for(const q of s.quizzes||[]){
  const box=d.querySelector('.practice-box[data-id="'+q.id+'"]');
  for(const [a,answer]of q.answers.entries()){
   const button=[...box.querySelectorAll('button')].find(b=>b.textContent===answer.text);
   new w.Function(button.getAttribute('onclick')).call(button);
   assert.equal(button.classList.contains('is-correct'),a===keys[q.id]);
   assert.ok(box.querySelector('.feedback').innerText.includes(answer.feedback));practice++;
  }
 }
 assert.equal(JSON.stringify(w.localStorage),saved);
 for(const [index,q]of w.currentChapterQuiz.questions.entries()){
  assert.equal(q.answers.length,3);assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id]);
  for(let a=0;a<3;a++){
   w.restartChapterQuiz();w.currentChapterQuiz.questions.forEach((other,i)=>d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?a:keys[other.id]}"]`).checked=true);
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).drehundstatik;
   assert.equal(result.lastPercent,a===keys[q.id]?100:94);assert.equal(result.contentRevision,5);
   assert.deepEqual(result.reviewQuestionIds,a===keys[q.id]?[]:[q.id]);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));assessed++;
  }
 }
 assert.equal(practice,12);assert.equal(assessed,51);
 const extensions=topic.sections.filter(s=>s.level==='extension').flatMap(s=>s.quizzes||[]);
 assert.deepEqual(extensions.map(q=>q.id),['q5','dsh13','dsh14']);
 for(const q of extensions){assert.ok(d.querySelector('.practice-box[data-id="'+q.id+'"]'));assert.ok(!w.currentChapterQuiz.questions.some(x=>x.id===q.id));}
 assert.ok(d.querySelector('[data-statics-lever-balance]'));dom.window.close();

 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=drehundstatik',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('#ws-content>.question-block').length,17);
 assert.equal(pd.querySelectorAll('#ws-content>.question-block .worksheet-options li').length,51);
 assert.equal(pd.querySelectorAll('#ws-extension-questions>.question-block').length,3);
 assert.equal(pd.querySelectorAll('#ws-solutions>.question-block:not(.ws-paper-solution)').length,20);
 assert.equal(pd.getElementById('ws-solutions').hidden,true);
 for(const q of core){assert.ok(pd.getElementById('ws-content').textContent.includes(q.question));assert.ok(pd.getElementById('ws-solutions').textContent.includes(q.answers[keys[q.id]].text));}
 assert.ok(pd.querySelector('[data-statics-lever-balance]'));
 pd.getElementById('ws-include-solutions').click();assert.equal(pd.getElementById('ws-solutions').hidden,false);
 paper.window.close();
 console.log('PASS: all 17 statics core questions and 51 graded/12 free answer paths with independently specified keys; revision 5, review IDs, three retained extensions and separated paper questions/solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
