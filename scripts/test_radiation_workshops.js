const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),keys=require('./fixtures/radiation_workshop_keys.json');
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=strahlung_radioaktivitaet',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 assert.equal(w.currentChapterQuiz.questions.length,18);assert.equal(w.chapterRevision('strahlung_radioaktivitaet'),3);
 assert.equal(w.currentChapterResult('strahlung_radioaktivitaet',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 assert.deepEqual(data.strahlung_radioaktivitaet.sections.map(s=>s.id),['types','energie_information','material_wirkung','decay','half','evaluate','forschung_bildgebung']);
 const pattern=d.getElementById('optical-pattern'),route=d.getElementById('optical-path'),answer=d.getElementById('optical-answer'),check=d.getElementById('optical-check'),feedback=d.getElementById('optical-feedback');
 const choose=(e,value)=>{e.value=value;e.dispatchEvent(new w.Event('change'));};
 const saved=JSON.stringify(w.localStorage);let decisions=0;
 for(const [i,bits]of ['1100','1010','1001'].entries())for(const blocked of [false,true]){
  choose(pattern,String(i));choose(route,blocked?'blocked':'clear');assert.equal(answer.value,'');assert.equal(feedback.dataset.correct,undefined);
  assert.equal([...d.querySelectorAll('#optical-sent li')].map(e=>e.dataset.on==='true'?'1':'0').join(''),bits);
  assert.equal([...d.querySelectorAll('#optical-received li')].map(e=>e.dataset.on==='true'?'1':'0').join(''),blocked?'0000':bits);
  assert.equal(d.querySelectorAll('#optical-sent [data-on="true"]').length,2);
  check.click();assert.match(feedback.textContent,/Wähle zuerst/);
  for(const guess of ['start','pause','help','none']){answer.value=guess;check.click();assert.equal(feedback.dataset.correct,String(guess===(blocked?'none':['start','pause','help'][i])));decisions++;}
 }
 w.enhanceCoreLearning(data.strahlung_radioaktivitaet,'strahlung_radioaktivitaet','de');choose(route,'clear');choose(pattern,'0');assert.equal(d.querySelectorAll('#optical-sent li').length,4);
 assert.equal(JSON.stringify(w.localStorage),saved);
 assert.equal(d.querySelectorAll('[data-optical-investigation]').length,3);assert.equal(d.querySelectorAll('[data-optical-station-steps]>li').length,8);assert.equal(d.querySelectorAll('[data-optical-data-tasks]>li').length,3);assert.equal(d.querySelectorAll('[data-optical-risk-tasks]>li').length,3);
 const rows=[...d.querySelectorAll('[data-optical-material-data] tbody tr')].map(tr=>[...tr.querySelectorAll('td')].map(td=>Number(td.textContent)));
 assert.deepEqual(rows,[[100,100,100],[5,80,60],[60,20,70]]);assert.ok(rows[1][1]>rows[2][1]&&rows[1][0]<rows[2][0]);
 let practice=0,assessed=0;
 for(const [id,x]of Object.entries(keys)){
  const q=data.strahlung_radioaktivitaet.sections[x.section].quizzes.find(q=>q.id===id),box=d.querySelector('.practice-box[data-id="'+id+'"]');
  for(const [i,a]of q.answers.entries()){const button=[...box.querySelectorAll('button')].find(b=>b.textContent===a.text);new w.Function(button.getAttribute('onclick')).call(button);assert.equal(button.classList.contains('is-correct'),i===x.key);assert.ok(box.querySelector('.feedback').innerText.includes(a.feedback));practice++;}
 }
 assert.equal(JSON.stringify(w.localStorage),saved);
 for(const [qid,x]of Object.entries(keys))for(let a=0;a<3;a++){
  w.restartChapterQuiz();w.currentChapterQuiz.questions.forEach((q,i)=>d.querySelector(`input[name="chapter_q_${i}"][value="${q.id===qid?a:keys[q.id]?.key??q.answers.findIndex(a=>a.correct)}"]`).checked=true);w.submitChapterQuiz();
  const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).strahlung_radioaktivitaet;
  assert.equal(result.lastPercent,a===x.key?100:94);assert.equal(result.contentRevision,3);assert.deepEqual(result.reviewQuestionIds,a===x.key?[]:[qid]);
  assert.equal(w.currentChapterQuiz.questions.find(q=>q.id===qid).sectionIndex,x.section);
  if(a!==x.key){w.reviewChapterSection(x.section);assert.equal(d.activeElement,d.querySelector('[data-chapter-section="'+x.section+'"] h2'));}assessed++;
 }
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=strahlung_radioaktivitaet',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('#ws-content>.question-block').length,18);assert.equal(pd.querySelectorAll('[data-optical-paper]').length,1);assert.equal(pd.querySelectorAll('[data-optical-material-data] tbody tr').length,3);
 assert.equal(pd.querySelectorAll('#ws-physics-material [data-radiation-solution]').length,0);assert.equal(pd.getElementById('ws-solutions').hidden,true);assert.match(pd.getElementById('ws-solutions').textContent,/Vergleichshinweise zur Übertragung/);assert.match(pd.getElementById('ws-solutions').textContent,/Vergleichshinweise zu Material und Wirkung/);assert.equal(pd.querySelector('#optical-check'),null);
 paper.window.close();console.log(`PASS: ${decisions} independently decoded signal decisions, ${practice} practice and ${assessed} assessment paths, source tasks, material data, seven-section order, revision 3 and complete paper alternative.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
