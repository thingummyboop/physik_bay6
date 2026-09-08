const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/uk.json'));
(async()=>{
 const id='erde_mond_sonne',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','uk');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'uk');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,11);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 assert.equal(d.querySelectorAll('[data-season-protocol] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-season-investigation] li').length,5);assert.equal(d.querySelectorAll('[data-moon-investigation] li').length,3);
 const slider=d.getElementById('moon-angle');
 for(const [angle,percent,name] of [[0,0,'Молодик'],[90,50,'Перша чверть'],[180,100,'Повня'],[270,50,'Остання чверть'],[360,0,'Молодик']]){slider.value=angle;slider.dispatchEvent(new w.Event('input'));assert.equal(d.getElementById('moon-lit').value,percent);assert.ok(d.getElementById('moon-explanation').textContent.includes(name));assert.ok(d.getElementById('moon-disc').getAttribute('aria-label').includes('без тіні Землі'));}
 assert.match(d.getElementById('sections-container').textContent,/модель не показує затемнень/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,11);
 for(const wrongIndex of [1,2]){
  w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+wrongIndex+'"]').checked=true;});w.submitChapterQuiz();
  const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,11);
  w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[wrongIndex].feedback),'Missing feedback for '+q.id));
 }
 dom.window.close();console.log('PASS: Ukrainian Earth/Moon/Sun: current selection, eleven equivalent questions and every answer feedback, phase controls and disc descriptions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
