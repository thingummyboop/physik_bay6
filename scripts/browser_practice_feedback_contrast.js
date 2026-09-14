const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
const luminance=rgb=>rgb.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),measurements=[];
  for(const topic of ['astronomie','math1_8_brueche','chemie_metalle_redox','bio_1_wirbeltiere','dgb7_produktion']){
   await page.goto(base+'/topics/template.html?topic='+topic,{waitUntil:'domcontentloaded'});await page.waitForSelector('.practice-box');
   for(const theme of ['light','dark']){
    await page.evaluate(value=>document.documentElement.setAttribute('data-theme',value),theme);
    const box=page.locator('.practice-box').first();
    for(const correct of [true,false]){
     const button=box.locator(`button[onclick*="this, ${correct}"]`).first();await button.click();
     const pairs=await box.evaluate(el=>{
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d',{willReadFrequently:true});
      const rgb=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data];};
      return [el.querySelector('.is-correct,.is-wrong'),el.querySelector('.feedback')].map(node=>{const s=getComputedStyle(node);return {type:node.tagName,foreground:rgb(s.color),background:rgb(s.backgroundColor),opacity:Number(s.opacity),text:node.textContent.trim()};});
     });
     for(const pair of pairs){
      assert.equal(pair.opacity,1);assert.equal(pair.foreground[3],255);assert.equal(pair.background[3],255);
      const a=luminance(pair.foreground),b=luminance(pair.background),contrast=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      assert.ok(contrast>=4.5,`${topic} ${theme} ${correct} ${pair.type}: ${contrast}, ${JSON.stringify(pair)}`);measurements.push({topic,theme,correct,...pair,contrast});
     }
     if(topic==='astronomie')await box.screenshot({path:path.join(output,`practice-feedback-${theme}-${correct?'correct':'wrong'}.png`)});
    }
   }
  }
  fs.writeFileSync(path.join(output,'practice-feedback-contrast-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:'Two answer states and feedback in light/dark themes, one actual chapter per priority subject. Opaque computed foreground/background pairs; not a whole-site accessibility audit.',minimumContrast:Math.min(...measurements.map(m=>m.contrast)),measurements},null,2)+'\n');
  console.log(`PASS: ${measurements.length} native answer/feedback color pairs across five priority subjects and both themes; minimum ${Math.min(...measurements.map(m=>m.contrast)).toFixed(2)}:1.`);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
