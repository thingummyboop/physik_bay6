const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
const ids=Object.keys(data).filter(id=>id.startsWith('englisch_'));assert.equal(ids.length,9);
for(const id of ids){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});let spoken=[],cancelled=0;
 w.SpeechSynthesisUtterance=function(text){this.text=text;};w.speechSynthesis={speak:u=>spoken.push(u),cancel:()=>cancelled++};
 for(const file of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
 const expected=['englisch_2_everyday','englisch_2_stories','englisch_3_opinions','englisch_4_exam'].includes(id)?7:4;
 assert.equal(d.querySelectorAll('.practice-box').length,expected);assert.equal(d.querySelectorAll('.chapter-question').length,expected);assert.equal(spoken.length,0,'No unsolicited playback');
 if(id==='englisch_2_everyday'){
  assert.equal(d.querySelectorAll('[data-arrangement-role]').length,2);
  assert.equal(d.querySelectorAll('[data-arrangement-programme] tbody tr').length,3);
  assert.equal(d.querySelectorAll('[data-arrangement-feedback] tbody tr').length,3);
 }
 if(id==='englisch_2_stories'){
  assert.ok(d.querySelector('[data-future-message]'));
  assert.equal(d.querySelectorAll('[data-time-meaning] tbody tr').length,4);
  const words=d.querySelector('[data-future-model] p').textContent.trim().split(/\s+/).length;assert.ok(words>=70&&words<=100);
 }
 if(id==='englisch_4_exam'){
  assert.equal(d.querySelectorAll('[data-globe-reading] p').length,2);
  assert.equal(d.querySelectorAll('[data-globe-responses] p').length,2);
  assert.equal(d.querySelectorAll('[data-globe-evidence] tbody tr').length,3);
  const words=d.querySelector('[data-globe-model] p').textContent.trim().split(/\s+/).length;assert.ok(words>=120&&words<=160);
  assert.ok(d.querySelector('a[href="https://www.shakespearesglobe.com/discover/shakespeares-world/the-third-globe/"]'));
 }
 if(id==='englisch_3_opinions'){
  assert.equal(d.querySelectorAll('[data-english-perspective-story] p').length,4);
  assert.equal(d.querySelectorAll('[data-perspective-evidence] tbody tr').length,3);
  const words=d.querySelector('[data-story-response-model] p').textContent.trim().split(/\s+/).length;
  assert.ok(words>=100&&words<=130,'Story response matches assigned range');
 }
 {
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  for(const [index,q] of w.currentChapterQuiz.questions.entries()){
   if(q.id.startsWith('en_arrange_'))assert.equal(q.sectionIndex,2);
   if(q.id.startsWith('en_plans_'))assert.equal(q.sectionIndex,2);
   if(q.id.startsWith('en_globe_'))assert.equal(q.sectionIndex,2);
   if(q.id.startsWith('en_story_'))assert.equal(q.sectionIndex,2);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(expected-(q.answers[choice].correct?0:1))/expected));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
   }
  }
 }
 const workshop=d.querySelector('[data-language-workshop]');const buttons=[...d.querySelectorAll('button')];buttons.find(b=>b.textContent==='Text vorlesen lassen').click();
 if(id==='englisch_1_listening'){
  assert.ok(d.querySelector('[data-listening-start] [data-listening-controls]'));
  assert.equal(workshop.querySelectorAll('[data-listening-controls]').length,0);
  const transcript=d.querySelector('[data-listening-transcript]');assert.equal(transcript.open,false);
  assert.equal(transcript.querySelector('[data-listening-source]').textContent,data[id].workshop.listen);
  assert.equal(d.querySelectorAll('[data-listening-transcript]').length,1);
  transcript.open=true;assert.equal(transcript.querySelector('blockquote').lang,'en');
  w.buildLanguageWorkshop(data[id],id);assert.equal(d.querySelectorAll('[data-listening-controls]').length,1);
 }
 const range=data[id].workshop.writing.match(/(?:in |of )(\d+)[–-](\d+) words/);
 if(range){
  const words=data[id].workshop.model.trim().split(/\s+/).length;
  assert.ok(words>=Number(range[1])&&words<=Number(range[2]),id+': comparison model must meet the assigned length');
 }
 assert.ok(workshop.textContent.includes(data[id].workshop.model),'Full comparison model is available to the learner');
 assert.equal(spoken.length,1);assert.equal(spoken[0].lang,'en-GB');assert.equal(spoken[0].text,data[id].workshop.listen);assert.ok(cancelled>0);
 buttons.find(b=>b.textContent==='Vorlesen stoppen').click();assert.equal(cancelled,2);
 [...workshop.querySelectorAll('select')].forEach((s,i)=>s.value=data[id].workshop.items[i].answer);buttons.find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
 assert.ok(workshop.querySelector('textarea'));assert.ok(w.SCIVERSE_CURRICULUM.englisch.topics.find(t=>t.id===id).available!==false);dom.window.close();
}
{
 const id='englisch_1_listening',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
 assert.match(w.document.querySelector('[data-listening-controls]').textContent,/nicht unterstützt/);
 assert.equal(w.document.querySelector('[data-listening-controls]').querySelectorAll('button').length,0);
 assert.equal(w.document.querySelector('[data-listening-source]').textContent,data[id].workshop.listen);
 dom.window.close();
}
console.log('PASS: 9 English chapter renders, 48 questions, all 144 answer paths across nine revised chapters, 27 classifications, model lengths, explicit English speech, stop, listening-first fallback and navigation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
