const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
const chapters=['sieinheiten','math1_5_geo_grundbegriffe','chemie_metalle_redox','bio_1_wirbeltiere','dgb7_produktion'];
const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true}),rows=[];
 try{
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:1280,height:900}});
   await context.addInitScript(theme=>localStorage.setItem('physik_dark_mode',String(theme==='dark')),theme);
   const page=await context.newPage();
   page.setDefaultTimeout(10000);
   for(const id of chapters){
    await page.goto(base+'/topics/template.html?topic='+id,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(id=>window.currentChapterQuiz?.topicId===id,id);
    await page.waitForTimeout(350); // Let the site's theme transitions finish before measuring their final colors.
    assert.equal(await page.locator('html').getAttribute('data-theme'),theme==='dark'?'dark':null);
    const selectors=['[data-chapter-section] h2','#topic-subtitle','[data-core-navigation] button','[data-core-navigation] a'];
    if(['sieinheiten','math1_5_geo_grundbegriffe'].includes(id))selectors.push('.worksheet-btn');
    if(theme==='dark'&&id==='dgb7_produktion')selectors.push('.word-ui-card strong');
    for(const selector of selectors){
     const el=page.locator(selector).first();
     const colors=await el.evaluate(e=>{
      const s=getComputedStyle(e);let background=null;
      for(let p=e;p;p=p.parentElement){const ps=getComputedStyle(p);if(ps.backgroundImage!=='none')throw Error('Gradient requires separate review');const rgba=ps.backgroundColor.match(/[\d.]+/g)?.map(Number)||[];if(rgba.length===3||rgba[3]===1){background=rgba.slice(0,3);break;}}
      return {foreground:s.color.match(/[\d.]+/g).slice(0,3).map(Number),background,size:parseFloat(s.fontSize),weight:parseFloat(s.fontWeight)};
     });
     assert.ok(colors.background);const ratio=contrast(colors.foreground,colors.background);rows.push({id,theme,selector,...colors,ratio});
     assert.ok(ratio>=4.5,id+' '+theme+' '+selector+' contrast '+ratio);
    }
    await page.getByRole('button',{name:'Zum Kapitelcheck',exact:true}).click();
    const submit=page.locator('.chapter-submit-btn');
    const colors=await submit.evaluate(e=>{const s=getComputedStyle(e);return {foreground:s.color.match(/[\d.]+/g).slice(0,3).map(Number),background:s.backgroundColor.match(/[\d.]+/g).slice(0,3).map(Number)};});
    const ratio=contrast(colors.foreground,colors.background);rows.push({id,theme,selector:'.chapter-submit-btn',...colors,ratio});assert.ok(ratio>=4.5,id+' submit '+ratio);
    if(id==='dgb7_produktion'){
     await page.getByRole('button',{name:'Zurück zum Lernen',exact:true}).count().then(async n=>{if(n)await page.getByRole('button',{name:'Zurück zum Lernen',exact:true}).click();else await page.evaluate(()=>closeChapterQuiz());});
     await page.locator('[data-chapter-section] h2').first().scrollIntoViewIfNeeded();
     await page.screenshot({path:path.join(output,'readability-'+theme+'.png')});
    }
   }
   await context.close();
  }
  fs.writeFileSync(path.join(output,'readability-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:rows.length+' common text/background pairs in five sample chapters and two themes; not a complete contrast or WCAG audit.',minimumRatio:Math.min(...rows.map(r=>r.ratio)),rows},null,2)+'\n');
  console.log('PASS: '+rows.length+' common text/background pairs in five chapters and both themes meet 4.5:1; minimum '+Math.min(...rows.map(r=>r.ratio)).toFixed(2)+':1.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
