const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const ids=Object.keys(data).filter(id=>id.startsWith('eh_'));assert.equal(ids.length,7);let planners=0;
for(const id of ids){
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','language-workshop','meal-planner','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
 const expected=id==='eh_2_zubereiten'?10:['eh_2_einkaufen','eh_2_zubereiten','eh_1_ernaehrung','eh_1_hygiene','eh_4_projekt','eh_3_nachhaltig'].includes(id)?7:4;
 assert.equal(d.querySelectorAll('.practice-box').length,expected);assert.equal(d.querySelectorAll('.chapter-question').length,expected);
 if(id==='eh_1_hygiene'){
  assert.equal(d.querySelectorAll('[data-storage-protocol] tbody tr').length,3);
  assert.equal(w.currentChapterQuiz.questions.find(q=>q.id==='eh_1_hygiene_q1').sectionIndex,2);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  assert.match(d.body.textContent,/Fiktive Übungskarte/);
 }
 if(id==='eh_4_projekt'){
  const rows=[...d.querySelectorAll('[data-project-item]')];assert.equal(rows.length,5);
  const packs=rows.map(r=>r.dataset.pack==='0'?0:Math.ceil(Math.max(0,Number(r.dataset.need)-Number(r.dataset.stock))/Number(r.dataset.pack)));
  assert.deepEqual(packs,[2,2,1,0,0]);
  const planned=rows.reduce((sum,r,i)=>sum+packs[i]*Math.round(Number(r.dataset.planPrice)*100),0);
  const actual=rows.reduce((sum,r,i)=>sum+packs[i]*Math.round(Number(r.dataset.actualPrice)*100),0);
  assert.equal(planned,930);assert.equal(actual,990);assert.equal(1200-actual,210);assert.equal(actual-planned,60);
  assert.deepEqual(rows.map((r,i)=>Number(r.dataset.stock)+packs[i]*Number(r.dataset.pack)-Number(r.dataset.need)),[200,300,300,70,55]);
  assert.equal(d.querySelectorAll('[data-project-receipt] tbody tr').length,3);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
 }
 if(['eh_1_hygiene','eh_4_projekt'].includes(id)){
  for(const q of w.currentChapterQuiz.questions.filter(q=>/^(eh_haltbar_|eh_projekt_geld_)/.test(q.id))){
   assert.equal(q.sectionIndex,3);const index=w.currentChapterQuiz.questions.indexOf(q);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true;});
    w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
    assert.equal(result.lastPercent,Math.round(100*(expected-(q.answers[choice].correct?0:1))/expected));
    assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
   }
  }
 }

 if(id==='eh_3_nachhaltig'){
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  const table=d.querySelector('[data-bread-offers]');assert.equal(table.querySelectorAll('tbody tr').length,5);
  const masses=[...table.querySelectorAll('[data-bread-row="mass"] td')].map(x=>parseFloat(x.textContent));
  const prices=[...table.querySelectorAll('[data-bread-row="price"] td')].map(x=>parseFloat(x.textContent.replace(',','.')));
  assert.deepEqual(prices.map((p,i)=>p/(masses[i]/1000)),[5,4]);assert.deepEqual(masses.map(m=>m-450),[50,300]);
  const packs=masses.map(m=>Math.ceil(750/m));assert.deepEqual(packs,[2,1]);assert.deepEqual(packs.map((n,i)=>n*prices[i]),[5,3]);assert.deepEqual(packs.map((n,i)=>n*masses[i]-750),[250,0]);
  assert.equal(d.querySelectorAll('[data-bread-lifecycle] tbody tr').length,7);assert.equal(d.querySelectorAll('[data-bread-investigation] li').length,4);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(q.id.startsWith('eh_product_'))assert.equal(q.sectionIndex,3);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:86);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,21);
 }
 if(id==='eh_1_ernaehrung'){
  assert.equal(d.querySelectorAll('[data-habits-example] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-habits-protocol] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-habits-investigation] li').length,5);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  assert.match(d.body.textContent,/Keine Angabe bedeutet unbekannt/);assert.match(d.body.textContent,/Beide Arbeitswege sind gleichwertig/);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(q.id.startsWith('eh_habits_'))assert.equal(q.sectionIndex,3);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:86);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,21);
 }
 if(id==='eh_2_zubereiten'){
  assert.equal(d.querySelectorAll('[data-sensory-example] tbody tr').length,4);assert.equal(d.querySelectorAll('[data-sensory-protocol] tbody tr').length,2);assert.equal(d.querySelectorAll('[data-sensory-investigation] li').length,4);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  assert.match(d.body.textContent,/Teilnahme ohne Verkosten ist gleichwertig/);assert.match(d.body.textContent,/keine Messergebnisse der Klasse/);
  assert.equal(d.querySelectorAll('[data-warm-steps] li').length,6);assert.equal(d.querySelectorAll('[data-warm-protocol] tbody tr').length,4);
  assert.deepEqual([...d.querySelectorAll('[data-warm-ingredients] [data-amount]')].map(e=>2*Number(e.dataset.amount)),[800,120,20]);
  assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(q.id.startsWith('eh_cook_'))assert.equal(q.sectionIndex,4);
   if(q.id.startsWith('eh_sensory_'))assert.equal(q.sectionIndex,3);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:90);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,30);
 }
 if(id==='eh_2_einkaufen'){
  assert.equal(d.querySelectorAll('[data-service-offers] tbody tr').length,6);assert.equal(d.querySelectorAll('[data-service-cases] tbody tr').length,2);assert.equal(d.querySelectorAll('[data-service-investigation] li').length,4);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  assert.match(d.body.textContent,/180 Personenminuten/);assert.match(d.body.textContent,/keine aktuellen Marktpreise/);
  const values=key=>[...d.querySelectorAll('[data-service-row="'+key+'"] [data-value]')].map(e=>Number(e.dataset.value));
  const payments=values('payment'),minutes=values('minutes'),people=values('people');
  assert.deepEqual(payments.map(v=>v/20),[2,3.2]);assert.equal(payments[1]-payments[0],24);assert.equal(payments[1]+8,72);
  assert.deepEqual(minutes.map((n,i)=>n*people[i]),[180,15]);
  assert.deepEqual(payments.map((n,i)=>n<=70&&minutes[i]<=45&&people[i]<=1),[false,true]);
  assert.deepEqual(payments.map((n,i)=>n<=50&&minutes[i]<=120&&people[i]<=2),[true,false]);
  let paths=0;
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   if(q.id.startsWith('eh_offer_'))assert.equal(q.sectionIndex,3);
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[choice].correct?100:86);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
   }
  }
  assert.equal(paths,21);
 }
 const entry=w.SCIVERSE_CURRICULUM.ernaehrung.topics.find(t=>t.id===id);assert.ok(entry.available!==false);assert.equal(entry.grade,'6. Schulstufe (2. Kl.)');
 const workshop=d.querySelector('[data-language-workshop]');[...workshop.querySelectorAll('select')].forEach((s,i)=>s.value=data[id].workshop.items[i].answer);[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
 const zone=d.querySelector('[data-meal-planner]');if(zone){planners++;const input=zone.querySelector('input'),status=()=>zone.querySelector('[data-status]').textContent;
  assert.equal(zone.querySelectorAll('tbody tr').length,5);assert.match(status(),/2,31/);assert.match(status(),/1,16/);assert.match(status(),/ganzer Packungen/);
  assert.deepEqual(Array.from(w.mealAmounts(3),item=>item.amount),[300,450,150,15,22.5]);
  for(let n=1;n<=8;n++){input.value=n;input.dispatchEvent(new w.Event('input'));const rows=[...zone.querySelectorAll('tbody tr')];assert.equal(rows.length,5);assert.equal(rows[0].cells[1].textContent.replace(/\u00a0|\u202f/g,''),(100*n)+' g');assert.equal(rows[1].cells[1].textContent.replace(/\u00a0|\u202f/g,''),(150*n)+' g');const total=Array.from(w.mealAmounts(n)).reduce((sum,row)=>sum+row.cost,0);assert.ok(Math.abs(total-1.155*n)<1e-9);assert.match(status(),new RegExp('^'+n+' Rezeptportionen:'));}
  for(const invalid of ['',0,-1,1.5,9]){input.value=invalid;input.dispatchEvent(new w.Event('input'));assert.equal(zone.querySelectorAll('tbody tr').length,0);assert.match(status(),/ganze Anzahl von 1 bis 8/);}
  input.value=6;input.dispatchEvent(new w.Event('input'));assert.match(status(),/6,93/);w.initMealPlanners();assert.equal(zone.querySelectorAll('tbody tr').length,5);
 }
 dom.window.close();
 const sheet=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/physik_bay6/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),sw=sheet.window,sd=sw.document;
 sw.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','worksheet_generator','worksheet'])sw.eval(read('js/'+file+'.js'));
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(sd.getElementById('ws-print').disabled,false);
 assert.equal(sd.getElementById('ws-subject').textContent,'Ernährung und Haushalt');
 const material=sd.getElementById('ws-household-material');assert.ok(material);
 assert.equal(material.querySelectorAll('article').length,data[id].sections.length);
 assert.equal(material.querySelectorAll('input,button,select,script,svg,canvas,details').length,0);
 assert.ok(material.textContent.includes(data[id].workshop.writing));assert.ok(!material.textContent.includes(data[id].workshop.model));
 if(id==='eh_2_einkaufen'){assert.equal(material.querySelectorAll('[data-service-offers] tbody tr').length,6);assert.equal(material.querySelectorAll('[data-service-cases] tbody tr').length,2);assert.equal(material.querySelectorAll('[data-service-check] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-service-investigation] li').length,4);assert.ok(!material.querySelector('[data-service-solution]'));assert.match(material.textContent,/keine aktuellen Marktpreise/);}
 if(id==='eh_2_zubereiten'){assert.equal(material.querySelectorAll('[data-warm-steps] li').length,6);assert.equal(material.querySelectorAll('[data-warm-protocol] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-warm-ingredients] tbody tr').length,3);assert.ok(!material.querySelector('[data-warm-model]'));assert.equal(material.querySelectorAll('[data-sensory-words] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-sensory-example] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-sensory-protocol] tbody tr').length,2);assert.equal(material.querySelectorAll('[data-sensory-investigation] li').length,4);assert.ok(!material.querySelector('[data-sensory-model]'));assert.match(material.textContent,/Teilnahme ohne Verkosten ist gleichwertig/);}
 if(id==='eh_1_ernaehrung'){assert.equal(material.querySelectorAll('[data-habits-example] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-habits-protocol] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-habits-investigation] li').length,5);assert.ok(!material.querySelector('[data-habits-model]'));assert.match(material.textContent,/Beide Arbeitswege sind gleichwertig/);}
 if(id==='eh_3_nachhaltig'){assert.equal(material.querySelectorAll('[data-bread-offers] tbody tr').length,5);assert.equal(material.querySelectorAll('[data-bread-lifecycle] tbody tr').length,7);assert.equal(material.querySelectorAll('[data-bread-investigation] li').length,4);assert.ok(!material.querySelector('[data-bread-calculation],[data-bread-decision]'));}
 if(id==='eh_1_hygiene'){assert.equal(material.querySelectorAll('[data-storage-protocol] tbody tr').length,3);assert.match(material.textContent,/Ungeöffnet trocken lagern/);}
 if(id==='eh_4_projekt'){
  assert.equal(material.querySelectorAll('[data-project-item]').length,5);
  assert.equal(material.querySelectorAll('[data-project-receipt] tbody tr').length,3);
  assert.equal(material.querySelectorAll('[data-project-account] tbody tr').length,4);
  assert.equal(material.querySelectorAll('[data-project-solution]').length,0);
  assert.ok(!material.textContent.includes('Fehlmengen: 600 g Bohnen'));
 }
 const toggle=sd.getElementById('ws-include-material');toggle.checked=false;toggle.dispatchEvent(new sw.Event('change'));assert.equal(material.hidden,true);assert.equal(sd.getElementById('ws-solutions').hidden,true);
 const solutions=sd.getElementById('ws-include-solutions');solutions.checked=true;solutions.dispatchEvent(new sw.Event('change'));assert.equal(material.hidden,true);assert.equal(sd.getElementById('ws-solutions').hidden,false);
 assert.equal(sd.querySelectorAll('#ws-content > .question-block').length,expected);
 sheet.window.close();
}
assert.equal(planners,3);console.log('PASS: seven household renders and complete text/workshop worksheets with independent toggles, 49 questions, 111 cooking/service/sensory/habits/storage/project/product answer paths and independently calculated purchase/inventory balances, date question after explanation and stale mastery invalidation, 21 classifications, grade 6 navigation; three planners, all 1–8 quantities, fractional amounts, modeled cost arithmetic, invalid input and recovery.');
})().catch(error=>{console.error(error);process.exitCode=1;});
