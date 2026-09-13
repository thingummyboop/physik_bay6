const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_6_zuordnungen';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,5);
 let paths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())for(let a=0;a<q.answers.length;a++){
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:80);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
 }
 assert.equal(paths,15);assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 const rows=[...d.querySelectorAll('[data-assignment-table] tbody tr')];assert.equal(rows.length,5);
 for(const row of rows){const [x,a,b,c]=[...row.cells].map(cell=>Number(cell.textContent));assert.equal(a/x,3);assert.equal(x*b,12);assert.equal(c-a,5);}
 assert.equal(d.querySelectorAll('[data-assignment-task] li').length,5);
 const input=d.getElementById('kino_in'),feedback=d.getElementById('kino_feedback'),button=input.closest('.interactive-zone').querySelector('button');
 for(const value of ['50','50,00','50.0',' 50 ']){input.value=value;button.click();assert.match(feedback.textContent,/^Richtig/);}
 for(const value of ['','1e2','0x32','50,001','-1','50abc']){input.value=value;button.click();assert.match(feedback.textContent,/Gib einen/);}
 for(const value of ['0','10','20','100']){input.value=value;button.click();assert.match(feedback.textContent,/Noch nicht/);}
 input.value='50';input.dispatchEvent(new w.Event('input'));assert.equal(feedback.textContent,'');input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(feedback.textContent,/^Richtig/);

 const zone=d.querySelector('[data-assignment-graph]'),model=d.getElementById('assignment-model'),slider=d.getElementById('assignment-x'),out=d.getElementById('assignment-result');
 const samples={a:[0,3,6,9,12,15,18],b:[null,12,6,4,3,2.4,2],c:[5,8,11,14,17,20,23]};
 const stored=w.localStorage.getItem('sciverse_chapter_quiz_results');let states=0;
 for(const key of ['a','b','c'])for(let x=0;x<=6;x++){
  model.value=key;model.dispatchEvent(new w.Event('change'));slider.value=x;slider.focus();slider.dispatchEvent(new w.Event('input'));
  const points=[...zone.querySelectorAll('[data-assignment-point]')],selected=zone.querySelector('[data-assignment-selected]'),svg=zone.querySelector('svg');assert.equal(points.length,key==='b'?6:7);
  for(const point of points){const n=Number(point.dataset.assignmentPoint),expected=samples[key][n];assert.equal(Number(point.dataset.value),expected);assert.equal(Number(point.getAttribute('cx')),55+65*n);assert.ok(Math.abs(Number(point.getAttribute('cy'))-(245-expected*200/(key==='b'?12:25)))<1e-8);assert.ok(Number(point.getAttribute('cy'))>=45&&Number(point.getAttribute('cy'))<=245);}
  if(key==='b'&&x===0){assert.equal(selected,null);assert.match(out.textContent,/nicht definiert/);assert.match(svg.getAttribute('aria-label'),/Kein Punkt/);}
  else{assert.equal(selected.dataset.assignmentSelected,String(x));assert.equal(selected.getAttribute('cx'),points.find(p=>Number(p.dataset.assignmentPoint)===x).getAttribute('cx'));assert.equal(selected.getAttribute('cy'),points.find(p=>Number(p.dataset.assignmentPoint)===x).getAttribute('cy'));assert.ok(out.textContent.includes('y = '+new Intl.NumberFormat('de-AT').format(samples[key][x])+' '+(key==='b'?'Stunden':'Euro')));}
  if(key==='c'&&x===0)assert.match(out.textContent,/ohne Bestellung/);assert.equal(d.activeElement,slider);states++;
 }
 assert.equal(states,21);assert.equal(slider.labels.length,1);assert.equal(model.labels.length,1);for(const control of [slider,model])assert.equal(d.getElementById(control.getAttribute('aria-describedby')),out);
 w.topicInit();assert.equal(model.value,'c');assert.equal(slider.value,'6');zone.querySelector('button').click();assert.equal(model.value,'a');assert.equal(slider.value,'2');assert.equal(d.activeElement,model);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),stored);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-math-material');assert.ok(material.textContent.includes('Vergleiche A und C bei x = 0, 2 und 5'));assert.equal(material.querySelectorAll('[data-assignment-graph] input,[data-assignment-graph] select,svg').length,0);assert.ok(!material.textContent.includes('Pumpen'));paper.window.close();console.log('PASS: 21 graph states with independent values and geometry, zero-domain cases, focus/reset, paper alternative, assignment table invariants and five transfer tasks, all 15 assessment paths and stale revision; valid/invalid price input, Enter and stale feedback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
