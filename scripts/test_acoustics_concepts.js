const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=akustik',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,25);
 assert.match(d.body.textContent,/logarithmisches Verhältnis/);assert.match(d.body.textContent,/keine räumliche Flugbahn/);
 assert.doesNotMatch(d.body.textContent,/Mikrofon-Computer|Gesendete Frequenz/);
 assert.equal(w.currentChapterResult('akustik',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult('akustik',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 const protection=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('ak_schutz_'));assert.equal(protection.length,3);
 assert.equal(data.akustik.sections[3].id,'gehoerschutz');
 for(const q of protection){
  assert.equal(q.sectionIndex,3);assert.equal(q.answers.filter(a=>a.correct).length,1);
  const index=w.currentChapterQuiz.questions.indexOf(q);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?choice:question.answers.findIndex(a=>a.correct)}"]`).checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).akustik;
   assert.equal(result.lastPercent,Math.round(100*(25-(q.answers[choice].correct?0:1))/25));
   assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 w.eval(read('js/topics/akustik.js'));w.topicInit();
 for(const [value,strong]of [[1,false],[3,true],[4,true],[5,true],[1,false],[4,true]]){
  d.getElementById('resRange').value=value;w.checkResonance();
  assert.equal(d.getElementById('glass').style.animation!=='none',strong);
  assert.equal(d.getElementById('brokenGlass').style.display,'none');
  assert.match(d.getElementById('resRange').getAttribute('aria-valuetext'),/Relative Frequenzstufe/);
  if(value===4)assert.match(d.getElementById('resText').innerText,/nicht automatisch/);
 }
 dom.window.close();console.log('PASS: 25 acoustics questions including all nine hearing-protection answer paths, revised concepts and results, six reversible resonance settings, no automatic glass break or fictitious Hertz label.');
})().catch(error=>{console.error(error);process.exitCode=1;});
