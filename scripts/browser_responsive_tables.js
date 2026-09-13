const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/topics/template.html?topic=bio_1_wirbeltiere',{waitUntil:'domcontentloaded'});
  const table=page.locator('[data-vertebrate-cards]');await table.waitFor();
  await page.waitForFunction(()=>document.querySelector('[data-vertebrate-cards]')?.parentElement.hasAttribute('tabindex'));
  const original=await table.textContent(),wrapper=table.locator('..');
  assert.equal(await wrapper.getAttribute('role'),'region');assert.ok(await wrapper.getAttribute('aria-label'));
  const saved=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));
  await wrapper.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-vertebrate-cards]').parentElement.scrollLeft>0);
  await page.setViewportSize({width:1280,height:900});await page.waitForFunction(()=>!document.querySelector('[data-vertebrate-cards]').parentElement.hasAttribute('tabindex'));
  assert.equal(await wrapper.getAttribute('role'),null);assert.equal(await table.textContent(),original);
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.querySelector('[data-vertebrate-cards]').parentElement.hasAttribute('tabindex'));
  assert.equal(await page.locator('.responsive-table .responsive-table').count(),0);
  await page.locator('[data-vertebrate-feature]').first().selectOption('ja');
  assert.deepEqual(await page.locator('[data-vertebrate-match]').evaluateAll(els=>els.map(e=>e.dataset.vertebrateMatch)),['amsel']);
  await page.locator('[data-vertebrate-reset]').click();assert.equal(await page.locator('[data-vertebrate-match]').count(),5);
  // A late-created table exercises the same observer used by interactive models.
  await page.evaluate(()=>{const t=document.createElement('table');t.id='late-table-fixture';t.innerHTML='<caption>Testtabelle</caption><tbody><tr><th>Spalte</th><td>Eintrag</td></tr></tbody>';document.querySelector('[data-chapter-section]').append(t);});
  await page.waitForFunction(()=>document.getElementById('late-table-fixture')?.parentElement.matches('.responsive-table'));
  assert.equal(await page.locator('#late-table-fixture').locator('..').getAttribute('tabindex'),null);
  await page.locator('#late-table-fixture').evaluate(t=>{t.rows[0].cells[1].textContent='1234567890'.repeat(30);});
  await page.waitForFunction(()=>document.getElementById('late-table-fixture').parentElement.hasAttribute('tabindex'));
  assert.equal(await page.locator('#late-table-fixture').locator('..').getAttribute('aria-label'),'Testtabelle');
  assert.equal(await table.textContent(),original);assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),saved);assert.deepEqual(errors,[]);
  console.log('PASS: native horizontal keyboard scroll, narrow/wide/narrow resizing, preserved source table, no nested wrappers, late-created/updated tables, labels and unchanged quiz storage.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
