const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_metalle_redox',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,11);
 assert.match(d.body.textContent,/Fe → Fe²⁺ \+ 2 e⁻/);
 assert.match(d.body.textContent,/Zn \+ Cu²⁺ → Zn²⁺ \+ Cu/);
 assert.equal(w.currentChapterResult('chemie_metalle_redox',{passed:true,bestPercent:100}).outdated,true);

 const questions=w.currentChapterQuiz.questions;assert.equal(questions.length,11);let paths=0;
 for(const [i,q]of questions.entries())for(let answer=0;answer<q.answers.length;answer++){
  questions.forEach((item,j)=>{d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?answer:item.answers.findIndex(a=>a.correct))+'"]').checked=true;});
  w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).chemie_metalle_redox;
  assert.equal(result.lastPercent,q.answers[answer].correct?100:91);assert.equal(result.contentRevision,3);
  if(!q.answers[answer].correct)assert.deepEqual(result.reviewQuestionIds,[q.id]);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));paths++;
 }
 assert.equal(paths,33);for(const id of ['rust_synthesis','separation_analysis'])assert.equal(questions.find(q=>q.id===id).sectionIndex,2);
 assert.equal(w.currentChapterResult('chemie_metalle_redox',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 assert.equal(d.querySelectorAll('[data-synthesis-analysis-table] tbody tr').length,3);assert.equal(d.querySelectorAll('[data-synthesis-analysis-tasks] > li').length,5);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="redox"]');
 for(const [action,phrase,count]of [['dry','kontrolliert',0],['water','Sauerstoff',2],['salt','keine gemessene',4],['oil','bereits gelösten',0]]){
  const button=lab.querySelector(`button[data-chem-action="${action}"]`);button.click();
  assert.ok(lab.querySelector('.chem-status').textContent.toLowerCase().includes(phrase.toLowerCase()));
  const diagram=lab.querySelector(`[data-chem-svg-action="${action}"]`);
  assert.equal(diagram.querySelectorAll('circle').length,count);diagram.focus();
  diagram.dispatchEvent(new w.KeyboardEvent('keydown',{key:' ',bubbles:true,cancelable:true}));
  assert.equal(d.activeElement.dataset.chemSvgAction,action);
  assert.equal(d.activeElement.getAttribute('aria-pressed'),'true');
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=chemie_metalle_redox',runScripts:'outside-only'}),pw=paper.window;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pw.document.getElementById('ws-chemistry-material'),solutions=pw.document.getElementById('ws-solutions');assert.equal(material.querySelectorAll('[data-synthesis-analysis-table] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-synthesis-analysis-tasks] > li').length,5);
 assert.ok(!material.textContent.includes('Ein brauner Belag ist eine Beobachtung'));assert.ok(solutions.textContent.includes('Ein brauner Belag ist eine Beobachtung'));assert.equal(solutions.hidden,true);paper.window.close();console.log('PASS: all 33 paths of 11 redox questions, synthesis/decomposition paper comparison with separate solutions, electron-transfer equations, revision, four prepared model conditions, schematic rust and keyboard focus.');
})().catch(error=>{console.error(error);process.exitCode=1;});
