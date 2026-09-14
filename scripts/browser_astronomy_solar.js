const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));await page.goto(base+'/topics/template.html?topic=astronomie',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-solar-workshop]')?.dataset.initialized==='true');
  const storage=await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))));
  const body=page.locator('#solarBody'),view=page.locator('#solarView'),scale=page.locator('#solarScale');let states=0;
  for(const mm of ['1','10','100'])for(const mode of ['orbit','diameter']){
   await scale.selectOption(mm);await view.selectOption(mode);await body.focus();await body.press('Home');
   for(let i=0;i<8;i++){
    if(i)await body.press('ArrowDown');assert.equal(await body.inputValue(),String(i));
    const result=await page.locator('[data-solar-workshop]').evaluate(zone=>({status:zone.querySelector('[data-solar-status]').textContent,selected:zone.querySelector('[data-solar-model] [aria-current]').rowIndex,bars:[...zone.querySelectorAll('[data-solar-bar]')].map(b=>({width:b.getBoundingClientRect().width,track:b.parentElement.getBoundingClientRect().width,percent:parseFloat(b.style.width)}))}));
    assert.equal(result.selected,i+1);assert.ok(result.status.includes(mm+' mm Erddurchmesser'));
    for(const b of result.bars){assert.ok(b.width>0&&b.width<=b.track);assert.ok(Math.abs(b.width-(b.track-2)*b.percent/100)<.1);}
    states++;
   }
  }
  await page.locator('[data-solar-reset]').click();assert.equal(await body.inputValue(),'2');assert.equal(await view.inputValue(),'orbit');assert.equal(await scale.inputValue(),'10');assert.ok(await body.evaluate(el=>el===document.activeElement));
  const widths=[];for(const width of [320,390,1280]){await page.setViewportSize({width,height:844});const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1);widths.push(size);}
  await page.setViewportSize({width:390,height:844});await page.locator('[data-solar-bars]').screenshot({path:path.join(output,'solar-orbits-mobile.png')});
  await view.selectOption('diameter');await page.locator('[data-solar-bars]').screenshot({path:path.join(output,'solar-diameters-mobile.png')});
  const tableScroll=page.locator('[data-solar-model]').locator('..');
  const tableOverflows=await tableScroll.evaluate(el=>el.scrollWidth>el.clientWidth+1);
  if(tableOverflows){await tableScroll.focus();assert.equal(await tableScroll.getAttribute('role'),'region');await tableScroll.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-solar-model]').parentElement.scrollLeft>0);}
  else{assert.equal(await tableScroll.getAttribute('tabindex'),null);assert.equal(await tableScroll.getAttribute('role'),null);}
  await page.locator('[data-solar-model]').screenshot({path:path.join(output,'solar-model-table-mobile.png')});
  await scale.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,'solar-model-mobile.png')});
  assert.equal(await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))),storage);
  // New transfer questions use native buttons; chapter-check feedback and old-result
  // invalidation are covered by the complete astronomy integration test.
  let paths=0;for(const id of ['astro_solar_scale','astro_solar_distance']){
   const box=page.locator(`.practice-box[data-id="${id}"]`);for(const btn of await box.locator('button').all()){
    const feedback=await btn.getAttribute('data-feedback');await btn.click();assert.ok((await box.locator('.feedback').innerText()).includes(feedback));assert.equal(await btn.isEnabled(),true);paths++;
   }
  }
  const paper=await context.newPage();paper.on('pageerror',error=>errors.push(error.message));await paper.goto(base+'/topics/worksheet.html?topic=astronomie',{waitUntil:'domcontentloaded'});await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await paper.locator('[data-solar-source] tbody tr').count(),8);assert.equal(await paper.locator('[data-solar-protocol] tbody tr').count(),4);assert.equal(await paper.locator('[data-solar-tasks] > li').count(),4);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('.ws-paper-solution').count(),4);
  if(process.env.SCIVERSE_SOLAR_PDF){await paper.evaluate(()=>document.fonts.ready);await paper.pdf({path:process.env.SCIVERSE_SOLAR_PDF,format:'A4',printBackground:true,preferCSSPageSize:true});}
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'astronomy-solar-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),states,paths,widths,tableOverflows,pageErrors:errors,scope:'Native controls, measured proportional bars, reset/focus, table overflow semantics, stable model storage, six new practice choices, paper data/protocol/solutions. Screenshot and PDF inspection are separate.'},null,2)+'\n');
  console.log('PASS: 48 solar model states, proportional rendered bars, native controls/reset/focus, responsive table, widths 320/390/1280, six transfer answer clicks, paper tasks and solutions.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
