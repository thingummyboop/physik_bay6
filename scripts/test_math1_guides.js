const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const ids=Object.keys(data).filter(id=>id.startsWith('math1_'));assert.equal(ids.length,11);
 for(const id of ids){
  const topic=data[id],dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));
  w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();
  assert.equal(d.querySelectorAll('[data-core-intro] li').length,topic.learningGoals.length,id);
  assert.equal(d.querySelectorAll('#chapter-summary li').length,topic.summary.length,id);
  assert.ok(!d.body.textContent.includes('{{QUIZ_'),id+' unresolved question');
  const catalog=Object.values(w.SCIVERSE_CURRICULUM).flatMap(s=>s.topics);
  for(const p of topic.prerequisites.filter(p=>p.startsWith('math1_')))assert.ok(catalog.some(t=>t.id===p),p);
  if(id==='math1_5_geo_grundbegriffe'){
   assert.equal(d.querySelectorAll('[data-geometry-drawing] li').length,5);assert.equal(d.querySelectorAll('[data-circle-construction] li').length,5);const circle=d.querySelector('[data-circle-tangent] circle'),t=d.querySelector('[data-tangent]');assert.equal(Number(t.getAttribute('x1')),Number(t.getAttribute('x2')));assert.equal(Number(t.getAttribute('x1'))-Number(circle.getAttribute('cx')),Number(circle.getAttribute('r')));
   const vectors=kind=>[...d.querySelectorAll('[data-geometry-case="'+kind+'"] line')].map(l=>[Number(l.getAttribute('x2'))-Number(l.getAttribute('x1')),Number(l.getAttribute('y2'))-Number(l.getAttribute('y1'))]);
   const parallel=vectors('parallel'),crossing=vectors('crossing');assert.equal(parallel[0][0]*parallel[1][1]-parallel[0][1]*parallel[1][0],0);assert.notEqual(crossing[0][0]*crossing[1][1]-crossing[0][1]*crossing[1][0],0);assert.notEqual(crossing[0][0]*crossing[1][0]+crossing[0][1]*crossing[1][1],0);
   let paths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())if(q.id==='m15_q3'||q.id.startsWith('geometry_')||q.id.startsWith('circle_'))for(let a=0;a<q.answers.length;a++){assert.equal(q.sectionIndex,q.id.startsWith('circle_')?2:1);w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?a:item.answers.findIndex(x=>x.correct))+'"]').checked=true);w.submitChapterQuiz();const n=w.currentChapterQuiz.questions.length;assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(n-(q.answers[a].correct?0:1))/n));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;}assert.equal(paths,14);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
  }
  if(id==='math1_4_mult_div'){
   assert.equal(d.querySelectorAll('[data-division-context] tbody tr').length,3);assert.equal(d.querySelectorAll('[data-division-remainder-task] li').length,5);
   let paths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())if(q.id.startsWith('division_')||q.id==='math1_4_q6')for(let a=0;a<q.answers.length;a++){assert.equal(q.sectionIndex,q.id==='math1_4_q6'?2:1);w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?a:item.answers.findIndex(x=>x.correct))+'"]').checked=true);w.submitChapterQuiz();const n=w.currentChapterQuiz.questions.length;assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(n-(q.answers[a].correct?0:1))/n));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;}assert.equal(paths,12);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
  }
  if(id==='math1_2_nat_zahlen'){
   assert.ok(d.body.textContent.includes('Ist 7 eine Ziffer oder eine Zahl?'));
   w.eval(read('js/topics/math1_2_nat_zahlen.js'));
   const input=d.getElementById('inputZehner');assert.ok(input.getAttribute('aria-label'));
   input.value='18';w.checkZ();assert.match(d.getElementById('feedZ').textContent,/mittlere Ziffer/);
   input.value='8';w.checkZ();assert.match(d.getElementById('feedZ').textContent,/Wert ist 80/);
   assert.equal(topic.diplom.questions.length,2);
   assert.ok(topic.diplom.questions.every(q=>!q.question.includes('verstanden')));
  }
  if(['math1_2_nat_zahlen','math1_6_winkel','math1_11_figuren_koerper'].includes(id))assert.equal(w.currentChapterResult(id,{bestPercent:100,passed:true}).passed,false);
  dom.window.close();
 }
 assert.match(data.math1_6_winkel.sections[1].content,/Größer als 90° und kleiner als 180°/);
 assert.match(data.math1_11_figuren_koerper.sections[1].quizzes[0].question,/Flächen/);
 console.log('PASS: all 11 mathematics year-one chapters render goals, summaries and resolved quizzes; place-value input feedback and revised learning-result handling verified.');
})().catch(e=>{console.error(e);process.exitCode=1;});
