const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
async function hub(blocked){
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/physik_bay6/topics/learning.html',runScripts:'outside-only'}),w=dom.window;
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Storage blocked','SecurityError');}});
 w.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});
 w.eval(read('js/curriculum.js'));w.eval(read('js/chapter-revisions.js'));w.eval(read('js/learning.js'));
 await new Promise(resolve=>setImmediate(resolve));return dom;
}
(async()=>{for(const blocked of [false,true]){
 const dom=await hub(blocked),w=dom.window,d=w.document;
 assert.equal(d.querySelectorAll('.chapter').length,20);
 const add=d.querySelector('.chapter button[aria-pressed]'),key=add.dataset.focusKey;add.focus();add.click();
 assert.equal(d.activeElement.dataset.focusKey,key);assert.equal(d.activeElement.getAttribute('aria-pressed'),'true');
 assert.equal(d.querySelectorAll('#selected>li').length,1);
 assert.ok(d.querySelector('#selected>li ul li'),'Descriptions loaded despite blocked storage');
 if(blocked)assert.match(d.getElementById('notice').textContent,/nicht dauerhaft gespeichert/);
 // Storage events re-render the list without discarding keyboard position.
 w.dispatchEvent(new w.Event('storage'));assert.equal(d.activeElement.dataset.focusKey,key);
 d.getElementById('share').click();const shared=new URL(d.getElementById('share-url').value);
 assert.ok(shared.hash.includes('plan='));assert.equal(shared.pathname,'/physik_bay6/index.html');
 const remove=d.querySelector('[data-focus-key^="plan-remove-"]');remove.focus();remove.click();
 assert.equal(d.querySelectorAll('#selected>li').length,0);assert.equal(d.activeElement,d.querySelector('#plan h2'));
 assert.equal(d.getElementById('share').disabled,true);assert.equal(d.getElementById('share-wrap').hidden,true);
 dom.window.close();
 }console.log('PASS: learning hub loads with denied storage, selections remain usable and shareable, focus survives catalog and storage renders, removing a plan item focuses its heading.');
})().catch(error=>{console.error(error);process.exitCode=1;});
