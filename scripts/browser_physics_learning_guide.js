const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/physics-learning-guide'));
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let choices=0;try{
 const p=await browser.newPage({viewport:{width:390,height:950}});p.on('pageerror',e=>errors.push(e.message));const url=base+'/topics/learning.html?mode=teach&plan=klimawandel,energie,waermelehre';await p.goto(url);await p.waitForFunction(()=>document.querySelector('#selected li ul'));
 const stored=await p.evaluate(()=>JSON.stringify(localStorage)),guide=p.locator('#physics-guide');await guide.locator('summary').focus();await p.keyboard.press('Enter');assert.equal(await guide.evaluate(e=>e.open),true);
 for(const width of [320,390,1280])for(const dark of [false,true]){
  await p.setViewportSize({width,height:950});await p.evaluate(d=>{if(d)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);
  for(const grade of ['6','7','8']){await p.locator('#search').fill('unauffindbar94612');await p.locator('[data-focus-key="physics-guide-'+grade+'"]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#grade').inputValue(),grade);assert.equal(await p.locator('#search').inputValue(),'');assert.equal(await p.locator('#count').evaluate(e=>e===document.activeElement),true);assert.equal(await p.locator('#chapters>.chapter').count(),grade==='6'?6:7);assert.equal(await guide.evaluate(e=>e.open),true);choices++;}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(await guide.locator('.guide-stage,button,summary').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.left<0||r.right>innerWidth+1||e.scrollWidth>e.clientWidth+1;}).map(e=>e.textContent)),[]);
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),stored);
  if(width===320&&dark){await guide.locator('[data-guide-grade="8"]').screenshot({path:path.join(out,'year4-320-dark.png')});await guide.locator('.guide-scope').screenshot({path:path.join(out,'scope-320-dark.png')});}
  if(width===1280&&!dark)await guide.screenshot({path:path.join(out,'guide-1280-light.png')});
 }
 for(const mode of ['learn','review','teach']){await p.locator('[data-mode="'+mode+'"]').click();assert.equal(await guide.isVisible(),true);assert.equal(await guide.evaluate(e=>e.open),true);}
 await p.locator('#subject').selectOption('dgb');assert.equal(await guide.isVisible(),false);assert.equal(await p.locator('#dgb-guide').isVisible(),true);await p.locator('#subject').selectOption('physik');assert.equal(await guide.evaluate(e=>e.open),true);
 await p.locator('#share').click();assert.match(decodeURIComponent(await p.locator('#share-url').inputValue()),/plan=klimawandel,energie,waermelehre/);assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),stored);
 await p.emulateMedia({media:'print'});assert.equal(await guide.isVisible(),false);assert.equal(await p.locator('#selected').isVisible(),true);await p.emulateMedia({media:'screen'});
 for(const id of ['sieinheiten','waermelehre','astronomie','rechenbeispiele']){
  await p.locator('[data-focus-key="physics-guide-open-'+id+'"]').focus();await p.keyboard.press('Enter');await p.waitForURL('**/index.html#**');const route=new URL(p.url().split('#')[1],base),q=route.searchParams;assert.equal(q.get('topic'),id);assert.equal(q.get('mode'),'teach');assert.equal(q.get('plan'),'klimawandel,energie,waermelehre');
  await p.goto(url);await p.waitForFunction(()=>document.querySelector('#selected li ul'));await p.locator('#physics-guide>summary').click();await p.locator('#grade').selectOption('8');
 }
 assert.equal(choices,18);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),choices,layouts:6,keyboardAndFocus:true,planAndStoragePreserved:true,hiddenInPrintedPlan:true,contextualRoutes:4,errors},null,2));console.log('PASS: 18 native year choices, six layouts, keyboard focus, unchanged study plan/storage, subject/mode changes, print exclusion and four contextual chapter routes.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
