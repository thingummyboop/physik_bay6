const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=wetter',runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));await w.renderTopic();assert.equal(w.currentChapterQuiz.questions.length,18);assert.equal(w.currentChapterResult('wetter',{contentRevision:2,passed:true,bestPercent:100}).passed,false);assert.doesNotMatch(d.body.textContent,/Wind immer|Ohne den warmen Golfstrom/);assert.match(d.body.textContent,/Erdrotation/);
w.setInterval=()=>1;w.clearInterval=()=>{};w.eval(read('js/topics/wetter.js'));w.topicInit();
const host=d.querySelector('[data-coast-model]'),select=host.querySelector('select'),result=host.querySelector('[data-coast-result]');
assert.equal(result.hidden,true);assert.equal(d.querySelectorAll('[data-coast-cases] tbody tr').length,3);
for(const [mode,rise,upper,sink,ground] of [
 ['day','über dem Land','vom Land zum Wasser','über dem Wasser','vom Wasser zum Land'],
 ['night','über dem Wasser','vom Wasser zum Land','über dem Land','vom Land zum Wasser'],
 ['equal','keine Seite','keine Richtung','keine Seite','keine allgemeine Windstille'],
 ['day','über dem Land','vom Land zum Wasser','über dem Wasser','vom Wasser zum Land']]){
 select.value=mode;select.dispatchEvent(new w.Event('change'));assert.equal(result.hidden,true);
 const check=host.querySelector('[data-coast-check]');check.focus();check.click();assert.equal(result.hidden,false);assert.equal(d.activeElement,check);
 for(const [key,phrase] of [['rise',rise],['upper',upper],['sink',sink],['ground',ground]])assert.ok(host.querySelector('[data-coast-'+key+']').textContent.includes(phrase),mode+' '+key);
 assert.ok(host.querySelector('[data-coast-status]').textContent.includes(ground));
}
w.topicInit();assert.equal(d.querySelectorAll('[data-coast-model]').length,1);
host.querySelector('[data-coast-reset]').click();assert.equal(select.value,'day');assert.equal(result.hidden,true);assert.equal(d.activeElement,select);
assert.match(d.body.textContent,/keine Windzirkulation nach/);
let checked=0;
for(const [index,q] of w.currentChapterQuiz.questions.entries()){
 if(q.id.startsWith('weather_coast_'))assert.equal(q.sectionIndex,1);
 if(['weather_rain_volume','weather_rain_rate','weather_warning_current','weather_warning_uncertainty'].includes(q.id))assert.equal(q.sectionIndex,5);
 for(let choice=0;choice<q.answers.length;choice++){
  w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).wetter.lastPercent,q.answers[choice].correct?100:94);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));checked++;
 }
}
assert.equal(checked,51);
assert.equal(d.querySelectorAll('[data-rain-comparison] tbody tr').length,2);
assert.equal(d.querySelectorAll('[data-weather-bulletins] tbody tr').length,3);
assert.match(d.querySelector('[data-weather-bulletins] caption').textContent,/Vollständig erfundene/);
assert.match(d.querySelector('[data-bulletin="C"]').textContent,/13–18 Uhr/);
for (const value of ['30 mm/h', '5 mm/h', '1 500 L']) assert.ok(d.querySelector('[data-rain-model]').textContent.includes(value));
assert.equal(d.querySelector('[data-warning-model]').open,false);
assert.ok(d.querySelector('a[href="template.html?topic=geo_1_naturgefahren"]'));
assert.doesNotMatch(data.wetter.sections.find(s=>s.id==='sec4').quizzes[0].answers.find(a=>a.correct).text,/immer wieder hochgeschleudert/);
w.showInstrumentDetailed('hygrometer');assert.match(d.querySelector('#instrumentText').textContent,/nicht 50 % Wasseranteil/);for(const type of ['rain','snow','sleet','hail']){w.showPrecipitation(type);assert.ok(d.querySelector('#precipTextOverlay').textContent.length>30);}assert.match(d.querySelector('#precipTextOverlay').textContent,/nicht auf den Sommer beschränkt/);w.showPrecipitation('sleet');assert.match(d.querySelector('#precipTextOverlay').textContent,/Unterkühlte Wassertröpfchen/);dom.window.close();console.log('PASS: weather render, 18 questions, all 51 answer paths, rainfall units/intensity, fictional warning materials, three circulation states, reset/focus/reinitialization, revision, hygrometer and precipitation descriptions.');})().catch(e=>{console.error(e);process.exitCode=1;});
