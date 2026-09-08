const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json')),ctx={window:{}};vm.runInNewContext(read('js/curriculum.js'),ctx);
(async()=>{for(const t of ctx.window.SCIVERSE_CURRICULUM.physik.topics){const topic=data[t.id],dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+t.id,runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));await w.renderTopic();
 assert.ok(topic.learningGoals.length>=3,t.id);assert.ok(topic.summary.length>=3,t.id);assert.equal(d.querySelectorAll('[data-core-intro] li').length,topic.learningGoals.length,t.id);assert.equal(d.querySelectorAll('#chapter-summary li').length,topic.summary.length,t.id);
 const catalog=Object.values(ctx.window.SCIVERSE_CURRICULUM).flatMap(s=>s.topics),known=(topic.prerequisites||[]).filter(id=>catalog.some(t=>t.id===id));assert.equal(d.querySelectorAll('[data-core-intro] a').length,known.length,t.id);
 for(const a of d.querySelectorAll('[data-core-intro] a'))assert.ok(catalog.some(t=>a.hash==='#'+encodeURIComponent(t.id)));
 if(t.id==='farben'){
  assert.deepEqual(topic.sections.map(s=>s.id),['sec2','sec3','sec5_mischung','sec1','sec4_itten','sec6_strukturfarben','sec0']);
  topic.sections.forEach((section,index)=>section.quizzes.forEach(q=>assert.equal(w.currentChapterQuiz.questions.find(item=>item.id===q.id).sectionIndex,index,'Review links follow reordered content')));
  w.eval(read('js/topics/farben.js'));w.topicInit();
  for(const [kind,label] of [['red','Roter Pulli'],['green','Grünes Blatt'],['black','Schwarzer Stoff'],['white','Weißes Papier']]){
   w.showColorObject(kind);assert.equal(d.getElementById('colorObjectLabel').textContent,label);assert.ok(d.getElementById('colorObjectText').textContent.length>40);
  }
  const range=d.getElementById('dispersionAngle');
  for(let value=-12;value<=8;value++){
   range.value=String(value);range.dispatchEvent(new w.Event('input'));
   assert.match(range.getAttribute('aria-valuetext'),/Grad Einfallswinkel zum Lot/);
   assert.doesNotMatch(d.getElementById('dispersionSpectrumRays').innerHTML,/NaN|Infinity/);
   assert.ok(d.getElementById('dispersionSpectrumRays').children.length>0);
  }
 }
 dom.window.close();
}
// Explicitly protect explanatory prerequisites from being turned into non-existent chapter URLs.
const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/topics/template.html',runScripts:'outside-only'}),w=dom.window;w.eval(read('js/curriculum.js'));w.eval(read('js/core-learning.js'));w.enhanceCoreLearning({learningGoals:['Test'],prerequisites:['sieinheiten','Geldbeträge addieren und subtrahieren.']},'test','de');assert.equal(w.document.querySelectorAll('[data-core-intro] a').length,1);assert.match(w.document.querySelector('[data-core-intro]').textContent,/Geldbeträge addieren und subtrahieren/);dom.window.close();
assert.ok(!JSON.stringify(data.farben).includes('Hat die kürzesten'));assert.ok(!JSON.stringify(data.linsen_spiegel).includes('superheißen'));
console.log('PASS: learning goals and summaries in all 20 physics chapter renders; valid prerequisites; reordered color sections and quiz routes, four object states and 21 prism inputs. Other per-topic simulations require their separate tests.');
})().catch(error=>{console.error(error);process.exitCode=1;});
