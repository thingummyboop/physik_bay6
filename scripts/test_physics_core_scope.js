const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
const expected={
 optik1:{core:21,revision:5,sections:['sec4'],extra:['o1_s5_q1','o1_ch10','o1_ch11']},
 farben:{core:14,revision:4,sections:['sec4_itten','sec6_strukturfarben','sec0'],extra:['farben_extra_itten_q0','farben_extra_struktur_q0','farben_ch11','farben_s1_q0','farben_ch1']},
 linsen_spiegel:{core:17,revision:8,sections:['sec2','sec6','sec7','sec8','sec5'],extra:['q_total','q5','f8','f9','linsen_s6_q0','f10','f11','f12','q7','f13','f14','f15','q4','f6','f7']},
 akustik:{core:22,revision:5,sections:['sec5'],extra:['q6','f13','f14']}
};
async function page(file,url,scripts){const dom=new JSDOM(read(file),{url:'https://example.test/'+url,runScripts:'outside-only'});await new Promise(r=>setImmediate(r));dom.window.fetch=async()=>({ok:true,json:async()=>data});for(const f of scripts)dom.window.eval(read('js/'+f+'.js'));return dom;}
(async()=>{
 for(const [id,x]of Object.entries(expected)){
  const topic=data[id],dom=await page('topics/template.html','topics/template.html?topic='+id,['curriculum','chapter-revisions','common','core-learning','renderer']),w=dom.window,d=w.document;await w.renderTopic();
  const questions=w.currentChapterQuiz.questions;
  assert.equal(questions.length,x.core,id);assert.deepEqual(topic.sections.filter(s=>s.level==='extension').map(s=>s.id),x.sections);
  assert.deepEqual(topic.sections.filter(s=>s.level==='extension').flatMap(s=>s.quizzes.map(q=>q.id)),x.extra);
  assert.ok(questions.every(q=>!x.extra.includes(q.id)));assert.equal(new Set([...questions.map(q=>q.id),...x.extra]).size,x.core+x.extra.length);
  assert.equal(d.querySelectorAll('[data-learning-level="extension"]').length,x.sections.length);assert.equal(d.querySelectorAll('.extension-notice').length,x.sections.length);
  assert.equal(d.querySelectorAll('[data-assessment-scope]').length,3);assert.ok(topic.extensionGoals.length);assert.ok(d.querySelector('[data-extension-summary]'));
  for(const qid of x.extra){assert.ok(d.querySelector('.practice-box[data-id="'+qid+'"]'),id+' retains '+qid);assert.ok(!questions.some(q=>q.id===qid));}
  questions.forEach((q,i)=>d.querySelector(`input[name="chapter_q_${i}"][value="${q.answers.findIndex(a=>a.correct)}"]`).checked=true);w.submitChapterQuiz();
  const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(result.lastPercent,100);assert.equal(result.contentRevision,x.revision);assert.equal(result.passed,true);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100,contentRevision:x.revision-1}).passed,false);assert.equal(w.currentChapterResult(id,result).passed,true);
  // Section metadata remains authoritative even when a future question omits practiceOnly.
  const plain=JSON.parse(JSON.stringify(topic));plain.sections.forEach(s=>(s.quizzes||[]).forEach(q=>delete q.practiceOnly));assert.equal(w.collectChapterQuizQuestions(plain).length,x.core);
  const q={id:'scope_probe',question:'Scope probe?',answers:[{text:'a',correct:true},{text:'b',correct:false}]};
  assert.equal(w.collectChapterQuizQuestions({sections:[{level:'extension',content:'{{QUIZ_scope_probe}}'}],quizzes:[q],diplom:{questions:[{...q,practiceOnly:true}]}}).length,0);
  dom.window.close();
  const paper=await page('topics/worksheet.html','topics/worksheet.html?topic='+id,['curriculum','chapter-revisions','worksheet_generator','worksheet']);await new Promise(r=>setImmediate(r));const pd=paper.window.document;
  assert.equal(pd.querySelectorAll('#ws-content>.question-block').length,x.core);assert.equal(pd.querySelectorAll('#ws-extension-questions>.question-block').length,x.extra.length);
  assert.equal(pd.querySelectorAll('#ws-solutions>.question-block:not(.ws-paper-solution)').length,x.core+x.extra.length);
  const labels=[...pd.querySelectorAll('#ws-extension-questions>.question-block>h2')].map(h=>h.textContent.split('.')[0]);assert.deepEqual(labels,x.extra.map((_,i)=>'V'+(i+1)));
  assert.equal(pd.getElementById('ws-solutions').hidden,true);pd.getElementById('ws-include-solutions').click();assert.equal(pd.getElementById('ws-solutions').hidden,false);
  assert.equal(pd.querySelectorAll('#ws-physics-material>article').length,topic.sections.length);assert.ok(pd.querySelector('[data-assessment-scope]'));paper.window.close();
 }
 const plan=Object.keys(expected).join(','),hub=await page('topics/learning.html','topics/learning.html?mode=teach&plan='+plan,['curriculum','chapter-revisions','learning']);await new Promise(r=>setImmediate(r));const h=hub.window.document;
 assert.equal(h.querySelectorAll('#selected [data-assessment-scope]').length,4);assert.deepEqual([...h.querySelectorAll('#selected [data-focus-key^="plan-open-"]')].map(e=>e.dataset.focusKey.slice(10)),Object.keys(expected));
 const before=hub.window.localStorage.getItem('sciverse_chapter_quiz_results');h.getElementById('share').click();assert.ok(h.querySelector('#share-wrap input').value.includes(encodeURIComponent(plan)));assert.equal(hub.window.localStorage.getItem('sciverse_chapter_quiz_results'),before);
 hub.window.close();console.log('PASS: 74 core questions, 26 retained extension exercises, consistent printed scope, 4 revised results, teacher plan scope and unchanged sharing order.');
})().catch(e=>{console.error(e);process.exitCode=1;});
