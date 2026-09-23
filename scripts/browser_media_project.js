const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/media-project')),keys=require('./fixtures/dgb8_production_keys.json');
(async()=>{
  fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[];
  try{
    const context=await browser.newContext({viewport:{width:390,height:900}}),chapter=await context.newPage();chapter.on('pageerror',e=>errors.push(e.message));
    await chapter.goto(base+'/topics/template.html?topic=dgb8_produktion');await chapter.locator('[data-media-open]').waitFor();
    const opening=context.waitForEvent('page');await chapter.locator('[data-media-open]').click();const p=await opening;await p.waitForLoadState('domcontentloaded');p.on('pageerror',e=>errors.push(e.message));
    assert.equal(p.url(),base+'/examples/medienprojekt.html');
    await p.locator('#headline').fill('Entdecke das Muster!');await p.locator('#intro').fill('Kannst du die vier Punkte vorhersagen? Probiere an unserer Station eine andere Regel aus.');
    await p.locator('#notes').fill('Textrolle: Entwurf geliefert. Gestaltungsrolle: zusammengeführt. Prüfrolle: Uhrzeit gefunden. Nach Rollenwechsel: Dauer präzisiert und erneut geprüft.');
    for(const variant of ['a','b'])assert.equal(await p.locator('#poster-'+variant+' [data-copy="headline"]').textContent(),'Entdecke das Muster!');
    let designs=0;
    for(const dark of [false,true])for(const width of [320,390,1280]){
      await p.setViewportSize({width,height:1000});await p.emulateMedia({colorScheme:dark?'dark':'light'});
      for(const focus of ['idea','plan'])for(const size of ['2','2.6'])for(const palette of ['blau','wald','beere']){
        for(const variant of ['a','b']){
          await p.locator('#focus-'+variant).selectOption(focus);await p.locator('#size-'+variant).selectOption(size);await p.locator('#palette-'+variant).selectOption(palette);
          const poster=p.locator('#poster-'+variant);assert.equal(await poster.getAttribute('data-focus'),focus);assert.equal(await poster.getAttribute('data-palette'),palette);
          assert.equal(await poster.locator('circle').count(),4);assert.equal(await poster.evaluate(e=>e.scrollWidth<=e.clientWidth+1),true);designs++;
        }
        assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
      }
      layouts.push({dark,width});
      await p.locator('#focus-a').selectOption('idea');await p.locator('#palette-a').selectOption('blau');await p.locator('#focus-b').selectOption('plan');await p.locator('#palette-b').selectOption('blau');
      if(width===390)await p.locator('.posters').screenshot({path:path.join(out,'posters-'+(dark?'dark':'light')+'.png')});
      if(width===1280&&!dark)await p.locator('.posters').screenshot({path:path.join(out,'posters-desktop.png')});
    }
    await p.locator('#show-preview').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#preview-title').evaluate(e=>e===document.activeElement),true);
    const values=page=>page.evaluate(()=>Object.fromEntries([...document.querySelectorAll('input,textarea,select')].map(e=>[e.id,e.value])));
    async function download(page,selector,expected){const pending=page.waitForEvent('download');await page.locator(selector).click();const item=await pending;assert.equal(item.suggestedFilename(),expected);const file=path.join(out,expected);await item.saveAs(file);return file;}
    const saved=await download(p,'#save','rasterstation-arbeitsdatei.html'),expected=await values(p);
    const offlineContext=await browser.newContext({viewport:{width:390,height:900}});await offlineContext.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('Storage blocked for test');}}));
    const offline=await offlineContext.newPage(),network=[];offline.on('pageerror',e=>errors.push(e.message));offline.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
    await offline.goto(pathToFileURL(saved).href);assert.deepEqual(await values(offline),expected);assert.equal(await offline.locator('circle').count(),8);
    await offline.locator('#headline').fill('Weiterarbeit ohne Netz');await offline.locator('#palette-a').selectOption('wald');
    const resaved=await download(offline,'#save','rasterstation-arbeitsdatei.html');await offline.goto('about:blank');await offline.goto(pathToFileURL(resaved).href);
    assert.equal(await offline.locator('#headline').inputValue(),'Weiterarbeit ohne Netz');assert.equal(await offline.locator('#poster-a').getAttribute('data-palette'),'wald');
    for(const variant of ['a','b']){
      await offline.locator('#chosen').selectOption(variant);const file=await download(offline,'#export','rasterstation-'+variant+'.html');
      const poster=await offlineContext.newPage();poster.on('pageerror',e=>errors.push(e.message));await poster.goto(pathToFileURL(file).href);
      assert.equal(await poster.locator('script,input,textarea,select,button').count(),0);assert.equal(await poster.locator('article').count(),1);assert.equal(await poster.locator('circle').count(),4);
      assert.equal(await poster.locator('[data-copy="headline"]').textContent(),'Weiterarbeit ohne Netz');assert.ok(!(await poster.locator('body').textContent()).includes('Textrolle: Entwurf'));
      assert.equal(await poster.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
      await poster.pdf({path:path.join(out,'plakat-'+variant+'.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});await poster.close();
    }
    assert.deepEqual(network,[]);await offlineContext.close();
    const attack='<img src=x onerror="window.attack=1"> & </textarea><script>window.attack=1</script>';await p.locator('#headline').fill(attack);
    assert.equal(await p.locator('#poster-a [data-copy="headline"]').textContent(),attack);assert.equal(await p.locator('.poster img,.poster script').count(),0);assert.equal(await p.evaluate(()=>window.attack),undefined);
    let answers=0;const questions=await chapter.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.deepEqual(questions,Object.keys(keys));
    for(const [index,id]of questions.entries())for(let choice=0;choice<3;choice++){
      if(answers===0)await chapter.locator('#chapter-quiz-launch').click();else await chapter.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
      await chapter.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,n)=>{if(n!==index)document.querySelector(`input[name="chapter_q_${n}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});
      await chapter.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await chapter.locator('#chapter-quiz-panel .chapter-submit-btn').click();
      const result=await chapter.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb8_produktion);
      assert.equal(result.lastPercent,choice===keys[id]?100:89);assert.equal(result.contentRevision,4);assert.deepEqual(result.reviewQuestionIds,choice===keys[id]?[]:[id]);answers++;
    }
    const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=dgb8_produktion');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
    assert.equal(await paper.locator('[data-media-milestones]>li').count(),6);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
    await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,'produktion-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
    assert.equal(answers,27);assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),layouts,designs,answers,offlineSaveAndReopen:true,standalonePosters:2,offlineNetworkRequests:network,errors},null,2)+'\n');
    console.log('PASS: 144 native design states across six layouts, shared content/focus, real working-file download and offline re-save/reopen, two script-free poster downloads, safe text, all 27 chapter answers and full worksheet export.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
