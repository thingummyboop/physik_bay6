const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_saeuren_basen',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/Verdünnen ist etwas anderes/);
 assert.equal(w.currentChapterResult('chemie_saeuren_basen',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="ph-scale"]'),range=lab.querySelector('input[type="range"]');
 const natron=[...lab.querySelectorAll('button')].find(b=>b.textContent==='Natronlösung');natron.click();
 assert.equal(range.value,'8');assert.equal(natron.getAttribute('aria-pressed'),'true');
 for(const [value,label] of [[2,'sauer'],[7,'neutral'],[10,'basisch'],[0,'sauer'],[14,'basisch']]){
  range.value=value;range.dispatchEvent(new w.Event('input'));
  assert.equal(range.getAttribute('aria-valuetext'),'pH '+value);
  assert.match(lab.querySelector('.chem-status').textContent,new RegExp('pH '+value+', also '+label));
  assert.match(lab.querySelector('.chem-status').textContent,/25 °C/);
  assert.equal(lab.querySelectorAll('[aria-pressed="true"]').length,0);
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 assert.doesNotMatch(lab.textContent,/vorsichtig Richtung pH 7 bringen/);
 dom.window.close();console.log('PASS: 7 pH questions, revision, neutralisation explanation, Natron example, slider classifications and cleared sample selection.');
})().catch(error=>{console.error(error);process.exitCode=1;});
