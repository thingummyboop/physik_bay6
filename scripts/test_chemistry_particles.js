const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_teilchenmodell',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/zusätzlich können Strömungen auftreten/);
 const rows=[...d.querySelectorAll('[data-heating-series] tbody tr')];assert.deepEqual(rows.map(r=>Number(r.dataset.time)),[0,2,4,6,8]);assert.deepEqual(rows.map(r=>Number(r.dataset.temperature)),[-10,0,0,0,10]);assert.equal(Number(rows[3].dataset.time)-Number(rows[1].dataset.time),4);assert.equal(d.querySelectorAll('[data-heating-task] li').length,5);
 for(const [index,q]of w.currentChapterQuiz.questions.entries()){if(!q.id.startsWith('chem_heat_'))continue;assert.equal(q.sectionIndex,3);for(let choice=0;choice<q.answers.length;choice++){w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).chemie_teilchenmodell.lastPercent,q.answers[choice].correct?100:89);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 assert.equal(w.currentChapterResult('chemie_teilchenmodell',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 const frames=[];let particles=0;
 const ctx=new Proxy({arc(x,y,r){if(r===8.5)particles++;}},{get(target,key){return key in target?target[key]:()=>{};}});
 w.HTMLCanvasElement.prototype.getContext=()=>ctx;w.requestAnimationFrame=fn=>(frames.push(fn),frames.length);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const range=d.querySelector('[data-chem-lab="particles"] input[type="range"]');assert.ok(range);
 for(const value of [20,50,90,20,90]){
  range.value=value;range.dispatchEvent(new w.Event('input'));assert.equal(frames.length,1,'State changes must not stack animation loops');
  particles=0;frames.shift()(1000);assert.equal(particles,22,'Same number of particles in every state');
  assert.equal(frames.length,1);assert.match(range.getAttribute('aria-valuetext'),/Relative Modellstufe/);
 }
 assert.equal(w.currentChapterResult('chemie_teilchenmodell',{passed:true,bestPercent:100}).passed,false);
 dom.window.close();console.log('PASS: 9 chemistry questions, heating-series arithmetic and six new answer paths, diffusion caveat, 22 particles conserved through five phase selections, one animation loop, model labels and old-result revision.');
})().catch(error=>{console.error(error);process.exitCode=1;});
