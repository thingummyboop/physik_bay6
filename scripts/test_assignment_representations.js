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
 dom.window.close();console.log('PASS: assignment table invariants, five transfer tasks, all 15 assessment paths and stale revision; valid/invalid price input, Enter and stale feedback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
