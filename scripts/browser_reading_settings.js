const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/reading-settings'));
const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),chapter=await context.newPage();chapter.on('pageerror',e=>errors.push(e.message));
  await chapter.goto(base+'/topics/template.html?topic=dgb7_produktion');await chapter.locator('[data-reading-open]').waitFor();
  const popup=context.waitForEvent('page');await chapter.locator('[data-reading-open]').click();const page=await popup;await page.waitForLoadState('domcontentloaded');page.on('pageerror',e=>errors.push(e.message));
  assert.equal(page.url(),base+'/examples/leseansicht.html');await page.locator('#view-state').getByText(/100 %/).waitFor();
  const original=await page.locator('#reading').innerText(),measurements=[];
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:900});
   for(const size of ['1','1.25','1.5'])for(const spacing of ['1.5','1.8','2.2'])for(const colours of ['light','dark']){
    await page.locator('#text-size').selectOption(size);await page.locator('#line-space').selectOption(spacing);await page.locator('#colours').selectOption(colours);
    const m=await page.locator('#reading').evaluate(e=>{const s=getComputedStyle(e),n=c=>c.match(/[\d.]+/g).slice(0,3).map(Number);return {font:parseFloat(s.fontSize),line:parseFloat(s.lineHeight),root:parseFloat(getComputedStyle(document.documentElement).fontSize),fg:n(s.color),bg:n(s.backgroundColor),scroll:e.scrollWidth,client:e.clientWidth,pageScroll:document.documentElement.scrollWidth,pageWidth:document.documentElement.clientWidth};});
    assert.equal(m.font,m.root*Number(size));assert.ok(Math.abs(m.line-m.font*Number(spacing))<.05);assert.ok(m.scroll<=m.client+1);assert.ok(m.pageScroll<=m.pageWidth+1);assert.equal(await page.locator('#reading').innerText(),original);
    const levels=[luminance(m.fg),luminance(m.bg)].sort((a,b)=>b-a),contrast=(levels[0]+.05)/(levels[1]+.05);assert.ok(contrast>=4.5);measurements.push({width,size,spacing,colours,contrast});
   }
  }
  assert.equal(measurements.length,54);await page.setViewportSize({width:390,height:844});
  await page.locator('#text-size').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#text-size').inputValue(),'1.25');
  await page.locator('#save').click();await page.reload();await page.locator('#save-state').getByText('Gespeicherte Einstellungen geladen.',{exact:true}).waitFor();assert.equal(await page.locator('#text-size').inputValue(),'1.25');
  await page.locator('#defaults').click();assert.equal(await page.locator('#text-size').inputValue(),'1');assert.equal(await page.locator('#defaults').evaluate(e=>e===document.activeElement),true);
  await page.locator('#load').click();assert.equal(await page.locator('#text-size').inputValue(),'1.25');
  await page.locator('#reading a').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#check-questions').evaluate(e=>e===document.activeElement),true);
  await page.locator('#reading').screenshot({path:path.join(output,'reading-mobile-dark.png')});
  await page.locator('#forget').click();assert.equal(await page.locator('#text-size').inputValue(),'1.25');await page.reload();assert.equal(await page.locator('#text-size').inputValue(),'1');
  await page.setViewportSize({width:320,height:900});await page.locator('#text-size').selectOption('1.5');
  await page.addStyleTag({content:'* {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}'});
  assert.ok(await page.locator('html').evaluate(e=>e.scrollWidth<=e.clientWidth+1));assert.ok(await page.locator('#reading').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
  await page.locator('fieldset').screenshot({path:path.join(output,'reading-spacing-controls.png')});await page.locator('#reading').screenshot({path:path.join(output,'reading-spacing-mobile.png')});
  const downloadEvent=chapter.waitForEvent('download');await chapter.locator('a[download="leseansicht.html"]').click();const download=await downloadEvent;assert.equal(download.suggestedFilename(),'leseansicht.html');
  const downloaded=path.join(output,'leseansicht-download.html');await download.saveAs(downloaded);assert.equal(fs.readFileSync(downloaded,'utf8').replace(/\r\n/g,'\n'),fs.readFileSync(path.join(__dirname,'../examples/leseansicht.html'),'utf8').replace(/\r\n/g,'\n'));
  const copy=await context.newPage();copy.on('pageerror',e=>errors.push(e.message));await copy.goto(require('node:url').pathToFileURL(downloaded).href);await copy.locator('#text-size').selectOption('1.5');assert.equal(await copy.locator('#reading').evaluate(e=>getComputedStyle(e).fontSize),'24px');assert.equal(await copy.locator('#chapter-link').getAttribute('href'),'https://thingummyboop.github.io/physik_bay6/index.html#dgb7_produktion');await copy.close();
  const denied=await browser.newContext();await denied.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));const dp=await denied.newPage();dp.on('pageerror',e=>errors.push(e.message));await dp.goto(base+'/examples/leseansicht.html');await dp.locator('#text-size').selectOption('1.5');await dp.locator('#save').click();assert.match(await dp.locator('#save-state').innerText(),/Speichern nicht möglich/);assert.equal(await dp.locator('#reading').evaluate(e=>getComputedStyle(e).fontSize),'24px');await denied.close();
  const paper=await context.newPage();await paper.goto(base+'/topics/worksheet.html?topic=dgb7_produktion');await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('[data-reading-settings-tasks]>li').count(),6);assert.equal(await paper.locator('[data-reading-settings-protocol] tbody tr').count(),4);assert.equal(await paper.locator('#ws-content>.question-block').count(),10);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(output,'reading-chapter.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),base,browser:browser.version(),states:measurements.length,minContrast:Math.min(...measurements.map(m=>m.contrast)),measurements,pageErrors:errors,scope:'Native chapter link/download, 18 choices at three widths, actual typography/contrast, keyboard, save/reload/defaults/load/delete, denied storage, spacing override and paper export. PDF visual review is separate.'},null,2)+'\n');
  await context.close();console.log('PASS: 54 rendered settings states, stable text, contrast, native keyboard and storage cycle, unavailable storage, spacing override, chapter links/download and ten-question paper export.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
