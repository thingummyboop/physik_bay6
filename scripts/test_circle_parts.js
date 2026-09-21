'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math4_kreis_kreisteile';
const keys={circle_diameter:1,circle_ratio:2,circle_pi_exact:0,circle_u:1,circle_a:2,circle_scale:0,circle_half:0,circle_eighth:2,circle_full_edge:1,circle_inverse_u:1,circle_inverse_a:2,circle_inverse_quarter:0,circle_inner:1,circle_order:2,circle_area_unit:0};
// Independent numerical boundary: chord lengths and polygon area, not the circle formulas.
function polygonReference(radius,part){
 const points=Array.from({length:5001},(_,i)=>{const t=2*Math.PI*i/(5000*part);return[radius*Math.cos(t),radius*Math.sin(t)];});
 let arc=0;for(let i=1;i<points.length;i++)arc+=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);
 const boundary=part===1?points:[[0,0],...points];let area=0,perimeter=0;
 boundary.forEach((p,i)=>{const next=boundary[(i+1)%boundary.length];area+=p[0]*next[1]-p[1]*next[0];perimeter+=Math.hypot(p[0]-next[0],p[1]-next[1]);});return{arc,perimeter,area:Math.abs(area)/2};
}
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,15);assert.equal(w.chapterRevision(id),1);assert.equal(d.querySelectorAll('[data-circle-tasks] li').length,15);assert.equal(d.querySelectorAll('.circle-figure').length,2);assert.equal(d.querySelectorAll('[data-circle-drawing] svg').length,1);assert.equal(d.querySelector('[data-circle-drawing-caption]').closest('[data-circle-drawing]'),null);
 const topics=w.SCIVERSE_CURRICULUM.mathematik.topics,index=topics.findIndex(t=>t.id===id);assert.equal(topics[index+1].id,'math4_6_koerper');assert.ok(data.math4_6_koerper.prerequisites.includes(id));assert.ok(topics[index].grade.startsWith('4. Klasse'));
 const change=(selector,value,event='change')=>{const el=d.querySelector(selector);el.value=String(value);el.dispatchEvent(new w.Event(event));};
 const input=d.querySelector('#circle-answer'),status=d.querySelector('[data-circle-status]'),check=d.querySelector('[data-circle-check]'),before=JSON.stringify(w.localStorage);let cases=0;
 for(let radius=1;radius<=8;radius++)for(const part of [1,2,4,8]){
  const ref=polygonReference(radius,part),model=w.circleModel(radius,part);for(const key of ['arc','perimeter','area'])assert.ok(Math.abs(model[key]-ref[key])<0.0001,`${radius}/${part}/${key}`);
  change('#circle-radius',radius,'input');change('#circle-part',part);
  assert.equal(d.querySelectorAll('[data-circle-full]').length,part===1?1:0);assert.equal(d.querySelectorAll('[data-circle-radii]').length,part===1?0:1);assert.equal(d.querySelectorAll('[data-circle-sector]').length,part===1?0:1);
  for(const quantity of ['arc','perimeter','area']){
   change('#circle-quantity',quantity);assert.equal(input.value,'');assert.equal(status.textContent,'');assert.equal(d.querySelectorAll('[data-circle-row]').length,0);
   input.value=ref[quantity].toFixed(2).replace('.',',');check.click();assert.match(status.textContent,/^Richtig\./);assert.equal(d.activeElement,status);assert.equal(d.querySelectorAll('[data-circle-row]').length,3);assert.ok(status.textContent.includes(quantity==='area'?'cm²':'cm'));
   input.value='0';check.click();assert.match(status.textContent,/^Noch nicht richtig\./);input.dispatchEvent(new w.Event('input'));assert.equal(status.textContent,'');assert.equal(d.querySelectorAll('[data-circle-row]').length,0);
   d.querySelector('[data-circle-show]').click();assert.equal(d.querySelectorAll('[data-circle-row]').length,3);assert.equal(d.activeElement,status);cases++;
  }
 }
 for(const raw of ['','-1','1e2','NaN','10001','3cm','3,4,5','.5']){input.value=raw;check.click();assert.equal(input.getAttribute('aria-invalid'),'true',raw);assert.equal(d.activeElement,input);}
 d.querySelector('[data-circle-reset]').click();assert.equal(d.activeElement.id,'circle-radius');assert.equal(d.querySelector('#circle-radius').value,'4');assert.equal(d.querySelector('#circle-part').value,'4');assert.equal(d.querySelector('#circle-quantity').value,'arc');assert.equal(d.querySelector('[data-circle-drawing]').scrollLeft,0);
 input.value='6.28';input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(status.textContent,/^Richtig\./);assert.equal(JSON.stringify(w.localStorage),before);
 assert.equal(w.circlePiTerm(2,4),'π/2');assert.equal(w.circlePiTerm(16,8),'2π');assert.equal(w.circleModel(4,2).exactPerimeter,'4π + 8');
 let answers=0;for(const [i,q]of w.currentChapterQuiz.questions.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id],q.id);for(let answer=0;answer<q.answers.length;answer++){w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?answer:keys[item.id]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,answer===keys[q.id]?100:93);assert.deepEqual(r.reviewQuestionIds,answer===keys[q.id]?[]:[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));answers++;}}assert.equal(answers,45);
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('.circle-figure svg').length,2);assert.equal(pd.querySelectorAll('.circle-paper').length,1);assert.equal(pd.querySelectorAll('[data-circle-tasks] li').length,15);assert.equal(pd.querySelectorAll('#ws-solutions [data-circle-solution]').length,5);assert.equal(pd.getElementById('ws-solutions').hidden,true);const toggle=pd.getElementById('ws-include-solutions');toggle.checked=true;toggle.dispatchEvent(new pw.Event('change'));assert.equal(pd.getElementById('ws-solutions').hidden,false);
 paper.window.close();dom.window.close();console.log(`PASS: ${cases} circle calculations against independent polygon approximations, correct/incorrect/invalid answers, focus/reset/storage, 45 quiz paths, catalog/prerequisites, two print figures and five optional solutions.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
