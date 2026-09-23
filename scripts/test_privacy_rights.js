const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='dgb8_kommunikation';
const expected=[{key:1,reason:/Auskunft.*eigenen Datenbestand/},{key:0,reason:/Berichtigung.*richtige Lerngruppe/},{key:2,reason:/kein grenzenloses Sofortrecht/},{key:1,reason:/Unterlagen.*Beschwerdeweg/}];
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
 const before=JSON.stringify(w.localStorage),zone=d.querySelector('[data-privacy-lab]'),control=zone.querySelector('select'),cases=[...zone.querySelectorAll('[data-boundary-case]')],result=zone.querySelector('[role=status]');
 assert.equal(cases.length,4);assert.equal(d.getElementById(control.getAttribute('aria-describedby')),result);
 for(const [index,expectedCase]of expected.entries()){
  control.value=String(index);control.dispatchEvent(new w.Event('change'));assert.equal(cases.filter(c=>!c.hidden).length,1);assert.equal(cases[index].hidden,false);assert.match(result.textContent,/Lies den Fall/);
  for(let choice=0;choice<3;choice++){const button=cases[index].querySelectorAll('button')[choice];button.click();assert.equal(result.textContent.startsWith('Richtig:'),choice===expectedCase.key);if(choice===expectedCase.key)assert.match(result.textContent,expectedCase.reason);assert.equal(button.getAttribute('aria-describedby'),result.id);}
 }
 zone.querySelector('[data-boundary-reset]').click();assert.equal(control.value,'0');assert.equal(d.activeElement,control);assert.match(result.textContent,/Lies den Fall/);assert.equal(JSON.stringify(w.localStorage),before);
 assert.equal(d.querySelectorAll('[data-privacy-rights] dt').length,8);assert.equal(d.querySelectorAll('[data-privacy-tasks]>li').length,4);assert.equal(d.querySelectorAll('[data-privacy-protocol] tbody tr').length,4);
 assert.match(cases[1].textContent,/2B.*4A/);assert.match(cases[2].textContent,/tatsächlich anwendbar/);assert.match(cases[3].textContent,/sechs Wochen.*weder eine Antwort noch/);
 const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);dom.window.close();
 for(const topic of [id,'dgb8_handeln']){
  const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+topic,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));await new Promise(r=>setImmediate(r));const material=pd.getElementById('ws-dgb-material');
  if(topic===id){assert.equal(material.querySelectorAll('[data-privacy-paper] .ai-paper-case').length,4);assert.equal(material.querySelectorAll('[data-privacy-rights] dt').length,8);assert.equal(material.querySelectorAll('[data-privacy-tasks]>li').length,4);assert.equal(material.querySelectorAll('[data-privacy-solution]').length,0);assert.equal(pd.querySelectorAll('#ws-solutions [data-privacy-solution]').length,1);}
  else{assert.match(material.querySelector('[data-consumer-law]').textContent,/Vorauswahl ist keine ausdrückliche Zustimmung/);assert.match(material.querySelector('[data-consumer-law]').textContent,/Rückerstattungsanspruch/);assert.match(pd.querySelector('[data-action-solution="consumer"]').textContent,/Modellrechnung beschreibt angezeigte Preise/);}
  assert.equal(material.querySelectorAll('button,select,input').length,0);assert.equal(pd.getElementById('ws-solutions').hidden,true);paper.window.close();
 }
 console.log('PASS: 12 independent privacy decisions, per-case feedback/reset/focus/storage, legal case premises, eight rights/four tasks, unique IDs, all paper cases with separate solutions and advertised-price/valid-extra distinction.');
})().catch(e=>{console.error(e);process.exitCode=1;});
