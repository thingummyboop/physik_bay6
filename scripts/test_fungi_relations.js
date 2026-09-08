const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_pilze';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,11);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-fungi-relations]'),select=zone.querySelector('select'),check=zone.querySelector('button'),feedback=zone.querySelector('[role=status]');
 const values=['decomposer','mutualism','parasite'];
 check.click();assert.match(feedback.textContent,/zuerst/);
 for(const [kind,answer]of [['wood','decomposer'],['root','mutualism'],['leaf','parasite']]){
  select.focus();select.value=kind;select.dispatchEvent(new w.Event('change'));
  assert.equal(d.activeElement,select);assert.equal(zone.querySelector('input:checked'),null);assert.equal(feedback.textContent,'');
  for(const value of values){
   zone.querySelector(`input[value="${value}"]`).click();assert.match(feedback.textContent,/geändert/);
   check.focus();check.click();assert.equal(feedback.textContent.startsWith('Richtig.'),value===answer);
   assert.equal(d.activeElement,check);assert.ok(feedback.textContent.length>100);
  }
 }
 select.value='wood';select.dispatchEvent(new w.Event('change'));check.click();assert.match(feedback.textContent,/zuerst/);
 assert.equal(zone.querySelectorAll('input[type=radio]').length,3);
 assert.match(d.body.textContent,/allein beweist noch keine Mykorrhiza/);
 dom.window.close();console.log('PASS: 11 fungi questions, all 9 relation answers, missing selection, scenario reset, stable focus, explanatory feedback and limits of identification.');
})().catch(e=>{console.error(e);process.exitCode=1;});
