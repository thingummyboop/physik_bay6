const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
for(const id of ['erde_mond_sonne','strahlung_radioaktivitaet','kraftwerke_energieversorgung']){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id+'&mode=review',runScripts:'outside-only'}),w=dom.window;
 await new Promise(resolve=>setImmediate(resolve));
 w.fetch=async url=>({ok:true,json:async()=>JSON.parse(read(url.includes('/en.')?'lang/en.json':'lang/de.json'))});
 w.eval(read('js/curriculum.js'));w.eval(read('js/chapter-revisions.js'));w.eval(read('js/common.js'));w.eval(read('js/core-learning.js'));w.eval(read('js/renderer.js'));
 await w.renderTopic();
 assert.ok(w.document.querySelector('#topic-title').textContent.length>5);
 assert.equal(w.document.querySelectorAll('.practice-box').length,id==='strahlung_radioaktivitaet'?18:11);
 assert.equal(w.document.querySelectorAll('.chapter-question').length,id==='strahlung_radioaktivitaet'?18:11);
 assert.equal(w.document.querySelectorAll('[data-core-navigation]').length,1);
 assert.match(w.document.querySelector('[data-core-navigation]').textContent,/Dein Wiederholungsweg/);
 const experiments={erde_mond_sonne:['moon'],strahlung_radioaktivitaet:['optical-signal','decay'],kraftwerke_energieversorgung:['power','storage']}[id];
 assert.deepEqual([...w.document.querySelectorAll('[data-core-experiment][data-initialized]')].map(e=>e.dataset.coreExperiment),experiments);
 if(id==='erde_mond_sonne'){
  const d=w.document;assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
  assert.equal(d.querySelectorAll('[data-season-protocol] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-season-investigation] li').length,5);assert.equal(d.querySelectorAll('[data-moon-investigation] li').length,3);assert.match(d.body.textContent,/parallel zum Richtungspfeil/);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(['ems_axis_control','ems_model_precision'].includes(q.id))assert.equal(q.sectionIndex,1);if(q.id==='ems_viewpoint')assert.equal(q.sectionIndex,2);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:91);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,33);
 }
 if(id==='strahlung_radioaktivitaet'){
  const d=w.document;assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
  const table=d.querySelector('[data-radiation-signals]');assert.equal(table.querySelectorAll('tbody tr').length,4);
  const row=key=>[...table.querySelectorAll('[data-signal-row="'+key+'"] td')].map(el=>Number(el.textContent));
  const background=row('background'),reference=row('reference');const normalized=key=>row(key).map((value,i)=>100*(value-background[i])/(reference[i]-background[i]));
  assert.deepEqual(normalized('A'),[20,70]);assert.deepEqual(normalized('B'),[70,20]);
  assert.equal(d.querySelectorAll('[data-radiation-investigation] li').length,4);assert.equal(d.querySelector('[data-radiation-signal-model]').open,false);
  assert.match(d.querySelector('[data-radiation-research-source]').textContent,/13.08.2026/);assert.match(d.body.textContent,/Alle folgenden Zahlen und Proben sind erfunden/);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(['rad_signal_reference','rad_signal_limits','rad_complementary_images','rad_research_claim'].includes(q.id))assert.equal(q.sectionIndex,6);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:94);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,54);
 }
 if(id==='kraftwerke_energieversorgung'){
  const d=w.document;
  assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
  const table=d.querySelector('[data-plant-offers]');assert.equal(table.querySelectorAll('tbody tr').length,6);
  const numbers=key=>[...table.querySelectorAll('[data-offer-row="'+key+'"] td')].map(el=>Number.parseFloat(el.textContent));
  assert.deepEqual(numbers('annual'),[50,50,50]);assert.deepEqual(numbers('winter'),[8,20,12]);
  const initial=numbers('purchase'),operation=numbers('operation');assert.deepEqual(initial.map((n,i)=>n+10*operation[i]),[110,120,150]);
  assert.equal(d.querySelectorAll('[data-plant-roles] tbody tr').length,4);
  const model=d.querySelector('[data-plant-decision-model] p').textContent.trim().split(/\s+/).length;assert.ok(model>=120&&model<=180,'Model matches writing task: '+model);
  let tested=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(['kw_cost_compare','kw_winter_compare','kw_fair_decision'].includes(q.id))assert.equal(q.sectionIndex,4);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:91);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));tested++;
   }
  }
  assert.equal(tested,33);
 }
 if(id==='kraftwerke_energieversorgung')assert.match(w.document.querySelector('[data-storage-status]').textContent,/10 kWh ÷ 2 kW = 5 h/);
 assert.ok(w.document.querySelector('#chapter-summary').compareDocumentPosition(w.document.querySelector('#chapter-quiz-card'))&w.Node.DOCUMENT_POSITION_FOLLOWING,'Summary appears before quiz');
 assert.ok(!w.document.querySelector('#chapter-quiz-launch').disabled);
 dom.window.close();
}
console.log('PASS: complete template/renderer/common/core integration for three new chapters, 40 practices/check questions, all 120 answer paths across Earth/Moon, power supply and radiation, decision/research materials, review mode and initialized experiments.');
})().catch(error=>{console.error(error);process.exitCode=1;});
