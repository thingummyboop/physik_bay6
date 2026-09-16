const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/biology-orientation'));
const topic='bio_2_uebersicht',keys={bio_2_uebersicht_s1:1,bio2_orientation_levels:2,bio_2_uebersicht_s2:0,bio2_orientation_sampling:2,bio_2_uebersicht_s3:1,bio2_orientation_compare:0,bio_2_uebersicht_s4:2,bio2_orientation_transfer:1};
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[];try{
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/topics/template.html?topic='+topic);await page.locator('[data-boundary-control]').waitFor();const control=page.locator('[data-boundary-control]'),result=page.locator('[data-boundary-result]');
 const stored=await page.evaluate(()=>JSON.stringify(localStorage));
 for(let c=0;c<3;c++){await control.selectOption(String(c));for(let choice=0;choice<3;choice++){const button=page.locator('[data-boundary-case]').nth(c).locator('button').nth(choice);await button.focus();await page.keyboard.press('Enter');assert.equal((await result.textContent()).startsWith('Passender nächster Schritt:'),choice===[1,2,0][c]);}}
 await page.locator('[data-boundary-reset]').focus();await page.keyboard.press('Enter');assert.equal(await control.inputValue(),'0');assert.equal(await control.evaluate(e=>e===document.activeElement),true);assert.equal(await page.evaluate(()=>JSON.stringify(localStorage)),stored);
 for(const dark of [false,true])for(const width of [320,390,1280]){
  await page.setViewportSize({width,height:900});await page.evaluate(value=>{if(value)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);
  await page.waitForFunction(value=>getComputedStyle(document.body).color===(value?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
  for(let c=0;c<3;c++){await control.selectOption(String(c));const zone=page.locator('.bio-orientation-lab');await zone.scrollIntoViewIfNeeded();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);for(const button of await page.locator('[data-boundary-case]').nth(c).locator('button').all())assert.ok((await button.boundingBox()).height>=44);layouts.push({dark,width,case:c});}
  if(width===390){await control.selectOption('0');await page.locator('.bio-orientation-lab').screenshot({path:path.join(out,'workshop-'+(dark?'dark':'light')+'.png')});}
 }
 const questions=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>({id:q.id,section:q.sectionIndex})));assert.equal(questions.length,8);let answers=0;
 for(const [index,q]of questions.entries())for(let choice=0;choice<3;choice++){
  if(answers===0)await page.locator('#chapter-quiz-launch').click();else await page.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
  await page.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,n)=>{if(n!==index)document.querySelector(`input[name="chapter_q_${n}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});
  await page.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await page.locator('#chapter-quiz-panel button[onclick="submitChapterQuiz()"]').click();
  const r=await page.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],topic);assert.equal(r.lastPercent,choice===keys[q.id]?100:88);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id]?[]:[q.id]);answers++;
 }
 const plan=[topic,'bio_2_zellen','bio_2_pflanzenorgane_fotosynthese'].join(',');await page.goto(base+'/index.html#topics/template.html?'+new URLSearchParams({topic,mode:'review',plan}));
 let frame=page.frameLocator('#game-frame');const route=frame.locator('[data-orientation-route] [data-learning-chapter="bio_2_zellen"]');await route.focus();await page.keyboard.press('Enter');await page.waitForURL(/topic=bio_2_zellen/);frame=page.frameLocator('#game-frame');await frame.locator('[data-cell-comparison]').waitFor();
 const next=frame.locator('[data-chapter-continuation] a').filter({hasText:'Nächstes Kapitel'});assert.ok((await next.getAttribute('href')).includes('topic=bio_2_pflanzenorgane_fotosynthese'));assert.ok((await next.getAttribute('href')).includes(encodeURIComponent(plan)));
 const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+topic);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('.orientation-paper-case').count(),3);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('#ws-solutions').isVisible(),true);
 await paper.pdf({path:path.join(out,'orientation-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),decisions:9,answers,layouts,route:true,errors},null,2));console.log('PASS: 9 native investigation decisions, 24 chapter answers, 18 layouts, reset/focus/storage, selected route via cells to photosynthesis and worksheet export.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
