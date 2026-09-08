const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));
 w.fetch=async()=>({ok:true,json:async()=>data});
 for(const name of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+name+'.js'));
 await w.renderTopic();w.eval(read('js/topics/optik1.js'));w.topicInit();
 const zone=d.querySelector('[data-seeing-path]'),get=name=>zone.querySelector('[data-seeing-'+name+']'),lamp=get('lamp'),block=get('block'),reset=get('reset'),status=get('status');
 assert.equal(status.getAttribute('aria-live'),'polite');assert.equal(status.getAttribute('aria-atomic'),'true');
 const verify=(on,blocked)=>{
  assert.equal(lamp.getAttribute('aria-pressed'),String(on));assert.equal(block.getAttribute('aria-pressed'),String(blocked));
  for(const [name,visible] of [['incoming',on],['scattered',on],['arrival',on&&!blocked],['barrier',blocked]])assert.equal(get(name).style.display!=='none',visible,name);
  assert.equal(get('card').getAttribute('fill'),on?'#fbbf24':'#94a3b8','Blocking the eye path does not change illumination');
  assert.match(status.textContent,!on?/nicht beleuchtet/:blocked?/beleuchtet.*unterbricht.*sieht.*nicht/:/Lampe zur Karte.*ins Auge/);
  assert.ok(get('diagram').getAttribute('aria-label').includes(status.textContent));
 };
 const click=button=>{button.focus();button.click();assert.equal(d.activeElement,button);};
 for(let repeat=0;repeat<2;repeat++){
  verify(true,false);click(block);verify(true,true);click(lamp);verify(false,true);click(block);verify(false,false);click(lamp);verify(true,false);
 }
 click(block);w.initSeeingPath();verify(true,true);click(block);verify(true,false);
 click(lamp);click(block);click(reset);verify(true,false);
 assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),null,'Exploration is not a graded attempt');
 const questions=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('o1_sehweg_'));
 assert.equal(questions.length,2);
 for(const question of questions){
  assert.equal(question.sectionIndex,0);assert.equal(question.answers.filter(a=>a.correct).length,1);
  const index=w.currentChapterQuiz.questions.indexOf(question);
  for(let choice=0;choice<question.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((q,i)=>{const correct=q.answers.findIndex(a=>a.correct);d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?choice:correct}"]`).checked=true;});
   w.submitChapterQuiz();
   const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).optik1;
   assert.equal(result.lastPercent,Math.round(100*(w.currentChapterQuiz.questions.length-(question.answers[choice].correct?0:1))/w.currentChapterQuiz.questions.length));
   assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(question.answers[choice].feedback));
  }
 }
 dom.window.close();console.log('PASS: seeing model through actual chapter initialization, all four light/barrier states, focus, reset, reinitialization and both questions with every answer feedback.');
})().catch(error=>{console.error(error);process.exitCode=1;});
