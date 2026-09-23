const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/ohm-worksheet'));
const num=s=>Number(s.replace(',','.'));
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],draws=[],layouts=[];
 try{
  const p=await browser.newPage({viewport:{width:1280,height:1000}});p.on('pageerror',e=>errors.push(e.message));
  for(let draw=0;draw<3;draw++){
   if(draw)await p.reload();else await p.goto(base+'/topics/worksheet.html?topic=elektrizitaet');await p.waitForFunction(()=>!document.querySelector('#ws-print').disabled);
   const tasks=await p.locator('[data-ohm-generated]').evaluateAll(es=>es.map(e=>({id:e.dataset.ohmGenerated,unknown:e.dataset.ohmUnknown,given:e.querySelector('p').textContent,text:e.textContent}))),answers=await p.locator('[data-ohm-generated-answer]').evaluateAll(es=>es.map(e=>({id:e.dataset.ohmGeneratedAnswer,text:e.textContent,calculation:e.querySelector('p').textContent})));
   assert.equal(tasks.length,10);assert.equal(answers.length,10);assert.deepEqual(tasks.map(t=>t.id),answers.map(a=>a.id));assert.equal(await p.locator('#ws-solutions').isVisible(),false);
   for(let i=0;i<10;i++){
    const task=tasks[i],answer=answers[i];if(task.unknown==='U'){const[,r,ma]=task.given.match(/R = (\d+) Ω; I = (\d+) mA/),u=num(answer.calculation.match(/= ([\d,]+) V\.$/)[1]);assert.ok(Math.abs(u-Number(r)*Number(ma)/1000)<1e-10);assert.ok(answer.calculation.includes(r+' Ω'));}
    else{const[,u,r]=task.given.match(/U = ([\d,]+) V; R = (\d+) Ω/),ma=Number(answer.calculation.match(/= (\d+) mA\.$/)[1]);assert.ok(Math.abs(ma-1000*num(u)/Number(r))<1e-10);assert.ok(answer.calculation.includes(u+' V ÷ '+r+' Ω'));}
   }
   const solutionToggle=p.locator('#ws-include-solutions');await solutionToggle.focus();await p.keyboard.press('Space');assert.equal(await p.locator('#ws-solutions').isVisible(),true);await solutionToggle.uncheck();await solutionToggle.check();assert.deepEqual(await p.locator('[data-ohm-generated]').allTextContents(),tasks.map(t=>t.text));draws.push({tasks,answers});
  }
  for(const width of [320,390,1280]){
   await p.setViewportSize({width,height:1000});const geo=await p.locator('.electric-ohm-grid').evaluate(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,cards:[...e.children].map(c=>{const b=c.getBoundingClientRect();return {left:b.left,right:b.right,scrollWidth:c.scrollWidth,width:c.clientWidth};})};});assert.ok(geo.left>=0&&geo.right<=width+1);assert.ok(geo.cards.every(c=>c.left>=geo.left&&c.right<=geo.right+1&&c.scrollWidth<=c.width+1));layouts.push({width,geo});if(width===320)await p.locator('[data-ohm-generated="O1"]').screenshot({path:path.join(out,'task-320.png')});
  }
  // Export at desktop width so paper uses two columns, independent of the mobile preview.
  await p.setViewportSize({width:1280,height:1000});await p.pdf({path:path.join(out,'electricity-solutions.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  await p.locator('#ws-include-solutions').uncheck();await p.pdf({path:path.join(out,'electricity-tasks.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),draws,layouts,errors},null,2)+'\n');console.log('PASS: 3 native worksheet draws with 30 matched answers, stable keyboard/solution toggles and 3 task-grid layouts. Both PDF versions exported for inspection.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
