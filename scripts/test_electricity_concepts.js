const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=elektrizitaet',runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));await w.renderTopic();
assert.equal(w.currentChapterQuiz.questions.length,20);assert.equal(d.querySelectorAll('[onclick*="answerFinalQuiz"]').length,0);assert.match(d.body.textContent,/bewegliche Ionen/);assert.match(d.body.textContent,/bereits im gesamten Draht/);assert.doesNotMatch(d.body.textContent,/Elektronen-Gefängnisse|reiben sie aneinander|satte 20 Punkte/);
assert.equal(w.currentChapterResult('elektrizitaet',{passed:true,bestPercent:100}).passed,false);
assert.equal(w.currentChapterResult('elektrizitaet',{contentRevision:3,passed:true,bestPercent:100}).passed,false);
assert.equal(w.currentChapterQuiz.questions.find(q=>q.id==='q_ohm').sectionIndex,5);assert.equal(w.currentChapterQuiz.questions.find(q=>q.id==='elektrizitaet_s4_q0').sectionIndex,6);
assert.equal(d.querySelectorAll('[data-ohm-comparison] tbody tr').length,3);assert.equal(d.querySelectorAll('[data-ohm-task] li').length,5);for(const id of ['uRange','rRange'])assert.ok(d.querySelector('label[for="'+id+'"]'));
const protection=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('electric_schutz_')||q.id.startsWith('electric_geraet_'));assert.equal(protection.length,7);
for(const q of protection){
 assert.equal(q.sectionIndex,q.id.startsWith('electric_schutz_')?3:7);assert.equal(q.answers.filter(a=>a.correct).length,1);const index=w.currentChapterQuiz.questions.indexOf(q);
 for(let choice=0;choice<q.answers.length;choice++){
  w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector(`input[name="chapter_q_${i}"][value="${i===index?choice:question.answers.findIndex(a=>a.correct)}"]`).checked=true;});
  w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).elektrizitaet;
  assert.equal(result.lastPercent,Math.round(100*(20-(q.answers[choice].correct?0:1))/20));
  assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
 }
}
w.eval(read('js/topics/elektrizitaet.js'));w.topicInit();
const zone=d.querySelector('[data-sensor-lamp]'),get=name=>zone.querySelector('[data-lamp-'+name+']'),light=get('light'),mode=get('mode'),power=get('power');
for(const control of [light,mode,power])assert.ok(control.closest('label'));
assert.equal(get('status').getAttribute('aria-live'),'polite');assert.equal(get('status').getAttribute('aria-atomic'),'true');
const before=w.localStorage.getItem('sciverse_chapter_quiz_results');
for(const supplied of [true,false])for(const ambient of ['bright','dark'])for(const setting of ['auto','on','off']){
 light.value=ambient;mode.value=setting;power.checked=supplied;mode.focus();mode.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,mode);
 const expected=supplied&&(setting==='on'||(setting==='auto'&&ambient==='dark'));
 assert.equal(get('output').dataset.on,String(expected));assert.equal(get('output').textContent,expected?'LED leuchtet.':'LED leuchtet nicht.');
 if(!supplied){assert.match(get('input').textContent,/kein Signal/);assert.match(get('rule').textContent,/arbeitet.*nicht/);}
 assert.ok(get('status').textContent.includes(get('output').textContent));
}
w.initSensorLamp();assert.equal(power.checked,false);get('reset').focus();get('reset').click();assert.equal(d.activeElement,get('reset'));assert.equal(light.value,'bright');assert.equal(mode.value,'auto');assert.equal(power.checked,true);assert.equal(get('output').dataset.on,'false');
light.value='dark';light.dispatchEvent(new w.Event('change'));assert.equal(get('output').dataset.on,'true');power.click();assert.equal(get('output').dataset.on,'false');
light.value='invalid';mode.value='invalid';light.dispatchEvent(new w.Event('change'));assert.equal(light.value,'bright');assert.equal(mode.value,'auto');
assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),before,'Exploration does not change quiz results');
for(const [u,r,expected]of [[6,50,'0.12'],[12,50,'0.24'],[6,100,'0.06'],[12,10,'1.20'],[12,100,'0.12']]){d.querySelector('#uRange').value=u;d.querySelector('#rRange').value=r;w.updateOhm();assert.ok(d.querySelector('#iValText').innerText.includes(expected));assert.equal(d.querySelector('#uRange').getAttribute('aria-valuetext'),u+' Volt');}
assert.match(d.querySelector('#ohmFeedback').innerText,/keine Vorhersage/);dom.window.close();console.log('PASS: corrected electricity concepts, 20 assessed questions including 21 protection/device answer paths and twelve sensor-lamp states, obsolete inline final removed, revision migration, five Ohm scenarios and accessible values.');})().catch(e=>{console.error(e);process.exitCode=1;});
