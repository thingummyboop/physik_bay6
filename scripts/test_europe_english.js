const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/en.json'));
(async()=>{
 const id='geo_3_europa',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','en');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'en');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,12);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
 [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=en[id].workshop.items[i].answer);
 [...workshop.querySelectorAll('button')].find(b=>b.textContent==='Check matches').click();assert.match(workshop.textContent,/3 of 3/);
 assert.doesNotMatch(d.getElementById('sections-container').textContent,/Europäische|Grundfreiheiten|Bürgerinitiative|Zuordnung|Zwischen/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,12);
 dom.window.close();console.log('PASS: English Europe chapter selected, seven sections, 12 equivalent assessments, English workshop 3/3 and complete chapter check.');
})().catch(e=>{console.error(e);process.exitCode=1;});
