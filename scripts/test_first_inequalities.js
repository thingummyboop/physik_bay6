const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math1_7_gleichungen';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const scale=d.getElementById('waage-input'),inverse=d.getElementById('umkehr-input');
 for(const [input,result,cases]of [
  [scale,d.getElementById('waage-result'),[['','Gib zuerst'],['0','kleiner als 8'],['4','kleiner als 8'],['6','größer als 8'],['5','Richtig: 5 + 3 = 8']]],
  [inverse,d.getElementById('umkehr-res'),[['','Gib zuerst'],['+7','Noch nicht'],['-5','Noch nicht'],['-7','Richtig'],['− 7','Richtig']]]
 ]){
  assert.ok(input.getAttribute('aria-label'));
  for(const [entry,expected]of cases){
   input.value=entry;input.dispatchEvent(new w.Event('input'));assert.equal(result.textContent,'');
   input.focus();input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
   assert.ok(result.textContent.includes(expected),entry+': '+result.textContent);assert.equal(d.activeElement,input);
  }
 }
 const relation=d.getElementById('inequality-relation'),value=d.getElementById('inequality-value'),status=d.querySelector('[data-inequality-status]');
 const sets={lt:[0,1,2,3,4],le:[0,1,2,3,4,5],eq:[5],gt:[6,7,8,9,10],ge:[5,6,7,8,9,10]};
 for(const [key,expected]of Object.entries(sets)){
  relation.value=key;relation.dispatchEvent(new w.Event('change'));
  assert.ok(d.querySelector('[data-inequality-solutions]').textContent.endsWith(expected.join(', ')+'.'));
  for(let x=0;x<=10;x++){
   value.focus();value.value=String(x);value.dispatchEvent(new w.Event('change'));
   assert.ok(status.textContent.startsWith(`${x} + 3 = ${x+3}.`));
   assert.ok(status.textContent.includes(expected.includes(x)?'wahr: Diese Zahl ist eine Lösung.':'falsch: Diese Zahl ist keine Lösung.'));
   assert.equal(d.activeElement,value);
  }
 }
 let paths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())for(let a=0;a<q.answers.length;a++){
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${i===j?a:item.answers.findIndex(a=>a.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:89);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
 }
 assert.equal(paths,21);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 assert.equal(d.querySelectorAll('[data-inequality-task] li').length,3);
 assert.equal(status.getAttribute('role'),'status');
 dom.window.close();console.log('PASS: 55 inequality comparisons with boundary and complete solution sets, 21 quiz answer paths, content revision and persistent native focus.');
})().catch(e=>{console.error(e);process.exitCode=1;});
