const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
async function hub(query=''){
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/physik_bay6/topics/learning.html'+query,runScripts:'outside-only'});
 dom.window.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});
 dom.window.eval(read('js/curriculum.js'));dom.window.eval(read('js/learning.js'));
 await new Promise(resolve=>setImmediate(resolve));return dom;
}
(async()=>{
 const dom=await hub();const w=dom.window,d=w.document;
 assert.equal(d.querySelectorAll('.chapter').length,20);
 d.querySelector('.chapter .actions button[aria-pressed]').click();
 assert.equal(d.querySelectorAll('#selected>li').length,1);
 d.querySelector('#share').click();const url=new URL(d.querySelector('#share-url').value);
 assert.equal(url.pathname,'/physik_bay6/index.html');assert.ok(!url.href.includes('lastPercent'));
 const shared=await hub('?'+url.hash.split('?')[1]);
 assert.equal(shared.window.document.querySelectorAll('#selected>li').length,1,'Shared list reopens selection');
 assert.equal(JSON.parse(shared.window.localStorage.getItem('sciverse_study_plan')).length,1,'Imported list persists when visiting a chapter and returning');
 const grade=d.querySelector('#grade');grade.value='6';grade.dispatchEvent(new w.Event('input'));
 assert.equal(d.querySelectorAll('.chapter').length,6,'Second class includes measurement foundations, optics, acoustics and Earth/Moon/Sun');
 assert.ok(d.querySelector('#chapters').textContent.includes('Messen'));
 const subject=d.querySelector('#subject');subject.value='dgb';
 for(const level of ['5','6']){grade.value=level;grade.dispatchEvent(new w.Event('input'));assert.ok(d.querySelector('#chapters').textContent.includes('Word'),'Word workshop is visible in both intended grades');}
 grade.value='7';grade.dispatchEvent(new w.Event('input'));assert.ok(!d.querySelector('#chapters').textContent.includes('Word-Werkstatt'));
 subject.value='physik';for(const level of ['6','7','8']){grade.value=level;grade.dispatchEvent(new w.Event('input'));assert.ok(d.querySelector('#chapters').textContent.includes('Messen'),'Measurement foundation remains available across physics grades');}
 subject.value='mathematik';
 for(const level of ['6','7','8']){
  grade.value=level;grade.dispatchEvent(new w.Event('input'));
  const chapterIds=[...d.querySelectorAll('[data-focus-key^="catalog-open-"]')].map(b=>b.dataset.focusKey.replace('catalog-open-',''));
  assert.equal(chapterIds.includes('math3_4_flaechensatz'),level!=='8','Area chapter is available in classes 2 and 3');
  assert.equal(chapterIds.includes('math3_8_pythagoras'),level==='8','Pythagoras foundations belong to class 4');
  assert.equal(chapterIds.includes('math4_2_pythagoras'),level==='8','Pythagoras applications belong to class 4');
 }
 for(const level of ['5','6']){
  grade.value=level;grade.dispatchEvent(new w.Event('input'));
  const ids=[...d.querySelectorAll('[data-focus-key^="catalog-open-"]')].map(b=>b.dataset.focusKey.replace('catalog-open-',''));
  assert.equal(ids.includes('math2_8_statistik'),level==='5');
  assert.equal(ids.includes('math2_9_relative_haeufigkeit'),level==='6');
 }
 const mathIds=w.SCIVERSE_CURRICULUM.mathematik.topics.map(t=>t.id);
 assert.ok(mathIds.indexOf('math2_7_geometrie')<mathIds.indexOf('math3_4_flaechensatz'));
 assert.ok(mathIds.indexOf('math3_4_flaechensatz')<mathIds.indexOf('math3_9_koerper'));
 assert.ok(mathIds.indexOf('math4_1_reelle_zahlen')<mathIds.indexOf('math3_8_pythagoras'));
 assert.ok(mathIds.indexOf('math3_8_pythagoras')<mathIds.indexOf('math4_2_pythagoras'));
 const search=d.querySelector('#search');search.value='nichts-passendes';search.dispatchEvent(new w.Event('input'));
 assert.ok(d.querySelector('.empty'));dom.window.close();shared.window.close();

 const quizDom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only'});
 const qw=quizDom.window;qw.eval(read('js/renderer.js'));
 qw.eval('globalPhysikScore = 0');
 const questions=Array.from({length:6},(_,i)=>({id:'q'+i,question:'Frage '+i,answers:[{text:'Richtig',correct:true,feedback:'Begründung '+i},{text:'Fehler',correct:false,feedback:'Hinweis '+i}]}));
 qw.currentChapterQuiz={topicId:'optik1',topicTitle:'Licht',questions};
 const container=qw.document.querySelector('#sections-container');
 for(let attempt=0;attempt<5;attempt++){
  container.innerHTML=qw.renderChapterQuizPanel('optik1',{title:'Licht'},questions);
  questions.forEach((q,i)=>qw.document.querySelector(`input[name="chapter_q_${i}"][value="1"]`).checked=true);
  qw.submitChapterQuiz();
  assert.equal(qw.document.querySelectorAll('#chapter-quiz-result li').length,6,'All six answers receive feedback');
  const result=JSON.parse(qw.localStorage.getItem('sciverse_chapter_quiz_results')).optik1;
  assert.equal(result.totalAttempts,attempt+1);assert.equal(result.nextRefillAt,0);
  assert.equal(result.reviewQuestionIds.length,6);assert.equal(qw.getChapterQuizResult('optik1').availableAttempts,3);
 }
 quizDom.window.close();
 console.log('PASS: selecting and sharing chapters, base-path-safe links, imported plan, grade/search filtering, five consecutive failed quiz attempts, full feedback and stored review needs.');
})().catch(error=>{console.error(error);process.exitCode=1;});
