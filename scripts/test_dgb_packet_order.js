const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=dgb6_kommunikation',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.enhanceCoreLearning(data.dgb6_kommunikation,'dgb6_kommunikation','de');
 const zone=d.querySelector('[data-core-experiment="packet-order"]'),get=n=>zone.querySelector('[data-packet-'+n+']'),receive=n=>zone.querySelector('[data-packet-receive="'+n+'"]');
 const words=['Wir','lernen','heute','gemeinsam.'];const saved=w.localStorage.getItem('sciverse_chapter_quiz_results');
 const check=seq=>{
  const present=[1,2,3,4].filter(n=>seq.includes(n));const missing=[1,2,3,4].filter(n=>!seq.includes(n));
  assert.equal(get('message').textContent,words.map((word,i)=>present.includes(i+1)?word:'…').join(' | '));
  assert.equal(get('arrivals').textContent,seq.length?seq.join(' – '):'noch keine Karte');
  assert.ok(get('result').textContent.includes(present.length+' von 4 verschiedenen Karten'));
  if(missing.length)assert.ok(get('result').textContent.includes('Fehlende Positionen: '+missing.join(', ')+'.'));else assert.match(get('result').textContent,/Vollständig: Wir lernen heute gemeinsam\./);
 };
 // Exhaustive sequences through length four include every order, missing set and duplicate pattern.
 let cases=0;
 const walk=(seq,depth)=>{get('reset').click();for(const n of seq)receive(n).click();check(seq);cases++;if(depth)for(let n=1;n<=4;n++)walk([...seq,n],depth-1);};walk([],4);assert.equal(cases,341);
 get('reset').click();for(const n of [1,2,2,4])receive(n).click();check([1,2,2,4]);receive(3).click();check([1,2,2,4,3]);
 receive(3).focus();receive(3).click();assert.match(get('result').textContent,/doppelt angekommen/);assert.equal(d.activeElement,receive(3));
 w.enhanceCoreLearning(data.dgb6_kommunikation,'dgb6_kommunikation','de');receive(1).click();check([1,2,2,4,3,3,1]);
 for(let n=1;n<=4;n++){assert.ok(receive(n).textContent.includes('Karte '+n));assert.equal(d.getElementById(receive(n).getAttribute('aria-describedby')),get('result'));}
 assert.equal(get('result').getAttribute('aria-live'),'polite');assert.equal(get('result').getAttribute('aria-atomic'),'true');
 get('reset').focus();get('reset').click();check([]);assert.equal(d.activeElement,get('reset'));assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),saved);
 assert.equal(d.querySelectorAll('[data-packet-tasks] > li').length,5);
 assert.equal(d.querySelectorAll('[data-message-case]').length,2);assert.equal(d.querySelectorAll('[data-source-chain] tbody tr').length,3);
 assert.equal(d.querySelectorAll('[data-phishing-tasks] > li').length,4);assert.equal(d.querySelectorAll('[data-source-tasks] > li').length,5);
 assert.equal(d.querySelectorAll('a[href*=".invalid"]').length,0);
 // Assessment paths and revision migration are covered with independent keys in test_communication_media.js.
 const questions=w.currentChapterQuiz.questions;assert.equal(questions.length,10);
 assert.equal(w.chapterRevision('dgb6_kommunikation'),2);

 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=dgb6_kommunikation',runScripts:'outside-only'}),pw=paper.window;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-dgb-material'),solutions=pw.document.getElementById('ws-solutions');
 assert.equal(material.querySelectorAll('[data-packet-source] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-packet-tasks] > li').length,5);
 assert.ok(material.textContent.includes('Zeichne vier nummerierte Karten'));assert.ok(!material.textContent.includes('3–1–4–2 ergibt'));
 assert.ok(solutions.textContent.includes('3–1–4–2 ergibt'));assert.equal(solutions.hidden,true);assert.equal(material.querySelectorAll('button,input,select,template,details').length,0);
 assert.equal(material.querySelectorAll('[data-message-case]').length,2);assert.equal(material.querySelectorAll('[data-source-protocol] tbody tr').length,2);
 assert.ok(!material.textContent.includes('Die Kette lautet B3'));assert.ok(solutions.textContent.includes('Die Kette lautet B3'));
 paper.window.close();console.log('PASS: 341 packet arrival sequences, missing/duplicate recovery, labels, focus, repeated initialization, reset and unchanged quiz storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
