const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const data=require('../lang/de.json'),keys=require('./fixtures/electricity_answer_keys.json'),read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const masks={heater:1,bulb:3,led:2,coil:4,coating:8,sun:16};
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=elektrizitaet',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const s of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+s+'.js'));await w.renderTopic();w.eval(read('js/topics/elektrizitaet.js'));w.topicInit();
 const lab=d.querySelector('[data-electric-effects]'),choice=lab.querySelector('select'),inputs=[...lab.querySelectorAll('[data-effect-choice]')],feedback=lab.querySelector('[data-effect-feedback]'),check=lab.querySelector('[data-effect-check]'),before=JSON.stringify(w.localStorage);
 assert.deepEqual(inputs.map(i=>i.value),['heat','light','magnet','chemical','unsupported']);assert.equal(feedback.getAttribute('aria-live'),'polite');assert.equal(feedback.getAttribute('aria-atomic'),'true');let decisions=0,paths=0;
 for(const [id,key]of Object.entries(masks)){
  choice.value=id;choice.focus();choice.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,choice);assert.equal(feedback.textContent,'');assert.ok(inputs.every(i=>!i.checked));
  const shown=[...lab.querySelectorAll('[data-effect-card]')].filter(c=>!c.hidden);assert.equal(shown.length,1);assert.equal(shown[0].dataset.effectCard,id);
  for(let mask=0;mask<32;mask++){
   inputs.forEach((input,i)=>{input.checked=!!(mask&(1<<i));});check.focus();check.click();assert.equal(feedback.dataset.correct,String(mask===key),id+'/'+mask);
   assert.equal(d.activeElement,mask?check:inputs[0]);assert.ok(feedback.textContent.length>70);if(mask)assert.ok(feedback.textContent.includes(shown[0].querySelector('[data-effect-explanation]').textContent));decisions++;
  }
  inputs[0].dispatchEvent(new w.Event('change'));assert.equal(feedback.textContent,'');
 }
 w.topicInit();assert.equal(choice.value,'sun');assert.ok(inputs.every(i=>i.checked));lab.querySelector('[data-effect-reset]').click();assert.equal(choice.value,'heater');assert.equal(d.activeElement,choice);assert.ok(inputs.every(i=>!i.checked));choice.value='invalid';choice.dispatchEvent(new w.Event('change'));assert.equal(choice.value,'heater');assert.equal(JSON.stringify(w.localStorage),before);
 const paper=lab.querySelector(':scope > template[data-worksheet-alternative]').content;assert.equal(paper.querySelectorAll('.electric-effect-paper-case').length,6);assert.equal(d.querySelectorAll('[data-electric-effects-steps] li').length,4);assert.equal(d.querySelectorAll('[data-electric-effects-record] tbody tr').length,2);
 const questions=w.currentChapterQuiz.questions;assert.equal(questions.length,28);assert.deepEqual(Array.from(questions,q=>q.id).sort(),Object.keys(keys).sort());assert.equal(questions.find(q=>q.id==='elektrizitaet_s4_q0').sectionIndex,8);assert.equal(questions.find(q=>q.id==='electric_geraet_1').sectionIndex,6);assert.equal(questions.find(q=>q.id==='electric_effects_cause').sectionIndex,7);
 assert.equal(w.currentChapterResult('elektrizitaet',{contentRevision:5,passed:true,bestPercent:100}).passed,false);
 for(const [index,q]of questions.entries()){
  assert.equal(q.answers.length,3);assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id]);
  for(let a=0;a<3;a++){
   if(paths)w.restartChapterQuiz();questions.forEach((other,j)=>{d.querySelector(`input[name="chapter_q_${j}"][value="${j===index?a:keys[other.id]}"]`).checked=true;});w.submitChapterQuiz();
   const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).elektrizitaet;assert.equal(r.lastPercent,a===keys[q.id]?100:96);assert.equal(r.contentRevision,6);assert.deepEqual(r.reviewQuestionIds,a===keys[q.id]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[a].feedback));paths++;
  }
 }
 dom.window.close();console.log(`PASS: ${decisions} effects decisions across all 6 × 32 selections, ${paths} independently keyed chapter answer paths, final extension order, feedback/focus/reset/storage and paper tasks.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
