const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb7_information';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.enhanceCoreLearning(data[id],id,'de');
 const control=d.querySelector('[data-chart-baseline]'),plot=d.querySelector('[data-chart-baseline-plot]'),out=d.querySelector('[data-chart-baseline-result]'),table=d.querySelector('[data-chart-check-data]');
 const originalTable=table.innerHTML,saved=w.localStorage.getItem('sciverse_chapter_quiz_results');
 assert.equal(control.value,'0');assert.ok(control.labels.length);assert.equal(control.getAttribute('aria-describedby'),out.id);
 for(const [start,heights,ratio] of [['0',[144,158.4],1.1],['36',[360/7,720/7],2],['0',[144,158.4],1.1]]){
  control.focus();control.value=start;control.dispatchEvent(new w.Event('change',{bubbles:true}));
  const bars=[...plot.querySelectorAll('[data-baseline-bar]')];assert.equal(bars.length,2);
  bars.forEach((bar,i)=>{assert.ok(Math.abs(Number(bar.getAttribute('height'))-heights[i])<1e-8);assert.ok(Math.abs(Number(bar.getAttribute('y'))+heights[i]-220)<1e-8);});
  assert.ok(Math.abs(Number(bars[1].getAttribute('height'))/Number(bars[0].getAttribute('height'))-ratio)<1e-8);
  assert.ok(out.textContent.includes('Werteachse von '+start+' bis 50'));assert.match(plot.querySelector('svg').getAttribute('aria-label'),/40 von 50.*44 von 50/);
  assert.equal(d.activeElement,control);assert.equal(table.innerHTML,originalTable);
  w.enhanceCoreLearning(data[id],id,'de');assert.equal(control.value,start);assert.equal(plot.querySelectorAll('svg').length,1);
 }
 assert.equal(out.getAttribute('aria-live'),'polite');assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),saved);
 assert.equal(d.querySelectorAll('[data-chart-check-tasks] > li').length,6);
 const questions=w.currentChapterQuiz.questions;assert.equal(questions.length,4);assert.deepEqual(Array.from(questions,q=>q.answers.length),[2,3,3,3]);
 let paths=0;
 for(let i=0;i<questions.length;i++)for(let answer=0;answer<questions[i].answers.length;answer++){
  questions.forEach((q,j)=>{d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?answer:0)+'"]').checked=true;});
  w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
  assert.equal(result.lastPercent,answer===0?100:75);assert.equal(result.contentRevision,1);
  if(answer!==0)assert.deepEqual(result.reviewQuestionIds,[questions[i].id]);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(questions[i].answers[answer].feedback));paths++;
 }
 assert.equal(paths,11);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,true);dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-dgb-material'),solutions=pw.document.getElementById('ws-solutions');
 assert.equal(material.querySelectorAll('[data-chart-check-data] tbody tr').length,2);assert.equal(material.querySelectorAll('[data-chart-check-tasks] > li').length,6);
 assert.equal(material.querySelectorAll('button,input,select,template,details,svg').length,0);assert.equal(solutions.hidden,true);
 assert.ok(solutions.textContent.includes('44 : 40 = 1,1'));assert.ok(!material.textContent.includes('44 : 40 = 1,1'));paper.window.close();
 console.log('PASS: chart scales and unchanged values, labels/focus, reinitialization, 11 assessed answer paths, revisions and separate worksheet solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
