const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/evolution-assessment'));
const id='bio_1_evolution',source=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8'))[id],correct=id=>({bio_evolution_d1:1,bio_evolution_d2:2,bio_evolution_d3:1,bio_evolution_d4:2,bio_evolution_d6:1,bio_evolution_d8:2}[id]||0);
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/topics/template.html?topic='+id);await page.waitForFunction(()=>window.currentChapterQuiz?.questions.length===13);
  assert.equal(await page.locator('.bio-training-card').count(),15);const storage=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));let paths=0;
  for(const q of source.sections.flatMap(s=>s.quizzes)){
   const box=page.locator('.practice-box[data-id="'+q.id+'"]');
   for(const [i,answer]of q.answers.entries()){
    const button=box.getByRole('button',{name:answer.text,exact:true});await button.focus();await page.keyboard.press('Enter');assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),i===correct(q.id));assert.equal(await button.evaluate(e=>e.classList.contains('is-wrong')),i!==correct(q.id));assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));assert.equal(await button.isDisabled(),false);paths++;
   }
  }
  assert.equal(paths,42);assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),storage);
  const layouts=[];for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));layouts.push({theme,...size});
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.removeAttribute('data-theme'));
  await page.locator('#learning-section-1 .bio-training-card').nth(1).screenshot({path:path.join(out,'model-task-mobile.png')});await page.locator('#learning-section-4 .bio-training-card').nth(1).screenshot({path:path.join(out,'nested-groups-mobile.png')});await page.locator('.practice-box[data-id="bio_evolution_d8"]').screenshot({path:path.join(out,'ancestry-question-mobile.png')});
  const attempts=[];
  for(const [wrong,section]of [['bio_evolution_d2',1],['bio_evolution_d8',4]]){
   await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();if(attempts.length)await page.locator('[onclick="restartChapterQuiz()"]').click();const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));
   for(const [i,q]of ids.entries())await page.locator('input[name="chapter_q_'+i+'"][value="'+(q===wrong?0:correct(q))+'"]').check();
   await page.locator('.chapter-submit-btn').click();const result=await page.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],id);assert.equal(result.lastPercent,92);assert.equal(result.contentRevision,3);assert.deepEqual(result.reviewQuestionIds,[wrong]);attempts.push({wrong,section,result});
   await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-'+section).evaluate(e=>e.contains(document.activeElement)));
  }
  const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+id);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('#ws-content>.question-block').count(),13);assert.equal(await paper.locator('#ws-biology-material .bio-training-card').count(),15);assert.equal(await paper.locator('#ws-biology-material .ws-glossary-entry').count(),20);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,'evolution.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  const plant=await context.newPage();plant.on('pageerror',e=>errors.push(e.message));await plant.goto(base+'/topics/template.html?topic=bio_1_bluetenpflanzen');await plant.locator('.bio-training-card').first().waitFor();assert.equal(await plant.locator('.bio-training-card').count(),15);const plantLayouts=[];
  for(const width of [320,390,1280])for(const theme of ['light','dark']){await plant.setViewportSize({width,height:900});await plant.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);const size=await plant.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1);plantLayouts.push({theme,...size});}
  await plant.setViewportSize({width:390,height:844});await plant.evaluate(()=>document.documentElement.removeAttribute('data-theme'));await plant.locator('.bio-training-card').nth(1).screenshot({path:path.join(out,'plant-task-mobile.png')});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),paths,layouts,plantLayouts,attempts,pageErrors:errors,scope:'All 42 evolution practice options operated by keyboard, 15 evolution and 15 restored plant tasks, twelve width/theme states, two 13-question checks with exact review focus, evolution paper tasks/glossary/answer separation and PDF export. No full factual/image/accessibility/classroom audit.'},null,2)+'\n');console.log('PASS: all 42 evolution practice options, twelve width/theme states, two 92% chapter checks with exact review, 30 rendered tasks across evolution and plants, evolution paper tasks and glossary.');await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
