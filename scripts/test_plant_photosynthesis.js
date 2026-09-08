const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_pflanzenorgane_fotosynthese';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,11);
 const rows=[...d.querySelectorAll('[data-plant-observations] tbody tr')];
 assert.deepEqual(rows.map(r=>Number(r.dataset.end)-Number(r.dataset.start)),[2,3,4,8,10,9]);
 assert.equal(d.querySelectorAll('[data-plant-evidence-task] li').length,5);
 const index=w.currentChapterQuiz.questions.findIndex(q=>q.id==='bio2_pflanze_evidence');assert.ok(index>=0);
 const q=w.currentChapterQuiz.questions[index];assert.equal(q.sectionIndex,3);
 for(let choice=0;choice<q.answers.length;choice++){
  w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:91);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).outdated,true);
 assert.match(d.body.textContent,/Licht ist kein Stoff/);
 assert.doesNotMatch(d.body.textContent,/Gehirn der Pflanze|Knochen \+ Erde/);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const select=d.querySelector('[data-plant-light]'),status=d.querySelector('[data-plant-status]');
 select.focus();
 for(const [value,phrase]of [['0','nimmt im Modell 2'],['2','laufen beide ab'],['6','gibt im Modell 4'],['0','keine Fotosynthese']]){
  select.value=value;select.dispatchEvent(new w.Event('change'));
  assert.equal(d.querySelector('[data-plant-produced]').textContent,value);
  assert.ok(status.textContent.includes(phrase));assert.equal(d.activeElement,select);
 }
 assert.equal(status.getAttribute('role'),'status');
 dom.window.close();console.log('PASS: 11 assessed questions, plant observations and three new answer paths, revision, distinct matter/energy explanation, three oxygen balance states, reset and stable native control focus.');
})().catch(e=>{console.error(e);process.exitCode=1;});
