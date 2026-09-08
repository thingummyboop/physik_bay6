const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 for(const kind of ['evolution','selektion']){
  const id='bio_1_'+kind,prefix='bio_'+kind+'_s';
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();let paths=0;const questions=w.currentChapterQuiz.questions;
  const practiceIds=data[id].sections.flatMap(s=>s.quizzes||[]).filter(q=>q.practiceOnly).map(q=>q.id);
  assert.ok(!questions.some(q=>practiceIds.includes(q.id)));
  for(let i=1;i<=5;i++)assert.ok(questions.some(q=>q.id===prefix+i));
  for(const [i,q]of questions.entries()){
   if(![1,2,3,4,5].some(n=>q.id===prefix+n))continue;
   assert.equal(q.sectionIndex,Number(q.id.at(-1))-1);
   for(let choice=0;choice<q.answers.length;choice++){
    questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();const stored=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
    assert.equal(stored.lastPercent,Math.round(100*(questions.length-(q.answers[choice].correct?0:1))/questions.length));
    if(!q.answers[choice].correct)assert.deepEqual(stored.reviewQuestionIds,[q.id]);
    assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,15);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);if(kind==='selektion'){
   w.enhanceCoreLearning(data[id],id,'de');
   const zone=d.querySelector('[data-core-experiment="selection-counts"]'),light=zone.querySelector('[data-selection-light]'),dark=zone.querySelector('[data-selection-dark]'),out=zone.querySelector('[data-selection-result]'),calculate=zone.querySelector('[data-selection-calculate]');
   const before=w.localStorage.getItem('sciverse_chapter_quiz_results');
   for(const field of [light,dark]){assert.ok(field.closest('label'));assert.equal(d.getElementById(field.getAttribute('aria-describedby')),out);}
   for(let a=0;a<=10;a++)for(let b=0;b<=10;b++){
    light.value=a;dark.value=b;calculate.click();
    if(a+b===0){assert.match(out.textContent,/kein Farbanteil definiert/);continue;}
    assert.ok(out.textContent.includes((a*2)+' helle und '+(b*2)+' dunkle, insgesamt '+((a+b)*2)));
    assert.ok(out.textContent.includes((100*b/(a+b)).toLocaleString('de',{maximumFractionDigits:1})+' %'));
    assert.ok(out.textContent.includes(a===b?'entspricht':b>a?'gestiegen':'gesunken'));
   }
   for(const value of ['', '11', '-1', '1.5', '0x2', '1e1']){light.value=value;dark.value='5';calculate.click();assert.match(out.textContent,/Bitte trage/);}
   light.value='6';dark.value='9';light.dispatchEvent(new w.Event('input'));assert.match(out.textContent,/erneut/);light.focus();light.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert.equal(d.activeElement,light);assert.match(out.textContent,/12 helle und 18 dunkle, insgesamt 30/);assert.match(out.textContent,/60 %/);
   w.enhanceCoreLearning(data[id],id,'de');assert.equal(light.value,'6');zone.querySelector('[data-selection-reset]').click();assert.equal(light.value,'');assert.equal(dark.value,'');assert.equal(d.activeElement,light);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),before);
  }
  dom.window.close();
 }
 console.log('PASS: ten evolution/selection questions, all 30 answer paths, review IDs, section mapping, practice exclusion stale revisions and 121 selection-count scenarios with invalid input, Enter/reset and unchanged quiz storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
