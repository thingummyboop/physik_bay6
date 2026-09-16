const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/flowering-plants'));
const id='bio_1_bluetenpflanzen',source=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8'))[id];
const correct=id=>({bio_pflanzen_s1:1,bio_pflanzen_s2:2,bio_pflanzen_s4:2,bio_pflanzen_s5:1,bio_pflanzen_d1:1,bio_pflanzen_d3:2,bio_pflanzen_d4:1,bio_pflanzen_d6:2,'bio_1_bluetenpflanzen_extra_bestäubung':1}[id]||0);
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/topics/template.html?topic='+id);await page.waitForFunction(()=>window.currentChapterQuiz?.questions.length===11);
  assert.equal(await page.locator('.bio-training-card').count(),15);const storage=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));let paths=0;
  for(const q of source.sections.flatMap(s=>s.quizzes)){
   const box=page.locator('.practice-box[data-id="'+q.id+'"]');
   for(const [i,answer]of q.answers.entries()){
    const button=box.getByRole('button',{name:answer.text,exact:true});await button.focus();await page.keyboard.press('Enter');assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),i===correct(q.id));assert.equal(await button.evaluate(e=>e.classList.contains('is-wrong')),i!==correct(q.id));assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));assert.equal(await button.isDisabled(),false);paths++;
   }
  }
  assert.equal(paths,36);
  const zone=page.locator('[data-core-experiment="pollen-stages"]'),control=zone.locator('select'),expected=[[],['grain'],['grain','tube','male'],['grain','tube','fusion']];
  const layouts=[];
  for(const width of [320,390,1280])for(const theme of ['light','dark'])for(const stage of [0,1,2,3]){
   await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);await control.selectOption(String(stage));
   assert.deepEqual(await zone.locator('[data-pollen-part]').evaluateAll(nodes=>nodes.filter(e=>getComputedStyle(e).display!=='none').map(e=>e.dataset.pollenPart)),expected[stage]);
   assert.equal(await zone.locator('[data-pollen-egg-label]').textContent(),stage===3?'befruchtete Eizelle':'Eizelle');
   const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));layouts.push({theme,stage,...size});
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.removeAttribute('data-theme'));
  await control.focus();await page.keyboard.press('Home');assert.equal(await control.inputValue(),'0');await page.keyboard.press('ArrowDown');assert.equal(await control.inputValue(),'1');await page.keyboard.press('End');assert.equal(await control.inputValue(),'3');assert.ok((await zone.locator('[data-pollen-result]').innerText()).includes('verschmolzen'));
  await zone.screenshot({path:path.join(out,'fertilization-mobile.png')});await control.selectOption('2');await zone.screenshot({path:path.join(out,'pollen-tube-mobile.png')});
  await page.evaluate(()=>enhanceCoreLearning({},'bio_1_bluetenpflanzen','de'));assert.equal(await control.inputValue(),'2');await zone.getByRole('button',{name:'Zur Orientierung',exact:true}).focus();await page.keyboard.press('Enter');assert.equal(await control.inputValue(),'0');assert.equal(await control.evaluate(e=>document.activeElement===e),true);assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),storage);
  const attempts=[];
  for(const [wrong,section]of [['bio_pflanzen_d1',2],['bio_pflanzen_d4',3]]){
   await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();if(attempts.length)await page.locator('[onclick="restartChapterQuiz()"]').click();const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));
   for(const [i,q]of ids.entries())await page.locator('input[name="chapter_q_'+i+'"][value="'+(q===wrong?0:correct(q))+'"]').check();
   await page.locator('.chapter-submit-btn').click();const result=await page.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],id);assert.equal(result.lastPercent,91);assert.equal(result.contentRevision,2);assert.deepEqual(result.reviewQuestionIds,[wrong]);attempts.push({wrong,section,result});
   await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-'+section).evaluate(e=>e.contains(document.activeElement)));
  }
  const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+id);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('#ws-content>.question-block').count(),11);assert.equal(await paper.locator('#ws-biology-material .bio-training-card').count(),15);assert.equal(await paper.locator('#ws-biology-material .ws-glossary-entry').count(),25);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  assert.equal(await paper.locator('#ws-content [data-pollen-tasks] li').count(),4);assert.equal(await paper.locator('#ws-content svg[data-pollen-diagram]').count(),1);assert.equal(await paper.locator('#ws-content svg [data-pollen-part="male"]').getAttribute('display'),null);assert.equal(await paper.locator('#ws-content svg [data-pollen-part="fusion"]').getAttribute('display'),'none');assert.equal(await paper.locator('#ws-content [data-pollen-stage]').count(),0);
  assert.equal(await paper.locator('[data-germination-record] tbody tr').count(),7);assert.equal(await paper.locator('[data-germination-tasks] li').count(),4);
  await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('#ws-solutions').isVisible(),true);await paper.pdf({path:path.join(out,'flowering-plants.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),paths,layouts,attempts,pageErrors:errors,scope:'36 practice answers via native keyboard; 24 pollen stage/width/theme states; keyboard navigation/reset/focus and no quiz storage writes; two 11-question checks with exact review; static paper diagram, 15 authored tasks, 25 glossary entries, four model tasks, separated solutions and PDF export. No whole-chapter image/license audit or classroom trial.'},null,2)+'\n');console.log('PASS: 36 native practice answers, 24 model/layout states, keyboard/reset/storage, two 91% chapter checks, paper diagram/tasks/glossary and PDF.');await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
