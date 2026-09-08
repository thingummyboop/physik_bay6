const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_5_verhaeltnisse';
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
 const rows=[...d.querySelectorAll('[data-ratio-table] tbody tr')];assert.equal(rows.length,4);
 for(const row of rows){const [a,b,total]=[...row.cells].slice(0,3).map(cell=>Number(cell.textContent));assert.equal(a+b,total);const [x,y]=row.cells[3].textContent.split(':').map(Number);assert.equal(a*y,b*x);}
 assert.equal(d.querySelectorAll('[data-ratio-task] li').length,5);
 const a=d.getElementById('sirup_in'),b=d.getElementById('wasser_in'),out=d.getElementById('mix_feedback'),button=a.closest('.interactive-zone').querySelector('button');
 for(const [x,y,expected] of [['2','10',/^Richtig/],['2,00','10.0',/^Richtig/],['1','5',/^Das Verhältnis/],['0,5','2,5',/^Das Verhältnis/],['6','6',/^Die Gesamtmenge/],['1','1',/^Prüfe beide/],['0','0',/^Prüfe beide/]]){a.value=x;b.value=y;button.click();assert.match(out.textContent,expected);}
 for(const field of [a,b])for(const invalid of ['','-1','13','1e1','0x02','2,001']){a.value='2';b.value='10';field.value=invalid;button.click();assert.match(out.textContent,/Gib für beide Mengen/);}
 for(const field of [a,b]){a.value='2';b.value='10';field.dispatchEvent(new w.Event('input'));assert.equal(out.textContent,'');field.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(out.textContent,/^Richtig/);}
 dom.window.close();console.log('PASS: ratio table and total checks, 15 answer paths, revision, distinct total/ratio feedback, decimal input, invalid values and Enter in both fields.');
})().catch(e=>{console.error(e);process.exitCode=1;});
