const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_kohlenstoff_kunststoffe',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/Die Fraktionen sind weiterhin Gemische/);
 assert.equal(w.currentChapterResult('chemie_kohlenstoff_kunststoffe',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="carbon-chain"]'),range=lab.querySelector('input[type="range"]'),select=lab.querySelector('select');
 for(let n=1;n<=8;n++)for(const shape of ['straight','branched']){
  range.value=n;range.dispatchEvent(new w.Event('input'));select.value=shape;select.dispatchEvent(new w.Event('change'));
  assert.equal(lab.querySelectorAll('[data-carbon-atom]').length,n);
  assert.equal(lab.querySelectorAll('[data-carbon-bond]').length,n-1);
  assert.ok(lab.querySelector('.chem-status').textContent.includes('C'+n+'H'+(2*n+2)));
  assert.equal(select.value,n<4?'straight':shape);
  assert.equal(select.querySelector('[value="branched"]').disabled,n<4);
  for(const atom of lab.querySelectorAll('[data-carbon-atom]'))assert.ok(Number(atom.getAttribute('cx'))+18<498);
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 dom.window.close();console.log('PASS: 7 carbon questions, petroleum explanation, revision, all eight sizes in both shape modes, conserved atoms, bonds, formula and small-chain constraints.');
})().catch(error=>{console.error(error);process.exitCode=1;});
