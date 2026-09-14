const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/topics/template.html?topic=rechenbeispiele',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.currentChapterQuiz?.questions.length===12&&document.querySelector('[data-calculation-graph] svg'));
  const initialStorage=await page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
  const exercises={inputSec:[9000,4500,200],inputKg:[15,2,2.75],inputMeter:[2050,1950,2800],inputV:[30,2,10],inputS:[60,90,200],inputGraph:[5,0,3]};
  for(const [id,answers]of Object.entries(exercises)){
   const zone=page.locator(`[data-calculation="${id}"]`),input=zone.locator('input');
   for(const [index,answer]of answers.entries()){
    await input.fill(String(answer).replace('.',','));await input.press('Enter');
    assert.equal(await zone.getAttribute('data-result'),'correct',id+' '+index);
    assert.equal(await input.isDisabled(),false);assert.equal(await input.evaluate(el=>el===document.activeElement),true);
    if(id==='inputKg'&&index===2)await zone.screenshot({path:path.join(output,'calculation-mobile-mass.png')});
    if(id==='inputGraph'&&index===1)await zone.screenshot({path:path.join(output,'calculation-mobile-pause.png')});
    await input.fill(String(answer)+'abc');await input.press('Enter');assert.equal(await zone.getAttribute('data-result'),'invalid');
    await zone.getByRole('button',{name:'Andere Zahlen',exact:true}).click();
    assert.equal(await input.inputValue(),'');assert.equal(await input.evaluate(el=>el===document.activeElement),true);
   }
  }
  assert.deepEqual(await page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))),initialStorage);
  for(const [id,answers]of Object.entries(exercises)){await page.locator('#'+id).fill(String(answers[0]));await page.locator('#'+id).press('Enter');}
  assert.equal(await page.locator('.calculation-progress progress').getAttribute('value'),'6');
  await page.locator('#inputSec').fill('4500');assert.equal(await page.locator('.calculation-progress progress').getAttribute('value'),'5');
  const widths=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(widths.scroll<=widths.width+1);
  await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();
  const correct={q1:0,q2:1,q3:2,q4:1,q5:0,q6:1,q7:2,q8:0,q9:1,q10:2,q11:0,q12:2};
  const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));
  for(const [i,id]of ids.entries())await page.locator(`input[name="chapter_q_${i}"][value="${id==='q11'?1:correct[id]}"]`).check();
  await page.locator('.chapter-submit-btn').click();
  const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).rechenbeispiele);
  assert.equal(result.lastPercent,92);assert.equal(result.contentRevision,1);assert.deepEqual(result.reviewQuestionIds,['q11']);
  await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();
  assert.equal(await page.locator('#learning-section-5').evaluate(el=>el.contains(document.activeElement)),true);
  const paper=await context.newPage();await paper.goto(base+'/topics/worksheet.html?topic=rechenbeispiele',{waitUntil:'domcontentloaded'});
  await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('.ws-model-alternative').count(),6);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('.ws-paper-solution').count(),7);
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'calculation-practice-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:'18 native input/variant flows at 390px, mutable practice progress, no storage writes from practice, complete chapter check and exact review link, worksheet content controls. Screenshots require visual inspection.',widths,result,pageErrors:errors},null,2)+'\n');
  console.log('PASS: 18 mobile calculation variants, comma input and Enter, invalid input, editable answers and progress, preserved storage, 92% chapter check with exact repeat target, six worksheet tasks and seven separate solutions.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
