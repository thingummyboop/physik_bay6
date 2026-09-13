const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='bio_1_wirbeltiere';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.enhanceCoreLearning(data[id],id,'de');
 const zone=d.querySelector('[data-core-experiment="vertebrate-cards"]'),fields=[...zone.querySelectorAll('select')],status=zone.querySelector('[role=status]'),all=['forelle','frosch','eidechse','amsel','hund'];
 // Independent membership lists, rather than calculating expectations from the authored table.
 const yes=[['amsel'],['hund'],['forelle'],['eidechse']];const shown=()=>[...zone.querySelectorAll('[data-vertebrate-match]')].map(el=>el.dataset.vertebrateMatch);
 assert.deepEqual(shown(),all);const initialSource=d.querySelector('[data-vertebrate-cards]').innerHTML,saved=w.localStorage.getItem('sciverse_chapter_quiz_results');let cases=0;
 for(const a of ['', 'ja','nein'])for(const b of ['', 'ja','nein'])for(const c of ['', 'ja','nein'])for(const e of ['', 'ja','nein']){
  const values=[a,b,c,e];fields.forEach((f,i)=>f.value=values[i]);fields[3].focus();fields[3].dispatchEvent(new w.Event('change'));
  const expected=all.filter(animal=>values.every((value,i)=>!value||(value==='ja'?yes[i].includes(animal):!yes[i].includes(animal))));
  assert.deepEqual(shown(),expected);assert.match(status.textContent,new RegExp('^'+expected.length+' von 5'));
  if(!expected.length)assert.match(status.textContent,/keine allgemeine Aussage/);if(expected.length===1)assert.match(status.textContent,/noch nicht bestimmt/);
  assert.equal(d.activeElement,fields[3]);cases++;
 }
 assert.equal(cases,81);assert.equal(d.querySelector('[data-vertebrate-cards]').innerHTML,initialSource);
 fields.forEach(f=>{assert.ok(f.labels.length);assert.equal(d.getElementById(f.getAttribute('aria-describedby')),status);});assert.equal(status.getAttribute('aria-atomic'),'true');
 zone.querySelector('button').click();assert.deepEqual(shown(),all);assert.equal(d.activeElement,fields[0]);assert.ok(fields.every(f=>f.value===''));
 fields[0].value='ja';fields[0].dispatchEvent(new w.Event('change'));w.enhanceCoreLearning(data[id],id,'de');assert.deepEqual(shown(),['amsel']);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),saved);
 const key=d.querySelector('[data-vertebrate-key]'),paths=[['Amsel',[true]],['Hund',[false,true]],['Forelle',[false,false,true]],['Eidechse',[false,false,false,true]],['Frosch',[false,false,false,false]]];
 for(const [name,answers]of paths){let result='';answers.forEach((answer,i)=>{result=key.tBodies[0].rows[i].cells[answer?1:2].textContent;if(i<answers.length-1)assert.equal(result,'weiter zu '+(i+2));});assert.equal(result,name);}

 const qs=w.currentChapterQuiz.questions;assert.equal(qs.length,11);assert.deepEqual(Array.from(qs,q=>q.id),[...[1,2,3,4,5,6].map(n=>'bio_wirbel_d'+n),...[1,2,3,4,5].map(n=>'bio_wirbel_s'+n)]);let answerPaths=0;
 for(const [i,q] of qs.entries()){
  assert.equal(q.sectionIndex,i<6?null:i-6);assert.equal(q.answers.length,3);
  for(let answer=0;answer<3;answer++){
   qs.forEach((question,j)=>{d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?answer:0)+'"]').checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
   assert.equal(result.lastPercent,answer===0?100:91);assert.equal(result.contentRevision,2);
   if(answer!==0)assert.deepEqual(result.reviewQuestionIds,[q.id]);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));answerPaths++;
  }
 }
 assert.equal(answerPaths,33);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).passed,true);
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-biology-material'),solutions=pw.document.getElementById('ws-solutions');
 assert.equal(material.querySelectorAll('[data-vertebrate-card]').length,5);assert.equal(material.querySelectorAll('[data-vertebrate-key] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-vertebrate-tasks] > li').length,5);
 assert.ok(material.textContent.includes('Behandle unbekannte Angaben nicht als'));assert.ok(!material.textContent.includes('Frosch: viermal nein'));assert.ok(solutions.textContent.includes('Frosch: viermal nein'));assert.equal(solutions.hidden,true);
 paper.window.close();console.log('PASS: 81 vertebrate-card combinations with independent membership, unknown and impossible selections, five key paths, labels/focus/reset/reinitialization, source and storage preservation, paper material, separate solutions and all 33 assessment paths with revision handling.');
})().catch(e=>{console.error(e);process.exitCode=1;});
