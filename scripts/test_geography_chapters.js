const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
const ids=['geo_1_karten_raeume','geo_2_wirtschaften','geo_3_europa','geo_4_globalisierung','geo_1_ernaehrung_landwirtschaft','geo_1_naturgefahren','geo_2_arbeit_maerkte','geo_2_ressourcen_energie','geo_2_sparen_risiko','geo_3_bevoelkerung','geo_3_zentren_lebensqualitaet','geo_3_wirtschaftsstandort','geo_3_bildung_arbeit_rechte','geo_4_bevoelkerung_staedte','geo_1_lebenssituationen'];
(async()=>{
 for(const id of ids){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const file of ['curriculum','common','core-learning','language-workshop','geo-experiments','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
  const expected=id==='geo_4_globalisierung'?10:id==='geo_3_bildung_arbeit_rechte'?16:['geo_2_arbeit_maerkte','geo_3_wirtschaftsstandort','geo_3_europa','geo_1_ernaehrung_landwirtschaft'].includes(id)?12:['geo_1_ernaehrung_landwirtschaft','geo_1_naturgefahren','geo_2_ressourcen_energie','geo_2_sparen_risiko','geo_3_bevoelkerung','geo_3_zentren_lebensqualitaet','geo_4_bevoelkerung_staedte','geo_1_lebenssituationen'].includes(id)?8:4;
  assert.equal(d.querySelectorAll('.practice-box').length,expected,id);assert.equal(d.querySelectorAll('.chapter-question').length,expected,id);
  assert.ok(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).available!==false);
  const workshop=d.querySelector('[data-language-workshop]');
  if(id==='geo_4_globalisierung'){
   w.eval(read('js/chapter-revisions.js'));
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
   assert.match(d.body.textContent,/kein exakter|nicht automatisch ein Kipppunkt/);
   const costQuestion=w.currentChapterQuiz.questions.find(q=>q.question==='Was kostet Vorschlag B insgesamt?');
   assert.ok(costQuestion);assert.equal(costQuestion.answers.find(a=>a.correct).text,(20*4+40)+' €.');
   assert.equal(data[id].sections.filter(s=>s.id.startsWith('global_')).length,3);
  }
  [...workshop.querySelectorAll('select')].forEach((s,i)=>s.value=data[id].workshop.items[i].answer);
  [...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
  if(id==='geo_1_ernaehrung_landwirtschaft'){
   w.eval(read('js/chapter-revisions.js'));
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).outdated,true,'Old eight-question result must not count as mastery of the expanded chapter');
   const climateQuestions=data[id].sections.filter(s=>['food_climate','food_adaptation'].includes(s.id)).flatMap(s=>s.quizzes);
   assert.equal(climateQuestions.length,4);
   for(const q of climateQuestions){assert.equal(q.answers.filter(a=>a.correct).length,1);assert.ok(q.answers.every(a=>a.feedback));assert.ok(d.querySelector('.chapter-question').parentElement.textContent.includes(q.question),'New climate question is included in chapter assessment');}
   const entry=w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id);assert.match(entry.grade,/5\. Schulstufe/);
   const rows=[...d.querySelectorAll('table tbody tr')].map(row=>[...row.querySelectorAll('td')].map(cell=>parseFloat(cell.textContent)));
   assert.deepEqual(rows,[[2,8,4],[4,12,3]]);for(const [area,harvest,yieldPerHa]of rows)assert.equal(harvest/area,yieldPerHa);
   const draft=workshop.querySelector('textarea');draft.value='Beide kosten 2 €/kg. Transport und Lagerung sind unbekannt.';draft.dispatchEvent(new w.Event('input'));assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value);
   const selects=[...workshop.querySelectorAll('select')];selects[2].value='Angabe im Modell';[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/2 von 3/);assert.match(d.getElementById('workshop-2-feedback').textContent,/keine Angabe/);
  }
  if(id==='geo_1_naturgefahren'){
   const zone=d.querySelector('[data-geo-experiment="flood"]'),level=zone.querySelector('[data-water-level]'),move=zone.querySelector('[data-relocate]'),warning=zone.querySelector('[data-warning]');
   const counts={1:[1,0],3:[3,1],5:[4,2]};
   for(const water of [1,3,5])for(const relocated of [false,true])for(const warned of [false,true]){
    level.value=String(water);move.checked=relocated;warning.checked=warned;warning.dispatchEvent(new w.Event('change'));
    const rows=[...zone.querySelectorAll('tbody tr')],status=zone.querySelector('[data-status]').textContent;
    assert.equal(rows.length,4);assert.equal(rows.filter(row=>row.lastElementChild.textContent==='Im Modell überflutet').length,counts[water][Number(relocated)],JSON.stringify({water,relocated,warned,selected:level.value,options:level.innerHTML,status}));
    assert.ok(status.includes(counts[water][Number(relocated)]+' von 4 Häusern'));assert.match(status,warned?/senkt den Wasserstand nicht/:/Ohne Warnung/);
   }
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.equal(level.value,'3');assert.equal(move.checked,false);assert.equal(warning.checked,false);assert.match(zone.querySelector('[data-status]').textContent,/3 von 4 Häusern/);
   assert.equal(zone.querySelectorAll('tbody tr').length,4,'Repeated initialization does not duplicate rows');
  }
  if(id==='geo_2_arbeit_maerkte'){
   const zone=d.querySelector('[data-geo-experiment="project"]'),price=zone.querySelector('[data-project-price]'),batch=zone.querySelector('[data-project-batch]');
   const expectedResults=[[-4,-4,-4],[0,4,0],[4,0,-4]];
   for(const p of [1,2,3])for(const n of [4,8,12]){
    price.value=String(p);batch.value=String(n);batch.dispatchEvent(new w.Event('change'));const status=zone.querySelector('[data-status]').textContent;
    assert.ok(status.includes('Ergebnis: '+expectedResults[p-1][n/4-1]+' €.'),status);
    const sold=Math.min(n,[12,8,4][p-1]);assert.ok(status.includes('Verkauft: '+sold+'. Übrig: '+(n-sold)+'.'));
    assert.match(status,/Arbeitszeit ist nicht bezahlt/);assert.match(status,/keine Vorhersage/);
   }
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.equal(price.value,'2');assert.equal(batch.value,'8');assert.match(zone.querySelector('[data-status]').textContent,/Ergebnis: 4 €/);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/6\. Schulstufe/);
  }
  if(id==='geo_2_ressourcen_energie'){
   const zone=d.querySelector('[data-geo-experiment="recycling"]'),rate=zone.querySelector('[data-recovery]');
   const expectedRows={50:[[50,50],[25,75],[12.5,87.5]],80:[[80,20],[64,36],[51.2,48.8]],100:[[100,0],[100,0],[100,0]]};
   for(const value of [50,80,100]){rate.value=String(value);rate.dispatchEvent(new w.Event('change'));const rows=[...zone.querySelectorAll('tbody tr')].map(row=>[...row.querySelectorAll('td')].map(cell=>Number(cell.textContent.replace(',','.'))));assert.deepEqual(rows,expectedRows[value]);for(const row of rows)assert.equal(row[0]+row[1],100);assert.match(zone.querySelector('[data-status]').textContent,/Materie verschwindet/);if(value===100)assert.match(zone.querySelector('[data-status]').textContent,/idealer Vergleichsfall/);}
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.equal(rate.value,'80');assert.match(zone.querySelector('[data-status]').textContent,/51,2 von 100/);assert.equal(zone.querySelectorAll('tbody tr').length,3);
  }
  if(id==='geo_2_sparen_risiko'){
   const zone=d.querySelector('[data-geo-experiment="purchasing"]'),money=zone.querySelector('[data-money]'),price=zone.querySelector('[data-unit-price]');
   const expectedCounts=[[10,8,6],[10,8,7],[12,10,8]],expectedRests=[[0,0,200],[100,100,0],[100,0,100]];
   for(const [i,cents]of [2000,2100,2500].entries())for(const [j,unit]of [200,250,300].entries()){
    money.value=String(cents);price.value=String(unit);price.dispatchEvent(new w.Event('change'));const status=zone.querySelector('[data-status]').textContent;
    assert.ok(status.includes('Kaufbar: '+expectedCounts[i][j]+' ganze Hefte.'),status);assert.ok(status.includes('Rest: '+(expectedRests[i][j]/100).toFixed(2).replace('.',',')+' €.'));assert.equal(expectedCounts[i][j]*unit+expectedRests[i][j],cents);assert.match(status,/nicht die allgemeine Inflation/);
   }
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.equal(money.value,'2100');assert.equal(price.value,'250');assert.match(zone.querySelector('[data-status]').textContent,/Kaufbar: 8 ganze Hefte\. Rest: 1,00 €/);
  }
  if(id==='geo_3_bevoelkerung'){
   const zone=d.querySelector('[data-geo-experiment="population"]'),fields=['births','deaths','arrivals','departures'].map(key=>zone.querySelector('[data-'+key+']'));
   const expected=[990,970,1020,1000,980,960,1010,990,1000,980,1030,1010,990,970,1020,1000];let index=0;
   for(const births of [10,20])for(const deaths of [10,20])for(const arrivals of [0,30])for(const departures of [10,30]){
    fields.forEach((e,i)=>e.value=String([births,deaths,arrivals,departures][i]));fields[0].dispatchEvent(new w.Event('change'));const text=zone.querySelector('[data-status]').textContent;
    assert.ok(text.includes('Neuer Bevölkerungsstand: '+expected[index]+' Personen.'),text);if(expected[index]===1000)assert.match(text,/nicht, dass niemand/);index++;
   }
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.deepEqual(fields.map(e=>e.value),['10','20','30','10']);assert.match(zone.querySelector('[data-status]').textContent,/Geburtenbilanz: −?\-10\. Wanderungsbilanz: \+20\. Veränderung: \+10\. Neuer Bevölkerungsstand: 1010/);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/7\. Schulstufe/);
  }
  if(id==='geo_3_zentren_lebensqualitaet'){
   const zone=d.querySelector('[data-geo-experiment="access"]'),route=zone.querySelector('[data-access-route]'),time=zone.querySelector('[data-access-time]');
   for(const [r,t,total]of [['bus','morning',22],['bus','evening',42],['rail','morning',32],['rail','evening',32]]){route.value=r;time.value=t;time.dispatchEvent(new w.Event('change'));assert.match(zone.querySelector('[data-status]').textContent,new RegExp('Gesamter Weg: '+total+' min'));assert.match(zone.querySelector('[data-status]').textContent,/Rückfahrt sind noch nicht bewertet/);}
   w.initGeoExperiments();zone.querySelector('[data-reset]').click();assert.equal(route.value,'bus');assert.equal(time.value,'morning');assert.match(zone.querySelector('[data-status]').textContent,/Gesamter Weg: 22 min/);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/7\. Schulstufe/);
  }
  if(id==='geo_3_wirtschaftsstandort'){
   const table=d.querySelectorAll('table')[1],rows=[...table.querySelectorAll('tbody tr')];
   const parse=text=>Number(text.replace(/[^0-9]/g,''));
   const values=rows.map(row=>[...row.querySelectorAll('td')].map(cell=>parse(cell.textContent)));assert.deepEqual(values,[[100,10,1000],[100,12,1200]]);for(const [amount,price,total]of values)assert.equal(amount*price,total);
   const draft=workshop.querySelector('textarea');draft.value='A nutzt eine bestehende Halle. Umbaukosten sind noch offen.';draft.dispatchEvent(new w.Event('input'));assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value);
   const select=workshop.querySelector('select');select.value='Öffentliche Hand';[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/2 von 3/);assert.match(d.getElementById('workshop-0-feedback').textContent,/betriebliche Entscheidungen/);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/7\. Schulstufe/);
  }
  if(id==='geo_3_bildung_arbeit_rechte'){
   const amounts=[...d.querySelectorAll('table')[1].querySelectorAll('tbody td')].map(cell=>Number(cell.textContent.replace(/[^0-9]/g,'')));assert.deepEqual(amounts,[1000,150,850]);assert.equal(amounts[0]-amounts[1],amounts[2]);
   const finance=[...d.querySelectorAll('table')[2].querySelectorAll('tbody tr')];assert.equal(finance.length,2);const totals=finance.map(row=>Number(row.lastElementChild.textContent.replace(/[^0-9]/g,'')));assert.deepEqual(totals,[12*22+12,6*44]);
   w.eval(read('js/chapter-revisions.js'));assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100,contentRevision:0}).passed,false,'Old shorter assessment is not current mastery');
   const select=workshop.querySelector('select');select.value='Freiwilligen Umtausch prüfen';[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/2 von 3/);assert.match(d.getElementById('workshop-0-feedback').textContent,/gesetzlicher Mängelhaftung/);
   const draft=workshop.querySelector('textarea');draft.value='Das fiktive Gerät zeigt beim ersten Einschalten einen Fehler.';draft.dispatchEvent(new w.Event('input'));assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/7\. Schulstufe/);
  }
  if(id==='geo_3_europa'){
   assert.equal(d.querySelectorAll('table tbody tr').length,4,'Four institutional roles are rendered');
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/8\. Schulstufe/);
   assert.ok(w.currentChapterQuiz.questions.some(q=>q.id===id+'_integration_7'),'Latest transfer question included');
   w.eval(read('js/chapter-revisions.js'));assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100,contentRevision:0}).passed,false);
  }
  if(id==='geo_4_bevoelkerung_staedte'){
   const rows=[...d.querySelectorAll('table tbody tr')];assert.equal(rows.length,2);assert.match(rows[0].textContent,/1,2 Millionen.*0,2 Millionen = 20 %/);assert.match(rows[1].textContent,/10,5 Millionen.*0,5 Millionen = 5 %/);
   const select=workshop.querySelector('select');select.value='Wirtschaftliches Angebot';[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/2 von 3/);assert.match(d.getElementById('workshop-0-feedback').textContent,/öffentliche Stelle/);
   const draft=workshop.querySelector('textarea');draft.value='Die Finanzierung muss Wartung und bezahlbaren Zugang berücksichtigen.';draft.dispatchEvent(new w.Event('input'));assert.equal(w.localStorage.getItem('sciverse_draft_'+id),draft.value);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/8\. Schulstufe/);
  }
  if(id==='geo_1_lebenssituationen'){
   const rows=[...d.querySelectorAll('table tbody tr')];assert.equal(rows.length,4);const times=rows.map(row=>Number(row.querySelectorAll('td')[1].textContent.match(/\d+/)[0]));assert.deepEqual(times,[20,15,45,30]);assert.equal((times[2]-times[1])*2*5,300);
   const select=workshop.querySelectorAll('select')[2];select.value='Angabe im Fallbeispiel';[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/2 von 3/);assert.match(d.getElementById('workshop-2-feedback').textContent,/nicht alle Kinder/);
   assert.match(w.SCIVERSE_CURRICULUM.geographie.topics.find(t=>t.id===id).grade,/5\. Schulstufe/);
  }
  if(id==='geo_1_karten_raeume'){
   const zone=d.querySelector('[data-geo-experiment]'),status=()=>zone.querySelector('[data-status]').textContent;
   const move=dir=>zone.querySelector('[data-direction="'+dir+'"]').click(),reset=()=>zone.querySelector('[data-reset]').click();
   assert.equal(zone.querySelectorAll('[data-grid] span').length,25);move('w');assert.match(status(),/endet.*A5.*0 Schritte/);
   move('n');move('n');move('e');move('e');assert.match(status(),/C3 ist gesperrt.*B3.*3 Schritte/);
   assert.match(zone.querySelector('[data-grid]').getAttribute('aria-label'),/Standort B3/);
   reset();w.initGeoExperiments();for(let i=0;i<4;i++)move('n');for(let i=0;i<4;i++)move('e');
   assert.match(status(),/E1.*8 Schritte = 800 Meter.*Ziel erreicht/);reset();assert.match(status(),/A5.*0 Schritte/);
  }
  if(id==='geo_2_wirtschaften'){
   const zone=d.querySelector('[data-geo-experiment]'),inputs=[...zone.querySelectorAll('input')],status=()=>zone.querySelector('[data-status]').textContent;
   // Every combination verifies arithmetic and all three feedback branches.
   for(let mask=0;mask<16;mask++){
    let sum=0;inputs.forEach((el,i)=>{el.checked=Boolean(mask&(1<<i));if(el.checked)sum+=Number(el.value);});
    inputs[0].dispatchEvent(new w.Event('change',{bubbles:true}));
    assert.ok(status().includes('Ausgaben: '+sum+' €. Rest: '+(20-sum)+' €.'));
    assert.match(status(),sum>20?/überschreitet/:sum>15?/erreicht aber/:/mindestens 5/);
   }
  }
  dom.window.close();
 }
 console.log('PASS: fifteen geography chapters, 138 questions, 45 classifications; wage calculation and consumer-rights feedback; economic value table and stakeholder feedback; four accessibility cases, 16 population scenarios, nine purchasing-power cases, three recycling trajectories, nine production/price combinations, 12 flood scenarios and resets; agriculture calculations and draft persistence; route and all 16 budget combinations.');
})().catch(error=>{console.error(error);process.exitCode=1;});
