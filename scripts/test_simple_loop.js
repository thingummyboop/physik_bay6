const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb5_produktion';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();assert.equal(w.currentChapterQuiz.questions.length,9);assert.equal(data[id].script,true);const tally={};for(const row of d.querySelectorAll("[data-survey-records] tbody tr")){const key=row.cells[1].textContent;tally[key]=(tally[key]||0)+1;}assert.deepEqual(tally,{Lesen:3,Radfahren:4,Ballspiel:1});assert.equal(d.querySelectorAll("[data-survey-tasks] li").length,6);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const survey=d.querySelector('[data-survey-check]'),surveyInputs=[...survey.querySelectorAll('input')],surveyStatus=survey.querySelector('[data-survey-status]'),surveyCheck=survey.querySelector('[data-survey-submit]');
 const storageBefore=w.localStorage.getItem('sciverse_chapter_quiz_results');
 for(let a=0;a<=8;a++)for(let b=0;b<=8;b++)for(let c=0;c<=8;c++){
  [a,b,c].forEach((n,i)=>surveyInputs[i].value=String(n));surveyCheck.click();
  const correct=a===3&&b===4&&c===1,sum=a+b+c;
  assert.equal(surveyStatus.textContent.startsWith('Richtig:'),correct);
  if(!correct)assert.ok(surveyStatus.textContent.includes(sum===8?'Zuordnung stimmt noch nicht':'Deine Summe ist '+sum));
  const expected=[3,4,1];[...survey.querySelectorAll('[data-survey-feedback]')].forEach((out,i)=>assert.equal(out.textContent==='Richtig zugeordnet.',[a,b,c][i]===expected[i]));
 }
 assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),storageBefore);
 for(const invalid of ['', '-1','1.5','1e0','0x1','9','10']){surveyInputs[0].value=invalid;surveyCheck.click();assert.equal(surveyInputs[0].getAttribute('aria-invalid'),'true');assert.match(surveyStatus.textContent,/Fülle jede Kategorie/);}
 [3,4,1].forEach((n,i)=>surveyInputs[i].value=String(n));surveyInputs[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(surveyStatus.textContent,/^Richtig:/);surveyInputs[0].dispatchEvent(new w.Event('input'));assert.match(surveyStatus.textContent,/erneut/);assert.equal(survey.querySelector('[data-survey-feedback]').textContent,'');survey.querySelector('[data-survey-reset]').click();assert.ok(surveyInputs.every(input=>input.value===''));assert.equal(d.activeElement,surveyInputs[0]);assert.equal(surveyStatus.textContent,'Noch nicht geprüft.');
 const count=d.getElementById('loop-count'),step=d.querySelector('[data-loop-step]'),reset=d.querySelector('[data-loop-reset]'),dots=d.querySelector('[data-loop-dots]'),status=d.querySelector('[data-loop-status]');
 for(let n=0;n<=6;n++){
  count.value=String(n);count.dispatchEvent(new w.Event('change'));assert.equal(dots.textContent,'');assert.equal(step.disabled,false);
  for(let i=1;i<=n;i++){step.click();assert.equal((dots.textContent.match(/●/g)||[]).length,2*i);assert.ok(status.textContent.includes(`Schleifendurchlauf ${i}`));}
  step.click();assert.equal((dots.textContent.match(/●/g)||[]).length,2*n+1);assert.equal(step.disabled,true);assert.equal(d.activeElement,reset);const final=dots.textContent;step.click();assert.equal(dots.textContent,final);
  reset.click();assert.equal(dots.textContent,'');assert.equal(step.disabled,false);
 }
 step.click();count.value='1';count.dispatchEvent(new w.Event('change'));assert.equal(dots.textContent,'');
 const i=w.currentChapterQuiz.questions.findIndex(q=>q.id==='dgb5_loop_scope'),q=w.currentChapterQuiz.questions[i];assert.equal(q.sectionIndex,1);
 for(let choice=0;choice<3;choice++){
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?choice:item.answers.findIndex(a=>a.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:89);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);dom.window.close();
 console.log('PASS: 729 survey tallies, invalid inputs, category/sum distinction, Enter/reset/focus and unchanged quiz storage; every state for 0–6 loop repetitions and three answer paths.');
})().catch(e=>{console.error(e);process.exitCode=1;});
