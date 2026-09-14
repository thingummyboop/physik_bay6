const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=rechenbeispiele',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();w.localStorage.setItem('physik_score','17');w.localStorage.setItem('physik_answered','["older-task"]');
 const before=Object.keys(w.localStorage).map(key=>[key,w.localStorage.getItem(key)]);
 w.eval(read('js/topics/rechenbeispiele.js'));w.topicInit();w.topicInit();
 const expected={inputSec:[2.5*3600,3600+15*60,3*60+20],inputKg:[(12500+800+1200+500)/1000,(1200+350+450)/1000,(3000-250)/1000],inputMeter:[2400-350,1200+750,3600-800],inputV:[120/4,300/(100+50),1800/180],inputS:[5*12,2*45,(36/3.6)*20],inputGraph:[(50-0)/(10-0),(30-30)/(10-5),(44-20)/(12-4)]};
 const graphCases=[[[0,0],[5,25],[10,50]],[[0,0],[5,30],[10,30],[15,60]],[[0,0],[4,20],[12,44]]];
 for(const [id,answers]of Object.entries(expected)){
  const input=d.getElementById(id),zone=input.closest('[data-calculation]'),feedback=zone.querySelector('.feedback'),next=zone.querySelector('[data-calculation-next]'),check=zone.querySelector('[data-check-input]');
  assert.equal(input.type,'text');assert.equal(input.labels.length,1);assert.equal(input.getAttribute('aria-describedby'),feedback.id);
  for(const [index,answer]of answers.entries()){
   assert.equal(zone.querySelector('[data-calculation-case]').textContent,'Aufgabe '+(index+1)+' von 3');
   input.value=String(answer).replace('.',',');input.focus();input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
   assert.equal(zone.dataset.result,'correct',id+' variant '+index);assert.match(feedback.textContent,/^Richtig\./);assert.equal(d.activeElement,input);
   assert.equal(input.disabled,false);assert.equal(check.disabled,false);assert.equal(next.disabled,false);
   const solution=feedback.textContent;check.click();assert.equal(feedback.textContent,solution);
   input.value=String(answer+.001);input.dispatchEvent(new w.Event('input'));assert.equal(zone.hasAttribute('data-result'),false);assert.doesNotMatch(feedback.textContent,/^Richtig/);
   check.click();assert.equal(zone.dataset.result,'incorrect');assert.match(feedback.textContent,/^Noch nicht\./);
   for(const invalid of ['',' ','0x10','9e3','12abc','1,2,3','Infinity']){input.value=invalid;check.click();assert.equal(zone.dataset.result,'invalid');assert.equal(input.getAttribute('aria-invalid'),'true');}
   input.value=String(answer);check.click();assert.equal(input.hasAttribute('aria-invalid'),false);assert.equal(zone.dataset.result,'correct');
   if(id==='inputGraph'){
    const pairs=graphCases[index];assert.deepEqual([...zone.querySelectorAll('[data-calculation-table] tbody tr')].map(row=>[...row.cells].map(c=>Number(c.textContent))),pairs);
    const coords=zone.querySelector('polyline').getAttribute('points').split(' ').map(pair=>pair.split(',').map(Number));
    const maxT=pairs.at(-1)[0],maxS=Math.ceil(pairs.at(-1)[1]/10)*10;
    assert.deepEqual(coords,pairs.map(([t,s])=>[44+t/maxT*250,190-s/maxS*150]));
    assert.ok(!zone.querySelector('svg').outerHTML.includes('NaN'));
   }
   next.click();assert.equal(input.value,'');assert.equal(d.activeElement,input);assert.equal(feedback.textContent,'');assert.equal(zone.hasAttribute('data-result'),false);
  }
  assert.equal(zone.querySelector('[data-calculation-case]').textContent,'Aufgabe 1 von 3');
 }
 assert.equal(d.querySelector('.calculation-progress progress').value,0);
 for(const [id,answers]of Object.entries(expected)){d.getElementById(id).value=String(answers[0]);w.checkInput(id);}
 assert.equal(d.querySelector('.calculation-progress progress').value,6);w.topicInit();assert.equal(d.querySelector('.calculation-progress progress').value,6);
 assert.deepEqual(Object.keys(w.localStorage).map(key=>[key,w.localStorage.getItem(key)]),before);
 const correct={q1:0,q2:1,q3:2,q4:1,q5:0,q6:1,q7:2,q8:0,q9:1,q10:2,q11:0,q12:2},sections={q1:2,q2:0,q3:3,q4:3,q5:1,q6:2,q7:3,q8:3,q9:4,q10:1,q11:5,q12:5};
 assert.equal(w.currentChapterQuiz.questions.length,12);assert.equal(w.chapterRevision('rechenbeispiele'),1);assert.equal(w.currentChapterResult('rechenbeispiele',{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 for(const [index,q]of w.currentChapterQuiz.questions.entries()){
  assert.equal(q.answers.length,3);assert.equal(q.answers.findIndex(a=>a.correct),correct[q.id]);assert.equal(q.sectionIndex,sections[q.id]);
  for(let choice=0;choice<3;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?choice:correct[question.id]}"]`).checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).rechenbeispiele;
   assert.equal(result.lastPercent,choice===correct[q.id]?100:92);if(choice!==correct[q.id])assert.deepEqual(result.reviewQuestionIds,[q.id]);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=rechenbeispiele',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));await new Promise(resolve=>setImmediate(resolve));
 const material=pd.getElementById('ws-physics-material');assert.equal(material.querySelectorAll('.ws-model-alternative').length,6);assert.equal(material.querySelectorAll('svg[data-worksheet-static=true]').length,1);assert.equal(material.querySelectorAll('[data-calculation-route] tbody tr').length,3);
 assert.equal(material.querySelectorAll('input,button,template,.calculation-progress').length,0);assert.equal(pd.querySelectorAll('#ws-content > .question-block').length,12);
 assert.doesNotMatch(material.textContent,/Richtig\.|Dein Übungsstand/);assert.equal(pd.getElementById('ws-solutions').hidden,true);assert.equal(pd.querySelectorAll('.ws-paper-solution').length,7);
 assert.match(pd.getElementById('ws-solutions').textContent,/1,5 m\/s/);assert.equal(pd.getElementById('ws-print').disabled,false);
 paper.window.close();console.log('PASS: 18 calculation variants, exact numeric results including zero, invalid/comma/dot input, editable success, single binding, progress without storage writes, three graph geometries, all 36 assessed answer paths and review IDs, six paper tasks and separate solutions.');
})().catch(error=>{console.error(error);process.exitCode=1;});
