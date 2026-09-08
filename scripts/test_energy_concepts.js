const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=energie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,20);
 assert.equal(d.querySelectorAll('[data-pendulum-protocol] tbody tr').length,6);
 assert.match(d.body.textContent,/10 J = 7 J \+ 3 J/);
 assert.match(d.body.textContent,/keine Energieangabe in Joule/);
 for(const [index,q] of w.currentChapterQuiz.questions.entries()){
  if(!['energy_real_pendulum','energy_measurement_limit','energy_budget_system'].includes(q.id))continue;
  assert.equal(q.sectionIndex,5);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
   w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).energie.lastPercent,q.answers[choice].correct?100:95);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 assert.doesNotMatch(d.body.textContent,/macht keinen Schmutz|Keine Energie gespeichert|stoppen alle Elektronen sofort/);
 assert.match(d.body.textContent,/1 W = 1 J\/s/);assert.match(d.body.textContent,/20 J \+ 80 J = 100 J/);
 assert.equal(w.currentChapterResult('energie',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 w.eval(read('js/topics/energie.js'));w.topicInit();
 for(const [value,spinning,phrase]of [[0,false,'Windstille'],[20,true,'schwacher Wind'],[60,true,'stärkerer Wind'],[80,false,'Sturmabschaltung'],[100,false,'Sturmabschaltung'],[40,true,'stärkerer Wind']]){
  d.getElementById('windRange').value=value;w.updateWind();
  assert.equal(d.getElementById('windBlades').classList.contains('anim-spin'),spinning);
  assert.ok(d.getElementById('windValue').textContent.includes(phrase));
  assert.equal(d.getElementById('windRange').getAttribute('aria-valuetext'),d.getElementById('windValue').textContent);
 }
 w.startPendulum();assert.ok(d.getElementById('pendulumObj').classList.contains('anim-swing'));
 w.stopPendulum();assert.ok(!d.getElementById('pendulumObj').classList.contains('anim-swing'));assert.match(d.getElementById('pendulumText').innerText,/nur die Animation/);
 w.toggleSwitch();assert.equal(d.getElementById('switchBtn').getAttribute('aria-pressed'),'true');w.toggleSwitch();assert.equal(d.getElementById('switchBtn').getAttribute('aria-pressed'),'false');
 dom.window.close();console.log('PASS: 20 energy questions, nine new observation/balance answer paths, protocol and measurement limits, revision, six wind states, pendulum stop explanation, circuit switch.');
})().catch(error=>{console.error(error);process.exitCode=1;});
