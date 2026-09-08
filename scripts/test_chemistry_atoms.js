const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_atom_periodensystem',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.equal(d.querySelectorAll('details table tbody tr').length,20);
 assert.match(d.body.textContent,/Kohlenstoff-13 hat 6 Protonen und 7 Neutronen/);
 assert.equal(w.currentChapterResult('chemie_atom_periodensystem',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="atom-builder"]'),ranges=lab.querySelectorAll('input[type="range"]');
 for(const [p,e,n,name,charge,mass] of [[6,6,6,'Kohlenstoff','0',12],[6,5,6,'Kohlenstoff','+1',12],[6,6,7,'Kohlenstoff','0',13],[8,10,8,'Sauerstoff','−2',16],[1,0,0,'Wasserstoff','+1',1],[10,10,10,'Neon','0',20]]){
  [p,e,n].forEach((value,i)=>{ranges[i].value=value;ranges[i].dispatchEvent(new w.Event('input'));});
  const status=lab.querySelector('.chem-status').textContent;
  assert.ok(status.startsWith(name+':'));assert.ok(status.includes('Ladungszahl '+charge+'.'));
  assert.ok(status.includes('Massenzahl '+mass+'.'));assert.match(status,/keine Aussage über Existenz oder Stabilität/);
  assert.equal(lab.querySelectorAll('[data-atom-electron]').length,e);
  assert.equal(lab.querySelectorAll('svg').length,1);
  assert.equal(ranges[2].getAttribute('aria-valuetext'),n+' Neutronen');
 }
 dom.window.close();console.log('PASS: 9 atom questions, 20-element reference, six atom/ion/isotope states including zero electrons, charge, mass, accessible labels and revision.');
})().catch(error=>{console.error(error);process.exitCode=1;});
