const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_pflanzenvermehrung';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10,'Ten distinct questions, rather than duplicated section questions');
 assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).outdated,true);
 assert.match(d.body.textContent,/Selbstbefruchtung ist geschlechtlich/);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const selects=[...d.querySelectorAll('[data-reproduction-item]')],check=d.querySelector('[data-reproduction-check]'),status=d.querySelector('[data-reproduction-status]');
 assert.equal(selects.length,5);check.click();assert.match(status.textContent,/5 noch nicht/);
 for(const select of selects){select.value='pollination';assert.ok(d.getElementById(select.getAttribute('aria-describedby')));}
 check.click();assert.match(status.textContent,/1 von 5/);
 const answers=['pollination','fertilization','development','dispersal','germination'];
 selects.forEach((s,i)=>{s.value=answers[i];s.dispatchEvent(new w.Event('change'));});check.click();assert.match(status.textContent,/5 von 5/);
 assert.ok(selects.every(s=>s.getAttribute('aria-invalid')==='false'));
 selects[0].value='dispersal';selects[0].dispatchEvent(new w.Event('change'));assert.match(status.textContent,/erneut/);assert.equal(d.getElementById(selects[0].getAttribute('aria-describedby')).textContent,'');
 d.querySelector('[data-reproduction-reset]').click();assert.equal(d.activeElement,selects[0]);assert.ok(selects.every(s=>s.value===''));
 dom.window.close();console.log('PASS: 10 distinct questions, revision, five reproduction stages, missing/wrong/correct feedback, stale feedback clearing, retry and keyboard reset.');
})().catch(e=>{console.error(e);process.exitCode=1;});
