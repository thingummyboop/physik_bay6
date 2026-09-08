const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_sinne_gehirn';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-contrast-lab]'),button=zone.querySelector('button'),centers=[...zone.querySelectorAll('[data-contrast-center]')],backs=[...zone.querySelectorAll('[data-contrast-background]')];
 const original=centers.map(e=>e.outerHTML);assert.equal(centers[0].getAttribute('fill'),centers[1].getAttribute('fill'));button.focus();
 for(const equal of [true,false,true,false]){
  button.click();assert.equal(button.getAttribute('aria-pressed'),String(equal));assert.equal(d.activeElement,button);
  assert.equal(backs[0].getAttribute('fill')===backs[1].getAttribute('fill'),equal);
  assert.deepEqual(centers.map(e=>e.outerHTML),original,'Only the context changes, not either target square');
  assert.match(zone.querySelector('[role=status]').textContent,/Grauwert/);
 }
 assert.match(zone.textContent,/keine Messung deiner Sehfähigkeit/);
 dom.window.close();console.log('PASS: 10 sensory questions, revision, equal target colors, background-only toggling, repeat initialization, stable focus and non-diagnostic explanation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
