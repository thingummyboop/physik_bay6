const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_oekosysteme';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-habitat-sampling]'),select=zone.querySelector('select'),result=zone.querySelector('[role=status]');select.focus();
 for(const [round,expected]of [['0',[[20,2],[10,5]]],['1',[[15,2],[6,3]]],['2',[[11,3],[9,3]]],['0',[[20,2],[10,5]]]]){
  select.value=round;select.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,select);
  const rows=[...zone.querySelectorAll('tbody tr')];assert.equal(rows.length,5);
  for(const [column,[total,richness]]of expected.entries()){
   const counts=rows.map(row=>Number(row.querySelectorAll('td')[column].textContent));
   assert.equal(counts.reduce((sum,n)=>sum+n,0),total);assert.equal(counts.filter(n=>n>0).length,richness);
   assert.ok(result.textContent.includes(`${total} Individuen, ${richness} nachgewiesene Arten`));
  }
  assert.equal(result.textContent.includes('dieselbe Artenzahl'),round==='2');
 }
 assert.match(zone.textContent,/keine Messung aus einer Wiener Schule/);assert.match(zone.textContent,/nicht, dass die Mahd die einzige Ursache/);
 dom.window.close();console.log('PASS: forest assessment revision, 10 questions, three sampling datasets, distinct abundance/richness, zero counts, reset, focus and inference limits.');
})().catch(e=>{console.error(e);process.exitCode=1;});
