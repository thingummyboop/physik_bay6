const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb_word_werkstatt',keys=require('./fixtures/dgb_word_keys.json');
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 const qs=w.currentChapterQuiz.questions;assert.deepEqual(Array.from(qs,q=>q.id),Object.keys(keys));assert.deepEqual(Array.from(qs,q=>q.sectionIndex),[0,1,3,4,5,5,7,8,12]);let answers=0;
 for(const [i,q]of qs.entries())for(let a=0;a<3;a++){
  qs.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:keys[item.id]}"]`).checked=true);w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(result.lastPercent,a===keys[q.id]?100:89);assert.equal(result.contentRevision,1);assert.deepEqual(result.reviewQuestionIds,a===keys[q.id]?[]:[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));answers++;
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).outdated,true);
 assert.equal([...d.querySelectorAll('.word-task-card h3')].filter(e=>e.textContent.startsWith('Mini-Aufgabe ')).length,18);assert.equal(d.querySelectorAll('#sections-container [data-chapter-section]').length,13);assert.match(d.querySelector('[data-word-scope]').textContent,/Windows/);
 assert.ok(!d.getElementById('sections-container').textContent.includes('{{QUIZ_'));dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pd.getElementById('ws-dgb-material');assert.equal(material.querySelectorAll(':scope>article').length,13);assert.equal([...material.querySelectorAll('.word-task-card h3')].filter(e=>e.textContent.startsWith('Mini-Aufgabe ')).length,18);assert.equal(material.querySelectorAll('button,input,select,script,details').length,0);assert.equal(pd.getElementById('ws-solutions').hidden,true);assert.equal(pd.querySelectorAll('#ws-content>.question-block').length,9);
 for(const n of [9,11,13,18])assert.ok([...material.querySelectorAll('h3')].some(e=>e.textContent.startsWith('Mini-Aufgabe '+n+':')));paper.window.close();
 assert.equal(answers,27);console.log('PASS: nine Word questions, 27 independently keyed answer paths, precise review sections, revision 1 invalidates old results; all 13 sections and 18 practical tasks in worksheet.');
})().catch(e=>{console.error(e);process.exitCode=1;});
