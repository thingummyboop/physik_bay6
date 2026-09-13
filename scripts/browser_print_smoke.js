// Export existing print views for read-only pagination QA, without using a user's profile.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_PRINT_REPORT_DIR||path.join(__dirname,'../../tmp/pdfs'));
const samples=[
 {id:'dgb7_produktion',material:true,solutions:false},
 {id:'dgb7_produktion',material:false,solutions:true},
 {id:'sieinheiten',material:false,solutions:false},
 {id:'math1_5_geo_grundbegriffe',material:false,solutions:true},
 {id:'chemie_metalle_redox',material:false,solutions:true},
 {id:'bio_1_wirbeltiere',material:true,solutions:false}
];
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),rows=[];
 try{
  const context=await browser.newContext({viewport:{width:1000,height:900}});
  for(const sample of samples){
   const page=await context.newPage();page.setDefaultTimeout(15000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/topics/worksheet.html?topic='+sample.id,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>!document.getElementById('ws-print').disabled);
   const mathAtReady=await page.evaluate(()=>({loaded:!!window.MathJax?.typesetPromise,mathNodes:document.querySelectorAll('mjx-container').length}));
   await page.locator('#ws-include-material').setChecked(sample.material);
   await page.locator('#ws-include-solutions').setChecked(sample.solutions);
   assert.equal(await page.locator('#ws-solutions').isVisible(),sample.solutions);
   await page.emulateMedia({media:'print'});await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('.no-print').isVisible(),false);
   const metrics=await page.locator('body').evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,rawMath:(document.getElementById('ws-content').textContent.match(/\\\(|\\\[|\$\$/g)||[]).length}));
   const name=sample.id+(sample.material?'-material':'-questions')+(sample.solutions?'-solutions':'')+'.pdf';
   await page.pdf({path:path.join(output,name),format:'A4',printBackground:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
   rows.push({...sample,file:name,mathAtReady,...metrics,pageErrors:errors});await page.close();
  }
  const page=await context.newPage();await page.goto(base+'/topics/learning.html?mode=teach&plan=sieinheiten,optik1,dgb7_produktion',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!document.getElementById('print').disabled&&document.querySelectorAll('#selected > li').length===3);
  await page.emulateMedia({media:'print'});await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.filters').isVisible(),false);assert.equal(await page.locator('#selected > li').count(),3);
  await page.pdf({path:path.join(output,'teacher-study-plan.pdf'),format:'A4',printBackground:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});
  fs.writeFileSync(path.join(output,'print-smoke-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:'A4 exports of six worksheet variants and one three-chapter teaching list; PDFs still require pagination and visual inspection.',rows},null,2)+'\n');
  console.log(JSON.stringify(rows,null,2));console.log('Exported teacher-study-plan.pdf.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
