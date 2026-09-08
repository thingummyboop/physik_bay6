const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
(async()=>{
 for(const [plan,selected,saved,warn]of [['energie,missing,missing',['energie'],['energie','missing'],true],['missing',[],['arbeit'],true],['energie,energie',['energie'],['energie'],false],['',[],[],false]]){
  const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html?'+new URLSearchParams({plan}),runScripts:'outside-only'}),w=dom.window,d=w.document;
  w.localStorage.setItem('sciverse_study_plan',JSON.stringify(['arbeit']));w.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});
  for(const f of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
  assert.equal(d.querySelectorAll('#selected>li').length,selected.length);assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_study_plan')),saved);
  const warning=d.getElementById('plan-link-warning');assert.equal(warning.hidden,!warn);if(warn){assert.match(warning.textContent,/1 Kapitel/);assert.match(warning.textContent,/unvollständig/);d.querySelector('[data-mode="teach"]').click();assert.equal(warning.hidden,false);}
  if(plan==='missing'){assert.equal(d.getElementById('share').disabled,false);d.getElementById('share').click();assert.match(d.getElementById('share-url').value,/plan=missing/);assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_study_plan')),['arbeit']);}
  if(selected.length){
   d.getElementById('share').click();const shared=new URL(d.getElementById('share-url').value);const ids=new URLSearchParams(shared.hash.split('?')[1]).get('plan').split(',');assert.deepEqual(ids,warn?['energie','missing']:['energie']);
  }
  if(plan==='energie,missing,missing'){
   const restored=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html',runScripts:'outside-only'}),rw=restored.window,rd=rw.document;
   rw.localStorage.setItem('sciverse_study_plan',w.localStorage.getItem('sciverse_study_plan'));rw.fetch=w.fetch;
   for(const f of ['curriculum','chapter-revisions','learning'])rw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
   assert.equal(rd.getElementById('plan-link-warning').hidden,false);assert.match(rd.getElementById('plan-link-warning').textContent,/in dieser Stoffliste/);
   assert.equal(rd.querySelectorAll('#unavailable-chapters li').length,1);assert.match(rd.getElementById('unavailable-chapters').textContent,/missing/);
   rd.getElementById('share').click();assert.match(rd.getElementById('share-url').value,/missing/);
   const remove=rd.querySelector('#unavailable-chapters button');remove.focus();remove.click();
   assert.deepEqual(JSON.parse(rw.localStorage.getItem('sciverse_study_plan')),['energie']);assert.equal(rd.getElementById('plan-link-warning').hidden,true);assert.equal(rd.getElementById('share-wrap').hidden,true);assert.equal(rd.activeElement,rd.querySelector('#plan h2'));
   // An unavailable entry arriving in another tab is retained even if the known chapter is unchanged.
   rw.localStorage.setItem('sciverse_study_plan','["energie","later","later"]');rw.dispatchEvent(new rw.StorageEvent('storage',{key:'sciverse_study_plan',storageArea:rw.localStorage}));assert.equal(rd.querySelectorAll('#unavailable-chapters li').length,1);assert.match(rd.getElementById('unavailable-chapters').textContent,/later/);
   rw.localStorage.setItem('sciverse_study_plan',JSON.stringify(['energie','<img src=x onerror=alert(1)>']));rw.dispatchEvent(new rw.StorageEvent('storage',{key:'sciverse_study_plan',storageArea:rw.localStorage}));assert.equal(rd.getElementById('unavailable-chapters').querySelector('img'),null);assert.ok(rd.getElementById('unavailable-chapters').textContent.includes('<img'));
   restored.window.close();
  }
  dom.window.close();
 }
 console.log('PASS: partial/invalid shared plans warn, duplicate IDs collapse, all-invalid links preserve saved study plan, explicit empty plans clear it; unavailable IDs persist through reload/share/cross-tab updates, safe explicit removal and escaped labels.');
})().catch(e=>{console.error(e);process.exitCode=1;});
