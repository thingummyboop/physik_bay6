// Native links, fresh recipient storage and PDF export; isolated browser profiles only.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
const ids=['energie','arbeit','math1_8_brueche','chemie_trennverfahren','bio_2_zellen','dgb5_information'];
const plan=[...ids,'missing_chapter'].join(',');
const destination=href=>new URL(new URL(href).hash.slice(1),base+'/');
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),checks=[],errors=[];
 try{
  for(const mode of ['learn','teach','review']){
   const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(base+'/topics/learning.html?'+new URLSearchParams({mode,plan}));
   await page.locator('#print:not([disabled])').waitFor();
   const anchors=await page.locator('.plan-chapter-link a').evaluateAll(nodes=>nodes.map(a=>a.href));
   assert.equal(anchors.length,ids.length);
   for(const [index,href]of anchors.entries())assert.deepEqual(Object.fromEntries(destination(href).searchParams),{topic:ids[index],mode,plan});
   const recipient=await browser.newContext({viewport:{width:1280,height:900}});
   // A copied link overrides an unrelated list on the receiving device.
   await recipient.addInitScript(()=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('sciverse_study_plan','["optik1"]');sessionStorage.setItem('seeded','true');}});
   const copied=await recipient.newPage();copied.on('pageerror',error=>errors.push(error.message));
   await copied.goto(anchors[0]);let chapter=copied.frameLocator('#game-frame');
   const back=chapter.locator('[data-core-navigation] a[target="_top"]');await back.waitFor();
   assert.equal(destination(await back.evaluate(a=>a.href)).searchParams.get('plan'),plan);
   if(mode==='review'){
    const next=chapter.locator('[data-chapter-continuation] li a');assert.equal(await next.count(),1);
    assert.equal(destination(await next.evaluate(a=>a.href)).searchParams.get('topic'),'arbeit');
    await next.click();await chapter.locator('[data-core-navigation]').waitFor();
    assert.equal(destination(copied.url()).searchParams.get('topic'),'arbeit');
   }
   await chapter.locator('[data-core-navigation] a[target="_top"]').click();
   const returned=copied.frameLocator('#game-frame');await returned.locator('#selected>li').nth(5).waitFor();
   assert.equal(await returned.locator('#unavailable-chapters>li').count(),1);
   assert.equal(await returned.locator('[data-mode="'+mode+'"]').getAttribute('aria-pressed'),'true');
   assert.deepEqual(await returned.locator('[data-focus-key^="plan-open-"]').evaluateAll(nodes=>nodes.map(n=>n.dataset.focusKey.slice(10))),ids);
   assert.equal(await copied.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),null);
   await recipient.close();
   // Enter follows the actual native anchor in the application shell.
   await page.locator('.plan-chapter-link a').first().focus();await page.keyboard.press('Enter');
   await page.frameLocator('#game-frame').locator('[data-core-navigation]').waitFor();
   assert.deepEqual(Object.fromEntries(destination(page.url()).searchParams),{topic:'energie',mode,plan});
   checks.push(mode+': six priority-subject links, native Enter, copied link on another device, return with unavailable chapter; review follows the selected order.');
   await context.close();
  }
  const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/topics/learning.html?'+new URLSearchParams({mode:'teach',plan}));
  await page.locator('#print:not([disabled])').waitFor();
  await page.locator('[data-focus-key="plan-move-1-energie"]').click();
  const reordered=['arbeit','energie',...ids.slice(2),'missing_chapter'].join(',');
  assert.equal(destination(await page.locator('.plan-chapter-link a').first().evaluate(a=>a.href)).searchParams.get('plan'),reordered);
  await page.locator('#share').click();const shared=await page.locator('#share-url').inputValue();
  assert.deepEqual(Object.fromEntries(destination(shared).searchParams),{mode:'review',plan:reordered});
  const widths=[];
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:900});
   const size=await page.locator('html').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));
   assert.ok(size.scroll<=size.width+1,JSON.stringify(size));widths.push(size);
   if(width===390)await page.locator('#selected>li').first().screenshot({path:path.join(output,'plan-link-mobile.png')});
  }
  await page.pdf({path:path.join(output,'plan-links.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);checks.push('Reordering updates chapter and shared URLs; 320/390/1280 layouts fit; A4 PDF exported for separate annotation and visual inspection.');
  fs.writeFileSync(path.join(output,'plan-links-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),base,checks,widths,pageErrors:errors,pdfPlan:reordered},null,2)+'\n');
  await context.close();console.log('PASS: '+checks.join('\nPASS: '));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
