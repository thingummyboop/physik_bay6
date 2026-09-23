// Native verification of the reorganized DGB3 production chapter; preview must be running.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/production-flow'));
const keys={dgb7_produktion_q1:0,dgb7_production_abstraction:0,dgb7_production_code_change:0,dgb7_produktion_q3:0,dgb7_produktion_q2:0,dgb7_settings_scope:1,dgb7_settings_evidence:2,dgb7_media_framing:2,dgb7_media_scope:1,dgb7_config_scope:1,dgb7_config_mute:2,dgb7_config_evidence:0,dgb7_produktion_q4:0};
const practices=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8')).dgb7_produktion.sections.flatMap(s=>s.quizzes||[]).filter(q=>q.practiceOnly);
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[],reviews=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/topics/template.html?topic=dgb7_produktion');await page.locator('[data-production-transfer]').waitFor();
  const baseline=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));
  for(const id of ['dgb7_produktion_p1','dgb7_produktion_p2','dgb7_produktion_p3']){
   const box=page.locator('.practice-box[data-id="'+id+'"]');assert.equal(await box.getByRole('button').count(),3);
   for(let i=0;i<3;i++){const answer=practices.find(q=>q.id===id).answers[i],b=box.getByRole('button',{name:answer.text,exact:true});await b.focus();await page.keyboard.press('Enter');assert.equal(await b.evaluate(e=>e.classList.contains('is-correct')),i===0);assert.equal(await b.evaluate(e=>e.classList.contains('is-wrong')),i!==0);assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));assert.equal(await b.isDisabled(),false);}
  }
  assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),baseline);
  assert.equal(await page.locator('#learning-section-1 .practice-box[data-id="dgb7_produktion_q3"]').count(),1);
  assert.equal(await page.locator('#learning-section-2 .practice-box[data-id="dgb7_produktion_q2"]').count(),1);
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
   await page.waitForFunction(t=>getComputedStyle(document.body).color===(t==='dark'?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),theme);
   const dims=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(dims.scroll<=dims.client+1,JSON.stringify({width,theme,...dims}));
   for(const selector of ['[data-production-route]','[data-production-transfer]','[data-production-evidence]']){const box=await page.locator(selector).boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);
    const contrast=await page.locator(selector).evaluate(e=>{const luminance=rgb=>{const c=rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});return c[0]*.2126+c[1]*.7152+c[2]*.0722;};const bg=luminance(getComputedStyle(e).backgroundColor);return [e,e.querySelector('h3')].map(n=>{const fg=luminance(getComputedStyle(n).color);return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);});});assert.ok(contrast.every(r=>r>=4.5),JSON.stringify({selector,theme,contrast}));}
   layouts.push({width,theme,...dims});
   if((width===320&&theme==='dark')||(width===390&&theme==='light')){
    await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});const selector=width===320?'[data-production-transfer]':'[data-production-route]';await page.locator(selector).evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await page.waitForTimeout(350);await page.screenshot({path:path.join(output,width===320?'transfer-320-dark.png':'route-390-light.png'),animations:'disabled'});
    if(width===320){await page.locator('[data-production-transfer] li').last().evaluate(e=>e.scrollIntoView({block:'end',behavior:'instant'}));await page.screenshot({path:path.join(output,'transfer-end-320-dark.png'),animations:'disabled'});}
   }
  }
  await page.setViewportSize({width:390,height:844});
  for(const [wrong,section]of [['dgb7_produktion_q3',1],['dgb7_produktion_q2',2]]){
   await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();if(reviews.length)await page.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.equal(ids.length,13);
   for(const [i,id]of ids.entries())await page.locator('input[name="chapter_q_'+i+'"][value="'+(id===wrong?1:keys[id])+'"]').check();
   await page.locator('.chapter-submit-btn').click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb7_produktion);assert.equal(saved.lastPercent,92);assert.equal(saved.contentRevision,4);assert.deepEqual(saved.reviewQuestionIds,[wrong]);
   await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-'+section).evaluate(e=>e.contains(document.activeElement)));
   reviews.push({question:wrong,section,percent:saved.lastPercent});
  }
  const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=dgb7_produktion');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('#ws-content>.question-block').count(),13);assert.equal(await paper.locator('#ws-dgb-material [data-production-transfer] li').count(),4);
  assert.equal(await paper.locator('#ws-dgb-material [data-production-transfer-solution]').count(),0);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  await paper.locator('#ws-include-solutions').check();assert.match(await paper.locator('#ws-solutions').innerText(),/14 Blatt Papier, 5 Bleistifte und 15 Büroklammern/);
  await paper.pdf({path:path.join(output,'dgb7_produktion-solutions.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),practiceAnswerPaths:9,layouts,reviews,pageErrors:errors,scope:'Free-practice answers, six responsive layouts, two complete 13-question attempts and native review navigation to moved questions; worksheet separation and PDF export. Visual review recorded separately.'},null,2)+'\n');
  await context.close();console.log('PASS: nine practice answers, six layouts, two 92% attempts with correct moved-question review targets, separate transfer solutions and PDF export.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
