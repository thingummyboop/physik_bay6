const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/ar.json'));
(async()=>{
 const id='geo_1_lebenssituationen',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','ar');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'ar');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,8);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 for(const prerequisite of en[id].prerequisites){
  const link=[...d.querySelectorAll('[data-core-intro] a')].find(a=>decodeURIComponent(a.hash.slice(1))===prerequisite);assert.ok(link,'Missing prerequisite '+prerequisite);assert.equal(link.textContent,en[prerequisite].title,'Prerequisite title must use selected chapter language');
 }
 const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
 [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=en[id].workshop.items[i].answer);
 [...workshop.querySelectorAll('button')].find(b=>b.textContent==='تحقق من المطابقات').click();assert.match(workshop.textContent,/3 من 3/);
 assert.doesNotMatch(d.getElementById('sections-container').textContent,/Europäische|Grundfreiheiten|Bürgerinitiative|Zuordnung|Zwischen/);
 const table=d.querySelector('#sections-container table');assert.ok(table);assert.equal(table.querySelectorAll('tbody tr').length,4);assert.equal(table.querySelectorAll('th[scope="col"]').length,4);assert.match(table.textContent,/ميرا، فيينا/);assert.match(table.textContent,/أماني، نيروبي/);assert.match(table.textContent,/جو، نيروبي/);assert.match(table.textContent,/سول، محيط ليما/);assert.match(d.getElementById('sections-container').textContent,/أربع شخصيات طلابية خيالية تمامًا/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,8);
 for(const wrongIndex of [1,2]){
  w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+wrongIndex+'"]').checked=true;});w.submitChapterQuiz();
  const result=d.getElementById('chapter-quiz-result');assert.equal(result.querySelectorAll('li').length,8);
  w.currentChapterQuiz.questions.forEach(q=>assert.ok(result.textContent.includes(q.answers[wrongIndex].feedback),'Missing feedback for '+q.id));
 }
 dom.window.close();console.log('PASS: Arabic living situations chapter: four case studies, eight equivalent questions, matching workshop and complete assessment.');
})().catch(e=>{console.error(e);process.exitCode=1;});
