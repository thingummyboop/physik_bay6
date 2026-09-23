const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const keys=require('./fixtures/radiation_workshop_keys.json'),data=require('../lang/de.json').strahlung_radioaktivitaet;
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(__dirname,'../../browser-qa/radiation-workshops');
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let layouts=0,decisions=0,practice=0,assessed=0;
 try{
  const p=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/topics/template.html?topic=strahlung_radioaktivitaet');await p.waitForFunction(()=>window.currentChapterQuiz?.questions.length===18&&document.querySelectorAll('#optical-sent li').length===4);
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const saved=await p.evaluate(()=>JSON.stringify(localStorage)),pattern=p.locator('#optical-pattern'),route=p.locator('#optical-path'),answer=p.locator('#optical-answer'),check=p.locator('#optical-check');
  for(const width of [320,390,1280])for(const dark of [false,true]){
   await p.setViewportSize({width,height:1000});await p.evaluate(d=>{if(d)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);
   await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'page overflow '+width);
   for(const [i,bits]of ['1100','1010','1001'].entries())for(const blocked of [false,true]){
    await pattern.selectOption(String(i));await route.selectOption(blocked?'blocked':'clear');
    assert.equal(await answer.inputValue(),'');assert.equal(await p.locator('#optical-feedback').getAttribute('data-correct'),null);
    assert.equal(await p.locator('#optical-sent li').evaluateAll(es=>es.map(e=>e.dataset.on==='true'?'1':'0').join('')),bits);
    assert.equal(await p.locator('#optical-received li').evaluateAll(es=>es.map(e=>e.dataset.on==='true'?'1':'0').join('')),blocked?'0000':bits);
    for(const guess of ['start','pause','help','none']){
     await answer.selectOption(guess);await check.focus();await check.press('Enter');
     assert.equal(await p.locator('#optical-feedback').getAttribute('data-correct'),String(guess===(blocked?'none':['start','pause','help'][i])));decisions++;
    }
   }
   await route.selectOption('clear');await pattern.focus();await p.keyboard.press('Home');await p.keyboard.press('ArrowDown');await p.keyboard.press('Tab');assert.equal(await pattern.inputValue(),'1');
   const scroll=p.locator('.optical-table-scroll');
   if(width<520){await scroll.focus();await p.keyboard.press('ArrowRight');await p.waitForFunction(()=>document.querySelector('.optical-table-scroll').scrollLeft>0);await scroll.evaluate(e=>new Promise(resolve=>{let prev=e.scrollLeft,stable=0;const tick=()=>{stable=e.scrollLeft===prev?stable+1:0;prev=e.scrollLeft;if(stable===12)resolve();else requestAnimationFrame(tick);};requestAnimationFrame(tick);}));await scroll.evaluate(e=>{e.blur();e.scrollLeft=0;});}
   if((width===320&&dark)||(width===1280&&!dark)){
    await p.locator('[data-core-experiment="optical-signal"]').screenshot({path:path.join(out,'signal-'+width+'-'+(dark?'dark':'light')+'.png'),animations:'disabled',style:'#score-board{visibility:hidden!important}'});
    await p.locator('[data-optical-investigation="uv"]').screenshot({path:path.join(out,'material-'+width+'-'+(dark?'dark':'light')+'.png'),animations:'disabled',style:'#score-board{visibility:hidden!important}'});
   }
   layouts++;
  }
  for(const [id,x]of Object.entries(keys)){
   const q=data.sections[x.section].quizzes.find(q=>q.id===id),box=p.locator('.practice-box[data-id="'+id+'"]');
   for(const [i,a]of q.answers.entries()){const b=box.getByRole('button',{name:a.text,exact:true});await b.focus();await b.press('Enter');assert.equal(await b.evaluate(e=>e.classList.contains('is-correct')),i===x.key);assert.ok((await box.locator('.feedback').innerText()).includes(a.feedback));practice++;}
  }
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
  for(const [qid,x]of Object.entries(keys))for(let a=0;a<3;a++){
   if(await p.locator('#chapter-quiz-launch').isVisible())await p.locator('#chapter-quiz-launch').click();if(await p.locator('[onclick="restartChapterQuiz()"]').isVisible())await p.locator('[onclick="restartChapterQuiz()"]').click();
   await p.evaluate(({qid,a,keys})=>currentChapterQuiz.questions.forEach((q,i)=>document.querySelector(`input[name="chapter_q_${i}"][value="${q.id===qid?a:keys[q.id]?.key??q.answers.findIndex(a=>a.correct)}"]`).checked=true),{qid,a,keys});await p.locator('.chapter-submit-btn').click();
   const result=await p.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).strahlung_radioaktivitaet);
   assert.equal(result.lastPercent,a===x.key?100:94);assert.equal(result.contentRevision,3);assert.deepEqual(result.reviewQuestionIds,a===x.key?[]:[qid]);
   if(a!==x.key){await p.locator('[onclick="reviewChapterSection('+x.section+')"]').click();assert.equal(await p.locator('[data-chapter-section="'+x.section+'"] h2').evaluate(e=>e===document.activeElement),true);}assessed++;
  }
  await p.goto(base+'/topics/worksheet.html?topic=strahlung_radioaktivitaet');await p.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await p.locator('#ws-content>.question-block').count(),18);assert.equal(await p.locator('[data-optical-paper]').count(),1);assert.equal(await p.locator('#ws-solutions').isVisible(),false);
  const options={format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}};
  await p.pdf({...options,path:path.join(out,'radiation-student.pdf')});await p.locator('#ws-include-solutions').check();await p.pdf({...options,path:path.join(out,'radiation-solutions.pdf')});
  assert.deepEqual(errors,[]);const report={time:new Date().toISOString(),layouts,modelStates:layouts*6,decisions,practice,assessed,keyboard:true,errors};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log('PASS '+JSON.stringify(report));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
