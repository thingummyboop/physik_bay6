const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_stoffe_eigenschaften',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/Erfundene Messdaten/);
 assert.match(d.body.textContent,/nicht eindeutig unterscheiden/);
 assert.equal(w.currentChapterResult('chemie_stoffe_eigenschaften',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="properties"]');
 assert.match(lab.querySelector('.property-test').textContent,/Wähle/);
 for(const [id,phrase] of [['salt','Löseprobe'],['iron','Magnetprobe'],['oil','Schichtenbildung']]){
  const button=lab.querySelector(`[data-chem-action="${id}"]`);button.focus();button.click();
  assert.equal(d.activeElement,button);assert.equal(button.getAttribute('aria-pressed'),'true');
  assert.ok(lab.querySelector('.property-test').textContent.includes(phrase));
  assert.equal(lab.querySelectorAll('svg').length,1);assert.equal(lab.querySelectorAll('.property-test').length,1);
 }
 assert.doesNotMatch(lab.querySelector('.property-test').textContent,/Brennbarkeit/);
 dom.window.close();console.log('PASS: 7 properties questions, density example and uncertainty, revision, three comparison cards, focus and readable test suggestions.');
})().catch(error=>{console.error(error);process.exitCode=1;});
