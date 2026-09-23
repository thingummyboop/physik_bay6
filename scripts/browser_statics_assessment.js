'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const data=require('../lang/de.json').drehundstatik,keys=require('./fixtures/statics_assessment_keys.json');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/statics-assessment'));
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let practice=0,assessed=0;
 try{
  const p=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/topics/template.html?topic=drehundstatik');await p.waitForFunction(()=>window.currentChapterQuiz?.questions.length===17);
  const saved=await p.evaluate(()=>JSON.stringify(localStorage));
  for(const section of data.sections.filter(s=>s.level!=='extension'))for(const q of section.quizzes||[]){
   const box=p.locator('.practice-box[data-id="'+q.id+'"]');
   for(const [a,answer]of q.answers.entries()){
    const button=box.getByRole('button',{name:answer.text,exact:true});await button.focus();await button.press('Enter');
    assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),a===keys[q.id]);
    assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));practice++;
   }
  }
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
  for(const width of [320,390,1280])for(const dark of [false,true]){
   await p.setViewportSize({width,height:1000});
   await p.evaluate(d=>{document.documentElement.dataset.theme=d?'dark':'light';},dark);
   await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   await p.evaluate(()=>closeChapterQuiz());
   assert.deepEqual(await p.locator('.practice-box button').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<0||r.right>innerWidth+1||e.scrollWidth>e.clientWidth+1);}).map(e=>e.textContent)),[]);
   if(width===320&&dark)await p.locator('.practice-box[data-id="q3"]').screenshot({path:path.join(out,'equilibrium-320-dark.png'),style:'#score-board{visibility:hidden!important}'});
   await p.locator('#chapter-quiz-launch').click();
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
   assert.deepEqual(await p.locator('.chapter-question,.chapter-question label').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)),[]);
   if(width===1280&&!dark){const i=await p.evaluate(()=>currentChapterQuiz.questions.findIndex(q=>q.id==='dsh15'));await p.locator('.chapter-question').nth(i).screenshot({path:path.join(out,'lever-1280-light.png')});}
  }
  for(const [qid,key]of Object.entries(keys))for(let a=0;a<3;a++){
   if(await p.locator('[onclick="restartChapterQuiz()"]').isVisible())await p.locator('[onclick="restartChapterQuiz()"]').click();
   await p.evaluate(({qid,a,keys})=>currentChapterQuiz.questions.forEach((q,i)=>document.querySelector(`input[name="chapter_q_${i}"][value="${q.id===qid?a:keys[q.id]}"]`).checked=true),{qid,a,keys});
   await p.locator('.chapter-submit-btn').click();
   const result=await p.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).drehundstatik);
   assert.equal(result.lastPercent,a===key?100:94);assert.equal(result.contentRevision,5);assert.deepEqual(result.reviewQuestionIds,a===key?[]:[qid]);
   const feedback=await p.locator('#chapter-quiz-result').innerText();
   const source=[...data.diplom.questions,...data.sections.flatMap(s=>s.quizzes||[])].find(q=>q.id===qid);
   assert.ok(feedback.includes(source.answers[a].feedback));assessed++;
  }
  await p.goto(base+'/topics/worksheet.html?topic=drehundstatik');await p.waitForFunction(()=>document.querySelectorAll('#ws-content>.question-block').length===17);
  assert.equal(await p.locator('#ws-extension-questions>.question-block').count(),3);
  assert.equal(await p.locator('#ws-solutions').isVisible(),false);
  const options={format:'A4',printBackground:true,margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'}};
  await p.pdf({...options,path:path.join(out,'statics-student.pdf')});
  await p.locator('#ws-include-solutions').check();await p.pdf({...options,path:path.join(out,'statics-solutions.pdf')});
  assert.equal(practice,12);assert.equal(assessed,51);assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),layouts:6,practice,assessed,keyboardPractice:true,freePracticePreservesStorage:true,errors},null,2));
  console.log('PASS: six statics layouts, all 12 free keyboard choices and 51 graded choices with independent keys, revision 5, feedback and separate student/solution PDFs.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
