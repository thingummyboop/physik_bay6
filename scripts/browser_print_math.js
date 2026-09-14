// Exercise the real formula renderer, including a delayed download and a failed CDN request.
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext(),page=await context.newPage();
  let release,requested;const gate=new Promise(resolve=>{release=resolve;}),requestSeen=new Promise(resolve=>{requested=resolve;});
  await page.route('**/mathjax@3/es5/tex-mml-chtml.js',async route=>{requested();await gate;await route.continue();});
  await page.goto(base+'/topics/worksheet.html?topic=math1_8_brueche',{waitUntil:'commit'});
  await requestSeen;await page.locator('#ws-print').waitFor();
  assert.equal(await page.locator('#ws-print').isDisabled(),true);release();
  await page.waitForFunction(()=>!document.getElementById('ws-print').disabled,null,{timeout:30000});
  assert.ok(await page.locator('#ws-content mjx-container').count()>0);
  assert.equal(await page.locator('#ws-content mjx-merror').count(),0);
  assert.doesNotMatch(await page.locator('#ws-content').textContent(),/\\\(|\\\[|\$\$/);
  assert.equal(await page.locator('#ws-math-status').isVisible(),false);
  const area=await context.newPage();await area.goto(base+'/topics/worksheet.html?topic=math3_4_flaechensatz',{waitUntil:'domcontentloaded'});
  await area.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.ok(await area.locator('#ws-content mjx-container').count()>0);
  assert.equal(await area.locator('#ws-content mjx-merror').count(),0);
  assert.doesNotMatch(await area.locator('#ws-content').textContent(),/\\\(|\\\[|\$\$/);
  const failed=await context.newPage();await failed.route('**/mathjax@3/**',route=>route.abort());
  await failed.goto(base+'/topics/worksheet.html?topic=math1_8_brueche',{waitUntil:'domcontentloaded'});
  await failed.waitForFunction(()=>document.getElementById('ws-math-status').textContent.includes('Formeln konnten nicht'));
  assert.equal(await failed.locator('#ws-print').isDisabled(),true);
  assert.ok(await failed.locator('.exercise-item').count()>0);
  await failed.goto(base+'/topics/worksheet.html?topic=sieinheiten',{waitUntil:'domcontentloaded'});
  await failed.waitForFunction(()=>!document.getElementById('ws-print').disabled);
  assert.equal(await failed.locator('#ws-math-status').isVisible(),false);
  console.log('PASS: delayed MathJax keeps printing disabled; real fraction and area worksheets finish without raw TeX or renderer errors; failed download keeps content and explains the print restriction; a worksheet without TeX remains printable.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
