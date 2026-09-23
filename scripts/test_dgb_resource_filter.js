const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),keys=require('./fixtures/dgb6_information_keys.json');
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=dgb6_information',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.enhanceCoreLearning(data.dgb6_information,'dgb6_information','de');
 const zone=d.querySelector('[data-core-experiment="resource-filter"]'),get=name=>zone.querySelector('[data-filter-'+name+']'),source=d.querySelector('[data-resource-records]'),original=source.innerHTML,records=[...source.querySelectorAll('tbody tr')].map(row=>[...row.children].map(c=>c.textContent));
 const shown=()=>[...get('rows').querySelectorAll('tr')].map(row=>[...row.children].map(c=>c.textContent));assert.deepEqual(shown(),records);get('active').checked=true;
 let cases=0;for(const subject of ['Physik','Biologie','Mathematik','Chemie','DGB'])for(let limit=5;limit<=15;limit++)for(const logic of ['and','or']){
  get('subject').value=subject;get('duration').value=limit;get('logic').value=logic;get('logic').focus();get('logic').dispatchEvent(new w.Event('change'));
  const bySubject=new Set(records.filter(r=>r[2]===subject).map(r=>r[0])),byDuration=new Set(records.filter(r=>Number(r[3])<=limit).map(r=>r[0]));
  const ids=logic==='and'?[...bySubject].filter(id=>byDuration.has(id)):[...new Set([...bySubject,...byDuration])];
  assert.deepEqual(shown(),records.filter(r=>ids.includes(r[0])));assert.match(get('result').textContent,new RegExp('^'+ids.length+' von 8'));if(!ids.length)assert.match(get('result').textContent,/Keine passenden/);assert.equal(d.activeElement,get('logic'));
  for(const [order,allIds]of [['ascending',['L1','L7','L3','L4','L8','L2','L5','L6']],['descending',['L6','L5','L2','L8','L3','L4','L7','L1']],['original',records.map(r=>r[0])]]){
   get('sort').value=order;get('sort').focus();get('sort').dispatchEvent(new w.Event('change'));
   assert.deepEqual(shown(),allIds.filter(id=>ids.includes(id)).map(id=>records.find(r=>r[0]===id)));assert.equal(d.activeElement,get('sort'));cases++;
  }
 }
 assert.equal(cases,330);assert.equal(source.innerHTML,original);assert.equal(get('result').getAttribute('aria-live'),'polite');for(const name of ['active','subject','logic','duration','sort']){assert.ok(get(name).closest('label'));assert.equal(d.getElementById(get(name).getAttribute('aria-describedby')),get('result'));}
 get('active').click();assert.deepEqual(shown(),records);w.enhanceCoreLearning(data.dgb6_information,'dgb6_information','de');assert.equal(get('active').checked,false);
 const qs=w.currentChapterQuiz.questions;assert.deepEqual(Array.from(qs,q=>q.id),Object.keys(keys));assert.deepEqual(Array.from(qs,q=>q.sectionIndex),[0,0,1,1,1,2,2,2,3,3,3,3]);for(let index=0;index<qs.length;index++)for(let answer=0;answer<3;answer++){assert.equal(qs[index].answers.findIndex(a=>a.correct),keys[qs[index].id]);qs.forEach((q,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?answer:keys[q.id])+'"]').checked=true);w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).dgb6_information;assert.equal(result.lastPercent,answer===keys[qs[index].id]?100:92);assert.equal(result.contentRevision,4);assert.deepEqual(result.reviewQuestionIds,answer===keys[qs[index].id]?[]:[qs[index].id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(qs[index].answers[answer].feedback));}
 const before=w.localStorage.getItem('sciverse_chapter_quiz_results');get('active').click();assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),before);assert.equal(w.currentChapterResult('dgb6_information',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 dom.window.close();console.log('PASS: 330 filter/sort cases, full source preservation, filter removal, focus/labels, repeated init, unchanged quiz storage and all 36 independently keyed assessment paths with revised section mapping.');
})().catch(e=>{console.error(e);process.exitCode=1;});
