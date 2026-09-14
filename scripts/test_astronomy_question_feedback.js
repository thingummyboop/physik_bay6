const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),chapter=data.astronomie;
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=astronomie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();w.playSuccessSound=()=>{};
 const questions=chapter.sections.flatMap((section,sectionIndex)=>section.quizzes.map(q=>({...q,sectionIndex}))),ids=questions.map(q=>q.id);
 assert.equal(questions.length,87);assert.equal(new Set(ids).size,87);assert.equal(d.querySelectorAll('.practice-box').length,87);
 assert.equal(chapter.diplom,undefined);assert.equal(w.currentChapterQuiz.questions.length,41);assert.equal(questions.filter(q=>q.practiceOnly).length,46);
 const before=JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])));
 // Integration checks verify every supplied answer is wired to its own feedback.
 // The truth of the authored explanations is a separate documented content review.
 for(const q of questions){
  assert.equal(q.answers.length,3,q.id);assert.equal(q.answers.filter(a=>a.correct).length,1,q.id);
  const box=d.querySelector(`.practice-box[data-id="${q.id}"]`);assert.ok(box,q.id);
  assert.equal(Number(box.closest('[data-chapter-section]').dataset.chapterSection),q.sectionIndex);
  const buttons=[...box.querySelectorAll('button')];assert.equal(buttons.length,3);
  for(const answer of q.answers){
   const btn=buttons.find(b=>b.textContent.trim()===answer.text);assert.ok(btn,q.id+' answer text');
   assert.equal(btn.dataset.feedback,answer.feedback);assert.match(btn.getAttribute('onclick'),new RegExp(`handlePracticeAnswer\\(this, ${answer.correct}`));
   w.handlePracticeAnswer(btn,answer.correct,btn.dataset.feedback);
   assert.equal(btn.classList.contains('is-correct'),answer.correct);assert.equal(btn.classList.contains('is-wrong'),!answer.correct);
   assert.equal(box.querySelector('.feedback').innerText,(answer.correct?'✅ ':'❌ ')+answer.feedback);
   assert.ok(buttons.every(b=>!b.disabled),'Practice stays retryable');
   assert.equal(box.querySelectorAll('.is-correct,.is-wrong').length,1,'Only latest choice is highlighted');
  }
  const assessed=w.currentChapterQuiz.questions.find(x=>x.id===q.id);assert.equal(!!assessed,!q.practiceOnly);
  if(assessed)assert.equal(assessed.sectionIndex,q.sectionIndex,'Review target follows topic section');
 }
 assert.equal(JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))),before);
 const finalTargets={astro_d1:0,astro_d4:6,astro_d_meteors:7,astro_d_small_bodies:8,astro_d5:13,astro_d6:18,astro_d7:17,astro_d8:19,astro_d9:20,astro_d10:21};
 for(const [id,index]of Object.entries(finalTargets))assert.equal(w.currentChapterQuiz.questions.find(q=>q.id===id).sectionIndex,index);
 for(const [index,q]of w.currentChapterQuiz.questions.entries()){
  for(let choice=0;choice<3;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{const answer=i===index?choice:question.answers.findIndex(a=>a.correct);d.querySelector(`input[name="chapter_q_${i}"][value="${answer}"]`).checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).astronomie;
   assert.equal(result.lastPercent,q.answers[choice].correct?100:98);assert.equal(result.contentRevision,4);
   assert.deepEqual(result.reviewQuestionIds,q.answers[choice].correct?[]:[q.id]);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 assert.equal(w.currentChapterResult('astronomie',{contentRevision:3,passed:true,bestPercent:100}).passed,false);
 assert.deepEqual([...d.querySelectorAll('[data-astronomy-source-comparison] tbody tr')].map(row=>[...row.cells].map(c=>c.textContent)),[['Saturn Facts','März 2025','274'],['Saturn Moons','August 2026','293']]);
 assert.doesNotMatch(chapter.sections[14].content,/insgesamt sind es nun 274/);assert.doesNotMatch(chapter.sections[16].content,/Er ist dunkelblau/);
 assert.match(chapter.sections[13].content,/nicht überall herrscht dünnes Gas/);
 assert.match(chapter.sections[16].content,/ox.ac.uk\/news\/2024-01-05/);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=astronomie',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));await new Promise(resolve=>setImmediate(resolve));
 assert.equal(pd.querySelectorAll('#ws-content > .question-block').length,41);
 const material=pd.getElementById('ws-physics-material');assert.equal(material.querySelectorAll('[data-astronomy-source-comparison] tbody tr').length,2);
 assert.equal(pd.querySelectorAll('.ws-paper-solution').length,4);assert.equal(pd.getElementById('ws-solutions').hidden,true);
 assert.doesNotMatch(material.textContent,/293 − 274 = 19/);assert.match(pd.getElementById('ws-solutions').textContent,/293 − 274 = 19/);
 paper.window.close();console.log('PASS: all 261 practice answer/feedback paths across 87 questions, repeatable choices without storage writes, all 123 assessed answer paths, 41 exact review targets including 10 relocated questions, revision 4, dated source table and separate paper solutions. Factual truth requires the documented editorial review.');
})().catch(error=>{console.error(error);process.exitCode=1;});
