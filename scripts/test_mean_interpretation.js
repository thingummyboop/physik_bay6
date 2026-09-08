const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_11_statistik';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();assert.equal(w.currentChapterQuiz.questions.length,7);
 let paths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())if(['m311_zero','m311_equal'].includes(q.id))for(let a=0;a<q.answers.length;a++){
  assert.equal(q.sectionIndex,2);w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:86);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
 }assert.equal(paths,6);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 const rows=[...d.querySelectorAll('[data-mean-comparison] tbody tr')];assert.equal(rows.length,3);
 const values=[1,2].map(i=>rows.map(r=>Number(r.cells[i].textContent)));assert.deepEqual(values.map(v=>v.reduce((a,b)=>a+b,0)/v.length),[4,4]);assert.deepEqual(values.map(v=>Math.max(...v)-Math.min(...v)),[4,12]);assert.equal(values[1].includes(4),false);
 const input=d.getElementById('ans_m311_2'),out=d.getElementById('res_m311_2'),button=input.closest('.interactive-zone').querySelector('button');
 for(const value of ['3','3,0','3.00',' 3 ']){input.value=value;button.click();assert.match(out.textContent,/^Richtig/);}
 for(const value of ['','3,1,0','0x03','3e0','-1','Infinity']){input.value=value;button.click();assert.match(out.textContent,/Gib einen/);}
 input.value='6';button.click();assert.match(out.textContent,/ist die Summe/);input.value='4';button.click();assert.match(out.textContent,/Noch nicht/);
 input.value='3';input.dispatchEvent(new w.Event('input'));assert.equal(out.textContent,'');input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(out.textContent,/^Richtig/);dom.window.close();
 console.log('PASS: equal means/different ranges from actual table, six answer paths, review section and revision; mean input, sum-specific feedback, validation and Enter.');
})().catch(e=>{console.error(e);process.exitCode=1;});
