'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/water-evidence')),topic='bio_3_wasser_oekosysteme';
const keys={bio_3_wasser_s1:1,bio_3_wasser_d1:2,bio_3_wasser_s2:0,bio_3_wasser_network:1,bio_3_wasser_s3:2,bio_3_wasser_d2:0,bio_3_wasser_difference:1,bio_3_wasser_s4:2,bio_3_wasser_d3:0};
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[];
 try{
  const p=await browser.newPage({viewport:{width:390,height:900}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/topics/template.html?topic='+topic);await p.waitForFunction(()=>document.querySelector('[data-water-lab]')?.dataset.initialized==='true');
  const storage=await p.evaluate(()=>JSON.stringify(localStorage)),select=p.locator('[data-water-view]'),show=p.locator('[data-water-show]'),reset=p.locator('[data-water-reset]'),result=p.locator('[data-water-result]'),modes=['single','day','depths'];let transitions=0;
  const expected={single:[['16:00','9','nicht eingeblendet']],day:[['06:00','4','nicht eingeblendet'],['12:00','7','nicht eingeblendet'],['16:00','9','nicht eingeblendet'],['22:00','6','nicht eingeblendet']],depths:[['06:00','4','2'],['12:00','7','3'],['16:00','9','3'],['22:00','6','2']]};
  for(const from of modes)for(const to of [...modes,'reset']){
   await select.selectOption(from);await show.click();assert.equal(await result.isVisible(),true);
   if(to==='reset')await reset.click();else await select.selectOption(to);
   const mode=to==='reset'?'single':to;assert.equal(await select.inputValue(),mode);assert.equal(await result.isVisible(),false);assert.equal(await show.getAttribute('aria-expanded'),'false');
   assert.deepEqual(await p.locator('[data-water-table] tbody tr').evaluateAll(rows=>rows.map(r=>[...r.children].map(c=>c.textContent))),expected[mode]);assert.equal(await p.locator('[data-water-point]').count(),{single:1,day:4,depths:8}[mode]);
   await show.click();assert.equal(await result.isVisible(),true);assert.match(await result.textContent(),mode==='single'?/Andere Zeiten/:mode==='day'?/Spannweite 5 mg\/l/:/Unterschied 6 mg\/l/);await show.click();assert.equal(await result.isVisible(),false);transitions++;
  }
  for(const dark of [false,true])for(const width of [320,390,1280]){
   await p.setViewportSize({width,height:900});await p.evaluate(dark=>{if(dark)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;},dark);await p.waitForFunction(dark=>getComputedStyle(document.body).color===(dark?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
   for(const mode of modes){await select.selectOption(mode);await show.click();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);for(const c of [select,show,reset])assert.ok((await c.boundingBox()).height>=44);layouts.push({dark,width,mode});}
   if(width===390){const theme=dark?'dark':'light';for(const [name,selector]of [['chart','[data-water-chart]'],['data','[data-water-table]'],['protocol','.water-protocol'],['habitats','.water-habitats'],['food','.water-food']])await p.locator(selector).screenshot({path:path.join(out,name+'-'+theme+'.png')});await select.selectOption('single');await show.click();await p.locator('[data-water-lab]').screenshot({path:path.join(out,'workshop-'+theme+'.png')});}
  }
  await reset.focus();await p.keyboard.press('Enter');assert.equal(await select.inputValue(),'single');assert.equal(await select.evaluate(e=>e===document.activeElement),true);await p.keyboard.press('ArrowDown');assert.equal(await select.inputValue(),'day');await p.keyboard.press('Tab');assert.equal(await show.evaluate(e=>e===document.activeElement),true);await p.keyboard.press('Enter');assert.equal(await result.isVisible(),true);assert.equal(await show.getAttribute('aria-expanded'),'true');await p.keyboard.press('Enter');assert.equal(await result.isVisible(),false);assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),storage);
  let answers=0;const qs=await p.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.equal(qs.length,9);
  for(const [index,id]of qs.entries())for(let choice=0;choice<3;choice++){
   if(!answers)await p.locator('#chapter-quiz-launch').click();else await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
   await p.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,n)=>{if(n!==index)document.querySelector(`input[name="chapter_q_${n}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});await p.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
   const r=await p.evaluate(topic=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[topic],topic);assert.equal(r.lastPercent,choice===keys[id]?100:89);assert.deepEqual(r.reviewQuestionIds,choice===keys[id]?[]:[id]);const text=await p.evaluate(({index,choice})=>currentChapterQuiz.questions[index].answers[choice].feedback,{index,choice});assert.ok((await p.locator('#chapter-quiz-result').textContent()).includes(text));answers++;
  }
  const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+topic);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('[data-water-paper] tbody tr').count(),4);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('#ws-solutions [data-water-solution]').count(),4);await paper.pdf({path:path.join(out,'water-evidence-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),transitions,answers,layouts,keyboard:true,storageUnchanged:true,errors},null,2));console.log('PASS: 12 transitions, 18 layouts, keyboard/focus/storage, 27 quiz answers and complete paper export.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
