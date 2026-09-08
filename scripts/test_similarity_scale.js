const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_7_aehnlichkeit';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,5);
 for(const [i,q]of w.currentChapterQuiz.questions.entries())for(let a=0;a<q.answers.length;a++){
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:80);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 const input=d.getElementById('aehn_sel'),out=d.getElementById('aehn_feedback'),zone=input.closest('.interactive-zone'),button=zone.querySelector('button');
 const rows=[...zone.querySelectorAll('tbody tr')],rects=[...zone.querySelectorAll('rect')];assert.equal(rows.length,3);
 rows.forEach((row,i)=>{const width=parseFloat(row.cells[1].textContent),height=parseFloat(row.cells[2].textContent);assert.equal(Number(rects[i].getAttribute('width'))/width,10);assert.equal(Number(rects[i].getAttribute('height'))/height,10);});
 assert.equal(zone.querySelector('svg').getAttribute('role'),'img');assert.ok(d.getElementById(zone.querySelector('svg').getAttribute('aria-labelledby')));
 assert.equal(d.querySelectorAll('[data-scale-task] li').length,5);assert.ok(d.querySelector('label[for="aehn_sel"]'));
 for(const [value,pattern]of [['',/Wähle zuerst/],['red',/0,75.*1,5/],['green',/Beide Seiten.*Faktor 2/]]){input.value=value;button.click();assert.match(out.textContent,pattern);}
 input.value='red';input.dispatchEvent(new w.Event('change'));assert.equal(out.textContent,'');input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(out.textContent,/nicht ähnlich/);
 dom.window.close();console.log('PASS: 15 similarity/scale answer paths, stale revision, diagram dimensions match labelled table, non-color choice, missing selection, change and Enter.');
})().catch(e=>{console.error(e);process.exitCode=1;});
