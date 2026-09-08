const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='bio_1_kompass';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();let paths=0;
 for(const [i,q]of w.currentChapterQuiz.questions.entries())if(['bio_compass_measure','bio_compass_cumulative','bio_kompass_s1_extra_lebewesen','bio_compass_individual'].includes(q.id))for(let a=0;a<q.answers.length;a++){
  assert.equal(q.sectionIndex,['bio_compass_measure','bio_compass_cumulative'].includes(q.id)?4:0);w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();const n=w.currentChapterQuiz.questions.length;assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:Math.round(100*(n-1)/n));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
 }assert.equal(paths,12);assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 const rows=[...d.querySelectorAll('[data-germination-record] tbody tr')];assert.equal(rows.length,3);const matrix=rows.map(r=>[...r.cells].slice(1).map(c=>Number(c.textContent)));
 assert.deepEqual(matrix.map(r=>r.slice(0,3).reduce((a,b)=>a+b,0)),[7,16,25]);assert.deepEqual(matrix.map(r=>r.slice(3).reduce((a,b)=>a+b,0)),[7,16,25]);
 matrix.forEach((r,i)=>r.forEach((v,j)=>{assert.ok(v>=0&&v<=10);if(i)assert.ok(v>=matrix[i-1][j]);}));assert.equal(matrix[1][0]-matrix[0][0],3);assert.equal(d.querySelectorAll('[data-germination-task] li').length,6);dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-biology-material');assert.equal(material.querySelectorAll('[data-germination-record] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-germination-task] li').length,6);assert.ok(!material.querySelector('[data-germination-solution]'));paper.window.close();
 console.log('PASS: 12 germination/living-characteristics answer paths, cumulative counts and group totals, question routing/revision and printable evidence task without model answer.');
})().catch(e=>{console.error(e);process.exitCode=1;});
