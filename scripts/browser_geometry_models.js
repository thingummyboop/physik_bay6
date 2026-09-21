'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/geometry-models'));
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({headless:true}),errors=[],layouts=[];try{
 const p=await b.newPage({viewport:{width:390,height:2200}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/topics/template.html?topic=math2_7_geometrie');await p.waitForFunction(()=>document.querySelector('[data-translation-lab]')?.dataset.ready==='true');const saved=await p.evaluate(()=>JSON.stringify(localStorage));
 await p.locator('[data-triangle-side="c"]').focus();await p.keyboard.press('End');assert.equal(await p.locator('[data-triangle-result]').getAttribute('data-valid'),'false');await p.locator('[data-triangle-reset]').focus();await p.keyboard.press('Enter');assert.match(await p.locator('[data-triangle-result]').innerText(),/rechtwinklig/);assert.equal(await p.locator('[data-triangle-reset]').evaluate(e=>e===document.activeElement),true);
 await p.locator('[data-reflect-x]').focus();await p.keyboard.press('Home');assert.match(await p.locator('[data-reflection-status]').innerText(),/P\(-5\|-2\)/);await p.locator('[data-reflect-axis]').selectOption('x');assert.match(await p.locator('[data-reflection-status]').innerText(),/P′\(-5\|2\)/);
 await p.locator('[data-shift-x]').focus();await p.keyboard.press('End');assert.equal(await p.locator('[data-shift-x]').inputValue(),'2');await p.locator('[data-shift-reset]').focus();await p.keyboard.press('Space');assert.match(await p.locator('[data-translation-status]').innerText(),/genau aufeinander/);assert.equal(await p.locator('[data-shift-reset]').evaluate(e=>e===document.activeElement),true);
 for(const key of ['box','tri','pent','net']){const button=p.locator('[data-prism-view="'+key+'"]');await button.focus();await p.keyboard.press('Enter');assert.equal(await button.getAttribute('aria-pressed'),'true');assert.equal(await p.locator('[data-prism-scene="'+key+'"]').getAttribute('aria-hidden'),'false');assert.equal(await button.evaluate(e=>e===document.activeElement),true);}
 for(const width of [320,390,1280])for(const theme of ['light','dark']){
  await p.setViewportSize({width,height:2200});await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);await p.waitForFunction(t=>getComputedStyle(document.body).color===(t==='dark'?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),theme);await p.waitForTimeout(350);
  const rows=await p.evaluate(()=>{
   const rows=[],q=s=>document.querySelector(s),change=(el,value)=>{el.value=String(value);el.dispatchEvent(new Event(el.tagName==='INPUT'?'input':'change'));};
   function record(host,kind,index){
    const box=host.getBoundingClientRect(),svg=host.matches('svg')?host:host.querySelector('svg');let labels=[];
    if(svg){const v=svg.viewBox.baseVal;labels=[...svg.querySelectorAll('text')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBBox();return{text:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height,fit:r.x>=0&&r.y>=0&&r.x+r.width<=v.width&&r.y+r.height<=v.height,size:parseFloat(getComputedStyle(e).fontSize)*svg.getBoundingClientRect().width/v.width};});}
    const overlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h)overlaps.push([a.text,b.text]);}
    const controls=[...host.querySelectorAll('input,select,button')].map(e=>{const r=e.getBoundingClientRect();return{height:r.height,left:r.left,right:r.right};});
    rows.push({kind,index,left:box.left,right:box.right,overflow:document.documentElement.scrollWidth>innerWidth+1,labels,overlaps,controls});
   }
   const triangle=q('[data-triangle-lab]'),sides=[...triangle.querySelectorAll('input')];for(let a=1;a<=10;a++)for(let b=1;b<=10;b++)for(let c=1;c<=10;c++){sides.forEach((e,i)=>e.value=[a,b,c][i]);sides[0].dispatchEvent(new Event('input'));record(triangle,'triangle',a+','+b+','+c);}
   const mirror=q('[data-reflection-lab]'),x=mirror.querySelector('[data-reflect-x]'),y=mirror.querySelector('[data-reflect-y]'),axis=mirror.querySelector('select');for(const key of ['x','y'])for(let px=-5;px<=5;px++)for(let py=-5;py<=5;py++){x.value=px;y.value=py;change(axis,key);record(mirror,'reflection',key+','+px+','+py);}
   const shift=q('[data-translation-lab]'),sx=shift.querySelector('[data-shift-x]'),sy=shift.querySelector('[data-shift-y]');for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++){sy.value=dy;change(sx,dx);record(shift,'translation',dx+','+dy);}
   for(const key of ['box','tri','pent','net']){q('[data-prism-view="'+key+'"]').click();record(q('[data-prism-lab]'),'prism',key);}
   document.querySelectorAll('svg.quad-reference-svg').forEach((e,i)=>record(e,'reference',i));return rows;
  });
  for(const row of rows){assert.ok(!row.overflow&&row.left>=0&&row.right<=width+1,JSON.stringify({width,theme,...row}));assert.ok(row.labels.every(l=>l.fit&&l.size>=12)&&!row.overlaps.length,JSON.stringify({width,theme,...row}));assert.ok(row.controls.every(c=>c.height>=44&&c.left>=row.left&&c.right<=row.right+1),JSON.stringify({width,theme,...row}));layouts.push({width,theme,kind:row.kind,index:row.index});}
  await p.locator('[data-triangle-reset]').click();await p.locator('[data-triangle-lab]').screenshot({path:path.join(out,'triangle-'+width+'-'+theme+'.png')});await p.locator('[data-reflection-lab]').screenshot({path:path.join(out,'reflection-'+width+'-'+theme+'.png')});await p.locator('[data-translation-lab]').screenshot({path:path.join(out,'translation-'+width+'-'+theme+'.png')});
  for(const key of ['box','tri','pent','net']){await p.locator('[data-prism-view="'+key+'"]').click();await p.locator('[data-prism-lab]').screenshot({path:path.join(out,'prism-'+key+'-'+width+'-'+theme+'.png')});}
  for(let i=0;i<4;i++)await p.locator('svg.quad-reference-svg').nth(i).screenshot({path:path.join(out,'reference-'+i+'-'+width+'-'+theme+'.png')});
 }
 assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:b.version(),layouts,errors},null,2)+'\n');console.log('PASS: '+layouts.length+' legacy geometry model/reference layouts; keyboard, reset, text bounds and persistence isolation.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
