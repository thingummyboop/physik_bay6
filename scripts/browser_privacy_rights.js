const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/privacy-rights'));
const sets={dgb8_kommunikation:require('./fixtures/dgb8_communication_keys.json'),dgb8_handeln:require('./fixtures/dgb8_action_keys.json')},caseKeys=[1,0,2,1];
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];let decisions=0,answers=0;try{
 const p=await browser.newPage({viewport:{width:390,height:900}});p.on('pageerror',e=>errors.push(e.message));
 for(const [topic,keys]of Object.entries(sets)){
  await p.goto(base+'/topics/template.html?topic='+topic);await p.locator('#chapter-quiz-launch').waitFor();const stored=await p.evaluate(()=>JSON.stringify(localStorage));
  for(const dark of [false,true])for(const width of [320,390,1280]){
   await p.setViewportSize({width,height:1000});await p.evaluate(value=>{if(value)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);await p.waitForFunction(value=>getComputedStyle(document.body).color===(value?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
   if(topic==='dgb8_kommunikation'){
    const lab=p.locator('[data-privacy-lab]'),select=lab.locator('select'),result=lab.locator('[role=status]');
    for(let c=0;c<4;c++){
     await select.selectOption(String(c));assert.equal(await lab.locator('[data-boundary-case]:visible').count(),1);assert.match(await result.textContent(),/Lies den Fall/);
     const buttons=lab.locator('[data-boundary-case]').nth(c).locator('button');
     for(let choice=0;choice<3;choice++){await buttons.nth(choice).focus();await p.keyboard.press('Enter');assert.equal((await result.textContent()).startsWith('Richtig:'),choice===caseKeys[c]);assert.equal(await buttons.nth(choice).evaluate(e=>e.scrollWidth<=e.clientWidth+1),true);decisions++;}
    }
    if(width===390)await lab.screenshot({path:path.join(out,'privacy-'+(dark?'dark':'light')+'.png')});
    if(width===320&&!dark)await p.locator('[data-privacy-rights]').screenshot({path:path.join(out,'rights-320.png')});
    await lab.locator('[data-boundary-reset]').focus();await p.keyboard.press('Enter');assert.equal(await select.inputValue(),'0');assert.equal(await select.evaluate(e=>e===document.activeElement),true);
   }else if(width===390)await p.locator('[data-consumer-law]').screenshot({path:path.join(out,'extra-'+(dark?'dark':'light')+'.png')});
  }
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),stored);
  const questions=await p.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.deepEqual(questions,Object.keys(keys));let localAnswers=0;
  for(const [index,id]of questions.entries())for(let choice=0;choice<3;choice++){
   if(localAnswers===0)await p.locator('#chapter-quiz-launch').click();else await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
   await p.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,n)=>{if(n!==index)document.querySelector(`input[name="chapter_q_${n}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});await p.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
   const result=await p.evaluate(topic=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[topic],topic);assert.equal(result.lastPercent,choice===keys[id]?100:topic==='dgb8_kommunikation'?91:89);assert.equal(result.contentRevision,2);assert.deepEqual(result.reviewQuestionIds,choice===keys[id]?[]:[id]);localAnswers++;answers++;
  }
  const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+topic);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);if(topic==='dgb8_kommunikation')assert.equal(await paper.locator('[data-privacy-paper] .ai-paper-case').count(),4);await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,topic+'-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});await paper.close();
 }
 assert.equal(decisions,72);assert.equal(answers,60);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),decisions,answers,chapterLayouts:12,resetAndFocus:true,workshopStorageUnchanged:true,errors},null,2));console.log('PASS: 72 native privacy decisions, 12 chapter layouts, keyboard/reset/focus/storage, all 60 independent quiz answers across both revised chapters and two complete worksheet exports.');
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
