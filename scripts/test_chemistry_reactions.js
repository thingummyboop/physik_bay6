const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_reaktionen_energie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/0,8 g/);assert.match(d.body.textContent,/Die Zündung überwindet eine Aktivierungsbarriere/);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const evidence=d.querySelector('[data-chem-lab="reaction-evidence"]');for(const box of evidence.querySelectorAll('input')){box.checked=true;box.dispatchEvent(new w.Event('change'));}
 assert.match(evidence.querySelector('.chem-status').textContent,/Anzahl beweist keine Reaktion/);
 const builder=d.querySelector('[data-chem-lab="reaction-builder"]');
 for(const [coeffs,correct]of [[[1,1,1,2],false],[[1,2,1,2],true],[[0,0,0,0],false]]){
  for(const [i,key]of ['a','b','c','d'].entries()){const input=builder.querySelector(`[data-chem-coeff="${key}"]`);input.value=coeffs[i];input.dispatchEvent(new w.Event('input'));}
  assert.equal(builder.querySelector('.chem-status').textContent.startsWith('Richtig ausgeglichen'),correct);
 }
 assert.equal(d.querySelectorAll('[data-reaction-levels] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-reaction-level-task] li').length,6);
 builder.querySelector('[data-chem-action="hydrogen"]').click();
 for(const coeffs of [[2,1,2],[4,2,4]]){for(const [i,key]of ['a','b','c'].entries()){const input=builder.querySelector('[data-chem-coeff="'+key+'"]');input.value=coeffs[i];input.dispatchEvent(new w.Event('input'));}assert.ok(builder.querySelector('.chem-status').textContent.startsWith('Richtig ausgeglichen'));assert.equal(coeffs[0]*2,coeffs[2]*2);assert.equal(coeffs[1]*2,coeffs[2]);}
 dom.window.close();console.log('PASS: 9 reaction questions, energy and mass examples, evidence-count caveat, balanced/unbalanced methane and rejection of an empty equation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
