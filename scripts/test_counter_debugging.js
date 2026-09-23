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
 assert.equal(w.currentChapterQuiz.questions.length,12);assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).outdated,true);dom.window.close();

 console.log('PASS: 16 counter programs with all intermediate states, restart/change/focus, no learning-score mutation, revision migration; independent chapter keys are checked in test_points_workshop.js.');
})().catch(e=>{console.error(e);process.exitCode=1;});
