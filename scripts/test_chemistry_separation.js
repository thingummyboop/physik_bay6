const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_trennverfahren',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/anschließend durch Abkühlen kondensiert/);
 assert.equal(w.currentChapterResult('chemie_trennverfahren',{passed:true,bestPercent:100}).passed,false);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="separation"]'),select=lab.querySelector('select');
 for(const [value,expected]of [['sandSalt',/gelöstes Salz passiert/],['ink',/nicht für jede Filzstiftfarbe/],['ironSand',/Nicht jedes Metall/],['sandSalt',/ausreichend Wasser/]]){
  select.value=value;select.dispatchEvent(new w.Event('change'));
  assert.match(lab.querySelector('.chem-status').textContent,expected);
  assert.equal(lab.querySelectorAll('svg[aria-label="Trennverfahren"]').length,1);
 }
 dom.window.close();console.log('PASS: 7 separation questions, distillation explanation, old-result revision, four mixture selections with method-specific feedback and single diagram.');
})().catch(error=>{console.error(error);process.exitCode=1;});
