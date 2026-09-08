const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only'}),w=dom.window;
 await new Promise(resolve=>setImmediate(resolve));
 w.eval(read('js/chapter-revisions.js'));w.eval(read('js/renderer.js'));w.eval('globalPhysikScore=0');
 const make=i=>({id:'q'+i,question:'Thema '+i+' erklären?',answers:[{text:'Richtig',correct:true,feedback:'Begründung '+i},{text:'Fehler',correct:false,feedback:'Hinweis '+i}]});
 const source=Array.from({length:18},(_,i)=>make(i));
 const topic={title:'Alle Abschnitte',sections:[{quizzes:source.slice(0,9)},{quizzes:[...source.slice(9),{...make(99),practiceOnly:true}]}],quizzes:[make(18),{...make(98),practiceOnly:true}],diplom:{questions:[make(19),make(0)]}};
 const questions=w.collectChapterQuizQuestions(topic);
 assert.equal(questions.length,20,'All unique eligible questions, including late sections and topic questions');
 assert.equal(questions.filter(q=>q.question===source[0].question).length,1,'Duplicate assessment question appears once');
 assert.ok(questions.some(q=>q.question===source[17].question));
 w.currentChapterQuiz={topicId:'optik1',topicTitle:topic.title,questions};
 w.document.getElementById('sections-container').innerHTML=w.renderChapterQuizPanel('optik1',topic,questions);
 assert.equal(w.document.querySelectorAll('fieldset').length,20);
 questions.forEach((q,i)=>{w.document.querySelector(`input[name="chapter_q_${i}"][value="${q.question===source[17].question?1:0}"]`).checked=true;});
 w.submitChapterQuiz();
 const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).optik1;
 assert.equal(result.lastPercent,95,'Late question participates in the score');
 assert.deepEqual(result.reviewQuestionIds,[questions.find(q=>q.question===source[17].question).id]);
 assert.equal(w.document.querySelectorAll('#chapter-quiz-result li').length,20,'Feedback covers every question');
 const data=JSON.parse(read('lang/de.json'));
 const affected=['akustik','arbeit','astronomie','drehundstatik','elektromagnetismus','energie','farben','kraft_und_bewegung','linsen_spiegel','optik1','sieinheiten','waermelehre','bio_1_kompass'];
 for(const id of affected){
  assert.ok(w.collectChapterQuizQuestions(data[id]).length>12,id+' retains its full pool');
  const revision=w.chapterRevision(id);assert.ok(revision>0,id+' has a content revision');
  assert.equal(w.currentChapterResult(id,{contentRevision:revision-1,passed:true,bestPercent:100}).passed,false,id+' does not retain outdated mastery');
  assert.equal(w.currentChapterResult(id,{contentRevision:revision,passed:true,bestPercent:100}).passed,true);
 }
 dom.window.close();console.log('PASS: complete question pool, deduplication, practice exclusion, late-question scoring and feedback, versioned results for 13 expanded chapters.');
})().catch(error=>{console.error(error);process.exitCode=1;});
