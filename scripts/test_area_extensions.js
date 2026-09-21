'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),id='math3_4_flaechensatz',data=JSON.parse(read('lang/de.json'));
const keys={area_figure_q0:0,area_figure_q1:0,area_figure_q2:0,area_figure_q3:0,area_figure_q4:0,area_figure_q5:0,area_figure_q6:0,area_figure_q7:0,area_inverse_triangle:1,area_inverse_trapezoid:2,area_inverse_units:0,area_hexagon_radius:1,area_hexagon_area:2,area_hexagon_regular:0};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','area-lab','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();
 const storage=JSON.stringify(w.localStorage),lab=d.querySelector('[data-area-hex]'),radius=lab.querySelector('select'),next=lab.querySelector('[data-area-hex-next]'),previous=lab.querySelector('[data-area-hex-prev]');
 const change=el=>el.dispatchEvent(new w.Event('change'));
 let states=0;
 for(const r of [2,3,4]){
  radius.value=String(r);change(radius);
  for(let step=0;step<=6;step++){
   assert.equal(+lab.dataset.step,step);assert.equal(previous.disabled,step===0);assert.equal(next.disabled,step===6);
   const vertices=[...lab.querySelectorAll('[data-hex-vertex]')].map(e=>[+e.getAttribute('cx'),+e.getAttribute('cy')]);assert.equal(vertices.length,Math.min(step+1,6));
   vertices.forEach(p=>near(Math.hypot(p[0]-180,p[1]-180),r*19));
   const sides=[...lab.querySelectorAll('[data-hex-side]')];assert.equal(sides.length,step);
   for(const side of sides)near(Math.hypot(side.getAttribute('x2')-side.getAttribute('x1'),side.getAttribute('y2')-side.getAttribute('y1')),r*19);
   const compass=lab.querySelector('[data-hex-compass]');assert.equal(!!compass,step>0);
   if(compass){near(+compass.getAttribute('r'),r*19);near(+compass.getAttribute('cx'),vertices[step-1][0]);near(+compass.getAttribute('cy'),vertices[step-1][1]);const target=vertices[step%6];near(Math.hypot(+compass.getAttribute('cx')-target[0],+compass.getAttribute('cy')-target[1]),r*19);}
   if(step===6){const polygon=lab.querySelector('[data-hex-area]'),points=polygon.getAttribute('points').split(' ').map(p=>p.split(',').map(Number));let twice=0;points.forEach((p,i)=>{const q=points[(i+1)%6];twice+=p[0]*q[1]-p[1]*q[0];});near(Math.abs(twice)/2/(19*19),3*Math.sqrt(3)*r*r/2);assert.match(lab.textContent,new RegExp('Umfang '+6*r+' cm'));}
   assert.equal(lab.querySelector('svg').getAttribute('aria-label'),lab.querySelector('[data-area-hex-status]').textContent);states++;next.click();
  }
  assert.equal(d.activeElement,previous);previous.click();assert.equal(lab.dataset.step,'5');assert.equal(lab.querySelector('[data-hex-area]'),null);w.topicInit();assert.equal(lab.dataset.step,'5');
 }
 lab.querySelector('[data-area-hex-reset]').click();assert.equal(radius.value,'3');assert.equal(lab.dataset.step,'0');assert.equal(d.activeElement,radius);
 const inv=d.querySelector('[data-area-inverse]'),select=inv.querySelector('select'),input=inv.querySelector('input'),result=inv.querySelector('[data-area-inverse-result]'),check=inv.querySelector('[data-area-inverse-check]');
 for(const [type,value]of [['triangle','7'],['trapezoid','5'],['parallelogram','3,5']]){
  select.value=type;change(select);assert.equal(input.value,'');assert.equal(result.textContent,'');
  const expectedGivens={triangle:'Dreieck: A = 28 cm², b = 8 cm.',trapezoid:'Trapez: A = 30 cm², a = 4 cm, b = 8 cm.',parallelogram:'Parallelogramm: A = 21 cm², b = 6 cm.'};assert.equal(inv.querySelector('[data-area-inverse-givens]').textContent,expectedGivens[type]+' Gesucht ist die senkrechte Höhe h.');
  for(const [text,correct]of [[value,true],[value.replace(',','.'),true],['2',false]]){input.value=text;check.click();assert.equal(result.dataset.correct,String(correct));assert.equal(d.activeElement,result);assert.equal(input.hasAttribute('aria-invalid'),false);}
  for(const invalid of ['', '0','-7','7 cm','1e1','Infinity','7,2,3','abc']){input.value=invalid;check.click();assert.equal(input.getAttribute('aria-invalid'),'true');assert.equal(d.activeElement,input);assert.equal(result.dataset.correct,undefined);}
  input.value=value;input.dispatchEvent(new w.Event('input'));assert.equal(result.textContent,'');assert.equal(input.hasAttribute('aria-invalid'),false);input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter'}));assert.equal(result.dataset.correct,'true');
 }
 inv.querySelector('[data-area-inverse-reset]').click();assert.equal(select.value,'triangle');assert.equal(input.value,'');assert.equal(result.textContent,'');assert.equal(d.activeElement,select);assert.equal(JSON.stringify(w.localStorage),storage);
 assert.equal(d.querySelectorAll('[data-area-extension-tasks] > li').length,6);assert.equal(d.querySelectorAll('[data-area-hex-instructions] > li').length,6);
 const qs=w.currentChapterQuiz.questions;assert.equal(qs.length,14);assert.equal(w.chapterRevision(id),2);assert.equal(w.currentChapterResult(id,{contentRevision:1,lastPercent:100}).outdated,true);
 for(const[i,q]of qs.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id]);if(q.id.startsWith('area_inverse'))assert.equal(q.sectionIndex,4);if(q.id.startsWith('area_hexagon'))assert.equal(q.sectionIndex,5);for(let choice=0;choice<3;choice++){w.restartChapterQuiz();qs.forEach((item,k)=>d.querySelector(`input[name="chapter_q_${k}"][value="${i===k?choice:keys[item.id]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,choice===keys[q.id]?100:93);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('.area-extension-paper').length,2);assert.equal(pd.querySelectorAll('[data-area-extension-tasks] > li').length,6);assert.equal(pd.querySelectorAll('#ws-solutions [data-area-extension-solution]').length,2);assert.equal(pd.querySelectorAll('.area-hex-figure svg[data-worksheet-static]').length,1);assert.equal(pd.querySelectorAll('[data-area-inverse] input,[data-area-hex] button').length,0);assert.match(pd.querySelector('#ws-solutions').textContent,/10,38.*41,52/s);assert.doesNotMatch(pd.body.textContent,/undefined/);paper.window.close();
 console.log(`PASS: ${states} construction states with independent distances, compass intersections and polygon areas; inverse inputs/focus/reset/storage; 42 graded answer paths, revision and paper material.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
