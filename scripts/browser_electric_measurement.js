const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/electric-measurement'));
const keys={electric_evidence_single:1,electric_evidence_double:2,electric_evidence_deviation:0,electric_evidence_measuring:1};
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],layouts=[];
 try{
  const p=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/topics/template.html?topic=elektrizitaet');await p.waitForFunction(()=>document.querySelector('[data-electric-evidence]')?.dataset.bound==='true');
  const lab=p.locator('[data-electric-evidence]'),series=lab.locator('[data-evidence-series]'),count=lab.locator('[data-evidence-count]'),feedback=lab.locator('[data-evidence-feedback]');
  const saved=await p.evaluate(()=>JSON.stringify(localStorage));let decisions=0;
  await series.focus();await series.press('Home');await series.press('ArrowDown');assert.equal(await series.inputValue(),'B');
  await count.focus();await count.press('End');assert.equal(await count.inputValue(),'4');
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await p.setViewportSize({width,height:1000});await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);await p.waitForTimeout(400);
   for(const s of ['A','B'])for(let n=1;n<=4;n++){
    await series.selectOption(s);await count.selectOption(String(n));assert.equal(await lab.locator('[data-evidence-point]').count(),n);
    for(const answer of ['fits','differs','insufficient']){const b=lab.locator('[data-evidence-answer="'+answer+'"]');await b.focus();await b.press('Enter');assert.equal(await feedback.getAttribute('data-correct'),String(answer===(n===1?'insufficient':s==='A'?'fits':'differs')));decisions++;}
    const geo=await lab.evaluate(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,pageWidth:document.documentElement.scrollWidth,controls:[...e.querySelectorAll('select,button')].map(x=>{const b=x.getBoundingClientRect();return {left:b.left,right:b.right,height:b.height};})};});
    assert.ok(geo.left>=0&&geo.right<=width+1&&geo.pageWidth<=width+1,JSON.stringify({width,theme,s,n,geo}));assert.ok(geo.controls.every(c=>c.height>=44&&c.left>=geo.left&&c.right<=geo.right+1));
    const boxes=await lab.locator('svg text').evaluateAll(ts=>ts.map(t=>{const b=t.getBBox();return [b.x,b.y,b.x+b.width,b.y+b.height];}));assert.ok(boxes.every(b=>b[0]>=0&&b[1]>=0&&b[2]<=360&&b[3]<=275));
    layouts.push({width,theme,series:s,count:n,geo});if(width===320&&n===4){await lab.screenshot({path:path.join(out,'lab-'+s+'-'+theme+'.png')});await lab.locator('svg').screenshot({path:path.join(out,'chart-'+s+'-'+theme+'.png')});await lab.locator('table').screenshot({path:path.join(out,'table-'+s+'-'+theme+'.png')});}
   }
  }
  await lab.locator('[data-evidence-reset]').focus();await p.keyboard.press('Space');assert.equal(await series.inputValue(),'A');assert.equal(await count.inputValue(),'1');assert.equal(await series.evaluate(e=>document.activeElement===e),true);assert.equal(await feedback.innerText(),'');assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
  await p.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();let paths=0;
  for(const[id,key]of Object.entries(keys))for(let answer=0;answer<3;answer++){
   if(paths)await p.getByRole('button',{name:'Neuen Versuch starten',exact:true}).click();
   await p.evaluate(({id,answer})=>currentChapterQuiz.questions.forEach((q,j)=>document.querySelector('input[name="chapter_q_'+j+'"][value="'+(q.id===id?answer:q.answers.findIndex(a=>a.correct))+'"]').checked=true),{id,answer});
   await p.locator('.chapter-submit-btn').click();const r=await p.evaluate(()=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).elektrizitaet);assert.equal(r.lastPercent,answer===key?100:96);assert.equal(r.contentRevision,6);assert.deepEqual(r.reviewQuestionIds,answer===key?[]:[id]);paths++;
  }
  const paper=await browser.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic=elektrizitaet');await paper.waitForFunction(()=>!document.querySelector('#ws-print').disabled);
  assert.equal(await paper.locator('[data-electric-evidence-paper] tbody tr').count(),4);assert.equal(await paper.locator('[data-electric-measurement-record] tbody tr').count(),8);assert.equal(await paper.locator('[data-electric-measurement-steps] li').count(),6);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
  const material=await paper.locator('#ws-physics-material').innerText();assert.ok(material.includes('erfundene Übungsdaten'));assert.ok(!material.includes('Reihe A weicht um'));
  await paper.locator('#ws-include-solutions').check();assert.ok((await paper.locator('#ws-solutions').innerText()).includes('Reihe A weicht um'));await paper.pdf({path:path.join(out,'electricity-solutions.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),layouts,decisions,paths,errors},null,2)+'\n');console.log(`PASS: ${layouts.length} layouts, ${decisions} decisions, ${paths} new assessment paths; keyboard/reset/storage and worksheet material/solutions. PDF exported for visual review.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
