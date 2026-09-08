const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb6_produktion';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const root=d.querySelector('[data-counter-debug]'),inputs=[...root.querySelectorAll('[data-counter-answer]')],version=root.querySelector('[data-counter-version]'),step=root.querySelector('[data-counter-step]'),reset=root.querySelector('[data-counter-reset]'),trace=root.querySelector('[data-counter-trace]');
 const scoreBefore=w.localStorage.getItem('physik_score');
 for(const mode of ['bug','fixed'])for(let bits=0;bits<8;bits++){
  inputs.forEach((input,i)=>input.value=bits&(1<<i)?'yes':'no');version.value=mode;version.dispatchEvent(new w.Event('change'));assert.equal(trace.rows.length,0);assert.equal(step.disabled,false);
  let previous=0;for(let i=0;i<3;i++){
   step.focus();step.click();assert.equal(trace.rows.length,i+1);
   const expectedBefore=mode==='bug'?0:previous,answer=inputs[i].value==='yes'?2:0;
   assert.deepEqual([...trace.rows[i].cells].slice(1).map(c=>Number(c.textContent)),[previous,expectedBefore,expectedBefore+answer]);previous=expectedBefore+answer;
  }
  assert.equal(step.disabled,true);assert.equal(d.activeElement,reset);assert.match(root.querySelector('[data-counter-status]').textContent,/Spielregel erwartet/);
  reset.click();assert.equal(trace.rows.length,0);assert.equal(step.disabled,false);
 }
 assert.equal(w.localStorage.getItem('physik_score'),scoreBefore);
 step.click();inputs[0].dispatchEvent(new w.Event('change'));assert.equal(trace.rows.length,0);
 assert.equal(w.currentChapterQuiz.questions.length,6);let paths=0;
 for(const [i,q]of w.currentChapterQuiz.questions.entries())if(q.id.startsWith('dgb6_counter_')||['dgb6_produktion_q2','dgb6_produktion_q3'].includes(q.id))for(let a=0;a<q.answers.length;a++){
  assert.equal(q.sectionIndex,q.id==='dgb6_produktion_q2'?1:q.id==='dgb6_produktion_q3'?3:2);w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:83);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
 }assert.equal(paths,12);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);dom.window.close();
 console.log('PASS: 16 counter programs with all intermediate states, restart/change/focus, no learning-score mutation, twelve debugging and license answer paths and revision.');
})().catch(e=>{console.error(e);process.exitCode=1;});
