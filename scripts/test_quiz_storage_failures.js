const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 for(const scenario of ['quota','points','corrupt','null','normal']){
  const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.eval(read('js/chapter-revisions.js'));w.eval(read('js/renderer.js'));w.eval('globalPhysikScore=0');
  if(scenario==='corrupt')w.localStorage.setItem('physik_topic_scores','broken JSON');
  if(scenario==='null')w.localStorage.setItem('sciverse_chapter_quiz_results','null');
  const nativeSet=w.Storage.prototype.setItem;w.Storage.prototype.setItem=function(key,value){if(scenario==='quota'||scenario==='points'&&key==='physik_topic_scores')throw new w.DOMException('Storage full','QuotaExceededError');return nativeSet.call(this,key,value);};
  const topic={title:'Test',sections:[{quizzes:[{id:'one',question:'Energieübertragung erklären?',answers:[{text:'Antwort',correct:true,feedback:'Energie wird übertragen.'},{text:'Andere Antwort',correct:false,feedback:'Prüfe den Temperaturunterschied.'}]}]}]};
  const questions=w.collectChapterQuizQuestions(topic);w.currentChapterQuiz={topicId:'optik1',topicTitle:topic.title,questions};d.querySelector('#sections-container').innerHTML=w.renderChapterQuizPanel('optik1',topic,questions);d.querySelector('input[value="0"]').checked=true;
  assert.doesNotThrow(()=>w.submitChapterQuiz(),scenario);
  assert.match(d.querySelector('#chapter-quiz-result').textContent,/100%/);assert.match(d.querySelector('#chapter-quiz-result').textContent,/Energie wird übertragen/);
  assert.equal(d.querySelector('.chapter-submit-btn').disabled,true);
  const notice=d.querySelector('.chapter-save-status').textContent;
  if(scenario==='quota'){assert.match(notice,/nicht gespeichert/);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),null);assert.equal(w.localStorage.getItem('physik_topic_scores'),null);}
  else {assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).optik1.lastPercent,100);assert.match(notice,['points','corrupt'].includes(scenario)?/Spielpunkte/:/Browser gespeichert/);}
  dom.window.close();
 }
 console.log('PASS: visible scoring and feedback under quota failure, points-only failure and corrupt data; null result recovery; truthful persistence notice and disabled duplicate submission.');
})().catch(error=>{console.error(error);process.exitCode=1;});
