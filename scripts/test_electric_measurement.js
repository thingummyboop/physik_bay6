const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {JSDOM} = require('jsdom'), data = require('../lang/de.json');
const read = p => fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const keys = {electric_evidence_single:1,electric_evidence_double:2,electric_evidence_deviation:0,electric_evidence_measuring:1};
(async()=>{
 const dom = new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=elektrizitaet',runScripts:'outside-only'}), w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const s of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+s+'.js'));
 await w.renderTopic();w.eval(read('js/topics/elektrizitaet.js'));w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,28);
 assert.equal(w.currentChapterResult('elektrizitaet',{contentRevision:4,passed:true,bestPercent:100}).passed,false);
 const lab=d.querySelector('[data-electric-evidence]'),get=n=>lab.querySelector('[data-evidence-'+n+']'),before=JSON.stringify(w.localStorage);
 const sets={A:[20,41,59,80],B:[20,30,40,50]};let states=0,decisions=0,paths=0;
 for(const series of ['A','B'])for(let n=1;n<=4;n++){
  get('series').value=series;get('count').value=String(n);get('count').focus();get('count').dispatchEvent(new w.Event('change'));
  assert.equal(d.activeElement,get('count'));assert.equal(get('feedback').textContent,'');
  const rows=[...get('rows').rows],points=[...get('chart').querySelectorAll('circle')];assert.equal(rows.length,n);assert.equal(points.length,n);
  rows.forEach((row,i)=>{const observed=sets[series][i],model=(i+1)/50*1000;assert.equal(row.cells[1].textContent,model+' mA');assert.equal(row.cells[2].textContent,observed+' mA');assert.equal(Number(row.cells[3].textContent.replace(' mA','').replace('−','-')),observed-model);assert.equal(Number(points[i].getAttribute('cx')),50+(i+1)*65);assert.equal(Number(points[i].getAttribute('cy')),220-2*observed);});
  const expected=n===1?'insufficient':series==='A'?'fits':'differs';
  for(const answer of ['fits','differs','insufficient']){const b=lab.querySelector('[data-evidence-answer="'+answer+'"]');b.focus();b.click();assert.equal(get('feedback').dataset.correct,String(answer===expected));assert.equal(d.activeElement,b);assert.ok(get('feedback').textContent.length>80);decisions++;}
  states++;
 }
 w.topicInit();assert.equal(get('series').value,'B');assert.equal(get('count').value,'4');get('reset').click();assert.equal(d.activeElement,get('series'));assert.equal(get('count').value,'1');assert.equal(get('feedback').textContent,'');
 get('series').value='bad';get('count').value='bad';get('count').dispatchEvent(new w.Event('change'));assert.equal(get('series').value,'A');assert.equal(get('count').value,'1');assert.equal(JSON.stringify(w.localStorage),before);
 assert.equal(d.querySelectorAll('[data-electric-measurement-record] tbody tr').length,8);assert.equal(d.querySelectorAll('[data-electric-measurement-steps] li').length,6);
 const paper=lab.querySelector(':scope > template[data-worksheet-alternative]').content;
 assert.equal(paper.querySelectorAll('[data-electric-evidence-paper] tbody tr').length,4);
 for(const [i,row]of [...paper.querySelectorAll('tbody tr')].entries())assert.deepEqual([...row.cells].map(c=>c.textContent),[(i+1)+' V',20*(i+1)+' mA',sets.A[i]+' mA',sets.B[i]+' mA']);
 assert.match(lab.textContent,/erfundene Übungsdaten/);assert.match(d.querySelector('[data-electric-measurement-record]').caption.textContent,/bleiben die Felder leer/);
 for(const [id,key]of Object.entries(keys)){
  const index=w.currentChapterQuiz.questions.findIndex(q=>q.id===id),q=w.currentChapterQuiz.questions[index];assert.equal(q.sectionIndex,5);assert.equal(q.answers.findIndex(a=>a.correct),key);
  for(let a=0;a<3;a++){
   const restart=[...d.querySelectorAll('button')].find(b=>b.textContent==='Neuen Versuch starten');if(restart)restart.click();
   w.currentChapterQuiz.questions.forEach((q,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===index?a:q.answers.findIndex(x=>x.correct)}"]`).checked=true);
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).elektrizitaet;
   assert.equal(result.lastPercent,a===key?100:96);assert.equal(result.contentRevision,6);assert.deepEqual(Array.from(result.reviewQuestionIds),a===key?[]:[id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
  }
 }
 dom.window.close();console.log(`PASS: ${states} evidence states, ${decisions} decisions, ${paths} assessment paths, plotted/table values, reset/focus/storage and measurement protocol.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
