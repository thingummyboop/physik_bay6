const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_umwelt_chemie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10);
 assert.equal(d.querySelectorAll('[data-environment-sources] tbody tr').length,2);
 assert.equal(d.querySelectorAll('[data-environment-source-tasks] li').length,7);
 assert.equal(d.querySelectorAll('[data-environment-evidence] tbody tr').length,3);
 const qi=w.currentChapterQuiz.questions.findIndex(q=>q.id==='environment_source_scope');
 assert.ok(qi>=0);const question=w.currentChapterQuiz.questions[qi];assert.equal(question.sectionIndex,5);
 for(let choice=0;choice<question.answers.length;choice++){
  w.currentChapterQuiz.questions.forEach((q,i)=>d.querySelector(`input[name="chapter_q_${i}"][value="${i===qi?choice:q.answers.findIndex(a=>a.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).chemie_umwelt_chemie.lastPercent,question.answers[choice].correct?100:90);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(question.answers[choice].feedback));
 }
 assert.equal(w.currentChapterResult('chemie_umwelt_chemie',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.match(d.body.textContent,/Die Zahlen sind erfunden/);
 assert.equal(w.currentChapterResult('chemie_umwelt_chemie',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="reuse-balance"]'),range=lab.querySelector('input');
 for(const [uses,mass,phrase]of [[1,15,'105 g mehr'],[4,60,'60 g mehr'],[8,120,'Gleiche Behältermasse'],[9,135,'15 g weniger'],[20,300,'180 g weniger'],[40,600,'480 g weniger'],[1,15,'105 g mehr']]){
  range.value=uses;range.dispatchEvent(new w.Event('input'));
  assert.equal(Number(lab.querySelector('[data-single-mass]').dataset.singleMass),mass);
  assert.equal(Number(lab.querySelector('[data-reuse-mass]').dataset.reuseMass),120);
  assert.ok(lab.querySelector('.chem-status').textContent.includes(phrase));
  assert.match(lab.querySelector('.chem-status').textContent,/Keine vollständige Umweltbilanz/);
  assert.equal(range.getAttribute('aria-valuetext'),uses+' Einsätze');
  assert.equal(lab.querySelectorAll('table').length,1);
 }
 const lifecycle=d.querySelector('[data-chem-lab="lifecycle"]');
 assert.equal(lifecycle.querySelectorAll('[aria-pressed="true"]').length,0);
 assert.match(lifecycle.textContent,/Reststoffe und Materialverluste/);
 for(const [action,phrase]of [['single','neues Produkt'],['reuse','Nutzungszahl'],['repair','Ersatzteile'],['recycle','teilweise zurückgewonnen']]){
  const button=lifecycle.querySelector(`button[data-chem-action="${action}"]`);button.focus();button.click();
  assert.equal(d.activeElement,button);assert.equal(button.getAttribute('aria-pressed'),'true');
  assert.ok(lifecycle.querySelector('.chem-status').textContent.includes(phrase));
  for(const key of ['Enter',' ']){
   const target=lifecycle.querySelector(`[data-chem-svg-action="${action}"]`);target.focus();
   target.dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
   assert.equal(d.activeElement.dataset.chemSvgAction,action);
   assert.equal(d.activeElement.getAttribute('aria-pressed'),'true');
  }
  assert.equal(lifecycle.querySelectorAll('svg').length,1);
  assert.equal(lifecycle.querySelector('.chem-status').textContent,lifecycle.querySelector('.lifecycle-explanation').textContent);
 }
 assert.doesNotMatch(lifecycle.textContent,/am deutlichsten/);
 dom.window.close();console.log('PASS: 10 environment questions, three source-evaluation answer paths, review section and stale revision; seven reuse comparisons, lifecycle controls and limitations.');
})().catch(error=>{console.error(error);process.exitCode=1;});
