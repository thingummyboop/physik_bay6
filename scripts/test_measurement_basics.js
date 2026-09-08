const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=sieinheiten',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));
 await w.renderTopic();
 assert.equal(d.querySelectorAll('.chapter-question').length,17);
 assert.doesNotMatch(d.body.textContent,/Zahlenwert plus Einheit|Einheit sagt, womit gemessen wird/);
 assert.match(d.body.textContent,/vereinbarte Vergleichsgröße/);
 assert.match(d.body.textContent,/nicht automatisch die gesamte Messunsicherheit/);
 assert.match(d.body.textContent,/Pausenzeit/);
 assert.equal(w.currentChapterResult('sieinheiten',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 const callbacks=[];w.setTimeout=fn=>(callbacks.push(fn),callbacks.length);
 w.eval(read('js/topics/sieinheiten.js'));w.topicInit();
 for(const [distance,time,expected] of [[100,10,'10.0'],[100,20,'5.0'],[200,20,'10.0']]){
  d.getElementById('sRange').value=distance;d.getElementById('tRange').value=time;w.calcSpeed();
  assert.match(d.getElementById('speedText').innerText,/Mittlere Geschwindigkeit/);
  assert.ok(d.getElementById('speedText').innerText.endsWith(expected+' m/s'));
  assert.equal(d.getElementById('tRange').getAttribute('aria-valuetext'),time+' Sekunden');
 }
 w.drawGraph();assert.match(d.getElementById('graphText').innerText,/Modellwerte/);
 assert.equal(d.getElementById('graphBtn').disabled,true);
 callbacks.forEach(fn=>fn());
 assert.equal(d.getElementById('graphBtn').disabled,false);
 assert.ok([...d.querySelectorAll('.graphPoint')].every(p=>p.style.opacity==='1'));
 dom.window.close();console.log('PASS: 17 measurement questions, corrected unit and uncertainty explanations, revision invalidation, mean-speed controls and model-data animation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
