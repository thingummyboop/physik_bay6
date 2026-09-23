const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/device-decisions')),topic='dgb7_handeln';
const keys=require('./fixtures/dgb7_action_keys.json'),cases={device:[1,2],protection:[0,2],resources:[1,0]};
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];let decisions=0,answers=0;try{
 const p=await browser.newPage({viewport:{width:390,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/topics/template.html?topic='+topic);await p.locator('#chapter-quiz-launch').waitFor();const stored=await p.evaluate(()=>JSON.stringify(localStorage));
 for(const dark of [false,true])for(const width of [320,390,1280]){
  await p.setViewportSize({width,height:1000});await p.evaluate(d=>{if(d)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  for(const [name,answers]of Object.entries(cases)){
   const lab=p.locator('[data-device-lab="'+name+'"]'),select=lab.locator('select'),status=lab.locator('[role=status]');
   for(let n=0;n<2;n++){await select.selectOption(String(n));const card=lab.locator('[data-boundary-case]').nth(n);assert.equal(await card.isVisible(),true);for(let a=0;a<3;a++){const b=card.locator('button').nth(a);await b.focus();await p.keyboard.press('Enter');assert.equal((await status.textContent()).startsWith('Richtig:'),a===answers[n]);assert.equal(await b.evaluate(e=>e.scrollWidth<=e.clientWidth+1),true);decisions++;}if(width===390)await lab.screenshot({path:path.join(out,name+'-'+n+'-'+(dark?'dark':'light')+'.png')});}
   await lab.locator('[data-boundary-reset]').focus();await p.keyboard.press('Enter');assert.equal(await select.inputValue(),'0');assert.equal(await select.evaluate(e=>e===document.activeElement),true);
  }
  if(width===320)await p.locator('[data-device-system]').screenshot({path:path.join(out,'system-'+(dark?'dark':'light')+'.png')});
 }
 assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),stored);const questions=await p.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.deepEqual(questions,Object.keys(keys));
 for(const [n,id]of questions.entries())for(let a=0;a<3;a++){
  if(answers===0)await p.locator('#chapter-quiz-launch').click();else await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
  await p.evaluate(({keys,n})=>currentChapterQuiz.questions.forEach((q,j)=>{if(j!==n)document.querySelector(`input[name="chapter_q_${j}"][value="${keys[q.id]}"]`).checked=true;}),{keys,n});await p.locator(`input[name="chapter_q_${n}"][value="${a}"]`).check();await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
  const result=await p.evaluate(t=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[t],topic);assert.equal(result.lastPercent,a===keys[id]?100:88);assert.equal(result.contentRevision,1);assert.deepEqual(result.reviewQuestionIds,a===keys[id]?[]:[id]);answers++;
 }
 const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+topic);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);assert.equal(await paper.locator('[data-device-paper] .ai-paper-case').count(),6);await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,'dgb7_handeln-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
 assert.equal(decisions,108);assert.equal(answers,24);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),decisions,answers,chapterLayouts:6,resetAndFocus:true,workshopStorageUnchanged:true,errors},null,2));console.log('PASS: 108 native case decisions, 24 quiz answers, six chapter layouts, keyboard/reset/focus/storage and complete worksheet export.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
