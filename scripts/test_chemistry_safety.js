const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_sicherheit',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/kein Ersatz für ein CLP-Gefahrenpiktogramm/);
 assert.match(d.body.textContent,/keine Freigabe für einen Versuch zu Hause/);
 assert.equal(w.currentChapterResult('chemie_sicherheit',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="safety-sort"]');
 for(const [id,phrases]of [['eyes',['Sofort','spülen','Hilfe rufen']],['smell',['Abstand halten','nicht durch Zufächeln']],['spill',['andere warnen','Nicht selbst wegwischen']]]){
  const button=lab.querySelector(`[data-chem-action="${id}"]`);button.focus();button.click();
  assert.equal(d.activeElement,button);assert.equal(button.getAttribute('aria-pressed'),'true');
  for(const phrase of phrases)assert.ok(lab.querySelector('.chem-status').textContent.includes(phrase));
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 dom.window.close();console.log('PASS: 9 safety questions, label guidance, teacher authorization, revision and three consistent incident responses with preserved focus.');
})().catch(error=>{console.error(error);process.exitCode=1;});
