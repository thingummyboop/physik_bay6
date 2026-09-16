const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/profile-traces'));
const keys={dgb8_information_q1:1,dgb8_information_q2:2,dgb8_trace_inference:0,dgb8_trace_purpose:1,dgb8_information_q3:0,dgb8_information_q4:2};
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];try{
 const page=await browser.newPage({viewport:{width:390,height:900}});page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/topics/template.html?topic=dgb8_information');await page.locator('[data-trace-result][id]').waitFor();
 const lab=page.locator('.trace-workshop'),inputs=lab.locator('[data-trace-toggle]'),context=lab.locator('[data-trace-context]'),stored=await page.evaluate(()=>JSON.stringify(localStorage));let states=0;
 for(const dark of [false,true])for(const width of [320,390,1280]){
  await page.setViewportSize({width,height:900});await page.evaluate(value=>{if(value)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);await page.waitForFunction(value=>getComputedStyle(document.body).color===(value?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
  for(let mask=0;mask<8;mask++)for(const open of [false,true]){
   for(let i=0;i<3;i++)await inputs.nth(i).setChecked(!!(mask&(1<<i)));
   if(await context.evaluate(e=>e.open)!==open){await context.locator('summary').focus();await page.keyboard.press('Enter');}
   const a=(mask&1?2:0)+(mask&2?1:0),b=(mask&2?1:0)+(mask&4?2:0);
   assert.equal(await lab.locator('[data-trace-count="Outdoor"]').textContent(),String(a));assert.equal(await lab.locator('[data-trace-count="Gestalten"]').textContent(),String(b));
   assert.equal(await lab.locator('[data-trace-events] tbody tr:visible').count(),a+b);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);states++;
  }
  if(width===390){await lab.screenshot({path:path.join(out,'traces-'+(dark?'dark':'light')+'.png')});}
 }
 await lab.locator('[data-trace-reset]').focus();await page.keyboard.press('Enter');assert.equal(await inputs.nth(0).evaluate(e=>e===document.activeElement),true);assert.equal(await context.evaluate(e=>e.open),false);assert.equal(await inputs.evaluateAll(nodes=>nodes.every(e=>!e.checked)),true);assert.equal(await page.evaluate(()=>JSON.stringify(localStorage)),stored);
 await inputs.nth(0).focus();await page.keyboard.press('Space');assert.equal(await lab.locator('[data-trace-count="Outdoor"]').textContent(),'2');
 const questions=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));let answers=0;
 for(const [index,id]of questions.entries())for(let choice=0;choice<3;choice++){
  if(answers===0)await page.locator('#chapter-quiz-launch').click();else await page.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
  await page.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,n)=>{if(n!==index)document.querySelector(`input[name="chapter_q_${n}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});
  await page.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await page.locator('#chapter-quiz-panel .chapter-submit-btn').click();const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb8_information);assert.equal(result.lastPercent,choice===keys[id]?100:83);assert.deepEqual(result.reviewQuestionIds,choice===keys[id]?[]:[id]);answers++;
 }
 const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=dgb8_information');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('[data-trace-paper]').count(),1);assert.equal(await paper.locator('[data-trace-protocol] tbody tr').count(),5);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,'traces-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),states,answers,reset:true,storageUnchanged:true,errors},null,2));console.log('PASS: 96 native source/context/width/theme states, independent counts, disclosure/checkbox keyboard use, reset/focus/storage, 18 assessed answers and worksheet export.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
