// Observational layout inventory; requires Playwright and a running local preview.
// Horizontal overflow inside a bounded scroll region is allowed; this checks the page itself.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{chromium}=require('playwright');
const root=path.join(__dirname,'..'),sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/curriculum.js'),'utf8'),sandbox);
const subjects=['physik','mathematik','chemie','biologie','dgb'];
const chapters=subjects.flatMap(subject=>sandbox.window.SCIVERSE_CURRICULUM[subject].topics.filter(t=>t.available!==false).map(t=>({id:t.id,subject})));
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(root,'../browser-qa'));
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),rows=[];
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultTimeout(12000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const chapter of chapters){
   errors.length=0;
   try{
    await page.goto(base+'/#'+chapter.id,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(id=>document.getElementById('game-frame')?.contentWindow?.currentChapterQuiz?.topicId===id,chapter.id);
    const frame=page.frameLocator('#game-frame');
    await frame.locator('html').evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const result=await frame.locator('html').evaluate(html=>{
     const width=html.clientWidth,overflow=[];
     for(const el of document.querySelectorAll('.topic-body *')){
      const style=getComputedStyle(el),r=el.getBoundingClientRect();
      if(!r.width||!r.height||style.visibility==='hidden'||el.closest('[hidden]'))continue;
      if(r.right>width+1||(el.clientWidth&&el.scrollWidth>el.clientWidth+1&&style.overflowX==='visible')){
       if(el.parentElement?.closest('.workshop-table-scroll,.responsive-table'))continue;
       overflow.push({tag:el.tagName,id:el.id,class:String(el.className).slice(0,100),width:Math.round(r.width),right:Math.round(r.right),scroll:el.scrollWidth,text:el.textContent.trim().slice(0,100)});
      }
     }
     const heading=document.querySelector('[data-chapter-section] h2'),style=heading&&getComputedStyle(heading);
     return {width,scroll:html.scrollWidth,pageOverflow:html.scrollWidth>width+1,overflow:overflow.slice(0,16),heading:heading?{color:style.color,fontSize:style.fontSize,fontWeight:style.fontWeight}:null};
    });
    rows.push({...chapter,...result,pageErrors:[...errors]});
   }catch(e){rows.push({...chapter,error:e.message.split('\n')[0],pageErrors:[...errors]});}
   if(rows.length%10===0)console.log('Inspected '+rows.length+'/'+chapters.length+' chapters.');
  }
  const report={createdAt:new Date().toISOString(),browser:browser.version(),viewport:{width:390,height:844},scope:'Initial chapter layout in the current light theme; not all interactive states, media contents or assistive technologies.',total:rows.length,overflowCount:rows.filter(r=>r.pageOverflow).length,failedLoads:rows.filter(r=>r.error).length,rows};
  fs.writeFileSync(path.join(output,'priority-layout-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({total:report.total,overflowCount:report.overflowCount,failedLoads:report.failedLoads,overflow:rows.filter(r=>r.pageOverflow).map(r=>({id:r.id,width:r.width,scroll:r.scroll})),errors:rows.filter(r=>r.error).map(r=>({id:r.id,error:r.error}))},null,2));
  process.exitCode=report.overflowCount||report.failedLoads?1:0;
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
