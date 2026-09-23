const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const source=require('../lang/de.json').elektrizitaet,keys=require('./fixtures/electricity_answer_keys.json'),masks={heater:1,bulb:3,led:2,coil:4,coating:8,sun:16};
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/electric-effects'));
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[];let decisions=0,practicePaths=0,paths=0;
 try{
  const p=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/topics/template.html?topic=elektrizitaet');await p.waitForFunction(()=>document.querySelector('[data-electric-effects]')?.dataset.bound==='true');
  const lab=p.locator('[data-electric-effects]'),choice=lab.locator('select'),inputs=lab.locator('[data-effect-choice]'),check=lab.locator('[data-effect-check]'),feedback=lab.locator('[data-effect-feedback]');const saved=await p.evaluate(()=>JSON.stringify(localStorage));
  await choice.focus();await choice.press('End');assert.equal(await choice.inputValue(),'sun');await inputs.nth(4).focus();await p.keyboard.press('Space');await check.focus();await p.keyboard.press('Enter');assert.equal(await feedback.getAttribute('data-correct'),'true');
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await p.setViewportSize({width,height:1000});await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);await p.waitForTimeout(400);
   for(const[id,key]of Object.entries(masks)){
    await choice.selectOption(id);assert.equal(await lab.locator('[data-effect-card]:visible').count(),1);assert.equal(await lab.locator('[data-effect-card]:visible').getAttribute('data-effect-card'),id);
    for(const mask of [0,31,key]){
     for(let i=0;i<5;i++)await inputs.nth(i).setChecked(!!(mask&(1<<i)));await check.focus();await p.keyboard.press('Enter');assert.equal(await feedback.getAttribute('data-correct'),String(mask===key));if(!mask)assert.equal(await inputs.nth(0).evaluate(e=>e===document.activeElement),true);decisions++;
    }
    const geo=await lab.evaluate(e=>{const b=e.getBoundingClientRect();return{left:b.left,right:b.right,pageWidth:document.documentElement.scrollWidth,controls:[...e.querySelectorAll('select,button,fieldset label')].map(x=>{const r=x.getBoundingClientRect();return{left:r.left,right:r.right,height:r.height};})};});
    assert.ok(geo.left>=0&&geo.right<=width+1&&geo.pageWidth<=width+1,JSON.stringify({id,width,theme,geo}));assert.ok(geo.controls.every(c=>c.height>=44&&c.left>=geo.left&&c.right<=geo.right+1));layouts.push({id,width,theme,geo});
    if((width===320&&['bulb','led','sun'].includes(id))||(width===1280&&id==='coating'))await lab.screenshot({path:path.join(out,id+'-'+width+'-'+theme+'.png')});
   }
  }
  await lab.locator('[data-effect-reset]').focus();await p.keyboard.press('Space');assert.equal(await choice.inputValue(),'heater');assert.equal(await choice.evaluate(e=>document.activeElement===e),true);assert.equal(await inputs.evaluateAll(es=>es.filter(e=>e.checked).length),0);assert.equal(await feedback.innerText(),'');assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
  for(const q of source.sections.flatMap(s=>s.quizzes)){
   const box=p.locator('.practice-box[data-id="'+q.id+'"]');
   for(const[i,a]of q.answers.entries()){const button=box.getByRole('button',{name:a.text,exact:true});await button.focus();await button.press('Enter');assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),i===keys[q.id]);assert.ok((await box.locator('.feedback').innerText()).includes(a.feedback));practicePaths++;}
  }
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);await p.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();const questions=await p.evaluate(()=>currentChapterQuiz.questions.map(q=>({id:q.id,count:q.answers.length})));assert.equal(questions.length,27);
  for(const[index,q]of questions.entries())for(let a=0;a<q.count;a++){
   if(paths)await p.getByRole('button',{name:'Neuen Versuch starten',exact:true}).click();
   await p.evaluate(({index,a,keys})=>currentChapterQuiz.questions.forEach((q,j)=>document.querySelector('input[name="chapter_q_'+j+'"][value="'+(index===j?a:keys[q.id])+'"]').checked=true),{index,a,keys});await p.locator('.chapter-submit-btn').click();
   const r=await p.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).elektrizitaet);assert.equal(r.lastPercent,a===keys[q.id]?100:96);assert.equal(r.contentRevision,7);assert.deepEqual(r.reviewQuestionIds,a===keys[q.id]?[]:[q.id]);paths++;
  }
  const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=elektrizitaet');await paper.waitForFunction(()=>!document.querySelector('#ws-print').disabled);
  assert.equal(await paper.locator('[data-electric-effects-paper] .electric-effect-paper-case').count(),6);assert.equal(await paper.locator('[data-electric-effects-steps] li').count(),4);assert.equal(await paper.locator('[data-electric-effects-record] tbody tr').count(),2);assert.equal(await paper.locator('[data-electric-evidence-paper] tbody tr').count(),4);
  assert.equal(await paper.locator('#ws-solutions').isVisible(),false);assert.equal(await paper.locator('#ws-physics-material [data-electric-effects-solutions]').count(),0);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('#ws-solutions [data-electric-effects-solutions] p').count(),6);
  await paper.pdf({path:path.join(out,'electricity-solutions.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),layouts,decisions,practicePaths,paths,errors},null,2)+'\n');console.log(`PASS: ${layouts.length} layouts, ${decisions} decisions, ${practicePaths} native practice paths and ${paths} chapter assessment paths; keyboard/reset/storage and paper integration. PDF exported for inspection.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
