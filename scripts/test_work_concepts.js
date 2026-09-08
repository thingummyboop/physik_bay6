const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=arbeit',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,15);
 assert.match(d.body.textContent,/Muskeln setzen beim Halten trotzdem chemische Energie um/);
 assert.equal(w.currentChapterResult('arbeit',{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 w.Element.prototype.animate=()=>({cancel(){},finished:Promise.resolve()});w.requestAnimationFrame=()=>1;w.setTimeout=()=>1;w.eval(read('js/topics/arbeit.js'));w.topicInit();
 const direction=d.getElementById('workDirection');
 for(const [value,result]of [['along',150],['against',-150],['perpendicular',0]]){
  d.getElementById('forceRange').value=50;d.getElementById('distanceRange').value=3;direction.value=value;w.eval(direction.getAttribute('onchange'));
  assert.equal(d.getElementById('workValue').innerText,result+' J');assert.equal(d.getElementById('workMeter').style.width,(Math.abs(result)/6)+'%');
 }
 for(const [surface,work]of [['ice',80],['sand',320]]){w.setSurface(surface);assert.ok(d.getElementById('frictionText').innerText.includes('−'+work+' J'));}
 for(const ramp of ['flat','steep']){w.compareRamp(ramp);assert.equal(d.getElementById('rampWork').innerText,'600 J');}
 dom.window.close();console.log('PASS: 15 work questions, revision, muscle/system distinction, positive/negative/perpendicular work and bar magnitude, two friction balances, equal ideal ramp work.');
})().catch(error=>{console.error(error);process.exitCode=1;});
