'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math4_7_statistik';
const keys={m47_q1:0,m47_mean:0,m47_q2:0,m47_even:0,m47_boxread:0,m47_range:0,m47_change:0,m47_dip1:0,m47_missing:1,m47_joint:0,m47_reference:2,m47_product:1,m47_paths:2,m47_coin_paths:0,m47_without_branch:1,m47_without_rr:2,m47_without_atleast:0};
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,17);assert.equal(w.chapterRevision(id),2);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.equal(d.querySelectorAll('[data-stat4-tasks] li').length,9);assert.equal(d.querySelectorAll('[data-stat4-cross-output] table').length,1);assert.equal(d.querySelector('[data-stat4-cross-description]').closest('.stat4-scroll'),null);
 const saved=JSON.stringify(w.localStorage),change=(selector,value)=>{const select=d.querySelector(selector);select.value=String(value);select.dispatchEvent(new w.Event('change'));};
 let crossCases=0,modelCases=0;
 for(const [name,cells]of Object.entries({base:[[9,3],[2,6]],second:[[6,12],[9,3]],empty:[[0,0],[4,6]]}))for(const base of ['all','row','column']){
  change('#stat4-data',name);change('#stat4-base',base);
  const total=cells.flat().reduce((a,b)=>a+b,0);assert.ok(d.querySelector('[data-stat4-cross-status]').textContent.startsWith(total+' Beobachtungen'));
  cells.forEach((row,r)=>row.forEach((v,c)=>{const expected=base==='all'?total:base==='row'?row.reduce((a,b)=>a+b,0):cells[0][c]+cells[1][c],cell=d.querySelector(`[data-stat4-cell="${r},${c}"]`);assert.equal(Number(cell.dataset.denominator),expected);assert.equal(Number(cell.querySelector('strong').textContent),v);assert.ok(cell.textContent.includes(expected===0?'Kein Anteil bestimmbar':v+'/'+expected+' = '+(100*v/expected).toLocaleString('de-AT',{maximumFractionDigits:2})+' %'));}));
  assert.deepEqual([...d.querySelectorAll('[data-stat4-cross-output] tfoot td')].map(e=>Number(e.textContent)),[cells[0][0]+cells[1][0],cells[0][1]+cells[1][1],total]);crossCases++;
 }
 d.querySelector('[data-stat4-cross-reset]').click();assert.equal(d.activeElement.id,'stat4-data');assert.equal(d.querySelector('#stat4-base').value,'all');
 const status=d.querySelector('[data-stat4-result]'),input=d.querySelector('#stat4-answer'),check=d.querySelector('[data-stat4-check]');
 for(let red=1;red<=3;red++)for(const replace of [true,false])for(const event of ['both','one','atleast']){
  change('#stat4-red',red);change('#stat4-replace',replace?'yes':'no');change('#stat4-event',event);
  const pairs=[];for(let a=0;a<4;a++)for(let b=0;b<4;b++)if(replace||a!==b)pairs.push([a<red,b<red]);
  const successes=pairs.filter(([a,b])=>event==='both'?a&&b:event==='one'?a!==b:a||b).length;
  const pathCounts=[0,0,0,0];pairs.forEach(([a,b])=>pathCounts[(a?0:2)+(b?0:1)]++);
  const model=w.stat4Model(red,replace,event);assert.equal(model.denominator,pairs.length);assert.equal(model.numerator,successes);assert.deepEqual(Array.from(model.numerators),pathCounts);assert.equal(model.numerators.reduce((a,b)=>a+b,0),model.denominator);
  assert.equal(d.querySelectorAll('[data-stat4-path]').length,0);assert.equal(input.value,'');assert.equal(status.textContent,'');
  input.value=(100*successes/pairs.length).toFixed(2).replace('.',',');check.click();assert.match(status.textContent,/^Richtig\./);assert.equal(d.activeElement,status);
  const rows=[...d.querySelectorAll('[data-stat4-path]')];assert.equal(rows.length,4);rows.forEach((row,i)=>{assert.ok(row.lastElementChild.textContent.includes(pathCounts[i]+'/'+pairs.length));assert.equal(row.textContent.includes('unmöglich'),pathCounts[i]===0);});
  const expected=100*successes/pairs.length;input.value=expected===100?'0':'100';check.click();assert.match(status.textContent,/^Noch nicht richtig\./);
  input.dispatchEvent(new w.Event('input'));assert.equal(status.textContent,'');assert.equal(d.querySelectorAll('[data-stat4-path]').length,0);
  d.querySelector('[data-stat4-show]').click();assert.equal(d.querySelectorAll('[data-stat4-path]').length,4);assert.equal(d.activeElement,status);assert.ok(!d.querySelector('[data-stat4-tree]').innerHTML.includes('NaN'));modelCases++;
 }
 for(const raw of ['','-1','101','50%','1e2','NaN','1,2,3','.5','4;5']){input.value=raw;check.click();assert.equal(input.getAttribute('aria-invalid'),'true',raw);assert.equal(d.activeElement,input);assert.match(status.textContent,/Bitte eine Zahl/);}
 d.querySelector('[data-stat4-reset]').click();assert.equal(d.activeElement.id,'stat4-red');assert.equal(d.querySelector('#stat4-red').value,'3');assert.equal(d.querySelector('#stat4-replace').value,'yes');assert.equal(d.querySelector('#stat4-event').value,'both');assert.equal(d.querySelector('[data-stat4-tree-drawing]').scrollLeft,0);
 input.value='56.25';input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(status.textContent,/^Richtig\./);assert.equal(JSON.stringify(w.localStorage),saved);
 let answers=0;for(const [i,q]of w.currentChapterQuiz.questions.entries()){assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id],q.id);for(let answer=0;answer<q.answers.length;answer++){w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?answer:keys[item.id]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(r.lastPercent,answer===keys[q.id]?100:94);assert.deepEqual(r.reviewQuestionIds,answer===keys[q.id]?[]:[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));answers++;}}assert.equal(answers,47);
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('.stat4-tree-figure svg').length,1);assert.equal(pd.querySelectorAll('.stat4-paper').length,2);assert.equal(pd.querySelectorAll('[data-stat4-tasks] li').length,9);assert.equal(pd.querySelectorAll('#ws-solutions [data-stat4-solution]').length,3);assert.equal(pd.getElementById('ws-solutions').hidden,true);const toggle=pd.getElementById('ws-include-solutions');toggle.checked=true;toggle.dispatchEvent(new pw.Event('change'));assert.equal(pd.getElementById('ws-solutions').hidden,false);
 assert.equal(pd.querySelectorAll('.stat4-kennzahlen-paper').length,1);assert.equal(pd.querySelectorAll('#ws-solutions [data-stat4-kennzahlen-solution]').length,1);
 const generated=[...pd.querySelectorAll('[data-stat4-generated]')],solutions=[...pd.querySelectorAll('#ws-solutions [data-stat4-generated-answer]')];assert.equal(generated.length,6);assert.equal(solutions.length,6);generated.forEach((task,i)=>assert.equal(Number(solutions[i].dataset.stat4GeneratedAnswer),100*Number(task.dataset.red)/Number(task.dataset.total)));
 assert.equal(pd.querySelectorAll('#ws-math-material [data-stat4-generated-answer]').length,0);
 for(const random of [0,.2,.5,.8,.99999]){
  pw.Math.random=()=>random;const block=pd.createElement('div');block.innerHTML=pw.generateWorksheetContent(id,data[id].title);const tasks=[...block.querySelectorAll('[data-stat4-generated]')],answers=[...block.querySelector('template[data-generated-worksheet-solutions]').content.querySelectorAll('[data-stat4-generated-answer]')];assert.equal(tasks.length,6);assert.equal(answers.length,6);tasks.forEach((task,i)=>{const total=Number(task.dataset.total),red=Number(task.dataset.red);assert.ok(total>=10&&total<=50&&red>=1&&red<total);assert.equal(Number(answers[i].dataset.stat4GeneratedAnswer),100*red/total);assert.ok(answers[i].textContent.includes((100*red/total).toLocaleString('de-AT',{maximumFractionDigits:2})+' %'));});
 }
 paper.window.close();dom.window.close();console.log(`PASS: ${crossCases} cross tables with distinct denominators; ${modelCases} two-stage models independently enumerated; input/focus/reset/storage; ${answers} graded answers; paper tree, nine tasks, three paper alternatives, four optional solutions and six generated calculations.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
