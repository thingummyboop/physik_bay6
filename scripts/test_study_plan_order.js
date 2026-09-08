const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
async function hub(plan,blocked=false){
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/physik_bay6/topics/learning.html?mode=review&plan='+plan.join(','),runScripts:'outside-only'}),w=dom.window;
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Denied','SecurityError');}});
 w.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});
 for(const file of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+file+'.js'));
 await new Promise(resolve=>setImmediate(resolve));return dom;
}
const order=d=>[...d.querySelectorAll('#selected [data-focus-key^="plan-open-"]')].map(b=>b.dataset.focusKey.slice('plan-open-'.length));
(async()=>{for(const blocked of [false,true]){
 const initial=['sieinheiten','optik1','akustik'],dom=await hub(initial,blocked),w=dom.window,d=w.document;
 const move=(id,delta)=>d.querySelector(`[data-focus-key="plan-move-${delta}-${id}"]`);
 d.getElementById('share').click();assert.equal(d.getElementById('share-wrap').hidden,false);
 let control=move('optik1',-1);control.focus();control.click();
 assert.deepEqual(order(d),['optik1','sieinheiten','akustik']);
 assert.equal(d.activeElement.dataset.focusKey,'plan-move--1-optik1');
 assert.equal(d.activeElement.getAttribute('aria-disabled'),'true');
 d.activeElement.click();assert.deepEqual(order(d),['optik1','sieinheiten','akustik'],'Upper boundary must not wrap');
 assert.equal(d.getElementById('share-wrap').hidden,true,'Old share link is hidden after reordering');
 move('sieinheiten',1).click();assert.deepEqual(order(d),['optik1','akustik','sieinheiten']);
 move('sieinheiten',1).click();assert.deepEqual(order(d),['optik1','akustik','sieinheiten'],'Lower boundary must not wrap');
 assert.match(d.getElementById('plan-progress').textContent,/Stelle 3/);
 if(!blocked)assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_study_plan')),order(d));
 else assert.match(d.getElementById('notice').textContent,/nicht dauerhaft gespeichert/);
 d.getElementById('share').click();const url=new URL(d.getElementById('share-url').value),params=new URLSearchParams(url.hash.split('?')[1]);
 const sharedOrder=params.get('plan').split(',');assert.deepEqual(sharedOrder,order(d));
 const reopened=await hub(sharedOrder);assert.deepEqual(order(reopened.window.document),order(d));
 reopened.window.close();dom.window.close();
 }console.log('PASS: moving chapters in both directions, stable focus, boundary guards, stale-link hiding, persisted and shared order, reopening with order intact, blocked storage.');
})().catch(error=>{console.error(error);process.exitCode=1;});
