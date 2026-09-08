const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
const targets={math3_2_potenzen_terme:['m32_q1','m32_dip1'],math3_11_statistik:['m311_q1','m311_q2','m311_q3','m311_dip1','m311_dip2'],math3_8_pythagoras:['m38_q1','m38_q2','m38_dip1'],math4_2_pythagoras:['m42_q1','m42_q2','m42_dip1'],math4_4_funktionen_sys:['m44_q1','m44_dip1'],math4_5_aehnlichkeit:['m45_q1','m45_dip1'],math4_6_koerper:['m46_q1','m46_dip1']};
(async()=>{let paths=0;
 for(const [id,ids]of Object.entries(targets)){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();let found=0;
  for(const [i,q]of w.currentChapterQuiz.questions.entries())if(ids.includes(q.id)){
   found++;for(let a=0;a<q.answers.length;a++){
    w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
    w.submitChapterQuiz();const n=w.currentChapterQuiz.questions.length;
    assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:Math.round(100*(n-1)/n));
    assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
   }
  }
  assert.equal(found,ids.length,id);assert.equal(w.currentChapterResult(id,{contentRevision:w.chapterRevision(id)-1,passed:true,bestPercent:100}).passed,false);dom.window.close();
 }
 assert.equal(paths,38);console.log('PASS: 38 revised mathematics answer paths across seven real chapter renders, correct percentages, individual feedback and previous revision invalidation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
