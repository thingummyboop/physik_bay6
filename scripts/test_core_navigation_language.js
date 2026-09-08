const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const labels={en:['Your review path','Your learning path','Learning goals and prior knowledge','Go to summary','Review section'],tr:['Tekrar yolun','Öğrenme yolun','Öğrenme hedefleri ve ön bilgiler','Özete git','Bölümü tekrar et'],uk:['Твій шлях повторення','Твій шлях навчання','Навчальні цілі й попередні знання','До підсумку','Повторити розділ'],sr:['Tvoj put ponavljanja','Tvoj put učenja','Ciljevi učenja i predznanje','Idi na sažetak','Ponovi odeljak'],ar:['مسار المراجعة','مسار التعلم','أهداف التعلم والمعرفة السابقة','الانتقال إلى الملخص','مراجعة القسم']};
for(const language of Object.keys(labels))for(const mode of ['learn','review'])for(const variant of ['translated','fallback','mixed']){
 const dom=new JSDOM('<div id="sections-container"><section class="card" data-chapter-section="0"><h2>Example section</h2></section></div>',{url:'https://example.test/topics/template.html?'+new URLSearchParams({topic:'geo_1_lebenssituationen',mode,plan:'geo_1_lebenssituationen,geo_2_wirtschaften'}),runScripts:'outside-only'}),w=dom.window,d=w.document;
 const topic=JSON.parse(read('lang/'+(variant==='translated'?language:'de')+'.json')).geo_1_lebenssituationen;if(variant==='fallback')topic.languageFallback=true;if(variant==='mixed')topic.contentLanguage='de-en';
 w.eval(read('js/curriculum.js'));w.eval(read('js/core-learning.js'));let started=0;w.startChapterQuiz=()=>started++;w.currentChapterQuiz={questions:[{id:'q',question:'Example question',sectionIndex:0}]};w.localStorage.setItem('sciverse_chapter_quiz_results',JSON.stringify({geo_1_lebenssituationen:{reviewQuestionIds:['q']}}));
 w.enhanceCoreLearning(topic,'geo_1_lebenssituationen',language);const nav=d.querySelector('[data-core-navigation]');
 assert.equal(nav.querySelector('h2').textContent,variant==='translated'?labels[language][mode==='review'?0:1]:(mode==='review'?'Dein Wiederholungsweg':'Dein Lernweg'));
 assert.equal(d.querySelector('[data-core-intro]').getAttribute('aria-label'),variant==='translated'?labels[language][2]:'Lernziele und Vorwissen');
 const summaryLink=[...nav.querySelectorAll('a')].find(a=>a.hash==='#chapter-summary');assert.equal(summaryLink.textContent,variant==='translated'?labels[language][3]:'Zur Zusammenfassung');
 const reviewLink=[...nav.querySelectorAll('a')].find(a=>a.hash==='#learning-section-0'&&a.textContent.includes(variant==='translated'?labels[language][4]:'Abschnitt wiederholen'));assert.ok(reviewLink);
 nav.querySelector('button').click();assert.equal(started,1);w.enhanceCoreLearning(topic,'geo_1_lebenssituationen',language);assert.equal(d.querySelectorAll('[data-core-navigation]').length,1);
 dom.window.close();
}
console.log('PASS: Five-language learning/review controls (30 cases), targeted section links, quiz activation, German fallback and bilingual teaching content, no duplicate navigation.');
