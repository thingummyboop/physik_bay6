const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 for(const kind of ['evolution','selektion','bluetenpflanzen']){
  const id='bio_1_'+kind,prefix='bio_'+kind+'_s';
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();let paths=0;const questions=w.currentChapterQuiz.questions;
  if(kind==='bluetenpflanzen'){
   const authored=new JSDOM(data[id].sections.map(s=>s.content).join('')),texts=doc=>[...doc.querySelectorAll('.bio-training-card')].map(e=>e.textContent);
   assert.equal(texts(d).length,15);assert.deepEqual(texts(d),texts(authored.window.document));assert.equal(d.querySelectorAll('.bio-training-direct-text').length,0);authored.window.close();dom.window.close();continue;
  }
  const practiceIds=data[id].sections.flatMap(s=>s.quizzes||[]).filter(q=>q.practiceOnly).map(q=>q.id);
  assert.ok(!questions.some(q=>practiceIds.includes(q.id)));
  for(let i=1;i<=5;i++)assert.ok(questions.some(q=>q.id===prefix+i));
  const selectionSections={bio_selektion_d1:1,bio_selektion_d2:2,bio_selektion_d3:0,bio_selektion_d4:2,bio_selektion_d5:3,bio_selektion_d6:4,bio_evolution_d1:0,bio_evolution_d2:1,bio_evolution_d3:2,bio_evolution_d4:3,bio_evolution_d5:4,bio_evolution_d6:4,bio_evolution_d7:4,bio_evolution_d8:4};
  const correctIndex=q=>({bio_selektion_d1:1,bio_selektion_d2:2,bio_selektion_d4:2,bio_selektion_d5:1,bio_evolution_d1:1,bio_evolution_d2:2,bio_evolution_d3:1,bio_evolution_d4:2,bio_evolution_d6:1,bio_evolution_d8:2}[q.id]||0);
  assert.equal(questions.length,kind==='selektion'?11:13);assert.equal(data[id].diplom.questions.length,0);
  if(kind==='evolution'){
   const authored=new JSDOM(data[id].sections.map(s=>s.content).join(''));
   const texts=doc=>[...doc.querySelectorAll('.bio-training-card')].map(e=>e.textContent);
   assert.equal(texts(d).length,15);assert.deepEqual(texts(d),texts(authored.window.document));
   assert.equal(d.querySelectorAll('.bio-training-direct-text').length,0);authored.window.close();
  }
  for(const [i,q]of questions.entries()){
   assert.equal(q.sectionIndex,q.id in selectionSections?selectionSections[q.id]:Number(q.id.at(-1))-1);
   for(let choice=0;choice<q.answers.length;choice++){
    questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?choice:correctIndex(item))+'"]').checked=true);
    w.submitChapterQuiz();const stored=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
    assert.equal(stored.lastPercent,Math.round(100*(questions.length-(choice===correctIndex(q)?0:1))/questions.length));
    assert.deepEqual(stored.reviewQuestionIds,choice===correctIndex(q)?[]:[q.id]);
    assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,kind==='selektion'?33:39);assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).passed,false);assert.equal(w.currentChapterResult(id,{contentRevision:3,passed:true,bestPercent:100}).passed,true);if(kind==='selektion'){
   assert.equal(w.currentChapterResult(id,{contentRevision:3,passed:true,bestPercent:100}).passed,true);
   assert.match(d.querySelector('[data-selection-data-scope]').textContent,/kein Protokoll des Papiermodells/);
   assert.deepEqual([...d.querySelectorAll('[data-selection-comparison] tbody tr')].map(r=>[...r.cells].slice(1,3).map(cell=>Number(cell.textContent))),[[12,8],[9,11],[5,15],[2,18]]);
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
 console.log('PASS: all thirteen evolution and eleven selection questions, 72 answer paths, independently expected choices and section mapping, stale revisions, separate fictional dataset and 121 model calculations with invalid input, Enter/reset and unchanged quiz storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
