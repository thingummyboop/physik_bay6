// Separate from the DOM-only test runner: requires Playwright, a browser, and a running preview.
// Every check runs in isolated browser contexts, without the user's profile or stored learning data.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});const checks=[],errors=[];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
  page.setDefaultTimeout(10000);
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  let frame=page.frameLocator('#game-frame');await frame.locator('#chapters .chapter').first().waitFor();
  await page.waitForFunction(()=>document.getElementById('sidebar').getBoundingClientRect().right<=0);
  assert.equal(await page.locator('#sidebar').getAttribute('inert'),'');
  for(let i=0;i<3;i++)await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.getElementById('sidebar').contains(document.activeElement)),false);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'game-frame');
  assert.equal(await frame.locator('[data-mode="learn"]').evaluate(e=>e===document.activeElement),true);
  await page.screenshot({path:path.join(output,'mobile-learning.png')});
  checks.push('Mobile startup: hidden navigation skipped by native Tab traversal.');

  await page.locator('#menu-toggle').click();await page.waitForFunction(()=>Math.abs(document.getElementById('sidebar').getBoundingClientRect().left)<.1);
  assert.equal(await page.locator('#sidebar').getAttribute('inert'),null);
  await page.locator('#language-toggle').click();await page.keyboard.press('Escape');
  assert.equal(await page.locator('#language-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'menu-toggle');
  checks.push('Escape closes the language choices first, then the navigation, and returns focus.');

  await page.locator('#menu-toggle').click();await page.locator('#subject-select').selectOption('dgb');
  await page.locator('[data-page="dgb7_produktion"]').click();
  await frame.locator('[data-material-planner]').waitFor();
  assert.equal(await page.locator('#sidebar').getAttribute('inert'),'');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'menu-toggle');
  const narrow=await frame.locator('html').evaluate(e=>({scroll:e.scrollWidth,client:e.clientWidth}));
  assert.ok(narrow.scroll<=narrow.client+1,JSON.stringify(narrow));
  const tableRegion=frame.getByRole('region',{name:'Testprotokoll zum Materialplaner',exact:true});
  await page.locator('#menu-toggle').focus();
  for(let step=0;step<120&&!await tableRegion.evaluate(e=>e===document.activeElement);step++)await page.keyboard.press('Tab');
  assert.equal(await tableRegion.evaluate(e=>e===document.activeElement),true);
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.getElementById('game-frame').contentDocument.querySelector('.workshop-table-scroll').scrollLeft>0);
  await page.screenshot({path:path.join(output,'mobile-table-keyboard.png')});
  await frame.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();
  assert.equal(await frame.locator('#score-board').isVisible(),false);
  for(let i=0;i<6;i++)await frame.locator('input[name="chapter_q_'+i+'"][value="'+(i===0?1:0)+'"]').check();
  await frame.locator('.chapter-submit-btn').click();
  await frame.locator('#chapter-quiz-result').getByText(/83\s*%/).first().waitFor();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).dgb7_produktion);
  assert.equal(saved.lastPercent,83);assert.deepEqual(saved.reviewQuestionIds,['dgb7_produktion_q1']);
  assert.equal(await frame.locator('[data-chapter-review] a').count(),1);
  await frame.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();await frame.locator('#learning-section-0').waitFor();
  await page.waitForFunction(()=>{const d=document.getElementById('game-frame').contentDocument,h=d.querySelector('#learning-section-0 h2'),r=h.getBoundingClientRect();return d.activeElement===h&&r.top>=64&&r.top<160;});
  await page.screenshot({path:path.join(output,'mobile-chapter-review.png')});
  checks.push('Mobile chapter: navigation closes, no horizontal page overflow, quiz feedback and targeted review.');

  await frame.locator('[data-core-navigation]').getByRole('link',{name:'Zur Stoffliste',exact:true}).click();
  frame=page.frameLocator('#game-frame');await frame.locator('#chapters .chapter').first().waitFor();
  await frame.locator('[data-mode="teach"]').click();await frame.locator('#subject').selectOption('physik');
  await frame.locator('[data-focus-key="catalog-toggle-sieinheiten"]').click();
  await frame.locator('[data-focus-key="catalog-toggle-optik1"]').click();
  assert.equal(await frame.locator('#selected > li').count(),2);
  await frame.locator('#share').click();const share=await frame.locator('#share-url').inputValue();
  assert.ok(share.includes('plan='));assert.ok(!share.includes('83'));assert.ok(!share.includes('reviewQuestionIds'));
  checks.push('Teacher flow: two physics chapters selected and a share link without quiz results created.');

  const recipient=await browser.newContext({viewport:{width:1280,height:900}}),rp=await recipient.newPage();
  rp.on('pageerror',e=>errors.push(e.message));await rp.goto(share,{waitUntil:'domcontentloaded'});
  // Share URLs may open the standalone learning page or the application shell.
  const inShell=await rp.locator('#game-frame').count();const plan=inShell?rp.frameLocator('#game-frame'):rp;
  await plan.locator('#selected > li').nth(1).waitFor();
  assert.equal(await plan.locator('#selected > li').count(),2);
  assert.deepEqual(await rp.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_study_plan'))),['sieinheiten','optik1']);
  assert.equal(await rp.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),null);
  await rp.screenshot({path:path.join(output,'desktop-shared-plan.png')});
  checks.push('Fresh recipient context restores the same ordered study list, without the sender’s results.');

  await page.setViewportSize({width:1280,height:900});
  await page.locator('#menu-toggle').click();await page.locator('#language-toggle').focus();
  await page.keyboard.press('Escape');assert.equal(await page.locator('#sidebar').getAttribute('inert'),'');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'menu-toggle');
  checks.push('Desktop collapse also removes hidden controls and preserves keyboard focus.');
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'learning-smoke-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),base,checks,pageErrors:errors,scope:'Chromium, 390×844 and 1280×900; no physical device or screen-reader test.'},null,2)+'\n');
  console.log('PASS: '+checks.join('\nPASS: '));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
