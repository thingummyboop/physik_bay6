'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json'));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
(async()=>{
 for(const lang of ['de','en','sr','tr','uk','ar']){
  const translated=JSON.parse(read('lang/'+lang+'.json'));
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),w=dom.window;
  await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang',lang);
  w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:translated});
  for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();assert.equal(w.document.querySelector('[data-content-language-notice]'),null);
  w.eval(read('js/topics/math2_9_relative_haeufigkeit.js'));w.topicInit();w.topicInit();
  const lab=w.document.querySelector('[data-share-diagrams]'),input=lab.querySelector('input');assert.equal(lab.dataset.locale,lang);
  const rows=[...lab.querySelectorAll('[data-share-row]')];
  for(let n=0;n<=20;n++){
   input.value=n;input.dispatchEvent(new w.Event('input'));
   const svg=lab.querySelector('svg'),strip=svg.querySelector('[data-share-strip]'),sector=svg.querySelector('[data-share-sector]');
   near(Number(strip.getAttribute('width'))/280,n/20);
   rows.forEach((row,i)=>{
    const count=i?20-n:n,cells=[...row.querySelectorAll('td')];
    assert.equal(cells[0].textContent,count.toLocaleString(lang));assert.equal(cells[1].textContent,(count*5).toLocaleString(lang)+' %');assert.equal(cells[2].textContent,(count*18).toLocaleString(lang)+'°');
    assert.ok(cells.every(c=>c.querySelector('bdi[dir="ltr"]')));
   });
   if(n===0)assert.equal(sector,null);
   else if(n===20){assert.equal(sector.tagName,'circle');near(Number(sector.getAttribute('r')),90);}
   else{
    const match=sector.getAttribute('d').match(/^M160 125 L160 35 A90 90 0 ([01]) 1 ([\d.e+-]+) ([\d.e+-]+) Z$/);assert.ok(match);
    assert.equal(Number(match[1]),n>10?1:0);near(Number(match[2]),160+90*Math.sin(n*Math.PI/10));near(Number(match[3]),125-90*Math.cos(n*Math.PI/10));
   }
   assert.ok(svg.getAttribute('aria-label').includes(rows[0].querySelector('th').textContent));
   assert.doesNotMatch(lab.textContent,/NaN|Infinity/);assert.equal(lab.querySelectorAll('svg').length,1);
  }
  const reset=lab.querySelector('button');reset.focus();reset.click();assert.equal(input.value,'5');assert.equal(w.document.activeElement,reset);
  const tree=w.document.querySelector('[data-frequency-tree]'),treeInputs=[...tree.querySelectorAll('input')];
  const fmt=n=>n.toLocaleString(lang,{maximumFractionDigits:1});
  for(let a=0;a<=12;a++)for(let b=0;b<=8;b++){
   treeInputs[0].value=a;treeInputs[1].value=b;treeInputs[1].dispatchEvent(new w.Event('input'));
   assert.deepEqual([...tree.querySelectorAll('[data-tree-leaf]')].map(e=>e.textContent),[a,12-a,b,8-b].map(fmt));
   const within=[...tree.querySelectorAll('[data-tree-within]')],whole=[...tree.querySelectorAll('[data-tree-whole]')];
   [a,b].forEach((count,i)=>{
    assert.ok(within[i].textContent.startsWith(fmt(count)+'/'+fmt(i?8:12)));
    assert.ok(within[i].textContent.endsWith(fmt(count*100/(i?8:12))+' %'));
    assert.equal(whole[i].textContent,fmt(count)+'/'+fmt(20)+' = '+fmt(count*5)+' %');
   });
   assert.equal(tree.querySelector('[data-tree-total]').textContent,fmt(a+b)+'/'+fmt(20)+' = '+fmt((a+b)*5)+' %');
   assert.equal(within[0].textContent.includes('≈'),a%3!==0);
   assert.doesNotMatch(tree.textContent,/NaN|Infinity/);
  }
  const treeReset=tree.querySelector('button');treeReset.focus();treeReset.click();assert.deepEqual(treeInputs.map(i=>i.value),['6','2']);assert.equal(w.document.activeElement,treeReset);
  for(const id of ['relative_circle_angle','relative_tree_reference']){
   const q=w.currentChapterQuiz.questions.find(q=>q.id===id);assert.ok(q,id);assert.equal(q.answers.filter(a=>a.correct).length,1);assert.ok(q.answers.every(a=>a.feedback.length>15));
  }
  assert.equal(w.chapterRevision('math2_9_relative_haeufigkeit'),1);
  assert.equal(w.currentChapterResult('math2_9_relative_haeufigkeit',{passed:true,bestPercent:100,contentRevision:0}).passed,false);
  assert.equal(w.currentChapterResult('math2_9_relative_haeufigkeit',{passed:true,bestPercent:100,contentRevision:1}).passed,true);
  assert.equal(w.currentChapterQuiz.questions.length,10);dom.window.close();
 }
 console.log('PASS: share diagrams in six languages, all 126 count settings, arc geometry, strips, tables, zero/full cases and reset focus; 702 frequency-tree combinations with subgroup and overall denominators.');
})().catch(error=>{console.error(error);process.exitCode=1;});
