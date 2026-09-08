const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),topic=JSON.parse(read('lang/de.json')).strahlung_radioaktivitaet;
for(const survive of [false,true]){
 const dom=new JSDOM('<div id="sections-container">'+topic.sections.map(s=>'<section class="card">'+s.content+'</section>').join('')+'</div>',{runScripts:'outside-only'}),w=dom.window,d=w.document;
 w.eval(read('js/core-learning.js'));w.enhanceCoreLearning(topic,'strahlung_radioaktivitaet','de');let draws=0;w.Math.random=()=>{draws++;return survive?0:0.99;};
 const step=d.getElementById('decay-step'),status=d.getElementById('decay-status'),history=d.getElementById('decay-history');
 assert.equal(d.querySelectorAll('[data-core-experiment="decay"] table:first-of-type th[scope="col"]').length,3);assert.ok(d.querySelector('[data-core-experiment="decay"] caption'));
 for(let i=1;i<=10;i++){
  step.click();assert.equal(d.getElementById('decay-bar').value,survive?200:0);assert.equal(history.rows.length,i+1);
  assert.equal(history.lastElementChild.lastElementChild.textContent,Number((200/2**i).toFixed(2)).toLocaleString('de'));
  if(!survive)assert.match(status.textContent,/alle Ausgangskerne zerfallen/);
 }
 assert.equal(draws,survive?2000:200);assert.equal(step.disabled,true);assert.match(status.textContent,/zehn Schritte.*abgeschlossen/);
 step.dispatchEvent(new w.Event('click'));assert.equal(history.rows.length,11);assert.equal(draws,survive?2000:200);
 const reset=d.getElementById('decay-reset');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(step.disabled,false);assert.equal(history.rows.length,1);assert.equal(d.getElementById('decay-bar').value,200);assert.doesNotMatch(status.textContent,/abgeschlossen|alle Ausgangskerne/);
 dom.window.close();
}
console.log('PASS: decay extremes, fixed independent expectation, no new nuclei, ten-step boundary, German decimal format and reset recovery.');

{
 const dom=new JSDOM('<div id="sections-container">'+topic.sections.map(s=>'<section class="card">'+s.content+'</section>').join('')+'</div>',{runScripts:'outside-only'}),w=dom.window,d=w.document;
 w.eval(read('js/core-learning.js'));w.enhanceCoreLearning(topic,'strahlung_radioaktivitaet','de');const step=d.getElementById('decay-step'),reset=d.getElementById('decay-reset'),rows=d.getElementById('decay-comparisons');
 for(const value of [0,0.99,null]){let draw=0;w.Math.random=()=>value===null?(draw++%2?0.75:0.25):value;reset.click();step.click();step.click();step.click();}
 assert.deepEqual([...rows.rows].map(r=>Number(r.cells[1].textContent)),[200,0,50]);assert.ok([...rows.rows].every(r=>r.cells[2].textContent==='50'));
 const comparisonStatus=d.getElementById('decay-comparison-status');
 assert.match(comparisonStatus.textContent,/Mittelwert dieser Versuche: 83,33/);assert.match(comparisonStatus.textContent,/Kleinste Restzahl: 0, größte Restzahl: 200/);assert.match(comparisonStatus.textContent,/muss nicht genau 50/);
 const savedStatus=comparisonStatus.textContent;reset.click();assert.equal(comparisonStatus.textContent,savedStatus);
 for(let i=0;i<9;i++){reset.click();step.click();step.click();}assert.equal(rows.rows.length,10);assert.equal(rows.rows[0].cells[0].textContent,'3');assert.equal(rows.lastElementChild.cells[0].textContent,'12');
 assert.match(comparisonStatus.textContent,/Mittelwert dieser Versuche: 50 /);assert.match(comparisonStatus.textContent,/Kleinste Restzahl: 50, größte Restzahl: 50/);
 const before=d.getElementById('decay-bar').value,clear=d.getElementById('decay-clear-comparisons');clear.focus();clear.click();assert.equal(rows.rows.length,0);assert.doesNotMatch(comparisonStatus.textContent,/Mittelwert dieser Versuche/);assert.equal(d.getElementById('decay-bar').value,before);assert.equal(d.activeElement,clear);step.click();assert.equal(rows.rows.length,0);
 reset.click();step.click();step.click();assert.equal(rows.rows.length,1);assert.equal(rows.rows[0].cells[0].textContent,'1');dom.window.close();
 console.log('PASS: comparison records only step two, preserves three differing trials across reset, limits to last ten, and clears without changing current experiment.');
}
