'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/geometry-practice'));
(async()=>{
 fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({headless:true}),errors=[],layouts=[];
 try{
  const p=await b.newPage({viewport:{width:390,height:2400}});p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/topics/template.html?topic=math2_7_geometrie');await p.waitForFunction(()=>document.querySelector('[data-figure-symmetry]')?.dataset.bound==='true');
  const saved=await p.evaluate(()=>JSON.stringify(localStorage));
  await p.locator('[data-coordinate-check]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#coordinate-point').evaluate(e=>e===document.activeElement),true);
  await p.locator('#coordinate-x').fill('7');await p.locator('#coordinate-y').fill('-2');await p.keyboard.press('Enter');assert.equal(await p.locator('#coordinate-x').getAttribute('aria-invalid'),'true');assert.equal(await p.locator('#coordinate-x').evaluate(e=>e===document.activeElement),true);
  const expected=[[[-3,-2],[2,-2],[2,2],[-3,2]],[[-1,-3],[4,-3],[4,1],[-1,1]],[[3,-2],[-2,-2],[-2,2],[3,2]]];
  for(let t=0;t<3;t++){
   await p.locator('#coordinate-task').selectOption(String(t));
   for(let i=0;i<4;i++){await p.locator('#coordinate-point').selectOption(String(i));await p.locator('#coordinate-x').fill(String(expected[t][i][0]));await p.locator('#coordinate-y').fill(String(expected[t][i][1]));await p.keyboard.press('Enter');}
   await p.locator('[data-coordinate-check]').focus();await p.keyboard.press('Space');assert.match(await p.locator('[data-coordinate-status]').innerText(),/Alle vier Punkte passen/);
   await p.locator('#coordinate-x').fill('0');await p.locator('[data-coordinate-check]').click();assert.match(await p.locator('[data-coordinate-status]').innerText(),/x stimmt noch nicht/);
  }
  await p.locator('[data-coordinate-reset]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#coordinate-task').evaluate(e=>e===document.activeElement),true);
  await p.locator('[data-symmetry-check]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#symmetry-guess').evaluate(e=>e===document.activeElement),true);
  await p.keyboard.press('ArrowDown');await p.keyboard.press('Tab');await p.keyboard.press('Enter');assert.match(await p.locator('[data-symmetry-status]').innerText(),/Deine Vermutung stimmt/);
  for(const width of [320,390,1280])for(const theme of ['light','dark']){
   await p.setViewportSize({width,height:2400});await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);await p.waitForFunction(t=>getComputedStyle(document.body).color===(t==='dark'?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),theme);await p.waitForTimeout(350);
   const rows=await p.evaluate(({expected,edgeCases})=>{
    const rows=[],q=s=>document.querySelector(s),change=(selector,value)=>{const e=q(selector);e.value=String(value);e.dispatchEvent(new Event(e.tagName==='INPUT'?'input':'change'));};
    function record(host,kind,index){
     const r=host.getBoundingClientRect();
     const svgs=[...host.querySelectorAll('svg')].map(svg=>{const v=svg.viewBox.baseVal,labels=[...svg.querySelectorAll('text')].map(el=>{const box=el.getBBox();return {text:el.textContent,x:box.x,y:box.y,width:box.width,height:box.height,size:parseFloat(getComputedStyle(el).fontSize)*svg.getBoundingClientRect().width/v.width,fit:box.x>=0&&box.y>=0&&box.x+box.width<=v.width&&box.y+box.height<=v.height};});const overlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(a.x<b.x+b.width&&b.x<a.x+a.width&&a.y<b.y+b.height&&b.y<a.y+a.height)overlaps.push([a.text,b.text]);}return{labels,overlaps};});
     const controls=[...host.querySelectorAll('input,select,button')].map(e=>{const box=e.getBoundingClientRect();let textFits=true;if(e.tagName==='SELECT'){const c=document.createElement('canvas').getContext('2d'),s=getComputedStyle(e);c.font=s.font;textFits=c.measureText(e.selectedOptions[0].textContent).width+parseFloat(s.paddingLeft)+parseFloat(s.paddingRight)+22<=box.width;}return{height:box.height,left:box.left,right:box.right,textFits};});
     rows.push({kind,index,left:r.left,right:r.right,overflow:document.documentElement.scrollWidth>innerWidth+1,svgs,controls});
    }
    for(let t=0;t<3;t++){change('#coordinate-task',t);record(q('[data-coordinate-drawing]'),'empty',t);for(let i=0;i<4;i++){change('#coordinate-point',i);change('#coordinate-x',expected[t][i][0]);change('#coordinate-y',expected[t][i][1]);q('[data-coordinate-place]').click();record(q('[data-coordinate-drawing]'),'point',t*4+i);}q('[data-coordinate-check]').click();record(q('[data-coordinate-drawing]'),'checked',t);}
    for(let s=0;s<5;s++)for(const axis of ['x','y','up','down']){change('#symmetry-shape',s);change('#symmetry-axis',axis);record(q('[data-figure-symmetry]'),'guess',s+axis);change('#symmetry-guess','yes');q('[data-symmetry-check]').click();record(q('[data-figure-symmetry]'),'mirror',s+axis);}
    document.querySelectorAll('.coordinate-figure').forEach((e,i)=>record(e,'static',i));
    if(edgeCases){let index=0;for(let x=-6;x<=6;x++)for(let y=-6;y<=6;y++){
     const cases=[Array(4).fill([x,y]),[[x,y],null,null,null]];if(x<6&&y<6)cases.push([[x,y],[x+1,y],[x+1,y+1],[x,y+1]]);
     for(const points of cases){const host=q('[data-coordinate-view]');host.innerHTML=coordinateDrawingSvg(points,['A′','B′','C′','D′']);if(host.querySelectorAll('text').length!==11+points.filter(Boolean).length)throw Error('Missing point name');record(host,'entry',index++);}
    }q('[data-coordinate-place]').click();}
    return rows;
   },{expected,edgeCases:width===320&&theme==='light'});
   for(const row of rows){assert.ok(!row.overflow&&row.left>=0&&row.right<=width+1,JSON.stringify({width,theme,...row}));assert.ok(row.svgs.every(s=>s.labels.every(l=>l.fit&&l.size>=12)&&s.overlaps.length===0),JSON.stringify({width,theme,...row}));assert.ok(row.controls.every(c=>c.height>=44&&c.left>=row.left&&c.right<=row.right+1&&c.textFits),JSON.stringify({width,theme,...row}));layouts.push({width,theme,kind:row.kind,index:row.index});}
   await p.locator('#symmetry-shape').selectOption('1');await p.locator('#symmetry-axis').selectOption('y');await p.locator('#symmetry-guess').selectOption('yes');await p.locator('[data-symmetry-check]').click();await p.locator('[data-figure-symmetry]').screenshot({path:path.join(out,'symmetry-'+width+'-'+theme+'.png')});await p.locator('[data-coordinate-drawing]').screenshot({path:path.join(out,'drawing-'+width+'-'+theme+'.png')});
  }
  await p.locator('[data-symmetry-reset]').focus();await p.keyboard.press('Space');assert.equal(await p.locator('#symmetry-shape').evaluate(e=>e===document.activeElement),true);assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:b.version(),layouts,errors},null,2)+'\n');console.log('PASS: '+layouts.length+' coordinate/symmetry layouts; native entry, invalid values, feedback, keyboard and reset.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
