'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173';
const out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/physics-review-explanations'));
const cases={
 optik1:['data-review-light-sound','data-review-reflection-normal','data-review-eclipse-region'],
 farben:['data-review-rainbow','data-review-color-absorption'],
 energie:['data-review-toaster','data-review-wind-generator'],
 arbeit:['data-review-rocket-work','data-review-work-unit'],
 drehundstatik:['data-statics-lever-balance']
};
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch(),errors=[];let layouts=0;
 try{
  const p=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  for(const [id,attributes]of Object.entries(cases)){
   await p.goto(base+'/topics/template.html?topic='+id);await p.waitForFunction(()=>window.currentChapterQuiz?.questions.length);
   for(const width of [320,390,1280])for(const dark of [false,true]){
    await p.setViewportSize({width,height:1000});await p.evaluate(d=>{document.documentElement.dataset.theme=d?'dark':'light';},dark);
    await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
    for(const attribute of attributes){
     const box=p.locator('['+attribute+']');assert.equal(await box.isVisible(),true);
     assert.equal(await box.evaluate(e=>e.getBoundingClientRect().right<=innerWidth+1&&e.scrollWidth<=e.clientWidth+1),true,id+'/'+attribute);
     if(width===320&&dark)await box.screenshot({path:path.join(out,id+'-'+attribute+'.png'),style:'#score-board{visibility:hidden!important}'});
    }
    layouts++;
   }
   await p.goto(base+'/topics/worksheet.html?topic='+id);await p.waitForSelector('['+attributes[0]+']');
   for(const attribute of attributes)assert.equal(await p.locator('['+attribute+']').isVisible(),true);
   assert.equal(await p.locator('#ws-solutions').isVisible(),false);
   const options={format:'A4',printBackground:true,margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'}};
   await p.pdf({...options,path:path.join(out,id+'-student.pdf')});
   if(id==='drehundstatik'){
    await p.locator('#ws-include-solutions').check();await p.pdf({...options,path:path.join(out,id+'-solutions.pdf')});
   }
  }
  assert.equal(layouts,30);assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),chapters:5,explanations:10,layouts,errors},null,2));
  console.log('PASS: ten explanation bridges in 30 chapter/layout combinations; visible without overflow in light/dark; five student PDFs and separate statics solutions.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
