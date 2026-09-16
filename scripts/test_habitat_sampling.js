const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_oekosysteme';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,12);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-habitat-sampling]'),select=zone.querySelector('select'),result=zone.querySelector('[role=status]');select.focus();
 for(const [round,expected]of [['0',[[20,2],[10,5]]],['1',[[15,2],[6,3]]],['2',[[11,3],[9,3]]],['0',[[20,2],[10,5]]]]){
  select.value=round;select.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,select);
  const rows=[...zone.querySelectorAll('tbody tr')];assert.equal(rows.length,5);
  for(const [column,[total,richness]]of expected.entries()){
   const counts=rows.map(row=>Number(row.querySelectorAll('td')[column].textContent));
   assert.equal(counts.reduce((sum,n)=>sum+n,0),total);assert.equal(counts.filter(n=>n>0).length,richness);
   assert.ok(result.textContent.includes(`${total} Individuen, ${richness} nachgewiesene Arten`));
  }
  assert.equal(result.textContent.includes('dieselbe Artenzahl'),round==='2');
  assert.equal(result.hidden,true);zone.querySelector('[data-sampling-show]').click();assert.equal(result.hidden,false);
  const bars=[...zone.querySelectorAll('[data-sampling-bar]')];assert.equal(bars.length,10);for(const [i,row]of rows.entries())for(let col=0;col<2;col++)assert.equal(Number(bars[i*2+col].getAttribute('width')),Number(row.querySelectorAll('td')[col].textContent)*12);
 }
 zone.querySelector('[data-sampling-reset]').click();assert.equal(select.value,'0');assert.equal(result.hidden,true);assert.equal(d.activeElement,select);
 const keys={bio2_wald_s1:[1,0],bio2_wald_d5:[2,0],bio2_wald_s2:[0,1],bio2_wald_d1:[2,1],bio2_wald_s3:[1,2],bio2_wald_s4:[0,3],bio2_wald_d2:[2,3],bio2_wald_d4:[1,3],bio2_wald_puddle:[2,3],bio2_wald_s5:[0,4],bio2_wald_d3:[2,4],bio2_wald_composition:[1,4]};
 const qs=w.currentChapterQuiz.questions;for(const [i,q]of qs.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id][0]);assert.equal(q.sectionIndex,keys[q.id][1]);for(let choice=0;choice<3;choice++){w.restartChapterQuiz();qs.forEach((item,n)=>d.querySelector(`input[name="chapter_q_${n}"][value="${i===n?choice:keys[item.id][0]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,choice===keys[q.id][0]?100:92);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id][0]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 assert.equal(w.chapterRevision(id),2);assert.equal(d.querySelectorAll('.bio-training-panel[data-assignment-mode="direct"]').length,5);assert.equal(d.querySelectorAll('.bio-training-card').length,15);assert.ok(d.body.textContent.includes('Welche kommen in beiden Flächen vor'));assert.equal(d.querySelectorAll('.forest-sites .forest-case').length,3);assert.equal(d.querySelectorAll('.forest-protocol tr').length,7);assert.equal(d.querySelectorAll('[data-forest-solution]').length,5);
 const authored=new JSDOM(data[id].sections.map(s=>s.content).join('')).window.document;assert.deepEqual([...d.querySelectorAll('.bio-training-card')].map(e=>e.textContent),[...authored.querySelectorAll('.bio-training-card')].map(e=>e.textContent));assert.ok(data[id].sections.flatMap(s=>s.quizzes).filter(q=>q.practiceOnly).every(q=>q.answers.every(a=>a.pts===0)));
 assert.match(zone.textContent,/keine Messung aus einer Wiener Schule/);assert.match(d.querySelector('[data-forest-solution="4"]').textContent,/nicht, dass die Mahd die einzige Ursache/);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));assert.equal(pd.querySelectorAll('[data-forest-paper] tbody tr').length,15);assert.equal(pd.querySelectorAll('.forest-protocol tr').length,7);assert.equal(pd.querySelectorAll('.forest-profile svg').length,1);assert.equal(pd.querySelectorAll('#ws-solutions [data-forest-solution]').length,5);assert.equal(pd.querySelectorAll('#ws-dgb-material [data-forest-solution]').length,0);paper.window.close();
 console.log('PASS: 36 independently keyed answers and review sections, three datasets/30 bars, reveal/reset/focus, 15 direct tasks, forest diagram, seven-row protocol and paper datasets with five separate solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
