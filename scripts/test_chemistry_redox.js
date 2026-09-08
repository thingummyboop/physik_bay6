const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_metalle_redox',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,9);
 assert.match(d.body.textContent,/Fe → Fe²⁺ \+ 2 e⁻/);
 assert.match(d.body.textContent,/Zn \+ Cu²⁺ → Zn²⁺ \+ Cu/);
 assert.equal(w.currentChapterResult('chemie_metalle_redox',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="redox"]');
 for(const [action,phrase,count]of [['dry','kontrolliert',0],['water','Sauerstoff',2],['salt','keine gemessene',4],['oil','bereits gelösten',0]]){
  const button=lab.querySelector(`button[data-chem-action="${action}"]`);button.click();
  assert.ok(lab.querySelector('.chem-status').textContent.toLowerCase().includes(phrase.toLowerCase()));
  const diagram=lab.querySelector(`[data-chem-svg-action="${action}"]`);
  assert.equal(diagram.querySelectorAll('circle').length,count);diagram.focus();
  diagram.dispatchEvent(new w.KeyboardEvent('keydown',{key:' ',bubbles:true,cancelable:true}));
  assert.equal(d.activeElement.dataset.chemSvgAction,action);
  assert.equal(d.activeElement.getAttribute('aria-pressed'),'true');
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 dom.window.close();console.log('PASS: 9 redox questions, electron-transfer equations, revision, four prepared model conditions, schematic rust and keyboard focus.');
})().catch(error=>{console.error(error);process.exitCode=1;});
