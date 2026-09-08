const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM,VirtualConsole}=require('jsdom');
const script=fs.readFileSync(path.join(__dirname,'../js/common.js'),'utf8');
const original={physik_topic_scores:JSON.stringify({optik1:80,energie:90}),sciverse_chapter_quiz_results:JSON.stringify({optik1:{lastPercent:80},energie:{lastPercent:90}}),physik_score:'170',physik_answered:JSON.stringify(['optik1_q1','energie_q2']),physik_failed_once:JSON.stringify(['optik1_q3','energie_q4'])};
const scenarios=['normal','cancel','denied','corrupt','array','null','bad-ids','bad-score',...Object.keys(original).map(key=>'fail:'+key),'rollback-fails'];
for(const scenario of scenarios){
 const dom=new JSDOM('<div><button id="topic-reset-btn"></button></div>',{url:'https://example.test/topics/template.html?topic=optik1',runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window;
 for(const [key,value]of Object.entries(original))w.localStorage.setItem(key,value);
 if(scenario==='corrupt')w.localStorage.setItem('sciverse_chapter_quiz_results','broken');
 if(scenario==='array')w.localStorage.setItem('sciverse_chapter_quiz_results','[]');
 if(scenario==='null')w.localStorage.setItem('sciverse_chapter_quiz_results','null');
 if(scenario==='bad-ids')w.localStorage.setItem('physik_answered','[1]');
 if(scenario==='bad-score')w.localStorage.setItem('physik_score','NaN');
 const snapshot=Object.fromEntries(Object.keys(original).map(key=>[key,w.localStorage.getItem(key)]));
 w.eval(script);w.confirm=()=>scenario!=='cancel';w.updateScoreDisplays=()=>{};
 const nativeSet=w.Storage.prototype.setItem;let failed=false;
 w.Storage.prototype.setItem=function(key,value){
  if(scenario==='fail:'+key&&!failed){failed=true;throw new w.DOMException('Full','QuotaExceededError');}
  if(scenario==='rollback-fails'&&(key==='sciverse_chapter_quiz_results'||failed)){failed=true;throw new w.DOMException('Full','QuotaExceededError');}
  return nativeSet.call(this,key,value);
 };
 if(scenario==='denied')Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Denied','SecurityError');}});
 assert.doesNotThrow(()=>w.resetTopicProgress(),scenario);
 if(scenario==='normal'){
  assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')),{energie:{lastPercent:90}});
  assert.deepEqual(JSON.parse(w.localStorage.getItem('physik_topic_scores')),{optik1:0,energie:90});
  assert.equal(w.localStorage.getItem('physik_score'),'90');
  assert.deepEqual(JSON.parse(w.localStorage.getItem('physik_answered')),['energie_q2']);
  assert.deepEqual(JSON.parse(w.localStorage.getItem('physik_failed_once')),['energie_q4']);
 }else if(scenario==='rollback-fails'){
  assert.match(w.document.getElementById('topic-reset-status').textContent,/Wiederherstellen war teilweise nicht möglich/);
  assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),snapshot.sciverse_chapter_quiz_results);
 }else{
  if(scenario!=='denied')for(const [key,value]of Object.entries(snapshot))assert.equal(w.localStorage.getItem(key),value,scenario+': '+key);
  if(scenario==='cancel')assert.equal(w.document.getElementById('topic-reset-status'),null);
  else assert.match(w.document.getElementById('topic-reset-status').textContent,/keine Daten verändert|bisherigen Daten bleiben erhalten/);
 }
 dom.window.close();
}
console.log('PASS: chapter-only reset, cancellation, denied/corrupt storage, five write failures with restoration, and truthful partial-restoration warning; other chapter results retained.');
