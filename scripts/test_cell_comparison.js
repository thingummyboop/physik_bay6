const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_zellen';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10);
 assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).outdated,true);
 assert.match(d.body.textContent,/400-fach/);assert.match(d.body.textContent,/nicht sicher erkennbar/);
 assert.doesNotMatch(d.body.textContent,/Ein ganzer Wald|Der Schnabel|Wald → Knochen/);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const select=d.querySelector('[data-cell-kind]'),zone=d.querySelector('[data-cell-comparison]');select.focus();
 const present=id=>zone.querySelector(`[data-cell-part="${id}"] td`).textContent==='Ja';
 for(const kind of ['leaf','root','animal','leaf']){
  select.value=kind;select.dispatchEvent(new w.Event('change'));
  assert.equal(zone.querySelectorAll('tbody tr').length,7);
  for(const part of ['membrane','plasma','nucleus','mitochondria'])assert.equal(present(part),true);
  for(const part of ['wall','vacuole'])assert.equal(present(part),kind!=='animal');
  assert.equal(present('chloroplasts'),kind==='leaf');assert.equal(d.activeElement,select);
  assert.ok(zone.querySelector('[data-cell-status]').textContent.length>40);
 }
 assert.equal(zone.querySelector('[data-cell-status]').getAttribute('role'),'status');
 dom.window.close();console.log('PASS: 10 revised cell questions, microscopy limits and magnification, revision, 7 structures across 3 examples, repeat initialization and control focus.');
})().catch(e=>{console.error(e);process.exitCode=1;});
