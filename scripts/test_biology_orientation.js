const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
const keys={bio_2_uebersicht_s1:1,bio2_orientation_levels:2,bio_2_uebersicht_s2:0,bio2_orientation_sampling:2,bio_2_uebersicht_s3:1,bio2_orientation_compare:0,bio_2_uebersicht_s4:2,bio2_orientation_transfer:1};
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/site/topics/template.html?topic=bio_2_uebersicht&mode=review&plan=bio_2_uebersicht,bio_2_zellen,bio_2_pflanzenorgane_fotosynthese',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 assert.equal(w.chapterRevision('bio_2_uebersicht'),1);assert.equal(w.currentChapterResult('bio_2_uebersicht',{contentRevision:0,lastPercent:100}).outdated,true);
 assert.equal(w.currentChapterQuiz.questions.length,8);assert.equal(d.querySelectorAll('.bio-direct-training li').length,12);assert.equal(d.querySelectorAll('.bio-training-panel').length,0);
 const order=w.SCIVERSE_CURRICULUM.biologie.topics.map(t=>t.id);assert.ok(order.indexOf('bio_2_zellen')<order.indexOf('bio_2_pflanzenorgane_fotosynthese'));assert.ok(data.bio_2_pflanzenorgane_fotosynthese.prerequisites.includes('bio_2_zellen'));
 const routes=[...d.querySelectorAll('[data-orientation-route] a')];assert.equal(routes.length,9);
 for(const link of routes){assert.ok(data[link.dataset.learningChapter]);const q=new URL(new URL(link.href).hash.slice(1),'https://example.test/site/').searchParams;assert.equal(q.get('mode'),'review');assert.equal(q.get('plan'),'bio_2_uebersicht,bio_2_zellen,bio_2_pflanzenorgane_fotosynthese');assert.equal(q.get('topic'),link.dataset.learningChapter);}
 const control=d.querySelector('[data-boundary-control]'),cases=[...d.querySelectorAll('[data-boundary-case]')],out=d.querySelector('[data-boundary-result]');const before=JSON.stringify(w.localStorage);
 for(let i=0;i<3;i++){control.value=String(i);control.dispatchEvent(new w.Event('change'));assert.equal(cases.filter(c=>!c.hidden).length,1);assert.equal(cases[i].hidden,false);for(let j=0;j<3;j++){cases[i].querySelectorAll('button')[j].click();assert.equal(out.textContent.startsWith('Passender nächster Schritt:'),j===[1,2,0][i]);assert.ok(out.textContent.length>80);}}
 d.querySelector('[data-boundary-reset]').click();assert.equal(control.value,'0');assert.equal(d.activeElement,control);assert.equal(out.textContent,'Wähle eine Handlung.');assert.equal(JSON.stringify(w.localStorage),before);
 w.enhanceCoreLearning(data.bio_2_uebersicht,'bio_2_uebersicht','de');assert.equal(d.querySelectorAll('[data-core-navigation]').length,1);
 const qs=w.currentChapterQuiz.questions;for(const [index,q]of qs.entries()){
  assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id]);assert.equal(q.sectionIndex,Math.floor(index/2));
  for(let choice=0;choice<3;choice++){w.restartChapterQuiz();qs.forEach((item,n)=>d.querySelector(`input[name="chapter_q_${n}"][value="${n===index?choice:keys[item.id]}"]`).checked=true);w.submitChapterQuiz();const r=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).bio_2_uebersicht;assert.equal(r.lastPercent,choice===keys[q.id]?100:88);assert.deepEqual(r.reviewQuestionIds,choice===keys[q.id]?[]:[q.id]);assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}
 }
 const paper=d.querySelector('template[data-worksheet-alternative]').content;assert.equal(paper.querySelectorAll('.orientation-paper-case').length,3);assert.equal(paper.querySelectorAll('.orientation-paper-case li').length,9);assert.equal(d.querySelectorAll('[data-worksheet-solution] p').length,3);
 dom.window.close();console.log('PASS: nine investigation decisions, reset/focus/storage, 24 independent answer paths, four review sections, 12 specific tasks, nine context-preserving chapter links, cells before photosynthesis and three paper cases.');
})().catch(e=>{console.error(e);process.exitCode=1;});
