const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const data=require('../lang/de.json'),cases=require('./fixtures/physics_year3_keys.json'),base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/physics-year3'));
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let assessed=0,practice=0,layouts=0;try{
 const p=await browser.newPage({viewport:{width:390,height:1000}});p.on('pageerror',e=>errors.push(e.message));
 for(const [id,x]of Object.entries(cases)){
  await p.goto(base+'/topics/template.html?topic='+id);await p.waitForFunction(n=>window.currentChapterQuiz?.questions.length===n,x.count);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const selector=id==='kraft_und_bewegung'?'[data-force-stations]':id==='elektromagnetismus'?'[data-motor-research-intro]':'[data-learning-level="extension"]';
  for(const width of [320,390,1280])for(const dark of [false,true]){
   await p.setViewportSize({width,height:1000});await p.evaluate(d=>{if(d)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,id+' page overflow '+width);
   if(width===320&&!dark||width===1280&&dark){await p.locator(selector).first().evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.evaluate(()=>scrollBy(0,-85));await p.screenshot({path:path.join(out,id+'-'+width+'-'+(dark?'dark':'light')+'.png'),animations:'disabled'});}
   layouts++;
  }
  if(id==='kraft_und_bewegung'){
   await p.setViewportSize({width:320,height:1000});for(const marker of ['[data-force-station-protocol]','[data-mobility-options]']){const region=p.locator(marker).locator('..');await region.focus();await p.keyboard.press('End');assert.ok(await region.evaluate(e=>e.scrollWidth>e.clientWidth));await p.keyboard.press('ArrowRight');await p.waitForFunction(selector=>document.querySelector(selector).parentElement.scrollLeft>0,marker);}
   await p.locator('[data-mobility-case]').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.evaluate(()=>scrollBy(0,-85));await p.screenshot({path:path.join(out,'mobility-320-dark.png'),animations:'disabled'});
  }
  const saved=await p.evaluate(()=>JSON.stringify(localStorage));
  for(const [qid,key]of Object.entries({...x.keys,...x.extra})){
   const q=data[id].sections.flatMap(s=>s.quizzes||[]).find(q=>q.id===qid),box=p.locator('.practice-box[data-id="'+qid+'"]');assert.equal(await box.count(),1);
   for(const [a,answer]of q.answers.entries()){const b=box.getByRole('button',{name:answer.text,exact:true});await b.focus();await p.keyboard.press('Enter');assert.equal(await b.evaluate(e=>e.classList.contains('is-correct')),a===key);assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));practice++;}
  }assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
  for(const [qid,key]of Object.entries(x.keys))for(let a=0;a<3;a++){
   if(await p.locator('#chapter-quiz-launch').isVisible())await p.locator('#chapter-quiz-launch').click();if(await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').isVisible())await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
   const index=await p.evaluate(({qid,keys})=>{currentChapterQuiz.questions.forEach((q,i)=>document.querySelector(`input[name="chapter_q_${i}"][value="${q.id in keys?keys[q.id]:q.answers.findIndex(a=>a.correct)}"]`).checked=true);return currentChapterQuiz.questions.findIndex(q=>q.id===qid);},{qid,keys:x.keys});await p.locator(`input[name="chapter_q_${index}"][value="${a}"]`).check();await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
   const result=await p.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],id);assert.equal(result.lastPercent,a===key?100:Math.round(100*(x.count-1)/x.count));assert.equal(result.contentRevision,x.revision);assert.deepEqual(result.reviewQuestionIds,a===key?[]:[qid]);
   if(a!==key){await p.locator('#chapter-quiz-result button[onclick="reviewChapterSection('+x.sections[qid]+')"]').click();assert.equal(await p.locator('[data-chapter-section="'+x.sections[qid]+'"] h2').evaluate(e=>document.activeElement===e),true);}assessed++;
  }
  await p.goto(base+'/topics/worksheet.html?topic='+id);await p.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await p.locator('#ws-content>.question-block').count(),x.count);assert.equal(await p.locator('#ws-extension-questions>.question-block').count(),Object.keys(x.extra||{}).length);assert.equal(await p.locator('#ws-solutions').isVisible(),false);
  const options={format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}};await p.pdf({...options,path:path.join(out,id+'-student.pdf')});await p.locator('#ws-include-solutions').check();await p.pdf({...options,path:path.join(out,id+'-solutions.pdf')});
 }
 await p.goto(base+'/topics/learning.html?mode=teach&plan=arbeit,kraft_und_bewegung,elektromagnetismus');await p.locator('#selected [data-focus-key="plan-open-arbeit"]').waitFor();await p.locator('#subject').selectOption('physik');await p.locator('#grade').selectOption('7');assert.deepEqual(await p.locator('#chapters [data-focus-key^="catalog-open-"]').evaluateAll(es=>es.map(e=>e.dataset.focusKey.slice(13))),['sieinheiten','kraft_und_bewegung','energie','elektrizitaet','elektromagnetismus','arbeit','drehundstatik']);assert.deepEqual(await p.locator('#selected [data-focus-key^="plan-open-"]').evaluateAll(es=>es.map(e=>e.dataset.focusKey.slice(10))),['arbeit','kraft_und_bewegung','elektromagnetismus']);
 assert.equal(assessed,21);assert.equal(practice,42);assert.deepEqual(errors,[]);const report={time:new Date().toISOString(),assessed,practice,layouts,keyboard:true,scope:true,catalogOrder:true,teacherPlanUnchanged:true,errors};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log('PASS '+JSON.stringify(report));
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
