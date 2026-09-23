const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const data=require('../lang/de.json'),lensKeys=require('./fixtures/optics_research_keys.json'),base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/physics-core-scope'));
const keys={optik1:{o1_s5_q1:0,o1_ch10:0,o1_ch11:0},farben:{farben_extra_itten_q0:0,farben_extra_struktur_q0:1,farben_ch11:0,farben_s1_q0:0,farben_ch1:0},linsen_spiegel:Object.fromEntries(Object.entries(lensKeys).slice(17)),akustik:{q6:1,f13:0,f14:0}},counts={optik1:21,farben:14,linsen_spiegel:17,akustik:22};
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let practiceAnswers=0,layouts=0;try{
 const p=await browser.newPage({viewport:{width:390,height:1000}});p.on('pageerror',e=>errors.push(e.message));
 for(const id of Object.keys(counts)){
  await p.goto(base+'/topics/template.html?topic='+id);await p.waitForFunction(n=>window.currentChapterQuiz?.questions.length===n,counts[id]);
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  for(const width of [320,390,1280])for(const dark of [false,true]){
   await p.setViewportSize({width,height:1000});await p.evaluate(d=>{if(d)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);
   await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,id+' overflow '+width);
   for(const selector of ['[data-core-intro]','[data-learning-level="extension"]']){
    assert.equal(await p.locator(selector).first().evaluate(e=>e.getBoundingClientRect().right<=innerWidth+1),true);
    if(width===320&&dark===false){await p.locator(selector).first().evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.evaluate(()=>scrollBy(0,-85));await p.screenshot({path:path.join(out,id+(selector.includes('intro')?'-intro':'-extension')+'-320.png'),animations:'disabled'});}
   }layouts++;
  }
  const disclosure=p.locator('[data-core-intro] details').first();await disclosure.locator('summary').focus();await p.keyboard.press('Enter');assert.equal(await disclosure.evaluate(e=>e.open),true);await p.keyboard.press('Enter');assert.equal(await disclosure.evaluate(e=>e.open),false);
  await p.locator('[data-core-intro] [data-assessment-scope]').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.evaluate(()=>scrollBy(0,-85));await p.screenshot({path:path.join(out,id+'-scope-1280-dark.png'),animations:'disabled'});
  const saved=await p.evaluate(()=>JSON.stringify(localStorage));
  for(const [qid,key]of Object.entries(keys[id])){
   const q=data[id].sections.flatMap(s=>s.quizzes||[]).find(q=>q.id===qid),box=p.locator('.practice-box[data-id="'+qid+'"]');assert.equal(await box.count(),1);
   for(const [i,a]of q.answers.entries()){const b=box.getByRole('button',{name:a.text,exact:true});await b.focus();await p.keyboard.press('Enter');assert.equal(await b.evaluate(e=>e.classList.contains('is-correct')),i===key,id+':'+qid+':'+i);assert.ok((await box.locator('.feedback').innerText()).includes(a.feedback));practiceAnswers++;}
  }
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved,'extension exercise never changes progress');
  await p.locator('#chapter-quiz-launch').click();assert.equal(await p.locator('.chapter-question').count(),counts[id]);assert.equal(await p.locator('#chapter-quiz-panel [data-assessment-scope]').isVisible(),true);
  await p.evaluate(()=>currentChapterQuiz.questions.forEach((q,i)=>document.querySelector(`input[name="chapter_q_${i}"][value="${q.answers.findIndex(a=>a.correct)}"]`).checked=true));await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
  const result=await p.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],id);assert.equal(result.lastPercent,100);assert.equal(result.passed,true);
  await p.goto(base+'/topics/worksheet.html?topic='+id);await p.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await p.locator('#ws-content>.question-block').count(),counts[id]);assert.equal(await p.locator('#ws-extension-questions>.question-block').count(),Object.keys(keys[id]).length);assert.equal(await p.locator('#ws-solutions').isVisible(),false);
  const options={format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}};
  await p.pdf({...options,path:path.join(out,id+'-student.pdf')});await p.locator('#ws-include-solutions').check();await p.pdf({...options,path:path.join(out,id+'-solutions.pdf')});
 }
 const plan=Object.keys(counts).join(',');await p.goto(base+'/topics/learning.html?mode=teach&plan='+plan);await p.waitForSelector('#selected [data-assessment-scope]');assert.equal(await p.locator('#selected [data-assessment-scope]').count(),4);
 await p.setViewportSize({width:320,height:1000});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);await p.locator('#plan').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.screenshot({path:path.join(out,'teacher-plan-320.png'),animations:'disabled'});
 await p.locator('#share').click();const link=await p.locator('#share-wrap input').inputValue();assert.ok(link.includes(encodeURIComponent(plan)));await p.goto(link);
 const shared=p.frameLocator('#game-frame');await shared.locator('#selected [data-assessment-scope]').first().waitFor();assert.equal(await shared.locator('#selected [data-assessment-scope]').count(),4);assert.deepEqual(await shared.locator('#selected [data-focus-key^="plan-open-"]').evaluateAll(es=>es.map(e=>e.dataset.focusKey.slice(10))),Object.keys(counts));
 // Also verify the standalone page used for printing the shared plan.
 const hash=new URL(link).hash.slice(1);await p.goto(base+'/'+hash);await p.waitForSelector('#selected [data-assessment-scope]');assert.equal(await p.locator('#selected [data-assessment-scope]').count(),4);
 await p.locator('[data-mode="teach"]').click();await p.pdf({path:path.join(out,'teacher-plan.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
 assert.deepEqual(errors,[]);const report={time:new Date().toISOString(),practiceAnswers,layouts,coreQuestions:74,extensionQuestions:26,teacherPlan:true,errors};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log('PASS '+JSON.stringify(report));
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
