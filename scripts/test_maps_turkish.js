const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/tr.json'));
(async()=>{
 const id='geo_1_karten_raeume',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','tr');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'tr');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,4);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
 [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=en[id].workshop.items[i].answer);
 [...workshop.querySelectorAll('button')].find(b=>b.textContent==='Eşleştirmeleri kontrol et').click();assert.match(workshop.textContent,/3 eşleştirmeden 3 tanesi doğru/);
 assert.doesNotMatch(d.getElementById('sections-container').textContent,/Europäische|Grundfreiheiten|Bürgerinitiative|Zuordnung|Zwischen/);
 const zone=d.querySelector('[data-geo-experiment="route"]'),status=zone.querySelector('[data-status]'),move=direction=>zone.querySelector('[data-direction="'+direction+'"]').click(),reset=()=>zone.querySelector('[data-reset]').click();
 assert.match(status.textContent,/Konum A5/);move('w');assert.match(status.textContent,/Model planın sınırına/);assert.match(status.textContent,/0 adım/);
 move('e');move('e');move('n');move('n');assert.match(status.textContent,/C3 kapalı/);assert.match(status.textContent,/Konum C4. 3 adım/);
 reset();w.initGeoExperiments();for(let i=0;i<4;i++)move('n');for(let i=0;i<4;i++)move('e');assert.match(status.textContent,/800 metre/);assert.match(status.textContent,/Hedefe ulaştın/);assert.match(zone.querySelector('[data-grid]').getAttribute('aria-label'),/Konum E1/);assert.doesNotMatch(zone.textContent,/Standort|Schritte|gesperrt|Ziel erreicht/);reset();assert.match(status.textContent,/Konum A5. 0 adım/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,4);
 dom.window.close();console.log('PASS: Turkish maps chapter: translated route controls/status, map boundary, blocked cell, shortest route, reset, four assessments and workshop.');
})().catch(e=>{console.error(e);process.exitCode=1;});
