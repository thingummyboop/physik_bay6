const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_salze_wasser',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/Zucker.*ungeladene Moleküle/);
 assert.match(d.body.textContent,/Rühren hilft beim schnelleren Lösen/);
 assert.equal(w.currentChapterResult('chemie_salze_wasser',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="crystal"]'),range=lab.querySelector('input[type="range"]');
 // Cross the saturation boundary, remove most water, then return to the initial state.
 for(const [evaporated,dissolved,solid,state] of [[0,18,0,'Ungesättigt'],[40,18,0,'Ungesättigt'],[50,18,0,'Sättigungsgrenze'],[60,14.4,3.6,'mit Kristallen'],[90,3.6,14.4,'mit Kristallen'],[0,18,0,'Ungesättigt']]){
  range.value=evaporated;range.dispatchEvent(new w.Event('input'));
  assert.equal(Number(lab.querySelector('[data-salt-dissolved]').dataset.saltDissolved),dissolved);
  assert.equal(Number(lab.querySelector('[data-salt-crystal]').dataset.saltCrystal),solid);
  assert.ok(Math.abs(dissolved+solid-18)<1e-9);
  assert.equal(lab.querySelectorAll('[data-crystal]').length>0,solid>0);
  assert.match(lab.querySelector('.chem-status').textContent,new RegExp(state));
  assert.equal(range.getAttribute('aria-valuetext'),evaporated+' g Wasser verdunstet');
  assert.equal(lab.querySelectorAll('svg').length,1);assert.equal(lab.querySelectorAll('table').length,1);
 }
 assert.doesNotMatch(lab.textContent,/Tag 0|geordneter/);
 dom.window.close();console.log('PASS: 9 solution questions, revision, salt mass conservation, saturation boundary, crystals only beyond saturation, reversible input and accessible values.');
})().catch(error=>{console.error(error);process.exitCode=1;});
