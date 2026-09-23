const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=waermelehre',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));
 await w.renderTopic();
 assert.equal(d.querySelectorAll('.chapter-question').length,29);
 const text=d.body.textContent;assert.doesNotMatch(text,/Wärme ist eigentlich nichts anderes als Bewegung|Holz bleibt kalt|an dem sich Teilchen nicht mehr bewegen/);
 assert.match(text,/wegen eines Temperaturunterschieds/);assert.match(text,/ohne dass die Temperatur steigt/);
 assert.equal(w.currentChapterResult('waermelehre',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult('waermelehre',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 const questions=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('thermal_measure_'));assert.equal(questions.length,3);
 for(const q of questions){assert.equal(q.sectionIndex,1);const index=w.currentChapterQuiz.questions.indexOf(q);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:question.answers.findIndex(a=>a.correct))+'"]').checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).waermelehre;
   assert.equal(result.lastPercent,Math.round(100*(29-(q.answers[choice].correct?0:1))/29));assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 const timeouts=[],intervals=[];w.setTimeout=fn=>(timeouts.push(fn),timeouts.length);w.setInterval=fn=>(intervals.push(fn),intervals.length);w.clearInterval=()=>{};w.clearTimeout=()=>{};w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};
 w.eval(read('js/topics/waermelehre.js'));w.topicInit();
 assert.equal(d.querySelectorAll('#particleSvg circle').length,60,'Existing particle simulation initializes');
 w.heatSoup();assert.ok(timeouts.length);timeouts.splice(0).forEach(fn=>fn());assert.match(d.querySelector('#soupText').innerText,/kann aber ebenfalls heiß werden/);
 w.sunShine();for(let i=0;i<20;i++)intervals.at(-1)();assert.match(d.querySelector('#sunText').innerText,/keine Messwerte/);assert.ok(!d.querySelector('#parkingSunSvg').classList.contains('is-cooking'));
 for(const phase of ['ice','water','steam'])w.setPhase(phase);
 assert.match(d.querySelector('#phaseText').innerText,/Gasförmig/);
 dom.window.close();console.log('PASS: thermal concepts, 29-question render with nine measurement answer paths, obsolete mastery invalidation, particle initialization, corrected soup and radiation feedback, phase controls.');
})().catch(error=>{console.error(error);process.exitCode=1;});
