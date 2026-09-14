const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/biology-models'));
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true}),errors=[],results=[];
 try{
  for(const kind of ['wirbeltiere','selektion']){
   const id='bio_1_'+kind,context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/topics/template.html?topic='+id);
   const zone=page.locator('[data-core-experiment="'+(kind==='wirbeltiere'?'vertebrate-cards':'selection-counts')+'"]');await zone.waitFor();const saved=await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results'));let states=0;
   if(kind==='wirbeltiere'){
    const all=['forelle','frosch','eidechse','amsel','hund'],yes=[['amsel'],['hund'],['forelle'],['eidechse']],fields=zone.locator('select');
    for(const a of ['','ja','nein'])for(const b of ['','ja','nein'])for(const c of ['','ja','nein'])for(const d of ['','ja','nein']){
     const values=[a,b,c,d];for(let i=0;i<4;i++)await fields.nth(i).selectOption(values[i]);
     const expected=all.filter(animal=>values.every((v,i)=>!v||(v==='ja'?yes[i].includes(animal):!yes[i].includes(animal))));
     assert.deepEqual(await zone.locator('[data-vertebrate-match]').evaluateAll(es=>es.map(e=>e.dataset.vertebrateMatch)),expected);const text=await zone.locator('[role=status]').innerText();assert.ok(text.startsWith(expected.length+' von 5'));
     if(!expected.length)assert.match(text,/keine allgemeine Aussage/);if(expected.length===1)assert.match(text,/noch nicht bestimmt/);states++;
    }
    await zone.locator('[data-vertebrate-reset]').click();assert.equal(await fields.first().evaluate(e=>e===document.activeElement),true);
    await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');assert.equal(await fields.first().inputValue(),'ja');assert.deepEqual(await zone.locator('[data-vertebrate-match]').evaluateAll(es=>es.map(e=>e.dataset.vertebrateMatch)),['amsel']);
   }else{
    const light=zone.locator('[data-selection-light]'),dark=zone.locator('[data-selection-dark]'),output=zone.locator('[data-selection-result]');
    for(let a=0;a<=10;a++)for(let b=0;b<=10;b++){
     await light.fill(String(a));await dark.fill(String(b));await dark.press('Enter');const text=await output.innerText();
     if(a+b===0)assert.match(text,/kein Farbanteil definiert/);else{assert.ok(text.includes(2*a+' helle und '+2*b+' dunkle, insgesamt '+2*(a+b)));assert.ok(text.includes((100*b/(a+b)).toLocaleString('de',{maximumFractionDigits:1})+' %'));assert.ok(text.includes(a===b?'entspricht':b>a?'gestiegen':'gesunken'));}states++;
    }
    for(const value of ['','11','-1']){await light.fill(value);await zone.locator('[data-selection-calculate]').click();assert.match(await output.innerText(),/Bitte trage/);}
    await light.fill('6');await dark.fill('9');assert.match(await output.innerText(),/erneut/);await light.press('Enter');assert.match(await output.innerText(),/12 helle und 18 dunkle, insgesamt 30/);assert.match(await output.innerText(),/60 %/);
    await zone.locator('[data-selection-reset]').click();assert.equal(await light.inputValue(),'');assert.equal(await dark.inputValue(),'');assert.equal(await light.evaluate(e=>e===document.activeElement),true);
    await light.fill('6');await dark.fill('9');await dark.press('Enter');
   }
   let answerPaths=0;
   const correctIndex=id=>({bio_selektion_d1:1,bio_selektion_d2:2,bio_selektion_d4:2,bio_selektion_d5:1}[id]||0);
   if(kind==='selektion'){
    const source=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8'))[id];
    for(const q of source.sections.flatMap(s=>s.quizzes).filter(q=>!q.practiceOnly)){
     const box=page.locator('.practice-box[data-id="'+q.id+'"]');
     for(const [i,answer]of q.answers.entries()){
      const button=box.getByRole('button',{name:answer.text,exact:true});await button.focus();await page.keyboard.press('Enter');assert.equal(await button.evaluate(e=>e.classList.contains('is-correct')),i===correctIndex(q.id));assert.ok((await box.locator('.feedback').innerText()).includes(answer.feedback));answerPaths++;
     }
    }
    assert.equal(answerPaths,33);for(const input of await zone.locator('input').all())assert.ok((await input.boundingBox()).height>=44);
   }
   assert.equal(await page.evaluate(()=>localStorage.getItem('sciverse_chapter_quiz_results')),saved);
   const widths=[];for(const width of [320,390,1280])for(const theme of ['light','dark']){
    await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    if(size.scroll>size.width+1)await page.screenshot({path:path.join(out,kind+'-overflow-'+width+'-'+theme+'.png'),fullPage:true});assert.ok(size.scroll<=size.width+1,kind+' '+JSON.stringify(size));widths.push({width,theme,...size});
   }
   await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.removeAttribute('data-theme'));await zone.screenshot({path:path.join(out,kind+'-model-mobile.png')});
   const tables=kind==='wirbeltiere'?['data-vertebrate-cards','data-vertebrate-key']:['data-selection-generations','data-selection-repeats','data-selection-comparison'];
   for(const key of tables){
    const table=page.locator('['+key+']'),parent=table.locator('..'),scrollable=await parent.getAttribute('role')==='region',region=scrollable?parent:table;
    if(scrollable)assert.equal(await region.getAttribute('tabindex'),'0');else{const bounds=await table.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=391,key+' must fit or have an accessible scroll region');}
    await region.screenshot({path:path.join(out,key+'-mobile.png')});
    if(await region.evaluate(e=>e.scrollWidth>e.clientWidth+1)){
     await region.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(e=>e.scrollLeft>0,await region.elementHandle());
     for(let i=0;i<100&&await region.evaluate(e=>e.scrollLeft<e.scrollWidth-e.clientWidth-1);i++){await page.keyboard.press('ArrowRight');await page.waitForTimeout(60);}
     await page.waitForFunction(e=>e.scrollLeft>=e.scrollWidth-e.clientWidth-1,await region.elementHandle());
     await region.screenshot({path:path.join(out,key+'-scrolled-mobile.png')});assert.equal(await region.evaluate(e=>document.activeElement===e),true);
    }
   }
   await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();const ids=await page.evaluate(()=>currentChapterQuiz.questions.map(q=>q.id));assert.equal(ids.length,11);
   const wrong=kind==='wirbeltiere'?'bio_wirbel_s4':'bio_selektion_d6';
   for(const [i,q]of ids.entries())await page.locator('input[name="chapter_q_'+i+'"][value="'+(q===wrong?1:correctIndex(q))+'"]').check();
   await page.locator('.chapter-submit-btn').click();const result=await page.evaluate(id=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[id],id);assert.equal(result.lastPercent,91);assert.equal(result.contentRevision,kind==='wirbeltiere'?2:3);assert.deepEqual(result.reviewQuestionIds,[wrong]);
   await page.locator('#chapter-quiz-result').getByRole('button',{name:'Passenden Abschnitt wiederholen',exact:true}).click();assert.ok(await page.locator('#learning-section-'+(kind==='wirbeltiere'?3:4)).evaluate(e=>e.contains(document.activeElement)));
   const paper=await context.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+id);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('#ws-content>.question-block').count(),11);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);
   await paper.locator('#ws-include-solutions').check();await paper.pdf({path:path.join(out,kind+'.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
   results.push({id,states,answerPaths,widths,result});await context.close();
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),base,results,pageErrors:errors,scope:'81 native card selections, 121 entered calculations, all 33 selection practice answer paths by keyboard, two 11-question checks with exact section review, keyboard-scrollable tables, invalid input/reset, storage isolation, 12 width/theme states and PDF exports. Visual review is separate. No real biological field experiment.'},null,2)+'\n');console.log('PASS: 81 card combinations, 121 calculations, 33 selection answer paths by keyboard, two 91% checks with targeted review, keyboard table scrolling, 12 width/theme states and both paper exports.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
