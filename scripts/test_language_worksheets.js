const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const ids=Object.keys(data).filter(id=>/^(deutsch|englisch)_/.test(id));assert.equal(ids.length,20);
 for(const id of ids){
  const dom=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/physik_bay6/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  w.localStorage.setItem('sciverse_draft_'+id,'PRIVATE-LEARNER-DRAFT');w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','worksheet_generator','worksheet'])w.eval(read('js/'+f+'.js'));
  await new Promise(r=>setImmediate(r));assert.equal(d.getElementById('ws-print').disabled,false,id);
  const material=d.getElementById('ws-language-material');assert.ok(material,id);assert.equal(material.hidden,false);
  const articles=[...material.querySelectorAll('article')];assert.equal(articles.length,data[id].sections.length,id);
  for(const [index,section] of data[id].sections.entries()){
   const source=d.createElement('div');source.innerHTML=section.content;
   const quotes=[...source.querySelectorAll('blockquote')],printed=[...articles[index].querySelectorAll('blockquote')];
   assert.equal(printed.length,quotes.length,id);
   quotes.forEach((quote,i)=>{assert.equal(printed[i].textContent,quote.textContent);assert.equal(printed[i].getAttribute('lang'),quote.getAttribute('lang'));});
   assert.ok(articles[index].querySelector('a').href.endsWith('#learning-section-'+index));
  }
  if(id==='deutsch_1_schreiben'){assert.equal(material.querySelectorAll('[data-revision-steps] tbody tr').length,4);assert.ok(material.querySelector('[data-revision-draft]'));assert.equal(material.querySelectorAll('[data-revision-model]').length,0);assert.ok(!material.textContent.includes('Dies ist eine kurze Vergleichsfassung'));}
  if(id==='deutsch_2_sachtexte'){
   assert.deepEqual([...material.querySelectorAll('[data-schoolway-table] tbody td')].map(x=>Number(x.textContent)),[10,8,4,2]);
   assert.ok(material.querySelector('[data-schoolway-second]'));assert.ok(material.querySelector('[data-schoolway-comment]'));
   assert.equal(material.querySelectorAll('[data-material-model]').length,0);
  }
  if(id==='deutsch_3_argumentieren'){
   assert.deepEqual([...material.querySelectorAll('[data-reading-vote] tbody td')].map(x=>Number(x.textContent)),[16,5,3]);
   assert.equal(material.querySelectorAll('[data-discussion-roles] tbody tr').length,5);
   assert.equal(material.querySelectorAll('[data-discussion-sequence] > li').length,5);
   assert.equal(material.querySelectorAll('[data-discussion-model]').length,0);
  }
  if(id==='deutsch_4_analyse'){
   assert.equal(material.querySelectorAll('[data-goethe-poem] br').length,7);
   assert.equal(material.querySelectorAll('[data-goethe-comparison] tbody tr').length,3);
   assert.ok(material.querySelector('a[href*="oldid=3682272"]'));
   assert.equal(material.querySelectorAll('[data-goethe-model]').length,0);
  }
  if(id==='deutsch_1_sprache'){
   assert.equal(material.querySelectorAll('[data-spelling-strategies] tbody tr').length,4);
   assert.equal(material.querySelectorAll('[data-language-registers] tbody tr').length,2);
   assert.ok(material.querySelector('[data-spelling-draft]'));
   assert.equal(material.querySelectorAll('[data-spelling-model],[data-register-model]').length,0);
  }
  if(id==='englisch_2_everyday'){
   assert.equal(material.querySelectorAll('[data-arrangement-role][lang="en"]').length,2);
   assert.equal(material.querySelectorAll('[data-arrangement-programme] tbody tr').length,3);
   assert.equal(material.querySelectorAll('[data-arrangement-model]').length,0);
  }
  if(id==='englisch_2_stories'){
   assert.ok(material.querySelector('[data-future-message]'));
   assert.equal(material.querySelectorAll('[data-time-meaning] tbody tr').length,4);
   assert.equal(material.querySelectorAll('[data-future-model]').length,0);
  }
  if(id==='englisch_4_exam'){
   assert.equal(material.querySelectorAll('[data-globe-reading] p').length,2);
   assert.equal(material.querySelectorAll('[data-globe-responses] p').length,2);
   assert.equal(material.querySelectorAll('[data-globe-evidence] tbody tr').length,3);
   assert.equal(material.querySelectorAll('[data-globe-model]').length,0);
  }
  if(id==='englisch_3_opinions'){
   assert.equal(material.querySelectorAll('[data-english-perspective-story] p').length,4);
   assert.equal(material.querySelectorAll('[data-perspective-evidence] tbody tr').length,3);
   assert.equal(material.querySelectorAll('[data-story-response-model]').length,0);
  }
  if(id==='deutsch_1_lesen'){
   assert.equal(material.querySelectorAll('[data-reading-rehearsal] > li').length,4);
   assert.equal(material.querySelectorAll('[data-reading-feedback] tbody tr').length,3);
   assert.ok(material.querySelector('[data-reading-log]'));
  }
  if(id==='deutsch_2_literatur'){
   assert.equal(material.querySelectorAll('[data-literary-poem] br').length,8);
   assert.equal(material.querySelectorAll('[data-literary-scene] strong').length,4);
   assert.equal(material.querySelectorAll('[data-literary-comparison] tbody tr').length,3);
   assert.equal(material.querySelectorAll('[data-literary-model]').length,0);
  }
  assert.ok(material.textContent.includes(data[id].workshop.writing));assert.ok(!material.textContent.includes(data[id].workshop.model));assert.ok(!d.body.textContent.includes('PRIVATE-LEARNER-DRAFT'));
  assert.equal(material.querySelectorAll('input,textarea,button,select,script,details').length,0);assert.doesNotMatch(material.innerHTML,/\{\{QUIZ_/);
  if(data[id].workshop.listen){const spoken=[...material.querySelectorAll('[data-worksheet-workshop] p')].find(p=>p.textContent===data[id].workshop.listen);assert.ok(spoken);assert.equal(spoken.lang,data[id].workshop.voice||(id.startsWith('englisch_')?'en':'de'));assert.match(material.textContent,/verdecke dabei alle gedruckten Fassungen/);}
  assert.equal(d.querySelectorAll('#ws-content > .question-block').length,data[id].sections.reduce((sum,s)=>sum+s.quizzes.length,0));
  const include=d.getElementById('ws-include-material');include.checked=false;include.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,true);assert.equal(d.getElementById('ws-solutions').hidden,true);
  const solutions=d.getElementById('ws-include-solutions');solutions.checked=true;solutions.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,true);assert.equal(d.getElementById('ws-solutions').hidden,false);
  dom.window.close();
 }
 console.log('PASS: 20 language worksheets retain complete reading passages, language attributes, section links, writing tasks and listening instructions, independent toggles, no model answers or private drafts.');
})().catch(e=>{console.error(e);process.exitCode=1;});
