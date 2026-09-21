const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_5_verhaeltnisse';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const keys=require('./fixtures/ratio_answer_keys.json');assert.equal(w.currentChapterQuiz.questions.length,13);
 assert.deepEqual(Array.from(w.currentChapterQuiz.questions,q=>q.id).sort(),Object.keys(keys).sort());
 for(const [i,q]of w.currentChapterQuiz.questions.entries())for(let a=0;a<q.answers.length;a++){
  w.restartChapterQuiz();
  assert.equal(q.answers[a].correct,a===keys[q.id]);
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:keys[item.id]}"]`).checked=true);
  w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(result.lastPercent,a===keys[q.id]?100:92);assert.equal(result.contentRevision,2);assert.deepEqual(result.reviewQuestionIds,a===keys[q.id]?[]:[q.id]);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 const rows=[...d.querySelectorAll('[data-ratio-table] tbody tr')];assert.equal(rows.length,4);
 for(const row of rows){const [a,b,total]=[...row.cells].slice(0,3).map(cell=>Number(cell.textContent));assert.equal(a+b,total);const [x,y]=row.cells[3].textContent.split(':').map(Number);assert.equal(a*y,b*x);}
 assert.equal(d.querySelectorAll('[data-ratio-task] li').length,5);
 const a=d.getElementById('sirup_in'),b=d.getElementById('wasser_in'),out=d.getElementById('mix_feedback'),button=a.closest('.interactive-zone').querySelector('button');
 for(const [x,y,expected] of [['2','10',/^Richtig/],['2,00','10.0',/^Richtig/],['1','5',/^Das Verhältnis/],['0,5','2,5',/^Das Verhältnis/],['6','6',/^Die Gesamtmenge/],['1','1',/^Prüfe beide/],['0','0',/^Prüfe beide/]]){a.value=x;b.value=y;button.click();assert.match(out.textContent,expected);}
 for(const field of [a,b])for(const invalid of ['','-1','13','1e1','0x02','2,001']){a.value='2';b.value='10';field.value=invalid;button.click();assert.match(out.textContent,/Gib für beide Mengen/);}
 for(const field of [a,b]){a.value='2';b.value='10';field.dispatchEvent(new w.Event('input'));assert.equal(out.textContent,'');field.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(out.textContent,/^Richtig/);}
 const saved=JSON.stringify(w.localStorage),expected=[7.5,6,15,15,6,7.5,8,12],select=d.getElementById('ratio-case'),answer=d.getElementById('ratio-answer'),result=d.getElementById('ratio-result');
 for(let i=0;i<8;i++){
  const model=w.ratioEquationModel(i);assert.equal(model.answer,expected[i]);const filled=Array.from(model.values,n=>n===null?expected[i]:n);assert.equal(filled[0]/filled[1],filled[2]/filled[3]);
  select.value=String(i);select.dispatchEvent(new w.Event('change'));assert.equal(answer.value,'');assert.ok(d.getElementById('ratio-work').hidden);
  answer.value=String(expected[i]).replace('.',',');answer.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(result.textContent,/^Richtig/);
  answer.value=String(expected[i]+1);d.querySelector('[data-ratio-check]').click();assert.match(result.textContent,/Kreuzprodukte/);
  d.querySelector('[data-ratio-reveal]').click();assert.equal(d.getElementById('ratio-work').hidden,false);assert.equal(d.querySelector('[data-ratio-reveal]').getAttribute('aria-expanded'),'true');assert.ok(d.getElementById('ratio-work').textContent.includes('Probe:'));
  d.querySelector('[data-ratio-reset]').click();assert.equal(d.activeElement,answer);assert.equal(answer.value,'');assert.ok(d.getElementById('ratio-work').hidden);
 }
 select.value='1';select.dispatchEvent(new w.Event('change'));answer.value='0';d.querySelector('[data-ratio-check]').click();assert.match(result.textContent,/Durch null/);assert.equal(answer.getAttribute('aria-invalid'),'true');
 for(const invalid of ['',' ','-2','1e1','0x06','6.001','Infinity','1000001']){answer.value=invalid;d.querySelector('[data-ratio-check]').click();assert.equal(answer.getAttribute('aria-invalid'),'true');assert.equal(d.activeElement,answer);}
 answer.value='6.00';answer.dispatchEvent(new w.Event('input'));assert.equal(result.textContent,'');assert.equal(answer.hasAttribute('aria-invalid'),false);d.querySelector('[data-ratio-check]').click();assert.match(result.textContent,/^Richtig/);
 assert.equal(JSON.stringify(w.localStorage),saved);for(const bad of [-1,8,.5,'0'])assert.throws(()=>w.ratioEquationModel(bad));dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));assert.equal(pd.querySelectorAll('#ws-math-material article').length,5);assert.equal(pd.querySelectorAll('[data-ratio-paper]').length,2);assert.equal(pd.querySelectorAll('.ws-paper-solution').length,4);assert.equal(pd.querySelectorAll('#ws-math-material svg').length,1);assert.equal(pd.querySelectorAll('#ws-content>.question-block').length,13);
 const gcd=(a,b)=>b?gcd(b,a%b):a;let generated=0;
 for(let seed=1;seed<=25;seed++){let n=seed;pw.Math.random=()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};const holder=pd.createElement('div');holder.innerHTML=pw.generateWorksheetContent(id,data[id].title);const tasks=holder.querySelectorAll('[data-ratio-generated]'),solutions=holder.querySelector('template').content.querySelectorAll('[data-ratio-generated-answer]');assert.equal(tasks.length,12);for(let i=0;i<12;i++){const a=+tasks[i].dataset.a,b=+tasks[i].dataset.b,f=+tasks[i].dataset.factor,kind=tasks[i].dataset.kind,value=solutions[i].dataset.ratioGeneratedAnswer;
  if(kind==='reduce'){const [x,y]=value.split(':').map(Number);assert.equal(x*b,y*a);assert.equal(gcd(x,y),1);}else if(kind==='share'){const [x,y]=value.split(':').map(Number);assert.equal(x+y,(a+b)*f);assert.equal(x*b,y*a);}else {const x=+value;assert.equal(kind==='numerator'?x/(b*f):(a*f)/x,a/b);}generated++;
 }}paper.window.close();console.log('PASS: 39 independent quiz paths, eight proportion models with probes, invalid/zero/decimal inputs, keyboard/reset/storage, paper solutions and '+generated+' generated answers; existing mixture feedback retained.');
})().catch(e=>{console.error(e);process.exitCode=1;});
