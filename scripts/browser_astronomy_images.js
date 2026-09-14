const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',output=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa'));
const luminance=rgb=>rgb.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
(async()=>{
 fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[],measurements=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/topics/template.html?topic=astronomie',{waitUntil:'domcontentloaded'});await page.waitForSelector('.astro-image');
  const decoded=await page.locator('.astro-image img').evaluateAll(async imgs=>Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode();return {url:img.src,width:img.naturalWidth,height:img.naturalHeight};})));
  assert.equal(decoded.length,22);assert.ok(decoded.every(i=>i.width>0&&i.height>0));
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.setAttribute('data-theme',theme),theme);
   // Wait for the site's intentional theme transition before measuring final colors.
   await page.waitForFunction(theme=>getComputedStyle(document.body).color===(theme==='dark'?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),theme);
   const result=await page.locator('.astro-image').evaluateAll(figures=>{
    const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const c=canvas.getContext('2d',{willReadFrequently:true});const rgb=color=>{c.clearRect(0,0,1,1);c.fillStyle=color;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data];};
    const colors=el=>{let p=el,bg;while(p){bg=rgb(getComputedStyle(p).backgroundColor);if(bg[3]===255)break;p=p.parentElement;}return {foreground:rgb(getComputedStyle(el).color),background:bg};};
    return figures.map(f=>{const img=f.querySelector('img'),r=img.getBoundingClientRect(),cap=f.querySelector('figcaption'),link=f.querySelector('.astro-image-full');return {section:f.closest('[data-chapter-section]').dataset.chapterSection,natural:[img.naturalWidth,img.naturalHeight],attributes:[Number(img.getAttribute('width')),Number(img.getAttribute('height'))],display:[r.width,r.height],fit:getComputedStyle(img).objectFit,within:r.left>=f.getBoundingClientRect().left&&r.right<=f.getBoundingClientRect().right+1,caption:colors(cap),link:colors(link),href:link.href,src:img.src,target:link.target,label:link.getAttribute('aria-label')};});
   });
   for(const r of result){
    assert.deepEqual(r.attributes,r.natural);assert.ok(r.display.every(n=>n>0));assert.ok(Math.abs(r.display[0]/r.display[1]-r.natural[0]/r.natural[1])<.01,JSON.stringify(r));assert.equal(r.fit,'contain');assert.ok(r.within);assert.equal(r.href,r.src);assert.equal(r.target,'_blank');assert.ok(r.label.includes('neuer Tab'));
    for(const key of ['caption','link']){const p=r[key];assert.equal(p.foreground[3],255);assert.equal(p.background[3],255);const a=luminance(p.foreground),b=luminance(p.background);p.contrast=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(p.contrast>=4.5,`${theme} ${r.section} ${key} ${p.contrast}`);}
   }
   const pageWidth=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(pageWidth.scroll<=pageWidth.client+1);measurements.push({width,theme,pageWidth,images:result});
  }
  await page.setViewportSize({width:1280,height:900});await page.evaluate(()=>document.documentElement.setAttribute('data-theme','light'));
  for(const i of [5,9,20])await page.locator(`#learning-section-${i} .astro-image`).first().screenshot({path:path.join(output,`astronomy-image-after-${i}.png`)});
  await page.setViewportSize({width:390,height:900});await page.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));await page.locator('#learning-section-5 .astro-image').screenshot({path:path.join(output,'astronomy-image-mobile-dark.png')});
  const link=page.locator('#learning-section-9 .astro-image-full');await link.focus();assert.ok(await link.evaluate(e=>e===document.activeElement));
  const popupPromise=page.waitForEvent('popup');await link.press('Enter');const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded');assert.equal(popup.url(),await link.getAttribute('href'));await popup.close();assert.ok(await link.evaluate(e=>e===document.activeElement));
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'astronomy-images-report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),scope:'22 decoded remote images, preserved natural ratios/intrinsic dimensions and no clipping at three widths in two themes; caption/link contrast; native keyboard full-image link and focus on return. Selected screenshots require visual inspection; not a complete media-content or site audit.',measurements,pageErrors:errors},null,2)+'\n');
  console.log('PASS: 22 loaded images in 132 layout states, caption/link contrast, widths 320/390/1280, keyboard full-image link and return focus.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
