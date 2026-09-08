const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(p,'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/en.json'));
const expected={en:['Chapter understanding check','Please answer task','Your result was saved','could not be saved','Review the relevant section','Review later'],ar:['اختبار فهم الفصل','أجب أولًا','تم حفظ نتيجتك','تعذّر حفظ نتيجتك','راجع القسم المناسب','راجع لاحقًا'],sr:['Provera razumevanja poglavlja','Prvo odgovori','Rezultat je sačuvan','Rezultat nije mogao','Ponovi odgovarajući odeljak','Ponovi kasnije'],tr:['Bölüm anlama kontrolü','Önce şu soruyu','Sonucun bu tarayıcıya kaydedildi','Sonucun bu tarayıcıya kaydedilemedi','İlgili kısmı tekrar et','daha sonra tekrar et'],uk:['Перевірка розуміння розділу','Спочатку дай відповідь','Твій результат збережено','Не вдалося зберегти результат','Повтори відповідну частину','Повтори пізніше']};
(async()=>{for(const language of Object.keys(expected))for(const scenario of ['passed','failed','storage-failed']){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),w=dom.window;await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang',language);const translated=JSON.parse(read('lang/'+language+'.json'));w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:translated});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 const card=w.document.getElementById('chapter-quiz-card');assert.ok(card.textContent.includes(expected[language][0]),language);assert.doesNotMatch(card.textContent,/Verständnis|vorgesehenen|Unbegrenzt/);
 w.startChapterQuiz();w.submitChapterQuiz();const result=w.document.getElementById('chapter-quiz-result');assert.ok(result.textContent.includes(expected[language][1]),language);assert.doesNotMatch(result.textContent,/Bitte beantworte|Du kannst deine Antworten/);
 w.currentChapterQuiz.questions.forEach((q,i)=>{const choice=q.answers.findIndex(a=>scenario==='failed'?!a.correct:a.correct);w.document.querySelector('input[name="chapter_q_'+i+'"][value="'+choice+'"]').checked=true;});
 if(scenario==='storage-failed')w.Storage.prototype.setItem=()=>{throw Error('Quota');};
 w.submitChapterQuiz();assert.match(result.textContent,scenario==='failed'?/0%/:/100%/);assert.equal(result.querySelectorAll('li').length,w.currentChapterQuiz.questions.length);
 assert.ok(result.textContent.includes(expected[language][scenario==='storage-failed'?3:2]),language+' storage');
 assert.ok(result.textContent.includes(expected[language][scenario==='failed'?4:5]),language+' review');
 assert.doesNotMatch(result.textContent,/richtig:|Dein Ergebnis|Gut gemacht|Passenden Abschnitt|Schau dir/);
 assert.equal(w.document.activeElement,result.querySelector('h2'));dom.window.close();
 }console.log('PASS: Five-language chapter check launch, missing answers, success, failure, review links and storage-error feedback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
