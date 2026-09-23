const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb5_information';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();assert.equal(w.currentChapterQuiz.questions.length,10);assert.equal(d.querySelectorAll("[data-file-practice] li").length,7);assert.equal(d.querySelectorAll("[data-file-protocol] tbody tr").length,2);
 const rows=[...d.querySelectorAll('[data-search-lists] tbody tr')];assert.equal(rows.length,3);
 const a=rows.map(r=>r.cells[1].textContent),b=rows.map(r=>r.cells[2].textContent);assert.equal(a.filter(t=>b.includes(t)).length,2);assert.notEqual(a[0],b[0]);assert.equal(d.querySelectorAll('[data-search-task] li').length,5);
 let count=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())if(q.id.startsWith('dgb5_search_')){
  assert.equal(q.sectionIndex,1);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?choice:item.answers.findIndex(a=>a.correct)}"]`).checked=true);
   w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:90);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));count++;
  }
 }
 assert.equal(count,9);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-dgb-material');assert.equal(material.querySelectorAll('[data-search-lists] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-search-task] li').length,5);assert.ok(!material.querySelector('[data-search-solution]'));assert.equal(material.querySelectorAll("[data-file-practice] li").length,7);assert.equal(material.querySelectorAll("[data-file-protocol] tbody tr").length,2);assert.ok(!material.querySelector("[data-file-solution]"));paper.window.close();
 console.log('PASS: search comparison material, nine new answer paths, section review route, stale revision and worksheet without model solution.');
})().catch(e=>{console.error(e);process.exitCode=1;});
