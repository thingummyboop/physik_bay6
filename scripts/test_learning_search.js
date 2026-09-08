const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html',runScripts:'outside-only'}),w=dom.window,d=w.document;
 let resolve;w.fetch=()=>new Promise(r=>resolve=r);
 w.eval(read('js/curriculum.js'));w.eval(read('js/learning.js'));
 const search=d.getElementById('search'),subject=d.getElementById('subject');
 function find(value){search.value=value;search.dispatchEvent(new w.Event('input'));return [...d.querySelectorAll('#chapters [data-focus-key]')].map(b=>b.dataset.focusKey);}
 assert.equal(find('Konvektion').includes('catalog-open-waermelehre'),false);
 resolve({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});await new Promise(r=>setImmediate(r));
 assert.ok(d.querySelector('[data-focus-key="catalog-open-waermelehre"]'),'A pending search refreshes when full content arrives');
 assert.ok(find('  KONVEKTION   Waermelehre ').includes('catalog-open-waermelehre'),'Terms in any order match across headings and explanations');
 assert.deepEqual(find('Wärmeleitung'),find('Waermeleitung'),'Umlaut spelling and transliteration match equally');
 subject.value='';assert.equal(subject.selectedOptions[0].textContent,'Alle Fächer');
 assert.ok(find('Papierchromatografie').includes('catalog-open-chemie_trennverfahren'),'All-subject search finds explanation terms');
 subject.value='physik';assert.equal(find('Papierchromatografie').includes('catalog-open-chemie_trennverfahren'),false,'Subject restriction is respected');
 assert.equal(find('Konvektion unverfindbareswort').length,0,'All search words must match');
 find('   ');assert.equal(d.querySelectorAll('.chapter').length,20,'Whitespace restores the subject catalog');
 assert.equal(d.querySelectorAll('#selected>li').length,0,'Searching does not change the assigned material');
 dom.window.close();console.log('PASS: full-text search, async index refresh, umlaut variants, multiple words, all subjects and subject filters, empty query and unchanged selection.');
})().catch(e=>{console.error(e);process.exitCode=1;});
