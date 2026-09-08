const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(p,'utf8'),de=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_8_statistik',runScripts:'outside-only'}),w=dom.window;await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>de});for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/math2_8_statistik.js'));w.topicInit();
const sample=[...w.document.querySelectorAll('[data-pencil-sample] td')].map(td=>Number(td.textContent)),ordered=[...sample].sort((a,b)=>a-b);assert.equal(sample.length,8);assert.equal(sample.reduce((a,b)=>a+b,0),120);assert.equal((ordered[3]+ordered[4])/2,15);assert.equal(ordered.at(-1)-ordered[0],6);assert.deepEqual([...new Set(ordered)].map(value=>ordered.filter(x=>x===value).length),[1,2,3,1,1]);assert.equal(w.document.querySelectorAll('[data-measurement-record] tbody tr').length,8);assert.equal(w.document.querySelectorAll('[data-own-data-tasks] li').length,6);
assert.equal(w.currentChapterQuiz.questions.length,10);const entry=w.SCIVERSE_CURRICULUM.mathematik.topics.find(t=>t.id==='math2_8_statistik');assert.equal(entry.grade,'1. Klasse (5. Schulstufe)');
const expectedPairs=['Stern','Welle','Blatt'].flatMap(m=>['liniert','kariert'].map(p=>m+' – '+p));for(const selector of ['[data-counting-pair]','[data-counting-leaf]'])assert.deepEqual([...w.document.querySelectorAll(selector)].map(e=>e.textContent),expectedPairs);assert.equal(w.document.querySelectorAll('[data-counting-task] li').length,4);
let countingPaths=0;for(const [i,q]of w.currentChapterQuiz.questions.entries())if(q.id.startsWith('counting_'))for(let a=0;a<q.answers.length;a++){assert.equal(q.sectionIndex,3);w.currentChapterQuiz.questions.forEach((item,j)=>w.document.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?a:item.answers.findIndex(x=>x.correct))+'"]').checked=true);w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).math2_8_statistik.lastPercent,q.answers[a].correct?100:90);assert.ok(w.document.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));countingPaths++;}assert.equal(countingPaths,6);assert.equal(w.currentChapterResult('math2_8_statistik',{passed:true,contentRevision:2,bestPercent:100}).passed,false);
const z=w.document.querySelector('[data-frequency-lab]'),inputs=[...z.querySelectorAll('input')],button=z.querySelector('[data-frequency-update]'),status=z.querySelector('[data-frequency-status]');
for(const values of [[4,6,2],[0,0,0],[20,20,20],[1,2,3],[0,20,1]]){
 inputs.forEach((input,i)=>input.value=values[i]);button.click();
 const bars=[...z.querySelectorAll('[data-bar]')];bars.forEach((bar,i)=>{assert.equal(Number(bar.getAttribute('height')),values[i]*20);assert.equal(Number(bar.getAttribute('y'))+Number(bar.getAttribute('height')),460);});
 assert.equal(z.querySelector('tfoot td').textContent,String(values.reduce((a,b)=>a+b,0)));
 assert.doesNotMatch(z.textContent,/NaN|Infinity/);
 if(values.every(v=>v===0))assert.match(status.textContent,/keine Antworten/);
}
const chart=z.querySelector('[data-frequency-chart]').innerHTML;
for(const invalid of ['','-1','1.5','21']){inputs[0].value=invalid;button.click();assert.equal(z.querySelector('[data-frequency-chart]').innerHTML,chart);assert.equal(w.document.activeElement,inputs[0]);assert.equal(inputs[0].getAttribute('aria-invalid'),'true');}
z.querySelector('[data-frequency-reset]').click();assert.deepEqual(inputs.map(i=>i.value),['4','6','2']);inputs[0].value=8;inputs[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(status.textContent,/Gesamt: 16/);w.topicInit();assert.equal(z.querySelectorAll('svg').length,1);
assert.equal(w.currentChapterResult('math2_8_statistik',{passed:true}).passed,false);

const comparison=w.document.querySelector('[data-statistics-lab]'),slider=comparison.querySelector('[data-statistics-value]'),fifth=comparison.querySelector('[data-statistics-fifth]'),stats=comparison.querySelector('[data-statistics-status]');
for(const includeFifth of [false,true])for(let v=0;v<=40;v++){
 slider.value=v;fifth.checked=includeFifth;fifth.dispatchEvent(new w.Event('change'));
 assert.equal(Number(stats.dataset.mean),(10+v+(includeFifth?6:0))/(includeFifth?5:4));
 assert.equal(Number(stats.dataset.median),includeFifth?4:v<=2?3:v<4?(v+4)/2:4);
 assert.equal(comparison.querySelectorAll('strong').length,includeFifth?2:3); // One task label plus middle value(s).
 assert.equal(slider.getAttribute('aria-valuetext'),v+' Minuten');
}
slider.value=30;fifth.checked=false;slider.dispatchEvent(new w.Event('input'));assert.equal(stats.dataset.mean,'10');assert.equal(stats.dataset.median,'4');
const reset=comparison.querySelector('[data-statistics-reset]');reset.focus();reset.click();assert.equal(slider.value,'10');assert.equal(fifth.checked,false);assert.equal(w.document.activeElement,reset);w.topicInit();assert.equal(comparison.querySelectorAll('[data-statistics-mean]').length,1);
const advanced=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),aw=advanced.window;
await new Promise(r=>setImmediate(r));aw.fetch=async()=>({ok:true,json:async()=>de});
for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])aw.eval(read('js/'+f+'.js'));
await aw.renderTopic();assert.equal(aw.currentChapterQuiz.questions.length,10);
const baseIds=new Set(w.currentChapterQuiz.questions.map(q=>q.id));assert.ok(aw.currentChapterQuiz.questions.every(q=>!baseIds.has(q.id)));
const workshop=aw.document.querySelector('[data-language-workshop]');[...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=de.math2_9_relative_haeufigkeit.workshop.items[i].answer);
[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
const en=JSON.parse(read('lang/en.json')),english=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),ew=english.window;
await new Promise(r=>setImmediate(r));ew.localStorage.setItem('physik_lang','en');ew.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:en});
for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])ew.eval(read('js/'+f+'.js'));
await ew.renderTopic();assert.equal(ew.document.querySelector('[data-content-language-notice]'),null);assert.equal(ew.currentChapterQuiz.questions.length,10);assert.match(ew.document.getElementById('topic-title').textContent,/Comparing relative frequencies/);
assert.equal(ew.document.getElementById('sections-container').lang,'en');
for(const [index,section]of en.math2_9_relative_haeufigkeit.sections.entries())for(const [qi,question]of section.quizzes.entries()){
 assert.equal(question.id,de.math2_9_relative_haeufigkeit.sections[index].quizzes[qi].id);
 assert.deepEqual(question.answers.map(a=>a.correct),de.math2_9_relative_haeufigkeit.sections[index].quizzes[qi].answers.map(a=>a.correct));
}
const englishWork=ew.document.querySelector('[data-language-workshop]');assert.match(englishWork.textContent,/Comparing two groups fairly/);assert.doesNotMatch(englishWork.textContent,/Ordne|Zuordnung|Prozentpunkte/);
const checkEnglish=[...englishWork.querySelectorAll('button')].find(b=>b.textContent==='Check matches');assert.ok(checkEnglish);checkEnglish.click();assert.match(englishWork.textContent,/Match all examples first/);
[...englishWork.querySelectorAll('select')].forEach((select,i)=>select.value=en.math2_9_relative_haeufigkeit.workshop.items[i].answer);checkEnglish.click();assert.match(englishWork.textContent,/3 of 3 matches are correct/);assert.doesNotMatch(englishWork.textContent,/Richtig:|Noch nicht:/);
const englishDraft=englishWork.querySelector('textarea');englishDraft.value='A has 60%; B has 50%.';englishDraft.dispatchEvent(new ew.Event('input'));await new Promise(r=>setTimeout(r,400));assert.match(englishWork.textContent,/Draft saved in this browser/);
english.window.close();
const sr=JSON.parse(read('lang/sr.json')),serbian=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),sw=serbian.window;
await new Promise(r=>setImmediate(r));sw.localStorage.setItem('physik_lang','sr');sw.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:sr});
for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])sw.eval(read('js/'+f+'.js'));
await sw.renderTopic();assert.equal(sw.document.querySelector('[data-content-language-notice]'),null);assert.equal(sw.currentChapterQuiz.questions.length,10);assert.match(sw.document.getElementById('topic-title').textContent,/Poređenje relativnih učestalosti/);
const serbianWork=sw.document.querySelector('[data-language-workshop]');[...serbianWork.querySelectorAll('select')].forEach((select,i)=>select.value=sr.math2_9_relative_haeufigkeit.workshop.items[i].answer);[...serbianWork.querySelectorAll('button')].find(b=>b.textContent==='Proveri povezivanje').click();assert.match(serbianWork.textContent,/3 od 3/);assert.doesNotMatch(serbianWork.textContent,/Zuordnung|Dein Entwurf|Check matches/);
for(const [i,section]of sr.math2_9_relative_haeufigkeit.sections.entries())for(const [j,q]of section.quizzes.entries()){const original=de.math2_9_relative_haeufigkeit.sections[i].quizzes[j];assert.equal(q.id,original.id);assert.deepEqual(q.answers.map(a=>a.correct),original.answers.map(a=>a.correct));}
serbian.window.close();
const tr=JSON.parse(read('lang/tr.json')),turkish=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),tw=turkish.window;
await new Promise(r=>setImmediate(r));tw.localStorage.setItem('physik_lang','tr');tw.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:tr});
for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])tw.eval(read('js/'+f+'.js'));
await tw.renderTopic();assert.equal(tw.document.querySelector('[data-content-language-notice]'),null);assert.equal(tw.currentChapterQuiz.questions.length,10);assert.match(tw.document.getElementById('topic-title').textContent,/Göreli sıklıkları karşılaştırma/);
const turkishWork=tw.document.querySelector('[data-language-workshop]');[...turkishWork.querySelectorAll('select')].forEach((select,i)=>select.value=tr.math2_9_relative_haeufigkeit.workshop.items[i].answer);[...turkishWork.querySelectorAll('button')].find(b=>b.textContent==='Eşleştirmeleri kontrol et').click();assert.match(turkishWork.textContent,/3 eşleştirmeden 3/);assert.doesNotMatch(turkishWork.textContent,/Zuordnung|Dein Entwurf|Check matches/);
for(const [i,section]of tr.math2_9_relative_haeufigkeit.sections.entries())for(const [j,q]of section.quizzes.entries()){const original=de.math2_9_relative_haeufigkeit.sections[i].quizzes[j];assert.equal(q.id,original.id);assert.deepEqual(q.answers.map(a=>a.correct),original.answers.map(a=>a.correct));}
turkish.window.close();
for(const language of ['uk','ar']){
 const translated=JSON.parse(read('lang/'+language+'.json')),localized=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math2_9_relative_haeufigkeit',runScripts:'outside-only'}),lw=localized.window;
 await new Promise(r=>setImmediate(r));lw.localStorage.setItem('physik_lang',language);lw.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:translated});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])lw.eval(read('js/'+f+'.js'));
 await lw.renderTopic();assert.equal(lw.document.querySelector('[data-content-language-notice]'),null);assert.equal(lw.currentChapterQuiz.questions.length,10);assert.equal(lw.document.getElementById('topic-title').textContent,translated.math2_9_relative_haeufigkeit.title);
 assert.equal(lw.document.getElementById('sections-container').lang,language);
 assert.equal(lw.document.getElementById('sections-container').dir,language==='ar'?'rtl':'ltr');
 if(language==='ar'){
  assert.ok(lw.document.querySelectorAll('bdi[dir="ltr"]').length>=4);
  assert.ok(translated.math2_9_relative_haeufigkeit.sections[0].quizzes[0].answers[0].text.includes('\u2066'));
 }

 const work=lw.document.querySelector('[data-language-workshop]');[...work.querySelectorAll('select')].forEach((select,i)=>select.value=translated.math2_9_relative_haeufigkeit.workshop.items[i].answer);work.querySelector('button').click();assert.ok(work.textContent.includes(language==='ar'?(3).toLocaleString('ar')+' من '+(3).toLocaleString('ar'):'3 із 3'));assert.doesNotMatch(work.textContent,/Zuordnung|Dein Entwurf|Check matches/);
 for(const [i,section]of translated.math2_9_relative_haeufigkeit.sections.entries())for(const [j,q]of section.quizzes.entries()){const original=de.math2_9_relative_haeufigkeit.sections[i].quizzes[j];assert.equal(q.id,original.id);assert.deepEqual(q.answers.map(a=>a.correct),original.answers.map(a=>a.correct));}
 localized.window.close();
}
advanced.window.close();
dom.window.close();console.log('PASS: statistics chapter with ten questions, six counting answer paths and matching table/tree combinations, class metadata, proportional chart, zero-data handling, invalid input, keyboard update, reset and revision invalidation.');})().catch(e=>{console.error(e);process.exitCode=1;});
