'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.SCIVERSE_PREVIEW_URL||'http://127.0.0.1:4173',out=path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR||path.join(__dirname,'../../browser-qa/statistics-year4')),topic='math4_7_statistik';
const keys={m47_q1:0,m47_mean:0,m47_q2:0,m47_even:0,m47_boxread:0,m47_range:0,m47_change:0,m47_dip1:0,m47_missing:1,m47_joint:0,m47_reference:2,m47_product:1,m47_paths:2,m47_coin_paths:0,m47_without_branch:1,m47_without_rr:2,m47_without_atleast:0};
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({headless:true}),errors=[],crossLayouts=[],treeLayouts=[];try{
 const p=await b.newPage({viewport:{width:390,height:900}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/topics/template.html?topic='+topic);await p.waitForFunction(()=>document.querySelector('[data-stat4-tree]')?.dataset.bound==='true');
 const saved=await p.evaluate(()=>JSON.stringify(localStorage)),tree=p.locator('[data-stat4-tree]'),cross=p.locator('[data-stat4-cross]');let models=0;
 for(let red=1;red<=3;red++)for(const replace of [true,false])for(const event of ['both','one','atleast']){
  await p.locator('#stat4-red').selectOption(String(red));await p.locator('#stat4-replace').selectOption(replace?'yes':'no');await p.locator('#stat4-event').selectOption(event);
  const pairs=[];for(let a=0;a<4;a++)for(let c=0;c<4;c++)if(replace||a!==c)pairs.push([a<red,c<red]);const wins=pairs.filter(([a,c])=>event==='both'?a&&c:event==='one'?a!==c:a||c).length;
  await p.locator('#stat4-answer').fill((100*wins/pairs.length).toFixed(2).replace('.',','));await p.locator('#stat4-answer').press('Enter');assert.match(await tree.locator('[data-stat4-result]').textContent(),/^Richtig\./);assert.equal(await tree.locator('[data-stat4-path]').count(),4);assert.equal(await tree.locator('[data-stat4-result]').evaluate(e=>e===document.activeElement),true);models++;
 }
 await p.locator('#stat4-answer').fill('101');await tree.locator('[data-stat4-check]').click();assert.equal(await p.locator('#stat4-answer').getAttribute('aria-invalid'),'true');await tree.locator('[data-stat4-reset]').click();assert.equal(await p.locator('#stat4-red').evaluate(e=>e===document.activeElement),true);
 assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),saved);
 for(const width of [320,390,1280])for(const dark of [false,true]){
  await p.setViewportSize({width,height:900});await p.evaluate(d=>document.documentElement.setAttribute('data-theme',d?'dark':'light'),dark);await p.waitForFunction(d=>getComputedStyle(document.body).color===(d?'rgb(224, 224, 224)':'rgb(45, 55, 72)'),dark);
  for(const data of ['base','second','empty'])for(const ref of ['all','row','column']){
   await p.locator('#stat4-data').selectOption(data);await p.locator('#stat4-base').selectOption(ref);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(await cross.locator('[data-stat4-cell]').count(),4);crossLayouts.push({width,dark,data,ref});
   if(width===320&&ref==='row'&&data!=='second')await cross.screenshot({path:path.join(out,`cross-${data}-${dark?'dark':'light'}.png`)});
  }
  for(const red of ['1','2','3'])for(const replace of ['yes','no']){
   await p.locator('#stat4-red').selectOption(red);await p.locator('#stat4-replace').selectOption(replace);await p.locator('#stat4-event').selectOption('one');await tree.locator('[data-stat4-show]').click();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(await tree.locator('[data-stat4-paths]').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
   const bounds=await tree.locator('svg text').evaluateAll(nodes=>nodes.map(e=>{const r=e.getBBox();return[r.x,r.y,r.x+r.width,r.y+r.height];}));assert.ok(bounds.every(r=>r[0]>=0&&r[1]>=0&&r[2]<=480&&r[3]<=390));treeLayouts.push({width,dark,red,replace});
   if(width===320&&red==='3')await tree.screenshot({path:path.join(out,`tree-${replace}-${dark?'dark':'light'}.png`)});
   if(width===1280&&!dark){await tree.locator('svg').scrollIntoViewIfNeeded();await tree.locator('svg').screenshot({path:path.join(out,`full-tree-${red}-${replace}.png`)});}
  }
  if(width===320){await p.locator('[data-statistics-lab]').screenshot({path:path.join(out,`boxplot-${dark?'dark':'light'}.png`)});await p.locator('.stat4-tree-figure').screenshot({path:path.join(out,`example-${dark?'dark':'light'}.png`)});
   for(const selector of ['[data-stat4-tree-drawing]','[data-stat4-cross-output] .stat4-scroll','.stat4-tree-figure .stat4-scroll','.stat4-boxplot']){const region=p.locator(selector);await region.focus();await p.keyboard.press('ArrowRight');await p.waitForFunction(s=>document.querySelector(s).scrollLeft>0,selector);await p.waitForTimeout(220);}
   await tree.locator('[data-stat4-reset]').click();assert.equal(await tree.locator('[data-stat4-tree-drawing]').evaluate(e=>e.scrollLeft),0);
  }
 }
 console.log('PASS: 18 native models, 54 cross-table layouts, 36 tree layouts, keyboard/focus/storage; starting 47 graded answers.');
 const qs=await p.evaluate(()=>currentChapterQuiz.questions.map(q=>({id:q.id,length:q.answers.length})));assert.equal(qs.length,17);let answers=0;
 for(const[index,q]of qs.entries())for(let choice=0;choice<q.length;choice++){
  if(!answers)await p.locator('#chapter-quiz-launch').click();else await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
  await p.evaluate(({keys,index})=>currentChapterQuiz.questions.forEach((q,k)=>{if(k!==index)document.querySelector(`input[name="chapter_q_${k}"][value="${keys[q.id]}"]`).checked=true;}),{keys,index});await p.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check();await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
  const result=await p.evaluate(topic=>JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[topic],topic),right=choice===keys[q.id];assert.equal(result.lastPercent,right?100:94);assert.deepEqual(result.reviewQuestionIds,right?[]:[q.id]);const feedback=await p.evaluate(({index,choice})=>currentChapterQuiz.questions[index].answers[choice].feedback,{index,choice});assert.ok((await p.locator('#chapter-quiz-result').textContent()).includes(feedback));answers++;
 }
 const paper=await b.newPage();paper.on('pageerror',e=>errors.push(e.message));await paper.goto(base+'/topics/worksheet.html?topic='+topic);await paper.waitForFunction(()=>!document.getElementById('ws-print').disabled);assert.equal(await paper.locator('.stat4-tree-figure svg').count(),1);assert.equal(await paper.locator('.stat4-paper').count(),2);assert.equal(await paper.locator('[data-stat4-tasks] li').count(),9);assert.equal(await paper.locator('#ws-solutions').isVisible(),false);await paper.locator('#ws-include-solutions').check();assert.equal(await paper.locator('#ws-solutions [data-stat4-solution]').count(),3);
 assert.equal(await paper.locator('.stat4-kennzahlen-paper').count(),1);assert.equal(await paper.locator('#ws-solutions [data-stat4-kennzahlen-solution]').count(),1);assert.equal(await paper.locator('#ws-solutions [data-stat4-generated-answer]').count(),6);
 await paper.pdf({path:path.join(out,'statistics-year4-solutions.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:'15mm',right:'15mm',bottom:'15mm',left:'15mm'}});assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:b.version(),models,answers,crossLayouts,treeLayouts,keyboard:true,storageUnchanged:true,errors},null,2));console.log('PASS: 18 models, 90 layouts, 47 graded answers and optional worksheet solutions; PDF exported.');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
