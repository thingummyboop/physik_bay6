const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
const tick=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
 const ids=Object.keys(data).filter(id=>id.startsWith('musik_'));assert.equal(ids.length,7);let labs=0;
 for(const id of ids){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await tick();w.fetch=async()=>({ok:true,json:async()=>data});let contexts=0,oscillators=[],closed=0;
  class AudioMock{constructor(){contexts++;this.state='running';this.currentTime=10;this.destination={};}resume(){return Promise.resolve();}close(){closed++;this.state='closed';return Promise.resolve();}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){}},connect(){},disconnect(){}};}createOscillator(){const o={frequency:{value:0},starts:[],stops:[],connect(){},disconnect(){},start(t){this.starts.push(t);},stop(t){this.stops.push(t);}};oscillators.push(o);return o;}}
  w.AudioContext=AudioMock;
  for(const file of ['curriculum','chapter-revisions','common','core-learning','language-workshop','music-lab','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
  assert.equal(contexts,0,'No audio before explicit playback');const expected=['musik_2_notation','musik_1_stimme_rhythmus','musik_1_hoeren'].includes(id)?7:4;assert.equal(d.querySelectorAll('.practice-box').length,expected);assert.equal(d.querySelectorAll('.chapter-question').length,expected);
  if(id==='musik_2_notation'){
   assert.deepEqual(Array.from(w.SCIVERSE_CURRICULUM.musik.topics.find(t=>t.id===id).gradeLevels),[5,6]);
   assert.equal(d.querySelectorAll('[data-staff-line]').length,5);
   assert.deepEqual([...d.querySelectorAll('[data-notehead]')].map(n=>Number(n.getAttribute('cy'))),[104,98,92,80]);
   assert.deepEqual([...d.querySelectorAll('[data-score-note]')].map(n=>n.dataset.scoreNote),['c′','d′','e′','g′']);
   const svg=d.querySelector('[data-music-score] svg');for(const label of svg.getAttribute('aria-labelledby').split(' '))assert.ok(d.getElementById(label));
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('musik_noten_'))){
    assert.equal(q.sectionIndex,0);const index=w.currentChapterQuiz.questions.indexOf(q);
    for(let choice=0;choice<q.answers.length;choice++){
     w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
     w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(7-(q.answers[choice].correct?0:1))/7));
     assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
    }
   }
  }
  if(id==='musik_1_stimme_rhythmus'){
   const beats=[...d.querySelectorAll('[data-dance-beats]')].reduce((sum,r)=>sum+Number(r.dataset.danceBeats),0);assert.equal(beats,8);
   const guide=w.musicEvents(['C4','rest','C4','rest','C4','rest','C4','rest'],60,true);assert.equal(guide.duration,4+beats);assert.equal(guide.events.filter(e=>e.type===null).length,8);
   assert.equal(d.querySelectorAll('[data-dance-observation] tbody tr').length,3);
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('musik_bewegung_'))){
    assert.equal(q.sectionIndex,3);const index=w.currentChapterQuiz.questions.indexOf(q);
    for(let choice=0;choice<q.answers.length;choice++){
     w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
     w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(7-(q.answers[choice].correct?0:1))/7));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
    }
   }
  }
  if(id==='musik_1_hoeren'){
   const clips=[...d.querySelectorAll('audio[data-music-listening]')];assert.equal(clips.length,3);assert.ok(clips.every(c=>c.controls&&!c.autoplay&&c.preload==='none'));
   const pauses=[0,0,0];clips.forEach((c,i)=>{Object.defineProperty(c,'paused',{configurable:true,get:()=>false});c.pause=()=>pauses[i]++;});
   w.initMusicLabs();assert.equal(d.querySelectorAll('[data-listening-status]').length,3);
   clips[0].dispatchEvent(new w.Event('play'));assert.deepEqual(pauses,[0,1,1]);
   clips[1].dispatchEvent(new w.Event('error'));assert.match(d.querySelectorAll('[data-listening-status]')[1].textContent,/nicht geladen/);
   clips[1].dispatchEvent(new w.Event('play'));assert.equal(d.querySelectorAll('[data-listening-status]')[1].textContent,'');assert.deepEqual(pauses,[1,1,2]);
   Object.defineProperty(d,'hidden',{configurable:true,value:true});d.dispatchEvent(new w.Event('visibilitychange'));assert.deepEqual(pauses,[2,2,3]);Object.defineProperty(d,'hidden',{configurable:true,value:false});
   for(const q of w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('musik_hoer_'))){
    assert.equal(q.sectionIndex,3);const index=w.currentChapterQuiz.questions.indexOf(q);
    for(let choice=0;choice<q.answers.length;choice++){
     w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
     w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(7-(q.answers[choice].correct?0:1))/7));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
    }
   }
  }
  assert.ok(w.SCIVERSE_CURRICULUM.musik.topics.find(t=>t.id===id).available!==false);
  assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false,'Old unversioned result must not remain current');
  const revision=w.SCIVERSE_CHAPTER_REVISIONS[id];if(revision>1)assert.equal(w.currentChapterResult(id,{contentRevision:revision-1,passed:true,bestPercent:100}).passed,false);
  for(const [index,q]of w.currentChapterQuiz.questions.entries()){
   for(let choice=0;choice<q.answers.length;choice++){
    w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);
    w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,Math.round(100*(expected-(q.answers[choice].correct?0:1))/expected));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
   }
  }
  const workshop=d.querySelector('[data-language-workshop]');[...workshop.querySelectorAll('select')].forEach((s,i)=>s.value=data[id].workshop.items[i].answer);[...workshop.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);
  const zone=d.querySelector('[data-music-lab]');if(zone){labs++;
   const pattern=[...zone.querySelectorAll('[data-notes] select')],status=()=>zone.querySelector('[data-status]').textContent;assert.equal(pattern.length,8);w.initMusicLabs();assert.equal(zone.querySelectorAll('[data-notes] select').length,8);
   // Duration and event timing prove rhythmic units, rather than merely checking labels.
   const schedule=w.musicEvents(['C4','rest','D4','rest','E4','rest','G4','rest'],120,false);assert.equal(schedule.duration,6);assert.equal(schedule.events.length,12);
   assert.deepEqual(Array.from(schedule.events.slice(0,4),e=>e.time),[0,.5,1,1.5]);
   assert.deepEqual(Array.from(schedule.events.slice(4),e=>e.time),[2,2.5,3,3.5,4,4.5,5,5.5]);
   assert.equal(w.musicEvents(Array(8).fill('rest'),60,true).events.length,12);assert.equal(w.musicEvents(Array(8).fill('rest'),60,false).events.length,4);
   const offbeats=w.musicEvents(['rest','C4','rest','C4','rest','C4','rest','C4'],60,false);assert.equal(offbeats.events[4].time,4.5);
   zone.querySelector('[data-play]').click();await tick();assert.equal(contexts,1);assert.equal(oscillators.length,20);assert.ok(oscillators.every(o=>o.starts.length===1&&o.stops.length===1));assert.equal(oscillators[0].starts[0],10.08);
   if(id==='musik_1_hoeren'){d.querySelector('audio[data-music-listening]').dispatchEvent(new w.Event('play'));assert.ok(oscillators.every(o=>o.stops.length===2),'Native listening clip cancels the synthesized lab');}
   zone.querySelector('[data-stop]').click();assert.ok(oscillators.every(o=>o.stops.length===2));assert.match(status(),/gestoppt/);
   zone.querySelector('[data-clear]').click();assert.ok(pattern.every(s=>s.value==='rest'));assert.match(zone.querySelector('[data-pattern]').textContent,/1: Pause/);
   pattern[0].value='A4';pattern[0].dispatchEvent(new w.Event('change'));zone.querySelector('[data-pulse]').checked=false;oscillators=[];
   zone.querySelector('[data-play]').click();await tick();assert.equal(contexts,1,'Reuse context');assert.equal(oscillators.length,6);assert.equal(oscillators[4].frequency.value,440);
   pattern[1].value='D4';pattern[1].dispatchEvent(new w.Event('change'));assert.match(status(),/Einstellung geändert/);assert.ok(oscillators.every(o=>o.stops.length===2));
   zone.querySelector('[data-play]').click();await tick();Object.defineProperty(d,'hidden',{configurable:true,value:true});d.dispatchEvent(new w.Event('visibilitychange'));assert.match(status(),/Verlassen der Ansicht gestoppt/);
   Object.defineProperty(d,'hidden',{configurable:true,value:false});zone.querySelector('[data-play]').click();await tick();w.dispatchEvent(new w.Event('pagehide'));assert.equal(closed,1);
   // Missing API remains usable, with explicit fallback and enabled play control.
   delete w.AudioContext;zone.querySelector('[data-play]').click();await tick();assert.match(status(),/Tonwiedergabe ist hier nicht möglich/);assert.equal(zone.querySelector('[data-play]').disabled,false);
  }
  dom.window.close();
  const sheet=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/physik_bay6/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),sw=sheet.window,sd=sw.document;
  sw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])sw.eval(read('js/'+f+'.js'));await tick();
  assert.equal(sd.getElementById('ws-print').disabled,false);assert.equal(sd.getElementById('ws-subject').textContent,'Musik');
  const material=sd.getElementById('ws-music-material');assert.ok(material);assert.equal(material.querySelectorAll('article').length,data[id].sections.length);
  assert.ok(material.textContent.includes(data[id].workshop.writing));assert.ok(!material.textContent.includes(data[id].workshop.model));assert.equal(material.querySelectorAll('input,select,button,script,details,[data-music-lab]').length,0);
  if(id==='musik_2_notation'){assert.equal(material.querySelectorAll('[data-notehead]').length,4);const svg=material.querySelector('[data-music-score] svg');for(const label of svg.getAttribute('aria-labelledby').split(' '))assert.ok(sd.getElementById(label));}
  if(id==='musik_1_stimme_rhythmus'){
   assert.equal(material.querySelectorAll('[data-dance-sequence] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-dance-observation] tbody tr').length,3);assert.match(material.textContent,/Sitzend/);assert.match(material.textContent,/alle sechs Takte/);
  }
  if(id==='musik_1_hoeren'){assert.equal(material.querySelectorAll('[data-listening-protocol] tbody tr').length,3);assert.equal(material.querySelectorAll('audio,[data-listening-analysis]').length,0);}
  const include=sd.getElementById('ws-include-material');include.checked=false;include.dispatchEvent(new sw.Event('change'));assert.equal(material.hidden,true);assert.equal(sd.getElementById('ws-solutions').hidden,true);
  const solutions=sd.getElementById('ws-include-solutions');solutions.checked=true;solutions.dispatchEvent(new sw.Event('change'));assert.equal(material.hidden,true);assert.equal(sd.getElementById('ws-solutions').hidden,false);sheet.window.close();
 }
 assert.equal(labs,4);
 // Stop during a pending AudioContext resume must cancel the eventual schedule.
 const dom=new JSDOM('<div data-music-lab><div data-notes></div><p data-status></p><select data-tempo><option>90</option></select><input data-pulse type=checkbox><select data-timbre><option>sine</option></select><p data-pattern></p><button data-play></button><button data-stop></button><button data-clear></button></div>',{runScripts:'outside-only'}),w=dom.window;let resolveResume,scheduled=0;
 w.AudioContext=class{constructor(){this.currentTime=0;this.state='running';}resume(){return new Promise(resolve=>resolveResume=resolve);}createOscillator(){scheduled++;throw Error('Must not schedule');}};
 w.eval(read('js/music-lab.js'));w.initMusicLabs();w.document.querySelector('[data-play]').click();w.document.querySelector('[data-stop]').click();resolveResume();await tick();assert.equal(scheduled,0);dom.window.close();
 console.log('PASS: seven music chapter renders, 37 questions, all 111 answer paths, revised mastery invalidation and native audio lifecycle, movement beats matching audio count-in/duration, correct score positions and seven complete material worksheets, 21 classifications; four sound labs; count-in, eighth-note/rest timing, tempo, 2-bar duration, no autoplay, context reuse, stop/change/pagehide cancellation, unsupported audio and pending-resume cancellation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
