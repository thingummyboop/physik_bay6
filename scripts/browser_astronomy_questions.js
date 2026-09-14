const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
const chapter=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8')).astronomie;
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/topics/template.html?topic=astronomie',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.currentChapterQuiz?.questions.length===41);
  const storage=await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))));
  let paths=0;
  for(const q of chapter.sections.flatMap(s=>s.quizzes)){
   const box=page.locator(`.practice-box[data-id="${q.id}"]`);
   for(const answer of q.answers){
    const button=box.getByRole('button',{name:answer.text,exact:true});await button.click();
    assert.equal(await box.locator('.feedback').innerText(),(answer.correct?'✅ ':'❌ ')+answer.feedback);
    assert.equal(await button.isDisabled(),false);assert.equal(await box.locator('.is-correct,.is-wrong').count(),1);paths++;
   }
  }
  assert.equal(paths,261);assert.equal(await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))),storage);
  await page.locator('[data-astronomy-source-comparison]').screenshot({path:path.join(output,'astronomy-source-comparison-mobile.png')});
  await page.locator('.practice-box[data-id="astro_s15_saturn_p1"]').screenshot({path:path.join(output,'astronomy-source-question-mobile.png')});
  const widths=[];for(const width of [320,390,1280]){await page.setViewportSize({width,height:844});const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1);widths.push(size);}
  await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();
  const questions=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>({id:q.id,correct:q.answers.findIndex(a=>a.correct)})));
  for(const [i,q]of questions.entries())await page.locator(`input[name="chapter_q_${i}"][value="${q.id==='astro_d9'?(q.correct+1)%3:q.correct}"]`).check();
  await page.locator('.chapter-submit-btn').click();const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).astronomie);
  assert.equal(result.contentRevision,4);assert.equal(result.lastPercent,98);assert.deepEqual(result.reviewQuestionIds,['astro_d9']);
  await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-20').evaluate(el=>el.contains(document.activeElement)));
  const paper=await context.newPage();await paper.goto(base+'/topics/worksheet.html?topic=astronomie',{waitUntil:'domcontentloaded'});await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('#ws-content > .question-block').count(),41);assert.equal(await paper.locator('[data-astronomy-source-comparison] tbody tr').count(),2);
  assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('.ws-paper-solution').count(),4);
  if(process.env.SCIVERSE_ASTRONOMY_PDF){await paper.evaluate(()=>document.fonts.ready);await paper.pdf({path:process.env.SCIVERSE_ASTRONOMY_PDF,format:'A4',printBackground:true,preferCSSPageSize:true});}
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'astronomy-questions-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),practiceAnswerPaths:paths,scope:'All 261 native practice choices, repeatable feedback without storage writes, 41-question check with a relocated final question and exact review section, source table and paper toggles. Factual review and screenshot/PDF inspection are separate.',widths,result,pageErrors:errors},null,2)+'\n');
  console.log('PASS: all 261 native practice choices, editable feedback and stable storage, 98% chapter check with relocated question targeting section 20, widths 320/390/1280, source table and four paper solutions.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
