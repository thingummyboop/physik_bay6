const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='bio_1_lebensraeume';
const correct=q=>({bio_lebensraum_s1:1,bio_lebensraum_s2:2,bio_lebensraum_s4:1,bio_lebensraum_s5:2,bio_lebensraum_d2:1,bio_lebensraum_d3:2,bio_lebensraum_d5:2,bio_lebensraum_d6:1}[q]||0);
const expected={none:['grass-hopper','grass-mouse','hopper-frog','hopper-stork','frog-stork','mouse-stork'],grass:['hopper-frog','hopper-stork','frog-stork','mouse-stork'],hopper:['grass-mouse','frog-stork','mouse-stork'],mouse:['grass-hopper','hopper-frog','hopper-stork','frog-stork'],frog:['grass-hopper','grass-mouse','hopper-stork','mouse-stork'],stork:['grass-hopper','grass-mouse','hopper-frog']};
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 const authored=new JSDOM(data[id].sections.map(s=>s.content).join('')),texts=d=>[...d.querySelectorAll('.bio-training-card')].map(e=>e.textContent);assert.equal(texts(d).length,15);assert.deepEqual(texts(d),texts(authored.window.document));assert.equal(d.querySelectorAll('.bio-training-direct-text').length,0);authored.window.close();
 const zone=d.querySelector('[data-core-experiment="food-web"]'),select=zone.querySelector('select'),svg=zone.querySelector('svg'),out=zone.querySelector('[data-foodweb-result]'),stored=w.localStorage.getItem('sciverse_chapter_quiz_results');assert.ok(select.closest('label'));assert.equal(d.getElementById(select.getAttribute('aria-describedby')),out);
 for(const state of ['none','grass','hopper','mouse','frog','stork','hopper','none']){
  select.value=state;select.dispatchEvent(new w.Event('change'));
  assert.deepEqual([...svg.querySelectorAll('[data-foodweb-from]')].filter(e=>e.getAttribute('display')!=='none').map(e=>e.dataset.foodwebFrom+'-'+e.dataset.foodwebTo),expected[state]);
  assert.equal(svg.querySelectorAll('[stroke-dasharray="6 4"]').length,state==='none'?0:1);assert.equal([...svg.querySelectorAll('[data-foodweb-node-status]')].filter(e=>e.textContent==='fehlt').length,state==='none'?0:1);
  if(state!=='none'){assert.ok(out.textContent.includes((6-expected[state].length)+' direkte Nahrungspfeile'));assert.match(out.textContent,/keine berechneten Bestände/);}
 }
 select.value='hopper';select.dispatchEvent(new w.Event('change'));assert.match(out.textContent,/Weißstorch verliert diese Nahrungsquelle. Weiterhin dargestellt: Grasfrosch, Feldmaus/);assert.match(out.textContent,/Grasfrosch verliert diese Nahrungsquelle. Weiterhin dargestellt: keine weitere Nahrungsquelle in diesem Ausschnitt/);
 w.enhanceCoreLearning(data[id],id,'de');assert.equal(select.value,'hopper');zone.querySelector('button').click();assert.equal(select.value,'none');assert.equal(d.activeElement,select);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),stored);
 assert.equal(d.querySelectorAll('[data-foodweb-tasks] li').length,4);assert.equal(d.querySelectorAll('[data-habitat-protocol] tbody tr').length,8);assert.equal(d.querySelectorAll('[data-habitat-decision] ol li').length,3);
 assert.deepEqual([...d.querySelectorAll('[data-habitat-sample] tbody tr')].slice(0,3).map(r=>[...r.cells].slice(1).map(c=>Number(c.textContent))),[[18,2],[0,3],[0,1]]);
 const questions=w.currentChapterQuiz.questions,sections={bio_lebensraum_d1:0,bio_lebensraum_d2:1,bio_lebensraum_d3:1,bio_lebensraum_d4:2,bio_lebensraum_d5:3,bio_lebensraum_d6:4};assert.equal(questions.length,11);assert.equal(data[id].diplom.questions.length,0);let paths=0;
 for(const [i,q]of questions.entries()){
  assert.equal(q.sectionIndex,q.id in sections?sections[q.id]:Number(q.id.at(-1))-1);
  for(let choice=0;choice<3;choice++){
   questions.forEach((item,j)=>d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?choice:correct(item.id))+'"]').checked=true);w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];assert.equal(result.lastPercent,choice===correct(q.id)?100:91);assert.deepEqual(result.reviewQuestionIds,choice===correct(q.id)?[]:[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));paths++;
  }
 }
 assert.equal(paths,33);assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);assert.equal(w.currentChapterResult(id,{contentRevision:2,passed:true,bestPercent:100}).passed,true);dom.window.close();
 console.log('PASS: habitat chapter, 33 independently keyed assessed paths and section review, revision 2, 15 authored tasks, six food-web states and edge sets, limits/reset/re-init/storage, protocol and fictional group data.');
})().catch(e=>{console.error(e);process.exitCode=1;});
