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
 builder.querySelector('[data-chem-action="peroxide"]').click();
 assert.equal(builder.dataset.chemReaction,'peroxide');assert.equal(builder.querySelector('[data-chem-coeff="d"]').disabled,true);
 const inputs=['a','b','c'].map(key=>builder.querySelector('[data-chem-coeff="'+key+'"]'));let peroxideCases=0;
 for(let a=0;a<=4;a++)for(let b=0;b<=4;b++)for(let c=0;c<=4;c++){
  [a,b,c].forEach((value,i)=>{inputs[i].value=value;});inputs[2].dispatchEvent(new w.Event('input'));
  if(a===0)assert.ok(builder.textContent.includes('0 H2O2'));if(b===0)assert.ok(builder.textContent.includes('0 H2O'));if(c===0)assert.ok(builder.textContent.includes('0 O2'));
  const expected=a>0&&b>0&&c>0&&2*a===2*b&&2*a===b+2*c;
  assert.equal(builder.querySelector('.chem-status').textContent.startsWith('Richtig ausgeglichen'),expected,[a,b,c].join(','));
  const atoms=[...builder.querySelectorAll('svg text')].map(t=>t.textContent);
  assert.equal(atoms.filter(t=>t==='H').length,2*a+2*b);assert.equal(atoms.filter(t=>t==='O').length,2*a+b+2*c);peroxideCases++;
 }
 const reset=builder.querySelector('[data-chem-action="reset"]');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(builder.dataset.chemReaction,'peroxide');assert.deepEqual(inputs.map(i=>Number(i.value)),[1,1,1]);
 builder.querySelector('[data-chem-action="methane"]').click();assert.equal(builder.querySelector('[data-chem-coeff="d"]').disabled,false);
 assert.equal(peroxideCases,125);
 const priorStorage=w.localStorage.getItem('sciverse_chapter_quiz_results');
 for(const reaction of ['methane','hydrogen','peroxide']){
  builder.querySelector('[data-chem-action="'+reaction+'"]').click();
  const active=[...builder.querySelectorAll('[data-chem-coeff]')].filter(input=>!input.disabled);
  for(const field of active)for(const value of ['', '-1', '10', '1.5', '99']){
   field.value=value;field.focus();field.dispatchEvent(new w.Event('input'));
   assert.equal(d.activeElement,field);assert.equal(field.value,value);assert.equal(field.getAttribute('aria-invalid'),'true');
   assert.ok(field.getAttribute('aria-describedby').split(/\s+/).includes(builder.querySelector('.chem-status').id));
   assert.match(builder.querySelector('.chem-status').textContent,/ganze Zahl von 0 bis 9/);assert.equal(builder.querySelectorAll('svg').length,0);
   field.value='1';field.dispatchEvent(new w.Event('input'));assert.equal(field.getAttribute('aria-invalid'),'false');assert.ok(builder.querySelector('svg'));
  }
 }
 assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),priorStorage);
 dom.window.close();console.log('PASS: 9 reaction questions, energy and mass examples, evidence-count caveat, balanced/unbalanced methane rejection of an empty equation, 125 peroxide balances with independently counted diagram atoms, reset and reaction switching.');
})().catch(error=>{console.error(error);process.exitCode=1;});
