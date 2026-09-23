const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
const paths={6:['optik1','erde_mond_sonne','linsen_spiegel','farben','akustik'],7:['kraft_und_bewegung','energie','elektrizitaet','elektromagnetismus','arbeit','drehundstatik'],8:['waermelehre','wetter','klima','klimawandel','strahlung_radioaktivitaet','kraftwerke_energieversorgung']};
(async()=>{
 for(const denied of [false,true]){
  const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/site/topics/learning.html?mode=teach&plan=klimawandel,energie,waermelehre',runScripts:'outside-only'}),w=dom.window,d=w.document;
  w.fetch=async()=>({ok:true,json:async()=>data});if(denied)w.Storage.prototype.setItem=function(){throw new w.DOMException('Denied','SecurityError');};
  const opened=[];w.guideCapture=id=>opened.push(id);
  for(const f of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+f+'.js')+(f==='learning'?'\nwindow.guideRoute=chapterRoute;openChapter=window.guideCapture;':''));await new Promise(r=>setImmediate(r));
  const guide=d.getElementById('physics-guide'),stored=JSON.stringify(w.localStorage),order=()=>[...d.querySelectorAll('#selected [data-focus-key^="plan-open-"]')].map(e=>e.dataset.focusKey.slice(10));
  assert.equal(guide.hidden,false);assert.equal(guide.open,false);assert.equal(guide.lang,'de');assert.equal(guide.querySelectorAll('.guide-stage').length,3);assert.equal(d.getElementById('dgb-guide').hidden,true);guide.open=true;
  const selected=order();assert.deepEqual(selected,['klimawandel','energie','waermelehre']);
  for(const [grade,ids]of Object.entries(paths)){
   const actual=[...guide.querySelectorAll('[data-guide-grade="'+grade+'"] .guide-chapters button')].map(e=>e.dataset.focusKey.replace('physics-guide-open-',''));assert.deepEqual(actual,ids);
   d.getElementById('search').value='unauffindbar94612';d.getElementById('search').dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('.chapter').length,0);
   d.querySelector('[data-focus-key="physics-guide-'+grade+'"]').click();assert.equal(d.getElementById('grade').value,grade);assert.equal(d.getElementById('search').value,'');assert.equal(d.activeElement,d.getElementById('count'));assert.equal(guide.open,true);
   assert.deepEqual([...d.querySelectorAll('#chapters [data-focus-key^="catalog-open-"]')].map(e=>e.dataset.focusKey.slice(13)),['sieinheiten',...ids]);
   assert.equal(guide.querySelectorAll('button[aria-pressed=true]').length,1);assert.equal(guide.querySelector('button[aria-pressed=true]').dataset.focusKey,'physics-guide-'+grade);
   for(const id of ['astronomie','rechenbeispiele'])assert.ok(guide.querySelector('[data-focus-key="physics-guide-open-'+id+'"]'));
   assert.deepEqual(order(),selected);assert.equal(JSON.stringify(w.localStorage),stored);
  }
  for(const mode of ['learn','review','teach']){d.querySelector('[data-mode="'+mode+'"]').click();assert.equal(guide.hidden,false);assert.equal(guide.open,true);assert.deepEqual(order(),selected);}
  // All guide actions pass a real chapter and preserve the ordered plan and mode in its route.
  for(const b of guide.querySelectorAll('[data-focus-key^="physics-guide-open-"]'))b.click();
  assert.deepEqual(opened,['sieinheiten',...Object.values(paths).flat(),'astronomie','rechenbeispiele']);
  for(const id of opened){const route=w.guideRoute(id);const q=new URL('https://example.test/'+route).searchParams;assert.equal(q.get('topic'),id);assert.equal(q.get('mode'),'teach');assert.equal(q.get('plan'),selected.join(','));}
  for(const subject of ['dgb','mathematik','']){d.getElementById('subject').value=subject;d.getElementById('subject').dispatchEvent(new w.Event('input'));assert.equal(guide.hidden,true);}
  d.getElementById('subject').value='physik';d.getElementById('subject').dispatchEvent(new w.Event('input'));assert.equal(guide.hidden,false);assert.equal(guide.open,true);
  guide.querySelector('summary').focus();d.querySelector('[data-mode=review]').click();assert.equal(d.activeElement,guide.querySelector('summary'));
  d.getElementById('share').click();assert.match(decodeURIComponent(d.getElementById('share-url').value),/plan=klimawandel,energie,waermelehre/);assert.equal(JSON.stringify(w.localStorage),stored);
  // Chapter dependencies must exist, remain acyclic and precede their dependents in the recommended order.
  const ids=['sieinheiten',...Object.values(paths).flat(),'astronomie','rechenbeispiele'],visiting=new Set(),done=new Set();
  function visit(id){assert.ok(data[id],id);if(done.has(id))return;assert.ok(!visiting.has(id),'cycle at '+id);visiting.add(id);for(const prior of data[id].prerequisites||[]){if(!/^[a-z0-9_]+$/.test(prior))continue;assert.ok(ids.includes(prior),'missing prerequisite '+prior);assert.ok(ids.indexOf(prior)<ids.indexOf(id),'prerequisite follows '+id);visit(prior);}visiting.delete(id);done.add(id);}ids.forEach(visit);
  dom.window.close();
 }
 // Catalog-based navigation also works when content cannot be fetched; no false successful loading state.
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html',runScripts:'outside-only'}),w=dom.window,d=w.document;w.fetch=async()=>{throw Error('offline');};for(const f of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));assert.equal(d.getElementById('physics-guide').hidden,false);assert.equal(d.querySelectorAll('#physics-guide [data-focus-key^="physics-guide-open-"]').length,20);assert.equal(d.getElementById('retry-content').hidden,false);dom.window.close();
 console.log('PASS: physics guide for three years; 20 contextual chapter routes; year filters, extras, focus and disclosure; unchanged ordered/shared plan with denied storage; valid acyclic prerequisites; content-fetch failure fallback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
