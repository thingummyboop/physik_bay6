const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{let paths=0;for(const [id,qid,section]of [['dgb5_orientierung','dgb5_media_access',2],['dgb5_kommunikation','dgb5_revision_evidence',2],['dgb5_handeln','dgb5_saved_evidence',0]]){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 assert.equal(w.currentChapterQuiz.questions.length,5);const i=w.currentChapterQuiz.questions.findIndex(q=>q.id===qid),q=w.currentChapterQuiz.questions[i];assert.equal(q.sectionIndex,section);
 for(let a=0;a<3;a++){w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${i===j?a:item.answers.findIndex(a=>a.correct)}"]`).checked=true);w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:80);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;}
 assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);dom.window.close();
 }assert.equal(paths,9);console.log('PASS: three DGB transfer questions, nine answer paths, correct section review routes and invalidated prior results.');})().catch(e=>{console.error(e);process.exitCode=1;});
