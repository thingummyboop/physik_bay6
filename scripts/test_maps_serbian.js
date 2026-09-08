const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/sr.json'));
(async()=>{
 const id='geo_1_karten_raeume',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','sr');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'sr');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,4);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
 [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=en[id].workshop.items[i].answer);
 [...workshop.querySelectorAll('button')].find(b=>b.textContent==='Proveri povezivanje').click();assert.match(workshop.textContent,/3 od 3/);
 assert.doesNotMatch(d.getElementById('sections-container').textContent,/Europäische|Grundfreiheiten|Bürgerinitiative|Zuordnung|Zwischen/);
 const zone=d.querySelector('[data-geo-experiment="route"]'),status=zone.querySelector('[data-status]'),move=direction=>zone.querySelector('[data-direction="'+direction+'"]').click(),reset=()=>zone.querySelector('[data-reset]').click();
 assert.match(status.textContent,/Položaj A5/);move('w');assert.match(status.textContent,/završava model plana/);assert.match(status.textContent,/Broj koraka: 0/);
 move('e');move('e');move('n');move('n');assert.match(status.textContent,/C3 je zatvoreno/);assert.match(status.textContent,/Položaj C4. Broj koraka: 3/);
 reset();w.initGeoExperiments();for(let i=0;i<4;i++)move('n');for(let i=0;i<4;i++)move('e');assert.match(status.textContent,/800 m/);assert.match(status.textContent,/Cilj je dostignut/);assert.match(zone.querySelector('[data-grid]').getAttribute('aria-label'),/Položaj E1/);assert.doesNotMatch(zone.textContent,/Standort|Schritte|gesperrt|Ziel erreicht/);reset();assert.match(status.textContent,/Položaj A5. Broj koraka: 0/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,4);
 dom.window.close();console.log('PASS: Serbian maps chapter: translated route controls/status, map boundary, blocked cell, shortest route, reset, four assessments and workshop.');
})().catch(e=>{console.error(e);process.exitCode=1;});
