const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=sieinheiten',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));
 await w.renderTopic();
 assert.equal(d.querySelectorAll('.chapter-question').length,17);
 assert.doesNotMatch(d.body.textContent,/Zahlenwert plus Einheit|Einheit sagt, womit gemessen wird/);
 assert.match(d.body.textContent,/vereinbarte Vergleichsgröße/);
 assert.match(d.body.textContent,/nicht automatisch die gesamte Messunsicherheit/);
 assert.match(d.body.textContent,/Pausenzeit/);
 assert.equal(w.chapterRevision('sieinheiten'),3);
 assert.equal(w.currentChapterResult('sieinheiten',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 assert.deepEqual(data.sieinheiten.sections.map(s=>s.id),['sec0','measurement_quality','sec1','sec2','sec4','sec3']);
 const positions={q1:0,f1:0,measurement_quality_0:1,measurement_quality_1:1,q2:2,q3:3,f2:3,f3:3,f4:3,f5:3,f6:3,q5:4,f9:4,q4:5,f7:5,f8:5,f10:5};
 const correctChoices={q1:1,f1:1,measurement_quality_0:0,measurement_quality_1:0,q2:1,q3:2,f2:0,f3:2,f4:1,f5:2,f6:0,q5:0,f9:2,q4:2,f7:1,f8:1,f10:0};
 for(const [id,index]of Object.entries(positions))assert.equal(w.currentChapterQuiz.questions.find(q=>q.id===id).sectionIndex,index,id);
 assert.equal(d.querySelectorAll('[data-measurement-protocol] tbody tr').length,3);
 assert.equal(d.querySelectorAll('[data-measurement-analysis] > li').length,4);
 for(const [i,q]of w.currentChapterQuiz.questions.entries()){
  assert.equal(q.answers.length,3,q.id);assert.equal(q.answers.findIndex(a=>a.correct),correctChoices[q.id],q.id);
  for(let answer=0;answer<q.answers.length;answer++){
  w.currentChapterQuiz.questions.forEach((item,j)=>{d.querySelector('input[name="chapter_q_'+j+'"][value="'+(i===j?answer:item.answers.findIndex(a=>a.correct))+'"]').checked=true;});
  w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).sieinheiten;
  assert.equal(result.lastPercent,q.answers[answer].correct?100:94);
  if(!q.answers[answer].correct){
   assert.deepEqual(result.reviewQuestionIds,[q.id]);
   const repeat=d.querySelector('#chapter-quiz-result button[onclick^="reviewChapterSection"]');
   assert.ok(repeat,q.id);assert.ok(repeat.getAttribute('onclick').includes('('+positions[q.id]+')'),q.id);
  }
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));
  }
 }
 w.eval(read('js/topics/sieinheiten.js'));w.topicInit();
 for(const [distance,time,expected] of [[100,10,'10,0'],[100,20,'5,0'],[200,20,'10,0']]){
  d.getElementById('sRange').value=distance;d.getElementById('tRange').value=time;w.calcSpeed();
  assert.match(d.getElementById('speedText').innerText,/Mittlere Geschwindigkeit/);
  assert.ok(d.getElementById('speedText').innerText.endsWith(expected+' m/s'));
  assert.equal(d.getElementById('tRange').getAttribute('aria-valuetext'),time+' Sekunden');
 }
 w.drawGraph();assert.match(d.getElementById('graphText').innerText,/Modellwerte/);
 assert.equal(d.getElementById('graphBtn').disabled,false);
 assert.ok([...d.querySelectorAll('.graphPoint')].every(p=>p.style.opacity==='1'));
 const pairs=[[0,0],[1,5],[2,20],[3,45],[4,80]],selection=d.getElementById('graphTime');
 const originalRows=[...d.querySelectorAll('.graphRow')].map(row=>[...row.cells].map(c=>c.textContent));
 for(const [i,[time,height]]of pairs.entries()){
  selection.value=String(time);w.selectMeasurementPoint();
  const selected=d.querySelector('.graphRow[aria-current=true]'),point=d.querySelectorAll('.graphPoint')[i];
  assert.deepEqual([...selected.cells].map(c=>Number(c.textContent)),[time,height]);
  assert.equal(Number(point.getAttribute('cx')),42+66*time);assert.equal(Number(point.getAttribute('cy')),170-1.875*height);
  assert.equal(point.getAttribute('r'),'7');assert.match(d.getElementById('graphText').innerText,new RegExp('t = '+time+' s ist h = '+height+' m'));
 }
 assert.equal(d.getElementById('rocketPath').getAttribute('d'),'M 42 170 L 108 160.625 L 174 132.5 L 240 85.625 L 306 20');
 w.resetMeasurementGraph();assert.equal(selection.disabled,true);assert.equal(d.querySelectorAll('.graphRow[aria-current]').length,0);
 assert.ok([...d.querySelectorAll('.graphPoint')].every(p=>p.style.opacity==='0'));
 assert.deepEqual([...d.querySelectorAll('.graphRow')].map(row=>[...row.cells].map(c=>c.textContent)),originalRows);
 w.drawGraph();assert.equal(selection.disabled,false);assert.equal(d.querySelector('.graphRow[aria-current=true]').cells[0].textContent,'0');
 for(const [index,value,expected]of [[0,'200',true],[0,'200,0009',false],[0,'0xC8',null],[1,'3000',true],[2,'1,5',true],[2,'1.5',true],[3,'240',true],[3,'',null],[3,'   ',null]]){
  d.getElementById('convInput'+index).value=value;w.checkConversion(index);
  assert.match(d.getElementById('conversionText').innerText,expected===null?/Gib zuerst/:expected?/^Richtig:/ :/^Noch nicht/);
 }
 w.Date.now=()=>1000;w.startTimer();w.Date.now=()=>3000;w.stopTimer();
 assert.equal(d.getElementById('timerDisplay').innerText,'2,00 s');assert.match(d.getElementById('timerResult').innerText,/nicht die Genauigkeit/);
 dom.window.close();console.log('PASS: all 51 assessed answer paths, exact review sections, revision 3, five correctly scaled graph pairs and line, selection/reset, conversion input and timer/mean-speed feedback.');
})().catch(error=>{console.error(error);process.exitCode=1;});
