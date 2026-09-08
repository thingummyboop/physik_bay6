const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const name of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+name+'.js'));
 await w.renderTopic();w.eval(read('js/topics/optik1.js'));w.topicInit();
 const zone=d.querySelector('[data-pinhole]'),get=name=>zone.querySelector('[data-pinhole-'+name+']'),number=(name,attr)=>Number(get(name).getAttribute(attr));
 const object=get('object'),screen=get('screen'),reset=get('reset');
 assert.ok(object.closest('label'));assert.ok(screen.closest('label'));
 assert.equal(get('status').getAttribute('aria-live'),'polite');assert.equal(get('status').getAttribute('aria-atomic'),'true');
 const set=(control,value)=>{control.focus();control.value=String(value);control.dispatchEvent(new w.Event('input'));assert.equal(d.activeElement,control);};
 for(let g=20;g<=50;g+=5)for(let b=10;b<=30;b+=5){
  set(object,g);set(screen,b);
  assert.equal(number('a','cy'),100);assert.equal(number('b','cy'),180);
  assert.ok(number('image-a','cy')>140);assert.ok(number('image-b','cy')<140);
  for(const [ray,point] of [['ray-a','image-a'],['ray-b','image-b']]){
   const x1=number(ray,'x1'),y1=number(ray,'y1'),x2=number(ray,'x2'),y2=number(ray,'y2');
   assert.ok(Math.abs(y1+(y2-y1)*(260-x1)/(x2-x1)-140)<1e-9,'Each straight light path passes through the hole');
   assert.equal(x2,number('screen-line','x1'));assert.equal(y2,number(point,'cy'));
   assert.ok(y2>=30&&y2<=250,'Image stays on screen');
  }
  const imageHeight=number('image-a','cy')-number('image-b','cy');
  assert.ok(Math.abs(imageHeight/80-b/g)<1e-9,'Similar triangles determine image size');
  assert.equal(get('object-value').textContent,g+' cm');assert.equal(get('screen-value').textContent,b+' cm');
  assert.equal(object.getAttribute('aria-valuetext'),g+' Zentimeter');
  assert.ok(get('diagram').getAttribute('aria-label').includes(get('status').textContent));
 }
 set(object,40);set(screen,10);const small=number('image-a','cy')-number('image-b','cy');set(screen,20);assert.equal(number('image-a','cy')-number('image-b','cy'),2*small);
 set(object,20);assert.equal(number('image-a','cy')-number('image-b','cy'),4*small);
 w.initPinholeCamera();assert.equal(object.value,'20');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(object.value,'40');assert.equal(screen.value,'20');
 assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),null);
 assert.equal(data.optik1.sections[1].id,'lochkamera');assert.match(zone.textContent,/weder Helligkeit noch Unschärfe oder Beugung/);
 assert.equal(w.currentChapterResult('optik1',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 const questions=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('o1_loch_'));assert.equal(questions.length,3);
 for(const q of questions){
  assert.equal(q.sectionIndex,1);const index=w.currentChapterQuiz.questions.indexOf(q);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?choice:question.answers.findIndex(a=>a.correct)}"]`).checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).optik1;
   assert.equal(result.lastPercent,Math.round(100*(w.currentChapterQuiz.questions.length-(q.answers[choice].correct?0:1))/w.currentChapterQuiz.questions.length));
   assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 dom.window.close();console.log('PASS: actual pinhole chapter initialization, all 35 distance combinations, straight rays through hole, inversion, similar-triangle image size, labels, focus/reset/reinitialization, revision and all nine answer paths.');
})().catch(error=>{console.error(error);process.exitCode=1;});
