const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(p,'utf8'),de=JSON.parse(read('lang/de.json'));
(async()=>{for(const scenario of ['methods-denied','property-denied']){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),w=dom.window;await new Promise(r=>setImmediate(r));
 const deny=()=>{throw new w.DOMException('Storage denied','SecurityError');};
 if(scenario==='property-denied')Object.defineProperty(w,'localStorage',{get:deny});else{w.Storage.prototype.getItem=deny;w.Storage.prototype.setItem=deny;}
 w.fetch=async()=>({ok:true,json:async()=>de});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])assert.doesNotThrow(()=>w.eval(read('js/'+f+'.js')),scenario+' '+f);
 await w.renderTopic();assert.equal(w.currentChapterQuiz.questions.length,21);assert.match(w.document.getElementById('topic-title').textContent,/Relative Häufigkeiten/);
 const practice=w.document.querySelector('.practice-option');assert.doesNotThrow(()=>w.handlePracticeAnswer(practice,false,'Prüfe die Bezugsgruppe.'));assert.match(practice.closest('.practice-box').querySelector('.feedback').innerText,/Bezugsgruppe/);
 const draft=w.document.querySelector('[data-language-workshop] textarea');draft.value='Mein Entwurf';draft.dispatchEvent(new w.Event('input'));assert.match(draft.closest('[data-language-workshop]').textContent,/Speichern ist hier nicht möglich/);
 w.startChapterQuiz();w.submitChapterQuiz();assert.match(w.document.getElementById('chapter-quiz-result').textContent,/Bitte beantworte/);
 w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);w.document.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});
 assert.doesNotThrow(()=>w.submitChapterQuiz());const result=w.document.getElementById('chapter-quiz-result');assert.match(result.textContent,/100%/);assert.match(result.textContent,/nicht gespeichert/);assert.equal(result.querySelectorAll('li').length,w.currentChapterQuiz.questions.length);assert.equal(w.document.activeElement,result.querySelector('h2'));dom.window.close();
 }console.log('PASS: complete chapter, practice, draft and assessment remain usable with denied Storage methods or denied localStorage property.');
})().catch(e=>{console.error(e);process.exitCode=1;});
