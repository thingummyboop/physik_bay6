const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/topics/template.html?topic=astronomie',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-orbit-workshop]')?.dataset.initialized==='true');
  const storage=await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))));
  const kepler=page.locator('#keplerTime'),orbit=page.locator('#orbitCase');
  await kepler.focus();await kepler.press('Home');
  for(let i=0;i<=8;i++){
   if(i)await kepler.press('ArrowDown');assert.equal(await kepler.inputValue(),String(i));
   assert.ok((await page.locator('[data-kepler-status]').innerText()).includes(`Zeit: ${i}/8`));
   assert.equal(await page.locator('[data-kepler-table] [aria-current=true]').count(),1);
   if(i===1)await page.locator('[data-kepler-workshop]').screenshot({path:path.join(output,'astronomy-kepler-mobile.png')});
  }
  await page.getByRole('button',{name:'Zum Start zurück',exact:true}).click();assert.equal(await kepler.inputValue(),'0');assert.ok(await kepler.evaluate(el=>el===document.activeElement));
  const tableScroll=page.locator('[data-kepler-table]').locator('..');
  await tableScroll.focus();assert.equal(await tableScroll.getAttribute('role'),'region');
  assert.ok((await tableScroll.getAttribute('aria-label')).includes('Berechnete Modellwerte'));
  await tableScroll.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-kepler-table]').parentElement.scrollLeft>0);
  const kinds=['impact','ellipse','circle','ellipse','escape','escape'];
  await orbit.focus();await orbit.press('Home');
  for(let i=0;i<6;i++){
   if(i)await orbit.press('ArrowDown');assert.equal(await orbit.inputValue(),String(i));
   assert.equal(await page.locator('[data-orbit-workshop]').getAttribute('data-orbit-kind'),kinds[i]);
   if(i===1||i===4)await page.locator('[data-orbit-workshop]').screenshot({path:path.join(output,`astronomy-orbit-${i}-mobile.png`)});
  }
  await page.getByRole('button',{name:'Zur Kreisbahn zurück',exact:true}).click();assert.equal(await orbit.inputValue(),'2');assert.ok(await orbit.evaluate(el=>el===document.activeElement));
  assert.equal(await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))),storage);
  const widths=[];
  for(const width of [390,320,1280]){await page.setViewportSize({width,height:844});const sizes=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));widths.push(sizes);assert.ok(sizes.scroll<=sizes.width+1);}
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();
  const questions=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>({id:q.id,correct:q.answers.findIndex(a=>a.correct)})));
  assert.equal(questions.length,39);
  for(const [i,q]of questions.entries())await page.locator(`input[name="chapter_q_${i}"][value="${q.id==='astro_s4_p1'?1:q.correct}"]`).check();
  await page.locator('.chapter-submit-btn').click();
  const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).astronomie);
  assert.equal(result.lastPercent,97);assert.equal(result.contentRevision,3);assert.deepEqual(result.reviewQuestionIds,['astro_s4_p1']);
  await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();
  assert.ok(await page.locator('#learning-section-3').evaluate(el=>el.contains(document.activeElement)));
  const paper=await context.newPage();await paper.goto(base+'/topics/worksheet.html?topic=astronomie',{waitUntil:'domcontentloaded'});
  await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('.ws-model-alternative').count(),2);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('.ws-paper-solution').count(),3);
  if(process.env.SCIVERSE_ORBIT_PDF){await paper.evaluate(()=>document.fonts.ready);await paper.pdf({path:process.env.SCIVERSE_ORBIT_PDF,format:'A4',printBackground:true,preferCSSPageSize:true});}
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'astronomy-orbits-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:'Native keyboard selection of nine Kepler times and six launch cases, resets/focus, no practice storage writes, 39-question check and exact review section, paper alternatives. Screenshots/PDF require visual inspection.',widths,result,pageErrors:errors},null,2)+'\n');
  console.log('PASS: nine Kepler times and six orbit cases via keyboard, reset/focus, widths 320/390/1280, 97% chapter check and section 3 review, two paper alternatives and separate solutions.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
