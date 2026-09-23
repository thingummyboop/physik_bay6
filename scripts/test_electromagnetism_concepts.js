const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=elektromagnetismus',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,29);
 assert.equal(w.currentChapterResult('elektromagnetismus',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 assert.match(d.body.textContent,/Spannung, auch ohne geschlossenen Laststromkreis/);
 const diploma=[...data.elektromagnetismus.sections.flatMap(s=>s.quizzes||[]),...data.elektromagnetismus.diplom.questions];
 assert.match(diploma.find(q=>q.id==='em_d7').answers.find(a=>a.correct).feedback,/Motor/);
 assert.match(diploma.find(q=>q.id==='em_d8').answers.find(a=>a.correct).feedback,/Fluss/);
 w.eval(read('js/topics/elektromagnetismus.js'));w.topicInit();
 const zone=d.querySelector('[data-magnet-poles]'),get=name=>zone.querySelector('[data-magnet-'+name+']');
 assert.equal(get('status').getAttribute('aria-live'),'polite');assert.equal(get('status').getAttribute('aria-atomic'),'true');
 const click=name=>{get(name).focus();get(name).click();assert.equal(d.activeElement,get(name));};
 const verify=(a,b)=>{
  assert.equal(get('a').getAttribute('aria-pressed'),String(a));assert.equal(get('b').getAttribute('aria-pressed'),String(b));
  assert.equal(get('a-left-label').textContent,a?'N':'S');assert.equal(get('a-right-label').textContent,a?'S':'N');assert.equal(get('b-left-label').textContent,b?'N':'S');assert.equal(get('b-right-label').textContent,b?'S':'N');
  assert.equal(get('a-arrow').textContent,a===b?'→':'←');assert.equal(get('b-arrow').textContent,a===b?'←':'→');
  assert.match(get('status').textContent,a===b?/ziehen einander an/:/stoßen einander ab/);assert.equal(get('diagram').getAttribute('aria-label'),get('status').textContent);
 };
 for(let i=0;i<2;i++){verify(false,false);click('b');verify(false,true);click('a');verify(true,true);click('b');verify(true,false);click('a');verify(false,false);}
 click('a');w.initMagnetPoles();verify(true,false);click('reset');verify(false,false);assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),null);
 assert.equal(w.currentChapterResult('elektromagnetismus',{contentRevision:2,passed:true,bestPercent:100}).passed,false);
 const questions=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('magnet_basis_'));assert.equal(questions.length,3);
 for(const q of questions){assert.equal(q.sectionIndex,0);const index=w.currentChapterQuiz.questions.indexOf(q);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:question.answers.findIndex(a=>a.correct))+'"]').checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).elektromagnetismus;
   assert.equal(result.lastPercent,Math.round(100*(30-(q.answers[choice].correct?0:1))/30));assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }

 const force=d.getElementById('forceArrow'),symbol=d.getElementById('currentDirectionSymbol'),direction=d.getElementById('directionText');
 assert.equal(d.getElementById('motorForceDiagram').getAttribute('aria-describedby'),'directionText');
 assert.ok(force.getAttribute('marker-end'));
 for(let step=0;step<10;step++){
  const out=step%2===0;
  assert.equal(symbol.getAttribute('d'),out?'M200 90 h0':'M194 84 L206 96 M194 96 L206 84');
  const coordinates=force.getAttribute('d').match(/-?\d+/g).map(Number);
  // I along +/-z, B along +x: cross product has Fy = Iz * Bx.
  const physicalForceY=(out?1:-1)*1;
  assert.equal(Math.sign(coordinates[3]-coordinates[1]),-physicalForceY,'SVG y increases downward');
  assert.ok(direction.textContent.includes(out?'aus der Ebene':'in die Ebene'));
  assert.ok(direction.textContent.includes(out?'nach oben':'nach unten'));
  w.changeDirection();
 }
 for(const [turns,volts]of [[2,92],[5,230],[10,460]]){
  w.updateTransformer(turns);assert.equal(d.getElementById('voltValSec').textContent,volts+'V');
  assert.equal(d.querySelectorAll('#coil2 path').length,turns);
  assert.equal(d.querySelectorAll('#coil2 animateMotion').length,0,'Unloaded secondary must not depict flowing current');
  assert.equal(d.getElementById('magneticFlux').style.strokeWidth,'3');
  assert.equal(d.getElementById('fluxField').getAttribute('opacity'),'0.5');
 }
 w.updateMagnetField(0);assert.ok([...d.getElementById('fieldLines').children].every(el=>Number(el.style.opacity)===0));
 w.updateMagnetField(60);assert.ok([...d.getElementById('fieldLines').children].every(el=>Number(el.style.opacity)>0));
 w.toggleRelay();assert.equal(d.getElementById('relayBtn').getAttribute('aria-pressed'),'true');w.toggleRelay();assert.equal(d.getElementById('relayBtn').getAttribute('aria-pressed'),'false');
 dom.window.close();console.log('PASS: 29 core electromagnetic questions, four reversible pole combinations and nine new answer paths, corrected feedback and revision, three transformer ratios with fixed flux and no unloaded current animation, zero-current field and relay switching.');
})().catch(error=>{console.error(error);process.exitCode=1;});
