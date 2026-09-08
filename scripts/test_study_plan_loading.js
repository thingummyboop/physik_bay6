const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),tick=()=>new Promise(r=>setImmediate(r));
(async()=>{
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html?mode=teach&plan=energie,arbeit',runScripts:'outside-only'}),w=dom.window,d=w.document,pending=[];
 w.fetch=()=>new Promise(resolve=>pending.push(resolve));let prints=0;w.print=()=>prints++;
 for(const file of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+file+'.js'));
 const print=d.getElementById('print'),retry=d.getElementById('retry-content');
 assert.equal(print.disabled,true);assert.equal(d.getElementById('share').disabled,false);
 print.dispatchEvent(new w.Event('click'));assert.equal(prints,0,'Pending content cannot print even through a dispatched event');
 pending.shift()({ok:false});await tick();assert.equal(retry.hidden,false);assert.equal(retry.disabled,false);
 assert.match(d.getElementById('content-status').textContent,/nicht geladen/);
 retry.focus();retry.click();assert.equal(pending.length,1);assert.equal(retry.disabled,true);
 assert.equal(d.activeElement,d.getElementById('content-status'),'Retry focus remains on a visible loading status');
 retry.dispatchEvent(new w.Event('click'));assert.equal(pending.length,1,'Repeated activation does not start competing requests');
 pending.shift()({ok:true,json:async()=>null});await tick();assert.equal(print.disabled,true,'Malformed JSON payload cannot unlock printing');
 assert.equal(d.activeElement,retry,'Failed retry restores the retry control');
 retry.click();pending.shift()({ok:true,json:async()=>({energie:JSON.parse(read('lang/de.json')).energie})});await tick();
 assert.equal(print.disabled,true,'A missing selected chapter prevents incomplete printing');assert.match(d.getElementById('content-status').textContent,/mindestens ein/);
 retry.click();d.getElementById('search').focus();
 pending.shift()({ok:false});await tick();
 assert.equal(d.activeElement,d.getElementById('search'),'Loading completion does not steal focus after the user moves elsewhere');
 retry.focus();retry.click();pending.shift()({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});await tick();
 assert.equal(print.disabled,false);assert.equal(retry.hidden,true);assert.equal(d.querySelectorAll('#selected>li').length,2);
 assert.equal(d.activeElement,print,'Successful retry moves focus to the newly available print action');
 print.click();assert.equal(prints,1);
 assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_study_plan')),['energie','arbeit']);
 dom.window.close();console.log('PASS: delayed load, HTTP failure, malformed payload, partial content, retry recovery, print guard, preserved selection and available sharing.');
})().catch(error=>{console.error(error);process.exitCode=1;});
