const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),html=read('examples/materialplaner.html');
const scenarios=[
 {html,paper:[0,2,4,6,8,10,12,14,16],names:['Papier','Bleistifte','Büroklammern']},
 {html:html.replace("{ name: 'Papier', einheit: 'Blatt', proGruppe: 2 }","{ name: 'Papier', einheit: 'Blatt', proGruppe: 3 }"),paper:[0,3,6,9,12,15,18,21,24],names:['Papier','Bleistifte','Büroklammern']},
 {html:html.replace("{ name: 'Büroklammern', einheit: 'Stück', proGruppe: 3 }","{ name: 'Büroklammern', einheit: 'Stück', proGruppe: 3 },\n  { name: 'Etiketten', einheit: 'Stück', proGruppe: 0 }"),paper:[0,2,4,6,8,10,12,14,16],names:['Papier','Bleistifte','Büroklammern','Etiketten']}
];
const clips=[0,3,6,9,12,15,18,21,24];
for(const scenario of scenarios){
 const dom=new JSDOM(scenario.html,{runScripts:'dangerously',url:'https://example.test/site/examples/materialplaner.html'}),w=dom.window,d=w.document;
 const input=d.getElementById('groups'),form=d.getElementById('controls'),out=d.getElementById('result'),status=d.getElementById('status');
 assert.equal(input.value,'4');assert.ok(input.labels.length);assert.equal(status.getAttribute('aria-live'),'polite');assert.equal(status.getAttribute('aria-atomic'),'true');
 const unchanged=d.getElementById('requirements').innerHTML,storage=w.localStorage.length;
 for(let groups=0;groups<=8;groups++){
  input.focus();input.value=groups;input.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(out.children.length,0);assert.match(status.textContent,/neu/);
  form.dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));const rows=[...out.querySelectorAll('tbody tr')];
  assert.deepEqual(rows.map(r=>r.cells[0].textContent),scenario.names);
  assert.deepEqual(rows.map(r=>Number(r.cells[1].textContent)),[scenario.paper[groups],groups,clips[groups],...(scenario.names.length===4?[0]:[])]);
  assert.deepEqual(rows.map(r=>r.cells[2].textContent),['Blatt','Stück','Stück',...(scenario.names.length===4?['Stück']:[])]);
  assert.equal(out.querySelector('caption').textContent,'Gesamtbedarf für '+groups+' Gruppen');assert.equal(d.activeElement,input);assert.equal(input.hasAttribute('aria-invalid'),false);
  assert.equal(d.getElementById('requirements').innerHTML,unchanged);assert.ok(status.textContent.includes('Papier '+scenario.paper[groups]+' Blatt'));
 }
 for(const value of ['','-1','9','1.5','Infinity','NaN']){
  input.value=value;form.dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(out.children.length,0);assert.equal(input.getAttribute('aria-invalid'),'true');assert.match(status.textContent,/ganze Gruppenanzahl von 0 bis 8/);
 }
 const reset=d.getElementById('reset');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(input.value,'4');assert.equal(input.hasAttribute('aria-invalid'),false);assert.equal(out.querySelectorAll('tbody tr').length,scenario.names.length);
 assert.equal(w.localStorage.length,storage);assert.ok(d.getElementById('source').textContent.includes('materialbedarf'));assert.ok(d.getElementById('source').textContent.includes('"proGruppe": '+(scenario.paper[1])));
 assert.equal(d.querySelectorAll('script[src],iframe,img,link[rel="stylesheet"]').length,0);dom.window.close();
}
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='dgb7_produktion';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 assert.equal(d.querySelector('[data-material-open]').href,'https://example.test/site/examples/materialplaner.html');assert.equal(d.querySelector('a[download="materialplaner.html"]').href,'https://example.test/site/examples/materialplaner.html');
 assert.equal(d.querySelectorAll('[data-material-tasks] > li').length,6);assert.equal(d.querySelectorAll('[data-material-requirements] tbody tr').length,3);assert.equal(d.querySelectorAll('[data-material-test-cases] tbody tr').length,4);
 const questions=w.currentChapterQuiz.questions;assert.equal(questions.length,10);const sections={dgb7_produktion_q1:0,dgb7_produktion_q2:1,dgb7_production_abstraction:1,dgb7_production_code_change:1,dgb7_produktion_q3:2,dgb7_produktion_q4:4,dgb7_settings_scope:2,dgb7_settings_evidence:2,dgb7_media_framing:3,dgb7_media_scope:3};
 const correctIndex=id=>['dgb7_settings_scope','dgb7_media_scope'].includes(id)?1:['dgb7_settings_evidence','dgb7_media_framing'].includes(id)?2:0;
 for(const [i,q] of questions.entries()){
  assert.equal(q.sectionIndex,sections[q.id]);assert.equal(q.answers.length,3);
  for(let choice=0;choice<q.answers.length;choice++){
   questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?choice:correctIndex(item.id))+'"]').checked=true);w.submitChapterQuiz();
   const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(result.lastPercent,choice===correctIndex(q.id)?100:90);assert.equal(result.contentRevision,3);
   assert.deepEqual(result.reviewQuestionIds,choice===correctIndex(q.id)?[]:[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).passed,false);assert.equal(w.currentChapterResult(id,{contentRevision:3,passed:true,bestPercent:100}).passed,true);dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-dgb-material'),solutions=pw.document.getElementById('ws-solutions');
 assert.equal(material.querySelectorAll('[data-material-tasks] > li').length,6);assert.equal(material.querySelectorAll('[data-material-test-cases] tbody tr').length,4);
 assert.ok(material.textContent.includes('Ohne Gerät'));assert.ok(!material.textContent.includes('8/4/12'));assert.ok(solutions.textContent.includes('8/4/12'));assert.equal(solutions.hidden,true);
 assert.equal(material.querySelectorAll('input,button,select,details,template').length,0);paper.window.close();
 console.log('PASS: 27 original/edited/extended material plans, zero and invalid input, stale results, labels/focus/reset, executed source, chapter downloads, all 30 assessed answer paths, revision and separate paper solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
