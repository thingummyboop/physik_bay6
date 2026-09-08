const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
async function hub(query=''){
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/physik_bay6/topics/learning.html'+query,runScripts:'outside-only'}),w=dom.window;
 w.localStorage.setItem('sciverse_study_plan','["arbeit"]');
 w.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});
 for(const name of ['curriculum','chapter-revisions','chapter-title-index','learning'])w.eval(read('js/'+name+'.js'));
 await new Promise(r=>setImmediate(r));return dom;
}
function storage(w,key,value){if(value===null)w.localStorage.removeItem(key);else w.localStorage.setItem(key,value);w.dispatchEvent(new w.StorageEvent('storage',{key,newValue:value,storageArea:w.localStorage}));}
(async()=>{
 const dom=await hub(),w=dom.window,d=w.document;
 const selected=()=>[...d.querySelectorAll('#selected [data-focus-key^="plan-open-"]')].map(x=>x.dataset.focusKey.replace('plan-open-',''));
 assert.deepEqual(selected(),['arbeit']);
 d.getElementById('share').click();assert.equal(d.getElementById('share-wrap').hidden,false);
 const filter=d.getElementById('search');filter.value='Energie';filter.dispatchEvent(new w.Event('input'));filter.focus();
 storage(w,'sciverse_study_plan','["energie","arbeit","energie"]');
 assert.deepEqual(selected(),['energie','arbeit']);assert.equal(d.getElementById('share-wrap').hidden,true);assert.equal(filter.value,'Energie');assert.equal(d.activeElement,filter);
 storage(w,'physik_lang','en');assert.equal(d.getElementById('plan-progress').lang,'en');assert.match(d.getElementById('plan-progress').textContent,/2 chapters/);assert.deepEqual(selected(),['energie','arbeit']);
 storage(w,'physik_dark_mode','true');assert.equal(d.documentElement.dataset.theme,'dark');
 storage(w,'physik_dark_mode','false');assert.equal(d.documentElement.dataset.theme,undefined);
 for(const bad of ['{','{}','[false]']){storage(w,'sciverse_study_plan',bad);assert.deepEqual(selected(),['energie','arbeit']);}
 // A delayed event must not restore old values over a newer storage value.
 w.localStorage.setItem('sciverse_study_plan','["optik1"]');w.dispatchEvent(new w.StorageEvent('storage',{key:'sciverse_study_plan',newValue:'["arbeit"]',storageArea:w.localStorage}));assert.deepEqual(selected(),['optik1']);
 storage(w,'physik_lang','unsupported');assert.equal(d.getElementById('plan-progress').lang,'de');
 const oldCard=d.querySelector('.chapter');storage(w,'unrelated-draft','text');assert.equal(d.querySelector('.chapter'),oldCard);
 w.sessionStorage.setItem('physik_lang','en');w.dispatchEvent(new w.StorageEvent('storage',{key:'physik_lang',storageArea:w.sessionStorage}));assert.equal(d.getElementById('plan-progress').lang,'de');
 storage(w,'sciverse_study_plan',null);assert.deepEqual(selected(),[]);
 storage(w,'sciverse_study_plan','["energie"]');storage(w,'physik_lang','en');storage(w,'physik_dark_mode','true');
 w.localStorage.clear();w.dispatchEvent(new w.StorageEvent('storage',{key:null,storageArea:w.localStorage}));assert.deepEqual(selected(),[]);assert.equal(d.getElementById('plan-progress').lang,'de');assert.equal(d.documentElement.dataset.theme,undefined);
 dom.window.close();
 const linked=await hub('?plan=energie,missing-chapter'),lw=linked.window,ld=lw.document;
 storage(lw,'sciverse_study_plan','["optik1"]');assert.ok(ld.querySelector('[data-focus-key="plan-open-energie"]'));assert.ok(!ld.querySelector('[data-focus-key="plan-open-optik1"]'));assert.equal(ld.getElementById('plan-link-warning').hidden,false);
 storage(lw,'physik_lang','en');assert.equal(ld.getElementById('plan-link-warning').lang,'en');ld.getElementById('share').click();assert.match(ld.getElementById('share-url').value,/missing-chapter/);
 linked.window.close();console.log('PASS: cross-tab language/theme/local-plan updates, order/deduplication, stale-share hiding, focus/filter preservation, malformed storage, delayed events, ignored session/unrelated storage, clear/reset and stable explicit shared lists.');
})().catch(e=>{console.error(e);process.exitCode=1;});
