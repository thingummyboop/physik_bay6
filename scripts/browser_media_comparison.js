const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/media-comparison'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),chapter=await context.newPage();chapter.on('pageerror',e=>errors.push(e.message));await chapter.goto(base+'/topics/template.html?topic=dgb7_produktion');
  await chapter.locator('[data-media-open]').waitFor();const newPage=context.waitForEvent('page');await chapter.locator('[data-media-open]').click();const page=await newPage;await page.waitForLoadState('domcontentloaded');page.on('pageerror',e=>errors.push(e.message));
  assert.equal(page.url(),base+'/examples/medienvergleich.html');let states=0;const ratios=[];
  const titles=['28 von 40 kommen zu Fuß oder mit dem Rad','12 von 40 nutzen Öffis oder Auto','Eigene Überschrift: <b>unveränderte Daten</b>'];
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:900});
   for(const title of titles)for(const format of ['text','chart','both']){
    await page.locator('#headline').fill(title);await page.locator('#introduction').fill('Mein Vergleich: Herkunft und Reichweite prüfen.');await page.locator('#format').selectOption(format);
    assert.equal(await page.locator('#text-card').isVisible(),format!=='chart');assert.equal(await page.locator('#chart-card').isVisible(),format!=='text');
    assert.ok(await page.locator('html').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
    for(const card of await page.locator('.media-card:visible').all())assert.equal(await card.locator('h2').innerText(),title);
    if(format!=='text'){
     const bars=await page.locator('.bar').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().width/(n.parentElement.getBoundingClientRect().width-2)));
     for(let i=0;i<4;i++)assert.ok(Math.abs(bars[i]-[.8,.6,.4,.2][i])<.01);ratios.push({width,bars});
    }
    states++;
   }
  }
  assert.equal(states,27);await page.setViewportSize({width:390,height:844});
  await page.locator('#format').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#format').inputValue(),'text');
  await page.locator('#headline').fill('28 von 40 kommen zu Fuß oder mit dem Rad');await page.locator('#format').selectOption('both');await page.locator('#text-card').screenshot({path:path.join(output,'text-mobile.png')});await page.locator('#chart-card').screenshot({path:path.join(output,'chart-mobile.png')});
  const files=[];
  for(const format of ['text','chart','both']){
   await page.locator('#format').selectOption(format);const pending=page.waitForEvent('download');await page.locator('#download').click();const download=await pending;assert.equal(download.suggestedFilename(),'mein-medienvergleich-'+format+'.html');
   const file=path.join(output,download.suggestedFilename());await download.saveAs(file);const copy=await context.newPage();copy.on('pageerror',e=>errors.push(e.message));await copy.goto(pathToFileURL(file).href);
   assert.equal(await copy.locator('.media-card').count(),format==='both'?2:1);assert.equal(await copy.locator('script,input,select,textarea,button').count(),0);assert.equal(await copy.locator('h2').first().innerText(),'28 von 40 kommen zu Fuß oder mit dem Rad');
   for(const source of await copy.locator('.source').all())assert.match(await source.innerText(),/erfundene.*40 Beispielfälle.*ganz Wien/);
   if(format!=='text')assert.deepEqual(await copy.locator('tbody td').allTextContents(),['16','12','8','4']);
   await copy.setViewportSize({width:320,height:900});assert.ok(await copy.locator('html').evaluate(e=>e.scrollWidth<=e.clientWidth+1));if(format==='chart')await copy.screenshot({path:path.join(output,'export-chart-mobile.png'),fullPage:true});
   files.push(path.basename(file));await copy.close();
  }
  await page.evaluate(()=>{URL.createObjectURL=()=>{throw Error('Unavailable');};});await page.locator('#download').click();assert.match(await page.locator('#status').innerText(),/Download nicht möglich/);assert.equal(await page.locator('#headline').inputValue(),'28 von 40 kommen zu Fuß oder mit dem Rad');
  await chapter.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();const questions=await chapter.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.equal(questions.length,13);
  for(const [i,id]of questions.entries()){const value=id==='dgb7_media_scope'?0:['dgb7_settings_scope','dgb7_config_scope'].includes(id)?1:['dgb7_settings_evidence','dgb7_media_framing','dgb7_config_mute'].includes(id)?2:0;await chapter.locator('input[name="chapter_q_'+i+'"][value="'+value+'"]').check();}
  await chapter.locator('.chapter-submit-btn').click();const result=await chapter.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb7_produktion);assert.equal(result.lastPercent,92);assert.equal(result.contentRevision,4);assert.deepEqual(result.reviewQuestionIds,['dgb7_media_scope']);
  await chapter.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await chapter.locator('#learning-section-3').evaluate(e=>e.contains(document.activeElement)));
  const paper=await context.newPage();await paper.goto(base+'/topics/worksheet.html?topic=dgb7_produktion');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('[data-media-comparison-tasks]>li').count(),6);assert.equal(await paper.locator('[data-media-comparison-protocol] tbody tr').count(),3);assert.equal(await paper.locator('#ws-content>.question-block').count(),13);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(output,'media-chapter.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),states,ratios,exports:files,result,pageErrors:errors,scope:'Native editing/format selection, proportions at three widths, actual HTML downloads opened as local files, failure feedback, chapter check and targeted review, paper export. Visual inspection is separate.'},null,2)+'\n');
  await context.close();console.log('PASS: 27 media states, actual bar proportions, three downloaded/opened files, preserved source/data, keyboard and failed-download recovery, 92% thirteen-question check with exact media review section, paper tasks and solutions.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
