// Real keyboard navigation between the complete catalogue and study list; isolated profiles.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/learning-shortcuts'));
const plan=['energie','arbeit','math1_8_brueche','chemie_trennverfahren','bio_2_zellen','dgb5_information'];
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),checks=[],errors=[];
 try{
  for(const width of [320,390,1280])for(const dark of [false,true])for(const mode of ['learn','review','teach']){
   const context=await browser.newContext({viewport:{width,height:900}});
   await context.addInitScript(value=>localStorage.setItem('physik_dark_mode',String(value)),dark);
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/index.html#topics/learning.html?'+new URLSearchParams({mode,plan:plan.join(',')}));
   const frame=page.frameLocator('#game-frame');await frame.locator('#print:not([disabled])').waitFor();
   const route=page.url(),jump=frame.locator('#plan-jump');
   assert.equal(await jump.textContent(),'Zur Stoffliste · 6 Kapitel');
   await frame.locator('#subject').selectOption('');
   assert.equal(await frame.locator('#chapters .chapter').count(),197);
   const before=await frame.locator('#plan-heading').evaluate(e=>e.getBoundingClientRect().top);
   if(width<900)assert.ok(before>5000,'Mobile list lies beyond the large catalogue; shortcut must skip it.');
   await jump.focus();await page.keyboard.press('Enter');
   assert.equal(await frame.locator('#plan-heading').evaluate(e=>e===document.activeElement),true);
   const top=await frame.locator('#plan-heading').evaluate(e=>e.getBoundingClientRect().top);
   assert.ok(top>=64&&top<850,'Plan heading is visible below the shell toolbar: '+top);
   assert.equal(page.url(),route,'In-page jump leaves the shared parent route intact.');
   if(width===390&&mode==='review')await page.screenshot({path:path.join(output,'plan-'+(dark?'dark':'light')+'.png')});
   await page.keyboard.press('Tab');
   assert.equal(await frame.locator('#plan .page-shortcuts a').evaluate(e=>e===document.activeElement),true);
   await page.keyboard.press('Enter');
   assert.equal(await frame.locator('#chapter-filters').evaluate(e=>e===document.activeElement),true);
   await page.keyboard.press('Tab');assert.equal(await frame.locator('#subject').evaluate(e=>e===document.activeElement),true);
   if(width===390&&mode==='review'){
    await jump.focus();
    await page.screenshot({path:path.join(output,'entry-'+(dark?'dark':'light')+'.png')});
   }
   await frame.locator('[data-focus-key="catalog-toggle-sieinheiten"]').click();
   assert.equal(await jump.textContent(),'Zur Stoffliste · 7 Kapitel');
   await jump.focus();await page.keyboard.press('Enter');
   await frame.locator('[data-focus-key="plan-remove-sieinheiten"]').click();
   assert.equal(await jump.textContent(),'Zur Stoffliste · 6 Kapitel');
   assert.equal(await frame.locator('#plan-heading').evaluate(e=>e===document.activeElement),true,'Removal retains a useful focus target.');
   assert.equal(await frame.locator('body').evaluate(e=>e.scrollWidth<=innerWidth+1),true);
   for(const a of await frame.locator('.page-shortcuts a').all())assert.ok((await a.boundingBox()).height>=44);
   await page.emulateMedia({media:'print'});
   assert.equal(await frame.locator('.page-shortcuts').evaluateAll(nodes=>nodes.every(e=>getComputedStyle(e).display==='none')),true);
   checks.push({width,dark,mode,catalogue:197,planTop:top});await context.close();
  }
  // Empty selections still offer a way back to choosing chapters.
  const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto(base+'/topics/learning.html?plan=');
  await page.locator('#chapters .chapter').first().waitFor();await page.locator('#plan-jump').focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('#plan-heading').evaluate(e=>e===document.activeElement),true);
  assert.equal(await page.locator('#plan-jump').textContent(),'Zur Stoffliste · 0 Kapitel');
  assert.equal(await page.locator('#share').isDisabled(),true);await page.keyboard.press('Tab');await page.keyboard.press('Enter');
  assert.equal(await page.locator('#chapter-filters').evaluate(e=>e===document.activeElement),true);
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),checks,emptyPlan:true,errors},null,2));
  console.log('PASS: 18 width/theme/mode combinations, 197-chapter catalogue, native Enter/Tab, visible focus targets, unchanged shared route, add/remove counts, empty plan and print hiding.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
