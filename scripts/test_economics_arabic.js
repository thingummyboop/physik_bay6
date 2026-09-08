const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),de=JSON.parse(read('lang/de.json')),en=JSON.parse(read('lang/ar.json'));
(async()=>{
 const id='geo_2_wirtschaften',dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.localStorage.setItem('physik_lang','ar');w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});w.HTMLElement.prototype.scrollIntoView=()=>{};
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+f+'.js'));w.eval('globalPhysikScore=0');await w.renderTopic();
 assert.equal(d.querySelector('[data-content-language-notice]'),null);assert.equal(d.getElementById('sections-container').lang,'ar');assert.equal(en[id].sourceRevision,w.chapterRevision(id));
 assert.equal(d.getElementById('topic-title').textContent,en[id].title);assert.equal(w.currentChapterQuiz.questions.length,4);
 for(let i=0;i<de[id].sections.length;i++){
  const source=de[id].sections[i],translation=en[id].sections[i];assert.equal(source.id,translation.id);
  source.quizzes.forEach((q,j)=>{assert.equal(q.id,translation.quizzes[j].id);assert.deepEqual(q.answers.map(a=>a.correct),translation.quizzes[j].answers.map(a=>a.correct));});
 }
 const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
 [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=en[id].workshop.items[i].answer);
 [...workshop.querySelectorAll('button')].find(b=>b.textContent==='تحقق من المطابقات').click();assert.match(workshop.textContent,/3 من 3/);
 assert.doesNotMatch(d.getElementById('sections-container').textContent,/Bedürfnisse|Opportunitätskosten|Einnahmen|Zuordnung|Rücklage/);
 const zone=d.querySelector('[data-geo-experiment="budget"]'),inputs=[...zone.querySelectorAll('input')],status=zone.querySelector('[data-status]');
 for(let mask=0;mask<16;mask++){
  inputs.forEach((input,i)=>input.checked=Boolean(mask&(1<<i)));inputs[0].dispatchEvent(new w.Event('change'));
  const spending=[6,4,8,7].reduce((sum,n,i)=>sum+((mask&(1<<i))?n:0),0),left=20-spending;
  assert.ok(status.textContent.includes('النفقات: \u2066'+spending+'\u2069 يورو. المتبقي: \u2066'+left+'\u2069 يورو.'));
  assert.ok(status.textContent.includes(left<0?'تتجاوز':left<5?'لا تترك':'لا يقل عن 5 يورو'));
  assert.doesNotMatch(status.textContent,/Ausgaben|Rücklage|verfügbaren|überschreitet/);
 }
 w.initGeoExperiments();inputs.forEach(i=>i.checked=false);inputs[0].dispatchEvent(new w.Event('change'));assert.match(status.textContent,/المتبقي: \u206620\u2069 يورو/);
 w.startChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>{const answer=q.answers.findIndex(a=>a.correct);d.querySelector('input[name="chapter_q_'+i+'"][value="'+answer+'"]').checked=true;});w.submitChapterQuiz();assert.match(d.getElementById('chapter-quiz-result').textContent,/100%/);assert.equal(d.getElementById('chapter-quiz-result').querySelectorAll('li').length,4);
 dom.window.close();console.log('PASS: Arabic economics chapter: all 16 budget combinations, four equivalent questions, matching workshop and complete assessment.');
})().catch(e=>{console.error(e);process.exitCode=1;});
