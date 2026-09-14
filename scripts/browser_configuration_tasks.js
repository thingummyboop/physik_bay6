const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/configuration-tasks'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/topics/template.html?topic=dgb7_produktion');await page.locator('[data-configuration-workshop]').waitFor();
  const storage=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));
  const source=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8')).dgb7_produktion.sections.find(s=>s.id==='sec-config');
  const expected={dgb7_config_scope:1,dgb7_config_mute:2,dgb7_config_evidence:0};let answerPaths=0;
  for(const [id,correct]of Object.entries(expected)){
   const box=page.locator('.practice-box[data-id="'+id+'"]');assert.equal(await box.getByRole('button').count(),3);
   for(let i=0;i<3;i++){
    const button=box.getByRole('button',{name:source.quizzes.find(q=>q.id===id).answers[i].text,exact:true});await button.focus();await page.keyboard.press('Enter');
    assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),i===correct);assert.equal(await button.evaluate(e=>e.classList.contains('is-wrong')),i!==correct);
    assert.ok((await box.locator('.feedback').innerText()).length>45);assert.equal(await button.isDisabled(),false);answerPaths++;
   }
  }
  assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),storage);
  const widths=[];
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
   const dimensions=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(dimensions.scroll<=dimensions.client+1,JSON.stringify({width,theme,...dimensions}));
   for(const table of await page.locator('[data-configuration-protocol]').all()){
    assert.equal(await table.locator('tbody tr').count(),4);const bounds=await table.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);
   }
   widths.push({width,theme,...dimensions});
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.removeAttribute('data-theme'));
  await page.locator('[data-system-settings-tasks]').screenshot({path:path.join(output,'system-tasks-mobile.png')});
  await page.locator('[data-communication-settings-tasks]').screenshot({path:path.join(output,'communication-tasks-mobile.png')});
  await page.locator('[data-configuration-protocol="communication"]').screenshot({path:path.join(output,'protocol-mobile.png')});
  await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.equal(ids.length,13);
  for(const [i,id]of ids.entries()){
   const choice=id==='dgb7_config_evidence'?1:['dgb7_settings_scope','dgb7_media_scope','dgb7_config_scope'].includes(id)?1:['dgb7_settings_evidence','dgb7_media_framing','dgb7_config_mute'].includes(id)?2:0;
   await page.locator('input[name="chapter_q_'+i+'"][value="'+choice+'"]').check();
  }
  await page.locator('.chapter-submit-btn').click();const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb7_produktion);
  assert.equal(result.lastPercent,92);assert.equal(result.contentRevision,4);assert.deepEqual(result.reviewQuestionIds,['dgb7_config_evidence']);
  await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-4').evaluate(e=>e.contains(document.activeElement)));
  const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=dgb7_produktion');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('#ws-content>.question-block').count(),13);assert.equal(await paper.locator('[data-configuration-protocol] tbody tr').count(),8);
  assert.equal(await paper.locator('#ws-dgb-material [data-configuration-solution]').count(),0);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  await paper.locator('#ws-include-solutions').check();assert.match(await paper.locator('#ws-solutions').innerText(),/Ein Fall ohne Testnachricht bleibt ungeprüft/);
  await paper.pdf({path:path.join(output,'configuration-chapter.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),answerPaths,widths,result,pageErrors:errors,scope:'Nine native keyboard-operated practice answers, six viewport/theme states, 13-question check with targeted section review, paper content/solution separation and PDF export. No real operating-system or Teams settings were changed; classroom execution is unverified.'},null,2)+'\n');
  console.log('PASS: nine new answer paths by keyboard, six width/theme states, 92% thirteen-question check with exact configuration review, eight paper protocol rows and separated solutions. Actual OS/Teams execution remains unverified.');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
