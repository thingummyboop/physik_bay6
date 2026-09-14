const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_trennverfahren',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/anschließend durch Abkühlen kondensiert/);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="separation-planner"]'),scenario=lab.querySelector('[data-separation-case]'),plan=lab.querySelector('[data-separation-plan]'),reason=lab.querySelector('[data-separation-reason]'),check=lab.querySelector('[data-separation-check]'),result=lab.querySelector('[data-separation-result]');
 const choose=(el,value)=>{el.focus();el.value=value;el.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,el);assert.equal(result.hidden,true);};
 const before=JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])));
 check.click();assert.equal(d.activeElement,plan);assert.match(lab.querySelector('.chem-status').textContent,/unvollständig/);
 choose(plan,'filter');check.click();assert.equal(d.activeElement,reason);
 const accepted={sandSalt:['waterFilterEvap','waterFilterDistill'],sandSaltWater:['waterFilterDistill'],ironSand:['magnet'],ink:['chromato']};
 const principles={waterFilterEvap:'combined',waterFilterDistill:'combined',filter:'size',evap:'volatile',distill:'volatile',magnet:'magnetic',chromato:'distribution'};
 const outcomes={sandSalt:{waterFilterEvap:/Filterrückstand ist zunächst feucht/,waterFilterDistill:/zusätzlicher Aufwand/,filter:/trocken/,evap:/kein Wasser/,distill:/kein Wasser/,magnet:/nicht magnetisch/,chromato:/Wasserlöslichkeit/},sandSaltWater:{waterFilterEvap:/Wasser-Ziel nicht/,waterFilterDistill:/kondensiertes Wasser/,filter:/trocken/,evap:/kein Wasser/,distill:/kein Wasser/,magnet:/nicht magnetisch/,chromato:/Wasserlöslichkeit/},ironSand:{waterFilterEvap:/beide Feststoffarten/,waterFilterDistill:/Eisen ist magnetisch/,filter:/Korngrößentrennung/,evap:/keine Flüssigkeit/,distill:/keine Flüssigkeit/,magnet:/keine Regel für alle Metalle/,chromato:/Magnetismus/},ink:{waterFilterEvap:/Farbstoffgemisch/,waterFilterDistill:/nicht in unterscheidbare Zonen/,filter:/unterschiedliche Verfahren/,evap:/gemeinsam/,distill:/nicht, ob sich die Farbstoffe/,magnet:/nicht magnetisch/,chromato:/keine Reinheit beweisen/}};
 let states=0;
 for(const c of Object.keys(accepted))for(const p of Object.keys(principles))for(const r of ['combined','size','volatile','magnetic','distribution']){
  choose(scenario,c);choose(plan,p);choose(reason,r);check.click();assert.equal(result.hidden,false);
  assert.equal(lab.dataset.planMatches,String(accepted[c].includes(p)));assert.equal(lab.dataset.reasonMatches,String(principles[p]===r));
  assert.match(lab.querySelector('[data-separation-goal-feedback]').textContent,outcomes[c][p]);
  assert.equal(lab.querySelectorAll('[data-separation-flow] li').length,['waterFilterEvap','waterFilterDistill','chromato'].includes(p)?3:1);
  assert.ok(lab.querySelector('[data-separation-reason-feedback]').textContent.includes(principles[p]===r?'passend':'überarbeiten'));
  w.ChemieLabs.topicInit();assert.equal(plan.value,p);assert.equal(result.hidden,false);states++;
 }
 lab.querySelector('[data-separation-reset]').click();assert.equal(scenario.value,'ink');assert.equal(plan.value,'');assert.equal(reason.value,'');assert.equal(d.activeElement,plan);assert.equal(result.hidden,true);assert.equal(lab.querySelector('[data-separation-flow]').children.length,0);
 assert.equal(JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))),before);
 assert.equal(d.querySelectorAll('[data-separation-observation] tbody tr').length,4);
 const questions=w.currentChapterQuiz.questions;let paths=0;
 for(const [i,q]of questions.entries())for(let answer=0;answer<q.answers.length;answer++){
  questions.forEach((item,j)=>{d.querySelector('input[name="chapter_q_'+j+'"][value="'+(j===i?answer:item.answers.findIndex(a=>a.correct))+'"]').checked=true;});
  w.submitChapterQuiz();const saved=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).chemie_trennverfahren;
  assert.equal(saved.lastPercent,q.answers[answer].correct?100:89);assert.equal(saved.contentRevision,2);if(!q.answers[answer].correct)assert.deepEqual(saved.reviewQuestionIds,[q.id]);assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[answer].feedback));paths++;
 }
 assert.equal(paths,27);assert.equal(questions.find(q=>q.id==='ch_chemie_trennverfahren_q3').sectionIndex,1);for(const id of ['separation_goal','separation_purity'])assert.equal(questions.find(q=>q.id===id).sectionIndex,3);
 assert.equal(w.currentChapterResult('chemie_trennverfahren',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 // The old selector still supports unchanged translated structures.
 const legacy=d.createElement('div');legacy.className='chem-lab';legacy.dataset.chemLab='separation';legacy.innerHTML='<select><option value="sandSalt">Sand/Salz</option><option value="ink">Farbe</option><option value="ironSand">Eisen/Sand</option></select><p class="chem-status"></p>';d.body.append(legacy);w.ChemieLabs.topicInit();
 for(const [value,expected]of [['sandSalt',/gelöstes Salz passiert/],['ink',/nicht für jede Filzstiftfarbe/],['ironSand',/Nicht jedes Metall/]]){const s=legacy.querySelector('select');s.value=value;s.dispatchEvent(new w.Event('change'));assert.match(legacy.querySelector('.chem-status').textContent,expected);assert.equal(legacy.querySelectorAll('svg').length,1);}
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=chemie_trennverfahren',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pd.getElementById('ws-chemistry-material'),solutions=pd.getElementById('ws-solutions');assert.equal(material.querySelectorAll('[data-separation-cases] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-separation-protocol] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-separation-observation] tbody tr').length,4);assert.equal(material.querySelectorAll('select,button,template,[role=status]').length,0);assert.equal(material.querySelectorAll('[data-separation-tasks]').length,1);assert.equal(solutions.hidden,true);assert.match(solutions.textContent,/A: Lösen → filtrieren → eindampfen/);assert.doesNotMatch(material.textContent,/A: Lösen → filtrieren → eindampfen/);assert.equal(pd.querySelectorAll('#ws-content > .question-block').length,9);paper.window.close();
 console.log(`PASS: ${states} planner choices, all 28 case/plan outcomes, multiple valid plans, property feedback, incomplete/edit/reset/focus/idempotence, no storage writes, all ${paths} quiz paths and revision 2, preserved legacy selector, paper protocol and separate solution.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
